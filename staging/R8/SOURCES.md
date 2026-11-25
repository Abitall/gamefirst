# SOURCES — R8

Nine repositories read on 2026-11-25. Stars are the GitHub API values on that
date (authenticated `gh api repos/<owner>/<repo>`). Quotes are verbatim from the
artifact named; nothing below is copied into the rule as prose. Each entry says
what was borrowed and what was rejected, because a source that only agrees with
the rule teaches nothing.

## Gamedev (4)

### 1. OpenRA/OpenRA — 17,834 stars

- **URL:** https://github.com/OpenRA/OpenRA
- **Artifact:** wiki page `Branches-and-Releases`, https://github.com/OpenRA/OpenRA/wiki/Branches-and-Releases
- **Quote:** "At several points during this stabilization phase, starting when first creating the prep branch, playtests will be tagged for testing from a wider audience."
- **Analogous to:** G1's requirement that a human meets a real build, not a description.
- **Borrowed:** the playtest is a tagged build handed to people outside the change; the artifact exists before the judgement.
- **Rejected:** OpenRA's playtest is a stabilization channel for bugs and regressions, not a fun decision. It has no keep/kill/retune line, and "wider audience" is not "one human for 15–20 minutes".

### 2. Warzone2100/warzone2100 — 4,079 stars

- **URL:** https://github.com/Warzone2100/warzone2100
- **Artifact:** `doc/Release.md`, https://github.com/Warzone2100/warzone2100/blob/master/doc/Release.md
- **Quote:** "While the CI builds on GitHub (via `GitHub Actions`, etc) can be used to check that it compiles fine on Linux, macOS & Windows, it can't actually tell you if it works." / "You should locally test whether the latest commit's build actually runs, in both single & skirmish and multiplayer!"
- **Analogous to:** R1's build-is-truth, applied to the moment before a release.
- **Borrowed:** a green pipeline proves compilation, not play; a person must launch the build and play the modes.
- **Rejected:** the checklist tests that the game runs, not that it is fun. Its own "### Test the game" section says "TBD" — the strongest evidence in this set that release QA and a fun verdict are different questions.

### 3. veloren/veloren — 7,717 stars

- **URL:** https://github.com/veloren/veloren
- **Artifact:** `README.md`, https://github.com/veloren/veloren/blob/master/README.md
- **Quote:** "We accept many types of contributions, not only from software developers! For example, players who submit their feedback and artists who share their artworks with the community."
- **Analogous to:** the human player as a first-class source of evidence, not a recipient of the result.
- **Borrowed:** player feedback is work the project asks for and counts, not noise after the fact.
- **Rejected:** open-ended feedback has no session boundary, no build pin, and no dated decision. R8 needs the three ordered artifacts, not a feedback channel.

### 4. 0ad/0ad — 2,827 stars

- **URL:** https://github.com/0ad/0ad
- **Artifact:** 0 A.D. Design Document, index page, https://docs.wildfiregames.com/design/
- **Quote:** "It represents the current plan for 0 A.D. but the final game might not be exactly as described here due to for example issues found when balancing the game or features cut to make it possible to release the game in a reasonable time."
- **Analogous to:** the document-versus-game gap that R8 exists to close.
- **Borrowed:** the project itself treats the design document as a plan that the game may contradict; a plan is not a result.
- **Rejected:** the document as evidence of fun. It has no build, no session, no quotes, and no decision line, and its disclaimer says so.

## Software (3)

### 5. 18F/methods — 228 stars

- **URL:** https://github.com/18F/methods
- **Artifact:** `_methods/usability-testing.md`, https://github.com/18F/methods/blob/main/_methods/usability-testing.md
- **Quote:** "Observing users as they attempt to use a product or service while thinking out loud." / "Moderators should verbally confirm with the participant that it's okay to record the test, ask participants to think outloud, and guide the participant through the session."
- **Analogous to:** the playtest protocol in S08, S09, and S10.
- **Borrowed:** observe a real person using the thing, record it with consent, keep the moderator from leading, write down what happened.
- **Rejected:** a 30–60 minute usability test of a sketch or prototype measures task completion, not whether a loop is worth replaying. One observer and one session are the floor, not a study.

### 6. rrweb-io/rrweb — 20,505 stars

- **URL:** https://github.com/rrweb-io/rrweb
- **Artifact:** `README.md`, https://github.com/rrweb-io/rrweb/blob/master/README.md
- **Quote:** "rrweb refers to 'record and replay the web', which is a tool for recording and replaying users' interactions on the web."
- **Analogous to:** the capture or video demanded by the evidence section.
- **Borrowed:** the session is recorded so a later reader can see what the human saw, instead of trusting a summary.
- **Rejected:** DOM event replay is telemetry, and telemetry is a non-goal in the blueprint. R8 asks for a capture of the running build, not an event log to analyse.

