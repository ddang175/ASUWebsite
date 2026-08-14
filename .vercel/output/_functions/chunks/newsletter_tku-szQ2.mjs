import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_YS8GGEOw.mjs";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/newsletter/NewsletterHero.tsx
var EASE_OUT = [
	.16,
	1,
	.3,
	1
];
var RIBBON_PATH = "M 1700,80 C 1460,-40 1280,220 1150,480 C 1100,600 1200,780 1350,840 C 1500,900 1580,700 1480,540 C 1380,380 1250,420 1150,480 C 950,640 500,700 100,740 C -200,760 -800,730 -2500,720";
function NewsletterHero() {
	const prefersReduced = useReducedMotion();
	const sectionRef = useRef(null);
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 700], [0, 180]);
	return /* @__PURE__ */ jsxs("section", {
		ref: sectionRef,
		className: "relative w-full overflow-hidden bg-asu-espresso text-asu-cream",
		style: {
			height: "100vh",
			minHeight: 640
		},
		"aria-label": "Newsletter sign-up",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0",
				style: prefersReduced ? {} : {
					scale: 1.1,
					y: bgY
				},
				children: /* @__PURE__ */ jsx("img", {
					src: "/images/newsletter/newsletterHero.webp",
					alt: "ASU community gathering",
					className: "w-full h-full object-cover",
					decoding: "async",
					draggable: false
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 pointer-events-none",
				style: {
					background: "linear-gradient(to bottom, rgba(36,22,17,0.45) 0%, rgba(36,22,17,0.3) 30%, rgba(36,22,17,0.7) 70%, rgba(36,22,17,0.96) 100%)",
					zIndex: 1
				}
			}),
			!prefersReduced && /* @__PURE__ */ jsx("svg", {
				className: "absolute inset-0 w-full h-full pointer-events-none",
				viewBox: "0 0 1600 900",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				style: { zIndex: 2 },
				children: /* @__PURE__ */ jsx(motion.path, {
					d: RIBBON_PATH,
					fill: "none",
					stroke: "#E5291E",
					strokeWidth: 3,
					strokeLinecap: "round",
					vectorEffect: "non-scaling-stroke",
					initial: {
						pathLength: 0,
						opacity: 0
					},
					animate: {
						pathLength: 1,
						opacity: .75
					},
					transition: {
						duration: 2.6,
						ease: "easeInOut",
						delay: .8
					}
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0 flex flex-col items-center justify-center px-8 text-center",
				style: { zIndex: 3 },
				children: [
					/* @__PURE__ */ jsx(motion.p, {
						className: "font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-gold mb-8",
						initial: {
							opacity: 0,
							y: 16
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .3
						},
						children: "Asian Student Union · Newsletter"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-asu-cream leading-none mb-7",
						style: {
							fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
							letterSpacing: "-0.02em"
						},
						children: [["Stay", "in"], ["the", "Loop."]].map((line, li) => /* @__PURE__ */ jsx("div", {
							className: "block",
							children: line.map((word, wi) => /* @__PURE__ */ jsx("span", {
								className: "inline-block overflow-hidden align-top",
								style: { marginRight: word === "Loop." ? 0 : "0.2em" },
								children: /* @__PURE__ */ jsx(motion.span, {
									className: "inline-block",
									initial: { y: prefersReduced ? 0 : "110%" },
									animate: { y: 0 },
									transition: prefersReduced ? { duration: 0 } : {
										duration: 1.1,
										ease: EASE_OUT,
										delay: .4 + li * .18 + wi * .1
									},
									children: word
								})
							}, word))
						}, li))
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "bg-asu-gold mb-8",
						style: {
							height: "1.5px",
							width: "48px"
						},
						initial: { scaleX: 0 },
						animate: { scaleX: 1 },
						transition: prefersReduced ? { duration: 0 } : {
							duration: .5,
							ease: EASE_OUT,
							delay: .85
						}
					}),
					/* @__PURE__ */ jsx(motion.p, {
						className: "font-body text-[17px] leading-relaxed max-w-sm mb-10",
						style: { color: "rgba(252,238,201,0.72)" },
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .8,
							ease: EASE_OUT,
							delay: .95
						},
						children: "Get updates on events, fundraisers, and everything happening at ASU straight to your inbox."
					}),
					/* @__PURE__ */ jsxs(motion.span, {
						className: "inline-flex items-center gap-3 px-9 py-4 bg-asu-beige/50 text-asu-muted font-ui font-semibold text-[15px] tracking-[0.06em] rounded cursor-not-allowed select-none border border-dashed border-asu-muted/30",
						"aria-disabled": "true",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .8,
							ease: EASE_OUT,
							delay: 1.1
						},
						children: ["Sign Up", /* @__PURE__ */ jsx("span", {
							className: "font-bold tracking-widest text-asu-brown/60",
							children: "— TODO"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute z-[4] text-center",
				style: {
					left: "50%",
					bottom: 36,
					transform: "translateX(-50%)"
				},
				initial: { opacity: 0 },
				animate: { opacity: .5 },
				transition: prefersReduced ? { duration: 0 } : {
					duration: 1,
					delay: 1.4
				},
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx(motion.svg, {
					width: "20",
					height: "20",
					viewBox: "0 0 20 20",
					fill: "none",
					animate: prefersReduced ? {} : { y: [
						0,
						5,
						0
					] },
					transition: {
						duration: 1.6,
						repeat: Infinity,
						ease: "easeInOut"
					},
					children: /* @__PURE__ */ jsx("path", {
						d: "M10 3v14M4 11l6 6 6-6",
						stroke: "#FCEEC9",
						strokeWidth: "1.5",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})
			})
		]
	});
}
//#endregion
//#region src/pages/join/newsletter.astro
var newsletter_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Newsletter,
	file: () => $$file,
	url: () => $$url
});
var $$Newsletter = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Newsletter — Asian Student Union @ Iowa State University",
		"description": "Sign up for the ASU newsletter and get updates on events, fundraisers, and everything happening at the Asian Student Union at Iowa State."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1">${renderComponent($$result, "NewsletterHero", NewsletterHero, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/newsletter/NewsletterHero.tsx",
		"client:component-export": "NewsletterHero"
	})}</main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/join/newsletter.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/join/newsletter.astro";
var $$url = "/join/newsletter";
//#endregion
//#region \0virtual:astro:page:src/pages/join/newsletter@_@astro
var page = () => newsletter_exports;
//#endregion
export { page };
