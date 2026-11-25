# CLI08 report - lint-agent-context

## Summary

`tools/lint-agent-context.mjs` is a read-only, dependency-free Node 18+ ESM
linter for an assembled gamefirst tree. It scans `AGENTS.md`, active
`.opencode/` parts and `library/` parts, then reports:

- token budgets per kind (chars/4), with `--budget KIND=N` overrides;
- exact normalized duplicate body lines inside the active context;
- duplicate IDs, including collisions between core, game and pack layers;
- priority conflicts against `mode > rules > skill > pack > docs`;
- stale `R/S/A/E/CLI/G/D/C` references and missing backticked paths;
- frontmatter shape, BOM, CRLF, U+FFFD and active `{{placeholders}}`.

Human output is an aligned table plus findings. `--json` emits schema 1 on one
line. Exit codes are 0 clean, 1 findings (or warnings under `--strict`) and 2
usage/config. The tool never writes, spawns a shell or uses the network.

The real tree at `C:\Phaser Projects\gamefirst` scans as 47 parts, 0 errors and
0 warnings, exit 0. The only earlier finding was the `NO-ID` warning that made
`library/core/agents/engineer.md` print `-`; the filename map now resolves it to
`A03` and a test covers that row.

## Size

| File | Lines | Note |
|---|---:|---|
| `artifact/tools/lint-agent-context.mjs` | 248 | limit 250 |
| `test/run-checks.mjs` | 196 | 55 checks |
| `JUSTIFICATION.md` | 196 | unit-by-unit |
| `SOURCES.md` | 90 | 9 repositories |
| `REPORT.md` | 91 | this file |

The artifact is ASCII, UTF-8 without BOM, LF only. Paths in output are POSIX.

## Checks

`node test/run-checks.mjs` -> `55 passed, 0 failed, 55 checks`. The harness runs
the tool as a child process against throwaway temp trees and asserts:

| Area | Covered |
|---|---|
| Clean pass | exit 0, PASS line, table, no findings, strict still 0 |
| Usage | help, missing root, file root, empty dir, unknown arg, bad budget kind/value |
| Budgets | over-budget error, message, file/line, override, comma override |
| Duplicate lines | exit 1, first location, case/spacing normalization, short-line ignore, cross-source ignore |
| Duplicate IDs | active duplicate, library core/game collision, installed copy is not a duplicate |
| Priority | reversed line, missing line warning, strict failure, lower-over-higher prose |
| References | stale `S99`, stale `CLI99`, known IDs pass |
| Paths | missing path warning, strict failure |
| Frontmatter | missing/bad agent mode, skill name/directory, command description, rule rejection, unclosed block |
| Encoding | BOM, CRLF, `{{placeholder}}`, U+FFFD |
| JSON | schema 1, `ok`, empty errors, parts, one line, finding fields |

## Rubric

| # | Criterion | Verdict | Evidence |
|---:|---|---|---|
| 1 | Necessity | PASS 5/5 | doctor checks structure; this checks budget/reference drift that structure checks cannot see; assembly step 2 needs it |
| 2 | Function | PASS 5/5 | every specified check implemented and exercised; 47-part real tree clean |
| 3 | Evidence | PASS 5/5 | 9 repos, 4/3/2, stars as of 2026-11-25, license, artifact, borrow/reject and dead ends in SOURCES.md |
| 4 | Blueprint fit | PASS 5/5 | matches CLI08 row, part IDs, layer names and priority order |
| 5 | Size thresholds | PASS 4/5 | 248/250 lines, no dependencies; only two lines of headroom |
| 6 | Language and encoding | PASS 5/5 | ASCII artifact, LF, no BOM, Node 18+ ESM, POSIX output |
| 7 | Security | PASS 5/5 | read-only fs reads, no shell/network/eval, no writes, 5000-file cap |
| 8 | Testability | PASS 5/5 | black-box temp fixtures, isolated checks, 55 assertions |
| 9 | Integration | PASS 5/5 | plain CLI, schema-1 JSON, 0/1/2 exits, runs from the repo root |

## Open questions

1. The ID registry includes every blueprint ID, so deleting a part whose ID is
   still in the blueprint will not raise STALE-REF. A manifest-based registry
   would catch it, at the cost of a second source of truth.
2. Duplicate lines are compared only inside the active source. A copy installed
   from `library/` is deliberately not a duplicate of its source, so drift is
   caught after an edit, not at install time.
3. Missing paths are warnings and are skipped for evals because eval bodies
   describe hypothetical fixtures. `--strict` is the gate for a finished tree.
4. Command IDs come from the filename map because commands are not built yet.
   When a frontmatter `id` exists, `declared` should prefer it.
5. `--budget` accepts any positive integer, so a very large value effectively
   disables that kind's budget. A per-kind maximum was not specified.
6. The 5000-file cap stops silently. A warning when the cap is reached would
   make truncation visible.
7. Tokens are `ceil(chars/4)`, which is rough for tables and non-Latin text;
   it is a trend signal, not a model tokenizer.
8. `--root` consumes the next argv token even when it starts with `--`; usage
   errors still exit 2, but the message names a path rather than the flag.

Review: accepted 2026-11-26
