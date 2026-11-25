# JUSTIFICATION — G1

Every semantic unit of `artifact/library/game/gates/G1-fun.md` is listed below.
The rule text is not restated here; this file explains why each unit exists and
what it costs. "Shorter?" answers whether the unit can shrink without losing
meaning, not whether the file as a whole is short.

| # | Unit | Why it exists | What breaks if removed | Shorter? | Confusion risk | Source / inspiration |
|---:|---|---|---|---|---|---|
| 1 | Title `# G1 — Fun` | Gives the gate a stable ID and a name that matches the blueprint table. | The file cannot be cited, routed to, or found by ID. | No. | None; the ID is defined in the blueprint. | Blueprint gates table; house style in `staging/C01` |
| 2 | Trigger: 3–5 core-loop iterations, a loop day, a playtest | Prevents the gate from opening on the first build or on an untested loop. | G1 becomes a launch event; the loop is judged before it exists. | No — each of the three conditions removes a different shortcut. | "Loop day" is jargon; the blueprint defines it. | R8; blueprint workflow note |
| 3 | "judges a playable loop, not the game" | Bounds the object of judgement before any evidence is read. | Reviewers start judging the slice, the art, or the roadmap. | No; dropping "not the game" reopens the scope. | Low; it states a boundary, not a quality bar. | Blueprint G1 row; R8 |
| 4 | "answers one question: does this loop hold?" | A gate with several questions cannot reach one line. | The decision splinters into a list of opinions. | No; the question is the gate's identity. | Low. | S08 (one question); RFC single disposition |
| 5 | "Four artifacts:" | Announces a closed evidence set before listing it, so a missing item is visible. | The list can grow or shrink silently, and a document can drift in as a fifth item. | "Four" is load-bearing; the colon is punctuation. | Low: the criteria are a before-build artifact, not session evidence; row 15 pins the session. | R8 evidence triple; KEP criteria |
| 6 | Build that runs and reaches the loop | The thing judged must exist and be reachable without the author's help. | The gate judges a video, a branch, or a promise. | "and reaches the loop" is load-bearing; a build that crashes before play is not input. | Low. | R1; Mindustry "running the game" |
| 7 | D07 note with the human's verbatim quotes | Keeps the player's words rather than the agent's summary of them. | The agent paraphrases the session and the evidence becomes the agent's opinion. | No; "verbatim" is the whole point. | Low. | R8; CDDA "test in-game" |
| 8 | Capture of that build being played | A second channel that catches what the note forgets and proves the session happened. | The note is the only record; a fabricated or misremembered session passes. | "being played" could go, but then a menu capture qualifies. | Low. | R8; SWE-bench executed-run logs |
| 9 | Success criteria written before the build | Fixes the bar before the result, so it cannot move afterwards. | Criteria are written to match whatever the build did. | No. | Low. | KEP graduation criteria; S08 pass/kill criteria |
| 10 | Documents, trailers, opinions, feature lists do not open G1 | Names the common substitutes so the gate cannot be opened by them. | The gate drifts into reviewing a pitch or a trailer. | The list could shrink, but each item is a real substitute seen in practice. | Low. | R8 |
| 11 | Missing any artifact: G1 does not run | Makes a blocked gate an explicit state instead of a silent pass. | The agent invents a session or proceeds on two artifacts. | No. | Low. | R8 "no human = blocked"; R1 "not done" |
| 12 | Loop chain: input → action → feedback → challenge → reward → repeat | Defines "playable loop" concretely enough to check. | "Fun" becomes an opinion about a screenshot. | No; every link catches a different incomplete loop. | Medium: the chain can be read as a design formula. It is a checklist, not a requirement to add systems. | R8 |
| 13 | At least one human, 15–20 minutes | A session long enough to reach boredom or flow, not a two-minute poke. | A single click by the author counts as a playtest. | "15–20" could move to S08, but then G1 has no minimum. | Low. | R8; S08 |
| 14 | Fun observed or honestly absent; boring and broken are findings (E09) | Makes a negative result recordable without softening it. | The gate pressures a pass; "needs polish" replaces "boring". | No. | Low. | E09; godot-proposals "close"; ADR "rejected" |
| 15 | Note, capture, and build are the same session; capture shows the loop | Ties the artifacts together and excludes a menu or scripted scene. | Three unrelated artifacts pass as one session. | The two clauses could split into two bullets, at a line cost. | Low. | R8; SWE-bench reproducibility |
| 16 | One question answered; claims cite an artifact (R1), a promise is not a result | Separates a result from an intention at the point of writing the decision. | The decision line records what will be true later. | No. | Low. | R1; SWE-bench harness |
| 17 | Questions stay inside the gate budget, each with a recommendation (R2) | Stops the gate from becoming an open-ended workshop. | The gate asks ten questions and never decides. | No; the budget number lives in R2. | Low. | R2; E04 |
| 18 | Decision: human decides, A01 records one dated line in `STATE.md` and the D03 entry in `DECISIONS.md` | The person who played holds the judgement; A01 only makes it durable and visible. | The author or the agent decides for the player, and the verdict drifts from the session. | No; owner, format, and locations each prevent a different failure. | Low: "human" can be the developer or an external player, deliberately. | Blueprint "one line plus a date"; ADR status + date; RFC disposition |
| 19 | **keep** — proceed to the slice (S10) | Names the pass path and the stage that follows the proven loop. | "Keep" is recorded but no one knows what starts next, or the team returns to the loop it just approved. | No. | Low. | G1 direction; S10 |
| 20 | **kill** — stop or return to G0 with the evidence; a kill is a result (R7) | Makes the negative outcome legitimate, bounded, and reusable. | Kill is treated as failure, so the gate avoids it; or the build is killed with no record. | No. | Low. | R7; godot-proposals; ADR "rejected" |
| 21 | **retune** — the loop works, its tuning does not; re-run G1 inside the budget (R9) | Separates a tuning problem from a concept problem. | Every weak number becomes a kill, and every concept failure becomes a tuning pass. | No. | Low. | R9; S08 "retune" |
| 22 | **extend once** — something is there but illegible; one dated extension (R7), then keep or kill | Gives the "alive but illegible" case one bounded chance without opening an endless loop. | The gate either kills too early or extends forever. | No; "once" and "then keep or kill" both carry weight. | Low. | R7; AutoGen termination rule |
| 23 | Out of scope: slice, content counts, polish, release → G2, S10–S13, G3 | Protects later gates from being judged early and G1 from scope creep. | G1 becomes a slice review and never closes on the loop. | The destination list could go, but then the boundary has no owner. | Low. | Blueprint phases |
| 24 | Cross-refs | Lets a reader reach the rules and skills without duplicating them. | The gate restates rule text, and the copies drift. | No. | Low. | House style |

