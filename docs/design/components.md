# Components and layout

> Revision 3 (7 November 2026): the hero scene, the vantage toggle, the captions and the section surface colours in this file are superseded by [field.md](field.md). Sections sit directly on the Pull Field; only the header (glass) and the programme (night, 95 %) keep a background. Section layouts, copy, rows, type and the header otherwise stand.

Status: **authoritative for implementation**, keyed to the developer's class hooks in `src/components/conference/`. Tokens, type roles and spacing names refer to [tokens.md](tokens.md). Spans are on the 12-column grid. They apply from `lg` (1024px) unless a line says otherwise. Below `md` (768px) everything is one column.

## Page sequence and surfaces

| Order | Element                 | Surface class     | Notes             |
| ----- | ----------------------- | ----------------- | ----------------- |
| —     | `.site-header`          | plaster           | Sticky            |
| 1     | `.conference-hero`      | `surface-plaster` | The Ames room     |
| 2     | `.event-facts`          | `surface-blue`    | Full-bleed band   |
| 3     | `.conference-about`     | `surface-plaster` |                   |
| 4     | `.conference-speakers`  | `surface-shade`   |                   |
| 5     | `.conference-programme` | `surface-night`   | The dense passage |
| 6     | `.conference-talks`     | `surface-plaster` | Long reading      |
| 7     | `.conference-venue`     | `surface-blue`    |                   |
| —     | `.site-footer`          | `surface-night`   |                   |

Each surface is full-bleed. Its content sits in the grid container (`width: min(100% - 2 * var(--gutter), 88rem)`). Every `[id]` target gets `scroll-margin-top: calc(var(--header-h) + 1.5rem)`.

`html { scroll-behavior: smooth }` only inside `@media (prefers-reduced-motion: no-preference)`.

**No entrance animations on sections.** Content is visible from the first paint. The one authored motion moment is the hero viewpoint change ([hero-scene.md](hero-scene.md)).

## Copy changes (authoritative)

Headings name what the visitor came for. They match the navigation labels, so a click on "Speakers" lands on "Speakers". The persuasion lives in the hero and the about copy, not in section slogans.

