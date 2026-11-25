# G3 - ship: sources

Nine repositories, read on 2026-11-25. Stars come from ungh.cc, because the
GitHub API was rate-limited that day; every quote is copied from the file named
in the row. Nothing is code or license text reused: the artifact borrows the
shape of an idea, not the words. SRC1 also appears in G2 for a different point
of the same file; the quote below is a different one.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | OpenTTD/OpenTTD | https://github.com/OpenTTD/OpenTTD | 8,531 | GPL-2.0 (`COPYING.md`; GitHub reports NOASSERTION) | `docs/releasing_openttd.md`: a release branch records exactly which savegame version it writes | "Add a note to `src/saveload/saveload.h` about which savegame version is used in the branch." | The backport scripts and changelog mechanics |
| SRC2 | itchio/butler | https://github.com/itchio/butler | 1,014 | MIT | `docs/pushing.md`: a build goes to a named channel and is updated in place | "Pushing to the same channel again will update that file, once the build is processed." | The butler CLI and its binary diffing |
| SRC3 | godotengine/godot-docs | https://github.com/godotengine/godot-docs | 5,933 | CC-BY-3.0 | `engine_details/development/handling_compatibility_breakages.rst`: compatibility breaks are a known, handled case | "Breaking compatibility should be avoided, but when necessary there are systems in place" | The compatibility binding code |
| SRC4 | space-wizards/space-station-14 | https://github.com/space-wizards/space-station-14 | 3,912 | MIT | `Content.Packaging/Program.cs`: one packager builds the client and the server for every platform | `logger.Info("Cleaning old release packages (release/)...");` | The game content and the packaging internals |

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | nodejs/node | https://github.com/nodejs/node | 123,960 | MIT | `doc/contributing/releases.md`: release commits and builds are signed by a named person | "All commits to branches in `nodejs/node` other than `main` and `actions/*` MUST be signed" | The CITGM farm and the release train |
| SRC6 | prometheus/prometheus | https://github.com/prometheus/prometheus | 67,841 | Apache-2.0 | `RELEASE.md`: one named shepherd owns a whole release series | "The release shepherd is responsible for the entire release series of a minor release, meaning all pre- and patch releases of a minor release." | The benchmark window and tag signing |
| SRC7 | facebook/react | https://github.com/facebook/react | 252,878 | MIT | `scripts/release/README.md`: preparing a release and publishing it are separate, manual acts | "This document describes how to prepare and publish a release manually, using the command line." | npm dist-tags and the canary cron |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | vllm-project/vllm | https://github.com/vllm-project/vllm | 97,488 | Apache-2.0 | `docs/contributing/release_process.md`: each release is built from its own frozen branch | "Each release is built from a dedicated release branch." | The two-week cadence and cherry-pick rules |
| SRC9 | google-gemini/gemini-cli | https://github.com/google-gemini/gemini-cli | 109,090 | Apache-2.0 | `docs/release-confidence.md`: a failed check blocks promotion, it does not lower a score | "If any of these CUJs fail, the release is a no-go" | The CUJ list and the nightly channels |

## Dead ends

| Repository | Why it was not used |
|---|---|
| Homebrew/brew | The docs folder moved; no release process document in the tree |
| huggingface/transformers | No RELEASE.md in the repository |
| electron/electron | `docs/development` has no release process document |
| sgl-project/sglang | The docs tree has no release process |
| langchain-ai/langchain | The docs tree returned 404 |
| microsoft/autogen, crewAIInc/crewAI | CI workflows only, no written release gate |
| openrct2/OpenRCT2, Cataclysm-DDA, veloren, bevyengine/bevy | No release checklist in the tree |
| SearXNG and DuckDuckGo | Search was unavailable during the run |

## Finding

The nine agree that a ship gate is an evidence check with one owner, not a
score. SRC2 and SRC4 show the artifact moving through a named channel and a
packager that knows every platform; SRC1 and SRC8 show the freeze made real (a
branch, a savegame version); SRC3 and SRC9 show a break treated as a known case
with a no-go rule; SRC5, SRC6 and SRC7 show the part G3 needs most, one named
person who signs and a publish step that stays separate from the decision. G3
keeps one dated line, one owner for 72 hours, and no way to publish from inside
the gate.
