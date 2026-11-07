---
title: Training
lede: Seminars and in-house consulting for agentic engineering with systems42.
permalink: /training/
toc:
  - {title: Seminar, id: seminar}
  - {title: In-house, id: in-house}
  - {title: 42 family seminars, id: family-seminars}
---

## Seminar {#seminar}

{% for ev in site.data.events %}
<div class="event" id="{{ ev.id }}">
  <div class="date"><b>{{ ev.day_range }}</b><span>{{ ev.month }}</span></div>
  <div>
    <h3>{{ ev.title }}</h3>
    <p>{{ ev.subtitle }}</p>
    {% if ev.trainers %}<p>With {{ ev.trainers | join: " and " }}</p>{% endif %}
    <p><b>{{ ev.where }}</b></p>
    <div class="cta">
      {% if ev.registration_open %}<a class="btn btn-blue" href="https://trainings.arc42.org/registration/?kurs={{ ev.arc42_id }}">Register</a>{% endif %}
      <a class="btn btn-outline" href="#about-seminar">About the seminar</a>
    </div>
  </div>
</div>
{% endfor %}

Seminar flyer as PDF: [English]({{ '/assets/flyer-MAISPEC-systems42-EN.pdf' | relative_url }}) · [German]({{ '/assets/flyer-MAISPEC-systems42-DE.pdf' | relative_url }})

### About the seminar {#about-seminar}

{% assign course = site.data.course.en %}
{{ course.intro | markdownify }}

<dl class="facts">{% include course-facts.html course=course medium="web" %}</dl>

{% include course-agenda.html course=course level=4 topics_id="agenda" %}

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
- [arc42 training](https://arc42.org/training)
