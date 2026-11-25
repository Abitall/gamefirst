# E01 — Sources

Nine repositories, read on 2026-11-25. Star counts come from `ungh.cc`, which
mirrors the GitHub repository payload; they move, so the date is part of the
number. Licenses come from the repository license file, not from a badge. No
code or prose is copied; each entry records which structural idea was borrowed.

## Gamedev

### 1. godotengine/godot — 120,803 stars

<https://github.com/godotengine/godot> — MIT, pushed 2026-11-25.

- **Artifact:** `doc/classes/SceneTree.xml` — one XML file per engine class,
  with `<brief_description>`, `<description>`, members and methods. The class
  reference is generated from these files, not written twice.
- **Analogous to E01:** one canonical record per entity; the reader-facing index
  is derived from it.
- **Borrowed:** the system card is the only hand-written record of a system; a
  second copy is a derived view, not a new document to maintain.
- **Rejected:** the XML schema and the generator. A one-page card needs neither.

### 2. raysan5/raylib — 35,778 stars

<https://github.com/raysan5/raylib> — Zlib, pushed 2026-11-24.

- **Artifact:** `src/raylib.h`, where most declarations carry their behavior on
  the same line, e.g. `RLAPI void SetWindowTitle(const char *title); // Set
  title for window`. `CONVENTIONS.md` and `CHANGELOG` are short, separate, and
  do not repeat the header.
- **Analogous to E01:** the fact sits next to the code it describes; the
  changelog records the change in one line.
- **Borrowed:** a tuning change updates one line in one card; the code comment
  and the changelog do not restate it.
- **Rejected:** C header files as the documentation format.

### 3. phaserjs/phaser — 40,779 stars

<https://github.com/phaserjs/phaser> — MIT, pushed 2026-08-21.

- **Artifact:** JSDoc blocks in `src/gameobjects/GameObject.js` (class
  description, members, events). The API reference is generated from source;
  there is no parallel hand-written API spec.
- **Analogous to E01:** the source of truth is the code; the reference is a
  build product.
- **Borrowed:** write the doc about what exists, after it runs (R5); never
  maintain a second prose copy of a value that lives in code or data.
- **Rejected:** the JSDoc build pipeline and TypeScript typings.

### 4. bevyengine/bevy — 49,981 stars

<https://github.com/bevyengine/bevy> — MIT OR Apache-2.0, pushed 2026-11-24.

- **Artifact:** `examples/README.md` opens with
  `<!-- Use 'cargo run -p build-templated-pages -- build-example-page' to
  generate the final example README.md -->`. The example list is generated from
  the examples themselves.
- **Analogous to E01:** a list that would drift is generated; only the source
  entries are edited.
- **Borrowed:** do not hand-edit an index or a summary when the underlying file
  can be the single source; a new index is a new doc to keep in sync.
- **Rejected:** the Rust page generator and its templating.

## Software

### 5. changesets/changesets — 12,597 stars

<https://github.com/changesets/changesets> — MIT, pushed 2026-11-24.

- **Artifact:** `.changeset/open-bottles-fry.md` — YAML frontmatter naming the
  packages and bump types, then one paragraph. A PR adds one such file;
  `changeset version` assembles the changelog later. The repo holds several
  pending files, not one growing document.
- **Analogous to E01:** one small change, one small file; the aggregate is
  produced from the deltas.
- **Borrowed:** a change is recorded as a delta, not by rewriting a master
  document; the runner can assemble history without touching the source.
- **Rejected:** the release/versioning tool and its config.

### 6. architecture-decision-record/architecture-decision-record — 17,515 stars

<https://github.com/architecture-decision-record/architecture-decision-record> —
CC-BY-NC-SA-4.0 / OGL-UK-3.0, pushed 2026-11-21.

- **Artifact:** `README.md`: "An architecture decision record (ADR) is a
  document that captures an important architecture decision made along with its
  context and consequences." One record per decision; templates and examples
  are separate files.
- **Analogous to E01:** the decision log is for decisions, not for every edit.
  A tuning value is not an important architecture decision.
- **Borrowed:** `DECISIONS.md` stays byte-identical for a number change; the
  card is the only doc that moves.
