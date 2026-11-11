---
title: Mastering AI-Driven Specification
lede: One specification for requirements and architecture as the foundation for agentic software engineering
permalink: /training/maispec/
---

{% assign course = site.data.course.en %}
<div markdown="1">

<p><a href="{{ '/training/' | relative_url }}#seminar">← All seminar dates</a></p>

{{ course.intro | markdownify }}

<dl class="facts">{% include course-facts.html course=course medium="web" %}</dl>

<p class="cta">{% for ev in site.data.events %}{% if ev.lang == "en" and ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Register: {{ ev.day_range }} {{ ev.month }}</a> {% endif %}{% endfor %}</p>

{% include course-agenda.html course=course level=2 topics_id="agenda" %}
</div>
