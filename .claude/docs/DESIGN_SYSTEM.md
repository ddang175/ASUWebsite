# ASU Website Styling Guide

**Project:** Asian Student Union / ASU Website  
**Purpose:** Styling system for Claude Code, ChatGPT planning, UI implementation, and future ASU website design work.  
**Design direction:** Warm, elegant, cultural, modern, student-friendly, readable, community-centered, and visually distinct.

This guide defines the official color palette, typography system, usage rules, CSS variables, and implementation expectations for the ASU website.

Claude Code should follow this guide strictly when designing or implementing UI.

---

# 1. Core Brand Feeling

The ASU website should feel:

- **Warm** — welcoming, approachable, and community-focused.
- **Elegant** — polished enough to match the refined ASU logo direction.
- **Cultural** — supported by cream, gold, espresso, deep red, and warm neutrals.
- **Modern** — clean layouts, strong spacing, responsive structure, and readable UI.
- **Student-friendly** — not corporate, not generic, not overly formal.
- **Distinct** — avoid looking like a basic red-and-white student organization website.

The website should use warmth, spacing, elegant typography, and intentional contrast to feel like a real community hub.

---

# 2. Official Color Palette

Use these colors as the official ASU website palette.

| Token            | Name          |       Hex | Main Role                                 |
| ---------------- | ------------- | --------: | ----------------------------------------- |
| `--asu-red`      | ASU Red       | `#E5291E` | Primary brand color, CTAs, highlights     |
| `--asu-cream`    | ASU Cream     | `#FCEEC9` | Warm text on red/dark sections            |
| `--asu-ivory`    | Warm Ivory    | `#FFF8E8` | Main light background                     |
| `--asu-dark`     | ASU Dark      | `#1A1410` | Main text and dark background             |
| `--asu-espresso` | Deep Espresso | `#241611` | Secondary dark background, dark cards     |
| `--asu-deep-red` | Deep Red      | `#5C0D0A` | Formal sections, footer, hover depth      |
| `--asu-gold`     | Sand Gold     | `#E8C66A` | Small accents, dividers, badges           |
| `--asu-beige`    | Soft Beige    | `#EFE1C8` | Borders, subtle dividers, muted structure |

## Supporting Neutrals

| Token             | Name        |       Hex | Main Role                            |
| ----------------- | ----------- | --------: | ------------------------------------ |
| `--asu-brown`     | Warm Brown  | `#5A2119` | Secondary text, softer headings      |
| `--asu-muted`     | Muted Taupe | `#9B7A68` | Metadata, captions, subtle labels    |
| `--asu-blush`     | Soft Blush  | `#FFE1D2` | Friendly callouts, soft red sections |
| `--asu-card`      | Card White  | `#FFFDF6` | Card backgrounds on ivory pages      |
| `--asu-red-hover` | Brick Red   | `#B51F17` | Button hover and active states       |
| `--asu-coral`     | Coral Red   | `#F26F61` | Optional playful event accent only   |

---

# 3. Color Usage Rules

## Default website setup

| Purpose              | Use                                         |
| -------------------- | ------------------------------------------- |
| Main page background | Warm Ivory `#FFF8E8`                        |
| Main body text       | ASU Dark `#1A1410`                          |
| Cards                | Card White `#FFFDF6`                        |
| Borders              | Soft Beige `#EFE1C8`                        |
| Primary CTA          | ASU Red `#E5291E`                           |
| CTA hover            | Brick Red `#B51F17`                         |
| Dark section         | ASU Dark `#1A1410`                          |
| Dark card            | Deep Espresso `#241611`                     |
| Text on dark/red     | ASU Cream `#FCEEC9` or Warm Ivory `#FFF8E8` |
| Accent               | Sand Gold `#E8C66A`                         |

## Color ratio

Use this rough ratio across most pages:

- **60%** Warm Ivory / Card White / light neutrals
- **25%** ASU Dark / Deep Espresso / text
- **10%** ASU Red
- **5%** Sand Gold / Deep Red / accent colors

This keeps the site warm and branded without making every section visually loud.

---

# 4. Color Pairing Sets

## Classic ASU

Use for most standard pages.

| Role       | Color                |
| ---------- | -------------------- |
| Background | Warm Ivory `#FFF8E8` |
| Primary    | ASU Red `#E5291E`    |
| Text       | ASU Dark `#1A1410`   |
| Secondary  | ASU Cream `#FCEEC9`  |
| Border     | Soft Beige `#EFE1C8` |

