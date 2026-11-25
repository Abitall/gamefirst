# G0 justification

Why each unit of `artifact/library/game/gates/G0-concept-brief.md` exists, what
breaks if it is removed, and where it comes from. Unit IDs (U1-U20) are local to
this file; the artifact carries none, so its text stays clean.

## Units

| Unit | Text (abridged) | Why it exists | Breaks without it | Source |
|---|---|---|---|---|
| U1 | `# G0 - concept brief` | Stable name matching the blueprint row, so cross-references resolve | No citable identity for the artifact | blueprint, gates table |
| U2 | "G0 is not a gate ... one page and one decision ... Fun waits for G1" | Fixes position (after S06, before code), product (page + decision), and the deferral of fun | G0 drifts into a gate or a mini-GDD | blueprint lines 189, 319 |
| U3 | "From S06 (R7): 20 variants, 3 bad ... draft `BRIEF.md`" | Names the exact input set and its rules | Neither author nor reviewer can tell whether input is complete | S06 step 7, R7, R2 |
| U4 | "Anything missing: back to S06." | Defines the failure path for incomplete input | Gaps get filled silently and the check becomes theatre | godot-proposals triage |
| U5 | "One page, English. S06's ... stay; add, in this order:" | Keeps S06's fields instead of rewriting them; fixes a cheapest-cut order | The brief is re-authored, grows, or contradicts `BRIEF.md` | S06 step 7, BMAD brief, D01 |
| U6 | player fantasy | Forces one sentence on what the player gets to be or do | The page describes features, not an experience | S06 step 7 |
| U7 | core loop - 3 sentences: act, feedback, next act | Makes check 1 possible; an act and a result are what a build can show | There is nothing concrete to test | S06 step 7, blueprint |
| U8 | audience | Ties the idea to people and to the games they already play | References lose their anchor | D01 |
| U9 | constraints - time, money, platform, skill | Names the real limits before scope is argued | Ambition is discovered late, the 2DGD failure | D01, 2DGD |
| U10 | visual and audio direction - one line | States the sensory target without opening art production | Art direction creeps in or is silently assumed | orchestrator boundary |
| U11 | non-goals - 2-3 things this is not | Gives check 2 something to point at | Scope cannot be judged, only felt | D01, kubernetes KEP |
| U12 | kill criteria - "when the prototype is dropped, not how the player loses" | Separates design failure from player failure | The field is misread as lose conditions | S06 step 7 |
| U13 | next prototype question - "one a greybox answers in a day" | Makes check 4 and the S08 handoff concrete and time-boxed | The next step becomes a document, not a test | S06 step 7, S08 |
| U14 | Checks 1-4 | Acceptance for the decision; one check per requirement | The decision rests on taste alone | rubric, testability |
| U15 | `G0 <YYYY-MM-DD> - go: ...` / `revise: ...` | One line plus date, greppable | Decisions are untraceable or written as essays | blueprint line 195, ADR status |
| U16 | "The user decides; A01 writes one line in `DECISIONS.md`" | Separates creative authority from bookkeeping | The agent starts deciding, or the user is asked to edit files | A01, collaboration rule |
| U17 | "Revise returns to S06; it edits `BRIEF.md` and that line only (E01)." | Bounds revision to two documents | A revise triggers a rewrite cascade | E01 |
| U18 | "A second page means a new idea, not a longer brief." | Enforces the page limit without a word count | The page becomes a GDD by accretion | BMAD 1-2 pages |
| U19 | Route | Names who acts next and when S07 is conditional | Go produces no follow-through | A01, S07, S08 |
| U20 | Limits | Explicit non-goals; "a gap is a revise" | G0 turns into a question session or a design review | blueprint non-goals, R2 |

No unit is a shorter version of another: U3 (input) and U20 (limits) both mention
S06, but one names what arrives and the other forbids adding questions here.

## Function

- Trigger: S06 closes with a draft `BRIEF.md`, the 20-variant list, three
  candidates, a recommendation and one surprise line.
- Input: those artifacts, nothing else.
- Output: one page (fields in `## The brief`) and one dated line in
  `DECISIONS.md`.
- Done: checks 1-4 hold and the decision line exists.
- Failure: any missing S06 field sends the work back to S06; no decision line is
  written, so a gap cannot be mistaken for a go.
- Scope: concept only. No implementation, no art, no architecture.

## Omissions

| Not here | Owned by | Why |
|---|---|---|
| pillars, references, risks | S06 step 7, `BRIEF.md` | Already drafted; copying them here would create two versions that drift |
| questions | R2, spent in S06 | A question here would make G0 a gate |
| success metric, fun verdict | D01, G1 | Fun is G1's result on a running loop, not a paper claim |
| rationale, alternatives, consequences | D03 and the decision log | The blueprint allows one line plus date at a gate |
| PASS/CONCERNS/FAIL | blueprint non-goals | Three-label verdicts belong to reviews, not to a go/revise decision |
| engine choice | S07 | Only reached when the prototype question turns on engine facts |
| art bible, asset specs | art pipeline | Out of G0 scope by design |
| content numbers, feature costs | R9, `BACKLOG.md` | Scope is bounded by non-goals, not by a budget table |
| playtest protocol | G1 | Belongs to the loop test, not the concept page |

## Rejected alternatives

- Gate with scored criteria and a three-label verdict (Donchitos pattern). It
  duplicates G1 and invites rubber-stamping; G0 keeps the criteria but one binary
  decision.
- A longer concept template with market, comparables and "why now". Solo scope
  has no audience to pitch to; the pitch sections were rejected and only the hook
  sentence was borrowed.
- Merging G0 into S06. S06 recommends; G0 is the independent check that the next
  step is a prototype rather than a GDD. Merging removes the second reader.
- Letting G0 ask its own questions. R2 caps questions at three and they are spent
  in S06; an open question here hides the gap instead of exposing it.
- Numeric score of the idea. Zenstory's rule is a hard-flaw veto with no
  composite score; a decimal would launder a fatal flaw.
- A separate "concept review" document. It would restate this page; the artifact
  is the record.

## Format decisions

- Plain Markdown, no YAML frontmatter: the build plan asks for it, and state
  lives in `DECISIONS.md` and `STATE.md`, not in the page.
- ASCII only except `·`, used twice as an inline separator; encoding risk stays
  near zero.
- POSIX paths in backticks; identifiers `G0`, `S06`, `S07`, `S08`, `G1`, `R2`,
  `R7`, `R9`, `E01`, `A01`, `BRIEF.md`, `DECISIONS.md`, `STATE.md` are written as
  the blueprint writes them.
- Rule text is referenced, never quoted: the page says what G0 does, not what R7
  or R9 says.
