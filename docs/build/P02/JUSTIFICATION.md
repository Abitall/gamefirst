# P02 justification - obsidian pack

## Why the pack exists

`docs/BUILD-PLAN.md:103` assigns P02 to `library/packs/obsidian/`; the directory
exists but is empty. `docs/V0.3-BLUEPRINT.md:311` states the job: "Export
user-facing notes to an Obsidian vault; the repo remains the source of truth."
`docs/V0.3-BLUEPRINT.md:133` makes every pack optional and loaded on demand.

The parts around it own adjacent things, not this one. M01 owns the memory repo
and its eight fields (`library/core/memory/MEMORY-SCHEMA.md`), and explicitly does
not store game docs. D04, D07, D09, and D10 are Russian documents a person reads
(`docs/V0.3-BLUEPRINT.md:267`, `:270`, `:272`, `:273`), but none of them says how
those documents become linked notes. Without a contract, every export invents its
own folder names, frontmatter, and link style; the vault then drifts into a second
source of truth that nobody can diff. The pack supplies the missing reference
layer: layout, note card, link rules, export log, and the checks that keep the
vault a copy.

## Unit-by-unit necessity

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| Load line | Names the trigger and keeps the pack from loading on every task | An agent loads vault rules while writing game code | `docs/V0.3-BLUEPRINT.md:133` |
| Seven boundaries | Stops a vault edit from becoming a design change, a secret leak, a publish, or a second rulebook | The vault silently overrides the repo; a note may carry a name or a key | R4, X02, D03, D07; `template/docs/playtests/PLAYTEST.md:13`; `template/decisions.ru.md` |
| Vault tree | Fixes the four paths every reader and export agrees on | Every export invents folders; `INDEX.md` and the log move | `docs/V0.3-BLUEPRINT.md:311` |
| One sphere and a map card | Makes the graph readable and gives every note one parent | Notes float; the graph becomes a hairball; orphans are invisible | Obsidian practice; madr index analog |
| Six frontmatter keys | The smallest set that identifies, sources, dates, and links a note | A note cannot be traced, dated, or joined to its card | MEMORY-SCHEMA shape, reduced; madr frontmatter |
| Title as the wikilink target | One stable link key, independent of folders and renames | Links break on a move; duplicate titles become ambiguous | madr one-record-one-name |
| Search before create | One concept keeps one note | Synonyms fork into parallel notes that disagree | mem0 retrieval before write |
| Generated marking and drift | Separates agent output from person output and protects edits | The next export overwrites a person's correction | godot XML-generated reference |
| File naming | Keeps names linkable in Obsidian and safe on Windows | `#`, `|`, `:` break links or the filesystem | Project POSIX/Windows rule |
| Per-note checklist | Turns the contract into five yes/no lines | Checks become "looks fine" | `docs/REVIEW-RUBRIC.md:77` |
| Per-export checklist | Catches orphans, duplicates, missing links, and unsourced notes | A broken map passes because each note looks right | P01 checklist shape |
| Plain-Markdown pass and import check | Proves the vault works without Obsidian and stays a copy | The pack depends on a plugin; a drift goes unnoticed | basic-memory plain-text claim |
| Outputs table | Names who writes what and where the vault lives | The vault lands inside the repo and gets committed | `docs/V0.3-BLUEPRINT.md:311` |
| Holds and failures | Gives one stop line and a next action per failure | An agent retries, merges, or publishes to resolve a conflict | R4, X02, S03 |
| Cross-refs | Points to the owners of decisions, playtests, systems, memory, security | The pack duplicates them or drifts from them | `docs/V0.3-BLUEPRINT.md:267-273` |
| `templates/note-card.md` | A one-page fill-in card so every note starts the same | Each note invents sections; frontmatter is forgotten | madr fixed template |
| `selftest.mjs` | Proves manifest, files, hashes, encoding, caps, sections, and secrets, plus four negative cases | A pack can drift, ship an empty file, or keep a token | `library/packs/release/PACK.md:19` |
| Eight manifest keys | The smallest set a tool needs to install and verify a pack | Installers guess identity, files, and load mode | `library/packs/release/PACK.md:29-36` |

Shorter without loss? Per-sphere lists were cut because they change per game.
Obsidian settings and plugin walkthroughs were cut because the pack forbids
plugins. The YAML block is the only schema example; a second one for the map card
would repeat the first. Measured: PACK.md 5,739 chars = 1,435 tokens against the
1,500 cap; template 793 chars; selftest 215 lines against 250.

## Why a pack, not a rule, a skill, or a doc

Priority is mode > rules > skill > pack > docs. A rule would bind every task to
vault bookkeeping that matters only during an export. A skill would add steps and
compete with the skill that owns the export; the pack has no procedure, only
reference and checks. A doc would be Russian and unloadable on demand, and the
agent artifacts are English. The pack is loaded only when a vault is touched,
adds no authority, and disappears from context when unloaded.

## Design decisions

- **Six keys, not the eight memory fields.** `id`, `type`, `trigger`, `evidence`,
  `scope`, `expiry`, `replaces`, and `status` answer "is this lesson still valid"
  for M01. A vault note is a view: `source` and `checked` carry the proof,
  `sphere` carries the scope, and `links` carries the graph. Copying the memory
  schema would make the vault a second memory repo, which the boundary forbids.
- **Vault outside the repo, untracked.** A committed vault is a second source and
  a diff nobody reviews. The `Outputs` table allows a vault inside the repo only
  when `.gitignore` lists it, so the exception stays visible.
- **Russian notes, English pack.** D04, D07, D09, and D10 are RU
  (`docs/V0.3-BLUEPRINT.md:267-273`); the guide and the playtest protocol already
  carry the person's language. The pack itself is an agent artifact and stays
  English, like the rules and skills it references.
- **No plugins, no sync, no publish.** A plugin-only feature is a hold, never an
  install. Export writes local files; sending or syncing them is R4 publish and
  needs an explicit command (`library/core/rules/R4-commit-is-not-publish.md:12-22`).
- **Checks use grep and the file tree, not a runtime.** The vault must remain
  readable in any editor, so the selftest does not open a vault. Verified commands
  only; a missing plugin cannot fail a check.
- **Caps mirror the pack contract.** 1,500 tokens (6,000 chars), 250 lines,
  4,000 chars per template page, eight keys, hashes per file. Cross-referenced to
  `library/packs/release/PACK.md` instead of copying the contract block, so P02
  does not fork the shape P03-P07 will use.
- **Negative fixtures ship with the selftest.** A validator that only sees valid
  input proves nothing. The selftest copies itself to a temp folder, mutates it
  four ways, and asserts the named check fails: extra file, bad hash, string
  `files`, missing section.
- **`generated: true` plus a body line.** The flag is machine-checkable; the line
  names the generator for a person. Either alone is half a signal.
