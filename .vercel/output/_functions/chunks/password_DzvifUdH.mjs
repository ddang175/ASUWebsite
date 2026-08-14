import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { g as addAttribute, h as renderHead, u as renderTemplate, w as createAstro } from "./server_BLE2ae5B.mjs";
import { n as resetRateLimit, r as safeCompare, t as checkRateLimit } from "./rateLimit_Ch0qQSvb.mjs";
//#region src/pages/password.astro
var password_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Password,
	file: () => $$file,
	url: () => $$url
});
createAstro("https://astro.build");
var $$Password = createComponent(async ($$result, $$props, $$slots) => {
	const Astro2 = $$result.createAstro($$props, $$slots);
	Astro2.self = $$Password;
	const ip = Astro2.request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? Astro2.request.headers.get("x-real-ip") ?? "unknown";
	let error = false;
	let rateLimited = false;
	if (Astro2.request.method === "POST") if (!checkRateLimit(ip).allowed) rateLimited = true;
	else {
		const data = await Astro2.request.formData();
		const submitted = String(data.get("password") ?? "").slice(0, 200);
		const sitePassword = "fortniteballs";
		if (safeCompare(submitted, sitePassword)) {
			resetRateLimit(ip);
			Astro2.cookies.set("asu_preview_auth", sitePassword, {
				httpOnly: true,
				secure: true,
				sameSite: "strict",
				path: "/",
				maxAge: 604800
			});
			return Astro2.redirect("/");
		}
		error = true;
	}
	return renderTemplate`<html lang="en" data-astro-cid-6no3lq2l><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preview — Asian Student Union</title><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="icon" href="/favicon.ico">${renderHead($$result)}</head><body data-astro-cid-6no3lq2l><div class="card" data-astro-cid-6no3lq2l><div class="logo" data-astro-cid-6no3lq2l>🌸</div><h1 data-astro-cid-6no3lq2l>ASU Preview</h1><p data-astro-cid-6no3lq2l>This site is under construction. Enter the officer password to continue.</p><form method="POST" data-astro-cid-6no3lq2l><input type="password" name="password" placeholder="Enter password" autofocus required data-astro-cid-6no3lq2l><button type="submit"${addAttribute(rateLimited, "disabled")} data-astro-cid-6no3lq2l>Enter</button>${error && renderTemplate`<p class="error" data-astro-cid-6no3lq2l>Incorrect password — try again.</p>`}${rateLimited && renderTemplate`<p class="error" data-astro-cid-6no3lq2l>Too many attempts — try again in 15 minutes.</p>`}</form></div></body></html>`;
}, "C:/Bench/ASUWebsite/src/pages/password.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/password.astro";
var $$url = "/password";
//#endregion
//#region \0virtual:astro:page:src/pages/password@_@astro
var page = () => password_exports;
//#endregion
export { page };
