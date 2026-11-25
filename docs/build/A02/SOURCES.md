# A02 - Sources

Nine repositories: four gamedev, three software, two AI-agent. Stars were read
on 2026-11-25 with `gh api repos/<owner>/<repo> --jq .stargazers_count`. Quotes
are verbatim and short; nothing is copied - no code, no license text, no
paragraph. Each entry names what was borrowed into the designer agent and what
was rejected.

## Gamedev (4)

### 1. CleverRaven/Cataclysm-DDA - 13,576 stars

URL: https://github.com/CleverRaven/Cataclysm-DDA
Artifact: `doc/design-balance-lore/design-doc.md`, an internal design index with
per-topic balance and lore docs, plus `doc/TESTING_YOUR_CHANGES.md`.
Quote: "This is the Cataclysm: DDA design document. It is meant for
designer-end planning and goal unity for an open ended project. It is not meant
to be a user facing document!"
Analogous to: GAME.md/TASTE.md and docs/systems/ - designer intent, not player
copy.
Borrowed: designer-facing intent kept apart from player-facing text; balance
notes sitting beside system notes; a testing guide that makes a change visible
in a running build.
Rejected: the wiki-scale index and dozens of topic pages. A02 writes one page
per system.

### 2. bevyengine/rfcs - 116 stars

URL: https://github.com/bevyengine/rfcs
Artifact: `template.md`, the RFC template for engine changes.
Quote: "Explain the proposal as if it was already included in the engine and you
were teaching it to another Bevy user." Also: "Corner cases are dissected by
example."
Analogous to: the system card's player fantasy and edge-case sections.
Borrowed: describe behavior as already shipped, never in future tense; corner
cases by example; drawbacks and alternatives before convergence.
Rejected: the implementation-strategy section - that belongs to A03.

### 3. munificent/game-programming-patterns - 4,583 stars

URL: https://github.com/munificent/game-programming-patterns
Artifact: `book/game-loop.markdown` and the pattern chapters, each opening with
Intent, then Motivation.
Quote: "Decouple the progression of game time from user input and processor
speed." (the Intent line of the game-loop chapter)
Analogous to: one intent line, then the loop, then details.
Borrowed: every mechanic states one intent and a motivation before rules; the
loop is named as a loop.
Rejected: code-level patterns. A02 specifies behavior and feedback, not
implementation.

### 4. godotengine/godot-proposals - 1,464 stars

URL: https://github.com/godotengine/godot-proposals
Artifact: `.github/ISSUE_TEMPLATE/feature_proposal.yml`, the proposal form.
Quote: "Propose an improvement with a high level of detail."
Analogous to: the check before a card is written.
Borrowed: problem before solution; search existing proposals for duplicates,
which matches R2's rule that a repeated question is a bug; state what the
problem costs the player.
Rejected: the public issue tracker as the design store. v0.3 keeps cards in
docs/systems/.

## Software (3)

### 5. rust-lang/rfcs - 6,643 stars

URL: https://github.com/rust-lang/rfcs
Artifact: `0000-template.md`. Sections: Summary, Motivation, Guide-level
explanation, Reference-level explanation, Drawbacks, Rationale and
alternatives, Prior art, Unresolved questions, Future possibilities.
Quote: "Explain the proposal as if it was already included in the language and
you were teaching it to another Rust programmer."
Analogous to: the system card, read by someone who has not seen the design.
Borrowed: a guide-level explanation before internals; named sections for
alternatives and unresolved questions; the card is written as if built.
Rejected: the long-form rationale and review process. The card is one page.

### 6. python/peps - 5,043 stars

URL: https://github.com/python/peps
Artifact: `peps/pep-0001.rst` (purpose and guidelines) and `peps/pep-0012.rst`
(the template).
Quote: "A PEP is a design document providing information to the Python
community, or describing a new feature for Python or its processes or
environment. The PEP should provide a concise technical specification of the
feature and a rationale for the feature."
Analogous to: DECISIONS.md plus a system card - a decision with its rationale,
kept in a versioned file.
Borrowed: every design claim carries a rationale; the file history is the
record of decisions.
Rejected: the "technical specification" core - A02 writes behavior and data
keys, not an API.

### 7. kubernetes/enhancements - 3,991 stars

URL: https://github.com/kubernetes/enhancements
Artifact: `keps/NNNN-kep-template/README.md`, a KEP template with a Test Plan
section and separate unit and integration test prompts.
Quote: "The goal is to ensure that we don't accept enhancements with inadequate
testing."
Analogous to: the acceptance and test plan in a system card.
Borrowed: no design is accepted without named tests; unit tests listed apart
from integration tests.
Rejected: the graduation stages and SIG process. v0.3 uses G1 and G2.

## AI-agent workflow (2)

### 8. anthropics/skills - 200,348 stars

URL: https://github.com/anthropics/skills
Artifact: `README.md` and `skills/` - folders of instructions loaded on demand,
each with a description that says when it applies.
Quote: "Skills are folders of instructions, scripts, and resources that Claude
loads dynamically to improve performance on specialized tasks."
Analogous to: the agent `description` field and progressive loading.
Borrowed: one line that says when this part applies, with the body loaded only
when it does.
Rejected: bundling scripts and resources. A02 writes no code.

### 9. humanlayer/humanlayer - 12,957 stars

URL: https://github.com/humanlayer/humanlayer
Artifact: `README.md` - a human-in-the-loop control plane for coding agents.
Quote: "HumanLayer runs coding agents (Claude Code, Codex, OpenCode, Pi) on your
machines and lets your team steer them from one place: tasks, sessions, plans,
and reviews"
Analogous to: the approval step and the question budget before handoff.
Borrowed: a human review point between agent work and the next step; plans
reviewed before execution.
Rejected: the multi-app infrastructure and async queue. One message with at most
three questions is enough.

## Considered, not counted

| Repository | Stars | Why it is not one of the nine |
|---|---|---|
| bevyengine/bevy | 49,998 | Engine repo; its RFCs live in bevyengine/rfcs, which is counted instead. |
| OpenRA/OpenRA | 17,834 | No design-doc artifact in the repo; code and issues only. |
| Veloren/Veloren | 7,717 | CONTRIBUTING and CHANGELOG only; no system card. |
| kubernetes/community | 13,077 | The KEP template moved to kubernetes/enhancements, which is counted. |
| joelparkerhenderson/architecture-decision-record | 17,521 | ADR templates exist, but the README is a generated site index; no small artifact to quote. |

## Dead ends encountered

- `doc/JSON_INFO.md` in Cataclysm-DDA returned 404 on master; data docs moved
  under `doc/JSON/`, and a data-key reference table is not a design card.
- The Godot proposal template is a GitHub issue form in YAML; its fields cannot
  be lifted as markdown, only the labels.
- The KEP template is over 10,000 characters and mostly process; only the test
  plan was usable.
- The Cataclysm `doc/` tree holds 20+ files; reading it for one card took longer
  than the card itself, which is why A02 gets one page.
