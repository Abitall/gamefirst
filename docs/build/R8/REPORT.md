# REPORT — R8

## Summary

R8 turns "fun" from a claim into a session: at least one human plays a running
core loop for 15–20 minutes at G1, and the result is three artifacts — a playtest
note (D07) with verbatim quotes, a capture, and the build state. Documents,
promises, agent opinions, and feature lists are named as non-evidence. A boring
result is valid and must be reported as boring (E09); no human means G1 is
blocked, not passed. The rule states the principle and the evidence, points to
S08/S09/S10 for the procedure, and leaves the keep/kill/retune/extend-for-this-loop
decision to G1.

Files: `artifact/library/core/rules/R8-fun-verified-on-loop.md`, `SOURCES.md`,
`JUSTIFICATION.md`, this report.

## Size

| Metric | Value | Limit |
|---|---:|---:|
| Words | 434 | — |
| Characters | 2,279 | — |
| chars ÷ 4 | 569.8 | 600 |
| words × 1.35 | 585.9 | 600 |
| Lines | 37 | — |

The character-based estimate is inside the 520–580 target band; the word-based
estimate is 585.9, above the band but under the 600 limit. The rule is 2,279
characters against R7's 2,288, so it sits in the accepted range rather than at
the ceiling. The three revisions added 29 characters and 6 words: "At least"
(+9 characters, +2 words), "for this loop" (+13, +3), and "(D07)" (+6, +1).

## Encoding

UTF-8 without BOM; LF line endings; one trailing newline; no double-brace
template placeholders; no CRLF; POSIX-style relative paths in prose; no absolute
Windows paths. The em dash in the title is U+2014 and the first line matches
`# R8 — Fun is verified on the loop` exactly.

## Checks run

| Check | Result |
|---|---|
| First line matches the required title | Pass (codepoint check, U+2014) |
| Rule size ≤600 by chars ÷ 4 | Pass — 569.8 |
| Rule size ≤600 by words × 1.35 | Pass — 585.9 |
| Required content present (human, G1, 3–5, 15–20 min, decision, evidence, E09, blocked) | Pass |
| Cross-refs resolve: R1, R7, R9, G1, E09, D07, S08, S09, S10 | Pass — R1/R7/R9 files exist; G1/E09/D07/S08/S09/S10 defined in `V0.3-BLUEPRINT.md` |
| No gate vocabulary beyond G1 (no PASS/CONCERNS/FAIL) | Pass |
| No engine, UI, or implementation instruction | Pass |
| 9 sources: 4 gamedev, 3 software, 2 AI-agent | Pass |
| Stars read on 2026-11-25 via `gh api` | Pass |
| Quotes checked against raw artifacts | Pass; OpenRA wiki and Veloren README were verified in the earlier pass, the other seven this session |
| Placeholder/template braces | 0 |
| BOM / CRLF | None |
| Duplicate-sentence scan | No repeated sentence; "running build" recurs as a term, not as a claim |

## Open questions

1. **Resolved — one human or at least one.** The rule now says "At least one
   human", so a second player is allowed but not required.
2. **Resolved — where the note lives.** The rule names D07; the note shape stays
   in the blueprint rather than being restated.
3. **Open — build or visit.** The rule times the build, not setup, consent, or
   debrief. A session that spends ten minutes installing is still inside the
   letter of the rule.
4. **Resolved — extension scope.** "extend once for this loop" binds the
   extension to the loop under test, so several loops cannot each claim one.
5. **Open — evidence path.** R1 stores artifacts under `evidence/`; R8 does not
   repeat the path, so a reader may store the note next to the design instead.

## Known weaknesses

- The two weakest sources are Veloren (a contribution policy, not a playtest
  artifact) and 0 A.D. (used as a rejection, not a borrow). They are honestly
  labelled, but the strongest playtest evidence in the set is OpenRA and Warzone.
- "Nothing in the pipeline can feel bored" is rhetorical. A strict reviewer could
  ask for "cannot observe" instead of "feel"; the sentence survives because the
  next clause names what each artifact actually carries.
- The R7 cross-ref interprets "extend once" through R7's "Alive but illegible"
  section. If R7 changes that section, R8's sentence must change with it.
- The rule has no automated eval; testability is the five-line Check plus the
  S08–S10 protocol. That is appropriate for a principle rule, but it means a
  reviewer must read the note, not run a script.

## Rubric self-check

| § | Area | Rating (1–9) | Note |
|---|---|---:|---|
| 1 | Necessity | 8 | Every unit has a row; rows 7 and 8 overlap slightly. |
| 2 | Function | 8 | Trigger, inputs, outputs, done, failure, and scope are present; the rule's output is evidence, G1's output is the decision. |
| 3 | Evidence | 7 | 9 real repos in 4/3/2; two weak sources, flagged above. |
| 4 | Blueprint fit | 8 | IDs and paths resolve; the G1 wording now matches the brief. |
| 5 | Size | 9 | 569.8 / 585.9, both under 600. |
| 6 | Language and encoding | 9 | English artifact, UTF-8 no BOM, LF, no placeholders. |
| 7 | Security | 9 | External content treated as data; no secrets, no instructions followed from sources. |
| 8 | Testability | 8 | Manual checklist plus the playtest protocol; no automated eval by nature. |
| 9 | Integration | 8 | R1/R7/R9/G1/E09/D07/S08–S10 resolve. |

Overall: **8 / 9** by the rubric's own sections, with the evidence section the
weakest and size the strongest.

Review: accepted 2026-11-26
