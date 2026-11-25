# M01 — memory schema: report

## Summary

Machine-checkable schema for `game-agent-memory`, the separate knowledge
repository that outlives one game. It defines the header on every item, the
admission gate, the index, the sync contract, and what must not be stored.

Eight fields: `id`, `type`, `trigger`, `evidence`, `scope`, `expiry`, `replaces`,
`status`. A new item starts as `candidate`; `accepted` needs a second project or
two failures, and the user admits it in `retrospect` (S03). `MEMORY-INDEX.md` —
one line per item — decides what loads. Sync is copy, never submodule; `pull`
refuses to overwrite a local edit, `push` writes a candidate, `diff` writes
nothing.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 3,130 | - | - |
| Tokens (chars / 4) | 782.5 | 800 | 17.5 (2.2%) |
| Lines | 77 | one page | fits |
| Fields | 8 | - | - |

UTF-8 no BOM, LF, ASCII, no `{{`, no trailing spaces.

## Check

`m01-check.mjs`: YAML header parses; `id` regex; `type` routes to a directory;
`trigger` starts with `when `; `accepted` has an `evidence` path; `scope` is
`all`, an engine pin, or a project slug; `expiry` is at most 12 months out;
`replaces` is `none` or one id; `status` is forward-only; the index regenerates
from headers; `rules/` stays untouched in E07.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every field is used by admission, the index, sync, or a check. |
| 2 | Function | PASS | Trigger: a lesson/skill/tool is proposed. Input: proof. Output: a candidate or accepted item. Done: the index and a checker agree. |
| 3 | Evidence | CONCERNS | 5 sources: basic-memory ~4.7k AGPL-3.0, graphiti ~33k Apache-2.0, mem0 ~69k Apache-2.0, R6, S03. Two are large and relevant; basic-memory's AGPL limits reuse. |
| 4 | Blueprint fit | PASS | Target `library/core/memory/MEMORY-SCHEMA.md`; matches blueprint M01 and build plan row 94. |
| 5 | Consistency | PASS | R6 admission, S03 promotion, E07 fixture, R3 no-secrets, R5 one fact one place. |
| 6 | Language and encoding | PASS | English, UTF-8 no BOM, LF, ASCII, no `{{`. |
| 7 | Testability | PASS | Eight field checks, index regeneration, and the E07 fixture. |
| 8 | Size and density | PASS | 782.5 of 800; 77 lines; no prose beyond the rules. |
| 9 | Integration | CONCERNS | `expiry` is 12 months even when an engine pin changes sooner; one `replaces` id cannot merge three items; the index is global, not per project. |

Overall: 7 PASS, 2 CONCERNS. Review-ready.

## Open questions

1. **Status forward-only.** A mistaken `accepted` needs a new item with
   `replaces`; is that too slow? Recommendation: keep; admission is the point.
2. **Expiry vs engine pin.** A lesson tied to Phaser 4.2.1 can expire before 12
   months. Recommendation: `scope: engine:phaser@4.2.1` and a 6-month expiry for
   engine lessons.
3. **One `replaces`.** A three-way merge needs a chain. Recommendation: allow a
   comma list in v0.4, not v0.3.
4. **Global index.** A project sees only matching scopes after `pull`; the index
   still lists everything. Recommendation: keep one index; filter on read.
5. **AGPL source.** basic-memory is AGPL-3.0; only the idea is borrowed.
   Recommendation: keep; no code.
6. **Sync path.** `pull` writes into the game and `agent.lock.json`; who owns a
   conflict? Recommendation: CLI05 `diff` reports; the user resolves.

## Known weaknesses

- The schema is only as good as the evidence path; a fake path passes a regex.
- `expiry` needs a scheduler or a retro; nothing expires by itself.
- The index can drift from headers; the checker catches it only when run.

## Next action

Review with D07/D08/D09/D10, assemble Batch 15.
