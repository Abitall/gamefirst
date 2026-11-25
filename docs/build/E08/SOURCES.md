# E08 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts were
read from the GitHub API and shields.io on 2026-11-25 and rounded. No source
code was copied; each entry names the artifact that informed the eval and what
was borrowed or rejected.

## Gamedev (4)

### 1. O3DE (Open 3D Engine)
- URL: https://github.com/o3de/o3de
- Stars: ~9.9k. Active (read 2026-11-25).
- License: Apache-2.0 or MIT (dual; `LICENSE.txt`).
- Artifact: `CMakeLists.txt` (`include(CTest)`, `include(cmake/UnitTest.cmake)`,
  `TestImpactFramework`, `PAL_TRAIT_BUILD_TESTS_SUPPORTED`).
- Quote: `include(CTest)` and `include(cmake/UnitTest.cmake)`.
- Analogous: a game engine makes its test suite a first-class build target, so a
  red suite is a build result rather than an opinion.
- Borrowed: test targets as real commands and a red suite as a stop signal.
- Rejected: C++/CMake engine scale, test-impact framework, asset pipeline.

### 2. Babylon.js
- URL: https://github.com/BabylonJS/Babylon.js
- Stars: ~26k. Active (read 2026-11-25).
- License: Apache-2.0.
- Artifact: root `package.json`; unit, visual, integration, and performance test
  projects.
- Quote: `"test": "vitest run --project=unit"`.
- Analogous: one command runs the unit suite; a failing unit test gates the
  change, while visual and performance runs are separate.
- Borrowed: the single unit-test command and the split between a binary unit
  result and slower visual checks.
- Rejected: browser/WebGL stack, monorepo layout, visual-diff scoring.

### 3. MonoGame
- URL: https://github.com/MonoGame/MonoGame
- Stars: ~14.7k. Active (pushed 2026-11-25).
- License: MS-PL (GitHub reports NOASSERTION).
- Artifact: `Tests/` framework unit tests and `Tools/MonoGame.Tools.Tests`.
- Quote: `See [Tests](Tests) for the framework unit tests`.
- Analogous: tests live beside the framework and are the evidence that a
  feature works; they are not a separate demo project.
- Borrowed: in-repo test placement and the "tests are the evidence" stance.
- Rejected: .NET/graphics toolchain, platform matrix.

### 4. OpenRCT2
- URL: https://github.com/OpenRCT2/OpenRCT2
- Stars: ~17k. Active (read 2026-11-25).
- License: GPL-3.0.
- Artifact: `CMakeLists.txt` and `test/tests/`.
- Quote: `option(WITH_TESTS "Build tests")`, `enable_testing()`,
  `add_subdirectory("test/tests")`.
- Analogous: an explicit test target and a dedicated test tree; the suite is
  part of the build, not an afterthought.
- Borrowed: the explicit test target and the one-tree placement.
- Rejected: C++/CMake stack, GPL code (no code copied).

## Software (3)

### 5. SWE-bench
- URL: https://github.com/SWE-bench/SWE-bench
- Stars: ~6.2k. Active (pushed 2026-09-18).
- License: MIT.
- Artifact: task instances with `FAIL_TO_PASS` and `PASS_TO_PASS` test lists; an
  instance is resolved only when both hold.
- Quote: `FAIL_TO_PASS` / `PASS_TO_PASS`.
- Analogous: a fix must make the new test pass and keep the old tests passing;
  editing a test is not a fix.
- Borrowed: the pass-to-pass contract behind "tests byte-identical" and the ban
  on weakening existing checks. E03 also cites SWE-bench, but for the
  verify-after-edit ordering; E08 borrows the attempt/pass-to-pass contract, a
  different unit.
- Rejected: Docker harness, dataset size, model scoring.

### 6. Bazel
- URL: https://github.com/bazelbuild/bazel
- Stars: ~26k (26,143). Active (pushed 2026-11-25).
- License: Apache-2.0.
- Artifact: `--flaky_test_attempts`; each failing test is attempted up to the
  configured number, a pass on any attempt marks it passing, and all attempts
  failing marks it failed.
