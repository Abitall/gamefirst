# S11 content - justification

Every semantic unit of `artifact/library/game/skills/content/SKILL.md`: why it exists, what breaks if it is removed, and where it comes from. Source codes: `B:<line>` = `docs/V0.3-BLUEPRINT.md`; `R<n>` = `library/core/rules/`; `S02:<line>` = `library/core/skills/verify/SKILL.md`; `SRCn` = row in `SOURCES.md`; `authored` = a judgment made here, grounded in the named part.

## Frontmatter

| Unit | Why | If removed | Source |
|---|---|---|---|
| `name: content` | The id the loader and every cross-reference use; it matches the S11 row. | The skill cannot be selected or cited by ID. | B:161, rubric 9 |
| `description`, first sentence: budget, one unit, reuse first, cut list, per-unit count and per-batch sample | The description is what the selector reads before the body; it names the four constraints that separate this skill from "make some content". | Selection degrades to the keyword "content" and the skill fires on any content-shaped request, including polish. | B:161, R9 |
| `description`, second sentence: after G2, not for mechanics, systems, polish | Phase guard and negative scope in the line that is always loaded. | The skill is invoked before G2 or for S09/S12 work, and the body is read too late to stop it. | B:191, B:192 |
| `allowed-tools: Read, Write, Edit, Glob, Grep, Bash` | Read the G2 record, cards and build; write data and the note; edit config; run the build and S02. No network, no publish. | Without Write/Edit there is no content; extra tools widen the blast radius for no gain. | R3, R4, A03 permission set |

## Role line

| Unit | Why | If removed | Source |
|---|---|---|---|
| "the slice proved the systems (S10); content fills them to the count G2 wrote, and not one past it" | States the dependency (systems exist) and the ceiling (the gate's number, not the producer's appetite). | Content starts before the slice proves the loop, or grows past the budget because nothing names the ceiling. | B:160, B:161, B:315 |
| "R9 owns the budget, G2.5 freezes features, R1 wants a count and a sample" | Three constraints in one line: who sets the number, what may not be reopened, what counts as evidence. | The steps have to be read as a whole to recover the constraints, and the freeze is the one most often reopened by accident. | B:144, B:136, B:322, R1:21 |

## Trigger

| Unit | Why | If removed | Source |
|---|---|---|---|
| G2 says proceed, the slice is accepted, systems and data paths exist | The only moment content can be produced without guessing: the loop is proven and has places to put units. | The skill fires after a design doc or a prototype keep, and produces content for systems that do not exist. | B:191, B:315, S10 |
| Not for a mechanic or system (G2.5), tuning (S09), polish (S12), or content without a number from G2 | Routes adjacent requests to their owners; a content request with no G2 number is the failure mode this skill exists to refuse. | S11 absorbs tuning and polish work, and accepts a content task whose budget lives only in someone's head. | B:192, B:322, S09, S12, R9 |
| G2.5 freezes features: content and polish only | Separates classification from state: bullet 2 says what the work is, this says that even allowed content may not reopen a feature. | A unit that needs a new system is argued through as "just content" after the freeze. | B:322, B:192, R9 |

## Inputs

| Unit | Why | If removed | Source |
|---|---|---|---|
| The G2 record: units per type (levels, enemies, items, words, minutes), what the count includes and excludes, and iterations allowed | A budget is numbers with boundaries; "what counts" stops a level being counted as ten minutes, and the iteration cap stops an open-ended stage. | "Numeric budget" degrades to "some content", and the stage has no stop condition. | B:161, R9, SRC8 |
| The cut list in order: what leaves first, its cost, and what the build loses | Cutting is cheap only when the order was agreed before the deadline; cost and loss make the trade visible instead of silent. | Cuts are negotiated under pressure, and the first thing cut is whatever is least defended, not least valuable. | R9, B:144 |
| The reuse matrix: each unit, its approved system, the existing asset or config entry it reuses; no row = new scope | Forces reuse before new production and makes a new system visible while it is still a row, not after it is built. | Every unit quietly adds assets and config; the content stage becomes a feature stage. | SRC1, SRC2, R9, E06 |
| The running build, system cards (D06), asset license rules (X02, P03) | Evidence must come from the build; the card names the config keys a unit writes; licenses and save data are security subjects. | Validation becomes a chat claim, and an imported asset ships without a license check. | R1, B:262, B:285, B:305 |

