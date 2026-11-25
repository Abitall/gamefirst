# C02 Justification — slice-crew

Artifact: `staging/C02/artifact/library/game/crews/slice-crew.md` (frozen).
Method: every semantic unit below is matched to one sentence, bullet, or clause
in the artifact. The title is structural and is not counted. Units are numbered
in reading order; there are 34. "Shorter?" answers whether the unit can lose
words without losing meaning; "No" states what would be lost. Sources are the
blueprint and framework files that require the unit, an external artifact that
supplies its shape, or "authored" where the unit is a producer call recorded
here for the first time.

## Units

| # | Unit | Why it exists | What breaks if removed | Shorter? | Source |
|---|------|---------------|------------------------|----------|--------|
| 1 | "C02 buys one thing: a slice a stranger can finish and a G2 decision can read." | States the deliverable and the two tests it must pass: a stranger finishes, the human can decide. | The crew has no success test; work drifts to "a demo" or to content. | No: "stranger" and "decision" are the two acceptance tests, not decoration. | Blueprint C02; `open-project-1` README ("small game demo"); `polygons` one-sitting form. |
| 2 | "It forms on the G1 keep line, disbands when the human answers G2, and never becomes a standing council." | Bounded lifecycle: start condition, end condition, anti-pattern. | The crew becomes permanent, accumulates ownership, and duplicates later crews. | No: each clause fixes a different boundary (start, end, non-goal). | Blueprint C02 lifecycle; `sig-release` per-cycle roster; `autogen` termination and reset. |
| 3 | "G1 keeps the loop and it already plays start to finish." | Precondition: the loop exists and is playable before framing starts. | The crew builds a frame around a loop that may still change, so every frame test is invalid. | No: "keeps" (decision) and "plays" (evidence) are separate gates. | Blueprint G1→C02 handoff; `slice` skill S10 precondition. |
| 4 | "the slice adds the frame the loop lacks." | Names the delta: frame, not loop. | The crew reopens loop design and the slice becomes a second G1. | No: "frame" is the scope noun; without it "slice" is undefined. | Blueprint C02; `slice` skill S10. |
| 5 | "One crew per slice." | Prevents parallel crews on one slice and merge conflicts at the gate. | Two crews produce two packets and no single G2 line. | Already minimal. | `prototype-crew` one-crew precedent; `sig-release` one cycle, one roster. |
| 6 | "Not for content, polish, release, or a new system: each has its own skill and budget." | Exclusion list with a redirect, so a refused request has a destination. | The crew absorbs content and polish; the slice misses its date. | No: the four exclusions cover the four observed scope leaks; "each has its own skill" prevents a dead end. | Blueprint C02 boundary; `prototype-crew` Limits. |
| 7 | "The question is the frame, not the loop: G1 already judged fun." | Fixes the question the crew answers and closes the fun debate. | The crew re-litigates fun, the critic reviews taste, and G2 cannot be answered. | No: "G1 already judged fun" is the reason, not a repetition. | Blueprint G1; `slice` skill. |
| 8 | "A01 partner leads: owns the clock, STATE.md, the gate line, the packet; routes work." | One accountable lead and four named assets. | Work has no owner, STATE.md goes stale, and the gate line is written by whoever is free. | No: the four assets are the partner's minimum; dropping one leaves an unowned artifact. | `partner.md`; `sig-release` release lead; R1. |
| 9 | "A02 designer owns the slice question and the nine-point DoD checklist; no code." | Design authority for the question and the checklist, with a hard role stop. | The checklist has no owner or the designer writes code and the engineer loses the build. | No: "no code" is the role boundary; the two assets are the designer's output. | `designer.md`; `enhancements` KEP graduation criteria. |
| 10 | "A03 engineer builds the frame and runs verify (E03); implements, never redesigns." | Build authority plus the verification duty, with a hard role stop. | The frame is designed by the implementer, or verify is skipped because "it builds". | No: "verify (E03)" and "never redesigns" are separate failure modes. | `engineer.md` E03; `autogen` condition checked, not assumed. |
| 11 | "A04 critic stays out until the build and the note are closed, then reads blind (R7)." | Enforces the blind, after-the-fact review and names its two preconditions. | The critic reviews drafts, the build optimizes for the critic, and the review is not blind. | No: "build and note closed" is the gate; "blind" is the method. | `critic.md`; R7. |
| 12 | "Five inputs or no crew." | Turns readiness into a binary gate instead of a hope. | The crew starts with a missing budget or no strangers and stalls mid-build. | No: the count is the check; "or no crew" is the consequence. | `prototype-crew` Input gate; R8, R9. |
| 13 | "a dated G1 keep line" | The keep decision must exist, be written, and be dated. | "G1 kept it" becomes hearsay; the slice has no baseline to cite at G2. | No: "dated" is what makes it auditable. | Blueprint G1; R1 artifact rule. |
| 14 | "the loop playing start to finish with S09 values in the real config" | Playability and data-driven values are verified in the real build, not a branch. | The frame is built on tuned constants that do not ship; G2 evidence is invalid. | No: "S09 values in the real config" is the data-driven check. | Blueprint S09; coding rule (data-driven values). |
| 15 | "a written slice budget in STATE.md, numbers and cut list (R9)" | Scope is a number plus an explicit cut list, written before work. | Scope creeps invisibly and the G2 scope question has no baseline. | No: "numbers and cut list" are both required; a number alone has no cuts. | R9; `veloren/book` release scope and nice-to-have list. |
| 16 | "a build command" | The slice must be reproducible by someone who is not the author. | "Works on my machine" replaces a build; the stranger cannot run it. | No: the command is the reproducibility test. | `engineer.md`; E03. |
| 17 | "three to five strangers booked" | Playtest capacity is reserved before the build, not recruited after. | The build finishes and no stranger is available; the packet ships without R8 evidence. | No: the range is the sample size; "booked" is the timing. | R8; `slice` skill S10; `OpenRA` wider-audience playtest. |
| 18 | "A02 writes the checklist first, one check per S10 point and no tenth point; a point that needs a new system goes to BACKLOG." | The DoD is written before the build, bounded to S10, and has a redirect for extras. | The checklist is written after the build to match what was made; a tenth point smuggles in a new system. | No: "first" (order), "one per S10" (bound), "no tenth" (scope), "BACKLOG" (redirect) are four checks. | `slice` skill S10; `enhancements` graduation signals; R9. |
| 19 | "A03 builds the frame around the unchanged loop: title and menu, a goal ten minutes out, one progression step, win and loss, sound, save, settings, one build that runs on a clean machine." | The frame build order in one list; the stranger check and reuse sit in Work 3-4, and "unchanged loop" protects G1. | A point is forgotten, or the loop is edited to make the frame easier. | No: each item maps to an S10 point; "clean machine" is the build test. | `slice` skill S10 points; `polygons` one-sitting goal; `open-project-1` small demo. |
| 20 | "Content is reused at least twice; no new art pipeline, no polish pass (R9)." | Forces reuse over production and blocks the two common scope leaks. | The slice grows an art pipeline; the date is spent on assets that G2 may discard. | No: "at least twice" is the reuse test; the two bans are separate leaks. | R9; `polygons` single-artifact reuse; `open-project-1` small demo. |
| 21 | "A01 runs the 3-5 stranger sessions silently, to S10's protocol, and keeps the log (R8)." | Names who runs sessions, how many, the protocol owner, and the log. | Sessions are run by the builder, the protocol forks, or the log is missing at D07. | No: "silently" (no coaching), "S10" (protocol owner), "log" (evidence) are distinct. | R8; S10; `OpenRA` playtest without developer steering. |
| 22 | "A02 writes the D07 note from A01's log; A01 assembles the packet." | Separates interpretation (designer) from collection (partner) and names the packet owner. | The log is interpreted by its collector, or no one owns the packet. | No: the split is the check against a single narrator. | D07; `designer.md`; R1 packet. |
| 23 | "A04 reads the closed set: checklist against evidence, the loop as it played, scope against the budget; findings only, no edits (R7)." | Defines the review inputs and the three comparisons; bans edits. | The critic reviews an open build, compares against memory, or fixes instead of reporting. | No: the three comparisons are the review; "no edits" preserves the one-pass rule. | `critic.md`; R7; `rust-lang/rfcs` unresolved questions. |
| 24 | "The G2 packet carries the artifacts (R1): checklist with evidence per point, D07 note, build, capture, questions with two options each." | Makes the packet self-contained and decision-shaped. | The human must ask for evidence, cannot run the build, or gets open-ended questions. | No: five contents are the minimum for a decision; "two options" forces a trade-off. | R1; `rust-lang/rfcs` questions; `enhancements` signals; `langgraph` state inspection. |
| 25 | "A failed point is reported as failed." | Honesty rule against relabeling a miss as a pass or a "known issue". | The human decides on a packet that hides failures; G2 is misinformed. | Already minimal. | `enhancements` graduation criteria; rubric Evidence honesty. |
| 26 | "Each critic finding is fixed or listed as open before the packet leaves; no second review (R7)." | Closes findings without reopening the review loop. | Findings ship unaddressed, or the critic reviews fixes and the pass never ends. | No: "fixed or listed" is the disposition; "no second review" is the bound. | R7; `critic.md`. |
| 27 | "The crew recommends; the human answers proceed, fix, or pivot in one line with a date." | Decision rights stay with the human; the answer is bounded and dated. | The crew decides G2, or the answer is a paragraph with no date and no owner. | No: "one line with a date" is the audit trail. | Blueprint G2; `langgraph` human-in-the-loop; `rust-lang/rfcs` questions. |
| 28 | "A fix sends the named points back for one round; a pivot ends the crew." | Bounds the fix path and defines the exit for a pivot. | A fix becomes an unbounded second slice; a pivot leaves the crew alive with no work. | No: "named points" and "one round" are the bound; "pivot ends" is the exit. | Authored; R9 budget; `autogen` termination. |
| 29 | "A01 writes the line to DECISIONS.md and updates STATE.md; the crew disbands." | Persists the decision and closes the crew in the same step. | The decision lives only in chat; the crew lingers and its roles shadow the next phase. | No: two files and one disband are the minimum for a clean exit. | `partner.md`; `sig-release` roster dissolves; `autogen` reset. |
| 30 | "No publish or store work (R4); new ideas go to BACKLOG." | Excludes release work and gives new ideas a destination. | The crew drifts into store pages; rejected ideas are lost or re-argued. | No: the ban and the redirect are both needed. | R4; blueprint C02 boundary. |
| 31 | "No stranger, no packet (R8)." | Makes playtest evidence a hard gate on the output. | A packet ships on internal opinion and G2 is decided on no stranger evidence. | Already minimal. | R8; `OpenRA` playtest requirement. |
| 32 | "Retuning the loop goes back to S09, not into the slice." | Routes loop changes to their owner instead of hiding them in the build. | The loop is retuned inside the slice and G1's decision is silently overwritten. | No: the redirect names the owner; "not into the slice" closes the loophole. | Blueprint S09/G1 boundary; coding rule. |
| 33 | "No separate crew report: the packet is the record." | Prevents a second narrative that can drift from the evidence. | Two records disagree at G2 and the human must reconcile them. | No: "the packet is the record" is the replacement, not just a ban. | Authored; R1; contrast with C01 `REPORT.md`. |
| 34 | "Unattended work runs under an R10 contract or stops." | Defines what happens when no human is watching. | The crew proceeds unattended without a contract and makes decisions it has no right to make. | No: "or stops" is the failure path. | R10. |

