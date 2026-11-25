# S12 polish — justification

Every semantic unit of `artifact/library/game/skills/polish/SKILL.md`: why it exists, what breaks if it is removed, and where it comes from. Source codes: `B:<line>` = `docs/V0.3-BLUEPRINT.md`; `R<n>` = `library/core/rules/`; `SRCn` = a row in `SOURCES.md`; `S02:42` = a line in the verify skill; `authored` = a judgment made here, grounded in the named part.

Two overlaps are deliberate and disclosed rather than hidden. The freeze appears at entry (Trigger), at the list (step 1), at feel (step 5) and at scope, because each is a separate place where a feature can re-enter after G2.5; removing any one leaves that door open. "No budget" appears as an input and as a blocked case: the first says what must exist, the second says what to do when it does not.

## Frontmatter

| Unit | Why | If removed | Source |
|---|---|---|---|
| `name: polish` | The ID S12 and every cross-reference use; the loader selects by it. | The skill cannot be selected or cited by ID. | B:162, rubric 9 |
| `description` | Names the frozen build, the budget comparison, the one-gap rule, feel, accessibility, saves, and the position after G2.5 and before G3, so selection happens at the right phase. | Selection falls back to the word "polish" and the skill fires on any bug-fixing request, including before the freeze. | B:162, B:192, B:193 |
| `allowed-tools: Read, Write, Edit, Glob, Grep, Bash` | Read/Glob/Grep find budgets and code; Write/Edit produce the evidence file and the card update; Bash runs the build and the profiler. | Without Bash the numbers are copied from chat; without Write there is no evidence artifact and R1 cannot be met. | R1, S02 (Bash steps), A03 permission set |

## Role line

| Unit | Why | If removed | Source |
|---|---|---|---|
| "after G2.5 nothing new enters; quality is the only work. R1 wants artifacts, R10 bounds the round, R9 prices it" | Fixes the phase, the currency (artifacts) and the two limits on a round in one sentence, so a reader cannot treat polish as an open-ended improvement pass. | The reader keeps the phase from memory, and the round has no cost ceiling. | B:192, B:162, R1, R9, R10 |

## Trigger

| Unit | Why | If removed | Source |
|---|---|---|---|
| "G2.5 passed and features are frozen; work until G3" | The only legal start is a completed freeze; the end is the ship decision, not "feels done". | Polish starts on a slice that still changes, so every measurement is against a moving build. | B:192, B:193, B:315-323 |
| "Not before G2.5, and not for mechanics, content (S11) or release (S13)" | Mechanics belong to gym and the slice; content has its own numeric budget; release work has its own checklists. Without the exclusions polish absorbs all three. | The skill is used as a general bucket, and its budget-based procedure is applied to work it cannot measure. | B:159-163, B:192 |

## Inputs

| Unit | Why | If removed | Source |
|---|---|---|---|
| "Budgets: FPS, frame time, load time, memory, build size, each a number from `project.config.json` or the engine pack (N00). No number, no target." | These five cover the frame, the wait and the install; a number is what turns a measurement into a pass or fail, and S02 already refuses a performance claim without one. Naming the source stops the agent from inventing a budget. | Every metric is judged by feel, and the round cannot produce a FAIL that anyone can act on. | B:88, B:292, S02:42, SRC1, SRC5 |
| "A runnable build, the scene that shows the problem, a save from the previous release, one human for feel" | Each item is the object that gets measured: a build for numbers, a named scene for a comparable frame, an old save for compatibility, a human for feel. | Measurements come from different scenes or from no build, and the save check is replaced by an opinion. | R1, R8, SRC4 |
| "Open bugs with severity and steps" | Triage needs a list with severity and reproduction before the round starts; otherwise the round invents work and the one-gap rule is bypassed by the first bug found. | Bug work is unbounded and unranked, and the round's single gap is chosen by whoever speaks last. | SRC8, SRC9 |
| "A contract (R10): goal, `max_files`, `max_minutes`, a checkpoint, and the `runs/AUTONOMY.jsonl` log" | The blueprint's autonomy fields are what make a polish round stoppable and auditable; without them an autonomous round has no ceiling and no record. | A round can edit anything for any length of time with nothing to review afterwards. | B:331-338, R10 |

## Steps

