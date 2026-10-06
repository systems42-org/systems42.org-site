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
| Logo | `assets/img/logo.svg` (vector); PNG/ICO icons are generated from it |
| Pages | `_pages/*.md`, layout `page`, `permalink:` in the front matter; `toc:` adds the sub-navigation |
| Colour and type tokens | `_sass/_tokens.scss` |
| Docker setup | `docker/` (Dockerfile, compose.yml, entrypoint); driven by the `Makefile` |
| Loop diagrams | `_includes/loops/*.svg` (inlined so they take the page colours); originals in `assets/img/loops/` |

Colour rule: blue is arc42 and architecture, green is req42 and requirements, the gradient marks where both meet.

## Deployment

Pushes to `main` run `.github/workflows/pages.yml`, which builds with Jekyll 4 and deploys to GitHub Pages. The custom domain is set in `CNAME`.
