---
layout: post
title: "The systems42 dashboard: answers faster than asking a colleague"
lede: A read-only view of the spec that shows what is required, why, how firm it is and what is still open.
author: Gernot Starke
---

A spec only helps if people read it. In systems42 the spec is a markdown wiki: plain files, versioned in git, written by humans and AI agents in the Capture, Inspect and Clarify loops. Agents read those files without trouble. Most people do not want to open a folder of markdown files to find out why a requirement exists or who decided it.

The systems42 dashboard is the view for those people. It turns the wiki into web pages you browse and search in the browser. A live demo runs at [dashboard.systems42.org](https://dashboard.systems42.org).

<figure class="screenshot">
<a href="https://dashboard.systems42.org/demo/"><img class="shot-light" src="{{ '/assets/img/blog/dashboard-home.webp' | relative_url }}" width="1440" height="900" loading="lazy" alt="Home page of the systems42 dashboard: the vision sentence, a requirements card with 61 pages and 5 open issues, latest changes and open issues in the middle, and an architecture card."><img class="shot-dark" src="{{ '/assets/img/blog/dashboard-home-dark.webp' | relative_url }}" width="1440" height="900" loading="lazy" alt="Home page of the systems42 dashboard in dark mode: the vision sentence, a requirements card with 61 pages and 5 open issues, latest changes and open issues in the middle, and an architecture card."></a>
<figcaption>The home page of the live demo. It shows the dashboard's own requirements wiki.</figcaption>
</figure>

## The vision in one sentence

For everyone who works on a system and has a question about its requirements or architecture, the dashboard is a read-only view of the systems42 wiki that gives the answer faster than asking a colleague, and shows where it came from and how firm it is.

We made "faster than asking a colleague" testable: a reader who has never seen the wiki answers 8 of 10 prepared questions correctly, within 60 seconds each. We have not measured a baseline yet.

## Five ideas behind it

**Read only.** The dashboard never writes a file into the wiki's repository. Corrections, new requirements and status changes happen in the wiki, through the loops. That keeps one record, written in one place, and a viewer that cannot damage it.

**Source and status on every statement.** Each page shows whether it is a draft or accepted, and which raw sources it came from. Nobody should act on a draft believing it is agreed.

**Traced in both directions.** From a requirement you reach the goal it serves, the building blocks that implement it and the decisions behind them. From a building block or decision you get back to the requirements. The dashboard shows each such link on both pages.

**Open questions in plain sight.** Issues found by Inspect appear in one list, on the pages they affect and as a count on each section. This is where Clarify starts: pick an open point, discuss it, write the outcome back.

**Search that forgives.** Search finds pages by ID, title, tag, alias and glossary term, tolerates typos and accepts questions typed the way you would ask them, such as `who starts the app`. For every non-exact hit it says why it matched, for example "matches 2 of 3 words".

## One dashboard for every wiki

The dashboard is a product with numbered releases. A wiki pins a release in `_system/wiki.yaml`, sets its name and brand there, and starts it with one launcher script, `dashboard.sh`, in Docker. No wiki keeps its own copy of the code, so a fix reaches every wiki with the next release.

The dashboard shows the metamodel of systems42, it does not define it. Which parts of req42 and arc42 a project uses is decided in the wiki. The dashboard follows that tailoring.

## Built for workshops

Start the dashboard on the facilitator's laptop. Participants scan a QR code and open the same wiki on their phones, with nothing to install. The first browser to connect controls a temporary view, for example to hide sections that do not matter for today's session. The view leaves no trace in the project.

## Eating our own cooking

The dashboard's requirements are themselves a systems42 wiki: stakeholders, goals, functional requirements, constraints and decisions, captured from raw notes and grilling sessions. The dashboard shows them. Every feature started as a page in that wiki.

The dashboard is a proof of concept. It has no login, so run live sessions only on a network you trust. For public reading, the static export on [dashboard.systems42.org](https://dashboard.systems42.org) shows the same pages without a running server.
