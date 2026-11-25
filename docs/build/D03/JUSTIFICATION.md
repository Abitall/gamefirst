# D03 — DECISIONS.md: justification

Status: drafted for one review round. Artifact:
`staging/D03/artifact/template/DECISIONS.md`. Mirror: `template/DECISIONS.md`
after acceptance; this part does not write the mirror. Scope: the log's shape
and rules, not its content. No game decision exists yet, so the file ships with
one empty block.

## Why this unit exists

A solo project run by a human and an agent needs one place where a choice that is
expensive to reverse is recorded at the moment it is made. Without it, every
session re-derives the same choice, `STATE.md` has nothing to point at after a
gate (G2.5), and a question already answered is asked again — R2 calls that a
bug. R5 allows exactly two documents before code: `BRIEF.md` (D01) and one
append-only entry in `DECISIONS.md` after a real choice. R2 writes to the same
file: "Over budget: decide, log, continue", and if the user says "you decide",
the agent appends date, decision, why, and alternatives. This artifact is that
log. The blueprint fixes its shape at row 260; the build plan targets
`template/DECISIONS.md` at row 14.

The log is not a plan. It records what was chosen and what it cost, so the next
choice starts from a fact instead of a memory. That is why it may exist before
the build while a system document may not: a decision is an event, a system
document describes behavior that does not exist yet.

## Unit by unit

Line numbers refer to the artifact as written.

