# Admin Panel Design Spec

**Date:** 2026-08-22
**Status:** Draft
**Stack addition:** Supabase (Auth + Postgres + Storage) — free tier

---

## 1. Goal

Give current ASU e-board members a browser-based admin panel at `/admin` to edit all website content — text, images, links, officer roster, events, navigation, and page visibility — with changes appearing instantly (no redeploy required). Only authenticated admins can access the panel or modify data.

---

## 2. Architecture

```
Browser (visitor)            Browser (admin)
       │                            │
       │  GET /about                │  GET /admin/officers
       ▼                            ▼
┌──────────────────────────────────────────────┐
│            Astro SSR (Vercel)                │
│                                              │
│  Public routes        Admin routes (/admin)  │
│  ─ fetch content      ─ auth gate middleware │
│    from Supabase        (redirect to login)  │
│  ─ render HTML        ─ React islands for    │
│  ─ respect page         CRUD forms           │
│    visibility flags   ─ call Supabase for    │
│                         reads + writes       │
└──────────────┬───────────────────────────────┘
               │
               ▼
┌──────────────────────────┐
│        Supabase          │
│                          │
│  Auth   ─ email/password │
│  DB     ─ Postgres + RLS │
│  Storage ─ image uploads │
│           (1 GB free)    │
└──────────────────────────┘
```

### Key decisions

- **SSR for all public pages.** Content is fetched from Supabase on every request, so edits are instant.
- **Admin panel is part of the same Astro site**, not a separate app. It uses the existing Layout, Nav, and design system.
- **Supabase Auth** handles login, sessions, and password reset. No custom auth code.
- **Row Level Security (RLS)** on every table: public read, admin-only write.
- **Supabase Storage** for image uploads. Old images are deleted when replaced (see Section 7).
- **No new deployment dependencies.** Supabase is accessed via client library calls — no webhooks, no serverless functions outside Vercel.

---

## 3. Auth & Access Control

### User model

- Admins are Supabase Auth users with an `admin` role stored in the `user_metadata` or a dedicated `admin_users` table.
- On yearly board transition: outgoing president (or webmaster) adds new admin emails and removes old ones via the admin panel.

### Auth flow

1. Visit `/admin` → middleware checks Supabase session cookie.
2. No session → redirect to `/admin/login`.
3. `/admin/login` — email + password form. Calls `supabase.auth.signInWithPassword()`.
4. On success → session cookie set (httpOnly, secure, sameSite: strict). Redirect to `/admin`.
5. On every `/admin/*` request → middleware validates session and checks admin role. Invalid → redirect to login.
6. Logout → `supabase.auth.signOut()` + clear cookie.

### Password reset

- Built-in Supabase password reset flow (sends email with reset link).
- Critical for yearly turnover — new admins can be invited by email.

### Admin management (in admin panel)

- `/admin/settings/admins` — list current admins, invite new admin by email, remove admin.
- Only a user flagged as `super_admin` (initially the site creator) can add/remove other admins.

---

## 4. Database Schema

### `pages`

Controls page visibility and SEO metadata.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK, default gen |
| `slug` | text | Unique. e.g. `"about"`, `"board"`, `"connect/socials"` |
| `title` | text | Browser tab title |
| `description` | text | Meta description |
| `is_visible` | boolean | `false` → page returns 404 |
| `show_in_nav` | boolean | `false` → hidden from nav but accessible by direct URL |
| `nav_label` | text | Display text in nav bar |
| `nav_order` | int | Sort order in nav |
| `updated_at` | timestamptz | Auto-updated |

### `page_content`

All editable text blocks, per page per section.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `page_slug` | text | FK → pages.slug |
| `section_key` | text | e.g. `"hero_heading"`, `"cta_button_text"`, `"cta_button_link"` |
| `content_type` | text | `"text"`, `"heading"`, `"link"`, `"rich_text"` |
| `value` | text | The actual content |
| `display_order` | int | For ordering within a section |
| `updated_at` | timestamptz | |

Unique constraint on `(page_slug, section_key)`.

### `officers`

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `name` | text | |
| `role` | text | e.g. "President" |
| `photo_url` | text | Supabase Storage URL |
| `photo_storage_path` | text | Storage bucket path (for deletion) |
| `country` | text | Country code, e.g. `"vn"` |
| `country_label` | text | e.g. `"Vietnamese"` |
| `major` | text | |
| `hometown` | text | |
| `year` | text | e.g. `"Senior"` |
| `blurb` | text | Bio paragraph |
| `display_order` | int | |
| `updated_at` | timestamptz | |

