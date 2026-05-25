import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT = [0.18, 0.78, 0.2, 1] as [number, number, number, number];

interface OfficerData {
  id: string;
  role: string;
  name: string;
  country: string;
  countryLabel: string;
  major: string;
  hometown: string;
  year: string;
  blurb: string;
}

const OFFICERS: OfficerData[] = [
  {
    id: "president",
    role: "President",
    name: "Full Name",
    country: "us",
    countryLabel: "United States",
    major: "Computer Science",
    hometown: "Des Moines, IA",
    year: "Senior",
    blurb: "A short blurb written by the president goes here — what ASU means to them, why they joined the board, and what they're most excited about this year. Aim for three to five sentences so the rhythm stays consistent across all officers. The president usually closes with a short hello to new and returning members.",
  },
  {
    id: "vp",
    role: "Vice President",
    name: "Full Name",
    country: "vn",
    countryLabel: "Vietnam",
    major: "Business Analytics",
    hometown: "Cedar Rapids, IA",
    year: "Junior",
    blurb: "A short personal blurb from the vice president — what they bring to the board this year, the corner of ASU they're most invested in, and a favorite memory from a past event. End with one line that invites new members to come say hi at the next GBM.",
  },
  {
    id: "treasurer",
    role: "Treasurer",
    name: "Full Name",
    country: "kr",
    countryLabel: "South Korea",
    major: "Finance",
    hometown: "Ames, IA",
    year: "Sophomore",
    blurb: "Treasurer's blurb — keeping the books balanced and the boba flowing. A few sentences about how they got into the role, what they're working on this year, and the events they're most looking forward to budgeting for. They're also the person to talk to about reimbursements at the end of the night.",
  },
  {
    id: "community",
    role: "Community Chair",
    name: "Full Name",
    country: "cn",
    countryLabel: "China",
    major: "Psychology",
    hometown: "Chicago, IL",
    year: "Junior",
    blurb: "Community chair's blurb — building bridges with VSA, KASA, and the rest of the cultural orgs on campus. A few sentences about the collaborations they're planning for the year, what 'community' means to them personally, and how new members can get more involved.",
  },
  {
    id: "fundraising",
    role: "Fundraising Chair",
    name: "Full Name",
    country: "ph",
    countryLabel: "Philippines",
    major: "Marketing",
    hometown: "Minneapolis, MN",
    year: "Senior",
    blurb: "Fundraising chair's blurb — the brains behind every ramen night, boba pop-up, and bake sale that keeps ASU's calendar full. Talk about what fundraisers are in the pipeline this year, the silliest one they've planned, and the cause they're proudest to be raising for.",
  },
  {
    id: "mm1",
    role: "Multimedia Member",
    name: "Full Name",
    country: "vn",
    countryLabel: "Vietnam",
    major: "Graphic Design",
    hometown: "Iowa City, IA",
    year: "Sophomore",
    blurb: "Multimedia member's blurb — designing graphics for posts, posters, and recaps. A few sentences about their design style, the project they're most proud of this year, and how members can pitch creative ideas to the team. End with an open invite to collaborate.",
  },
  {
    id: "mm2",
    role: "Multimedia Member",
    name: "Full Name",
    country: "kr",
    countryLabel: "South Korea",
    major: "Digital Media",
    hometown: "Chicago, IL",
    year: "Junior",
    blurb: "Multimedia member's blurb — editing videos, motion clips, and behind-the-scenes reels for socials. A few sentences about their workflow, the event they had the most fun documenting, and a quick wave to anyone who's ever been caught on their camera.",
  },
  {
    id: "mm3",
    role: "Multimedia Member",
    name: "Full Name",
    country: "cn",
    countryLabel: "China",
    major: "Marketing",
    hometown: "Minneapolis, MN",
    year: "Sophomore",
    blurb: "Multimedia member's blurb — running content strategy and helping the team turn events into stories worth sharing. A few sentences about their approach to creative direction, what they're most excited to ship this year, and how new members can get involved in the team.",
  },
  {
    id: "photographer",
    role: "Photography Chair",
    name: "Full Name",
    country: "jp",
    countryLabel: "Japan",
    major: "Graphic Design",
    hometown: "Seattle, WA",
    year: "Sophomore",
    blurb: "Behind every group photo and event recap reel — the photographer's blurb goes here. A few sentences about how they got into photography, what they love shooting at ASU events, and where members can find their work. End with an invitation to tag them in your favorite event posts.",
  },
  {
    id: "event",
    role: "Event Management Chair",
    name: "Full Name",
    country: "tw",
    countryLabel: "Taiwan",
    major: "Event Management",
    hometown: "San Jose, CA",
    year: "Junior",
    blurb: "The mastermind behind every GBM, mixer, and themed night. A few sentences about the events they're most excited to bring back, the ideas they're cooking up for the spring, and how members can pitch their own. Always open to new event ideas — just slide into the DMs.",
  },
  {
    id: "outreach",
    role: "Outreach Chair",
    name: "Full Name",
    country: "th",
    countryLabel: "Thailand",
    major: "Communications",
    hometown: "New York, NY",
    year: "Sophomore",
    blurb: "The voice of ASU online — running socials, replying to DMs, and making sure every member feels seen. A few sentences about their approach to outreach, the platforms they spend the most time on, and the kind of community they're working to build. End with a friendly hello to anyone who just followed the page.",
  },
];

