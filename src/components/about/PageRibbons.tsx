import {
  useScroll,
  useTransform,
  motion,
  useReducedMotion,
} from "motion/react";
import type { MotionValue } from "motion/react";
import type { CSSProperties } from "react";

// Full-width ribbons positioned absolutely within <main class="relative">.
// z-index: 45 places them above all sections (which are sealed at z-[1])
// and below the nav (z-50). pointer-events-none ensures nothing is blocked.
//
// Sections must have `relative z-[1]` applied so they form explicit stacking
// contexts — this is what lets ribbons float above them.
//
// Each ribbon draws via pathLength as the user scrolls into its zone, matching
// the hero ribbon's load animation but triggered by scroll progress instead.

/** Shift every ribbon earlier by this amount. Increase to trigger sooner. */
const SCROLL_RANGE_OFFSET = 0.1;

function shiftRange([s, e]: [number, number]): [number, number] {
  const start = Math.max(0, s - SCROLL_RANGE_OFFSET);
  return [start, Math.max(start + 0.05, e - SCROLL_RANGE_OFFSET)];
}

interface RibbonConfig {
  id: number;
  style: CSSProperties;
  viewBox: string;
  path: string;
  scrollRange: [number, number];
}

// Paths use viewBox "0 0 1440 360". Key design rules matching the hero ribbon:
//   • Start well off-screen left (x ≈ -80) or right (x ≈ 1520)
//   • First control point drives a dramatic vertical loop (y ≈ -100 or 420+)
//   • Path doubles back over itself, creating the figure-8 crossing
//   • Exits off the opposite side
// SVG clips anything outside the viewBox — off-screen regions are intentional.
const RIBBONS: RibbonConfig[] = [
  {
    // Left → right, dramatic upward loop then crossing — MissionReveal zone
    id: 1,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "calc(100vh - 4rem + 560px)",
      height: 360,
      zIndex: 45,
    },
    viewBox: "0 0 1440 360",
    path: "M -80,320 C 120,-100 480,380 660,200 C 840,20 720,-100 1000,200 C 1180,360 1380,100 1540,260",
    scrollRange: [0.36, 0.56],
  },

  {
    // Left → right, winding — ValuesSection zone
    id: 3,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "calc(100vh - 4rem + 1620px)",
      height: 360,
      zIndex: 45,
    },
    viewBox: "0 0 1440 360",
    path: "M -80,340 C 160,-100 520,300 700,150 C 880,0 740,-100 1020,180 C 1200,380 1380,80 1540,260",
    scrollRange: [0.65, 0.82],
  },
  {
    // Right → left, sweeping arc — CTA zone
    id: 4,
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: "calc(100vh - 4rem + 2500px)",
      height: 340,
      zIndex: 45,
    },
    viewBox: "0 0 1440 340",
    path: "M 1520,260 C 1280,-80 960,360 70,190 C -500,20 100, -100 -400,10 C 220,380 60,80 -1200,240",
    scrollRange: [0.8, 0.96],
  },
];

function SingleRibbon({
  ribbon,
  scrollYProgress,
}: {
  ribbon: RibbonConfig;
  scrollYProgress: MotionValue<number>;
}) {
  const pathLength = useTransform(
    scrollYProgress,
    shiftRange(ribbon.scrollRange),
    [0, 1],
  );

  return (
    <div
      className="pointer-events-none absolute left-0 right-0"
      style={{
        top: ribbon.style.top,
        height: ribbon.style.height,
        zIndex: ribbon.style.zIndex,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox={ribbon.viewBox}
        preserveAspectRatio="none"
        className="w-full h-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={ribbon.path}
          stroke="#E5291E"
          strokeWidth="9"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
          opacity={0.88}
        />
      </svg>
    </div>
  );
}

export function PageRibbons() {
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
