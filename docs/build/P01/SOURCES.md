# P01 sources

Nine repositories, read on 2026-11-25/26. Stars are the GitHub REST API values
recorded for 2026-11-26. No code, text, or license was copied; each entry names
the idea borrowed and the part rejected.

## Gamedev (4)

### 1. itchio/butler

- URL: https://github.com/itchio/butler
- Stars: 1,014
- License: MIT; bundled runtime components (for example 7-Zip) keep their own
  licenses.
- Artifact type: Go CLI that pushes and patches builds for an indie store.
- Analog: S13 steps 3-4 (build from tag, checksum, verify after upload) and the
  store-page build channel.
- Borrow: a build is named by version plus platform; the uploaded artifact is
  integrity-checked after transfer, not trusted from the label.
- Reject: the butler CLI, delta patching, and every network push. The pack has no
  tool dependency and no upload path.

### 2. game-ci/unity-builder

- URL: https://github.com/game-ci/unity-builder
- Stars: 1,115
- License: MIT.
- Artifact type: TypeScript GitHub Action that builds a Unity project per target.
- Analog: engine pack export recipe (N00/N01) and the target matrix in §1.
- Borrow: one target equals one explicit build command with a platform enum; a
  target with no command is unsupported and is cut, not promised.
- Reject: GitHub Actions, Unity inputs, and container images. The pack is
  engine-agnostic and names no CI vendor.

### 3. libgdx/libgdx

- URL: https://github.com/libgdx/libgdx
- Stars: 25,559
- License: Apache-2.0.
- Artifact type: Java game framework with desktop, Android, HTML5, and iOS
  backends.
- Analog: the platform matrix: one codebase, several real backends.
- Borrow: list only platforms that have a real backend and export path; texture
  and asset formats differ per platform, so the build record is per target.
- Reject: JVM, Gradle, and backend code. Nothing engine-specific enters the pack.

### 4. godotengine/godot-docs

- URL: https://github.com/godotengine/godot-docs
- Stars: 5,936
- License: CC BY 3.0 for the docs (GitHub license field: NOASSERTION).
- Artifact type: engine documentation, including the export pipeline.
- Analog: N00 engine contract and the build-pipeline fields in §3.
- Borrow: one export preset per platform; the output extension follows the
  platform; `export_presets.cfg` is committed while `export_credentials.cfg` is
  secret and kept out of version control; command-line export still needs a
  preset.
- Reject: Godot commands, `.godot` paths, and the template manager. Only the
  separation of preset, secret, and artifact is reused.

## Software (3)

### 5. goreleaser/goreleaser

- URL: https://github.com/goreleaser/goreleaser
- Stars: 16,155
- License: MIT.
- Artifact type: Go release-engineering CLI.
- Analog: the release record and the build table in §3.
- Borrow: one tagged release produces per-target artifacts, each with a checksum,
  and one record lists them together; the changelog belongs to the same record.
- Reject: the GoReleaser config, the Go toolchain, and its publisher plugins.
  The pack records evidence; it does not run a release tool.

### 6. slsa-framework/slsa

- URL: https://github.com/slsa-framework/slsa
- Stars: 1,971
- License: Community Specification License 1.0, SPDX CC-BY-4.0 (GitHub license
  field: NOASSERTION). Attribution is required for derivative text; none was
  copied.
- Artifact type: supply-chain specification for build provenance.
- Analog: the provenance fields in §3 (builder, source, inputs, digest).
- Borrow: provenance answers who built it, from which revision, with which
  inputs, and which digest came out; evidence levels are a ladder, not a badge.
- Reject: build levels as a certification claim, the specification text, and its
  tooling. The pack claims no SLSA level.

### 7. semantic-release/semantic-release

- URL: https://github.com/semantic-release/semantic-release
- Stars: 24,201
- License: MIT.
- Artifact type: JavaScript release automation.
- Analog: X03 versioning and the version/tag rule in §3.
- Borrow: the version is derived from history and never typed by hand; the tag
  is the source of truth; one commit feeds every artifact.
- Reject: automated publishing, a mandatory commit-message convention, and the
  npm registry. The pack stays offline.

## AI-agent or release-ops (2)

### 8. openai/codex

- URL: https://github.com/openai/codex
- Stars: 136,444
- License: Apache-2.0.
- Artifact type: sandboxed coding agent.
- Analog: X01 autonomy contract and the R4/E12 approval boundary.
- Borrow: default-deny sandbox; escalation and network access need explicit
  approval; the exact command is shown before it runs.
- Reject: the agent runtime, sandbox implementation, and model configuration.
  Only the approval posture is reused.

### 9. humanlayer/humanlayer

- URL: https://github.com/humanlayer/humanlayer
- Stars: 12,958
- License: Apache-2.0.
- Artifact type: human-in-the-loop approval layer for agent actions.
- Analog: the G3 human gate and the no-publish rule in §8.
- Borrow: approval is a first-class step that names the action, the target, and
  the approver; the agent prepares evidence and the human approves.
- Reject: the SaaS, SDK, and approval UI. The pack ships no integration.

## Dead ends

- `https://itch.io/docs/butler/pushing.html` and `https://itch.io/docs/butler/`
  returned a transport error on 2026-11-26. Butler facts come from the repository
  metadata only; no push syntax was borrowed.
- `https://game.ci/docs/github/builder/` timed out twice. Unity-builder facts come
  from repository metadata; its input schema was not used.
- `https://github.com/slsa-framework/slsa/blob/main/LICENSE` is a 404; the license
  is `LICENSE.md`. The license text was read, and only ideas were reused.
- The Unreal Engine source repository is license-gated and was excluded. The Unity
  C# reference repository has a restrictive license and was excluded; neither is
  counted as a source.
- No public "release pack" with a manifest and selftest was found to copy; the
  shape follows the project's own N00 engine contract.
