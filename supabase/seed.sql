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