## Steps

| Unit | Why | If removed | Source |
|---|---|---|---|
| 1. Freeze the numbers in `STATE.md`: counts, iterations, cut order; "a number not written is not a budget" | R9 requires the stage to open with the gate's numbers written down; freezing them stops a moving target. | Numbers live in chat, drift between agents, and A04 has nothing to check the stage against. | R9, B:144 |
| 2. Fill the reuse matrix first; every unit names system, reused asset or entry, one delta; a unit that reuses nothing is new scope, park it | Order matters: reuse discovered after the work is a rewrite. The "one delta" rule is the unit definition borrowed from the game data examples. | Units are built first and classified later, which is how a new system enters as "content". | SRC2, SRC1, R9, E06 |
| 3. One unit at a time, safest first: the last on the cut list, so a cut costs one unit | Small batches keep evidence attributable and keep a cut from discarding a batch. Starting at the cut-list tail makes the first cut the cheapest. | Units land in batches, a failed check blocks all of them, and a deadline cut throws away work that was not at risk. | R9, authored |
| 4. Add data, not code; values in `src/data/`; a hardcoded number in a system is a bug, not content | Content is data; a literal in a system cannot be tuned, counted, or validated as a unit. | Every new unit edits a system, so content changes become code changes and the count cannot be read from data. | B:105, R5, SRC6 |
| 5. Record a license for every imported asset (X02, P03); no asset ships without one | A per-asset license line is the cheap form of a license gate; it is checked once, at import, not at release. | Unlicensed assets reach the build and are found at release, when replacement is expensive. | SRC3, SRC5, B:285, B:305 |
| 6. Validate in the running build: count matches the budget; one sample per batch and a D07 note; data alone is not done | R1 defines content evidence as a count plus an opened sample; the note is the durable record S02 can cite. | A JSON file that parses is declared done with no one having played the batch. | R1:21, B:263, SRC7 |
| 7. Run S02 with the `content` claim per unit or small batch; a red check stops production, not the budget | S02 owns the independent check; the content claim has its own evidence row. A red check stops the line, but cutting is a budget act, not a panic. | The producer certifies their own content, and a failing build is argued around instead of stopping the line. | S02:20, S02:38, R1 |
| 8. Keep saves loadable: an old save loads with the new content, or the unit does not ship (X02) | Save compatibility is a release property that degrades one unit at a time; the check belongs at the unit. | Units ship that break existing saves, and the break is discovered at release. | SRC4, B:285 |
| 9. Cut before extending; cut in list order; over budget means cut or park, never expand | Names the only allowed response to a shortfall, in R9's own terms, so the escape hatch is not "raise the budget". | The stage expands its budget to fit the work, which is the scope failure R9 exists to prevent. | R9 |
| 10. Report produced against budgeted counts, cuts, reuse share, open questions; update `STATE.md` and `BACKLOG.md` | The stage ends with numbers a gate and A04 can read; parked ideas go to the backlog, not into the build. | The next gate decides on prose, and parked scope leaks into the next stage. | R9, E06, B:161 |

## Output

| Unit | Why | If removed | Source |
|---|---|---|---|
| Content at the G2 count inside approved systems: each unit a count, each batch a sample and a D07 note; S02 green | Defines done as produced units plus evidence plus an independent check, not as "content written". | The stage can be declared done with data files and no playable evidence. | R1:21, S02, B:263 |
| A cut record and a reuse matrix checked line by line | The two artifacts R9 says S11 owns; they make the budget auditable after the fact. | The budget cannot be reconstructed, and reuse claims are unverifiable. | R9, B:161 |

## Failure behavior

| Unit | Why | If removed | Source |
|---|---|---|---|
| No budget at G2: stop, ask for the number (R2); content without a number cannot be cut | Missing data is a permitted question under R2; inventing a number silently changes scope. | The agent picks a plausible count and the gate cannot tell it was invented. | B:137, R9 |
| A unit needs a new system: park it (E06), cut it | The scope guard's exact move: the idea lands in the backlog, not the build. | The unit is built as an exception and the stage gains a system. | B:206, B:192 |
| Three units fail validation: stop and escalate (E08); the system, not the content, is broken | Three failures is the stop signal; the wording points the escalation at the system so the response is not "try harder units". | Failures are retried one by one until the stage burns its iterations. | B:208 |
| Autonomous: R10 contract, a checkpoint per unit batch | Autonomy needs a contract with checkpoints; a batch is the smallest unit a human can review without redoing the work. | An autonomous run produces a whole content set before the first review. | B:145 |

