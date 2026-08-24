import { defineMiddleware, sequence } from 'astro:middleware';
import { createServerClient } from './lib/supabase/server';

const adminAuthGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith('/admin')) return next();
  if (pathname === '/admin/login') return next();

  const supabase = createServerClient(context.cookies, context.request.headers);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return context.redirect('/admin/login');
  }

  // Verify user is an admin (app_metadata.role is set via Supabase Dashboard
  // or by running: UPDATE auth.users SET raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' WHERE email = '...')
  const role = (user.app_metadata as Record<string, unknown>)?.role;
  if (role !== 'admin') {
    return new Response('Forbidden', { status: 403 });
  }

  context.locals.user = user;
  return next();
});

const pageVisibilityGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith('/admin') || pathname.startsWith('/_')) return next();
  const staticPrefixes = ['/_astro/', '/images/', '/fonts/', '/favicon'];
  if (staticPrefixes.some((p) => pathname.startsWith(p))) return next();

  const slug = pathname === '/' ? '/' : pathname.replace(/^\//, '').replace(/\/$/, '');
  const supabase = createServerClient(context.cookies, context.request.headers);
  const { data: page } = await supabase.from('pages').select('is_visible').eq('slug', slug).single();

  if (page && !page.is_visible) {
    return new Response('Not Found', { status: 404 });
  }

  return next();
});

export const onRequest = sequence(adminAuthGate, pageVisibilityGate);
