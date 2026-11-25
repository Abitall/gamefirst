# S02 verify — Report

## Summary

`verify` is the procedure behind CLI03 and `/verify`: it turns a claim into a
table of executed checks with stored artifacts and one PASS/FAIL line. It proves;
it does not fix. R1 and E03 own the obligation, so the skill references them by
ID instead of restating them.

Shape: Trigger (3 moments) → Inputs (root, typed claim, changed files, recipe) →
Steps (7, each executable) → claim-to-checks table → Output table → Failure
behavior (3-attempt cap, no fake pass) → Out of scope.

Design decisions:

- The command set is read from the engine pack (`test recipes`, N00) or
  `project.config.json`, with the project file overriding pack defaults; no
  engine command appears in the text.
- A check passes only on exit code 0 **and** a non-empty artifact. A green log
  without an artifact is a FAIL.
- Claim type (`mechanic | UI | content | performance | release`) selects the
  required checks, so a UI claim cannot pass on unit tests alone.
- Evidence is one folder per claim: `evidence/<YYYY-MM-DD>-<claim-slug>/`.
- Visual claims require a capture that is opened and inspected; a wrong screen
  is a FAIL. A fun or gym claim needs a note in `docs/playtests/` with build,
  what was tried, and verdict — not a chat impression.
- A performance claim with no budget is a FAIL; the budget comes from the recipe
  or `project.config.json`.
- A timed-out check is a FAIL; CLI03 enforces the limit, so the recipe gains no
  timeout field.

Delivered: `artifact/library/core/skills/verify/SKILL.md`, `JUSTIFICATION.md`
(25 units), `SOURCES.md` (9 repositories, 4/3/2), this report.

## Size

| Metric | Value |
|---|---|
| Bytes | 3,082 |
| Characters | 3,082 |
| Words | 489 |
| Tokens (official estimate: chars / 4) | 771 |
| Threshold | 800 |
| Lines / endings | 65, LF only |
| Encoding | UTF-8, no BOM |

771 / 800 = 96.4% of the budget; 9 tokens spare. The official metric is
`characters / 4`, as agreed; `words × 1.3` would give 636 and `chars / 3.7`
would give 833, so the margin is thin under denser tokenizers. Any further
addition now needs a matching cut.

## Interface assumptions

1. N00 creates `project.config.json` at the game repo root and implements the
   override rule; SKELETON stays engine-free.
2. A recipe entry is `{ cmd, required, artifact }`. N00 must use these field
   names, or Steps 1 and 4 change by one line.
3. CLI10 `capture` writes into `evidence/<date>-<claim>/`; the skill assumes this
   and does not specify a capture path of its own.
4. The evidence root is `evidence/` from the blueprint game tree.
5. The five claim types are a closed list; a sixth type needs a table row.

## Cross-reference flags for the reviewer

- **R1 / E03**: cited by ID only. If their final text uses a different word for
  "artifact", only Step 4 needs the same word.
- **G2.5**: the blueprint says it is "not a gate". The trigger says "a gate or
  freeze" so the text does not contradict that; confirm the wording.
- **N00**: must define the `verify` recipe with `cmd`, `required`, `artifact`,
  and implement precedence (project config overrides pack defaults).
- **CLI03**: must implement the same recipe, the same output columns, and the
  timeout limit.
- **CLI10**: must write captures into the claim's evidence folder.
- **D07**: the playtest note must carry build, what was tried, and verdict, or
  Step 6 rejects every valid playtest.
- **S09**: owns the gym note format; this skill requires only those three fields.
  If S09 adds mandatory ones, Step 6 must name them.
- **S12**: budgets must exist before a performance claim can pass; a missing
  budget is a FAIL, not a skip.
- **E08 / X01**: 3 attempts matches `attempts_per_problem` (max 3).
- **S02 definition**: "build, types, tests, screenshots, and evidence checks" —
  all five appear as checks or steps.

## Open questions

Resolved in the integration round: precedence (project config overrides pack;
N00 implements it), prototype mechanic claims (gym note), missing budget (FAIL),
timeouts (FAIL; CLI03 enforces).

1. CLI03 must decide where the timeout value lives (constant, flag, or config),
   since the recipe deliberately gained no field. Until then the limit is
   undefined in practice.
2. S09 owns the gym note format; if it requires more than build, what was tried,
   and verdict, Step 6 needs the same list.
3. Screenshot verification stays human — no pixel diff. Accepted cost: a
   reviewer must open the file.

## Known weaknesses

- The claim table is closed; new claim types are a documentation change, not a
  config change.
- The output table is illustrative only; CLI03 needs a column schema to parse
  it. Those column names are the de facto schema.
- Step 5 depends on a human looking at the capture. An automated check would
  need baselines, which the blueprint does not ask for.
- At 771/800 tokens (9 spare) there is little room to grow without a cut.

## Rubric self-check

| # | Section | Check | Verdict |
|---|---|---|---|
| 1 | Necessity | Every unit appears in `JUSTIFICATION.md` with why, breakage and source | pass |
| 2 | Function | Trigger, inputs, output, done, failure and scope are explicit | pass |
| 3 | Evidence | 9 repositories, 4/3/2, stars read 2026-11-25, borrow and reject per source, no copy | pass |
| 4 | Fit | Core layer, no engine imports, only blueprint IDs and paths | pass |
| 5 | Size | 771 tokens by the agreed metric, under 800 | pass |
| 6 | Language | English, UTF-8 without BOM, LF, POSIX paths, Windows-safe names | pass |
| 7 | Security | No secrets, no publish or destructive action, capture is local | pass |
| 8 | Testability | E03 and trigger fixtures exercise it; Steps 1, 4 and the failure rules name actionable messages | pass |
| 9 | Integration | Stable name and path, cross-references by ID, loads without the library | pass |

## Review

(Left empty for the reviewer; max three rounds.)