| Unit (line) | Why it is there | What breaks if removed | Source |
|---|---|---|---|
| Title `# DECISIONS` (L1) | Names the file and matches the blueprint target. | A reader arriving from `STATE.md` or `BACKLOG.md` cannot tell what the file owns. | Blueprint D03, row 260. |
| Append only; a block stays; never edit or delete (L3) | The log is an audit trail, not a draft. | History becomes mutable: a correction silently changes what shipped, and a G2.5 freeze line can be rewritten after the fact. | ADR repo: "Immutable: Don't alter existing information in an ADR." G2.5: "Append one dated decision to `DECISIONS.md`". |
| A correction is a new block whose `Decision:` names the replaced date (L3-5) | Gives a legal way to change one's mind without rewriting. | A changed decision either edits the old block (breaks append-only) or leaves two contradictory blocks with no pointer; `STATE.md` may link the dead one. | ADR repo: amend or supersede by adding a new ADR. G2.5: append. |
| One block per real choice, with three tests: costly to reverse, changes what ships, gate/checkpoint line G0-G3 (L5-6) | Admission control. Keeps the log short enough to read. | Tunes, tasks, and moods enter; the log becomes noise and the reader stops trusting it. | ADR repo: "Specific: Each ADR should be about one AD, not multiple ADs." G2.5 (a freeze is one decision). |
| Routine tuning, a task, and an open question are not blocks (L6-7) | Separates a decision from work and from an unknown. | The log duplicates `STATE.md` (tasks) and becomes a plan, which R5 forbids before code. | R5: no task lists or roadmaps. R2: questions have their own budget. |
| An idea goes to `BACKLOG.md` (D05, R9) (L7) | Routes a mid-stage idea without pricing it here. | Scope grows inside the log with no cost and no cut; R9 says every accepted feature is paid in time, code, content, tests, and upkeep. | R9 "A new idea": one line, value, cost, then it waits. D05. |
| An open question goes to `BRIEF.md` or `STATE.md` within R2's budget (L7-8) | Routes the unknown to the artifact that owns it and keeps the 3-question cap visible. | Questions accumulate in an uncapped list with no owner; the same question is asked twice. | R2: 3 per stage, log in `runs/questions.jsonl`, "A question already answered there is a bug". D01, D02. |
| A decision may precede the build; a system doc may not (L8-9) | States the R5 exception precisely. | The log is read as a license to write GDDs for unbuilt systems; the project returns to documents before a playable slice. | R5 allowed list: `BRIEF.md` and one `DECISIONS.md` entry. |
| A01 owns the file and appends; a gate line is the human's signature, never the agent's (L9-10) | Authority is explicit: the partner may write the log, but may not sign a gate. | An agent signs its own gate or edits a human's line; G2.5's "no dated line means no S11" loses its meaning. | A01: edit `DECISIONS.md` allow; of the gate lines, "You never decide one." G2.5: the human signs, the agent brings the list. |
| Date the day of the choice, not the day it was written (L10-11) | Keeps chronology true when an entry is written late. | A decision made before a build but written after it gets a false date; S11 and S12 read the freeze date and mis-order the record. | G2.5: the date is the day the list is signed. ADR repo: timestamps identify when each item is written (this log sharpens it to the choice). |
| Evidence names an artifact a later reader can open; no evidence = a plan (L11-12) | Ties the entry to proof rather than memory. | Claims and facts look alike; a decision that was never exercised survives because it sounds right. | R1: a claim of done needs an artifact produced by running the thing; store it under `evidence/`. R5: cite proof. |
| A block records the choice, not the work: no task lists, estimates, or copied packet (L12-13) | Stops the log from becoming a second plan or a copy of the G2 packet. | The same fact lives in `BACKLOG.md`, `STATE.md`, and the gate packet, then drifts; the log grows past one page. | R5: one page, one fact. Blueprint: one fact in one place. G2.5: Budget by reference, do not restate. |
| At most ten lines per block (L15) | A format budget, not a style preference. | Blocks become essays; scanning cost per decision rises and the log stops being read at the start of a session. | Blueprint D03: "ten lines per decision". |
| Newest last and newest wins (L15) | Resolves which block is current without a Status field. | A reader cannot tell whether two blocks are both live; adding Status would mean editing old blocks, which the first rule forbids. | ADR repo: "A new ADR may take the place of a previous ADR." R2 needs a determinate answer to "already answered". |
| Replace every bracketed slot and delete its prompt (L15-16) | Keeps the template a form, not shipped content. | The prompts ship as if they were decisions; the first block reads as an unfinished form. | D01 convention: 37 slots, all replaced. The brief bans `{{`. |
| A G2.5 freeze is one block: In in `Decision:`, Out in `Consequences:`, Budget by reference in `Evidence:` (L16-17) | Gives the accepted freeze record a home with all four parts. | The freeze is either absent from the log (no dated line, no S11) or restated in the block and the packet, with two versions of the budget. | G2.5 four parts: Date, In, Out, Budget; Budget is the G2 numbers by reference, do not restate. |
| `STATE.md` links the newest gate line (L18) | Makes the freeze discoverable from the file every session reads first. | The freeze exists in the log but the next session does not find it; the pointer is the difference between a record and a rumor. | G2.5: "`STATE.md` points at it." D02. |
| `## [date]` heading (L20) | The date is the log's key and its sort order. | A title heading would repeat the `Decision:` line; without a date the block cannot be cited or ordered. | G2.5 Date. ADR repo: timestamps. |
| `Decision:` (L22) | One sentence that states what changed; it also carries G2.5's In list. | No single line says what was chosen; the reader must reconstruct it from the rationale. | Blueprint "decision"; R2 minimum fields (date, decision, why, alternatives). ADR repo: specific, one decision. |
| `Why:` (L23) | The argument that won, in the writer's words. | The next session reopens the choice because the winning reason is lost; the alternatives say what lost, not why. | ADR repo: "Rationale: Explain the reasons for doing the particular AD." R2 requires why. |
| `Alternatives:` one real option, rejected because (L24) | Proves a set existed before the choice. | A "decision" with no alternative was a constraint or a task; the log cannot tell them apart, and the first idea wins by default. | ADR repo: alternatives. rust-lang/rfcs: "Rationale and alternatives", "What other designs have been considered and what is the rationale for not choosing them?" R7: diverge before converge. |
| `Consequences:` what follows, what is blocked, what it costs (L25) | Records the price and the new constraints, including G2.5's Out list. | The cost is rediscovered at the next gate; the cut list has no home; the log reads as intent without a bill. | ADR repo: "Explain what follows ... effects, outcomes, outputs, follow ups". G2.5 Out: what the build loses. R9: scope is paid. |
| `Owner:` who decided, not who built (L26) | Separates accountability from implementation. | The builder is assumed to be the decider; a human gate line can be attributed to the agent that wrote the code. | A01 roles. G2.5: the human signs. |
| `Evidence:` test, gate packet path, or `evidence/` path (L27) | Gives R1 a hook inside the log. | The entry has no proof; a claim and a verified choice look the same six weeks later. | R1: evidence under `evidence/`, cite the path. G2.5 packet. |
| Blank line plus `---` (L28-29) | Marks the block boundary and makes the ten-line frame visible. | Blocks run together; the line count is not checkable; appending the next block is error-prone. | Format mechanics; no external source. |