## Out of scope

| Unit | Why | If removed | Source |
|---|---|---|---|
| New mechanics, systems, modes (G2.5); tuning (S09); polish (S12); release (S13); marketing (P07); ideas to `BACKLOG.md` (R9) | Each boundary names the owner of the adjacent work, so the skill cannot grow into a mini-production phase. | S11 absorbs tuning, polish and release tasks, and the freeze is renegotiated by accident. | B:192, B:322, R9, S09, S12, S13, B:309 |

## Cross-refs

| Unit | Why | If removed | Source |
|---|---|---|---|
| One locator line, IDs only, no restated rule text | The rules own their content; the skill points. Restating would fork the truth and drift. | Readers get a second, aging copy of R1/R9 inside a skill. | Blueprint priority (rule > skill), rubric 1, rubric 9 |

## Design decisions and rejected alternatives

| Decision | Rejected alternative and why | Source |
|---|---|---|
| One skill for all content types | Per-type skills (levels, enemies, items): the procedure is identical, and the types are already a field in the G2 record. Splitting triples the maintenance for no new check. | B:161 |
| Ten short steps | A checklist without order: the reuse matrix must precede production, and validation must follow each unit; a flat list loses both. | R9, SRC2 |
| Numbers are placeholders from G2, no examples in the artifact | Example counts ("10 enemies") become targets and are copied as if approved. | authored |
| Reuse matrix is a step and an output, not a template file | A separate template adds a document to maintain; the matrix is small enough to live in the note and `STATE.md`. | R9, R5 |
| D07 note per batch | One note per unit: sharper, but it multiplies documents and S02 already checks each unit's count. The batch sample keeps the playable evidence; the cost is disclosed in REPORT. | B:263, R1:21, S02:31 |
| Save compatibility as a unit gate | A release checklist item: by then the break is in the save format and the fix is a migration. | SRC4, B:285 |
| G2 and G2.5 are cited, not defined | Defining gates inside a skill would fork the blueprint and make a skill the source of gate behavior. | B:191, B:192, priority |
| No content schema or data format | A schema is a technical decision that belongs to the system cards and the engine adapter; S11 asks for data, not a shape. | B:105, D06 |

## Deliberate omissions

| Omission | Why it is out |
|---|---|
| A catalog of content types | The types are game-specific and already a field in the G2 record. |
| A budget spreadsheet or template | One page per doc (R5); the numbers live in `STATE.md`. |
| Asset import and conversion steps | X02 and P03 own licenses and the asset pipeline. |
| Writing quality, voice, narrative | Other owners; S11 counts and validates units, it does not write prose. |
| Localization | Not in the MVP scope. |
| A PASS/CONCERNS/FAIL verdict | Gates own verdicts; S11 produces and reports. |

## Known tensions

- R6 was considered and rejected: it governs additions to the library, not game systems. G2.5 is the binding freeze; R6 no longer appears in the role, trigger, out-of-scope or cross-refs.
- Step 6 asks for one D07 note per batch, not per unit. S02:38 still checks the `content` claim per unit or small batch; the batch sample is the playable evidence, and REPORT flags the cost of a batch hiding which unit failed.
- Trigger bullet 2 and Out of scope both name tuning and polish. Kept because the trigger answers "may I start this at all" and out-of-scope answers "what may I build once started".
- 767.50 chars/4 leaves 12.50 characters of headroom. The last cuts were made for accuracy, not space: R6 was removed, and step 9 was rewritten to R9's "cut or park, never expand".
- The word estimate (547 x 1.35 = 738.45) is inside the band, but chars/4 remains the binding proxy.
- "Iterations" is not defined in the blueprint; step 1 freezes whatever number G2 wrote, and REPORT asks whether it means production loops or playtest sessions.
- Save compatibility is stated as behavior; no save file, format, or migration owner exists yet.
