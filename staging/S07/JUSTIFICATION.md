# S07 engine-choice - justification

Every semantic unit in `artifact/library/game/skills/engine-choice/SKILL.md`. `Why` is the job it does; `Breaks` is the failure a reader sees if it is removed; `Source` is the blueprint line, rule, or repository in `SOURCES.md`. All units are synthesized; no source text is copied.

| Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|
| `name: engine-choice` | Stable skill name and path segment; the loader and cross-refs resolve by it. | Skill cannot be invoked or referenced; path and name drift apart. | S07 brief; verify frontmatter; pixijs skill header (#4). |
| `description` | One-line router: what the skill produces and the three entry conditions. | Loads for feature work or never loads at project start; S07 and A03 overlap. | S07 brief; pixijs description routes by task (#4); verify description. |
| `allowed-tools` | Least capability: read the repo, write the record, edit `AGENTS.md`, fetch docs and versions, run the spike. | No fetch means version claims come from memory; no Bash means the spike cannot run. | verify frontmatter; rubric 7. |
| `# engine-choice` | Top-level anchor matching the name. | Minor: readers lose the one-word handle; the path still works. | verify shape. |
| Intro line | Thesis: an engine is expensive to replace, so score it, spike it, and pin it; core stays engine-agnostic. | Skill becomes a vendor comparison or a migration plan; the layer boundary blurs. | Blueprint layers; R1; N00. |
| Trigger: no engine | The default entry: a new project before the first prototype. | Skill is discovered only after code exists, when switching costs most. | S07 brief; workflow G0 -> prototype. |
| Trigger: platform or scale change | A new platform or a much larger scale can outgrow an engine that was right before. | Re-evaluation waits for a failure instead of preceding it. | S07 brief. |
| Trigger: suspected mismatch | Ties an engine suspicion to the existing stop rule instead of a hunch. | Endless workarounds around an engine limit; E08 bypassed. | R6; E08; S07 brief. |
| Trigger: not a feature | Routes in-engine work to A03 and the pack. | S07 opens a full selection for a feature request; weeks lost. | S07 brief; A03; N00. |
| Inputs list | The nine facts the matrix and spike score: genre, targets and stores, dimension, budget, skills, ecosystem, art, license, money. | Scoring starts before the requirements exist; taste fills the gaps. | S07 brief; R3 facts; rubric 2. |
| "Write them before scoring" | Forces the inputs to be artifacts, not assumptions. | An unstated requirement is discovered in the spike or after the choice. | R1; R5 one fact in one place. |
| Step 1: must/nice split | A veto separates a disqualifying gap from a preference the score can trade. | A high total hides a missing must-have; the matrix launders a bad fit. | KEP Goals/Non-Goals (#6); MADR Decision Drivers (#5). |
| Step 1: R6 case | A switch of a running project needs a repeated failure or measured gap. | Migration by mood; the old engine is abandoned on a single bad day. | R6; S07 brief. |
| Step 2: 3-5 candidates | Enough to compare, few enough to finish; a single candidate is a rationalization. | False choice (one candidate) or a survey that never closes. | MADR Considered Options (#5); R7. |
| Step 2: weights 1-3, scores 1-5, sum | Makes the trade-off arithmetic visible and arguable. | A ranking with no math: a preference list dressed as analysis. | MADR Pros and Cons (#5); lm-eval fixed metrics (#8). |
| Step 2: show math, veto stands | A reader can recompute the result; no average rescues a veto. | Scores cannot be audited; a must-have miss is averaged away. | KEP Alternatives (#6); R1 evidence. |
| Step 3: finalist checks | Version, breaking changes, pitfalls, docs, export, license, community: the facts a spike cannot show in a day. | Choice on demo feel alone; upgrade and export surprises arrive after the choice. | bevy migration and release notes (#1); SDL platforms and versions (#3); S07 brief. |
| Step 3: S01 gathers, unsourced dropped | Delegates fact-finding and applies the evidence rule at the point of use. | Version and license claims from memory; E02 and E11 fail. | S01; R1; R3. |
| Step 4: one day, top two | Time-boxes the spike so the decision closes; two engines is the smallest real comparison. | A month of evaluation, or a choice from one engine's feel. | R9; S07 brief; radar trial ring (#7). |
| Step 4: six probes | Input, movement, collision, UI, save, export: one probe per capability the game cannot ship without. | The spike tests what is fun to demo, not what the game needs. | libgdx per-capability test classes (#2); S08. |
| Step 4: timed measures | Build and iteration time are the day-to-day cost the matrix cannot express. | Slow loops are discovered in month two, when switching is expensive. | bevy release notes on migration cost (#1); R9. |
| Step 4: evidence, S02 export | The spike leaves a runnable artifact and a checked export, not an opinion. | "It felt fine" is the only record; no rerun, no audit. | R1; S02; libgdx runnable tests (#2). |
| Step 5: choose and override reason | Closes the decision and forces a written reason when the score is not followed. | The matrix is produced and then ignored silently. | MADR Decision Outcome (#5); KEP Alternatives (#6). |
| Step 6: D03 fields | Decision, why, alternatives, consequences, risks, fallback, revisit: the record the next agent reads. | The choice is re-litigated every few weeks; the fallback is forgotten. | D03; MADR (#5); KEP Risks and Mitigations (#6). |
| Step 6: D08 link, not copy | The matrix and log live once, in the engine doc; the decision points at them. | Two copies drift; the reviewer reads the stale one. | R5; D08; blueprint one fact in one place. |
| Step 7: exact version, `engineRange`, selftest | An exact pin makes the build reproducible; the pack's range must contain it and its selftest must pass. | An upgrade lands unannounced mid-sprint; the pack tests another version. | SDL version policy (#3); N00; E11. |
| Step 8: revisit triggers | Names the events that reopen the decision, so it is revisited on evidence. | The engine is either never reconsidered or reconsidered constantly. | KEP Implementation History (#6); radar blip movement (#7); bevy migration guides (#1). |
| Output block | Lists the six artifacts a finished run leaves; the done check. | Completion is claimed with a decision line only; matrix and spike lost. | rubric 2; R1; S07 brief. |
| Boundary: fanboyism | A preference with no score or spike line is taste, and taste is allowed but labelled. | Advocacy replaces evidence in the record. | S07 brief; R3; E09 honesty. |
| Boundary: installation | An engine download, account, or license is the user's call. | Multi-gigabyte installs and license terms accepted on the user's behalf. | R2 irreversible; rubric 7. |
| Boundary: migration needs R6 | Switching a live project is not a refactor; it passes the same gate as a new part. | Wholesale rewrite started on a preference. | R6; S07 brief. |
| Boundary: unverified claim | Version, license, and export claims without a citation are risks, not findings. | Confident wrong facts in the record; E02 fails. | R3; R1; E02. |
| Boundary: no engine rule in core or game | Engine specifics belong to the pack, so the template stays replaceable. | Core starts importing one engine; the other packs rot. | Blueprint layers and non-goals; N00. |
| Boundary: no popularity choice | Stars and tutorials are community evidence, one input among several. | The most starred engine wins regardless of fit. | S07 brief; R3 ranking; SOURCES star caveat. |
| Cross-refs | Stable IDs let the reader route without restating a rule or skill. | Dead-end references; duplicate ownership. | Blueprint IDs; verify style. |

## Deliberate omissions

- **No engine list or recommendation.** Core is engine-agnostic (blueprint non-goal); candidates come from the project's inputs, and each engine's facts live in its pack (N00).
- **No scoring spreadsheet or template file.** A second artifact would be a second source of truth (R5); the matrix lives in the decision record and its `docs/engine/` annex.
- **No fixed pass mark.** A score threshold would be invented; a must-have veto plus a visible total is the decision rule.
- **No vendor pricing or feature table.** It changes; S01 fetches it at decision time and cites the date.
- **No migration plan.** S07 gates a migration and records the fallback; the upgrade itself is N00's `upgrade` path and a separate decision.
- **No two-week evaluation.** One day per finalist is the budget (R9); a longer study is a prototype (S08), not a selection.
- **No engine-specific commands, paths, or assets.** Rubric section 4; the pack supplies them.
- **No team or hiring guidance.** The template targets a solo developer; team skills appear only as an input row.
- **No "best engine" answer.** The skill produces a defensible decision, not a universal ranking.
