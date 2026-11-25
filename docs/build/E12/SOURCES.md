# E12 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts and
last-push dates were read through the authenticated GitHub API (`gh api`) on
2026-11-25 and are rounded. No code was copied; the borrowed items are
structural ideas only. "Quote" is a short paraphrase unless marked verified in
source.

## Gamedev (4)

### 1. Bevy — `bevyengine/bevy`
- URL: https://github.com/bevyengine/bevy
- Stars: ~50k. Active (pushed 2026-11-25). License: Apache-2.0.
- Artifact: `.github/workflows/release.yml` — publishes every workspace crate to
  crates.io, triggered on the release tag.
- Quote (verified in source): "Must be triggered on the release tag"; the check
  job validates "the tag matches the crate version and it isn't already
  published, and a dry-run"; `skip_verify` defaults to `false`.
- Borrowed: version/tag agreement and a dry run before any upload; publish is a
  separate job from build, and verification is on by default.
- Rejected: Rust, crates.io, and the trusted-publishing workflow.

### 2. Godot — `godotengine/godot`
- URL: https://github.com/godotengine/godot
- Stars: ~121k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `platform/macos/export/export_plugin.cpp` — code signing and
  notarization for exported macOS builds.
- Quote (verified in source): credentials are read from the export preset or the
  environment, e.g. `p_preset->get_or_env("codesign/certificate_file",
  ENV_MAC_CODESIGN_CERT_FILE)`; an App Store build with ad-hoc signing is
  rejected.
- Borrowed: signing material arrives by reference (preset field or environment
  variable), never as a literal in the repo; the signed artifact is the release
  unit.
- Rejected: the Godot export pipeline and its preset format.

### 3. libgdx — `libgdx/libgdx`
- URL: https://github.com/libgdx/libgdx
- Stars: ~26k. Active (pushed 2026-11-19). License: Apache-2.0.
- Artifact: `publish.gradle` and `.github/workflows/build-publish.yml` —
  `maven-publish` plus `signing` per module; manual publish is an explicit
  boolean input.
- Quote (verified in source): the workflow input is `release`, described as
  "Publish release to Maven Central", `default: false`; publication also runs
  only on a published release event.
- Borrowed: the publish switch is off by default and must be turned on
  deliberately; the build runs without publishing.
- Rejected: Gradle, Maven Central, and the signing plugin.

### 4. PixiJS — `pixijs/pixijs`
- URL: https://github.com/pixijs/pixijs
- Stars: ~49k. Active (pushed 2026-11-24). License: MIT.
- Artifact: `.github/workflows/release.yml` — builds with `npm run dist`, then
  attaches `./dist/**/*` to a GitHub release and publishes with trusted
  publishing.
- Quote (verified in source): credentials come from `${{ secrets.* }}` and
  `id-token: write`; the job comment notes npm trusted publishing "only accepts
  GitHub-hosted runners".
- Borrowed: build and publish are separate steps; secrets enter as environment
  references, never as literals; release assets are attached, not committed.
- Rejected: the JS rendering stack and GitHub Actions.

## Software (3)

### 5. npm CLI — `npm/cli`
- URL: https://github.com/npm/cli
- Stars: ~10k. Active (pushed 2026-11-23). License: the GitHub API reports
  NOASSERTION; `LICENSE` reads "The Artistic License 2.0".
- Artifact: `lib/commands/publish.js` — the publish command and its options.
- Quote (verified in source): the option list includes `'dry-run'`, `'otp'`, and
  `'provenance'`; `const dryRun = this.npm.config.get('dry-run')` decides whether
  anything is uploaded.
- Borrowed: `npm publish --dry-run` as the rehearsal the plan must use, and the
  idea that the publish command is a network write gated by configuration.
- Rejected: the Node package registry and the CLI implementation.

### 6. GoReleaser — `goreleaser/goreleaser`
- URL: https://github.com/goreleaser/goreleaser
- Stars: ~16k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `www/content/customization/publish/snapshots.md` and
  `internal/pipe/snapshot/`.
