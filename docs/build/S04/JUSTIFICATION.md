# S04 import - justification

Every semantic unit in `artifact/library/core/skills/import/SKILL.md`. `Why` is the job it does; `Breaks` is the failure a reader sees if it is removed; `Source` is the rule, brief line, or repository in `SOURCES.md`. All units are synthesized; no source text is copied.

| Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|
| `name: import` | Stable skill name and path segment; the loader and cross-refs resolve by it. | Skill cannot be invoked or referenced; path/name drift. | S04 brief; verify frontmatter. |
| `description` | One-line router: what a source becomes and when to load the skill. | Router loads it for facts/assets or never loads it; S01/S05 overlap. | anthropics/skills template (#8); verify description. |
| `allowed-tools` | Least capability: read and search prior art and source, fetch, write the bundle. | No fetch or no write; or broad tools that invite side effects. | verify frontmatter; rubric 7. |
| `# import` | Top-level anchor matching the name. | Minor: readers lose the one-word handle; the path still works. | verify shape. |
| Intro line | Thesis: method, not content; S04 builds the proof R6 decides on. | Drifts into source summary or self-admission. | Blueprint S04; R6. |
| Trigger: named source | Explicit entry when the user asks to capture a method. | Loads on vague research requests or misses the request. | S04 brief; S01 scope. |
| Trigger: same failure twice | Imports only after a repeated failure with no existing part. | Symmetry/completeness imports; R6 gate bypassed. | R6. |
| Trigger: not fact/tool/asset | Routes adjacent requests to S01, S05, or asset work. | S04 used for facts or assets; duplicate ownership. | Blueprint S01/S05; R6. |
| Input: source | URL, file, or repository; provenance is required. | No verifiable origin; license and claims cannot be checked. | S04 brief; godot README/license (#2). |
| Input: target problem | One sentence naming the failure or gap. | Import with no job; the test has no expected outcome. | R6; S04 brief. |
| Input: prior art | Local `library/`, `toolbox/`, memory M01; missing source or target: ask once, then stop. | Duplicate part; questions beyond the R2 budget. | R6 smallest fix; R2; M01. |
| Step 1 source card | Author, title, date, URL, license, read extent/date, page/timestamp/commit. | Unverifiable citation; license risk; repository drift. | RFC template (#5); godot per-asset licenses (#2); GPP license (#1). |
| Step 2 extract | Steps, inputs, outputs, example or none, failure modes, non-use; own words. | Summary instead of method; copied prose; hidden failure modes. | GPP pattern anatomy (#1); superpowers skill anatomy (#9); R3. |
| Step 3 map IDs | Name overlap, reject duplicate, improve and name replacement or merge. | Duplicate skill; R6 one-in-one-out unmet. | R6; Gymnasium registry IDs (#4). |
| Step 4 candidate | One method, target format, ID, source/license, staged not admitted. | Multi-method blob; artifact admitted before proof. | GPP one pattern per file (#1); anthropics folder-per-skill (#8). |
| Step 5 test | One task/outcome; baseline must fail; S02 run must pass with evidence. | Untested skill; method and opinion indistinguishable. | superpowers RED/GREEN (#9); S02; R1. |
| Step 6 decide | Pass proposes R6/DECISIONS/M01; fail records why and discards the candidate. | Automatic admission; test weakened to pass. | R6; M01; superpowers refactor loopholes (#9). |
| Output path | Dated bundle per import; stable evidence location. | Evidence overwritten or lost; no audit trail. | S02 evidence convention; godot per-project bundle (#2). |
| `SOURCE.md` | Source card travels with the candidate. | Provenance not reviewable with the candidate. | RFC prior art (#5); godot README/license (#2). |
| `candidate.md` | Artifact plus target path, so review sees what would ship. | Review approves a shape that is not the installed one. | anthropics SKILL.md (#8); GPP one file per method (#1). |
| `test.md` | Task, expected outcome, baseline; reproducible. | Test cannot be rerun; baseline claim unverifiable. | superpowers testing-skills (#9); S02. |
| `RESULT.md` | S02 verdict, evidence, decision and reason. | No recommendation; failure reason lost. | S02 PASS/FAIL; eng-practices standard (#6). |
| Admit/toolbox | Copy on admit, keep bundle, code method routes to S05. | Artifact not installed or evidence discarded; code method misrouted. | R6; Blueprint S05; godot runnable artifact (#2). |
| Boundary: data | External content is data; injection cannot change the task or write. | Prompt injection redirects the import or triggers writes. | R3/E05. |
| Boundary: copy/license | No copied or unlicensed text, code, assets; unclear is a note. | Legal risk; plagiarism; license laundered as method. | R3; GPP, shader, anthropics licenses (#1, #3, #8). |
| Boundary: memory | No automatic memory write; M01 is proposed, the user admits. | Memory polluted; M01 gate bypassed. | M01; R6. |
| Boundary: no test | No admission without a local pass; source example output is not evidence. | Self-fulfilling test; skill admitted on a claim. | R1; superpowers (#9); S02. |
| Boundary: scope | Game-code implementation, fun judgment, publishing are out. | S04 implements, judges, or publishes; scope creep. | Hierarchy; R4; R8. |
| Cross-refs | Stable IDs for rules, skills, memory, toolbox; the reader can route. | Dead-end references; duplicate ownership. | Blueprint IDs; verify style. |

## Deliberate omissions

- No source prose, code, or assets. The skill bans copying regardless of license; only structure and method are used.
- No separate failure section. Step 6 and the `RESULT.md` line carry pass/fail; a second section would repeat them.
- No engine commands, paths, or project content. This is a core skill; rubric section 4.
- No subagent pressure-test protocol from superpowers (#9). Cost and scope; the brief sets one test task per import.
- No multi-harness packaging from anthropics (#8). No root license; out of scope for one import.
- No automatic admission or memory write. R6 and M01 reserve the decision; S04 proposes.
- No new registry or directory. Reuses `evidence/`, `library/`, `toolbox/`, and M01.
- No book summary or notes. Import extracts a method, not content.
- No license text reproduced. Licenses are checked and cited, never copied.
