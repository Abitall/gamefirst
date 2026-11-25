# CLI04 `eval` — Report

Status: review-ready
Artifact: `staging/CLI04/artifact/tools/eval.mjs`

## Summary

`eval` discovers `evals/E<ID>-<slug>.md`, locates `evals/fixtures/<ID>/`, and
runs at most one deterministic check per case inside a throwaway copy. The
result is a per-case status — `pass`, `fail`, `skip-manual`, `missing-fixture` —
in a fixed-width human table or a single JSON object. A case with no fixture is
`missing-fixture`; a fixture with no runner and no recipe is `skip-manual`;
neither is ever executed, so a prompt-only eval can never be reported as a pass.
Exit code is 0 when no runnable check failed, 1 when one did, 2 for usage or
configuration errors.

Discovery accepts dotted IDs and case-variant extensions. Mode precedence is:
project recipe for the exact ID, then the fixture's `run.mjs`, then a `"*"`
recipe, then manual. Recipes come from `project.config.json`
(`evals.recipe: [{ case, cmd, timeout? }]`) and are validated in full before
anything runs.

## Size

| File | Lines | Characters | Words | Tokens (chars / 4) |
| --- | --- | --- | --- | --- |
| `artifact/tools/eval.mjs` | 248 | 11,371 | 1,454 | ~2,843 |
| `test/run-checks.mjs` | 272 | 16,817 | 1,775 | ~4,204 |
| `JUSTIFICATION.md` | 102 | 8,285 | 1,344 | ~2,071 |
| `SOURCES.md` | 151 | 6,662 | 930 | ~1,666 |
| `REPORT.md` | 135 | 6,919 | 1,046 | ~1,730 |

Target was ≤250 lines for the tool; 248 leaves two lines of headroom.

## Checks

Command: `node staging/CLI04/test/run-checks.mjs` — 79 checks, all `ok`, 6.2 s.

| Group | What it asserts | Result |
| --- | --- | --- |
| Size and encoding | ≤250 lines, no BOM, no CR, imports are `node:` builtins only | ok |
| Help | `--help` exits 0 and names every flag and exit code | ok |
| List | all 13 sandbox cases found, modes correct, nothing executed, JSON hides `fixturePath` | ok |
| Human run | exit 1 on failure, all four statuses, failure block quotes exit code, stdout/stderr and timeout label | ok |
| JSON run | `schema`, `ok`, `summary` counts, per-case fields, recipe override, nested copy preserved, writes stay in the copy, 1,500-char cap, stderr retained | ok |
| Case filter | ID and file stem select one case, `1 case` is singular, unknown case exits 2 with the available list | ok |
| Usage errors | missing `--case` value, unknown option, timeout 0 / 601 / text, `--timeout=5`, two directories, missing game dir, missing `evals/` | ok |
| Config errors | broken JSON, non-array recipe, empty `cmd`, bad `case` — all exit 2 before execution | ok |
| Empty suite | zero cases exits 0 with an empty report | ok |
| Wildcard recipe | `"*"` runs a fixture that has no `run.mjs` | ok |
| Read-only | project tree byte-identical after all runs | ok |
| Cleanup | no `gamefirst-eval-*` directory left in the OS temp dir | ok |

## Reproduction

Demo project (`%TEMP%\cli04-demo`, five cases) — `--list`:

```
gamefirst eval  C:\Users\Chirv\AppData\Local\Temp\cli04-demo

E01-small-change        run.mjs  small change
E02-no-invented-api     run.mjs  no invented API
E03-verify-before-done  none     verify before done
E04-question-budget     manual   question budget
E05-scope-recipe        recipe   scope recipe

5 cases; modes: run.mjs, recipe, manual (skip), none (no fixture)
```

`node tools/eval.mjs %TEMP%\cli04-demo --timeout 5` — exit 1:

