# A01 partner — sources

Method: stars read on 2026-11-25 from each repository's page payload (`stargazerCount`); the unauthenticated REST API answered 403 rate-limit from this IP, so the page payload and `raw.githubusercontent.com` were used instead. Quotes are verbatim; markdown emphasis and link syntax are stripped and wrapped lines joined. No file was copied, adapted, or vendored. What was taken is the process idea only, restated in this project's own words and IDs.

Split: 4 gamedev, 3 software, 2 AI-agent.

| # | Repository | Stars | License | Artifact read |
|---|---|---|---|---|
| G1 | bevyengine/bevy | 49,998 | MIT OR Apache-2.0 | `.github/pull_request_template.md` |
| G2 | godotengine/godot-proposals | 1,464 | MIT (org default, LICENSE not read) | `README.md` |
| G3 | CleverRaven/Cataclysm-DDA | 13,576 | CC-BY-SA-3.0 | `doc/FREQUENTLY_MADE_SUGGESTIONS.md` |
| G4 | OpenTTD/OpenTTD | 8,531 | GPL-2.0 | `docs/releasing_openttd.md` |
| S1 | kubernetes/community | 13,077 | Apache-2.0 (not re-read) | `contributors/guide/owners.md` |
| S2 | rust-lang/rfcs | 6,643 | MIT OR Apache-2.0 | `0000-template.md` |
| S3 | systemd/systemd | 17,063 | LGPL-2.1-or-later | `man/systemd.service.xml` |
| A1 | langchain-ai/langgraph | 45,410 | MIT | `README.md` |
| A2 | crewAIInc/crewAI | 61,254 | MIT | `README.md` |

## Gamedev

### G1 bevyengine/bevy — https://github.com/bevyengine/bevy
Artifact: `.github/pull_request_template.md`, read 2026-11-25.

> Describe the objective or issue this PR addresses.
>
> How can other people (reviewers) test your changes? Is there anything specific they need to know?

Borrowed: the report shape — objective, solution, how it was verified by someone else. A01's `## Report` and the evidence line in `Claims` (R1) follow that order.
Rejected: Rust/ECS specifics, the Showcase and AI Disclosure sections — no project equivalent, and a disclosure section would duplicate R1 evidence.
License: MIT OR Apache-2.0. Idea only.

### G2 godotengine/godot-proposals — https://github.com/godotengine/godot-proposals
Artifact: `README.md`, read 2026-11-25.

> Search existing proposals and ideas for potential duplicates.
>
> You are not allowed to use AI / an LLM to write your proposal.

The README adds that AI-written proposals are hard to read and "often invent facts and solutions that won't work".

Borrowed: a repeated question is a defect, not diligence — R2 already says so, and A01's `Questions` line makes the agent read STATE and DECISIONS before asking. The anti-fabrication stance is why `Autonomy` ends with "escalate instead of guessing".
Rejected: issue-template bureaucracy and the separate discussion channels — a solo project has one backlog.
License: MIT (Godot organisation default; the repo LICENSE was not read in this pass). Idea only.

### G3 CleverRaven/Cataclysm-DDA — https://github.com/CleverRaven/Cataclysm-DDA
Artifact: `doc/FREQUENTLY_MADE_SUGGESTIONS.md`, read 2026-11-25.

> This is a list of frequently made suggestions, and the current stance on how viable they are.

Borrowed: a standing answer with a stance, so the same question is decided once and never re-argued — that is DECISIONS.md and the BACKLOG cost field (R9), and the reason A01 may not repeat a question.
Rejected: the seven-category taxonomy (already implemented / in progress / mod-only / not reasonable …) and the game-specific list. The taxonomy is a second vocabulary on top of BACKLOG states; "one fact in one place".
License: CC-BY-SA-3.0. Idea only, no text reused.

### G4 OpenTTD/OpenTTD — https://github.com/OpenTTD/OpenTTD
Artifact: `docs/releasing_openttd.md`, read 2026-11-25.

> This guide is for OpenTTD developers/maintainers, to release a new version of OpenTTD.
>
> If this is an RC1 (first Release Candidate) build, create a new branch `release/nn` where `nn` is the major version number
>
> Update the version in `CMakeLists.txt` in the master branch, heading for the next major release, e.g. from 14.0 to 15.0.

Borrowed: a release is a numbered procedure with one freeze point, written down before it is needed and dated when it happens — the shape of A01's gate line (G2.5 freeze, G3 ship) and of the one-line decision with a date.
Rejected: the CMake, regression and API bookkeeping steps — engine and pipeline specifics that belong to E-parts, not to the partner.
License: GPL-2.0. Idea only; no code or text derived.

## Software

### S1 kubernetes/community — https://github.com/kubernetes/community
Artifact: `contributors/guide/owners.md`, read 2026-11-25.

