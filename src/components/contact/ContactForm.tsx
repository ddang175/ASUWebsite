import { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "motion/react";
import emailjs from "@emailjs/browser";

const EASE_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface BoardMember {
  name: string;
  role: string;
  email: string;
}

const BOARD_MEMBERS: BoardMember[] = [
  { name: "Danton Dang", role: "President", email: "ddang175@iastate.edu" },
  {
    name: "Jennifer Tran",
    role: "Vice President",
    email: "jtran12@iastate.edu",
  },
  { name: "Leah Mast", role: "Treasurer", email: "lam1624@iastate.edu" },
  {
    name: "Ethan Pham",
    role: "Community Chair",
    email: "phame20@iastate.edu",
  },
  {
    name: "Olivia Chen",
    role: "Fundraising Chair",
    email: "olivia11@iastate.edu",
  },
  {
    name: "Yukari Matsunaga",
    role: "Multimedia Member",
    email: "ymatsuna@iastate.edu",
  },
  {
    name: "Elle Chandy",
    role: "Multimedia Member",
    email: "echandy@iastate.edu",
  },
  {
    name: "Cathy Bui",
    role: "Multimedia Member",
    email: "cathymb1@IASTATE.EDU",
  },
  {
    name: "Jordan Nguyen",
    role: "Photography Chair",
    email: "hieu2k@iastate.edu",
  },
  {
    name: "Gavin Macanip",
    role: "Event Planning Chair",
    email: "gmacanip@iastate.edu",
  },
  {
    name: "Nathan Sison",
    role: "Outreach Chair",
    email: "nathan12@iastate.edu",
  },
];

const GENERAL_EMAIL = "iastateasu@gmail.com";

type FormStatus = "idle" | "sending" | "success" | "error";

function MailIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10.5L8 14.5L16 6.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="40 20"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function MultiSelect({
  selected,
  onChange,
  generalSelected,
  onGeneralChange,
}: {
  selected: Set<number>;
  onChange: (next: Set<number>) => void;
  generalSelected: boolean;
  onGeneralChange: (v: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggleMember = (index: number) => {
    const next = new Set(selected);
    if (next.has(index)) {
      next.delete(index);
    } else {
      next.add(index);
    }
    if (generalSelected) onGeneralChange(false);
    onChange(next);
  };

  const toggleGeneral = () => {
    const next = !generalSelected;
    onGeneralChange(next);
    if (next) onChange(new Set());
  };

  let label = "Select recipient(s)";
  if (generalSelected) {
    label = "General Inquiry (All E-Board)";
  } else if (selected.size === 1) {
    const idx = Array.from(selected)[0];
    const m = BOARD_MEMBERS[idx];
    label = `${m.name} - ${m.role}`;
  } else if (selected.size > 1) {
    label = `${selected.size} members selected`;
  }

  const hasSelection = generalSelected || selected.size > 0;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 rounded-lg border font-body text-[15px] text-left transition-colors duration-200 cursor-pointer"
        style={{
          background: "rgba(252,238,201,0.35)",
          borderColor: open ? "rgba(229,41,30,0.4)" : "rgba(30,28,18,0.1)",
          color: hasSelection ? "#1E1C12" : "rgba(30,28,18,0.4)",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{label}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="shrink-0 ml-2 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg overflow-hidden"
          style={{
            background: "#FFFDF5",
            boxShadow:
              "0px 4px 20px rgba(30,28,18,0.1), 0 0 0 0.5px rgba(30,28,18,0.08)",
            maxHeight: 320,
            overflowY: "auto",
          }}
          role="listbox"
          aria-multiselectable="true"
        >
          {/* General Inquiry option */}
          <label
            className="flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors duration-150 hover:bg-[rgba(229,41,30,0.04)] border-b"
            style={{ borderColor: "rgba(30,28,18,0.06)" }}
          >
            <span
              className="flex items-center justify-center shrink-0 rounded transition-colors duration-150"
              style={{
                width: 18,
                height: 18,
                border: generalSelected
                  ? "none"
                  : "1.5px solid rgba(30,28,18,0.25)",
                background: generalSelected ? "#E5291E" : "transparent",
              }}
            >
              {generalSelected && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6L5 8.5L9.5 3.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </span>
            <input
              type="checkbox"
              checked={generalSelected}
              onChange={toggleGeneral}
              className="sr-only"
              aria-label="General Inquiry (All E-Board)"
            />
            <span className="font-ui text-sm font-medium text-asu-dark">
              General Inquiry
            </span>
            <span
              className="font-ui text-[11px] tracking-wide uppercase ml-auto"
              style={{ color: "rgba(30,28,18,0.35)" }}
            >
              All E-Board
            </span>
          </label>

          {/* Individual members */}
          {BOARD_MEMBERS.map((member, i) => {
            const checked = selected.has(i);
            return (
              <label
                key={i}
                className="flex items-center gap-3 px-5 py-3 cursor-pointer transition-colors duration-150 hover:bg-[rgba(229,41,30,0.04)]"
              >
                <span
                  className="flex items-center justify-center shrink-0 rounded transition-colors duration-150"
                  style={{
                    width: 18,
                    height: 18,
                    border: checked
                      ? "none"
                      : "1.5px solid rgba(30,28,18,0.25)",
                    background: checked ? "#E5291E" : "transparent",
                  }}
                >
                  {checked && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2.5 6L5 8.5L9.5 3.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleMember(i)}
                  className="sr-only"
                  aria-label={`${member.name} - ${member.role}`}
                />
                <span className="font-ui text-sm text-asu-dark">
                  {member.name}
                  <span style={{ color: "rgba(30,28,18,0.4)" }}>
                    {" "}
                    - {member.role}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ContactForm() {
  const prefersReduced = useReducedMotion();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<Set<number>>(
    new Set(),
  );
  const [generalSelected, setGeneralSelected] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const hasRecipient = generalSelected || selectedMembers.size > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!hasRecipient) return;

    setStatus("sending");

    let toEmail: string;
    let cc: string;

    if (generalSelected) {
      toEmail = GENERAL_EMAIL;
      cc = BOARD_MEMBERS.map((m) => m.email).join(", ");
    } else {
      const indices = Array.from(selectedMembers);
      toEmail = BOARD_MEMBERS[indices[0]].email;
      cc =
        indices.length > 1
          ? indices
              .slice(1)
              .map((i) => BOARD_MEMBERS[i].email)
              .join(", ")
          : "";
    }

    try {
      await emailjs.send(
        import.meta.env.PUBLIC_EMAILJS_SERVICE_ID,
        import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          name,
          email,
          title: `${subject} (${email})`,
          message,
          to_email: toEmail,
          cc,
        },
        import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY,
      );
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setSelectedMembers(new Set());
      setGeneralSelected(false);
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full px-5 py-4 rounded-lg border font-body text-[15px] text-asu-dark placeholder:text-asu-dark/40 transition-colors duration-200 focus:outline-none focus:border-asu-red/40";
  const inputStyle = {
    background: "rgba(252,238,201,0.35)",
    borderColor: "rgba(30,28,18,0.1)",
  };

  return (
    <section
      className="relative bg-asu-ivory text-asu-dark overflow-hidden"
      style={{ minHeight: "calc(100vh - 64px)" }}
    >
      <div className="relative" style={{ zIndex: 2 }}>
        {/* Header */}
        <div className="text-center px-8 pt-10 pb-6">
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.7, ease: EASE_OUT, delay: 0.15 }
            }
          >
            <div className="w-6 h-px bg-asu-red opacity-60" />
            <p className="font-ui text-[12px] font-bold tracking-[0.28em] uppercase text-asu-red">
              Asian Student Union · Contact
            </p>
            <div className="w-6 h-px bg-asu-red opacity-60" />
          </motion.div>

          <motion.div
            className="mb-5"
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.8, ease: EASE_OUT, delay: 0.25 }
            }
          >
            <MailIcon className="w-16 h-16 mx-auto text-asu-gold mb-4" />
          </motion.div>

          <div className="mb-5">
            {(["Get In", "Touch."] as const).map((word, i) => (
              <div
                key={word}
                className="overflow-hidden"
                style={{ lineHeight: 0.88 }}
              >
                <motion.span
                  className="block font-display text-asu-dark"
                  style={{
                    fontSize:
                      i === 0
                        ? "clamp(2.6rem, 5.5vw, 5.2rem)"
                        : "clamp(3.2rem, 7vw, 6.6rem)",
                    letterSpacing: "-0.025em",
                  }}
                  initial={prefersReduced ? {} : { y: "115%" }}
                  animate={{ y: 0 }}
                  transition={
                    prefersReduced
                      ? { duration: 0 }
                      : {
                          duration: 1.1,
                          ease: EASE_OUT,
                          delay: 0.28 + i * 0.15,
                        }
                  }
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          <motion.p
            className="font-body max-w-md mx-auto mb-5"
            style={{
              fontSize: "1.05rem",
              color: "rgba(30,28,18,0.52)",
              lineHeight: 1.65,
            }}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.8, ease: EASE_OUT, delay: 0.62 }
            }
          >
            Have a question, idea, or just want to say hi? Send a message to any
            of our executive board members or the whole team.
          </motion.p>

          <div className="flex justify-center">
            <motion.div
              className="bg-asu-gold"
              style={{ height: "1.5px", width: 48 }}
              initial={prefersReduced ? {} : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={
                prefersReduced
                  ? { duration: 0 }
                  : { duration: 0.5, ease: EASE_OUT, delay: 0.72 }
              }
            />
          </div>
        </div>

        {/* Form */}
        <motion.div
          className="max-w-xl mx-auto px-8 pb-20"
          initial={prefersReduced ? {} : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            prefersReduced
              ? { duration: 0 }
              : { duration: 0.9, ease: EASE_OUT, delay: 0.8 }
          }
        >
          {status === "success" ? (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <div
                className="mx-auto flex items-center justify-center rounded-full mb-6"
                style={{
                  width: 64,
                  height: 64,
                  background: "rgba(34,139,34,0.1)",
                  color: "#228B22",
                }}
              >
                <CheckIcon />
              </div>
              <h3
                className="font-display text-asu-dark mb-3"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}
              >
                Message Sent!
              </h3>
              <p
                className="font-body mb-8"
                style={{
                  fontSize: "1.05rem",
                  color: "rgba(30,28,18,0.52)",
                  lineHeight: 1.65,
                }}
              >
                We'll get back to you as soon as we can. Thanks for reaching
                out!
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-asu-red text-asu-cream font-ui font-semibold text-[15px] tracking-[0.04em] rounded-lg transition-colors duration-200 hover:bg-asu-red-hover cursor-pointer"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Honeypot */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                  opacity: 0,
                  height: 0,
                  width: 0,
                  overflow: "hidden",
                  tabIndex: -1,
                }}
              >
                <label htmlFor="conf_z">Confirm</label>
                <input
                  type="text"
                  id="conf_z"
                  name="conf_z"
                  autoComplete="nope"
                  tabIndex={-1}
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-name"
                  className="block font-ui text-[12px] font-bold tracking-[0.18em] uppercase text-asu-dark/60 mb-2"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputClasses}
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block font-ui text-[12px] font-bold tracking-[0.18em] uppercase text-asu-dark/60 mb-2"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputClasses}
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block font-ui text-[12px] font-bold tracking-[0.18em] uppercase text-asu-dark/60 mb-2">
                  Send To
                </label>
                <MultiSelect
                  selected={selectedMembers}
                  onChange={setSelectedMembers}
                  generalSelected={generalSelected}
                  onGeneralChange={setGeneralSelected}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-ui text-[12px] font-bold tracking-[0.18em] uppercase text-asu-dark/60 mb-2"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="What's this about?"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className={inputClasses}
                  style={inputStyle}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-ui text-[12px] font-bold tracking-[0.18em] uppercase text-asu-dark/60 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClasses} resize-y`}
                  style={{ ...inputStyle, minHeight: 140 }}
                />
              </div>

              {status === "error" && (
                <div
                  className="flex items-center gap-3 px-5 py-3.5 rounded-lg font-ui text-sm"
                  style={{
                    background: "rgba(229,41,30,0.06)",
                    color: "#E5291E",
                    border: "1px solid rgba(229,41,30,0.15)",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="9"
                      cy="9"
                      r="8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M9 5.5v4M9 12.5v.01"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Something went wrong. Please try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending" || !hasRecipient}
                className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 bg-asu-red text-asu-cream font-ui font-semibold text-[15px] tracking-[0.04em] rounded-lg transition-all duration-200 hover:bg-asu-red-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {status === "sending" ? (
                  <>
                    <SpinnerIcon />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7.5h11M9 3.5l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Instagram callout */}
          <motion.div
            className="mt-14 text-center"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReduced
                ? { duration: 0 }
                : { duration: 0.8, ease: EASE_OUT, delay: 1.0 }
            }
          >
            <div
              className="flex items-center gap-4 justify-center px-6 py-5 rounded-xl"
              style={{
                background: "rgba(252,238,201,0.4)",
                border: "1px solid rgba(30,28,18,0.06)",
              }}
            >
              <InstagramIcon className="w-7 h-7 text-asu-red shrink-0" />
              <p
                className="font-body text-[15px]"
                style={{ color: "rgba(30,28,18,0.6)", lineHeight: 1.55 }}
              >
                Feel free to DM us on Instagram with any questions or comments
                as well!{" "}
                <a
                  href="https://www.instagram.com/asu_iastate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-asu-red hover:underline"
                >
                  @asu_iastate
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
