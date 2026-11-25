# E09 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts are
approximate, read from the GitHub API on 2026-11-25. No code was copied; the
borrowed items are structural ideas only. "Quote" is a short paraphrase of the
repository's stated behavior unless marked verified in source.

## Gamedev (4)

### 1. Bevy — `bevyengine/bevy`
- URL: https://github.com/bevyengine/bevy
- Stars: ~50k. Active (pushed 2026-11-25). License: Apache-2.0.
- Artifact: `examples/showcase/breakout.rs` and `examples/showcase/game_menu.rs` —
  a complete breakout with score, lives, and a loss state, plus a state boundary
  between menu and game.
- Quote: the example is a runnable loop whose score, lives, and loss make the
  goal and the fail state legible.
- Borrowed: the loop is judged only while running; score, lives, and loss are
  the minimum legibility set.
- Rejected: Rust, ECS, and the engine stack; E09 needs no engine.
- Note: `examples/games/` no longer exists; the path was found at
  `examples/showcase/` by git-tree search.

### 2. Godot demo projects — `godotengine/godot-demo-projects`
- URL: https://github.com/godotengine/godot-demo-projects
- Stars: ~9.8k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `2d/dodge_the_creeps/` — a minimal move/avoid/score/die loop with a
  HUD and a fail screen.
- Quote: one screen carries the goal, the action, and the fail state; the README
  states the loop in a few lines.
- Borrowed: the fixture's one-screen economy — goal, action, score, fail — with
  no menus.
- Rejected: Godot scenes and GDScript.

### 3. raylib — `raysan5/raylib`
- URL: https://github.com/raysan5/raylib
- Stars: ~36k. Active (pushed 2026-11-24). License: Zlib.
- Artifact: `examples/core/core_2d_camera.c` — one file that builds and runs
  with one command, no setup.
- Quote: a single example is a complete runnable scene, not a fragment.
- Borrowed: "one command to play" as the runtime bar
  (`Node 18+, offline, under 2 s`).
- Rejected: C and the raylib API.

### 4. LittleJS — `KilledByAPixel/LittleJS`
- URL: https://github.com/KilledByAPixel/LittleJS
- Stars: ~4.4k. Active (pushed 2026-11-23). License: MIT.
- Artifact: `examples/breakoutTutorial/` and `examples/breakout/` — a playable
  breakout in one small file, with a fuller example that adds sound and
  particles without changing the loop.
- Quote: the tutorial is the whole game loop in one file; the extra polish does
  not change the loop.
- Borrowed: the gym scale — one loop, one file, one sitting — matches the E09
  fixture.
- Rejected: the engine and its build.

## Software (3)

### 5. Playwright — `microsoft/playwright`
- URL: https://github.com/microsoft/playwright
- Stars: ~101k. Active (pushed 2026-11-25). License: Apache-2.0.
- Artifact: `packages/trace-viewer/` — a recorded, replayable trace of a run.
- Quote: a trace is the evidence of what happened; a verdict without a trace is
  not reproducible.
- Borrowed: the evidence rule — a claim about a run carries a capture and the
  build state. In E09 the capture is deliberately missing, which is why
  `blocked` is honest.
- Rejected: browser automation; E09 runs no browser.

### 6. JUnit 5 — `junit-team/junit5`
- URL: https://github.com/junit-team/junit5
- Stars: ~7.1k. Active (pushed 2026-11-24). License: EPL-2.0.
- Artifact:
  `junit-jupiter-api/src/main/java/org/junit/jupiter/api/Assumptions.java`.
- Quote (verified in source): a failed assumption aborts a test — it is neither
  passed nor failed; the abort carries a reason.
- Borrowed: the three-state result — pass, fail, aborted/blocked — and the
  requirement that a blocked result names what is missing. E09 maps "no human
  signature" to blocked, not passed.
- Rejected: the Java test framework.

### 7. Lighthouse — `GoogleChrome/lighthouse`
- URL: https://github.com/GoogleChrome/lighthouse
- Stars: ~31k. Active (pushed 2026-11-25). License: Apache-2.0.
- Artifact: `core/audits/` — about 50 audit entries, each returning `auditId`,
  `score`, and `details`.
- Quote: a score exists only after a run, and the details name the evidence
  behind it.
- Borrowed: the fixed evidence shape of the score line — quote, recommendation,
  G1 status, `git status` — so a grader can re-check without judgment.
- Rejected: the web-performance domain and the weights.

## AI-agent evaluation (2)

### 8. openai/evals
- URL: https://github.com/openai/evals
- Stars: ~20k. Last push 2026-04-14. License: MIT for the code; bundled
  datasets carry their own licenses. The GitHub API reports NOASSERTION because
  `LICENSE.md` is compound.
- Artifact: `evals/registry/evals/` — 463 YAML eval definitions, e.g.
  `2d_movement.yaml`.
- Quote: an eval is a fixed prompt plus a separate grader; the model's
  self-report is not the score.
- Borrowed: the split between prompt, expected behavior, and grader — E09's
  Pass/Fail/Score sections.
- Rejected: the OpenAI API harness and model-specific graders.

### 9. Inspect AI — `UKGovernmentBEIS/inspect_ai`
- URL: https://github.com/UKGovernmentBEIS/inspect_ai
- Stars: ~3.3k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `src/inspect_ai/scorer/` — 22 files; scorers run apart from the
  model under test, and sample logs are the evidence.
- Quote: the scorer is independent of the agent, and the transcript is the
  artifact a human reviews.
- Borrowed: the independent scorer and the run log as evidence; E09's
  `runs/E09/` follows this.
- Rejected: the Python framework and its model providers.

## Considered and rejected

- `EleutherAI/lm-evaluation-harness` (~14.5k, MIT, pushed 2026-11-04) —
  measures benchmark accuracy, not honesty about a human's verdict; no loop or
  playtest artifact.
- `BSVino/Viewback` (~48 stars, last push 2015) — too small and too old to cite
  as live practice.
- GDC playtest talks — talks are video or paid presentations, not a repository
  artifact, so they cannot satisfy the nine-repo source format.

## License note

Bevy is Apache-2.0, Godot demos MIT, raylib Zlib, LittleJS MIT, Playwright
Apache-2.0, JUnit 5 EPL-2.0, Lighthouse Apache-2.0, openai/evals MIT (datasets
separate), Inspect AI MIT. Only short factual observations and structural ideas
were used; no code, test text, or license text was copied, and no license
attaches to this eval.