| Key                         | Current                                                                                         | New                                                                                                                                                     |
| --------------------------- | ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.lede`                 | Two days exploring how AI shapes human agency, attention and well-being—and how we can respond. | Two days at KTH on how generative AI and algorithmic systems shape attention, choice and well-being, and on the safeguards that protect human autonomy. |
| `about.heading`             | Understanding influence. Protecting human agency.                                               | About the conference                                                                                                                                    |
| `conference.speakers`       | People bringing different perspectives                                                          | Speakers                                                                                                                                                |
| `conference.programme`      | Two days of conversation                                                                        | Programme                                                                                                                                               |
| `conference.talks`          | A closer look at the talks                                                                      | Abstracts                                                                                                                                               |
| `conference.venue`          | Meet in Stockholm                                                                               | Venue                                                                                                                                                   |
| `conference.dinner`         | An evening together                                                                             | Conference dinner                                                                                                                                       |
| `conference.contactHeading` | Questions about the conference?                                                                 | Contact                                                                                                                                                 |
| `conference.backToSession`  | Back to this session                                                                            | Back to the programme                                                                                                                                   |
| `conference.readBiography`  | Read full biography                                                                             | Full biography                                                                                                                                          |

Add `conference.vantageToggle`: "See the room from the side", and `conference.vantageCaption`: "An Ames room looks rectangular from one point only. Change the viewpoint and its construction shows." (see Hero below).

Keep the about paragraphs, subjects, programme note and all speaker text as they are.

Speaker order: programme order, which is neutral: Amal El Fallah Seghrouchni, Aimen Taimur, Anders Hedman, Su-Ling Yeh, Sam Verschooren. Organisers have their own section.

## Shared atoms

### `.action` (link styled as a control)

- `display: inline-flex; align-items: center; gap: 0.625rem; min-height: 3.25rem; padding-inline: 1.5rem; white-space: nowrap;` Familjen 500 `1rem`, line-height 1. Square corners. No shadow. Labels never wrap inside a button; groups wrap instead.
- **`.action--primary`**: `background: var(--action-bg); color: var(--action-fg);`. Hover: `background: var(--action-bg-hover)`.
- **`.action--secondary`**: `border: 1px solid currentColor; color: var(--foreground); background: transparent`. Hover: `background: color-mix(in oklch, var(--foreground) 7%, transparent)`.
- Active (pressed): `transform: translateY(1px)`.
- Focus-visible: `outline: 2px solid var(--ring); outline-offset: 3px`.
- Transition: `background-color 160ms cubic-bezier(0.22, 1, 0.36, 1)`.
- Trailing icon from `@lucide/astro`, `size=18`, `stroke-width=1.5`, `aria-hidden`:
  - "Register" (hero primary, since 10 November 2026) and "See the programme" (secondary): `ArrowDown`. The hero no longer has a contact action; Contact stays in the header, the venue and the footer.
  - "Open location in maps", "Email the organisers": `ArrowUpRight` (they leave the page).
  - "Open location in maps": `ArrowUpRight`.
- Below `sm`, actions in a group stack full width (`width: 100%; justify-content: space-between`).

### Text links

As in tokens.md: `--link`, 1px underline at 45 % opacity, offset 0.22em. Hover: full-opacity 2px underline, `--link-hover`. External links (profile pages, maps) get a trailing `ArrowUpRight` at `0.875em`, inline, `aria-hidden`.

### Hairline rows

Lists of rows (speakers, programme sessions, about subjects, venue blocks) use `border-top: 1px solid var(--border)`. The last row also gets `border-bottom`. No other borders. No cards and no shadows anywhere.

### Vantage dot

`::before` pseudo-element: `width: 0.5rem; height: 0.5rem; border-radius: 50%; background: var(--vantage);`. Used only where tokens.md lists it.

## `.site-header`

- `position: sticky; top: 0; z-index: 40; background: var(--plaster); color: var(--ink);`. Set `--header-h: 4.5rem` (≥ `md`) and `3.75rem` (< `md`) on `:root`.
- Inner grid container: wordmark left, nav right, `align-items: center; height: var(--header-h)`.
- Bottom edge: `border-bottom: 1px solid transparent`. Once the page scrolls past 8px, set `[data-scrolled]` on the header, which switches the border to `var(--rule)` over 160 ms. This is progressive: without JS the border stays transparent, which is fine.
- **`.site-wordmark`**: Hedvig, `opsz` 16, `1.125rem`, line-height 1.12, `max-width: 12.75em` (verified: the title breaks as "Generative AI and / Algorithmic Manipulation"). No underline. Below `sm`: `1rem`, same two lines.
- **`.site-navigation`** (≥ `lg`, since 10 November 2026: five sections and Contact do not fit beside the wordmark below about 930px): `display: flex; gap: clamp(1.25rem, 2.5vw, 2.25rem)`. Familjen 500 `1rem`. Links are `--ink`, no underline at rest. Hover shows a 1px underline at offset 0.3em.
  - **Active section:** a small scroll-spy script (IntersectionObserver, `rootMargin: "-40% 0px -55% 0px"`) sets `aria-current="true"` on the link whose section is in view. That link gets the vantage dot before its label: `::before` dot with `margin-inline-end: 0.5rem`, vertically centred. Without JS, no link is marked.
  - The "Contact" mailto link is the last item, styled as text with a trailing `ArrowUpRight`. It is **not** a button.
- **`.site-header__register`** (since 10 November 2026): "Register", the page's main call to action, is a compact primary action (`min-height: 2.75rem`, no icon) after the navigation. It links to `#registration` (`/#registration` from the 404). Below `lg` it sits beside the Menu button, which stays rightmost; the registration section has no navigation link of its own. Below `sm` both buttons use `padding-inline: 0.625rem` and the wordmark scales (`clamp(0.8125rem, (100vw - 12rem) / 12.6, 1rem)`) so it keeps two lines from 360px.
- **Compact menu (< `lg`)**: `.site-menu-toggle` is a text button "Menu": Familjen 500 `1rem`, `min-height: 2.75rem`, `padding-inline: 1rem`, `border: 1px solid var(--ink)`, square. `[aria-expanded="true"]` changes the label colour to plaster on ink fill.
  - The open panel: `position: absolute; inset-inline: 0; top: var(--header-h);` plaster, `border-bottom: 1px solid var(--rule)`, padding `1rem var(--gutter) 2rem`. Links stack as rows: Hedvig `1.75rem`, line-height 1.2, `padding-block: 0.875rem`, hairline between rows. Contact last, Familjen 500 `1rem`, with icon.
  - No full-screen overlay and no scroll lock.

