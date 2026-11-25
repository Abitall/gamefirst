# S05 tool — justification

Every semantic unit of `artifact/library/core/skills/tool/SKILL.md` is listed
below. "Source" is a blueprint ID, a rule ID, or a numbered repository in
`SOURCES.md`; "synthesis" means the unit combines those sources and has no
single original. The last section lists deliberate omissions.

## Frontmatter

| # | Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|---|
| 1 | `name: tool` | Key the loader and `/tool` use; matches the folder and the blueprint ID. | Skill cannot be discovered or invoked by name. | Blueprint S05; S02/S04 frontmatter |
| 2 | `description` line | States the job, the trigger (second repetition or measured gap), and the two exclusions in the one field a loader reads before loading the body. | The agent selects the skill after one annoyance or for a game feature, which is the exact misuse the skill exists to prevent. | S05; #8 (description says when to use); #9 |
| 3 | `allowed-tools: Read, Write, Edit, Glob, Grep, Bash` | Least privilege: read and search the toolbox, write the four files, run the test. No web tools, because prior art is local and external code is not fetched. | Without Bash the test cannot run (R1); without Write/Edit nothing is produced; without Glob/Grep the toolbox search is guesswork. | R10 allowed tools; #9 |

## Header and trigger

| # | Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|---|
| 4 | `# tool` | Stable heading equal to the name; keeps the file readable when loaded alone. | Cosmetic only; heading and name diverge. | S02/S04 convention |
| 5 | Intro: repeated step → portable tool, test proves; R6 admits, evidence R1/S02 | States the transformation and the two authorities in one sentence, so the skill is not read as "write a script". | The skill loses its admission gate and its evidence rule; a tool becomes self-justifying. | S05; R6; R1 |
| 6 | Trigger, line 1: twice in separate sessions, or cross-project measurement | Quantifies "repeated" and extends the case to a measurement needed beyond one project, which is the portability test. | Tools get built after a single annoyance, violating R6 and adding upkeep. | R6; S05 |
| 7 | Trigger, line 2: not one-off; not game/asset/engine; route A03 | Draws the two boundaries that keep the skill from absorbing other parts: a one-off is a command, game work is A03. | The skill becomes a general coding skill, duplicates A03, and puts game code in the toolbox. | S05; A03; R5 |

## Inputs

| # | Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|---|
| 8 | Task and manual step, both occurrences named | Forces the two data points R6 needs before any design; "both" prevents a remembered second case. | The admission claim in Step 1 has no evidence and cannot be checked. | R6 |
| 9 | Contract: input, output, exit code | The interface is an input to design, not an afterthought; a test asserts exactly these three. | The CLI is designed by accident and the test has no oracle. | S05; #5; #7 |
| 10 | Runtime, who runs it, limits | Runtime decides language; user (agent, human, CI) decides CLI vs library; limits decide whether a service is allowed. | A tool that runs only on the author's machine, or one that adds a network dependency nobody approved. | S05; X02; #3 (runtime 3.10.13); #6 (MSRV) |
| 11 | Existing `toolbox/` entries and index | Makes reuse the first fact the agent sees, before it starts designing. | Duplicate tools and an index that lists two names for one job. | R6; #8 (server list) |

## Steps

| # | Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|---|
| 12 | Step 1: search toolbox, merge beats new, duplicate rejected | Enforces reuse before creation and names the rejection rule. | The toolbox grows by accretion; the duplicate is the cheapest failure to prevent and the most common. | R6; #1 (package per tool) |
| 13 | Step 2: smallest useful tool, one job, second job needs admission | Caps scope at one output and makes a second feature a separate R6 decision. | Scope creep inside a "small" tool; the tool becomes a product with no owner. | R6; R9 |
| 14 | Step 3: installed runtime, version in README, no framework/build/global install | Portability is a property of the runtime, not a promise; naming the version makes the test reproducible. | The tool needs an unlisted toolchain, or is installed globally and cannot be copied to another machine. | S05; #6 (`rust-version`); #7 (`requires-python`); #3 (Python 3.10.13) |
| 15 | Step 4: CLI contract, exit codes 0/1/2, help, version, POSIX/Windows-safe | A tool is called by other tools; stable args, streams, and codes are the contract. Relative POSIX paths keep it portable. | Scripts cannot branch on failure; a Windows path breaks on another machine; a human cannot discover usage. | S05; #5 (`clap` help/subcommands); #4 (`argparse`); #7 (`-` stdin); #8 (command-line args) |
| 16 | Step 5: test first, one fixture, pass and fail cases, exact command, "no run, no tool" | The test is the admission artifact and the regression guard; a failing case proves the test can fail. | The tool is a claim; a broken flag ships silently; S02 has nothing to record. | R1; #1 (test script); #2 (CI); #3 (`tests/`) |
| 17 | Step 6: README install, usage, example, limits, runtime, license/source; adapt, never paste | The README is the install and boundary document; the license/source note is the R3 trace. | The next user cannot install or trust it; copied code enters with no license. | S05; R3; #3; #6; #8 |
| 18 | Step 7: `VERSION` semver with bump rules | One version per tool, with the one-line rule for when each number moves. | Consumers cannot tell a fixed bug from a broken contract; the index version is meaningless. | X03; #6 (1.59.0); #7 (4.2.1); #8 (2.4.0) |
| 19 | Step 8: `toolbox/<name>/`, four contents, copy never link/global | Fixes the path and the complete file set, and makes the folder the unit of portability. | Files scatter; a linked tool breaks when the source moves; a global install defeats the copy. | S05; blueprint `library/toolbox/`; #8 (folder per server) |
| 20 | Step 9: one index row, five fields, create if missing | Discovery is the index; five fields are the minimum to find, run, and date the tool. | The next agent rebuilds the tool because it cannot find it; the index drifts from the folder. | S05; #8 (server list) |
| 21 | Step 10: run test, keep log, exact command, pass is evidence | Converts the test into an R1 artifact with a reproducible command. | "Tested" is asserted without a log; the pass cannot be re-run or reviewed. | R1; S02 |

