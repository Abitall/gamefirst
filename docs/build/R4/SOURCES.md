# R4 — Sources

Nine repositories with an artifact analogous to "a local commit is private; a
publish is a separate, explicit act": four gamedev, three software, two AI-agent.

Star counts were read from the GitHub API through `gh api` on 2026-11-25. Quotes
are verbatim from the linked file where the file was read that day. Entries
marked **paraphrase** are documented behaviour of a named command or option whose
source file was not re-read (path moved, or the tool is not installed here); no
quote is claimed for them. Nothing was copied: no code, no config, no license
text.

## Gamedev (4)

### 1. MonoGame/MonoGame — 14,671 stars

- URL: https://github.com/MonoGame/MonoGame
- Artifact: `.github/workflows/main.yml`.
- Quote: the `deploy` job runs `if: ${{ github.event_name == 'push' }}` and
  `needs: [ build, pack-native-runtime, tests ]`; the release step is
  `if: github.ref_type == 'tag'`; credentials arrive only there
  (`NUGET_API_KEY: ${{ secrets.NUGET_API_KEY }}`) under job-scoped
  `permissions: packages: write, contents: write`.
- Analogous to: publishing is a job of its own, downstream of tests, gated on an
  explicit tag, holding the keys the build never sees.
- Borrowed: the ordering tests -> publish, the tag as the human act, and secrets
  scoped to the publishing job alone.
- Rejected: `Push Nugets` runs on every push to the branch, so a build result
  reaches a feed without anyone deciding. R4 keeps the tag gate and refuses the
  per-push feed.

### 2. Anuken/Mindustry — 29,971 stars

- URL: https://github.com/Anuken/Mindustry
- Artifact: `.github/workflows/deployment.yml`.
- Quote: the trigger is `on: push: tags: - 'v*'`; the workflow declares
  `permissions: {}` and grants `contents: write # for release creation
  (svenstaro/upload-release-action)` inside the job only.
- Analogous to: a commit can never publish; only a tag does, and the workflow is
  otherwise powerless.
- Borrowed: the tag-only trigger and empty-by-default permissions widened for one
  job — the mechanical version of "deny by default, grant per action".
- Rejected: the deployment step tagging a second repository, pushing to a docs
  repository, and rewriting an F-Droid build with personal access tokens. Too
  much blast radius for one trigger, and tokens live in URLs.

### 3. bevyengine/bevy — 49,998 stars

- URL: https://github.com/bevyengine/bevy
- Artifact: `_release-content/README.md`.
- Quote: "This directory contains drafts of documentation for the current
  development cycle, which will be published to the website during the next
  release." The publishing procedure begins "When it is time to start preparing
  the final release notes / migration guide over in `bevy-website`".
- Analogous to: drafting lives in the working repo indefinitely; publication is a
  later act, into a different place, started by a person at a chosen time.
- Borrowed: the draft/published split as a state, not a promise — work can be
  finished and still not be out.
- Rejected: `tools/export-content` and the website repository workflow; the tool
  formats content rather than gating publication.

### 4. libgdx/libgdx — 25,558 stars

- URL: https://github.com/libgdx/libgdx
- Artifact: `publish.gradle` and `.github/workflows/build-publish.yml`.
- Quote: the release repository is the local folder — "If release build, dump
  artifacts to local build/staging-deploy folder for consumption by jreleaser
  below" — and the deploy only exists `if (project.hasProperty('RELEASE'))`,
  from `stagingRepository("${rootProject.buildDir}/staging-deploy")`. The manual
  trigger declares an input `'Publish release to Maven Central'`, type boolean,
  `default: false`.
- Analogous to: the build always produces artifacts locally; a named switch that
  is off by default turns the same build into a publish.
- Borrowed: stage locally first, publish from the staged copy, and a publish flag
  that defaults to false — the closest mechanical match to R4's "private until a
  command".
- Rejected: the jreleaser configuration and the Maven Central publisher
  credentials path; store-specific and out of core.

## Software (3)

### 5. rust-lang/cargo — 15,795 stars

- URL: https://github.com/rust-lang/cargo
- Artifact: the `cargo publish` command (**paraphrase**; the book page moved, see
  dead ends).
- Behaviour cited: `cargo publish --dry-run` performs every check and packages
  the crate without uploading, and a successful publish is permanent — the
  version cannot be replaced.
- Analogous to: the irreversible publish, with a free rehearsal built into the
  same command.
- Borrowed: "dry-run first" and the framing that the cost of a wrong publish is
  permanent, which is why R4 asks for the rollback path *before* the yes.
- Rejected: the registry and crate model; only the reversal cost transfers.

### 6. goreleaser/goreleaser — 16,155 stars

- URL: https://github.com/goreleaser/goreleaser
- Artifact: the release command's snapshot mode (**paraphrase**; the docs
  directory moved, see dead ends).
- Behaviour cited: `goreleaser release --snapshot` runs the entire release
  pipeline and writes the artifacts locally while skipping the publish step.
- Analogous to: a complete rehearsal that is indistinguishable from the real run
  except that nothing leaves the machine.
