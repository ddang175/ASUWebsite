# Admin Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Supabase-powered admin panel at `/admin` that lets e-board officers edit all site content (text, images, links, officers, events, nav, page visibility) with changes appearing instantly via SSR.

**Architecture:** Supabase provides auth (email/password), Postgres database with Row Level Security, and object storage for images. The admin panel is a set of Astro pages with React islands for interactive forms, protected by middleware that validates Supabase sessions. Public pages fetch all content from Supabase at request time (SSR), so edits are instant.

**Tech Stack:** Astro (SSR on Vercel), TypeScript, React, Tailwind CSS v4, Supabase (Auth + Postgres + Storage), `@supabase/supabase-js`, `@supabase/ssr`

**Spec:** `docs/superpowers/specs/2026-08-22-admin-panel-design.md`

## Global Constraints

- Node >= 22.12.0
- Astro 7.x with `output: 'server'` and `@astrojs/vercel` adapter
- Tailwind CSS v4 (uses `@tailwindcss/vite`, NOT `@tailwindcss/postcss`)
- Only two new dependencies: `@supabase/supabase-js` and `@supabase/ssr`
- All image uploads limited to webp/jpg/png, max 5MB
- All external URLs must be `https://` only
- RLS on every Supabase table: public read, admin-only write
- When an image is replaced or its record deleted, the old file is removed from Supabase Storage
- Follow the ASU design system in `docs/DESIGN_SYSTEM.md` for all admin UI
- Environment variables: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (server-only)

---

### Task 1: Install Dependencies and Create Supabase Client Utilities

**Files:**
- Modify: `package.json`
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/supabase/types.ts`
- Create: `.env.example`

**Interfaces:**
- Consumes: nothing
- Produces:
  - `createBrowserClient(): SupabaseClient` — for React islands (client-side)
  - `createServerClient(cookies: AstroCookies): SupabaseClient` — for Astro pages/middleware (server-side)
  - `Database` type — generated Supabase type (placeholder to start, filled in after table creation)

- [ ] **Step 1: Install Supabase packages**

```bash
npm install @supabase/supabase-js @supabase/ssr
```

- [ ] **Step 2: Create `.env.example`**

```env
PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

- [ ] **Step 3: Create `src/lib/supabase/types.ts`**

This is a placeholder that will be replaced with generated types after tables are created.

```ts
export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      pages: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          is_visible: boolean;
          show_in_nav: boolean;
          nav_label: string;
          nav_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['pages']['Insert']>;
      };
      page_content: {
        Row: {
          id: string;
          page_slug: string;
          section_key: string;
          content_type: string;
          value: string;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['page_content']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['page_content']['Insert']>;
      };
      officers: {
        Row: {
          id: string;
          name: string;
          role: string;
          photo_url: string;
          photo_storage_path: string;
          country: string;
          country_label: string;
          major: string;
          hometown: string;
          year: string;
          blurb: string;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['officers']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['officers']['Insert']>;
      };
      events: {
        Row: {
          id: string;
          title: string;
          date: string;
          start_time: string;
          end_time: string | null;
          location: string;
          description: string;
          image_url: string;
          image_storage_path: string;
          collab: string | null;
          rsvp_url: string | null;
          tags: string[];
          is_visible: boolean;
          display_order: number;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['events']['Insert']>;
      };
      images: {
        Row: {
          id: string;
          url: string;
          storage_path: string;
          alt_text: string;
          category: string;
          display_order: number;
          is_visible: boolean;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['images']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['images']['Insert']>;
      };
      site_settings: {
        Row: {
          key: string;
          value: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'updated_at'> & { updated_at?: string };
        Update: Partial<Database['public']['Tables']['site_settings']['Insert']>;
      };
      nav_links: {
        Row: {
          id: string;
          label: string;
          href: string;
          is_external: boolean;
          display_order: number;
          is_visible: boolean;
          parent_group: string | null;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['nav_links']['Row'], 'id' | 'updated_at'> & { id?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['nav_links']['Insert']>;
      };
    };
  };
}
```

- [ ] **Step 4: Create `src/lib/supabase/server.ts`**

```ts
import { createServerClient as createClient, parseCookieHeader, serializeCookieHeader } from '@supabase/ssr';
import type { AstroCookies } from 'astro';
import type { Database } from './types';

export function createServerClient(cookies: AstroCookies) {
  return createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return parseCookieHeader(cookies.get('sb-access-token')?.value ?? '');
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, {
              path: '/',
              httpOnly: true,
              secure: import.meta.env.PROD,
              sameSite: 'lax',
              ...options,
            });
          });
        },
      },
    }
  );
}
```

- [ ] **Step 5: Create `src/lib/supabase/client.ts`**

```ts
import { createBrowserClient as createClient } from '@supabase/ssr';
import type { Database } from './types';

export function createBrowserClient() {
  return createClient<Database>(
    import.meta.env.PUBLIC_SUPABASE_URL,
    import.meta.env.PUBLIC_SUPABASE_ANON_KEY
  );
}
```

- [ ] **Step 6: Verify the build still passes**

