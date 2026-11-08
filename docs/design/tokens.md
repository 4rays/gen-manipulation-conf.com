# Tokens: colour, type, space

Status: **authoritative for implementation.** The direction (Vantage) is approved by the site owner. The exact values here are the designer's specification and follow from that approval. The site owner has not reviewed them one by one. See [README.md](README.md) for the approval record.

## Colour

### Scene

Visitors read this page in daylight: at a desk, on a laptop or phone, in offices, libraries and on trains, in the weeks before a January conference. The page is therefore light by default. It moves through four authored surfaces: cool plaster, a pale plaster shade, Swedish-blue fields and night-blue fields. Colour strategy: **Committed**. Swedish blue and night together carry 40–50 % of the scroll height.

### Palette (raw)

All values in OKLCH, with sRGB hex for reference. All are inside the sRGB gamut.

| Token              | OKLCH                    | Hex       | Role                                                  |
| ------------------ | ------------------------ | --------- | ----------------------------------------------------- |
| `--plaster`        | `oklch(0.968 0.006 245)` | `#f1f5f8` | Main light ground. Cool, never cream.                 |
| `--plaster-shade`  | `oklch(0.935 0.014 245)` | `#e2ebf2` | Second light ground (speakers), wall shade in scene.  |
| `--rule`           | `oklch(0.86 0.022 250)`  | `#c7d2df` | Hairlines on light grounds. Decorative only.          |
| `--ink`            | `oklch(0.255 0.075 258)` | `#082246` | Text and line drawing on light grounds.               |
| `--ink-muted`      | `oklch(0.45 0.06 255)`   | `#3e5776` | Secondary text on light grounds.                      |
| `--blue`           | `oklch(0.47 0.122 248)`  | `#0a5e9b` | Swedish blue. Fields, primary action, links on light. |
| `--blue-deep`      | `oklch(0.38 0.105 252)`  | `#0b4378` | Primary-action hover; pressed.                        |
| `--night`          | `oklch(0.215 0.06 260)`  | `#081835` | Dark field (programme, footer).                       |
| `--on-blue-muted`  | `oklch(0.88 0.035 245)`  | `#c5dbee` | Secondary text on blue.                               |
| `--on-night-muted` | `oklch(0.80 0.035 250)`  | `#adc0d4` | Secondary text on night.                              |
| `--rule-blue`      | `oklch(0.60 0.11 248)`   | `#4585bf` | Hairlines on blue.                                    |
| `--rule-night`     | `oklch(0.36 0.06 258)`   | `#293e5c` | Hairlines on night.                                   |
| `--sky`            | `oklch(0.80 0.07 240)`   | `#95c4e7` | Pale blue: scene floor tiles, link hover on night.    |
| `--signal`         | `oklch(0.62 0.19 33)`    | `#e14c2f` | The vantage point. Graphic only, never text.          |

### Contrast (measured)

| Pair                      | Ratio | Use                                        |
| ------------------------- | ----- | ------------------------------------------ |
| ink / plaster             | 14.5  | Body, headings                             |
| ink / plaster-shade       | 13.1  | Body on speakers                           |
| ink-muted / plaster       | 6.8   | Secondary text                             |
| ink-muted / plaster-shade | 6.2   | Secondary text                             |
| blue / plaster            | 6.2   | Links, primary button fill (plaster label) |
| plaster / blue            | 6.2   | Text on blue fields                        |
| on-blue-muted / blue      | 4.8   | Secondary text on blue (body size allowed) |
| plaster / night           | 16.0  | Text on night                              |
| on-night-muted / night    | 9.4   | Secondary text on night                    |
| signal / plaster          | 3.6   | Vantage dot (graphic, ≥ 3:1)               |
| signal / night            | 4.4   | Vantage dot on night                       |

Rules (`--rule`, `--rule-blue`, `--rule-night`) are 1.4–1.7:1. They separate rows that already have space and type to separate them. Never use a rule as the only sign of a control's boundary.

### `--signal` usage (strict)

`--signal` marks the vantage point and nothing else. Exactly three uses:

1. The vantage dot in the hero scene and its static fallback.
2. The active-section dot in the header navigation (see components.md).
3. The 1px sight lines from the vantage point in the scene's side view.

It is never used for text, buttons, backgrounds, borders, focus rings, or hover states.

### Surface scopes

Components use semantic tokens only. A section sets its surface with one class, and that class redefines the semantic tokens locally. Then every child component adapts without colour props.

