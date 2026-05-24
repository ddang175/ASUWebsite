import { motion } from 'motion/react';
import type { CSSProperties } from 'react';

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
        transition: { type: 'spring', stiffness: 280, damping: 22 },
      }}
      transition={{
        // Aggressive ease-out: card launches fast, decelerates into final position.
        // Curve reaches ~80% progress by 20% of the duration — no overshoot, no bounce.
        duration: 0.85,
        ease: [0.16, 1, 0.3, 1],
        delay,
        // Opacity fades in quickly so the card is visible during the throw
        opacity: { duration: 0.18, ease: 'easeOut', delay },
      }}
      style={{ position: 'absolute', ...positionStyle }}
      className="w-44 md:w-56 cursor-default select-none"
    >
      {/* Polaroid frame — ASU Cream background, 4px radius */}
      <div
        className="bg-asu-cream rounded p-3 md:p-4"
        style={{
          paddingBottom: '2.75rem',
          boxShadow: '0px 6px 24px rgba(30, 28, 18, 0.12)',
        }}
      >
        <div className="w-full aspect-square rounded-[2px] overflow-hidden bg-asu-beige relative">
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{ background: gradient ?? 'linear-gradient(135deg, #FCEEC9, #E8C66A)' }}
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