type RosterItem =
  | { type: "officer"; officer: OfficerData; officerIndex: number }
  | { type: "divider"; label: string }
  | { type: "sep"; key: string };

const ROSTER_ITEMS: RosterItem[] = [
  { type: "officer", officer: OFFICERS[0], officerIndex: 0 },
  { type: "sep", key: "sep-0" },
  { type: "officer", officer: OFFICERS[1], officerIndex: 1 },
  { type: "sep", key: "sep-1" },
  { type: "officer", officer: OFFICERS[2], officerIndex: 2 },
  { type: "sep", key: "sep-2" },
  { type: "officer", officer: OFFICERS[3], officerIndex: 3 },
  { type: "sep", key: "sep-3" },
  { type: "officer", officer: OFFICERS[4], officerIndex: 4 },
  { type: "sep", key: "sep-4" },
  { type: "divider", label: "Multimedia" },
  { type: "officer", officer: OFFICERS[5], officerIndex: 5 },
  { type: "sep", key: "sep-5" },
  { type: "officer", officer: OFFICERS[6], officerIndex: 6 },
  { type: "sep", key: "sep-6" },
  { type: "officer", officer: OFFICERS[7], officerIndex: 7 },
  { type: "sep", key: "sep-7" },
  { type: "officer", officer: OFFICERS[8], officerIndex: 8 },
  { type: "sep", key: "sep-8" },
  { type: "divider", label: "Events & Outreach" },
  { type: "officer", officer: OFFICERS[9], officerIndex: 9 },
  { type: "sep", key: "sep-9" },
  { type: "officer", officer: OFFICERS[10], officerIndex: 10 },
];

/* ─── Ornamental separator between officers ─── */
function OfficerSeparator() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <div
      ref={ref}
      className="flex items-center justify-center gap-3.5"
      aria-hidden="true"
    >
      <motion.span
        className="h-px bg-asu-beige block"
        initial={{ width: 0 }}
        animate={isInView ? { width: 60 } : { width: 0 }}
        transition={{ duration: 0.8, ease: [0.18, 0.7, 0.2, 1] }}
      />
      <motion.span
        className="w-[5px] h-[5px] bg-asu-gold rounded-full block"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.6, ease: [0.5, 1.6, 0.4, 1], delay: 0.2 }}
      />
      <motion.span
        className="h-px bg-asu-beige block"
        initial={{ width: 0 }}
        animate={isInView ? { width: 60 } : { width: 0 }}
        transition={{ duration: 0.8, ease: [0.18, 0.7, 0.2, 1] }}
      />
    </div>
  );
}

/* ─── Named section divider (e.g. "Multimedia") ─── */
function SectionDivider({ label }: { label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-5% 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-center gap-5 py-16"
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.18, 0.7, 0.2, 1] }}
    >
      <span
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #EFE1C8 30%, #EFE1C8 70%, transparent)",
        }}
      />
      <span className="font-ui text-[12px] tracking-[0.32em] uppercase text-asu-red px-1.5 whitespace-nowrap">
        <span
          className="inline-block w-1 h-1 rounded-full bg-asu-gold align-middle"
          style={{ margin: "0 12px 2px" }}
        />
        {label}
        <span
          className="inline-block w-1 h-1 rounded-full bg-asu-gold align-middle"
          style={{ margin: "0 12px 2px" }}
        />
      </span>
      <span
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, #EFE1C8 30%, #EFE1C8 70%, transparent)",
        }}
      />
    </motion.div>
  );
}