> OWNERS files are used to designate responsibility over different parts of the Kubernetes codebase.

Borrowed: responsibility is assigned by area and role, and the author never approves their own work. A01's `Route` and `Gates` lines split the same way: A02 designs, A03 codes, A04 reviews blind, the human decides a gate, the partner only records it.
Rejected: the two-phase bot review (`/lgtm` plus approver) and the membership ladder — machinery for hundreds of contributors; the blueprint forbids PASS/CONCERNS/FAIL paperwork.
License: Apache-2.0 (not re-read in this pass). Idea only.

### S2 rust-lang/rfcs — https://github.com/rust-lang/rfcs
Artifact: `0000-template.md`, read 2026-11-25.

> - Start Date: (fill me in with today's date, YYYY-MM-DD)
>
> Why should we *not* do this?
>
> ## Rationale and alternatives

Borrowed: a decision carries a date, the case against itself and the alternatives it beat. DECISIONS.md inherits the date and the alternatives; the gate line inherits the date.
Rejected: the RFC lifecycle (merge, final comment period, tracking issue) and the long prose template — the blueprint caps a gate decision at one line.
License: MIT OR Apache-2.0. Idea only.

### S3 systemd/systemd — https://github.com/systemd/systemd
Artifact: `man/systemd.service.xml`, read 2026-11-25 (the `RuntimeMaxSec=` entry).

> Configures a maximum time for the service to run. If this is used and the service has been active for longer than the specified time it is terminated and put into a failure state.

Borrowed: a budget and a stop condition are declared before the run and enforced by the harness, not by self-restraint, and what the operator reads afterwards is the log — A01's `Autonomy` line (budgets before unattended work, checkpoints into `runs/AUTONOMY.jsonl`, stop instead of guessing) and R10.
Rejected: unit-file grammar and watchdog mechanics — nothing to configure in a Markdown agent.
License: LGPL-2.1-or-later. Idea only; no configuration or text reused.

## AI-agent

### A1 langchain-ai/langgraph — https://github.com/langchain-ai/langgraph
Artifact: `README.md`, read 2026-11-25.

> Durable execution — Build agents that persist through failures and can run for extended periods, automatically resuming from exactly where they left off.
>
> Human-in-the-loop — Seamlessly incorporate human oversight by inspecting and modifying agent state at any point during execution.

Borrowed: the state file, not the conversation, is what a run resumes from, and a human inspects and edits it at defined points. That is A01's "STATE.md is the truth; the chat is not" and the checkpoint before an unattended run continues.
Rejected: the graph runtime, checkpoint backends and persistence plumbing — this is a set of agent instructions, not an application.
License: MIT. Idea only.

### A2 crewAIInc/crewAI — https://github.com/crewAIInc/crewAI
Artifact: `README.md`, read 2026-11-25.

> CrewAI Crews: Optimize for autonomy and collaborative intelligence with role-based AI agents.
>
> It gives developers autonomous agent collaboration through Crews and precise, event-driven control through Flows.

Borrowed: named roles with a narrow remit, assembled for one task — C01–C03 and A01's refusal to hold a standing council: a crew forms for one task and disbands.
Rejected: autonomy as the default, hierarchical manager delegation and a persistent crew. The blueprint lists a permanent multi-agent council as a non-goal, and R4 forbids publishing from an autonomous run.
License: MIT. Idea only.

## Dead ends

- bevy `docs/release_checklist.md` — 404 on `main`; the surviving `_release-content/README.md` is a website-publishing procedure, not a gate. Lesson: bevy publishes the pre-merge form, not a release gate, so its PR template was used instead.
- Veloren `CONTRIBUTING.md` (607 bytes) — only bans LLM-generated or tainted submissions. No production, dialogue or gate artifact; rejected.
- `godotengine/godot` `CONTRIBUTING.md` — its "Proposing features or improvements" section says the tracker does not accept feature proposals and points at godot-proposals. Same lesson, same organisation; dropped to keep four distinct gamedev repositories.
- kubernetes/community `contributors/guide/pull-requests.md` (42,654 bytes) — bot-centric (`/lgtm`, labels, tide). Real, but far too heavy for one developer; the OWNERS file carried the usable idea.
- Cataclysm-DDA `doc/RELEASE_PROCESS.md` — changelog statistics (diffstat, author counts), not a decision gate; rejected.
- `openai/openai-agents-python` (30,870) — handoffs are a code primitive with no state or dialogue artifact to learn a shape from; rejected in favour of langgraph and crewAI.

## Copying

Nothing was copied. No code, text, template line or configuration from these repositories appears in `partner.md`; every borrowed item above is a procedure restated with this project's own IDs (G0–G3, R1–R10, A01–A04, S01, D02–D10). GPL-2.0, LGPL-2.1 and CC-BY-SA-3.0 sources (G3, G4, S3) contributed ideas only, so no derivative content exists to license.
