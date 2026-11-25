# SL02 вЂ” `/status`: report

**Status:** ready for review. Artifact at `staging/SL02/artifact/template/.opencode/commands/status.md`, copied to `template/.opencode/commands/status.md`.

## Summary

`/status` prints one screen from `STATE.md`, `BACKLOG.md` and `agent.lock.json`: `Phase`, `Active`, `Gate`, `Next`, `Blocked`, `Since`. It never writes, runs code, asks a question, summarizes, ranks, or infers a gate pass. A missing file is named with its owner part (`D02`, `D05`, `CLI01`); an empty field prints `not recorded`; a missing `STATE.md` prints four `unknown` values.

## Size

| Measure | Value | Threshold |
|---|---:|---:|
| Lines | 23 | вЂ” |
| Characters | 1,169 | вЂ” |
| Bytes (UTF-8) | 1,175 | вЂ” |
| Tokens (chars / 4) | 292.3 | 300 target, 400 rubric |
| Frontmatter keys | 3 | `description`, `agent`, `subtask` |

## Check

One resolution check, run from `C:\Phaser Projects\gamefirst` with Node. It parses the frontmatter, asserts the three keys and their values, finds the three input files, the six labels, the missing-file owner IDs, `not recorded`, `unknown`, and the final cross-refs. It rejects `{{`, a code fence, a BOM, and CR; enforces the 300-token target.

Result:

```json
{
  "chars": 1169,
  "bytes": 1175,
  "lines": 23,
  "tokens": 292.3,
  "fails": []
}
```

## Rubric self-check

| # | Criterion | Self-assessment | Note |
|---:|---|---|---|
| 1 | Necessity | pass | Each line is in `JUSTIFICATION.md`; no duplicate of A01 or `/start`. |
| 2 | Function | pass | Trigger `/status`; input three files; output six labels; done when the screen prints; failure names the missing file. |
| 3 | Evidence | pass under thin protocol | Two external sources plus accepted A01; `SOURCES.md` records borrow/reject. |
| 4 | Fit with blueprint | pass | Command layer is the template; no engine or project-specific content. |
| 5 | Size | pass | 292.3 tokens, under the 300 target. |
| 6 | Language and encoding | pass | English, UTF-8 no BOM, LF. |
| 7 | Security | pass | Read-only; no secrets, publish, spend, network, or shell. |
| 8 | Testability | pass with caveat | Check is pasted in this report, not a permanent eval. |
| 9 | Integration | pass | Uses `STATE.md` (D02), `BACKLOG.md` (D05), lock (CLI01); cross-refs A01/R1/R5/R10. |

## Open questions

1. `agent.lock.json` currently has `parts[].id` and `created`; if CLI01 changes those names, the `Active` and `Since` lines need one edit.
2. A missing `STATE.md` prints four `unknown` values; the file name is also printed once in `Missing:`. That duplication is deliberate, but a reviewer may prefer one line.
3. `/next` is not built yet; the fallback text names it as pending. When SL03 lands, the sentence can drop `(not built yet)`.

## Known weaknesses

- The command has not been executed through the OpenCode command loader; the check verifies text, not runtime substitution.
- `Active` prints the first five lock IDs in lock order, not by kind; a very large lock is summarized with `+N more`.
- `Since` prints the date only; timezone is the lock's ISO string date.

Review: accepted 2026-11-26
