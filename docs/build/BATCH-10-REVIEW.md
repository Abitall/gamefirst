# Batch 10 review

Status: PASS
Date: 2026-11-25

Batch 10 adds the last three core evals and the first two tools. All five parts
were accepted after review; the batch was assembled, smoke-tested and committed.

## Parts

| ID | Part | Size | Sources | Rounds |
|---|---|---:|---:|---:|
| E10 | context budget eval | 1,927 chars / 481.75 tokens / 44 lines | 9 (4/3/2) | 1 |
| E11 | engine version eval | 1,973 / 493.25 / 38 lines | 9 (4/3/2) | 1 |
| E12 | release safety eval | 1,976 / 494.00 / 43 lines | 9 (4/3/2) | 1 |
| CLI01 | new-project tool | 250 lines / 11,317 chars | 9 (4/3/2) | 2 |
| CLI02 | status tool | 296 lines / 11,389 chars | 9 (4/3/2) | 1 |

Artifacts:
`library/core/evals/E10-context-budget.md`, `E11-engine-version.md`,
`E12-release-safety.md`, `tools/new-project.mjs`, `tools/status.mjs`.

## Review changes

- **E12 security gap closed.** `template/opencode.json` now denies
  `npm publish *` in addition to `git push *` and `gh release create *`. E12's
  report records the change.
- **CLI01 revision 1.** `--packs game` now installs game crews and gates, not
  only skills. The test asserts `C01` and `G0` exist, and derives expected part
  counts from `library/` instead of hardcoding 9 evals / 36 parts. The suite
  grew from 44 to 51 checks and passes. The tool is exactly 250 lines.
- **CLI02 accepted with a documented size trade.** 296 lines against the
  250-line target; the overrun is explained in `REPORT.md`. The 57-check suite
  passes, including empty, broken and autonomous fixtures.
- **E10/E11 accepted.** E10 covers the instruction priority and the 12k
  compaction fixture; E11 pins Phaser 4.2.1 and scores an invented API.
- **E12 accepted.** Release branch/tag, `.env` canary, one plan, explicit yes,
  no publish; the eval keeps the rule, not only the sandbox, under test.

## Smoke test

Script: `C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b10-smoke.mjs`

Result: **224 passed, 0 failed**.

Checks include: 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, 12 evals,
32 V2 permissions, `npm publish` deny, `shell` ask, `.env` deny, rule/skill/
agent/eval size limits, agent frontmatter, docs/build for all 21 reviewed parts,
blueprint paths, encoding, and the two new tools.

CLI01's own suite: **53/53**. CLI02's own suite: **57/57**.

## Integration decisions

- Rule and agent counts stay at 10 and 4; Batch 10 adds evals and tools only.
- `template/opencode.json` now has 32 permission rules. `default_agent` remains
  absent from the bare template; N00 sets `partner`.
- `project.config.json` is seeded by CLI01 and owned by N00 for the recipe;
  `agent.lock.json` is written by CLI01 and read by CLI02.
- Game packs now install `crews/` and `gates/` alongside `skills/`; other packs
  (`release`, `obsidian`, `art`, `audio`, `narrative`, `localization`,
  `marketing`) still fail loudly as unimplemented.

## Open issues

- **Template gaps:** `toolbox/`, `prototypes/`, `docs/retro/`,
  `evals/fixtures/`, and `runs/*.jsonl` are in the blueprint but not yet in
  `template/`. N00 must create them, or the template must be extended before
  CLI02 relies on them.
- **Gate slug collision:** the blueprint maps `G2` to `slice`, and `S10` also
  uses `slice`; a single slug map would duplicate the ID. Gate IDs are derived
  from filenames today; the blueprint should rename the gate slug.
- **Unimplemented packs:** the release and optional packs are still loud
  failures; each needs its own batch.
- **CLI02 size:** 296 lines against 250, documented; formats for STATE,
  BACKLOG and `agent.lock.json` are still provisional.
- **E10:** `mode` conflict, 12k fixture cost, `reads.log` parser.
- **E11:** Phaser 4.2.1 tarball, `API.md` format, legacy provenance, `npm ci`
  cost.
- **E12:** the explicit-yes path is not scored; it needs a remote.
- **CLI01:** project.config ownership split, lock version semantics, `--git`
  partial-success exit code.

## Next

Batch 11: CLI03 verify, CLI04 eval, CLI05 sync-agent, CLI06 upgrade, CLI07
doctor.
