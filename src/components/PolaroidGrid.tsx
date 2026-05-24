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
    title: "Halloween GBM",
    date: "Oct. 30th, 2025",
    imageSrc: "/images/polaroidImages/halloween.webp",

    gradient: "linear-gradient(135deg, #E5291E, #B51F17)",
    position: { top: "0%", left: "0%" },
    finalRotation: 10,
    initialRotation: 28,
    entryDirection: "left",
    delay: 0.05,
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
  },

  // ── Center cards ─────────────────────────────
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
  },

  // ── Right-side cards ────────────────────────────
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
          decoding="async"
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
            imageSrc={card.imageSrc}
            imageAlt={card.imageAlt}
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
