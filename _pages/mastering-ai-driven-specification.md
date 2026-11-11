---
title: Mastering AI-Driven Specification
lede: One specification for requirements and architecture as the foundation for agentic software engineering
description: "Two-day hands-on workshop: build a requirements and architecture specification with AI agents, then watch an agent generate code and tests from it. Online, in English."
permalink: /training/mastering-ai-driven-specification/
alternates:
  - {lang: en, url: /training/mastering-ai-driven-specification/}
  - {lang: de, url: /training/mastering-ai-driven-specification-de/}
  - {lang: x-default, url: /training/mastering-ai-driven-specification/}
---

{% assign course = site.data.course.en %}
<div markdown="1">

<p><a href="{{ '/training/' | relative_url }}#seminar">← All seminar dates</a></p>

<p class="badges"><span class="lang-badge lang-en">English</span>{% for ev in site.data.events %}{% if ev.lang == "en" %}{% assign wp = ev.where | replace: ", held in German", "" | replace: ", held in English", "" | split: " (" %}<span class="lang-badge place-badge">{{ wp[0] }}</span>{% endif %}{% endfor %}<a class="lang-switch" href="{{ '/training/mastering-ai-driven-specification-de/' | relative_url }}" hreflang="de" lang="de">Dieses Seminar auf Deutsch →</a></p>

{{ course.intro | markdownify }}

<dl class="facts">{% include course-facts.html course=course medium="web" %}</dl>

<p class="cta">{% for ev in site.data.events %}{% if ev.lang == "en" and ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Register: {{ ev.day_range }} {{ ev.month }}</a> {% endif %}{% endfor %}</p>

{% include course-agenda.html course=course level=2 topics_id="agenda" %}
</div>
