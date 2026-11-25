# R5 — Sources

Nine repositories whose artifact answers some part of "what should a document be
worth, and when may it exist": four gamedev, three software, two AI-agent. Star
counts were read on 2026-11-25; quotes are verbatim, shortened with `…` only
where marked. Nothing was copied: no code, no license text, no paragraph. The
rule is a synthesis, and in three cases the borrow is a *rejection*.

Honest note on composition: three of the four gamedev entries are Godot
projects. They are kept because the artifacts are different in kind — a
generated reference, a separate ideas repository, and a set of runnable demos —
and no single entry covers the others.

## Gamedev (4)

### 1. godotengine/godot-docs — 5,923 stars

- URL: https://github.com/godotengine/godot-docs
- Artifact: `README.md` and the `classes/` folder.
- Quote: "The files in the `classes/` folder are derived from [Godot's main
  source repository]… and are distributed under the MIT license."
- Analogous to: a reference that is *derived* from the engine source rather than
  maintained beside it, so it cannot describe a class that does not exist.
- Borrowed: the direction of truth — the behavior lives in code, the text is a
  projection of it; and the corollary used in R5's "code wins" bullet.
- Rejected: Sphinx, the CC BY 3.0 documentation license, and the offline/ePub
  build matrix. A solo game needs none of that machinery.

### 2. godotengine/godot-proposals — 1,461 stars

- URL: https://github.com/godotengine/godot-proposals
- Artifact: `README.md`, "How to suggest improvements".
- Quote: "Here, the Godot community shares and discusses ideas to improve the
  engine." and "Bug reports are not a subject of the proposal process."
- Analogous to: a dedicated place for ideas about systems that do not exist yet,
  kept out of the manual and out of the bug tracker.
- Borrowed: the separation itself — an unbuilt idea has a home, and that home is
  not the documentation. R5 maps that home to BACKLOG (R9) and to "not allowed".
- Rejected: the GIP template, the evaluation process, and the discussions/issue
  split. Coordination cost for hundreds of contributors, not for one.

### 3. godotengine/godot-demo-projects — 9,833 stars

- URL: https://github.com/godotengine/godot-demo-projects
- Artifact: `README.md` and the per-feature project folders.
- Quote: "Each folder containing a `project.godot` file is a demo project meant
  to be used with Godot Engine".
- Analogous to: documentation you run. The smallest artifact per feature is a
  project that opens and plays, not a paragraph about it.
- Borrowed: "play it before writing about it" (R5 order, step 3) and the idea
  that one runnable artifact beats a page of description.
- Rejected: the branch-per-engine-version layout (`master`, `3.x`). Version
  pinning is N00's job, not a docs rule.

### 4. raysan5/raylib — 35,778 stars

- URL: https://github.com/raysan5/raylib
- Artifact: `README.md` plus the `examples/` collection it links.
- Quote: "Huge examples collection with [+220 code examples]!" and "Ready to
  learn? Jump to [code examples!]".
- Analogous to: the whole API fits a one-page cheat sheet; the detail lives in
  small runnable examples, not in prose chapters.
- Borrowed: the one-page map — a reader can hold the whole surface in one view —
  and the assumption that examples carry the detail.
- Rejected: the examples-as-marketing framing and the web-hosted demo loader.

## Software (3)

### 5. django/django — 91,892 stars

- URL: https://github.com/django/django
- Artifact: `docs/internals/contributing/writing-documentation.txt`.
- Quote: "Documentation changes generally come in two forms: … New features:
  documentation of features that have been added to the framework since the last
  release." Also: "Put `versionchanged` notes at the bottom of a section.
  Related changes in the same release can be collected in a single note", and
  "These checks are run automatically in CI and must pass before documentation
  changes can be merged."
- Analogous to: docs are edited in the same change as the code, small deltas are
  recorded as dated notes instead of rewrites, and a cheap automated check gates
  the docs.
