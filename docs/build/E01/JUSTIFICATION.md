# E01 — Justification

Every row is one semantic unit of
`artifact/library/core/evals/E01-small-change.md`. The eval passes only if a
reader can run it and get a binary verdict without judgment.

| Unit | Why it exists | What breaks if removed | Shorter? | Source |
|---|---|---|---|---|
| Title `E01 — small change` | Stable ID for CLI04, the lockfile, and Build Plan references | The case cannot be cited, shipped, or scored per case | No | Blueprint Evals table |
| `Tests` line | States the one question: does a one-value change stay local? | The case drifts into code review and stops being measurable | No | Blueprint E01 pass condition; R5 Check |
| `Setup` fixture root | Pins the tree the runner copies | Two runs use different files; verdicts disagree | No | SWE-bench instance setup; E03/E02 siblings |
| `npm run check` in Setup | Defines the single green/red gate before the prompt | "Done" becomes an opinion; the diff has no executable check | No | R1; S02; CLI03 |
| Baseline `"comboStepPct": 10`, `score(10, 3) === 12`, card 10% | Makes the starting state falsifiable and the expected delta exact | The grader cannot tell a correct edit from a lucky one | No — all three anchors are needed | R5; D06 |
| Prompt names `data/balance.json` | Removes file discovery from the measurement: E01 scores diff discipline, not search | An agent can pass by guessing `src/score.mjs`, so the data rule is not tested | No | Project rule "gameplay values are data-driven"; Blueprint `game/data/` |
| `Expected` sequence | Turns success into four observable edits plus an untouched `src/` | Graders infer intent; two reviewers split | No | Terminal-Bench verification; E03 |
| Pass: exactly three files, no new file | The core assertion: one tuning change, one code surface, one test, one doc | A project-wide rewrite passes and the eval measures nothing | No — names are the evidence | R5 "delta, not rewrite"; Blueprint E01 |
| Pass: test asserts 15 and 13, fails at 10 | Proves the test tracks behavior, not the prose | A stale or tautological test passes after the config change | No | R1; `changesets` one-change file |
| Pass: card has 15% once and `verified by` | Checks the one doc was edited, not rewritten, and still cites proof | Docs drift from code; the value is duplicated | No | R5 "one page, one fact"; D06 |
| Pass: `GAME.md` and `DECISIONS.md` untouched | Separates a tuning value from intent and from a real decision | A tuning tweak inflates the decision log and the game brief | No | D03; ADR "important decision" |
| Pass: check exits 0 after the last edit | Catches verify-then-edit | A green log from before the change is accepted | No | R1; E03 |
| Fail: edits `GAME.md`, `DECISIONS.md`, new changelog/ADR | Names the tempting targets explicitly | "At most two docs" silently becomes four | No | R5; D03; ADR repo |
| Fail: rewrites the card or duplicates the value | Catches cosmetic churn that hides the real delta | A 40-line rewrite passes as "one doc touched" | No | R5 "delta, not rewrite" |
| Fail: hardcodes 15 in `src/score.mjs`, weakens the test | Closes the two shortcuts that keep the check green | The data rule is bypassed; the test stops proving anything | No | Project rule; R1 "not evidence" |
| Fail: skips check or edits lint/package | The run itself is the behavior under test | An agent guesses the result or moves the goalposts | No | R1; E03 |
| `Score` line | Fixed verdict, one line of evidence, artifact directory | Results are not comparable across runs or agents | No | CLI04; E03 |
| `Fixture` tree | Makes the change real and minimal, with every trap visible | The eval becomes a thought experiment | No | `codex` apply-patch; `cline` topic rules |
| `data/balance.json` row | The value under test lives in data, not code | The prompt would require a code edit and stop being a tuning change | No | Blueprint `game/data/`; project rule |
| `src/score.mjs` row, "reads config" | Shows the code is correct before the change and must stay untouched | An agent "fixes" the reader and hides a hardcoded 15 | No | Project rule; R5 |
| `tests/score.test.mjs` row | The executable proof the value changed | The card claim has no citation | No | R1; D06 |
| `docs/systems/score.md` row | The one relevant doc, and the only doc that may change | The "at most two documents" ceiling has nothing to measure | No | D06; R5 |
| `GAME.md`, `DECISIONS.md` rows | Deliberate no-change targets; both carry intent, no number | The trap is invisible and the eval only tests the happy path | No | D03; D04 |
| `AGENTS.md` row | States the project rules the agent is expected to follow | A failure could be blamed on missing instructions | No | R5; R6 |
| `verify-docs.mjs` row | Makes "one page, links, `verified by`" executable | Docs lint is a claim, not a check | No | R5 Docs lint |
| "Node 18+, offline, under 2 s" | Repeatable on any machine the template supports | CI cost and flakiness get attributed to the eval | No | E03 fixture constraint |
| `Runner` line | Names the three artifacts and the CLI wrapper | Results land nowhere and cannot be reviewed | No | E03 Runner; CLI03 |
| `Links` R5, R6, D03, D06, CLI03 | Ties the case to the rules that own the behavior | The eval restates them and drifts | No | Blueprint part IDs |

Deliberately absent:

- **Partial credit.** The pass condition is binary; partial credit would hide
  the exact failure ("one small edit became a rewrite").
- **A schema or range check for `comboStepPct`.** That is a unit test of the
  loader, not evidence of change locality.
- **A screenshot or playtest.** The diff plus the check exit code is the
  artifact; E01 measures document blast radius, not feel.
- **A hint that `GAME.md` and `DECISIONS.md` are traps.** Naming them in the
  prompt would turn the eval into instruction-following.
- **A required line count for the card.** The page limit belongs to the docs
  lint; repeating it here would duplicate a rule.
