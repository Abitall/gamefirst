# CLI03 verify - justification

Every unit of `artifact/tools/verify.mjs` exists for a reason listed here. A unit with no entry is a unit that should be deleted.

## Units

| Unit (line) | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Header comment and `USAGE` (2-43) | A tool run by hand needs usage, recipe shape and exit codes on `--help`. | Users guess the recipe shape and treat exit 1 and 2 as the same failure. | S02 steps 1-7; CLI02 `USAGE` |
| `--help` / `-h` early return (226, 49) | Help must work without a game directory or a config. | `verify.mjs --help` fails on a half-built project; help is unreachable exactly when needed. | CLI02, CLI01 |
| `parseArgs` (45-68) | Accepts only documented flags, rejects unknown ones with exit 2. | `--no-evidance`, `--timeout 30` typos silently run with defaults and produce a PASS with no proof. | Rubric 2; CLI02 `parseArgs` |
| Claim slug (63) | Normalises `--claim` to `[a-z0-9-]`, max 40 chars. | `--claim ../../x` writes outside `evidence/`; spaces and `!` break POSIX and Windows paths. | S02 step 2; E03 folder naming |
| Timeout validation (65-67) | Integer 1..86400, default 300. | `--timeout 0` disables the timeout in `spawnSync`, so a hung check hangs the session; `NaN` behaves the same. | S02 "timeout = FAIL, CLI03 enforces the limit" |
| `isFile` / `isDir` (70-71) | Non-throwing existence checks used by preflight and root validation. | `statSync` throws on a missing path and the process dies with a stack trace instead of exit 2. | CLI01/CLI02 conventions |
| `firstWord` (72-74) | Reads the executable name, honouring quotes. | `"C:/Program Files/nodejs/node.exe" ...` is split at the first space, the tool is "missing", and a valid check FAILs. | S02 "missing tool = FAIL naming it" |
| `resolveTool` (76-86) | Resolves PATH + `PATHEXT` on Windows, paths with separators relative to the game. | Missing tooling surfaces as a shell error or a bare exit code, not "tool not found: X". | S02 step 4; gemini-cli `shell.ts` |
| `loadRecipe` (88-99) | Locates and parses `project.config.json`, tolerates a BOM. | `JSON.parse` throws a stack trace; a UTF-8 BOM turns a valid config into a crash. | CLI01 seeds the file; E03 |
| `validate` (101-121) | One command per entry, typed `required`/`artifact`, artifact contained in the game. | Newlines create a second shell command; an absolute artifact proves nothing about this project; `required: "no"` silently skips checks. | S02 step 3; rubric 7 |
| `BLOCKED` (14) | Refuses publish and destructive commands before anything runs. | A "verify" recipe could `npm publish` or `rm -rf /`; R4 and E12 exist exactly to stop that. | R4, E12 |
| `tail` (123-127) | Keeps the last 15 lines / 2000 chars of output. | A 20 MB log is copied into REPORT.md and into JSON, making the evidence unreadable. | gemini-cli `trimLiveOutputBuffer` |
| `runOne` (129-140) | Runs the command in the game dir through the shell with a timeout, a 20 MB buffer and colour off. | ANSI codes pollute logs; the check runs in the caller's cwd; a chatty command exhausts memory. | S02 step 4; gemini-cli bounded buffer |
| `judge` (142-155) | Fixed decision order: missing tool, timeout, overflow, spawn error, exit code, artifact, PASS. | A check that timed out after writing its artifact from a previous run is reported as PASS. | S02 "PASS only if exit 0 and artifact exists" |
| Artifact non-empty rule (150-154) | A PASS must leave a real file behind. | `touch out.txt` passes; the evidence folder documents nothing. | S02 step 4; E03 |
| `makeEvidence` (157-164) | `evidence/<YYYY-MM-DD>-<claim>/`, `-2`, `-3` on collision. | A second run the same day overwrites the first proof; the reviewer sees only the newest result. | S02 step 2 |
| `writeAtomic` (166-169) | REPORT.md is written to `.tmp` then renamed. | A crash mid-write leaves a truncated REPORT.md that looks like evidence. | CLI01 atomic build |
| `runAll` (171-186) | Sequential execution, one log per command, `commands.log`, failure count; continues after a failure so the report is complete. | Parallel checks break order-dependent recipes; a single log loses which command produced which output; stopping at the first failure hides the rest. | S02 step 4; OpenRA ordered targets |
| `renderReport` (188-204) | Human table, errors, and the next action inside the evidence folder. | Evidence exists but cannot be read without the terminal that produced it. | S02 step 7 |
| `renderHuman` (206-216) | Terminal summary with verdict and evidence path. | JSON-only output makes the default invocation unreadable for humans. | CLI02 default mode |
| `stop` (218-221) | Error path that still honours `--json`. | A machine caller receives plain text on config errors and fails to parse it. | Playwright JSON reporter |
| `main` exit split (223-247) | 0 = required checks passed, 1 = a required check failed, timed out, lacked its tool or artifact, or there is no recipe, 2 = usage/config/recipe-entry error. | Callers cannot distinguish "the build is broken" from "you called the tool wrong". | Recorded decision, see REPORT.md |
| `posix` (15) | All reported paths use `/`. | Windows evidence contains `C:\...`, which breaks Markdown links and diffs. | Playwright `toPosixPath` |
| `DEFAULT_TIMEOUT` / `MAX_TIMEOUT` (12-13) | One place for the default and the upper bound. | The 300 s default drifts between help, validation and code. | "one fact in one place" |
| JSON object, `schema: 1` (244) | Stable machine contract for CI and later CLIs. | Consumers scrape human text and break on every wording change. | Playwright JSON reporter |
| `--no-evidence` warning (236) | Says out loud that such a PASS is not proof. | The flag becomes a quiet way to claim done without evidence. | R1, E03 |

