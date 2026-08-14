import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_YS8GGEOw.mjs";
import { useRef } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/about/PageRibbons.tsx
/** Shift every ribbon earlier by this amount. Increase to trigger sooner. */
var SCROLL_RANGE_OFFSET = .1;
function shiftRange([s, e]) {
	const start = Math.max(0, s - SCROLL_RANGE_OFFSET);
	return [start, Math.max(start + .05, e - SCROLL_RANGE_OFFSET)];
}
var RIBBONS = [
	{
		id: 1,
		style: {
			position: "absolute",
			left: 0,
			right: 0,
			top: "calc(100vh - 4rem + 560px)",
			height: 360,
			zIndex: 45
		},
		viewBox: "0 0 1440 360",
		path: "M -80,320 C 120,-100 480,380 660,200 C 840,20 720,-100 1000,200 C 1180,360 1380,100 1540,260",
		scrollRange: [.36, .56]
	},
	{
		id: 3,
		style: {
			position: "absolute",
			left: 0,
			right: 0,
			top: "calc(100vh - 4rem + 1620px)",
			height: 360,
			zIndex: 45
		},
		viewBox: "0 0 1440 360",
		path: "M -80,340 C 160,-100 520,300 700,150 C 880,0 740,-100 1020,180 C 1200,380 1380,80 1540,260",
		scrollRange: [.65, .82]
	},
	{
		id: 4,
		style: {
			position: "absolute",
			left: 0,
			right: 0,
			top: "calc(100vh - 4rem + 2500px)",
			height: 340,
			zIndex: 45
		},
		viewBox: "0 0 1440 340",
		path: "M 1520,260 C 1280,-80 960,360 70,190 C -500,20 100, -100 -400,10 C 220,380 60,80 -1200,240",
		scrollRange: [.8, .96]
	}
];
function SingleRibbon({ ribbon, scrollYProgress }) {
	const pathLength = useTransform(scrollYProgress, shiftRange(ribbon.scrollRange), [0, 1]);
	return /* @__PURE__ */ jsx("div", {
		className: "pointer-events-none absolute left-0 right-0",
		style: {
			top: ribbon.style.top,
			height: ribbon.style.height,
			zIndex: ribbon.style.zIndex
		},
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("svg", {
			viewBox: ribbon.viewBox,
			preserveAspectRatio: "none",
			className: "w-full h-full",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: /* @__PURE__ */ jsx(motion.path, {
				d: ribbon.path,
				stroke: "#E5291E",
				strokeWidth: "9",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				fill: "none",
				vectorEffect: "non-scaling-stroke",
				style: { pathLength },
				opacity: .88
			})
		})
	});
}
function PageRibbons() {
	const prefersReduced = useReducedMotion();
	const { scrollYProgress } = useScroll();
	if (prefersReduced) return null;
	return /* @__PURE__ */ jsx(Fragment$1, { children: RIBBONS.map((ribbon) => /* @__PURE__ */ jsx(SingleRibbon, {
		ribbon,
		scrollYProgress
	}, ribbon.id)) });
}
//#endregion
//#region src/components/about/AboutHero.tsx
var EASE_OUT$3 = [
	.16,
	1,
	.3,
	1
];
function AboutHero() {
	const prefersReduced = useReducedMotion();
	const sectionRef = useRef(null);
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 700], [0, 160]);
	return /* @__PURE__ */ jsxs("section", {
		ref: sectionRef,
		className: "relative overflow-hidden bg-asu-espresso",
		style: { minHeight: "calc(100vh - 4rem)" },
		"aria-label": "About us hero",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: "absolute inset-0",
				style: {
					scale: 1.18,
					y: prefersReduced ? 0 : bgY
				},
				children: /* @__PURE__ */ jsx("img", {
					src: "/images/aboutUs/heroImage.webp",
					alt: "ASU community gathering",
					className: "w-full h-full object-cover",
					decoding: "async",
					draggable: false
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0",
				style: {
					background: "linear-gradient(to top, rgba(30,28,18,0.96) 0%, rgba(30,28,18,0.55) 45%, rgba(30,28,18,0.18) 100%)",
					zIndex: 1
				}
			}),
			!prefersReduced && /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 pointer-events-none overflow-hidden",
				style: { zIndex: 2 },
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsx("svg", {
					viewBox: "0 0 1440 1000",
					preserveAspectRatio: "none",
					className: "w-full h-full",
					fill: "none",
					xmlns: "http://www.w3.org/2000/svg",
					children: /* @__PURE__ */ jsx(motion.path, {
						d: [
							"M -30,110",
							"C 100,-200 500,380 280,470",
							"C -180,560 500,320 200,540",
							"C -50,720 -70,850 110,910",
							"C 340,970 840,895 1160,858",
							"C 1370,838 1510,864 1540,848"
						].join(" "),
						stroke: "#E5291E",
						strokeWidth: "3",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						fill: "none",
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
							delay: .8,
							ease: "easeInOut"
						}
					})
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-20 md:pb-28",
				style: {
					minHeight: "calc(100vh - 4rem)",
					zIndex: 3
				},
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-2xl",
					children: [
						/* @__PURE__ */ jsx(motion.p, {
							className: "font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold mb-5",
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .6,
								delay: .25,
								ease: EASE_OUT$3
							},
							children: "Asian Student Union @ Iowa State University"
						}),
						/* @__PURE__ */ jsx(motion.h1, {
							className: "font-display text-asu-cream leading-none mb-6",
							style: {
								fontSize: "clamp(3.75rem, 9vw, 7.5rem)",
								letterSpacing: "-0.02em"
							},
							initial: {
								opacity: 0,
								y: 36
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .85,
								delay: .38,
								ease: EASE_OUT$3
							},
							children: "About Us"
						}),
						/* @__PURE__ */ jsxs(motion.p, {
							className: "font-body text-lg leading-relaxed max-w-md",
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
								duration: .75,
								delay: .55,
								ease: EASE_OUT$3
							},
							children: [
								"Who we are, what we stand for",
								/* @__PURE__ */ jsx("br", {}),
								"and our purpose."
							]
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "mt-8 bg-asu-gold",
							style: {
								height: "1.5px",
								width: "56px",
								transformOrigin: "left"
							},
							initial: { scaleX: 0 },
							animate: { scaleX: 1 },
							transition: prefersReduced ? { duration: 0 } : {
								duration: .55,
								delay: .72,
								ease: EASE_OUT$3
							}
						})
					]
				}), /* @__PURE__ */ jsxs(motion.div, {
					className: "absolute right-8 md:right-16 bottom-8 flex flex-col items-center gap-2",
					style: { color: "rgba(252,238,201,0.4)" },
					initial: { opacity: 0 },
					animate: { opacity: 1 },
					transition: prefersReduced ? { duration: 0 } : {
						duration: 1,
						delay: 1.3
					},
					"aria-hidden": "true",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-ui text-[10px] font-bold tracking-[0.18em] uppercase",
						children: "Scroll"
					}), /* @__PURE__ */ jsxs(motion.svg, {
						width: "14",
						height: "22",
						viewBox: "0 0 14 22",
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
						children: [/* @__PURE__ */ jsx("rect", {
							x: "5.5",
							y: "0",
							width: "3",
							height: "9",
							rx: "1.5",
							fill: "currentColor"
						}), /* @__PURE__ */ jsx("path", {
							d: "M 2,13 L 7,19 L 12,13",
							stroke: "currentColor",
							strokeWidth: "1.5",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})]
					})]
				})]
			})
		]
	});
}
//#endregion
//#region src/components/about/MissionReveal.tsx
var MISSION_TEXT = "To foster a welcoming and safe community that celebrates Asian culture and heritage, empowering our members by creating lasting spaces for connection, growth, and joy at Iowa State University.";
var EASE_OUT$2 = [
	.16,
	1,
	.3,
	1
];
function MissionReveal() {
	const prefersReduced = useReducedMotion();
	const ref = useRef(null);
	const isInViewHook = useInView(ref, {
		once: true,
		margin: "-12% 0px"
	});
	const isInView = prefersReduced ? true : isInViewHook;
	const words = MISSION_TEXT.split(" ");
	return /* @__PURE__ */ jsx("section", {
		className: "relative z-[1] bg-asu-espresso py-32 md:py-44 px-8 overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-[900px] mx-auto",
			children: [
				/* @__PURE__ */ jsxs(motion.div, {
					className: "flex flex-col items-center mb-14",
					initial: {
						opacity: 0,
						y: 16
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {
						opacity: 0,
						y: 16
					},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .6,
						ease: EASE_OUT$2
					},
					children: [/* @__PURE__ */ jsx("div", { className: "w-10 h-px bg-asu-gold mb-5" }), /* @__PURE__ */ jsx("p", {
						className: "font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold",
						children: "Our Mission"
					})]
				}),
				/* @__PURE__ */ jsx("div", {
					ref,
					className: "font-display text-asu-cream text-center leading-snug",
					style: { fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" },
					"aria-label": MISSION_TEXT,
					children: words.map((word, i) => /* @__PURE__ */ jsx(motion.span, {
						className: "inline-block",
						style: { marginRight: "0.28em" },
						initial: {
							opacity: prefersReduced ? 1 : 0,
							y: prefersReduced ? 0 : 22
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {
							opacity: prefersReduced ? 1 : 0,
							y: prefersReduced ? 0 : 22
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .55,
							delay: i * .048,
							ease: EASE_OUT$2
						},
						children: word
					}, i))
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "mx-auto mt-14 bg-asu-gold",
					style: {
						width: "40px",
						height: "1px"
					},
					initial: {
						scaleX: 0,
						opacity: 0
					},
					animate: isInView ? {
						scaleX: 1,
						opacity: 1
					} : {
						scaleX: 0,
						opacity: 0
					},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .6,
						delay: words.length * .048 + .1,
						ease: EASE_OUT$2
					}
				})
			]
		})
	});
}
//#endregion
//#region src/components/about/WhoWeAre.tsx
var EASE_OUT$1 = [
	.16,
	1,
	.3,
	1
];
var STATS = [
	{
		value: "10+",
		label: "Years"
	},
	{
		value: "15+",
		label: "Events / Year"
	},
	{
		value: "50+",
		label: "Avg. Attendance / Event"
	}
];
function WhoWeAre() {
	const prefersReduced = useReducedMotion();
	const sectionRef = useRef(null);
	const textRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"]
	});
	const img1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
	const img2Y = useTransform(scrollYProgress, [0, 1], [20, -90]);
	const isInViewHook = useInView(textRef, {
		once: true,
		margin: "-10% 0px"
	});
	const isInView = prefersReduced ? true : isInViewHook;
	return /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "relative z-[1] bg-asu-ivory py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden",
		children: /* @__PURE__ */ jsx("div", {
			className: "max-w-[1280px] mx-auto",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "relative flex justify-center lg:justify-start",
					style: { paddingBottom: "5rem" },
					children: [
						/* @__PURE__ */ jsx(motion.div, {
							className: "relative z-10 w-full max-w-xs md:max-w-sm",
							style: { y: prefersReduced ? 0 : img1Y },
							children: /* @__PURE__ */ jsx("img", {
								src: "/images/aboutUs/3x4portrait.webp",
								alt: "ASU members at a community event",
								className: "w-full rounded-lg object-cover shadow-[0_8px_40px_rgba(30,28,18,0.12)]",
								style: { aspectRatio: "3/4" },
								decoding: "async"
							})
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "absolute z-20 w-48 md:w-64",
							style: {
								bottom: 0,
								right: "0%",
								rotate: 4,
								y: prefersReduced ? 0 : img2Y
							},
							children: /* @__PURE__ */ jsx("img", {
								src: "/images/aboutUs/4x3.webp",
								alt: "ASU cultural celebration",
								className: "w-full rounded-lg object-cover shadow-[0_12px_48px_rgba(30,28,18,0.18)]",
								style: { aspectRatio: "4/3" },
								decoding: "async"
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "absolute top-8 -left-4 w-3 h-3 rounded-full bg-asu-gold opacity-60",
							"aria-hidden": "true"
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					ref: textRef,
					children: [
						/* @__PURE__ */ jsxs(motion.div, {
							className: "flex items-center gap-4 mb-6",
							initial: {
								opacity: 0,
								x: 24
							},
							animate: isInView ? {
								opacity: 1,
								x: 0
							} : {
								opacity: 0,
								x: 24
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .6,
								ease: EASE_OUT$1
							},
							children: [/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-asu-red" }), /* @__PURE__ */ jsx("p", {
								className: "font-ui text-[11px] font-bold tracking-[0.2em] uppercase text-asu-red",
								children: "Who We Are"
							})]
						}),
						/* @__PURE__ */ jsxs(motion.h2, {
							className: "font-display text-asu-dark mb-6 leading-tight",
							style: {
								fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
								letterSpacing: "-0.01em"
							},
							initial: {
								opacity: 0,
								x: 30
							},
							animate: isInView ? {
								opacity: 1,
								x: 0
							} : {
								opacity: 0,
								x: 30
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .7,
								delay: .1,
								ease: EASE_OUT$1
							},
							children: [
								"We aren't just a club, ",
								/* @__PURE__ */ jsx("br", {}),
								"We are a community"
							]
						}),
						/* @__PURE__ */ jsxs(motion.div, {
							className: "space-y-4",
							initial: {
								opacity: 0,
								x: 24
							},
							animate: isInView ? {
								opacity: 1,
								x: 0
							} : {
								opacity: 0,
								x: 24
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .7,
								delay: .2,
								ease: EASE_OUT$1
							},
							children: [/* @__PURE__ */ jsx("p", {
								className: "font-body text-body-lg leading-relaxed text-asu-dark opacity-80",
								children: "The Asian Student Union (ASU) at Iowa State University is a student-led organization dedicated to building an inclusive community for Asian and Asian-American students."
							}), /* @__PURE__ */ jsx("p", {
								className: "font-body text-body-lg leading-relaxed text-asu-dark opacity-80",
								children: "We bring our community together through many different types of events. Members can expect to enjoy many different types of events such as engaging general body meetings (GBMs), food fundraisers, cultural showcases, professional development events, and more!"
							})]
						}),
						/* @__PURE__ */ jsx(motion.div, {
							className: "flex gap-10 mt-12 pt-10 border-t border-asu-beige",
							initial: {
								opacity: 0,
								y: 16
							},
							animate: isInView ? {
								opacity: 1,
								y: 0
							} : {
								opacity: 0,
								y: 16
							},
							transition: prefersReduced ? { duration: 0 } : {
								duration: .6,
								delay: .34,
								ease: EASE_OUT$1
							},
							children: STATS.map((stat) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
								className: "font-display text-asu-red leading-none mb-1",
								style: { fontSize: "clamp(1.75rem, 3vw, 2.5rem)" },
								children: stat.value
							}), /* @__PURE__ */ jsx("p", {
								className: "font-ui text-xs tracking-[0.12em] uppercase text-asu-muted",
								children: stat.label
							})] }, stat.label))
						})
					]
				})]
			})
		})
	});
}
//#endregion
//#region src/components/about/ValuesSection.tsx
var EASE_OUT = [
	.16,
	1,
	.3,
	1
];
var VALUES = [
	{
		num: "01",
		name: "Community",
		desc: "Building authentic bonds across different backgrounds, ages, and interests."
	},
	{
		num: "02",
		name: "Inclusivity",
		desc: "Honoring and celebrating the richness and diversity of Asian heritage."
	},
	{
		num: "03",
		name: "Connection",
		desc: "Encouraging social connection, breaking down barriers and forming life-long friendships."
	},
	{
		num: "04",
		name: "Understanding",
		desc: "Striving to accept and learn others' backgrounds, cultures, and identities."
	}
];
function ValuesSection() {
	const prefersReduced = useReducedMotion();
	const ref = useRef(null);
	const isInViewHook = useInView(ref, {
		once: true,
		margin: "-10% 0px"
	});
	const isInView = prefersReduced ? true : isInViewHook;
	return /* @__PURE__ */ jsx("section", {
		className: "relative z-[1] bg-asu-dark py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-[1280px] mx-auto",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-20 md:mb-24",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					className: "flex flex-col items-center",
					initial: {
						opacity: 0,
						y: 16
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {
						opacity: 0,
						y: 16
					},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .6,
						ease: EASE_OUT
					},
					children: [/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-asu-gold mb-5" }), /* @__PURE__ */ jsx("p", {
						className: "font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold mb-5",
						children: "What We Stand For"
					})]
				}), /* @__PURE__ */ jsx(motion.h2, {
					className: "font-display text-asu-cream leading-tight",
					style: {
						fontSize: "clamp(2.5rem, 5vw, 4rem)",
						letterSpacing: "-0.02em"
					},
					initial: {
						opacity: 0,
						y: 24
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {
						opacity: 0,
						y: 24
					},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .7,
						delay: .1,
						ease: EASE_OUT
					},
					children: "Our Values"
				})]
			}), /* @__PURE__ */ jsx("div", {
				ref,
				className: "grid grid-cols-1 md:grid-cols-2 gap-px bg-asu-espresso",
				children: VALUES.map((val, i) => /* @__PURE__ */ jsxs(motion.div, {
					className: "bg-asu-dark p-10 md:p-14 group cursor-default",
					initial: {
						opacity: 0,
						y: 40
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {
						opacity: 0,
						y: 40
					},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .7,
						delay: i * .14,
						ease: EASE_OUT
					},
					whileHover: prefersReduced ? {} : {
						backgroundColor: "#241611",
						transition: { duration: .25 }
					},
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "font-display text-asu-red opacity-60 mb-4 leading-none group-hover:opacity-100 transition-opacity duration-300",
							style: { fontSize: "clamp(2rem, 4vw, 3rem)" },
							"aria-hidden": "true",
							children: val.num
						}),
						/* @__PURE__ */ jsx("div", { className: "w-8 h-px bg-asu-gold mb-6 opacity-50 group-hover:opacity-100 group-hover:w-14 transition-all duration-400" }),
						/* @__PURE__ */ jsx("h3", {
							className: "font-display text-asu-cream mb-3 leading-tight",
							style: { fontSize: "clamp(1.5rem, 2.5vw, 2rem)" },
							children: val.name
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-body text-sm leading-relaxed",
							style: { color: "rgba(252,238,201,0.55)" },
							children: val.desc
						})
					]
				}, val.num))
			})]
		})
	});
}
//#endregion
//#region src/pages/about.astro
var about_exports = /* @__PURE__ */ __exportAll({
	default: () => $$About,
	file: () => $$file,
	url: () => $$url
});
var $$About = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "About Us — Asian Student Union @ Iowa State University",
		"description": "Learn about the Asian Student Union at Iowa State — our mission, values, and the community we've built together."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="relative">${renderComponent($$result, "PageRibbons", PageRibbons, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/about/PageRibbons.tsx",
		"client:component-export": "PageRibbons"
	})}${renderComponent($$result, "AboutHero", AboutHero, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/about/AboutHero.tsx",
		"client:component-export": "AboutHero"
	})}${renderComponent($$result, "MissionReveal", MissionReveal, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/about/MissionReveal.tsx",
		"client:component-export": "MissionReveal"
	})}${renderComponent($$result, "WhoWeAre", WhoWeAre, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/about/WhoWeAre.tsx",
		"client:component-export": "WhoWeAre"
	})}${renderComponent($$result, "ValuesSection", ValuesSection, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/about/ValuesSection.tsx",
		"client:component-export": "ValuesSection"
	})}<section class="relative z-[1] bg-asu-ivory py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"><div class="max-w-[1280px] mx-auto"><div class="max-w-xl"><div class="flex items-center gap-4 mb-5"><div class="w-8 h-px bg-asu-red"></div><p class="font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-red">Join the Family</p></div><h2 class="font-display text-asu-dark mb-6 leading-tight" style="font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: -0.02em;">Become part of the community.</h2><p class="font-body text-lg leading-relaxed mb-12 text-asu-dark opacity-70" style="max-width: 44ch;">Interested in joining ASU? Learn more about joining and follow us on our socials below!</p><div class="flex flex-col sm:flex-row gap-4"><a href="/join/stuorg" class="inline-flex items-center justify-center px-9 py-4 bg-asu-red text-asu-cream font-ui font-semibold rounded transition-colors duration-200 hover:bg-asu-red-hover cursor-pointer">Join ASU</a><a href="/connect/socials" class="inline-flex items-center justify-center px-9 py-4 border border-asu-dark text-asu-dark font-ui font-semibold rounded transition-colors duration-200 hover:bg-asu-dark hover:text-asu-cream cursor-pointer">Follow Us</a></div></div></div></section></main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/about.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/about.astro";
var $$url = "/about";
//#endregion
//#region \0virtual:astro:page:src/pages/about@_@astro
var page = () => about_exports;
//#endregion
export { page };
