# AGENTS.md

This file provides guidance to coding agents working in this repository.

## Project Overview

This is the **Generative AI and Algorithmic Manipulation** conference website for 28–29 January 2027 at KTH, Stockholm. It produces plain HTML (`output: "static"`, no adapter, no server, no secrets) deployable to any static host. Read `PRODUCT.md` for confirmed product facts and `DESIGN.md` when available for the approved visual system. Research and unresolved source conflicts live in `docs/research/`. Registration posts to the organisers' Ungapped survey (see Registration below).

## Development Commands

Commands marked with **(CI)** run in the `Test` workflow on every pull request.

- `pnpm dev` - Start dev server at localhost:4321
- `pnpm build` - Build the static site to `./dist/` (CI)
- `pnpm preview` - Build, then preview the production output locally
- `pnpm check` - Run Astro/TypeScript diagnostics (CI)
- `pnpm check:registration` - Read-only check that the live Ungapped survey still matches the form (`Registration` workflow, daily and on related PRs)
- `pnpm generate:mark` - Regenerate the Field mark (`src/data/mark.ts`, `public/favicon.svg`, `favicon.ico`, `apple-touch-icon.png`); the output is committed
- `pnpm format` - Format all files with Prettier
- `pnpm format:check` - Verify Prettier formatting without writing (CI)

## Architecture

### Static-Only

- No adapter, no SSR, no middleware, no API routes. Everything is prerendered at build time.
- Language preference redirect is necessarily **client-side** (`src/scripts/language-detection.js`) since static hosts can't inspect `Accept-Language`.

### i18n

- Published locale: `en` only (default, unprefixed paths). Keep localization ready for Swedish (`sv`), but do not publish untranslated routes or a language switch until Swedish content exists.
- Localized pages live in `src/pages/[...lang]/` and must export `getStaticPaths` returning `getLocaleStaticPaths()` from `src/i18n/utils.ts`.
- Translations are JSON files in `src/translations/`; the `Translations` type is inferred from `en.json`, so a missing key in usage is a compile error.
- Use `localizeUrl()` for internal page links; same-page fragment links remain relative. Never hardcode locale prefixes.
- Demo blog, about and RSS routes have been removed. The only public pages are the landing page and 404.

### Content

- Typed conference data lives in `src/data/conference/`; interface labels live in `src/translations/en.json`. Preserve stable speaker, session and abstract IDs across future translations.
- All essential content must render in HTML without JavaScript. Both programme days remain visible; biographies use native disclosure.
- Keep editorial notes out of rendered content. Do not silently resolve source conflicts or invent unfinished programme details.
- Sitemap is automatic via `@astrojs/sitemap` — keep `site` in `astro.config.mjs` accurate.

### Registration

- The form in `src/components/conference/Registration.astro` posts JSON straight from the browser to the KTH Ungapped survey (`https://kth.ungapped.io/api/Surveys/{id}`). Ungapped allows any origin (CORS `*`). There is no documented API: `src/scripts/registration/schema.ts` copies the request that Ungapped's own widget (`/Widgets/forms.js`) sends. Keep it identical.
- `src/data/conference/registration.json` records the survey, question, option and condition IDs the form expects. On load the form fetches the live definition and appears only if it matches; otherwise visitors keep the link to the official form. That link is also the no-JavaScript default.
- Never send a test submission to the live survey. Test with every non-GET request intercepted, or ask the organisers for a copy of the survey.
- No response (network failure or timeout) shows a "check your email" message and never retries on its own; Ungapped emails a confirmation. Other failures keep the answers and offer the official form, a copy of the answers and an email to the organisers.
- When the organisers change the survey, the daily `Registration` workflow fails. Update `registration.json`, the labels in `en.json` and the component together.

### Theming

- Semantic colour/surface tokens live in `src/styles.css`; type/space foundations, component layouts and hero rules live in `src/styles/`. The approved design has one authored light theme with explicit dark sections, not a dark-mode toggle.
- Components must use **semantic tokens** (`bg-background`, `text-muted-foreground`, …), never raw palette colors (`bg-blue-600`).
- `SetTheme.astro` must stay in `BaseLayout.astro`; it fixes the authored light theme and ignores legacy theme preferences.
- Fonts are self-hosted via Astro's fonts API (`fonts` in `astro.config.mjs` + `<Font>` in `BaseLayout.astro`); do not add font CDN links.

### SEO

- `BaseLayout.astro` handles canonical URLs, Open Graph, Twitter cards and sitemap link. `src/consts.ts` defines the production origin and English identity.
- Social-image tags are emitted only when a real image is supplied. The social card shows the Pull Field. The favicons and the header mark (`FieldMark.astro`) are the Field mark, generated from the field's physics by `scripts/generate-mark.ts`; do not edit their output by hand.
- No inferred organizer/copyright attribution or unconfirmed event end time in metadata.

## Deployment

- Cloudflare Worker `gen-manipulation-conf` (account Four Rays) serves `dist/` as static assets only, with no Worker script. `wrangler.jsonc` holds the config and binds `gen-manipulation-conf.com` and `www.gen-manipulation-conf.com` as custom domains.
- Workers Builds deploys every push to `main` (build `pnpm build`, deploy `npx wrangler deploy`) and gives other branches preview URLs. Do not deploy by hand unless Workers Builds is down.

## Repository Skills

Procedural guides live in `skills/` as `SKILL.md` files. They are named in no other document, so check them before improvising a procedure:

- `skills/indigo-theming/SKILL.md` - The theming system: palettes, semantic tokens, dark mode, typography, rebranding
- `skills/indigo-i18n/SKILL.md` - Translation files, localized pages, locale-aware URLs, adding keys or a new language

## Conventions

- pnpm only. Node >= 22.13.0.
- Import alias: `@/*` maps to `src/*`.
- Prettier config: 2 spaces, no bracket spacing, no trailing commas (`bracketSpacing: false`, `trailingComma: "none"`).