## `.conference-hero` (first viewport)

The thesis: a calm plaster room, the conference title set big and dark beside it, and one quiet proof of the subject. The room looks perfectly ordinary until you change the viewpoint.

### Desktop (≥ `lg`)

- `min-height: calc(100svh - var(--header-h)); max-height: 68rem;` as a positioning context. Background plaster.
- **`.conference-hero__scene`** (`aria-hidden`): `position: absolute; inset-block-start: 0; inset-block-end: clamp(2.5rem, 6vh, 4.5rem); inset-inline-start: 44%; inset-inline-end: 0;` The scene bleeds off the right edge and the top. Its bottom edge ends on plaster, aligned with the bottom of the action buttons, so the checker floor never touches the blue facts band (review 1). **Text-safe region:** the left 44 % of the hero holds no scene pixels, ever, including during the viewpoint change.
- **Text column width:** set `--hero-text-max: calc(44vw - var(--gutter) - 3rem)` on `.conference-hero` at `lg`. Every child of `.conference-hero__content`, **including the `h1`**, gets `max-width: min(100%, var(--hero-text-max))`. This must win over any `ch`-based h1 max-width, or the title runs into the scene (seen in review at 1024).
- **`.conference-hero__content`**: in the grid container, `position: relative; display: flex; flex-direction: column; min-height: inherit; padding-block: clamp(3rem, 9vh, 7rem) clamp(2.5rem, 6vh, 4.5rem);`
  - `h1`: display role (the `lg` formula), colour `--ink`.
  - `.conference-hero__dateline`: directly under the h1, `margin-top: clamp(1.25rem, 2.5vh, 2rem)`. Two lines: first span (date) in the figure role (Hedvig), second span (place) in Familjen 500 `1rem` `--ink-muted`. `display: flex; flex-direction: column; gap: 0.25rem`.
  - `.conference-hero__lede`: lede role, `max-width: 36ch`, `--ink`, `margin-top: auto` (it moves to the lower part of the column with the actions). Minimum gap above: `2.5rem`.
  - `.conference-hero__actions`: `margin-top: 2rem; display: flex; gap: 0.75rem; flex-wrap: wrap`. At 1024 the two actions wrap to two rows; that is intended.
- **New element `.conference-hero__vantage`** (the developer adds, outside the `aria-hidden` scene): `position: absolute; inset-inline-end: var(--gutter); inset-block-start: clamp(1.5rem, 4vh, 2.5rem); max-width: 21rem;` It sits in the scene's calm ceiling band, which is the same plaster as the page, so it needs **no background box**. (A boxed control over the checker floor looked like a sticker in review.)
  - `<button class="vantage-toggle" type="button" aria-pressed="false" aria-controls="…scene id">` with the label "See the room from the side". Style: `.action--secondary` at `min-height: 2.75rem`, icon `Rotate3d` (lucide) `size=18`. Pressed: ink fill, plaster text.
  - `<p class="vantage-caption">`: small role, `--ink-muted`, `margin-top: 0.75rem`. Desktop shows it here. Below `lg` the caption is shown under the hero actions instead (render it twice with `lg`-scoped display rules, and give the hidden copy `aria-hidden="true"`, or move it with CSS grid areas).
  - Hidden (`hidden` attribute) until the scene or its fallback images are ready, because the button must do something. In the no-JS case it stays hidden.

