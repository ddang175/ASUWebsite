import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT = [0.18, 0.7, 0.2, 1] as [number, number, number, number];

export function BoardIntro() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inViewHook = useInView(ref, { once: true, margin: "-10% 0px" });
  const isInView = prefersReduced ? true : inViewHook;

  return (
    <section
      ref={ref}
      className="relative bg-asu-ivory text-center overflow-hidden"
      style={{ padding: "140px 56px 0px" }}
    >
      {/* Hero → intro transition: dark bleed + ribbon drawn across the seam */}
      <div
        className="absolute top-[-2px] left-0 right-0 w-full pointer-events-none"
        style={{ height: 140 }}
        aria-hidden="true"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 140"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 0 L 1920 0 L 1920 60 C 1500 110, 1100 30, 700 75 C 380 105, 120 70, 0 90 Z"
            fill="#1E1C12"
          />
          <motion.path
            d="M -20 100 C 240 60, 520 130, 820 90 C 1100 56, 1340 120, 1620 80 C 1780 60, 1900 70, 3500 88"
            fill="none"
            stroke="#E5291E"
            strokeWidth={4.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.95}
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 2.4, ease: [0.4, 0, 0.2, 1] }
            }
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-10">
        {/* Eyebrow */}
        <motion.p
          className="font-ui text-[12px] tracking-[0.25em] uppercase text-asu-red inline-flex items-center gap-3.5"
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReduced ? { duration: 0 } : { duration: 0.9, ease: EASE_OUT }
          }
        >
          <span className="w-7 h-px bg-asu-red" />
          The Executive Board
          <span className="w-7 h-px bg-asu-red" />
        </motion.p>

        {/* Heading */}
        <motion.h2
          className="font-display text-asu-dark leading-[1.08] mx-auto mt-5 mb-5"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", maxWidth: 880 }}
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE_OUT, delay: 0.12 }
          }
        >
          Get to know the students working
          <br />
          behind the scenes for ASU!
        </motion.h2>

        {/* Officer count */}
        <motion.div
          className="inline-flex items-center gap-4 font-ui text-[12px] tracking-[0.22em] uppercase text-asu-muted"
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE_OUT, delay: 0.42 }
          }
        >
          <span
            className="font-display text-asu-red"
            style={{
              fontSize: 42,
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: 0,
            }}
          >
            11
          </span>
          <span className="w-1.5 h-1.5 bg-asu-gold rounded-full" />
          Officers · 2025–2026 term
        </motion.div>
      </div>
    </section>
  );
}
