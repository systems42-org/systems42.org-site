# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Three audiences, with equal weight (confirmed 2026-11-23):

- **arc42 and req42 practitioners.** Software architects, requirements engineers, business analysts and product owners who already know the templates and want to see how they work with AI agents.
- **Agentic coding teams.** Developers and tech leads who already build with AI agents and lack discipline in requirements and architecture.
- **Decision makers.** Engineering managers, CTOs and product owners who decide how their organisation adopts AI in development.

All three arrive with the same question: what is systems42, and is it worth following until it is released?

## Product Purpose

systems42.org is the public website of systems42, an open-source approach to agentic engineering built on the req42 and arc42 templates. Requirements and architecture live in one spec of eighteen sections, kept as a markdown wiki that AI agents read, fill, check and implement.

The public release of systems42 is planned for early 2027. Until then the site has one main job: **a visitor understands the idea** (the templates, the three loops Capture, Inspect and Clarify, and the single spec) and comes back at release.

Seminar bookings and consulting requests are secondary. They follow from understanding the idea and must not compete with it.

## Positioning

- systems42 is made by the people who created req42 and arc42: Peter Hruschka, Peter Gerstbach and Gernot Starke.
- It extends the two templates and does not replace them. Both have been in use for more than 20 years.
- Division of work: strategic decisions stay human, tactical execution goes agentic. The templates keep both in sync.
- Tagline: "Where AI meets engineering discipline."

## Operating Context

- Visitors come from the other 42 family sites (arc42.org, req42.de), from link previews on LinkedIn and Slack, and from search.
- Seminar registration does not happen on this site. It runs through the arc42 training form at trainings.arc42.org; `arc42_id` in `_data/events.yml` links the two.
- The dashboard is a separate product with its own site and live demo at dashboard.systems42.org. This site describes and links to it.
- Seminar flyers are A4 pages printed to PDF by the build, one per language.
- Contact is by email to info@systems42.org.

## Capabilities and Constraints

- Static Jekyll 4 site, deployed to GitHub Pages on every push to `main`. No server-side code, no forms, no accounts.
- Local development needs only `make` and Docker (`make dev`, http://localhost:4242).
- Almost all text lives in data files (`_data/*.yml`) and Markdown pages (`_pages/`), so content changes need no template edits.
- Site language is English. The Vienna seminar has a German page and a German flyer.
- Client-side search with lunr.js. Light and dark themes.
- Structured data (schema.org `Event`) for the seminars.
- Terminology to keep: spec, eighteen sections, the loops Capture, Inspect and Clarify, 42 family, agentic engineering.

Open, not yet decided or not yet available:

- The colour tokens still come from the placeholder logo; the helix logo has its own shades. Whether to align them is open.
- Imprint and privacy pages say "Details to follow".
- `/publications/` and `/examples/` have no real content yet. Examples will be published once results are solid.
- `/get-started/` will become the user's guide at release.

## Brand Commitments

- The name is **systems42**, lower case, one word.
- systems42 is part of the 42 family. That link is a matter of content: family navigation, the family page, and references to arc42 and req42.
- The visual identity is **open** (confirmed 2026-11-23). The current look follows the arc42 family, with blue for arc42, green for req42 and a gradient where both meet. This describes the present implementation and does not bind future design work.

## Evidence on Hand

- Live dashboard demo at dashboard.systems42.org, with light and dark screenshots in `assets/img/blog/`.
- One blog post: `_posts/2026-11-21-the-systems42-dashboard.md`.
- Team biographies and photos: `_pages/about.md`, `assets/img/people/`.
- Two seminar dates with trainers, venue and price: `_data/events.yml`. Course description and agenda: `_data/course/de.yml`, `_data/course/en.yml`.
- Diagrams of the three loops: `_includes/loops/*.svg`.
- The eighteen spec sections: `_data/sections.yml`.

Not available, and not to be invented: testimonials, customer names, case studies, published example projects, benchmarks or measured results. The dashboard's goal "8 of 10 questions answered within 60 seconds" is a target; no baseline has been measured.

## Product Principles

1. **The idea comes first.** Every page helps a visitor understand systems42 before it asks for anything.
2. **One message for three audiences.** Practitioners, agentic teams and decision makers read the same explanation; the site does not split into separate tracks.
3. **Claim only what exists.** The release is "planned for early 2027". Provisional parts are named as provisional.
4. **Extend, do not replace.** systems42 is shown as req42 and arc42 made executable, never as their successor.
5. **Humans decide, AI executes.** This division of work is the core of the approach and should be visible wherever the approach is explained.
