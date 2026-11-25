# D10 — `decisions.ru.md`: justification

Status: review-ready.
Artifact: `template/decisions.ru.md` (staging copy: `staging/D10/artifact/template/decisions.ru.md`).
Type: user document, Russian, one page.
Source of truth: `DECISIONS.md` (D03). D10 is a view over it, not a second record.

## The problem

`DECISIONS.md` (D03) is the record: append-only, one block per choice, at most ten lines, with alternatives, owner, and evidence. It is written for the agent and for a later reader who needs the full reasoning. At the start of a session, re-reading it costs minutes, and the choice is buried among alternatives and evidence.

D10 is the one-minute human view: newest first, one line per key decision, each line carrying the date (which is also the link), the choice, why it won, what changed, and where the block is. The journal remains the source of truth; the digest is a window over it. If they disagree, the journal wins.

## Source key

- **S1** — `thomvaill/log4brains`, Apache-2.0, 1,613 stars on 2026-11-25.
- **S2** — `olivierlacan/keep-a-changelog`, MIT, 6,763 stars on 2026-11-25.
- **S3** — `template/DECISIONS.md` (D03), accepted internal part, BUILD-PLAN row 86.
- **B** — `docs/V0.3-BLUEPRINT.md`, row D10: "RU digest of key decisions".
- **A01** — the agent contract that carries the language rule (user documents Russian, agent artifacts English) and owns the journal.
- **R5** — the rule that a decision may precede the build; the block is still the record.
- **D02**, **D05**, **R9**, **G0–G3**, **G2.5** — accepted parts named in the artifact.

## Units