### `events`

Replaces the Google Sheets integration.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `title` | text | |
| `date` | date | |
| `start_time` | time | |
| `end_time` | time | nullable |
| `location` | text | |
| `description` | text | |
| `image_url` | text | Supabase Storage URL |
| `image_storage_path` | text | For deletion |
| `collab` | text | nullable |
| `rsvp_url` | text | nullable, must be https |
| `tags` | text[] | Postgres array |
| `is_visible` | boolean | |
| `display_order` | int | |
| `updated_at` | timestamptz | |

### `images`

Reusable image library for polaroids, hero images, about page photos, etc.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `url` | text | Supabase Storage public URL |
| `storage_path` | text | Bucket path for deletion |
| `alt_text` | text | Accessibility |
| `category` | text | `"polaroid"`, `"about"`, `"hero"`, `"newsletter"`, etc. |
| `display_order` | int | |
| `is_visible` | boolean | |
| `updated_at` | timestamptz | |

### `site_settings`

Key-value store for global configuration.

| Column | Type | Notes |
|---|---|---|
| `key` | text | PK. e.g. `"instagram_url"`, `"discord_url"`, `"footer_tagline"` |
| `value` | text | |
| `updated_at` | timestamptz | |

### `nav_links`

Separate from `pages` so custom external links can be added.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `label` | text | Display text |
| `href` | text | URL or path |
| `is_external` | boolean | Opens in new tab |
| `display_order` | int | |
| `is_visible` | boolean | |
| `parent_group` | text | nullable, for dropdown grouping (e.g. "Connect", "Join") |
| `updated_at` | timestamptz | |

### Row Level Security (all tables)

```sql
-- Read: anyone (public pages need this)
CREATE POLICY "public_read" ON <table>
  FOR SELECT USING (true);

-- Write: authenticated admins only
CREATE POLICY "admin_write" ON <table>
  FOR ALL USING (
    auth.role() = 'authenticated'
    AND auth.jwt() ->> 'role' = 'admin'
  );
```

---

## 5. Admin Panel Routes

| Route | Purpose | Key actions |
|---|---|---|
| `/admin` | Dashboard | Links to each section, quick stats |
| `/admin/login` | Auth | Email + password login |
| `/admin/pages` | Page manager | Toggle `is_visible`, `show_in_nav`, reorder nav, edit SEO fields |
| `/admin/page/[slug]` | Page content editor | Edit all text/heading/link content blocks for a page, organized by section |
| `/admin/officers` | Officer roster | Add/edit/remove/reorder officers, upload/replace photos |
| `/admin/events` | Event manager | Add/edit/remove events, upload/replace event images |
| `/admin/images` | Image library | Upload/replace/delete images, set categories, toggle visibility, reorder |
| `/admin/settings` | Site settings | Edit social links, footer text, global config |
| `/admin/settings/admins` | Admin management | Invite/remove admin users (super_admin only) |
| `/admin/nav` | Nav editor | Add/edit/remove/reorder nav links, group under dropdowns |

### Admin UI approach

- Each admin page is an Astro page that renders a React island for the interactive form/list.
- Forms use optimistic updates — save button sends to Supabase, shows success/error toast.
- Image uploads go to Supabase Storage, URL is saved to the relevant table.
- Drag-and-drop reordering for officers, images, nav links, events (updates `display_order`).
- The admin panel uses the existing ASU design system — same fonts, colors, warm aesthetic.

---

## 6. Public Page Data Flow

### Example: Board page

```
board.astro (server)
  │
  ├─ Check pages table: is "board" visible? No → 404
  │
  ├─ Fetch officers: SELECT * FROM officers ORDER BY display_order
  │
  ├─ Fetch page_content: SELECT * FROM page_content WHERE page_slug = 'board'
  │
  └─ Pass data as props to <OfficerRoster officers={officers} />
```

### Example: Nav component

```
Nav.astro (server)
  │
  ├─ Fetch nav_links: SELECT * FROM nav_links WHERE is_visible = true ORDER BY display_order
  │
  ├─ Fetch pages: SELECT slug, show_in_nav FROM pages
  │
  └─ Render nav items, respecting visibility and order
```

### Middleware changes

```
middleware.ts
  │
  ├─ Existing: site password gate (keep as-is for pre-launch)
  │
  ├─ New: /admin/* routes → check Supabase auth session
  │       No session → redirect to /admin/login
  │       Session but not admin → 403
  │
  └─ New: all other routes → check pages table
          Page exists but is_visible = false → 404
```

