---
name: verify
description: Run the verification stack and report pass/fail with artifacts. Use before claiming done, at a gate, before a behavior-changing commit, and after a fix.
allowed-tools: Read, Glob, Grep, Bash, Write
---

# verify

CLI03 and /verify: prove a claim, never fix it. R1/E03 own it.

## Trigger

- About to say "done", "fixed", or "works".
- Before a gate or freeze (G1, G2, G2.5, G3), or a commit that changes behavior.
- After a fix: re-run the same claim to show the failure is gone.

## Inputs

- Project root.
- One claim, one sentence, typed: `mechanic | UI | content | performance | release`.
- Changed files: `git status --short`, `git diff --name-only`.
- Recipe: `project.config.json` overrides engine-pack test recipes (N00, `docs/engine/`); the pack supplies defaults. Never invent a command.

## Steps

1. **Resolve the recipe.** No recipe = FAIL: "no verify recipe for <engine>; add one to docs/engine/ or project.config.json".
2. **Open** `evidence/<YYYY-MM-DD>-<claim-slug>/`. Every artifact goes there; elsewhere it does not count.
3. **Select checks** from the table below; never drop one the recipe marks `required`.
4. **Run each check**: `<cmd> > <evidence>/<check>.log 2>&1`; record exit code and artifact. PASS only if exit is 0 and the artifact exists, non-empty.
5. **Visual claim**: run CLI10 `capture` to `shot.png` or `clip.mp4`, open it, confirm it shows the claimed change. Wrong screen = FAIL.
6. **Fun or gym claim**: `docs/playtests/<date>.md` must name build, what was tried, verdict. "Feels good" in chat is not evidence.
7. **Write** `<evidence>/REPORT.md` with the table and verdict; print it.

| Claim | Required checks |
|---|---|
| mechanic | build, types, unit + integration tests, playtest or gym note |
| UI | build, types, screenshot or clip, manual walkthrough |
| content | build, content validation, counts vs budget |
| performance | build, profile vs budget, capture |
| release | all above, build artifact, fresh-install smoke run |

A performance claim with no budget is a FAIL; the budget comes from the recipe or `project.config.json`.

Each recipe entry is `{ cmd, required, artifact }`: `artifact` is the file a PASS must leave behind.

## Output

```text
check       command  result  artifact   notes
build       <cmd>    PASS    build.log  exit 0
tests       <cmd>    FAIL    tests.xml  2 failed: score, combo
```

Overall **PASS** or **FAIL**. FAIL: the smallest next action, one line ("fix tests/unit/score.test.ts:42: expected 3, got 2"). PASS: the evidence folder path.

## Failure behavior

- Same failure: 3 attempts max (E08), then escalate with the exact error, what was tried, and the smallest reproduction.
- Never weaken an assertion, skip a check, re-run until green without a change, or report PASS without an artifact. A wrong check is reported, not edited.
- Missing tool or credential: FAIL, naming the missing item.
- A check that times out is a FAIL; CLI03 enforces the limit.

## Out of scope

Fixing failures, writing tests, publishing, judging fun: this skill reports, others act.
