# S09 gym — justification

Every semantic unit of `artifact/library/game/skills/gym/SKILL.md`: why it exists, what breaks if it is removed, and where it comes from. Source codes: `B:<line>` = `docs/V0.3-BLUEPRINT.md`; `R<n>` = `library/core/rules/`; `SRCn` = row in `SOURCES.md`; `authored` = a judgment made here, grounded in the named part.

## Frontmatter

| Unit | Why | If removed | Source |
|---|---|---|---|
| `name: gym` | The id the loader and every cross-reference use. | The skill cannot be selected or cited by ID. | B:157, rubric 9 |
| `description` | Names the input (one mechanic), the isolation, the loop (3-5 runs), the verdict, and the position (after a prototype keep) so the skill is selected at the right moment and not for content. | Selection degrades to keyword match on "tune"; the skill fires too early or on the wrong work. | B:157, R8; house pattern of `verify` |
| `allowed-tools` | A gym reads the mechanic and prior notes (Read, Glob, Grep), writes scene, config and note (Write, Edit), runs the build (Bash). Nothing else is needed. | Without Write/Edit there is no scene or note; extra tools widen the blast radius for no gain. | A03 permission set, R3 (no external content is fetched) |

## Role line

| Unit | Why | If removed | Source |
|---|---|---|---|
| "feel is found in a scene with a human (R8); R9 prices the scope" | States the claim that justifies a runnable scene instead of a design paragraph, and names the rule that bounds how much tuning is allowed. | A reader treats gym as a documentation step and tunes until the budget is gone. | R8, R9, B:157 |

## Trigger

| Unit | Why | If removed | Source |
|---|---|---|---|
| Three entry points: after S08 says keep, before the slice, or where a system card guesses values | The mechanic must already be worth tuning (S08), the slice must still be changeable (S10), and a card value with no evidence is exactly the gap gym closes. | Gym is run before the loop is worth it, or after the slice has frozen the values. | B workflow (prototype → G1 → slice), S08, D06, S10 |
| Not for a whole game, content (S11), polish (S12); no human = blocked (R8) | One human session is the scarcest input; spent on a whole game or on content it returns nothing. | The skill absorbs S11/S12 work and the no-human case is discovered after preparation. | B:157 ("one mechanic"), R8, S11, S12 |

## Inputs

| Unit | Why | If removed | Source |
|---|---|---|---|
| One mechanic, its one question, a hypothesis with expected effect and range, written first | The hypothesis fixes what counts as evidence and what range to search; writing it first blocks post-hoc storytelling. "Two mechanics are two gyms" prevents a confounded session. | Every result is reinterpreted after the fact, and two changed mechanics cannot be attributed. | R8 (agent prepares questions), R7, SRC6 |
| Every knob with unit, range, default; "a knob without a range is a guess" | A range is what makes a value searchable and a result repeatable. | The session becomes poking; no value can be locked with confidence. | SRC6 (`suggest_float(low, high)`), SRC1 (typed cvars) |
| A gym scene playable within 10 s, no menus | The 15 minutes belong to the mechanic; a load screen or a menu spends them before the mechanic starts. | Human time is spent outside the mechanic and observations mix causes. | SRC2 (one demo per mechanic), SRC4 (instant debug entry) |
| A human with 15-20 minutes, present or on the build | The session length is the unit of iteration, and a remote build still counts as a human in the loop. | The loop has no clock and stalls on availability. | R8 |

## Steps

| Unit | Why | If removed | Source |
|---|---|---|---|
| 1. Isolate at `src/game/gym/<mechanic>/`, one scene, the real code path; "a copy that lies tunes nothing" | A reimplementation drifts from production, so locked values do not transfer. The real path makes the run count as evidence (R1). | Tuning happens on a lookalike; promotion surprises in the real build. | R1, SRC2 |
| 2. Knobs in `src/data/gym/<mechanic>.json`, live control, next frame, no rebuild; values and state on screen (`F1`) | A rebuild per value eats the session; a hidden value makes a quote unactionable and invites misattribution. Binding the control to the same variable the mechanic reads removes the sync bug. | Each iteration costs a build, and the observer cannot tell which value produced which behaviour. | SRC1, SRC5, SRC3, SRC4; data-driven rule |
| 3. Question, one observable criterion, one knob, fixed before run 1; "No criterion, no result." | Without a pass line the verdict is taste alone; one knob keeps the cause identifiable. | Runs cannot end, and "it feels better" replaces a decision. | R8, SRC6 (a metric to prune against) |
| 4. Minimum build: box, mechanic, readout; no art, audio, score, menu | Polish biases feel judgments and consumes the minutes. | The tester reacts to presentation, and the session ends before the mechanic is exercised. | R9, S08 (greybox) |
| 5. 3-5 iterations per session, 15-20 min each; one change; silent watching; verbatim quotes | The cap protects the human's freshness and the session's comparability; coaching and paraphrasing destroy the confusion signal. "A cleaned-up quote is your opinion" is the failure mode named. | An eight-hour session yields flat, coached, unquotable data. | R8 (numbers), observation protocol authored |
| 6. Per-run verdict `lock` / `iterate` / `kill` (advice only; G1 owns keep/kill/retune, R8); 3 alternatives before the next value, not ±5%; boring = `kill`; three runs without gain = stop | Each run needs a terminal state or the session never converges. `kill` is a recommendation the note carries to G1, which owns the keep/kill/retune decision. The three alternatives are a micro-dose of divergence against a local optimum. Boring and stuck are results, not reasons to soften. | Runs blur together, knobs are nudged by ±5% forever, a boring mechanic ships as "needs polish", and gym is read as the gate that killed it. | R7, E09, E08, R8 |
| 7. Lock then promote: values with the criterion, real config, delete gym controls, S02 in the real build; no promotion before lock | The value is proven only in the harness until it runs in the real build; leftover controls are a dev/cheat surface. S02 is the gate that accepts the claim. | Values live only in the gym, and the real build is never checked. | R1, S02 |
| 8. A02 writes the note at `docs/playtests/<YYYY-MM-DD>-<mechanic>.md` per D07 (RU, one page) with protocol, values per run, observations, quotes, confusion points, verdict; A03 builds and runs; S02 cites the note | This is the only durable record of what was tried and seen; S02 step 6 refuses a gym claim without it. Naming A02 and A03 here matches their permissions: A02 may write `docs/playtests/`, A03 may build and run, and neither can do both. | The next agent repeats the session, S02 cannot pass a single mechanic, and the note is attempted by an agent that cannot run the build. | D07, S02:31, R8 evidence list, A02, A03 |
| 9. Update `STATE.md` (verdict, next step), `BACKLOG.md` (parked knobs, ideas), and the card on lock | Verdict and next step are the handoff; parked knobs are scope that must not leak; the card must stop guessing. | The decision dies in the note; parked ideas become silent scope. | D02, D05, R9, D06 |

