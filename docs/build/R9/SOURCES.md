# R9 — Sources

Nine repositories, read on 2026-11-25. Stars were read with `gh api repos/<owner>/<repo> --jq .stargazers_count`; the unauthenticated REST endpoint returns HTTP 403 from this machine, so every count below came from the authenticated CLI. Quotes are verbatim from the files named, except where marked. Nothing here is copied into the rule: the rule borrows mechanisms, not sentences.

## Gamedev

### 1. OpenMW/OpenMW — 6,784 stars

- URL: https://github.com/OpenMW/OpenMW
- Artifact: `CONTRIBUTING.md`, feature-addition policy and the note on the `Future` label.
- Quote: "Unfortunately, since maintaining features comes at a cost and our resources are limited, we have to be a little selective in what features we allow into the main repository."
- Quote: "Issues that have the 'Future' label are usually out of the current scope of the project. Corresponding submissions are unlikely to be merged or even properly reviewed."
- Borrowed: maintenance named as a real cost, in the project's own policy voice, by a volunteer team — the strongest available evidence that R9 is not corporate overhead; and the idea that a proposal can be marked out of scope without being called wrong.
- Rejected: the consequence. "Unlikely to be merged or even properly reviewed" makes parking final in practice; R9 keeps the entry reviewable so a later gate can pay for it. Also rejected: the tracker label as a second place to look, when the backlog is the one place.

### 2. raysan5/raylib — 35,790 stars

- URL: https://github.com/raysan5/raylib
- Artifact: `ROADMAP.md` — a per-version list of planned work carrying `_DISCARDED_` entries with the reason attached.
- Quote: "Here is a wishlist with features and ideas to improve the library."
- Quote (one entry, emphasis and link in the original): "- Basic CPU/GPU stats system (memory, draws, time...) ([#1295](https://github.com/raysan5/raylib/issues/1295)) - _DISCARDED_"
- Quote (next entry, link in the original): "- Network module (UDP): `rnet` ([#753](https://github.com/raysan5/raylib/issues/753)) - _DISCARDED_ - Use [nbnet](https://github.com/nathhB/nbnet)."
- Borrowed: the cut list exists before the version ships, items are struck rather than deleted, and a cut sometimes names what replaces it — R9's cut list with the order decided in advance.
- Rejected: the word "wishlist" as the frame, and the linked open discussions as an intake channel. A wishlist invites additions; a budget makes them cost something. R9 keeps the list, changes what it is for.

### 3. godotengine/godot — 120,803 stars

- URL: https://github.com/godotengine/godot
- Artifact: `CONTRIBUTING.md`, "Proposing features or improvements" and "Contributing pull requests".
- Quote (bold in the original): "**The main issue tracker is for bug reports and does not accept feature proposals.**"
- Quote: "This functionality is desired, which means that it solves a common use case that several users will need in their real-life projects."
- Borrowed: a separate destination for ideas so the working queue stays clean — the structural version of "goes to BACKLOG, not the current stage"; and a willingness test that asks about use, not novelty.
- Rejected: the proposals repository as a second queue with its own voting and triage. For one developer, one backlog file is the whole mechanism; a second queue is the leak R9 closes.

### 4. OpenTTD/OpenTTD — 8,531 stars

- URL: https://github.com/OpenTTD/OpenTTD
- Artifact: `CONTRIBUTING.md`, "Feature requests" and "Project goals".
- Quote: "Before opening a feature request, please take a moment to find out whether your idea fits with the [scope and goals](./CONTRIBUTING.md#project-goals) of the project."
- Quote: "Although we really appreciate feedback and ideas, we will close feature requests that we don't expect to fulfill in the next year."
- Borrowed: scope is stated first and checked by the person proposing, not only by the maintainer; and the idea of a time horizon attached to a parked request, which is what makes "then it waits" honest rather than evasive.
- Rejected: closing the request. R9 parks and prices; the one-year question becomes "would a gate pay for this?", asked at the gate rather than at the door.

## Software

### 5. microsoft/TypeScript — 111,898 stars

- URL: https://github.com/microsoft/TypeScript
- Artifact: `CONTRIBUTING.md`, the milestone rule for issues and pull requests.
- Quote: "Issues without assigned Milestones are not accepting PRs; these PRs will be automatically closed."
- Borrowed: the milestone is the budget, and work outside it is not merged — an automatic, impersonal answer to "can I add this now?", which is exactly what a solo developer needs when the person asking is also the person deciding.
- Rejected: the issue-tracker machinery and the assumption of triage staff. R9 keeps the principle (outside the budget means not now) and drops the process.

### 6. kubernetes/community — 13,077 stars

