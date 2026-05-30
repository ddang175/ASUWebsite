import { c as createComponent } from './astro-component_Ctp5UCQ_.mjs';
import 'piccolore';
import { b8 as renderTemplate, aV as maybeRenderHead } from './params-and-props_BxzUSTsX.mjs';
import { r as renderComponent } from './entrypoint_FkoWJ4US.mjs';
import { $ as $$Layout } from './Layout_BhXlIqNj.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform, motion } from 'motion/react';

const EASE_OUT = [0.16, 1, 0.3, 1];
const RIBBON_PATH = "M 1700,80 C 1460,-40 1280,220 1150,480 C 1100,600 1200,780 1350,840 C 1500,900 1580,700 1480,540 C 1380,380 1250,420 1150,480 C 950,640 500,700 100,740 C -200,760 -800,730 -2500,720";
function NewsletterHero() {
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
      "aria-label": "Newsletter sign-up",
      children: [
        /* @__PURE__ */ jsx(
          motion.div,
          {
            className: "absolute inset-0",
            style: prefersReduced ? {} : { scale: 1.1, y: bgY },
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: "/images/newsletter/newsletterHero.webp",
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
                  className: "font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-gold mb-8",
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT, delay: 0.3 },
                  children: "Asian Student Union · Newsletter"
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
                  children: [
                    ["Stay", "in"],
                    ["the", "Loop."]
                  ].map((line, li) => /* @__PURE__ */ jsx("div", { className: "block", children: line.map((word, wi) => /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "inline-block overflow-hidden align-top",
                      style: { marginRight: word === "Loop." ? 0 : "0.2em" },
                      children: /* @__PURE__ */ jsx(
                        motion.span,
                        {
                          className: "inline-block",
                          initial: { y: prefersReduced ? 0 : "110%" },
                          animate: { y: 0 },
                          transition: prefersReduced ? { duration: 0 } : {
                            duration: 1.1,
                            ease: EASE_OUT,
                            delay: 0.4 + li * 0.18 + wi * 0.1
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
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.5, ease: EASE_OUT, delay: 0.85 }
                }
              ),
              /* @__PURE__ */ jsx(
                motion.p,
                {
                  className: "font-body text-[17px] leading-relaxed max-w-sm mb-10",
                  style: { color: "rgba(252,238,201,0.72)" },
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT, delay: 0.95 },
                  children: "Get updates on events, fundraisers, and everything happening at ASU straight to your inbox."
                }
              ),
              /* @__PURE__ */ jsxs(
                motion.span,
                {
                  className: "inline-flex items-center gap-3 px-9 py-4 bg-asu-beige/50 text-asu-muted font-ui font-semibold text-[15px] tracking-[0.06em] rounded cursor-not-allowed select-none border border-dashed border-asu-muted/30",
                  "aria-disabled": "true",
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: prefersReduced ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT, delay: 1.1 },
                  children: [
                    "Sign Up",
                    /* @__PURE__ */ jsx("span", { className: "font-bold tracking-widest text-asu-brown/60", children: "— TODO" })
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
            transition: prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.4 },
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

const $$Newsletter = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Newsletter — Asian Student Union @ Iowa State University", "description": "Sign up for the ASU newsletter and get updates on events, fundraisers, and everything happening at the Asian Student Union at Iowa State." }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="flex-1"> ${renderComponent($$result2, "NewsletterHero", NewsletterHero, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Bench/ASUWebsite/src/components/newsletter/NewsletterHero", "client:component-export": "NewsletterHero" })} </main> ` })}`;
}, "C:/Bench/ASUWebsite/src/pages/join/newsletter.astro", void 0);

const $$file = "C:/Bench/ASUWebsite/src/pages/join/newsletter.astro";
const $$url = "/join/newsletter";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Newsletter,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
