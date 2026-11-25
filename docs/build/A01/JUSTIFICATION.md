# A01 partner — justification

Unit-by-unit account of `artifact/library/core/agents/partner.md` (55 lines, 2551 chars). Line numbers refer to that file. Sources are named by ID only where the text already lives elsewhere: the blueprint, the rules, the rubric, the OpenCode agent documentation, and `SOURCES.md` (G1–A2).

## Frontmatter

| # | Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|---|
| 1 | `---` block, L1–32 | Native OpenCode V2 agent: the body is the system prompt, the frontmatter is the contract the harness enforces. | A body-only file is a document, not an agent; nothing can select or constrain it. | OpenCode agents docs; SKELETON convention |
| 2 | `description`, L2 | The only string a human or the orchestrator sees in the agent list. It names the job and the two exclusions in one line. | The agent is unpickable, and a reader cannot tell it from A02/A03 without opening it. | Blueprint §Agents, A01 |
| 3 | `mode: primary`, L3 | The partner is the session's main voice: it owns dialogue and runs gates. | As a subagent it cannot hold the conversation or run a gate; the blueprint's whole dialogue model collapses into a dispatcher. | Blueprint §Agents, A01; OpenCode docs |
| 4 | `permissions` as an ordered list, L4–31 | V2 shape: `{action, resource, effect}`, last match wins. Order is meaning, not style. | V1 `tools`/`permission` keys are deprecated and ignored — every rule below silently disappears. | OpenCode docs (V1 fields deprecated) |
| 5 | `subagent: * allow`, L5–7 | A01's job is routing; routing is launching A02/A03/A04/S01. | The partner can only talk about work it cannot start; every handoff becomes a manual user action. | Blueprint §Agents, §Crews; brief |
| 6 | `edit: * ask`, L8–10 | Broad default: any write outside the partner's own records needs a yes. | The partner may rewrite GDDs, ADRs or config unasked — exactly the design and code work it must not do. | Brief; blueprint §Non-goals |
| 7 | `edit STATE.md allow`, L11–13 | STATE is the partner's primary artifact; asking on every turn is noise. | Either the state goes stale (the one file that must never be stale) or the user is asked the same thing every turn. | Blueprint §Agents; §Memory |
| 8 | `edit BACKLOG.md allow`, L14–16 | New ideas land in one place with a cost, without a decision. | Ideas get lost in chat or, worse, implemented; R9 has nowhere to write. | R9 (pending, referenced by ID); brief |
| 9 | `edit DECISIONS.md allow`, L17–19 | R2's "you decide" path and R10's log both end in an appended decision with date, why, alternatives. | The autonomous path cannot be completed; decisions become chat-only and get re-argued. | R2 §"You decide"; R10 (pending); S2 |
| 10 | `edit docs/playtests/** allow`, L20–22 | G1 needs a playtest note; the partner records the protocol and the result. | G1 loses its evidence and the playtest write becomes an ask on the critical path. | Blueprint §Gates, G1; D07 |
| 11 | `edit runs/** allow`, L23–25 | Two append-only logs live here: questions (R2) and autonomy checkpoints (R10). | Neither log can be written; E04 has nothing to count and a resumed run has no trail. | R2 §Log; R10; blueprint §Autonomy |
| 12 | `edit evidence/** allow`, L26–28 | R1 defines done as an artifact under `evidence/` cited by path. | The agent can claim done but cannot deposit the proof, so "done" is a sentence again. | R1 §; blueprint §Gates |
| 13 | `edit src/** deny`, L29–31 | The partner does not code. A deny is not an ask: it cannot be approved away in the moment. | A late-night "just fix it" turns the producer into a second, unowned coder — the boundary this file exists to hold. | Blueprint §Agents (A03 owns code); brief |
| 14 | No `shell` rule (deliberate) | The global permission set already answers it (`ask`), plus the template's named publish denies. An agent-level `shell: * ask` would be the *last* match and would override those denies. | Publishing becomes one careless approval away — a direct R4 break. Silence is the strict setting here. | OpenCode docs (last match wins, global before agent); R4; E12 |
| 15 | No `read`/`webfetch`/`skill` rules | Defaults are already correct; a rule that restates the default adds a line and a maintenance point. | Nothing — but removing the *absence* by adding them would imply the defaults were unsafe, which the reviewer would then have to re-verify. | R6 (smallest fix); X02 (permissions deny-list) |
| 16 | No `model`, `steps`, `temperature` | Deployment choice, not a role property; the harness sets it. | Vendors a model into a portable role file and starts a second place to tune the same thing. | X03 (part portability); OpenCode docs |

## Body

| # | Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|---|
| 17 | L34 identity | One sentence fixes the role and both exclusions before any duty is read. | Every later line has to re-argue what the agent is; scope drifts to "helpful generalist". | Blueprint §Agents, A01 |
| 18 | L36–37 Language | The project is bilingual by design: the user reads Russian, artifacts are English, and five document types are Russian. | The agent drifts into English chat or translates an English artifact into Russian, breaking D02/D03/D06. | Blueprint §Documents; rubric §6 |
| 19 | L39–40 read order | State before memory: AGENTS → BRIEF → STATE → DECISIONS → BACKLOG → GAME/TASTE → systems. "STATE.md is the truth; the chat is not." | The agent answers from conversation, re-asks settled questions (R2 bug) and contradicts the record. | R2 §No repeats; blueprint §Memory; A1 |
| 20 | L43 STATE duty | Names the five fields and the trigger ("when one changes") and the reader (`/next`), so the file has a contract instead of a vibe. | STATE becomes a diary; `/next` and the next agent get nothing actionable. | Blueprint §Memory; D02 |
| 21 | L44 Questions | Restates only the operative constraints of R2: 3 per stage, one message, a recommendation and a reason, read first, repeat = bug, over budget decide/log/continue. | The agent turns into an interview or asks the same thing twice; E04 fails. | R2 §Budget, §No repeats |
| 22 | L45 Route | Assigns each class of work to its owner and says what a handoff carries (goal, files, constraint — not steps). | Work lands on whoever is nearest; the user becomes the router, and handoffs arrive as instructions the receiver cannot judge. | Blueprint §Agents; S1 |
| 23 | L46 Gates | G0–G3 with the one-line-plus-date form, the "not a gate" status of G0/G2.5, and "you never decide one". | The partner either invents a verdict or lets a gate pass undocumented; the human's authority is quietly transferred to the agent. | Blueprint §Gates; G4; S2 |
| 24 | L47 Claims | Three claim rules in one line: done needs an R1 artifact, docs follow working code, ideas go to BACKLOG with a cost. | "Done" becomes prose again, docs precede code, and scope grows without a record. | R1, R5, R9; blueprint §Documents |
| 25 | L48 Autonomy | R10's fields, the 30–60 min checkpoint into the log, the report, and "escalate instead of guessing". | An unattended run has no stop condition and no trail — the failure the contract exists to prevent. | R10 (pending); blueprint §Autonomy; S3; A1 |
| 26 | L49 Publish | Separates private actions (commit, tag, build) from publish actions and makes the latter wait for a named command. | The agent pushes, releases or spends on its own reading of "finish it". | R4; E12 |
| 27 | L52 "You coordinate." | The boundary in two words, placed after the duties so it reads as a constraint on them. | The paragraph becomes a list of peers with no owner, and the partner starts deciding design. | Blueprint §Agents; brief |
| 28 | L52 role split + R7 | Names who owns mechanics/UX, code and judgement, and that A04 speaks only after divergence closes. | The partner reviews its own work, or the critic kills ideas before the set exists (the R7 failure). | Blueprint §Agents, A04; R7; S1 |
| 29 | L52 no standing council | A crew forms for one task and disbands. | The default becomes a permanent panel — an explicit blueprint non-goal, and a cost with no exit. | Blueprint §Non-goals, §Crews; A2 |
| 30 | L52 user absent | With no R10 contract and no user, the correct action is stop and report. | The agent guesses, spends, or publishes in an empty room. | R4 (absent user); R10 |
| 31 | L54–55 Report | Five slots, one screen: working + evidence path, blocked, questions n/3, next action, gate state. | Reports become narratives that hide the blocker; the user cannot act on them in under a minute. | G1 (objective → solution → how tested); brief |

## Deliberate omissions

| Omitted | Why | Where it lives instead |
|---|---|---|
| Pipeline stages and the workflow diagram | The partner reads STATE for the phase. Copying the diagram makes a second source of truth that silently ages. | Blueprint §Workflow; STATE.md |
| The question string `Q1/3 — …` and the worth-asking list | Format and thresholds are R2's; a copy here drifts on the first edit. | R2 |
| Gate criteria (nine-point DoD, keep/kill/retune) | The agent *runs* a gate, it does not define one. | Blueprint §Gates; skill G1–G3 |
| Publish deny-list (`git push`, `gh release`) | Template and global config already deny them; restating invites a partial list. | `opencode.json`; R4 |
| `tests/**` deny | Not requested, and A03 owns tests; the broad `ask` already covers an accidental write. | R6 (add only after failure) |
| Rule bodies R8/R9/R10 | Still `pending` in BUILD-PLAN; the artifact references the IDs so acceptance order cannot invert. | BUILD-PLAN; R8–R10 |

## Brief coverage

| Requirement (A01 brief) | Line |
|---|---|
| description = producer and dialogue owner | 2 |
| `mode: primary` | 3 |
| V2 array permissions, `subagent` allowed | 4–7 |
| broad `edit` ask + the six allowed paths + `src/**` deny | 8–31 |
| global `shell` ask kept, publish not widened | 14 (absence) |
| identity; language; read order | 34, 37, 40 |
| STATE current; R2 budget; routing A02/A03/A04/S01 | 43, 44, 45 |
| G0/G1/G2/G2.5/G3, one line + date, human decides | 46 |
| R1 evidence; R5 docs after code; R9 backlog | 47 |
| R10 contract, checkpoints, log, report, escalation | 48 |
| never publish (R4) | 49 |
| coordinates, no design/code, no council, R7, absent user | 52 |
| report format | 55 |

Size: 637.8 tokens by chars/4 (limit 700, target 600–660); 540.0 by words×1.35.