```bash
npm run build
```

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json src/lib/supabase/ .env.example
git commit -m "feat: add Supabase client utilities and type definitions"
```

---

### Task 2: Supabase Database Setup (SQL Migration Script)

**Files:**
- Create: `supabase/migrations/001_create_tables.sql`
- Create: `supabase/seed.sql`

**Interfaces:**
- Consumes: nothing
- Produces: All 7 database tables with RLS policies, ready for use by all subsequent tasks

This task creates the SQL files that the developer runs in the Supabase Dashboard SQL Editor. They are not auto-executed by Astro.

- [ ] **Step 1: Create `supabase/migrations/001_create_tables.sql`**

```sql
-- ============================================================
-- ASU Admin Panel — Database Schema
-- Run this in the Supabase Dashboard SQL Editor.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── pages ────────────────────────────────────────────────────
CREATE TABLE pages (
  id          uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  slug        text UNIQUE NOT NULL,
  title       text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  is_visible  boolean NOT NULL DEFAULT true,
  show_in_nav boolean NOT NULL DEFAULT true,
  nav_label   text NOT NULL DEFAULT '',
  nav_order   int NOT NULL DEFAULT 0,
  updated_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pages_public_read" ON pages FOR SELECT USING (true);
CREATE POLICY "pages_admin_write" ON pages FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── page_content ─────────────────────────────────────────────
CREATE TABLE page_content (
  id            uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  page_slug     text NOT NULL REFERENCES pages(slug) ON DELETE CASCADE,
  section_key   text NOT NULL,
  content_type  text NOT NULL DEFAULT 'text',
  value         text NOT NULL DEFAULT '',
  display_order int NOT NULL DEFAULT 0,
  updated_at    timestamptz NOT NULL DEFAULT now(),
  UNIQUE (page_slug, section_key)
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "page_content_public_read" ON page_content FOR SELECT USING (true);
CREATE POLICY "page_content_admin_write" ON page_content FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── officers ─────────────────────────────────────────────────
CREATE TABLE officers (
  id                 uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name               text NOT NULL,
  role               text NOT NULL,
  photo_url          text NOT NULL DEFAULT '',
  photo_storage_path text NOT NULL DEFAULT '',
  country            text NOT NULL DEFAULT '',
  country_label      text NOT NULL DEFAULT '',
  major              text NOT NULL DEFAULT '',
  hometown           text NOT NULL DEFAULT '',
  year               text NOT NULL DEFAULT '',
  blurb              text NOT NULL DEFAULT '',
  display_order      int NOT NULL DEFAULT 0,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE officers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "officers_public_read" ON officers FOR SELECT USING (true);
CREATE POLICY "officers_admin_write" ON officers FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── events ───────────────────────────────────────────────────
CREATE TABLE events (
  id                 uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title              text NOT NULL,
  date               date NOT NULL,
  start_time         time,
  end_time           time,
  location           text NOT NULL DEFAULT '',
  description        text NOT NULL DEFAULT '',
  image_url          text NOT NULL DEFAULT '',
  image_storage_path text NOT NULL DEFAULT '',
  collab             text,
  rsvp_url           text,
  tags               text[] NOT NULL DEFAULT '{}',
  is_visible         boolean NOT NULL DEFAULT true,
  display_order      int NOT NULL DEFAULT 0,
  updated_at         timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "events_public_read" ON events FOR SELECT USING (true);
CREATE POLICY "events_admin_write" ON events FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── images ───────────────────────────────────────────────────
CREATE TABLE images (
  id            uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  url           text NOT NULL,
  storage_path  text NOT NULL,
  alt_text      text NOT NULL DEFAULT '',
  category      text NOT NULL DEFAULT 'general',
  display_order int NOT NULL DEFAULT 0,
  is_visible    boolean NOT NULL DEFAULT true,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "images_public_read" ON images FOR SELECT USING (true);
CREATE POLICY "images_admin_write" ON images FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── site_settings ────────────────────────────────────────────
CREATE TABLE site_settings (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_admin_write" ON site_settings FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── nav_links ────────────────────────────────────────────────
CREATE TABLE nav_links (
  id            uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  label         text NOT NULL,
  href          text NOT NULL,
  is_external   boolean NOT NULL DEFAULT false,
  display_order int NOT NULL DEFAULT 0,
  is_visible    boolean NOT NULL DEFAULT true,
  parent_group  text,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE nav_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "nav_links_public_read" ON nav_links FOR SELECT USING (true);
CREATE POLICY "nav_links_admin_write" ON nav_links FOR ALL USING (
  auth.role() = 'authenticated'
);

-- ── Auto-update updated_at on every table ────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER page_content_updated_at BEFORE UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER officers_updated_at BEFORE UPDATE ON officers FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER events_updated_at BEFORE UPDATE ON events FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER images_updated_at BEFORE UPDATE ON images FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER nav_links_updated_at BEFORE UPDATE ON nav_links FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── Storage bucket for images ────────────────────────────────
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true);

CREATE POLICY "images_bucket_public_read" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "images_bucket_admin_upload" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "images_bucket_admin_update" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "images_bucket_admin_delete" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'images'
    AND auth.role() = 'authenticated'
  );
```

- [ ] **Step 2: Create `supabase/seed.sql`**

This seeds the database with the current hardcoded content from the site. Run after the migration.

```sql
-- ── Pages ────────────────────────────────────────────────────
INSERT INTO pages (slug, title, description, is_visible, show_in_nav, nav_label, nav_order) VALUES
  ('/', 'Asian Student Union', 'Asian Student Union at Iowa State University — a community rooted in heritage, growing together.', true, true, 'Home', 0),
  ('about', 'About Us — Asian Student Union', 'Learn about the Asian Student Union at Iowa State — our mission, values, and the community we''ve built together.', true, false, 'About Us', 1),
  ('board', 'Meet the Team — Asian Student Union', 'The students who keep ASU running by planning every GBM, fundraiser, and social you''ll see this year.', true, false, 'Executive Board', 2),
  ('join/stuorg', 'Join — Asian Student Union', 'Join the Asian Student Union student organization at Iowa State University.', true, false, 'Student Organization', 3),
  ('join/newsletter', 'Newsletter — Asian Student Union', 'Subscribe to the ASU newsletter.', true, false, 'Newsletter', 4),
  ('connect/socials', 'Socials — Asian Student Union', 'Follow ASU on Instagram, TikTok, and Discord to stay connected with events, updates, and club life.', true, false, 'Socials', 5),
  ('connect/contact', 'Contact Us — Asian Student Union', 'Get in touch with the Asian Student Union at Iowa State University.', true, false, 'Contact Us', 6),
  ('looped', 'Looped — Asian Student Union', 'Looped — more details coming soon from the Asian Student Union at Iowa State University.', true, true, 'Looped', 7),
  ('feedback', 'Feedback — Asian Student Union', 'Share your feedback with the Asian Student Union.', true, true, 'Feedback', 8);

-- ── Nav links ────────────────────────────────────────────────
INSERT INTO nav_links (label, href, is_external, display_order, is_visible, parent_group) VALUES
  ('Home', '/', false, 0, true, NULL),
  ('About Us', '/about', false, 1, true, 'About'),
  ('Executive Board', '/board', false, 2, true, 'About'),
  ('Student Organization', '/join/stuorg', false, 3, true, 'Join'),
  ('Newsletter', '/join/newsletter', false, 4, true, 'Join'),
  ('Socials', '/connect/socials', false, 5, true, 'Connect'),
  ('Contact Us', '/connect/contact', false, 6, true, 'Connect'),
  ('Looped', '/looped', false, 7, true, NULL),
  ('Feedback', '/feedback', false, 8, true, NULL);

-- ── Officers ─────────────────────────────────────────────────
INSERT INTO officers (name, role, photo_url, country, country_label, major, hometown, year, blurb, display_order) VALUES
  ('Danton Dang', 'President', '/images/board/danton.webp', 'vn', 'Vietnamese', 'Software Engineering', 'Davenport, IA', 'Senior', 'Hey everyone! My name is Danton, and I will be your guys'' president this year :P I am always open to a fun conversation, so feel free to come up to me at ASU events to talk! Outside of work and school, I love dancing, playing volleyball, hanging out with friends, and learning random things (building up random stats lol). I can''t wait to meet everyone and bring you guys a great year!', 0),
  ('Jennifer Tran', 'Vice President', '/images/board/jennifer.webp', 'vn', 'Vietnamese', 'Accounting', 'Bloomington, MN', 'Junior', 'Hellooo! My name is Jennifer Tran, but you can also call me Jenni!! When I''m not crying over my accounting homework, you''ll probably find me crocheting, knitting, or raging in Valorant. Aside from my hobbies, joining ASU has been one of the best parts of my college experience. Through ASU, I''ve made amazing memories and met some amazing people. I''ve always admired the E-Board''s hard work and dedication, which is what inspired me to join. I want to help create the same welcoming environment and lasting memories for future members as well!', 1),
  ('Leah Mast', 'Treasurer', '/images/board/leah.webp', 'cn', 'Chinese', 'Accounting', 'Payson, IL', 'Junior', 'Hello, my name is Leah! I''m the current treasurer of the Asian Student Union (ASU). I''ve been a member of the organization since my first year at Iowa State. ASU has a wonderful community and celebrates Asian cultures, which is how I fell in love with the organization. When I''m not serving as the treasurer at general board meetings, you could catch me serving as the Resident Assistant at Towers, online gaming, or at the library studying!', 2),
  ('Ethan Pham', 'Community Chair', '/images/board/ethan.webp', 'vn', 'Vietnamese', 'Computer Science', 'Sioux City, IA', 'Sophomore', 'A little bit more about me is that ASU helped me find my friend group through its community. I hope, as Community Chair, that people can look back and be proud that they were a part of ASU. Outside of ASU, you can find me at hackathons, playing volleyball on the court, or sleeping tbh. Oh, and I once clogged the school''s bathroom so hard that it became Snapchat famous.', 3),
  ('Olivia Chen', 'Fundraising Chair', '/images/board/olivia.webp', 'cn', 'Chinese', 'Accounting', 'Brooklyn, NY', 'Sophomore', 'Hi everyone! My name is Olivia, feel free to call me by whatever! I am going to be ASU''s fundraising chair for this year so here''s some of my interests! I love to dance and bake, reading the tri-man (manga, manhwa, and manhua) as well as webtoons like Eleceed, Omniscient Reader''s Viewpoint, and Heaven''s Official Blessing. Live, love, laugh Haikyuu and I love desserts so let me know if any of y''all want to hit up a fire dessert place', 4),
  ('Yukari Matsunaga', 'Multimedia Member', '/images/board/yukari.webp', 'jp', 'Japanese', 'Interior Design', 'Higashikurume, Tokyo', 'Junior', 'I''m Yukari Matsunaga from Japan!! My favorite American food is cheese curds. I like singing and going for walks. I have two dogs, and whenever I miss them, I like looking through photos of them. It''s something I do almost every day', 5),
  ('Elle Chandy', 'Multimedia Member', '/images/board/elle.webp', 'la', 'Laos', 'Fashion Design and Merchandising', 'Sioux City, IA', 'Sophomore', 'Hey everyone!! My name is Elle Chandy but it''s said like Ellie. I will be a part of your new Multi-Media crew. My interests/hobbies are reading, sewing, gaming, and drawing. Fun Fact, some of the reasons that I joined ASU were the loving environment and amazing E-Board. I hope to try my hardest I can to make ASU the absolute best!!!', 6),
  ('Cathy Bui', 'Multimedia Member', '/images/board/cathy.webp', 'vn', 'Vietnamese', 'Industrial Design', 'Davenport, IA', 'Senior', 'Hi, I''m Cathy and one of my favorite things to get into is arts and craft! I can crochet, make felt keychains, origami, etc. It''s also how I got interested in my major since I love designing things : ) One of my favorite projects I''ve done is designing a lucky cat inspired diffuser which actually works, yippee. I want to use my expertise in design and make awesome asu merch for everyone!', 7),
  ('Jordan Nguyen', 'Photography Chair', '/images/board/jordan.webp', 'vn', 'Vietnamese', 'Computer Engineering', 'Des Moines, IA', 'Senior', 'hi, i''m jordan! i''m a computer engineer with a focus on vlsi design and electrical engineering. i enjoy media production as a hobby and occasionally dabble in video, automotive and portrait work. last school year, i was responsible for photoshoots, portraits, and camera work used for asian student union''s media presence to promote and document events and other collaborations with partnered student organizations. my other hobbies include computer-related tech, drawing, and lifting.', 8),
  ('Gavin Macanip', 'Event Planning Chair', '/images/board/gavin.webp', 'ph', 'Filipino', 'Computer Engineering', 'Plainfield, IL', 'Sophomore', 'Hi! My name is Gavin Macanip, this year''s event planner! I like to climb rocks, kick things (fun fact: I met an olympic athlete cause of this), take photos, and do random side quests. I am an avid Bruno Mars enjoyer and professional yearner too (especially with karaoke). I love to listen to music and playing it too.', 9),
  ('Nathan Sison', 'Outreach Chair', '/images/board/nathan.webp', 'ph', 'Filipino', 'Finance', 'Mount Prospect, IL', 'Sophomore', 'Hi there! I''m Nathaniel Sison, but you can just call me Nathan. Let me share a bit about myself. I''m proudly FILIPINO RAAAAH, hailing from the Illinois region, and I''m currently pursuing a degree in Finance. I enjoy a variety of activities, including playing volleyball, singing, and indulging in delicious food. My favorite color is red, and I''m always eager to meet new friends. If you happen to see me around, don''t hesitate to come over and say hello — I''m always here to be a friend if you need one.', 10);

-- ── Site settings ────────────────────────────────────────────
INSERT INTO site_settings (key, value) VALUES
  ('instagram_url', 'https://www.instagram.com/isu.asu/'),
  ('tiktok_url', 'https://www.tiktok.com/@isu.asu'),
  ('discord_url', 'https://discord.gg/asuiowa'),
  ('instagram_handle', '@isu.asu'),
  ('tiktok_handle', '@isu.asu'),
  ('discord_handle', 'ASU Iowa'),
  ('footer_disclaimer', 'The views and opinions expressed on this website are strictly those of the Asian Student Union at Iowa State University and its members. The contents of these pages have not been reviewed or approved by Iowa State University. This is not an official Iowa State University website.'),
  ('mission_text', 'To foster a welcoming and safe community that celebrates Asian culture and heritage, empowering our members by creating lasting spaces for connection, growth, and joy at Iowa State University.');

-- ── Page content (key text blocks from each page) ────────────
-- About page
INSERT INTO page_content (page_slug, section_key, content_type, value, display_order) VALUES
  ('about', 'hero_eyebrow', 'text', 'Our Story', 0),
  ('about', 'hero_heading', 'heading', 'A community rooted in heritage, growing together.', 1),
  ('about', 'mission_label', 'text', 'Our Mission', 2),
  ('about', 'who_we_are_eyebrow', 'text', 'Who We Are', 3),
  ('about', 'who_we_are_heading', 'heading', 'More than a club — a community.', 4),
  ('about', 'who_we_are_body', 'text', 'The Asian Student Union at Iowa State University is a vibrant community dedicated to celebrating Asian culture, building meaningful connections, and creating a welcoming space for everyone. Whether you''re looking to explore your heritage, try something new, or simply find your people — ASU is the place.', 5),
  ('about', 'who_we_are_body_2', 'text', 'From cultural showcases and food nights to socials and study sessions, every event is an opportunity to connect and grow.', 6),
  ('about', 'values_label', 'text', 'What We Stand For', 7),
  ('about', 'values_heading', 'heading', 'Our values.', 8),
  ('about', 'cta_eyebrow', 'text', 'Join the Family', 9),
  ('about', 'cta_heading', 'heading', 'Become part of the community.', 10),
  ('about', 'cta_body', 'text', 'Interested in joining ASU? Learn more about joining and follow us on our socials below!', 11),
  ('about', 'cta_button_text', 'text', 'Join ASU', 12),
  ('about', 'cta_button_link', 'link', '/join/stuorg', 13),
  ('about', 'cta_button_2_text', 'text', 'Follow Us', 14),
  ('about', 'cta_button_2_link', 'link', '/connect/socials', 15);

-- Board page
INSERT INTO page_content (page_slug, section_key, content_type, value, display_order) VALUES
  ('board', 'hero_eyebrow', 'text', 'The Team Behind ASU', 0),
  ('board', 'hero_heading', 'heading', 'Meet the people who make it happen.', 1),
  ('board', 'intro_eyebrow', 'text', 'Your E-Board', 2),
  ('board', 'intro_heading', 'heading', 'The students who keep ASU running.', 3),
  ('board', 'intro_body', 'text', 'Planning every GBM, fundraiser, and social you''ll see this year.', 4),
  ('board', 'endcap_eyebrow', 'text', 'Want to join the board?', 5),
  ('board', 'endcap_heading', 'heading', 'Applications open every spring.', 6),
  ('board', 'endcap_body', 'text', 'Interested in helping run ASU next year? Watch our socials and the newsletter for when officer applications open.', 7),
  ('board', 'endcap_button_text', 'text', 'Get notified →', 8),
  ('board', 'endcap_button_link', 'link', '/connect/socials', 9);

-- Home page
INSERT INTO page_content (page_slug, section_key, content_type, value, display_order) VALUES
  ('/', 'hero_label', 'text', 'Asian Student Union', 0),
  ('/', 'hero_button_text', 'text', 'About Us', 1),
  ('/', 'hero_button_link', 'link', '/about', 2),
  ('/', 'scroll_cue_text', 'text', 'Next Event', 3),
  ('/', 'event_section_label', 'text', 'Upcoming Event', 4);
```

- [ ] **Step 3: Commit**

```bash
git add supabase/
git commit -m "feat: add database migration and seed SQL scripts"
```

---

### Task 3: Admin Auth — Login Page and Middleware

**Files:**
- Modify: `src/middleware.ts`
- Create: `src/pages/admin/login.astro`
- Create: `src/pages/admin/index.astro`
- Create: `src/components/admin/LoginForm.tsx`
- Create: `src/layouts/AdminLayout.astro`

**Interfaces:**
- Consumes: `createServerClient` from Task 1, `createBrowserClient` from Task 1
- Produces:
  - Middleware that protects all `/admin/*` routes (except `/admin/login`)
  - `AdminLayout.astro` — base layout for all admin pages
  - Login/logout flow using Supabase Auth

- [ ] **Step 1: Update `src/middleware.ts` to add admin auth gate**

```ts
import { defineMiddleware, sequence } from 'astro:middleware';
import { safeCompare } from './lib/rateLimit';
import { createServerClient } from './lib/supabase/server';

const sitePasswordGate = defineMiddleware(async (context, next) => {
  const sitePassword = import.meta.env.SITE_PASSWORD ?? process.env.SITE_PASSWORD;
  if (!sitePassword) return next();
  const { pathname } = context.url;
  if (pathname.startsWith('/password')) return next();
  if (pathname.startsWith('/admin')) return next();
  const cookie = context.cookies.get('asu_preview_auth');
  if (cookie?.value && safeCompare(cookie.value, sitePassword)) return next();
  return context.redirect('/password');
});

const adminAuthGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (!pathname.startsWith('/admin')) return next();
  if (pathname === '/admin/login') return next();

  const supabase = createServerClient(context.cookies);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return context.redirect('/admin/login');
  }

  context.locals.user = user;
  return next();
});

export const onRequest = sequence(sitePasswordGate, adminAuthGate);
```

- [ ] **Step 2: Add type declaration for `context.locals`**

Create or update `src/env.d.ts`:

```ts
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user?: import('@supabase/supabase-js').User;
  }
}
```

- [ ] **Step 3: Create `src/layouts/AdminLayout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
}

const { title = 'Admin — ASU' } = Astro.props;
const currentPath = Astro.url.pathname;

const adminNavItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Pages', href: '/admin/pages' },
  { label: 'Officers', href: '/admin/officers' },
  { label: 'Events', href: '/admin/events' },
  { label: 'Images', href: '/admin/images' },
  { label: 'Navigation', href: '/admin/nav' },
  { label: 'Settings', href: '/admin/settings' },
];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" type="image/webp" href="/images/asu-logo.webp" />
    <title>{title}</title>
  </head>
  <body class="bg-asu-ivory min-h-screen flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-asu-espresso text-asu-cream flex flex-col shrink-0 sticky top-0 h-screen">
      <div class="p-6 border-b border-asu-cream/10">
        <a href="/admin" class="flex items-center gap-3">
          <img src="/images/asu-logo.webp" alt="ASU" class="h-8 w-auto" style="filter: brightness(0) invert(1);" />
          <span class="font-ui text-sm font-bold tracking-wide">Admin</span>
        </a>
      </div>
      <nav class="flex-1 py-4">
        <ul class="list-none m-0 p-0">
          {adminNavItems.map((item) => (
            <li>
              <a
                href={item.href}
                class:list={[
                  'block px-6 py-2.5 font-ui text-sm transition-colors duration-150',
                  currentPath === item.href
                    ? 'text-asu-cream bg-asu-red/20 border-r-2 border-asu-red'
                    : 'text-asu-cream/60 hover:text-asu-cream hover:bg-asu-cream/5',
                ]}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div class="p-4 border-t border-asu-cream/10">
        <a href="/" class="font-ui text-xs text-asu-cream/40 hover:text-asu-cream/70 transition-colors">
          ← Back to site
        </a>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8 md:p-12 overflow-x-hidden">
      <slot />
    </main>
  </body>
</html>
```

- [ ] **Step 4: Create `src/components/admin/LoginForm.tsx`**

```tsx
import { useState } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createBrowserClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    window.location.href = '/admin';
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-asu-ivory px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img
            src="/images/asu-logo.webp"
            alt="ASU"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="font-display text-2xl text-asu-dark">Admin Login</h1>
          <p className="font-body text-sm text-asu-muted mt-1">
            Sign in with your admin account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-ui text-xs font-medium text-asu-dark mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-asu-beige rounded bg-asu-card font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red transition-colors"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-ui text-xs font-medium text-asu-dark mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-asu-beige rounded bg-asu-card font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red transition-colors"
            />
          </div>

          {error && (
            <p className="font-ui text-xs text-asu-red">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-asu-red text-asu-cream font-ui font-semibold text-sm rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Create `src/pages/admin/login.astro`**

```astro
---
import '../../styles/global.css';
import { LoginForm } from '../../components/admin/LoginForm';
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <link rel="icon" type="image/webp" href="/images/asu-logo.webp" />
    <title>Admin Login — ASU</title>
  </head>
  <body>
    <LoginForm client:load />
  </body>
</html>
```

- [ ] **Step 6: Create `src/pages/admin/index.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---

<AdminLayout title="Dashboard — ASU Admin">
  <div class="max-w-4xl">
    <h1 class="font-display text-3xl text-asu-dark mb-2">Dashboard</h1>
    <p class="font-body text-asu-muted mb-10">Manage your ASU website content.</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[
        { label: 'Pages', href: '/admin/pages', desc: 'Toggle visibility, edit SEO' },
        { label: 'Officers', href: '/admin/officers', desc: 'Edit the board roster' },
        { label: 'Events', href: '/admin/events', desc: 'Add and edit events' },
        { label: 'Images', href: '/admin/images', desc: 'Manage photo library' },
        { label: 'Navigation', href: '/admin/nav', desc: 'Edit nav bar links' },
        { label: 'Settings', href: '/admin/settings', desc: 'Social links, footer text' },
      ].map(({ label, href, desc }) => (
        <a
          href={href}
          class="block p-5 bg-asu-card border border-asu-beige rounded-lg hover:border-asu-red/30 transition-colors"
        >
          <p class="font-ui text-sm font-semibold text-asu-dark mb-1">{label}</p>
          <p class="font-body text-xs text-asu-muted">{desc}</p>
        </a>
      ))}
    </div>
  </div>
</AdminLayout>
```

- [ ] **Step 7: Build and verify**

```bash
npm run build
```

- [ ] **Step 8: Commit**

```bash
git add src/middleware.ts src/env.d.ts src/layouts/AdminLayout.astro src/pages/admin/ src/components/admin/
git commit -m "feat: add admin auth, login page, dashboard, and admin layout"
```

---

### Task 4: Admin CRUD — Officers Management

**Files:**
- Create: `src/pages/admin/officers.astro`
- Create: `src/components/admin/OfficerManager.tsx`
- Create: `src/lib/supabase/storage.ts`

**Interfaces:**
- Consumes: `createServerClient` from Task 1, `createBrowserClient` from Task 1, `Database` types from Task 1
- Produces:
  - `replaceImage(supabase, bucket, oldPath, newFile, category): Promise<{ url: string; path: string }>` — reusable image upload + old-image cleanup utility
  - `deleteImage(supabase, bucket, path): Promise<void>` — reusable image deletion utility
  - Full officer CRUD UI at `/admin/officers`

- [ ] **Step 1: Create `src/lib/supabase/storage.ts`**

```ts
import type { SupabaseClient } from '@supabase/supabase-js';

const ALLOWED_TYPES = ['image/webp', 'image/jpeg', 'image/png'];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'Only webp, jpg, and png images are allowed.';
  }
  if (file.size > MAX_SIZE) {
    return 'Image must be under 5MB.';
  }
  return null;
}

export async function replaceImage(
  supabase: SupabaseClient,
  bucket: string,
  oldPath: string | null,
  newFile: File,
  category: string,
): Promise<{ url: string; path: string }> {
  const ext = newFile.name.split('.').pop() ?? 'webp';
  const newPath = `${category}/${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(newPath, newFile, { contentType: newFile.type });

  if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(newPath);

  if (oldPath) {
    await supabase.storage.from(bucket).remove([oldPath]);
  }

  return { url: data.publicUrl, path: newPath };
}

export async function deleteImage(
  supabase: SupabaseClient,
  bucket: string,
  path: string,
): Promise<void> {
  if (!path) return;
  await supabase.storage.from(bucket).remove([path]);
}
```

- [ ] **Step 2: Create `src/components/admin/OfficerManager.tsx`**

This is a React island that provides the full officer CRUD interface:
- List all officers ordered by `display_order`
- Add new officer (name, role, country, major, hometown, year, blurb, photo upload)
- Edit existing officer (inline form)
- Delete officer (confirms first, deletes photo from storage)
- Reorder officers (move up/down buttons)

```tsx
import { useState, useEffect } from 'react';
import { createBrowserClient } from '../../lib/supabase/client';
import { replaceImage, deleteImage, validateImageFile } from '../../lib/supabase/storage';

interface Officer {
  id: string;
  name: string;
  role: string;
  photo_url: string;
  photo_storage_path: string;
  country: string;
  country_label: string;
  major: string;
  hometown: string;
  year: string;
  blurb: string;
  display_order: number;
}

const EMPTY_OFFICER: Omit<Officer, 'id' | 'display_order'> = {
  name: '', role: '', photo_url: '', photo_storage_path: '',
  country: '', country_label: '', major: '', hometown: '', year: '', blurb: '',
};

export function OfficerManager() {
  const supabase = createBrowserClient();
  const [officers, setOfficers] = useState<Officer[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(EMPTY_OFFICER);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => { loadOfficers(); }, []);

  async function loadOfficers() {
    const { data } = await supabase
      .from('officers')
      .select('*')
      .order('display_order');
    if (data) setOfficers(data);
  }

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  }

  function startEdit(officer: Officer) {
    setEditing(officer.id);
    setForm(officer);
    setPhotoFile(null);
    setAdding(false);
    setError('');
  }

  function startAdd() {
    setAdding(true);
    setEditing(null);
    setForm(EMPTY_OFFICER);
    setPhotoFile(null);
    setError('');
  }

  function cancel() {
    setEditing(null);
    setAdding(false);
    setForm(EMPTY_OFFICER);
    setPhotoFile(null);
    setError('');
  }

  async function save() {
    if (!form.name || !form.role) {
      setError('Name and role are required.');
      return;
    }
    setSaving(true);
    setError('');

    let photoUrl = form.photo_url;
    let photoPath = form.photo_storage_path;

    if (photoFile) {
      const validationError = validateImageFile(photoFile);
      if (validationError) { setError(validationError); setSaving(false); return; }
      const result = await replaceImage(supabase, 'images', photoPath || null, photoFile, 'officers');
      photoUrl = result.url;
      photoPath = result.path;
    }

    if (editing) {
      const { error: updateError } = await supabase
        .from('officers')
        .update({ ...form, photo_url: photoUrl, photo_storage_path: photoPath })
        .eq('id', editing);
      if (updateError) { setError(updateError.message); setSaving(false); return; }
      showToast('Officer updated.');
    } else {
      const { error: insertError } = await supabase
        .from('officers')
        .insert({ ...form, photo_url: photoUrl, photo_storage_path: photoPath, display_order: officers.length });
      if (insertError) { setError(insertError.message); setSaving(false); return; }
      showToast('Officer added.');
    }

    await loadOfficers();
    cancel();
    setSaving(false);
  }

  async function remove(officer: Officer) {
    if (!confirm(`Delete ${officer.name}?`)) return;
    if (officer.photo_storage_path) {
      await deleteImage(supabase, 'images', officer.photo_storage_path);
    }
    await supabase.from('officers').delete().eq('id', officer.id);
    await loadOfficers();
    showToast('Officer deleted.');
  }

  async function moveOrder(id: string, direction: -1 | 1) {
    const idx = officers.findIndex((o) => o.id === id);
    const swapIdx = idx + direction;
    if (swapIdx < 0 || swapIdx >= officers.length) return;

    const updates = [
      { id: officers[idx].id, display_order: officers[swapIdx].display_order },
      { id: officers[swapIdx].id, display_order: officers[idx].display_order },
    ];

    for (const u of updates) {
      await supabase.from('officers').update({ display_order: u.display_order }).eq('id', u.id);
    }
    await loadOfficers();
  }

  const isFormOpen = editing !== null || adding;

  return (
    <div>
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-asu-espresso text-asu-cream font-ui text-sm px-4 py-2.5 rounded shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl text-asu-dark">Officers</h1>
          <p className="font-body text-sm text-asu-muted mt-1">{officers.length} officers</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={startAdd}
            className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors"
          >
            + Add Officer
          </button>
        )}
      </div>

      {isFormOpen && (
        <div className="bg-asu-card border border-asu-beige rounded-lg p-6 mb-8">
          <h2 className="font-ui text-sm font-bold text-asu-dark mb-4">
            {editing ? 'Edit Officer' : 'Add Officer'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {(['name', 'role', 'country', 'country_label', 'major', 'hometown', 'year'] as const).map((field) => (
              <div key={field}>
                <label className="block font-ui text-xs font-medium text-asu-dark mb-1 capitalize">
                  {field.replace('_', ' ')}
                </label>
                <input
                  type="text"
                  value={(form as Record<string, string>)[field]}
                  onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                  className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red"
                />
              </div>
            ))}
            <div>
              <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Photo</label>
              <input
                type="file"
                accept="image/webp,image/jpeg,image/png"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                className="w-full font-body text-sm text-asu-dark"
              />
              {form.photo_url && !photoFile && (
                <img src={form.photo_url} alt="" className="mt-2 h-20 w-auto rounded" />
              )}
            </div>
          </div>
          <div className="mt-4">
            <label className="block font-ui text-xs font-medium text-asu-dark mb-1">Bio</label>
            <textarea
              value={form.blurb}
              onChange={(e) => setForm({ ...form, blurb: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-asu-beige rounded bg-asu-ivory font-body text-sm text-asu-dark focus:outline-none focus:border-asu-red resize-y"
            />
          </div>
          {error && <p className="font-ui text-xs text-asu-red mt-2">{error}</p>}
          <div className="flex gap-3 mt-4">
            <button
              onClick={save}
              disabled={saving}
              className="px-4 py-2 bg-asu-red text-asu-cream font-ui text-sm font-semibold rounded hover:bg-asu-red-hover transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={cancel}
              className="px-4 py-2 border border-asu-beige text-asu-dark font-ui text-sm rounded hover:bg-asu-beige/50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {officers.map((officer, idx) => (
          <div
            key={officer.id}
            className="flex items-center gap-4 p-4 bg-asu-card border border-asu-beige rounded-lg"
          >
            {officer.photo_url ? (
              <img src={officer.photo_url} alt="" className="w-12 h-12 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-asu-beige shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className="font-ui text-sm font-semibold text-asu-dark truncate">{officer.name}</p>
              <p className="font-body text-xs text-asu-muted truncate">{officer.role} · {officer.major}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={() => moveOrder(officer.id, -1)}
                disabled={idx === 0}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move up"
              >↑</button>
              <button
                onClick={() => moveOrder(officer.id, 1)}
                disabled={idx === officers.length - 1}
                className="p-1.5 text-asu-muted hover:text-asu-dark disabled:opacity-30 transition-colors"
                aria-label="Move down"
              >↓</button>
              <button
                onClick={() => startEdit(officer)}
                className="px-3 py-1.5 font-ui text-xs text-asu-dark border border-asu-beige rounded hover:border-asu-red/30 transition-colors"
              >Edit</button>
              <button
                onClick={() => remove(officer)}
                className="px-3 py-1.5 font-ui text-xs text-asu-red border border-asu-red/30 rounded hover:bg-asu-red hover:text-asu-cream transition-colors"
              >Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create `src/pages/admin/officers.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { OfficerManager } from '../../components/admin/OfficerManager';
---

<AdminLayout title="Officers — ASU Admin">
  <OfficerManager client:load />
</AdminLayout>
```

- [ ] **Step 4: Build and verify**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/lib/supabase/storage.ts src/components/admin/OfficerManager.tsx src/pages/admin/officers.astro
git commit -m "feat: add officer management admin page with image lifecycle"
```

---

### Task 5: Admin CRUD — Events, Images, Pages, Nav, Settings

**Files:**
- Create: `src/pages/admin/events.astro`
- Create: `src/components/admin/EventManager.tsx`
- Create: `src/pages/admin/images.astro`
- Create: `src/components/admin/ImageManager.tsx`
- Create: `src/pages/admin/pages.astro`
- Create: `src/components/admin/PageManager.tsx`
- Create: `src/pages/admin/nav.astro`
- Create: `src/components/admin/NavManager.tsx`
- Create: `src/pages/admin/settings.astro`
- Create: `src/components/admin/SettingsManager.tsx`
- Create: `src/pages/admin/page/[slug].astro`
- Create: `src/components/admin/PageContentEditor.tsx`

**Interfaces:**
- Consumes: `createBrowserClient` from Task 1, `replaceImage` and `deleteImage` from Task 4, `Database` types from Task 1
- Produces: All remaining admin CRUD pages

This task follows the exact same patterns as Task 4 (OfficerManager). Each manager component:
1. Loads its table data on mount
2. Displays a list with edit/delete/reorder controls
3. Shows an add/edit form with the relevant fields
4. Handles image uploads via `replaceImage()` where applicable (events, images)
5. Cleans up old images on replace/delete
6. Shows success/error toasts

- [ ] **Step 1: Create `src/components/admin/EventManager.tsx`**

Same CRUD pattern as OfficerManager. Fields: title, date (date input), start_time (time input), end_time (time input), location, description, image upload, collab, rsvp_url, tags (comma-separated text input), is_visible toggle. Image lifecycle: uses `replaceImage`/`deleteImage` with category `'events'`.

- [ ] **Step 2: Create `src/pages/admin/events.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { EventManager } from '../../components/admin/EventManager';
---

<AdminLayout title="Events — ASU Admin">
  <EventManager client:load />
</AdminLayout>
```

- [ ] **Step 3: Create `src/components/admin/ImageManager.tsx`**

CRUD for the images table. Fields: file upload, alt_text, category (dropdown: polaroid, about, hero, newsletter, board, general), display_order, is_visible toggle. Image lifecycle: uses `replaceImage`/`deleteImage` with category from dropdown. Displays images as a grid of thumbnails.

- [ ] **Step 4: Create `src/pages/admin/images.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { ImageManager } from '../../components/admin/ImageManager';
---

<AdminLayout title="Images — ASU Admin">
  <ImageManager client:load />
</AdminLayout>
```

- [ ] **Step 5: Create `src/components/admin/PageManager.tsx`**

Lists all pages from the `pages` table. For each page: toggle `is_visible` (checkbox), toggle `show_in_nav` (checkbox), edit `title`, `description`, `nav_label`, `nav_order`. Link to edit page content at `/admin/page/[slug]`. No image handling.

- [ ] **Step 6: Create `src/pages/admin/pages.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { PageManager } from '../../components/admin/PageManager';
---

<AdminLayout title="Pages — ASU Admin">
  <PageManager client:load />
</AdminLayout>
```

- [ ] **Step 7: Create `src/components/admin/PageContentEditor.tsx`**

Takes a `pageSlug` prop. Loads all `page_content` rows for that slug. Renders a form with one input per row (text input for `text` and `heading` types, URL input for `link` type). Save button upserts all rows. Add button creates a new content block with a user-chosen `section_key`.

- [ ] **Step 8: Create `src/pages/admin/page/[slug].astro`**

```astro
---
import AdminLayout from '../../../layouts/AdminLayout.astro';
import { PageContentEditor } from '../../../components/admin/PageContentEditor';
import { createServerClient } from '../../../lib/supabase/server';

const { slug } = Astro.params;
const supabase = createServerClient(Astro.cookies);
const { data: page } = await supabase.from('pages').select('*').eq('slug', slug).single();

if (!page) return Astro.redirect('/admin/pages');
---

<AdminLayout title={`Edit: ${page.title} — ASU Admin`}>
  <PageContentEditor client:load pageSlug={slug!} pageTitle={page.title} />
</AdminLayout>
```

- [ ] **Step 9: Create `src/components/admin/NavManager.tsx`**

CRUD for `nav_links` table. Fields: label, href, is_external (checkbox), display_order, is_visible (checkbox), parent_group (text — e.g. "About", "Join", "Connect", or empty for top-level). Reorder with up/down buttons.

- [ ] **Step 10: Create `src/pages/admin/nav.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { NavManager } from '../../components/admin/NavManager';
---

<AdminLayout title="Navigation — ASU Admin">
  <NavManager client:load />
</AdminLayout>
```

- [ ] **Step 11: Create `src/components/admin/SettingsManager.tsx`**

Loads all rows from `site_settings`. Renders each as a labeled text input. Save button upserts all changed rows. Add button lets user create a new key-value pair.

- [ ] **Step 12: Create `src/pages/admin/settings.astro`**

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
import { SettingsManager } from '../../components/admin/SettingsManager';
---

<AdminLayout title="Settings — ASU Admin">
  <SettingsManager client:load />
</AdminLayout>
```

- [ ] **Step 13: Build and verify**

```bash
npm run build
```

- [ ] **Step 14: Commit**

```bash
git add src/components/admin/ src/pages/admin/
git commit -m "feat: add events, images, pages, nav, and settings admin pages"
```

---

### Task 6: Migrate Public Pages to Fetch from Supabase

**Files:**
- Modify: `src/components/layout/Nav.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/pages/board.astro`
- Modify: `src/components/board/OfficerRoster.tsx` — change from hardcoded to props
- Modify: `src/pages/index.astro`
- Modify: `src/components/home/NextEventSection.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/components/about/MissionReveal.tsx` — accept mission text as prop
- Modify: `src/components/about/WhoWeAre.tsx` — accept text as props
- Modify: `src/components/about/ValuesSection.tsx` — accept values as props
- Modify: `src/pages/connect/socials.astro`
- Modify: `src/components/socials/SocialsHero.tsx` — accept social links as props
- Modify: `src/middleware.ts` — add page visibility check

**Interfaces:**
- Consumes: `createServerClient` from Task 1, all database tables from Task 2
- Produces: All public pages reading from Supabase instead of hardcoded data

This is the largest task. Each sub-step modifies one public page or component to read from Supabase.

- [ ] **Step 1: Update `src/middleware.ts` to check page visibility**

Add a third middleware in the sequence that checks the `pages` table. If the requested path matches a page slug with `is_visible = false`, return a 404. Skip for `/admin`, `/password`, and static assets.

```ts
const pageVisibilityGate = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  if (pathname.startsWith('/admin') || pathname.startsWith('/password') || pathname.startsWith('/_')) return next();
  if (pathname.match(/\.\w+$/)) return next(); // static assets

  const slug = pathname === '/' ? '/' : pathname.replace(/^\//, '').replace(/\/$/, '');
  const supabase = createServerClient(context.cookies);
  const { data: page } = await supabase.from('pages').select('is_visible').eq('slug', slug).single();

  if (page && !page.is_visible) {
    return new Response('Not Found', { status: 404 });
  }

  return next();
});

export const onRequest = sequence(sitePasswordGate, adminAuthGate, pageVisibilityGate);
```

- [ ] **Step 2: Update `src/components/layout/Nav.astro`**

Replace the hardcoded `navItems` array with a Supabase fetch:

```astro
---
import { createServerClient } from '../../lib/supabase/server';

const supabase = createServerClient(Astro.cookies);
const { data: links } = await supabase
  .from('nav_links')
  .select('*')
  .eq('is_visible', true)
  .order('display_order');

// Group links: top-level (no parent_group) and dropdown groups
const topLevel = (links ?? []).filter(l => !l.parent_group);
const groups = new Map<string, typeof links>();
for (const link of links ?? []) {
  if (!link.parent_group) continue;
  if (!groups.has(link.parent_group)) groups.set(link.parent_group, []);
  groups.get(link.parent_group)!.push(link);
}

// Build nav items in display_order
const navItems: Array<{ label: string; href?: string; dropdown?: Array<{ label: string; href: string }> }> = [];
const seenGroups = new Set<string>();

for (const link of links ?? []) {
  if (link.parent_group) {
    if (seenGroups.has(link.parent_group)) continue;
    seenGroups.add(link.parent_group);
    navItems.push({
      label: link.parent_group,
      dropdown: groups.get(link.parent_group)!.map(l => ({ label: l.label, href: l.href })),
    });
  } else {
    navItems.push({ label: link.label, href: link.href });
  }
}

const currentPath = Astro.url.pathname;
---
```

The rest of the template remains unchanged — it already iterates `navItems` correctly.

- [ ] **Step 3: Update `src/components/layout/Footer.astro`**

Replace the hardcoded `links` array with a Supabase fetch, same pattern as Nav. Also fetch `footer_disclaimer` from `site_settings`.

- [ ] **Step 4: Update `src/pages/board.astro` and `OfficerRoster.tsx`**

In `board.astro`, fetch officers from Supabase and pass as props:

```astro
---
import { createServerClient } from '../lib/supabase/server';
const supabase = createServerClient(Astro.cookies);
const { data: officers } = await supabase.from('officers').select('*').order('display_order');
---
<OfficerRoster client:load officers={officers ?? []} />
```

In `OfficerRoster.tsx`:
- Remove the hardcoded `OFFICERS` array
- Accept `officers` as a prop: `export function OfficerRoster({ officers }: { officers: OfficerData[] })`
- Update the `OfficerData` interface to match the database schema (add `photo_url`, remove `id` string requirement — use the uuid)
- Update photo `src` to use `officer.photo_url` instead of the `/images/board/${officer.id}.webp` pattern
- Rebuild `ROSTER_ITEMS` dynamically from the props array

- [ ] **Step 5: Update `src/pages/index.astro` and `NextEventSection.astro`**

In `NextEventSection.astro`, replace the Google Sheets fetch with a Supabase fetch:

```astro
---
import { createServerClient } from '../../lib/supabase/server';

const supabase = createServerClient(Astro.cookies);
const { data: events } = await supabase
  .from('events')
  .select('*')
  .eq('is_visible', true)
  .gte('date', new Date().toISOString().split('T')[0])
  .order('date')
  .limit(1);

const event = events?.[0] ?? null;
// ... fallback to "no upcoming event" display if null
---
```

Remove the `fetchUpcomingEvent` import and `sheetId` logic.

- [ ] **Step 6: Update About page components**

In `about.astro`, fetch `page_content` for slug `'about'` and pass relevant values as props to each component:

```astro
---
import { createServerClient } from '../lib/supabase/server';
const supabase = createServerClient(Astro.cookies);
const { data: content } = await supabase.from('page_content').select('*').eq('page_slug', 'about');
const c = Object.fromEntries((content ?? []).map(r => [r.section_key, r.value]));
---
<MissionReveal client:visible missionText={c.mission_label_text ?? ''} />
```

Update `MissionReveal.tsx` to accept `missionText` as a prop instead of using the hardcoded `MISSION_TEXT` constant.

Update `WhoWeAre.tsx` and `ValuesSection.tsx` similarly to accept content via props.

- [ ] **Step 7: Update Socials page**

In `socials.astro`, fetch social links from `site_settings` and pass as props to `SocialsHero`:

```astro
---
import { createServerClient } from '../../lib/supabase/server';
const supabase = createServerClient(Astro.cookies);
const { data: settings } = await supabase.from('site_settings').select('*');
const s = Object.fromEntries((settings ?? []).map(r => [r.key, r.value]));
---
<SocialsHero
  client:load
  instagramUrl={s.instagram_url ?? ''}
  instagramHandle={s.instagram_handle ?? ''}
  tiktokUrl={s.tiktok_url ?? ''}
  tiktokHandle={s.tiktok_handle ?? ''}
  discordUrl={s.discord_url ?? ''}
  discordHandle={s.discord_handle ?? ''}
/>
```

- [ ] **Step 8: Build and verify**

```bash
npm run build
```

- [ ] **Step 9: Commit**

```bash
git add src/
git commit -m "feat: migrate all public pages to fetch content from Supabase"
```

---

### Task 7: Cleanup — Remove Hardcoded Data and Legacy Fetch Code

**Files:**
- Delete: `src/lib/fetchEvents.ts`
- Delete: `src/data/events.json`
- Modify: `src/components/board/OfficerRoster.tsx` — verify hardcoded array is gone
- Modify: `src/components/home/PolaroidGrid.tsx` — if polaroid images were migrated to the images table, remove hardcoded image paths

**Interfaces:**
- Consumes: all changes from Task 6
- Produces: clean codebase with no hardcoded content data

- [ ] **Step 1: Delete `src/lib/fetchEvents.ts`**

```bash
rm src/lib/fetchEvents.ts
```

- [ ] **Step 2: Delete `src/data/events.json`**

```bash
rm src/data/events.json
```

- [ ] **Step 3: Verify no remaining imports of deleted files**

```bash
grep -r "fetchEvents" src/
grep -r "events.json" src/
```

Both should return no results. If any imports remain, update those files.

- [ ] **Step 4: Remove `EVENTS_SHEET_ID` from `.env` and `.env.example` if present**

- [ ] **Step 5: Build to verify nothing is broken**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: remove hardcoded content data and legacy Google Sheets fetch"
```

---

### Task 8: Manual Testing and Verification

This task is not code — it's a checklist for the developer to verify everything works end-to-end.

- [ ] **Step 1: Set up Supabase project**
  - Create a Supabase project at supabase.com
  - Run `supabase/migrations/001_create_tables.sql` in the SQL Editor
  - Run `supabase/seed.sql` in the SQL Editor
  - Create a Storage bucket named `images` (should be done by the migration)
  - Copy `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` to `.env`

- [ ] **Step 2: Create first admin user**
  - In Supabase Dashboard → Authentication → Users → Add User
  - Enter your email and a password
  - Confirm the user's email

- [ ] **Step 3: Test admin login flow**
  - Run `npm run dev`
  - Navigate to `http://localhost:4321/admin`
  - Verify redirect to `/admin/login`
  - Log in with the admin credentials
  - Verify redirect to `/admin` dashboard

- [ ] **Step 4: Test each admin page**
  - Officers: add, edit, reorder, delete, upload/replace photo (verify old photo deleted from Storage)
  - Events: add, edit, delete, upload/replace image
  - Images: upload, categorize, toggle visibility, delete
  - Pages: toggle visibility, toggle nav inclusion
  - Nav: add, edit, reorder, delete links
  - Settings: edit social URLs, footer text
  - Page content editor: edit text blocks for each page

- [ ] **Step 5: Verify public pages**
  - Home page loads with correct hero, next event
  - About page shows correct mission text, values, who we are content
  - Board page shows officers from database
  - Socials page shows correct social links
  - Nav shows correct links with correct grouping
  - Footer shows correct links and disclaimer
  - Toggle a page off → verify it returns 404
  - Toggle a page's nav visibility off → verify it disappears from nav but is still accessible by URL

- [ ] **Step 6: Test image cleanup**
  - Upload an officer photo, note the Storage path
  - Replace it with a new photo
  - Check Supabase Storage → verify old file is gone
  - Delete the officer
  - Check Storage → verify the replacement photo is also gone

- [ ] **Step 7: Deploy to Vercel**
  - Add environment variables to Vercel project settings
  - Deploy and verify all pages work in production
