import { useState, useEffect, useLayoutEffect } from "react";
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
    hideOuterAt: 1500, // inner (center) horizontal cards hide below this width
    hideMiddleAt: 1788, // middle left/right cards also hide below this
    hideAllAt: 1050, // all cards hide below this width
  },
  height: {
    hideTopCenterAt: 1000, // top-center cards hide below this height (before other top cards)
    hideOuterAt: 820, // "top" + "bottom" vertical cards hide below this height
    hideMiddleAt: 650, // reserved — assign verticalGroup: "middle-outer" to use
    hideAllAt: 550, // all cards hide below this height
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════
// LARGE-SCREEN TUNING — applies at 2560×1440 and above
//
// These values ONLY take effect above transitionStart. At 1920×1080 and
// below, largeProgress = 0 and the layout is pixel-identical to before.
// Values are linearly interpolated between transitionStart and transitionEnd.
//
// HOW IT WORKS — safe separation from the intro animation:
//   Card spreading uses CSS layout properties (left / right / top) via
//   calc() strings, NOT Motion transform values (x / y / scale / rotate).
//   Card scaling uses CSS transform on the inner frame <div>, NOT on the
//   motion.div that Motion controls. The intro animation is untouched.
//
// transitionStart      — viewport px below which the 1920p layout is exact
// transitionEnd        — viewport px at which all values are fully applied
// cardScaleMax         — max CSS scale on the Polaroid frame (1 = unchanged)
// logoScaleMax         — max CSS scale on the ASU logo (1 = unchanged)
// extraSpreadX         — extra px pushed beyond screen-edge restoration (per side)
// extraSpreadY         — extra px top/bottom-group cards spread vertically
// gridHeightBonus      — extra px added to the grid clamp max-height
// outerSpreadFraction  — spread multiplier for outer-group cards (1.0 = full)
// middleSpreadFraction — spread multiplier for middle-group cards
//                        Keep lower than outerSpreadFraction so outer cards
//                        spread further, creating a scattered rather than
//                        grouped look.
// ═══════════════════════════════════════════════════════════════════════════
const LARGE_SCREEN = {
  transitionStart: 1920,
  transitionEnd: 2560,
  cardScaleMax: 1.35,
  logoScaleMax: 1.28,
  extraSpreadX: 80,
  extraSpreadY: 60,
  gridHeightBonus: 180,
  outerSpreadFraction: 0.7,
  middleSpreadFraction: 0.35,
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// LOGO HALF-WIDTH (used for dynamic compressed positioning)
//
// The ASU logo renders at w-125 = 500 px at desktop (md+) breakpoints, so
// its half-width is 250 px. The centering formula uses this to locate the
// logo edges and place outer Polaroid cards exactly in the middle of the
// strip between the screen edge and the nearest logo edge.
//
// If the logo CSS class changes, update this constant to match.
// ─────────────────────────────────────────────────────────────────────────────
const LOGO_HALF_WIDTH_DESKTOP = 250; // px — half of w-125 (500 px)

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
  // ── Final resting angle after the card lands ──────────────────────
  finalRotation: number;
  // ── Rotation while the card is in the air (bigger = more dramatic) ─
  initialRotation: number;
  // ── Which side the card enters from ────────────────────────────────
  entryDirection: EntryDirection;
  // ── Stagger delay in seconds (spread cards out over ~0.3s total) ───
  delay: number;
  // ── Responsive resize behavior ─────────────────────────────────────
  responsiveVisibility: ResponsiveVisibility;
  // ── Compressed position (active when middle cards are hidden) ──────
  // When the middle-group cards disappear at the hideMiddleAt threshold,
  // "outer" cards that remain visible shift inward so they stay centered
  // in the strip between the screen edge and the logo edge, adapting
  // continuously as the viewport narrows.
  //
  // Receives the current viewport width in px; returns { x, y } offsets.
  // Left-side cards: positive x moves the card right (inward).
  // Right-side cards: negative x moves the card left (inward).
  // Omit or set undefined to leave the card in its default position.
  compressedOffset?: (viewportWidth: number) => { x: number; y: number };
  // Optional rotation used in the compressed state; defaults to finalRotation.
  compressedRotation?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// POLAROID CARD CONFIGURATION
//
// Edit this array to change images, text, positions, rotations, animation
// timing, responsive resize behavior, and compressed positions.
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
//
//   compressedOffset(w) — fn(viewportWidth) → { x, y } centering the card in
//                         the strip between screen edge and logo edge dynamically
//   compressedRotation  — rotation in compressed state (optional)
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
    // COMPRESSED POSITION — stays centered between screen edge and logo edge
    compressedOffset: (w) => ({
      x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
      y: 0,
    }),
    compressedRotation: 8,
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
    // Middle-group card: hidden in compressed state, no offset needed
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
    // COMPRESSED POSITION — stays centered between screen edge and logo edge
    compressedOffset: (w) => ({
      x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
      y: 0,
    }),
    compressedRotation: 5,
  },
  {
    title: "Kickoff GBM",
    imageSrc: "/images/polaroidImages/iceCreamSocial.webp",
    date: "Sept. 19th, 2025",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "58%", left: "17%", zIndex: "20" },
    finalRotation: -17,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.25,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "middle",
      flyOffDirection: "left",
    },
    // Middle-group card: hidden in compressed state, no offset needed
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
    // COMPRESSED POSITION — offset by left: 2% so we subtract that from the center
    compressedOffset: (w) => ({
      x: Math.max(0, (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2 - 0.02 * w),
      y: 0,
    }),
    compressedRotation: -12,
  },
  {
    title: "ASU K-Pop Dance at ICF",
    date: "Nov. 9th, 2025",
    imageSrc: "/images/polaroidImages/go.webp",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "103%", left: "18%" },
    finalRotation: 11,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.2,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "bottom",
      flyOffDirection: "left",
    },
    // Middle-group card: hidden in compressed state, no offset needed
  },

  // ── Center cards ────────────────────────────────────────────────────────
  {
    title: "Drink Fundraiser",
    date: "Oct. 9th, 2025",
    imageSrc: "/images/polaroidImages/drinkFundraiser.webp",
    gradient: "linear-gradient(135deg, #E5291E, #FCEEC9)",
    position: { top: "-10%", left: "30%" },
    finalRotation: -6,
    initialRotation: 22,
    entryDirection: "top",
    delay: 0.08,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top-center",
      flyOffDirection: "top",
    },
    // Center card: already well-positioned in compressed state, no inward shift needed
  },
  {
    title: "ASU K-Pop Dance",
    imageSrc: "/images/polaroidImages/asuDance.webp",
    date: "Apr. 3rd, 2026",
    gradient: "linear-gradient(145deg, #5C0D0A, #E5291E)",
    position: { top: "-10%", left: "52%" },
    finalRotation: 5,
    initialRotation: -20,
    entryDirection: "bottom",
    delay: 0.23,
    responsiveVisibility: {
      horizontalGroup: "outer",
      verticalGroup: "top-center",
      flyOffDirection: "bottom",
    },
    // Center card: no inward shift needed
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
    // Middle-group card: hidden in compressed state, no offset needed
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
    // COMPRESSED POSITION — ramen card is ~362px wide (660×440 image at h-55)
    compressedOffset: (w) => ({
      x: Math.min(0, -((w / 2 - LOGO_HALF_WIDTH_DESKTOP - 362) / 2)),
      y: 0,
    }),
    compressedRotation: -3,
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
    // Middle-group card: hidden in compressed state, no offset needed
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
    // COMPRESSED POSITION — stays centered between logo edge and screen edge
    compressedOffset: (w) => ({
      x: Math.min(0, -((w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2)),
      y: 0,
    }),
    compressedRotation: -8,
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
    // COMPRESSED POSITION — offset by right: 1% so we add that back
    compressedOffset: (w) => ({
      x: Math.min(0, 0.01 * w - (w / 2 - LOGO_HALF_WIDTH_DESKTOP - 326) / 2),
      y: 0,
    }),
    compressedRotation: 12,
  },
  {
    title: "Triple Play GBM",
    date: "Apr 26th, 2025",
    imageSrc: "/images/polaroidImages/triplePlay.webp",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "102%", right: "17%" },
    finalRotation: -10,
    initialRotation: -54,
    entryDirection: "right",
    delay: 0.18,
    responsiveVisibility: {
      horizontalGroup: "middle",
      verticalGroup: "bottom",
      flyOffDirection: "right",
    },
    // Middle-group card: hidden in compressed state, no offset needed
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Viewport size tracking — RAF-throttled so resize events don't trigger
// more than one state update per animation frame.
//
// The INITIAL measurement uses useLayoutEffect (synchronous, fires before the
// browser paints and before any useEffect hooks run). This guarantees that the
// grid height and large-screen CSS positions are correct on the very first
// paint, so there is no layout shift visible to the user when the page loads
// on a 1440p+ screen.
// ─────────────────────────────────────────────────────────────────────────────
function useWindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 });

  // Synchronous initial measurement — must happen before paint so the grid
  // height and card positions are correct from frame one.
  useLayoutEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Ongoing resize listener — async RAF throttle is correct here.
  useEffect(() => {
    let raf: number | null = null;

    function onResize() {
      if (raf !== null) return;
      raf = requestAnimationFrame(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        raf = null;
      });
    }

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

  // ── Compressed state ────────────────────────────────────────────────────
  // When inner cards (middle horizontal group) are hidden but outer cards
  // are still visible, outer cards shift inward using their compressedOffset
  // to fill the empty space and keep the hero composition balanced.
  //
  // Active when: middle cards are hidden  (width < hideMiddleAt)
  //          AND all cards are still shown (width >= hideAllAt)
  const isCompressed =
    width > 0 &&
    width < THRESHOLDS.width.hideMiddleAt &&
    width >= THRESHOLDS.width.hideAllAt;

  // ── Large-screen layout ─────────────────────────────────────────────────
  // Progress: 0 at ≤ transitionStart (1920p layout exact), ramps to 1 at
  // transitionEnd (all values fully applied), capped at 1 beyond.
  // Zero on SSR / before first layout measurement.
  const largeProgress =
    width > 0
      ? Math.min(
          1,
          Math.max(
            0,
            (width - LARGE_SCREEN.transitionStart) /
              (LARGE_SCREEN.transitionEnd - LARGE_SCREEN.transitionStart),
          ),
        )
      : 0;

  // Extra horizontal space (px) on each side of the 1920px content box.
  // Outer cards are pushed outward by this amount to restore their 1920p
  // screen-edge appearance, then pushed an additional extraSpreadX px.
  const containerMargin = Math.max(0, (width - 1920) / 2);

  // Interpolated scale values (1 = no change at 1920p)
  const computedCardScale = 1 + (LARGE_SCREEN.cardScaleMax - 1) * largeProgress;
  const computedLogoScale = 1 + (LARGE_SCREEN.logoScaleMax - 1) * largeProgress;

  const isMobile = width > 0 && width < 768;

  // Grid height: raise the clamp max for large screens so the composition
  // fills the extra vertical space and reduces the gap above Next Event.
  // On mobile all polaroid cards are hidden, so a much shorter container is used
  // to keep the logo prominent and the "Next Event" cue visible without scrolling.
  const gridMaxH = isMobile
    ? 380
    : Math.round(780 + LARGE_SCREEN.gridHeightBonus * largeProgress);

  return (
    /*
     * overflow-visible so cards are never clipped by this container.
     * Horizontal clipping is handled by overflow-x-clip on the parent <section>.
     */
    <div
      className="relative w-full overflow-visible"
      style={{
        height: isMobile
          ? `clamp(300px, 46dvh, ${gridMaxH}px)`
          : `clamp(520px, 70vh, ${gridMaxH}px)`,
      }}
    >
      {/* Centered logo — rendered first so all polaroid cards layer on top of it */}
      <div
        className="absolute"
        style={{
          top: isMobile ? "62%" : "68%",
          left: "50%",
          // ── MOBILE LOGO SCALE ──────────────────────────────────────────────
          // `scale(N)` here is the easiest knob: raise it to make the logo
          // appear larger on mobile (both wider AND taller). The parent
          // <section> has overflow-x-clip so horizontal overflow is safe.
          // Start at 1.4 and increase in 0.1 steps until it looks right.
          transform: isMobile
            ? `translate(-50%, -50%) scale(1.6)`
            : `translate(-50%, -50%) scale(${computedLogoScale.toFixed(4)})`,
          zIndex: 0,
        }}
      >
        <img
          src="/images/asu-logo.webp"
          alt="Asian Student Union"
          // ── MOBILE LOGO WIDTH ──────────────────────────────────────────────
          // Inline style used (not a Tailwind class) so the value is always
          // applied regardless of CSS generation / scanning. Change the vw
          // value here to adjust base width before scaling above is applied.
          style={isMobile ? { width: "100vw" } : undefined}
          className="md:w-125 h-auto select-none pointer-events-none"
          decoding="async"
          draggable={false}
        />
      </div>

      {POLAROIDS.map((card, i) => {
        const { x: entryX, y: entryY } = ENTRY_OFFSETS[card.entryDirection];
        const animateVariant = getAnimateVariant(card, width, height);

        // Apply the compressed offset only when:
        //   - the compressed state is active
        //   - this card has a configured compressedOffset
        //   - the card is currently visible (not flying off)
        const applyCompression =
          isCompressed &&
          card.compressedOffset != null &&
          animateVariant === "visible";

        const offset = applyCompression ? card.compressedOffset!(width) : null;
        const compressedX = offset?.x ?? 0;
        const compressedY = offset?.y ?? 0;
        const compressedRotation = applyCompression
          ? card.compressedRotation
          : undefined;

        // ── Large-screen CSS position adjustment ───────────────────────────
        // Adjusts CSS layout properties (left / right / top) via calc()
        // strings. Motion's own transform values (x, y, scale, rotate) are
        // NOT touched — the intro animation is completely unaffected.
        //
        // Outer cards get the full spread; middle cards get a smaller
        // fraction. This produces the scattered look: outer cards land near
        // the screen edge while middle cards stay closer to center.
        let effectivePosition: CSSProperties = card.position;
        if (largeProgress > 0) {
          const { flyOffDirection, horizontalGroup, verticalGroup } =
            card.responsiveVisibility;

          const hFraction =
            horizontalGroup === "outer"
              ? LARGE_SCREEN.outerSpreadFraction
              : horizontalGroup === "middle"
                ? LARGE_SCREEN.middleSpreadFraction
                : 0;

          // Total horizontal shift = restore 1920p screen-edge position
          // (containerMargin) + extra outward push (extraSpreadX).
          const hDelta =
            (containerMargin + LARGE_SCREEN.extraSpreadX) *
            largeProgress *
            hFraction;

          // Vertical fraction mirrors horizontal: edge cards spread more.
          const vFraction =
            horizontalGroup === "outer"
              ? 1.0
              : horizontalGroup === "middle"
                ? 0.5
                : 0;
          const vDelta = LARGE_SCREEN.extraSpreadY * largeProgress * vFraction;

          const overrides: CSSProperties = {};

          if (hDelta > 0.5) {
            if (flyOffDirection === "left" && card.position.left != null) {
              // Push further left: reduce the left value (negative = past edge)
              overrides.left = `calc(${card.position.left} - ${hDelta.toFixed(1)}px)`;
            } else if (
              flyOffDirection === "right" &&
              card.position.right != null
            ) {
              // Push further right: reduce the right value (negative = past edge)
              overrides.right = `calc(${card.position.right} - ${hDelta.toFixed(1)}px)`;
            }
          }

          if (
            vDelta > 0.5 &&
            card.position.top != null &&
            verticalGroup === "top"
          ) {
            overrides.top = `calc(${card.position.top} - ${vDelta.toFixed(1)}px)`;
          }

          if (Object.keys(overrides).length > 0) {
            effectivePosition = { ...card.position, ...overrides };
          }
        }

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
            positionStyle={effectivePosition}
            animateVariant={animateVariant}
            compressedX={compressedX}
            compressedY={compressedY}
            compressedRotation={compressedRotation}
            innerScale={computedCardScale}
          />
        );
      })}
    </div>
  );
}
