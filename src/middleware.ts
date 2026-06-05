import { defineMiddleware } from 'astro:middleware';
import { safeCompare } from './lib/rateLimit';

export const onRequest = defineMiddleware(async (context, next) => {
  const sitePassword = import.meta.env.SITE_PASSWORD ?? process.env.SITE_PASSWORD;

  // No password set — site is open
  if (!sitePassword) return next();

  const { pathname } = context.url;

  // Always allow the password page and its POST handler
  if (pathname.startsWith('/password')) return next();

  const cookie = context.cookies.get('asu_preview_auth');

  if (cookie?.value && safeCompare(cookie.value, sitePassword)) return next();

  return context.redirect('/password');
});
