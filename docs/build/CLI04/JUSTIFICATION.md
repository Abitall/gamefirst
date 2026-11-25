# CLI04 `eval` — Justification

Status: review-ready
Artifact: `staging/CLI04/artifact/tools/eval.mjs` (248 lines)
Scope: discovery of `evals/*.md`, per-case mode selection, deterministic
execution, human and JSON reports, exit codes. Out of scope: model-graded runs,
scoring an agent transcript, publishing runs.

## Why this tool exists

The blueprint defines twelve evals (E01–E12) as prose. Every `Setup:` section
assumes `evals/fixtures/<ID>/` is copied to a scratch directory, and E07–E10
name the CLI04 runner as the component that scores the case. Nothing in the
repository executes those fixtures: `verify` (CLI03) runs the project's own
recipe, `doctor` checks structure. Without `eval`, deterministic fixtures are
only ever checked by hand, the four result states are never recorded, and a
prompt-only eval can drift into looking "green" because nothing ran.

`eval` is the smallest program that closes that gap: it discovers cases,
decides whether each one is machine-checkable, runs only the deterministic
ones, and never invents a result.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
| --- | --- | --- | --- |
| `FILE` + discovery in `main` | Finds `evals/E<ID>-<slug>.md`, including dotted IDs and case-variant extensions; ignores fixtures and stray notes. | No case list at all; `--list` empty and fixtures unreachable. | S1 case-as-directory convention; S6 exact-file selection. |
| `label()` | Prints the doc-facing stem (`E03-verify-before-done`) while JSON keeps the short ID. | An operator cannot map a report line to the file the eval was written in. | S6 (paths, not internal ids, identify tests); blueprint naming. |
| `parseArgs` (incl. `--flag=value`) | One parser for both spellings; rejects unknown options, a second directory and out-of-range timeouts before any I/O. | `--timeout=5` is read as a directory; bad ranges surface as mysterious timeouts. | S5 `-t/--timeout` CLI. |
| `isDir` | Separates "no game dir / no evals dir" (exit 2) from "no fixture for this case" (a per-case status). | ENOENT traces and an exit code that cannot distinguish misuse from a failed check. | S7 `USAGE_ERROR` vs `NO_TESTS_COLLECTED`. |
| `readText` (BOM strip) | Parses headings and config after removing a UTF-8 BOM; the shipped eval files already contain an encoding defect, and Windows editors add BOMs. | `# E01` stops matching and `project.config.json` fails with `Unexpected token`, pointing at the wrong cause. | Repo: `tools/status.mjs`; observed defect in the eval docs. |
| `loadConfig` + upfront validation | Recipes live in `project.config.json`, which the project owns; every entry (`case`, `cmd`, `timeout`) is checked before a single case runs. | A broken config fails mid-run: some cases pass, some are never attempted, and the exit code depends on ordering. | S3 project-owned test command; CLI03 `verify` recipe shape. |
| `inspect` mode precedence | One place decides `none` / `recipe` / `run.mjs` / `manual`; project recipe beats the fixture runner, wildcard is a fallback, a missing fixture never becomes "skip". | Prompt-only cases could be reported as passes by running nothing. | S8 deterministic vs model-graded split; S3 project overrides defaults. |
| `tail()` | Caps each stream at 1,500 chars with a `[truncated]` marker. | One noisy build log makes the human report unreadable and the JSON multi-megabyte. | S5 output handling; S9 per-sample log limits. |
| `execute` copy (per-case, symlink-rejecting) | Each case runs in its own copy under one per-run temp dir; symlinks are refused instead of followed. | A fixture that writes (E07, E08) mutates the repo and the next run starts dirty. | S4 workspace manager; S5 `--temp-dir`; S1 isolation per case. |
| `execute` spawn | `run.mjs` runs under the same `process.execPath`; recipes run through the shell; `cwd` is the copy; `GAMEFIRST_EVAL_CASE` names the case. | Fixtures would run under a different interpreter or inside the repo, and recipes could not use `npm run`. | S5 `--shell`; S3 project command. |
| Timeout classification | `ETIMEDOUT`, or `status === null` with a signal, becomes `reason: "timeout"`, distinct from a non-zero exit. | A hang looks like an ordinary failure; the operator cannot tell "slow" from "wrong". | Repo `verify` skill: "a check that times out is a FAIL"; S5 timeout flag. |
| Uniform case record (`base`) | Every case, including skipped and missing, carries the same 12 fields. | `--json` changes shape per status and every consumer needs branches. | S6 `--json`; S9 structured logs. |
| `renderRun` + failure block | Fixed-width table, one line per case, failure detail repeated below, deterministic numeric order. | Failures scroll away and two runs cannot be diffed. | S7 short summary; S2 keeps going after a failure; S5 progress output. |
| `main` ordering | args → help → root → evals → config → discovery → filter → list → run; every misuse returns 2 before execution. | A typo can produce half a run, a temp dir and a misleading exit code. | S7 usage-error exit code. |
| Top-level guard | Unexpected exceptions print `eval: unexpected error: <message>` and exit 2. | A Node stack trace replaces the actionable message. | Repo `status.mjs` house style. |
| Constants block | One place for timeout default/ceiling, buffer, output cap, filename pattern. | Defaults drift between help text, validation and execution. | S5 defaults; repo "one fact, one place". |
| Pluralisation (`1 case` / `N cases`) | Report text is read daily; the singular form is asserted in the suite. | "1 cases" — small, but visible on every filtered run. | Own test `single case summary is singular`. |

