---
title: The idea of agentic engineering
lede: Why a spec, why these templates, and how AI loops keep them honest.
permalink: /idea/
toc:
  - {title: Why systems42?, id: why-systems42}
  - {title: The spec, id: the-spec}
  - {title: "Plan, implement, reengineer", id: plan-implement-reengineer}
  - {title: Agentic loops, id: agentic-loops}
  - {title: Technology, id: technology}
seo_title: "Agentic Engineering: the Spec, the Loops, the Templates"
description: "Why one spec is the source of truth for agentic engineering, and how the Capture, Inspect and Clarify loops keep requirements and architecture honest."
---

## Why systems42? {#why-systems42}

AI agents generate code fast. What they lack is a lasting record of what the system must do and how it is built. systems42 gives them that record, the spec, and keeps it current.

For management the advantage is traceability and control. Code can be traced back to documented requirements and architecture decisions. Strategic decisions stay human, tactical execution goes agentic, and the spec keeps the two in step.

## The spec: the single source of truth {#the-spec}

The templates of req42 (for requirements) and arc42 (for architecture) capture the knowledge necessary to create systems and keep them alive. They have been used successfully for more than 20 years in many countries and domains.

Together they form the spec from which source code can be developed. systems42 treats this spec as the single source of truth: not a document written after the fact, but the contract every agent reads before it generates, tests or changes anything.

<div class="callout req"><strong>req42 · requirements</strong><p>Vision and goals, functional requirements, supporting models, roadmap, team and resources.</p></div>
<div class="callout arc"><strong>arc42 · architecture</strong><p>Solution strategy, building blocks, runtime, deployment, crosscutting concepts, decisions.</p></div>

## Plan, implement, reengineer {#plan-implement-reengineer}

From the spec, agents plan and implement: they generate and test source code based on a plan derived from requirements and architecture. The reverse direction exists too. *Reengineer* recreates the systems42 spec from existing code, so that legacy systems can enter the same cycle.

## Agentic loops fill and check the spec {#agentic-loops}

Three loops run around the spec. Two are driven by AI, one is a conversation between humans and AI. All three ask for clarification where necessary.

### Capture

<div class="idea-loop">{% include loop-figure.html name="capture" %}</div>

Humans provide raw input and trigger the AI to fill the spec.

<ol class="steps">
<li><strong>Markdownify</strong>The input is transformed into clean, uniform markdown so further processing by AI is easier.</li>
<li><strong>Cross-check and link</strong>If the input can be assigned to one or more spec sections, those sections are filled and cross-linked.</li>
<li><strong>Ask questions</strong>If not, the AI creates questions or issues to be answered by a human, see Clarify.</li>
</ol>

### Inspect

<div class="idea-loop">{% include loop-figure.html name="inspect" %}</div>

Inspections can be time-triggered, for example after a capture or at defined intervals, or explicitly triggered by humans.

<ol class="steps">
<li><strong>Detect issues</strong>The content of the spec is checked against predefined rules, guardrails and constraints.</li>
<li><strong>Flag gaps</strong>Missing, inconsistent or outdated parts are marked.</li>
<li><strong>Update backlog</strong>Every finding is added to the list of issues to be clarified by humans.</li>
</ol>

### Clarify

<div class="idea-loop">{% include loop-figure.html name="clarify" %}</div>

Clarify is triggered by humans who want to improve the existing spec by resolving issues or providing new rules and guardrails.

<ol class="steps">
<li><strong>Pick topic</strong>The AI presents the spec and the list of open issues as a <a href="https://dashboard.systems42.org">dashboard</a>. Humans pick one.</li>
<li><strong>Discuss</strong>Humans discuss the issue with the AI until there is a decision, or an explicit "cannot decide yet".</li>
<li><strong>Write back</strong>Humans ask the AI to update the spec, or the rules and guardrails, with the outcome of the discussion.</li>
</ol>

## Technology {#technology}

systems42 keeps the spec as a markdown wiki in the style Andrej Karpathy described: plain files, versioned, readable by humans and machines alike, with harnesses that run the loops.

People read the wiki through the **systems42 dashboard**: a read-only web view that searches the spec, traces requirements to architecture and decisions, shows source and status on every page, and lists the open issues that Clarify starts from. It never writes to the wiki. Try the live demo at [dashboard.systems42.org](https://dashboard.systems42.org).

<figure class="screenshot">
<a href="https://dashboard.systems42.org/demo/"><img class="shot-light" src="{{ '/assets/img/blog/dashboard-home.webp' | relative_url }}" width="1440" height="900" loading="lazy" alt="Home page of the systems42 dashboard: the vision sentence, a requirements card with 61 pages and 5 open issues, latest changes and open issues in the middle, and an architecture card."><img class="shot-dark" src="{{ '/assets/img/blog/dashboard-home-dark.webp' | relative_url }}" width="1440" height="900" loading="lazy" alt="Home page of the systems42 dashboard in dark mode: the vision sentence, a requirements card with 61 pages and 5 open issues, latest changes and open issues in the middle, and an architecture card."></a>
<figcaption>The home page of the live demo. It shows the dashboard's own requirements wiki.</figcaption>
</figure>
