import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_CXCUxMaR.mjs";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/discord/DiscordHero.tsx
var EASE_OUT = [
	.16,
	1,
	.3,
	1
];
var FLY_IN = [
	.16,
	1,
	.3,
	1
];
var RIBBON_PATH = "M -2000,880 C -1400,860 -800,840 -80,820 C 180,680 420,900 660,740 C 900,580 820,360 1060,520 C 1300,680 1200,880 1460,740 C 1720,600 2200,700 3000,680 C 3500,660 4000,680 5000,670";
function DiscordLogo({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		className,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.082.114 18.105.132 18.12a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" })
	});
}
function DiscordHero() {
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
		"aria-label": "Discord community server",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0",
				style: prefersReduced ? {} : {
					scale: 1.1,
					y: bgY
				},
				children: /* @__PURE__ */ jsx("img", {
					src: "/images/discord/asugames.jpg",
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
						className: "font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-gold mb-6",
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
							delay: .2
						},
						children: "Asian Student Union · Discord"
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "mb-7",
						initial: prefersReduced ? { opacity: 0 } : {
							x: 520,
							y: -340,
							rotate: 28,
							scale: 1.12,
							opacity: 0
						},
						animate: prefersReduced ? { opacity: 1 } : {
							x: 0,
							y: 0,
							rotate: -6,
							scale: 1,
							opacity: 1
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .9,
							ease: FLY_IN,
							delay: .32,
							opacity: {
								duration: .18,
								ease: "easeOut",
								delay: .32
							}
						},
						whileHover: prefersReduced ? {} : {
							y: -10,
							rotate: -3,
							transition: {
								type: "spring",
								stiffness: 280,
								damping: 22
							}
						},
						children: /* @__PURE__ */ jsx(DiscordLogo, { className: "w-32 h-32 text-asu-gold" })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "font-display text-asu-cream leading-none mb-7",
						style: {
							fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
							letterSpacing: "-0.02em"
						},
						children: [["Join", "the"], ["Community."]].map((line, li) => /* @__PURE__ */ jsx("div", {
							className: "block",
							children: line.map((word, wi) => /* @__PURE__ */ jsx("span", {
								className: "inline-block overflow-hidden align-top",
								style: { marginRight: word === "Community." ? 0 : "0.2em" },
								children: /* @__PURE__ */ jsx(motion.span, {
									className: "inline-block",
									initial: { y: prefersReduced ? 0 : "110%" },
									animate: { y: 0 },
									transition: prefersReduced ? { duration: 0 } : {
										duration: 1.1,
										ease: EASE_OUT,
										delay: .7 + li * .18 + wi * .1
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
							delay: 1.12
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
							delay: 1.22
						},
						children: "Participate in online-only events, chat with members and the board, play games, get live updates, and be involved with the community!"
					}),
					/* @__PURE__ */ jsxs(motion.a, {
						href: "#",
						className: "inline-flex items-center gap-3 px-9 py-4 bg-asu-red text-white font-ui font-semibold text-[15px] tracking-[0.06em] rounded transition-colors duration-200 hover:bg-asu-red-hover",
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
							delay: 1.36
						},
						children: ["Join the Server", /* @__PURE__ */ jsx("svg", {
							width: "15",
							height: "15",
							viewBox: "0 0 15 15",
							fill: "none",
							"aria-hidden": "true",
							children: /* @__PURE__ */ jsx("path", {
								d: "M2 7.5h11M9 3.5l4 4-4 4",
								stroke: "currentColor",
								strokeWidth: "1.6",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
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
					delay: 1.6
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
//#region src/pages/connect/discord.astro
var discord_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Discord,
	file: () => $$file,
	url: () => $$url
});
var $$Discord = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Discord — Asian Student Union @ Iowa State University",
		"description": "Join the ASU Discord server to connect with members, get real-time updates, and hang out with the community."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1">${renderComponent($$result, "DiscordHero", DiscordHero, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/discord/DiscordHero.tsx",
		"client:component-export": "DiscordHero"
	})}</main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/connect/discord.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/connect/discord.astro";
var $$url = "/connect/discord";
//#endregion
//#region \0virtual:astro:page:src/pages/connect/discord@_@astro
var page = () => discord_exports;
//#endregion
export { page };
