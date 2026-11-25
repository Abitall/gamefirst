# JUSTIFICATION — S08 `prototype`

Semantic units of `artifact/library/game/skills/prototype/SKILL.md`. One row per unit
that carries meaning. "Breaks" names what fails if the unit is deleted, not what
reads worse. Sources: `docs/V0.3-BLUEPRINT.md` (blueprint), `docs/REVIEW-RUBRIC.md`
(rubric), rules by ID, and the nine repositories in `SOURCES.md` by short name.

## Frontmatter

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| `name: prototype` | Skill lookup key; must match folder and blueprint ID S08. | Skill cannot be resolved or cross-referenced; directory name becomes the only handle. | blueprint S08; convention in `library/core/skills/verify/SKILL.md` |
| `description` names fun, feel, feasibility, 1–2 days, throwaway, and three exclusions | The description is the only text loaded when the skill is not invoked; it must carry the trigger boundary, not just the topic. | Agent may load it for content work or a known fix, wasting the timebox; the 1–2 day budget disappears from the routing decision. | blueprint S08; rubric trigger criterion; KEP Non-Goals (stated exclusions) |
| `allowed-tools: Read, Write, Edit, Glob, Grep, Bash` | `Write`/`Edit` for the prototype folder and report, `Bash` to run the build, read tools to reuse the engine pack. | No build can be created or launched; the skill would describe work it cannot perform. | existing skill frontmatter; blueprint S08 output list |

## Opener

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "buy one answer with a throwaway build" | States the transaction the whole skill performs: cost is a build, payment is one answer. | Reader can mistake the prototype for a deliverable and start polishing it. | ncase/trust (a playable piece built to settle one question); blueprint S08 |
| "The code goes; the answer, capture, and report stay." | Separates discardable and durable outputs before any step is read. | Teams archive prototype code, or discard the only evidence; R1's prototype-mode exception loses its guard. | R1 (throwaway build allowed, evidence kept); Aider dated run folder |
| "R8 owns fun, R1 owns evidence." | Routes the two contested claims to their owners instead of restating them. | Skill would duplicate R8/R1 text and drift from them. | R8, R1; cross-reference convention |

## Trigger

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "One question a document can't settle: is it fun, does it feel right, can the engine do it in time." | Names the three question classes the artifact can answer and the document cannot. | Skill gets used to re-answer written questions, producing a build with no new information. | blueprint S08 ("fun, feel, or feasibility"); RFC Unresolved questions |
| "After S06 and before production: the cheapest place to be wrong." | Places the skill in the pipeline and supplies the economic reason for its timing. | Overlaps with S06 divergence and with production work; the cheapest-wrong argument for prototyping is lost. | blueprint pipeline G0→prototype→G1; PuzzleScript (rules first, cost low) |
| "Not for a known fix (S02), content (S11), a mechanic you keep (S09), or the slice (S10)." | Four named redirects prevent the most common misuses. | Every fix or content task becomes a "prototype"; the 1–2 day budget is consumed by work that already has a known answer. | blueprint scope split; KEP Non-Goals; R9 |

## Inputs

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "The question, one sentence, answered yes or no, or by a number." | Forces a falsifiable question; a sentence limit blocks compound questions. | Question stays open-ended, the build cannot settle it, and the verdict becomes an opinion. | openai/evals (declared metric per eval); RFC Unresolved questions |
| "Success and kill criteria set before the build: what result keeps it, what result kills it." | Pre-declared both directions; kill criteria are the part teams skip. | Post-hoc rationalisation: any result is read as success, and sunk cost decides. | KEP Graduation Criteria + Drawbacks; github/scientist (control vs candidate declared up front) |
| "Constraints: target platform, 1–2 days, what may be faked." | Declares platform and budget before building; permits deliberate fakes. | Prototype is built on the wrong platform or grows past the timebox; the team argues later about what was allowed. | blueprint S08 (1–2 days); C01 prototype-crew |
| "Placeholders: rectangles, one font, sound only if that is the question; fake anything that can't change the answer." | Sets the asset floor and a test for every candidate asset. | Art production enters the prototype, or the build is starved of the one placeholder that matters; scope creep through assets. | Godot demo projects (smallest self-contained loop, art not the point); trust (mixed asset licences as a warning) |