- Borrowed: "features that have been added" as the only legal subject; the
  `versionchanged` delta habit (R5's "delta, not rewrite"); the minimal
  CI-gated check (R5's docs lint).
- Rejected: reST/Sphinx, the spelling and EPUB checks, the backport policy.
  Three checks is the ceiling here; Django's list is a publishing pipeline.

### 6. rust-lang/rust-clippy — 13,690 stars

- URL: https://github.com/rust-lang/rust-clippy
- Artifact: `book/src/development/adding_lints.md`, section "Documentation".
- Quote: "The final thing before submitting our PR is to add some documentation
  to our lint declaration." The required shape is "### What it does", "### Why
  is this bad?", "### Example".
- Analogous to: documentation is the last step of the work, written against a
  finished, tested unit, in a fixed three-field shape.
- Borrowed: "the final thing" as an ordering rule, and the fixed card (what /
  why / example) as the model for a system card that resists growth.
- Rejected: the `#[clippy::version]` bookkeeping and the "Why restrict this?"
  variant. Version tags belong to X03; the variant is a taxonomy R5 does not need.

### 7. mdn/content — 11,169 stars

- URL: https://github.com/mdn/content
- Artifact: `files/en-us/mdn/writing_guidelines/index.md`.
- Quote: "The sections outlined below describe our guidelines for _what_ we
  document and _how_ we do it on MDN Web Docs."
- Analogous to: separating *what deserves a document* from *how to write it* —
  the split R5 makes when it forbids whole document classes and leaves style
  alone.
- Borrowed: the separation, which lets R5 stay short and refuse to become a
  style guide; also the "one page per topic" instinct behind the page limit.
- Rejected: the 14,000-page corpus and its metadata front matter. Scale and
  tooling of a documentation product, not a game project.

## AI-agent workflow (2)

### 8. agentsmd/agents.md — 25,697 stars

- URL: https://github.com/agentsmd/agents.md
- Artifact: `README.md`, the format description and minimal example.
- Quote: "Think of AGENTS.md as a README for agents: a dedicated, predictable
  place to provide context and instructions to help AI coding agents work on
  your project."
- Analogous to: one canonical file at a known path, instead of instructions
  scattered across a dozen documents an agent may or may not read.
- Borrowed: "a dedicated, predictable place" — one fact, one file, one location;
  and the idea that the document is an entry point, not a store.
- Rejected: the multi-tool adoption table and the vendored example project. Both
  are ecosystem concerns, and the example is a second copy of a rule set.

### 9. google-gemini/gemini-cli — 109,090 stars

- URL: https://github.com/google-gemini/gemini-cli
- Artifact: `docs/reference/configuration.md`, "Context files (hierarchical
  instructional context)".
- Quote: "The system is designed to manage this instructional context
  hierarchically." The `context.memoryBoundaryMarkers` setting stops the upward
  search at "the first directory containing any of these markers."
- Analogous to: context loaded by proximity — the nearest file wins, and a
  boundary marker (`.git`) ends the walk — so the agent reads the smallest
  relevant set instead of everything.
- Borrowed: locality as the loading rule (a fact lives where it applies) and the
  visible count of loaded files as a cheap budget signal.
- Rejected: the configuration surface, its precedence order, and the
  footer/UI options. R5 states the property, not a loader.

## Considered, not counted

| Repository | Stars | Why not counted |
|---|---|---|
| github/spec-kit | 151,341 | Spec-driven development: the constitution is short and stable, but the product is a full spec → plan → tasks chain *before* code — the order R5 exists to prevent. Cited here as the counter-example, not as a source. |
| anthropics/claude-code | 156,899 | Largest agent repository, but its documentation-advice artifact lives on a website, not in the repo; no citable file with a rule about doc scope. |
| hajimehoshi/ebiten | 13,647 | Has a one-page cheat sheet, but it duplicates raylib's borrow; adding it would pad the count without adding an idea. |
| google/eng-practices | 23,272 | Good "review the code, not the description" material, but last push 2024-09-19; fails the currency preference, and R6 already covers process gatekeeping. |
| openai/codex | 136,394 | `AGENTS.md` handling duplicates entry 8; no document-scope rule of its own. |
| github/docs | 21,558 | Rejected only on access: `contributing.md` returned 404 and the guide had moved into the published site, which cannot be quoted from the repo. |
| kubernetes/community | 13,075 | Already cited by R1 for local verification; the doc artifact here would repeat that borrow. |

## Dead ends encountered

- The GitHub REST API returned HTTP 403 (rate limit) on every request from this
  machine, and `webfetch` on `api.github.com` returned the same 403. Stars were
  read through `ungh.cc`, a read-only GitHub mirror, on 2026-11-25. Numbers are
  live at read time, not rounded.
- `bevyengine/bevy` `docs/MIGRATION_GUIDES.md` returned 404 on both `main` and
  `latest`, and GitHub's tree listing timed out. Bevy was dropped: R1 already
  cites it for the review gate, and a second Bevy entry with an artifact that
  could not be read would be a guess.
- `python/cpython` `Misc/NEWS.d/README.rst` and `Misc/NEWS.d/next/README.rst`
  both returned 404. The one-fragment-per-change idea (the best analogue for
  "delta, not rewrite") was dropped with the source; Django's `versionchanged`
  notes carry that borrow instead.
- `google-gemini/gemini-cli` `docs/cli/configuration.md` returned 404; the same
  content now lives at `docs/reference/configuration.md`.
- `cline/cline` and `mapeditor/tiled` timed out at the mirror and were not
  retried; neither was needed to complete the set.
- `All-Hands-AI/OpenHands` microagent docs returned 404 at both candidate paths,
  so the "knowledge loaded on demand" borrow came from entry 9 instead.
