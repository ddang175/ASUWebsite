import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { g as addAttribute, i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_YS8GGEOw.mjs";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/home/PolaroidCard.tsx
var OFF_X = 2400;
var OFF_Y = 1600;
var FLY_IN_EASE = [
	.16,
	1,
	.3,
	1
];
var FLY_OFF_EASE = [
	.7,
	0,
	.84,
	0
];
function PolaroidCard({ title, date, imageSrc, imageAlt, gradient, finalRotation, initialRotation, entryX, entryY, delay = 0, positionStyle, animateVariant, compressedX = 0, compressedY = 0, compressedRotation, innerScale = 1 }) {
	const isFirstRender = useRef(true);
	useEffect(() => {
		isFirstRender.current = false;
	}, []);
	const prevVariant = useRef(animateVariant);
	const wasHidden = prevVariant.current !== "visible";
	prevVariant.current = animateVariant;
	const comingFromHidden = !isFirstRender.current && animateVariant === "visible" && wasHidden;
	const useThrowTiming = isFirstRender.current || comingFromHidden;
	const hiddenVariants = {
		hiddenLeft: {
			x: -2400,
			y: 0,
			rotate: initialRotation,
			scale: 1.12,
			opacity: 0,
			transition: {
				duration: .55,
				ease: FLY_OFF_EASE,
				opacity: {
					duration: .22,
					ease: "easeIn"
				}
			}
		},
		hiddenRight: {
			x: OFF_X,
			y: 0,
			rotate: initialRotation,
			scale: 1.12,
			opacity: 0,
			transition: {
				duration: .55,
				ease: FLY_OFF_EASE,
				opacity: {
					duration: .22,
					ease: "easeIn"
				}
			}
		},
		hiddenTop: {
			x: 0,
			y: -1600,
			rotate: initialRotation,
			scale: 1.12,
			opacity: 0,
			transition: {
				duration: .55,
				ease: FLY_OFF_EASE,
				opacity: {
					duration: .22,
					ease: "easeIn"
				}
			}
		},
		hiddenBottom: {
			x: 0,
			y: OFF_Y,
			rotate: initialRotation,
			scale: 1.12,
			opacity: 0,
			transition: {
				duration: .55,
				ease: FLY_OFF_EASE,
				opacity: {
					duration: .22,
					ease: "easeIn"
				}
			}
		}
	};
	const animateTarget = animateVariant !== "visible" ? animateVariant : {
		x: compressedX,
		y: compressedY,
		rotate: compressedRotation ?? finalRotation,
		scale: 1,
		opacity: 1,
		transition: useThrowTiming ? {
			duration: .85,
			ease: FLY_IN_EASE,
			delay,
			opacity: {
				duration: .18,
				ease: "easeOut",
				delay
			}
		} : {
			duration: .25,
			ease: FLY_IN_EASE
		}
	};
	return /* @__PURE__ */ jsx(motion.div, {
		initial: {
			x: entryX,
			y: entryY,
			rotate: initialRotation,
			scale: 1.12,
			opacity: 0
		},
		animate: animateTarget,
		variants: hiddenVariants,
		whileHover: {
			y: (compressedY ?? 0) - 8,
			transition: {
				type: "spring",
				stiffness: 280,
				damping: 22
			}
		},
		style: {
			position: "absolute",
			willChange: "transform",
			...positionStyle
		},
		className: "cursor-default select-none",
		children: /* @__PURE__ */ jsxs("div", {
			className: "bg-asu-cream rounded p-3 md:p-4",
			style: {
				paddingBottom: "2.5rem",
				boxShadow: "0px 6px 24px rgba(30, 28, 18, 0.12)",
				transform: innerScale !== 1 ? `scale(${innerScale.toFixed(4)})` : void 0
			},
			children: [/* @__PURE__ */ jsx("div", {
				className: "rounded-[2px] overflow-hidden bg-asu-beige",
				children: imageSrc ? /* @__PURE__ */ jsx("img", {
					src: imageSrc,
					alt: imageAlt || title,
					className: "block h-50 md:h-55 w-auto",
					decoding: "async"
				}) : /* @__PURE__ */ jsx("div", {
					className: "h-40 md:h-48 aspect-square",
					style: { background: gradient ?? "linear-gradient(135deg, #FCEEC9, #E8C66A)" },
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "mt-1.5",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-marker text-[25px] md:text-[25px] leading-tight text-asu-dark truncate",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "font-marker text-[18px] md:text-[18px] leading-tight text-asu-dark opacity-50 mt-[3px] truncate",
					children: date
				})]
			})]
		})
	});
}
//#endregion
//#region src/components/home/PolaroidGrid.tsx
var THRESHOLDS = {
	width: {
		hideOuterAt: 1500,
		hideMiddleAt: 1788,
		hideAllAt: 1050
	},
	height: {
		hideTopCenterAt: 1e3,
		hideOuterAt: 820,
		hideMiddleAt: 650,
		hideAllAt: 550
	}
};
var LARGE_SCREEN = {
	transitionStart: 1920,
	transitionEnd: 2560,
	cardScaleMax: 1.35,
	logoScaleMax: 1.28,
	extraSpreadX: 80,
	extraSpreadY: 60,
	gridHeightBonus: 180,
	outerSpreadFraction: .7,
	middleSpreadFraction: .35
};
var LOGO_HALF_WIDTH_DESKTOP = 250;
var ENTRY_OFFSETS = {
	left: {
		x: -2400,
		y: 0
	},
	right: {
		x: 2400,
		y: 0
	},
	top: {
		x: 0,
		y: -1600
	},
	bottom: {
		x: 0,
		y: 1600
	}
};
var POLAROIDS = [
	{
		title: "Halloween GBM",
		date: "Oct. 30th, 2025",
		imageSrc: "/images/polaroidImages/halloween.webp",
		gradient: "linear-gradient(135deg, #E5291E, #B51F17)",
		position: {
			top: "0%",
			left: "0%"
		},
		finalRotation: 10,
		initialRotation: 28,
		entryDirection: "left",
		delay: .05,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "top",
			flyOffDirection: "left"
		},
		compressedOffset: (w) => ({
			x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
			y: 0
		}),
		compressedRotation: 8
	},
	{
		title: "Welcome Back GBM",
		date: "Sept. 3rd, 2025",
		imageSrc: "/images/polaroidImages/kickOff.webp",
		gradient: "linear-gradient(125deg, #241611, #5A2119)",
		position: {
			top: "14%",
			left: "16%"
		},
		finalRotation: -4,
		initialRotation: 24,
		entryDirection: "left",
		delay: .17,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "middle",
			flyOffDirection: "left"
		}
	},
	{
		title: "InnovAsian",
		date: "Apr. 4th, 2026",
		imageSrc: "/images/polaroidImages/innoAll.webp",
		gradient: "linear-gradient(150deg, #FCEEC9, #E8C66A)",
		position: {
			top: "50%",
			left: "0%"
		},
		finalRotation: 6,
		initialRotation: 32,
		entryDirection: "left",
		delay: .1,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "middle",
			flyOffDirection: "left"
		},
		compressedOffset: (w) => ({
			x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
			y: 0
		}),
		compressedRotation: 5
	},
	{
		title: "Kickoff GBM",
		imageSrc: "/images/polaroidImages/iceCreamSocial.webp",
		date: "Sept. 19th, 2025",
		gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
		position: {
			top: "58%",
			left: "17%",
			zIndex: "20"
		},
		finalRotation: -17,
		initialRotation: 30,
		entryDirection: "left",
		delay: .25,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "middle",
			flyOffDirection: "left"
		}
	},
	{
		title: "Career Fair Prep & Success GBM",
		date: "Feb. 5th, 2026",
		imageSrc: "/images/polaroidImages/proDev.webp",
		gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
		position: {
			top: "95%",
			left: "2%"
		},
		finalRotation: -15,
		initialRotation: 30,
		entryDirection: "left",
		delay: .02,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "bottom",
			flyOffDirection: "left"
		},
		compressedOffset: (w) => ({
			x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2 - .02 * w),
			y: 0
		}),
		compressedRotation: -12
	},
	{
		title: "ASU K-Pop Dance at ICF",
		date: "Nov. 9th, 2025",
		imageSrc: "/images/polaroidImages/go.webp",
		gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
		position: {
			top: "103%",
			left: "18%"
		},
		finalRotation: 11,
		initialRotation: 30,
		entryDirection: "left",
		delay: .2,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "bottom",
			flyOffDirection: "left"
		}
	},
	{
		title: "Drink Fundraiser",
		date: "Oct. 9th, 2025",
		imageSrc: "/images/polaroidImages/drinkFundraiser.webp",
		gradient: "linear-gradient(135deg, #E5291E, #FCEEC9)",
		position: {
			top: "-10%",
			left: "33%"
		},
		finalRotation: 6,
		initialRotation: -22,
		entryDirection: "top",
		delay: .08,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "top-center",
			flyOffDirection: "top"
		}
	},
	{
		title: "ASU K-Pop Dance",
		imageSrc: "/images/polaroidImages/asuDance.webp",
		date: "Apr. 3rd, 2026",
		gradient: "linear-gradient(145deg, #5C0D0A, #E5291E)",
		position: {
			top: "-10%",
			left: "50%"
		},
		finalRotation: -5,
		initialRotation: -20,
		entryDirection: "bottom",
		delay: .23,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "top-center",
			flyOffDirection: "bottom"
		}
	},
	{
		title: "ASU Games GBM",
		date: "Apr. 30th, 2026",
		gradient: "linear-gradient(135deg, #FAF3E3, #E9E2D2)",
		imageSrc: "/images/polaroidImages/asuGames.webp",
		position: {
			top: "8%",
			right: "19%"
		},
		finalRotation: 8,
		initialRotation: -28,
		entryDirection: "right",
		delay: .13,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "top",
			flyOffDirection: "right"
		}
	},
	{
		title: "Ramen Fundraiser",
		date: "Nov 13th, 2025",
		imageSrc: "/images/polaroidImages/ramen.webp",
		gradient: "linear-gradient(135deg, #1E1C12, #E5291E)",
		position: {
			top: "2%",
			right: "0%"
		},
		finalRotation: -5,
		initialRotation: -32,
		entryDirection: "right",
		delay: .27,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "top",
			flyOffDirection: "right"
		},
		compressedOffset: (w) => ({
			x: Math.min(0, -((w / 2 - LOGO_HALF_WIDTH_DESKTOP - 362) / 2)),
			y: 0
		}),
		compressedRotation: -3
	},
	{
		title: "Mocktail Mania GBM",
		imageSrc: "/images/polaroidImages/mocktail.webp",
		date: "Sept. 20th, 2024",
		gradient: "linear-gradient(125deg, #B51F17, #5C0D0A)",
		position: {
			top: "53%",
			right: "18%"
		},
		finalRotation: 7,
		initialRotation: -35,
		entryDirection: "right",
		delay: .04,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "middle",
			flyOffDirection: "right"
		}
	},
	{
		title: "1 + 1 Boba Fundraiser",
		imageSrc: "/images/polaroidImages/1p1.webp",
		date: "Feb. 18th, 2026",
		gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
		position: {
			top: "45%",
			right: "0%"
		},
		finalRotation: -10,
		initialRotation: -24,
		entryDirection: "right",
		delay: .15,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "middle",
			flyOffDirection: "right"
		},
		compressedOffset: (w) => ({
			x: Math.min(0, -((w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2)),
			y: 0
		}),
		compressedRotation: -8
	},
	{
		title: "Ledges Social",
		date: "Oct. 18th, 2025",
		imageSrc: "/images/polaroidImages/ledges.webp",
		gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
		position: {
			top: "95%",
			right: "1%"
		},
		finalRotation: 15,
		initialRotation: -54,
		entryDirection: "right",
		delay: 0,
		responsiveVisibility: {
			horizontalGroup: "outer",
			verticalGroup: "bottom",
			flyOffDirection: "right"
		},
		compressedOffset: (w) => ({
			x: Math.min(0, .01 * w - (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
			y: 0
		}),
		compressedRotation: 12
	},
	{
		title: "Triple Play GBM",
		date: "Apr 26th, 2025",
		imageSrc: "/images/polaroidImages/triplePlay.webp",
		gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
		position: {
			top: "102%",
			right: "17%"
		},
		finalRotation: -10,
		initialRotation: -54,
		entryDirection: "right",
		delay: .18,
		responsiveVisibility: {
			horizontalGroup: "middle",
			verticalGroup: "bottom",
			flyOffDirection: "right"
		}
	}
];
function useWindowSize() {
	const [size, setSize] = useState({
		width: 0,
		height: 0
	});
	useLayoutEffect(() => {
		setSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}, []);
	useEffect(() => {
		let raf = null;
		function onResize() {
			if (raf !== null) return;
			raf = requestAnimationFrame(() => {
				setSize({
					width: window.innerWidth,
					height: window.innerHeight
				});
				raf = null;
			});
		}
		window.addEventListener("resize", onResize, { passive: true });
		return () => {
			window.removeEventListener("resize", onResize);
			if (raf !== null) cancelAnimationFrame(raf);
		};
	}, []);
	return size;
}
function getAnimateVariant(card, width, height) {
	if (width === 0 || height === 0) return "visible";
	const { horizontalGroup, verticalGroup, flyOffDirection } = card.responsiveVisibility;
	const tw = THRESHOLDS.width;
	const th = THRESHOLDS.height;
	const hiddenByWidth = width < tw.hideAllAt || width < tw.hideMiddleAt && (horizontalGroup === "inner" || horizontalGroup === "middle") || width < tw.hideOuterAt && horizontalGroup === "inner";
	const hiddenByHeight = height < th.hideAllAt || height < th.hideOuterAt && (verticalGroup === "top" || verticalGroup === "bottom") || height < th.hideTopCenterAt && verticalGroup === "top-center";
	if (!hiddenByWidth && !hiddenByHeight) return "visible";
	switch (flyOffDirection) {
		case "left": return "hiddenLeft";
		case "right": return "hiddenRight";
		case "top": return "hiddenTop";
		case "bottom": return "hiddenBottom";
	}
}
function PolaroidGrid() {
	const { width, height } = useWindowSize();
	const isCompressed = width > 0 && width < THRESHOLDS.width.hideMiddleAt && width >= THRESHOLDS.width.hideAllAt;
	const largeProgress = width > 0 ? Math.min(1, Math.max(0, (width - LARGE_SCREEN.transitionStart) / (LARGE_SCREEN.transitionEnd - LARGE_SCREEN.transitionStart))) : 0;
	const containerMargin = Math.max(0, (width - 1920) / 2);
	const computedCardScale = 1 + (LARGE_SCREEN.cardScaleMax - 1) * largeProgress;
	const computedLogoScale = 1 + (LARGE_SCREEN.logoScaleMax - 1) * largeProgress;
	const isMobile = width > 0 && width < 768;
	const gridMaxH = isMobile ? 380 : Math.round(780 + LARGE_SCREEN.gridHeightBonus * largeProgress);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative w-full overflow-visible",
		style: { height: isMobile ? `clamp(300px, 46dvh, ${gridMaxH}px)` : `clamp(520px, 70vh, ${gridMaxH}px)` },
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute",
			style: {
				top: isMobile ? "62%" : "68%",
				left: "50%",
				transform: isMobile ? `translate(-50%, -50%) scale(1.6)` : `translate(-50%, -50%) scale(${computedLogoScale.toFixed(4)})`,
				zIndex: 0
			},
			children: /* @__PURE__ */ jsx("img", {
				src: "/images/asu-logo.webp",
				alt: "Asian Student Union",
				style: isMobile ? { width: "100vw" } : void 0,
				className: "md:w-125 h-auto select-none pointer-events-none",
				decoding: "async",
				draggable: false
			})
		}), POLAROIDS.map((card, i) => {
			const { x: entryX, y: entryY } = ENTRY_OFFSETS[card.entryDirection];
			const animateVariant = getAnimateVariant(card, width, height);
			const applyCompression = isCompressed && card.compressedOffset != null && animateVariant === "visible";
			const offset = applyCompression ? card.compressedOffset(width) : null;
			const compressedX = offset?.x ?? 0;
			const compressedY = offset?.y ?? 0;
			const compressedRotation = applyCompression ? card.compressedRotation : void 0;
			let effectivePosition = card.position;
			if (largeProgress > 0) {
				const { flyOffDirection, horizontalGroup, verticalGroup } = card.responsiveVisibility;
				const hFraction = horizontalGroup === "outer" ? LARGE_SCREEN.outerSpreadFraction : horizontalGroup === "middle" ? LARGE_SCREEN.middleSpreadFraction : 0;
				const hDelta = (containerMargin + LARGE_SCREEN.extraSpreadX) * largeProgress * hFraction;
				const vFraction = horizontalGroup === "outer" ? 1 : horizontalGroup === "middle" ? .5 : 0;
				const vDelta = LARGE_SCREEN.extraSpreadY * largeProgress * vFraction;
				const overrides = {};
				if (hDelta > .5) {
					if (flyOffDirection === "left" && card.position.left != null) overrides.left = `calc(${card.position.left} - ${hDelta.toFixed(1)}px)`;
					else if (flyOffDirection === "right" && card.position.right != null) overrides.right = `calc(${card.position.right} - ${hDelta.toFixed(1)}px)`;
				}
				if (vDelta > .5 && card.position.top != null && verticalGroup === "top") overrides.top = `calc(${card.position.top} - ${vDelta.toFixed(1)}px)`;
				if (Object.keys(overrides).length > 0) effectivePosition = {
					...card.position,
					...overrides
				};
			}
			return /* @__PURE__ */ jsx(PolaroidCard, {
				title: card.title,
				date: card.date,
				imageSrc: card.imageSrc,
				imageAlt: card.imageAlt,
				gradient: card.gradient,
				finalRotation: card.finalRotation,
				initialRotation: card.initialRotation,
				entryX,
				entryY,
				delay: card.delay,
				positionStyle: effectivePosition,
				animateVariant,
				compressedX,
				compressedY,
				compressedRotation,
				innerScale: computedCardScale
			}, i);
		})]
	});
}
//#endregion
//#region src/components/home/Hero.astro
var $$Hero = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${maybeRenderHead($$result)}<section class="relative bg-asu-ivory flex flex-col overflow-x-clip min-[2000px]:pb-40 min-[1920px]:pb-15" style="min-height: calc(100dvh - 4rem);"><!--
    Inner wrapper caps the composition at 1920px on ultra-wide / 4K screens.
    The section background fills the full viewport width; only the content zone
    is constrained. Below 1920px this wrapper is 100% width — no visual change.
    Above 1920px the cards stay in the same positions they have at 1920p.
  --><div class="relative flex flex-col flex-1 w-full" style="max-width: 1920px; margin-inline: auto;"><!-- 1. Polaroid collage (React island, hydrates on load) -->${renderComponent($$result, "PolaroidGrid", PolaroidGrid, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/home/PolaroidGrid.tsx",
		"client:component-export": "PolaroidGrid"
	})}<!-- 2. Headline + CTA
         pointer-events-none lets overflow polaroid cards (those sitting below the
         container boundary) receive hover events even when this text block visually
         overlaps them. The CTA link re-enables pointer events explicitly. --><div class="flex flex-col items-center justify-center text-center px-8 pt-2 pb-8 flex-1 -translate-y-5 pointer-events-none"><p class="font-ui text-xs font-bold tracking-[0.1em] uppercase text-asu-dark opacity-50 mb-3">Asian Student Union</p><h1 class="font-display text-[3rem] leading-[3.5rem] text-asu-dark" style="letter-spacing: -0.02em;">@ Iowa State University</h1><a href="/about" class="mt-8 inline-flex items-center px-8 py-3 bg-asu-red text-asu-cream font-ui font-semibold text-base rounded transition-colors duration-200 hover:bg-asu-red-hover pointer-events-auto">About Us</a></div></div><!-- 3. Scroll cue — "NEXT EVENT" label + bouncing arrow --><div class="flex flex-col items-center gap-1.5 pb-10 opacity-50"><span class="font-ui text-[14px] font-bold tracking-[0.12em] uppercase text-asu-dark">Next Event</span><svg class="w-5 h-5 text-asu-dark animate-bounce" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3v10M3.5 9l4.5 4.5L12.5 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></div></section>`;
}, "C:/Bench/ASUWebsite/src/components/home/Hero.astro", void 0);
//#endregion
//#region src/lib/fetchEvents.ts
var MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
function ordinal(n) {
	if (n >= 11 && n <= 13) return `${n}th`;
	const rem = n % 10;
	if (rem === 1) return `${n}st`;
	if (rem === 2) return `${n}nd`;
	if (rem === 3) return `${n}rd`;
	return `${n}th`;
}
function parseGvizDate(v) {
	if (typeof v !== "string") return null;
	const m = v.match(/^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/);
	if (!m) return null;
	const year = parseInt(m[1]);
	const month = parseInt(m[2]);
	const day = parseInt(m[3]);
	const hours = m[4] !== void 0 ? parseInt(m[4]) : 0;
	const mins = m[5] !== void 0 ? parseInt(m[5]) : 0;
	const d = new Date(year, month, day, hours, mins, 0);
	d.setFullYear(year);
	return d;
}
function formatDate(d) {
	return `${MONTH_NAMES[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()}`;
}
function formatTime(d) {
	const h = d.getHours();
	const m = d.getMinutes();
	const period = h >= 12 ? "PM" : "AM";
	const h12 = h % 12 || 12;
	return m === 0 ? `${h12} ${period}` : `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}
