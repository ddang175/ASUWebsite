import { useRef, useState, useEffect, useLayoutEffect, useMemo } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

const EASE_OUT = [0.18, 0.78, 0.2, 1] as [number, number, number, number];

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useLayoutEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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
  photo_url: string;
}

// Fallback used when no officers are passed as props (e.g. Supabase table is
// empty or unreachable), so the page keeps working without the database.
const FALLBACK_OFFICERS: OfficerData[] = [
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
      "Hey everyone! My name is Danton, and I will be your guys' president this year :P I am always open to a fun conversation, so feel free to come up to me at ASU events to talk! Outside of work and school, I love dancing, playing volleyball, hanging out with friends, and learning random things (building up random stats lol). I can't wait to meet everyone and bring you guys a great year!",
  
    photo_url: "/images/board/danton.webp",
  },
  {
    id: "jennifer",
    role: "Vice President",
    name: "Jennifer Tran",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Accounting",
    hometown: "Bloomington, MN",
    year: "Junior",
    blurb:
      "Hellooo! My name is Jennifer Tran, but you can also call me Jenni!! When I’m not crying over my accounting homework, you’ll probably find me crocheting, knitting, or raging in Valorant. Aside from my hobbies, joining ASU has been one of the best parts of my college experience. Through ASU, I’ve made amazing memories and met some amazing people. I’ve always admired the E-Board’s hard work and dedication, which is what inspired me to join. I want to help create the same welcoming environment and lasting memories for future members as well!",
  
    photo_url: "/images/board/jennifer.webp",
  },
  {
    id: "leah",
    role: "Treasurer",
    name: "Leah Mast",
    country: "cn",
    countryLabel: "Chinese",
    major: "Accounting",
    hometown: "Payson, IL",
    year: "Junior",
    blurb:
      "Hello, my name is Leah! I'm the current treasurer of the Asian Student Union (ASU). I've been a member of the organization since my first year at Iowa State.  ASU has a wonderful community and celebrates Asian cultures, which is how I fell in love with the organization. When I'm not serving as the treasurer at general board meetings, you could catch me serving as the Resident Assistant at Towers, online gaming, or at the library studying!",
  
    photo_url: "/images/board/leah.webp",
  },
  {
    id: "ethan",
    role: "Community Chair",
    name: "Ethan Pham",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Computer Science",
    hometown: "Sioux City, IA",
    year: "Sophomore",
    blurb:
      "A little bit more about me is that ASU helped me find my friend group through its community. I hope, as Community Chair, that people can look back and be proud that they were a part of ASU. Outside of ASU, you can find me at hackathons, playing volleyball on the court, or sleeping tbh. Oh, and I once clogged the school's bathroom so hard that it became Snapchat famous.",
  
    photo_url: "/images/board/ethan.webp",
  },
  {
    id: "olivia",
    role: "Fundraising Chair",
    name: "Olivia Chen",
    country: "cn",
    countryLabel: "Chinese",
    major: "Accounting",
    hometown: "Brooklyn, NY",
    year: "Sophomore",
    blurb:
      "Hi everyone! My name is Olivia, feel free to call me by whatever! I am going to be ASU's fundraising chair for this year so here's some of my interests! I love to dance and bake, reading the tri-man (manga, manhwa, and manhua) as well as webtoons like Eleceed, Omniscient Reader's Viewpoint, and Heaven's Official Blessing. Live, love, laugh Haikyuu and I love desserts so let me know if any of y'all want to hit up a fire dessert place 😛",
  
    photo_url: "/images/board/olivia.webp",
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
    blurb:
      "I’m Yukari Matsunaga from Japan!! My favorite American food is cheese curds. I like singing and going for walks. I have two dogs, and whenever I miss them, I like looking through photos of them. It’s something I do almost every day",
  
    photo_url: "/images/board/yukari.webp",
  },
  {
    id: "elle",
    role: "Multimedia Member",
    name: "Elle Chandy",
    country: "la",
    countryLabel: "Laos",
    major: "Fashion Design and Merchandising",
    hometown: "Sioux City, IA",
    year: "Sophomore",
    blurb:
      "Hey everyone!! My name is Elle Chandy but it’s said like Ellie. I will be a part of your new Multi-Media crew. My interests/hobbies are reading, sewing, gaming, and drawing. Fun Fact, some of the reasons that I joined ASU were the loving environment and amazing E-Board. I hope to try my hardest I can to make ASU the absolute best!!!",
  
    photo_url: "/images/board/elle.webp",
  },
  {
    id: "cathy",
    role: "Multimedia Member",
    name: "Cathy Bui",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Industrial Design",
    hometown: "Davenport, IA",
    year: "Senior",
    blurb:
      "Hi, I’m Cathy and one of my favorite things to get into is arts and craft! I can crochet, make felt keychains, origami, etc. It’s also how I got interested in my major since I love designing things : )  One of my favorite projects I’ve done is designing a lucky cat inspired diffuser which actually works, yippee. I want to use my expertise in design and make awesome asu merch for everyone!",
  
    photo_url: "/images/board/cathy.webp",
  },
  {
    id: "jordan",
    role: "Photography Chair",
    name: "Jordan Nguyen",
    country: "vn",
    countryLabel: "Vietnamese",
    major: "Computer Engineering",
    hometown: "Des Moines, IA",
    year: "Senior",
    blurb:
      "hi, i'm jordan! i'm a computer engineer with a focus on vlsi design and electrical engineering. i enjoy media production as a hobby and occasionally dabble in video, automotive and portrait work. last school year, i was responsible for photoshoots, portraits, and camera work used for asian student union's media presence to promote and document events and other collaborations with partnered student organizations. my other hobbies include computer-related tech, drawing, and lifting.",
  
    photo_url: "/images/board/jordan.webp",
  },
  {
    id: "gavin",
    role: "Event Planning Chair",
    name: "Gavin Macanip",
    country: "ph",
    countryLabel: "Filipino",
    major: "Computer Engineering",
    hometown: "Plainfield, IL",
    year: "Sophomore",
    blurb:
      "Hi! My name is Gavin Macanip, this year’s event planner! I like to climb rocks, kick things (fun fact: I met an olympic athlete cause of this), take photos, and do random side quests. I am an avid Bruno Mars enjoyer and professional yearner too (especially with karaoke 🇵🇭). I love to listen to music and playing it too.",
  
    photo_url: "/images/board/gavin.webp",
  },
  {
    id: "nathan",
    role: "Outreach Chair",
    name: "Nathan Sison",
    country: "ph",
    countryLabel: "Filipino",
    major: "Finance",
    hometown: "Mount Prospect, IL",
    year: "Sophomore",
    blurb:
      "Hi there! I'm Nathaniel Sison, but you can just call me Nathan. Let me share a bit about myself. I'm proudly FILIPINO RAAAAH, hailing from the Illinois region, and I'm currently pursuing a degree in Finance. I enjoy a variety of activities, including playing volleyball, singing, and indulging in delicious food. My favorite color is red, and I'm always eager to meet new friends. If you happen to see me around, don't hesitate to come over and say hello — I'm always here to be a friend if you need one.",
  
    photo_url: "/images/board/nathan.webp",
  },
];