| Class                                 | `--background` | `--foreground` | `--muted-foreground` | `--border` | `--ring` | `--link` | `--link-hover` |
| ------------------------------------- | -------------- | -------------- | -------------------- | ---------- | -------- | -------- | -------------- |
| `.surface-plaster` (default, `:root`) | plaster        | ink            | ink-muted            | rule       | ink      | blue     | blue-deep      |
| `.surface-shade`                      | plaster-shade  | ink            | ink-muted            | rule       | ink      | blue     | blue-deep      |
| `.surface-blue`                       | blue           | plaster        | on-blue-muted        | rule-blue  | plaster  | plaster  | plaster        |
| `.surface-night`                      | night          | plaster        | on-night-muted       | rule-night | plaster  | plaster  | sky            |

Primary action per surface (`--action-bg` / `--action-fg` / `--action-bg-hover`):

| Surface        | bg      | fg      | hover bg      |
| -------------- | ------- | ------- | ------------- |
| plaster, shade | blue    | plaster | blue-deep     |
| blue, night    | plaster | ink     | plaster-shade |

### Light and dark

**Decision: one authored theme.** The page includes its own dark passages (programme, footer), so it ships no dark-mode variant and no theme toggle.

- Keep `SetTheme.astro` in `BaseLayout.astro` (repository rule). Make it set the light theme unconditionally, or let `.dark` map to the same values as `:root`. Do not render `ThemeSelect`.
- Set `<meta name="color-scheme" content="light">` and `color-scheme: light` on `:root`, so form controls and scrollbars stay light.
- Remove the template palettes (`seagull`, `hyacinth`, `asparagus`, `earth`) from `styles.css`.

### Ready-to-use CSS

This block replaces the template variables in `src/styles.css`. Keep the `@import`/`@plugin` lines and the Tailwind `@theme inline` mapping pattern.

```css
:root {
  color-scheme: light;

  /* Raw palette */
  --plaster: oklch(0.968 0.006 245);
  --plaster-shade: oklch(0.935 0.014 245);
  --rule: oklch(0.86 0.022 250);
  --ink: oklch(0.255 0.075 258);
  --ink-muted: oklch(0.45 0.06 255);
  --blue: oklch(0.47 0.122 248);
  --blue-deep: oklch(0.38 0.105 252);
  --night: oklch(0.215 0.06 260);
  --on-blue-muted: oklch(0.88 0.035 245);
  --on-night-muted: oklch(0.8 0.035 250);
  --rule-blue: oklch(0.6 0.11 248);
  --rule-night: oklch(0.36 0.06 258);
  --sky: oklch(0.8 0.07 240);
  --signal: oklch(0.62 0.19 33);

  /* Semantic (plaster surface is the default) */
  --background: var(--plaster);
  --foreground: var(--ink);
  --muted: var(--plaster-shade);
  --muted-foreground: var(--ink-muted);
  --border: var(--rule);
  --ring: var(--ink);
  --link: var(--blue);
  --link-hover: var(--blue-deep);
  --action-bg: var(--blue);
  --action-fg: var(--plaster);
  --action-bg-hover: var(--blue-deep);
  --vantage: var(--signal);

  /* Type */
  --font-display: var(--font-hedvig), "Iowan Old Style", Georgia, serif;
  --font-sans:
    var(--font-familjen), ui-sans-serif, system-ui, "Helvetica Neue", Arial,
    sans-serif;
}

.surface-plaster,
.surface-shade,
.surface-blue,
.surface-night {
  background-color: var(--background);
  color: var(--foreground);
}

.surface-plaster,
.surface-shade {
  /* Reset explicitly so a light scope nested in a dark one never inherits
     light-on-blue values. */
  --background: var(--plaster);
  --foreground: var(--ink);
  --muted-foreground: var(--ink-muted);
  --border: var(--rule);
  --ring: var(--ink);
  --link: var(--blue);
  --link-hover: var(--blue-deep);
  --action-bg: var(--blue);
  --action-fg: var(--plaster);
  --action-bg-hover: var(--blue-deep);
}

.surface-shade {
  --background: var(--plaster-shade);
}

.surface-blue {
  --background: var(--blue);
  --foreground: var(--plaster);
  --muted-foreground: var(--on-blue-muted);
  --border: var(--rule-blue);
  --ring: var(--plaster);
  --link: var(--plaster);
  --link-hover: var(--plaster);
  --action-bg: var(--plaster);
  --action-fg: var(--ink);
  --action-bg-hover: var(--plaster-shade);
}

.surface-night {
  --background: var(--night);
  --foreground: var(--plaster);
  --muted-foreground: var(--on-night-muted);
  --border: var(--rule-night);
  --ring: var(--plaster);
  --link: var(--plaster);
  --link-hover: var(--sky);
  --action-bg: var(--plaster);
  --action-fg: var(--ink);
  --action-bg-hover: var(--plaster-shade);
}

::selection {
  background: var(--sky);
  color: var(--ink);
}
```