- URL: https://github.com/kubernetes/community
- Artifact: `contributors/devel/sig-release/release.md`, release-cycle glossary.
- Quote (glossary entries; markdown links removed, ellipsis for the omitted term markup): "Enhancements Freeze ... the deadline by which KEPs have to be completed in order for enhancements to be part of the current release"
- Quote: "Exception Request ... The process of requesting an extension on the deadline for a particular Enhancement"
- Borrowed: the freeze is a named date with a definition, and exceptions are a visible, separate act rather than a quiet yes — the backbone of R9's G2.5 section and of "one in, one out".
- Rejected: exception review by a committee, and the four-week code freeze that follows. One developer cannot staff a review board; the trade (one out for one in, named in the decision) replaces it.

### 7. Homebrew/brew — 50,436 stars

- URL: https://github.com/Homebrew/brew
- Artifact: `docs/Package-Acceptance-Policy.md`.
- Quote: "Homebrew's official repositories accept software that the project can verify, maintain and support for a broad user base."
- Quote: "Software that does not meet the official criteria can generally be maintained in a third-party tap."
- Borrowed: acceptance judged by the maintainer's capacity to keep the thing working, and a place to keep what is not accepted — the closest software analogue of "parked, not rejected".
- Rejected: the tap as a place where the idea goes to die unread. R9's backlog is read at every gate and priced there; a parked idea without a review date is a deletion with extra steps.

## AI-agent

### 8. obra/superpowers — 326,370 stars

- URL: https://github.com/obra/superpowers
- Artifact: `skills/writing-plans/SKILL.md`, "Scope Check".
- Quote: "If the spec covers multiple independent subsystems, it should have been broken into sub-project specs during brainstorming."
- Quote: "Each plan should produce working, testable software on its own."
- Borrowed: the plan is sized by what one pass can finish, and an oversized plan is split before work starts rather than absorbed during it — the planning-level form of "over budget means cut or park".
- Rejected: splitting by subsystem instead of by budget. R9 does not care how many subsystems a feature touches; it cares what the stage can pay. Also rejected: the full TDD/YAGNI toolkit as a rule, which would duplicate the gates.

### 9. bmad-code-org/BMAD-METHOD — 55,731 stars

- URL: https://github.com/bmad-code-org/BMAD-METHOD
- Artifact: `docs/plan/break-work-into-stories-and-track-it.md` ("correct course" procedure).
- Quote: "She names the change and the ticket it lands on, reads that ticket, its memlog, its breakdown, and the finished children, and says whether what is required changed or only how it is delivered. When what is required changed, she updates the ticket's requirements first, keeping ids stable and naming the entries that went stale. Then she re-slices the affected epics, drops what no longer belongs, and records the reason as a dated `Decision:` line in each container's Notes."
- Borrowed: the distinction between a change in requirement and a change in delivery (only the first touches scope), the re-slice instead of the append, and the dated reason left where the dropped work used to be.
- Rejected: the ticket tree, the memlog, and the persona. The mechanism survives in one sentence — a cut is recorded with a date and a reason; the scaffolding does not.

## Dead ends

Kept because a failed search is evidence about what does not exist.

| Target | Result |
|---|---|
| `basecamp/shape_up` | 404. There is no Shape Up repository; `basecamp/handbook` (6,667 stars) mentions the book but carries no appetite or budget text. The canonical "fixed time, variable scope" statement is in the book, not in a fetchable artifact — not cited. |
| BMAD `bmad-correct-course`, `bmad-sprint-planning` | Listed as retired in `skills/method/bmod-method/retired.toml`. The current method moved correct-course into the plan document used above; citing the removed skill would have pointed at nothing. |
| Homebrew raw file on `master` | 404; the default branch is `main`. Counts and quotes were read from `main`. |
| Godot release policy, `docs.godotengine.org/en/stable|latest/contributing/development/release_policy.html` | 404 on both channels; `godotengine/godot-docs` `contributing/` contents 404 as well. Godot's freeze evidence came from `CONTRIBUTING.md` instead. |
| `langchain-ai/langchain`, `libs/community/README.md` | 404; `libs/` has no `community` directory. The dependency-scope material was not retrieved. |
| `llvm/llvm-project` `docs/DeveloperPolicy.rst` | 404; the file is now `DeveloperPolicy.md`. A usable "features close to release should be easy to disable" line was seen but the source was not re-read after the move, so it is not used. |
| `OpenRCT2/OpenRCT2` `develop/contributing.md` | 404; its `CONTRIBUTING.md` has no scope or freeze content. |
| Wesnoth `doc/design` | Contains only gui2 LaTeX documentation; no scope policy. |
| `microsoft/autogen` `CONTRIBUTING.md` | Points at roadmap milestones without defining scope; too thin to borrow. |
| Unauthenticated `curl https://api.github.com/...` | HTTP 403 from this machine; all star counts came through the authenticated `gh` CLI. |
