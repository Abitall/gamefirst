# gamefirst — v0.1 Schema

**Status:** fixed for adversarial review, 2026-11-25
**Owner:** solo developer
**Scope:** framework, not a game

## 1. Purpose

gamefirst is a game-first, stepwise development framework for a solo developer. It exists to make playable builds, not documents. It replaces studio simulation (dozens of agents, gates, and templates) with a small set of rules, skills, and roles that load only when needed.

## 2. Principles

1. **Game first.** A playable build is the primary artifact. Documentation follows working mechanics.
2. **Code before docs.** Do not document intentions as if they were decisions.
3. **One page.** Prefer a delta over a rewrite. If a change touches more than two documents, split the system.
4. **One fact, one place.** No duplicated specs, no shadow docs.
5. **Ask within budget.** At most three questions per step, each with a recommendation. Stop when a decision is expensive to reverse, paths differ materially, data is missing, or the request conflicts with an approved decision.
6. **Prove it.** "Done" means an artifact: test, build, screenshot, playtest note, log. Never weaken or fake a test.
7. **Reversible by default.** Destructive actions need confirmation or a backup. Commit, publish, delete, global install, and spending require explicit permission.
8. **Portable knowledge.** Rules, skills, and tools are project-independent. A solution worth keeping goes to the toolbox.
9. **Learn once.** A repeated mistake becomes a rule. A reusable solution becomes a tool. A stage ends with a five-line postmortem.
10. **Match ceremony to risk.** No gate without a decision. No document without a reader.

## 3. Three levels

| Level | What | Where | Lifetime |
|---|---|---|---|
| Framework | template, rules, skills, agents, tools | `gamefirst` | years |
| Memory | lessons, engine packs, toolbox | `game-agent-memory` (later) | across projects |
| Game | code, assets, GAME.md, playtests | `my-game` | project |

The framework is not a game. A game is always its own repository.

## 4. Repository topology

### v0.1 — one repository

```text
gamefirst/
  template/              # project skeleton copied into a new game
  library/               # portable agent knowledge
    core/
      rules/
      skills/
    game/
      skills/
    engines/
      phaser/
    toolbox/
  tools/
    new-project.mjs
    status.mjs
    docs-lint.mjs
  docs/
    SCHEMA.md
  examples/
```

`new-project` creates `../my-game/`, copies `template/` and the selected `library/` slice into `.agent/`, writes `agent.lock.json`, and initializes git. The game repository contains only what it needs.

### Target — two repositories (after the first demo)

```text
gamefirst/               # thin template + tools
game-agent-memory/       # library, toolbox, lessons
my-game/                 # game
```

No submodules. `sync-agent.mjs` pulls a pinned version into `.agent/` and writes `agent.lock.json`. `--contribute` copies a validated lesson or tool back to memory. The user reviews and commits.

**Why not split now:** there is nothing to put in memory yet; two repositories add sync and drift before the first game loop works.

## 5. Layers

| Layer | Count | Loaded | Purpose |
|---|---|---|---|
| Rules | 10 | always | non-negotiable behavior |
| Skills | 6 now, 13 target | on trigger | procedures and knowledge |
| Agents | 4 | on demand | roles with judgment |
| Crews | 3 later | temporary | task-scoped compositions |
| Modules | 3 core + 9 optional | installed | capabilities |

Every new skill or agent must answer a repeated failure that a rule or checklist did not catch. Each has a trigger, input, output, done criterion, and a test task. Unused items are deleted at review.

### 5.1 Rules (10)

1. **Language.** Russian to the user; English for agent artifacts and code.
2. **Honesty.** Label know / think / guess. Verify or ask. Never invent APIs, versions, prices, dates, or sources.
3. **Proof.** Done means an artifact. Never tamper with tests.
4. **Code before docs.** Document only what works.
5. **One page.** Delta over rewrite. More than two documents touched by one change is a design smell.
6. **Questions.** Max three per step, with a recommendation. Stop conditions apply.
7. **Scope guard.** One slice at a time. New ideas go to `BACKLOG.md`.
8. **Reversibility.** Destructive actions need confirmation or backup. Commit, publish, delete, global install, spend: explicit permission.
9. **Tools.** Use professional tools. If missing, ask with reason, alternatives, install path, and fallback.
10. **Learning.** Postmortem after each stage. Repeated mistake becomes a rule. Reusable solution becomes a tool.

### 5.2 Skills

**v0.1:**

- `brainstorm` — stress-test the idea, timebox, references, core loop, non-goals, kill criteria.
- `prototype` — one question, 1–2 days, throwaway, greybox, debug HUD, verdict.
- `gym` — isolated mechanic with live tuning, player test, lock or iterate.
- `verify` — build, types, unit formulas, E2E, screenshots, performance; evidence.
- `retrospect` — five-line postmortem; rule and tool proposals.
- `research` — web search, source evaluation, citations, confidence.

**Target:** `engine-choice`, `slice`, `content`, `polish`, `release`, `import`, `tool`.

### 5.3 Agents

- `partner` — default; owns the process, talks to the user, integrates results.
- `designer` — mechanics, economy, UX, fun critique.
- `engineer` — code, tests, performance, engine pack.
- `critic` — red team: scope, quality, weak points, anti-sycophancy.

Subagents do not talk to the user directly. They return to `partner`, which verifies and integrates.

### 5.4 Crews (later)

- `prototype-crew` — partner + engineer + critic; 1–2 days; keep/kill verdict.
- `slice-crew` — partner + designer + engineer + critic; vertical slice.
- `release-crew` — partner + engineer + QA + marketer; release candidate.

