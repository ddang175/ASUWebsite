import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_DCqJGwVF.mjs";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/socials/SocialsHero.tsx
var EASE_OUT = [
	.16,
	1,
	.3,
	1
];
function InstagramIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		className,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
	});
}
function TikTokIcon({ className }) {
	return /* @__PURE__ */ jsx("svg", {
		className,
		viewBox: "0 0 24 24",
		fill: "currentColor",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" })
	});
}
function SocialCard({ platform, index, handle, tagline, description, href, label, focused, setFocused }) {
	const prefersReduced = useReducedMotion();
	const isHovered = focused === platform;
	const isIG = platform === "instagram";
	return /* @__PURE__ */ jsx(motion.div, {
		initial: prefersReduced ? {} : {
			opacity: 0,
			y: 48
		},
		animate: {
			opacity: 1,
			y: 0
		},
		transition: prefersReduced ? { duration: 0 } : {
			duration: 1.1,
			ease: EASE_OUT,
			delay: .85 + index * .18
		},
		style: {
			flex: 1,
			display: "flex",
			flexDirection: "column"
		},
		children: /* @__PURE__ */ jsx("div", {
			onMouseEnter: () => setFocused(platform),
			onMouseLeave: () => setFocused(null),
			className: "relative flex-1 flex flex-col",
			children: /* @__PURE__ */ jsxs("div", {
				className: "relative overflow-hidden rounded-3xl flex flex-col flex-1",
				style: {
					background: "#241611",
					minHeight: 520,
					boxShadow: "0 0 0 1px rgba(232,198,106,0.18), 0 6px 24px rgba(30,28,18,0.1)"
				},
				children: [/* @__PURE__ */ jsx("div", {
					className: "absolute top-0 left-8 right-8 pointer-events-none",
					style: {
						height: "2px",
						background: "rgba(232,198,106,0.55)",
						borderRadius: "0 0 2px 2px"
					}
				}), /* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex flex-col h-full p-9 gap-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "flex items-center justify-center rounded-2xl flex-shrink-0",
							style: {
								width: 80,
								height: 80,
								background: "rgba(252,238,201,0.07)",
								border: "1px solid rgba(252,238,201,0.1)"
							},
							children: isIG ? /* @__PURE__ */ jsx(InstagramIcon, { className: "w-10 h-10 text-asu-cream" }) : /* @__PURE__ */ jsx(TikTokIcon, { className: "w-10 h-10 text-asu-cream" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2.5",
							children: [/* @__PURE__ */ jsx("div", { className: "w-5 h-px bg-asu-gold opacity-60" }), /* @__PURE__ */ jsx("p", {
								className: "font-ui text-[11px] font-bold tracking-[0.26em] uppercase text-asu-gold opacity-90",
								children: isIG ? "Instagram" : "TikTok"
							})]
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-display text-asu-cream leading-none",
							style: {
								fontSize: "clamp(2rem, 3vw, 2.8rem)",
								letterSpacing: "-0.02em"
							},
							children: handle
						}), /* @__PURE__ */ jsx("p", {
							className: "font-ui font-medium mt-2",
							style: {
								fontSize: "0.9rem",
								color: "rgba(252,238,201,0.4)",
								letterSpacing: "0.01em"
							},
							children: tagline
						})] }),
						/* @__PURE__ */ jsx("div", { style: {
							height: "1.5px",
							width: 48,
							background: "rgba(232,198,106,0.45)"
						} }),
						/* @__PURE__ */ jsx("p", {
							className: "font-body leading-relaxed flex-1",
							style: {
								fontSize: "clamp(1rem, 1.3vw, 1.1rem)",
								color: "rgba(252,238,201,0.65)"
							},
							children: description
						}),
						/* @__PURE__ */ jsxs("a", {
							href,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-asu-red text-asu-cream font-ui font-semibold rounded-lg transition-colors duration-200 hover:bg-asu-red-hover flex-shrink-0",
							style: {
								fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
								letterSpacing: "0.05em"
							},
							onClick: (e) => e.stopPropagation(),
							children: [label, /* @__PURE__ */ jsx(motion.svg, {
								width: "16",
								height: "16",
								viewBox: "0 0 16 16",
								fill: "none",
								animate: isHovered && !prefersReduced ? { x: 4 } : { x: 0 },
								transition: {
									duration: .25,
									ease: EASE_OUT
								},
								children: /* @__PURE__ */ jsx("path", {
									d: "M3 8h10M9 4l4 4-4 4",
									stroke: "currentColor",
									strokeWidth: "1.6",
									strokeLinecap: "round",
									strokeLinejoin: "round"
								})
							})]
						})
					]
				})]
			})
		})
	});
}
function SocialsHero() {
	const prefersReduced = useReducedMotion() ?? false;
	const [focused, setFocused] = useState(null);
	const cx = useMotionValue(-600);
	const cy = useMotionValue(-600);
	const scx = useSpring(cx, {
		damping: 30,
		stiffness: 180
	});
	const scy = useSpring(cy, {
		damping: 30,
		stiffness: 180
	});
	useEffect(() => {
		if (prefersReduced) return;
		const move = (e) => {
			cx.set(e.clientX);
			cy.set(e.clientY);
		};
		window.addEventListener("mousemove", move);
		return () => window.removeEventListener("mousemove", move);
	}, [prefersReduced]);
	return /* @__PURE__ */ jsxs("section", {
		className: "relative bg-asu-ivory text-asu-dark overflow-hidden",
		style: { minHeight: "calc(100vh - 64px)" },
		children: [
			!prefersReduced && /* @__PURE__ */ jsx(motion.div, {
				className: "fixed top-0 left-0 pointer-events-none",
				style: {
					x: scx,
					y: scy,
					translateX: "-50%",
					translateY: "-50%",
					width: 800,
					height: 800,
					borderRadius: "50%",
					background: "radial-gradient(circle, rgba(232,198,106,0.09) 0%, transparent 60%)",
					zIndex: 0
				}
			}),
			!prefersReduced && /* @__PURE__ */ jsx("svg", {
				className: "absolute inset-0 w-full h-full pointer-events-none",
				viewBox: "0 0 1440 900",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				style: { zIndex: 1 },
				children: /* @__PURE__ */ jsx(motion.path, {
					d: "M -2000,800 C -1400,790 -800,780 -80,760 C 240,660 560,820 860,700 C 1160,580 1340,760 1660,680 C 2000,640 2600,700 3500,680 C 4000,660 4500,680 5500,670",
					fill: "none",
					stroke: "#E5291E",
					strokeWidth: 2.5,
					strokeLinecap: "round",
					vectorEffect: "non-scaling-stroke",
					initial: {
						pathLength: 0,
						opacity: 0
					},
					animate: {
						pathLength: 1,
						opacity: .22
					},
					transition: {
						duration: 2.8,
						ease: "easeInOut",
						delay: 1.8
					}
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative",
				style: { zIndex: 2 },
				children: [/* @__PURE__ */ jsxs("div", {
					className: "text-center px-8 pt-16 pb-10",
					children: [
						/* @__PURE__ */ jsxs(motion.div, {
							className: "flex items-center justify-center gap-3 mb-6",
							initial: prefersReduced ? {} : {
								opacity: 0,
								y: 14
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .7,
								ease: EASE_OUT,
								delay: .15
							},
							children: [
								/* @__PURE__ */ jsx("div", { className: "w-6 h-px bg-asu-red opacity-60" }),
								/* @__PURE__ */ jsx("p", {
									className: "font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-red",
									children: "Asian Student Union · Connect"
								}),
								/* @__PURE__ */ jsx("div", { className: "w-6 h-px bg-asu-red opacity-60" })
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mb-7",
							children: ["Follow", "Our Story."].map((word, i) => /* @__PURE__ */ jsx("div", {
								className: "overflow-hidden",
								style: { lineHeight: .88 },
								children: /* @__PURE__ */ jsx(motion.span, {
									className: "block font-display text-asu-dark",
									style: {
										fontSize: i === 0 ? "clamp(2.6rem, 5.5vw, 5.2rem)" : "clamp(3.2rem, 7vw, 6.6rem)",
										letterSpacing: "-0.025em"
									},
									initial: prefersReduced ? {} : { y: "115%" },
									animate: { y: 0 },
									transition: prefersReduced ? { duration: 0 } : {
										duration: 1.1,
										ease: EASE_OUT,
										delay: .28 + i * .15
									},
									children: word
								})
							}, word))
						}),
						/* @__PURE__ */ jsx(motion.p, {
							className: "font-body max-w-md mx-auto mb-8",
							style: {
								fontSize: "1.05rem",
								color: "rgba(30,28,18,0.52)",
								lineHeight: 1.65
							},
							initial: prefersReduced ? {} : {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .8,
								ease: EASE_OUT,
								delay: .62
							},
							children: "Two platforms. One community. Stay in the loop with everything happening at ASU."
						}),
						/* @__PURE__ */ jsx("div", {
							className: "flex justify-center",
							children: /* @__PURE__ */ jsx(motion.div, {
								className: "bg-asu-gold",
								style: {
									height: "1.5px",
									width: 48
								},
								initial: prefersReduced ? {} : { scaleX: 0 },
								animate: { scaleX: 1 },
								transition: prefersReduced ? { duration: 0 } : {
									duration: .5,
									ease: EASE_OUT,
									delay: .72
								}
							})
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "px-10 pb-16",
					children: /* @__PURE__ */ jsxs("div", {
						className: "max-w-4xl mx-auto flex flex-col md:flex-row md:items-stretch gap-8",
						children: [/* @__PURE__ */ jsx(SocialCard, {
							platform: "instagram",
							index: 0,
							handle: "@asu_iastate",
							tagline: "Events · Updates · Community",
							description: "All our events go up here first. The dates, details, and photo highlights from everything happening at ASU this semester are posted here. If you want to know what's coming up and when, this is the place to follow.",
							href: "https://www.instagram.com/asu_iastate?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
							label: "Follow on Instagram",
							focused,
							setFocused
						}), /* @__PURE__ */ jsx(SocialCard, {
							platform: "tiktok",
							index: 1,
							handle: "@asu_iastate",
							tagline: "Reels · Behind the Scenes · Highlights",
							description: "Behind-the-scenes moments, event recaps, and club highlights in short-form video. This is where ASU gets fun, follow along and see what we've been up to.",
							href: "https://www.tiktok.com/@asu_iastate?is_from_webapp=1&sender_device=pc",
							label: "Follow on TikTok",
							focused,
							setFocused
						})]
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/connect/socials.astro
var socials_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Socials,
	file: () => $$file,
	url: () => $$url
});
var $$Socials = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Socials — Asian Student Union @ Iowa State University",
		"description": "Follow ASU on Instagram and TikTok to stay connected with events, updates, and club life."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1">${renderComponent($$result, "SocialsHero", SocialsHero, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/socials/SocialsHero.tsx",
		"client:component-export": "SocialsHero"
	})}</main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/connect/socials.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/connect/socials.astro";
var $$url = "/connect/socials";
//#endregion
//#region \0virtual:astro:page:src/pages/connect/socials@_@astro
var page = () => socials_exports;
//#endregion
export { page };
