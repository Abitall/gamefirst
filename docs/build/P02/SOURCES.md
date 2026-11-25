# P02 sources - obsidian pack

Nine repositories, checked 2026-11-26. Star counts and licenses were read from
the public repository pages: `api.github.com` answered 403 with the rate limit at
0/60 on the shared address. Where GitHub reports `NOASSERTION`, the license named
in the repository README is recorded and marked.

## Gamedev

### 1. CleverRaven/Cataclysm-DDA

- URL: https://github.com/CleverRaven/Cataclysm-DDA
- Stars: 13,576
- License: CC BY-SA 3.0 (README; GitHub reports NOASSERTION)
- Artifact type: an in-repo contributor documentation corpus (`doc/MODDING.md`
  and neighbours) written per topic next to the content it describes.
- Analog: one topic, one page, listed once; the page sits at the thing it
  explains, so a reader can go from note to source in one step.
- Borrow: the vault's `source` field and the rule that a note is corrected at
  its source. A note without a path is not accepted.
- Reject: exotic JSON page formats and a docs build; the vault is plain
  Markdown. Also rejected: an English-only corpus as the model for RU notes.
- Note: `doc/README.md` and `doc/JSON_INFO.md` returned 404; `doc/MODDING.md`
  exists. The `LICENSE` path returned 404, so the license comes from the README.

### 2. godotengine/godot-docs

- URL: https://github.com/godotengine/godot-docs
- Stars: 5,936
- License: CC BY 3.0 (README; GitHub reports NOASSERTION)
- Artifact type: a documentation repository separate from the engine, with
  Sphinx sources (`conf.py`, `about/introduction.rst`) built per engine version.
- Analog: the surface a person reads is a build output of versioned sources; its
  revision is part of the artifact.
- Borrow: the `checked` date and the export date in `_export/log.md`; a rendered
  view always names the source revision it came from.
- Reject: the Sphinx/rst toolchain and version branches. A vault is one plain
  folder and does not need a build step.

### 3. OpenRCT2/OpenRCT2

- URL: https://github.com/OpenRCT2/OpenRCT2
- Stars: 16,608
- License: GPL-3.0
- Artifact type: `distribution/changelog.txt`, a player-facing changelog kept in
  the repo, released with the build: a version heading, then one line per change
  with its PR id.
- Analog: the player-facing text is derived from an existing engineering record
  and cites it; one line per change, newest first.
- Borrow: the vault note as a view of a record (`DECISIONS.md` block, playtest
  page) and the one-line-per-fact habit.
- Reject: shipping the vault inside the build, and the changelog's own format.
  GPL-3.0 text was not copied.

### 4. godotengine/godot

- URL: https://github.com/godotengine/godot
- Stars: 120,821
- License: MIT
- Artifact type: `doc/classes/Node.xml`, `doc/classes/Resource.xml` and
  neighbours: the hand-written XML source from which the class reference pages
  are generated.
- Analog: generated output is a marked view; a correction goes into the source
  and the page is regenerated, never patched in place.
- Borrow: `generated: true`, the source path, the generator line, and the rule
  that a person's edit is reported as drift instead of being overwritten.
- Reject: an XML schema and a generator for notes. Six frontmatter keys are
  enough, and the pack ships no runtime.

## Software

### 5. jackyzha0/quartz

- URL: https://github.com/jackyzha0/quartz
- Stars: 13,630
- License: MIT
- Artifact type: a static-site generator for a "digital garden": Markdown notes
  in, a linked website out (v5 README: "publish your digital garden and notes as
  a website for free").
- Analog: the published view and the source notes are separate artifacts; a
  change reaches the site only through an explicit build.
- Borrow: the vault as a read-only view, and the plain-Markdown folder as the
  input format. Export is a separate, explicit step (R4).
- Reject: the publishing pipeline, theme, and plugin ecosystem. The pack forbids
  publish and plugins, so none of that applies.

### 6. adr/madr

- URL: https://github.com/adr/madr
- Stars: 2,666
- License: MIT OR CC0-1.0 (GitHub reports NOASSERTION)
- Artifact type: a fixed one-file ADR template (`template/adr-template.md`) with
  YAML `status`, `date`, `decision-makers`, `consulted`, `informed`, plus an
  index that lists every record.
- Analog: one record per file, one fixed template, a unique name, and one index
  that owns the list.
- Borrow: the six-key frontmatter shape (title, sphere, source, generated,
  checked, links), the map card as an index, and supersede-by-link instead of
  rewriting history.
- Reject: the ADR process itself. `DECISIONS.md` owns decisions; the vault quotes
  a block and never decides. No license text was copied.

### 7. silverbulletmd/silverbullet

- URL: https://github.com/silverbulletmd/silverbullet
- Stars: 6,632
- License: MIT
- Artifact type: a Markdown-based knowledge base ("from personal notes to product
  docs and team wiki") where the files on disk are the store.
- Analog: the folder of `.md` files is the whole format; no database, no import
  step, no lock-in.
- Borrow: "plain Markdown is enough" as the fallback contract, and the idea that
  a human and an agent read the same files.
- Reject: the sync server and the in-app scripting space. The pack ships no
  runtime and no network write.

## AI-agent

### 8. mem0ai/mem0

- URL: https://github.com/mem0ai/mem0
- Stars: 69,470
- License: Apache-2.0
- Artifact type: a memory layer with scoped retrieval
  (`memory.search(query=..., filters={"user_id": user_id}, top_k=3)`) and entity
  linking across memories.
- Analog: retrieve before write, scoped to one owner, then link entities instead
  of duplicating them.
- Borrow: search-before-create (grep titles plus two synonyms), and `sphere` as
  the scope filter that keeps one note in one place.
- Reject: "Single-pass ADD-only extraction ... Memories accumulate; nothing is
  overwritten" (README). A vault that only appends accumulates contradictions;
  the pack updates a note in place and reports drift. No code was copied.

### 9. basicmachines-co/basic-memory

- URL: https://github.com/basicmachines-co/basic-memory
- Stars: 4,710
- License: AGPL-3.0
- Artifact type: a local-first knowledge base where "your knowledge lives as
  Markdown files that both you and your AI can read, write", synced by an MCP
  server.
- Analog: local plain-text files are the truth, and both sides edit the same
  files.
- Borrow: the vault lives on disk as Markdown, works offline, and is the same
  artifact for a person and an agent.
- Reject: automatic two-way sync. The pack's boundary is that the repo wins and
  an import is a diff a person applies; an agent must not write vault edits back.
  AGPL-3.0 means ideas only: no code, no text copied, and the pack has no
  dependency on the project.

## Dead ends

- `api.github.com` returned 403 ("rate limit ... 0/60") for every repository on
  the shared address; metadata was read from the public HTML pages instead.
- `Cataclysm-DDA/Cataclysm-DDA` returns 404; the canonical repository is
  `CleverRaven/Cataclysm-DDA`.
- `Veloren/veloren` was candidate #4 for a book-style docs artifact, but the
  repository has no `book/` directory; `Veloren/book` exists and has 21 stars,
  too small to cite. Replaced by `godotengine/godot`'s generated class reference.
- `FyroxEngine/Fyrox` has no book directory either (only CHANGELOG and
  ARCHITECTURE), so it could not support the docs analog.
- `OpenTTD/OpenTTD` (8,532 stars, GPL-2.0 via `COPYING.md`) has `changelog.md`
  and a `docs/` folder, but its player-facing changelog duplicates the OpenRCT2
  analog and it was cut to keep the four gamedev sources distinct.
- `quartz` documents itself mainly on its site, so only the claims in its README
  were used; the site was not treated as a source.