function normalizeImageUrl(url) {
	const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
	if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}=w1200`;
	const openMatch = url.match(/drive\.google\.com\/open\?id=([^&\s]+)/);
	if (openMatch) return `https://lh3.googleusercontent.com/d/${openMatch[1]}=w1200`;
	return url;
}
async function localizeExternalImage(url) {
	if (!url.startsWith("http")) return url;
	try {
		const { writeFileSync, mkdirSync } = await import("node:fs");
		const { join } = await import("node:path");
		const res = await fetch(url);
		if (!res.ok) return url;
		const contentType = res.headers.get("content-type") ?? "";
		const filename = `event-cover.${contentType.includes("png") ? "png" : contentType.includes("webp") ? "webp" : "jpg"}`;
		const targetDir = join(process.cwd(), "dist", "images", "events");
		mkdirSync(targetDir, { recursive: true });
		writeFileSync(join(targetDir, filename), Buffer.from(await res.arrayBuffer()));
		return `/images/events/${filename}`;
	} catch {
		return url;
	}
}
function isSafeHttpsUrl(url) {
	if (!url) return false;
	try {
		return new URL(url).protocol === "https:";
	} catch {
		return false;
	}
}
async function fetchUpcomingEvent(sheetId) {
	try {
		const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&headers=1`;
		const res = await fetch(endpoint);
		if (!res.ok) return null;
		const text = await res.text();
		const start = text.indexOf("{");
		const end = text.lastIndexOf("}");
		if (start === -1 || end === -1) return null;
		const json = JSON.parse(text.slice(start, end + 1));
		if (json.status !== "ok") return null;
		const { cols, rows } = json.table;
		if (!rows || rows.length === 0) return null;
		const colIndex = {};
		cols.forEach((col, i) => {
			const key = col.label.toLowerCase().trim().replace(/\s+/g, "_");
			colIndex[key] = i;
		});
		const row = rows[0].c;
		const rawCell = (key) => {
			const i = colIndex[key];
			if (i === void 0 || i >= row.length) return null;
			const cell = row[i];
			if (!cell || cell.v === null || cell.v === void 0) return null;
			return cell.v;
		};
		const get = (key) => {
			const v = rawCell(key);
			if (v === null || v === void 0) return "";
			if (typeof v === "string" && v.startsWith("Date(")) return "";
			return v.toString().trim();
		};
		const getDate = (key) => {
			const v = rawCell(key);
			if (v === null || v === void 0) return "";
			const parsed = parseGvizDate(v);
			if (parsed) return formatDate(parsed);
			return v.toString().trim();
		};
		const getTime = (key) => {
			const v = rawCell(key);
			if (v === null || v === void 0) return "";
			const parsed = parseGvizDate(v);
			if (parsed) return formatTime(parsed);
			return v.toString().trim();
		};
		const rawImage = get("image_url");
		const tags = get("tags").split(",").map((t) => t.trim()).filter(Boolean);
		const imageUrl = rawImage ? await localizeExternalImage(normalizeImageUrl(rawImage)) : "";
		const rawRsvp = get("rsvp_url");
		const rsvpUrl = isSafeHttpsUrl(rawRsvp) ? rawRsvp : null;
		return {
			title: get("title") || "Event Title TBA",
			date: getDate("date") || "Date TBA",
			startTime: getTime("start_time"),
			endTime: getTime("end_time"),
			location: get("location") || "Location TBA",
			description: get("description") || "Details coming soon.",
			imageUrl,
			collab: get("collab") || null,
			rsvpUrl,
			tags
		};
	} catch {
		return null;
	}
}
var events_default = { upcoming: {
	"title": "No Upcoming Event",
	"date": null,
	"startTime": null,
	"endTime": null,
	"location": null,
	"description": "There are no upcoming events announced at this time. Check back soon for updates from Asian Student Union.",
	"imageUrl": null,
	"collab": null,
	"rsvpUrl": null,
	"tags": ["Coming Soon"]
} };
//#endregion
//#region src/components/home/NextEventSection.astro
var $$NextEventSection = createComponent(async ($$result, $$props, $$slots) => {
	const sheetId = "1Fn0-KCtqmyzFO8vammf0jeLFPgxuSzw5vO97NsazV6Q";
	let event = null;
	event = await fetchUpcomingEvent(sheetId);
	if (!event) {
		const fb = events_default.upcoming;
		event = {
			title: fb.title,
			date: fb.date,
			startTime: fb.startTime,
			endTime: fb.endTime,
			location: fb.location,
			description: fb.description,
			imageUrl: fb.imageUrl,
			collab: fb.collab,
			rsvpUrl: fb.rsvpUrl,
			tags: fb.tags
		};
	}
	const timeStr = event.startTime ? event.endTime ? `${event.startTime} – ${event.endTime}` : event.startTime : "";
	return renderTemplate`${maybeRenderHead($$result)}<section class="bg-asu-ivory py-24 px-8 md:px-16"><div class="max-w-[1280px] mx-auto"><!-- Section label --><p class="font-ui text-xs font-bold tracking-[0.1em] uppercase text-asu-red mb-5">Upcoming Event</p><!-- Two-column layout: large image left, event details right --><div class="flex flex-col lg:flex-row gap-12 xl:gap-16 items-start"><!-- ── LEFT: Event image card ────────────────────────────────────── --><div class="w-full lg:w-[440px] xl:w-[500px] shrink-0"><div class="bg-asu-cream rounded p-3 md:p-4" style="padding-bottom: 1.75rem; box-shadow: 0px 8px 36px rgba(30, 28, 18, 0.13);"><!-- Photo --><div class="rounded-[2px] overflow-hidden bg-asu-beige">${event.imageUrl ? renderTemplate`<img${addAttribute(event.imageUrl, "src")}${addAttribute(event.title, "alt")} class="block w-full h-[300px] md:h-[360px] xl:h-[400px] object-cover" decoding="async">` : renderTemplate`<div class="w-full h-[300px] md:h-[360px] xl:h-[400px]" style="background: linear-gradient(135deg, #FCEEC9, #E8C66A);" aria-hidden="true"></div>`}</div><!-- Caption below image --><div class="mt-2"><p class="font-marker text-[35px] leading-tight text-asu-dark truncate">${event.title}</p><p class="font-marker text-[20px] leading-tight text-asu-dark opacity-50 mt-[3px] truncate">${event.date}${timeStr ? ` · ${timeStr}` : ""}</p></div></div></div><!-- ── RIGHT: Event details ───────────────────────────────────────── --><div class="flex-1 lg:pt-2"><!-- Event title --><h2 class="font-display text-[2rem] md:text-[3rem] leading-tight text-asu-dark mb-6" style="letter-spacing: -0.015em;">${event.title}</h2><!-- Date + time --><div class="flex items-start gap-3 mb-3"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 mt-[1px] text-asu-red"><rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" stroke-width="1.25"></rect><path d="M5 1.5V3.5M11 1.5V3.5M1.5 6H14.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"></path></svg><span class="font-ui text-sm font-medium text-asu-dark">${event.date}${timeStr ? ` · ${timeStr}` : ""}</span></div><!-- Location --><div class="flex items-start gap-3 mb-6"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 mt-[1px] text-asu-red"><path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.51 10.49 1.5 8 1.5Z" stroke="currentColor" stroke-width="1.25"></path><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.25"></circle></svg><span class="font-ui text-sm font-medium text-asu-dark">${event.location}</span></div><!-- Collaboration line (shown only when collab is set) -->${event.collab && renderTemplate`<div class="flex items-center gap-3 mb-6 px-4 py-2.5 rounded" style="background: rgba(232, 198, 106, 0.22);"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" class="shrink-0 text-asu-dark opacity-60"><path d="M2 10.5C2 9.12 3.12 8 4.5 8H6M10 8H11.5C12.88 8 14 9.12 14 10.5V13H2V10.5Z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"></path><circle cx="5" cy="4.5" r="2" stroke="currentColor" stroke-width="1.25"></circle><circle cx="11" cy="4.5" r="2" stroke="currentColor" stroke-width="1.25"></circle></svg><span class="font-ui text-sm font-medium text-asu-dark">In collaboration with <strong>${event.collab}</strong></span></div>`}<!-- Description --><p class="font-body text-base text-asu-dark leading-relaxed mb-6 max-w-[560px]" style="opacity: 0.72;">${event.description}</p><!-- Tags (shown only when tags are set) -->${event.tags.length > 0 && renderTemplate`<div class="flex flex-wrap gap-2 mb-8">${event.tags.map((tag) => renderTemplate`<span class="font-ui text-[11px] font-semibold tracking-[0.04em] px-3 py-1 rounded-full text-asu-dark" style="background: rgba(232, 198, 106, 0.28);">${tag}</span>`)}</div>`}<!-- RSVP button (shown only when rsvpUrl is set) -->${event.rsvpUrl && renderTemplate`<a${addAttribute(event.rsvpUrl, "href")} class="inline-flex items-center px-8 py-3 bg-asu-red text-asu-cream font-ui font-semibold text-base rounded transition-colors duration-200 hover:bg-asu-red-hover">RSVP</a>`}</div></div></div></section>`;
}, "C:/Bench/ASUWebsite/src/components/home/NextEventSection.astro", void 0);
//#endregion
//#region src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
var $$Index = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Asian Student Union @ Iowa State University" }, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="flex-1">${renderComponent($$result, "Hero", $$Hero, {})}${renderComponent($$result, "NextEventSection", $$NextEventSection, {})}</main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/index.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/index.astro";
//#endregion
//#region \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
//#endregion
export { page };