Best for:

- Homepage sections
- About page
- Event listing page
- Leadership page
- General club information

---

## Dark Premium

Use for dramatic, polished, modern sections.

| Role            | Color                   |
| --------------- | ----------------------- |
| Background      | ASU Dark `#1A1410`      |
| Card background | Deep Espresso `#241611` |
| Text            | ASU Cream `#FCEEC9`     |
| Accent          | ASU Red `#E5291E`       |
| Highlight       | Sand Gold `#E8C66A`     |

Best for:

- Hero section
- Footer
- Mission statement section
- Leadership spotlight
- Gallery sections

---

## Festival / Event Energy

Use for high-energy event sections.

| Role         | Color                |
| ------------ | -------------------- |
| Background   | ASU Red `#E5291E`    |
| Text         | ASU Cream `#FCEEC9`  |
| Accent       | Sand Gold `#E8C66A`  |
| Depth        | Deep Red `#5C0D0A`   |
| Soft section | Warm Ivory `#FFF8E8` |

Best for:

- CelebrAsian
- Food night
- Cultural showcase
- Event hero banners
- Instagram-style event graphics

---

## Formal Cultural

Use for history, founder, legacy, banquet, or ceremonial pages.

| Role                 | Color                |
| -------------------- | -------------------- |
| Background           | Deep Red `#5C0D0A`   |
| Text                 | ASU Cream `#FCEEC9`  |
| Accent               | Sand Gold `#E8C66A`  |
| Secondary background | ASU Dark `#1A1410`   |
| Light section        | Warm Ivory `#FFF8E8` |

---

# 5. Color Do’s and Don’ts

## Do

- Use Warm Ivory as the default light background.
- Use ASU Dark instead of pure black.
- Use ASU Red for primary calls to action.
- Use ASU Cream for warm text on red or dark sections.
- Use Sand Gold sparingly for premium accents.
- Use Soft Beige for borders instead of generic gray.
- Keep the palette intentional and restrained.

## Don’t

- Do not use pure white as the main page background.
- Do not use pure black as the main dark color.
- Do not make every section red.
- Do not use red for long paragraphs.
- Do not use gold for large backgrounds.
- Do not add random colors outside the palette.
- Do not use cream text on ivory backgrounds.
- Do not overuse coral unless the section is intentionally playful.

---

# 6. Accessibility and Contrast Rules

## Best readable combinations

| Background | Text      | Use                      |
| ---------- | --------- | ------------------------ |
| `#FFF8E8`  | `#1A1410` | Main body text           |
| `#FFFDF6`  | `#1A1410` | Cards                    |
| `#1A1410`  | `#FCEEC9` | Dark sections            |
| `#241611`  | `#FCEEC9` | Dark cards               |
| `#5C0D0A`  | `#FCEEC9` | Formal red sections      |
| `#E5291E`  | `#FFF8E8` | Buttons and short labels |
| `#E5291E`  | `#FCEEC9` | Large logo-like text     |

## Avoid these combinations

| Background | Text      | Reason                        |
| ---------- | --------- | ----------------------------- |
| `#FCEEC9`  | `#FFF8E8` | Too little contrast           |
| `#E8C66A`  | `#FCEEC9` | Too light together            |
| `#E5291E`  | `#F26F61` | Too similar and visually loud |
| `#FFF8E8`  | `#EFE1C8` | Too subtle for important text |
| `#241611`  | `#5C0D0A` | Too dark together             |

For small text on bright red, prefer Warm Ivory `#FFF8E8` over cream if readability is better.

---

# 7. Official Typography System

Use three main fonts.

| Role                  | Font                        | Purpose                                                      |
| --------------------- | --------------------------- | ------------------------------------------------------------ |
| Primary / Display     | `Belleza`                   | Titles, headers, hero text, elegant brand moments            |
| Secondary / UI        | `DM Sans`                   | Navigation, buttons, labels, subheaders, small headings      |
| Body / Reading        | `Inter`                     | Paragraphs, forms, event descriptions, long readable content |
| Multilingual fallback | `Noto Sans`, `Noto Sans JP` | Japanese, multilingual text, unsupported characters          |

## Core typography logic

```txt
Belleza = beauty and brand
DM Sans = structure and UI hierarchy
Inter = readability and content
Noto Sans = multilingual support
```
