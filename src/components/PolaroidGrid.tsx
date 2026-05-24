import { PolaroidCard } from "./PolaroidCard";
import type { CSSProperties } from "react";

type EntryDirection = "left" | "right" | "top" | "bottom";

// Large offsets so cards start well off-screen regardless of viewport size
const ENTRY_OFFSETS: Record<EntryDirection, { x: number; y: number }> = {
  left: { x: -2400, y: 0 },
  right: { x: 2400, y: 0 },
  top: { x: 0, y: -1600 },
  bottom: { x: 0, y: 1600 },
};

interface PolaroidConfig {
  title: string;
  date: string;
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
}

// ═══════════════════════════════════════════════════════════════════════════
// POLAROID POSITION CONFIGURATION
//
// Edit the values below to customize each card's position, rotation,
// entry direction, and animation delay.
//
//   position         — CSS top/left/right values for the card's final location
//   finalRotation    — resting angle in degrees (negative = counter-clockwise)
//   initialRotation  — rotation while the card is airborne (larger feels more thrown)
//   entryDirection   — 'left' | 'right' | 'top' | 'bottom'
//   delay            — seconds before this card's animation begins
// ═══════════════════════════════════════════════════════════════════════════
const POLAROIDS: PolaroidConfig[] = [
  // ── Left-side cards (enter from the left) ──────────────────────────────
  {
    title: "Cultural Night",
    date: "Feb 22, 2025",
    gradient: "linear-gradient(135deg, #E5291E, #B51F17)",
    position: { top: "0%", left: "2%" },
    finalRotation: 18,
    initialRotation: 28,
    entryDirection: "left",
    delay: 0.05,
  },
  {
    title: "Welcome Week",
    date: "Aug 26, 2024",
    gradient: "linear-gradient(125deg, #241611, #5A2119)",
    position: { top: "15%", left: "18%" },
    finalRotation: -4,
    initialRotation: 24,
    entryDirection: "left",
    delay: 0.17,
  },
  {
    title: "Campus Life",
    date: "Mar 8, 2025",
    gradient: "linear-gradient(150deg, #FCEEC9, #E8C66A)",
    position: { top: "50%", left: "0%" },
    finalRotation: 6,
    initialRotation: 32,
    entryDirection: "left",
    delay: 0.1,
  },
  {
    title: "Food Night",
    date: "Apr 10, 2025",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "60%", left: "15%" },
    finalRotation: -23,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.25,
  },
  {
    title: "Food Night",
    date: "Apr 10, 2025",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "95%", left: "4%" },
    finalRotation: -15,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.02,
  },
  {
    title: "Food Night",
    date: "Apr 10, 2025",
    gradient: "linear-gradient(135deg, #E8C66A, #D4A853)",
    position: { top: "105%", left: "25%" },
    finalRotation: 20,
    initialRotation: 30,
    entryDirection: "left",
    delay: 0.2,
  },

  // ── Center cards ─────────────────────────────
  {
    title: "Spring Festival",
    date: "Mar 22, 2025",
    gradient: "linear-gradient(135deg, #E5291E, #FCEEC9)",
    position: { top: "-5%", left: "33%" },
    finalRotation: 6,
    initialRotation: -22,
    entryDirection: "top",
    delay: 0.08,
  },
  {
    title: "Game Night",
    date: "Nov 15, 2024",
    gradient: "linear-gradient(145deg, #5C0D0A, #E5291E)",
    position: { top: "-3%", left: "50%" },
    finalRotation: -5,
    initialRotation: -20,
    entryDirection: "bottom",
    delay: 0.23,
  },

  // ── Right-side cards ────────────────────────────
  {
    title: "Dance Show",
    date: "Oct 5, 2024",
    gradient: "linear-gradient(135deg, #FAF3E3, #E9E2D2)",
    position: { top: "10%", right: "23%" },
    finalRotation: -0,
    initialRotation: -28,
    entryDirection: "right",
    delay: 0.13,
  },
  {
    title: "Karaoke Night",
    date: "Jan 18, 2025",
    gradient: "linear-gradient(135deg, #1E1C12, #E5291E)",
    position: { top: "2%", right: "7%" },
    finalRotation: 2,
    initialRotation: -32,
    entryDirection: "right",
    delay: 0.27,
  },
  {
    title: "Study Hall",
    date: "Sep 20, 2024",
    gradient: "linear-gradient(125deg, #B51F17, #5C0D0A)",
    position: { top: "53%", right: "15%" },
    finalRotation: 7,
    initialRotation: -35,
    entryDirection: "right",
    delay: 0.04,
  },
  {
    title: "Community Day",
    date: "Apr 26, 2025",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "45%", right: "0%" },
    finalRotation: -15,
    initialRotation: -24,
    entryDirection: "right",
    delay: 0.15,
  },
  {
    title: "Community Day",
    date: "Apr 26, 2025",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "95%", right: "2%" },
    finalRotation: 22,
    initialRotation: -54,
    entryDirection: "right",
    delay: 0,
  },
  {
    title: "Community Day",
    date: "Apr 26, 2025",
    gradient: "linear-gradient(135deg, #FCEEC9, #FFF9ED)",
    position: { top: "100%", right: "24%" },
    finalRotation: -20,
    initialRotation: -54,
    entryDirection: "right",
    delay: 0.18,
  },
];

export function PolaroidGrid() {
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
          draggable={false}
        />
      </div>
      {POLAROIDS.map((card, i) => {
        const { x: entryX, y: entryY } = ENTRY_OFFSETS[card.entryDirection];
        return (
          <PolaroidCard
            key={i}
            title={card.title}
            date={card.date}
            gradient={card.gradient}
            finalRotation={card.finalRotation}
            initialRotation={card.initialRotation}
            entryX={entryX}
            entryY={entryY}
            delay={card.delay}
            positionStyle={card.position}
          />
        );
      })}
    </div>
  );
}
