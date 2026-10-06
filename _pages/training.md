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
    <p>{{ ev.description }}</p>
    <div class="cta">
      <a class="btn btn-blue" href="#register">Register interest</a>
      <a class="btn btn-outline" href="#agenda">Agenda</a>
    </div>
  </div>
</div>
{% endfor %}

### Agenda {#agenda}

The detailed agenda will be published here. Expect three days: the spec and the single source of truth, the three loops with your own material, and rules and guardrails for your team.

### Register interest {#register}

Registration opens later in 2026. Until then, write to us and we put you on the list.

## In-house {#in-house}

We would love to demonstrate the systems42 approach to your development team. In German or English. Call us for in-house consulting and seminars.

## Seminars from the 42 family {#family-seminars}

Requirements with req42 and architecture with arc42 are the foundation. Both have long-running seminar programs you can join any time.

- [req42 seminars](https://req42.de)
- [arc42 training](https://arc42.org/training)
