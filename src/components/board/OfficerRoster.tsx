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
    id: "danton",
    role: "President",
    name: "Danton Dang",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Software Engineering",
    hometown: "Davenport, IA",
    year: "Senior",
    blurb:
      "asda sas das das dasdas das da sd asdasdasd asd asd asd asdas dasd asda sdasd asd asd as dadsljfh al;sdjhf l;askjdf; lkasjdfl kjsdf lksdf sdf kjsl fksja lkfsjd fks lkasjdf alksdjf lksdj fklsdj s jsj fs fjsdj ksjk fjskldj sajl sdlfsdfklj sdkla fjasldkf sdfsdlk jaslkd fjsalkd fjlksdjf lkasj dlasjd fasdlf jaslkdjf laskjdfasdflk jasldkf jsdlkf jsadlk fjasldk fjksdj fkdsjkf jsd fjsdf jksdj fksdjf sjd sdj d",
  },
  {
    id: "jennifer",
    role: "Vice President",
    name: "Jennifer Tran",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Accounting",
    hometown: "TODO",
    year: "TODO",
    blurb: "TODO",
  },
  {
    id: "leah",
    role: "Treasurer",
    name: "Leah Mast",
    country: "cn",
    countryLabel: "Chinese",
    major: "Accounting",
    hometown: "TODO",
    year: "TODO",
    blurb: "TODO",
  },
  {
    id: "ethan",
    role: "Community Chair",
    name: "Full Name",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Computer Science",
    hometown: "Sioux City, Iowa",
    year: "Sophomore",
    blurb: "TODO",
  },
  {
    id: "olivia",
    role: "Fundraising Chair",
    name: "Olivia Chen",
    country: "cn",
    countryLabel: "Chinese",
    major: "Accounting",
    hometown: "TODO",
    year: "TODO",
    blurb: "TODO",
  },
  {
    id: "yukari",
    role: "Multimedia Member",
    name: "Yukari Matsunaga",
    country: "jp",
    countryLabel: "Japanese",
    major: "Interior Design",
    hometown: "Higashikurume, Tokyo",
    year: "Junior",
    blurb: "TODO",
  },
  {
    id: "elle",
    role: "Multimedia Member",
    name: "Elle Chandy",
    country: "la",
    countryLabel: "Laos",
    major: "Digital Media",
    hometown: "TODO",
    year: "TODO",
    blurb: "TODO",
  },
  {
    id: "cathy",
    role: "Multimedia Member",
    name: "Cathy",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Industrial Engineering",
    hometown: "Davenport, Iowa",
    year: "Senior",
    blurb: "TODO",
  },
  {
    id: "jordan",
    role: "Photography Chair",
    name: "Jordan Nguyen",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Computer Engineering",
    hometown: "Des Moines, Iowa",
    year: "Senior",
    blurb: "TODO",
  },
  {
    id: "gavin",
    role: "Event Planning Chair",
    name: "Gavin Macanip",
    country: "TODO",
    countryLabel: "TODO",
    major: "Computer Engineering",
    hometown: "Macanip",
    year: "Sophomore",
    blurb: "TODO",
  },
  {
    id: "nathan",
    role: "Outreach Chair",
    name: "Nathan Sison",
    country: "ph",
    countryLabel: "Filipino",
    major: "Finance",
    hometown: "TODO",
    year: "Sophomore",
    blurb: "TODO",
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
  const [imgError, setImgError] = useState(false);
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
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-20 items-center h-full">
        {/* ── MEDIA column ── */}
        <div
          className={`relative flex items-end justify-center h-auto ${
            isEven
              ? "lg:order-2 lg:justify-end lg:-mr-12"
              : "lg:order-1 lg:justify-start lg:-ml-12"
          }`}
        >
          {/* Country flag — flies in from outer edge */}
          <motion.div
            className="absolute top-[30px] pointer-events-none"
            style={{
              [isEven ? "right" : "left"]: -120,
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
                    x: {
                      duration: 1.5,
                      ease: [0.18, 0.78, 0.18, 1],
                      delay: 0.25,
                    },
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
              isInView
                ? { width: "100%", opacity: 0.9 }
                : { width: 0, opacity: 0 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : {
                    width: {
                      duration: 1.2,
                      ease: [0.2, 0.7, 0.2, 1],
                      delay: 0.5,
                    },
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
                isInView
                  ? { scaleX: 1, opacity: 1 }
                  : { scaleX: 0.4, opacity: 0 }
              }
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      scaleX: {
                        duration: 1.1,
                        ease: [0.2, 0.7, 0.2, 1],
                        delay: 0.7,
                      },
                      opacity: { duration: 0.7, delay: 0.75 },
                    }
              }
            />
          </div>

          {/* Portrait frame — fixed height, natural width so images aren't cropped */}
          <div
            className="relative overflow-hidden z-[2]"
            style={{ height: 580, width: "fit-content" }}
          >
            <motion.div
              initial={{
                y: prefersReduced ? 0 : 580,
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : {
                      y: {
                        duration: 1.4,
                        ease: [0.18, 0.78, 0.2, 1],
                        delay: 0.2,
                      },
                      opacity: { duration: 0.7, delay: 0.25 },
                    }
              }
            >
              {imgError ? (
                <div
                  className="bg-asu-beige flex items-end justify-center"
                  style={{ width: 400, height: 580 }}
                >
                  <span className="font-ui text-[11px] tracking-[0.2em] uppercase text-asu-muted mb-8 opacity-50 select-none">
                    Photo coming soon
                  </span>
                </div>
              ) : (
                <img
                  src={`/images/board/${officer.id}.webp`}
                  alt={`${officer.name}, ${officer.role}`}
                  style={{
                    height: 580,
                    width: "auto",
                    maxWidth: "none",
                    display: "block",
                  }}
                  onError={() => setImgError(true)}
                />
              )}
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
      { threshold: 0 },
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
    [],
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
