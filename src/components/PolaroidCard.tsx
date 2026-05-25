import { useRef, useEffect } from "react";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

export type AnimateVariant =
  | "visible"
  | "hiddenLeft"
  | "hiddenRight"
  | "hiddenTop"
  | "hiddenBottom";

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
  /** X offset for the card's intro starting position (negative = from left, positive = from right) */
  entryX: number;
  /** Y offset for the card's intro starting position (negative = from top, positive = from bottom) */
  entryY: number;
  delay?: number;
  positionStyle: CSSProperties;
  /** Controls whether the card is on-screen or flying off in a direction. */
  animateVariant: AnimateVariant;
  /**
   * Transform offsets applied when the card is in the compressed layout state
   * (inner cards hidden, outer cards shift inward). Both default to 0.
   * Left-side cards → positive compressedX (moves right/inward).
   * Right-side cards → negative compressedX (moves left/inward).
   */
  compressedX?: number;
  compressedY?: number;
  /** Rotation used in the compressed state. Defaults to finalRotation. */
  compressedRotation?: number;
}

// Distance cards travel when flying off / back — mirrors ENTRY_OFFSETS
const OFF_X = 2400;
const OFF_Y = 1600;

// Fast-launch, smooth-deceleration: the throw-onto-a-table feel
const FLY_IN_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
// Slow-start, rapid-acceleration: the throw-off-the-table feel
const FLY_OFF_EASE = [0.7, 0, 0.84, 0] as [number, number, number, number];

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
  animateVariant,
  compressedX = 0,
  compressedY = 0,
  compressedRotation,
}: Props) {
  // Track whether this card has completed its first (intro) animation.
  // Before the intro completes, visible-state transitions include the stagger
  // delay so the throw-landing feel is preserved. After the intro (and for
  // resize-triggered position-only changes), no delay is applied so
  // compression / decompression feels immediate and snappy.
  const isFirstRender = useRef(true);
  useEffect(() => {
    isFirstRender.current = false;
  }, []);

  // Track the previous variant so we can detect when a card transitions
  // from any hidden state back to visible (fly-back from off-screen).
  // Fly-backs deserve the full throw-timing (with delay) just like the intro.
  const prevVariant = useRef<AnimateVariant>(animateVariant);
  const wasHidden = prevVariant.current !== "visible";
  prevVariant.current = animateVariant;

  const comingFromHidden =
    !isFirstRender.current && animateVariant === "visible" && wasHidden;

  // Whether to use throw-landing timing (intro + fly-back) or the faster
  // position-only timing (compression / decompression while already on-screen).
  const useThrowTiming = isFirstRender.current || comingFromHidden;

  // Variants for the off-screen states only.
  // When animate is a string, Motion looks up these definitions.
  const hiddenVariants = {
    hiddenLeft: {
      x: -OFF_X,
      y: 0,
      rotate: initialRotation,
      scale: 1.12,
      opacity: 0,
      transition: {
        duration: 0.55,
        ease: FLY_OFF_EASE,
        opacity: { duration: 0.22, ease: "easeIn" as const },
      },
    },
    hiddenRight: {
      x: OFF_X,
      y: 0,
      rotate: initialRotation,
      scale: 1.12,
      opacity: 0,
      transition: {
        duration: 0.55,
        ease: FLY_OFF_EASE,
        opacity: { duration: 0.22, ease: "easeIn" as const },
      },
    },
    hiddenTop: {
      x: 0,
      y: -OFF_Y,
      rotate: initialRotation,
      scale: 1.12,
      opacity: 0,
      transition: {
        duration: 0.55,
        ease: FLY_OFF_EASE,
        opacity: { duration: 0.22, ease: "easeIn" as const },
      },
    },
    hiddenBottom: {
      x: 0,
      y: OFF_Y,
      rotate: initialRotation,
      scale: 1.12,
      opacity: 0,
      transition: {
        duration: 0.55,
        ease: FLY_OFF_EASE,
        opacity: { duration: 0.22, ease: "easeIn" as const },
      },
    },
  };

  // Build the animate target. Hidden states use variant strings so Motion can
  // look up the easing/duration defined in hiddenVariants. Visible states use
  // a plain object so we can include the compression offset (compressedX/Y)
  // and choose the right transition timing dynamically.
  const animateTarget =
    animateVariant !== "visible"
      ? animateVariant
      : {
          x: compressedX,
          y: compressedY,
          rotate: compressedRotation ?? finalRotation,
          scale: 1,
          opacity: 1,
          transition: useThrowTiming
            ? {
                // Intro / fly-back: full throw timing with stagger delay
                duration: 0.85,
                ease: FLY_IN_EASE,
                delay,
                opacity: { duration: 0.18, ease: "easeOut" as const, delay },
              }
            : {
                // Compression / decompression: short transition so the card
                // tracks the viewport edge smoothly during continuous resize
                duration: 0.25,
                ease: FLY_IN_EASE,
              },
        };

  return (
    <motion.div
      // `initial` fires once on mount — positions the card at its entry point
      // before the intro animation begins. Ignored on all subsequent renders.
      initial={{
        x: entryX,
        y: entryY,
        rotate: initialRotation,
        scale: 1.12,
        opacity: 0,
      }}
      animate={animateTarget}
      variants={hiddenVariants}
      whileHover={{
        y: (compressedY ?? 0) - 8,
        transition: { type: "spring", stiffness: 280, damping: 22 },
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
