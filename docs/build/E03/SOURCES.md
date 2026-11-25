# E03 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts are
approximate, read from the GitHub API on 2026-11-25. No code was copied; the
borrowed items are structural ideas only.

## Gamedev (4)

### 1. GUT — Godot Unit Test
- URL: https://github.com/bitwes/Gut
- Stars: ~2.8k. Active (pushed 2026-08-18).
- Artifact: unit-test scripts for a game project; runner reports per-test
  pass/fail and a non-zero exit code for CI.
- Analogous: one test file names one check; the result is binary and quoted in
  a log.
- Borrowed: the shape of a check that is small, named, and greppable in the log.
- Rejected: GDScript API and Godot scene setup — the eval must stay
  engine-agnostic.

### 2. Luanti (formerly Minetest)
- URL: https://github.com/luanti-org/luanti
- Stars: ~13.9k. Active (pushed 2026-11-24).
- Artifact: built-in `unittest` module. A failure raises `TestFailedException`
  carrying `message`, `file`, and `line`; the suite runs with `--run-unittests`.
- Analogous: a failing check that names itself and its location, in a real game
  project.
- Borrowed: the requirement that the report quote the check name and the file,
  not a summary.
- Rejected: C++ harness and in-engine runner.

### 3. OpenRA
- URL: https://github.com/OpenRA/OpenRA
- Stars: ~17.8k. Active (pushed 2026-11-22).
- Artifact: `OpenRA.Test/OpenRA.Test.csproj` — NUnit test project next to the
  game code (Microsoft.NET.Test.Sdk, NUnit, console runner, adapter), run in CI.
- Analogous: tests live beside the game and gate the merge, so "done" is a test
  result rather than a claim.
- Borrowed: the placement of the check in the same repo and the CI gate.
- Rejected: .NET/NUnit stack; the eval uses a single Node script.

### 4. Chickensoft GameDemo
- URL: https://github.com/chickensoft-games/GameDemo
- Stars: ~641 — lower than the other sources, stated honestly. Active.
- Artifact: a small Godot/C# game advertised as fully tested, with tests and CI
  for each feature.
- Analogous: the fixture scale — a tiny game repo where a feature is not done
  without its check.
- Borrowed: the fixture's size and the one-feature-one-check mapping.
- Rejected: engine coupling and the C# toolchain.

## Software development (3)

### 5. SWE-bench
- URL: https://github.com/SWE-bench/SWE-bench
- Stars: ~6.2k. Active (pushed 2026-09-18).
- Artifact: task instances with `FAIL_TO_PASS` and `PASS_TO_PASS` test lists; an
  instance is resolved only when both hold.
- Analogous: the contract that the new check must be seen failing before the
  change and passing after, and that existing checks must not regress.
- Borrowed: the ordering requirement (verify after the edit) and the ban on
  weakening existing checks.
- Rejected: dataset size, Docker harness, model evaluation.

### 6. nektos/act
- URL: https://github.com/nektos/act
- Stars: ~72.8k. Active (pushed 2026-11-19).
- Artifact: runs the same GitHub Actions workflow locally.
- Analogous: reproduce the failing check on the local machine before claiming a
  result.
- Borrowed: the eval calls the project's own command, not a description of it;
  the run stays local, offline, and cheap.
- Rejected: Docker dependency and workflow translation.

### 7. reviewdog
- URL: https://github.com/reviewdog/reviewdog
- Stars: ~9.8k. Active (pushed 2026-11-25).
- Artifact: converts linter and test output into an actionable annotation with
  file and line, and fails the build.
- Analogous: a failing check must produce a message that names where to look.
- Borrowed: the pass bullet that the report names the check and the file, and
  the smallest next action.
- Rejected: PR-comment integration and reporter configuration.

## AI-agent workflow (2)

### 8. openai/evals
- URL: https://github.com/openai/evals
- Stars: ~19.8k. Active (pushed 2026-04-14).
- Artifact: a registry of eval YAML files — one file per eval with `id`, `args`,
  metrics and graders; results are pass/fail per sample.
- Analogous: one file per case, stable ID, explicit pass condition, fixed
  evidence format.
- Borrowed: the file-per-eval structure, the stable ID, and the deterministic
  grading rule (every Pass bullet must hold).
- Rejected: Python registry, LLM-as-judge graders, sample aggregation.

### 9. Terminal-Bench
- URL: https://github.com/laude-institute/terminal-bench
- Stars: ~2.6k. Active (pushed 2026-07-11).
- Note: GitHub resolves the canonical repository to
  `harbor-framework/terminal-bench-1`; the `laude-institute` URL still serves the
  README and now points to Harbor for Terminal-Bench 2.0. The star count above
  is for the canonical repository.
- Artifact: each task is an instruction plus a test script plus an oracle
  solution; the harness runs verification after the agent stops.
- Analogous: the agent's claim is not the result — a separate script decides,
  and the task is proven solvable by a reference solution.
- Borrowed: verification runs after the agent stops; the prompt gives no hint
  that the check will fail; the fixture is known to be solvable.
- Rejected: Docker sandbox, full oracle solution, leaderboard scoring.

## Considered and rejected

- `game-ci/unity-test-runner` (~271 stars) — right artifact, too small to count
  as popular.
- `libgdx/libgdx` (~25.6k) — manual visual test suite; the path could not be
  confirmed, so it was replaced by GameDemo rather than cited on a guess.
- `Donchitos/Claude-Code-Game-Studios` (~40.9k) — game-studio agent framework;
  its QA text is an agent prompt, not a runnable check.
- `confident-ai/deepeval` (~19.7k), `promptfoo/promptfoo` (~27.7k) — valid eval
  suites, kept as alternates; Terminal-Bench contributed the self-verification
  angle more directly.
- `openai/human-eval` (~3.4k) — execution-based grading, superseded here by
  SWE-bench's explicit fail-then-pass contract.

## License note

Only structural ideas were taken: file-per-case, check naming, fail-then-pass
ordering, and post-run verification. No source code, test text, or license was
copied. GUT is MIT, Luanti is LGPL-2.1-or-later, OpenRA is GPL-3.0, SWE-bench is
MIT, act is MIT, reviewdog is MIT, openai/evals is MIT, Terminal-Bench is
Apache-2.0, GameDemo is MIT — none of these licenses attach to this eval.
