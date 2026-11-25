# D10 — sources

Protocol: thin, exactly three sources: two external analogs and one accepted internal part. Stars and last-push dates were read from the GitHub API on 2026-11-25. No source text is copied; the wording of D10 is original Russian prose. Short paraphrases below are for review, not for reuse.

## 1. log4brains

- **URL:** https://github.com/thomvaill/log4brains
- **Stars (2026-11-25):** 1,613
- **License:** Apache-2.0
- **Last push:** 2024-12-17
- **Analog:** docs-as-code architecture decision records. Authors write immutable decision records in the repository; the tool publishes a chronological, linked web view over them.
- **Borrowed:**
  - The digest is a view over an immutable log, not a second log.
  - Records are chronological; the human view may reverse the order for reading.
  - Each row links to its record.
  - The record is the source of truth; the view follows it.
  - The view can be regenerated or republished; it does not own the data.
- **Rejected:**
  - A static-site generator, npm dependency, and build step. D10 is one Markdown file.
  - The ADR status lifecycle (proposed, accepted, rejected, deprecated, superseded). D10 removes a replaced row and names the date; D03 keeps the history.
  - The `adr` CLI, multi-package configuration, numbering, web UI, search, and graph.
- **What changed in D10:** the "view, not a journal" rule in the intro; the date link; the rule that a replaced row leaves the window while the journal keeps the block.
- **Dead end?** No. The conceptual borrow is direct; the tool itself is not adopted.

## 2. Keep a Changelog

- **URL:** https://github.com/olivierlacan/keep-a-changelog
- **Stars (2026-11-25):** 6,763
- **License:** MIT
- **Last push:** 2026-11-10
- **Analog:** a curated, human-readable changelog: notable changes, latest first, dated, linked, and written for people rather than machines.
- **Borrowed:**
  - The audience is human; the file is not a raw activity log.
  - Latest entry first.
  - A date on every entry.
  - Entries are linkable.
  - ISO dates (`YYYY-MM-DD`).
  - Rewrite an entry only with a good reason.
  - An inconsistent changelog is as dangerous as no changelog; update it immediately after the change.
  - Curated, not generated from commits.
- **Rejected:**
  - Version sections (Added, Changed, Fixed, Removed). D10 is decision-centric, not release-centric.
  - Semantic version numbers and release headings. A decision has no version.
  - An "Unreleased" section. A decision is dated when it is made, not when it ships.
  - Grouping by release. D10 is chronological.
  - The changelog file name and site.
- **What changed in D10:** newest first; date per row; link per row; the no-rewrite rule; the one-minute, human-first framing; the warning that a missed update makes the page false.
- **Dead end?** No. The principles transfer; the release machinery does not.

## 3. DECISIONS.md (D03)

- **URL / path:** `staging/D03/artifact/template/DECISIONS.md` (target `template/DECISIONS.md`)
- **Stars:** not applicable (internal, not a public repository)
- **License:** project text; no external license; not copied from a third party
- **Status:** accepted, BUILD-PLAN row 86
- **Analog:** the append-only decision journal itself. D10 is its human view.
- **Borrowed:**
  - Admission test: costly to reverse, changes what ships, or a gate/checkpoint (G0, G1, G2, G2.5, G3).
  - The date is the day of the choice, not the day it was written.
  - One block per choice; one row per decision.
  - Append-only; newest wins; a correction is a new block naming the date it replaces, and the old block stays.
  - The fields Decision, Why, and Consequences become `Решено`, `Почему`, `Меняет`.
  - Evidence must name an artifact a later reader can open; a decision with no evidence is a plan.
  - Alternatives, owner, and evidence stay in the journal.
  - A01 owns the journal; a gate line is the human's signature.
- **Rejected:**
  - Copying a block, including its ten-line limit and all six fields, into D10.
  - The gate signature in the digest. D10 has no signature.
  - A full translation of the journal.
  - The `## [date]` placeholder as a literal heading. D10 uses a real date in the sample and assumes D03 replaces the slot.
- **What changed in D10:** the admission test, the date rule, the authority model, the one-row-per-choice rule, and the block-first rule.
- **Dead end?** No. It is the source.

## Dead ends

1. **`mrwilson/adr-viewer`** — https://github.com/mrwilson/adr-viewer — 197 stars, MIT, last push 2024-12-02. A generated web view of ADRs, but smaller and without publication or timeline. log4brains already supplies the "view over records" borrow, so this adds no second idea. Not adopted.
2. **`github-changelog-generator/github-changelog-generator`** — https://github.com/github-changelog-generator/github-changelog-generator — 7,542 stars, MIT, last push 2026-03-18. Generates a changelog from tags, issues, and pull requests. The result is an activity log, not a curated decision digest; Keep a Changelog itself warns against treating such a log as a changelog. Rejected.
3. **Wrong path:** a first attempt at `thomvaill/adr-viewer` returned 404. The real project is `mrwilson/adr-viewer`; the mistake cost one request and is recorded so a later reader does not repeat it.

`npryce/adr-tools` is already covered by D03 and is not repeated here: the thin protocol allows one internal source, and D03 is the accepted part D10 must follow.

## License note

- log4brains is Apache-2.0. No code, configuration, or prose is copied. The idea of publishing a view over immutable records is used conceptually; D10's text is original.
- Keep a Changelog is MIT. No text is copied. The principles are paraphrased; the site's wording, examples, and structure are not reproduced.
- D03 is project text with no external license. D10 paraphrases its rules and links to its blocks; it does not copy a block.
- The Russian wording of `decisions.ru.md` is original. No source is translated verbatim.

## What was not used

- No static-site generator, no npm package, no build step.
- No ADR numbering, status lifecycle, or web UI.
- No automatic generation from commits, tags, or issues.
- No release/version sections, SemVer, or "Unreleased" heading.
- No second copy of the journal's alternatives, owner, or evidence.
