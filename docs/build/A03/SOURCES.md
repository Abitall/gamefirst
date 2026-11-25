# A03 - Sources

Nine repositories whose artifacts answer "how does an implementer turn an
approved card into code and evidence without changing the design": four gamedev,
three software, two AI-agent. Stars were read on 2026-11-25 with
`gh api repos/<owner>/<repo> --jq .stargazers_count`. Quotes are verbatim and
short; nothing is copied - no code, no license text, no paragraph.

## Gamedev (4)

### 1. libgdx/libgdx - 25,558 stars

- URL: https://github.com/libgdx/libgdx
- Artifact: `README.md`, `gdx/src/com/badlogic/gdx/Application.java` javadoc,
  and the `backends/` tree.
- Quote: "Each application class has it's own startup and initialization
  methods." Also: "Unlike other frameworks, libGDX does not impose a specific
  design or coding style, allowing you the freedom to create games according to
  your preferences."
- Analogous to: one core API that game logic compiles against, with every
  platform's work isolated in a backend.
- Borrowed: the split itself. Pure rules live behind an engine-free boundary;
  the engine sees a thin adapter and nothing else (`src/systems/` vs `src/game/`).
- Rejected: the seven backends and the Gradle multi-project shape. A solo game
  has one target; a second adapter is added only after a real failure (R6).

### 2. phaserjs/phaser - 40,781 stars

- URL: https://github.com/phaserjs/phaser
- Artifact: `skills/game-setup-and-config/SKILL.md`, one of 27 skill folders the
  engine repo ships.
- Quote: "**Key source paths:** `src/core/Game.js`, `src/core/Config.js`,
  `src/core/typedefs/GameConfig.js`, `src/const.js`, `src/scale/const/`".
- Analogous to: a pointer that says where the truth lives instead of restating
  it, so the reader checks the pinned source for its own version.
- Borrowed: the engine pack names paths in the pinned checkout; the implementer
  reads them before writing an engine call and cites one (E02).
- Rejected: shipping 27 skills inside the engine repo. That is context the agent
  cannot spend, and skill prose must never outrank the pinned source.

### 3. pixijs/pixijs - 48,902 stars

- URL: https://github.com/pixijs/pixijs
- Artifact: `.github/CONTRIBUTING.md`.
- Quote: "If you fix a bug please add a test that will catch that bug if it ever
  happens again. This prevents regressions from sneaking in." Also: "Run `npm run
  test visual` to run visual regression tests."
- Analogous to: defect work opens with a test that reproduces the defect, and
  visual output is checked by comparison rather than by description.
- Borrowed: the failing test comes from the card's criteria, and a visual claim
  carries a capture (S02, CLI10).
- Rejected: the eslint gate and the pixel-difference threshold as universal
  rules. Both belong to a project's verify recipe, not to the core role.

### 4. CleverRaven/Cataclysm-DDA - 13,576 stars

- URL: https://github.com/CleverRaven/Cataclysm-DDA
- Artifact: `doc/TESTING_YOUR_CHANGES.md` and `doc/JSON/JSON_INFO.md`.
- Quote: "Our tests will already cover a good amount of things that could go
  wrong, but you are expected to test your non-trivial changes in-game." Also:
  "Most of the core game data is in `data/json`, with mod data in `data/mods`."
- Analogous to: content lives in data files, and a change is proven by playing
  it, not only by the suite.
- Borrowed: every value is a key with a default in `src/data/`; evidence includes
  a run path, not just a green test.
- Rejected: in-game manual testing as sufficient proof, and the "typo fixes
  usually do not need to be tested" exemption. Determinism is the point of E03.

## Software (3)

### 5. vitest-dev/vitest - 17,454 stars

- URL: https://github.com/vitest-dev/vitest
- Artifact: `CONTRIBUTING.md`.
- Quote: "Add accompanying test case." Also: "`cd test/(dir) && pnpm run test`
  to run a specific test suite".
- Analogous to: a change carries its test, and the narrowest suite is run first.
- Borrowed: the loop runs the failing test, then the suite; a change without its
  test is incomplete.
