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
                // Start top-left
                "M -30,110",
                // First arc: sweeps up-right then loops back left — creates the big upward loop
                "C 100,-200 500,380 280,470",
                // Second wind: pulls hard left then right — figure-eight crossing
                "C -180,560 500,320 200,540",
                // Third bend: continues winding left and further down
                "C -50,720 -70,850 110,910",
                // Final sweep: travels right across the bottom of the hero
                "C 340,970 840,895 1160,858",
                "C 1370,838 1510,864 1540,848",
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

        {/* Scroll cue — bottom right */}
        <motion.div
          className="absolute right-8 md:right-16 bottom-8 flex flex-col items-center gap-2"
          style={{ color: "rgba(252,238,201,0.4)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={
            prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.3 }
          }
          aria-hidden="true"
        >
          <span className="font-ui text-[10px] font-bold tracking-[0.18em] uppercase">
            Scroll
          </span>
          <motion.svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            animate={prefersReduced ? {} : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <rect
              x="5.5"
              y="0"
              width="3"
              height="9"
              rx="1.5"
              fill="currentColor"
            />
            <path
              d="M 2,13 L 7,19 L 12,13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </motion.div>
      </div>
    </section>
  );
}
