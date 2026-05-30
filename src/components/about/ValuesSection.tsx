import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const VALUES = [
  {
    num: "01",
    name: "Community",
    desc: "Building authentic bonds across different backgrounds, ages, and interests.",
  },
  {
    num: "02",
    name: "Inclusivity",
    desc: "Honoring and celebrating the richness and diversity of Asian heritage.",
  },
  {
    num: "03",
    name: "Connection",
    desc: "Encouraging social connection, breaking down barriers and forming life-long friendships.",
  },
  {
    num: "04",
    name: "Understanding",
    desc: "Striving to accept and learn other's backgrounds, cultures, and identity.",
  },
];

export function ValuesSection() {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInViewHook = useInView(ref, { once: true, margin: "-10% 0px" });
  const isInView = prefersReduced ? true : isInViewHook;

  return (
    <section className="relative z-[1] bg-asu-dark py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-20 md:mb-24">
          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.6, ease: EASE_OUT }
            }
          >
            <div className="w-8 h-px bg-asu-gold mb-5" />
            <p className="font-ui text-[11px] font-bold tracking-[0.22em] uppercase text-asu-gold mb-5">
              What We Stand For
            </p>
          </motion.div>
          <motion.h2
            className="font-display text-asu-cream leading-tight"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, delay: 0.1, ease: EASE_OUT }
            }
          >
            Our Values
          </motion.h2>
        </div>

        {/* 2×2 values grid */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-px bg-asu-espresso"
        >
          {VALUES.map((val, i) => (
            <motion.div
              key={val.num}
              className="bg-asu-dark p-10 md:p-14 group cursor-default"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.7, delay: i * 0.14, ease: EASE_OUT }
              }
              whileHover={
                prefersReduced
                  ? {}
                  : {
                      backgroundColor: "#241611",
                      transition: { duration: 0.25 },
                    }
              }
            >
              {/* Number */}
              <p
                className="font-display text-asu-red opacity-60 mb-4 leading-none group-hover:opacity-100 transition-opacity duration-300"
                style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                aria-hidden="true"
              >
                {val.num}
              </p>

              {/* Divider */}
              <div className="w-8 h-px bg-asu-gold mb-6 opacity-50 group-hover:opacity-100 group-hover:w-14 transition-all duration-400" />

              {/* Value name */}
              <h3
                className="font-display text-asu-cream mb-3 leading-tight"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)" }}
              >
                {val.name}
              </h3>

              {/* Description */}
              <p
                className="font-body text-sm leading-relaxed"
                style={{ color: "rgba(252,238,201,0.55)" }}
              >
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