Map them in `@theme inline` as `--color-background`, `--color-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-border`, `--color-ring`, `--color-link`, `--color-link-hover`, `--color-action`, `--color-action-foreground`, `--color-vantage`, `--font-display`, `--font-sans`. Drop `card`, `popover`, `secondary`, `accent`, `destructive` and `input` unless a component needs them. Set `--radius: 0`: the world is rectilinear (see Corners below).

## Typography

### Faces

| Role                               | Face                     | Package                                     | Licence     | Axes used                      |
| ---------------------------------- | ------------------------ | ------------------------------------------- | ----------- | ------------------------------ |
| Display (h1–h3, dates, room names) | **Hedvig Letters Serif** | `@fontsource-variable/hedvig-letters-serif` | SIL OFL 1.1 | `opsz` 12–24, one weight (400) |
| Text and interface                 | **Familjen Grotesk**     | `@fontsource-variable/familjen-grotesk`     | SIL OFL 1.1 | `wght` 400–700, roman + italic |

Both are self-hosted through Astro's fonts API with `fontProviders.local()`, as Inter is now. No CDN. Files:

- `@fontsource-variable/hedvig-letters-serif/files/hedvig-letters-serif-latin-opsz-normal.woff2` (+ `latin-ext` for future Swedish/European names).
- `@fontsource-variable/familjen-grotesk/files/familjen-grotesk-latin-wght-normal.woff2`, `…-latin-wght-italic.woff2` (+ `latin-ext` of each).

CSS variables: `--font-hedvig`, `--font-familjen`. Remove Inter and its package.

Why these faces: Hedvig Letters Serif is calm and humane, with open counters that stay legible at 44px on a phone and authoritative at 96px. It has the gravity of a scientific plate without bookish antiquity. Familjen Grotesk was drawn by a Stockholm studio. Its slightly irregular grotesk details add warmth at interface sizes, and it has true tabular figures (`tnum`) for the programme. Hedvig has no italic. **Do not synthesize italics or bold on the display face**: set `font-synthesis: none` on display elements.

### Scale

Fluid sizes. Clamp minimum = 390px phone, maximum reached near 1600px.

| Role                             | Face                                               | Size                                                                                                  | Line height | Tracking | Notes                                                                                                                                                                                                                     |
| -------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `display` (h1)                   | Hedvig, `opsz` 24                                  | below `lg`: `clamp(2.75rem, 1rem + 5.4vw, 4.5rem)`; `lg` and up: `clamp(3rem, 5.2vw - 0.36rem, 6rem)` | 0.98        | -0.02em  | `text-wrap: balance`. The `lg` formula is tied to the hero text column (see components.md), so the title holds three lines from 1024 to 1920: measured 48px/353px column at 1024, 69px/514px at 1440, 94px/725px at 1920. |
| `h2` section                     | Hedvig, `opsz` 24                                  | `clamp(2.25rem, 1.4rem + 3vw, 4.25rem)`                                                               | 1.02        | -0.015em | `text-wrap: balance`                                                                                                                                                                                                      |
| `h3`                             | Hedvig, `opsz` 20                                  | `clamp(1.5rem, 1.2rem + 1vw, 2rem)`                                                                   | 1.12        | -0.01em  |                                                                                                                                                                                                                           |
| `title` (session, abstract-list) | Hedvig, `opsz` 16                                  | `clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)`                                                         | 1.25        | 0        | Programme session titles                                                                                                                                                                                                  |
| `figure` (fact values, dates)    | Hedvig, `opsz` 18                                  | `clamp(1.375rem, 1.2rem + 0.6vw, 1.75rem)`                                                            | 1.2         | -0.005em |                                                                                                                                                                                                                           |
| `lede`                           | Familjen 400                                       | `clamp(1.125rem, 1rem + 0.45vw, 1.375rem)`                                                            | 1.45        | 0        | Max 38ch                                                                                                                                                                                                                  |
| `body-large`                     | Familjen 400                                       | `1.1875rem`                                                                                           | 1.6         | 0        | About copy, abstracts                                                                                                                                                                                                     |
| `body`                           | Familjen 400                                       | `1.0625rem` (17px)                                                                                    | 1.6         | 0        | Max 66ch                                                                                                                                                                                                                  |
| `small`                          | Familjen 400                                       | `0.9375rem`                                                                                           | 1.5         | 0.005em  | Roles, notes, captions                                                                                                                                                                                                    |
| `label`                          | Familjen 500                                       | `0.875rem`                                                                                            | 1.35        | 0.01em   | `dt`, day labels. **Sentence case. No uppercase, no letter-spaced eyebrows.**                                                                                                                                             |
| `nav` / `action`                 | Familjen 500                                       | `1rem`                                                                                                | 1           | 0        |                                                                                                                                                                                                                           |
| `time`                           | Familjen 500, `font-variant-numeric: tabular-nums` | `0.9375rem`                                                                                           | 1.5         | 0        | Programme times                                                                                                                                                                                                           |

