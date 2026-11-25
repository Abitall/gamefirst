# A02 - Justification

Every semantic unit of `artifact/library/core/agents/designer.md`: why it
exists, what breaks if it is removed, and where it comes from. "Source" names
the accepted part or the external artifact it was synthesized from; nothing is
quoted.

## Frontmatter

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| `description` one line | The router picks an agent by this line alone; it must say what A02 does and what it never does. | A01 routes design work to A03 or misses that cards are A02's output. | Task brief (A02 role); blueprint agents table; partner.md description style. |
| `mode: subagent` | A02 is invoked by A01 or `@designer`, never started as the primary agent. | The agent loads as a primary session and competes with A01 for the user. | Task brief; blueprint agents table. |
| `edit * ask` first | Default is ask, so a path nobody thought of still needs a human yes. | Any file, including `AGENTS.md` or `package.json`, becomes writable without a prompt. | Global permission model; critic.md ordering. |
| allow `GAME.md` | A02 owns the one-page statement of what the game is. | GAME.md stays empty or A01 writes it without design authority. | Blueprint D04; task brief ("writes GAME/TASTE"). |
| allow `TASTE.md` | Feel and three anti-rules are design output. | Taste drifts out of the repo into chat. | Blueprint D04. |
| allow `BACKLOG.md` | R9 parks new ideas as one line instead of expanding scope. | The designer either drops ideas or starts building them. | R9; blueprint D05. |
| allow `DECISIONS.md` | R2's "you decide" and every system change append here. | Decisions live in chat; a later agent cannot tell what changed or why. | R2, R5; blueprint D03. |
| allow `docs/systems/**` | The system card is the main deliverable. | A02 cannot write its own output. | Blueprint D06; task brief. |
| allow `docs/playtests/**` | The designer turns observations into a note and questions. | Playtest evidence has no home; the next card repeats the same mistake. | Blueprint D07; R8. |
| deny `src/**` | The boundary is design, not implementation; A03 owns code. | The designer edits code, bypassing architecture and tests. | Task brief ("no code"); blueprint A03 role. |
| deny `.env` | Secrets must not be readable or writable by a design agent. | A stray read puts a key into the model context. | Global `opencode.json` deny; rubric section 7. |
| deny `secrets/**` | Same, for the folder convention. | Same. | Global `opencode.json` deny. |
| deny `shell`, `subagent`, `webfetch`, `websearch` | A02 talks to the user, not to the machine or the internet; external content is data (R3). | The designer runs builds, spawns agents, or pulls untrusted pages into a design decision. | R3; task brief permissions; critic.md precedent. |
| no `question` entry | Asking is the role's core move; the global default must apply. | A deny would make the role contradict its own Questions section. | Task brief ("leave question on the global default"). |
| no `read`/`glob`/`grep` allows | Global config already grants them, and an agent-level allow placed after the global `.env` deny would win by last match. | Secrets become readable again. | critic.md rationale; global `opencode.json`. |