---

## 7. Image Lifecycle (Storage Cleanup)

**Rule: When an image is replaced or its parent record is deleted, the old file is deleted from Supabase Storage.**

This applies to:

- **Officer photos** — replacing a photo deletes the old one from storage before uploading the new one.
- **Event images** — same as officers.
- **Image library entries** — deleting an entry deletes the file. Replacing an image deletes the old file.
- **Any record with a `photo_storage_path` or `storage_path` column** — the admin panel reads the old path, uploads the new file, saves the new path, then deletes the old file from the bucket.

### Implementation

```ts
async function replaceImage(
  bucket: string,
  oldPath: string | null,
  newFile: File,
): Promise<{ url: string; path: string }> {
  // 1. Upload new file
  const newPath = `${category}/${crypto.randomUUID()}-${newFile.name}`;
  await supabase.storage.from(bucket).upload(newPath, newFile);

  // 2. Get public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(newPath);

  // 3. Delete old file (if it existed)
  if (oldPath) {
    await supabase.storage.from(bucket).remove([oldPath]);
  }

  return { url: data.publicUrl, path: newPath };
}
```

### On record deletion

When an officer, event, or image library entry is deleted, the admin panel:
1. Reads the `storage_path` / `photo_storage_path` from the record.
2. Deletes the file from Supabase Storage.
3. Deletes the database row.

This keeps storage usage minimal and well within the 1GB free tier.

---

## 8. Migration Strategy

### Phase 1: Foundation
- Set up Supabase project (DB + Auth + Storage).
- Create all tables with RLS policies.
- Add `@supabase/supabase-js` dependency.
- Create Supabase client utilities (server + browser).
- Seed database with current hardcoded content.

### Phase 2: Admin auth
- Build `/admin/login` page.
- Update middleware to protect `/admin/*` routes.
- Create first admin user in Supabase dashboard.

### Phase 3: Admin CRUD pages
- Build each admin route one at a time:
  1. Officers (most self-contained)
  2. Events (replaces Google Sheets)
  3. Images
  4. Page content
  5. Pages (visibility toggles)
  6. Nav links
  7. Site settings
  8. Admin management

### Phase 4: Public page migration
- Update each public page to fetch from Supabase instead of using hardcoded data.
- Update Nav and Footer to read from DB.
- Update middleware for page visibility checks.
- Remove hardcoded data arrays from components.
- Remove Google Sheets fetch code (after events are migrated).

### Phase 5: Cleanup
- Remove `src/lib/fetchEvents.ts` and `src/data/events.json`.
- Remove hardcoded officer data from `OfficerRoster.tsx`.
- Remove hardcoded image lists from `PolaroidGrid.tsx`.
- Verify all pages render correctly from DB content.

---

## 9. New Dependencies

| Package | Purpose |
|---|---|
| `@supabase/supabase-js` | Supabase client (auth, DB queries, storage) |
| `@supabase/ssr` | Server-side session handling for Astro |

No other new dependencies. The admin UI uses existing React + Tailwind + Motion.

---

## 10. Environment Variables

```env
PUBLIC_SUPABASE_URL=https://<project>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>  # server-only, never exposed to browser
```

- `PUBLIC_` prefixed vars are safe for client-side (RLS protects writes).
- `SUPABASE_SERVICE_ROLE_KEY` is used only in server-side middleware for admin session validation. Never imported in client components.

---

## 11. Security Considerations

- **RLS on every table** — even with the anon key exposed, writes require an authenticated admin session.
- **Service role key server-only** — only used in Astro middleware/server endpoints, never in React islands.
- **Image uploads validated** — file type (webp/jpg/png only), max size (5MB), and sanitized filenames.
- **RSVP URLs validated** — only `https://` allowed, same as current `isSafeHttpsUrl()`.
- **CSRF protection** — Supabase Auth uses JWT tokens in httpOnly cookies; form actions validated server-side.
- **Rate limiting on login** — Supabase has built-in rate limiting on auth endpoints.
- **No public write endpoints** — consistent with existing security rules in CLAUDE.md.

---

## 12. Scope Boundaries

### In scope
- All CRUD operations for the tables above.
- Image upload/replace/delete with storage cleanup.
- Page visibility and nav toggles.
- Admin auth and admin user management.
- Migration of all hardcoded content to database.

### Out of scope
- Rich text / WYSIWYG editor (plain text and basic formatting only for now).
- Version history / undo for content changes.
- Content preview before publish.
- Multi-language support.
- Bulk import/export.

These can be added later if needed.