## Eleven deliberate omissions

1. **S10 playtest protocol detail** (pause/restart rules, 20-30 minutes, note
   fields). S10 owns it; copying it here creates a second source of truth that
   drifts. The artifact points to S10 instead.
2. **D07 note field list.** D07 owns the fields; the crew only says who writes
   the note and from what log.
3. **G2 packet template.** R1 and S10 own the template; the artifact lists the
   five contents, not their layout.
4. **The nine-point list verbatim.** S10 owns the point names; the artifact
   says "one check per S10 point" and gives the build order in Work 2. Repeating
   the names would fork the list.
5. **A slice timebox or sprint length.** The blueprint sets no slice duration;
   R9's written budget is the only clock. Inventing a number here would
   contradict future plans.
6. **Loop design or tuning.** G1 judged the loop and S09 owns its values; the
   slice builds around an unchanged loop.
7. **Content production and art pipeline.** Excluded by the C02 boundary; the
   crew reuses content at least twice.
8. **A polish pass.** Excluded; polish has its own phase and would consume the
   R9 budget.
9. **Release, store, and publish steps.** Excluded by R4 and the C02 boundary;
   G2 is a decision, not a launch.
10. **A separate crew report.** The packet is the record; a second document
    would compete with the evidence at G2.
11. **A second critic round or a QA agent.** R7 is one blind pass; a second
    gate would reopen the closed set and delay the packet.

