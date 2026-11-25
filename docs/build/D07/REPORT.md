# D07 — PLAYTEST note: report

## Summary

One-page Russian note written immediately after a playtest. It is the evidence
for G1 (R8) and the source of `GAME.md`/`TASTE.md` (D04). Sections: build and
date, participants, tasks, protocol, observations, quotes and confusion points,
verdict, next step.

The protocol is silent walkthrough first, then think-aloud; open neutral
questions; no leading questions; 3–5 first-time participants for a slice, one is
enough for S08/S09. The note records facts and quotes, not opinions about the
design.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 1,817 | - | - |
| Tokens (chars / 4) | 454.25 | 600 | 145.75 (24.3%) |
| Lines | 44 | one page | fits |
| Fill slots | 14 | - | - |

UTF-8 no BOM, LF, POSIX paths, no `{{`. Russian prose, English IDs; the only
non-ASCII beyond Cyrillic are angle brackets and the em dash.

## Check

Structural check: 8 sections; 14 `[...]` slots; no `{{`; no BOM/CR; all IDs
(`R1`, `R7`, `R8`, `R9`, `S08`, `S09`, `S10`, `G1`, `D04`, `D05`, `A02`, `CLI10`,
`E09`) resolve; `docs/playtests/` exists; the path pattern
`<YYYY-MM-DD>-<slug>.md` matches D07.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every section is used by G1, D04, or the next session. |
| 2 | Function | PASS | Trigger: a playtest. Input: build, participants, tasks. Output: one note. Done: a reader can reconstruct what happened and why the verdict followed. |
| 3 | Evidence | CONCERNS | Thin protocol: 18F/methods 228★ CC0; GOV.UK moderated usability testing (OGL v3.0, 2017, not a GitHub repo); accepted S10. Two external sources are enough for the protocol, but the evidence base is modest. |
| 4 | Blueprint fit | PASS | Target `template/docs/playtests/PLAYTEST.md`; one page, Russian, per-session note; matches blueprint D07 and build plan row 90. |
| 5 | Consistency | CONCERNS | `kill` matches G1/R7; S10 sometimes says `cut`. The note uses `kill` and leaves `cut` to the slice checklist. |
| 6 | Language and encoding | PASS | Russian, UTF-8 no BOM, LF, POSIX, no `{{`. |
| 7 | Testability | CONCERNS | The note is prose; only structure and required fields are checkable. “No leading questions” is not machine-checkable. |
| 8 | Size and density | PASS | 454.25 of 600; one page; no duplicated section. |
| 9 | Integration | CONCERNS | S10's nine-point DoD asks for a per-point result; this note records themes, not a nine-row table. S09's tuning values are not recorded here. |

Overall: 5 PASS, 4 CONCERNS. Review-ready.

## Open questions

1. **`cut` vs `kill`.** G1 uses `keep/retune/kill`; S10 uses `cut`. The note
   uses `kill`; recommendation: keep `kill` in G1 and treat `cut` as the slice
   checklist verb.
2. **S10 per-point result.** Should the note repeat all nine DoD points, or link
   to the S10 packet? Recommendation: link; the packet owns the nine rows.
3. **S09 values.** Gym runs tune values; the note records the verdict, not the
   values. Recommendation: link the gym note (`docs/playtests/<date>-gym.md`)
   instead of copying values.
4. **3–5 vs one.** The note says 3–5 for a slice, one for S08/S09. Recommendation:
   keep; the context changes the sample.
5. **GOV.UK stars.** GOV.UK is not a GitHub repo; no stars exist. Recommendation:
   record “not a repo” rather than invent a number.
6. **Frame format.** `CLI10` saves one PNG; a still cannot show motion.
   Recommendation: accept one PNG and a manual GIF link.

## Known weaknesses

- A note can be written after the fact and look complete.
- Quotes can be paraphrased; the note asks for verbatim but cannot enforce it.
- The verdict line is the human's; an agent can draft it, not sign it.

## Next action

Review with D08/D09/D10/M01, assemble Batch 15.
