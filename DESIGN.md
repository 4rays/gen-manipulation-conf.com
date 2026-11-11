---
name: Generative AI and Algorithmic Manipulation
description: A conference site in plaster type on a deep field blue, over a quiet field of trails bent by forces you never see, marked by three of its strands wound into one spiral.
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
  field-blue: "oklch(0.34 0.14 255)"
  on-field-muted: "oklch(0.83 0.05 248)"
  rule-field: "oklch(0.5 0.12 252)"
  beige: "oklch(0.925 0.035 82)"
  on-beige-muted: "oklch(0.46 0.09 255)"
  rule-beige: "oklch(0.8 0.045 78)"
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
  button-primary-on-field:
    backgroundColor: "{colors.plaster}"
    textColor: "{colors.field-blue}"
    rounded: "{rounded.none}"
  button-primary-on-field-hover:
    backgroundColor: "{colors.sky}"
  button-secondary:
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 1.5rem"
    height: "3.25rem"
  header-glass:
    backgroundColor: "{colors.field-blue}"
    textColor: "{colors.plaster}"
    opacity: "78%"
    backdropFilter: "blur(18px) saturate(1.25)"
  programme-sheet:
    backgroundColor: "{colors.beige}"
    textColor: "{colors.field-blue}"
    opacity: "95%"
  field-mark:
    textColor: "currentColor"
    rounded: "{rounded.dot}"
---

# Design System: Generative AI and Algorithmic Manipulation

Status: revision 4, 10 November 2026. The landing page is now an inverted world: plaster type and trails on a deep field blue, a blue glass header, and a beige programme sheet (`[data-immersive]` in `src/styles.css`). The site owner chose the **Field mark** as the logo (see Components). Revision 3, 7 November 2026: The site owner rejected the Ames-room scene in both executions and chose the **Pull Field** from the original impeccable directions, with their own changes. The designer designed and implemented it. The binding specs are [field.md](docs/design/field.md) (background, surfaces, fallbacks), [tokens.md](docs/design/tokens.md) and [components.md](docs/design/components.md). [scene.md](docs/design/scene.md) and [hero-scene.md](docs/design/hero-scene.md) record the rejected room.

## Overview

**Creative North Star: "The Pull Field"**

The conference is about influence you see only in its effects. Behind the whole page, fine rain trails fall across a deep blue ground. Hidden attractors bend them: paths loop through, fly back out and tangle. The attractors are never drawn. The visitor sees only the bending, which is the subject itself: algorithmic systems that steer attention and choice without showing their hand.

The field is quiet on purpose: few trails, low contrast, pale plaster and sky trails on a deep field blue, the same from top to bottom. Content sits directly on it, with no section backgrounds. Only the header keeps a blue glass bar, and the programme is a beige sheet with blue type. The logo, the Field mark, is three of its strands caught by one hidden point. The page stays generous and rectilinear: no cards, no drop shadows, no rounded corners.

It refuses the AI-conference default (near-black, neon gradients, glowing particles, robot imagery) and the academic default the old site had (dense justified text on white, institutional chrome).

**Key Characteristics:**

- A page-wide, fixed Canvas 2D field: sparse, soft trails bent by hidden, drifting attractors.
- Text directly on the field, with no backing.
- Field-blue ground, plaster type, trails and actions, a beige programme sheet, one red navigation dot.
- The Field mark: three strands wound into one spiral around a hidden point.
- Hedvig Letters Serif for everything spoken; Familjen Grotesk for everything read or used.
- Square corners, 1px hairlines, no drop shadows, no cards. Nothing animates on entry, and scroll does not drive the field.

## Colors

Cool blues: a deep field blue as the ground, plaster white tinted toward blue for type and trails, and one warm beige sheet for the programme. Never neon.

The landing page (`html[data-immersive]`) uses the field palette below. The plaster palette that follows it is the base theme: the 404 page and any page without the field use it, and the surfaces map onto the field palette on the landing page.

### Field (landing page)