- Rejected: the pnpm monorepo workflow, the AI contribution policy, and the
  approval gate. None of them exists in a solo repo.

### 6. microsoft/playwright - 101,045 stars

- URL: https://github.com/microsoft/playwright
- Artifact: `CONTRIBUTING.md`.
- Quote: "Note that tests should be *hermetic*, and not depend on external
  services. Tests should work on all three platforms: macOS, Linux and Windows."
  Also, the fast path `npm run ctest` against the slow `npm run test`.
- Analogous to: tests are deterministic and offline; a cheap path serves the
  edit loop, a full path serves the done claim.
- Borrowed: same input, same output, no network; cheap checks often, the full
  verify before any done claim.
- Rejected: the three-browser matrix and "a test for almost any change" as an
  absolute - the same file excepts a pure refactoring.

### 7. npm/cli - 10,278 stars

- URL: https://github.com/npm/cli
- Artifact: `CONTRIBUTING.md`.
- Quote: "We use [`tap`](https://node-tap.org/) for testing & expect that every
  new feature or bug fix comes with corresponding tests that validate the
  solutions." Also: "it will fail if that drops below 100%."
- Analogous to: the test is part of the change, not a follow-up task.
- Borrowed: the change set includes its test, and coverage is read as a signal.
- Rejected: the 100% coverage gate. It drives test-writing toward cheap lines
  and would block a solo game at the edges where behavior is still moving.

## AI-agent (2)

### 8. All-Hands-AI/OpenHands - 94,318 stars

- URL: https://github.com/All-Hands-AI/OpenHands
- Artifact: root `AGENTS.md`.
- Quote: "Primary verification commands are `npm run lint`, `npm test`,
  `npm run build`, and `npm run build:lib`." Also: "Report a mismatch or missing
  coverage instead of changing the specification to match the implementation."
- Analogous to: one fixed verify recipe plus a rule that the implementer never
  edits the spec until the code passes.
- Borrowed: verify is a named recipe, not a mood; verification tooling is
  read-only; a mismatch is reported, never papered over; behavior changes start
  as tests.
- Rejected: the exact-pinned dependency policy and the two-language repo shape.

### 9. Aider-AI/aider - 50,256 stars

- URL: https://github.com/Aider-AI/aider
- Artifact: `CONTRIBUTING.md` and `README.md`.
- Quote: "For small changes, feel free to submit a PR directly. If you are
  considering a large or significant change, please discuss it in a GitHub issue
  before submitting the PR." Also: "Automatically lint and test your code every
  time aider makes changes. Aider can fix problems detected by your linters and
  test suites."
- Analogous to: the size of a change decides its process, and checks run on every
  edit rather than once at the end.
- Borrowed: scope growth stops for A01 before code is written; build, types and
  tests run after each change.
- Rejected: fixing until green. An agent that edits the failing check to pass is
  the exact failure R1 names ("a test that was weakened... is not evidence").

## Dead ends

- `libgdx/libgdx` has no `CONTRIBUTING.md` (404); no test policy to read, so the
  design split in `backends/` was used instead.
- `phaserjs/phaser` has no root `CONTRIBUTING.md` (404); the skills tree answered
  the question better.
- `OpenRA/OpenRA` was dropped: `Documentation/` is 404 and `CONTRIBUTING.md` is
  1,360 bytes of links to a wiki. It was the intended data-driven-rules example.
- `godotengine/godot` `tests/README.md` is 404.
- `bevyengine/bevy` `CONTRIBUTING.md` is a 261-byte pointer to bevy.org; A04
  already uses the website, so the same artifact twice would add no evidence.
- `pixijs/pixijs` root `CONTRIBUTING.md` is 404; the file lives in `.github/`.
- `CleverRaven/Cataclysm-DDA` `doc/JSON_INFO.md` is 404; it moved to
  `doc/JSON/JSON_INFO.md`.
- `All-Hands-AI/OpenHands` `CONTRIBUTING.md` is 404; `AGENTS.md` is the operative
  file and a better one for this part.
- `openai/codex` has no root `AGENTS.md` (404), so the AGENTS.md evidence comes
  from OpenHands alone.
