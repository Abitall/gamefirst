# S12 polish — report

## Summary

`polish` is the round after the feature freeze: measure the five budgets, fix the single largest gap, re-measure, and leave evidence. Feel, accessibility and save compatibility are checked in the same round because each is a quality claim that a number cannot cover. The skill refuses to start without budgets, parks every found-but-deferred gap in `BACKLOG.md`, and ends at S02 plus an evidence folder that G3 reads. It adds no feature, no content and no release step; those belong to S11 and S13.

## Artifact

`artifact/library/game/skills/polish/SKILL.md` — 53 lines, sections Trigger / Inputs / Steps 1-9 / Output / Blocked / Out of scope / Cross-refs.

Steps: 1 freeze the list, 2 measure before, 3 pick one gap by measured/budget, 4 fix and re-measure, 5 feel pass with a human, 6 accessibility, 7 saves, 8 bug triage, 9 prove and document.

## Size

| Metric | Value | Threshold | Result |
|---|---|---|---|
| Characters | 2,981 | — | — |
| chars/4 | 745.25 | <= 800 (target band 720-780) | pass, inside the band |
| Words | 487 | — | — |
| words x 1.35 | 657.45 | target band 720-780 | 62.55 under the band |

chars/4 is the binding proxy named in the brief and lands 34.75 tokens under the ceiling with 54.75 above the floor. The word estimate is under the band for a structural reason: the text is dense in backticked identifiers (`evidence/<YYYY-MM-DD>-polish/profile.md`, `project.config.json`, `runs/AUTONOMY.jsonl`, `STATE.md`, `BACKLOG.md`), which count as one word each and several characters each. The artifact is ASCII-only, so no character is being spent on punctuation outside the Latin range. No required content was cut for the number and nothing was padded to reach it.

## Checks

| Check | Result |
|---|---|
| Frontmatter parses; exactly `name`, `description`, `allowed-tools` | pass |
| Tools match the work: Read/Glob/Grep to find budgets and code, Write/Edit for evidence and card, Bash for build and profiler | pass |
| UTF-8 without BOM, LF only, no tabs, no trailing spaces | pass |
| ASCII only in the artifact, so no encoding ambiguity | pass |
| POSIX paths only; no backslashes or drive letters | pass |
| No placeholder tokens in the artifact; `<YYYY-MM-DD>` and `<date>` are date notation, the same pattern as `S02:27` | pass |
| No code, imports, engine API calls, shader or asset assumptions | pass |
| No secrets, hosts, network calls, commit, publish or spend | pass |
| Duplicates: the freeze appears at entry, list, feel and scope; the no-budget rule appears as input and as blocked. Both are disclosed in `JUSTIFICATION.md` with a reason per occurrence | pass, disclosed |
| Loads alone: valid YAML, no external file needed to read the procedure | pass |
| Windows-safe names: hyphen only in `polish/SKILL.md` | pass |

## Cross-references

Every ID used in the artifact resolves in `docs/V0.3-BLUEPRINT.md`; the second column is the defining line, the third says whether a file exists yet.

| ID | Blueprint | File today |
|---|---|---|
| G2.5 | 192 | none: `library/game/gates/` is empty |
| G3 | 193 | none: same directory |
| S02 | 152 | `library/core/skills/verify/SKILL.md` |
| S10 | 160 | absent |
| S11 | 161 | absent |
| S13 | 163 | absent |
| R1 | 136 | `library/core/rules/R1-build-is-truth.md` |
| R5 | 140 | `library/core/rules/R5-code-before-docs.md` |
| R9 | 144 | `library/core/rules/R9-scope-is-budget.md` |
| R10 | 145 | `library/core/rules/R10-autonomy-is-contract.md` |
| E08 | 208 | absent as a file |
| E10 | 210 | absent as a file |
| E12 | 212 | absent as a file |
| D07 | 263 | absent |
| N00 | 292 | absent |
| X02 | 285 | absent |

No ID was invented. Six references (S10, S11, S13, D07, N00, X02) point at parts that are defined in the blueprint but not yet authored; the skill uses them only as owners and formats, not as procedure it needs at run time.

## Open questions

1. **The 100 ms line has no repository source.** It is a standard interaction-latency figure, not something in the nine rows. If every number must be cited, move it to `project.config.json` and let the budget carry it.
2. **WCAG AA is named, the ratio is not.** 4.5:1 for body text would make the check executable, but it costs characters and may belong in the a11y checklist rather than the skill. Decide before D07-style checklists exist.
3. **G2.5 and G3 have no files.** "G2.5 passed" is read from `STATE.md`; no tool can verify the freeze, so the trigger is trust-based.
4. **D07 is unwritten.** The feel note is cited as `(D07)`; if D07's fields differ from the five pass lines in step 5, one of the two must change.
5. **Where does build size live?** The input accepts `project.config.json` or the engine pack, but the blueprint does not say which one owns build size; both are named so neither can be silently missing.
6. **Owner split is unnamed.** S09 names A02 and A03 for its artifacts; polish does not, because it assumes A03 runs the build and A02 writes the feel note. If the crew needs it explicit, step 5 and step 9 must name the owners, which costs roughly 40 characters.
7. **Bug fixes after the freeze.** Step 8 fixes blockers, which is a code change after G2.5. The freeze says "no new features", so this is legal, but the skill should not be read as allowing a refactor with a bug label.
8. **Which size metric binds.** chars/4 passes and words x 1.35 does not reach the band. If both must hold, the paths must be shortened; if chars/4 binds, the report is correct as written.

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every unit is mapped in `JUSTIFICATION.md`; two overlaps are disclosed with a per-occurrence reason, not waved through. |
| 2 | Function | pass | Trigger, inputs, nine steps, output, blocked, scope; done is an evidence folder plus a green S02, not a claim. |
| 3 | Evidence | pass | Nine repositories, 4/3/2, with URL, stars on 2026-11-25, license, verbatim quote, borrow and reject; five dead ends explained; GPL-3.0 and AGPL-3.0 idea-only; no code copied. |
| 4 | Fit | pass | Game layer, no engine imports; IDs and paths follow the blueprint; no contradiction with R1/R5/R9/R10 or S02. |
| 5 | Size | pass, flagged | 745.25 chars/4 against 800; words x 1.35 at 657.45 is under the band, explained above. |
| 6 | Language and encoding | pass | Body English, ASCII-only artifact, UTF-8 without BOM, LF, POSIX paths. |
| 7 | Security | pass | External material treated as data; no secrets; no network write, publish or spend; licenses recorded. |
| 8 | Testability | pass with cost note | The check is S02 with a performance claim plus the evidence folder; profiling costs a build run and a scene, which is the price of the claim. Failures are named: "No budget: FAIL", "compatibility unproven". |
| 9 | Integration | pass with concerns | Stable file name and IDs; six forward references (S10, S11, S13, D07, N00, X02) exist in the blueprint but not as files. |

Review: accepted 2026-11-26
