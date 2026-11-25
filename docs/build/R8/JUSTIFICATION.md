# JUSTIFICATION — R8

Every semantic unit of the rule, why it exists, and what fails if it is removed.
Sources are the nine entries in `SOURCES.md` by number, plus blueprint IDs.

| # | Unit | Why it exists | What breaks if removed | Source / inspiration |
|---|---|---|---|---|
| 1 | Title `R8 — Fun is verified on the loop` | The rule must be addressable by the ID that the blueprint, gates, and other rules cite. | Cross-refs in G1, E09, and REVIEW-RUBRIC stop resolving. | Blueprint R8 row |
| 2 | Fun is observed when a human plays a running core loop; a document, a trailer, or an agent's opinion can only predict it | States the one test the rule accepts and names the three substitutes it refuses. | The rule becomes a preference; any artifact can be argued as "close enough". | Blueprint R8 row: "with a human, not a document or a promise"; 1, 2 |
| 3 | Nothing except a person playing can feel bored | The reason the instrument is a human, not a sensor or a model. | The rule looks like ceremony; a checklist or an LLM score could replace the session. | 5; E09 |
| 4 | A GDD describes intent, a trailer sells an impression, an agent repeats what it was told; none can tell whether the loop holds attention for fifteen minutes | Separates artifacts that can be produced without a build from the one observation that needs one. | Documents regain credibility by being detailed; the fifteen-minute attention question is never asked. | 4; R1 "Not evidence" |
| 5 | Accepting substitutes defers the test to release, when it costs the most; G1 moves it earlier | Gives the economic reason for the gate's position, not just its existence. | The gate looks bureaucratic and gets skipped under deadline. | Blueprint G1; 1, 2 |
| 6 | The loop runs end to end: input → action → feedback → challenge → reward → repeat | Defines the minimum object a human can judge; a fragment cannot be played as a loop. | "Fun" is tested on a menu, a cutscene, or one mechanic with no reward. | Blueprint core loop; S08 |
| 7 | Every step is present and playable; placeholders, missing feedback, and "we will add it later" do not count | Closes the most common escape: declaring intent as if it were a step. | A grey box with no feedback passes because the plan says feedback is coming. | 2 (CI compiles, does not work); R1 |
| 8 | A human cannot judge a step that is not there, and a loop with a hole is not a loop | Explains why 7 is not pedantry. | The agent argues that the missing part is "obvious"; the session measures imagination. | S08; 2 |
| 9 | By G1 the loop has had 3–5 iterations | Prevents testing the first draft, which measures confusion, and the fiftieth, which measures polish. | G1 fires on a strawman or after the budget is gone. | Blueprint G1: "After 3–5 core-loop iterations" |
| 10 | At least one human plays a 15–20 minute build | Fixes the session's size so it is cheap enough to run and long enough for the loop to repeat; "at least" makes one session the floor, not a quota. | Sessions become either a two-minute click or an unfunded study; results are not comparable. | Blueprint G1; brief |
| 11 | The agent prepares the build, the protocol, the questions, and the observations | Keeps the agent's labour on the preparation side, where it can be checked. | The agent either runs the session and grades itself, or does nothing and calls it blocked. | 5; S08, S09, S10 |
| 12 | The human plays and judges | Separates the two roles; only the human holds the controller and the verdict. | The agent's opinion returns as the result, which 2 forbids. | E09; 8, 9 |
| 13 | G1 records one line and a date: keep, kill, retune, or extend once for this loop | Makes the outcome disposable in the smallest possible form, forces a choice, and binds the extension to the loop under test. | A page of discussion with no decision; several loops each claim their own extension. | Blueprint Gates: "one line plus a date"; R7 one extension |
| 14 | The decision belongs to G1; this rule only requires that it rests on a session, not on a claim | Keeps the rule's boundary: it supplies evidence, G1 supplies the verdict. | R8 either duplicates the gate or becomes advisory and ignorable. | Blueprint G1; priority mode > rules |
| 15 | Playtest note (D07): the build, what the human did, what happened, their verbatim quotes | D07 is the blueprint's home for the note; quoting it here keeps the artifact from becoming an orphan. Quotes are the part a summariser cannot improve. | The note has no defined home and becomes "it felt good", with no way to tell what was played or said. | 5; D07; brief |
| 16 | A capture or video of the running build | Lets a later reader see the session without trusting the note's author. | A fabricated or mistaken session is indistinguishable from a real one. | 6; CLI10 |
| 17 | The build state that was played | Ties the note to the exact artifact, so a retune can be compared and the claim cannot drift. | The note describes a build that no longer exists; the next iteration cannot reproduce it. | 7; R1 `evidence/` |
| 18 | A GDD, a promise, an AI opinion, and a feature list are not evidence: they record intent, not observation | Names the four substitutes explicitly, so the refusal is not a matter of taste. | Each substitute returns through a different door ("but the feature list is detailed"). | R1 "Not evidence"; 4 |
| 19 | A capture of a menu or a scripted scene is not a loop | Blocks the cheapest way to satisfy 16 without playing the loop. | Evidence exists, looks valid, and shows nothing about the loop. | 6; 2 |
| 20 | A boring or broken loop is a valid outcome | Removes the incentive to hide a bad result; a rule that only accepts good news is a lie detector, not a test. | The agent overstates, the human loses trust, and the next session is not believed. | E09 |
| 21 | Report it as boring or broken; do not soften it into "needs polish" | "Needs polish" is the exact phrase that converts a kill into another month of work. | Boredom is renamed as a schedule item; the loop survives without a reason. | E09; 2 |
| 22 | No human means G1 is blocked, not passed; never invent a session | Keeps the failure state honest and names the forbidden workaround. | A silent pass, or a fabricated note, is the only remaining path. | R1 "When it cannot run"; E09 |
| 23 | R1 already refuses an unrun build, R7 allows the one extension when something is there but not yet explainable, and R9 keeps the fix inside the budget | Places R8 among the accepted rules without restating them; each reference owns a different failure. | R8 duplicates R1, contradicts R7's extension, or ignores R9 during retune. | R1, R7, R9 |
| 24 | The playtest protocol is in S08, S09, and S10; follow it there | One home for the steps; R8 states the principle and the evidence, not the procedure. | Two divergent protocols; the rule and the skills drift apart. | Blueprint S08, S09, S10 |
| 25 | The Check list (five lines) | Turns the rule into something a reviewer can verify without interpreting prose. | "Verified" becomes an opinion; the gate has nothing to point at. | REVIEW-RUBRIC §8; G1 |

## Deliberate omissions

| Omitted | Reason |
|---|---|
| A definition of fun | The rule deliberately does not define the term; the human's judgement is the definition, and a written one would become a checklist to game. |
| How to recruit the human, and whether one is enough for confidence | The blueprint sets one human and 15–20 minutes; study design is out of scope and would inflate the rule. |
| A note template or a storage path for evidence | D07 owns the note shape (named in the rule, not restated); R1 owns `evidence/` and path citation. Duplicating either creates two sources of truth. |
| Telemetry, analytics, or an automatic fun score | A blueprint non-goal; adding it would let a metric replace the session. |
| PASS / CONCERNS / FAIL vocabulary and review rounds | Blueprint non-goal; G1 owns the decision and the verdict format. |
| The G2 slice and the nine-point list | S10 owns them; R8 stops at the G1 session. |
| What counts as one iteration | S08/S09 define the work; a rule-level definition would conflict with both. |
| Engine, UI, or capture-tool instructions | Out of domain; CLI10 and the engine reference own the mechanics of capture. |
| Accessibility and consent handling for the session | Real concerns, but owned by the playtest protocol, not by a principle rule. |
| A retest cadence after a retune | R8 requires a session before G1, not a schedule; R9 owns the budget that would pay for more. |
