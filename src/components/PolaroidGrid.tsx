import { useState, useEffect } from "react";
import { PolaroidCard, type AnimateVariant } from "./PolaroidCard";
import type { CSSProperties } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// RESPONSIVE POLAROID VISIBILITY THRESHOLDS
//
// These values control when Polaroid cards fly off or fly back as the
// browser window is resized on desktop.
//
// Width thresholds (viewport px) — cards fly off when width drops BELOW:
//   hideOuterAt  → inner (center) cards fly off first
//   hideMiddleAt → middle left/right cards also fly off
//   hideAllAt    → outer left/right + top-center cards fly off last
//
// Height thresholds (viewport px) — cards fly off when height drops BELOW:
//   hideTopCenterAt → top-center cards (Drink Fundraiser, ASU K-Pop Dance)
//   hideOuterAt     → other "top" and "bottom" vertical cards
//   hideMiddleAt    → reserved; adjust cards' verticalGroup to use this tier
//   hideAllAt       → all remaining cards fly off
//
// Increase a value to make cards disappear sooner (more aggressive hiding).
// Decrease a value to let cards stay visible longer.
// ═══════════════════════════════════════════════════════════════════════════
const THRESHOLDS = {
  width: {
    hideOuterAt: 1500, // outer horizontal cards hide below this width
    hideMiddleAt: 1660, // middle horizontal cards also hide below this
    hideAllAt: 1000, // all cards hide below this width
  },
  height: {
    hideTopCenterAt: 900, // top-center cards hide below this height (before other top cards)
    hideOuterAt: 820, // "top" + "bottom" vertical cards hide below this height
    hideMiddleAt: 650, // reserved — assign verticalGroup: "middle-outer" to use
    hideAllAt: 550, // all cards hide below this height
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────

type EntryDirection = "left" | "right" | "top" | "bottom";
type FlyOffDirection = "left" | "right" | "top" | "bottom";
type HorizontalGroup = "outer" | "middle" | "inner";
type VerticalGroup = "top" | "middle" | "bottom" | "top-center";

// Large offsets so cards start well off-screen regardless of viewport size
const ENTRY_OFFSETS: Record<EntryDirection, { x: number; y: number }> = {
  left: { x: -2400, y: 0 },
  right: { x: 2400, y: 0 },
  top: { x: 0, y: -1600 },
  bottom: { x: 0, y: 1600 },
};

interface ResponsiveVisibility {
  /**
   * Controls when the card flies off as width shrinks.
   *   "inner"  → hides first  (width < hideOuterAt)
   *   "middle" → hides second (width < hideMiddleAt)
   *   "outer"  → hides last   (width < hideAllAt)
   */
  horizontalGroup: HorizontalGroup;
  /**
   * Controls when the card flies off as height shrinks.
   *   "top-center" → hides first (height < hideTopCenterAt) — center cards above the logo
   *   "top"        → hides when height < hideOuterAt (flies upward by default)
   *   "bottom"     → hides when height < hideOuterAt (flies downward by default)
   *   "middle"     → hides last (height < hideAllAt)
   */
  verticalGroup: VerticalGroup;
  /**
   * Which direction the card flies off-screen.
   * Left-side cards → "left", right-side cards → "right",
   * top-entering center cards → "top", bottom-entering → "bottom".
   * This direction is used for both width-triggered and height-triggered hides.
   */
  flyOffDirection: FlyOffDirection;
}

interface PolaroidConfig {
  title: string;
  date: string;
  imageSrc?: string;
  imageAlt?: string;
  gradient: string;
  // ── Where this card lands on the page ──────────────────────────────
  position: CSSProperties;
  // ── Final resting angle after the card lands (subtle, -10 to +10) ──
  finalRotation: number;
  // ── Rotation while the card is in the air (bigger = more dramatic) ─
  initialRotation: number;
  // ── Which side the card enters from ────────────────────────────────
  entryDirection: EntryDirection;
  // ── Stagger delay in seconds (spread cards out over ~0.3s total) ───
  delay: number;
  // ── Responsive resize behavior ─────────────────────────────────────
  responsiveVisibility: ResponsiveVisibility;
}

// ═══════════════════════════════════════════════════════════════════════════
// POLAROID CARD CONFIGURATION
//
// Edit this array to change images, text, positions, rotations, animation
// timing, and responsive resize behavior.
//
//   title                              — caption shown below the photo
//   date                               — date shown below the caption
//   imageSrc                           — image path (gradient used if absent)
//   gradient                           — fallback CSS gradient
//   position                           — CSS top/left/right for resting position
//   finalRotation                      — resting angle in degrees
//   initialRotation                    — rotation while airborne (larger = wilder)
//   entryDirection                     — 'left' | 'right' | 'top' | 'bottom'
//   delay                              — intro animation stagger delay (seconds)
//   responsiveVisibility.horizontalGroup — 'outer' | 'middle' | 'inner'
//   responsiveVisibility.verticalGroup   — 'top' | 'middle' | 'bottom' | 'top-center'
//   responsiveVisibility.flyOffDirection — 'left' | 'right' | 'top' | 'bottom'
// ═══════════════════════════════════════════════════════════════════════════
const POLAROIDS: PolaroidConfig[] = [
  // ── Left-side cards (enter from the left) ──────────────────────────────
  {
    title: "Halloween GBM",
    date: "Oct. 30th, 2025",
    imageSrc: "/images/polaroidImages/halloween.webp",
    gradient: "linear-gradient(135deg, #E5291E, #B51F17)",
    position: { top: "0%", left: "0%" },
    finalRotation: 10,
    initialRotation: 28,
    entryDirection: "left",
    delay: 0.05,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top",
      flyOffDirection: "left",
    },
  },
  {
    title: "Welcome Back GBM",
    date: "Sept. 3rd, 2025",
    imageSrc: "/images/polaroidImages/kickOff.webp",
    gradient: "linear-gradient(125deg, #241611, #5A2119)",
    position: { top: "14%", left: "16%" },
    finalRotation: -4,
    initialRotation: 24,
    entryDirection: "left",
    delay: 0.17,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "middle",
      flyOffDirection: "left",
    },
  },
  {
    title: "InnovAsian",
    date: "Apr. 4th, 2026",
    imageSrc: "/images/polaroidImages/innoAll.webp",
    gradient: "linear-gradient(150deg, #FCEEC9, #E8C66A)",
    position: { top: "50%", left: "0%" },
    finalRotation: 6,
    initialRotation: 32,
    entryDirection: "left",
    delay: 0.1,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "middle",
      flyOffDirection: "left",
    },
  },
  {
    title: "Kickoff GBM",
    imageSrc: "/images/polaroidImages/iceCreamSocial.webp",
    date: "Sept. 19th, 2025",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "58%", left: "17%" },
    finalRotation: -17,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.25,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "middle",
      flyOffDirection: "left",
    },
  },
  {
    title: "Career Fair Prep & Success GBM",
    date: "Feb. 5th, 2026",
    imageSrc: "/images/polaroidImages/proDev.webp",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "95%", left: "2%" },
    finalRotation: -15,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.02,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "bottom",
      flyOffDirection: "left",
    },
  },
  {
    title: "ASU K-Pop Dance at ICF",
    date: "Nov. 9th, 2025",
    imageSrc: "/images/polaroidImages/go.webp",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "103%", left: "20%" },
    finalRotation: 11,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.2,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "bottom",
      flyOffDirection: "left",
    },
  },

  // ── Center cards ────────────────────────────────────────────────────────
  {
    title: "Drink Fundraiser",
    date: "Oct. 9th, 2025",
    imageSrc: "/images/polaroidImages/drinkFundraiser.webp",
    gradient: "linear-gradient(135deg, #E5291E, #FCEEC9)",
    position: { top: "-5%", left: "33%" },
    finalRotation: 6,
    initialRotation: -22,
    entryDirection: "top",
    delay: 0.08,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top-center",
      flyOffDirection: "top",
    },
  },
  {
    title: "ASU K-Pop Dance",
    imageSrc: "/images/polaroidImages/asuDance.webp",
    date: "Apr. 3rd, 2026",
    gradient: "linear-gradient(145deg, #5C0D0A, #E5291E)",
    position: { top: "-3%", left: "50%" },
    finalRotation: -5,
    initialRotation: -20,
    entryDirection: "bottom",
    delay: 0.23,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top-center",
      flyOffDirection: "bottom",
    },
  },

  // ── Right-side cards ────────────────────────────────────────────────────
  {
    title: "ASU Games GBM",
    date: "Apr. 30th, 2026",
    gradient: "linear-gradient(135deg, #FAF3E3, #E9E2D2)",
    imageSrc: "/images/polaroidImages/asuGames.webp",
    position: { top: "8%", right: "19%" },
    finalRotation: 8,
    initialRotation: -28,
    entryDirection: "right",
    delay: 0.13,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "top",
      flyOffDirection: "right",
    },
  },
  {
    title: "Ramen Fundraiser",
    date: "Nov 13th, 2025",
    imageSrc: "/images/polaroidImages/ramen.webp",
    gradient: "linear-gradient(135deg, #1E1C12, #E5291E)",
    position: { top: "2%", right: "0%" },
    finalRotation: -5,
    initialRotation: -32,
    entryDirection: "right",
    delay: 0.27,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top",
      flyOffDirection: "right",
    },
  },
  {
    title: "Mocktail Mania GBM",
    imageSrc: "/images/polaroidImages/mocktail.webp",
    date: "Sept. 20th, 2024",
    gradient: "linear-gradient(125deg, #B51F17, #5C0D0A)",
    position: { top: "53%", right: "18%" },
    finalRotation: 7,
    initialRotation: -35,
    entryDirection: "right",
    delay: 0.04,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "middle",
      flyOffDirection: "right",
    },
  },
  {
    title: "1 + 1 Boba Fundraiser",
    imageSrc: "/images/polaroidImages/1p1.webp",
    date: "Feb. 18th, 2026",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "45%", right: "0%" },
    finalRotation: -10,
    initialRotation: -24,
    entryDirection: "right",
    delay: 0.15,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "middle",
      flyOffDirection: "right",
    },
  },
  {
    title: "Ledges Social",
    date: "Oct. 18th, 2025",
    imageSrc: "/images/polaroidImages/ledges.webp",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "95%", right: "1%" },
    finalRotation: 15,
    initialRotation: -54,
    entryDirection: "right",
    delay: 0,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "bottom",
      flyOffDirection: "right",
    },
  },
  {
    title: "Triple Play GBM",
    date: "Apr 26th, 2025",
    imageSrc: "/images/polaroidImages/triplePlay.webp",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "102%", right: "20%" },
    finalRotation: -10,
    initialRotation: -54,
    entryDirection: "right",
    delay: 0.18,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "bottom",
      flyOffDirection: "right",
    },
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Viewport size tracking — RAF-throttled so resize events don't trigger
// more than one state update per animation frame.
// ─────────────────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let raf: number | null = null;

    function onResize() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        raf = null;
      });
    }

    setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return size;
}

