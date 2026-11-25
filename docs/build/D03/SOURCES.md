# D03 — sources

Thin protocol: three sources, two external and one accepted internal. Stars were
read on 2026-11-25. Each source is here because it changed a decision in the
artifact; a source that only confirms a taste is not counted. Quotes are
verbatim and live in this review file, not in the artifact.

## 1. architecture-decision-record/architecture-decision-record

- URL: https://github.com/architecture-decision-record/architecture-decision-record
- Stars (2026-11-25): 17,521
- License: README dual-licenses the text as CC-BY-NC-SA-4.0 or OGL-UK-3.0, at
  the recipient's option; GitHub reports NOASSERTION. Last push 2026-11-21.
- Analog: a dated, append-only decision log with rationale, alternatives, and
  consequences, kept as one collection.

| Quote | What it changed |
|---|---|
| "An architecture decision log (ADL) is the collection of all ADRs created and maintained for a particular project (or organization)." | The log is one file, not a directory of loose notes. |
| "Specific: Each ADR should be about one AD, not multiple ADs." | One block per real choice, with three admission tests. |
| "Immutable: Don't alter existing information in an ADR. Instead, amend the ADR by adding new information, or supersede the ADR by creating a new ADR." | Append only; a correction is a new block that names the date it replaces. |
| "Explain what follows from making the decision. This can include the effects, outcomes, outputs, follow ups, and more." | The `Consequences:` field: what follows, what is blocked, what it costs. |
| "Rationale: Explain the reasons for doing the particular AD." | The `Why:` field. |
| "Timestamps: Identify when each item in the ADR is written." | The `## [date]` heading. The log sharpens this to the day of the choice. |
| "A new ADR may take the place of a previous ADR." | Newest wins, without a Status field. |
| "In theory, immutability is ideal. In practice, mutability has worked better for our teams." | A rejected alternative, recorded so the choice is not reopened by accident. |

Borrowed: append-only, one decision per record, rationale, consequences,
timestamps, supersede-by-new-record, the ADL as one collection. Rejected:
in-place mutability, one file per decision, a status lifecycle, ADR numbering,
and any copied text (the NC clause).

## 2. rust-lang/rfcs

- URL: https://github.com/rust-lang/rfcs
- Stars (2026-11-25): 6,643
- License: Apache-2.0. Last push 2026-11-14.
- Analog: a change proposal template that forces a start date, drawbacks,
  alternatives, and unresolved questions before a decision is accepted.

| Quote | What it changed |
|---|---|
| "- Start Date: (fill me in with today's date, YYYY-MM-DD)" | The date is the first thing a record carries, not a footnote. |
| "## Drawbacks" and "Why should we *not* do this?" | `Consequences:` must name the cost, not only the benefit. |
| "## Rationale and alternatives" and "What other designs have been considered and what is the rationale for not choosing them?" | `Alternatives:` requires one real option and why it lost. |
| "What is the impact of not doing this?" | The cost of inaction belongs in `Consequences:`. |
| "## Unresolved questions" | Rejected: questions go to `BRIEF.md` or `STATE.md`, under R2's budget. |
| "## Future possibilities" | Rejected: ideas go to `BACKLOG.md` with a cost, under R9. |

Borrowed: the start date, the drawbacks section, rationale plus alternatives,
the impact question, and the discipline of a template whose headings are all
filled. Rejected: a long RFC narrative, an unresolved-questions section, a
future-possibilities section, and RFC numbering.

## 3. G2.5 — feature freeze (internal, accepted)

- Path: `library/game/gates/G2.5-feature-freeze.md`
- Status: accepted in the build plan, row 8; the gate doc itself says it is not
  a gate.
- License: project text, no external license.
- Analog: the freeze record the log must carry; the consumer that makes a dated
  decision line mandatory.

| Quote or rule | What it changed |
|---|---|
| "Append one dated decision to `DECISIONS.md`; `STATE.md` points at it." | The block is the freeze record, and `STATE.md` links the newest gate line. |
| "no dated line means no S11." | The freeze block is not optional; without it the stage cannot read a freeze. |
| Date: "the day the list is signed; S11 and S12 read it." | The heading date is the day of the choice, not the day the block was typed. |
| In: "every mechanic, system, mode and screen the build ships, by name and entry point." | The `Decision:` line carries the In list. |
| Out: "the ordered cut list from G2, each line with its cost and what the build loses." | The `Consequences:` line carries the Out list. |
| Budget: the G2 numbers by reference to the G2 packet, do not restate. | The `Evidence:` line points at the packet; the numbers are not copied. |
| The human signs one dated record; the agent brings the list, never the signature. | `Owner:` names the decider; a gate line is never the agent's. |

Borrowed: the dated append, all four parts (Date, In, Out, Budget), the
reference instead of restatement, the `STATE.md` pointer, and the human
signature. Rejected: a separate freeze file (G2.5 sends the freeze to
`DECISIONS.md`) and restating the budget numbers (G2.5 forbids it).

## Dead ends

Not counted in the three. Recorded so the search is not repeated.

| Repo | Stars (2026-11-25) | License | Why it was not used |
|---|---|---|---|
| npryce/adr-tools | 5,786 | GPL-3.0 tool (`GPL.txt`); the content it adds is CC-BY-4.0; GitHub NOASSERTION. Last push 2024-04-25. | A CLI for creating ADR files, not a document template. The tool license adds friction and the ADR repo already supplies the shape. |
| joelparkerhenderson/architecture-decision-record | 17,521 | Same repo as source 1; the old path redirects to `architecture-decision-record/architecture-decision-record`. | Duplicate: counted once, as source 1. |

## License note

No sentence from an external source appears in the artifact. The field names
and the idea of an append-only log are not copied expression. The ADR repo's
CC-BY-NC-SA-4.0 option is non-commercial; this artifact does not rely on it, but
a later revision that copies text into a commercial product must recheck. The
rust-lang/rfcs text is Apache-2.0; no text is reused. Quotes in this file are
for review and attribution.
