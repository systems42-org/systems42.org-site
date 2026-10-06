.DEFAULT_GOAL := help

# Fixed local dev port for this site (arc42.org uses 4200). Changing it here is
# not enough: docker/compose.yml and docker/Dockerfile pass the same number to Jekyll.
SITE_PORT ?= 4242
COMPOSE := docker compose -f docker/compose.yml

.PHONY: help dev build stop site check-links lock clean install update shell logs

help: ## Show this help
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-12s\033[0m %s\n", $$1, $$2}'

dev: Gemfile.lock ## Start the local Jekyll dev server with live reload (http://localhost:4242)
	@echo "==> Open http://localhost:$(SITE_PORT)  (not http://0.0.0.0:$(SITE_PORT), Firefox refuses that)"
	@$(COMPOSE) down --remove-orphans >/dev/null 2>&1 || true
	@holder=$$(docker ps --filter "publish=$(SITE_PORT)" --format '{{.Names}}'); \
	if [ -n "$$holder" ]; then \
		echo "==> Port $(SITE_PORT) is already in use by container $$holder. Stop it first: docker stop $$holder"; \
		exit 1; \
	fi
	$(COMPOSE) up --build

build: Gemfile.lock ## Build the Docker dev image (systems42-site:latest) from the Gemfile-pinned gems
	$(COMPOSE) build

stop: ## Stop and remove the running dev container
	$(COMPOSE) down

site: build ## Generate the static site into _site/ (production settings)
	$(COMPOSE) run --rm -e JEKYLL_ENV=production jekyll bundle exec jekyll build

check-links: site ## Validate internal links, images and HTML in the built _site (html-proofer)
	$(COMPOSE) run --rm jekyll bundle exec htmlproofer ./_site --disable-external --allow-hash-href --ignore-urls '/^\/privacy\/|^\/imprint\//'

lock: ## (Re)create Gemfile.lock without any local Ruby, using the official ruby image
	docker run --rm -v "$(CURDIR)":/site -w /site ruby:3.4-slim sh -c "gem install bundler:2.6.9 >/dev/null && bundle lock"

Gemfile.lock:
	$(MAKE) lock

clean: ## Remove generated _site and the Docker cache volumes (a full reset)
	rm -rf _site .sass-cache .jekyll-cache .jekyll-metadata
	-$(COMPOSE) down -v --remove-orphans

install: build ## Install/refresh gems into the dev image after editing the Gemfile
	$(COMPOSE) run --rm jekyll bundle install

update: build ## Update gems to their latest allowed versions (rewrites Gemfile.lock)
	$(COMPOSE) run --rm jekyll bundle update

shell: build ## Open a shell inside the dev container
	$(COMPOSE) run --rm jekyll bash

logs: ## Tail logs from the running dev container
	$(COMPOSE) logs -f jekyll
