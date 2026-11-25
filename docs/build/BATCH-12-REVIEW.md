# Batch 12 review

**Verdict:** PASS

Batch 12 adds three tools and the first two slash commands. Commit after this
review: `feat(batch-12): add lint/trigger/capture tools and start/status commands`.

## Parts

| ID | Part | Size | Tests / checks | Sources | Rounds |
|---|---|---|---:|---:|---:|
| CLI08 | `tools/lint-agent-context.mjs` | 248 lines, 13,568 chars | 55/55 | 9 (4/3/2) | 2 |
| CLI09 | `tools/trigger-check.mjs` | 246 lines, 14,121 chars | 31/31 | 9 (4/3/2) | 1 |
| CLI10 | `tools/capture.mjs` | 221 lines, 10,135 chars | 85/85 | 9 (4/3/2) | 1 |
| SL01 | `template/.opencode/commands/start.md` | 1,175 chars, 293.8 tok | content checks | 3 (thin) | 1 |
| SL02 | `template/.opencode/commands/status.md` | 1,169 chars, 292.3 tok | content checks | 3 (thin) | 2 |

All five are inside their budgets: tools <=250 lines, commands <=300 tokens
(chars/4). `CLI08` first reported 54 checks; the final run is 55 after the
`engineer: A03` row test. `CLI08` first printed `-` for `engineer.md` because
the ID map lacked that name; the table now prints `A03`.

## Review changes

- CLI08: added the `engineer: A03` map test; fixed the over-budget fixture to
  use a temporary tree instead of a plain object.
- CLI09: fixed a spacing-only assertion that failed on CRLF-normalized output.
- CLI10: kept one screenshot per claim; refuses paths outside
  `evidence/<date>-<claim>/`; atomic `.part` move after the PNG signature.
- SL01: accepted after the command moved from `library/core/commands/` to
  `template/.opencode/commands/`; `new-project` already copies the template.
- SL02: accepted after the missing-file line named D02/D05/CLI01 and the output
  was fixed to six labels.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b12-smoke.mjs`: **319 checks,
0 failures**. It covers 10 rules, 4 agents, 13 skills, 3 crews, 5 gates,
12 evals, 32 permissions, both commands (frontmatter, 300-token budget,
encoding), 10 tools (syntax, `--help`, encoding, <=250 lines for CLI03-CLI10),
the real tree `lint-agent-context` (47 parts, 0 findings), and the CLI08/CLI09/
CLI10 test suites.

## Integration decisions

- Slash commands live only in `template/.opencode/commands/`; the framework
  `library/` does not carry a second copy.
- `CLI10` captures one PNG, not a video; video remains a reported gap.
- `CLI08` reads the assembled game tree, not `template/`; a framework self-check
  uses `--root template`.
- `CLI09` is lexical, not semantic; `evals/trigger-fixtures.json` is not shipped
  yet.
- `SL02` is read-only; it prints `Missing:` and does not create files.

## Open issues carried

- CLI10: `.js` browser seam for tests; same-day overwrite vs CLI03 `-2`.
- CLI09: trigger fixtures absent; template commands not scanned from root.
- CLI08: hardcoded v0.3 ID/kind lists; 5,000-file cap silent; `--strict` makes
  the missing-priority warning fatal.
- SL02: `agent.lock.json` field names; missing `STATE.md` behavior; `/next` not
  built; five-ID cap.
- Command runtime is not tested; only content and frontmatter are checked.

## Next

Batch 13: SL03 `/next`, SL04 `/verify`, SL05 `/retro`, SL06 `/help`, and D01-D06
document templates under the thin protocol.