- **Rejected:** the template set. The repository is non-commercial licensed;
  only the definition was read, and no template text is reused.

### 7. rust-lang/rfcs — 6,643 stars

<https://github.com/rust-lang/rfcs> — MIT OR Apache-2.0, pushed 2026-11-14.

- **Artifact:** `README.md`: "Many changes, including bug fixes and
  documentation improvements can be implemented and reviewed via the normal
  GitHub pull request workflow." It then reserves a design process for
  "substantial" changes.
- **Analogous to E01:** the default path is a normal PR; the heavyweight
  document is reserved for substantial changes.
- **Borrowed:** a tuning change takes the normal path — code, test, one card —
  and never opens an RFC/ADR-sized document.
- **Rejected:** the RFC template, the sub-team process, and the `text/` corpus.

## AI-agent

### 8. openai/codex — 136,394 stars

<https://github.com/openai/codex> — Apache-2.0, pushed 2026-11-25.

- **Artifact:** `codex-rs/apply-patch/src/{parser.rs,seek_sequence.rs,file_update.rs}`.
  The patch format carries context lines; `seek_sequence` locates them and the
  update is rejected when no match is found.
- **Analogous to E01:** the smallest diff that matches the current file; a
  mismatch is an error, not a reason to rewrite the file.
- **Borrowed:** the Pass condition is a three-file diff with exact paths; a
  patch that misses its context (a rewritten card, a moved file) fails.
- **Rejected:** the Rust patch engine and its streaming parser.

### 9. cline/cline — 71,891 stars

<https://github.com/cline/cline> — Apache-2.0, pushed 2026-11-23.

- **Artifact:** `.clinerules/` is split by topic: `storage.md`, `network.md`,
  `protobuf-development.md`, `general.md`. Each file governs one area; a
  storage change reads and edits `storage.md`, not a master rule file.
- **Analogous to E01:** one fact in one topic file; the blast radius of an edit
  is the matching file.
- **Borrowed:** the system card is scoped to one system; a tuning change edits
  that card and no other topic file.
- **Rejected:** the Cline rule loader and the product-specific file names.

## Synthesis

The nine split into three groups that answer different questions. Godot,
raylib, Phaser and Bevy show where a fact lives and how derived views are
generated: one canonical record, a comment next to the code, a generated index.
Changesets, ADR and rust-rfcs show when a document is warranted: one small file
per change, and a heavy record only for an important or substantial decision.
Codex and Cline show how an edit stays local: exact-context patches and
topic-scoped rule files. E01 combines them: the value moves in data, the test
moves with it, and exactly one scoped card moves with both.

## Considered and rejected

- **Aider-AI/aider** (50,239, Apache-2.0, last push 2026-05-22) — edit-format
  benchmarks are relevant, but six months without a push and a focus on patch
  benchmarks overlaps E03. Kept as an alternate, not a source.
- **SWE-agent** (20,869, MIT, active) — test-gated patches; overlaps E03's
  verify gate, so it adds no distinct unit here.
- **OpenHands** (94,315, MIT, active) — `.agents/skills/` is path-scoped and
  close to Cline's topic split; Cline was kept because the files are plain
  Markdown rules, not a skill loader.
- **google/eng-practices** (23,276, last push 2024-09-19) — "Small CLs" is the
  right principle but prose only, with no artifact to point at.
- **conventional-commits** (9,393, MIT) — message format, not document locality.
- **keep-a-changelog** (6,759, MIT) — one growing changelog is the pattern E01
  rejects in favour of a delta file.
- **kubernetes/enhancements** (3,991, Apache-2.0) — KEPs are the heavyweight
  path; useful as a contrast, not as a model for a tuning change.
- **godotengine/godot-demo-projects** (9,833, MIT) — fixture scale was already
  used by E03; no new unit for E01.

## License note

Only structural ideas were borrowed. No source file, template, or prose block
was copied. The ADR repository is CC-BY-NC-SA-4.0 / OGL-UK-3.0; its one-sentence
definition is quoted with attribution in this file only, and the eval does not
reproduce its templates. Star counts and push dates are read from the GitHub
page payload on 2026-11-25 and will drift.
