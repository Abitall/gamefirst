# D04 — GAME + TASTE: report

## Summary

Two one-page Russian templates for the player-facing side of a working game.

`GAME.md` — orientation, not a specification: first line for `/help`, player
fantasy, the three-step loop as built, how it feels, audience, three behavioural
anti-rules with replacements, and a `Verified by` line (G1, D07, evidence,
build). It is written only after a human played the loop and G1 accepted it.

`TASTE.md` — taste, not requirements: one frame from the build, five feeling
words each tied to that frame, three visual/motion anti-rules, and one distant
reference. It is written with `GAME.md`; the frame comes from `evidence/`
(CLI10).

## Size

| Artifact | Chars | Tokens (chars / 4) | Lines | Slots | Bytes |
|---|---:|---:|---:|---:|---:|
| `GAME.md` | 1,698 | 424.5 | 39 | 22 | 2,719 |
| `TASTE.md` | 1,150 | 287.5 | 35 | 22 | 1,824 |

Both: UTF-8 no BOM, LF, trailing newline, POSIX paths, no `{{`. Russian prose
with English IDs; the only non-ASCII beyond Cyrillic are angle brackets and the
em dash.

## Check

`d04-check.mjs`: `ok: true`; both files parse; 22 slots each; no `{{`; no BOM;
zero CR; all referenced IDs (`S06`, `G0`, `G1`, `D01`, `D07`, `R5`, `R7`, `R8`,
`R9`, `CLI10`) exist in the blueprint; `/help` reads the first line of
`GAME.md`.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every section answers a question a player, `/help`, or a new contributor asks. |
| 2 | Function | PASS | Trigger: G1 accepted. Input: played loop, frame, D07. Output: two pages. Done: a stranger can say what the game is and how it should feel. |
| 3 | Evidence | CONCERNS | Thin protocol: Mindustry 29,973★ GPL-3.0; Mailchimp 565★ NOASSERTION; accepted G0. The Mailchimp source is small and the license is unclear. |
| 4 | Blueprint fit | PASS | `GAME.md` and `TASTE.md` both match the tree; `TASTE.md` was added in this review. |
| 5 | Consistency | PASS | `GAME.md` defers pre-G1 description to D01; `TASTE.md` owns look/motion; `BACKLOG.md` owns the second page; `DECISIONS.md` owns G1. |
| 6 | Language and encoding | PASS | Russian, UTF-8 no BOM, LF, POSIX, no `{{`. |
| 7 | Testability | PASS | `d04-check.mjs` verifies slots, IDs, encoding and the `/help` first line; a missing G1/D07/evidence reference is visible. |
| 8 | Size and density | PASS | 424.5 and 287.5 tokens; one page each; no duplicated section. |
| 9 | Integration | CONCERNS | One still frame cannot prove motion or sound (GIF is manual, audio excluded); the `Verified by` line depends on D07, which is not yet written. |

Overall: 7 PASS, 2 CONCERNS. Review-ready.

## Open questions

1. **Six anti-rules vs “three”.** `GAME.md` has three behavioural rules and
   `TASTE.md` has three visual rules. The blueprint's “three anti-rules” is per
   page. Recommendation: keep the split; state it in the blueprint.
2. **`/help` first line.** What exactly counts as the first line — the `# GAME`
   heading or the sentence after it? Recommendation: the first non-empty line
   after the heading; add the rule to SL06.
3. **`TASTE.md` in the tree.** It is absent from blueprint line 93.
   Recommendation: add `TASTE.md` next to `GAME.md` (done in this batch).
4. **One frame.** A still cannot show movement or sound. Recommendation: accept
   one frame + one GIF in the slot; audio is out of scope for v0.3.
5. **Anti-rule replacement is prose.** It is a prompt, not a content check.
   Recommendation: keep; S02/S10 check behavior, not prose.

## Known weaknesses

- The page can become marketing copy; the `Verified by` line is the only guard.
- `TASTE.md` depends on a manual GIF; CI cannot prove it.
- The audience line can be vague even when it cites D01.

## Next action

Add `TASTE.md` to the blueprint tree, review with D02/D03/D05/D06, assemble
Batch 14.