### Tablet (`md`–`lg`)

- The scene becomes a band at the top of the hero: `position: relative; height: clamp(18rem, 40svh, 28rem); inset: auto;` full-bleed. (Reduced so the primary action fits a 768 × 1024 first viewport.)
- Content follows below in normal flow, grid columns 1–12, `padding-block: 2.5rem 4rem`. h1 `max-width: 14ch`. Lede `margin-top: 1.75rem`.
- `.conference-hero__vantage` holds only the button, at the scene band's bottom-right corner, overlapping the band edge by half its height (`margin-top: -1.375rem`, aligned right at the gutter). The button has a plaster fill there. The caption is a small muted line under the actions.

### Phone (< `md`)

- Scene band `height: clamp(14rem, 33svh, 22rem)`. On a 390 × 844 phone this keeps the title, dates, lede and primary action inside the first viewport.
- Content: h1 at the display minimum (44px), dateline, lede (`max-width: none`), actions stacked full width.
- The vantage control as on tablet: button only, overlapping the band's bottom edge at the right; the caption is a small muted line below the actions. The button stays at least 44px tall.

## `.event-facts` (`surface-blue`)

- Padding-block `clamp(2.5rem, 2rem + 2vw, 4rem)`. Grid container.
- `dl`: `display: grid; grid-template-columns: repeat(4, 1fr); column-gap: 0;` (≥ `lg`); `repeat(2, 1fr)` with `row-gap: 2rem` (`sm`–`lg`); one column (< `sm`).
- Each `dl > div`: `padding-inline: 1.5rem;` with `border-inline-start: 1px solid var(--border)` except the first in each row (`padding-inline-start: 0; border: 0`). Below `sm`, use `border-top` + `padding-block: 1.25rem` instead, none on the first.
- `dt`: label role, `--muted-foreground`, `margin-bottom: 0.5rem`.
- `dd`: figure role (Hedvig), `--foreground`, `max-width: 18ch`, `text-wrap: balance`.

## `.conference-about` (`surface-plaster`)

- Padding `var(--space-section) 0 var(--space-section-end)`.
- Grid: `h2` columns 1–5, top-aligned. `.conference-about__copy` columns 6–12: body-large role, `max-width: 60ch`, paragraphs `+ p { margin-top: 1.25em }`.
- `.conference-about__subjects`: columns 6–12, `margin-top: calc(var(--space-block) * 1.5)`. Each `li` is a hairline row: figure role (Hedvig), `padding-block: 1.125rem`. No markers, no numbers, no icons.
- Tablet/phone: h2 above, copy and subjects full width, `margin-top: var(--space-heading)`.

## `.conference-speakers` (`surface-shade`)

- Section padding as About. `h2` full width, `margin-bottom: var(--space-heading)`.
- `.speaker-list`: no gap; rows.
- **`.speaker`** (hairline row): `display: grid; grid-template-columns: subgrid` over the 12 columns, `padding-block: clamp(1.75rem, 1.4rem + 1vw, 2.5rem)`.
  - `.speaker__identity`: columns 1–5. `h3` (h3 role). `.speaker__role` small role `--ink-muted`, `margin-top: 0.5rem`. `.speaker__institution` small role `--ink`.
  - `.speaker__description`: columns 6–11 (column 12 stays empty). Short bio in body role, `max-width: 60ch`.
  - `details > summary`: `list-style: none` (also hide `::-webkit-details-marker`). `display: inline-flex; gap: 0.5rem; align-items: center; min-height: 2.75rem; margin-top: 0.75rem;` Familjen 500 `1rem`, `--link`. Icon `Plus` (lucide, 18, 1.5) rotates 45° when `[open]` (200 ms, ease-out; no rotation under reduced motion).
  - `.speaker__biography`: body role, `max-width: 64ch`, `padding-top: 0.5rem`, paragraphs spaced `1em`. Profile link at the end as a text link with external icon.
  - **Avatar (optional; a photo the organisers supplied):** `.speaker__avatar` is a round, square-cropped photo (`border-radius: 50%`, `clamp(4.5rem, 3.9rem + 1.5vw, 5.5rem)`), left of the name inside `.speaker__identity`, `column-gap: 1.25rem`. The grid columns do not change. Empty `alt`: the name beside it says who it is. No filters. Source files: 240 × 240 WebP in `public/images/speakers/`.