### 7. NixOS/nix — 18,074 stars

- **URL:** https://github.com/NixOS/nix
- **Artifact:** `README.md`, https://github.com/NixOS/nix/blob/master/README.md
- **Quote:** "Nix is a powerful package manager for Linux and other Unix systems that makes package management reliable and reproducible."
- **Analogous to:** "the build state that was played" in the evidence list.
- **Borrowed:** pin the exact state, so the session can be repeated and the note cannot drift from the build.
- **Rejected:** a reproducible environment is not a reproducible experience. Nix can prove the same bytes ran; it cannot say whether the loop was boring.

## AI-agent workflow (2)

### 8. humanlayer/humanlayer — 12,956 stars

- **URL:** https://github.com/humanlayer/humanlayer
- **Artifact:** `README.md`, https://github.com/humanlayer/humanlayer/blob/master/README.md
- **Quote:** "HumanLayer runs coding agents (Claude Code, Codex, OpenCode, Pi) on your machines and lets your team steer them from one place: tasks, sessions, plans, and reviews, synced between a desktop app, a web app, and a daemon on each host."
- **Analogous to:** the agent prepares, the human judges.
- **Borrowed:** the human keeps a steering seat over work the agent performs; the agent does not certify its own output.
- **Rejected:** asynchronous review of an agent's report is still reading, not playing. The human in R8 holds the controller for 15–20 minutes; approving a plan is a different act.

### 9. lm-sys/FastChat — 39,550 stars

- **URL:** https://github.com/lm-sys/FastChat
- **Artifact:** `README.md`, https://github.com/lm-sys/FastChat/blob/main/README.md
- **Quote:** "Chatbot Arena has collected over 1.5M human votes from side-by-side LLM battles to compile an online LLM Elo leaderboard."
- **Analogous to:** human judgement as the measurement, not the system's own claim about itself.
- **Borrowed:** preference is collected from people who used the thing, and the ranking is derived from those choices.
- **Rejected:** 1.5M pairwise votes are a population statistic; G1 needs one named human, one build, one session, one dated line. A leaderboard does not decide whether this loop survives.

## Considered, not counted

| Repo | Why it is not one of the nine |
|---|---|
| bevyengine/bevy, godotengine/godot, Anuken/Mindustry | Already counted by R1 and R7; no playtest artifact distinct enough to justify a second use. |
| microsoft/playwright | Trace viewer is close to rrweb's role; rrweb states the record-and-replay idea in one line. |
| storybookjs/storybook | Isolation of a component is S09's gym, not proof that a loop is fun. |
| langchain-ai/langgraph | Human-in-the-loop interrupts overlap humanlayer; humanlayer states the steering seat more directly. |
| openai/evals | Automated evals are the opposite of the human judgement R8 requires. |
| crawl/crawl, OpenMW/openmw, yairm210/Unciv, Revolutionary-Games/Thrive, endless-sky/endless-sky, Widelands/widelands | Real projects with no playtest or fun-verification artifact in the tree; see dead ends. |

## Dead ends encountered

- `crawl/crawl`: `crawl-ref/docs/develop/testing.md` is unit, Catch2, Lua, and coverage testing; no human play.
- `OpenMW/openmw`: `docs/` is Doxygen and code documentation.
- `yairm210/Unciv`: `docs/Developers/Testing-AI-changes.md` and `Testing-Android-Builds.md` test code and packaging.
- `Revolutionary-Games/Thrive`: tree matches are gdUnit tests and balance code.
- `endless-sky/endless-sky`: `docs/` holds `CONTRIBUTING.md` and `readme-developer.md` only.
- `Widelands/widelands`: `doc/sphinx/source/` is developer and Lua documentation.
- `CleverRaven/Cataclysm-DDA`, `wesnoth/wesnoth`: tree search for `playtest` returns nothing.
- `veloren/book`: the word "playtest" does not occur in the book; the philosophy page was read and not used instead of a missing artifact.
- `iterative/dvc`: both `main` and `master` README requests returned 404; Nix took the pin-the-state role.
- `0 A.D.` forum release-candidate thread and the Wesnoth wiki raw page timed out or returned a transport error; the 0 A.D. design-document disclaimer was reachable and is stronger for the point.
- GitHub code search (`gh api search/code`) returned HTTP 500; repository trees were searched instead.
