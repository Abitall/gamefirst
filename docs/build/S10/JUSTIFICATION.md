# S10 slice - justification

Every semantic unit of `artifact/library/game/skills/slice/SKILL.md`: why it exists, what breaks if it is removed, and where it comes from. Source codes: `B:<line>` = `docs/V0.3-BLUEPRINT.md`; `R<n>` = `library/core/rules/`; `SRCn` = row in `SOURCES.md`; `authored` = a judgment made here, grounded in the named part.

## Frontmatter

| Unit | Why | If removed | Source |
|---|---|---|---|
| `name: slice` | The id the loader and every cross-reference use. | The skill cannot be selected or cited by ID. | B:160, rubric 9 |
| `description` | Names the trigger (after G1 keeps the loop), the three actions (nine-point slice, stranger playtest, G2 packet) and three exclusions, so selection happens at the right moment. | Selection degrades to keyword match on "slice"; the skill fires before G1 or on content work. | B:160, B:190-191; house pattern of `prototype` |
| `allowed-tools` | Read, Glob, Grep read config and prior notes; Write and Edit build the slice and write the note; Bash runs the build. | Without Write/Edit there is no slice and no note; extra tools widen the blast radius. | A03 permission set; S09 frontmatter |

## Role line

| Unit | Why | If removed | Source |
|---|---|---|---|
| "the loop is fun (G1); the slice proves it can ship" | States the one claim that separates the slice from a prototype: the same loop now has to survive a frame, a stranger and a build. | The slice becomes a longer prototype and its result cannot gate anything. | B:160, B:190-191, B:314 |
| "One path a stranger finishes; R1 evidence, R8 the human, R9 the budget" | Fixes the unit of scope (one path), the judge (a stranger), and the three rules that bound the work. | Scope drifts to a second path; the verdict falls back to the agent's opinion. | R1, R8, R9, B:160 |

## Trigger

| Unit | Why | If removed | Source |
|---|---|---|---|
| After G1 keeps the loop and it already plays start to finish | The slice adds a frame to something that exists; starting earlier builds a frame around a mechanic nobody kept. | Agents run the slice before G1 and spend the budget on a loop that may be killed. | B:190-191, B:314 |
| Not for a new mechanic (S09), content (S11), polish (S12), a second loop; one slice, one ending | Each named neighbour has its own skill and budget; a second loop doubles the surface a single playtest cannot cover. | The slice absorbs S09/S11/S12 work and the playtest mixes causes. | B:160, S09, S11, S12, R9 |

## Inputs

| Unit | Why | If removed | Source |
|---|---|---|---|
| The kept loop, S09 values in the real config, a build command (S02) | A slice built from gym-only values breaks on promotion; a build command is what makes the result runnable evidence. | Values drift on promotion and "done" has no artifact. | S09 step 7, S02, R1, B:105 |
| The nine-point DoD as a checklist written first, one check per point | The blueprint names nine points but does not enumerate them; an enumerated list with one check each is the smallest thing that turns "nine-point DoD" into a test. Writing it first blocks a post-hoc checklist that always passes. | "Nine-point DoD" stays unmeasurable and G2 has nothing to read. | B:160, B:191; enumeration authored |
| The nine named points | Each separates a demo from a slice: title/menu and win/loss give a frame, the 10-minute goal fixes length, one progression step proves growth, sound and save are the two systems players notice when absent, the stranger removes author knowledge, production systems make it a build, reuse caps content cost. | One missing point and the slice is a demo with a checklist that omits exactly what players hit first. | authored; 10 minutes from B:380; reuse from B:161; save-as-untrusted from B:365 |
| 3-5 testers who have not seen the game, 20-30 minutes each | A stranger is the only reader who tests the frame rather than the mechanic; the count matches the playtest unit already used by S08/S09. | The author plays, learns nothing about the title or the goal, and the session has no clock. | R8; S08 step 7; S09 input 4 |

## Steps

