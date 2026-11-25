# E02 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts and
last-commit dates were read from GitHub on 2026-11-25. No code was copied; the
borrowed items are structural ideas only.

## Gamedev (4)

### 1. Phaser
- URL: https://github.com/phaserjs/phaser
- Stars: ~40.8k. MIT. Last commit on `master` 2026-08-21; npm package `phaser`
  is 4.2.1 and declares `"types": "./types/phaser.d.ts"`.
- Artifact: `types/phaser.d.ts`, 7.9 MB, generated from source by `npm run
  tsgen`. The pinned version's API surface is machine-readable.
- Analogous: a member that is not in this file does not exist in that version.
  Checked at write time: `shakeCamera` is absent; `Camera.shake(duration,
  intensity, force, callback, context)` is present.
- Borrowed: the typecheck as arbiter, and the version pin that makes the
  surface specific.
- Rejected: vendoring 7.9 MB of typings; the fixture installs from a lockfile.

### 2. Godot Engine
- URL: https://github.com/godotengine/godot
- Stars: ~120.8k. MIT. Active (2026-11-25).
- Artifact: `doc/classes/*.xml`, the class reference of that branch. Deprecated
  members carry their replacement in the tag itself — `deprecated="Use [member
  AnimationMixer.callback_mode_method] instead"` — e.g. AnimationPlayer (11),
  RenderingServer (9), Control (2) on `master`.
- Analogous: the docs ship inside the version, and a removal names its
  substitute instead of leaving a gap.
- Borrowed: report the replacement the docs name, not one the agent prefers.
- Rejected: C++ tree and XML tooling.

### 3. Bevy
- URL: https://github.com/bevyengine/bevy
- Stars: ~50.0k. MIT OR Apache-2.0. Active (2026-11-25).
- Artifact: `_release-content/migration-guides/`, one note per renamed or
  removed API for each release, plus `_release-content/release-notes/`.
- Analogous: when the requested call was removed, there is a written path from
  the old name to the new one, so a wrong request is answered from data.
- Borrowed: the removed-to-replacement mapping as the shape of the answer.
- Rejected: Rust and crate versions; the eval stays language-neutral.

### 4. UnityCsReference
- URL: https://github.com/Unity-Technologies/UnityCsReference
- Stars: ~13.1k. Unity Reference Only License (stated, not permissive). Active
  (last commit 2026-11-05).
- Artifact: the C# reference source of the engine and editor API, updated by
  release.
- Analogous: an engine claim resolves to a concrete definition, so "I believe
  there is a method" is checkable rather than arguable.
- Borrowed: the norm that a claim about an engine lands on a definition.
- Rejected: the source itself — the license forbids reuse, and C# is irrelevant
  to the fixture. Nothing from this repository is quoted or adapted.

## Software development (3)

### 5. TypeScript
- URL: https://github.com/microsoft/TypeScript
- Stars: ~111.9k. Apache-2.0. Active (2026-11-25).
- Artifact: the compiler. An unknown member on a typed object is a diagnostic
  naming the type, not a warning to ignore.
- Analogous: the automated detector the fixture uses; the invented call cannot
  reach a green build by assertion.
- Borrowed: `tsc --noEmit` as the binary signal.
- Rejected: TS 7 native-port internals and compiler API.

### 6. DefinitelyTyped
- URL: https://github.com/DefinitelyTyped/DefinitelyTyped
- Stars: ~51.5k. MIT, with copyright held by each definition's contributors.
  Active (2026-11-25).
- Artifact: one type package per library, each gated in CI by `tsc` and
  `attw`-style checks.
- Analogous: the definition is the contract other people compile against, and
  it is tested like code.
- Borrowed: typecheck-in-CI as the gate for a claim about an API.
- Rejected: the definitions themselves; Phaser 4.2.1 ships its own typings.

### 7. Node.js
- URL: https://github.com/nodejs/node
- Stars: ~124.0k. MIT plus third-party licenses. Active (2026-11-25).
- Artifact: `doc/api/*.md`, where nearly every section carries a YAML history
  block — `changes: - version: v20.8.0` — recording when the behaviour or the
  member appeared.
- Analogous: the answer is versioned by construction; a claim without a version
  is visibly incomplete.
- Borrowed: naming the version next to the API, in the same sentence.
- Rejected: the runtime and its release cadence.

## AI-agent workflow (2)

### 8. Context7
- URL: https://github.com/upstash/context7
- Stars: ~65.5k. MIT. Active (2026-11-25).
- Artifact: an MCP server and `ctx7` CLI — `resolve-library-id` picks the exact
  library, `query-docs` fetches its documentation; the README lists "❌ Generic
  answers for old package versions" as the failure it exists to remove, and
  matches documentation to a version named in the prompt.
- Analogous: replace recall with a lookup pinned to the version in use.
- Borrowed: the two-step — resolve the exact source, then read the versioned
  page — which the fixture compresses into "open `docs/engine/ENGINE.md`".
- Rejected: the network dependency; the eval must run offline after install.

### 9. OpenHands
- URL: https://github.com/All-Hands-AI/OpenHands (canonical `OpenHands/OpenHands`)
- Stars: ~94.3k. MIT. Active (2026-11-25).
- Artifact: a coding-agent platform that runs the agent against a real Docker
  sandbox with a terminal (`OH_CONVERSATION_RUNTIME=docker`), so invented code
  fails when executed.
- Analogous: the environment decides, not the model's confidence.
- Borrowed: "run it, do not assert it" — the basis of the check-after-edit Pass
  bullet.
- Rejected: the platform, its container runtime, and its agent loop.

## Considered and rejected

- `mdn/browser-compat-data` (~5.8k, CC0-1.0) — machine-checkable availability
  per browser version, the closest fit to "cite the version", but below the
  popularity line used here and web-platform only.
- `SWE-agent/SWE-agent` (~20.9k, MIT) — reproduce-before-patch is a sibling of
  E03's fail-then-pass, not of API grounding.
- `SWE-bench/SWE-bench`, `openai/evals`, `nektos/act` — already cited by E03;
  not reused here because their artifact is about verification, not about the
  version an API belongs to.
- `libgdx/libgdx` (~25.6k) — the API reference is generated on the website, not
  in the repository; no citable per-version file could be confirmed, so it was
  dropped rather than cited on a guess.
- `laude-institute/terminal-bench` (~2.6k, Apache-2.0; now canonical
  `harbor-framework/terminal-bench-1`) — a task-execution harness, not a
  versioned API surface; consulted for task shape only, and not counted among
  the nine.

## License note

Only structural ideas were taken: the machine-readable API surface, the
"deprecated, use X" mapping, version-named history, documentation lookup
instead of recall, and execution as the arbiter. No source code, documentation
text, definition file, or license text was copied. Phaser is MIT, Godot is MIT,
Bevy is MIT OR Apache-2.0, UnityCsReference is under the Unity Reference Only
License and contributed nothing but the norm, TypeScript is Apache-2.0,
DefinitelyTyped is MIT, Node.js is MIT, Context7 is MIT, OpenHands is MIT.
