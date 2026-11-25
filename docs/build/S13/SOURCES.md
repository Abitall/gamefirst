# S13 release - sources

Nine repositories read on 2026-11-25 through the GitHub CLI (`gh api`, `gh` 2.105.0), because the unauthenticated REST endpoint returned 403. Stars, licence and archival state are as reported by the API on that date. Each row names the artifact that is analogous to a piece of S13 and what was taken from it. No code was copied: the borrowed items are structure, ordering and one wording principle, restated in this part's own terms.

Rows are labelled `SRC1`-`SRC9` so they never collide with part ids such as S11 or S13.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | OpenRA/OpenRA | https://github.com/OpenRA/OpenRA | 17,834 | GPL-3.0 | Tag-driven packaging: version derived from git, draft release object, channel chosen by tag prefix | Version from tag, never typed; a tag starts the build; the release object starts as a draft | Channel names as a concept (itch-specific); the GPL code itself |
| SRC2 | godotengine/godot | https://github.com/godotengine/godot | 120,809 | MIT | `COPYRIGHT.txt`: machine-readable licence inventory shipped with the source | Licence and attribution as a build content item, with one entry per file whose licence differs | Debian copyright-format syntax, per-file globbing, the whole 100k-line file |
| SRC3 | OpenMW/openmw | https://github.com/OpenMW/openmw | 6,785 | GPL-3.0 | Tag-triggered release workflow with per-OS matrix, build id stamped into the artifact, platform symbols uploaded for crash reports | Ref, job and commit recorded in the artifact; symbols kept per build and uploaded | Matrix specifics (`macos-26`, `fail-fast`, `secrets: inherit`) and the AWS symbol store |
| SRC4 | itchio/butler | https://github.com/itchio/butler | 1,014 | MIT | Upload model: a named channel is the destination slot, re-push updates it | One build command per target, re-upload replaces that target | Channel vocabulary, its tag semantics, the CLI surface |

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | goreleaser/goreleaser | https://github.com/goreleaser/goreleaser | 16,155 | MIT | Release pipeline: checksums pipe, signing pipe, draft-and-never-publish default | Checksums and signatures as mandatory artifacts; draft is the default state, publishing is a separate act | The YAML config surface, the pipe architecture, the 60+ integrations |
| SRC6 | sigstore/cosign | https://github.com/sigstore/cosign | 6,476 | Apache-2.0 | Signing guidance for artifacts addressed by mutable names | Sign and verify the digest, not the label; a mismatch blocks rather than retries | Keys, OIDC flows, transparency logs, any tool invocation |
| SRC7 | electron/electron | https://github.com/electron/electron | 124,085 | MIT | `.claude/skills/chrome-release-verify/SKILL.md` plus `script/release/uploaders/upload-symbols.py` | Local-first order (verify, then push); explicit sign-off before continuing; symbols uploaded per release for crash reports | CVE triage table, backport set, `e sync --3`, Breakpad paths |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | aaif-goose/goose | https://github.com/aaif-goose/goose | 56,984 | Apache-2.0 | `RELEASE.md` plus `RELEASE_CHECKLIST.md`: human downloads and tests the release build before a tag is cut | Test the release candidate itself, not the local build; tag only when the candidate is confirmed | The release-PR machinery, the agent-generated test plan, signing instructions |
| SRC9 | continuedev/continue | https://github.com/continuedev/continue | 36,561 | Apache-2.0 | `.github/workflows/reusable-release.yml`: release workflow that takes its credentials as declared secret inputs | Secrets by reference only, named at the boundary, two of them mandatory | Semantic-release, npm publishing, the thirteen optional model-provider keys |

## Verbatim quotes

- `SRC1` `Makefile:55`: `VERSION := $(shell git name-rev --name-only --tags --no-undefined HEAD 2>/dev/null || (c=$$(git rev-parse --short HEAD 2>/dev/null) && echo git-$$c))`
- `SRC1` `.github/workflows/packaging.yml:33`: `--draft \` (job `Create Draft Release`, line 15)
- `SRC2` `COPYRIGHT.txt:3`: `Exhaustive licensing information for files in the Godot Engine repository`
- `SRC3` `.github/workflows/windows.yml:182`: `printf "Ref ${{ github.ref }}\nJob ${job_url}\nCommit ${{ github.sha }}\n" > install/CI-ID.txt`
- `SRC3` `.github/workflows/windows.yml:189`: `name: openmw-windows-${{ inputs.msvc }}-pdb-${{ github.sha }}`
- `SRC4` `docs/pushing.md`: "`channel` is which slot you're uploading it to"
- `SRC4` `docs/pushing.md`: *Channel names will determine the initial set of tags of a slot, but you can always fix them later.*
- `SRC5` `internal/pipe/release/release.go:213-214`: `// a draft release is created but never published, so reporting it as` / `// "published" would be misleading.`
- `SRC5` `internal/pipe/checksums/checksums.go:1`: `// Package checksums provides a Pipe that creates .checksums files for`
- `SRC6` `doc/cosign_sign.md`: `Make sure to sign the image by its digest (@sha256:...) rather than by tag (:latest) so that you actually sign what you think you're signing! This prevents race conditions or (worse) malicious tampering.`
- `SRC7` `.claude/skills/chrome-release-verify/SKILL.md`: `The flow is **local-first**: nothing is pushed until every patch applies via `e sync --3` and passes `lint --patches`.`
- `SRC7` `.claude/skills/chrome-release-verify/SKILL.md`: `Report the table now (`CVE | Sev | Bug | Component | Verdict | CL`) and the proposed backport set; get user sign-off before continuing.`
- `SRC8` `RELEASE.md`: `Download and test the .zip from the release PR`
- `SRC8` `RELEASE.md`: `When ready, follow the instructions on the release PR to tag and release`
- `SRC8` `RELEASE_CHECKLIST.md`: `Download the release builds from this PR.`
- `SRC9` `.github/workflows/reusable-release.yml:12-16`: `secrets:` / `SEMANTIC_RELEASE_GITHUB_TOKEN:` / `required: true` / `SEMANTIC_RELEASE_NPM_TOKEN:` / `required: true`

## Dead ends

- **microsoft/autogen** (61,967 stars) - archived on 2026-11-12, licence reported as CC-BY-4.0, which is not a software licence. Nothing about release gating could be read as current practice; nothing borrowed.
- **langgenius/dify** (161,893 stars) - licence reported as `NOASSERTION`: custom terms with extra conditions. Permissions could not be stated, so the repository was dropped rather than quoted.
- **libgdx/libgdx** (25,558 stars, Apache-2.0) - has a `THIRDPARTY` file and a `gradle/dist.gradle` uber-jar build, but no release or preflight pipeline. The legal file was better covered by `SRC2`; the analogue was too thin, so it was rejected rather than padded in.

## Finding

The sample splits cleanly. Build discipline - tag-derived versions, artefacts with checksums and signatures, draft-by-default publishing, per-build symbols, secrets passed by name - is well covered by the software and gamedev repositories, and S13 takes it from there (`SRC1`, `SRC3`, `SRC5`, `SRC6`, `SRC9`). What no repository in the sample ships is any store-page metadata practice: no capsule or screenshot specification, no age-rating questionnaire, no wishlist or demo timing, no privacy disclosure text. Those units of S13 are therefore authored as a checklist with an evidence path per line instead of being copied from a template, and the copy itself stays with P07. This absence is the report's main evidence gap and is recorded as a decision, not hidden.
