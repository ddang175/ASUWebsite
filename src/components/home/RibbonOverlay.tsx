import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";
import type { MotionValue } from "motion/react";

// ─── Ribbon definitions ─────────────────────────────────────────────────────
// top        — fixed viewport position (keeps ribbon out of central text zones)
// scrollRange — [start, end] in 0–1 page scroll progress for the crossing
// ltr        — true = streams left→right, false = right→left
// path       — SVG path inside a 1440 × 80 viewBox
// sw         — stroke width
// op         — opacity (kept low so text remains readable beneath)
// ─────────────────────────────────────────────────────────────────────────────
const RIBBONS = [
  {
    id: 1,
    top: "16%",
    scrollRange: [0.04, 0.24] as [number, number],
    ltr: true,
    // Gentle S-wave — floats high, away from headings
    path: "M 0,40 C 240,8 480,72 720,40 C 960,8 1200,72 1440,40",
    sw: 3,
    op: 0.48,
  },
  {
    id: 2,
    top: "80%",
    scrollRange: [0.14, 0.32] as [number, number],
    ltr: false,
    // Tight compact wave — near bottom edge, clear of main content
    path: "M 0,45 C 160,10 320,80 480,45 C 640,10 800,80 960,45 C 1120,10 1280,80 1440,45",
    sw: 2.8,
    op: 0.44,
  },
  {
    id: 3,
    top: "28%",
    scrollRange: [0.26, 0.46] as [number, number],
    ltr: true,
    // Wide swooping arc
    path: "M 0,50 C 360,5 720,75 1080,50 C 1260,37 1380,60 1440,50",
    sw: 3.2,
    op: 0.46,
  },
  {
    id: 4,
    top: "68%",
    scrollRange: [0.38, 0.58] as [number, number],
    ltr: false,
    // Multi-loop ribbon — most playful, lives in lower viewport
    path: "M 0,35 C 120,65 240,5 360,35 C 480,65 600,5 720,35 C 840,65 960,5 1080,35 C 1200,65 1320,5 1440,35",
    sw: 3,
    op: 0.44,
  },
  {
    id: 5,
    top: "14%",
    scrollRange: [0.50, 0.70] as [number, number],
    ltr: true,
    // Long gentle curve — single elegant sweep
    path: "M 0,42 C 480,10 960,74 1440,42",
    sw: 3,
    op: 0.50,
  },
  {
    id: 6,
    top: "76%",
    scrollRange: [0.62, 0.82] as [number, number],
    ltr: false,
    // Asymmetric double wave
    path: "M 0,55 C 200,10 400,80 600,50 C 800,20 1000,75 1200,45 C 1340,22 1420,60 1440,50",
    sw: 3.2,
    op: 0.46,
  },
] as const;

// ─── SingleRibbon ────────────────────────────────────────────────────────────
// Each ribbon is a fixed div that translates horizontally based on scroll.
// x goes from -100% (off left) through 0 (crossing center) to +100% (off right)
// for ltr ribbons, reversed for rtl. Scrolling up reverses all motion naturally.
// ─────────────────────────────────────────────────────────────────────────────
function SingleRibbon({
  ribbon,
  scrollYProgress,
}: {
  ribbon: (typeof RIBBONS)[number];
  scrollYProgress: MotionValue<number>;
}) {
  const x = useTransform(
    scrollYProgress,
    ribbon.scrollRange,
    ribbon.ltr ? ["-105%", "105%"] : ["105%", "-105%"],
  );

  return (
    <motion.div
      className="fixed left-0 pointer-events-none"
      style={{
        top: ribbon.top,
        width: "100%",
        height: "80px",
        // Sit above section backgrounds but below nav (z-50)
        zIndex: 3,
        x,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={ribbon.path}
          stroke="#E5291E"
          strokeWidth={ribbon.sw}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity={ribbon.op}
        />
      </svg>
    </motion.div>
  );
}

// ─── RibbonOverlay ───────────────────────────────────────────────────────────
export function RibbonOverlay() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (prefersReduced) return null;

  return (
    <>
      {RIBBONS.map((ribbon) => (
        <SingleRibbon
          key={ribbon.id}
          ribbon={ribbon}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </>
  );
}