| Unit | Why | If removed | Source |
|---|---|---|---|
| 1. "Freeze the list. Record what is closed; a new idea is parked with its cost (R9)." | Writing the closed list makes the freeze checkable and gives every new idea one destination with a price. | Scope re-enters as a "small fix", and nobody can say what the freeze actually covered. | B:192, R9, SRC1 (fixed list of what is measured) |
| 2. "Measure before" into `evidence/<YYYY-MM-DD>-polish/profile.md`, budget column and measured column, raw logs beside it (R1) | A before number is the only baseline that makes "after" meaningful; two columns force the comparison to be visible; raw logs keep the number auditable. | The round reports an improvement with nothing to compare it to, which is the claim R1 exists to reject. | R1, S02:27-29, SRC2 |
| 3. "Pick one gap. Rank by measured/budget, take the largest. Park the rest with the number that justifies it" | The ratio makes the choice arithmetic rather than political, and the parked list keeps the found issues without turning them into this round's work. | The round spreads across five small fixes, no metric moves enough to show, and the deferred findings are lost. | R9, SRC5 (threshold), SRC6 (impact ranking) |
| 4. "Fix and re-measure. Change only what moves that number; same scene, same flags; keep the better result, revert the rest. Three attempts without movement: stop, escalate (E08)." | Same scene and flags are the control that makes the second measurement comparable; revert prevents a change being kept because it was expensive; the attempt cap matches the eval. | The "after" number is taken under different conditions, and a failed fix stays in the build because it was already written. | R1, SRC2 (smoothing), E08:208 |
| 5. "Feel pass. With a human: input to visible reaction under 100 ms, hitstop length, shake, sound, camera; one pass line per item. Tune values only; a new effect is a feature." | Numbers do not catch latency a player feels; 100 ms is the interaction threshold, and the five channels are where the feedback lives. The pass line per item turns "feels off" into something checkable, and tune-only keeps the freeze. | Feel is judged from a spreadsheet, latency ships, and a new effect is added under the name of polish. | R8, SRC3, B:192 |
| 6. "Accessibility. Text size and readability, contrast to WCAG AA, colour never the only cue, rebinding, pause that works. Fixes only, no new screens." | These five are the defects that block players outright; each has a criterion, and a fixed screen cannot become a redesign. | Unreadable text and colour-only cues ship, and accessibility work expands into new UI after the freeze. | SRC6, B:192 |
| 7. "Saves. Load a previous release save; if it fails, migrate and test old to new. Save data is untrusted input (X02)." | A save that fails to load destroys progress that no patch restores; the only remedies are a working reader or a migration, and both must be tested on a real old file. | Compatibility is asserted, not tested, and the first failure is a player's lost save. | SRC4, SRC7, B:285 |
| 8. "Triage bugs. Severity, reproducible steps, regression test; fix blockers and regressions, park the rest. Not every bug is this round's." | Severity and reproduction separate a fix from a guess; the regression test is what stops the bug returning; the last sentence protects step 3 from a bug list that would otherwise consume the round. | Every reported bug is fixed in order of arrival, the one gap is abandoned, and fixed bugs return. | SRC8, SRC9, R9 |
| 9. "Prove and document. Run S02 with a performance claim; update the card and `STATE.md` once green (R5); keep the profile table in the evidence folder, not the context (E10). G3 reads that folder." | S02 is the only accepted proof; R5 orders code before docs; the evidence folder is the record G3 reads, and keeping the table out of context respects the context budget. | The round ends with a chat claim, docs describe a build that was not verified, and the next round re-measures from zero. | S02:9, S02:40-42, R5, E10:210, B:340-347 |

## Output

| Unit | Why | If removed | Source |
|---|---|---|---|
| "`evidence/<date>-polish/`: profile table before and after, feel note (D07), a11y checklist, save test, triaged list" | Names the five artifacts that make the round reviewable and ties the feel note to its format. | Done can be declared without any of the five, and the critic has nothing to read. | R1, D07:263 |
| "Deferred gaps in `BACKLOG.md`; no publish, no spend (E12)" | Parked work must outlive the round; publish and spend are outside a polish decision. | Deferred findings vanish, and a polish round can push a build or buy a service. | R9, E12:212 |
| "A round report: gap, before and after, kept or reverted, deferred; numbers, not adjectives" | The report is the handoff to the next round and to the critic; the four fields match the steps one to one. | The next round repeats the diagnosis, and the critic cannot tell a kept change from a reverted one. | R1, B:336-338 |

## Blocked

| Unit | Why | If removed | Source |
|---|---|---|---|
| "No budget: FAIL, never profile against a guess" | A guessed target makes every number pass; refusing the round is the only honest outcome. | The skill produces PASS verdicts with no standard behind them. | S02:42, SRC5 |
| "No human: feel pass blocked, not skipped" | Feel cannot be measured by the agent; inventing a session is the failure R8 names. | A fabricated feel pass ships a build nobody played. | R8, E09:209 |
| "No old save: compatibility unproven, say so" | The absence of a test file is a result, not a pass; stating it keeps the G3 decision honest. | Compatibility is assumed from code review. | R1, SRC4 |

## Out of scope

| Unit | Why | If removed | Source |
|---|---|---|---|
| "New features and content, balance changes, refactors without a measured gap, store and release work (S13)" | Each item has an owner and a different evidence standard; the measured-gap clause also blocks refactors that improve nothing measurable. | Polish becomes the place where every unfinished thing lands, and the freeze has no meaning. | B:161, B:163, B:192, R9 |

## Cross-refs

| Unit | Why | If removed | Source |
|---|---|---|---|
| "G2.5, G3, S02, S10, S11, S13; R1, R5, R9, R10; E08, E10, E12; D07" | One line lets a reader reach every owner used above without loading the library. | The reader has to rediscover which part owns the freeze, the proof and the stop rule. | B:136-145, B:152-163, B:192-212, B:263 |
