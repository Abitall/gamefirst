# S03 retrospect — justification

Every semantic unit of `artifact/library/core/skills/retrospect/SKILL.md`, why it exists, what
breaks if it is removed, and where it came from. Source column values: `BP` = `docs/V0.3-BLUEPRINT.md`,
`RB` = `docs/REVIEW-RUBRIC.md`, `R1`–`R10` = `library/core/rules/`, `A01` = `library/core/agents/partner.md`,
`S#` = numbered source in `SOURCES.md`, `brief` = the S03 task boundary.

| # | Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|---|
| 1 | `name: retrospect` frontmatter | Loader and command lookup key; must equal the directory name | Skill cannot be loaded or matched to S03 | BP line 150, `SL05 /retro` line 247 |
| 2 | One-line `description` | Selects the skill by intent; states the whole promise in one line | Selector cannot separate retro from verify (S02) or report | brief, RB §9 |
| 3 | `allowed-tools: Read, Glob, Grep, Write` | Write is needed for the retro file; Bash is not, because evidence is read, not regenerated; no Edit so a past retro is never modified in place | Retro re-runs the stage under the guise of "gathering evidence", or quietly edits history | brief, R1, R6 |
| 4 | Locating line "S03 and `/retro` … R6 owns what happens to a rule" | Names the part, its command, its one job, and its neighbour | Reader turns the retro into a postmortem essay or into a rule edit; scope collides with R6 | BP line 150, R6 line 61 |
| 5 | Trigger: gate decides, pass or fail | The gate is the scheduled boundary where evidence is fresh | Retro depends on the agent remembering; passes are never reviewed | BP gates §, RB §2 |
| 6 | Trigger: three attempts (E08) or a surprising playtest (R8) | The two mid-stage events that already carry a stop signal | The burned-attempts case is absorbed into "keep trying"; a surprising playtest is filed as a bug | R10, E08, R8 |
| 7 | Trigger: before the next stage opens | Hard deadline, so the retro lands while its evidence is readable | Retro drifts to "later" and is written from memory | brief, BP non-negotiable "evidence over claims" |
| 8 | Inputs: evidence, build output, `runs/*.jsonl` | The only admissible material | The retro argues from recollection; claims become unfalsifiable | R1, R3 |
| 9 | Inputs: the diff or artifact | Locates the exact change under review | "What failed" cannot be tied to a commit, so the root cause is a guess | RB §3 |
| 10 | Inputs: `docs/playtests/*.md` (D07) | Human observation cannot be reconstructed afterwards | Feeling-driven lessons are lost or invented | R8, BP D07 |
| 11 | Inputs: `STATE.md` budget, gate state, parts; `runs/AUTONOMY.jsonl` under a contract (R10) | The retro must know what the stage promised and why a run stopped | Over-budget work is judged as a personal failure instead of a planning one; the stop reason is missed | R9, R10 |
| 12 | Step 1: only claims with an artifact, verified by S02 | Kills the "partially done" answer and reuses the verifier instead of duplicating it | Step 2 sorts opinions rather than observations | R1, E03, S02 |
| 13 | Step 2: observation vs interpretation, delete orphans | The method, not a reminder: it makes the cause checkable | The "why" line becomes an interpretation with no evidence under it | S3 (OpenRA), S5 (postmortem) |
| 14 | Step 3: one root cause, removal test | Gives a decision rule for choosing among symptoms | The retro lists five causes and fixes none | S2 (godot-proposals), S7 (RFC motivation) |
| 15 | Step 4: smallest change, R6 ladder | Enforces "one change" and sends additions up the ladder | Every retro ends by adding a part | R6 ladder, BP non-negotiable |
| 16 | Step 5: check and date; no check is a wish | Makes the change falsifiable after the fact | Change is unverifiable and returns next stage | R6 "a part with no failing check is a wish", E03 |
| 17 | Step 6: `docs/retro/<YYYY-MM-DD>.md` plus one `STATE.md` pointer | The dated record is the only durable trace; the pointer makes it findable | Retro lives in chat and evaporates at the next compaction | brief, S1 (bevy release content), S8 (aider HISTORY) |
| 18 | Step 6: a second retro the same day adds `-2` | The date-only path from the brief collides twice in a day | The second retro either overwrites the first (forbidden by unit 18) or has no legal name | brief path, S1 dated records |
| 19 | Step 6: failed attempt stays, later entry points back | Defines "no rewriting history" as an action | Records are overwritten once fixed, so the same failure cannot be counted twice | R6 two-failure proof, S6 (ADR supersede) |
| 20 | Step 7: two retros → R6 with trigger, input, output, done check; single annoyance → `NOTES.md`/`lessons/` | The escalation condition and the anti-noise valve in one step | Either every annoyance becomes a rule, or a real repeat never escalates | R6, brief "same failure twice", BP `library/lessons/` |
| 21 | Output block: five lines, each with an evidence path | The deliverable, and the shape that keeps it to one screen | No fixed shape → retro length becomes a style question | brief five lines, BP line 150 |
| 22 | The five lines are Worked / Failed / Why / Change / Next | Brief has five items including "why"; blueprint's separate "add/delete" collapses into Change | A separate add/delete line invites two changes, doubling the change budget | brief, BP line 150 |
| 23 | One owner per change; one page; two pages = two retros | Prevents an ownerless change and an unbounded document | Change has no one to land it; retro grows into a report | S5 (postmortem action items), RB §5 |
| 24 | Handoff: memory item to M01, re-check to S02 | Names where the lesson and the result go after the file is written | Lessons pile up in retro files and never reach memory or verification | BP M01 "promotion through retrospect", E07 |
| 25 | Failure: no evidence is the finding | Removes the blank-line escape | Missing evidence reads as "nothing to report" | E03, R1 |
| 26 | Failure: two changes → keep the checkable one, park the other in `BACKLOG.md` | Resolves the common overflow without expanding the stage | The retro silently becomes a feature request list | R9 |
| 27 | Failure: "communicate better" is not a change | Bans the vague change the brief names | Retro closes with a feeling and no artifact | brief boundary |
| 28 | Failure: a person or model named as cause is restated as decision or missing check | The no-blame rule, expressed as a rewrite step | Retro becomes a trial and the cause stays a person | brief "no blame", S4 (C:DDA review guide), S5 |
| 29 | Failure: the stage passed, still write five lines | The pass is the most likely empty retro | Success leaves no record, so what worked is not protected | S9 (evals), RB §2 |
| 30 | Out of scope list (R8, E07/M01, R6, R6→S05, S04, A01) | Assigns every adjacent job to its owner in one line | Retro absorbs gate running, tool creation, and rule changes | R6 line 61, BP S04/S05, A01 |
| 31 | Closing line: never blocks a stage, feeds the next one | Keeps the retro out of the gate mechanism | A failed retro becomes a blocker, and the stage stalls on prose | RB §2, BP gate list (G0 and G2.5 are not gates) |

