# R2 — Sources

Nine repositories: 4 gamedev, 3 software-development, 2 AI-agent workflow.
Stars are approximate, read from the shields.io badge endpoint on 2026-11-25.
No code, text, or license was copied; every borrowing below is a paraphrased
idea, restated for this rule.

## Gamedev (4)

| # | Repository | Stars | Artifact | Analogous because | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [Donchitos/Claude-Code-Game-Studios](https://github.com/Donchitos/Claude-Code-Game-Studios) | 41k | `prototype` skill, `references/one-shot-1-card.md`, `.claude/docs/automation-modes.md` | A game-making flow that asks a bounded round of questions, then builds; defines collaborative/guided/autonomous asking modes. | One round in one message; each question carries a marked default; "you pick" is a valid answer; autonomous mode asks nothing and treats defaults as provisional; a skipped question is not an answer. | About eight questions per round; genre-chipset machinery; the 49-agent studio structure. Three is the blueprint's number, and a prototype should start sooner. |
| 2 | [gamedev-skills/awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | 11k | `skills/workflows/prototype-fast/SKILL.md` | A game-dev workflow skill that bounds a prototype to a single question and a keep/kill/retune decision. | "Two questions means two prototypes": one prototype answers one question; the brief and the timebox are set before building. | The one-hour timebox as a universal target; the wider 79-skill catalogue is out of scope for R2. |
| 3 | [Roobyx/awesome-game-design](https://github.com/Roobyx/awesome-game-design) | 723 | Curated index of design material (player psychology, game feel, UX, systems and economy, narrative, postmortems) | Shows the design domains a brief can leave blank, i.e. where a taste question is legitimate and where a reference already exists. | The domain list behind the "taste" category: feel, look, difficulty, audience. | Treating reading lists as a substitute for a decision; the index is not a questionnaire and was not used as one. |
| 4 | [LazyHatGuy/GDDMarkdownTemplate](https://github.com/LazyHatGuy/GDDMarkdownTemplate) | 64 | Markdown GDD template with a section TOC (game concept, genre, audience, game flow, look and feel, project scope) | The smallest published structure that separates what a brief must settle from what can wait for production. | The short "overview" subset as the scope question; the rest is explicitly deferred. | The full GDD sections (movement, objects, missions, budget) as pre-prototype questions — that is the interrogation R2 exists to prevent. |

Gamedev popularity note: interview scripts and design questionnaires in this
field live mostly in blog posts and Google Docs, so the repositories that
contain them are small. The two large entries are agent-workflow projects; the
two documentation entries are included because their artifacts are exactly the
kind R2 must bound. This is a known weakness, recorded in `REPORT.md`.

## Software development (3)

| # | Repository | Stars | Artifact | Analogous because | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [github/spec-kit](https://github.com/github/spec-kit) | 151k | `templates/commands/clarify.md` (clarification policy) | A written policy for asking a bounded number of questions before implementation. | Maximum queue; ask only what materially affects the build; exclude already-answered and trivial questions; multiple-choice answers; a visible marker when the answer is missing. | Five questions and strict one-at-a-time delivery — slower than R2 allows and designed for spec authoring, not for a prototype. |
| 6 | [Fission-AI/OpenSpec](https://github.com/Fission-AI/OpenSpec) | 76k | Explore → propose workflow (`/openspec-explore`, `/openspec-propose`) producing proposal, specs, design, tasks | Separates exploring an idea from proposing a scoped change, and makes scope the explicit confirmation. | Propose a path with a recommendation, then ask one scope question; write the result down before building. | Proposal, spec, design, and task artifacts before a one-day prototype — that is documentation ahead of code (R5). |
| 7 | [adr/madr](https://github.com/adr/madr) | 2.7k | `template/adr-template-minimal.md` (Context, Considered Options, Decision Outcome) | The minimal record of a decision made without the user, which is exactly what "you decide" produces. | The four fields written to `DECISIONS.md`: date, decision, why, alternatives. | One ADR file per decision; R2 records a line, not a document. |

## AI-agent workflow (2)

| # | Repository | Stars | Artifact | Analogous because | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [obra/superpowers](https://github.com/obra/superpowers) | 326k | `skills/brainstorming/SKILL.md` (ask-vs-act policy for coding agents) | Defines when an agent may ask at all, and forbids asking what the repository already answers. | "Look before you ask"; ask only when the answer would change what gets built; open question in the user's own terms when the goal itself is unclear. | One-question-at-a-time and the long convergence to a design document; R2 batches and stops at three. |
| 9 | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | 31k | `docs/human_in_the_loop.md` (tool approval, interruptions) | The clearest published rule for stopping a run only at sensitive actions, and failing closed when the situation cannot be inspected. | Ask only at irreversible or sensitive actions; when in doubt, stop rather than guess; resume with the answer. | Per-tool `needs_approval` configuration; R2 uses one fixed stop list inherited from R10. |

## Split

| Category | Sources |
|---|---|
| Gamedev | 1, 2, 3, 4 |
| Software development | 5, 6, 7 |
| AI-agent workflow | 8, 9 |

## Dead ends

- Searches for playtest interview and playtest script templates returned three
  repositories, all with zero stars and empty descriptions; no artifact to read.
- "Game design questionnaire" queries were dominated by awesome-lists, hiring
  question banks, and unrelated projects; the two GDD results that did contain a
  question list are sources 3 and 4.
- One human-in-the-loop framework's current release had replaced its
  always/terminate/never mode enum with input callbacks, so its ask policy could
  no longer be read from the artifact; replaced by source 9.
- A graph-framework human-in-the-loop documentation page redirected and returned
  no body from this network; dropped rather than cited unread.
- The full MADR template was rejected in favour of the minimal one: the optional
  sections describe a document, and R2 needs a line.

## Method

Each artifact was read directly (raw file or rendered documentation) before it
was cited; no summary site was used. Stars are rounded and move daily. The same
repository is used for one purpose only, and every borrow above is restated in
R2's own words.
