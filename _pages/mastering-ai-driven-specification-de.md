---
title: Mastering AI-Driven Specification
lede: Spezifikation für Requirements und Architektur als Basis für agentisches Software-Engineering
description: "Zweitägiger Hands-on-Workshop: Spezifikation für Requirements und Architektur mit KI-Agenten erstellen und live erleben, wie ein Agent daraus Code und Tests generiert. In Wien, auf Deutsch."
permalink: /training/mastering-ai-driven-specification-de/
locale: de_AT
alternates:
  - {lang: en, url: /training/mastering-ai-driven-specification/}
  - {lang: de, url: /training/mastering-ai-driven-specification-de/}
  - {lang: x-default, url: /training/mastering-ai-driven-specification/}
seo_title: "Mastering AI-Driven Specification: Seminar in Wien (Deutsch)"
---

{% assign course = site.data.course.de %}
{% for ev in site.data.events %}{% if ev.lang == "de" %}{% include event-jsonld.html ev=ev %}{% endif %}{% endfor %}
<div lang="de" markdown="1">

<p><a href="{{ '/training/' | relative_url }}#seminar">← Alle Termine</a></p>

<p class="badges"><span class="lang-badge lang-de">Deutsch</span>{% for ev in site.data.events %}{% if ev.lang == "de" %}{% assign wp = ev.where_de | replace: ", auf Deutsch", "" | replace: ", auf Englisch", "" | split: " (" %}{% assign place = wp[0] %}{% include place-badge.html place=place %}{% endif %}{% endfor %}<a class="lang-switch" href="{{ '/training/mastering-ai-driven-specification/' | relative_url }}" hreflang="en" lang="en">This seminar in English →</a></p>

{{ course.intro | markdownify }}

<dl class="facts">{% include course-facts.html course=course medium="web" %}</dl>

<p class="cta">{% for ev in site.data.events %}{% if ev.lang == "de" and ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Anmelden: {{ ev.day_range }}.{{ ev.date_iso | date: '%-m.%Y' }} ({{ ev.where_de }})</a> {% endif %}{% endfor %}</p>

{% include course-agenda.html course=course level=2 topics_id="agenda" %}
</div>