- Borrowed: the snapshot idea — R4's "show the artifact, target, version" is the
  same rehearsal, done for the user instead of the filesystem.
- Rejected: config-as-code releases and changelog generation; another source of
  truth for what shipped.

### 7. cli/cli — 47,202 stars

- URL: https://github.com/cli/cli
- Artifact: `gh release create --help`, v2.105.0, read locally on 2026-11-25.
- Quote: "If you specify `--draft`, the command leaves the release unpublished."
  The flag is `-d, --draft[=true|false]  Save the release as a draft instead of
  publishing it`; the help also warns that creating a release with assets "use[s]
  separate API requests and do not form a single atomic operation".
- Analogous to: a release object can exist, be reviewed, and still not be public;
  and the upload itself is not atomic, so a half-published state is real.
- Borrowed: the draft as a named state between "prepared" and "published", and
  the non-atomic warning behind R4's demand for a target and a rollback path.
- Rejected: the release-asset flow itself; R4 names no forge.

## AI-agent workflow (2)

### 8. openai/codex — 136,426 stars

- URL: https://github.com/openai/codex
- Artifact: the sandbox documentation for `workspace-write` (**paraphrase**; not
  re-read on 2026-11-25).
- Behaviour cited: in the write-enabled sandbox, network access stays **off** by
  default; the agent may edit the workspace but cannot reach the outside world
  until that is turned on explicitly, and approvals are a separate policy.
- Analogous to: the outward action is blocked by the default configuration, not
  by the model remembering a paragraph.
- Borrowed: default-deny on the outbound direction — the reason R4 points at the
  permission baseline rather than trusting the prompt.
- Rejected: the full sandbox model (filesystem, process isolation); a solo game
  repo needs the network boundary, not a container.

### 9. anthropics/claude-code — 157,032 stars

- URL: https://github.com/anthropics/claude-code
- Artifact: the permission settings documentation — allow / ask / deny rules
  matched against tool calls (**paraphrase**; not re-read on 2026-11-25).
- Behaviour cited: a denied command is refused by the harness regardless of what
  the conversation asks for, and the user can grant a single call without
  changing the standing rule.
- Analogous to: "the agent can ask the user to run it" as a designed path, not a
  workaround.
- Borrowed: rule-as-config, and the per-call grant that R4's `## Enforcement`
  names as the exception shape.
- Rejected: the settings hierarchy (user, project, local, enterprise); one
  project file is enough here.

## Considered, not counted

| Repository | Stars | Why not counted |
|---|---|---|
| godotengine/godot | 120,802 | `.github/workflows/` holds build jobs only and never uploads; the point would be an absence, not an artifact. |
| OpenRA/OpenRA | 17,834 | `Makefile` covers build, test, check, install; `packaging/package-all.sh` only writes packages locally. Nothing to quote about publishing. |
| semantic-release/semantic-release | 24,202 | The exact model R4 rejects: publishing decided by commit messages. Cited in `JUSTIFICATION.md` as the rejected pattern, not as a borrow. |
| npm/cli | 10,278 | `npm publish --dry-run` duplicates source 5 without adding a mechanism. |
| changesets/changesets | 12,598 | `packages/cli/README.md` is now a stub pointing at changesets.dev; no artefact in the repo to cite. |
| kubernetes/release | 506 | Stage/publish split is right, but the artifact is a cluster release CLI and the repo is too narrow to generalise. |
| OpenHands/OpenHands | 94,318 | Confirmation for risky actions exists, but the artifact is a runtime service, not a publish gate. |
| aaif-goose/goose | 56,980 | Approval modes are close, but the docs describe interaction modes rather than outbound-action policy. |
| anomalyco/opencode | 229,121 | The harness itself: its permission format is read directly in `template/opencode.json`, so citing it would be self-reference. |
| Aider-AI/aider | 50,255 | Commits locally and does not push — the right split, but the last push was 2026-05-22, too stale for the currency bar. |
| SWE-agent/SWE-agent | 20,871 | No publish surface to study. |
| raysan5/raylib, love2d/love | 35,790 / 9,006 | Build and install targets only; no publish step to compare. |

## Dead ends encountered

- The unauthenticated GitHub REST API returned HTTP 403 (rate limit) for every
  repository; all counts were taken with `gh api` instead.
- `rust-lang/cargo` — both `src/doc/src/reference/publishing.md` and the
  `src/doc/src/reference` listing return HTTP 404; the book was restructured. The
  source is cited by documented command behaviour, not by a file.
- `goreleaser/goreleaser` — `www/docs` returns HTTP 404; the documentation moved
  out of the repository. Same treatment as cargo.
- `changesets/changesets` — the CLI README now only links to changesets.dev, so
  the entry was dropped rather than quoted at second hand.
- `bevyengine/bevy` — `tools/publish.sh` no longer exists; the release tooling is
  now `tools/export-content`, which formats rather than publishes.
- Three repositories were renamed between the first attempt and the successful
  query: `All-Hands-AI/OpenHands` -> `OpenHands/OpenHands`, `block/goose` ->
  `aaif-goose/goose`, `sst/opencode` -> `anomalyco/opencode`.
