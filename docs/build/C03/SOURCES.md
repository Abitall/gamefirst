# C03 release-crew - sources

Nine real repositories behind `artifact/library/game/crews/release-crew.md`: 4 gamedev, 3 software, 2 AI-agent. Stars read on 2026-11-25. No text or code was copied; quotes are evidence of the idea, and every borrow is restated in the crew's own words.

| # | Kind | Repository | URL | Stars | License | Analogous artifact |
|---|---|---|---|---|---|---|
| S1 | gamedev | bevyengine/bevy | https://github.com/bevyengine/bevy | 49,981 | MIT OR Apache-2.0 | `_release-content/` - release notes plus migration guides per cycle |
| S2 | gamedev | OpenRA/OpenRA | https://github.com/OpenRA/OpenRA | 17,833 | GPL-3.0 | `packaging/package-all.sh` - one tag, four platform packages |
| S3 | gamedev | itchio/butler | https://github.com/itchio/butler | 1,012 | MIT | `docs/pushing.md` - version and channel named per build |
| S4 | gamedev | MonoGame/MonoGame | https://github.com/monogame/MonoGame | 14,667 | MS-PL | `build/TestNuGetsTasks/` - install the shipped package, then test per platform |
| S5 | software | kubernetes/sig-release | https://github.com/kubernetes/sig-release | 644 | Apache-2.0 | release team scoped to one cycle, with the schedule and roster in the repo |
| S6 | software | fastlane/fastlane | https://github.com/fastlane/fastlane | 42,508 | MIT | `deliver/lib/deliver/options.rb` - verify without uploading, submit as a separate flag |
| S7 | software | semantic-release/semantic-release | https://github.com/semantic-release/semantic-release | 24,202 | MIT | lifecycle where publish is one final step after verification |
| S8 | AI-agent | microsoft/autogen | https://github.com/microsoft/autogen | 61,968 | MIT | termination conditions - a bounded run with a hard stop |
| S9 | AI-agent | openai/openai-agents-python | https://github.com/openai/openai-agents-python | 30,864 | MIT | human-in-the-loop approval that pauses the run before a sensitive call |

## S1 bevyengine/bevy - gamedev

> This directory contains drafts of documentation for the current development cycle, which will be published to the website during the next release.

> Check out the upcoming Bevy release branch in the `bevy` repo

> After saving and exiting the tool, it will write `merged_release_notes.md` and `merged_migration_guides.md` to `_release-content`

All three from `_release-content/README.md`.

**Borrow.** Every cycle carries a migration guide next to the release notes, so a behaviour change is a written document before release, not an email after it. This is why the crew's install test ends with "load the previous release's save": a save that fails to load is the migration guide's absence, caught late.

**Reject.** The publishing workflow (`tools/export-content`, `bevy-website` articles). Preparing the notes is ours; putting them on the internet is not.

**Dead end.** `_release-content/release_notes.md` is a per-cycle changelog draft, not a process: it tells you what changed, never who signs or who decides.

## S2 OpenRA/OpenRA - gamedev

> Usage: $(basename "$0") version outputdir.

> ./buildpackage.sh "${GIT_TAG}" "${BUILD_OUTPUT_DIR}"

Both from `packaging/package-all.sh`.

**Borrow.** One entry point takes the version and the output directory, then hands the same `GIT_TAG` to `windows`, `linux`, `macos` and `source`. The version is an argument of the packager, which is the cheapest possible form of "the build stamps the version, not the person" - the crew's Work 2.

**Reject.** A script that builds every target unconditionally. A target the project cannot build is cut in Work 1 (R9), not attempted and reported as a failure later.

**Dead end.** `packaging/.itch.toml` and the `packaging/{linux,macos,windows}` folders describe per-platform layout, but the platform differences there are packaging details, not release decisions; nothing worth importing into a checklist.

## S3 itchio/butler - gamedev

> The only command that you need to remember is `butler push`

> By default, the itch.io backend will generate a constantly-increasing integer version number for your builds, for each channel.

> However, if you're already generating your own build number, you should pass it to butler with the `--userversion` option:

All from `docs/pushing.md`.

**Borrow.** A build is identified by `(user, game, channel)` plus a version, and the version can be supplied by the build instead of the service. The crew names version and target explicitly for the same reason: a store channel alone is not an identity.

**Reject.** `butler push` itself - the tool's job is to send bytes to a store, and the crew's limits end one step earlier.

**Dead end.** Butler is small (1,012 stars) for a general source. It is kept because it is the first-party CLI for one of the target stores and the only artifact consulted that treats channel and version as separate, explicit fields; the property is narrow and the citation is narrow with it.

## S4 MonoGame/MonoGame - gamedev

> CleanupPreviousTestRun(context, testsPath, projectPath, nugetSourceName);

> UninstallExistingTemplates(context);

> InstallTemplates(context, templateVersion, nugetSourcePath);

> Detected MonoGame template version: {templateVersion}

All from `build/TestNuGetsTasks/TestMonoGameTemplateTaskBase.cs`, `Run()`.

**Borrow.** The build tests the artifact the same way a user receives it: wipe the previous run, uninstall what is already installed, install the shipped package into a fresh folder, then run the platform tests. That sequence is the crew's Work 3, and the version logged at the start is Work 2's stamp.

