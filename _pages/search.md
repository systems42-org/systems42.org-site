---
title: Search
lede: Search all pages of systems42.org.
permalink: /search/
search: false
sitemap: false
---

<form class="search-page-form" action="{{ '/search/' | relative_url }}" method="get" role="search">
  <input type="search" name="q" id="search-page-input" placeholder="Search systems42.org" autocomplete="off" aria-label="Search">
</form>
<p class="search-page-status" id="search-page-status" aria-live="polite"></p>
<ul class="search-results search-results-page" id="search-page-results"></ul>