## Admission, output, boundaries, cross-refs

| # | Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|---|
| 22 | Admission: four named things before Step 1 | Makes R6 a checklist: failure/gap with path, smallest fix, replace/merge, proving test. | Admission becomes a opinion; a tool with no failing evidence enters the toolbox. | R6; S04 (admission pattern) |
| 23 | Output: folder, index row, one-line return | Defines done as three visible artifacts and fixes the report shape. | "Done" is ambiguous; two runs report different things. | S05; R1 |
| 24 | Boundary: no secret/token/private path; no network/service/publish without explicit command | One place for the three leak paths: input, output, and egress. R4/E12 decide publish. | A token lands in a fixture or a tool posts to a service without approval. | R4; E12; X02 |
| 25 | Boundary: no framework, large dependency, engine import, game code | Keeps the tool portable and the core engine-free; "a tool is not a home for the game" states the failure mode. | The toolbox becomes a second game repo; core gains an engine dependency. | Blueprint layers; R6; N00 |
| 26 | Boundary: missing runtime, duplicate, unclear exit code → stop, ask once, record | Names the three blockers that cannot be resolved by writing more code; one question, then stop. | The agent guesses a runtime or ships a duplicate; the gap is rediscovered next time. | R2; R10 |
| 27 | Cross-refs: R1, R2, R3, R4, R6, R10, S02, E02, E03, E12 | One-line index of owners; IDs only, so no rule text is duplicated. | Readers miss an obligation, or the skill restates rules and drifts from them. | One fact in one place; rubric 9 |

## Deliberate omissions

| Omitted | Why |
|---|---|
| A sample tool skeleton or language template | Runtime is an input (Step 3); shipping a skeleton would preselect Node or Python and contradict the portability rule. |
| A test framework choice | The test is an exact command, not a framework; choosing one would add a dependency the runtime may not ship. |
| Dependency policy numbers (size, count) | "No framework, large dependency" is a judgment bounded by R6 and X02; a byte threshold would be arbitrary and untestable. |
| CI wiring | The tool is CI-callable by its exit codes; the repo's CI is out of scope and varies by project. |
| A toolbox manifest or lockfile | `agent.lock.json` (X03) tracks library parts; a per-tool `VERSION` plus one index row is the smallest record. Adding a second registry duplicates it. |
| Permission prompts and autonomy fields | R10 owns the contract; repeating them here would duplicate the rule and drift. |
| License text or source-card format | R3 and S04 own provenance; the skill asks only for a note. |
| Performance budgets | A tool is not a game system; the only budget is that the test runs quickly enough to keep (S02). |
| A03 implementation guidance | Out of scope by design; the skill routes there in Trigger. |
| A publish or install section | R4 forbids publish without a command; global install is forbidden by Step 3. |

## Consistency check

- No unit duplicates another part's text; each rule reference is an ID only.
- Every required S05 element appears once: trigger (6–7), inputs (8–11), search
  and smallest tool (12–13), runtime (14), CLI contract (15), README (17), test
  (16, 21), semver (18), license (17), placement (19), index (20), output (23),
  failures (24–26), admission (22), R1 evidence (16, 21), cross-refs (27).
- The artifact contains no engine name, project path, game genre, or OS-specific
  command; the only OS reference is "Windows-safe names", a portability rule.
