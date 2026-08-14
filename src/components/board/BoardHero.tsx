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
      style={{ height: "100vh", minHeight: 720 }}
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
            "linear-gradient(180deg, rgba(26,20,16,0.35) 0%, rgba(26,20,16,0.15) 30%, rgba(26,20,16,0.55) 75%, rgba(26,20,16,0.80) 100%)",
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

      {/* Scroll cue — bottom-right, desktop only */}
      <motion.div
        className="absolute z-[3] text-center hidden md:block"
        style={{ right: 56, bottom: 36 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={
          prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.2 }
        }
        aria-hidden="true"
      >
        <span className="font-ui text-[11px] tracking-[0.3em] uppercase text-asu-cream block mb-2">
          Scroll
        </span>
        <motion.svg
          width="14"
          height="18"
          viewBox="0 0 14 18"
          fill="none"
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M7 1 V15 M2 10 L7 15 L12 10"
            stroke="#FCEEC9"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
