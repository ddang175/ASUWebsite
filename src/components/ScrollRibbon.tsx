import { useScroll, useTransform, motion, useReducedMotion } from "motion/react";

export function ScrollRibbon() {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  if (prefersReduced) return null;

  return (
    <div
      className="fixed top-0 left-5 h-screen pointer-events-none hidden lg:block"
      style={{ width: "32px", zIndex: 40 }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 32 800"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Starting knot */}
        <circle cx="16" cy="6" r="3" fill="#E5291E" opacity="0.5" />
        {/* Flowing ribbon — S-curves threading down the left margin */}
        <motion.path
          d="M 16,0 C 2,90 30,180 16,270 C 2,360 30,450 16,540 C 2,630 30,720 16,800"
          stroke="#E5291E"
          strokeWidth="1.75"
          strokeLinecap="round"
          fill="none"
          style={{ pathLength, opacity: 0.5 }}
        />
      </svg>
    </div>
  );
}