## Deliberate omissions

| Omitted | Why | Where it lives |
|---|---|---|
| PASS / CONCERNS / FAIL wording | The blueprint forbids this paperwork; the gate decision is one line. | Blueprint non-goals |
| A fun score, rating, or telemetry | A number would fake precision; fun here is a human observation, not a metric. | Blueprint metrics (separate from gate verdicts) |
| Playtest protocol, tasks, consent, question list | Duplicating the protocol in the gate would fork it. | S08, S09 |
| The three-question mechanics and format | The budget is a rule, not a gate detail. | R2, E04 |
| A definition of "alive but illegible" | Defining it in the gate would invite arguing about the definition instead of the build. | R7 |
| Content counts, level lists, polish checklists | Not judged at G1. | G2, S10–S13, G3 |
| How to build or run the project | The gate assumes a build, not a toolchain. | S02, project README |
| Multiplayer, social, or audience fun | G1 judges one human on the loop; other aesthetics come later or never. | Blueprint scope |
| Store page, trailer, or marketing judgement | A capture is evidence here, not a promotion. | G3 |
| Roles other than A01 | Only A01 runs gates at this stage; naming others invites hand-offs. | A01 |
| A general definition of fun | The gate asks whether this loop holds, not whether "fun" is definable; E09 keeps the report observational. | E09 |