## Deliberate omissions

- **No retry loop.** S02 allows three attempts by the agent, not by the runner; retrying hides a flaky check.
- **No fixing, no test edits, no publishing.** Explicitly out of scope in S02; that is what makes a PASS trustworthy.
- **No parallelism.** Recipe order is a contract; check 2 may consume check 1's artifact.
- **No screenshot or playtest judging.** CLI10 owns capture; fun claims need `docs/playtests/<date>.md` and a human.
- **No config schema version.** `project.config.json` is seeded by CLI01 and its schema is provisional (Batch 10 review).
- **No environment allowlist.** The recipe is project-owned config; pretending to sandbox a trusted file would be theatre.
- **No artifact content check beyond non-empty.** The recipe decides what the artifact proves.

## Size

| File | Lines | Chars | Words | Tokens (approx) |
|---|---|---|---|---|
| `artifact/tools/verify.mjs` | 249 | 15 482 | 1 947 | 3 871 |
| `test/run-checks.mjs` | 278 | 14 883 | 1 845 | 3 721 |

The artifact is under the 250-line limit with no capability dropped to get there. It is a CLI tool, not a skill or a rule, so the 600-800 token thresholds do not apply; size is governed by the explicit 250-line budget in the task.

## Consistency check

- IDs used: CLI03, S02, E03, R1, R4, E12 - all exist in the blueprint and the skill library.
- Paths used: `tools/verify.mjs`, `project.config.json` (`verify.recipe`), `evidence/<YYYY-MM-DD>-<claim>/REPORT.md` - the last one matches S02 step 7 exactly (uppercase).
- Exit codes are stated once in `USAGE`, once in this document's `main` row and once in REPORT.md; all three agree.
- No engine import, no network, no dependency. Node 18+ built-ins only.

## Risks and limits

1. `shell: true` means the recipe is trusted input; the blocklist stops the obvious publish/delete commands, not a determined author.
2. On Windows `spawnSync` timeout kills the shell, not necessarily its grandchildren; a spawned daemon can outlive the check.
3. Evidence date is local time; two machines in different zones can name the same day differently.
4. No lock file: two concurrent runs with the same claim are separated by the collision suffix, not serialised.
5. `--no-evidence` still returns 0 on success; the warning is the only signal, by design.
