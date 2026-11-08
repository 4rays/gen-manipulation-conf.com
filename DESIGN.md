---
name: Generative AI and Algorithmic Manipulation
description: A conference site set in plaster and Swedish-blue ink, over a quiet field of trails bent by forces you never see.
colors:
  plaster: "oklch(0.968 0.006 245)"
  plaster-shade: "oklch(0.935 0.014 245)"
  rule: "oklch(0.86 0.022 250)"
  ink: "oklch(0.255 0.075 258)"
  ink-muted: "oklch(0.45 0.06 255)"
  swedish-blue: "oklch(0.47 0.122 248)"
  swedish-blue-deep: "oklch(0.38 0.105 252)"
  night: "oklch(0.215 0.06 260)"
  on-blue-muted: "oklch(0.88 0.035 245)"
  on-night-muted: "oklch(0.8 0.035 250)"
  rule-blue: "oklch(0.6 0.11 248)"
  rule-night: "oklch(0.36 0.06 258)"
  programme-blue: "oklch(0.34 0.14 255)"
  rule-programme: "oklch(0.5 0.12 252)"
  sky: "oklch(0.8 0.07 240)"
  vantage-red: "oklch(0.62 0.19 33)"
typography:
  display:
    fontFamily: "Hedvig Letters Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(3rem, 5.2vw - 0.36rem, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'opsz' 24"
  headline:
    fontFamily: "Hedvig Letters Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(2.25rem, 1.4rem + 3vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.015em"
    fontVariation: "'opsz' 24"
  subhead:
    fontFamily: "Hedvig Letters Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.5rem, 1.2rem + 1vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.12
    letterSpacing: "-0.01em"
  figure:
    fontFamily: "Hedvig Letters Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Hedvig Letters Serif, Iowan Old Style, Georgia, serif"
    fontSize: "clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.25
  lede:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1rem + 0.45vw, 1.375rem)"
    fontWeight: 400
    lineHeight: 1.45
  body:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  small:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "0.01em"
  time:
    fontFamily: "Familjen Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
rounded:
  none: "0"
  dot: "50%"
spacing:
  gutter: "clamp(1rem, 5.333333vw - 0.3rem, 4.5rem)"
  section: "clamp(5rem, 3rem + 7vw, 10rem)"
  section-end: "clamp(4rem, 2.5rem + 5vw, 8rem)"
  heading: "clamp(2.5rem, 1.8rem + 2.5vw, 4.5rem)"
  block: "clamp(1.5rem, 1.2rem + 1vw, 2.25rem)"
  row: "1.25rem"
  row-tight: "0.625rem"
components:
  button-primary:
    backgroundColor: "{colors.swedish-blue}"
    textColor: "{colors.plaster}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.swedish-blue-deep}"
  button-primary-on-dark:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  header-glass:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.ink}"
    opacity: "78%"
    backdropFilter: "blur(18px) saturate(1.25)"
  programme-field:
    backgroundColor: "{colors.programme-blue}"
    textColor: "{colors.plaster}"
    opacity: "95%"
  contrast-wash:
    backgroundColor: "{colors.plaster}"
    opacity: "80%"
    filter: "blur(18px)"
---

# Design System: Generative AI and Algorithmic Manipulation

Status: revision 3, 7 November 2026. The site owner rejected the Ames-room scene in both executions and chose the **Pull Field** from the original impeccable directions, with their own changes. The designer designed and implemented it. The binding specs are [field.md](docs/design/field.md) (background, surfaces, contrast guard, fallbacks), [tokens.md](docs/design/tokens.md) and [components.md](docs/design/components.md). [scene.md](docs/design/scene.md) and [hero-scene.md](docs/design/hero-scene.md) record the rejected room.

## Overview

**Creative North Star: "The Pull Field"**

The conference is about influence you see only in its effects. Behind the whole page, fine rain trails fall across a plaster ground. Hidden attractors bend them: paths loop through, fly back out and tangle. The attractors are never drawn. The visitor sees only the bending, which is the subject itself: algorithmic systems that steer attention and choice without showing their hand.

The field is quiet on purpose: few trails, low contrast, Swedish blue on plaster, the same from top to bottom. Content sits directly on it, with no section backgrounds. Only the header keeps a glass bar, and the programme keeps a deep night field. Where the field makes a piece of text hard to read, a soft local wash appears behind that text alone, and goes again when the field clears. The page stays generous and rectilinear: no cards, no drop shadows, no rounded corners.

It refuses the AI-conference default (near-black, neon gradients, glowing particles, robot imagery) and the academic default the old site had (dense justified text on white, institutional chrome).

**Key Characteristics:**

- A page-wide, fixed Canvas 2D field: sparse, soft trails bent by hidden, drifting attractors.
- Text directly on the field; a contrast guard adds a local wash only where needed.
- Plaster ground, Swedish-blue trails and actions, a night programme field, one red navigation dot.
- Hedvig Letters Serif for everything spoken; Familjen Grotesk for everything read or used.
- Square corners, 1px hairlines, no drop shadows, no cards. Nothing animates on entry, and scroll does not drive the field.

