# Batch 15 review — D07, D08, D09, D10, M01

Verdict: **PASS** (5/5 parts accepted).

## Parts

| ID | Target | Size | Lines | Sources | Verdict |
|---|---|---:|---:|---:|---|
| D07 | `template/docs/playtests/PLAYTEST.md` | 1,817 chars / 454.25 tok | 44 | 3 | accepted with notes |
| D08 | `template/docs/engine/ENGINE.md` | 2,566 / 641.5 | 56 | 5 | accepted |
| D09 | `template/docs/guide/README.md` | 2,372 / 593.0 | 62 | 3 | accepted |
| D10 | `template/decisions.ru.md` | 1,430 / 357.5 | 28 | 3 | accepted with notes |
| M01 | `library/core/memory/MEMORY-SCHEMA.md` | 3,130 / 782.5 | 77 | 5 | accepted with notes |

All under the token ceilings (D07/D09/D10 600; D08/M01 800). UTF-8 no BOM,
LF, no `{{`, POSIX paths.

## Review changes

- **D07:** wrote the missing `REPORT.md`; 5 PASS, 4 CONCERNS. The note uses
  `kill` (G1) and leaves `cut` to the S10 checklist; S09 values are linked, not
  copied; 3–5 testers for a slice, one for S08/S09; one PNG plus a manual GIF
  link.
- **D08:** no revision; one Phaser example is labelled Example; the pin is
  engine-agnostic.
- **D09:** fixed the non-existent `paired` mode to `Обычный режим` with the
  values from A01; 3 sources.
- **D10:** changed the admission line to `гейт/чекпойнт (G0, G1, G2, G2.5, G3)`
  so G0 is not called a gate; re-ran the check (`ids: true`, `all: true`);
  synced the report and justification to 1,430 / 357.5; added `TASTE.md` and
  `decisions.ru.md` to `template/README.md:30`.
- **M01:** removed the sloppy `modelcontextprotocol/servers (~? stars)` rejected
  row; 5 sources now: basic-memory ~4.7k AGPL-3.0, graphiti ~33k Apache-2.0,
  mem0 ~69k Apache-2.0, R6, S03.

## Integration

- `template/docs/playtests/PLAYTEST.md`, `template/docs/engine/ENGINE.md`,
  `template/docs/guide/README.md`, `template/decisions.ru.md`,
  `library/core/memory/MEMORY-SCHEMA.md`.
- Build docs copied to `docs/build/D07`, `D08`, `D09`, `D10`, `M01`.
- `template/README.md` now lists `TASTE.md` and `decisions.ru.md`.
- `docs/BUILD-PLAN.md` rows 90–94 and `docs/SESSIONS.md` rows 78–82 accepted;
  current focus Batch 16.
- Fixed the `\t` typo in D08/D09 build-plan paths.

## Commit

`92720b9 feat(batch-15): add playtest/engine/guide/memory docs and decisions digest`.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b15-smoke.mjs`:
**444 checks, 0 failures** (see `docs/build/BATCH-15-SMOKE.txt`).
Checks: 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, 12 evals, 10 tools,
6 commands, 32 permissions, 5 new Batch 15 docs, one-page sizes, M01 eight
fields, D10 gate wording, README root list, no BOM/CRLF/placeholders.

## Open issues carried

1. D07: `cut` vs `kill`; S10 per-point table; S09 values; one PNG cannot show
   motion.
2. D08: engine pack N01–N03 not written; `ENGINE.md` is a template, not a pack.
3. D09: the guide describes commands that exist; `/help` runtime untested.
4. D10: no parser/command reads the digest; the anchor is renderer-dependent.
5. M01: status forward-only; expiry 12 months; one `replaces` id; global index.
6. D07/D10/M01 reports are `Review: pending` in staging; acceptance is recorded
   here, not edited into the staging files.

## Next

Batch 16: X01 autonomy contract, X02 security, X03 versioning, N00 engine
contract, N01 Phaser pack. Then Batch 17–19 packs, then four reviewers.
