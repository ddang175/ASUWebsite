/**
 * fetchEvents.ts — Pulls upcoming event data from a public Google Sheet at build time.
 *
 * HOW IT WORKS
 * ─────────────────────────────────────────────────────────────────────────────
 * Google exposes a read-only JSON endpoint on any sheet shared as
 * "Anyone with the link can view." No API key, no credentials, no CORS issues
 * because this fetch runs on the build server, never in the browser.
 *
 * The sheet must have headers in row 1 (exact names listed below) and event
 * data starting in row 2. Only the first data row is read.
 *
 * SHEET SETUP (for officers)
 * ─────────────────────────────────────────────────────────────────────────────
 * Row 1 headers (copy exactly, case-insensitive):
 *   Title | Date | Start Time | End Time | Location | Description |
 *   Image URL | Collab | RSVP URL | Tags
 *
 * DATE / TIME COLUMNS — two options:
 *   Option A (recommended): Format the Date column as a date cell and the
 *     Start/End Time columns as time cells in Sheets. Always use 4-digit years
 *     (e.g. 11/2/2026) so Sheets stores the correct year. The fetcher parses
 *     the date/time values and formats them automatically.
 *   Option B: Format all three columns as Plain Text (Format → Number →
 *     Plain text) and type values by hand, e.g. "November 2nd, 2026" / "6:00 PM".
 *   Both options work — the fetcher handles whichever form Sheets sends.
 *
 * IMAGE URL — paste any of the following:
 *   - A relative site path: /images/events/spring-gbm.webp
 *   - Any public image URL
 *   - A Google Drive share link (auto-converted to a direct image URL).
 *     The file must be shared as "Anyone with the link → Viewer".
 *     Note: Google Drive image embedding can be unreliable; hosting the image
 *     directly in the site's public/images/ folder is more dependable.
 *
 * COLLAB   — org name; leave empty to hide the collaboration line.
 * RSVP URL — form link; leave empty to hide the RSVP button.
 * TAGS     — comma-separated (e.g. "Cultural, All Welcome, Free"); leave empty.
 *
 * UPDATING EVENT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 * Edit the sheet, then trigger a site redeploy. The build fetches fresh data
 * each time it runs. If the fetch fails, the site falls back to
 * src/data/events.json automatically.
 */

export interface EventData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  description: string;
  imageUrl: string;
  collab: string | null;
  rsvpUrl: string | null;
  tags: string[];
}

// ─────────────────────────────────────────────────────────────────────────────
// Date / time helpers
//
// The gviz API returns date cells as "Date(year,month0,day)" strings and
// time cells as "Date(1899,11,30,hours,minutes,seconds)" strings.
// Plain-text cells are returned as ordinary strings and are used as-is.
// ─────────────────────────────────────────────────────────────────────────────

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function ordinal(n: number): string {
  if (n >= 11 && n <= 13) return `${n}th`;
  const rem = n % 10;
  if (rem === 1) return `${n}st`;
  if (rem === 2) return `${n}nd`;
  if (rem === 3) return `${n}rd`;
  return `${n}th`;
}

// Parses a gviz "Date(y,m,d)" or "Date(y,m,d,h,min,s)" string.
// Returns null if the input is not in that format.
function parseGvizDate(v: unknown): Date | null {
  if (typeof v !== "string") return null;
  const m = v.match(/^Date\((\d+),(\d+),(\d+)(?:,(\d+),(\d+),(\d+))?\)$/);
  if (!m) return null;
  const year = parseInt(m[1]);
  const month = parseInt(m[2]); // 0-indexed
  const day = parseInt(m[3]);
  const hours = m[4] !== undefined ? parseInt(m[4]) : 0;
  const mins = m[5] !== undefined ? parseInt(m[5]) : 0;
  // Avoid JS's 1900-offset quirk for years < 100: use setFullYear
  const d = new Date(year, month, day, hours, mins, 0);
  d.setFullYear(year);
  return d;
}

function formatDate(d: Date): string {
  return `${MONTH_NAMES[d.getMonth()]} ${ordinal(d.getDate())}, ${d.getFullYear()}`;
}

function formatTime(d: Date): string {
  const h = d.getHours();
  const m = d.getMinutes();
  const period = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12;
  return m === 0 ? `${h12} ${period}` : `${h12}:${m.toString().padStart(2, "0")} ${period}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Image URL normalisation
// ─────────────────────────────────────────────────────────────────────────────

// Converts a Google Drive share link to Google's lh3 image CDN URL.
// Any other URL is returned unchanged.
function normalizeImageUrl(url: string): string {
  const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/?]+)/);
  if (fileMatch) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}=w1200`;
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&\s]+)/);
  if (openMatch) return `https://lh3.googleusercontent.com/d/${openMatch[1]}=w1200`;
  return url;
}

