# E06 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts and
last-push dates were read on 2026-11-25 from the GitHub API and its `ungh.cc`
mirror. No code, policy text, or template was copied; the borrowed items are
structural ideas. Quotes are verbatim from files fetched that day; where a quote
could not be captured, the entry says so.

## Gamedev (4)

### 1. OpenTTD
- URL: https://github.com/OpenTTD/OpenTTD
- Stars: ~8.5k. GPL-2.0 per the project; GitHub reports NOASSERTION because of
  bundled third-party licenses. Active (pushed 2026-11-25).
- Artifact: `CONTRIBUTING.md`, a `Feature requests` section with a strict policy
  and a `Project goals` anchor. It asks the requester to make a strong case,
  closes requests not expected within a year, says "please do ask first" before
  a significant PR, and states: "Every pull request should have a clear scope,
  with no unrelated commits."
- Analogous: an idea must argue its value against written scope before anyone
  builds it, and a patch is judged by its scope line.
- Quote: "Every pull request should have a clear scope, with no unrelated
  commits."
- Borrowed: the value-argument requirement and the one-line scope sentence; the
  backlog line in E06 is the small form of "make a strong case".
- Rejected: the PR review process and the one-year horizon.

### 2. Endless Sky
- URL: https://github.com/endless-sky/endless-sky
- Stars: ~7.8k. GPL-3.0. Active (pushed 2026-11-23).
- Artifact: `docs/CONTRIBUTING.md`. A feature request must pass a
  fun-within-scope test; major changes start as an issue or discussion; a
  new-feature PR opened during a stable release cycle is unlikely to merge until
  that cycle ends.
- Analogous: E06's prompt uses the exact argument the project's policy already
  answers — "more fun" is not a scope argument.
- Quote: "If requesting a new feature, first ask yourself: will this make the
  game more fun or interesting within the existing scope of the game?"
- Borrowed: the rebuttal to "more fun" and the release-window rule, which is the
  freeze in miniature.
- Rejected: the content-review pipeline and the wiki workflow.

### 3. Cataclysm: Dark Days Ahead
- URL: https://github.com/CleverRaven/Cataclysm-DDA
- Stars: ~13.6k. License stated in the repository's own licensing files; GitHub
  reports Other. Nothing is reused here. Active (pushed 2026-11-24).
- Artifact: `doc/RELEASE_PROCESS.md`. A release is cut from a named branch
  (`0.G-branch`, `0.H`) and the changelog is generated per tag from
  `git log ... <version tag>...`.
- Analogous: release mode is a branch with its own rules, not a date on a
  calendar; G2.5 is the same shape — a recorded mode the agent must read.
- Quote: "Check out the previous release branch (i.e. when I'm writing this it's
  0.G-branch)."
- Borrowed: "mode, not date" — the fixture's freeze is a signed record in
  `STATE.md`, not a deadline the agent can guess.
- Rejected: the changelog tooling and the JSON entity counts.

### 4. The Battle for Wesnoth
- URL: https://github.com/wesnoth/wesnoth
- Stars: ~7.0k. GPL-2.0 (verified in `COPYING`). Active (pushed 2026-11-23).
- Artifact: long-lived stable branches (`1.18.x`) that take maintenance while
  `master` moves; the project's release cycle is known for feature and string
  freezes before a release. No quote was captured — the policy lives on the
  project wiki, which was not fetched in this run. This is the entry's gap.
- Analogous: a freeze is a window with a different rule set, and it can be
  partial: E06 freezes features, not fixes.
- Borrowed: the freeze window as a mode, and the idea that a freeze is scoped.
- Rejected: the C++/WML tree and the wiki workflow.

## Software development (3)

### 5. Kubernetes enhancements
- URL: https://github.com/kubernetes/enhancements
- Stars: ~4.0k. Apache-2.0. Active (pushed 2026-11-20).
- Artifact: README, "Enhancement Tracking and Backlog": an enhancement may be
  filed only after SIG consensus, and each release has an enhancements freeze
  with a documented exceptions process.
- Analogous: the idea keeps its value as a tracked backlog item while the
  current release is closed; the exception is a trade, not a bypass.
