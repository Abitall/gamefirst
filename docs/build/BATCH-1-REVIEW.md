# Batch 1 review — pilot vertical slice

Date: 2026-11-25
Verdict: **PASS** (one skeleton revision, four follow-up fixes, smoke test green)

Batch 1 tested the production process, not the whole framework: one skeleton, two
rules, one skill, one eval. The slice is sound enough to continue. The pilot
also showed where the process is slow: subagents hit step limits, so each part
needs a review-and-finish round, and the first smoke test used the wrong
permission shape until the V2 docs were checked.

## Accepted parts

| Part | Artifact | Size | Sources | Rounds | Verdict |
|---|---|---|---|---|---|
| SKELETON | `template/` (20 paths) | 6,114 B; `AGENTS.md` 430.5 tok | 9 (4/3/2) | 2 | accepted |
| R1 | `library/core/rules/R1-build-is-truth.md` | 576 tok | 9 (4/3/2) | 2 | accepted |
| R2 | `library/core/rules/R2-ask-within-budget.md` | 517.25 tok | 9 (4/3/2) | 2 | accepted |
| S02 | `library/core/skills/verify/SKILL.md` | 770.5 tok | 9 (4/3/2) | 2 | accepted |
| E03 | `library/core/evals/E03-verify-before-done.md` | 475.25 tok | 9 (4/3/2) | 1 | accepted |

All artifacts are UTF-8 without BOM, LF, no replacement characters. `AGENTS.md`
and `README.md` carry the only placeholder, `{{GAME_NAME}}`; `new-project` must
replace both and assert that no `{{` survives.

## What the review changed

- **SKELETON, round 2.** Added three native Windows recursive-delete denies
  (`rmdir /s *`, `rd /s *`, `del /s *`). `* -Recurse *` covers PowerShell only;
  the native commands were an unguarded path. Permission count 28 -> 31.
- **R1, round 2.** Exception can only be granted by the user or partner, never
  by the agent itself; throwaway prototypes keep the capture and run log but may
  discard the build; release evidence needs a clean OS profile or container, not
  a second machine.
- **R2, round 2.** Gate budget is separate from stage budget; questions log to
  `runs/questions.jsonl` for E04; `BLOCKING —` is one extra question, then stop.
- **S02, round 2.** `project.config.json` overrides engine-pack recipes; gym
  claims need a playtest note; a missing performance budget or a timeout is FAIL;
  trimmed from 796 to 770.5 tokens without dropping a check.
- **E03, round 1.** Shared eval format and a runner: `verify.mjs` produces
  `runs/E03/` transcript, log, and diff.

## Smoke test

Copied `template/` to a temp game, replaced the placeholder, added both rules and
the verify skill, and ran 21 structural checks. All passed:

- 23 files (20 template paths + 3 copied parts), no placeholders;
- `opencode.json` parses; 31 ordered permission rules; `shell *` ask,
  `git status *` allow, `git push *` deny, `*.env` deny, `external_directory *`
  ask;
- both rule files load through `.opencode/rules/*.md`;
- R1 576, R2 517.25, verify 770.5 tokens; skill frontmatter intact;
- LF, no BOM, no CRLF; `dist-play/` and `node_modules/` ignored.

Smoke path: `C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke\smoke-game`.

The first smoke run reported false failures because it assumed the V1 object
shape. The V2 schema and docs confirm the array shape (`permissions`,
`action: shell`) is correct. This is recorded because the same mistake will
recur if a future check is written from memory instead of the schema.

## Integration decisions

- `project.config.json` is created by `new-project` (CLI01); the bare template
  has no engine and no config. It carries the verify recipe override.
- `agent.lock.json` is written by CLI01 and holds the game version; the game
  repo has no `VERSION` file.
- Rules are plain text (no YAML frontmatter) because `instructions` loads them
  as ambient text; skills use native frontmatter.
- `dist/` and `dist-play/` are ignored build output; `evidence/` and `runs/` are
  tracked proof.
- Engine packs append their build/test commands to the permission allow-list at
  install time (N00 contract).

## Open issues carried forward

1. `runs/questions.jsonl` parser owner: E04/CLI04; schema is in R2.
2. R10 must resolve the autonomous + `BLOCKING —` deadlock: one blocking
   question is allowed, then the agent stops and reports.
3. S02 leaves the timeout value to CLI03; no config field yet.
4. S09 owns the gym-note format; S02 names build / tried / verdict only.
5. `libgdx` source path 404 and terminal-bench redirect were replaced in E03;
   no impact on the artifact.
6. The bare template cannot run a real verify until N00 installs an engine; the
   pilot proved structure, not a playable loop.

## What the pilot proved

- One subagent can produce a reviewed part from nine sources with a complete
  justification; the review round is still required.
- The main failure mode is **step limit**, not quality: four of five parts needed
  a follow-up to finish files or trim size.
- The first real defect was a security gap found by review, not by the author:
  native Windows recursive delete. The process catches it.
- Batches of 3-5 parts are the right size. Do not scale to the remaining ~60
  parts until CLI01 and the first playable game exist.

## Next

Batch 2: R3, R4, R5, R6, R7. After Batch 2, assemble and run the same review
gate. Batch 3: R8, R9, R10, A01, A04. Batch 4: A02, A03, S01, S03, S04.