// Downloads an external image to the site's own file system at build/dev time
// so the final HTML only contains a first-party /images/... path — no external
// CDN URLs, Drive file IDs, or googleusercontent.com references are emitted.
//
// In dev mode  → saves to public/images/events/ (served by Astro's dev server)
// In prod build → saves to dist/images/events/  (copied into final output)
//
// Falls back silently to the original URL if the download fails, so a network
// hiccup during build degrades gracefully rather than breaking the page.
async function localizeExternalImage(url: string): Promise<string> {
  // Relative paths are already on the site — nothing to do
  if (!url.startsWith("http")) return url;

  try {
    const { writeFileSync, mkdirSync } = await import("node:fs");
    const { join } = await import("node:path");

    const res = await fetch(url);
    if (!res.ok) return url;

    const contentType = res.headers.get("content-type") ?? "";
    const ext = contentType.includes("png")
      ? "png"
      : contentType.includes("webp")
        ? "webp"
        : "jpg";
    const filename = `event-cover.${ext}`;

    const targetDir = import.meta.env.DEV
      ? join(process.cwd(), "public", "images", "events")
      : join(process.cwd(), "dist", "images", "events");

    mkdirSync(targetDir, { recursive: true });
    writeFileSync(join(targetDir, filename), Buffer.from(await res.arrayBuffer()));

    return `/images/events/${filename}`;
  } catch {
    return url;
  }
}

// Ensures a URL is safe to use as an href — only https:// allowed.
function isSafeHttpsUrl(url: string): boolean {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export async function fetchUpcomingEvent(
  sheetId: string,
): Promise<EventData | null> {
  try {
    // &headers=1 tells the API to treat row 1 as column labels
    const endpoint = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&headers=1`;
    const res = await fetch(endpoint);
    if (!res.ok) return null;

    const text = await res.text();

    // Response is wrapped in a JSONP callback — strip it to get plain JSON
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");
    if (start === -1 || end === -1) return null;

    const json = JSON.parse(text.slice(start, end + 1)) as {
      status: string;
      table: {
        cols: Array<{ label: string }>;
        rows: Array<{ c: Array<{ v: unknown } | null> }>;
      };
    };

    if (json.status !== "ok") return null;

    const { cols, rows } = json.table;
    if (!rows || rows.length === 0) return null;

    // Build label → column-index map (lowercase, spaces → underscores)
    const colIndex: Record<string, number> = {};
    cols.forEach((col, i) => {
      const key = col.label.toLowerCase().trim().replace(/\s+/g, "_");
      colIndex[key] = i;
    });

    const row = rows[0].c;

    // Raw cell reader — returns the gviz v value (may be a Date() string)
    const rawCell = (key: string): unknown => {
      const i = colIndex[key];
      if (i === undefined || i >= row.length) return null;
      const cell = row[i];
      if (!cell || cell.v === null || cell.v === undefined) return null;
      return cell.v;
    };

    // String cell: plain text, ignores Date() objects
    const get = (key: string): string => {
      const v = rawCell(key);
      if (v === null || v === undefined) return "";
      // If it came back as a gviz Date() string, return "" so callers
      // use the appropriate date/time reader instead
      if (typeof v === "string" && v.startsWith("Date(")) return "";
      return v.toString().trim();
    };

    // Date cell: parses gviz Date() → "Month Dth, YYYY"; falls back to string
    const getDate = (key: string): string => {
      const v = rawCell(key);
      if (v === null || v === undefined) return "";
      const parsed = parseGvizDate(v);
      if (parsed) return formatDate(parsed);
      return v.toString().trim();
    };

    // Time cell: parses gviz Date() → "H:MM AM/PM"; falls back to string
    const getTime = (key: string): string => {
      const v = rawCell(key);
      if (v === null || v === undefined) return "";
      const parsed = parseGvizDate(v);
      if (parsed) return formatTime(parsed);
      return v.toString().trim();
    };

    const rawImage = get("image_url");
    const tags = get("tags")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    // Normalize the Drive share link → CDN URL, then download it locally so
    // no external URL ever reaches the rendered HTML.
    const imageUrl = rawImage
      ? await localizeExternalImage(normalizeImageUrl(rawImage))
      : "";

    const rawRsvp = get("rsvp_url");
    // Only allow https:// links — blocks javascript: and other protocol injection
    const rsvpUrl = isSafeHttpsUrl(rawRsvp) ? rawRsvp : null;

    return {
      title:       get("title") || "Event Title TBA",
      date:        getDate("date") || "Date TBA",
      startTime:   getTime("start_time"),
      endTime:     getTime("end_time"),
      location:    get("location") || "Location TBA",
      description: get("description") || "Details coming soon.",
      imageUrl,
      collab:      get("collab") || null,
      rsvpUrl,
      tags,
    };
  } catch {
    return null;
  }
}
