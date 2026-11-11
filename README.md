# systems42.org

Source of [systems42.org](https://systems42.org), a Jekyll site in the style of the arc42 family, served by GitHub Pages.

## Local development

Only `make` and Docker are needed. No Ruby, no gems on your machine.

```
make dev          # http://localhost:4242 with live reload
make site         # build the static site into _site/
make check-links  # html-proofer over _site
make help         # all targets
```

The first `make dev` creates `Gemfile.lock` (via `make lock`) and builds the Docker image. After changing the `Gemfile`, run `make update` or `make lock` and then `make build`.

## Where things live

| What | Where |
|---|---|
| Texts of the home page | `_data/home.yml` |
| Top navigation and the "More" menu | `_data/nav.yml` (`primary` and `more`) |
| 42 family members | `_data/family.yml` |
| Seminars | `_data/events.yml` |
| The 18 spec sections | `_data/sections.yml` |
| Blog posts | `_posts/YYYY-MM-DD-slug.md`, layout `post`; `_drafts/` holds an example |
| Search | `search.json` (built by Jekyll) + lunr.js in `assets/js/`; Cmd-K / Ctrl-K or the magnifier opens it; `/search/` shows all results |
| Logo | `assets/img/logo.svg` (vector); PNG/ICO icons and the link preview image `og-image.png` (1200x630) are generated from it. **Placeholder, see Open points** |
| Pages | `_pages/*.md`, layout `page`, `permalink:` in the front matter; `toc:` adds the sub-navigation |
| Colour and type tokens | `_sass/_tokens.scss` |
| Docker setup | `docker/` (Dockerfile, compose.yml, entrypoint); driven by the `Makefile` |
| Seminar description and flyers | `_data/course/de.yml` and `en.yml` (text, agenda, key facts; shared by the flyers and /training/), `_flyers/*.md` (one per language), layout `flyer`, styles `_sass/_flyer-sheet.scss`; dates from `_data/events.yml` |
| Loop diagrams | `_includes/loops/*.svg` (inlined so they take the page colours); originals in `assets/img/loops/` |

Colour rule: blue is arc42 and architecture, green is req42 and requirements, the gradient marks where both meet.

## Flyer

Each file in `_flyers/` is an A4 page at `/training/flyer-<name>/` (open it in the browser to check the layout). After the Jekyll build, `scripts/flyer-pdf.mjs` prints it with headless Chromium to the path in its `pdf:` front matter, e.g. `/assets/flyer-MAISPEC-systems42-DE.pdf`, and fails if the flyer no longer fits on one page. Shorten the text or tighten `_sass/_flyer-sheet.scss` then.

Locally (needs Node): `make flyer` builds the site and installs Playwright on first run. Without make: `npm install` and `npx playwright install --only-shell chromium` once, then `npm run flyer` after any Jekyll build.

The dev server (`make dev`) does not make the PDFs, so the PDF links give 404 there. While it runs, `npm run flyer` in a second terminal writes them into `_site`, where they stay until you run it again (`keep_files` in `_config.yml`). For the layout itself, the HTML pages `/training/flyer-de/` and `/training/flyer-en/` reload live.

## Open points

Things that are deliberately provisional. Check this list before the public release.

- **The logo is a placeholder.** The final logo is still in progress. When it exists, replace `assets/img/logo.svg` and regenerate everything derived from it: `logo-512.png`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` and `og-image.png` (the link preview image for LinkedIn, Slack and similar, 1200x630, logo centred on the logo's background colour).
- **`/publications/` and `/blog/` are set to `noindex` and are not in the sitemap**, because they have no content yet and search engines would treat them as thin pages. As soon as a page has real content, remove `noindex: true` and `sitemap: false` from its front matter (`_pages/publications.md`, `_pages/blog.md`). Otherwise it never shows up in search. `/imprint/`, `/privacy/` and `/search/` are also left out of the sitemap, but on purpose and for good.
- **Imprint and privacy** still say "Details to follow".
- **Structured data** (schema.org `Event` as JSON-LD, `_includes/event-jsonld.html`, fed by `_data/events.yml`) is in place on /training/ and the two seminar pages. Times and venue come from `events.yml` (`start_time`, `end_time`, `utc_offset`, `venue`); the offer carries only the regular `price_eur`, not the early-bird/alumni discount. Remember to set `utc_offset` to +02:00 for dates in summer time. Check after each change with Google's Rich Results Test.

## Deployment

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Jekyll 4, prints the flyers to PDF and deploys to GitHub Pages. The custom domain is set in `CNAME`.
