# SOURCES — G1

Nine repositories read on 2026-11-25. Stars are the GitHub API values on that
date (authenticated `gh api repos/<owner>/<repo>`). Licenses are the API
`license.spdx_id` values unless noted. Quotes are verbatim from the artifact
named; line wrapping inside a quote is joined. Nothing below is copied into
`G1-fun.md` as prose: the gate is a synthesis, and each entry says what was
borrowed and what was rejected, because a source that only agrees teaches
nothing.

## Gamedev (4)

### 1. Anuken/Mindustry — 29,972 stars

- **URL:** https://github.com/Anuken/Mindustry
- **License:** GPL-3.0
- **Artifact:** `CONTRIBUTING.md`, https://github.com/Anuken/Mindustry/blob/master/CONTRIBUTING.md
- **Quote:** "Do not submit something without at least running the game to see if it compiles."
- **Analogous to:** G1's rule that a claim about the loop comes after the build ran.
- **Borrowed:** the change is judged after the game is launched, not after the diff is read.
- **Rejected:** compiling or launching proves that code runs, not that a loop is fun. There is no human session, no observation, and no verdict — the gate would pass a build nobody played.

### 2. VCMI/vcmi — 6,044 stars

- **URL:** https://github.com/VCMI/vcmi
- **License:** GPL-2.0
- **Artifact:** `CONTRIBUTING.md` on `develop`, https://github.com/VCMI/vcmi/blob/develop/CONTRIBUTING.md
- **Quote:** "A bug is a *demonstrable problem* caused by VCMI itself, not by a specific mod or by modified game assets."
- **Analogous to:** G1's requirement that an observation be demonstrable in the build, not asserted.
- **Borrowed:** "demonstrable" is the bar: the note must point at something a second person can see in the same build.
- **Rejected:** reproduction proves a defect and its owner, not a feeling about the loop. VCMI judges reports, not play sessions, and has no dated keep/kill line.

### 3. godotengine/godot-proposals — 1,464 stars

- **URL:** https://github.com/godotengine/godot-proposals
- **License:** MIT
- **Artifact:** `README.md`, section "How we evaluate proposals", https://github.com/godotengine/godot-proposals/blob/master/README.md
- **Quote:** "The following is a list of considerations that Godot maintainers use when deciding to accept, close, or leave a proposal open."
- **Analogous to:** G1's fixed set of outcomes: keep, kill, retune, extend once.
- **Borrowed:** a proposal ends in one of a small closed set of outcomes, and closing is a normal outcome, not a failure of the process.
- **Rejected:** maintainers read and discuss; there is no build, no human play, and no dated line per outcome. The gate would become a debate club.
- **Note:** the smallest source in this set. Kept because it is the only one that names closing as a first-class outcome.

### 4. CleverRaven/Cataclysm-DDA — 13,576 stars

- **URL:** https://github.com/CleverRaven/Cataclysm-DDA
- **License:** API reports `NOASSERTION`; `LICENSE.txt` states CC-BY-SA-3.0.
- **Artifact:** `doc/TESTING_YOUR_CHANGES.md`, https://github.com/CleverRaven/Cataclysm-DDA/blob/master/doc/TESTING_YOUR_CHANGES.md
- **Quote:** "Our tests will already cover a good amount of things that could go wrong, but you are expected to test your non-trivial changes in-game."
- **Analogous to:** G1's separation of automated checks from a human in the running game.
- **Borrowed:** a green suite is not a substitute for playing the change; the game is the instrument.
- **Rejected:** "expected" names no observer, no duration, and no verdict, and the target is function, not fun. A contributor can satisfy it alone and report nothing.

## Software (3)

### 5. rust-lang/rfcs — 6,643 stars

- **URL:** https://github.com/rust-lang/rfcs
- **License:** Apache-2.0
- **Artifact:** `README.md`, final-comment-period section, https://github.com/rust-lang/rfcs/blob/master/README.md
- **Quote:** "along with a *disposition* for the RFC (merge, close, or postpone)"
- **Analogous to:** G1's decision line choosing one of four named outcomes.
- **Borrowed:** divergence ends in a disposition picked from a fixed list, recorded after a bounded period.
- **Rejected:** the disposition follows reader consensus, not a player's experience; "postpone" is open-ended, while G1 allows exactly one extension and then forces keep or kill.

### 6. joelparkerhenderson/architecture-decision-record — 17,521 stars

- **URL:** https://github.com/joelparkerhenderson/architecture-decision-record
- **License:** API reports `NOASSERTION`; `LICENSE.md` states CC-BY-NC-SA-4.0.
- **Artifact:** `decision-record-template-by-michael-nygard.md`, https://github.com/joelparkerhenderson/architecture-decision-record/blob/main/architecture-decision-record.github.io/src/content/locales/en-001/templates/decision-record-template-by-michael-nygard.md
- **Quote:** "What is the status, such as proposed, accepted, rejected, deprecated, superseded, etc.?"
- **Analogous to:** G1 recording the decision as a status plus a date, with kill as a legitimate status.
- **Borrowed:** a decision has a status field, and "rejected" sits beside "accepted" as a normal value.
- **Rejected:** the template records the decision but not the evidence or the session behind it. Status alone cannot tell a played gate from an argued one.

