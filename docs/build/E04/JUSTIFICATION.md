# E04 — question budget: justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Three-question cap | Caps the user's interrogation load per stage | The agent keeps asking until the user gives up | spec-kit clarify (quota); godot-proposals (actionable proposal) |
| `Qn/3` numbering | Makes the remaining budget visible before the answer | The user cannot tell how much attention is left | R2 |
| One question per message | Each answer gets the user's full attention | The agent ships a questionnaire; replies get shallow | Claude-Code-Game-Studios (one-message batch, reversed) |
| Recommendation + one-line reason | Turns a question into a decision the user can accept | The user does thinking the agent should have done | spec-kit (recommended option); bevy ("what solution") |
| "Or: you decide" | Escape hatch when the user has no preference | The user invents an answer or stalls the stage | MCP elicitation (decline); create-t3-app `--default` |
| No repo-answerable question | The agent reads `STATE.md` and `DECISIONS.md` first | A question is spent on a fact already written down | godot-proposals (search first); spec-kit (skip answered) |
| No repeats | A repeated question proves lost context | The user answers the same thing twice | spec-kit ("no duplicates"); godot-proposals (search duplicates) |
| JSONL log with five keys | Gives E04 and the reviewer a machine-checkable record | The budget is unverifiable and evidence is prose | MCP (structured request schema) |
| `answer` filled after the reply | Records what was decided, not only what was asked | The log shows questions with no outcome | rust-lang/rfcs (questions with resolution) |
| Over budget: decide, log, continue | Keeps the stage moving when a fourth question is tempting | Work stops on a question, or the cap breaks silently | create-t3-app `--default`; aider `--yes-always` |
| `you decide` becomes a dated `DECISIONS.md` entry | A deferral is still a decision with a reason and date | The decision is lost and the agent re-asks later | rust-lang/rfcs (rationale and alternatives) |
| Autonomous asks zero | R10 autonomy contract: no human in the loop | A headless run blocks waiting for an answer | create-t3-app (non-TTY default); aider `--yes-always` |
| Prompt asks "everything" | Stresses the budget against an invitation to over-ask | The test passes trivially and proves nothing | R2 |
| Prefilled `DECISIONS.md` (four answers) | Makes reading-before-asking observable | A repo-answered question cannot be detected | godot-proposals (search first) |
| Empty `runs/questions.jsonl` | Gives a clean counter from n=1 | The counter is ambiguous across runs | V0.3-BLUEPRINT line 112 |
| Second run in autonomous mode | Isolates mode behavior from fixture content | The mode difference is confounded | R10 |
| Paired Pass/Fail bullets | Every pass check has a named failure | The reviewer cannot fail the artifact consistently | spec-kit clarify (validation list) |
| Links R2, A01, R10 | Ties the eval to the rule, the asking agent, autonomy | The eval floats free of the system it gates | V0.3-BLUEPRINT line 172 |

Deliberately absent: UI and timing thresholds beyond the count, subjective per-question quality scoring, a gate-specific budget run (fixture covers one stage), and a multi-agent handoff run (the budget is per stage regardless of which agent speaks).
