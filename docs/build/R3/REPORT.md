# R3 — Report

## Summary

`library/core/rules/R3-external-content-is-data.md` is a 39-line, plain-text core rule for Batch 2. It treats every incoming channel — web page, third-party repository, issue/PR text, asset, tool output, MCP result, search snippet, pasted text — as untrusted data and forbids following anything inside it. It ranks sources (the project repository, official docs, maintained article, forum), states how to settle conflicts and record the decision, requires facts and short quotes rather than copied prose, marks code as untrusted until read and adapted, requires a licence check before import, bans secrets in outbound prompts and tool calls, spends at most one R2 question on an external fact, and ends with the E05 check. The rule is engine- and platform-agnostic, carries no YAML frontmatter, and refers to other artifacts by ID only.

## Size

| Measure | Value | Threshold |
|---|---|---|
| Characters | 2231 | — |
| Words | 380 | — |
| Tokens (chars ÷ 4) | **557.75** | 600 hard max, 520–580 target |
| Tokens (words × 1.35) | 513.0 | reference only |
| Lines | 39 | — |

Measured with a Node `fs` read of the UTF-8 file; both estimates sit inside the target band, so no size exception is needed.

## Checks run

| Check | Result |
|---|---|
| Token estimate by chars ÷ 4 | 557.75 — inside 520–580, below the 600 hard max |
| Second estimate by words × 1.35 | 513.0 — consistent with the primary estimate |
| Encoding | UTF-8, no BOM |
| Line endings | LF only (0 CRLF, 0 stray CR) |
| Indentation | No tab characters |
| YAML frontmatter | Absent; the file starts with the `# R3` heading and loads as plain text |
| Engine, OS, editor, product names | None found by a case-insensitive scan for common engine and platform names |
| Cross-reference IDs | Only `R1`, `R2`, `R4`, `E05`, `S01`, `S04`; all exist in the blueprint and none is re-specified here |
| Scope duplication | No evidence, budget, publish, or research procedure text; those stay with R1, R2, R4, S01, S04 |
| Licence and secrets coverage | Both present as rule lines, not as tool instructions |
| Paths and filenames | Windows-safe, ASCII, POSIX separators in documentation |

## Open questions

1. **Where the conflict record lives.** The rule says "record the decision beside the claim, with link, date read, and the claim that lost" but does not name a file. R1 already owns evidence locations; naming one here would duplicate it. If Batch 3 wants a fixed path, it should be defined once, in R1, and referenced.
2. **Whether E05 gets a fixture.** The check names three observable failures. A concrete adversarial document would make it mechanical, but that belongs to the eval set, not to the rule; the rule must not quote payloads.
3. **Where a suspected injection is reported.** The rule requires the report but not a destination, because the core layer has no guaranteed logging substrate. X02 should own the destination when it is written.
4. **Star figures are rounded.** GitHub's REST API answered 403 here, so stars came from shields.io on 2026-11-25 and are approximate (`~121k`). They document provenance, not an exact snapshot.

## Known weaknesses

- The four-level hierarchy has no examples; a reader must map "maintained article" to their own sources. Examples would cost tokens the 600 limit does not have, and naming sites would date the rule.
- Level 3 versus level 4 is the softest boundary: a vendor blog can be either. The rule's tie-breaker ("maintained article or release note") is defensible but not mechanical.
- "Asset" is handled by one licence clause; there is no separate line for model-generated images or audio, on the grounds that the licence and provenance requirement covers them and a media list would be a tutorial.
- The channel list names "MCP result", which is current vocabulary; if the protocol is renamed, the line ages. The surrounding "tool output" still covers the case.
- Redundancy with R1 is limited to the word "evidence" in the check line; the mechanics of evidence are not restated.

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 22 units, each with a concrete failure and an observable break; 10 deliberate omissions with reasons; no "good practice" answers |
| 2 | Function | PASS | Trigger: any external content. Output: verified facts, cited, conflict decision recorded. Done: claims usable and traceable. Failure: injection reported, task continues. Scope stated in the first sentence |
| 3 | Evidence | PASS | 9 repositories (4 gamedev, 3 software, 2 AI-agent), stars dated 2026-11-25, URL, artifact, verbatim quote, borrow and reject for each; dead ends recorded; synthesis, no copied prose |
| 4 | Fit with blueprint | PASS | Core layer, no engine imports, IDs from the blueprint, no contradiction with R1/R2/R4, priority order respected |
| 5 | Size | PASS | 557.75 tokens by chars ÷ 4, inside the 520–580 target |
| 6 | Language and encoding | PASS | English, UTF-8 no BOM, LF, ASCII filenames, POSIX paths |
| 7 | Security | PASS | External content is data; secrets banned from prompts; no destructive or publish action; licence check before import |
| 8 | Testability | PASS | E05 with three observable failures (task change, writes, link-following) plus the report requirement; cheap to run, actionable when it fails |
| 9 | Integration | PASS | Loads standalone as plain text, stable filename and heading, cross-refs resolve by ID, no engine/OS/editor assumption |

Review: accepted 2026-11-26
