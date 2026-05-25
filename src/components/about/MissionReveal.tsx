import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const MISSION_TEXT =
  "To foster a welcoming community that celebrates Asian culture and heritage — empowering our members and creating lasting spaces for connection, growth, and joy at Iowa State.";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

export function MissionReveal() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInViewHook = useInView(ref, { once: true, margin: "-12% 0px" });
  const isInView = prefersReduced ? true : isInViewHook;

  const words = MISSION_TEXT.split(" ");

  return (
    <section className="relative z-[1] bg-asu-espresso py-32 md:py-44 px-8 overflow-hidden">
      <div className="max-w-[900px] mx-auto">

        {/* Section label */}
        <motion.div
          className="flex flex-col items-center mb-14"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.6, ease: EASE_OUT }
          }
        >
          {/* Gold rule */}
          <div className="w-10 h-px bg-asu-gold mb-5" />
          <p className="font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold">
            Our Mission
          </p>
        </motion.div>

        {/* Word-by-word reveal */}
        <div
          ref={ref}
          className="font-display text-asu-cream text-center leading-snug"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)" }}
          aria-label={MISSION_TEXT}
        >
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{ marginRight: "0.28em" }}
              initial={{
                opacity: prefersReduced ? 1 : 0,
                y: prefersReduced ? 0 : 22,
              }}
              animate={
                isInView
                  ? { opacity: 1, y: 0 }
                  : { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 22 }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      duration: 0.55,
                      delay: i * 0.048,
                      ease: EASE_OUT,
                    }
              }
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Bottom gold rule */}
        <motion.div
          className="mx-auto mt-14 bg-asu-gold"
          style={{ width: "40px", height: "1px" }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.6, delay: words.length * 0.048 + 0.1, ease: EASE_OUT }
          }
        />
      </div>
    </section>
  );
}
