import { defineMiddleware, sequence } from 'astro:middleware';
import { safeCompare } from './lib/rateLimit';
import { createServerClient } from './lib/supabase/server';

const sitePasswordGate = defineMiddleware(async (context, next) => {
  const sitePassword = import.meta.env.SITE_PASSWORD ?? process.env.SITE_PASSWORD;
  if (!sitePassword) return next();
  const { pathname } = context.url;
  if (pathname.startsWith('/password')) return next();
  if (pathname.startsWith('/admin')) return next();
  const cookie = context.cookies.get('asu_preview_auth');
  if (cookie?.value && safeCompare(cookie.value, sitePassword)) return next();
  return context.redirect('/password');
});

const adminAuthGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith('/admin')) return next();
  if (pathname === '/admin/login') return next();

  const supabase = createServerClient(context.cookies);
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
  if (pathname.startsWith('/admin') || pathname.startsWith('/password') || pathname.startsWith('/_')) return next();
  const staticPrefixes = ['/_astro/', '/images/', '/fonts/', '/favicon'];
  if (staticPrefixes.some((p) => pathname.startsWith(p))) return next();

  const slug = pathname === '/' ? '/' : pathname.replace(/^\//, '').replace(/\/$/, '');
  const supabase = createServerClient(context.cookies);
  const { data: page } = await supabase.from('pages').select('is_visible').eq('slug', slug).single();

  if (page && !page.is_visible) {
    return new Response('Not Found', { status: 404 });
  }

  return next();
});

export const onRequest = sequence(sitePasswordGate, adminAuthGate, pageVisibilityGate);
