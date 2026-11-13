# Generative AI and Algorithmic Manipulation

<!-- impeccable:product-schema 1 -->

## Platform

web

## Product Purpose

A public website for the Generative AI and Algorithmic Manipulation conference, taking place on 28–29 January 2027 at KTH in Stockholm. Help prospective participants understand the subject, programme, speakers, and practical details.

The public title is **Generative AI and Algorithmic Manipulation**. The user explicitly rejected “Governing AI in Society”; do not use it as a title, subtitle, or positioning sentence.

## Users

The source identifies scholars, policymakers, and industry practitioners as the conference audience. No priority ordering between those groups has been established.

## Subject

The conference concerns generative AI and algorithmic influence, human autonomy, cognition, mental well-being, and governance. It connects technical engineering, cognitive neuroscience, and social policy through keynotes, talks, thematic discussions, and collaborative sessions.

## Operating Context

- Dates: 28–29 January 2027.
- Venue reported by the source: lecture room Q1, Malvinas väg 4, third floor, KTH, Stockholm.
- Organisers: Anass Sedrati (KTH) and Reda Lemeden (Founder & Software Engineer, Four Rays). Both appear in an Organisers section, not in the speaker list. Anass still holds the welcome address; Reda may share it (not decided).
- Named contacts: Anass Sedrati, anass@kth.se; Reda Lemeden, reda@4rays.net (added on 8 November 2026). Contact links mail both.
- Source content and unresolved factual conflicts are documented in `docs/research/conference-content.md`.

## Capabilities and Constraints

- Initial scope: landing page, reusable components, conference metadata, and removal or replacement of public template content.
- Registration (added on 10 November 2026): a custom form on the landing page posts to the organisers' Ungapped survey at KTH, which stays the system of record and sends the confirmation email. The official Ungapped form remains the fallback. Participation is by invitation; registration closes on 8 January 2027 at 18:00 Stockholm time (Ungapped: 17:00 UTC).
- English only at launch.
- Keep the internationalization architecture ready for Swedish (`sv`). Swedish content and public Swedish routes are not required yet; do not publish empty or untranslated Swedish pages.
- Japanese is template scaffolding, not a conference requirement; remove it from the public site.
- Static Astro site with TypeScript and Tailwind CSS 4. No backend of our own; registration data lives only in Ungapped.
- Use pnpm, semantic theme tokens, and self-hosted fonts in accordance with repository guidance.
- The user rejected the Ames-room scene (both executions) on 7 November 2026 and chose the **Pull Field** direction instead: sparse, soft trails bent by hidden, never-drawn attractors, behind the whole landing page.
- Content sits directly on the field with no section backgrounds. A soft local wash appears only where text contrast is very poor. The header keeps a glass bar; the programme keeps a 95 % night-blue background.
- No colour changes with scroll, no red markers, no viewpoint control. Reduced-motion, Save-Data and no-JavaScript alternatives must remain readable.

## Brand Commitments

- A completely new identity: the old KTH/Ungapped page supplies facts only, never branding or visual direction.
- Refined, humane, generous in space, with strong typography; modern and convincing.
- Explore shades of Swedish blue; exact palette and typography remain undecided.
- User-provided stylistic references: https://monarque-evenements.com and https://thestudiobyjuliegranger.com.
- User-provided spatial-interaction reference: https://dappled.com.au, particularly the sense of walking through a 3D scene while scrolling.
- References supply inspiration, not reusable code, imagery, lettering, or identity.

## Evidence on Hand

- `docs/research/conference-content.md`: programme, five named speakers, two talk abstracts, venue, contact, and unresolved source conflicts.
- `docs/research/template-audit.md`: implementation and metadata inventory.

The source conflicts on the final conference end time. Do not silently resolve it. Formal organizer attribution, required institutional marks, and several programme details are unconfirmed. No approved new logo, social image, sponsor list, or 3D asset has been provided.
