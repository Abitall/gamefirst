# E07 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts were
read from the GitHub repository pages on 2026-11-25 and are approximate. No code
was copied; the borrowed items are structural ideas, and the quotes are short
citations for provenance.

## Gamedev (4)

### 1. Donchitos/Claude-Code-Game-Studios
- URL: https://github.com/Donchitos/Claude-Code-Game-Studios
- Stars: 40,892. License: MIT.
- Artifact: `.claude/skills/retrospective/SKILL.md` — a retrospective protocol
  that refuses to assess a section when its input is missing.
- Quote: "Absence of evidence is never evidence of absence." Also: "If any input
  required for a section is ABSENT, that section is NOT ASSESSED - NO DATA."
- Analogous: a missing second project must produce a labeled gap, not a filled-in
  claim.
- Borrowed: absence is a valid result; the eval rewards naming it.
- Rejected: sprint velocity tables and the full retrospective template.

### 2. godotengine/godot-proposals
- URL: https://github.com/godotengine/godot-proposals
- Stars: 1,464. License: MIT.
- Artifact: proposal README and review flow; weak proposals are closed, and
  authors are asked to search for duplicates first.
- Quote: "If you do not provide a well-founded motivation, your proposal will be
  closed."
- Analogous: a lesson enters only with motivation and a duplicate check.
- Borrowed: evidence before admission and the explicit duplicate check.
- Rejected: community voting and the discussion/proposal format.

### 3. Roobyx/awesome-game-design
- URL: https://github.com/Roobyx/awesome-game-design
- Stars: 723 — lower than the other sources, stated honestly. License: CC-BY-4.0.
- Artifact: a curated index of public game design documents, bibles, pitches,
  postmortems, and learning material.
- Quote: "A curated list of publicly available game design documents, design
  bibles, pitch documents, postmortems, learning materials, architecture
  resources, and tools."
- Analogous: postmortems are public, citable lessons — not rules.
- Borrowed: the lesson genre and the low-ceremony evidence pointer.
- Rejected: the link list itself and its asset/tool sections.

### 4. bevyengine/bevy
- URL: https://github.com/bevyengine/bevy
- Stars: ~50,000. License: Apache-2.0 (dual MIT/Apache-2.0).
- Artifact: `.github/pull_request_template.md` — the Testing section asks for
  evidence before review.
- Quote: "Did you test these changes? If so, how?"
- Analogous: a claim without a test is not ready to enter.
- Borrowed: the evidence question as a gate, not a narrative.
- Rejected: the engine, CI stack, and review process.

## Software development (3)

### 5. kubernetes/enhancements
- URL: https://github.com/kubernetes/enhancements
- Stars: 3,991. License: Apache-2.0.
- Artifact: enhancement tracking README; an enhancement is filed only after
  consensus in a SIG.
- Quote: "An enhancement may be filed once there is consensus in at least one
  Kubernetes SIG."
- Analogous: one report is not enough; admission needs a second signal.
- Borrowed: the admission gate and its explicit condition.
- Rejected: the KEP template and release-tracking machinery.

### 6. adr/madr
- URL: https://github.com/adr/madr
- Stars: 2,666. License: MIT OR CC0-1.0.
- Artifact: `template/adr-template.md` with Context and Problem Statement,
  Decision Drivers, Considered Options, Decision Outcome, and Consequences.
- Quote: "decisions that matter".
- Analogous: a memory record needs context, alternatives, and consequences, not
  just a sentence.
- Borrowed: the record shape — context, decision, consequences.
- Rejected: ADR file naming, numbering, and directory conventions.

### 7. rust-lang/rfcs
- URL: https://github.com/rust-lang/rfcs
- Stars: 6,643. License: Apache-2.0.
- Artifact: the RFC README and the `text/` proposal set; a proposal moves through
  a status before acceptance.
- Quote: 'The "RFC" (request for comments) process is intended to provide a
  consistent and controlled path for changes to Rust (such as new features) so
  that all stakeholders can be confident about the direction of the project.'
- Analogous: `candidate` and `accepted` are separate states with a gate between.
- Borrowed: the status gate, not the consensus process.
- Rejected: final-comment-period politics and the RFC template.

## AI-agent workflow (2)

### 8. letta-ai/letta
- URL: https://github.com/letta-ai/letta
- Stars: 25,543. License: Apache-2.0.
- Artifact: stateful agents with editable memory blocks; formerly MemGPT. The
  current source lives at `letta-ai/letta-code`.
- Quote: "Build stateful agents with memory that can learn and improve over time."
- Analogous: memory that can be edited needs an explicit admission rule.
- Borrowed: editable memory as a first-class object with a review point.
- Rejected: agent self-editing without a gate and the agent runtime.

### 9. joonspk-research/generative_agents
- URL: https://github.com/joonspk-research/generative_agents
- Stars: 22,421. License: Apache-2.0.
- Artifact: the simulation code for the Generative Agents paper, including the
  memory stream and reflection loop.
- Quote: 'This repository accompanies our research paper titled "Generative
  Agents: Interactive Simulacra of Human Behavior."'
- Analogous: memory is a stream that gets reflected on, not a rulebook.
- Borrowed: the memory-stream/reflection distinction as prior art.
- Rejected: storing every observation without an admission gate.

## Considered and rejected

- `OpenRA/OpenRA` — `AGENTS.md` forbids agents from editing the repo; the
  contributing guide has a duplicate-search rule, but no memory model.
- `langchain-ai/langgraph` (~45.4k, MIT) — memory store exists, but no candidate
  status or admission policy. Kept as an alternate.
- `mem0ai/mem0` (~69.5k, Apache-2.0) — a memory layer, but no candidate/admission
  distinction. Kept as an alternate.
- `python/peps` (~5.0k) — a status process, but language-specific and not about
  agent memory.
- `0ad/0ad` `docs/timing_pitfalls.pdf` — a lesson document with no text quote
  available in the checkout; dropped.
- GitHub searches for game-postmortem repositories returned mostly 0–3 star
  collections. `Roobyx/awesome-game-design` (723) is the honest low-star source,
  and the gap is stated rather than padded.

## License note

Only structural ideas were taken: labeled absence, evidence before admission, a
duplicate check, a status gate, and a record with context and consequences. No
source code, template text, or fixture file was copied. The quoted sentences are
short citations; the licenses above do not attach to this eval.
