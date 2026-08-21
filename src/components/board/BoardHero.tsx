import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const EASE_OUT = [0.18, 0.78, 0.2, 1] as [number, number, number, number];

const HERO_RIBBON =
  "M -2000 1060 C -1400 1055, -800 1048, -40 1040 C 360 1080, 640 760, 780 540 C 880 400, 550 400, 600 400 C 220 400, 220 660, 540 720 C 880 780, 1240 620, 1400 520 C 1560 400, 2200 380, 3000 440 C 3800 480, 4500 460, 6000 480";

export function BoardHero() {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 220]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden bg-asu-espresso text-asu-cream"
      style={{ height: "calc(100vh - 4rem)", minHeight: 640 }}
      aria-label="Meet the team hero"
    >
      {/* Background — parallax container */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        style={prefersReduced ? {} : { scale: 1.08, y: bgY }}
      >
        <img
          src="/images/board/team-photo.webp"
          alt=""
          className="w-full h-full object-cover"
          decoding="async"
        />

        <div className="w-full h-full bg-asu-espresso" />
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(30,28,18,0.96) 0%, rgba(30,28,18,0.55) 45%, rgba(30,28,18,0.18) 100%)",
          zIndex: 1,
        }}
      />

      {/* Hero ribbon — draws on page load */}
      {!prefersReduced && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        >
          <motion.path
            d={HERO_RIBBON}
            fill="none"
            stroke="#E5291E"
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            opacity={0.92}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.8 }}
          />
        </svg>
      )}

      {/* Content — bottom-left editorial layout */}
      <div
        className="absolute z-[3] px-8 md:px-[7%]"
        style={{ bottom: "14%", maxWidth: 720 }}
      >
        <motion.p
          className="font-ui text-[13px] tracking-[0.22em] uppercase mb-[18px]"
          style={{ color: "rgba(252,238,201,0.92)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE_OUT, delay: 0.8 }
          }
        >
          Asian Student Union · Executive Board 2026–27
        </motion.p>

        <h1
          className="font-display leading-none mb-[22px] text-asu-cream"
          style={{
            fontSize: "clamp(4.5rem, 9vw, 9rem)",
            letterSpacing: "-0.005em",
          }}
        >
          {/* Line 1 */}
          <span className="block">
            {(["Meet", "the"] as const).map((word, i) => (
              <span
                key={word}
                className="inline-block overflow-hidden align-top"
                style={{ marginRight: "0.18em" }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: prefersReduced ? 0 : "110%" }}
                  animate={{ y: 0 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          duration: 1.2,
                          ease: EASE_OUT,
                          delay: 0.22 + i * 0.16,
                        }
                  }
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </span>
          {/* Line 2 */}
          <span className="block">
            <span className="inline-block overflow-hidden align-top">
              <motion.span
                className="inline-block"
                initial={{ y: prefersReduced ? 0 : "110%" }}
                animate={{ y: 0 }}
                transition={
                  prefersReduced
                    ? { duration: 0 }
                    : { duration: 1.2, ease: EASE_OUT, delay: 0.54 }
                }
              >
                Team.
              </motion.span>
            </span>
          </span>
        </h1>

        <motion.p
          className="font-body font-light text-[18px] leading-[1.6] text-asu-cream max-w-[460px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.86, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE_OUT, delay: 0.82 }
          }
        >
          The students who keep ASU running by planning every GBM, fundraiser,
          and social you'll see this year.
          <span className="block w-14 h-px bg-asu-gold mt-[22px]" />
        </motion.p>
      </div>

      {/* Scroll cue — centered, matches home screen style */}
      <motion.a
        href="#board-intro"
        className="absolute z-[3] left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-1.5 no-underline cursor-pointer"
        style={{ color: "rgba(252,238,201,0.5)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.2 }
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
    </section>
  );
}
