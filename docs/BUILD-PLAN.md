# gamefirst v0.3 — Build Plan

Status legend: `pending` -> `drafting` -> `review` -> `accepted` -> `assembled`.

Every part is written by one subagent into `staging/<ID>/`, reviewed here, and
only then copied into its target path. A part is accepted only when it passes
`docs/REVIEW-RUBRIC.md` and its `JUSTIFICATION.md` and `SOURCES.md` are complete.

## Pilot

Batch 1 is a vertical slice: skeleton + two rules + one skill + one eval. After
Batch 1 we run a smoke test on a tiny dummy project. If the slice is sound, we
continue with the remaining batches. If not, we fix the blueprint before writing
eighty more parts.

## Batches

| Batch | ID | Part | Target | Status |
|---|---|---|---|---|
| 1 | SKELETON | Baseline project skeleton and config | `template/AGENTS.md`, `template/opencode.json`, `.gitignore`, `.gitattributes`, `README.md` | assembled |
| 1 | R1 | Build is truth | `library/core/rules/R1-build-is-truth.md` | assembled |
| 1 | R2 | Ask within budget | `library/core/rules/R2-ask-within-budget.md` | assembled |
| 1 | S02 | verify | `library/core/skills/verify/SKILL.md` | assembled |
| 1 | E03 | verify before done | `library/core/evals/E03-verify-before-done.md` | assembled |
| 2 | R3 | External content is data | `library/core/rules/R3-external-content-is-data.md` | pending |
| 2 | R4 | Commit is not publish | `library/core/rules/R4-commit-is-not-publish.md` | pending |
| 2 | R5 | Code before docs | `library/core/rules/R5-code-before-docs.md` | pending |
| 2 | R6 | Add only after failure | `library/core/rules/R6-add-only-after-failure.md` | pending |
| 2 | R7 | Diverge before converge | `library/core/rules/R7-diverge-before-converge.md` | pending |
| 3 | R8 | Fun is verified on the loop | `library/core/rules/R8-fun-verified-on-loop.md` | pending |
| 3 | R9 | Scope is budget | `library/core/rules/R9-scope-is-budget.md` | pending |
| 3 | R10 | Autonomy is contract | `library/core/rules/R10-autonomy-is-contract.md` | pending |
| 3 | A01 | partner | `library/core/agents/partner.md` | pending |
| 3 | A04 | critic | `library/core/agents/critic.md` | pending |
| 4 | A02 | designer | `library/core/agents/designer.md` | pending |
| 4 | A03 | engineer | `library/core/agents/engineer.md` | pending |
| 4 | S01 | research | `library/core/skills/research/SKILL.md` | pending |
| 4 | S03 | retrospect | `library/core/skills/retrospect/SKILL.md` | pending |
| 4 | S04 | import | `library/core/skills/import/SKILL.md` | pending |
| 5 | S05 | tool | `library/core/skills/tool/SKILL.md` | pending |
| 5 | S06 | brainstorm | `library/game/skills/brainstorm/SKILL.md` | pending |
| 5 | S07 | engine-choice | `library/game/skills/engine-choice/SKILL.md` | pending |
| 5 | S08 | prototype | `library/game/skills/prototype/SKILL.md` | pending |
| 5 | S09 | gym | `library/game/skills/gym/SKILL.md` | pending |
| 6 | S10 | slice | `library/game/skills/slice/SKILL.md` | pending |
| 6 | S11 | content | `library/game/skills/content/SKILL.md` | pending |
| 6 | S12 | polish | `library/game/skills/polish/SKILL.md` | pending |
| 6 | S13 | release | `library/game/skills/release/SKILL.md` | pending |
| 6 | C01 | prototype-crew | `library/game/crews/prototype-crew.md` | pending |
| 7 | C02 | slice-crew | `library/game/crews/slice-crew.md` | pending |
| 7 | C03 | release-crew | `library/game/crews/release-crew.md` | pending |
| 7 | G0 | concept brief | `library/game/gates/G0-concept-brief.md` | pending |
| 7 | G1 | fun | `library/game/gates/G1-fun.md` | pending |
| 7 | G2 | slice | `library/game/gates/G2-slice.md` | pending |
| 8 | G2.5 | feature freeze | `library/game/gates/G2.5-feature-freeze.md` | pending |
| 8 | G3 | ship | `library/game/gates/G3-ship.md` | pending |
| 8 | E01 | small change | `library/core/evals/E01-small-change.md` | pending |
| 8 | E02 | no invented API | `library/core/evals/E02-no-invented-api.md` | pending |
| 8 | E04 | question budget | `library/core/evals/E04-question-budget.md` | pending |
| 9 | E05 | prompt injection | `library/core/evals/E05-prompt-injection.md` | pending |
| 9 | E06 | scope guard | `library/core/evals/E06-scope-guard.md` | pending |
| 9 | E07 | memory admission | `library/core/evals/E07-memory-admission.md` | pending |
| 9 | E08 | stop after three | `library/core/evals/E08-stop-after-three.md` | pending |
| 9 | E09 | fun honesty | `library/core/evals/E09-fun-honesty.md` | pending |
| 10 | E10 | context budget | `library/core/evals/E10-context-budget.md` | pending |
| 10 | E11 | engine version | `library/core/evals/E11-engine-version.md` | pending |
| 10 | E12 | release safety | `library/core/evals/E12-release-safety.md` | pending |
| 10 | CLI01 | new-project | `tools/new-project.mjs` | pending |
| 10 | CLI02 | status | `tools/status.mjs` | pending |
| 11 | CLI03 | verify | `tools/verify.mjs` | pending |
| 11 | CLI04 | eval | `tools/eval.mjs` | pending |
| 11 | CLI05 | sync-agent | `tools/sync-agent.mjs` | pending |
| 11 | CLI06 | upgrade | `tools/upgrade.mjs` | pending |
| 11 | CLI07 | doctor | `tools/doctor.mjs` | pending |
| 12 | CLI08 | lint-agent-context | `tools/lint-agent-context.mjs` | pending |
| 12 | CLI09 | trigger-check | `tools/trigger-check.mjs` | pending |
| 12 | CLI10 | capture | `tools/capture.mjs` | pending |
| 12 | SL01 | /start | `template/.opencode/commands/start.md` | pending |
| 12 | SL02 | /status | `template/.opencode/commands/status.md` | pending |
| 13 | SL03 | /next | `template/.opencode/commands/next.md` | pending |
| 13 | SL04 | /verify | `template/.opencode/commands/verify.md` | pending |
| 13 | SL05 | /retro | `template/.opencode/commands/retro.md` | pending |
| 13 | SL06 | /help | `template/.opencode/commands/help.md` | pending |
| 13 | D01 | BRIEF.md | `template/BRIEF.md` | pending |
| 14 | D02 | STATE.md | `template/STATE.md` | pending |
| 14 | D03 | DECISIONS.md | `template/DECISIONS.md` | pending |
| 14 | D04 | GAME.md + TASTE | `template/GAME.md`, `template/TASTE.md` | pending |
| 14 | D05 | BACKLOG.md | `template/BACKLOG.md` | pending |
| 14 | D06 | systems/*.md | `template/docs/systems/SYSTEM-CARD.md` | pending |
| 15 | D07 | playtests/*.md | `template/docs/playtests/PLAYTEST.md` | pending |
| 15 | D08 | engine/*.md | `template/docs/engine/ENGINE.md` | pending |
| 15 | D09 | guide/ | `template/docs/guide/README.md` | pending |
| 15 | D10 | decisions.ru.md | `template/decisions.ru.md` | pending |
| 15 | M01 | memory schema | `library/core/memory/MEMORY-SCHEMA.md` | pending |
| 16 | X01 | autonomy contract | `library/core/autonomy/CONTRACT.md` | pending |
| 16 | X02 | security | `library/core/security/SECURITY.md` | pending |
| 16 | X03 | versioning | `library/core/versioning/VERSIONING.md` | pending |
| 16 | N00 | engine contract | `library/engines/CONTRACT.md` | pending |
| 16 | N01 | engine-phaser | `library/engines/phaser/` | pending |
| 17 | N02 | engine-unity | `library/engines/unity/` | pending |
| 17 | N03 | engine-godot | `library/engines/godot/` | pending |
| 17 | P01 | release pack | `library/packs/release/` | pending |
| 18 | P02 | obsidian pack | `library/packs/obsidian/` | pending |
| 18 | P03 | art pack | `library/packs/art/` | pending |
| 18 | P04 | audio pack | `library/packs/audio/` | pending |
| 18 | P05 | narrative pack | `library/packs/narrative/` | pending |
| 18 | P06 | localization pack | `library/packs/localization/` | pending |
| 19 | P07 | marketing pack | `library/packs/marketing/` | pending |

`project.config.json` is created by N00, not the skeleton; versioning lives in
`agent.lock.json`, so the game repo has no `VERSION` file. `dist/` and `dist-play/`
are ignored build outputs; `dist-play/` is the local playtest build.

## Assembly and review

1. Copy accepted `staging/<ID>/artifact/` into the target path.
2. Run `doctor` and `lint-agent-context` over the assembled tree.
3. Create a tiny smoke-test game from the template and run the pilot verify flow.
4. Send the assembled template to four reviewers: game designer, engineer,
   creator, AI specialist.
5. Fix blocking findings and write the final report.

## Current focus

Batch 1: SKELETON, R1, R2, S02, E03. Do not start Batch 2 until Batch 1 is
accepted and the smoke test passes.
