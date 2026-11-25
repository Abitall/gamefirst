# Batch 8 review

**Verdict: PASS.**

Batch 8 adds the two remaining gates and three core evals. The template now
has 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, and 4 evals.

| Part | File | chars | chars/4 | words×1.35 | Limit | Sources |
|---|---|---:|---:|---:|---:|---|
| G2.5 | `library/game/gates/G2.5-feature-freeze.md` | 1,767 | 441.75 | 441.5 | 500 | 9 (4/3/2) |
| G3 | `library/game/gates/G3-ship.md` | 1,706 | 426.5 | 426.0 | 500 | 9 (4/3/2) |
| E01 | `library/core/evals/E01-small-change.md` | 1,966 | 491.5 | 477.0 | 500 | 9 (4/3/2) |
| E02 | `library/core/evals/E02-no-invented-api.md` | 1,971 | 492.75 | 475.2 | 500 | 9 (4/3/2) |
| E04 | `library/core/evals/E04-question-budget.md` | 1,971 | 493.0 | 475.2 | 500 | 9 (4/3/2) |

## Review changes

- **G2.5** — one dated record in `DECISIONS.md`; `STATE.md` points at it. The G2
  budget is referenced, not restated. This removes the two-copy drift risk.
- **G3** — the previous-release save check now applies only when saves exist, so
  a first release can pass. The `ship` line is written once in `DECISIONS.md`;
  `STATE.md` points at it. Voice/tone scored 4/5 because the line carries three
  clauses; accepted, not rewritten.
- **E01** — the tuning value moved to `data/balance.json`; the eval now measures
  diff discipline, not a hardcoded edit. First draft was 2,531 chars/633 tokens;
  tightened to 1,966/491.5.
- **E02** — the Score line now accepts a legal blocked run (`call or block`), so
  the Expected and Score sections no longer contradict. GUT was removed as
  unverified; Terminal-Bench is recorded as considered/rejected.
- **E04** — report completed; the eval covers the 3-question budget, numbering,
  one question per message, recommendation, `you decide`, no repeats, the JSONL
  schema, and autonomous = 0.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b8-smoke.mjs`
copied the bare template into a disposable game, replaced `{{GAME_NAME}}`,
assembled all rules, agents, skills, crews, gates, and evals, then checked the
tree.

**159 checks, 0 failures.** Covered: counts (10/4/13/3/5/4), every size limit,
frontmatter, UTF-8 without BOM, LF, 31 V2 permissions, `shell: ask`,
`git push`/Windows recursive-delete/`.env` denies, `default_agent` absent,
gate semantics, eval semantics, `docs/build` provenance, and blueprint paths.

## Integration decisions

- Gates live in `library/game/gates/`; evals in `library/core/evals/`; crews in
  `library/game/crews/`.
- Evaluation descriptions are shipped; their `evals/fixtures/<ID>/` trees are
  specifications, not built artefacts yet. CLI04 (eval runner) remains pending.
- `default_agent` is intentionally absent from the bare template; N00 writes
  `default_agent: partner` into the generated game.
- E01/E02/E04 use the shared eval sections: Tests, Setup, Prompt, Expected,
  Pass, Fail, Score, Fixture, Runner, Links.

## Open issues

1. Fixtures for E01, E02, E04 (and E03) are described, not built. A later batch
   must create them and run at least one end-to-end.
2. E02's fixture needs a pinned `phaser.d.ts` hash and a decision on `npm ci`
   cost; E11 owns the engine-version boundary.
3. E04's `runs/questions.jsonl` has no consumer outside the eval; the `stage`
   authority and gate budget are still open.
4. G3's C03 "verified pack" assumes the crew has finished; C03 disbands after
   the gate, which is consistent but needs a smoke case with a hold.
5. A01/R10 handoff: the partner can delegate an autonomous run, but the contract
   template is owned by X01; the handoff is described, not exercised.
6. `docs/build` now has provenance for every accepted part except the skeleton,
   whose build docs remain in `staging/SKELETON/`.

## Next

Batch 9: E05 prompt injection, E06 scope guard, E07 memory admission, E08 stop
after three failures, E09 fun honesty.
