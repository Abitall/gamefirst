# CLI01 report — `new-project`

## Summary

CLI01 creates a game repository from `template/` plus selected library packs. It
refuses to write into a non-empty target, installs the core rules/agents/skills/
evals, optionally adds the game skills/crews/gates, writes `project.config.json`
and `agent.lock.json`, and runs `git init` only with `--git`. The implementation
is a single Node 18+ ESM file with no dependencies and works on Windows and POSIX.

Everything is under `staging/CLI01/`; nothing was committed.

## Artifact

- `staging/CLI01/artifact/tools/new-project.mjs`
- `staging/CLI01/test/run-checks.mjs` (test harness, not shipped)
- `staging/CLI01/JUSTIFICATION.md`
- `staging/CLI01/SOURCES.md`

## Size

| Item | Lines | Characters | chars/4 | Threshold |
|---|---:|---:|---:|---|
| `new-project.mjs` | 250 | 11,317 | 2,829.25 | ≤ 250 lines |
| `test/run-checks.mjs` | 166 | 10,750 | 2,687.5 | not shipped |

The artifact is exactly at the 250-line target; no size exception is requested.
The test harness is separate so it does not count against the shipped tool.

## Checks

Run from `C:\Phaser Projects\gamefirst`:

| Check | Command | Result |
|---|---|---|
| Help | `node staging/CLI01/artifact/tools/new-project.mjs --help` | exit 0, synopsis and options |
| Black-box suite | `node staging/CLI01/test/run-checks.mjs` | 53/53 passed, exit 0 |
| Non-empty refusal | suite | exit 1, existing file preserved, no project written |
| Core install | suite | 31 parts: `.opencode/rules` (10), `.opencode/agents` (4), `.opencode/skills` (5), `evals/` (12) |
| `core,game` install | suite | 47 parts (31 core + 16 game: 8 skills, 3 crews, 5 gates); `S06`, `C01`, `G0` present |
| Manifests | suite | both JSON files parse; all lock paths exist; core version `0.3.0-dev` |
| CLI02 integration | `tools/status.mjs` is absent in this checkout; checked `.opencode/` and a valid `agent.lock.json` directly | file-level check |
| Placeholders | suite | no `{{` in any generated file |
| Wordblocks paths | suite | none in the generated project |
| Unknown/reserved pack | suite | exit 2 with the pack name |
| `--git` | suite | `.git` created on this machine; the missing-git path prints a warning and keeps the project (not exercised here because git is installed) |
| `--packs game` alone | suite | exit 0; implicit core plus `C01` and `G0` |
| Count derivation | suite | expected core/game counts read from `library/` at test time; no hardcoded 9 evals or 36 parts |
| Encoding | Node scan of `staging/CLI01` plus a 47-part sample | 74 files checked, 0 BOM, 0 CRLF, 0 invalid UTF-8 |

The suite uses a fresh OS temp directory and removes it on exit; `KEEP=1` keeps
it for inspection. A manual `core,game` sample produced 47 parts and printed
`core 0.3.0-dev; ... parts: 47; crews: 3; gates: 5`.

## Open questions

1. **Who owns `project.config.json`?** `docs/build/BATCH-1-REVIEW.md` says
   CLI01 creates it; `docs/BUILD-PLAN.md:110` and the blueprint say N00 creates
   it. CLI01 currently seeds `{name, engine: null, verify: {recipe: []},
   budgets: {}}` so N00 can fill the recipe. Confirm this split.
2. **Lock version semantics.** `agent.lock.json.version` is the game version
   `0.1.0`; the framework version is in `core` (`0.3.0-dev`). Confirm that
   `tools/status.mjs` (CLI02) reads these two fields the same way.
3. **Template gaps.** The blueprint game tree lists `toolbox/`, `prototypes/`,
   `docs/retro/`, `evals/fixtures/`, and `runs/*.jsonl`; the current `template/`
   has none of them. CLI01 copies the template as-is. Should N00 create these,
   or should the template be extended before CLI02/status relies on them?
4. **Gate slug collision.** The blueprint maps `G2` to `slice`, while `S10` is
   also `slice`; a single slug map assigns `G2` to both and fails with a duplicate
   ID. CLI01 derives gate IDs from filenames and does not read gate slugs. Should
   the blueprint rename gate slugs or declare gate IDs independently?
5. **Pack coverage.** `core` and `game` are installed; the other blueprint packs
   (`release`, `obsidian`, `art`, `audio`, `narrative`, `localization`,
   `marketing`) fail loudly as unimplemented. Is that the intended v0.3 scope,
   with each pack added in its own batch?
6. **`--git` failure code.** If git is missing or `git init` fails, the project
   is kept and the tool exits 1 with a warning. Confirm that a partial success
   should not exit 0.

## Rubric (1-9)

| # | Section | Verdict | Notes |
|---:|---|---|---|
| 1 | Necessity | accept | Blueprint CLI01 and BUILD-PLAN batch 10; without it the template's `.opencode/rules/*.md` reference is dead. |
| 2 | Function | accept | All required behaviors are implemented, including game crews/gates, and covered by the 53-check suite. |
| 3 | Evidence | accept | Nine sources: 4 gamedev / 3 SWE / 2 AI, exact 2026-11-25 stars, licenses, quotes, borrow/reject, dead ends. |
| 4 | Fit | accept | Node 18+ ESM, no dependencies, staged path resolution, S05 exit codes, no engine imports. |
| 5 | Size | accept | Exactly 250 lines, at the target; the test harness is separate. |
| 6 | Language/encoding | accept | UTF-8 without BOM, LF, POSIX paths in the lockfile; verified on 74 files. |
| 7 | Security | accept | No overwrite, non-empty guard, symlink rejection, containment checks, name validation, no network or secrets. |
| 8 | Testability | accept | Black-box suite on a temp directory, 53 assertions, library-derived counts, cleanup and `KEEP=1` inspection. |
| 9 | Integration | accept | Reads `VERSION`, blueprint IDs, `template/`, `library/`; writes the lock and config expected by CLI02/N00. Open questions above cover the remaining contract gaps. |

Overall self-assessment: **accept**. External review has not run yet.

Review: pending
