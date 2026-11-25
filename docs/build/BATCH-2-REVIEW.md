# Batch 2 Review — R3–R7

Date: 2026-11-25
Verdict: **PASS**

## Parts

| Part | Target | Tokens (chars/4) | Sources 4/3/2 | Rounds | Review change |
|---|---|---|---|---|---|
| R3 | `library/core/rules/R3-external-content-is-data.md` | 557.75 | 9 (4/3/2) | 2 | “third-party repository” in the channel list; “project repository” in the hierarchy and conflict rule |
| R4 | `library/core/rules/R4-commit-is-not-publish.md` | 556.25 | 9 (4/3/2) | 2 | local tag is private, pushing it publishes; project `opencode.json` with template path clarified |
| R5 | `library/core/rules/R5-code-before-docs.md` | 545.25 | 9 (4/3/2) | 2 | step 3 names R8/G1 as the approver; report size table and rubric row synchronized |
| R6 | `library/core/rules/R6-add-only-after-failure.md` | 572.75 | 9 (4/3/2) | 2 | `REPORT.md` completed; no change to the rule |
| R7 | `library/core/rules/R7-diverge-before-converge.md` | 572.00 | 9 (4/3/2) | 2 | “player-facing name”; surprise line recorded in the S06 brief |

All five rules are plain text, start with the `# R*` heading, have no YAML frontmatter, no BOM, LF endings, and load through `.opencode/rules/*.md`. Each has `JUSTIFICATION.md` (unit, why, what breaks, source), `SOURCES.md` (nine repositories, stars on 2026-11-25, artifact, borrow/reject, dead ends), and `REPORT.md` (size, checks, open questions, rubric self-check, `Review`).

## Smoke test

A disposable game was created from `template/` at
`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b2\smoke-game`:
29 files, 59 checks, 0 failures.

Checked: seven rules in `.opencode/rules/`; `instructions` points at
`.opencode/rules/*.md`; `permissions` is the V2 array with 31 rules; `shell` asks;
`git push *`, `rmdir /s *`, `rd /s *`, `del /s *`, `*.env` denied; each rule at or
below 600 tokens; `verify` skill below 800 with `name: verify`; E03 below 500;
no `{{GAME_NAME}}` left; no BOM or CRLF; `.gitignore` covers `dist/`,
`dist-play/`, `.env`, `node_modules/`; `.gitattributes` sets `text=auto eol=lf`.

## Integration

- R3 names R1 (evidence), R2 (question budget), R4 (publish), E05 (injection
  fixture). It does not restate the evidence table or the question shape.
- R4 names R1 (release evidence), R2 (questions), E12 (scorer), G3 (ship gate).
  The permission baseline is pointed at, not copied.
- R5 names R1 (evidence), R6 (new document types), S02 (verify), D01/D03/D06
  (allowed documents), E01 (small change), R8/G1 (approval), R9 (backlog),
  X03 (changelog), CLI07 (doctor), N00 (engine config).
- R6 names R1 (proof), R3 (untrusted sources), E03 (evidence eval), E07 (memory
  admission), S01/S03/S04/S05 (research, retrospect, import, tool), M01 (memory
  schema).
- R7 names R2 (tinker time excludes questions), S06 (procedure), S08
  (emergence), A04 (critic), G1 (extension), G2 (interaction budget).
- No engine, OS, editor, or project-specific content in the five core rules.

## Open issues carried forward

- R3: where a source conflict is recorded; E05 fixture shape; X02 owns an
  injection-report path; star counts are rounded.
- R4: “clear yes” is not defined; handing a build to a co-developer counts as a
  publish; no named eval yet (E12 scores it); a later CI workflow could publish
  without the deny list.
- R5: the `verified by` field has no owner outside D06; stale docs at adoption
  are not addressed; three of the four gamedev sources are Godot projects.
- R6: the “new library” carve-out is a bulk-addition exception; “no question” on
  removal sits beside R2's budget; the SFML quote is from the website, not a
  repository file.
- R7: 20 variants is a defended floor, not a measured optimum; the 48-hour
  clause needs a gate cadence; the link count at G2 needs a worked example; the
  tinker budget is the least enforceable clause.
- Cross-batch: `runs/questions.jsonl` parser owner is E04/CLI04; R10 must resolve
  autonomous + `BLOCKING`; S02's timeout value belongs to CLI03; S09 owns the
  gym-note format.

## Next

Batch 3: R8 (fun on the loop), R9 (scope is budget), R10 (autonomy is
contract), A01 (partner), A04 (critic). After Batch 3, the core rules and the two
agents needed for the first playable loop are complete.
