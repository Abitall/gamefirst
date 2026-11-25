# CLI05 report — `sync-agent`

Part: CLI05. Artifact: `staging/CLI05/artifact/tools/sync-agent.mjs`. Status:
implementation complete, 92 checks passing, awaiting review.

## Summary

`sync-agent` moves library parts between the framework and a game through
`agent.lock.json`. It has three verbs:

- `pull` — framework to game; applies `stale` and `missing`, refuses
  `modified`/`diverged`/`unknown` without `--force`, reports
  `missing-source`/`blocked`.
- `push` — game to framework; refuses every candidate without `--force`, skips
  `stale`, blocks `missing`/`blocked`.
- `diff` — read-only; exits 1 on any non-clean part.

It also provides `--dry-run`, `--json`, `--help`, SHA-256 content comparison,
atomic sibling-temp writes, path containment, and exit codes 0 (clean), 1
(conflict or missing), 2 (usage). It performs no network access, runs no child
processes, uses no submodules, and never publishes.

## Size

| File | Lines | Characters | Notes |
|---|---:|---:|---|
| `artifact/tools/sync-agent.mjs` | 250 | 12,170 | task cap 250, met exactly; ASCII; ≈3,043 tokens at 4 chars/token |
| `test/run-checks.mjs` | 298 | 16,186 | black-box suite; ASCII |
| `JUSTIFICATION.md` | 128 | 13,548 | UTF-8 |
| `SOURCES.md` | 171 | 9,593 | UTF-8 |
| `REPORT.md` | this file | — | UTF-8 |

The artifact is executable CLI code, not a prompt artifact, so the rubric's
command/skill token thresholds do not apply. The applicable limit is the
250-line task cap, which is met with no spare line.

## Checks

Command: `node staging/CLI05/test/run-checks.mjs`

Result: **92 passed, 0 failed, 92 checks**. The suite creates a temporary
framework and game, then verifies:

- pull: clean, local edit, `--force`, `--dry-run`, stale, missing,
  missing-source, blocked target, unknown/diverged, first-hash behaviour;
- push: clean, refusal, `--force`, stale skip, missing target, missing-source
  recreation, diverged overwrite, `--dry-run`, temp cleanup;
- diff: clean, conflict, no writes;
- CLI: `--help`, unknown command/option, missing game directory, default cwd;
- lock: missing, invalid JSON, missing `parts`, missing fields, traversal,
  absolute/backslash/drive paths, duplicates, malformed hash, unsupported path;
- output: single JSON object, schema 1, error JSON on stdout, exit codes;
- containment and atomic-write behaviour through observable files.

## Rubric 1–9

1. **Necessity — PASS.** `JUSTIFICATION.md` accounts for every function,
   status, command, guard and write path with why, failure mode and source. The
   tool does not duplicate `new-project` (creation), `status` (reporting) or
   `doctor` (validation).
2. **Function — PASS.** Trigger, input (`agent.lock.json` plus `library/`),
   output (written files or JSON), completion (exit 0), failure (statuses and
   exit 1/2) and scope (local only) are defined and tested.
3. **Evidence — PASS.** Nine sources: four gamedev, three SWE, two AI-agent.
   Each has URL, stars on 2026-11-25, license evidence, a real artifact, and
   borrow/reject notes. Dead ends are explicit. No code was copied.
4. **Fit with the blueprint — PASS.** CLI05 is implemented at `tools/` as
   specified; it consumes the lock written by CLI01 and complements the
   reporting of `status`. No engine imports and no project-specific content.
5. **Size — PASS.** 250 lines against a 250-line cap; 12,170 characters. There
   is no removable unit without losing a tested behaviour.
6. **Language and encoding — PASS.** English artifact and docs; POSIX lock
   paths; artifact and test are ASCII; all five files are UTF-8 without BOM
   with LF endings.
7. **Security — PASS.** The lock is untrusted input and is validated before any
   write. Game and library containment is checked after path resolution.
   Symlinks and non-files are blocked. Overwrites require `--force`; no network,
   secrets, deletion, publish or subprocess.
8. **Testability — PASS.** One command runs 92 black-box checks. Failures name
   the check; assertions inspect exit codes, file contents and lock state.
9. **Integration — PASS.** `parts[].hash` is additive and optional:
   `tools/status.mjs` counts parts without reading it and `tools/doctor.mjs`
   ignores unknown fields. Lock root fields written by CLI01 are preserved as
   JSON values.

Verdict: **accept**.

## Resolved questions

1. **`parts[].hash` is optional.** CLI05 writes it on `pull` and `push`; CLI06
   drops it when a part changes. Existing locks without hashes classify as
   `unknown` only when files differ.
2. **`push` without `--force` refuses.** It exits 1 and writes nothing.
   `push --dry-run` never writes and exits 0, even when a real push would
   refuse; `diff` remains the exit-1 check.
3. **CLI05 owns hash refresh after a successful sync; CLI01 writes none
   initially.** A first pull also records hashes for clean parts even if another
   part conflicts; a conflicted part stays unhashed until resolved.
4. **`missing-source` is restored only with `push --force`.** Plain push reports
   the part and blocks; the local game file is never removed.

## Residual questions

- The optional `hash` field should be documented in the X03 lock schema so a
  future consumer does not treat it as required or reserved.
- `push --dry-run` exiting 0 while `diff` exits 1 is intentional but worth
  stating in the help text during a future revision.
- `SOURCES.md` records gdx-liftoff (696 stars) as the weakest source by
  popularity; its destination-validation artifact is direct and current.

No files outside `staging/CLI05/` were modified.

Review: accepted 2026-11-26
