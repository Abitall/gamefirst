# SKELETON — report

**Part**: SKELETON — the baseline game project that `new-project` copies.
**Status**: ready for review.
**Artifact**: `artifact/template/` mirrors `template/` 1:1; its contents copy in
place, no renames.

## Summary

Configuration and empty structure only. No rules, skills, agents, commands,
evals, game logic or engine code — those are other parts. Twenty paths: five
files and fifteen `.gitkeep`. `AGENTS.md` is the project-level instruction file;
`opencode.json` carries the permission baseline and the rules glob; the rest is
repo hygiene and directory placeholders.

## Naming

`{{GAME_NAME}}` is the only placeholder, on line 1 of `AGENTS.md` and
`README.md`. `new-project` (CLI01) substitutes it and changes no other byte. It
appears in prose titles only, never in code, paths or config, so a missed
substitution cannot break a build — it is caught by `grep "{{"`.

## Size

| File | Bytes | Note |
|---|---|---|
| `AGENTS.md` | 1,722 | 259 words, ≈350–430 tokens; agent limit 700 |
| `opencode.json` | 2,279 | 3 top-level keys, 31 permission rules |
| `README.md` | 1,239 | one page |
| `.gitignore` | 502 | 14 rules |
| `.gitattributes` | 372 | 17 rules |
| 15 × `.gitkeep` | 0 | empty |
| **Total** | **6,114** | 20 paths |

## Checks run

- `opencode.json` parses as JSON; keys are `$schema`, `instructions`,
  `permissions` as documented for OpenCode v2.
- All 20 required paths exist under `artifact/template/`.
- Every file is UTF-8 without BOM, LF line endings; no non-ASCII bytes.
- `read` on `*.env` is denied and `*.env.example` allowed; no secrets anywhere.
- `git status --short -- template` is empty: the shipped tree is untouched.
- File list matches `docs/BUILD-PLAN.md` batch 1, minus `VERSION` (decided: the
  game version lives in `agent.lock.json`, written by CLI01).

## Assembly decisions

1. **No `VERSION` file.** The game repo version lives in `agent.lock.json`.
2. **`dist-play/` stays**, as local playtest build output, and stays ignored.
3. **Engine packs append their build/test commands** to the `opencode.json`
   allow-list at install time — N00's contract, not a skeleton change.
4. **`evidence/` stays tracked**; LFS is deferred until binary evidence
   outgrows git.

## Open questions

1. **Rules load path.** `.opencode/rules/` is not an OpenCode-native directory;
   `instructions: [".opencode/rules/*.md"]` is what loads it. If the rules part
   ships YAML frontmatter, `instructions` will include that frontmatter as text
   in context. Settle the rule file format before the rules land (owner: rules
   part / E03).
2. **Post-copy placeholder check.** CLI01 should assert that no `{{` survives
   substitution — one line, catches both titles. Recommended, not yet in the
   CLI spec.

## Known weaknesses

- **31 permission rules** outweigh the rest of the config. Deliberate: a shell
  allow-list is what keeps autonomous mode from asking on every `git status`.
  It cannot be shortened without assuming one platform's shell.
- **No build or test command** in the allow-list, so the first build in a new
  project prompts once. The alternative — guessing an engine — is worse.
- **Structurally validated, not executed.** There is no game to run the config
  against; the risk is permission semantics, checked against the V2 docs rather
  than inferred.
- **Two titles, one placeholder.** A CLI that substitutes only `AGENTS.md`
  leaves `README.md` generic; open question 2 covers the check.

## Rubric self-check

| # | Section | Result |
|---|---|---|
| 1 | Necessity | Every path is required by the part brief or the blueprint tree; nothing decorative. |
| 2 | Function | Each file has one job: instruct the agent, gate tools, ignore build output, or hold a directory. |
| 3 | Evidence | 9 sources, 4 gamedev / 3 software / 2 AI-agent, in `SOURCES.md`. |
| 4 | Blueprint fit | Matches the game-repo tree; `VERSION` and `dist-play` resolved by assembly decision. |
| 5 | Size | `AGENTS.md` ≈350–430 tokens of 700; `README.md` one page; no doc over one page. |
| 6 | Language + encoding | English, UTF-8 no BOM, LF, Windows-safe paths. |
| 7 | Security | No secrets; env reads denied; destructive shell denied; publish denied. |
| 8 | Testability | JSON parses, 20 paths checked, placeholder greppable. |
| 9 | Integration | `.opencode/` auto-discovered dirs match; rules via `instructions`; existing `template/` dirs line up one-to-one. |

## Review

_Pending reviewer verdict._
