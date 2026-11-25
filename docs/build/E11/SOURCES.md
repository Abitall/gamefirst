# E11 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts were
read from GitHub on 2026-11-25; last-commit dates are given where the page
exposed them. No code was copied; the borrowed items are structural ideas only.

## Gamedev (4)

### 1. libGDX
- URL: https://github.com/libgdx/libgdx
- Stars: ~25.6k. Apache-2.0. Last commit 2026-11-19.
- Artifact: `gdx/src/com/badlogic/gdx/Version.java` —
  `public static final String VERSION = "1.14.3";`. The release number lives in
  the engine source, so the engine can be asked what it is.
- Analogous: a version read from the engine itself cannot disagree with the
  build; a version typed next to it can.
- Borrowed: the selftest reads the installed `phaser/package.json` instead of
  trusting the label in `VERSION.md`.
- Rejected: the Java build and the API reference, which is generated on the
  website. E02 dropped libGDX for lacking a citable per-version API file; E11
  uses the version constant, a different artifact, so that reason does not
  apply.

### 2. PixiJS
- URL: https://github.com/pixijs/pixijs
- Stars: ~48.9k. MIT. Last commit 2026-11-20.
- Artifact: root `package.json` — `"name": "pixi.js"`, `"version": "8.23.0"`,
  plus workspaces. One manifest names the version of the whole package set.
- Analogous: the pin is a single machine-readable line that every workspace
  resolves through.
- Borrowed: one pin as the only version authority; the pack cannot hold a
  second opinion.
- Rejected: the renderer and the monorepo tooling.

### 3. raylib
- URL: https://github.com/raysan5/raylib
- Stars: ~35.8k. Zlib. Last commit 2026-11-24.
- Artifact: `src/raylib.h` — `#define RAYLIB_VERSION_MAJOR 6`,
  `RAYLIB_VERSION_MINOR 5`, `RAYLIB_VERSION_PATCH 0`, and
  `#define RAYLIB_VERSION "6.5-dev"`. The number and the label are separate,
  and the label marks a dev build.
- Analogous: the version sits next to the API in the same header, so a claim
  about a member can name the version in the same breath.
- Borrowed: `VERSION.md` and `API.md` live in one pack directory; Pass requires
  the version next to the claim.
- Rejected: the C sources and the build.

### 4. SFML
- URL: https://github.com/SFML/SFML
- Stars: ~12.1k (2026-11-25). Zlib. Branch `master` is 3.x; the README says
  "No more features are planned for the 2.x release series."
- Artifact: `include/SFML/Config.hpp` — `#define SFML_VERSION_MAJOR 3`,
  `SFML_VERSION_MINOR 2`, `SFML_VERSION_PATCH 0`, `SFML_VERSION_IS_RELEASE
  false`. A major-version boundary is a migration, and the dev branch is not a
  release even when the number looks like one.
- Analogous: old 2.x code is not a Shake-to-4.x rename; it belongs to another
  major version.
- Borrowed: name the major version when comparing code; the legacy snippet is
  evidence of the old version, not of the pinned one.
- Rejected: C++/CMake, and the 2.x line.

## Software development (3)

### 5. mise
- URL: https://github.com/jdx/mise
- Stars: ~36.5k. MIT. Last commit 2026-11-24.
- Artifact: README — `mise lock` writes exact versions and checksums to
  `mise.lock`; `mise doctor` checks the installation, shell, and config.
- Analogous: a lock plus a doctor is the pack-versus-pin pair — the lock fixes
  the version, the doctor reports drift.
- Borrowed: `selftest.mjs` as a doctor that compares the installed engine with
  the recorded pin.
- Rejected: the runtime and its shell integration.

### 6. Renovate
- URL: https://github.com/renovatebot/renovate
- Stars: ~23.3k. AGPL-3.0. Last commit 2026-11-25.
- Artifact: `docs/usage/configuration-options.md` — `rangeStrategy` with
  `"pin"` and `"replace"`: a version change is a policy recorded in config, not
  a hand edit to the manifest.
- Analogous: the pin is changed by a rule, not as a side effect of a task.
- Borrowed: a downgrade is proposed as a decision, never applied to
  `package.json` mid-task.
- Rejected: the bot, its hosted app, and AGPL code.

### 7. npm CLI
- URL: https://github.com/npm/cli
- Stars: ~10.3k. License reported as NOASSERTION on GitHub; the package
  declares Artistic-2.0. Last commit 2026-11-18.
- Artifact: `docs/lib/content/commands/npm-ci.md` — "must have an existing
  package-lock.json"; "`npm ci` will exit with an error, instead of updating the
  package lock"; "never write to package.json or package-lock.json".
- Analogous: the install reads the lock and refuses to drift; a mismatch fails
  instead of repairing itself.
- Borrowed: `npm ci` as the fixture install, and the no-write rule the guards
  enforce.
- Rejected: the CLI internals and the registry.

## AI-agent workflow (2)

### 8. EleutherAI lm-evaluation-harness
- URL: https://github.com/EleutherAI/lm-evaluation-harness
- Stars: ~14.5k. MIT. Last commit 2026-09-14.
- Artifact: `lm_eval/tasks/hellaswag/hellaswag.yaml` — `version: 1.0` inside the
  task definition.
- Analogous: a task names its own version, so a score is comparable across
  runs; the same task without the version is a different measurement.
- Borrowed: the fixture is versioned by its pin, and a run that does not name
  the pin is not comparable.
- Rejected: the Python harness and the benchmark data.

### 9. openai-python
- URL: https://github.com/openai/openai-python
- Stars: ~32.2k. Apache-2.0. Last commit 2026-11-25.
- Artifact: `src/openai/lib/azure.py` — `api_version: str | None = None`, with
  `OPENAI_API_VERSION` as the environment fallback; the caller must name the
  API version.
- Analogous: there is no silent default version; the version travels with the
  call.
- Borrowed: every engine claim carries its version, and a versionless claim is
  incomplete.
- Rejected: the SDK and the network.

## Considered and rejected

- `MonoGame/MonoGame` (~14.7k) — the template and csproj paths returned 404,
  and the package-version pairing could not be verified; dropped rather than
  guessed.
- `BabylonJS/Babylon.js` (~26.4k) — `packages/dev/*` are `@dev/core` 1.0.0
  placeholders, so there is no published version to cite.
- `rust-lang/cargo` (~15.8k) — two guessed documentation paths returned 404;
  not pursued.
- `langchain-ai/langchain` — verified `langchain-core>=1.4.7,<2.0.0` in
  `libs/langchain/pyproject.toml`, but it repeats the dependency-range lesson;
  not counted.
- `phaserjs/phaser` — the fixture's engine and E02's first source; not counted
  here so E11's nine stay distinct. E02 already owns the typings citation.
- `godotengine/godot` — E02's source; its version files are analogous, but E02
  covers the "docs name the replacement" lesson, so it is not reused.

## License note

Only structural ideas were taken: the engine-stated version, one manifest as
the pin, version next to the API, the major-version boundary, lock plus doctor,
the pin as policy, install-from-lock, the versioned task, and the named API
version. No source code, documentation text, definition file, or license text
was copied. libGDX is Apache-2.0, PixiJS is MIT, raylib is Zlib, SFML is Zlib,
mise is MIT, Renovate is AGPL-3.0, npm CLI is Artistic-2.0 (GitHub reports
NOASSERTION), lm-evaluation-harness is MIT, openai-python is Apache-2.0. No
AGPL or Artistic-2.0 code was used.