// ─────────────────────────────────────────────────────────────────────────────
// Derives the Motion variant for a card based on the current viewport size.
// Returns "visible" when the card should be on-screen, or the appropriate
// "hidden*" variant when it should fly off.
// ─────────────────────────────────────────────────────────────────────────────
function getAnimateVariant(
  card: PolaroidConfig,
  width: number,
  height: number,
): AnimateVariant {
  // size is 0 on SSR / before the first useEffect fires → show all cards
  if (width === 0 || height === 0) return "visible";

  const { horizontalGroup, verticalGroup, flyOffDirection } =
    card.responsiveVisibility;
  const tw = THRESHOLDS.width;
  const th = THRESHOLDS.height;

  const hiddenByWidth =
    width < tw.hideAllAt ||
    (width < tw.hideMiddleAt &&
      (horizontalGroup === "inner" || horizontalGroup === "middle")) ||
    (width < tw.hideOuterAt && horizontalGroup === "inner");

  const hiddenByHeight =
    height < th.hideAllAt ||
    (height < th.hideOuterAt &&
      (verticalGroup === "top" || verticalGroup === "bottom")) ||
    (height < th.hideTopCenterAt && verticalGroup === "top-center");

  if (!hiddenByWidth && !hiddenByHeight) return "visible";

  // Width-triggered hides take priority for direction; fall back to the
  // card's configured flyOffDirection for height-only hides.
  switch (flyOffDirection) {
    case "left":
      return "hiddenLeft";
    case "right":
      return "hiddenRight";
    case "top":
      return "hiddenTop";
    case "bottom":
      return "hiddenBottom";
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export function PolaroidGrid() {
  const { width, height } = useWindowSize();

  return (
    /*
     * overflow-visible so cards are never clipped by this container.
     * Horizontal clipping is handled by overflow-x-clip on the parent <section>.
     */
    <div
      className="relative w-full overflow-visible"
      style={{ height: "clamp(520px, 70vh, 780px)" }}
    >
      {/* Centered logo — rendered first so all polaroid cards layer on top of it */}
      <div
        className="absolute"
        style={{
          top: "68%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      >
        <img
          src="/images/asu-logo.webp"
          alt="Asian Student Union"
          className="w-100 md:w-125 h-auto select-none pointer-events-none"
          decoding="async"
          draggable={false}
        />
      </div>

      {POLAROIDS.map((card, i) => {
        const { x: entryX, y: entryY } = ENTRY_OFFSETS[card.entryDirection];
        const animateVariant = getAnimateVariant(card, width, height);
        return (
          <PolaroidCard
            key={i}
            title={card.title}
            date={card.date}
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
            gradient={card.gradient}
            finalRotation={card.finalRotation}
            initialRotation={card.initialRotation}
            entryX={entryX}
            entryY={entryY}
            delay={card.delay}
            positionStyle={card.position}
            animateVariant={animateVariant}
          />
        );
      })}
    </div>
  );
}
