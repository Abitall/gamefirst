# S02 verify — Sources

Selection rule: nine popular, active repositories, split 4 gamedev / 3 software /
2 AI-agent. Stars were read on 2026-11-25 from the GitHub API; artifact claims
were checked by reading the named file in each repository, not from memory.
No code, text, or license was copied. Ideas only.

## Gamedev (4)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [game-ci/unity-builder](https://github.com/game-ci/unity-builder) | 1,115 | Composite GitHub Action (`action.yml`) that builds a project from declared inputs (`buildMethod`, `buildsPath`, `targetPlatform`) and fails the job on a build error | Build check with a declared entry point and an output path | Build is a recipe entry, not an improvised command; a failed build stops the run; output path is named in advance | Unity licensing, Docker images, platform matrix |
| 2 | [abarichello/godot-ci](https://github.com/abarichello/godot-ci) | 1,159 | Docker image plus CI templates (`.github/workflows/godot-ci.yml`, `.gitlab-ci.yml`) that invoke the engine CLI; export presets are committed (`export_presets.cfg`) | Engine-specific commands live outside the pipeline | The pipeline reads commands from the engine pack; engine versions and presets are pinned, not guessed | Container requirement, deploy stages (publishing is R4) |
| 3 | [wesnoth/wesnoth](https://github.com/wesnoth/wesnoth) | 7,008 | `run_wml_tests` runner (Python) executing scenario/content unit tests; CI calls it on Linux, macOS and Windows with explicit flags | Content validation as a first-class check with its own runner and exit code | A content claim needs a content run, not eyeballing; validation is part of the default suite | The bespoke WML harness and engine-specific flags |
| 4 | [bitwes/Gut](https://github.com/bitwes/Gut) | 2,795 | In-engine unit test framework with a CLI entry point (`addons/gut/gut_cmdln.gd`) and JUnit XML export (`addons/gut/junit_xml_export.gd`) | Headless test run that leaves a machine-readable artifact | A test run without a result file is not evidence; the result file is the row's artifact | GDScript specifics, in-editor UI |

## Software development (3)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [pre-commit/pre-commit](https://github.com/pre-commit/pre-commit) | 15,713 | Config-declared hook list; the runner fails when a hook exits non-zero **or** modifies files (`if retcode or files_modified`) | Checks declared in config, never hardcoded | Commands come from config; a check that changes files is a failure, not a fix | Git-hook installation, per-language environments |
| 6 | [danger/danger](https://github.com/danger/danger) | 5,696 | `Dangerfile` rules evaluated against the diff during CI | The changed files decide which checks matter | `changed files` is a required input and drives check selection | PR-comment output, Ruby DSL |
| 7 | [golangci/golangci-lint](https://github.com/golangci/golangci-lint) | 19,553 | One config (`.golangci.yml`) running many checks; exit code derived from findings (`setExitCodeIfIssuesFound`) | One recipe, many checks, explicit exit code | PASS/FAIL is an exit code, not a judgement call; output is machine-readable | Go-specific linters, autofix |

## AI-agent workflow (2)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [SWE-bench/SWE-bench](https://github.com/SWE-bench/SWE-bench) | 6,243 | Harness that runs a repository's tests per instance (`run_evaluation.py`), writes to `log_dir` and builds a run report (`make_run_report`, `get_eval_report`) | The claim is decided by executed tests plus a stored report | An evidence directory per claim; the verdict is derived from results, never asserted | Docker-per-instance, dataset and benchmark scale |
| 9 | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) (ex All-Hands-AI) | 94,220 | Agent runtime that executes commands and browser actions in a sandbox; each action is recorded as an observation (README documents sandbox and browser options) | Verification happens through tools, and visual claims are settled by a capture | Screenshots and command output are first-class evidence; an observation is linked, not described | The autonomous agent loop and sandbox infrastructure |

## Coverage and trade-offs

- Build: 1, 2. Tests: 4, 8. Content: 3. Exit-code truth: 5, 7. Scope by diff: 6.
  Visual evidence: 9. Config-declared commands: 2, 5, 7.
- Two repos are tools rather than games (4, 5–7): chosen because the artifact,
  not the domain, is what is being borrowed. A game repo rarely exposes a
  verification procedure as cleanly as its tooling does.
- The set deliberately has no playtest-protocol source: no game repository with
  a reusable, verifiable playtest artifact was found, so that step rests on R8,
  G1 and D07 instead of an imported practice.

## Not sources (inspected, rejected)

- **OpenRA** playtest channel — the artifact is a distributed build and a bug
  template, not a verification procedure.
- **phaserjs/phaser** test suite — engine-internal tests; too coupled to the
  engine's own CI to serve as a project recipe.
- **Aider** `--auto-test` — an agent-side convenience flag; it runs a command but
  produces no evidence contract the report can point at.

## Licensing

No file, snippet, or license text was copied. Wesnoth is GPL-2.0; only the idea
of a content-test runner was taken, which is not a derivative of its code. All
borrowed items are process descriptions rewritten for this skill.