Display elements: `font-family: var(--font-display); font-weight: 400; font-synthesis: none; font-optical-sizing: auto;`. Set `font-variation-settings: "opsz" 24` explicitly for `display` and `h2`, because the browser caps optical size at the CSS px size. The axis max is 24, so all large settings use 24.

**Do not set `font-size` on `html`.** Leave the root at the browser default (16px) so every `rem` in this spec means 16px. Set the body size on `body`. (A root of 1.0625rem silently scales all rem values by 6 % and breaks the hero fit.)

Body: `font-kerning: normal; text-rendering: optimizeLegibility; hanging-punctuation: first;`. Keep `-webkit-font-smoothing: antialiased` only on `.surface-blue` and `.surface-night`.

### Links

- Inline links: `color: var(--link)`, underline `text-decoration-thickness: 1px; text-underline-offset: 0.22em;`, colour of the underline is `currentColor` at 45 % (`text-decoration-color: color-mix(in oklch, currentColor 45%, transparent)`).
- Hover: underline goes to 100 % opacity and `2px` thick; colour → `var(--link-hover)`. Transition 160 ms ease-out on `text-decoration-color`, `color`.
- Focus-visible (every interactive element): `outline: 2px solid var(--ring); outline-offset: 3px;` No radius (corners are square).

## Space and grid

### Grid

- Container: `width: min(100% - 2 * var(--gutter), 88rem); margin-inline: auto;`
- `--gutter: clamp(1rem, 5.333333vw - 0.3rem, 4.5rem)`. This gives 16px on a 390px phone (brief requirement) and 72px at 1440. (Corrected from an earlier formula that missed both targets.)
- 12 columns, `column-gap: clamp(1rem, 0.6rem + 1.6vw, 2rem)`.
- Breakpoints (min-width): `sm 40rem` (640), `md 48rem` (768, the header menu switch the developer already uses), `lg 64rem` (1024), `xl 80rem` (1280).
- Below `md`: single column. All `grid-column` spans in components.md apply from `lg` unless noted; `md`–`lg` uses the stated tablet layout.

### Rhythm

| Token                 | Value                                   | Use                                 |
| --------------------- | --------------------------------------- | ----------------------------------- |
| `--space-section`     | `clamp(5rem, 3rem + 7vw, 10rem)`        | Section padding-top                 |
| `--space-section-end` | `clamp(4rem, 2.5rem + 5vw, 8rem)`       | Section padding-bottom              |
| `--space-heading`     | `clamp(2.5rem, 1.8rem + 2.5vw, 4.5rem)` | Below a section h2 to its content   |
| `--space-block`       | `clamp(1.5rem, 1.2rem + 1vw, 2.25rem)`  | Between blocks inside a section     |
| `--space-row`         | `1.25rem`                               | Programme/speaker row padding-block |
| `--space-row-tight`   | `0.625rem`                              | Minor programme rows (breaks)       |

There is more space above a heading than below it. Each section starts with its h2 at `--space-section` from the top edge of its surface.

### Corners and lines

- **Corners: square everywhere** (`--radius: 0`). The world is drawn rooms and plates. The only exception is the vantage dot (a circle).
- **Lines:** 1px hairlines in `var(--border)` separate rows. No shadows anywhere on the page. No cards. Elevation is expressed by surface change, never by shadow.
