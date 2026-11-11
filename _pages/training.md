---
title: Training
lede: Seminars and in-house consulting for agentic engineering with systems42.
description: "Seminars and in-house consulting for agentic engineering with systems42: Mastering AI-Driven Specification, in Vienna (German) and online (English)."
permalink: /training/
toc:
  - {title: Seminar, id: seminar}
  - {title: In-house, id: in-house}
  - {title: 42 family seminars, id: family-seminars}
seo_title: "Training: Mastering AI-Driven Specification"
---

## Seminar {#seminar}

{% for ev in site.data.events %}
<div class="event" id="{{ ev.id }}">
  <div class="date"><span class="days">{{ ev.day_range }}</span><b>{{ ev.month | split: " " | first }}</b><span class="year">{{ ev.month | split: " " | last }}</span>
    {% assign where_clean = ev.where | replace: ", held in German", "" | replace: ", held in English", "" %}{% assign where_parts = where_clean | split: " (" %}
    <p class="badges"><span class="lang-badge lang-{{ ev.lang }}">{% if ev.lang == "de" %}German{% else %}English{% endif %}</span>{% assign place = where_parts[0] %}{% include place-badge.html place=place %}</p>
  </div>
  <div>
    <h3>{{ ev.title }}</h3>
    {% if ev.lang == "de" %}<p lang="de">{{ site.data.course.de.subtitle }}</p>{% else %}<p>{{ ev.subtitle }}</p>{% endif %}
    {% if ev.trainers %}<p>With {{ ev.trainers | join: " and " }}</p>{% endif %}
    {% if where_parts.size > 1 %}{% assign extra = where_parts[1] | remove: ")" %}<p>{{ extra | slice: 0 | upcase }}{{ extra | slice: 1, 100 }}</p>{% endif %}
    <div class="cta">
      {% if ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Register</a>{% endif %}
      {% if ev.lang == "de" %}<a class="btn btn-outline" href="{{ '/training/mastering-ai-driven-specification-de/' | relative_url }}" hreflang="de" lang="de">Mehr Infos</a>{% else %}<a class="btn btn-outline" href="{{ '/training/mastering-ai-driven-specification/' | relative_url }}">More info</a>{% endif %}
      {% assign flyer = site.flyers | where: "lang", ev.lang | first %}
      {% if flyer %}{% capture flyer_label %}Flyer (PDF, {% if ev.lang == "de" %}German{% else %}English{% endif %}){% endcapture %}<a class="btn btn-outline btn-icon" href="{{ flyer.pdf | relative_url }}" hreflang="{{ ev.lang }}" download data-tip="{{ flyer_label }}" aria-label="{{ flyer_label }}"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></svg></a>{% endif %}
    </div>
  </div>
</div>
{% endfor %}

{% for ev in site.data.events %}{% include event-jsonld.html ev=ev %}{% endfor %}

### Registration {#register}

{% assign open_events = site.data.events | where: "registration_open", true %}
{% if open_events.size > 0 %}
Registration runs through the training site of our sister project arc42: the Register button opens its form with your date already selected. You confirm your e-mail address with a code from the confirmation mail, then we get in touch.

The dates are also listed with all other courses at [trainings.arc42.org](https://trainings.arc42.org/).
{% else %}
Registration opens shortly through the training site of our sister project arc42. Until then, write to us and we put you on the list.
{% endif %}

## In-house {#in-house}

We would love to demonstrate the systems42 approach to your development team. In German or English. Call us for in-house consulting and seminars.

## Seminars from the 42 family {#family-seminars}

Requirements with req42 and architecture with arc42 are the foundation. Both have long-running seminar programs you can join any time.

- [req42 seminars](https://req42.de)
- [arc42 training](https://trainings.arc42.org/)
