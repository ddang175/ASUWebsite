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
CREATE POLICY "pages_admin_insert" ON pages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "pages_admin_update" ON pages FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "pages_admin_delete" ON pages FOR DELETE USING (auth.role() = 'authenticated');

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
CREATE POLICY "page_content_admin_insert" ON page_content FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "page_content_admin_update" ON page_content FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "page_content_admin_delete" ON page_content FOR DELETE USING (auth.role() = 'authenticated');

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
CREATE POLICY "officers_admin_insert" ON officers FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "officers_admin_update" ON officers FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "officers_admin_delete" ON officers FOR DELETE USING (auth.role() = 'authenticated');

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
CREATE POLICY "events_admin_insert" ON events FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "events_admin_update" ON events FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "events_admin_delete" ON events FOR DELETE USING (auth.role() = 'authenticated');

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
CREATE POLICY "images_admin_insert" ON images FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "images_admin_update" ON images FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "images_admin_delete" ON images FOR DELETE USING (auth.role() = 'authenticated');

-- ── site_settings ────────────────────────────────────────────
CREATE TABLE site_settings (
  key        text PRIMARY KEY,
  value      text NOT NULL DEFAULT '',
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "site_settings_public_read" ON site_settings FOR SELECT USING (true);
CREATE POLICY "site_settings_admin_insert" ON site_settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "site_settings_admin_update" ON site_settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "site_settings_admin_delete" ON site_settings FOR DELETE USING (auth.role() = 'authenticated');

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
CREATE POLICY "nav_links_admin_insert" ON nav_links FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "nav_links_admin_update" ON nav_links FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "nav_links_admin_delete" ON nav_links FOR DELETE USING (auth.role() = 'authenticated');

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
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 5242880, ARRAY['image/webp', 'image/jpeg', 'image/png']);

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