## Steps

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| 1. Ask one question; a second question is a second prototype | One build, one answer; keeps the report unambiguous. | Two questions share one build, results confound, and the verdict cannot be attributed. | Phaser examples (one scene per API question); Godot demos (one folder per demo) |
| 2. Fix criteria before the first line of code; no criteria, no build | Converts the timebox into a decision procedure, not a period of work. | The build becomes exploration without a stop condition; kill criteria are invented after seeing results. | github/scientist; KEP Graduation Criteria; openai/evals |
| 3. Build in `prototypes/<YYYY-MM-DD>-<slug>/` from the engine pack's empty scene (N00), on the target platform, no `src/`, no production code or assets | Path isolates throwaway work, naming makes it findable, engine pack gives a running base, `src/` ban enforces discardability. | Prototype code leaks into production and must be maintained; builds cannot be found or compared by date. | R1 prototype mode; Aider dated run folder; engine pack N00 |
| 4. Greybox the smallest thing that answers it; cut features that cannot change the answer | The cut test is the scope rule for the build. | Prototype grows into a small game, timebox slips, and the answer arrives too late to change a decision. | Godot `2d/dodge_the_creeps`; PuzzleScript (rules only) |
| 5. Debug HUD: state, last input, key values; the player must read state without help | Makes the build self-explaining during playtest and in the capture. | Observer has to narrate state or ask; confusion is misread as a design problem instead of a readability problem. | blueprint S08 (debug HUD); trust (observation inside the piece) |
| 6. Log runs to `runs.jsonl`, one line per attempt: time, input, result; a capture is not the record | Machine- and human-readable run log survives the build; video alone is unsearchable. | Only footage remains; counts, timings and sequences cannot be compared or quoted in the report. | Aider `--stats` report + dated runs; R1 evidence; github/scientist records |
| 7. Playtest 15–20 minutes with a human; say what to try, then stay quiet; quotes in a D07 note | Fixes session length to the R8 protocol and protects observation from leading questions. | Fun verdict rests on the builder's own play; quotes are paraphrase and cannot be audited. | R8 (15–20 min, D07 note); blueprint D07 |
| 8. Capture 30–60 s of the loop, not a menu or a scripted scene | Forces the evidence to show the loop rather than a staged impression. | Evidence shows a menu or a scripted moment; reviewers cannot judge feel. | R8 evidence; blueprint S08 (video); Aider run artifacts |
| 9. Answer against the criteria: yes, no, or the number | Closes the loop back to Inputs; the answer format is fixed in advance. | Answer drifts to narrative and cannot be checked against the criteria that justified the build. | github/scientist comparison; openai/evals metric |
| 10. Verdict keep, kill, or retune; one line and a date | Three outcomes plus a timestamp; prevents "it has potential" as a result. | No decision is recorded, the prototype is neither closed nor promoted, and the same question is re-prototyped later. | R8 (keep/kill/retune); KEP graduation decision |
| 11. `REPORT.md`: question, method, observations, answer, verdict | Fixed fields keep reports comparable across prototypes and sufficient for G1. | Reports vary in shape; the question, the criteria and the verdict cannot be found in the same place. | KEP Summary + Implementation History; Aider stats report |
| 12. Discard the build; promote the learning to S09 or S10; code never graduates; new idea to `BACKLOG.md` | Splits the two destinations and blocks code promotion while preserving the idea. | Code is promoted into the loop or slice, carrying prototype debt; or the learning is discarded with the build. | R1; R9; PuzzleScript (rules survive, implementation does not) |
| 13. Update `STATE.md` (next action) and `BACKLOG.md` (what waits) | Writes the outcome into the two files that drive the next session. | Next session re-derives the state; the promoted idea and the deferred one are lost. | R9; R10 checkpoint; blueprint STATE/BACKLOG |

## Output

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "One folder holds the runnable build, `runs.jsonl`, the capture, `REPORT.md`, verdict" | Names the complete deliverable in one place; `runnable` is the R1 bar. | Output is scattered; a report without a build or a build without a report passes as done. | R1; blueprint S08 output |
| "Two days with no answer is an answer: report it." | Converts timebox expiry from failure into a reportable result. | Team extends silently or hides the null result; the question stays open with no record. | blueprint 1–2 days; R8 (boring is a result, E09) |

## Failure behavior

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "No human: no fun verdict; G1 stays blocked." | Hard gate: a fun claim without a human is not evidence. | Agent self-reports fun and G1 opens on no evidence. | R8; blueprint G1 |
| "Kill criteria hit: kill it, name why. A boring build is a result (E09)." | Makes a negative result a legitimate, reportable outcome. | Teams retune past the kill line to justify the time spent. | R8; KEP Drawbacks |
| "Timebox spent: stop, answer with what exists; never extend to save the build." | Names the exact temptation and forbids it. | Sunk cost extends the prototype into production time; the answer still does not arrive. | blueprint 1–2 days; PuzzleScript iteration discipline |
| "Autonomous: R10 contract with `max_minutes` and a checkpoint report." | Maps the human timebox onto the autonomy budget rather than inventing a second limit. | Autonomous runs have no stop condition or no report, so the verdict cannot be trusted. | R10 |

## Out of scope and Cross-refs

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| "Production code, assets, polish, content, a GDD, scope, a third day." | Enumerates the six things the prototype attracts; each has a different owner. | Scope creep enters through the most tempting door, and the artifact grows a GDD it must not have. | R5 (no GDD for unbuilt system); R9; blueprint priority |
| "A prototype never ships, never sets scope" | Two absolute claims that no downstream section can override. | Prototype quality becomes a shipping argument; prototype scope becomes the plan. | R1; R9 |
| "A02 owns the question and criteria, A03 the build, R7/S06 next variants." | Routes adjacent work without restating it, per the no-duplication rule. | Skill duplicates A02/A03 content and drifts; users cannot tell which doc is authoritative. | blueprint A02, A03; R7; S06 |
| Cross-refs line `R1, R7, R8, R9, R10, S02, S06, S09, S10, A02, A03, G1` | Machine-checkable link set; proves each cited ID exists and was considered. | References become prose and cannot be validated; orphan references go unnoticed. | existing skill convention (`import/SKILL.md`) |
