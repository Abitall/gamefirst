---
description: Verify one claim and report PASS or FAIL with its evidence
agent: partner
subtask: false
---

`$ARGUMENTS` is one claim: what changed and what it proves. Empty: FAIL `no claim`, usage `/verify <claim>`.

Run `node tools/verify.mjs --claim "<claim>"` (CLI03); if absent, run the project's documented verify command. Never invent one or drop evidence; no runner and no documented command: FAIL `no verify runner`.

Read the `evidence/<date>-<claim>/` folder the run prints and its `REPORT.md`. Missing or empty: FAIL, not "probably works".

Print:

```
claim    <claim>
result   PASS | FAIL
command  <exact command run>
exit     <code>
artifact <evidence>/REPORT.md
next     <one action>
```

PASS requires exit 0, every required check passed, and a non-empty artifact (R1); anything else is FAIL.

On FAIL say `not done`, name the failing check, its exact command and exit code, and the smallest next action that supplies the missing input. Never fix the code; never edit, weaken, skip, or rewrite a check, test, or runner; never re-run until green or report a pass from memory.

S02 owns the checks, CLI03 the runner, E03 scores this. R1 and R5 apply as written.