- Quote: `--flaky_test_attempts`.
- Analogous: a fixed attempt ceiling with a terminal verdict; retries do not
  hide a test that fails every time.
- Borrowed: the ceiling and the "all attempts failed, report failure" rule.
- Rejected: build system, remote execution, test sharding.

### 7. pytest-rerunfailures
- URL: https://github.com/pytest-dev/pytest-rerunfailures
- Stars: ~485. Active (pushed 2026-10-07).
- License: MPL-2.0 (GitHub reports NOASSERTION).
- Artifact: `--reruns N`, `@pytest.mark.flaky(reruns=N)`, `--reruns-delay`;
  `reruns=0` disables reruns for a test.
- Quote: `pytest --reruns 5` and `@pytest.mark.flaky(reruns=5)`.
- Analogous: a per-test retry budget; after N reruns the failure is still
  reported, not erased.
- Borrowed: "N retries, then report red" and a per-problem budget rather than a
  global one.
- Rejected: flaky-test plugin, Python/pytest stack.

## AI-agent workflow (2)

### 8. Reflexion
- URL: https://github.com/noahshinn/reflexion
- Stars: ~3.4k. Last push 2025-01-14 (stale, stated honestly).
- License: MIT.
- Artifact: `num_trials` iterative learning steps;
  `ReflexionStrategy.NONE/LAST_ATTEMPT/REFLEXION/LAST_ATTEMPT_AND_REFLEXION`;
  `use_memory`.
- Quote: `num_trials`: number of iterative learning steps.
- Analogous: a bounded number of trials, each informed by the last attempt
  rather than a blind repeat.
- Borrowed: the trial budget and the requirement that each attempt carries a
  lesson or hypothesis.
- Rejected: LLM memory, benchmark prompts, HotPotQA experiments, stale code.

### 9. AutoCodeRover
- URL: https://github.com/AutoCodeRoverSG/auto-code-rover
- Stars: ~3.1k. Active (pushed 2026-11-01).
- License: SONAR Source-Available License v1.0 (GitHub reports NOASSERTION).
- Artifact: autonomous program repair over a program structure; test suites are
  used for fault localization and repair.
- Quote: "retrieve a context via iterative search"; "When a test suite is
  available, AutoCodeRover can take advantage of test cases".
- Analogous: repair is iterative and test-informed; each attempt uses the
  previous result instead of restarting blindly.
- Borrowed: iterative, test-informed attempts and a bounded repair loop.
- Rejected: source-available license (no code), AST search stack, Java/Python
  harness.

## Considered and rejected

- `OpenAutoCoder/Agentless` (~2.1k, MIT, last push 2024-12-22) — a fixed
  localize/repair/validate pipeline, not sequential hypothesis testing; stale.
  The eval needs attempts, not a pipeline.
- `game-ci/unity-test-runner` (271, MIT) — the exact gamedev CI action, but
  below the suite's source-count bar; E03 also rejected it for size. O3DE was
  chosen for the gamedev CI/test-target angle instead.
- `libgdx/libgdx` (~25.6k) — `tests/` is a manual demo suite, not an automated
  gate; E03 also passed on it.
- `madaan/self-refine` (~855) — close refine loop, below the source-count bar.
- `microsoft/autogen` (~62k) — `max_consecutive_auto_reply` bounds chat turns,
  not failed fixes; wrong unit.
- `langchain-ai/langgraph` — `recursion_limit` bounds graph steps, not test
  attempts; wrong unit.

## License note

Only structural ideas were taken: bounded attempts, test-informed retries, a
frozen test file, and a terminal blocked report. No source code, test text, or
license was copied. O3DE is Apache-2.0 or MIT; Babylon.js is Apache-2.0;
MonoGame is MS-PL; OpenRCT2 is GPL-3.0; SWE-bench is MIT; Bazel is Apache-2.0;
pytest-rerunfailures is MPL-2.0; Reflexion is MIT; AutoCodeRover is
source-available under the SONAR Source-Available License v1.0. None of these
licenses attach to this eval; the fixture and its tests are original.