### 7. kubernetes/enhancements — 3,991 stars

- **URL:** https://github.com/kubernetes/enhancements
- **License:** Apache-2.0
- **Artifact:** `keps/NNNN-kep-template/README.md`, https://github.com/kubernetes/enhancements/blob/master/keps/NNNN-kep-template/README.md
- **Quote:** "For Beta and GA, document that tests have been written, have been executed regularly, and have been stable."
- **Analogous to:** G1's input requirement that success criteria exist before the build is judged.
- **Borrowed:** the promotion criteria are written into the document before promotion, so the bar cannot move after the result.
- **Rejected:** the criteria are e2e and API tests; they measure infrastructure stability, never a human's experience, and a KEP can graduate with no one playing it.

## AI-agent workflow (2)

### 8. SWE-bench/SWE-bench — 6,247 stars

- **URL:** https://github.com/SWE-bench/SWE-bench
- **License:** MIT
- **Artifact:** `README.md`, https://github.com/SWE-bench/SWE-bench/blob/main/README.md
- **Quote:** "SWE-bench uses Docker for reproducible evaluations."
- **Analogous to:** G1's requirement that the verdict cites a build and a capture rather than a claim.
- **Borrowed:** the score exists only because a harness executed the patch and wrote logs; the model's assertion is not the result.
- **Rejected:** an automated test measures correctness against a fixed test set. It cannot tell a boring loop from a good one, and a pass is not a playtest.

### 9. microsoft/autogen — 61,966 stars

- **URL:** https://github.com/microsoft/autogen
- **License:** API reports `CC-BY-4.0` for the repository (documentation); the cited code file is under `LICENSE-CODE`, MIT.
- **Artifact:** `dotnet/src/Microsoft.AutoGen/AgentChat/Terminations/MaxMessageTermination.cs`, https://github.com/microsoft/autogen/blob/main/dotnet/src/Microsoft.AutoGen/AgentChat/Terminations/MaxMessageTermination.cs
- **Quote:** "/// Terminate the conversation after a maximum number of messages have been exchanged."
- **Analogous to:** G1's stop rule: the gate cannot run forever and cannot add a second extension.
- **Borrowed:** an autonomous exchange opens with an explicit, pre-set stop condition, so the end is decided before the run, not during it.
- **Rejected:** a message counter is not a judgement; it stops the loop without saying whether the loop is worth continuing. G1's stop is one dated extension followed by keep or kill.

## Considered, not counted

| Repository | Stars | Why not |
|---|---:|---|
| OpenRA/OpenRA | 17,834 | R8 already cites its `Branches-and-Releases`; its `Playtest or Release Checklist` is release mechanics, with no fun judgement. Reuse would repeat an artifact, not add evidence. |
| OpenTTD/OpenTTD | 8,531 | `CONTRIBUTING.md` covers issue reports and CI; no playtest gate. |
| luanti-org/luanti | 13,891 | No human playtest artifact found in the repository tree. |
| FreeOrion/freeorion | 1,067 | No playtest gate found in CONTRIBUTING or the issue templates. |
| Beyond-All-Reason/Beyond-All-Reason | 4,367 | Staging branch then merge when ready: integration, not fun. |
| ZeroK-RTS/Zero-K | 888 | No playtest decision found in CONTRIBUTING. |
| All-Hands-AI/OpenHands | 94,324 | No critic or human-judgement artifact found in one pass. |
| tc39/proposals | 19,204 | README only links to the process; too indirect to cite as an artifact. |
| Terasology/Terasology | — | 404 on 2026-11-25. |
| basecamp/shapeup | — | 404 on 2026-11-25. |

All stars above were read on 2026-11-25 and are listed only to explain the
rejection; they are not part of the counted nine.

## Dead ends encountered

- GitHub code search was unavailable in this environment (R8 recorded HTTP 500), so repositories were searched by file tree and by fetching named documents.
- `CleverRaven/Cataclysm-DDA` `doc/RELEASE_PROCESS.md` is a changelog recipe with entity counts, not a playtest process; `TESTING_YOUR_CHANGES.md` was used instead.
- `OpenTTD/OpenTTD`, `luanti-org/luanti`, `FreeOrion/freeorion`, `Beyond-All-Reason/Beyond-All-Reason`, and `ZeroK-RTS/Zero-K` were opened and dropped: none records a human playtest with a verdict.
- The OpenRA wiki `Playtest or Release Checklist` was read and dropped: it tags and announces builds, but never asks anyone to judge the loop.
- `godotengine/godot-proposals` is the weakest source on popularity (1,464 stars). It stays because the accept/close/leave-open mapping is the closest analogue to G1's outcome set.