## Known tensions

- **Settings is one of the nine, not a tenth.** It belongs to the menu frame;
  the checklist still has one check per S10 point and no tenth.
- **A02 writes the note, A01 runs the sessions.** Observation and
  interpretation are deliberately split; the writer of the note did not lead the
  session and cannot coach it.
- **"No second review" with a fix round.** The ban applies to the critic's
  pass. A G2 `fix` sends only the named points back for one round; it is not a
  second blind review.

## Rejected alternatives

- **Copy C01 `prototype-crew.md` structure verbatim.** Rejected: C01 outputs a
  prototype report; C02 outputs a decision packet, and a copied shell would
  carry the wrong output and the wrong review timing.
- **Make the crew permanent.** Rejected: it would accumulate ownership and
  shadow the next phase; the artifact disbands at G2.
- **Let A02 code or A03 redesign.** Rejected: it erases the role boundary that
  keeps the checklist independent of the build.
- **Let A03 run the stranger sessions.** Rejected: the builder would coach or
  defend the build; R8 wants a silent collector, and A01 owns the log.
- **Let A04 review during generation.** Rejected by R7: the critic would shape
  the build and the review would stop being blind.
- **Offer "ship" at G2.** Rejected: release is out of C02 and needs R4 work;
  the three answers are proceed, fix, pivot.
- **Add "fun" as a tenth point.** Rejected: G1 already judged fun; a second
  fun vote at G2 would reopen G1.
- **Add a tenth point for juice, accessibility, or localization.** Rejected:
  each needs a new system or a new budget; they go to BACKLOG.
