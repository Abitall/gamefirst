# CLI04 `eval` — Sources

Nine repositories were read on 2026-11-25: four gamedev, three software, two
AI-agent. Stars are the GitHub REST API `stargazers_count`, unauthenticated, on
that date. Licenses come from the API when it reported one; where the API said
`NOASSERTION` the license file was opened and its first lines are quoted below.
No code was copied: each entry records the design idea taken and the part
deliberately left out.

## Game development

### S1 — godotengine/godot

- URL: https://github.com/godotengine/godot
- Stars: 120,811 (2026-11-25); last push 2026-11-25T14:54:44Z
- License: MIT
- Artifact: `modules/gdscript/tests/README.md` lines 3-4
- Quote: "The `scripts/` folder contains integration tests in the form of
  GDScript files and output files."
- Borrowed: a test case is a directory holding the input and the expected
  output, executed by a dedicated runner — the shape of `evals/fixtures/<ID>/`
  plus `run.mjs`.
- Rejected: the engine-coupled test runtime; the case format is portable, the
  harness is not.

### S2 — bevyengine/bevy

- URL: https://github.com/bevyengine/bevy
- Stars: 50,001 (2026-11-25); last push 2026-11-25T04:20:27Z
- License: MIT OR Apache-2.0 (`LICENSE-MIT` and `LICENSE-APACHE` both present;
  the API reports Apache-2.0)
- Artifact: `tools/ci/src/commands/test.rs` lines 4 and 13
- Quote: "/// Runs all tests (except for doc tests)." and
  "let no_fail_fast = args.keep_going();"
- Borrowed: keep running after a failure so one report covers the whole suite;
  `--keep-going` explains why `eval` has no fail-fast flag.
- Rejected: the cargo workspace and CI command layer.

### S3 — 4ian/GDevelop

- URL: https://github.com/4ian/GDevelop
- Stars: 29,305 (2026-11-25); last push 2026-11-25T16:42:10Z
- License: MIT for the Core, GDJS, new IDE and Extensions folders; the name and
  logo are reserved (`LICENSE.md`)
- Artifact: `GDevelop.js/package.json`
- Quote: `"test": "jest"`
- Borrowed: the check command belongs to the project, not to the tooling —
  hence `evals.recipe` in `project.config.json`.
- Rejected: the npm/jest dependency and its report formats; the recipe only has
  to exit 0 or non-zero.

### S4 — o3de/o3de

- URL: https://github.com/o3de/o3de
- Stars: 9,921 (2026-11-25); last push 2026-11-25T18:38:53Z
- Artifact: `Tools/LyTestTools/README.txt`
- Quote: "LyTestTools is a Python project that contains a collection of testing
  tools ... * Workspace Manager:"
- License: Apache-2.0 by default (`LICENSE.txt`); LyTestTools files carry
  `SPDX-License-Identifier: Apache-2.0 OR MIT`
- Borrowed: one workspace per run, created and destroyed by the runner — the
  single `mkdtemp` directory with one copy per case.
- Rejected: the pytest plugin stack and editor automation; both need the engine.

## Software engineering

### S5 — nodejs/node

- URL: https://github.com/nodejs/node
- Stars: 124,000 (2026-11-25); last push 2026-11-25T19:18:26Z
- License: MIT (`LICENSE` opens with the MIT grant; the API says `NOASSERTION`
  because the file also bundles third-party notices)
- Artifact: `tools/test.py` lines 1411 and 1461
- Quote: `result.add_argument("-t", "--timeout", help="Timeout in seconds",`
  and the `--temp-dir` option
- Borrowed: `--timeout` in whole seconds with a default, a per-run temp
  directory, and running the current interpreter for fixture scripts.
- Rejected: the flaky-test retry modes (`keep_retrying`), which hide
  nondeterminism; `eval` fails on the first non-zero exit.

### S6 — jestjs/jest

- URL: https://github.com/jestjs/jest
- Stars: 45,475 (2026-11-25); last push 2026-11-25T19:19:55Z
- License: MIT
- Artifact: `packages/jest-cli/src/args.ts` line 539
- Quote: `runTestsByPath: {`
- Borrowed: selecting exact files rather than patterns (`--case` accepts an ID
  or a file stem) and a machine-readable `--json` mode.
- Rejected: watch mode, snapshots, transform pipeline — none apply to process
  fixtures.

### S7 — pytest-dev/pytest

- URL: https://github.com/pytest-dev/pytest
- Stars: 14,761 (2026-11-25); last push 2026-11-25T15:07:12Z
- License: MIT
- Artifact: `src/_pytest/main.py` lines 335 and 390-392
- Quote: `return ExitCode.USAGE_ERROR`, `return ExitCode.TESTS_FAILED`,
  `return ExitCode.NO_TESTS_COLLECTED`
- Borrowed: separate exit codes for misuse and failure, and the rule that "no
  tests collected" is not a failed test — here, an empty suite exits 0 while
  `missing-fixture` is reported per case.
- Rejected: plugin/conftest collection and assertion rewriting.

## AI agents

### S8 — openai/evals

- URL: https://github.com/openai/evals
- Stars: 19,804 (2026-11-25); last push 2026-04-14T15:29:57Z
- License: MIT (`LICENSE.md`: "MIT License / Copyright (c) 2023 OpenAI")
- Artifact: `evals/elsuite/basic/match.py` lines 9 and 30
- Quote: `class Match(evals.Eval):` and `def eval_sample(self, sample: Any, *_):`
- Borrowed: deterministic match-style evals are a separate class from
  model-graded ones; `eval` reproduces that split as fixture checks versus
  `skip-manual`, never running a model.
- Rejected: the eval registry and any execution that needs an API key.

### S9 — UKGovernmentBEIS/inspect_ai

- URL: https://github.com/UKGovernmentBEIS/inspect_ai
- Stars: 3,338 (2026-11-25); last push 2026-11-25T19:12:06Z
- License: MIT
- Artifact: `src/inspect_ai/_cli/eval.py` lines 106 and 112
- Quote: `MAX_SAMPLES_HELP = "Maximum number of samples to run in parallel
  (default is running all samples in parallel)"`,
  `FAIL_ON_ERROR_HELP = "Threshold of sample errors to tolerage (by default,
  evals fail when any error occurs)..."` (typo in source)
- Borrowed: per-sample limits, an error threshold, and structured per-sample
  logs — the per-case fields and the `fail`/`timeout` reasons.
- Rejected: Docker sandboxes and parallel samples; one temp dir and sequential
  order keep the report deterministic.

## Dead ends

- `node --test` as the engine: no fixture mapping, no `skip-manual`, and a
  case without a test file is indistinguishable from a missing one.
- Reusing CLI03 `verify.mjs`: it executes the project's recipe, not one check
  per eval fixture, and has no case statuses.
- JUnit XML: no consumer in the blueprint; JSON schema 1 is enough.
- Model-graded execution: forbidden by the blueprint (no network, no model
  calls) and would make results non-reproducible.
- Deriving pass/fail from the eval prose: exactly the fake result the task
  forbids; prose cases are `skip-manual` by design.

## License note

All nine repositories are permissively licensed (MIT, Apache-2.0, or
MIT OR Apache-2.0). No source code, test text or configuration was copied; the
table above records design ideas only.
