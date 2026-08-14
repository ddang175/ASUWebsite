import { A as defineMiddleware, g as sequence } from "./chunks/render_hDRqtU52.mjs";
import { r as safeCompare } from "./chunks/rateLimit_Ch0qQSvb.mjs";
//#region src/middleware.ts
var onRequest$1 = defineMiddleware(async (context, next) => {
	const sitePassword = "fortniteballs";
	const { pathname } = context.url;
	if (pathname.startsWith("/password")) return next();
	const cookie = context.cookies.get("asu_preview_auth");
	if (cookie?.value && safeCompare(cookie.value, sitePassword)) return next();
	return context.redirect("/password");
});
//#endregion
//#region \0virtual:astro:middleware
var onRequest = sequence(onRequest$1);
//#endregion
export { onRequest };