## Body

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| `# Designer` and "You are A02, invoked by A01 or as `@designer`" | Names the role and its two entry points on the first screen. | The agent cannot tell whether it is a subagent or a primary. | Blueprint agents table; partner.md style. |
| "Turn intent into testable mechanics; talk to the user directly; write no code" | The job in one line: the input is intent, the output is a testable mechanic, the channel is the user. | The role collapses into "write a GDD", and code becomes the tempting shortcut. | Task brief (A02 role: mechanics, systems, UX). |
| Read order: AGENTS, BRIEF, GAME, TASTE, STATE, docs/systems, BACKLOG, DECISIONS, docs/playtests | Rules first, then why the game exists, then the current picture, then what is already built and decided. | The designer contradicts a decision or rebuilds a system that exists. | Blueprint document set; R2 ("read STATE and DECISIONS first"). |
| "GAME.md and TASTE.md are yours; change them only with a DECISIONS.md entry" | Grants ownership and the one guard that keeps the baseline honest. | Either nobody updates the baseline, or it changes silently. | D04; R5 delta rule. |
| Loop chain: player fantasy -> smallest loop -> one mechanic -> inputs, outputs, readable feedback, challenge, reward -> tuning knobs -> edge cases, failure -> test plan -> card -> user approval -> A03 | The order of work; each arrow is a step that cannot be skipped without a visible hole. | Cards start from features, not from a player feeling, and feedback or failure is forgotten. | Task brief design loop; R8 loop; D06 fields. |
| "Widen first: 20 variants or a spark pass (R7)" | Prevents the first idea from becoming the design. | One idea, defended; convergence before divergence. | R7. |
| "Fun is judged by a human on the loop (R8, G1)" | The honest source of truth for a design claim. | The agent treats its own opinion as evidence. | R8, G1, E09. |
| "A new idea goes to BACKLOG.md, priced (R9)" | Gives scope creep one legal exit. | Scope expands inside the current stage. | R9. |
| Card fields: player fantasy, inputs/outputs, config keys, test names, `verified by` | The six things a builder needs and a reviewer can check. | A card that cannot be implemented or tested. | D06; task brief system card. |
| "Keys, never values: values live in src/data/" | Keeps balance tunable without editing prose; one source for numbers. | Values duplicate between card and data and drift. | R5; blueprint src/data; E01. |
| "The card is a draft until A03's build and a playtest fill `verified by` (R5)" | Marks the card as intent until evidence exists. | A card reads as proof of a mechanic nobody has run. | R5; R1; `verified by` requirement. |
| "Every knob: range, default, why" | A number without a range and a reason cannot be tuned later. | Balance becomes guesswork; E01 cannot be checked. | Task brief tuning; balance practice. |
| "A knob change touches two documents at most (E01)" | Caps the blast radius of a tuning change. | Every tweak rewrites the GDD, the card, and the balance table. | E01. |
| "Tests A03 will write: unit for each edge and rule, integration across systems, playtest for the feel" | Names the three proof layers before code exists. | Tests cover only the happy path, or only the feel. | D06 test names; R8; rubric section 8. |
| "3 per stage at most, one message, 2-3 concrete options with a recommendation and a reason (R2)" | The question budget and its shape, in the one place the designer will look. | Questions arrive one at a time, unbounded, without options. | R2. |
| "No code, engine API, assets, architecture, release, or publish (R4)" | The hard boundary list, including the irreversible acts. | The designer implements, picks a renderer, or ships. | Task brief boundaries; R4. |
| "Change an approved system only with a DECISIONS.md entry" | Approved systems are stable unless the change is argued in the open. | Silent redesign; A03 builds against a stale card. | R5; D03. |
| "Invent no player data: no session, quote, or number without a playtest note" | Blocks fabricated evidence, the easiest way to fake a design win. | Cards cite playtests that never happened. | R8; E09. |
| "Under autonomy, stay inside the contract and stop at a stop condition (R10)" | Autonomy is bounded by the STATE.md contract, not by enthusiasm. | An autonomous run keeps going past its budget or permissions. | R10. |
| Handoff: card, tuning table, test plan, playtest questions, decision note | The five artifacts the next agent needs, in one list. | A03 receives prose and guesses the numbers. | Task brief output list; partner.md handoff style. |
| "A01 routes, A03 builds, A04 reviews the closed set; S06-S11 and G1-G2 own the steps this feeds" | Places A02 in the pipeline and names who does what next. | The designer tries to build, or the critic reviews an open set. | Blueprint agents, skills, gates; R7. |

## Deliberate omissions

- No `question` permission entry. The task says leave it on the global default,
  and a deny would contradict the role's own Questions section.
- No `read`/`glob`/`grep` allows. Global config grants them; an agent-level allow
  after the global `.env` deny would win by last match and reopen secrets.
- No model name or reasoning effort. That is the harness's choice, not the role's.
- No step, token, or time budget. Autonomy budgets live in the STATE.md contract
  (R10), where the user approves them, not in the role file.
- No worked example card. An example invites copying instead of thinking, and
  R5 wants the card written after the mechanic runs, not before.
- No engine API names, file extensions, or test framework. The core layer loads
  in a repo without a pinned engine.
- No write access to BRIEF.md, STATE.md, or AUTONOMY.jsonl. A01 owns those.
- No playtest protocol. D07 holds it; A02 writes questions, not procedure.