A crew is a temporary composition, not a permanent org chart.

### 5.5 Modules

**Core:** `core` (rules, modes, memory, tools), `game` (pipeline skills), `engine-phaser`.

**Optional:** `engine-unity`, `engine-godot`, `release`, `obsidian`, `art`, `audio`, `narrative`, `localization`, `marketing`.

## 6. Project layout

```text
my-game/
  AGENTS.md
  GAME.md
  STATE.md
  BACKLOG.md
  DECISIONS.md
  PLAYTEST.md
  NOTES.md
  .agent/
    rules/
    skills/
    agents/
    engine/
    manifest.json
  systems/
  prototypes/
  src/
  tests/
  assets/
  tools/
```

- `GAME.md` — one page: pitch, core loop, pillars, audience, references, non-goals.
- `STATE.md` — current stage, active task, next step, blockers.
- `BACKLOG.md` — ideas not in scope.
- `DECISIONS.md` — short decisions: date, context, choice, reason, alternatives.
- `PLAYTEST.md` — session notes, observations, verdict.
- `NOTES.md` — scratch before a decision is approved.
- `systems/` — one page per approved system: rules, formulas, edge cases, verified by.
- `.agent/` — synced rules, skills, agents, engine pack; never edited by hand.

## 7. Workflow

| # | Stage | Output | Gate |
|---|---|---|---|
| 0 | Setup | engine, project, baseline build | — |
| 1 | Brainstorm | GAME.md, core loop, references, non-goals | G0 go/revise |
| 2 | Engine choice | engine decision, version, spike notes | — |
| 3 | Prototype | throwaway build, playtest, verdict | G1 keep/kill/retune |
| 4 | Mechanics / systems / UI / visual | gyms, approved system cards, vertical slice | G2 proceed/fix/pivot |
| 5 | Content | content budget, cut list, full game | — |
| 6 | Polish | performance, accessibility, bug triage | — |
| 7 | Release | platform builds, store assets, promo | G3 ship/hold |

**Gate verdicts are one line plus a date.** No PASS/CONCERNS/FAIL paperwork.

- **G0:** go / revise — is the core loop worth prototyping?
- **G1:** keep / kill / retune — did the prototype answer its question?
- **G2:** proceed / fix / pivot — is the vertical slice a game?
- **G3:** ship / hold — is the release ready?

## 8. Modes

| Mode | Trigger | Behavior | Stop |
|---|---|---|---|
| `paired` | default | asks, proposes, writes after approval | before irreversible steps |
| `autonomous` | user says "work on your own" | acts within a contract, logs decisions | gate, checkpoint, stop condition |
| `review` | "critique only" | reviews, does not edit | after report |
| `discuss` | "no code yet" | researches, asks, sketches | user command |

**Autonomous contract:** goal, constraints, done criteria, allowed actions, stop conditions, budget. Write it to `AUTONOMY.md` before starting. Checkpoint after each slice or 30–60 minutes. Hard limits: no commit, publish, delete, global install, spend, or account access without permission. Return a one-page report: done, evidence, decisions, open questions, next options.

## 9. Documentation model

| Audience | Language | Files | Rule |
|---|---|---|---|
| User | Russian | GAME.md, BACKLOG.md, DECISIONS.md, PLAYTEST.md, README.md, docs/guide/ | short, decision-oriented |
| Agent | English | STATE.md, systems/*.md, docs/engine/*.md, docs/tools/*.md, NOTES.md | one page, operational |
| Code | English | source, tests, comments | self-documenting |

- One fact, one place.
- Document after approval, not before.
- `docs-lint` checks page limits, internal links, and "verified by".
- A change touching more than two documents triggers a split review.

## 10. Memory and sync (target)

**Goes to memory:** rules, skills, engine lessons, toolbox, patterns, crews, packs.

**Does not:** game docs, code, assets, playtest data, secrets, unvalidated ideas.

`sync-agent` pulls a pinned version into `.agent/` and writes `agent.lock.json`. `--contribute` copies a validated item back. The user reviews and commits. No submodules.

## 11. Engine packs

Each pack contains:

```text
manifest.json
rules.md
setup.md
pitfalls.md
test-recipes.md
templates/
```

The pack is pinned to an engine version. APIs are verified against the pinned reference; no invented APIs. Phaser 4.2.1 is the first pack. Unity and Godot follow the same contract.

## 12. MVP increments

**v0.1 — skeleton.** Schema, template, 10 rules, 4 agents, 6 skills, `new-project`, `status`, `docs-lint`, hello-world Phaser build. Validate on itself.

**v0.2 — demo loop.** One small game; brainstorm → prototype → gym → playtest → system card → retro. Add `slice`, `engine-choice`, `content`, `polish`.

**v0.3 — portability.** Extract `game-agent-memory`, add `sync-agent`, Unity/Godot stubs, `release` pack, `obsidian` pack.

**Non-goals for v0.1:** release pack, art/audio/narrative/localization/analytics, 20 templates, 50 agents, web UI, database, cloud.

## 13. Success metrics

- Time to first playable prototype.
- Repeated mistakes across projects.
- Documents the user must read.
- Questions per stage (should decrease).
- Skills/agents actually used (unused ones deleted).
- Time to add a new engine.

## 14. Deferred decisions

- Extract memory after the first demo, not now.
- Release is a module on demand.
- Second engine after the Phaser demo.
- Obsidian export is optional.
- Crews after the solo loop works.
