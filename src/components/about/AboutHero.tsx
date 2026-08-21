import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function AboutHero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  // Parallax: background drifts down as page scrolls (image oversized to hide edges)
  const bgY = useTransform(scrollY, [0, 700], [0, 160]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-asu-espresso"
      style={{ minHeight: "calc(100vh - 4rem)" }}
      aria-label="About us hero"
    >
      {/* ── Background: parallax hero image ─────────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={{
          scale: 1.18,
          y: prefersReduced ? 0 : bgY,
        }}
      >
        <img
          src="/images/aboutUs/heroImage.webp"
          alt="ASU community gathering"
          className="w-full h-full object-cover"
          decoding="async"
          draggable={false}
        />
      </motion.div>

      {/* ── Overlay: dark gradient, heavier at bottom ───────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(30,28,18,0.96) 0%, rgba(30,28,18,0.55) 45%, rgba(30,28,18,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Hero ribbon SVG: draws across the lower hero on page load ─────── */}
      {/* ── Hero ribbon: full-section SVG, draws on page load ───────────────
           Path travels: top-left → dramatic upward loop → back left →
           winds down left side → sweeps across bottom-right.             */}
      {!prefersReduced && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 2 }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 1000"
            preserveAspectRatio="none"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d={[
                "M -2000,160",
                "C -1400,145 -800,130 -30,110",
                "C 100,-200 500,380 280,470",
                "C -180,560 500,320 200,540",
                "C -50,720 -70,850 110,910",
                "C 340,970 840,895 1160,858",
                "C 1370,838 1700,864 2000,845",
                "C 2500,820 3000,855 4000,840",
              ].join(" ")}
              stroke="#E5291E"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 2.6, delay: 0.8, ease: "easeInOut" }}
            />
          </svg>
        </div>
      )}

      {/* ── Content: editorial bottom-left layout ───────────────────────────── */}
      <div
        className="relative flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-20 md:pb-28"
        style={{ minHeight: "calc(100vh - 4rem)", zIndex: 3 }}
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.p
            className="font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.6, delay: 0.25, ease: EASE_OUT }
            }
          >
            Asian Student Union @ Iowa State University
          </motion.p>

          {/* Display heading */}
          <motion.h1
            className="font-display text-asu-cream leading-none mb-6"
            style={{
              fontSize: "clamp(3.75rem, 9vw, 7.5rem)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.85, delay: 0.38, ease: EASE_OUT }
            }
          >
            About Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-body text-lg leading-relaxed max-w-md"
            style={{ color: "rgba(252,238,201,0.72)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.75, delay: 0.55, ease: EASE_OUT }
            }
          >
            Who we are, what we stand for
            <br />
            and our purpose.
          </motion.p>

          {/* Gold accent rule */}
          <motion.div
            className="mt-8 bg-asu-gold"
            style={{ height: "1.5px", width: "56px", transformOrigin: "left" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.55, delay: 0.72, ease: EASE_OUT }
            }
          />
        </div>

        {/* Scroll cue — centered, matches home screen "Next Event" style */}
        <motion.a
          href="#mission"
          className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-1.5 no-underline cursor-pointer"
          style={{ color: "rgba(252,238,201,0.5)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.3 }
          }
          whileHover={{ color: "rgba(252,238,201,0.75)" }}
        >
          <span className="font-ui text-[14px] font-bold tracking-[0.12em] uppercase">
            Scroll
          </span>
          <motion.svg
            className="w-5 h-5"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            animate={prefersReduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              d="M8 3v10M3.5 9l4.5 4.5L12.5 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.a>
      </div>
    </section>
  );
}