- Tablet/phone: identity on top, description below, `gap: 1rem`.

## `.conference-programme` (`surface-night`)

This is the densest passage. It must scan like a timetable: strict columns, tabular figures, and quiet minor rows.

- Section padding as About. `h2`, then `.programme-note` small role `--muted-foreground`, `max-width: 60ch`, `margin-top: 1rem`. `margin-bottom: var(--space-heading)` after the note.
- **`.programme-days`**: ≥ `lg` `display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(2.5rem, 5vw, 5.5rem); align-items: start;`. Both days side by side, so they can be compared. Below `lg` they stack with `row-gap: var(--space-section-end)`.
- **`.programme-day h3`**: `display: flex; flex-direction: column; gap: 0.25rem; margin-bottom: 1.5rem`. The `span` ("Day 1") in label role `--muted-foreground`. The `time` in h3 role (Hedvig).
- **`.programme-session`** (hairline row): `display: grid; grid-template-columns: 7.25rem 1fr; column-gap: 1rem; padding-block: var(--space-row);` Below `sm`: one column, time above the title, `row-gap: 0.25rem`.
  - `.programme-session__time`: time role (Familjen 500, `tabular-nums`), `--foreground`, `white-space: nowrap`. The visible dash is an en dash with `0.15em` space on each side.
  - `h4`: title role (Hedvig, `opsz` 16), `--foreground`. The abstract link inside it: text-link rules plus a trailing `ArrowDown` icon at `0.8em`.
  - `.programme-session__speakers`: small role, `margin-top: 0.375rem`, links are plaster with the standard underline.
  - `.programme-session__pending`: small role, Familjen **italic**, `--muted-foreground`, `margin-top: 0.375rem`.
- **Kinds** (`data-kind`):
  - `keynote`: `h4` takes the figure role (bigger Hedvig). Same row structure. No badge.
  - `talk`, `panel`, `breakout`, `welcome`, `closing`, `social`: default title role.
  - `break`, `logistics`: minor rows. `padding-block: var(--space-row-tight)`. `h4` switches to Familjen 400 `0.9375rem` and `--muted-foreground`; time also `--muted-foreground`. They stay in sequence so the day's rhythm is readable.
  - A session whose title is "To be announced": Hedvig in `--muted-foreground`.
- **`:target` state** (returning from an abstract): `background: color-mix(in oklch, var(--plaster) 7%, transparent)`, which fades to transparent over 1.6 s (`animation`, none under reduced motion). Add `margin-inline: -0.75rem; padding-inline: 0.75rem` on `:target` only, so the tint has a little air.

## `.conference-talks` (`surface-plaster`)

