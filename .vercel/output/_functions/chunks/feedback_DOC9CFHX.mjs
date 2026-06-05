import { c as createComponent } from './astro-component_Ctp5UCQ_.mjs';
import 'piccolore';
import { b8 as renderTemplate, aV as maybeRenderHead } from './params-and-props_BxzUSTsX.mjs';
import { r as renderComponent } from './entrypoint_CloO7E9G.mjs';
import { $ as $$Layout } from './Layout_uzxEJ57Z.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1];
const FLY_IN = [0.16, 1, 0.3, 1];
const RIBBON_PATH = "M -300,980 C 100,820 380,600 680,440 C 900,320 1060,480 1240,340 C 1420,200 1560,80 2000,-60";
function FeedbackIcon({ className }) {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      className,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.5,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "9", x2: "16", y2: "9" }),
        /* @__PURE__ */ jsx("line", { x1: "8", y1: "13", x2: "13", y2: "13" })
      ]
    }
  );
}
function FeedbackHero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);
  return /* @__PURE__ */ jsxs(
    "section",
    {
      ref: sectionRef,
      className: "relative w-full overflow-hidden bg-asu-espresso text-asu-cream",
      style: { height: "100vh", minHeight: 640 },
      "aria-label": "Member feedback survey",
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0",
            style: prefersReduced ? {} : { scale: 1.1, y: bgY },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/aboutUs/heroImage.webp",
                alt: "ASU community gathering",
                className: "w-full h-full object-cover",
                decoding: "async",
                draggable: false
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute inset-0 pointer-events-none",
            style: {
              background: "linear-gradient(to bottom, rgba(36,22,17,0.45) 0%, rgba(36,22,17,0.3) 30%, rgba(36,22,17,0.7) 70%, rgba(36,22,17,0.96) 100%)",
              zIndex: 1
            }
          }
        ),
        !prefersReduced && /* @__PURE__ */ jsx(
          "svg",
          {
            className: "absolute inset-0 w-full h-full pointer-events-none",
            viewBox: "0 0 1600 900",
            preserveAspectRatio: "none",
            "aria-hidden": "true",
            style: { zIndex: 2 },
            children: /* @__PURE__ */ jsx(
              motion.path,
              {
                d: RIBBON_PATH,
                fill: "none",
                stroke: "#E5291E",
                strokeWidth: 3,
                strokeLinecap: "round",
                vectorEffect: "non-scaling-stroke",
                initial: { pathLength: 0, opacity: 0 },
                animate: { pathLength: 1, opacity: 0.75 },
                transition: { duration: 2.6, ease: "easeInOut", delay: 0.8 }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "absolute inset-0 flex flex-col items-center justify-center px-8 text-center",
            style: { zIndex: 3 },
            children: [
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-gold mb-6",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT, delay: 0.2 },
                  children: "Asian Student Union · Feedback"
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "mb-7",
                  initial: prefersReduced ? { opacity: 0 } : { x: -480, y: -300, rotate: -26, scale: 1.12, opacity: 0 },
                  animate: prefersReduced ? { opacity: 1 } : { x: 0, y: 0, rotate: 5, scale: 1, opacity: 1 },
                  transition: prefersReduced ? { duration: 0 } : {
                    duration: 0.9,
                    ease: FLY_IN,
                    delay: 0.32,
                    opacity: {
                      duration: 0.18,
                      ease: "easeOut",
                      delay: 0.32
                    }
                  },
                  whileHover: prefersReduced ? {} : {
                    y: -10,
                    rotate: 2,
                    transition: { type: "spring", stiffness: 280, damping: 22 }
                  },
                  children: /* @__PURE__ */ jsx(FeedbackIcon, { className: "w-32 h-32 text-asu-gold" })
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "font-display text-asu-cream leading-none mb-7",
                  style: {
                    fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
                    letterSpacing: "-0.02em"
                  },
                  children: [["Your", "Voice"], ["Matters."]].map((line, li) => /* @__PURE__ */ jsx("div", { className: "block", children: line.map((word, wi) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "inline-block overflow-hidden align-top",
                      style: { marginRight: word === "Matters." ? 0 : "0.2em" },
                      children: /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "inline-block",
                          initial: { y: prefersReduced ? 0 : "110%" },
                          animate: { y: 0 },
                          transition: prefersReduced ? { duration: 0 } : {
                            duration: 1.1,
                            ease: EASE_OUT,
                            delay: 0.7 + li * 0.18 + wi * 0.1
                          },
                          children: word
                        }
                      )
                    },
                    word
                  )) }, li))
                }
              ),
              /* @__PURE__ */ jsx(
                motion.div,
                {
                  className: "bg-asu-gold mb-8",
                  style: { height: "1.5px", width: "48px" },
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT, delay: 1.12 }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "font-body text-[17px] leading-relaxed max-w-md mb-10",
                  style: { color: "rgba(252,238,201,0.72)" },
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT, delay: 1.22 },
                  children: "Help us improve ASU. Your feedback goes directly to our executive board and shapes how we plan events, run GBMs, and support the community. It takes less than two minutes."
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.a,
                {
                  href: "https://docs.google.com/forms/d/e/1FAIpQLSdshUXz4SKhja37p6Q2S3Y6OzK7wArOo6DM6XehXoUOWF565A/viewform?usp=header",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "inline-flex items-center gap-3 px-9 py-4 bg-asu-red text-asu-cream font-ui font-semibold text-[15px] tracking-[0.06em] rounded transition-colors duration-200 hover:bg-asu-red-hover",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT, delay: 1.36 },
                  children: [
                    "Take the Survey",
                    /* @__PURE__ */ jsx(
                      "svg",
                      {
                        width: "15",
                        height: "15",
                        viewBox: "0 0 15 15",
                        fill: "none",
                        "aria-hidden": "true",
                        children: /* @__PURE__ */ jsx(
                          "path",
                          {
                            d: "M2 7.5h11M9 3.5l4 4-4 4",
                            stroke: "currentColor",
                            strokeWidth: "1.6",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }
                        )
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute z-[4] text-center",
            style: { left: "50%", bottom: 36, transform: "translateX(-50%)" },
            initial: { opacity: 0 },
            animate: { opacity: 0.5 },
            transition: prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.6 },
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx(
              motion.svg,
              {
                width: "20",
                height: "20",
                viewBox: "0 0 20 20",
                fill: "none",
                animate: prefersReduced ? {} : { y: [0, 5, 0] },
                transition: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M10 3v14M4 11l6 6 6-6",
                    stroke: "#FCEEC9",
                    strokeWidth: "1.5",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              }
            )
          }
        )
      ]
    }
  );
}

const $$Feedback = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Feedback — Asian Student Union @ Iowa State University", "description": "Share your thoughts with the ASU exec board. Your feedback helps shape our events, GBMs, and community experience." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex-1"> ${renderComponent($$result2, "FeedbackHero", FeedbackHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Bench/ASUWebsite/src/components/feedback/FeedbackHero", "client:component-export": "FeedbackHero" })} </main> ` })}`;
}, "C:/Bench/ASUWebsite/src/pages/feedback.astro", void 0);

const $$file = "C:/Bench/ASUWebsite/src/pages/feedback.astro";
const $$url = "/feedback";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Feedback,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
