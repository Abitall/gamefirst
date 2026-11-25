# Batch 11 review — tools

Date: 2026-11-25
Verdict: **PASS**

Five tool parts, one subagent per part, nine sources each. All five pass their
black-box suites and the assembled smoke test.

| Part | Tool | Lines | Checks | Sources | Verdict |
|---|---|---:|---:|---:|---|
| CLI03 | `tools/verify.mjs` | 249 | 95/95 | 9 (4/3/2) | accepted |
| CLI04 | `tools/eval.mjs` | 248 | 79/79 | 9 (4/3/2) | accepted |
| CLI05 | `tools/sync-agent.mjs` | 250 | 92/92 | 9 (4/3/2) | accepted |
| CLI06 | `tools/upgrade.mjs` | 250 | 85/85 | 9 (4/3/2) | accepted |
| CLI07 | `tools/doctor.mjs` | 250 | 58/58 | 9 (4/3/2) | accepted |

## Review changes

- **CLI03:** evidence report renamed from `report.md` to `REPORT.md` to match
  S02. Missing `project.config.json` exits 2 (not initialised); missing or empty
  recipe exits 1 (unproven claim).
- **CLI04:** wildcard recipe fixed; artifact trimmed from 251 to 248 lines.
- **CLI05:** `parts[].hash` is optional; CLI05 writes it on pull/push. Plain
  `push` refuses; `push --dry-run` never writes and exits 0; `diff` is the
  exit-1 check. `missing-source` is restored only with `push --force`.
- **CLI06:** stale hashes are dropped for changed/missing parts on `--apply`, so
  CLI05 refills them instead of reporting `diverged`. One test added (85/85).
- **CLI07:** accepted earlier; read-only doctor, 58/58.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b11-smoke.mjs`

- 271 checks, 0 failures.
- 7 tools: `new-project`, `status`, `verify`, `eval`, `sync-agent`, `upgrade`,
  `doctor`.
- 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, 12 evals.
- 32 permissions; `shell` ask; `git push`, `npm publish`, Windows recursive
  delete and `.env` denied.
- All tools: syntax, encoding, `--help` exit 0; Batch 11 tools ≤250 lines.
- Docs exist for CLI03–CLI07 (JUSTIFICATION/SOURCES/REPORT).

## Integration

- `new-project` writes `project.config.json` and `agent.lock.json`.
- `verify` reads `verify.recipe`; `eval` reads `evals.recipe`; both consume the
  project config, not a private format.
- `sync-agent` and `upgrade` share `agent.lock.json`; `hash` is additive and
  optional.
- `status` and `doctor` are read-only and do not mutate the lock.
- No tool publishes, pushes, installs packages, or opens the network.

## Open issues carried

- CLI03: claim is free text (S02 names five types); optional failures print
  `FAIL`; `--no-evidence` still exits 0; local date vs UTC; grandchildren on
  Windows timeout; fallback recipes belong to N00.
- CLI04: `run.mjs` contract is not yet defined by an eval; `case: "*"` belongs
  to N00; JSON schema 1 stability; timeout cleanup.
- CLI05: optional `hash` must be documented in the X03 lock schema.
- CLI06: indexes only `SKILL.md`; `--to` mismatch warns; removed parts stay on
  disk; lock does not track packs.
- CLI07: link reads are doctor-only; unknown permissions warn; created files
  and orphans are reported, not fixed.

## Next

Batch 12: CLI08 `lint-agent-context`, CLI09 `trigger-check`, CLI10 `capture`,
SL01 `/start`, SL02 `/status`, under the thin protocol for commands/docs.
