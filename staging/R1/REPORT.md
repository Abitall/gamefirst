# R1 — Report

## Summary

`R1-build-is-truth.md` defines the acceptance test for the word "done": an
artifact produced by running the thing, or the words "not done" plus a blocker.
It gives a minimum artifact per claim type (mechanic, UI, content, performance,
release), applies that minimum in all five modes, lists the substitutes that are
not evidence, and points at `verify` (S02) as the default gate. The rule is
engine-agnostic and names no tool, framework, or engine command.

The design choice that shaped everything else: the rule is written as a
*decision procedure* (what is accepted, what is rejected, what to say when it
cannot run) rather than as a value statement. Every sentence either names an
artifact, a mode, or an action.

Three review fixes are folded in: an exception from `verify` may be granted only
by the user or the partner agent, never by the agent for itself; a throwaway
prototype keeps its capture and run log in `evidence/` while the build may be
discarded, with no such discount for production; and a clean OS profile or
container satisfies the release row, so a second machine is not required.

## Size

| Metric | Value | Threshold |
|---|---|---|
| Words | 418 | — |
| Characters | 2,304 | — |
| Tokens, chars ÷ 4 | ~576 | 600 |
| Tokens, words × 1.35 | ~565 | 600 |

Under the 600-token threshold by both estimates, with ~24 tokens of headroom on
the stricter metric. The three fixes added 139 characters; 102 were paid for by
trimming the "Why" clause and the evidence-storage sentence, so the 87k-word
fact survives intact.

## Encoding

All four files checked: UTF-8 without BOM, LF line endings, no non-ASCII outside
typographic dashes and quotes. Passed on 2026-11-25.

## Open questions

Resolved by the review fixes:

1. ~~Evidence path for prototypes~~ — a throwaway build may be discarded; the
   capture and run log stay in `evidence/`. Production gets no discount, so the
   exemption cannot leak upward.
2. ~~Who may grant an exception~~ — the user or the partner agent, never
   self-granted, with a named reason and a date.
3. ~~Release row requires a second machine~~ — a clean OS profile or container
   counts as clean.

Still open:

4. **"10–30 s capture" is an arbitrary range.** It exists to make "a capture"
   checkable. A reviewer could argue for 5 s or 60 s. The alternative is the
   softer "short capture", which is unfalsifiable — the numbers were chosen
   deliberately, but they are a judgement call.
5. **Residual overlap with E03.** R1 says `verify` is the default gate; E03 scores
   whether done was claimed after `verify`. One line in R1 points at E03 to keep
   them distinct. If the reviewer still sees duplication, the fix is to delete
   R1's last sentence about E03, not the check line.

## Known weaknesses

- The rule depends on two paths defined by other parts: `evidence/` (SKELETON)
  and `runs/AUTONOMY.jsonl` (X01). If either moves, R1 breaks silently. Accepted
  because inventing local paths would violate "one fact in one place".
- The content row ("a count read from the running build") assumes the engine can
  report counts. Most can; the engine packs should supply the recipe, and R1
  deliberately does not.
- Five claim types cover the common cases but not, for example, "save/load
  survives a version change" — that would be a sixth row and was cut for size.
  It can live in the engine or release pack instead.

## Rubric self-check

| # | Section | Status | Note |
|---|---|---|---|
| 1 | Necessity | pass | 18 units justified in `JUSTIFICATION.md`, plus 5 deliberate omissions with reasons. |
| 2 | Function | pass | Trigger: any done claim. Input: a claim. Output: accepted artifact or "not done" + blocker. Done: artifact path cited. Failure: explicit paragraph. Scope: five modes, five claim types. |
| 3 | Evidence | pass | 9 repos, 4 gamedev / 3 software / 2 AI-agent, each with URL, stars, artifact, borrow, reject; every quote verified against the live file. Sources unchanged by this revision. |
| 4 | Fit with blueprint | pass | Core layer, no engine import, no project-specific content; references only existing IDs (R5, S02, E03, X01, S08, A04, E08, CLI03, CLI10, R8). |
| 5 | Size | pass | ~576 tokens against a 600 threshold. |
| 6 | Language and encoding | pass | English, UTF-8 without BOM, LF, POSIX paths in text, Windows-safe filename. Verified. |
| 7 | Security | pass | No secrets; no destructive command, publish, or spend; external sources were read as data, and their instructions were not followed. |
| 8 | Testability | pass | Checked by E03 (verify before done) and executed by S02/CLI03; a failing check names the missing artifact. |
| 9 | Integration | pass | Filename and ID stable (`R1`, `R1-build-is-truth.md`); cross-references resolve to blueprint IDs; the file loads standalone. |
