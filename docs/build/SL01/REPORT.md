# SL01 — `/start`: report

**Status:** ready for review. Artifact at the staging path, copied to `template/.opencode/commands/start.md`; both files carry SHA-256 `AABA43677EB3EF7DE697D24184836455FBE87C71587BF665BCCF3E7956F2173A`.

## Summary

`/start` is the onboarding command: it reads the five project files, recommends one of the five modes with a one-line reason, asks at most three questions for the stage (R2), and prints one screen — `Mode:`, `Phase:`, `Next:`, `Blocked:`, `Questions:`. It writes nothing except a `you decide` answer in `DECISIONS.md`. It names a missing file and the template that creates it (D01, D02, D03, D05) instead of scaffolding, and cross-references A01, R2, R5, R9, R10 rather than restating them. A mode named in `$ARGUMENTS` wins.

## Size

| Measure | Value | Threshold |
|---|---:|---:|
| Lines | 22 | — |
| Characters | 1,175 | — |
| Bytes (UTF-8) | 1,179 | — |
| Tokens (chars / 4) | 293.8 | 300 target, 400 rubric |
| Frontmatter keys | 3 | `description`, `agent`, `subtask` |

The 300-token target is the batch rule; the rubric's command threshold is 400. No cut is needed.

## Check

One resolution check, run from `C:\Phaser Projects\gamefirst` with Node. It parses the frontmatter, asserts the three keys and their values, finds all five IDs and all five output labels, rejects `{{`, a code fence, a BOM, and CR, enforces the token target, and resolves every referenced path and blueprint row. The script is short enough to paste; it is not shipped as a fifth file.

Result:

```json
{
  "chars": 1175,
  "bytes": 1179,
  "lines": 22,
  "tokens": 293.8,
  "fails": []
}
```

Assertions covered: `description` present; `agent: partner`; `subtask: false`; IDs A01, R2, R5, R9, R10; labels `Mode:`, `Phase:`, `Next:`, `Blocked:`, `Questions:`; no `{{`; no code fence; no BOM; no CR; ≤300 tokens; `library/core/agents/partner.md` and the four `library/core/rules/R*.md` files exist; `docs/V0.3-BLUEPRINT.md` contains D01, D02, D03, D05, SL01, G1.

## Rubric self-check

| # | Criterion | Self-assessment | Note |
|---:|---|---|---|
| 1 | Necessity | pass | All 16 units are in `JUSTIFICATION.md` with why, what breaks, and source. Two units were merged when they repeated A01 or R2. |
| 2 | Function | pass | Trigger: `/start`. Input: the five files plus optional `$ARGUMENTS`. Output: one screen. Done: the screen is printed. Failure: a missing file is named, its field is `missing`, no file is created. Out of scope: design, code, docs, gate decisions. |
| 3 | Evidence | pass under the thin protocol | Two external sources (spec-kit, BMAD) plus the accepted A01 artifact. The rubric's nine-repository rule is for library parts; the Batch 11 review sets the thin protocol for commands and docs. `SOURCES.md` records URLs, stars, quotes, what was borrowed, and what was rejected. |
| 4 | Fit with blueprint | pass | Command layer is the template, not core. No engine or project-specific content. Mode list and priority match `docs/V0.3-BLUEPRINT.md:327`. References resolve to accepted parts; no contradiction found. |
| 5 | Size | pass | 293.8 tokens against a 400 threshold. |
| 6 | Language and encoding | pass | English, UTF-8 no BOM, LF, POSIX paths in text. |
| 7 | Security | pass | Read-only by design; the only write is a `you decide` answer in `DECISIONS.md`. No secrets, publish, spend, or network write. Sources are MIT and only quoted. |
| 8 | Testability | pass with a caveat | The check above is cheap and produces a named failure. It lives in this report rather than in an eval; the E-series owns the permanent eval. |
| 9 | Integration | pass | File name and IDs are stable. Cross-references resolve. The command loads alone; it does not assume an engine, OS, or editor. |

## Open questions

1. `$ARGUMENTS` with no value is substituted as empty, so the sentence reads "A mode named in  wins." Is that acceptable in a live OpenCode run, or should the sentence be rephrased? The command has not been executed through the OpenCode command loader.
2. "at a gate -> `review`" assumes D02 records the phase in a form `/start` can test. D02 is still pending; when it lands, the predicate may need one sentence aligned to its field names.
3. R9 is cross-referenced in the final line but has no behavior in `/start`: a new idea mentioned during onboarding is not routed to `BACKLOG.md`. This is deliberate (A01 owns the routing, and repeating R9 would duplicate it), but a reviewer may want the question step to mention the backlog.

## Known weaknesses

- The end-to-end path was verified by reading `tools/new-project.mjs:225` (recursive copy of `template`), not by scaffolding a throwaway project.
- The check is a one-off pasted script, so it will not catch a later edit to the command unless rerun.
- `G1` is referenced by name; the command does not read the gate file. That is A01's job at the screen, and the gate path is in the blueprint.

Review: accepted 2026-11-26