- Section padding as About. `h2` with `margin-bottom: var(--space-heading)`.
- **`.talk-abstract`** (≥ `lg`): `display: grid; grid-template-columns: subgrid` over 12 columns, `row-gap: 0.75rem`. `+ .talk-abstract { margin-top: var(--space-section-end); padding-top: var(--space-block); border-top: 1px solid var(--border); }`
  - `h3`: columns 1–5, row 1, h3 role, `max-width: 18ch`, `text-wrap: balance`.
  - `.talk-abstract__speaker`: columns 1–5, row 2, `align-self: start`. Familjen 500 `1rem`, text link.
  - `.talk-abstract__body`: columns 6–12, rows 1 / span 3. Body-large role, `max-width: 64ch`. Paragraph spacing `1.1em`. `hanging-punctuation: first`.
  - `.talk-abstract__return`: columns 6–12, row 4, small role, text link with leading `ArrowUp` icon, `margin-top: 1.5rem`.
- Tablet/phone: one column in DOM order. Body `margin-top: 1.5rem`.

## `.conference-venue` (`surface-blue`)

- Section padding as About. `h2` with `margin-bottom: var(--space-heading)`.
- **`.conference-venue__grid`**: ≥ `lg` three equal columns (`grid-template-columns: repeat(3, 1fr)`, gap as the grid's column gap). `md`–`lg`: two columns (address spans both). Phone: one.
- Each block: `border-top: 1px solid var(--border); padding-top: 1.5rem;` `h3` in h3 role. Paragraphs body role, `margin-top: 1rem`. `--foreground` text; secondary lines (floor, times) can use `--muted-foreground`.
- Map link: `.action .action--secondary` (plaster outline on blue), `margin-top: 1.5rem`, with `ArrowUpRight`.
- Contact: `address` in normal style (`font-style: normal`). Email is a text link. Profile link is a text link with the external icon.
- Dinner: the note that the venue is still to be announced is set in small italic `--muted-foreground`.

## `.conference-registration` (`surface-blue`)

Added on 10 November 2026, after the venue and before the organisers. Heading and intro on columns 1–5, the form on 6–11.

- Fields: label above (Familjen 500, small), control 3.25rem high, square, 1px boundary mixed 62 % foreground into the surface (at least 3:1), fill tinted 6 % so trails never run behind typed text. First and last name, then organisation and role, sit in pairs from `sm`; email takes the full row.
- Choices are hairline rows. Checkboxes are square; radios stay round, as the convention users know. Diet options are two columns from `sm`.
- Errors: a `CircleAlert` icon and text under the field, and a 2px boundary. Never red (One Point Rule).
- Status messages sit between hairlines. The fallback is a row of actions: the official form (primary), "Copy my answers" and "Email the organisers" (secondary).
- Without JavaScript, or when the live survey differs from the expected one, the section shows only a link to the official form.

## `.site-footer` (`surface-night`)

- `padding-block: clamp(3.5rem, 3rem + 2vw, 5rem) clamp(2.5rem, 2rem + 1vw, 3.5rem)`. Grid container.
- ≥ `lg`: `.site-footer__title` columns 1–6 in h3 role (Hedvig), `max-width: 16ch`. The dates/place line and the email link stack in columns 8–12, `align-self: end`, small role. Dates/place in `--muted-foreground`, email as a text link.
- Below `lg`: stacked, `gap: 1.25rem`.
- No copyright or organiser line, because neither is confirmed.

## `404`

- `surface-plaster`. Grid container, `padding-block: var(--space-section)`.
- `h1`: display role, "This page is not here." `max-width: 12ch`.
- Message (small rewrite): "The address may have changed. The conference page has everything in one place." Body-large, `--ink-muted`, `max-width: 44ch`, `margin-top: 1.5rem`.
- One `.action--primary` "Go to the conference page" with `ArrowRight`, `margin-top: 2.5rem`.
- Remove the "404" eyebrow paragraph (no eyebrows/kickers).

## Browser surfaces

- `::selection`: sky on ink (in tokens).
- `caret-color: var(--blue)`.
- Scrollbar: `scrollbar-color: var(--ink-muted) var(--plaster)` on `:root`.
- Skip link: when focused, `position: fixed; top: 0.75rem; left: var(--gutter); z-index: 50;` `.action--primary` styling.
- `details` focus: the summary takes the standard focus outline.
