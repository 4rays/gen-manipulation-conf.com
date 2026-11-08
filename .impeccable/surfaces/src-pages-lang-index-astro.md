---
version: 1
slug: "src-pages-lang-index-astro"
primary_target: "src/pages/[...lang]/index.astro"
related_targets:
  [
    "src/components/conference/Hero.astro",
    "src/components/conference/HeroScene.astro",
    "src/scripts/field/field.ts"
  ]
---

# Landing page

Mode: Persuade. Scope: the single landing page (`/`) plus shared header, footer and 404. Registration is out of scope.

Audience: scholars, policymakers and industry practitioners deciding whether to attend, and returning visitors checking the programme, speakers and venue. Job: understand the subject, see who speaks and when, find the room. Actions: "See the programme" (in page) and "Contact the organiser" (mailto). Proof: the five named speakers, the two-day programme, the two abstracts. Honest "To be announced" states; no invented claims.

Memorable moment: a quiet field of trails behind the whole page, bending around forces you never see.

Unresolved: Taimur affiliation and day-2 end time (organiser); portrait permission.

## Direction contract

THESIS: Influence hides in the design of an environment. The hero is an Ames room that is correct from one viewpoint only; one action reveals its construction. It refuses the dark neon AI-conference hero and the dense academic notice.

OWN-WORLD: Cool plaster, Swedish-blue and night-blue fields at full width, ink hairlines, one red vantage point. Hedvig Letters Serif speaks; Familjen Grotesk informs. Square corners, no cards, no shadows.

STORY: The visitor sees an ordinary room beside a large title, dates and place. They understand that this is a conference about how designed systems steer perception. They scan the facts, speakers and a two-day timetable, then go to the programme or write to the organiser.

FIRST VIEWPORT (revision 1, superseded below): Sticky plaster header with a two-line serif wordmark and nav. Left 44 %: three-line display title, date in serif, place, lede, then the blue primary and outlined secondary actions. Right 56 %: the WebGL room bleeding to the edges; the "See the room from the side" toggle and caption sit in its ceiling band. Phone: a 33svh room band, then the title through the primary action.

FORM: Vantage, the Ames room and perception-plate world. Impeccable's pick, chosen by the site owner. seed:a77a3ab0d03fd55f

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Revision 2 (7 November 2026)

The site owner rejected the execution of revision 1 and asked for the room behind the whole page, see-through content, real light with dust and grain, better figures, and scroll in place of the toggle. Spec: `docs/design/scene.md`.

THESIS (unchanged in intent): the scroll itself performs the reveal. From the vantage point the room is ordinary; reading down the page walks the visitor off that point until the construction and the sight lines are plain.

FIRST VIEWPORT: Glass header. The room fills the viewport behind everything, seen from V, shifted right by an off-axis projection: two mullioned windows with sun beams, dust, two identical coated figures, one small and one tall. Left: three-line display title, date, place, lede and actions on a plaster wash. Phone: title over the ceiling, a clear band with the windows and figures, then the lede and actions on a wash.

FORM: Vantage, revision 2: a lit, atmospheric room as a fixed page background; content on full-width tinted glass; the footer is a clear night coda framing the final construction view.

## Revision 3 (7 November 2026)

The site owner rejected the Ames room in both executions. From the original directions, compared on the current site with only the background changed, they chose Pull Field and tuned it: fewer, softer trails; no colour changes; no section backgrounds except a 95 % night programme; a local wash only where contrast is very poor; tangled, chaotic paths; no red markers. Spec: `docs/design/field.md`.

THESIS: influence you see only in its effects. Trails bend around attractors that are never drawn.

FIRST VIEWPORT: Glass header. The title, date, place, lede and actions sit directly on the plaster field; trails tangle right of and below the text.

FORM: Pull Field (challenger-pull from the original roll), in the existing plaster, Swedish-blue and night system with Hedvig and Familjen.
