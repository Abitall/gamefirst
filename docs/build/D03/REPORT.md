# D03 — DECISIONS: report

## Summary

`DECISIONS.md` is an append-only English decision log. One dated block per real
choice, at most ten lines: `Decision`, `Why`, `Alternatives`, `Consequences`,
`Owner`, `Evidence`. A correction is a new block that names the date it
replaces; the old block stays. A tune, a task and an open question are not
blocks; ideas go to `BACKLOG.md` (D05), open questions to `BRIEF.md` or
`STATE.md` within R2's budget.

A G2.5 freeze is one block: In in `Decision:`, Out in `Consequences:`, budget by
reference in `Evidence:` to the G2 packet. `STATE.md` (D02) links the newest
gate line.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 1,462 | - | - |
| Tokens (chars / 4) | 365.50 | 600 | 234.50 (39.1%) |
| Lines | 29 | one page | fits |
| Bytes | 1,462 | - | - |
| Fill slots | 6 fields | - | - |

UTF-8, no BOM, zero CR, LF, trailing newline. All prose is English; the only
non-ASCII is the em dash.

## Check

Structural check: six field labels exactly once; one `## [date]` heading; no
`{{`; no task list; IDs `D02`, `D05`, `R2`, `R5`, `R9`, `G0`, `G1`, `G2`,
`G2.5`, `G3`, `A01` resolve; POSIX paths.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every sentence answers "why is this a decision, and what follows?". |
| 2 | Function | PASS | Trigger: a costly, shipping, or gate decision. Input: choice, reason, alternative. Output: one block. Done: a later reader can reconstruct why. |
| 3 | Evidence | CONCERNS | Thin protocol: 3 sources. ADR repo is 17,521★ but dual-licensed CC-BY-NC-SA/OGL; Rust RFC is 6,643★ and Apache-2.0; G2.5 is internal. |
| 4 | Blueprint fit | PASS | Target matches blueprint row 260 and build plan row 86; append-only, ten lines, English. |
| 5 | Consistency | PASS | `Decision/Why/Alternatives/Consequences/Owner/Evidence` match the blueprint; G2.5 freeze shape matches the gate; D02 links the newest line. |
| 6 | Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX, no `{{`. |
| 7 | Testability | PASS | A block with no `Evidence` is visibly a plan; a rewrite breaks the append-only rule; G2.5 is one block. |
| 8 | Size and density | PASS | 365.50 tokens of 600; 29 lines; six fields. |
| 9 | Integration | CONCERNS | "At most ten lines" is a cap, not exactly ten; D02 is not yet created; the ADR license is non-commercial, so only the idea is borrowed. |

Overall: 7 PASS, 2 CONCERNS. Review-ready.

## Open questions

1. **Exactly ten or at most ten?** The blueprint says "ten lines per decision";
   the template says "at most ten". Recommendation: at most ten; a short
   decision should not be padded.
2. **No `Status` field.** ADR uses proposed/accepted/superseded; this log uses
   "newest wins". Recommendation: keep newest wins; a superseded block stays
   readable in place.
3. **`[date]` placeholder.** A block can be copied without changing the date.
   Recommendation: the first line must be an ISO date; CLI08 adds a soft check.
4. **Who appends.** A01 owns the file; a gate line is the human's signature.
   Recommendation: keep; an agent may draft a block, the human signs a gate.
5. **License.** The ADR repository is CC-BY-NC-SA/OGL, not MIT. Recommendation:
   borrow the structure only; the text here is original.

## Known weaknesses

- A stale `Owner` is hard to detect.
- The log grows; no archive rule in v0.3.
- A decision can be recorded before the build (R5), so it is not proof.

## Next action

Review with D02/D04/D05/D06, then assemble Batch 14.