## Deliberately absent

- **Status** (proposed, accepted, superseded, rejected). Marking an old block is
  an edit, which the first rule forbids. The newest block wins; a correction
  names the date it replaces. The ADR repo records that in-place mutability
  "has worked better for our teams"; this log chooses immutability because its
  job is audit for one human and one agent, not consensus for a committee. Cost:
  a reader must reach the end or search for the topic. If that fails in use, the
  fix is a separate index, not a Status edit.
- **Context.** `BRIEF.md`, the gate packet, and `STATE.md` hold context; copying
  it here would duplicate and drift. The `Decision:` line names the trigger and
  `Why:` gives the reason.
- **One file per decision.** A log is one file (the ADR repo's own definition of
  an architecture decision log). A directory of files adds metadata, listings,
  and cross-links that a solo project does not need. Cost: no per-decision
  permalink; a date heading is the anchor.
- **Numbering** (ADR-001). Dates are unique enough in a solo project and need no
  counter. A number would either be edited into old blocks or looked up in a
  side file. Cost: verbal references use the date, which is longer but stable.
- **In-place amendment.** Rejected with Status; see above. A correction is a new
  block that names the old date, so the path from one choice to the next stays
  readable.
- **Meeting minutes, attendees, debate transcript.** The log records the choice,
  not the conversation. The transcript lives in the session and commit history;
  it is not this artifact.
- **Unresolved questions and future possibilities.** rust-lang/rfcs has both;
  this project routes questions to `BRIEF.md` (at most 3, R2) and ideas to
  `BACKLOG.md` (with cost, R9). Keeping them here would create a second,
  uncapped backlog.
- **Design detail, specs, code snippets.** System documents and code own
  behavior; R5 puts code before docs. A snippet in the log goes stale and
  invites the log to become a GDD.
- **Estimates, deadlines, task assignments.** Not a plan; R5 forbids future-tense
  plans before code. `Owner:` is who decided, not who builds; the build plan owns
  tasks.
- **Priority and severity.** Not a bug tracker; `BACKLOG.md` carries priority.
- **A Russian mirror.** D10 owns `decisions.ru.md`. This file is English per
  blueprint row 260; a second copy here would create two sources of truth.
- **A table of contents.** Appending a block would require editing the TOC,
  violating append-only. Date headings and ten-line blocks are enough.
- **A separate signature block.** `Owner:` plus `Evidence:` plus the human gate
  line already carry authority; a signature block repeats `Owner:` and invites
  ceremony.
- **`{{...}}` placeholders.** Brackets only. `{{` implies a template engine and
  the brief bans it; the slots are filled by hand.
- **A git commit hash as evidence.** A commit proves a change, not that the
  change works. R1 asks for a test, a capture, or a count. A hash can sit inside
  an `evidence/` path if needed; it is not the evidence.
- **A filled example block.** It would be fake content, and the first real
  decision would sit beside a fiction. The slots and their prompts are the
  example.

