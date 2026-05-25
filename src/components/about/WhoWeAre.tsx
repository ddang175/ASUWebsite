import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const STATS = [
  { value: "150+", label: "Members" },
  { value: "10+", label: "Years" },
  { value: "50+", label: "Events / Year" },
];


export function WhoWeAre() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  // Scroll progress across the full section (0 when top enters viewport, 1 when bottom leaves)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Each image parallaxes at a different rate
  const img1Y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const img2Y = useTransform(scrollYProgress, [0, 1], [20, -90]);

  const isInViewHook = useInView(textRef, { once: true, margin: "-10% 0px" });
  const isInView = prefersReduced ? true : isInViewHook;

  return (
    <section
      ref={sectionRef}
      className="relative z-[1] bg-asu-ivory py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: overlapping parallax images ─────────────────────────── */}
          <div
            className="relative flex justify-center lg:justify-start"
            style={{ paddingBottom: "5rem" }}
          >
            {/* Large portrait image */}
            <motion.div
              className="relative z-10 w-full max-w-xs md:max-w-sm"
              style={{ y: prefersReduced ? 0 : img1Y }}
            >
              <img
                src="/images/aboutUs/3x4portrait.webp"
                alt="ASU members at a community event"
                className="w-full rounded-lg object-cover shadow-[0_8px_40px_rgba(30,28,18,0.12)]"
                style={{ aspectRatio: "3/4" }}
                decoding="async"
              />
            </motion.div>

            {/* Small landscape image — overlaps bottom-right of large */}
            <motion.div
              className="absolute z-20 w-48 md:w-64"
              style={{
                bottom: 0,
                right: "0%",
                rotate: 4,
                y: prefersReduced ? 0 : img2Y,
              }}
            >
              <img
                src="/images/aboutUs/4x3.webp"
                alt="ASU cultural celebration"
                className="w-full rounded-lg object-cover shadow-[0_12px_48px_rgba(30,28,18,0.18)]"
                style={{ aspectRatio: "4/3" }}
                decoding="async"
              />
            </motion.div>

            {/* Decorative gold dot accent */}
            <div
              className="absolute top-8 -left-4 w-3 h-3 rounded-full bg-asu-gold opacity-60"
              aria-hidden="true"
            />
          </div>

          {/* ── Right: text + stats ──────────────────────────────────────── */}
          <div ref={textRef}>
            {/* Gold rule + eyebrow */}
            <motion.div
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={
                prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }
              }
            >
              <div className="w-8 h-px bg-asu-red" />
              <p className="font-ui text-[11px] font-bold tracking-[0.2em] uppercase text-asu-red">
                Who We Are
              </p>
            </motion.div>

            {/* Heading */}
            <motion.h2
              className="font-display text-asu-dark mb-6 leading-tight"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.25rem)", letterSpacing: "-0.01em" }}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.1, ease: EASE_OUT }
              }
            >
              More than a club —<br />a family.
            </motion.h2>

            {/* Body text */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.7, delay: 0.2, ease: EASE_OUT }
              }
            >
              <p className="font-body text-body-lg leading-relaxed text-asu-dark opacity-80">
                The Asian Student Union (ASU) at Iowa State University is a
                student-led organization dedicated to building an inclusive community
                for Asian and Asian-American students.
              </p>
              <p className="font-body text-body-lg leading-relaxed text-asu-dark opacity-80">
                From cultural showcases and food fundraisers to professional
                development workshops and social gatherings — we celebrate who we are
                and grow together, every step of the way.
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex gap-10 mt-12 pt-10 border-t border-asu-beige"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.6, delay: 0.34, ease: EASE_OUT }
              }
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="font-display text-asu-red leading-none mb-1"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
                  >
                    {stat.value}
                  </p>
                  <p className="font-ui text-xs tracking-[0.12em] uppercase text-asu-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
