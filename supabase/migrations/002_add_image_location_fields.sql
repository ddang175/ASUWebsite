-- Add caption and location_key columns to images table
ALTER TABLE images ADD COLUMN IF NOT EXISTS caption text DEFAULT '';
ALTER TABLE images ADD COLUMN IF NOT EXISTS location_key text UNIQUE;

-- Seed all site image slots
-- Home — Polaroid Grid (15 cards)
INSERT INTO images (url, storage_path, alt_text, caption, category, location_key, display_order, is_visible) VALUES
  ('/images/polaroidImages/halloween.webp',       '', 'Halloween GBM',                  'Oct. 30th, 2025',   'polaroid', 'polaroid-1',  1,  true),
  ('/images/polaroidImages/kickOff.webp',          '', 'Welcome Back GBM',               'Sept. 3rd, 2025',   'polaroid', 'polaroid-2',  2,  true),
  ('/images/polaroidImages/innoAll.webp',          '', 'InnovAsian',                     'Apr. 4th, 2026',    'polaroid', 'polaroid-3',  3,  true),
  ('/images/polaroidImages/iceCreamSocial.webp',   '', 'Kickoff GBM',                    'Sept. 19th, 2025',  'polaroid', 'polaroid-4',  4,  true),
  ('/images/polaroidImages/proDev.webp',           '', 'Career Fair Prep & Success GBM', 'Feb. 5th, 2026',    'polaroid', 'polaroid-5',  5,  true),
  ('/images/polaroidImages/go.webp',               '', 'ASU K-Pop Dance at ICF',         'Nov. 9th, 2025',    'polaroid', 'polaroid-6',  6,  true),
  ('/images/polaroidImages/drinkFundraiser.webp',  '', 'Drink Fundraiser',               'Oct. 9th, 2025',    'polaroid', 'polaroid-7',  7,  true),
  ('/images/polaroidImages/asuDance.webp',         '', 'ASU K-Pop Dance',                'Apr. 3rd, 2026',    'polaroid', 'polaroid-8',  8,  true),
  ('/images/polaroidImages/asuGames.webp',         '', 'ASU Games GBM',                  'Apr. 30th, 2026',   'polaroid', 'polaroid-9',  9,  true),
  ('/images/polaroidImages/ramen.webp',            '', 'Ramen Fundraiser',               'Nov 13th, 2025',    'polaroid', 'polaroid-10', 10, true),
  ('/images/polaroidImages/mocktail.webp',         '', 'Mocktail Mania GBM',             'Sept. 20th, 2024',  'polaroid', 'polaroid-11', 11, true),
  ('/images/polaroidImages/1p1.webp',              '', '1 + 1 Boba Fundraiser',          'Feb. 18th, 2026',   'polaroid', 'polaroid-12', 12, true),
  ('/images/polaroidImages/ledges.webp',           '', 'Ledges Social',                  'Oct. 18th, 2025',   'polaroid', 'polaroid-13', 13, true),
  ('/images/polaroidImages/triplePlay.webp',       '', 'Triple Play GBM',                'Oct 2nd, 2025',     'polaroid', 'polaroid-14', 14, true),

-- About Page (3 images)
  ('/images/aboutUs/heroImage.webp',    '', 'About Us Hero',            '', 'page-image', 'about-hero',      1, true),
  ('/images/aboutUs/3x4portrait.webp',  '', 'Who We Are — Portrait',   '', 'page-image', 'about-portrait',  2, true),
  ('/images/aboutUs/4x3.webp',          '', 'Who We Are — Landscape',  '', 'page-image', 'about-landscape', 3, true),

-- Board Page (1 image)
  ('/images/board/team-photo.webp', '', 'Board Team Photo', '', 'page-image', 'board-hero', 1, true),

-- Newsletter Page (1 image)
  ('/images/newsletter/newsletterHero.webp', '', 'Newsletter Hero', '', 'page-image', 'newsletter-hero', 1, true),

-- Feedback Page (1 image)
  ('/images/feedback/asudancewide.webp', '', 'Feedback Hero', '', 'page-image', 'feedback-hero', 1, true)

ON CONFLICT (location_key) DO NOTHING;
