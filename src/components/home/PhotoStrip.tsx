import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useReducedMotion,
} from "motion/react";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

const PHOTOS = [
  { label: "2:3 Portrait · ~600 × 900 px", aspect: "aspect-[2/3]", gridArea: "img1" },
  { label: "4:3 · ~800 × 600 px",          aspect: "aspect-[4/3]",  gridArea: "img2" },
  { label: "1:1 Square · ~500 × 500 px",   aspect: "aspect-square", gridArea: "img3" },
  { label: "4:3 · ~800 × 600 px",          aspect: "aspect-[4/3]",  gridArea: "img4" },
  { label: "3:4 Portrait · ~500 × 667 px", aspect: "aspect-[3/4]",  gridArea: "img5" },
];

// Parallax offsets: each image moves at a different rate as you scroll through the section
const PARALLAX = [
  [60, -40],   // img1 — large portrait
  [20, -70],   // img2
  [40, -30],   // img3
  [10, -80],   // img4 — most dramatic
  [50, -20],   // img5
] as const;

function ImgPlaceholder({ label, aspect }: { label: string; aspect: string }) {
  return (
    <div
      className={`${aspect} w-full rounded-lg overflow-hidden flex items-center justify-center`}
      style={{ background: "linear-gradient(140deg, #EFE1C8 0%, #FCEEC9 100%)" }}
    >
      <div className="text-center px-4">
        <div className="w-6 h-px bg-asu-muted mx-auto mb-2 opacity-40" />
        <p className="font-ui text-[10px] tracking-[0.14em] uppercase text-asu-muted opacity-60">
          {label}
        </p>
        <div className="w-6 h-px bg-asu-muted mx-auto mt-2 opacity-40" />
      </div>
    </div>
  );
}

export function PhotoStrip() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // One MotionValue per image
  const y0 = useTransform(scrollYProgress, [0, 1], PARALLAX[0]);
  const y1 = useTransform(scrollYProgress, [0, 1], PARALLAX[1]);
  const y2 = useTransform(scrollYProgress, [0, 1], PARALLAX[2]);
  const y3 = useTransform(scrollYProgress, [0, 1], PARALLAX[3]);
  const y4 = useTransform(scrollYProgress, [0, 1], PARALLAX[4]);
  const yValues = [y0, y1, y2, y3, y4];

  const isInViewHook = useInView(headerRef, { once: true, margin: "-10% 0px" });
  const isInView = prefersReduced ? true : isInViewHook;

  return (
    <section
      ref={sectionRef}
      className="bg-asu-ivory py-28 md:py-40 px-8 md:px-16 lg:px-24 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">

        {/* Section header */}
        <div ref={headerRef} className="mb-16 md:mb-20">
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={
              prefersReduced ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT }
            }
          >
            <div className="w-8 h-px bg-asu-red" />
            <p className="font-ui text-[11px] font-bold tracking-[0.2em] uppercase text-asu-red">
              Our Community
            </p>
          </motion.div>
          <motion.h2
            className="font-display text-asu-dark leading-tight"
            style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)", letterSpacing: "-0.02em" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, delay: 0.1, ease: EASE_OUT }
            }
          >
            Moments worth remembering.
          </motion.h2>
        </div>

        {/* Asymmetric editorial grid
            Desktop:  [img1 tall] | [img2 wide] [img3 square]
                      [img1 tall] | [img4 wide] [img5 portrait]
            Mobile:   stacked vertically                        */}
        <div
          className="hidden md:grid gap-4"
          style={{
            gridTemplateColumns: "2.2fr 1.5fr 1fr",
            gridTemplateRows: "auto auto",
          }}
        >
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.gridArea}
              style={{
                gridArea: undefined,
                gridColumn:
                  i === 0 ? "1 / 2" :
                  i === 1 ? "2 / 3" :
                  i === 2 ? "3 / 4" :
                  i === 3 ? "2 / 3" :
                  "3 / 4",
                gridRow:
                  i === 0 ? "1 / 3" :
                  "auto",
                y: prefersReduced ? 0 : yValues[i],
              }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.8, delay: i * 0.1, ease: EASE_OUT }
              }
            >
              <div
                className="shadow-[0_4px_24px_rgba(30,28,18,0.08)]"
                style={{ height: "100%" }}
              >
                <ImgPlaceholder label={photo.label} aspect={photo.aspect} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: simple vertical stack */}
        <div className="flex flex-col gap-4 md:hidden">
          {PHOTOS.map((photo, i) => (
            <motion.div
              key={`mob-${photo.gridArea}`}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.6, delay: i * 0.08, ease: EASE_OUT }
              }
            >
              <ImgPlaceholder label={photo.label} aspect={photo.aspect} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
