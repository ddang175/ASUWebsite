import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_YS8GGEOw.mjs";
//#region src/pages/history.astro
var history_exports = /* @__PURE__ */ __exportAll({
	default: () => $$History,
	file: () => $$file,
	url: () => $$url
});
var $$History = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "History — Asian Student Union @ Iowa State University",
		"description": "The history of the Asian Student Union at Iowa State University."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="relative flex-1 bg-asu-espresso flex flex-col items-center justify-center px-8 text-center overflow-hidden"><svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden="true"><path d="M -80,800 C 120,400 480,760 660,500 C 840,240 720,80 1000,400 C 1180,640 1380,320 1540,560" fill="none" stroke="#E5291E" stroke-width="8" stroke-linecap="round" vector-effect="non-scaling-stroke" opacity="0.88"></path></svg><div class="absolute inset-0 pointer-events-none" style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E'); opacity: 0.4;"></div><div class="relative z-10 max-w-xl"><div class="flex items-center justify-center gap-4 mb-8"><div class="w-8 h-px bg-asu-gold opacity-60"></div><p class="font-ui text-[11px] font-bold tracking-[0.28em] uppercase text-asu-gold opacity-80">Coming Soon</p><div class="w-8 h-px bg-asu-gold opacity-60"></div></div><h1 class="font-display text-asu-cream leading-none mb-6" style="font-size: clamp(4rem, 10vw, 8rem); letter-spacing: -0.02em;">History</h1><div class="w-16 h-px bg-asu-red mx-auto mb-8"></div><p class="font-body text-lg leading-relaxed mb-12" style="color: rgba(252,238,201,0.65); max-width: 38ch; margin-left: auto; margin-right: auto;">We're still writing this chapter. Check back soon to read the full story of ASU at Iowa State.</p><a href="/" class="inline-flex items-center gap-3 font-ui text-[13px] font-medium tracking-[0.12em] uppercase text-asu-cream border border-asu-cream/20 px-8 py-4 rounded hover:bg-asu-cream/10 transition-colors duration-200">← Return Home</a></div></main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/history.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/history.astro";
var $$url = "/history";
//#endregion
//#region \0virtual:astro:page:src/pages/history@_@astro
var page = () => history_exports;
//#endregion
export { page };