```
gamefirst eval  C:\Users\Chirv\AppData\Local\Temp\cli04-demo

E01-small-change        pass             run.mjs
E02-no-invented-api     fail             run.mjs
E03-verify-before-done  missing-fixture  none
E04-question-budget     skip-manual      manual
E05-scope-recipe        pass             recipe

5 cases: 2 pass, 1 fail, 1 skip-manual, 1 missing-fixture

fail E02-no-invented-api (exit 3)
  FAIL build:pack: data/balance.json missing
```

`--case E01 --json` — exit 0 (the `ms` value varies):

```
{"schema":1,"ok":true,"root":"C:\\Users\\Chirv\\AppData\\Local\\Temp\\cli04-demo","evalsDir":"C:\\Users\\Chirv\\AppData\\Local\\Temp\\cli04-demo\\evals","cases":[{"id":"E01","name":"small change","file":"evals/E01-small-change.md","fixture":"evals/fixtures/E01","mode":"run.mjs","cmd":null,"status":"pass","reason":"","exit":0,"ms":42,"stdout":"ok comboStepPct=10","stderr":"","error":""}],"summary":{"total":1,"pass":1,"fail":0,"skipManual":0,"missingFixture":0}}
```

`--case E02 --json` — exit 1, with
`"status":"fail","reason":"exit","exit":3,"stderr":"FAIL build:pack: data/balance.json missing"`.

## Rubric self-check

| § | Criterion | Verdict | Evidence |
| --- | --- | --- | --- |
| 1 | Necessity | PASS | 17 units justified; no overlap with `verify` or `status`; shell-loop and `node --test` alternatives rejected. |
| 2 | Function | PASS | Trigger, input, output, done, failure and scope are stated in `--help` and asserted by the suite. |
| 3 | Evidence | PASS | Nine repositories, 4/3/2, stars and licenses on 2026-11-25, quoted artifacts, borrow/reject per entry. |
| 4 | Blueprint fit | PASS | Scheduled as `tools/eval.mjs` (batch 11); no engine imports; statuses match E07–E10 wording. |
| 5 | Size | PASS | 248/250 lines; docs small; no rubric threshold applies to this CLI. |
| 6 | Language and encoding | PASS | English, ASCII, LF, no BOM, forward-slash relative paths in output. |
| 7 | Security | PASS | Temp dir only, no network or model calls, symlinks rejected; recipe trust equals `npm test`. |
| 8 | Testability | PASS | 79 black-box checks, 8 sandboxes across 12 groups, 6.2 s, offline. |
| 9 | Integration | CONCERNS | Template has no `evals/fixtures/` (BATCH-10 gap); N00 must accept `evals.recipe` in `project.config.json`; no eval defines `run.mjs` yet. |

## Open questions

1. Is `run.mjs` the intended fixture contract, or will every fixture declare an
   `evals.recipe` command? No eval defines a runner today, so every real case
   would currently be `skip-manual`.
2. Should `case: "*"` be allowed in `project.config.json`, and is it a fallback
   only when the fixture has no `run.mjs`? The tool implements both; N00 may
   want the wildcard reserved.
3. Is JSON schema 1 a stable contract (fields may be added, never renamed)?
   `cmd` is exposed today and CI may start depending on it.
4. Timeout and cleanup: default 30 s versus E03's "under 2 s" budget — should
   eval cases carry their own tighter default? And is a leftover temp dir after
   SIGKILL acceptable, since cleanup is `finally` only?

## Known weaknesses

- A recipe runs through the user's shell with the project's trust level; a
  hostile `project.config.json` is as dangerous as a hostile `package.json`.
- On Windows a recipe that spawns grandchildren may survive the timeout.
- Output beyond 1,500 chars per stream is truncated, by design.
- Fixture symlinks are rejected; Windows junctions are not special-cased.
- No path-length guard for deep fixture trees on Windows.
- Cases run sequentially; a slow fixture blocks the rest (by design, for a
  deterministic report).

Review: accepted 2026-11-26
