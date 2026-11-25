# G2.5 sources

Nine live repositories, read on 2026-11-25 through the GitHub API. The counts below are stars on that date. Nothing is copied: each row records the sentence that carried the idea and what G2.5 does with it. Licenses are quoted as the repository states them, with the GitHub label in parentheses when the two differ.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | endless-sky/endless-sky | https://github.com/endless-sky/endless-sky | 7,763 | GPL-3.0 | `docs/CONTRIBUTING.md`: stable releases take fixes and small content only; feature pull requests wait for the next unstable cycle; the priority list is set in advance | "During the development of a stable release, we typically only accept bug fixes and minor content tweaks." | The alternating stable/unstable version scheme. |
| SRC2 | bevyengine/bevy-website | https://github.com/bevyengine/bevy-website | 251 | MIT | `content/learn/contribute/project-information/release-process.md`: the milestone is purged before release; regressions and crashes are what remains | "we begin to aggressively purge the milestone of things that seem unlikely to be ready in time." | The three-month cycle and the weekly release-candidate cadence. |
| SRC3 | CleverRaven/Cataclysm-DDA | https://github.com/CleverRaven/Cataclysm-DDA | 13,576 | CC-BY-SA-3.0 (`LICENSE.txt`; GitHub reports NOASSERTION) | `doc/RELEASE_PROCESS.md`: content is counted by entity type for every release | "New game entities (core): 10293" and "Items: 2396" | The changelog tooling and jq scripts. |
| SRC4 | godotengine/godot-docs | https://github.com/godotengine/godot-docs | 5,936 | CC-BY-3.0 (`LICENSE.txt`; GitHub reports NOASSERTION) | `about/release_policy.rst`: every stage states what it receives; supported branches get fixes only | "Receives fixes for bugs and security issues, as well as patches that enable platform support." | The support matrix and the deprecation policy. |

## Software (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | kubernetes/community | https://github.com/kubernetes/community | 13,077 | Apache-2.0 | `contributors/devel/sig-release/release.md`: code freeze defined by what may merge; pruning drops unstable enhancements | "The period of ~4 weeks before the final release date, during which only critical bug fixes are merged into the release." | The labelling commands and the release-team rotation. |
| SRC6 | rust-lang/rust-forge | https://github.com/rust-lang/rust-forge | 576 | Apache-2.0 | `src/release/backporting.md`: after the branch forks, backports are for regressions | "Backports of PRs to the beta branch are usually only done to fix regressions." | The nomination labels and rollup mechanics. |
| SRC7 | llvm/llvm-project | https://github.com/llvm/llvm-project | 41,594 | Apache-2.0 with LLVM exceptions (GitHub reports NOASSERTION) | `llvm/docs/ReleaseProcess.md`: which bugs block a release is a judgement on severity and regression; a risky feature is disabled | "Not all bugs or regressions are show-stoppers and it's a bit of a grey area what should be fixed before the next candidate and what can wait until the next release." | The test-suite and benchmark scripts. |

## AI-agent (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | All-Hands-AI/OpenHands | https://github.com/All-Hands-AI/OpenHands | 94,324 | MIT | `.agents/skills/release.md`: an agent skill that prepares a release; the human marks the pull request ready, and that mark is the cut signal | "Marking the release PR **Ready for review** is the explicit cut-a-release signal" | release-please automation and the version surfaces. |
| SRC9 | block/goose | https://github.com/block/goose | 56,986 | Apache-2.0 | `RELEASE.md` and `RELEASE_CHECKLIST.md`: a release branch with a QA checklist; only fixes are cherry-picked after the branch | "Cherry-pick any last-minute fixes into the release branch if needed" | The weekly cadence and the signing steps. |

## Dead ends

| Repository | Stars | License | Why it was not used |
|---|---|---|---|
| git/git | 64,496 | GPL-2.0 (`COPYING`; GitHub reports NOASSERTION) | `Documentation/howto/maintain-git.adoc` says maintenance releases contain only bugfixes, but SRC6 states the same rule more sharply and git has no freeze record. |
| python/peps | 5,043 | none in the repository | PEP 101 names the first beta as the feature freeze, but without a license file the text cannot be cited safely. |
| MovingBlocks/Terasology | 3,912 | Apache-2.0 | `docs/Release-Omega.md` is a branch and CI guide; it never freezes features. |
| bevyengine/bevy | 50,000 | Apache-2.0 | The release notes live here, but the process page is in SRC2; citing both would double-count one source. |
| godotengine/godot-proposals | 1,464 | MIT | The proposal lifecycle, not a release freeze. |
| microsoft/vscode | 195,770 | MIT | The endgame process is documented in the wiki, not in the tree. |

## Finding

All nine agree on one shape: a freeze is a dated human signature over a closed list, not a quality review. SRC1 and SRC5 define what may still land; SRC2 and SRC5 say what leaves when time is short; SRC6 and SRC7 draw the line between a regression and a feature; SRC3 and SRC4 count what is already in the build; SRC8 and SRC9 show a record a later reader can open. G2.5 keeps four record parts, one fix/feature test, one trade, and no tenth point.