## Output

| Unit | Why | If removed | Source |
|---|---|---|---|
| Plays alone, knobs live; a D07 note with values, quotes, verdict, next step | Defines "done" as observed behaviour plus a written record, not a claim in chat. | The session can be declared done without either artifact. | R1, R8 |
| On lock: values in the real config, S02 green, state and card updated | Lock is not the end; promotion is what changes the game. | Locked values stay in the gym and the card keeps guessing. | S02, R1, D06 |

## Blocked

| Unit | Why | If removed | Source |
|---|---|---|---|
| No human: blocked, not passed; never invent a session | Inventing a playtest is the exact failure R8 exists to prevent. | A fabricated pass replaces the only evidence that matters. | R8 |
| A knob needing a rebuild: fix the harness before the runs | Live tuning is the precondition; without it the session burns the human. | The first run is spent building instead of testing. | SRC5, R8 |
| Done in chat is not done (R1): the build ran and the note exists, or it did not | Tuning is the work most easily faked verbally. | Status reports drift from the artifact. | R1 |

## Out of scope

| Unit | Why | If removed | Source |
|---|---|---|---|
| Content, many mechanics (S11), polish (S12), the G1 loop (R8), the slice (S10); new ideas to `BACKLOG.md` (R9) | Keeps the skill from growing into the pipeline: the keep/kill decision belongs to G1, scope belongs to R9, and a new idea is parked, not built. | Gym becomes a mini-production phase and starts deciding gates it does not own. | R8, R9, S10, S11, S12 |

## Cross-refs

| Unit | Why | If removed | Source |
|---|---|---|---|
| One locator line, IDs only, no restated rule text | The rule owns its content; the skill points. Restating would fork the truth and drift. | Readers get a second, aging copy of R7/R8/R9 inside a skill. | Blueprint priority (rule > skill), rubric 1 |

## Design decisions and rejected alternatives

| Decision | Rejected alternative and why | Source |
|---|---|---|
| One mechanic per gym | A multi-mechanic gym (whole loop) is S08 at prototype scale; effects cannot be attributed. | B:157, S08 |
| 3-5 runs, 15-20 min | A single long session or ten short ones: freshness and comparability collapse. Numbers are R8's, repeated here only as the executable procedure, not as the evidence rule. | R8 |
| `lock` / `iterate` / `kill` | Keep/retune vocabulary belongs to G1; gym records a local verdict, G1 still ratifies. The artifact marks `kill` as advice only in step 6 so nobody reads gym as the gate. | R8 |
| 3 alternatives, not R7's 20 | A full divergence pass is prototype-scale; gym needs enough to escape the current local optimum without a workshop. | R7, S08 |
| `F1` overlay | A bespoke debug UI costs more than it reveals, and engine packs own the API. | SRC4, SRC5 |
| Values in `src/data/gym/` | Editing `src/data/` in place risks promoting untested numbers and hardcodes; a gym copy is thrown away on lock. | data-driven rule, SRC1 |

## Deliberate omissions

| Omission | Why it is out |
|---|---|
| Art, audio, narrative direction | Other owners; gym explicitly forbids polish. |
| Telemetry, analytics, A/B infrastructure | Blueprint non-goal; the human is the instrument. |
| Automated parameter search or optimizer | The objective is human judgment; only the declared range idea is borrowed (SRC6). |
| A GDD section or design doc | R5: one page per doc; the card (D06) is updated instead. |
| PASS/CONCERNS/FAIL verdict | Blueprint non-goal paperwork; the gym verdict is lock/iterate/kill. |
| A separate playtest skill | Blueprint: playtest is a protocol inside prototype, gym and slice. | B:163-164 |
| A concrete slider/widget implementation | Engine-agnostic layer; engine packs own the API. |

## Known tensions

- Trigger 2 and Out of scope both mention content and polish. Kept because the trigger answers "may I start this at all" and out-of-scope answers "what may I build once started".
- A02 owns the note but cannot run a shell; A03 owns the scene but cannot write `docs/playtests/`. The skill is therefore a crew procedure, not a single-agent one; step 8 now names both owners, and REPORT records the split as resolved by role, not by permission change.
- `E08` and `E09` are defined in the blueprint (lines 206-207) but not yet present as files in `library/core/evals/`, so those IDs resolve only through the blueprint today.
- Shorter: at 776.25 chars/4 no further cut survived review. The cuts made for the `kill` and owner clarifications were the step-4 rationale sentence, "no other systems" (already covered by step 1's "nothing else"), and the `UI` qualifier before polish.
