---
title: Mastering AI-Driven Specification
lede: Spezifikation für Requirements und Architektur als Basis für agentisches Software-Engineering
permalink: /training/maispec-de/
---

{% assign course = site.data.course.de %}
<div lang="de" markdown="1">

<p><a href="{{ '/training/' | relative_url }}#seminar">← Alle Termine</a></p>

{{ course.intro | markdownify }}

<dl class="facts">{% include course-facts.html course=course medium="web" %}</dl>

<p class="cta">{% for ev in site.data.events %}{% if ev.lang == "de" and ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Anmelden: {{ ev.day_range }}.{{ ev.date_iso | date: '%-m.%Y' }} ({{ ev.where_de }})</a> {% endif %}{% endfor %}</p>

{% include course-agenda.html course=course level=2 topics_id="agenda" %}
</div>
