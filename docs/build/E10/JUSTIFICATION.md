# E10 — Justification

`E10-context-budget.md` is one eval in the shared format: ten labelled sections and a fixture specification, no fixture files. The table treats each semantic unit separately: why it exists, what breaks without it, whether it can be shorter, and where the idea comes from. A unit with no external source cites the blueprint rule that requires it rather than inventing one.

| Unit | Why it exists | What breaks if removed | Shorter? | Source |
|---|---|---|---|---|
| Title and `E10` ID | Names the behaviour and gives CLI04 a stable link target. | The eval cannot be indexed or linked; `Links` dangles. | No — the H1 is the ID. | Build Plan E10 row; E01–E09 format. |
| `Tests` sentence | States the one behaviour under test: resume from files, not from a summary. | Pass and Fail have no subject; a grader scores style instead of behaviour. | No — one sentence is the minimum. | Blueprint E10 row ("Active context stays within the configured budget"); R10. |
| Fixture path and 12,000 tokens | Makes the run reproducible and turns "budget" into a number. | No overflow and no measurable limit; two runs differ. | No — the number is the test. | Redis `redis.conf` (a rewrite threshold must be explicit); R10 `max_tokens`. |
| `AGENTS.md` priority chain | The hierarchy is what must survive compaction; R1/R2/R10 are the rules checked. | No order to quote and nothing to keep; Pass 1 and 2 become untestable. | No — the five levels are the contract. | Codex `agents_md.rs` (deterministic instruction assembly); blueprint priority. |
| `STATE.md` task, blocker, Q1 | Gives the resume target and the carried state. | The agent must invent what to continue; Fail 1 cannot be detected. | No — each field is a separate check. | ink `StoryState.cs` (state snapshot, not transcript); D02. |
| `DECISIONS.md` D-002 | Creates the "already decided" trap. | "Does not re-ask" has nothing to re-ask; Pass 3 and Fail 3 vanish. | Yes, inline in `STATE.md`, but the separate append-only file matches D02. | Gemini CLI `commands.md` (a summary keeps what happened, not decisions); R1. |
| 900-line log, `mode: discuss` | Forces the window over budget and plants stale state a summary may promote. | No compaction, or compaction with no stale-state trap. | Fewer lines may not overflow; 900 is the cheapest reliable overflow. | Godot `undo_redo.cpp` (old steps dropped); Gemini `/compress`. |
| Skill and docs traps | Tests that the chain is applied, not merely recited. | Pass 1 can be met by quoting while the agent obeys the skill; the eval loses its teeth. | One trap would test one direction; two cover skill < rules and docs < rules. | openage `AGENTS.md` (docs are an index, not authority); blueprint priority. |
| Prompt | Exact, minimal, and free of hints about the traps. | Runs use different wording and are not comparable. | No — five words. | E01–E09 prompt convention; R10. |
| `Expected` paragraph | States the observable resume contract in one place. | Pass bullets lose their target; readers disagree on what "resume" means. | No — each clause maps to a Pass bullet. | R10 checkpoint; D02; E09 `Expected`. |
| `Pass` bullets | Six binary checks a transcript can settle. | The score becomes opinion; CLI04 has nothing to count. | No — merging checks hides which rule failed. | E08/E09 Pass style; CLI04. |
| `Fail` bullets | Names the failure modes the happy path hides: invention, rule loss, re-asking, log replay. | A fluent but wrong run passes. | No — each bullet is a distinct failure. | E02 (no invented API); E09 (no invented evidence). |
| `Score` and evidence | Fixes the verdict rule and the artifacts. | Claims cannot be checked; "looks right" becomes the criterion. | No — three artifacts are the minimum for reads, checkpoint, and run. | CLI03 verify; CLI04 eval; E08 `Score`. |
| Fixture tree | Specifies the fixture without materialising it, so CLI04 can build it once. | The fixture drifts from the eval; each run invents its own files. | No — eight entries are the minimum for the traps. | openage `AGENTS.md` (index, do not duplicate); Build Plan fixture convention. |
| Runner | Names where evidence lands and who scores. | Evidence paths vary and hand scoring diverges. | Yes, but it would be ambiguous; E08 names the same set. | E08 `Runner`; CLI04. |
| Links | Ties the eval to the rules it checks. | The eval is orphaned; reviewers cannot trace coverage. | No — seven IDs are all exercised. | Blueprint ID list (R1, R2, R10, D02, X01, CLI08, E04). |

## Deliberately absent

- No `evals/fixtures/E10/` files. The brief says specification, not materialisation; files would duplicate the tree and add review surface.
- No compaction prompt or summariser. E10 measures the agent's resume behaviour, not the harness's summariser.
- No expected answer or sample transcript. It would let a run match words instead of behaviour.
- No discuss, prototype, or review variants. One production case first; variants multiply cost without new failure modes.
- No tokenizer. `chars/4` is the project convention and CLI08's measure.
- No wall-clock or cost metric. The budget is tokens, not minutes.

## Omissions and tensions

- The 12,000 figure is a stand-in: about three times the rule set, below the log. CLI08 may publish a different default; the eval should then cite it.
- The value order `mode > rules > skill > pack > docs` is gamefirst's. Codex documents path-order assembly, not value precedence; no source proves this order.
- The `mode: discuss` trap assumes mode is read from `STATE.md`. D02 lists phase, active parts, next action, blockers, and gate state; mode is not named. Resolve this in D02 or `AGENTS.md` before building the fixture.
- "Drops `discuss`" also assumes `STATE.md` outranks the log. R1 covers build truth, not mode authority; this is an added convention.
- `verify.mjs` is a stub. A real fixture must fail for the intended reason, not because a module is missing.
- No source covers the checkpoint line; its shape comes from R10, so that unit cites R10 rather than a repository.
- `BLOCKING —` and Q1 are two carried items, but one blocker may be enough to prove loss; two make the check stricter, not different.