## No duplication, shorter alternatives

- `node --test`: cannot map `E<ID>` to `evals/fixtures/<ID>`, has no
  `skip-manual` state, and reports a fixture-less case as zero tests rather than
  `missing-fixture`.
- `verify` (CLI03): runs the project's own recipe, not per-eval fixtures; it has
  no case discovery and no per-case statuses.
- A shell loop over fixtures: no JSON, no portable timeout, no cleanup
  guarantee, and no mode precedence.
- Shortest possible version: dropping `--json` and recipes saves ~50 lines but
  makes the tool useless as a CI input and forces every project to ship a
  `run.mjs` for every case.

## Deliberate omissions

- No model calls, network, publish or git: the tool only reads the project and
  writes inside one `mkdtemp` directory.
- No `--watch`, parallelism or retries: deterministic order, one temp dir, and
  verify's three-attempt rule belongs to the agent, not the runner.
- No scoring or thresholds: `Score:` grades an agent transcript, not a fixture
  exit code.
- No JUnit XML: no consumer in the blueprint; JSON schema 1 is the contract.
- No fixture scaffolding: the runner never creates `evals/fixtures/`.

## Size

| Metric | Value | Target |
| --- | --- | --- |
| Lines | 248 | ≤250 (part spec) |
| Characters | 11,371 | — |
| Words | 1,454 | — |
| Tokens (chars / 4) | ~2,843 | — |

Rubric §5's 500-token figure applies to eval documents (`library/core/evals/`),
not to this CLI; the binding limit here is the 250-line cap in the part spec.

## Consistency check

- Exit codes 0/1/2 match `tools/status.mjs` and `tools/verify.mjs`; 2 is never
  used for a check result.
- JSON uses `schema: 1`, `ok`, `root`, absolute `root`/`evalsDir` and relative
  `file`/`fixture` paths, the same conventions as the other CLIs.
- English, ASCII source, LF, no BOM, `node:` imports only, no dependencies.
- One fact, one place: mode precedence only in `inspect`, status strings only in
  `execute`, exit mapping only in `main`.

## Risks and limits

- A recipe runs through the user's shell with the project's own trust level; a
  hostile `project.config.json` can run anything the user can, exactly like
  `npm test`.
- Cleanup is `finally`; SIGKILL or power loss leaves a `gamefirst-eval-*`
  directory behind. `--list` creates nothing.
- On Windows a recipe that spawns grandchildren may outlive the timeout, because
  killing the shell does not always kill the tree.
- Output beyond 1,500 chars per stream is truncated by design.
- Fixture symlinks are rejected; Windows junctions are not otherwise special-cased.
- No path-length guard for very deep fixture trees on Windows.
