# A03 - Report

## Summary

`engineer` turns one approved system card into code, a test that fails without
it, and evidence, and never into a different game. It loads AGENTS.md, STATE.md,
the card, DECISIONS.md, project.config.json and the engine pack before writing;
runs a failing-test-first loop with pure logic in `src/systems/` and engine calls
in `src/game/`; treats every value as a `src/data/` key; escalates a design gap
to A02 and scope to A01; verifies through S02 and records each claim under
`evidence/<date>-<claim>/` with a `verified by` line; stops after the third
failure on one problem; and
hands A04 a changed-file list, the test, the evidence path and the open question.
It has no design authority, no publish path, no secret access and no subagents.

Delivered artifact:
`staging/A03/artifact/library/core/agents/engineer.md`, mirroring the final path
`library/core/agents/engineer.md`.

## Size

| Metric | Value | Limit | Headroom |
|---|---|---|---|
| Characters (with frontmatter) | 2,717 | - | - |
| Words | 397 | - | - |
| Lines | 96 | - | - |
| chars/4 | **679.25** | 700 | 20.75 |
| words x 1.35 | **535.95** | 700 | 164.05 |

Both metrics pass; chars/4 is the reported one because it is the stricter of the
two for this file. 679.25 sits inside the 620-680 target band, 20.75 below the
700 cap. Frontmatter is 1,225 characters of the total (45%); the 18-entry
permission list is the reason it is not smaller, and every entry is named in
`JUSTIFICATION.md`.

## Encoding

- UTF-8 without BOM: the first bytes are `2D 2D 2D` (`---`), not `EF BB BF`.
- Pure ASCII: no code point above U+007F, so bytes equal characters (2,717).
- LF only: no `CR` byte; no tab characters.
- POSIX paths in every reference (`src/systems/`, `docs/engine/`,
  `evidence/<date>-<claim>/`); no Windows separators.
- No placeholder syntax: no `TODO`, `TBD`, `FIXME` or doubled brace. The only
  angle-bracket notation is `evidence/<date>-<claim>/`, the naming pattern S02
  step 2 and CLI10 already use; `<system>` would be the matching pattern in
  `docs/systems/`.
- No secret, token, key, URL with credentials, or personal datum.

## Checks

| Check | Result |
|---|---|
| `description` is one line | pass |
| `mode: subagent` | pass |
| Permissions are an ordered array, `edit * ask` first | pass |
| Allows: `src/**`, `tests/**`, `docs/systems/**`, `evidence/**` | pass |
| Denies: `.env`, `secrets/**` | pass |
| Shell allows: `npm run *`, `npm test`, `node *`, `git status/diff/log/show *` | pass |
| Shell denies: `npm publish *`, `git push *`, `gh release create *` | pass |
| `subagent` denied; `question` and `web` absent | pass |
| Cross-references resolve: A01, A02, A04, S02, R1, R3, R4, R5, R6, R10, E02, E03 | pass (by ID) |
| No engine import named in the systems layer | pass |

## Rubric

| # | Section | Score | Note |
|---|---|---|---|
| 1 | Necessity | 9 | 18 permission entries and 8 body sections each carry a reason, a failure mode and a source in `JUSTIFICATION.md`; no sentence restates another, and the two overlaps found (verify/loop, engine pack/read order) were merged before this report. |
| 2 | Function | 9 | Trigger: A01 invokes the subagent with one card. Input: the card, rules, engine pack. Output: code, test, evidence, `verified by`. Done: S02 plus a resolving evidence path. Failure: third attempt stops with a reproduction. Scope: one system per invocation. |
| 3 | Evidence | 8 | Nine real repositories, 4/3/2, stars read 2026-11-25 with `gh api`; quotes are short and verbatim; nine dead ends recorded. Deduction: vitest, playwright and npm/cli all support the same "test travels with the change" idea, so the software trio is narrower than the gamedev quartet. |
| 4 | Blueprint fit | 9 | Matches A03 ("Code, tests, and engine pack; implements approved systems; runs verify; does not change design"); core layer has no engine rule; no council, no auto-publish, no PASS/CONCERNS/FAIL output. |
| 5 | Size | 9 | 679.25/700 chars/4, inside 620-680; 535.95 by words x 1.35. Headroom is 20.75 tokens, which is thin: the next edit must cut before it adds. |
| 6 | Language and encoding | 9 | Artifact in English; UTF-8 no BOM; LF; ASCII only; POSIX; Windows-safe path. |
| 7 | Security | 9 | Publish, push and release are denied by pattern; `.env` and `secrets/**` are denied; no broad read allow is added, so the global `.env` deny keeps winning; `subagent` is denied; no secret appears in the artifact or this report. |
| 8 | Testability | 7 | Structural checks are cheap and listed above; behavior (does it refuse to weaken a test, does it stop on the third failure) needs a fixture run, which E02/E03 cover only in part. |
| 9 | Integration | 8 | Name and description are stable; S02, R1-R10 and E02/E03 are referenced by ID and resolve; `mode: subagent` matches how A01 calls it. Deduction: `docs/engine/` exists only after N00 creates the pack, so the first run relies on `project.config.json`. |

Overall: **8/9**. The deductions that matter are evidence overlap (3) and the
absence of a behavioral fixture (8); neither blocks use.

## Questions

All six raised in the first draft are closed; none remains open.

1. Resolved: 18 permission entries is the correct count; "19" in the brief was
   an estimate, not a requirement (18 = 7 edit, 10 shell, 1 subagent, with
   `question` and `web` left at global defaults).
2. Resolved: OpenCode V2 is last-match-wins per its documentation, so the order
   `edit * ask` followed by allows works as intended and stays as written.
3. Resolved: the global shell default is `ask` (`shell * ask` in
   `template/opencode.json`), so `git add` and `git commit` prompt for approval
   without an explicit rule. No deny was added.
4. Resolved: `verified by` lives in the system card `docs/systems/<system>.md`.
5. Resolved: the artifact now names `evidence/<date>-<claim>/`, matching S02
   step 2 and CLI10. Cost was +8 characters; chars/4 moved 677.25 to 679.25 and
   stayed inside 620-680, so nothing else was cut.
6. Resolved: no `skill` permission is needed to use S02; referencing the ID is
   enough, and the permission list is unchanged.

Review: accepted 2026-11-26