- Quote: "an enhancement can be tracked as backlog items before work begins".
- Borrowed: backlog-before-work, and the freeze-with-exceptions shape that E06
  turns into one-in-one-out.
- Rejected: KEP stages, labels, and the SIG process.

### 6. github/spec-kit
- URL: https://github.com/github/spec-kit
- Stars: ~151k. MIT. Active (pushed 2026-11-24).
- Artifact: spec-driven development commands — specify, then plan, then tasks,
  with a constitution checked before implementation.
- Analogous: a change exists as a written artifact before code; E06's backlog
  line is the smallest such artifact.
- Quote (repository description): "Toolkit to help you get started with SDD or
  any other process!"
- Borrowed: the order — artifact first, code later.
- Rejected: the templates, scripts, and agent integrations.

### 7. rust-lang/rfcs
- URL: https://github.com/rust-lang/rfcs
- Stars: ~6.6k. MIT OR Apache-2.0 (both license files present). Active (pushed
  2026-11-14).
- Artifact: the RFC repository. A proposal is written and accepted before
  implementation; an accepted RFC is not a scheduled feature, and many accepted
  RFCs are never implemented.
- Analogous: the backlog is a queue of proposals, not a to-do list; writing an
  idea down is a terminal state until someone pays for it.
- Quote: none captured this run; the entry describes the repository's purpose
  and does not quote it.
- Borrowed: "park, do not implement" as a legitimate end state for an idea.
- Rejected: the RFC template and the review process.

## AI-agent workflow (2)

### 8. Cline
- URL: https://github.com/cline/cline
- Stars: ~71.9k. Apache-2.0. Active (pushed 2026-11-23).
- Artifact: Plan/Act modes. In Plan mode the agent reads and proposes but does
  not write files; Act is a separate, approved step.
- Analogous: "no edit before approval" is enforced by the mode, not by the
  prompt — the same separation E06 expects.
- Quote (repository description): "Autonomous coding agent as an SDK, IDE
  extension, or CLI assistant."
- Borrowed: the two-mode split as the shape of the run — read, park, ask, act.
- Rejected: the extension, tool protocol, and model routing.

### 9. OpenSpec
- URL: https://github.com/Fission-AI/OpenSpec
- Stars: ~75.7k. MIT. Active (pushed 2026-11-25).
- Artifact: one change proposal per change (`proposal.md`, `tasks.md`), reviewed
  before implementation and archived into the specs when done; the agent works
  inside an approved change.
- Analogous: the idea exists as a file with a status before any code; a chat
  request is not permission to build.
- Quote (repository description): "Spec-driven development (SDD) for AI coding
  assistants."
- Borrowed: idea as a file with a status, and "archive, do not delete" — a
  parked idea keeps its value.
- Rejected: the CLI, the directory schema, and the slash commands.

## Considered and rejected

- Shape Up / Basecamp — no official repository: `basecamp/shape-up` and
  `basecamp/shapeup` both return 404, and GitHub search returns only forks and
  translations, the largest at 41 stars. Dropped rather than cite a fork; the
  appetite idea reached E06 through R9's cost line.
- 0 A.D. — GitHub mirror archived (~2.8k stars), moved to Gitea, feature-freeze
  checklist on the old trac wiki. Dropped.
- Plandex (~15.9k, MIT) — plan-first agent, but last push 2025-10-03, too stale
  for a 2026 list.
- OpenRCT2, Widelands, SuperTuxKart — `CONTRIBUTING.md` fetched; no scope,
  backlog, or freeze text, so dropped rather than stretch a quote.
- Terminal-Bench, SWE-bench, openai/evals — already cited by E02 and E03; not
  reused.

## License note

Only structural ideas were taken: value-before-build, backlog-before-work,
freeze windows, proposal gates, and plan/act separation. No source code, policy
text, or template was copied. OpenTTD is GPL-2.0, Endless Sky GPL-3.0,
Cataclysm-DDA's license is repository-stated, Wesnoth GPL-2.0,
kubernetes/enhancements Apache-2.0, spec-kit MIT, rust-lang/rfcs MIT OR
Apache-2.0, Cline Apache-2.0, OpenSpec MIT — none of these licenses attach to
this eval.
