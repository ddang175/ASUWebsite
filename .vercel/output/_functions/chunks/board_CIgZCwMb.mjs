import { n as __exportAll, t as createComponent } from "./compiler_BbbvFB7Z.mjs";
import { i as renderComponent, m as maybeRenderHead, u as renderTemplate } from "./server_BLE2ae5B.mjs";
import { t as $$Layout } from "./Layout_D7Wv8G-L.mjs";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/components/board/BoardHero.tsx
var EASE_OUT$2 = [
	.18,
	.78,
	.2,
	1
];
var HERO_RIBBON = "M -2000 1060 C -1400 1055, -800 1048, -40 1040 C 360 1080, 640 760, 780 540 C 880 400, 550 400, 600 400 C 220 400, 220 660, 540 720 C 880 780, 1240 620, 1400 520 C 1560 400, 2200 380, 3000 440 C 3800 480, 4500 460, 6000 480";
function BoardHero() {
	const prefersReduced = useReducedMotion();
	const heroRef = useRef(null);
	const { scrollY } = useScroll();
	const bgY = useTransform(scrollY, [0, 800], [0, 220]);
	return /* @__PURE__ */ jsxs("section", {
		ref: heroRef,
		className: "relative w-full overflow-hidden bg-asu-espresso text-asu-cream",
		style: {
			height: "100vh",
			minHeight: 720
		},
		"aria-label": "Meet the team hero",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				className: "absolute inset-0 overflow-hidden",
				style: prefersReduced ? {} : {
					scale: 1.08,
					y: bgY
				},
				children: [/* @__PURE__ */ jsx("img", {
					src: "/images/board/team-photo.webp",
					alt: "",
					className: "w-full h-full object-cover",
					decoding: "async"
				}), /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-asu-espresso" })]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 pointer-events-none",
				style: {
					background: "linear-gradient(180deg, rgba(26,20,16,0.35) 0%, rgba(26,20,16,0.15) 30%, rgba(26,20,16,0.55) 75%, rgba(26,20,16,0.80) 100%)",
					zIndex: 1
				}
			}),
			!prefersReduced && /* @__PURE__ */ jsx("svg", {
				className: "absolute inset-0 w-full h-full pointer-events-none",
				viewBox: "0 0 1920 1080",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				style: { zIndex: 2 },
				children: /* @__PURE__ */ jsx(motion.path, {
					d: HERO_RIBBON,
					fill: "none",
					stroke: "#E5291E",
					strokeWidth: 5,
					strokeLinecap: "round",
					vectorEffect: "non-scaling-stroke",
					opacity: .92,
					initial: { pathLength: 0 },
					animate: { pathLength: 1 },
					transition: {
						duration: 2.4,
						ease: [
							.4,
							0,
							.2,
							1
						],
						delay: .8
					}
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "absolute z-[3] px-8 md:px-[7%]",
				style: {
					bottom: "14%",
					maxWidth: 720
				},
				children: [
					/* @__PURE__ */ jsx(motion.p, {
						className: "font-ui text-[13px] tracking-[0.22em] uppercase mb-[18px]",
						style: { color: "rgba(252,238,201,0.92)" },
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .9,
							ease: EASE_OUT$2,
							delay: .8
						},
						children: "Asian Student Union · Executive Board 2026–27"
					}),
					/* @__PURE__ */ jsxs("h1", {
						className: "font-display leading-none mb-[22px] text-asu-cream",
						style: {
							fontSize: "clamp(4.5rem, 9vw, 9rem)",
							letterSpacing: "-0.005em"
						},
						children: [/* @__PURE__ */ jsx("span", {
							className: "block",
							children: ["Meet", "the"].map((word, i) => /* @__PURE__ */ jsx("span", {
								className: "inline-block overflow-hidden align-top",
								style: { marginRight: "0.18em" },
								children: /* @__PURE__ */ jsx(motion.span, {
									className: "inline-block",
									initial: { y: prefersReduced ? 0 : "110%" },
									animate: { y: 0 },
									transition: prefersReduced ? { duration: 0 } : {
										duration: 1.2,
										ease: EASE_OUT$2,
										delay: .22 + i * .16
									},
									children: word
								})
							}, word))
						}), /* @__PURE__ */ jsx("span", {
							className: "block",
							children: /* @__PURE__ */ jsx("span", {
								className: "inline-block overflow-hidden align-top",
								children: /* @__PURE__ */ jsx(motion.span, {
									className: "inline-block",
									initial: { y: prefersReduced ? 0 : "110%" },
									animate: { y: 0 },
									transition: prefersReduced ? { duration: 0 } : {
										duration: 1.2,
										ease: EASE_OUT$2,
										delay: .54
									},
									children: "Team."
								})
							})
						})]
					}),
					/* @__PURE__ */ jsxs(motion.p, {
						className: "font-body font-light text-[18px] leading-[1.6] text-asu-cream max-w-[460px]",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: .86,
							y: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .9,
							ease: EASE_OUT$2,
							delay: .82
						},
						children: ["The students who keep ASU running by planning every GBM, fundraiser, and social you'll see this year.", /* @__PURE__ */ jsx("span", { className: "block w-14 h-px bg-asu-gold mt-[22px]" })]
					})
				]
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				className: "absolute z-[3] text-center hidden md:block",
				style: {
					right: 56,
					bottom: 36
				},
				initial: { opacity: 0 },
				animate: { opacity: .7 },
				transition: prefersReduced ? { duration: 0 } : {
					duration: 1,
					delay: 1.2
				},
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-ui text-[11px] tracking-[0.3em] uppercase text-asu-cream block mb-2",
					children: "Scroll"
				}), /* @__PURE__ */ jsx(motion.svg, {
					width: "14",
					height: "18",
					viewBox: "0 0 14 18",
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
						d: "M7 1 V15 M2 10 L7 15 L12 10",
						stroke: "#FCEEC9",
						strokeWidth: "1.4",
						strokeLinecap: "round",
						strokeLinejoin: "round"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/components/board/BoardIntro.tsx
var EASE_OUT$1 = [
	.18,
	.7,
	.2,
	1
];
function BoardIntro() {
	const prefersReduced = useReducedMotion();
	const ref = useRef(null);
	const inViewHook = useInView(ref, {
		once: true,
		margin: "-10% 0px"
	});
	const isInView = prefersReduced ? true : inViewHook;
	return /* @__PURE__ */ jsxs("section", {
		ref,
		className: "relative bg-asu-ivory text-center overflow-hidden",
		style: { padding: "140px 56px 0px" },
		children: [/* @__PURE__ */ jsx("div", {
			className: "absolute top-[-2px] left-0 right-0 w-full pointer-events-none",
			style: { height: 140 },
			"aria-hidden": "true",
			children: /* @__PURE__ */ jsxs("svg", {
				width: "100%",
				height: "100%",
				viewBox: "0 0 1920 140",
				preserveAspectRatio: "none",
				children: [/* @__PURE__ */ jsx("path", {
					d: "M 0 0 L 1920 0 L 1920 60 C 1500 110, 1100 30, 700 75 C 380 105, 120 70, 0 90 Z",
					fill: "#1E1C12"
				}), /* @__PURE__ */ jsx(motion.path, {
					d: "M -2000 110 C -1400 108, -800 105, -20 100 C 240 60, 520 130, 820 90 C 1100 56, 1340 120, 1620 80 C 1780 60, 2200 70, 3000 80 C 3800 88, 4500 85, 6000 88",
					fill: "none",
					stroke: "#E5291E",
					strokeWidth: 4.5,
					strokeLinecap: "round",
					vectorEffect: "non-scaling-stroke",
					opacity: .95,
					initial: { pathLength: 0 },
					animate: isInView ? { pathLength: 1 } : { pathLength: 0 },
					transition: prefersReduced ? { duration: 0 } : {
						duration: 2.4,
						ease: [
							.4,
							0,
							.2,
							1
						]
					}
				})]
			})
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 pt-10",
			children: [
				/* @__PURE__ */ jsxs(motion.p, {
					className: "font-ui text-[12px] tracking-[0.25em] uppercase text-asu-red inline-flex items-center gap-3.5",
					initial: {
						opacity: 0,
						y: 36
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .9,
						ease: EASE_OUT$1
					},
					children: [
						/* @__PURE__ */ jsx("span", { className: "w-7 h-px bg-asu-red" }),
						"The Executive Board",
						/* @__PURE__ */ jsx("span", { className: "w-7 h-px bg-asu-red" })
					]
				}),
				/* @__PURE__ */ jsxs(motion.h2, {
					className: "font-display text-asu-dark leading-[1.08] mx-auto mt-5 mb-5",
					style: {
						fontSize: "clamp(2.5rem, 5vw, 4rem)",
						maxWidth: 880
					},
					initial: {
						opacity: 0,
						y: 36
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .9,
						ease: EASE_OUT$1,
						delay: .12
					},
					children: [
						"Get to know the students working",
						/* @__PURE__ */ jsx("br", {}),
						"behind the scenes for ASU!"
					]
				}),
				/* @__PURE__ */ jsxs(motion.div, {
					className: "inline-flex items-center gap-4 font-ui text-[12px] tracking-[0.22em] uppercase text-asu-muted",
					initial: {
						opacity: 0,
						y: 36
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {},
					transition: prefersReduced ? { duration: 0 } : {
						duration: .9,
						ease: EASE_OUT$1,
						delay: .42
					},
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-display text-asu-red",
							style: {
								fontSize: 42,
								lineHeight: 1,
								fontWeight: 400,
								letterSpacing: 0
							},
							children: "11"
						}),
						/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 bg-asu-gold rounded-full" }),
						"Officers · 2025–2026 term"
					]
				})
			]
		})]
	});
}
//#endregion
//#region src/components/board/OfficerRoster.tsx
var EASE_OUT = [
	.18,
	.78,
	.2,
	1
];
function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);
	useLayoutEffect(() => {
		setIsMobile(window.innerWidth < 768);
	}, []);
	useEffect(() => {
		const check = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", check, { passive: true });
		return () => window.removeEventListener("resize", check);
	}, []);
	return isMobile;
}
var OFFICERS = [
	{
		id: "danton",
		role: "President",
		name: "Danton Dang",
		country: "vn",
		countryLabel: "Vietnamese",
		major: "Software Engineering",
		hometown: "Davenport, IA",
		year: "Senior",
		blurb: "Hey everyone! My name is Danton, and I will be your guys' president this year :P I am always open to a fun conversation, so feel free to come up to me at ASU events to talk! Outside of work and school, I love dancing, playing volleyball, hanging out with friends, and learning random things (building up random stats lol). I can't wait to meet everyone and bring you guys a great year!"
	},
	{
		id: "jennifer",
		role: "Vice President",
		name: "Jennifer Tran",
		country: "vn",
		countryLabel: "Vietnamese",
		major: "Accounting",
		hometown: "Bloomington, MN",
		year: "Junior",
		blurb: "Hellooo! My name is Jennifer Tran, but you can also call me Jenni!! When I’m not crying over my accounting homework, you’ll probably find me crocheting, knitting, or raging in Valorant. Aside from my hobbies, joining ASU has been one of the best parts of my college experience. Through ASU, I’ve made amazing memories and met some amazing people. I’ve always admired the E-Board’s hard work and dedication, which is what inspired me to join. I want to help create the same welcoming environment and lasting memories for future members as well!"
	},
	{
		id: "leah",
		role: "Treasurer",
		name: "Leah Mast",
		country: "cn",
		countryLabel: "Chinese",
		major: "Accounting",
		hometown: "Payson, IL",
		year: "Junior",
		blurb: "Hello, my name is Leah! I'm the current treasurer of the Asian Student Union (ASU). I've been a member of the organization since my first year at Iowa State.  ASU has a wonderful community and celebrates Asian cultures, which is how I fell in love with the organization. When I'm not serving as the treasurer at general board meetings, you could catch me serving as the Resident Assistant at Towers, online gaming, or at the library studying!"
	},
	{
		id: "ethan",
		role: "Community Chair",
		name: "Ethan Pham",
		country: "vn",
		countryLabel: "Vietnamese",
		major: "Computer Science",
		hometown: "Sioux City, IA",
		year: "Sophomore",
		blurb: "A little bit more about me is that ASU helped me find my friend group through its community. I hope, as Community Chair, that people can look back and be proud that they were a part of ASU. Outside of ASU, you can find me at hackathons, playing volleyball on the court, or sleeping tbh. Oh, and I once clogged the school's bathroom so hard that it became Snapchat famous."
	},
	{
		id: "olivia",
		role: "Fundraising Chair",
		name: "Olivia Chen",
		country: "cn",
		countryLabel: "Chinese",
		major: "Accounting",
		hometown: "Brooklyn, NY",
		year: "Sophomore",
		blurb: "Hi everyone! My name is Olivia, feel free to call me by whatever! I am going to be ASU's fundraising chair for this year so here's some of my interests! I love to dance and bake, reading the tri-man (manga, manhwa, and manhua) as well as webtoons like Eleceed, Omniscient Reader's Viewpoint, and Heaven's Official Blessing. Live, love, laugh Haikyuu and I love desserts so let me know if any of y'all want to hit up a fire dessert place 😛"
	},
	{
		id: "yukari",
		role: "Multimedia Member",
		name: "Yukari Matsunaga",
		country: "jp",
		countryLabel: "Japanese",
		major: "Interior Design",
		hometown: "Higashikurume, Tokyo",
		year: "Junior",
		blurb: "I’m Yukari Matsunaga from Japan!! My favorite American food is cheese curds. I like singing and going for walks. I have two dogs, and whenever I miss them, I like looking through photos of them. It’s something I do almost every day"
	},
	{
		id: "elle",
		role: "Multimedia Member",
		name: "Elle Chandy",
		country: "la",
		countryLabel: "Laos",
		major: "Fashion Design and Merchandising",
		hometown: "Sioux City, IA",
		year: "Sophomore",
		blurb: "Hey everyone!! My name is Elle Chandy but it’s said like Ellie. I will be a part of your new Multi-Media crew. My interests/hobbies are reading, sewing, gaming, and drawing. Fun Fact, some of the reasons that I joined ASU were the loving environment and amazing E-Board. I hope to try my hardest I can to make ASU the absolute best!!!"
	},
	{
		id: "cathy",
		role: "Multimedia Member",
		name: "Cathy Bui",
		country: "vn",
		countryLabel: "Vietnamese",
		major: "Industrial Engineering",
		hometown: "Davenport, IA",
		year: "Senior",
		blurb: "Hi, I’m Cathy and one of my favorite things to get into is arts and craft! I can crochet, make felt keychains, origami, etc. It’s also how I got interested in my major since I love designing things : )  One of my favorite projects I’ve done is designing a lucky cat inspired diffuser which actually works, yippee. I want to use my expertise in design and make awesome asu merch for everyone!"
	},
	{
		id: "jordan",
		role: "Photography Chair",
		name: "Jordan Nguyen",
		country: "vn",
		countryLabel: "Vietnamese",
		major: "Computer Engineering",
		hometown: "Des Moines, IA",
		year: "Senior",
		blurb: "hi, i'm jordan! i'm a computer engineer with a focus on vlsi design and electrical engineering. i enjoy media production as a hobby and occasionally dabble in video, automotive and portrait work. last school year, i was responsible for photoshoots, portraits, and camera work used for asian student union's media presence to promote and document events and other collaborations with partnered student organizations. my other hobbies include computer-related tech, drawing, and lifting."
	},
	{
		id: "gavin",
		role: "Event Planning Chair",
		name: "Gavin Macanip",
		country: "ph",
		countryLabel: "Filipino",
		major: "Computer Engineering",
		hometown: "Plainfield, IL",
		year: "Sophomore",
		blurb: "Hi! My name is Gavin Macanip, this year’s event planner! I like to climb rocks, kick things (fun fact: I met an olympic athlete cause of this), take photos, and do random side quests. I am an avid Bruno Mars enjoyer and professional yearner too (especially with karaoke 🇵🇭). I love to listen to music and playing it too."
	},
	{
		id: "nathan",
		role: "Outreach Chair",
		name: "Nathan Sison",
		country: "ph",
		countryLabel: "Filipino",
		major: "Finance",
		hometown: "Mount Prospect, IL",
		year: "Sophomore",
		blurb: "Hi there! I'm Nathaniel Sison, but you can just call me Nathan. Let me share a bit about myself. I'm proudly FILIPINO RAAAAH, hailing from the Illinois region, and I'm currently pursuing a degree in Finance. I enjoy a variety of activities, including playing volleyball, singing, and indulging in delicious food. My favorite color is red, and I'm always eager to meet new friends. If you happen to see me around, don't hesitate to come over and say hello — I'm always here to be a friend if you need one."
	}
];
var ROSTER_ITEMS = [
	{
		type: "officer",
		officer: OFFICERS[0],
		officerIndex: 0
	},
	{
		type: "sep",
		key: "sep-0"
	},
	{
		type: "officer",
		officer: OFFICERS[1],
		officerIndex: 1
	},
	{
		type: "sep",
		key: "sep-1"
	},
	{
		type: "officer",
		officer: OFFICERS[2],
		officerIndex: 2
	},
	{
		type: "sep",
		key: "sep-2"
	},
	{
		type: "officer",
		officer: OFFICERS[3],
		officerIndex: 3
	},
	{
		type: "sep",
		key: "sep-3"
	},
	{
		type: "officer",
		officer: OFFICERS[4],
		officerIndex: 4
	},
	{
		type: "sep",
		key: "sep-4"
	},
	{
		type: "divider",
		label: "Multimedia"
	},
	{
		type: "officer",
		officer: OFFICERS[5],
		officerIndex: 5
	},
	{
		type: "sep",
		key: "sep-5"
	},
	{
		type: "officer",
		officer: OFFICERS[6],
		officerIndex: 6
	},
	{
		type: "sep",
		key: "sep-6"
	},
	{
		type: "officer",
		officer: OFFICERS[7],
		officerIndex: 7
	},
	{
		type: "sep",
		key: "sep-7"
	},
	{
		type: "officer",
		officer: OFFICERS[8],
		officerIndex: 8
	},
	{
		type: "sep",
		key: "sep-8"
	},
	{
		type: "divider",
		label: "Events & Outreach"
	},
	{
		type: "officer",
		officer: OFFICERS[9],
		officerIndex: 9
	},
	{
		type: "sep",
		key: "sep-9"
	},
	{
		type: "officer",
		officer: OFFICERS[10],
		officerIndex: 10
	}
];
function OfficerSeparator() {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: "-5% 0px"
	});
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: "flex items-center justify-center gap-3.5",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx(motion.span, {
				className: "h-px bg-asu-beige block",
				initial: { width: 0 },
				animate: isInView ? { width: 60 } : { width: 0 },
				transition: {
					duration: .8,
					ease: [
						.18,
						.7,
						.2,
						1
					]
				}
			}),
			/* @__PURE__ */ jsx(motion.span, {
				className: "w-[5px] h-[5px] bg-asu-gold rounded-full block",
				initial: { scale: 0 },
				animate: isInView ? { scale: 1 } : { scale: 0 },
				transition: {
					duration: .6,
					ease: [
						.5,
						1.6,
						.4,
						1
					],
					delay: .2
				}
			}),
			/* @__PURE__ */ jsx(motion.span, {
				className: "h-px bg-asu-beige block",
				initial: { width: 0 },
				animate: isInView ? { width: 60 } : { width: 0 },
				transition: {
					duration: .8,
					ease: [
						.18,
						.7,
						.2,
						1
					]
				}
			})
		]
	});
}
function SectionDivider({ label }) {
	const ref = useRef(null);
	const isInView = useInView(ref, {
		once: true,
		margin: "-5% 0px"
	});
	return /* @__PURE__ */ jsxs(motion.div, {
		ref,
		className: "flex items-center gap-5 py-16",
		initial: {
			opacity: 0,
			y: 24
		},
		animate: isInView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .8,
			ease: [
				.18,
				.7,
				.2,
				1
			]
		},
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "flex-1 h-px",
				style: { background: "linear-gradient(90deg, transparent, #EFE1C8 30%, #EFE1C8 70%, transparent)" }
			}),
			/* @__PURE__ */ jsxs("span", {
				className: "font-ui text-[12px] tracking-[0.32em] uppercase text-asu-red px-1.5 whitespace-nowrap",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "inline-block w-1 h-1 rounded-full bg-asu-gold align-middle",
						style: { margin: "0 12px 2px" }
					}),
					label,
					/* @__PURE__ */ jsx("span", {
						className: "inline-block w-1 h-1 rounded-full bg-asu-gold align-middle",
						style: { margin: "0 12px 2px" }
					})
				]
			}),
			/* @__PURE__ */ jsx("span", {
				className: "flex-1 h-px",
				style: { background: "linear-gradient(90deg, transparent, #EFE1C8 30%, #EFE1C8 70%, transparent)" }
			})
		]
	});
}
function OfficerCard({ officer, officerIndex, isMobile }) {
	const prefersReduced = useReducedMotion();
	const ref = useRef(null);
	const [imgError, setImgError] = useState(false);
	const inViewHook = useInView(ref, {
		once: true,
		amount: .2
	});
	const isInView = prefersReduced ? true : inViewHook;
	const isEven = officerIndex % 2 === 1;
	const flagStartX = isEven ? "calc(100vw + 200px)" : "calc(-100vw - 200px)";
	const flagRestRotate = isEven ? 4 : -4;
	const flagFlyRotate = isEven ? 12 : -12;
	return /* @__PURE__ */ jsx("article", {
		ref,
		id: `officer-${officer.id}`,
		className: "relative pt-8 pb-24 md:py-28",
		style: isMobile ? void 0 : { minHeight: "min(780px, 90vh)" },
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0 md:gap-8 lg:gap-20 items-center h-full",
			children: [/* @__PURE__ */ jsxs("div", {
				className: `relative flex items-end justify-center h-auto ${isEven ? "lg:order-2 lg:justify-end lg:-mr-12" : "lg:order-1 lg:justify-start lg:-ml-12"}`,
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "absolute pointer-events-none",
						style: isMobile ? {
							top: -80,
							left: 0,
							right: 0,
							margin: "auto",
							width: "95%",
							aspectRatio: "3/2",
							zIndex: 0,
							filter: "drop-shadow(0 12px 24px rgba(26,20,16,0.20))"
						} : {
							top: 30,
							[isEven ? "right" : "left"]: -120,
							width: "clamp(200px, 22vw, 340px)",
							aspectRatio: "3/2",
							zIndex: 0,
							filter: "drop-shadow(0 22px 36px rgba(26,20,16,0.18))"
						},
						initial: isMobile ? {
							x: 0,
							rotate: 0,
							opacity: 0
						} : {
							x: flagStartX,
							rotate: flagFlyRotate,
							opacity: 0
						},
						animate: isMobile ? isInView ? {
							x: 0,
							rotate: 0,
							opacity: .82
						} : {
							x: 0,
							rotate: 0,
							opacity: 0
						} : isInView ? {
							x: 0,
							rotate: flagRestRotate,
							opacity: .92
						} : {
							x: flagStartX,
							rotate: flagFlyRotate,
							opacity: 0
						},
						transition: prefersReduced ? { duration: 0 } : isMobile ? { opacity: {
							duration: .9,
							delay: .3
						} } : {
							x: {
								duration: 1.5,
								ease: [
									.18,
									.78,
									.18,
									1
								],
								delay: .25
							},
							rotate: {
								duration: 1.5,
								ease: [
									.18,
									.78,
									.18,
									1
								],
								delay: .25
							},
							opacity: {
								duration: .9,
								delay: .35
							}
						},
						"aria-hidden": "true",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: `https://flagcdn.com/w640/${officer.country}.png`,
								alt: "",
								className: "w-full h-full object-cover block rounded-[2px]",
								decoding: "async"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 rounded-[2px] pointer-events-none",
								style: {
									background: "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.10) 100%)",
									mixBlendMode: "overlay"
								}
							}),
							/* @__PURE__ */ jsx("span", {
								className: `absolute bottom-[-28px] font-ui text-[11px] tracking-[0.24em] uppercase text-asu-muted ${isEven ? "right-1" : "left-1"}`,
								children: officer.countryLabel
							})
						]
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "absolute bottom-0 h-px z-[4]",
						style: {
							display: isMobile ? "none" : void 0,
							[isEven ? "right" : "left"]: 0,
							background: "linear-gradient(90deg, transparent 0%, #E8C66A 18%, #E5291E 50%, #E8C66A 82%, transparent 100%)"
						},
						initial: {
							width: 0,
							opacity: 0
						},
						animate: isInView ? {
							width: "100%",
							opacity: .9
						} : {
							width: 0,
							opacity: 0
						},
						transition: prefersReduced ? { duration: 0 } : {
							width: {
								duration: 1.2,
								ease: [
									.2,
									.7,
									.2,
									1
								],
								delay: .5
							},
							opacity: {
								duration: .6,
								delay: .55
							}
						}
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute pointer-events-none",
						style: {
							display: isMobile ? "none" : void 0,
							bottom: -8,
							left: "15%",
							width: "70%",
							height: 32
						},
						children: /* @__PURE__ */ jsx(motion.div, {
							className: "w-full h-full",
							style: { background: "radial-gradient(ellipse at center, rgba(26,20,16,0.28) 0%, rgba(26,20,16,0.10) 45%, transparent 75%)" },
							initial: {
								scaleX: .4,
								opacity: 0
							},
							animate: isInView ? {
								scaleX: 1,
								opacity: 1
							} : {
								scaleX: .4,
								opacity: 0
							},
							transition: prefersReduced ? { duration: 0 } : {
								scaleX: {
									duration: 1.1,
									ease: [
										.2,
										.7,
										.2,
										1
									],
									delay: .7
								},
								opacity: {
									duration: .7,
									delay: .75
								}
							}
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: `relative z-[2] ${isMobile ? "" : "overflow-hidden"}`,
						style: isMobile ? { width: "85%" } : {
							height: 580,
							width: "fit-content"
						},
						children: /* @__PURE__ */ jsx(motion.div, {
							initial: {
								y: prefersReduced ? 0 : isMobile ? 0 : 580,
								opacity: prefersReduced ? 1 : 0
							},
							animate: isInView ? {
								y: 0,
								opacity: 1
							} : {},
							transition: prefersReduced ? { duration: 0 } : isMobile ? {
								y: {
									duration: 1.8,
									ease: [
										.18,
										.78,
										.2,
										1
									],
									delay: .2
								},
								opacity: {
									duration: .8,
									delay: .2
								}
							} : {
								y: {
									duration: 1.4,
									ease: [
										.18,
										.78,
										.2,
										1
									],
									delay: .2
								},
								opacity: {
									duration: .7,
									delay: .25
								}
							},
							children: imgError ? /* @__PURE__ */ jsx("div", {
								className: "bg-asu-beige flex items-end justify-center",
								style: isMobile ? {
									width: "100%",
									minHeight: 260
								} : {
									width: 400,
									height: 580
								},
								children: /* @__PURE__ */ jsx("span", {
									className: "font-ui text-[11px] tracking-[0.2em] uppercase text-asu-muted mb-8 opacity-50 select-none",
									children: "Photo coming soon"
								})
							}) : /* @__PURE__ */ jsx("img", {
								src: `/images/board/${officer.id}.webp`,
								alt: `${officer.name}, ${officer.role}`,
								style: isMobile ? {
									width: "100%",
									height: "auto",
									display: "block"
								} : {
									height: 580,
									width: "auto",
									maxWidth: "none",
									display: "block"
								},
								onError: () => setImgError(true)
							})
						})
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: `relative z-[2] pt-6 pb-3 md:py-3 px-0 md:px-3 ${isEven ? "lg:order-1" : "lg:order-2"}`,
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						className: "font-ui text-[12px] tracking-[0.28em] uppercase text-asu-red flex items-center gap-3.5 mb-[18px]",
						initial: {
							opacity: 0,
							y: 28
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .35
						},
						children: [/* @__PURE__ */ jsx("span", { className: "w-9 h-px bg-asu-red inline-block flex-shrink-0" }), officer.role]
					}),
					/* @__PURE__ */ jsx(motion.h3, {
						className: "font-display text-asu-dark m-0 mb-[22px] leading-none",
						style: {
							fontSize: "clamp(2rem, 4.5vw, 4.75rem)",
							letterSpacing: "-0.005em"
						},
						initial: {
							opacity: 0,
							y: 28
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .46
						},
						children: officer.name
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "flex flex-wrap gap-y-2 gap-x-[22px] mb-[26px]",
						initial: {
							opacity: 0,
							y: 28
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .58
						},
						children: [
							{
								label: "Major",
								value: officer.major
							},
							{
								label: "Hometown",
								value: officer.hometown
							},
							{
								label: "Year",
								value: officer.year
							}
						].map(({ label, value }) => /* @__PURE__ */ jsxs("dl", {
							className: "m-0 flex flex-col gap-0.5",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "font-ui text-[11px] tracking-[0.22em] uppercase text-asu-muted",
								children: label
							}), /* @__PURE__ */ jsx("dd", {
								className: "m-0 font-body text-[15px] text-asu-dark font-medium",
								children: value
							})]
						}, label))
					}),
					/* @__PURE__ */ jsx(motion.div, {
						className: "bg-asu-gold mb-[22px]",
						style: {
							width: 64,
							height: 2
						},
						initial: {
							opacity: 0,
							y: 28
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .66
						}
					}),
					/* @__PURE__ */ jsxs(motion.p, {
						className: "font-body font-light text-[16.5px] leading-[1.75] max-w-[520px] m-0 text-asu-brown",
						initial: {
							opacity: 0,
							y: 28
						},
						animate: isInView ? {
							opacity: 1,
							y: 0
						} : {},
						transition: prefersReduced ? { duration: 0 } : {
							duration: .7,
							ease: EASE_OUT,
							delay: .74
						},
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-display text-asu-red inline-block",
							style: {
								fontSize: 64,
								lineHeight: 0,
								position: "relative",
								top: 22,
								marginRight: 6
							},
							"aria-hidden": "true",
							children: "\""
						}), officer.blurb]
					})
				]
			})]
		})
	});
}
function OfficerRoster() {
	const isMobile = useIsMobile();
	const [activeIndex, setActiveIndex] = useState(-1);
	const [railVisible, setRailVisible] = useState(false);
	const rosterRef = useRef(null);
	useEffect(() => {
		const updateActive = () => {
			const mid = window.innerHeight * .5;
			let best = -1, bestDist = Infinity;
			OFFICERS.forEach((officer, i) => {
				const el = document.getElementById(`officer-${officer.id}`);
				if (!el) return;
				const rect = el.getBoundingClientRect();
				if (rect.bottom < 0 || rect.top > window.innerHeight) return;
				const d = Math.abs(rect.top + rect.height / 2 - mid);
				if (d < bestDist) {
					bestDist = d;
					best = i;
				}
			});
			setActiveIndex(best);
		};
		const io = new IntersectionObserver((entries) => {
			entries.forEach((e) => {
				if (e.target === rosterRef.current) setRailVisible(e.isIntersecting);
			});
		}, { threshold: 0 });
		if (rosterRef.current) io.observe(rosterRef.current);
		updateActive();
		window.addEventListener("scroll", updateActive, { passive: true });
		window.addEventListener("resize", updateActive);
		return () => {
			window.removeEventListener("scroll", updateActive);
			window.removeEventListener("resize", updateActive);
			io.disconnect();
		};
	}, []);
	const scrollToOfficer = useMemo(() => (officerId) => {
		const el = document.getElementById(`officer-${officerId}`);
		if (!el) return;
		const y = el.getBoundingClientRect().top + window.scrollY - 80;
		window.scrollTo({
			top: y,
			behavior: "smooth"
		});
	}, []);
	return /* @__PURE__ */ jsxs("section", {
		ref: rosterRef,
		className: "relative z-[1] bg-asu-ivory",
		children: [/* @__PURE__ */ jsx("nav", {
			className: "fixed top-1/2 right-[22px] z-40 hidden lg:flex flex-col gap-[14px] py-[14px] px-2 -translate-y-1/2 transition-opacity duration-500",
			style: {
				opacity: railVisible ? 1 : 0,
				pointerEvents: railVisible ? "auto" : "none"
			},
			"aria-label": "Officer index",
			children: OFFICERS.map((officer, i) => /* @__PURE__ */ jsx("button", {
				className: "relative w-[6px] h-[6px] rounded-full border-none p-0 cursor-pointer transition-all duration-[320ms]",
				style: {
					background: i === activeIndex ? "#E5291E" : "#EFE1C8",
					transform: i === activeIndex ? "scale(1.7)" : "scale(1)"
				},
				onClick: () => scrollToOfficer(officer.id),
				"aria-label": `Scroll to ${officer.role}`,
				children: i === activeIndex && /* @__PURE__ */ jsx("span", {
					className: "absolute right-[18px] top-1/2 -translate-y-1/2 font-ui text-[10px] tracking-[0.22em] uppercase text-asu-dark bg-asu-ivory px-[10px] py-1 border border-asu-beige rounded-[2px] whitespace-nowrap pointer-events-none",
					children: officer.role
				})
			}, officer.id))
		}), /* @__PURE__ */ jsx("div", {
			className: "max-w-[1440px] mx-auto px-8 md:px-14 lg:px-24 pt-16 pb-40",
			children: ROSTER_ITEMS.map((item) => {
				if (item.type === "divider") return /* @__PURE__ */ jsx(SectionDivider, { label: item.label }, item.label);
				if (item.type === "sep") return /* @__PURE__ */ jsx(OfficerSeparator, {}, item.key);
				return /* @__PURE__ */ jsx(OfficerCard, {
					officer: item.officer,
					officerIndex: item.officerIndex,
					isMobile
				}, item.officer.id);
			})
		})]
	});
}
//#endregion
//#region src/pages/board.astro
var board_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Board,
	file: () => $$file,
	url: () => $$url
});
var $$Board = createComponent(($$result, $$props, $$slots) => {
	return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {
		"title": "Meet the Team — Asian Student Union @ Iowa State University",
		"description": "The students who keep ASU running by planning every GBM, fundraiser, and social you'll see this year."
	}, { "default": ($$result) => renderTemplate`${maybeRenderHead($$result)}<main class="relative overflow-x-hidden">${renderComponent($$result, "BoardHero", BoardHero, {
		"client:load": true,
		"client:component-hydration": "load",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/board/BoardHero.tsx",
		"client:component-export": "BoardHero"
	})}${renderComponent($$result, "BoardIntro", BoardIntro, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/board/BoardIntro.tsx",
		"client:component-export": "BoardIntro"
	})}${renderComponent($$result, "OfficerRoster", OfficerRoster, {
		"client:visible": true,
		"client:component-hydration": "visible",
		"client:component-path": "C:/Bench/ASUWebsite/src/components/board/OfficerRoster.tsx",
		"client:component-export": "OfficerRoster"
	})}<section class="relative z-[1] bg-asu-espresso text-asu-cream text-center overflow-hidden px-8 md:px-14 pt-44 md:pt-[200px] pb-16 md:pb-[140px]"><svg class="absolute top-[-2px] left-0 right-0 w-full pointer-events-none" style="height: 160px;" viewBox="0 0 1920 160" preserveAspectRatio="none" aria-hidden="true"><path d="M 0 0 L 1920 0 L 1920 70 C 1480 130, 1080 40, 700 90 C 360 130, 120 70, 0 100 Z" fill="#FFF9ED"></path></svg><div class="relative z-10 max-w-3xl mx-auto"><p class="font-ui text-[12px] tracking-[0.25em] uppercase text-asu-gold mb-5">Want to join the board?</p><h3 class="font-display text-asu-cream leading-[1.08] mb-6 mx-auto" style="font-size: clamp(2.5rem, 5vw, 4rem); max-width: 760px;">Applications open every spring.</h3><p class="font-body font-light text-base leading-[1.7] text-asu-cream max-w-[520px] mx-auto mb-9" style="opacity: 0.78;">Interested in helping run ASU next year? Watch our socials and the newsletter for when officer applications open.</p><a href="/connect/socials" class="inline-flex items-center gap-2.5 px-[30px] py-[14px] bg-asu-red text-asu-cream font-ui font-medium text-[14px] tracking-[0.08em] rounded transition-colors hover:bg-asu-red-hover">Get notified →</a></div></section></main>` })}`;
}, "C:/Bench/ASUWebsite/src/pages/board.astro", void 0);
var $$file = "C:/Bench/ASUWebsite/src/pages/board.astro";
var $$url = "/board";
//#endregion
//#region \0virtual:astro:page:src/pages/board@_@astro
var page = () => board_exports;
//#endregion
export { page };