- **Field Blue** (`oklch(0.34 0.14 255)`, #00347d): The ground of the field and of the whole landing page, the header glass (78 %), and the text and actions on the programme sheet. Plaster on it is 10.8:1.
- **Plaster on the field** (#f1f5f8): All text, links and the primary action fill. Trails are plaster at 16 %, and a fifth are Sky at 26 %.
- **On-Field Muted** (`oklch(0.83 0.05 248)`, #aecbe7): Secondary text on the field (7.0:1).
- **Rule Field** (`oklch(0.5 0.12 252)`, #2765a5): Hairlines on the field.
- **Beige** (`oklch(0.925 0.035 82)`, #f2e5cd): The programme sheet, at 95 % over the field. Field blue on it is 9.4:1.
- **On-Beige Muted / Rule Beige** (#335989 / #cebb9e): Secondary text (5.7:1) and hairlines on the sheet.
- On the field, links hover to Sky, and the primary action (plaster with field-blue text) hovers to Sky.

### Primary

- **Swedish Blue** (`oklch(0.47 0.122 248)`, #0a5e9b): The trails of the field (at 20–28 % alpha), the primary action fill, and inline links. 6.2:1 against plaster in both directions.
- **Deep Swedish Blue** (`oklch(0.38 0.105 252)`, #0b4378): Hover and pressed state of the primary action, and links on the field.

### Secondary

- **Night** (`oklch(0.215 0.06 260)`, #081835): The `surface-night` ground. Plaster text on night is 16:1.
- **Programme Blue** (`oklch(0.34 0.14 255)`, #00347d): The same value as Field Blue. It was the programme field in revision 3; the landing page now uses it as its ground (see Field above).
- **Sky** (`oklch(0.8 0.07 240)`, #95c4e7): Text selection and link hover on night. Never a background field.

### Tertiary

- **Vantage Red** (`oklch(0.62 0.19 33)`, #e14c2f): The active-section dot in the navigation only. See the rule below.

### Neutral

- **Plaster** (`oklch(0.968 0.006 245)`, #f1f5f8): The ground of plaster pages. On the landing page it is the text and trail colour.
- **Plaster Shade** (`oklch(0.935 0.014 245)`, #e2ebf2): Hover fill of light actions.
- **Ink** (`oklch(0.255 0.075 258)`, #082246): Text and drawing on the field (14.5:1 on plaster).
- **Ink Muted** (`oklch(0.45 0.06 255)`, #3e5776): Secondary text on light surfaces (6.8:1).
- **Rule / Rule Blue / Rule Night** (#c7d2df / #4585bf / #293e5c): 1px hairlines on each surface. Decorative only, never a control boundary on its own.
- **On-Blue Muted / On-Night Muted** (#c5dbee / #adc0d4): Secondary text on blue (4.8:1) and on night (9.4:1).

### Named Rules

**The One Point Rule.** Vantage Red marks the section in view, as a dot in the navigation, and nothing else. Never text, never a button, border, focus ring, hover, or a mark in the field.

**The Surface Scope Rule.** Sections set their surface with one class (`surface-plaster`, `surface-shade`, `surface-blue`, `surface-night`), which redefines the semantic tokens locally. Components only use semantic tokens and adapt automatically.

**The Authored Theme Rule.** One authored theme per page: the landing page is the field-blue world, other pages are plaster. There is no dark mode and no theme toggle.

**The Faint Field Rule.** Text sits directly on the field, with no backing. The trails stay faint and sparse enough that text is always readable over them. (A contrast guard that added local washes was removed on 11 November 2026: on the inverted field it never switched on.)

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

A 12-column grid in a container of `min(100% − 2 × gutter, 88rem)`. The gutter runs from 16px on a 390px phone to 72px at 1440 (`clamp(1rem, 5.333333vw − 0.3rem, 4.5rem)`). Breakpoints: 640, 768, 1024 (header menu switch and multi-column layouts), 1280.

Sections sit on the field in this order: hero, event facts, about, speakers, programme (beige sheet, 95 %), abstracts, venue, registration, organisers, footer. Only the programme has a background; every other section is plaster type directly on the field. Each section opens with its heading at `clamp(5rem, 3rem + 7vw, 10rem)` from its top edge and closes with `clamp(4rem, 2.5rem + 5vw, 8rem)`. There is always more space above a heading than below it.

The hero text sits directly on the field. The attractors are placed right of and below the hero text on wide screens, and to the right on narrow screens, so the densest tangles stay clear of the title.

Content layouts favour two asymmetric zones: headings or identities on columns 1–5, reading text on 6–11 or 6–12. The programme shows both days side by side from 1024, each as a timetable with a 7.25rem time column.

## Elevation & Depth

Two planes: the field, and the content on it. The interface itself stays flat: no drop shadows, and a focused or pressed state shows through fill, outline or a 1px offset. The header glass is the only translucent bar.

### Named Rules

**The Surface Not Shadow Rule.** Elevation in the interface is expressed by changing the surface, never by lifting an element off it.

## Shapes

Rectilinear. Every corner is square (`--radius: 0`): buttons, menu panel, focus outlines, portraits. The only curves are the navigation dot, the trails of the field, and the spiral of the Field mark. Lines are 1px hairlines in the surface's rule colour, used as row separators (speakers, programme sessions, about subjects, venue blocks, fact columns). No left-border accents, no boxes around content.

## Components

### Buttons

- **Shape:** square (0).
- **Primary:** surface action fill (Swedish Blue with plaster text on light surfaces; plaster with ink text on blue and night), height 3.25rem, padding 0 1.5rem, Familjen 500 1rem, label never wraps, trailing 18px Lucide icon.
- **Hover / Focus:** fill darkens (Deep Swedish Blue or Plaster Shade) over 160 ms with an expo-out curve; focus is a 2px outline in the surface's ring colour, 3px offset; pressed moves down by 1px.
- **Secondary:** 1px current-colour outline, transparent; hover tints the fill 7 % toward the foreground.

### Navigation

- Sticky field-blue glass bar (4.5rem; 3.75rem on phones). The Field mark (36px; 28px on phones, hidden below 390px) sits before the wordmark, the full title in Hedvig, breaking as "Generative AI and / Algorithmic Manipulation".
- Links in Familjen 500. The section in view gets the vantage dot before its label (scroll-spy, progressive).
- Below 1024: a square outlined "Menu" button opens a full-width panel of Hedvig links with hairlines. No overlay, no scroll lock.
- "Register" is the main call to action on every page: a compact primary button at the end of the bar, beside the Menu button below 1024, and the primary action of the hero.

### Rows (speakers, sessions, subjects)

- Hairline-separated rows on the grid, never cards. Speakers: identity on columns 1–5, short bio and a native `details` disclosure on 6–11. Sessions: time column plus title; breaks and logistics shrink to quiet, muted rows so the shape of the day stays readable.

### The Pull Field (signature)

- A fixed, page-wide Canvas 2D (`.page-scene`, `aria-hidden`, no pointer, focus or selection), pixel ratio at most 1.25.
- About one trail per 1700 px² (900 at most), 1px, plaster at 16 % (a fifth Sky at 26 %), fading 7 % per frame on field blue. Two batched strokes per frame.
- Three hidden attractors with soft cores drift slowly in a meandering current. Trails loop through and fly out; friction is low, speed is capped, and trails age fast near a core, so the paths tangle and never knot.
- Scroll does not change the field. Reduced motion and Save-Data show one settled, still frame. No JavaScript shows a rendered still.

### The Field mark (logo)

- Three strands wound into one spiral around a point that is never drawn: the capture the field's wells make. No ring, no clip. Chosen by the site owner on 11 November 2026 ("Orbit", the "No entry" variant), replacing "Drift".
- Generated, never drawn by hand: `pnpm generate:mark` (`scripts/generate-mark.ts`) writes the path data and the favicons. Details in [field.md](docs/design/field.md#field-mark).
- `FieldMark.astro` draws it in the text colour of its surface; `--mark-stroke` sets the stroke in its 100-unit box. The large spiral (1.5 turns) from 64px up, the small one (1.1 turns) below.
- Places: before the header wordmark; to the right of the programme heading in field blue on beige (72–144px); above the footer title in plaster (64px); favicons and the home-screen icon in plaster on a field-blue disc.
- Never recolour it outside the palette, rotate it, add a fill behind it on the field, or draw the hidden point.

## Do's and Don'ts

### Do:

- **Do** keep the field faint and sparse enough that text never needs a backing.
- **Do** set every heading in Hedvig and every interface or reading string in Familjen.
- **Do** keep the title within `calc(44vw − gutter − 3rem)`, and keep the attractors clear of the hero and footer text.
- **Do** check text over the field in every section on desktop and phone.
- **Do** use tabular figures for every time.
- **Do** show unfinished programme items honestly as "To be announced", in muted text.
- **Do** theme browser surfaces: selection (sky on ink), caret, scrollbar (on-field-muted on field blue on the landing page), focus outlines.
- **Do** regenerate the Field mark with its script when it changes, and keep it in the text colour of its surface.

### Don't:

- **Don't** use Vantage Red for anything except the navigation dot, and never draw the attractors.
- **Don't** add cards, drop shadows, rounded corners or section backgrounds (except the programme sheet). The Field mark's spiral is the only round shape besides the navigation dot. Text has no backing.
- **Don't** use uppercase eyebrows, section numbers or decorative icons.
- **Don't** animate sections on entry, hijack scrolling, or change colours with scroll. The field is the only motion.
- **Don't** use cream or warm off-white grounds other than the programme's beige sheet, or any palette from the previous KTH/Ungapped page.
- **Don't** raise trail count or contrast without re-checking every section.
