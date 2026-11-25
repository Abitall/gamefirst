# G2 - slice: justification

Why every unit of `artifact/library/game/gates/G2-slice.md` is there, what breaks if
it is removed, and where its authority comes from. Size is 1801 chars, 450.3
tokens at chars/4, inside the 420-470 target.

| Unit | Why it is here | What breaks without it | Source |
|---|---|---|---|
| Role line (line 3) | Names the decider as the human and the agent as packet carrier, in one sentence, before any content. | The gate reads as a partner review; an agent can sign its own slice. | S10 (`the agent never decides the gate`), blueprint G2 row |
| `## Input` (line 7) | Lists the five packet pieces plus system cards (D06) and makes an incomplete packet a non-start. | G2 is held on a build and a memory; a missing D07 note or capture is discovered during the discussion, not before it. | S10 output list, R1 (build is truth), R8 (note + capture) |
| `## Check` rule (line 11) | One sentence: one line per point, no artifact no pass, a missing point is a failed point. | Points pass on opinion; a skipped point looks like a lenient pass. | S10 checklist with evidence, E03 |
| Checks 1-9 (lines 13-21) | Enumerates the nine S10 points so each is either evidenced or visibly absent. | The checklist collapses into "the slice feels done"; a missing sound or save hides behind eight good points. | S10 nine-point DoD; R1 |
| Bounds inside checks (lines 14, 16, 19, 21) | Adds the measurable edge the DoD leaves open: 12-minute timed run, readable on one screen, 3-5 strangers, a reuse row per unit. | "About 10 minutes", "win and loss" and "reused" are unfalsifiable; two testers or a 40-minute run still pass. | D07, S10, blueprint content rule |
| `## Decision` line (line 25) | Fixes the shape: one line, a date, two files, three words. | The verdict is an unwritten agreement; the next stage cannot tell whether G2 passed. | Blueprint (`one line plus a date`), R9 (STATE.md) |
| `proceed` (line 27) | Makes the budget a precondition of content: numbers per type, what each count includes, iterations, then an ordered cut list with cost and loss. | Content starts from a feeling; S11 and G2.5 have nothing to freeze or cut against. | S11, R9, G2.5 |
| `fix` (line 28) | Narrows repair to the named failed point and closes the gate to new mechanics. | `fix` becomes a second build sprint; a broken point drags a redesign in through the repair door. | S10 blocked rules, E08, R9 |
| `pivot` (line 29) | Preserves build, capture and D07 note, and sends the work back exactly one stage. | A boring slice restarts from zero, or is carried forward because the evidence was thrown away. | E09, S10, G1/G0 |
| `## Out of scope` (line 33) | Names content, polish and release and forbids them before a dated line. | G2 absorbs S11-S13; the gate is never actually passed, it just stops being mentioned. | S11, S12, S13, blueprint |
| `Cross-refs` (line 35) | Gives every ID used above a resolvable home and keeps rule text out of the gate. | IDs dangle; the reader cannot check authority, and the gate slowly duplicates R1/R8/R9/R10. | Rubric 9, blueprint |

## Units deliberately absent

- **Score per point.** A 1-5 scale invites averaging, and an average hides a
  failed save. The DoD is binary per point; the artifact keeps it binary.
- **A recommendation field.** S10 forbids the agent deciding the gate. The agent
  may argue in conversation; the artifact does not give it a signature line.
- **Conditional proceed.** Three outcomes are enough. "Proceed if..." is a
  fourth outcome that nobody records and nobody re-checks.
- **Restated rule text.** R1, R8, R9, R10 and E03 appear as IDs only. Copying
  their wording would create a second source of truth that drifts.
- **Examples and YAML frontmatter.** Gate files in this layer are plain
  Markdown read by a human; examples would push size past the threshold and
  frontmatter would imply tooling that does not exist yet.
