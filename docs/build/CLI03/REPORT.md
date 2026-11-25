# CLI03 verify - report

## Summary

`tools/verify.mjs` runs a project's verify recipe from `project.config.json` in array order and returns a verdict backed by evidence. It is the mechanical half of S02 `/verify`: it proves or disproves a claim, never repairs one. Each recipe entry is `{ cmd, required, artifact }`; a required check passes only when the command exits 0 and its artifact exists as a non-empty file. A failed or timed-out required check fails the verdict, while the remaining checks still run so one report shows every failure; an optional failure is reported but does not stop the run. Output lands in `evidence/<YYYY-MM-DD>-<claim>/` as `REPORT.md`, `commands.log` and one `check-NN.log` per command, unless `--no-evidence` is passed. The tool writes nothing else, opens no network connection, and refuses publish and destructive commands before execution. `--json` emits one `schema: 1` line for scripts; `--help` exits 0 without touching a project.

## Size

| File | Lines | Bytes | Words | Est. tokens |
|---|---|---|---|---|
| `artifact/tools/verify.mjs` | 249 | 15 482 | 1 947 | ~3 900 |
| `test/run-checks.mjs` | 278 | 14 883 | 1 845 | ~3 700 |

The artifact is under the 250-line cap; the test file is not shipped and is not capped. Token estimates use words x 2 for English and PascalCase identifiers, which matches the framework's rough measure.

## Checks

`node staging/CLI03/test/run-checks.mjs` -> **95/95 checks passed**, exit 0. The suite is black-box: every case builds a temp project, writes `project.config.json`, runs the real CLI through `spawnSync(process.execPath, ...)`, and inspects exit code, stdout, stderr and the files on disk. `KEEP=1` keeps the temp trees for inspection.

| Area | Covered |
|---|---|
| CLI surface | `--help`/`-h` exit 0 and document every flag; help runs nothing; help wins over a missing directory; unknown option, second positional, missing flag value, non-numeric/zero/oversized timeout, invalid claim -> 2; no stack traces. |
| Config | Missing config names CLI01 and exits 2; invalid JSON, array or null config -> 2; 12 malformed recipe-entry shapes -> 2; `required` must be boolean; artifacts may not escape the game dir or live inside `evidence/`; a UTF-8 BOM is tolerated. |
| Recipe absence | No `verify` key, missing `recipe`, empty array -> exit 1 with a FAIL verdict and evidence. |
| Blocklist | `npm publish`, `git push`, chained `git push` are refused before any command runs or evidence is written; `git --version` is allowed. |
| Execution | Pass and fail paths; a required failure fails the verdict but the remaining checks still run; optional failure is reported while the run passes; missing required tool fails naming the tool; missing optional tool is skipped; missing, empty or directory artifact fails; timeout kills the check and fails the run; command order preserved. |
| Evidence | `REPORT.md`, `commands.log`, `check-NN.log`; PASS/FAIL tables; the failing output tail is kept in the report; same-day reruns get `-2`; claim slugs are lowercased, capped at 40 chars, path traversal contained. |
| JSON | Exactly one line, `schema: 1`, POSIX paths, per-check result and error, FAIL and config-error shapes. |

## Exit codes

- `0` - every required check passed.
- `1` - a required check failed, timed out or lacked its artifact; the recipe is empty; a required tool is missing.
- `2` - usage error, unreadable `project.config.json`, malformed recipe entry, or a blocked command.

**Missing config is 2, missing recipe is 1, deliberately.** A missing `project.config.json` means the project was never initialised by CLI01, so there is nothing to verify against: a tooling error, not a failed claim. A present config with an empty recipe is a project that exists but has no proof strategy: S02 step 1 calls that an unproven claim, so it exits 1 with evidence saying no recipe is configured.

## Reproduction

```
$ node staging/CLI03/test/run-checks.mjs
...
95/95 checks passed
$ echo $?
0
```

Manual fixture: a project with a two-entry recipe, the first writing `build/app.js`, exits 0 and prints (paths shortened):