type RosterItem =
  | { type: "officer"; officer: OfficerData; officerIndex: number }
  | { type: "divider"; label: string }
  | { type: "sep"; key: string };

// Builds the roster's flat render list (officer cards, ornamental separators,
// and named section dividers) from a live officers array. The named
// "Multimedia" / "Events & Outreach" dividers are inferred from role text so
// the grouping keeps working as officers are added/removed/reordered via the
// admin panel, matching the original hardcoded structure for the default roster.
function buildRosterItems(officers: OfficerData[]): RosterItem[] {
  const items: RosterItem[] = [];
  officers.forEach((officer, i) => {
    if (i > 0) {
      const prevRole = officers[i - 1].role;
      if (officer.role === "Multimedia Member" && prevRole !== "Multimedia Member") {
        items.push({ type: "divider", label: "Multimedia" });
      } else if (prevRole === "Multimedia Member" && officer.role !== "Multimedia Member") {
        items.push({ type: "divider", label: "Events & Outreach" });
      } else {
        items.push({ type: "sep", key: `sep-${i - 1}` });
      }
    }
    items.push({ type: "officer", officer, officerIndex: i });
  });
  return items;
}

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
  isMobile,
}: {
  officer: OfficerData;
  officerIndex: number;
  isMobile: boolean;
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
      className="relative pt-8 pb-24 md:py-28"
      style={isMobile ? undefined : { minHeight: "min(780px, 90vh)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-0 md:gap-8 lg:gap-20 items-center h-full">
        {/* ── MEDIA column ── */}
        <div
          className={`relative flex items-end justify-center h-auto ${
            isEven
              ? "lg:order-2 lg:justify-end lg:-mr-12"
              : "lg:order-1 lg:justify-start lg:-ml-12"
          }`}
        >
          {/* Country flag
               Desktop: flies in from the outer screen edge, lands beside the portrait.
               Mobile:  fades in centered behind the portrait, peeking out at the sides
                        and slightly above — gives a "flag behind the head" effect.      */}
          <motion.div
            className="absolute pointer-events-none"
            style={
              isMobile
                ? {
                    top: -80,
                    left: 0,
                    right: 0,
                    margin: "auto",
                    width: "95%",
                    aspectRatio: "3/2",
                    zIndex: 0,
                    filter: "drop-shadow(0 12px 24px rgba(26,20,16,0.20))",
                  }
                : {
                    top: 30,
                    [isEven ? "right" : "left"]: -120,
                    width: "clamp(200px, 22vw, 340px)",
                    aspectRatio: "3/2",
                    zIndex: 0,
                    filter: "drop-shadow(0 22px 36px rgba(26,20,16,0.18))",
                  }
            }
            initial={
              isMobile
                ? { x: 0, rotate: 0, opacity: 0 }
                : { x: flagStartX, rotate: flagFlyRotate, opacity: 0 }
            }
            animate={
              isMobile
                ? isInView
                  ? { x: 0, rotate: 0, opacity: 0.82 }
                  : { x: 0, rotate: 0, opacity: 0 }
                : isInView
                  ? { x: 0, rotate: flagRestRotate, opacity: 0.92 }
                  : { x: flagStartX, rotate: flagFlyRotate, opacity: 0 }
            }
            transition={
              prefersReduced
                ? { duration: 0 }
                : isMobile
                  ? { opacity: { duration: 0.9, delay: 0.3 } }
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

          {/* Ground line — expands from outer edge inward when revealed (desktop only) */}
          <motion.div
            className="absolute bottom-0 h-px z-[4]"
            style={{
              display: isMobile ? "none" : undefined,
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

          {/* Elliptical floor shadow (desktop only) */}
          <div
            className="absolute pointer-events-none"
            style={{
              display: isMobile ? "none" : undefined,
              bottom: -8,
              left: "15%",
              width: "70%",
              height: 32,
            }}
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

          {/* Portrait frame —
               Desktop: fixed 580px height, natural width, overflow-hidden for slide-up reveal.
               Mobile:  natural height (no cropping), full width of the 85% container,
                        fade-in only so overflow-hidden is not needed.                        */}
          <div
            className={`relative z-[2] ${isMobile ? "" : "overflow-hidden"}`}
            style={
              isMobile
                ? { width: "85%" }
                : { height: 580, width: "fit-content" }
            }
          >
            <motion.div
              initial={{
                y: prefersReduced ? 0 : isMobile ? 0 : 580,
                opacity: prefersReduced ? 1 : 0,
              }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : isMobile
                    ? {
                        y: {
                          duration: 1.8,
                          ease: [0.18, 0.78, 0.2, 1],
                          delay: 0.2,
                        },
                        opacity: { duration: 0.8, delay: 0.2 },
                      }
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
                  style={
                    isMobile
                      ? { width: "100%", minHeight: 260 }
                      : { width: 400, height: 580 }
                  }
                >
                  <span className="font-ui text-[11px] tracking-[0.2em] uppercase text-asu-muted mb-8 opacity-50 select-none">
                    Photo coming soon
                  </span>
                </div>
              ) : (
                <img
                  src={officer.photo_url}
                  alt={`${officer.name}, ${officer.role}`}
                  style={
                    isMobile
                      ? {
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }
                      : {
                          height: 580,
                          width: "auto",
                          maxWidth: "none",
                          display: "block",
                        }
                  }
                  onError={() => setImgError(true)}
                />
              )}
            </motion.div>
          </div>
        </div>

        {/* ── TEXT column ── */}
        <div
          className={`relative z-[2] pt-6 pb-3 md:py-3 px-0 md:px-3 ${
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
              fontSize: "clamp(2rem, 4.5vw, 4.75rem)",
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
export function OfficerRoster({ officers }: { officers?: OfficerData[] }) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(-1);
  const [railVisible, setRailVisible] = useState(false);
  const rosterRef = useRef<HTMLElement>(null);

  // Fall back to the built-in roster when no officers are passed (or the
  // Supabase table returned an empty array), so the page always renders.
  const resolvedOfficers =
    officers && officers.length > 0 ? officers : FALLBACK_OFFICERS;

  const rosterItems = useMemo(
    () => buildRosterItems(resolvedOfficers),
    [resolvedOfficers],
  );

  useEffect(() => {
    const updateActive = () => {
      const mid = window.innerHeight * 0.5;
      let best = -1,
        bestDist = Infinity;
      resolvedOfficers.forEach((officer, i) => {
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
  }, [resolvedOfficers]);

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
        {resolvedOfficers.map((officer, i) => (
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
        {rosterItems.map((item) => {
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
              isMobile={isMobile}
            />
          );
        })}
      </div>
    </section>
  );
}