## Consistency

| ID | Where in the artifact | What it says there | Status |
|---|---|---|---|
| D02 | L18 | `STATE.md` links the newest gate line. | D02 is pending; G2.5 already requires the pointer. The cross-ref is forward, not broken. |
| D05 | L7 | Ideas go to `BACKLOG.md`. | D05 is pending; R9 defines the one-line entry. Forward cross-ref. |
| R2 | L8 | Open questions follow the 3-question budget. | Agrees. R2 also writes here: "You decide" appends date, decision, why, alternatives. |
| R5 | L8-9, L12-13 | A decision may precede the build; a system doc may not; the block is not a plan. | Agrees with R5's allowed list and its ban on task lists. |
| R9 | L7 | An idea is routed to `BACKLOG.md`. | Agrees: one line, value, cost; scope is paid. |
| G2.5 | L5-6, L16-18 | A freeze is one block; In, Out, Budget by reference; the human signs; `STATE.md` points. | Agrees on all four parts. One tension: a full In/Out list may exceed one line (see Risks). |
| A01 | L9-10 | A01 owns and appends; a gate line is the human's. | Agrees with A01's permissions and "You never decide one." |
| G0-G3 | L6 | Gate and checkpoint lines are decisions. | Agrees. G2.5 is labelled a checkpoint, not a gate, matching the gate doc's own note. |
| R1 | L11-12, L27 | Evidence is an openable artifact under `evidence/`. | Agrees. |
| R7 | L24 | At least one real alternative was considered. | Agrees: the set exists before the choice. |

## Size

The artifact is 1,441 characters, 1,441 bytes, 360.25 estimated tokens
(characters / 4), 29 lines. The block is exactly 10 physical lines with 6
fields; the file has 8 bracket slots (8 open, 8 close). ASCII only, UTF-8, no
BOM, LF only, trailing newline. Target 350-500 tokens; hard limit 600; headroom
239.75 tokens to the hard limit, 139.75 to the soft top.

## Risks and limits

1. **A G2.5 freeze may not fit one line per field.** In is "every mechanic,
   system, mode and screen the build ships, by name and entry point"; Out is an
   ordered cut list
   with cost. If a real freeze needs more than one physical line for In or Out,
   the ten-line shape breaks. The current answer is to keep each field on one
   long line and point Budget at the packet. The alternative, a documented
   12-line freeze block, is not in the artifact. This is the main open question.
2. **A date-only heading can collide.** Two decisions on the same day produce
   two `## 2026-12-01` headings and duplicate Markdown anchors. Order is the tie
   break. If links are needed, append `(2)` at write time; do not edit the first.
3. **Newest-wins requires reading to the end.** A long log has no index and no
   Status field. `STATE.md` points only at gate lines. A topic search is a
   `grep`, not a lookup.
4. **Append-only makes a typo permanent.** A wrong date or a wrong owner stays;
   the correction block adds noise. This is the accepted cost of audit.
5. **Ten lines assumes one physical line per field.** A hard return inside a
   field breaks the count; an editor's soft wrap does not. The check counts
   lines that begin with `- **`, not wrapped text.
6. **"One real option" is not mechanically checked.** A lazy writer can put
   "none" and pass the shape. Only review catches it. The same holds for "a
   decision with no evidence is a plan": the sentence is a rule, not a test.
7. **Evidence can name a gate packet that is not in the repo.** If the packet is
   verbal, the field is a memory, not a path. The gate process should write the
   packet before the line.
8. **The external license is non-commercial.** The ADR repo's README is dual
   CC-BY-NC-SA-4.0 or OGL-UK-3.0; this artifact copies no sentence from it. The
   field names and the idea of an append-only log are not expression. If the
   project later copies text, recheck the license. `SOURCES.md` records this.
9. **The template is not the live file.** Acceptance must copy it to
   `template/DECISIONS.md`; this part does not. A generated project that skips
   the copy has no log.

Review: pending