```
gamefirst verify  <game>
claim     mechanic
recipe    2 checks, 2 required, 300s each

   1  PASS  node -e "fs.mkdirSync('build',{recursive:true});fs.writeFileSync('build/app.js','ok')"  [build/app.js]  59 ms
   2  PASS  node -e "process.exit(0)"  51 ms

verdict   PASS
evidence  <game>/evidence/2026-11-25-mechanic
```

`evidence/2026-11-25-mechanic/REPORT.md` lists `PASS` for check 1 with `build/app.js` and `PASS` for check 2 with no artifact. With `node -e "process.exit(1)"` as check 1 the same fixture exits 1, prints `1  FAIL  node -e "process.exit(1)"  exit 1` and `verdict   FAIL  1 required check(s) failed`, and its report names the command with `exit 1, no output`. Check 2 still runs and passes; the overall verdict stays FAIL, so one report shows both the failure and the checks that were healthy.

## Open questions

1. **Claims are free text.** The slug is sanitised but not checked against a claim type; S02 names `mechanic`, `UI`, `content`, `performance`, `release`. Should CLI03 reject other values, or leave that to the calling skill?
2. **Optional failures read as FAIL.** An optional check that exits non-zero shows `FAIL` in the table while the run still passes. Is that distinction clear enough, or should it read `FAILED (optional)`?
3. **`--no-evidence` still exits 0.** The tool warns on stderr. Should a "done" claim be refused entirely, since S02 says artifacts elsewhere do not count?
4. **Local date in the folder name.** `evidence/<YYYY-MM-DD>-<claim>` uses local time, matching a human's working day; a UTC date would differ near midnight. Which does the team expect?
5. **Grandchild processes.** On timeout the shell is killed, but a command that spawns its own children may leave them running on Windows. A job object would fix it at the cost of a dependency.
6. **Recipe ownership.** CLI03 reads `verify.recipe`; N00 writes it from engine packs. Should CLI03 ship fallback recipes per engine, or keep failing loudly until the pack provides one?
7. **Continue after a required failure.** The tool runs every check even when one required check already failed, so the report is complete; a long recipe pays for checks whose result cannot change the verdict. Is fail-fast the better default?

## Rubric self-check

| # | Section | Self-assessment |
|---|---|---|
| 1 | Necessity | Each unit is listed in `JUSTIFICATION.md` with why it exists, what breaks without it and its source. No duplicate of `status.mjs` or `new-project.mjs`. |
| 2 | Function | Trigger, inputs, outputs, done condition and failure behaviour match S02; scope stops at reporting. |
| 3 | Evidence | Nine repositories (4 gamedev, 3 SWE, 2 AI-agent) in `SOURCES.md`, with stars, license, artifact, borrow/reject and honest dead ends; no code copied. |
| 4 | Fit | Layer `core`, no engine imports, paths and IDs from the blueprint; S02's recipe and evidence rules implemented, not reinterpreted, with the `REPORT.md` naming aligned to S02 step 7. |
| 5 | Size | 249 lines, under the 250 cap; no threshold in the rubric applies to this layer beyond the cap. |
| 6 | Language/encoding | English artifact, ASCII source, UTF-8 no BOM, LF, POSIX paths in output, Windows-safe names. |
| 7 | Security | Recipe is data; blocked publish/destructive commands; no network; writes only under `evidence/`; artifact paths confined to the game dir; no secrets read. |
| 8 | Testability | 95 black-box checks, all passing; failures name the check, the command and the missing tool or artifact. |
| 9 | Integration | Consumes CLI01's `project.config.json`, complements CLI02's read-only `status.mjs`, gives S02 the machine it calls; loadable alone, no engine or OS assumption beyond Node 18+. |

## Known weaknesses

- `shell: true` means the recipe is trusted input; a hostile config can run anything the user can. The blocklist catches accidents, not an adversary.
- Output is capped at 20 MB and the report keeps a 15-line tail; a chatty check can hide the line that matters deeper in its log, though the full log is on disk.
- No retry and no parallelism: a flaky check fails the run and a long recipe runs serially, by design.

Review: accepted 2026-11-26