/* ─── Individual officer card ─── */
function OfficerCard({
  officer,
  officerIndex,
}: {
  officer: OfficerData;
  officerIndex: number;
}) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inViewHook = useInView(ref, { once: true, amount: 0.2 });
  const isInView = prefersReduced ? true : inViewHook;

  // 0-indexed: even index = CSS nth-of-type odd (image LEFT)
  // odd index  = CSS nth-of-type even (image RIGHT)
  const isEven = officerIndex % 2 === 1;

  const flagStartX = isEven ? "calc(100vw + 200px)" : "calc(-100vw - 200px)";
  const flagRestRotate = isEven ? 4 : -4;
  const flagFlyRotate = isEven ? 12 : -12;

  return (
    <article
      ref={ref}
      id={`officer-${officer.id}`}
      className="relative py-24 md:py-28"
      style={{ minHeight: "min(780px, 90vh)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 lg:gap-24 items-center h-full">

        {/* ── MEDIA column ── */}
        <div
          className={`relative flex items-end justify-center h-auto lg:h-[720px] ${
            isEven
              ? "lg:order-2 lg:justify-end"
              : "lg:order-1 lg:justify-start"
          }`}
        >
          {/* Country flag — flies in from outer edge */}
          <motion.div
            className="absolute top-[30px] pointer-events-none"
            style={{
              [isEven ? "right" : "left"]: -220,
              width: "clamp(200px, 22vw, 340px)",
              aspectRatio: "3/2",
              zIndex: 0,
              filter: "drop-shadow(0 22px 36px rgba(26,20,16,0.18))",
            }}
            initial={{ x: flagStartX, rotate: flagFlyRotate, opacity: 0 }}
            animate={
              isInView
                ? { x: 0, rotate: flagRestRotate, opacity: 0.92 }
                : { x: flagStartX, rotate: flagFlyRotate, opacity: 0 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    x: { duration: 1.5, ease: [0.18, 0.78, 0.18, 1], delay: 0.25 },
                    rotate: {
                      duration: 1.5,
                      ease: [0.18, 0.78, 0.18, 1],
                      delay: 0.25,
                    },
                    opacity: { duration: 0.9, delay: 0.35 },
                  }
            }
            aria-hidden="true"
          >
            <img
              src={`https://flagcdn.com/w640/${officer.country}.png`}
              alt=""
              className="w-full h-full object-cover block rounded-[2px]"
              decoding="async"
            />
            {/* Paper-fold sheen */}
            <div
              className="absolute inset-0 rounded-[2px] pointer-events-none"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.18) 38%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.10) 100%)",
                mixBlendMode: "overlay",
              }}
            />
            <span
              className={`absolute bottom-[-28px] font-ui text-[11px] tracking-[0.24em] uppercase text-asu-muted ${
                isEven ? "right-1" : "left-1"
              }`}
            >
              {officer.countryLabel}
            </span>
          </motion.div>

          {/* Ground line — expands from outer edge inward when revealed */}
          <motion.div
            className="absolute bottom-0 h-px z-[4]"
            style={{
              [isEven ? "right" : "left"]: 0,
              background:
                "linear-gradient(90deg, transparent 0%, #E8C66A 18%, #E5291E 50%, #E8C66A 82%, transparent 100%)",
            }}
            initial={{ width: 0, opacity: 0 }}
            animate={
              isInView ? { width: "100%", opacity: 0.9 } : { width: 0, opacity: 0 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    width: { duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.5 },
                    opacity: { duration: 0.6, delay: 0.55 },
                  }
            }
          />

          {/* Elliptical floor shadow */}
          <div
            className="absolute pointer-events-none"
            style={{ bottom: -8, left: "15%", width: "70%", height: 32 }}
          >
            <motion.div
              className="w-full h-full"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(26,20,16,0.28) 0%, rgba(26,20,16,0.10) 45%, transparent 75%)",
              }}
              initial={{ scaleX: 0.4, opacity: 0 }}
              animate={
                isInView ? { scaleX: 1, opacity: 1 } : { scaleX: 0.4, opacity: 0 }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      scaleX: { duration: 1.1, ease: [0.2, 0.7, 0.2, 1], delay: 0.7 },
                      opacity: { duration: 0.7, delay: 0.75 },
                    }
              }
            />
          </div>

          {/* Portrait frame — overflow:hidden clips the rising portrait */}
          <div
            className="relative overflow-hidden z-[2] w-full"
            style={{ maxWidth: 620, aspectRatio: "620 / 720" }}
          >
            <motion.div
              className="w-full h-full"
              initial={{
                y: prefersReduced ? 0 : "100%",
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      y: { duration: 1.4, ease: [0.18, 0.78, 0.2, 1], delay: 0.2 },
                      opacity: { duration: 0.7, delay: 0.25 },
                    }
              }
            >
              {/*
                Replace this placeholder with the officer's headshot:
                <img
                  src={`/images/board/${officer.id}.webp`}
                  alt={`${officer.name}, ${officer.role}`}
                  className="w-full h-full object-cover object-top"
                />
              */}
              <div className="w-full h-full bg-asu-beige flex items-end justify-center">
                <span className="font-ui text-[11px] tracking-[0.2em] uppercase text-asu-muted mb-8 opacity-50 select-none">
                  Photo coming soon
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── TEXT column ── */}
        <div
          className={`relative z-[2] py-3 px-0 md:px-3 ${
            isEven ? "lg:order-1" : "lg:order-2"
          }`}
        >
          {/* Role */}
          <motion.div
            className="font-ui text-[12px] tracking-[0.28em] uppercase text-asu-red flex items-center gap-3.5 mb-[18px]"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.35 }
            }
          >
            <span className="w-9 h-px bg-asu-red inline-block flex-shrink-0" />
            {officer.role}
          </motion.div>

          {/* Name */}
          <motion.h3
            className="font-display text-asu-dark m-0 mb-[22px] leading-none"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 4.75rem)",
              letterSpacing: "-0.005em",
            }}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.46 }
            }
          >
            {officer.name}
          </motion.h3>

          {/* Meta details */}
          <motion.div
            className="flex flex-wrap gap-y-2 gap-x-[22px] mb-[26px]"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.58 }
            }
          >
            {[
              { label: "Major", value: officer.major },
              { label: "Hometown", value: officer.hometown },
              { label: "Year", value: officer.year },
            ].map(({ label, value }) => (
              <dl key={label} className="m-0 flex flex-col gap-0.5">
                <dt className="font-ui text-[11px] tracking-[0.22em] uppercase text-asu-muted">
                  {label}
                </dt>
                <dd className="m-0 font-body text-[15px] text-asu-dark font-medium">
                  {value}
                </dd>
              </dl>
            ))}
          </motion.div>

          {/* Gold divider rule */}
          <motion.div
            className="bg-asu-gold mb-[22px]"
            style={{ width: 64, height: 2 }}
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.66 }
            }
          />

          {/* Blurb */}
          <motion.p
            className="font-body font-light text-[16.5px] leading-[1.75] max-w-[520px] m-0 text-asu-brown"
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.74 }
            }
          >
            <span
              className="font-display text-asu-red inline-block"
              style={{
                fontSize: 64,
                lineHeight: 0,
                position: "relative",
                top: 22,
                marginRight: 6,
              }}
              aria-hidden="true"
            >
              "
            </span>
            {officer.blurb}
          </motion.p>
        </div>
      </div>
    </article>
  );
}