**Reject.** The NuGet publishing tasks in `build/DeployTasks/`. Testing and deploying live in the same folder upstream; in the crew they are separated by R4.

**Dead end.** `build/Tasks.cs` is a Frosting task registry, useful only to understand how the suite is wired.

## S5 kubernetes/sig-release - software

> Several of the responsibilities of SIG Release are discharged by the Release Team, a subproject of SIG Release.

> Each release cycle has a directory under [`releases/`](releases/) with its schedule, Release Team roster and links to the tracking boards and meeting notes.

Both from `README.md`.

**Borrow.** A temporary team, chartered per cycle, with a roster and a schedule that live in the repository. The crew is the same shape: named members, one window, and an end date written before the work starts.

**Reject.** The standing organization - shadow roles, escalation paths, and a team that persists between releases. A solo project needs the temporary part only.

**Dead end.** The per-cycle `releases/` directories are mostly calendar and meeting links for a large project; the reusable idea is the scoping, not the contents.

## S6 fastlane/fastlane - software

> description: "Verifies archive with App Store Connect without uploading"

> description: "Submit the new version for Review after uploading everything"

Both from `deliver/lib/deliver/options.rb`.

**Borrow.** The two operations are separate flags, with `verify_only` deliberately not uploading. The crew's Work 2 borrows exactly this: if a store can validate the artifact without receiving it, run that check before G3 - and uploading stays a different, later action.

**Reject.** `submit_for_review`. Automatic submission after upload is the pattern R4 exists to prevent; the crew never bundles "prepared" with "sent".

**Dead end.** `deliver/README.md` is a stub that redirects to `docs.fastlane.tools`, so the in-repo options file is the only citable artifact.

## S7 semantic-release/semantic-release - software

> **semantic-release** automates the whole package release workflow including: determining the next version number, generating the release notes, and publishing the package.

From `README.md`.

**Borrow.** A named, ordered lifecycle where publishing is one final step after verification, and the version comes from a rule rather than a mood. That ordering is visible in the crew's Work: check, pack, present, and only then - on the user's command - send.

**Reject.** The whole point of the tool: a merge that publishes without a human. The crew is the deliberate opposite and cites this source as the counterexample it decided against, not as a model.

**Dead end.** Automated changelog generation is S13 step 2 reading, and marketing copy is P07's; neither belongs in the crew's checklist.

## S8 microsoft/autogen - AI-agent

> Terminate the conversation after a maximum number of messages have been exchanged.

From `MaxMessageTermination` in `python/packages/autogen-agentchat/src/autogen_agentchat/conditions/_terminations.py`.

**Borrow.** A run needs a stop condition that is part of the design, not a judgement call at the end. The crew has three: the freeze window, "stops after three failed fixes" for A03, and disbanding after G3.

**Reject.** Fixed exchange counts as the only stop. A release waits on evidence, not on a message budget; the counters are guardrails, not the goal.

**Dead end.** The broader multi-agent orchestration surface (group chat, handoffs) answers a question the project does not ask: the crew is three named roles, not a swarm.

## S9 openai/openai-agents-python - AI-agent

> Use the human-in-the-loop (HITL) flow to pause agent execution until a person approves or rejects sensitive tool calls.

From `docs/human_in_the_loop.md`.

**Borrow.** The pause is a first-class state: the run stops, keeps its state, and waits for a decision instead of guessing. That is the crew's Limits section - "prepares and waits" - and why the evidence folder is complete before the user is asked anything.

**Reject.** Approval attached to individual tool calls. The crew needs one decision at the boundary (publish, spend, store contact, public post), not per-file prompts that train the user to click yes.

**Dead end.** `RunState` serialization is interesting for resumable runs but has no bearing on a release checklist.

## Dead ends

| Source | Why it was dropped |
|---|---|
| o3de/sig-release | Best release checklist found: numbered checkbox items in `releases/Process/O3DE Exception Checklist.md`, and a stabilization process that branches from development and limits new features. Dropped at 11 stars: too small to cite as a practice, and the checklist would have been too easy to copy wholesale. |
| humanlayer/humanlayer | 12,951 stars, but repositioned toward coding-agent orchestration; the approval artifact is diluted across SDK and cloud docs. |
| electron/electron | 124,084 stars and a real release process, but `docs/development/releasing.md` is now a 404 and the docs tree has no replacement, so there is nothing citable. |
| django/django | 91,797 stars; "How is Django Formed?" is the classic release document, but the repo path could not be verified in the time budget, and an unverified path is worse than no source. |
| nodejs/Release | 4,397 stars and a genuine per-cycle schedule, but the license field could not be established from the repository metadata, so it was replaced by S7. |
| EpicGames/UnrealEngine | Private repository; nothing to cite. |
| Unity CsReference | License-restricted reference code; not quotable as practice. |

## What was deliberately not used

- No text from any source: every quote above is one sentence used as evidence, and every rule in the crew is written from the project's own rules.
- No release checklist content from o3de/sig-release, even though it was the closest match: copying a checklist would have produced twenty lines nobody could defend.
- No store-specific technical requirement (screenshot sizes, TRC item numbers): those change per platform and live in S13 step 1, read as data at release time.