## Fit decisions

| Question | Decision | Why this wins | Compensating change outside the artifact |
|---|---|---|---|
| `docs/retro/` is absent from the game tree (blueprint lines 96–100) | Keep `docs/retro/<YYYY-MM-DD>.md`; the file holds the record and `STATE.md` holds one pointer line (units 17, 18) | `docs/playtests/` holds D07 notes — one page, protocol and verdict, read by R8 at G1 — so retros would sit in the wrong folder and step 7 would grep playtest notes for lessons; `STATE.md` alone is a rolling snapshot, and an append-only record cannot live in something overwritten every stage | Batch 4 adds one line for `docs/retro/` to the tree so N00 creates it; without it only the `STATE.md` pointer survives and the history step 7 counts on is lost |
| Blueprint line 150 reads "worked, failed, change, add/delete, next"; the artifact reads `Worked / Failed / Why / Change / Next` | Keep `Why`; add/delete becomes the content of `Change` (units 21, 22) | The S03 brief lists a why line and folds add/delete into the change; two change slots would contradict "no more than one change"; step 7 compares causes, so without a cause line "the same failure twice" can only be matched by wording; R6 makes any addition name the part it replaces, so the deletion keeps a home | Blueprint line 150 becomes "worked, failed, why, change (what it adds or deletes), next"; the literal alternative makes the skill six lines or buries the cause in prose |

## Deliberate omissions

- **No timeline or incident-severity section** (present in the SRE-book and Azure templates): stage work
  already leaves `runs/*.jsonl` and a diff, and one fact in one place forbids restating them in the retro.
- **No "five whys" or fishbone**: both produce a chain of causes and contradict step 3, which asks for the
  one cause whose removal drops the other symptoms.
- **No blame paragraph or psychology section**: a single rewrite bullet covers it; a section invites
  moralizing and grows with every incident.
- **No stored lesson list inside the skill**: `library/lessons/` and M01 own the store; a list here would
  duplicate memory and drift.
- **No review/approval step and no comment period** (RFC and godot-proposals have both): a solo stage has
  no committee; the gate is the approval.
- **No retro-file template beyond the five lines**: the five lines are the template; a second template is
  a second place to change.