/* ─── Root export ─── */
export function OfficerRoster() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [railVisible, setRailVisible] = useState(false);
  const rosterRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let best = -1,
        bestDist = Infinity;
      OFFICERS.forEach((officer, i) => {
        const el = document.getElementById(`officer-${officer.id}`);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
        const d = Math.abs(rect.top + rect.height / 2 - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActiveIndex(best);
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.target === rosterRef.current) {
            setRailVisible(e.isIntersecting);
          }
        });
      },
      { threshold: 0 }
    );
    if (rosterRef.current) io.observe(rosterRef.current);

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      io.disconnect();
    };
  }, []);

  const scrollToOfficer = useMemo(
    () => (officerId: string) => {
      const el = document.getElementById(`officer-${officerId}`);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    []
  );

  return (
    <section ref={rosterRef} className="relative z-[1] bg-asu-ivory">
      {/* Fixed side rail — desktop only */}
      <nav
        className="fixed top-1/2 right-[22px] z-40 hidden lg:flex flex-col gap-[14px] py-[14px] px-2 -translate-y-1/2 transition-opacity duration-500"
        style={{
          opacity: railVisible ? 1 : 0,
          pointerEvents: railVisible ? "auto" : "none",
        }}
        aria-label="Officer index"
      >
        {OFFICERS.map((officer, i) => (
          <button
            key={officer.id}
            className="relative w-[6px] h-[6px] rounded-full border-none p-0 cursor-pointer transition-all duration-[320ms]"
            style={{
              background: i === activeIndex ? "#E5291E" : "#EFE1C8",
              transform: i === activeIndex ? "scale(1.7)" : "scale(1)",
            }}
            onClick={() => scrollToOfficer(officer.id)}
            aria-label={`Scroll to ${officer.role}`}
          >
            {i === activeIndex && (
              <span className="absolute right-[18px] top-1/2 -translate-y-1/2 font-ui text-[10px] tracking-[0.22em] uppercase text-asu-dark bg-asu-ivory px-[10px] py-1 border border-asu-beige rounded-[2px] whitespace-nowrap pointer-events-none">
                {officer.role}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Roster items */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-14 lg:px-24 pt-16 pb-40">
        {ROSTER_ITEMS.map((item) => {
          if (item.type === "divider") {
            return <SectionDivider key={item.label} label={item.label} />;
          }
          if (item.type === "sep") {
            return <OfficerSeparator key={item.key} />;
          }
          return (
            <OfficerCard
              key={item.officer.id}
              officer={item.officer}
              officerIndex={item.officerIndex}
            />
          );
        })}
      </div>
    </section>
  );
}
