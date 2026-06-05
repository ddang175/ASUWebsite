import { ao as defineMiddleware, bd as sequence } from './chunks/params-and-props_BxzUSTsX.mjs';
import 'piccolore';
import 'clsx';
import { s as safeCompare } from './chunks/rateLimit_BvKu5mWq.mjs';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const sitePassword = "fortniteballs";
  const { pathname } = context.url;
  if (pathname.startsWith("/password")) return next();
  const cookie = context.cookies.get("asu_preview_auth");
  if (cookie?.value && safeCompare(cookie.value, sitePassword)) return next();
  return context.redirect("/password");
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