## Colors

Cool, daylight blues: plaster white tinted toward blue, a true Swedish blue, and a deep night. Never cream, never neon.

### Primary

- **Swedish Blue** (`oklch(0.47 0.122 248)`, #0a5e9b): The trails of the field (at 20–28 % alpha), the primary action fill, and inline links. 6.2:1 against plaster in both directions.
- **Deep Swedish Blue** (`oklch(0.38 0.105 252)`, #0b4378): Hover and pressed state of the primary action, and links on the field.

### Secondary

- **Night** (`oklch(0.215 0.06 260)`, #081835): The contrast wash behind light text. Plaster text on night is 16:1.
- **Programme Blue** (`oklch(0.34 0.14 255)`, #00347d): The programme field (95 %), brighter and more saturated than night. Plaster text on it is 10.9:1, muted text 6.4:1. Its rules use `oklch(0.5 0.12 252)`.
- **Sky** (`oklch(0.8 0.07 240)`, #95c4e7): Text selection and link hover on night. Never a background field.

### Tertiary

- **Vantage Red** (`oklch(0.62 0.19 33)`, #e14c2f): The active-section dot in the navigation only. See the rule below.

### Neutral

- **Plaster** (`oklch(0.968 0.006 245)`, #f1f5f8): The ground of the field, the header glass, and the contrast wash behind dark text.
- **Plaster Shade** (`oklch(0.935 0.014 245)`, #e2ebf2): Hover fill of light actions.
- **Ink** (`oklch(0.255 0.075 258)`, #082246): Text and drawing on the field (14.5:1 on plaster).
- **Ink Muted** (`oklch(0.45 0.06 255)`, #3e5776): Secondary text on light surfaces (6.8:1).
- **Rule / Rule Blue / Rule Night** (#c7d2df / #4585bf / #293e5c): 1px hairlines on each surface. Decorative only, never a control boundary on its own.
- **On-Blue Muted / On-Night Muted** (#c5dbee / #adc0d4): Secondary text on blue (4.8:1) and on night (9.4:1).

### Named Rules

**The One Point Rule.** Vantage Red marks the section in view, as a dot in the navigation, and nothing else. Never text, never a button, border, focus ring, hover, or a mark in the field.

**The Surface Scope Rule.** Sections set their surface with one class (`surface-plaster`, `surface-shade`, `surface-blue`, `surface-night`), which redefines the semantic tokens locally. Components only use semantic tokens and adapt automatically.

**The Daylight Rule.** One light theme. The dark passages are authored into the page sequence; there is no dark mode and no theme toggle.

**The Contrast Guard Rule.** Text sits directly on the field. The field is kept light and sparse so that most text never needs help. Where it does (10th-percentile contrast under 3.5:1 for small text, under 2.5:1 for large text, or a busy patch behind small text), a soft wash in plaster or night appears behind that block only. On the field, muted text uses Ink Muted Glass (`oklch(0.405 0.06 256)`) and links use Deep Swedish Blue.

## Typography

**Display Font:** Hedvig Letters Serif (variable `opsz` 12–24, one weight; fallback Iowan Old Style, Georgia)
**Body Font:** Familjen Grotesk (variable `wght` 400–700, roman and italic; fallback system UI)

Both are SIL OFL 1.1 and self-hosted from fontsource through Astro's local font provider.

**Character:** A calm, open serif with the authority of a scientific plate but none of a library's antiquity, paired with a Stockholm-drawn grotesk whose slight irregularities keep the interface warm. The serif speaks; the grotesk informs.

### Hierarchy

- **Display** (400, `clamp(3rem, 5.2vw - 0.36rem, 6rem)` at `lg`+, `clamp(2.75rem, 1rem + 5.4vw, 4.5rem)` below, 0.98): The conference title only. Tied to the hero text column so it holds three lines from 1024 to 1920.
- **Headline** (400, `clamp(2.25rem, 1.4rem + 3vw, 4.25rem)`, 1.02): Section headings.
- **Subhead** (400, `clamp(1.5rem, 1.2rem + 1vw, 2rem)`, 1.12): Speaker names, day dates, abstract titles, venue blocks.
- **Figure** (400, `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`, 1.2): Fact values, the hero date, about subjects, keynote titles.
- **Title** (400, `clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)`, 1.25): Programme session titles.
- **Lede / Body / Small** (Familjen 400; 1.125–1.375rem / 1.0625rem / 0.9375rem; 1.45 / 1.6 / 1.5): Reading text, body measure 66ch at most.
- **Label** (Familjen 500, 0.875rem, +0.01em, sentence case): Fact labels, day labels.
- **Time** (Familjen 500, 0.9375rem, tabular figures): Programme times.

### Named Rules

**The No Eyebrow Rule.** No uppercase, letter-spaced kickers above headings, and no section numbers. Headings carry their own weight and match the navigation labels.

**The Honest Serif Rule.** Hedvig has one weight and no italic. Never synthesize bold or italic on it (`font-synthesis: none`). Emphasis comes from size.

**The 16px Root Rule.** Never set a font size on `html`. Every rem in this system means 16px.

## Layout

A 12-column grid in a container of `min(100% − 2 × gutter, 88rem)`. The gutter runs from 16px on a 390px phone to 72px at 1440 (`clamp(1rem, 5.333333vw − 0.3rem, 4.5rem)`). Breakpoints: 640, 768 (header menu switch), 1024 (multi-column layouts), 1280.

Sections sit on the field in this order: hero, event facts, about, speakers, programme (programme-blue field, 95 %), abstracts, venue, footer. Only the programme has a background; the facts strip, the venue and the footer read as light sections. Each section opens with its heading at `clamp(5rem, 3rem + 7vw, 10rem)` from its top edge and closes with `clamp(4rem, 2.5rem + 5vw, 8rem)`. There is always more space above a heading than below it.

The hero text sits directly on the field. The attractors are placed right of and below the hero text on wide screens, and to the right on narrow screens, so the densest tangles stay clear of the title.

Content layouts favour two asymmetric zones: headings or identities on columns 1–5, reading text on 6–11 or 6–12. The programme shows both days side by side from 1024, each as a timetable with a 7.25rem time column.

## Elevation & Depth

Two planes: the field, and the content on it. The interface itself stays flat: no drop shadows, and a focused or pressed state shows through fill, outline or a 1px offset. The header glass is the only translucent bar.

### Named Rules

**The Surface Not Shadow Rule.** Elevation in the interface is expressed by changing the surface, never by lifting an element off it.

## Shapes

Rectilinear. Every corner is square (`--radius: 0`): buttons, menu panel, focus outlines, portraits. The only curves are the navigation dot and the trails of the field. Lines are 1px hairlines in the surface's rule colour, used as row separators (speakers, programme sessions, about subjects, venue blocks, fact columns). No left-border accents, no boxes around content.

## Components

### Buttons

- **Shape:** square (0).
- **Primary:** surface action fill (Swedish Blue with plaster text on light surfaces; plaster with ink text on blue and night), height 3.25rem, padding 0 1.5rem, Familjen 500 1rem, label never wraps, trailing 18px Lucide icon.
- **Hover / Focus:** fill darkens (Deep Swedish Blue or Plaster Shade) over 160 ms with an expo-out curve; focus is a 2px outline in the surface's ring colour, 3px offset; pressed moves down by 1px.
- **Secondary:** 1px current-colour outline, transparent; hover tints the fill 7 % toward the foreground.

### Navigation

- Sticky plaster-glass bar (4.5rem; 3.75rem on phones). The wordmark is the full title in Hedvig, breaking as "Generative AI and / Algorithmic Manipulation".
- Links in Familjen 500. The section in view gets the vantage dot before its label (scroll-spy, progressive).
- Below 768: a square outlined "Menu" button opens a full-width panel of Hedvig links with hairlines. No overlay, no scroll lock.

### Rows (speakers, sessions, subjects)

- Hairline-separated rows on the grid, never cards. Speakers: identity on columns 1–5, short bio and a native `details` disclosure on 6–11. Sessions: time column plus title; breaks and logistics shrink to quiet, muted rows so the shape of the day stays readable.

### The Pull Field (signature)

- A fixed, page-wide Canvas 2D (`.page-scene`, `aria-hidden`, no pointer, focus or selection), pixel ratio at most 1.25.
- About one trail per 1700 px² (900 at most), 1px, Swedish blue at 20 % (a fifth at 28 % in a deeper blue), fading 7 % per frame on plaster. Two batched strokes per frame.
- Three hidden attractors with soft cores drift slowly in a meandering current. Trails loop through and fly out; friction is low, speed is capped, and trails age fast near a core, so the paths tangle and never knot.
- Scroll does not change the field. Reduced motion and Save-Data show one settled, still frame. No JavaScript shows a rendered still.

## Do's and Don'ts

### Do:

- **Do** keep the field light and sparse enough that text rarely needs the contrast wash.
- **Do** set every heading in Hedvig and every interface or reading string in Familjen.
- **Do** keep the title within `calc(44vw − gutter − 3rem)`, and keep the attractors clear of the hero and footer text.
- **Do** check text over the field in every section on desktop and phone.
- **Do** use tabular figures for every time.
- **Do** show unfinished programme items honestly as "To be announced", in muted text.
- **Do** theme browser surfaces: selection (sky on ink), caret (Swedish Blue), scrollbar (ink-muted on plaster), focus outlines.

### Don't:

- **Don't** use Vantage Red for anything except the navigation dot, and never draw the attractors.
- **Don't** add cards, drop shadows, rounded corners or section backgrounds (except the programme field). The wash is the only text backing, and only where the guard asks for it.
- **Don't** use uppercase eyebrows, section numbers or decorative icons.
- **Don't** animate sections on entry, hijack scrolling, or change colours with scroll. The field is the only motion.
- **Don't** use cream or warm off-white grounds, or any palette from the previous KTH/Ungapped page.
- **Don't** raise trail count or contrast without re-checking every section.