| Unit | Why | If removed | Source |
|---|---|---|---|
| 1. Fix the checklist first; no check, not done; a new mechanic goes to S09 or `BACKLOG.md` | Without a per-point check, done is an opinion; without the routing clause, the slice grows a mechanic mid-build. | G2 reads claims instead of evidence, and scope grows silently. | R1, R9, E06 |
| 2. Build the frame, not the world; the loop stays as G1 left it | The frame is the delta the slice is paid for; reworking the kept loop invalidates the G1 verdict. | The slice re-tunes the loop and the playtest cannot say whether the frame or the loop failed. | B:191, R9 |
| 3. 10-minute goal, timed clean run; over 12, cut the path | A slice without a length target is a small sandbox; the metric exists in the blueprint and needs a build-time instrument. | The goal is never timed and the tenth-minute metric cannot be measured. | B:380 |
| 4. One progression step; a second waits in `BACKLOG.md` | One step is the smallest evidence that the loop can grow; a second multiplies content before the frame is proven. | Progression becomes a system to balance, not a proof point. | B:160, R9 |
| 5. Win and loss on the same restart, each readable in one screen | A frame without a readable end state cannot be played to completion by a stranger; one restart keeps the cost of failure low. | Testers stop at an unclear end and the session measures confusion, not the slice. | authored; R8, E09 |
| 6. Sound, save, pause, restart, settings; values in data, save data untrusted | These are the production systems players notice by their absence; data-driven values keep tuning out of code and untrusted saves close the obvious exploit. | The build feels like a prototype and a hand-edited save breaks it. | authored; B:105, B:365 |
| 7. Reuse content at least twice; a one-use asset is scope creep | Reuse is the cheapest content multiplier and the thing S11 later scales; a one-use asset buys one screen for a full asset cost. | Content cost rises before G2 and the slice eats the S11 budget. | B:161, R9 |
| 8. Playtest 3-5 strangers: say what to try, watch silently, then think aloud, no leading questions, log confusion with timestamp and quote | Silence first prevents the tester from asking the author; think-aloud after the run adds the reason without contaminating the first attempt; a leading question manufactures agreement; a cleaned quote is the author's opinion. | The session returns politeness instead of confusion points, and the note cannot be trusted. | R8; S08 step 7; S09 step 5; D07 |
| 9. D07 note at `docs/playtests/<YYYY-MM-DD>-slice.md` with protocol, minutes to goal, per-point result, confusion points, quotes, verdict; then the G2 packet | The note is the durable record the packet cites; the fields are D07's and add the two slice-specific numbers (minutes, per-point result). | The packet cites a chat summary and the numbers cannot be re-read at G2. | B:263, D07, B:98 |

## Output

| Unit | Why | If removed | Source |
|---|---|---|---|
| Build on a clean machine, checklist with evidence per point, note, capture (CLI10), open questions with two options each | Evidence is a set, not a sentence: the build proves it runs, the checklist proves the points, the capture shows the frame, and two options per question keep divergence before convergence. | G2 reads a claim; a single-option question turns the gate into a rubber stamp. | R1, R7, B:240 |
| G2 packet = checklist, note, build, capture, questions; the agent never decides; the human answers proceed, fix or pivot, one line plus a date | The gate belongs to the human (R8) and the blueprint fixes the three answers and the one-line record. | The agent self-approves the gate, or the decision has no date and cannot be audited. | B:191, B:195, R8, R10 |

## Blocked

| Unit | Why | If removed | Source |
|---|---|---|---|
| No stranger: blocked, not passed; never invent a session | The core verdict depends on a person who did not build the game; an invented session is the one failure that poisons every later gate. | The skill reports a verdict it cannot have. | R8, E09 |
| Three fixes on one point without gain: stop, escalate; a boring slice is reported as boring | The attempt counter is the stop condition; the honesty clause keeps a dull result from being relabelled as a bug. | The agent loops on one point and reports progress that does not exist. | E08, E09 |
| Done in chat is not done: the build ran, the note exists, the capture plays | Restates the evidence test in the three artifacts a reader can open. | "Done" returns to being a sentence. | R1 |

## Out of scope

| Unit | Why | If removed | Source |
|---|---|---|---|
| Content (S11), polish (S12), a second loop, a new engine, a store page (S13); autonomy uses R10; new ideas to `BACKLOG.md` | Each exclusion has an owner and a later gate; naming them stops the slice from absorbing work that G2.5 has not frozen. | The slice grows into content and polish and G2 arrives late or not at all. | B:160, B:192, R9, R10 |

## Cross-refs

| Unit | Why | If removed | Source |
|---|---|---|---|
| R1, R7, R8, R9, R10; S02, S08, S09, S11; D07, G2, CLI10 | Every obligation in the body points at the part that owns it, so the skill loads alone and the reader can check the claim. | The skill restates rules from memory and drifts from the library. | B:136-145, B:152-163, B:240, B:263, B:191 |

## Disclosed overlaps

- Trigger exclusions and out-of-scope name the same neighbours. The trigger decides entry; out-of-scope stops work that starts mid-run. Different failure modes, so both stay.
- R8's human verdict appears in the role line, the tester input, step 8 and the G2 packet; each is a different check (why, who, how, who decides) and none is a restatement of the rule text.
- The 3-5 tester count and 20-30 minutes repeat S08/S09 numbers as the executable protocol, attributed there.
