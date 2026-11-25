# G2.5 justification

The artifact is 1,767 characters, 441.8 tokens at chars/4 (441.5 at words x 1.35), 26 lines, ASCII, LF, no BOM, no YAML. It sits inside the 420-470 band G2 used and under the brief's 500.

## Units

| Unit | Why | What breaks without it | Shorter? | Source |
|---|---|---|---|---|
| Title `# G2.5 - feature freeze` | Names the stage and its job in the same words as the build plan and the blueprint table. | A reader cannot match the file to the plan row; the gate gets called "the freeze gate". | No. | Build plan row 8; blueprint line 192. |
| Role line, sentence 1 | Says what G2.5 is not, who signs, and what the agent supplies. | G2.5 reads as a review the agent can pass on its own; a freeze becomes one more checkpoint. | "Not a gate; the human signs" loses the list/signature split that makes the record auditable. | G2 role line; blueprint "Not a gate"; SRC8 cut signal; SRC9 checklist prepared for the human. |
| `## Record` and its lead sentence | Fixes the physical shape: one dated decision in `DECISIONS.md`, a pointer in `STATE.md`, four parts. | The freeze stays a paragraph of intentions, or `STATE.md` keeps a second copy that drifts; S11 has nothing stable to read. | Four bullets is the minimum that keeps date, list, cut and budget separable. | G2 decision shape ("one line plus a date"); SRC5 freeze definition; SRC3 counts. |
| **Date** | Turns the freeze into a moment that later changes can be placed before or after. | Nobody can tell whether a change came before or after the freeze; the record is undated. | Dropping "S11 and S12 read it" is possible but loses the consumers. | Blueprint dated decisions; SRC5 frozen period; SRC1 release cycle. |
| **In** | A closed list by name and entry point; anything absent is not in the game. | The freeze covers only what someone remembers; a mode added quietly is legal. | "By entry point" could go, but then two features share one name. | SRC1 (feature PR waits); SRC5 enhancements freeze. |
| **Out** | The ordered cut list carried from G2, each line with cost and loss. | When time runs out the freeze has no answer, so cutting starts at the end under pressure. | No: "cost and what the build loses" is what makes a cut decidable. | SRC2 milestone purge; SRC5 pruning; G2 proceed paragraph. |
| **Budget** | The G2 numbers by reference only; the packet stays the source of truth. | S11 invents counts, or the copy drifts from G2 and the freeze contradicts the slice. | No: a restated number is a second source. | G2; S11; R9; SRC3 entity counts. |
| "Only fixes" and the fix/feature test | One sentence decides which side a change is on, plus value-only changes. | Every change is argued case by case; a "small feature" passes as a fix. | "Only fixes" alone is the rule everyone agrees with and nobody can apply. | SRC6 (backports only for regressions); SRC7 (grey area); R9 wording. |
| **One in, one out** | The only legal way to add after the freeze. | The freeze becomes advisory and additions accumulate. | No: "comparable cost, named in the same decision" blocks a token removal. | R9; SRC5 exception requests. |
| **A bug found** | A triage line, a fix for blockers and regressions with a test, the rest to the backlog, system change = feature. | The first bug reopens design, or every bug is fixed and the freeze ends. | Triage fields could be delegated to S12, but then the gate has no rule for the bug it just found. | SRC7 (severity, regression vs known); SRC6; S12 triage. |
| **Disable beats late** | A frozen feature that misbehaves is disabled rather than repaired in place. | The only options become fix or ship broken; a late fix turns into a redesign. | No. | SRC7 ("prefer disabling them"). |
| `## Boundary` | Names the handoff S11 then S12 then G3, the no-line-no-S11 rule, the four prohibitions, and the backlog route with cost. | G2.5 becomes a second G2 or a soft approval; the nine points are re-litigated. | No: four separate prohibitions, each with its own failure. | G2 `## Out of scope`; S11/S12 triggers; R9; E06. |
| `Cross-refs:` line | Gives every ID a resolvable home. | IDs dangle and the file cannot be checked alone. | No. | G2 cross-refs style; rubric 9. |

## Units deliberately absent

- A tenth check or a score. G2 owns nine; a tenth would make the freeze a gate.
- A re-check of G2 evidence. The freeze reads the G2 line, not the packet.
- An exception or approval workflow. One in, one out already prices an exception; a second process is ceremony.
- A severity scale. S12 owns triage; the freeze only says what happens to the result.
- A calendar duration. The freeze runs until G3; a fixed range would expire.
- Restated R9 text. The ID is enough.
- A second copy of the budget in `STATE.md`. State holds the pointer and the status; the numbers stay in the G2 packet.
- A feature-flag design. "Disable" states the intent; the mechanism belongs to S12 and the engine.
- Quality metrics. G3 decides ship; G2.5 only decides what may change.
- YAML frontmatter and worked examples. The gate is read in one screen.