- Quote (verified in source): "Sometimes we want to generate a full build of our
  project, but neither want to validate anything nor upload it to anywhere.
  GoReleaser supports this with the `--snapshot` flag".
- Borrowed: a first-class "build everything, publish nothing" mode; the plan E12
  asks for is that mode in prose.
- Rejected: Go, the release pipes, and the config schema.

### 7. Gitleaks — `gitleaks/gitleaks`
- URL: https://github.com/gitleaks/gitleaks
- Stars: ~31k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `README.md` and `.github/workflows/gitleaks.yml` — scans a repo for
  passwords, API keys, and tokens; the project runs it on its own pushes.
- Quote (verified in source): "Gitleaks is a tool for detecting secrets like
  passwords, API keys, and tokens in git repos, files, and whatever else you
  wanna throw at it via `stdin`."
- Borrowed: a canary scan over the transcript, the log, and the artifact, where
  a hit is a failure rather than a warning.
- Rejected: the Go scanner, its rule set, and the GitHub Action.

## AI-agent evaluation (2)

### 8. LangGraph — `langchain-ai/langgraph`
- URL: https://github.com/langchain-ai/langgraph
- Stars: ~45k. Active (pushed 2026-11-25). License: MIT.
- Artifact: `libs/prebuilt/langgraph/prebuilt/interrupt.py` — human-in-the-loop
  interrupt configuration.
- Quote (verified in source): `HumanInterruptConfig` "controls the available
  interaction options when the graph is paused for human input"; the human may
  `allow_ignore`, `allow_respond`, `allow_edit`, or `allow_accept`.
- Borrowed: the pause before an irreversible step, and the rule that a missing
  answer is an ignore, not an accept.
- Rejected: the Python graph runtime and its state machine.

### 9. SWE-agent — `SWE-agent/SWE-agent`
- URL: https://github.com/SWE-agent/SWE-agent
- Stars: ~21k. Active (pushed 2026-11-23). License: MIT.
- Artifact: `sweagent/agent/reviewer.py` — a reviewer hook on submission.
- Quote (verified in source): `AbstractReviewer.review(instance, submission)`
  returns a result, and `on_submit(submission)` is "Called when the agent
  submits a solution".
- Borrowed: submission is a separate, reviewable event with its own hook, not
  the same act as finishing the work.
- Rejected: the benchmark harness and the model interface.

## Considered and rejected

- `cli/cli` (~47k, MIT, pushed 2026-11-25) — `gh release create` both creates the
  release and uploads assets, which is why it is named in the fixture, but citing
  it as a source would make E12 depend on `gh` being installed.
- `semantic-release/semantic-release` (~24k, MIT, pushed 2026-11-24) — publishing
  automatically on merge is the exact anti-pattern E12 forbids; rejected as a
  model, kept as a named risk.
- `changesets/changesets` (~13k, MIT, pushed 2026-11-24) — a good publish UX with
  no explicit approval boundary.
- `trufflesecurity/trufflehog` (~30k, AGPL-3.0, pushed 2026-11-25) — the AGPL
  license and network verification made Gitleaks the cleaner borrowing source.
- `4ian/GDevelop` (~29k, NOASSERTION, pushed 2026-11-25) — its workflows and root
  hold no release or publish job; the packaging config lives under `newIDE` and
  is store-specific, so there was no verified artifact to cite.
- `phaserjs/phaser` (~41k, MIT, pushed 2026-08-21) — `.github/workflows` contains
  only `lock-comments.yml`; no release automation to quote.

## License note

Bevy is Apache-2.0, Godot MIT, libgdx Apache-2.0, PixiJS MIT, npm CLI Artistic
2.0, GoReleaser MIT, Gitleaks MIT, LangGraph MIT, SWE-agent MIT. Only short
factual observations and structural ideas were used; no code, workflow text, or
license text was copied, and no license attaches to this eval.
