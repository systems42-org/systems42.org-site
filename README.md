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
| Logo | The helix logo: `assets/img/logo.svg` (dark version, for the masthead and footer on `--ink`), `logo-light.svg` (for light backgrounds: flyer, link preview image), `favicon.svg` (light version, used on light and dark tab bars). The PNG/ICO icons (`logo-512.png`, `favicon-32.png`, `favicon.ico`, `apple-touch-icon.png` on white) are made from the finished logo files, not from the SVG here. The link preview image `og-image.png` (1200x630: headline, the three loops, logo) is rendered by `npm run og-image` from `scripts/og-image.html` and `_includes/loops/*.svg`. |
| Pages | `_pages/*.md`, layout `page`, `permalink:` in the front matter; `toc:` adds the sub-navigation |
| Colour and type tokens | `_sass/_tokens.scss` |
| Docker setup | `docker/` (Dockerfile, compose.yml, entrypoint); driven by the `Makefile` |
| Seminar description and flyers | `_data/course/de.yml` and `en.yml` (text, agenda, key facts; shared by the flyers and /training/), `_flyers/*.md` (one per language), layout `flyer`, styles `_sass/_flyer-sheet.scss`; dates from `_data/events.yml` |
| Hero figure of the home page | `_includes/hero-loops.svg` (three loops through one spec); styles under `.hero-loops` in `_sass/_home.scss`. Its loop names and drivers repeat `_data/home.yml` by hand |
| Loop diagrams | `_includes/loops/*.svg` (inlined so they take the page colours); originals in `assets/img/loops/` |

Colour rule: blue is arc42 and architecture, green is req42 and requirements, the gradient marks where both meet. The scales are derived from the helix logo; what each step (100 to 700) is for is described at the top of `_sass/_tokens.scss`.

## Flyer

Each file in `_flyers/` is an A4 page at `/training/flyer-<name>/` (open it in the browser to check the layout). After the Jekyll build, `scripts/flyer-pdf.mjs` prints it with headless Chromium to the path in its `pdf:` front matter, e.g. `/assets/flyer-MAISPEC-systems42-DE.pdf`, and fails if the flyer no longer fits on one page. Shorten the text or tighten `_sass/_flyer-sheet.scss` then.

Locally (needs Node): `make flyer` builds the site and installs Playwright on first run. Without make: `npm install` and `npx playwright install --only-shell chromium` once, then `npm run flyer` after any Jekyll build.

The dev server (`make dev`) does not make the PDFs, so the PDF links give 404 there. While it runs, `npm run flyer` in a second terminal writes them into `_site`, where they stay until you run it again (`keep_files` in `_config.yml`). For the layout itself, the HTML pages `/training/flyer-de/` and `/training/flyer-en/` reload live.

## Open points

Things that are deliberately provisional. Check this list before the public release.

- **When the logo changes**, replace the files listed under Logo, check the colour scales in `_sass/_tokens.scss` (derived from the logo, see the comment there), rerun `npm run og-image` and bump `?v=` of its path in `_config.yml`, because LinkedIn caches the image by URL.
- **`/publications/` is set to `noindex` and is not in the sitemap**, because it has no content yet and search engines would treat it as a thin page. As soon as it has real content, remove `noindex: true` and `sitemap: false` from its front matter (`_pages/publications.md`). Otherwise it never shows up in search. `/imprint/`, `/privacy/` and `/search/` are also left out of the sitemap, but on purpose and for good.
- **Imprint and privacy** still say "Details to follow".
- **Structured data** (schema.org `Event` as JSON-LD, `_includes/event-jsonld.html`, fed by `_data/events.yml`) is in place on /training/ and the two seminar pages. Times and venue come from `events.yml` (`start_time`, `end_time`, `utc_offset`, `venue`); the offer carries only the regular `price_eur`, not the early-bird/alumni discount. Remember to set `utc_offset` to +02:00 for dates in summer time. Check after each change with Google's Rich Results Test.

## Deployment

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Jekyll 4, prints the flyers to PDF and deploys to GitHub Pages. The custom domain is set in `CNAME`.
