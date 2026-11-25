# M01 — memory schema: justification

## Why this unit exists

| # | Unit | Why it exists | If removed | Source |
|---:|---|---|---|---|
| 1 | Header `id` | One stable handle for `replaces`, the index, and a diff. | An item cannot be referenced or retired. | basic-memory; MEMORY-INDEX |
| 2 | `type` | Routes an item to `rules/`, `skills/`, `lessons/`, `engines/`, `patterns/`, or `toolbox/`. | The loader scans everything and loads the wrong shape. | R6; S03 |
| 3 | `trigger` | One line the agent matches against the task. | An item exists but is never found. | R6; S01 |
| 4 | `evidence` | Separates a claim from a proven lesson; `accepted` needs a path. | Memory fills with opinions. | R6; E07 |
| 5 | `scope` | `all`, an engine pin, or a project; prevents a project lesson leaking everywhere. | One project's workaround contaminates the next. | graphiti; E07 |
| 6 | `expiry` | A lesson can go stale with an engine or a tool. | Old advice is loaded forever. | graphiti; R6 |
| 7 | `replaces` | One item can merge or retire another; no silent duplicates. | The library grows by near-copies. | mem0; R6 |
| 8 | `status` | `candidate`, `accepted`, `retired`; forward only. | A candidate and an accepted rule look identical. | mem0; S03 |
| 9 | Admission: second project or two failures | One success can be luck; two are evidence. | The library becomes a diary. | R6; E07 |
| 10 | Promotion via `retrospect` | The retro proposes, the user admits; the agent never self-accepts. | The agent grades its own homework. | S03; R6 |
| 11 | `MEMORY-INDEX.md` | One line per item; the index, not a directory scan, decides what loads. | Loading becomes non-deterministic. | basic-memory |
| 12 | Sync `pull/push/diff` | Copy, never submodule; local edits are not overwritten; the user reviews a diff. | A pull destroys work or a push bypasses review. | basic-memory; mem0 |
| 13 | Not stored | Game docs, code, assets, secrets, raw chats, unvalidated ideas stay out. | The memory repo becomes a second, stale game repo. | R5; R3 |
| 14 | Check `E07` | A fixture proves the fields, the index, and the admission gate. | The schema is prose, not a contract. | E07 |

## Deliberately absent

- No full-text search engine: the index and headers are enough for v0.3.
- No embeddings or vector DB: a separate product, not this schema.
- No automatic promotion: the user admits; the agent proposes.
- No game docs or code: links only.
- No `created` field: `expiry` and evidence dates carry the time signal; the
  index is regenerated.

## Consistency

- R6: add only after repeated failure; one in, one out; unused two projects ->
  remove/lessons.
- S03: the retro proposes; the user admits.
- E07: candidate with eight fields and one index line; `rules/` untouched.
- R3: no secrets, raw chats, or unvalidated external text.

## Size

3,130 chars / 782.5 tokens (chars/4) / 490 words / 77 lines. UTF-8 no BOM, LF,
ASCII, no `{{`, no trailing spaces.

## Risks and limits

1. **Status is forward-only.** A mistaken `accepted` needs a new item with
   `replaces`; that is deliberate but slow.
2. **Expiry is 12 months.** An engine pin can change sooner; the engine scope
   carries the pin, and a stale page is a blocker (R1).
3. **One `replaces` id.** A merge of three items needs a chain, not one field.
4. **Index scope.** The index is global; a project sees only matching scopes
   after `pull`.
5. **AGPL source.** basic-memory is AGPL-3.0; only the file/index idea is
   borrowed, no code.
