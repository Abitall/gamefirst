# D01 — sources

Thin protocol: two external repositories and one accepted internal part. Each external source names its analogue and what was borrowed or rejected. No code is copied; the template's wording is original. Star counts are from the GitHub API on 2026-11-25.

## 1. othneildrew/Best-README-Template

- URL: https://github.com/othneildrew/Best-README-Template
- Stars on 2026-11-25: 16,501
- License: Unlicense (the repository ships an Unlicense text; GitHub's license API detects no key)
- Active: pushed 2026-04-18
- Artifact type: Markdown README template with a separate blank variant
- Analogue: a fill-in template for a document that must be complete before work starts. The blank file lists the fields; the author replaces fields instead of inventing structure.
- Quote: `BLANK_README.md` says "Here's a blank template to get started." The main README says "Use the `BLANK_README.md` to get started."
- Borrowed: the blank variant as a separate artifact; a visible fill token; a section order a reader can scan; the instruction to delete what is not needed instead of leaving commented-out scaffolding.
- Rejected: badges, logo, table of contents, installation and usage sections, license and contact boilerplate, and the "About the project" feature list. Those belong to a repository README, not to a one-page concept brief.

## 2. timbray/a-cloud-prfaq

- URL: https://github.com/timbray/a-cloud-prfaq
- Stars on 2026-11-25: 119
- License: MIT
- Active: pushed 2020-06-24
- Artifact type: a PR/FAQ decision document
- Analogue: a document written before the build to force a go or no-go decision. The headline comes first, the strongest objection gets its own answer, and demand is argued before capacity.
- Quote: the FAQ asks "**10. What will customers most dislike about the launch of A-Cloud?**", "**11. How do we know that this is what customers want?**", and "**7. Why are we doing this?**".
- Borrowed: the question that names the strongest objection, which becomes the kill criterion; the demand-before-build order, which becomes player fantasy and audience before constraints; the one-decision purpose.
- Rejected: the press-release fiction, customer quotes, pricing, appendices, and the multi-page FAQ. The brief is not a launch document and must stay one page.
- Weakness: 119 stars and a last push in 2020. It is an exact analogue but neither popular nor current, so the rubric's evidence test is weaker here. This is stated, not hidden. Alternatives were smaller (`punt-labs/prfaq`, 26 stars, 2026) or were generators rather than documents.

## 3. G0 concept brief (accepted internal part)

- URL: not applicable; internal artifact.
- Stars on 2026-11-25: not applicable.
- License: project-internal; no public license.
- Active: accepted in `docs/BUILD-PLAN.md` row 7.
- Artifact: `library/game/gates/G0-concept-brief.md`
- Analogue: the downstream contract that consumes the brief. It defines what the page must contain and how G0 decides.
- Quote: "One page, English." The kill criteria are "when the prototype is dropped, not how the player loses".
- Borrowed: the field order (player fantasy, core loop, audience, constraints, non-goals, kill criteria, next prototype question); the three-sentence loop with act, feedback, and next act; kill criteria as a prototype decision, not a player fail state; the next question as one a greybox can answer; the one-page limit.
- Rejected: G0's pillars, risks, and visual/audio line. They stay in the S06 output; D01 omits them because the caller's section list does. This is recorded in `JUSTIFICATION.md` and `REPORT.md`.

## Considered and rejected

- `punt-labs/prfaq` (26 stars, MIT, pushed 2026-11-23): current, but an AI-agent PR/FAQ generator, not a document template.
- `hotwax/press-release-faq` (6 stars, Apache-2.0, pushed 2026-07-10): a template, but too small to establish a practice.
- `r-lyeh-archived/pitch` (3 stars, CC0-1.0, pushed 2017-11-15): a real game pitch template, but not popular or current; a pitch is also a sales document, not a go/no-go brief.
- `LazyHatGuy/GDDMarkdownTemplate` (64 stars, license "Other", pushed 2023-02-11): a GDD template, the wrong shape for a one-page brief.
- `Roobyx/awesome-game-design` (723 stars, CC-BY-4.0, pushed 2026-10-23): a reading list, not a template.
- `DY-2026/GameDesignOS` (462 stars, MIT, pushed 2026-08-17): an AI design system, not an artifact to borrow structure from.
- GitHub searches for game design document, game pitch, one-page game design, game concept, and game idea templates returned only repositories with 0-43 stars. No popular gamedev one-page concept brief was found.

## License note

Best-README-Template is Unlicense (public domain); A-Cloud PR/FAQ is MIT; G0 is project-internal. Only short quotations are used, with attribution. No source code is copied. The template's prompts and structure are an original synthesis of the three sources, checked against the D01 section list.
