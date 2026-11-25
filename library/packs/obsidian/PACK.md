# Obsidian pack

## When to load

Load on demand: a person wants project knowledge in an Obsidian vault, exported
notes start disagreeing with the repo, or a reading set goes to someone who will
not open the repository. This pack adds the reference layer: vault layout, note
card, link rules, export log, and the checks that keep the vault a copy. The
repository stays the source of truth; the vault is a view. Obsidian is optional:
the same folder opens in any editor as plain Markdown. The pack writes no game
docs, installs nothing, syncs nothing, publishes nothing.

## Boundaries

- The repo wins. A vault edit is a proposal; an import is a diff a person applies
  (D03). The agent never writes a vault note back into a game or design doc.
- No secrets, credentials, `.env` values, or personal data. Playtest people stay
  `P1`-`P5`; a note that needs a name or a key is a hold (X02, D07).
- No publish, spend, cloud sync, shared link, or plugin install (R4, E12).
  Export writes local files only.
- No new rules, priorities, or design decisions. A note quotes `DECISIONS.md`; it
  never decides.
- Not the memory repo (M01), not a second `DECISIONS.md`, not a wiki. A note
  links to its source path and stops there.
- Agent artifacts stay English; what a person reads is Russian (D04, D07, D09,
  D10). The pack is EN, the note card is RU.
- A wrong note is corrected at the source and re-exported, never patched in the
  vault.

## Vault and note contract

One sphere is one folder with a map card of the same name:

```text
<vault>/
  INDEX.md              # map of maps: one line per sphere
  <Sphere>/
    <Sphere>.md         # map card: purpose, entry points, every member note
    <note>.md
  _export/
    log.md              # per note: source path, sha256, export date
```

Every note carries exactly these six frontmatter keys:

```yaml
---
title: "<unique title, RU>"
sphere: "<folder name>"
source: "<repo path, or manual>"
generated: false
checked: "<YYYY-MM-DD>"
links: "<comma-separated titles, or none>"
---
```

- One sphere per note. A note that fits two spheres is split, or lives in one and
  links to the other; the card owns the entry.
- The title is unique in the vault and is the wikilink target: `[[title]]`. Link
  a title, never a path, a heading, or an alias alone.
- Every note links up to its map card; the card links down to every member. A
  note missing from its card is not in the map and is not done.
- Search before create: grep titles and two synonyms. An existing note is
  updated; one concept keeps one note.
- Generated notes set `generated: true`, keep the `source` path, and name the
  generator on one line. A person may edit a generated note; the next export
  reports the drift instead of overwriting it.
- File names: letters, digits, space, hyphen, underscore; no `#` `^` `[` `]` `|`
  `:` `*` `?`, no leading dot; `.md`, UTF-8, LF. Russian names are fine; a slash
  never appears in a title.
- `INDEX.md` lists every sphere once; `_export/log.md` is the only record of
  what came from where.

## Checklist

Per note:
- [ ] `source` exists and every fact matches it; the repo, not the note, is right.
- [ ] One sphere, listed on its map card, and every `[[link]]` resolves.
- [ ] Six frontmatter keys, `checked` is today, title unique.
- [ ] Russian body; no secret, no personal data, no copied block over ten lines.
- [ ] `generated` is true for anything an agent wrote, false otherwise.

Per export:
- [ ] `INDEX.md` and the cards list the same spheres; no orphan note.
- [ ] No note without a source; no fact quoted by two notes.
- [ ] A `[[...]]` scan finds zero missing titles.
- [ ] Plain-Markdown pass: the folder opens with no plugin, links read as text,
      and the tree reads as a table of contents.
- [ ] Import check: copy one note next to its source, diff, delete the copy. A
      difference is reported, never merged; the repo stays unchanged.

## Outputs

| Output | Path | Owner |
|---|---|---|
| Vault | `../<game>-vault/`, outside the repo and untracked | person |
| Export log | `<vault>/_export/log.md`, append-only | agent |
| Note card | `templates/note-card.md`, copied per note | agent |
| Source map | the `source` field and the log; no copy in git | agent |

A vault inside the repo is allowed only when `.gitignore` lists it; a committed
vault breaks the boundary above.

## Holds and failures

Stop, report in one line, and wait; never retry blindly:

- a secret, key, token, or personal data in a source or a note: redact the
  value, cite the path, tell the person (X02);
- a note whose source is missing, moved, or contradicts it: the source wins;
- a duplicate title, an orphan note, or a wikilink with no target;
- a vault edit presented as a game change, or an import with no diff;
- a note that needs a decision, a rule, or a priority: write `DECISIONS.md` or
  `BACKLOG.md` first, then export;
- Obsidian absent: export still runs; the check is the file tree plus a text
  search. A plugin-only feature is a hold, not a reason to install a plugin.

A green checklist means the copy is consistent; it never means the game changed.

## Cross-refs

- `DECISIONS.md` (D03), `decisions.ru.md` (D10): the decision and its RU line.
- `docs/playtests/*.md` (D07): the anonymised session a note may quote.
- `docs/systems/*.md` (D06), `docs/engine/*.md` (D08): system and engine facts.
- `BRIEF.md` (D01), `GAME.md` and `TASTE` (D04), `docs/guide/README.md` (D09).
- M01: the vault is not the memory repo; a durable lesson goes there via S03.
- X02: secrets and personal data. R4, E12: no publish, no spend.
- Shape and caps: `library/packs/release/PACK.md`, "Pack contract".
- S03 owns the retro; S13 owns release; gate lines (G0-G3) are the person's.