| # | Unit | Why it is there | What breaks without it | Source |
|---|------|-----------------|------------------------|--------|
| 1 | H1 `# Решения`; file name `decisions.ru.md` | Human title; `.ru` marks the language and leaves room for another locale; the blueprint names the file. | The page opens without a title; a second language has no naming convention; the build plan and the file diverge. | B; A01 |
| 2 | Intro line 1: audience; not a translation, not a second journal; agent reads `DECISIONS.md`; the journal wins a disagreement | Sets authority before the first row. A digest that competes with the record is worse than no digest. | A reader treats the digest as the record; a row drifts; a missing block is invisible; the summary outranks evidence. | S1 (immutable source, publication is a view); S3 (append-only); B |
| 3 | Intro line 2: newest first; at most seven rows; the eighth displaces the oldest; the journal keeps it; one minute | Makes it a digest, not an archive. Newest-first is how a human catches up; seven rows fit one screen; the displaced row is not lost. | The page grows into a second journal; the latest decision sits at the bottom (D03's order) or off-screen; the one-minute promise fails. | S2 (curated, for humans, latest first); S1 (chronological source); S3 (append-only, newest last in the journal) |
| 4 | `## Формат` and the indented sample row | One shape for every writer; the four-space indent makes the sample code, so it cannot be read as a real decision; a concrete date teaches the anchor. | Each writer invents an order or labels; a plain sample row becomes a fake decision in a fresh project, or is copied as real. | S3 (fields); S2 (entry shape); D05 (legend in an indented fence, zero parsed items) |
| 5 | Date rule: day of the choice, not the day written; the date is the link; a second same-day block uses `-1` | One token does two jobs: the visible date and the anchor. Day-of-choice is D03's rule; `-1` is GitHub's slug for a duplicate heading. | Rows are claims with no source; a separate "link" repeats the date and needs a second edit; a second same-day block links to the first. | S3 (date rule, evidence); S2 (linkable entries, date displayed); GitHub slug behavior |
| 6 | Name rule: 2–4 words, used to find the row in the list | The sentence carries the decision; the name is the handle. Short labels make the page scannable. | Rows begin with a full sentence; the eye cannot find a decision; the list reads as prose and the minute is lost. | S2 (short section labels; analog); S1 (record title/slug; analog) |
| 7 | Field definitions: `Решено` one sentence; `Почему` the reason it won, not benefits; `Меняет` opened/closed/cost; "ничего" is not key | The digest's value is compression with a reason. A benefit list is advocacy; a vague "changes" field hides the price. | Rows become mini-ADRs (too long) or press releases (benefits, no trade-off); the reader cannot see what changed. | S3 (`Decision`/`Why`/`Consequences`); S2 (why and how, not just what) |
| 8 | One row, one decision; alternatives, owner, and evidence stay in the journal | Matches D03's one block per choice; keeps the link unambiguous; the journal already holds the full reasoning. | One row points to a block with two choices; the digest duplicates evidence and grows; the link is ambiguous. | S3 (one block per choice; fields); S2 (one notable change per line, curated) |
| 9 | Supersede rule: the replaced row leaves the window; the new row says "заменяет [дата]" | A reversed decision must not remain current advice. The new row carries the replacement chain; the old block stays in the journal. | A stale row is read as current; a status column or strikethrough duplicates the journal and ages. | S3 (newest wins; correction block; old block stays); S1 (source immutable, view follows) |
| 10 | `## Отбор` and the three admission tests: costly to reverse, changes what ships, or a gate | Defines "key" with D03's own test. A gate is one test, not the only one. | Every gate, tune, and task enters; the seven-row window overflows; the reader cannot tell a key choice from routine work. | S3 (admission test); B ("key decisions") |
| 11 | Exclusions: task, routine tuning, question, idea; idea → `BACKLOG.md` (D05) with a price (R9); question and current → `STATE.md` (D02) | Routes non-decisions to their owners. An open question is not a choice; an idea is not a decision; current state is not history. D03 also allows `BRIEF.md` for a question; the digest points to `STATE.md`, the current-state file. | Ideas and questions appear as decisions; D05 and D02 lose their single home; three lists disagree. | S3 (tune/task/question are not blocks; idea → BACKLOG); D05; R9; D02 |
| 12 | Block first, then row; a digest row without a block is a rumor | The block is the evidence; the row is the pointer. Writing the row first invites a decision with no record. | The digest can invent a decision; the link 404s or points to the wrong date; a reader cannot verify. | S3 (evidence must be openable; no evidence = a plan); S2 (update immediately, consistency); R5 (a decision may precede the build, but the block is the record) |
| 13 | One-sentence test: if the row cannot be retold in one sentence, it is a plan, not a decision | A decision is a choice with a consequence; a plan is steps and dates. The test is cheap at the point of writing. | Plans enter as decisions; the reader cannot tell what is settled; rows grow into plans. | S3 (a block records the choice, not the work); B |
| 14 | `## Ключевые решения` and the empty state: the first row arrives with the first block | A fresh project has no decisions. The section must be visibly empty rather than hold a fake row. | The template looks broken, or invites a sample decision that later reads as real. | D05 (ships empty; zero parsed items); S3 (first block; a decision may precede the build under R5) |
| 15 | No-rewrite rule: meaning fixed; a link or typo may be fixed | Matches append-only. A broken link is a defect; an old meaning is history. | A later writer "improves" an old row; the digest disagrees with the block; history is silently rewritten. | S3 (append-only); S2 (rewrite only with a good reason); the prompt |
| 16 | Russian, ISO dates, one page | The user document language; ISO sorts and matches the anchor; the seven-row cap is the page budget. | The human-facing file is in the agent's language; a local date format cannot be an anchor; the page grows. | A01; B; S2 (ISO date) |
| 17 | No double-brace placeholders; the sample uses `[...]` slots | Double braces are framework command syntax; D10 is a document, not a command template. | A command renderer may substitute the sample; the format example breaks. | Framework command syntax; D05 (uses `[...]`, not double braces) |

## Deliberately absent

| Absent | Why |
|--------|-----|
| `Alternatives`, `Owner`, `Evidence` fields | They are in D03. Copying them makes the digest a second journal and triples the row length. |
| A status column (`active` / `superseded`) | Removal plus "заменяет [дата]" is simpler and cannot go stale. The journal keeps the old block. |
| A "last updated" page date | Each row carries its own date. A page date would age and imply the whole page changed. |
| Gate protocol, In/Out list | The G2.5 block holds it. The digest says what changed, not how the gate works. |
| A filled sample decision | It would read as a real decision. The shape is indented code; a worked example lives only in this justification. |
| Priority, score, ranking | The digest is chronological. Ranking belongs to `STATE.md` (next) and `BACKLOG.md` (priority). |

## Rejected alternatives

| Alternative | Why it lost | When it would win |
|-------------|-------------|-------------------|
| Full translation of `DECISIONS.md` | A second journal: doubles maintenance, duplicates authority, and grows without a bound. The link is cheaper. | The reader needs alternatives, owner, and evidence in Russian; that is a translation artifact, not a digest. |
| Auto-generated from the journal | v0.3 has no generator, and the value is curation: a script cannot decide what is key. Raw generation is the noise S2 warns about. | The journal has a strict machine-readable schema and every block is key; then a renderer is safe. |
| Five-column table | Russian prose in five columns wraps badly; raw Markdown tables are noisy in a terminal. | The digest is read in a spreadsheet or compared side by side. |
| Gates only | A key non-gate choice (engine, cut, scope trade) would be invisible. Gates are one admission test, not the only one. | Gates are the only decisions that change what ships; not true for this project. |
| Newest last (journal order) | The human reads the latest first; the journal order buries the current choice. | The reader reads the journal and the digest side by side in the same order. |
| Russian date format `25.11.2026` | It does not sort and cannot be the heading anchor. | The audience never sorts, links, or generates an anchor. |
| `docs/DIGEST.md` instead of root `decisions.ru.md` | The blueprint puts it at the root, next to `DECISIONS.md`; the human opens both together. | The docs folder is the only published surface. |
| Top-3 ranking only | Too little context; the seven-row window shows a short history, not a dashboard. | The page is a next-action dashboard; `STATE.md` already owns that. |

## Consistency

| ID | Printed as | Resolves to | Contract |
|----|------------|-------------|----------|
| D02 | `STATE.md` (D02) | `template/STATE.md` | Current state, one page, next, blocked, gate, budget. The digest routes current work there. |
| D03 | `DECISIONS.md` | `template/DECISIONS.md` | Append-only; one block per choice; date = day of choice; fields; evidence. The digest inherits the admission test and the date rule. |
| D05 | `BACKLOG.md` (D05) | `template/BACKLOG.md` | Ideas with value, cost, priority, status. The digest routes ideas there. |
| R9 | `(R9)` | `library/core/rules/R9-scope-is-budget.md` | Every idea carries a price. The digest says "с ценой (R9)". |
| G0 | `G0` | `library/game/gates/G0-concept-brief.md` | Gate decision. The digest admits gate decisions. |
| G1 | `G1` | `library/game/gates/G1-fun.md` | Gate decision. |
| G2 | `G2` | `library/game/gates/G2-slice.md` | Gate decision. |
| G2.5 | `G2.5` | `library/game/gates/G2.5-feature-freeze.md` | Freeze decision: In, Out, Budget by reference. The digest admits it. |
| G3 | `G3` | `library/game/gates/G3-ship.md` | Gate decision. |

## Size

| Metric | Value | Budget | Headroom |
|--------|-------|--------|----------|
| Characters (UTF-16 code units) | 1,430 | — | — |
| Tokens (chars / 4) | 357.5 | 600 | 242.5 (40.4%) |
| Bytes (UTF-8) | 2,435 | — | — |
| Lines | 28 | one page | 28 physical lines; ~35 visual lines at 90 chars |
| H2 sections | 3 | — | `Формат`, `Отбор`, `Ключевые решения` |
| Decision rows | 0 (empty by design) | 7 visible | First row arrives with the first block |
| Format sample | 1, indented code | not a row | Cannot be read as a decision |

## Risks and limits

- **Anchor depends on the renderer.** GitHub and most Markdown renderers slug `## 2026-11-25` to `#2026-11-25`; a duplicate date gets `-1`. If a renderer ignores fragments, the link opens the journal at the top; the date and name still locate the block.
- **The seven-row cap is editorial.** No parser enforces it. A writer can add an eighth row without displacing the oldest.
- **A missed block makes the digest false.** There is no automatic cross-check. The block-first rule and the no-rewrite rule reduce the risk, but do not remove it.
- **The sample date is concrete.** A writer may forget to replace `2026-11-25`; the empty list and the `[...]` slots signal a shape, not a decision.
- **D10 is not parsed.** `/status` and `/next` do not read it. It cannot break a command, but it also cannot be validated beyond the static check.
- **Russian prose is longer than English.** Seven rows can exceed one screen if the fields are not terse; the one-sentence rule is the control.
- **The date is the link.** In plain text, copying a row loses the URL; the anchor rule is in the format section.
- **D03's heading format is an assumption.** If D03 changes from `## date` to another heading, the anchor rule breaks.
- **The 600-token limit is for the template.** A filled digest will exceed it. The seven-row cap is the real budget.
- **"Key" is a judgment.** The three tests reduce disagreement; they do not remove it.

## Open questions

1. Seven rows or five? The five gates would fill a five-row window; seven leaves room for two non-gate choices. Recommendation: seven.
2. Date-as-link or a separate `→ блок`? One occurrence and one edit wins; a separate arrow is more visible but repeats the date. Recommendation: date-as-link.
3. Remove a superseded row or mark it? Removal prevents stale advice; a mark preserves the chain in place. The journal keeps history, so removal wins.
4. Auto-generate in a later version? Only if D03 gains a strict schema and every block is key; v0.3 stays curated.
5. Who writes D10? The same hand that appends the block (A01 or the human); a gate line is the human's signature. The digest has no signature.
6. First row after G0 or after the first block? A decision may precede the build (R5), so the first block, not G0, starts the digest.
