# C01 justification

Every unit of `prototype-crew.md` in file order: why it exists, what breaks in
the pipeline without it, and where it comes from. Sources are the installed
artifacts, not the research repos; repo evidence is in `SOURCES.md`.

| Unit | Why | What breaks if removed | Source |
|---|---|---|---|
| Purpose paragraph: one answer, one to two days, disbands | Names the crew as a bounded mechanism with an end date | Crews outlive their verdict and turn into the permanent council the blueprint forbids | Blueprint C01 row; non-goals |
| Trigger: fun, feel, or feasibility; core loop; after G0, before G1 | Keeps crews out of content, polish, and known fixes, which have cheaper skills | Every task spawns a crew, and S08/S09 triggers are duplicated | S08 Trigger; blueprint G1 |
| One crew per question, G1 counts this iteration | Ties the crew to one of the three to five loop iterations G1 needs | A crew that answers several questions produces one untraceable verdict | Blueprint G1; S08 Step 1 |
| A01 leads: clock, STATE, gate line, report, R2 questions | One owner for the date, the state file, and the user dialogue | No gate line, no state update, and several agents ask the user at once | A01 Duties; R2 |
| A02 writes question, pass and kill criteria, alternatives | A criterion makes the answer falsifiable; alternatives stop the first idea from winning by default | A prototype without a pass line proves nothing and R7 is skipped | S08 Inputs and Step 2; R7 |
| A03 builds scene, HUD, log, capture; never redesigns | Build is truth: the scene and its log are the evidence, not the description | The verdict rests on memory of the build, and design decisions enter through code | A03; R1 |
| A04 absent until divergence closes | Divergence must not be judged while it is open | The critic kills options before they are tried, which inverts R7 | R7; A04 blind protocol |
| Input: all five or no crew | Turns a soft checklist into an entry condition | Crews start without criteria and deliver opinions with a build attached | S08 Step 2 ("No criteria, no build") |
| Timebox as the R10 contract | Goal, done, budget, stop, and report are fixed before work starts | Scope grows until the prototype is a product; R9 and R10 are broken | R10; S08 Inputs |
| Day-one stop rule: something playable or stop | Makes the second day a tuning day, not a rescue | A two-day crew spends both days on setup and reports nothing | R10 checkpoints; S08 Step 3 |
| Human plays 15-20 minutes, crew silent, R8 | Feel is measured on the loop with a human, not inferred from code | The verdict becomes the crew's taste, and R8 has no artifact behind it | R8; S08 Steps |
| Capture 30-60 s, one log line per run, log at `prototypes/<YYYY-MM-DD>-<slug>/runs.jsonl`, R1 | The evidence must be cheap, dated, and re-openable after the build is gone; a named path makes the log findable without the crew | Claims cannot be checked, the log lands nowhere in particular, and the capture is a screenshot of nothing | S08 Steps; R1 |
| Verdict as a recommendation, one line plus a date; G1 owns the final call | Separates the crew's advice from the gate decision, as S09 does for kill | The crew's keep silently becomes the gate, and G1 has no decision to make | Blueprint "one line plus a date"; S09 Step 6 |
| Keep hands the mechanic to S09 | The throwaway build must not become the tuned build | The prototype scene turns into production code and the discard step is lost | S08 Outputs; S09 |
| Output path, only report, log, and capture survive, STATE and BACKLOG updated | The next crew reads files, not memory; the build is disposable | The question is repeated by the next crew, the runs log is lost, and the prototype is kept "just in case" | S08 Outputs; A01 Duties |
| Limits: no publish, no scope growth, kill needs new evidence, stop after three | Closes the exits that make a two-day crew unbounded | Prototype code is pushed, BACKLOG fills with side ideas, and a blocked crew loops | R4; R9; R1; E08 |

## What was deliberately left out

- A critic inside the crew: it would review before divergence, which R7 places after.
- Any autonomy contract beyond the timebox: R10 fields are named, not restated, so the rule stays the single source.
- A template for `REPORT.md`: S08 owns the report shape; a second template would drift.
- Handoff to S10: the slice crew starts from the verdict, and C01 has no slice work.
