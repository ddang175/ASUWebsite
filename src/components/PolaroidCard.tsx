import { motion } from "motion/react";
import type { CSSProperties } from "react";

interface Props {
  title: string;
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  gradient?: string;
  /** Resting rotation after the card lands */
  finalRotation: number;
  /** Rotation while the card is in the air — larger values feel more dramatic */
  initialRotation: number;
  /** X offset for the card's starting position (negative = from left, positive = from right) */
  entryX: number;
  /** Y offset for the card's starting position (negative = from top, positive = from bottom) */
  entryY: number;
  delay?: number;
  positionStyle: CSSProperties;
}

export function PolaroidCard({
  title,
  date,
  imageSrc,
  imageAlt,
  gradient,
  finalRotation,
  initialRotation,
  entryX,
  entryY,
  delay = 0,
  positionStyle,
}: Props) {
  return (
    <motion.div
      initial={{
        x: entryX,
        y: entryY,
        rotate: initialRotation,
        scale: 1.12,
        opacity: 0,
      }}
      animate={{
        x: 0,
        y: 0,
        rotate: finalRotation,
        scale: 1,
        opacity: 1,
      }}
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 280, damping: 22 },
      }}
      transition={{
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay,
        opacity: { duration: 0.18, ease: "easeOut", delay },
      }}
      style={{ position: "absolute", willChange: "transform", ...positionStyle }}
      className="cursor-default select-none"
    >
      {/* Polaroid frame — no fixed width; card shrink-wraps to the photo's natural width */}
      <div
        className="bg-asu-cream rounded p-3 md:p-4"
        style={{
          paddingBottom: "2.75rem",
          boxShadow: "0px 6px 24px rgba(30, 28, 18, 0.12)",
        }}
      >
        {/*
          Photo area — fixed height, width auto.
          Images with landscape ratios produce wider cards; portrait ratios produce narrower cards.
          Gradient placeholder cards use aspect-square so they stay square at the same height.
        */}
        <div className="rounded-[2px] overflow-hidden bg-asu-beige">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className="block h-50 md:h-55 w-auto"
              decoding="async"
            />
          ) : (
            <div
              className="h-40 md:h-48 aspect-square"
              style={{
                background:
                  gradient ?? "linear-gradient(135deg, #FCEEC9, #E8C66A)",
              }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="mt-2">
          <p className="font-display text-[12px] md:text-[13px] leading-snug text-asu-dark truncate">
            {title}
          </p>
          <p className="font-body text-[10px] md:text-[11px] leading-tight text-asu-dark opacity-50 mt-[3px] truncate">
            {date}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
