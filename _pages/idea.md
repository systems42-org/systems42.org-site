---
title: The idea of agentic engineering
lede: Why a spec, why these templates, and how AI loops keep them honest.
permalink: /idea/
toc:
  - {title: The spec, id: the-spec}
  - {title: Agentic loops, id: agentic-loops}
  - {title: "Plan, implement, reengineer", id: plan-implement-reengineer}
  - {title: Why systems42?, id: why-systems42}
  - {title: Technology, id: technology}
---

## The spec: the single source of truth {#the-spec}

The templates of req42 (for requirements) and arc42 (for architecture) capture the knowledge necessary to create systems and keep them alive. They have been used successfully for more than 20 years in many countries and domains.

Together they form the spec from which source code can be developed. systems42 treats this spec as the single source of truth: not a document written after the fact, but the contract every agent reads before it generates, tests or changes anything.

<div class="callout req"><strong>req42 · requirements</strong><p>Vision and goals, functional requirements, supporting models, roadmap, team and resources.</p></div>
<div class="callout arc"><strong>arc42 · architecture</strong><p>Solution strategy, building blocks, runtime, deployment, crosscutting concepts, decisions.</p></div>

## Agentic loops fill and check the spec {#agentic-loops}

Three loops run around the spec. Two are driven by AI, one is a conversation between humans and AI. All three ask for clarification where necessary.

### Ingest

Humans provide raw input and trigger the AI to fill the spec.

<ol class="steps">
<li><strong>Markdownify</strong>The input is transformed into clean, uniform markdown so further processing by AI is easier.</li>
<li><strong>Cross-check and link</strong>If the input can be assigned to one or more spec sections, those sections are filled and cross-linked.</li>
<li><strong>Ask questions</strong>If not, the AI creates questions or issues to be answered by a human, see Clarify.</li>
</ol>

### Audit

Audits can be time-triggered, for example after an ingest or at defined intervals, or explicitly triggered by humans.

<ol class="steps">
<li><strong>Detect issues</strong>The content of the spec is checked against predefined rules, guardrails and constraints.</li>
<li><strong>Flag gaps</strong>Missing, inconsistent or outdated parts are marked.</li>
<li><strong>Update backlog</strong>Every finding is added to the list of issues to be clarified by humans.</li>
</ol>

### Clarify

Clarify is triggered by humans who want to improve the existing spec by resolving issues or providing new rules and guardrails.

<ol class="steps">
<li><strong>Pick topic</strong>The AI presents the spec and the list of open issues as a dashboard. Humans pick one.</li>
<li><strong>Discuss</strong>Humans discuss the issue with the AI until there is a decision, or an explicit "cannot decide yet".</li>
<li><strong>Write back</strong>Humans ask the AI to update the spec, or the rules and guardrails, with the outcome of the discussion.</li>
</ol>

## Plan, implement, reengineer {#plan-implement-reengineer}

From the spec, agents plan and implement: they generate and test source code based on a plan derived from requirements and architecture. The reverse direction exists too. *Reengineer* recreates the systems42 spec from existing code, so that legacy systems can enter the same cycle.

## Why systems42? {#why-systems42}

For management the advantage is traceability and control. Every line of code can be mapped back to documented requirements and architectural decisions. Strategic decisions stay human, tactical execution goes agentic, and the spec is the handshake between the two.

## Technology {#technology}

systems42 keeps the spec as a markdown wiki in the style Andrej Karpathy described: plain files, versioned, readable by humans and machines alike, with dashboards for open issues and harnesses that run the loops.
