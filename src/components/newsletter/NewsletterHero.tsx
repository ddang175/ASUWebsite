import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

// Enters top-right, loops in the far-right quadrant below the text block,
// then sweeps all the way off the left edge.
// Loop center ~(1350,700), below y≈580 where the CTA button sits.
const RIBBON_PATH =
  "M 4000,60 C 3200,50 2400,65 1700,80 C 1460,-40 1280,220 1150,480 C 1100,600 1200,780 1350,840 C 1500,900 1580,700 1480,540 C 1380,380 1250,420 1150,480 C 950,640 500,700 100,740 C -200,760 -1000,735 -2000,725 C -2800,720 -3600,730 -5000,720";

export function NewsletterHero() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 700], [0, 180]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-asu-espresso text-asu-cream"
      style={{ height: "100vh", minHeight: 640 }}
      aria-label="Newsletter sign-up"
    >
      {/* ── Background image — parallax ─────────────────────────────── */}
      <motion.div
        className="absolute inset-0"
        style={prefersReduced ? {} : { scale: 1.1, y: bgY }}
      >
        <img
          src="/images/newsletter/newsletterHero.webp"
          alt="ASU community gathering"
          className="w-full h-full object-cover"
          decoding="async"
          draggable={false}
        />
      </motion.div>

      {/* ── Gradient overlay — heavier at bottom ────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(36,22,17,0.45) 0%, rgba(36,22,17,0.3) 30%, rgba(36,22,17,0.7) 70%, rgba(36,22,17,0.96) 100%)",
          zIndex: 1,
        }}
      />

      {/* ── Ribbon — draws on load ───────────────────────────────────── */}
      {!prefersReduced && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
          aria-hidden="true"
          style={{ zIndex: 2 }}
        >
          <motion.path
            d={RIBBON_PATH}
            fill="none"
            stroke="#E5291E"
            strokeWidth={3}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.75 }}
            transition={{ duration: 2.6, ease: "easeInOut", delay: 0.8 }}
          />
        </svg>
      )}

      {/* ── Content — centered ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center"
        style={{ zIndex: 3 }}
      >
        {/* Eyebrow */}
        <motion.p
          className="font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-gold mb-8"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.7, ease: EASE_OUT, delay: 0.3 }
          }
        >
          Asian Student Union · Newsletter
        </motion.p>

        {/* Heading — two-word stagger */}
        <div
          className="font-display text-asu-cream leading-none mb-7"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {[
            ["Stay", "in"],
            ["the", "Loop."],
          ].map((line, li) => (
            <div key={li} className="block">
              {line.map((word, wi) => (
                <span
                  key={word}
                  className="inline-block overflow-hidden align-top"
                  style={{ marginRight: word === "Loop." ? 0 : "0.2em" }}
                >
                  <motion.span
                    className="inline-block"
                    initial={{ y: prefersReduced ? 0 : "110%" }}
                    animate={{ y: 0 }}
                    transition={
                      prefersReduced
                        ? { duration: 0 }
                        : {
                            duration: 1.1,
                            ease: EASE_OUT,
                            delay: 0.4 + li * 0.18 + wi * 0.1,
                          }
                    }
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <motion.div
          className="bg-asu-gold mb-8"
          style={{ height: "1.5px", width: "48px" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.5, ease: EASE_OUT, delay: 0.85 }
          }
        />

        {/* Subtitle */}
        <motion.p
          className="font-body text-[17px] leading-relaxed max-w-sm mb-10"
          style={{ color: "rgba(252,238,201,0.72)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: EASE_OUT, delay: 0.95 }
          }
        >
          Get updates on events, fundraisers, and everything happening at ASU
          straight to your inbox.
        </motion.p>

        {/* CTA button */}
        <motion.a
          href="https://docs.google.com/forms/d/e/1FAIpQLSc6RwD20t_GylP39qJjvmbIHN1oNyfmf_crkB8G7bv4hgS_8w/viewform?usp=header"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-9 py-4 bg-asu-red text-asu-cream font-ui font-semibold text-[15px] tracking-[0.06em] rounded transition-colors duration-200 hover:bg-asu-red-hover"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.8, ease: EASE_OUT, delay: 1.1 }
          }
        >
          Sign Up
        </motion.a>
      </div>

      {/* ── Scroll cue ──────────────────────────────────────────────── */}
      <motion.div
        className="absolute z-[4] text-center"
        style={{ left: "50%", bottom: 36, transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={
          prefersReduced ? { duration: 0 } : { duration: 1, delay: 1.4 }
        }
        aria-hidden="true"
      >
        <motion.svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          animate={prefersReduced ? {} : { y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M10 3v14M4 11l6 6 6-6"
            stroke="#FCEEC9"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
