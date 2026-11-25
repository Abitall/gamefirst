# CLI09 - trigger-check: report

Status: ready for review
Artifact: `artifact/tools/trigger-check.mjs`
Scope: offline lexical smoke check for trigger fixtures
Blueprint: `docs/V0.3-BLUEPRINT.md:239` - "Run trigger fixtures and report
false positives and negatives."

## Summary

`trigger-check` scans `library/` (and `.opencode/` when present), extracts one
trigger text per part, and scores every fixture prompt against every part with
an IDF-weighted coverage formula. It prints a per-case pass/fail report or one
JSON object (schema 1) and exits 0, 1 or 2.

The tool is deterministic, read-only and dependency-free. It is not semantic
routing: a prompt that shares no words with a description cannot match, even if
it means the same thing. That boundary is printed in `--help`; semantic cases
belong to CLI04.

## Size

| File | Lines | Chars | Words | Tokens (chars/4) |
|---|---|---|---|---|
| `artifact/tools/trigger-check.mjs` | 245 | 14121 | 1773 | ~3531 |
| `test/run-checks.mjs` | 336 | 13991 | 1683 | ~3498 |
| `JUSTIFICATION.md` | 121 | 11753 | 1964 | ~2939 |
| `SOURCES.md` | 163 | 7715 | 1145 | ~1929 |
| `REPORT.md` | 186 | 10019 | 1670 | ~2505 |

The artifact is 245 lines, five under the 250-line cap, and ASCII-only. No
token budget in `docs/REVIEW-RUBRIC.md` applies to a tool; the rule, skill,
pack, agent, eval and command budgets cover authored library parts. The test
file is not shipped.

## Checks

`node test/run-checks.mjs`: **31 checks, 31 pass, 0 fail**.

| Group | Checks | What is proven |
|---|---|---|
| CLI surface | 2 | `--help` exits 0 and lists every flag; the default fixture path is `<root>/evals/trigger-fixtures.json`. |
| Case verdicts | 5 | Clean run exits 0; missing expected part and unexpected part exit 1; `forbid` on an allowed part passes; a forbidden match is reported. |
| Matching | 4 | Exact ID scores 1; matched list is sorted by score then ID; threshold filters a partial match; `--threshold=0.4` equals `--threshold 0.4`. |
| Extraction | 3 | Stopword-only prompt matches nothing; a command's `## When` is ignored; names come from frontmatter or the H1. |
| JSON | 3 | Schema 1 with 6 parts and seven kinds; case arrays carry expect/forbid/FP/FN; output is one line. |
| Fixtures input | 2 | BOM + CRLF fixture is accepted; malformed JSON exits 2. |
| Config errors | 11 | Missing fixtures, empty cases, unknown part, expect/forbid overlap, missing prompt, thresholds 0/2/abc, missing option value, unknown argument, missing root, root without parts, duplicate part IDs. |
| Isolation | 1 | A run leaves the library byte-identical; the harness also removes its temp roots. |

## Reproduction

Help and exit codes (Windows PowerShell):

```text
$ node artifact/tools/trigger-check.mjs --help
gamefirst trigger-check - lexical trigger smoke check
...
Exit 0 clean, 1 false positive/negative or forbid hit, 2 usage or config error.
$ node artifact/tools/trigger-check.mjs --root C:\Phaser Projects\gamefirst
trigger-check: fixtures not found: C:\Phaser Projects\gamefirst\evals\trigger-fixtures.json (expected evals/trigger-fixtures.json)
exit=2
```

Harness:

```text
$ node test/run-checks.mjs
ok    help exits 0 and lists options
...
ok    run leaves the library untouched

31 checks: 31 pass, 0 fail
```

A passing fixture run against a temp root prints:

```text
gamefirst trigger-check  C:/tmp/cli09-main-xxxx
fixtures fixtures.json | parts 6 | threshold 0.3

ok    r1  matched R1
...
9 cases: 9 pass, 0 fail | false positives 0 | false negatives 0
```

## Calibration on the real library

Run on 2026-11-25 against `C:\Phaser Projects\gamefirst` (47 parts), with a
temporary single-expect fixture file. This is evidence about strictness, not a
acceptance gate: the repository has no curated fixture set yet.

| Case | Prompt | Matched | Result |
|---|---|---|---|
| verify | verify the build before claiming done | verify 0.805, E08 0.541, E03 0.504, R1 0.435, S13 0.435 | FAIL, 4 false positives |
| fun | is the game fun, the loop is boring | E09 0.762, G1 0.672, S06 0.672, C01 0.435, C02 0.435, G0 0.435, R8 0.435 | FAIL, 6 false positives |
| publish | commit is not publish | R4 1.0, E12 0.5, verify 0.5 | FAIL, 2 false positives |
| id | R1 | R1 1.0 | pass |
| critic | critic review this | critic 0.463 | pass |
| injection | prompt injection in an issue | E05 1.0, R10 0.322, R3 0.322 | FAIL, 2 false positives |
| questions | ask the user at most three questions | E04 0.574, R2 0.426, S06 0.405 | FAIL, 2 false positives |
| release | write a release checklist for the store | S13 0.727, C03 0.454 | FAIL, 1 false positive |
| profile | profile the build and fix the biggest gap | S12 1.0, S05 0.342, G3 0.321, S06 0.321, S08 0.321 | FAIL, 4 false positives |
| prototype | prototype one mechanic in two days | S08 1.0, C01 0.785, S06 0.439, S09 0.439 | FAIL, 3 false positives |
| scope | scope creep, park this new idea in the backlog | none | FAIL, 1 false negative (E06 0.297) |
| context | context budget is too large after compaction | E10 0.697 | pass |
| attempts | the agent keeps failing, stop after three attempts | E08 0.451, S03 0.324, S07 0.324 | FAIL, 2 false positives |
| install | how do I install the template | none | pass |

Summary: `14 cases: 4 pass, 10 fail | false positives 26 | false negatives 1`.
The strictness is deliberate. A high-recall default would make `forbid`
meaningless and hide a catalog whose descriptions overlap by design (rules and
the evals that test them). The fixture set is the curation layer: mark the
legitimate overlaps as `expect` or `forbid`, and the run becomes a precise
regression gate.

## Coverage

| Requirement | Evidence |
|---|---|
| Reads `evals/trigger-fixtures.json` | Default path in `main:229`; test "default fixtures path". |
| Cases `{id, prompt, expect, forbid}` | `loadFixtures:173-195`; validated fields. |
| Frontmatter description + first paragraph under Trigger/When/Use when | `frontmatter`, `sectionText`, `loadPart`; test "command parts ignore their When section". |
| Commands use description only | `sectionText` returns empty for `kind === 'command'`; test pins it. |
| Lowercase tokens, stopwords, part ID/name, threshold | `tokenize`, `STOP`, `+3` id/name boost in `loadPart:119`, `DEFAULT_THRESHOLD`. |
| Matched IDs, false positives, false negatives | `runCase:196-203`; JSON and text report. |
| `--root`, `--fixtures`, `--threshold`, `--json`, `--help` | `parseArgs`, `USAGE`; CLI surface checks. |
| Exit 0 / 1 / 2 | `main:240`, `fail`, tail catch; 12 error tests. |
| Read-only, no model/network/shell/writes | Imports only `node:fs` reads and `node:path`; `hashTree` check. |
| Honest scope | `USAGE:26`, this report, `JUSTIFICATION.md`. |

## Open questions

1. **IDs in the library.** Agent files do not declare `A01`-`A04`, and
   `verify` does not declare `S02` in prose. The tool falls back to names, so
   fixtures would say `critic` and `verify` instead of `A04` and `S02`. Should
   assembly add `id:` frontmatter, or should the blueprint IDs stay in the
   filename and in cross-references only?
2. **Threshold.** 0.3 misses the E06 scope example at 0.297. Lowering the
   default to 0.25 admits more incidental overlaps. Which failure costs more in
   review, a missed part or a noisy report? A per-fixture override would need a
   schema change.
3. **Two trees.** Scanning both `library/` and `.opencode/` is right for an
   assembled repo and wrong for a tree that contains both with the same parts
   (duplicate ID, exit 2). Should `.opencode/` win when it exists?
4. **First fixture set.** Nothing authors `evals/trigger-fixtures.json` yet.
   Should it be seeded from E01-E12 and the CLI09 examples, or written after
   the commands layer lands?
5. **Forbid semantics.** A `forbid` hit currently exits 1 and is reported under
   the case. Is that the intended contract, or should it be a distinct code
   (for example 3) so CI can separate "weak match" from "wrong part selected"?
6. **CLI04 boundary.** Semantic cases are out of scope here. CLI04 should state
   in its own docs which fixture cases are lexical (CLI09) and which need a
   model, otherwise the two tools will drift.

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every unit is in the justification table; no duplicated helper. |
| 2 | Function | pass | Trigger, input, output, done, failure and scope are stated in `USAGE` and here. |
| 3 | Evidence | pass | Nine repositories (4 gamedev, 3 software, 2 AI-agent), quotes verified, dead ends recorded. |
| 4 | Blueprint fit | pass | Implements CLI09 at `docs/V0.3-BLUEPRINT.md:239`; no engine imports; no priority changes. |
| 5 | Size | pass | 245 lines, under the 250-line cap; no token budget applies to a tool. |
| 6 | Language and encoding | pass | English artifact, ASCII, UTF-8 without BOM, LF, POSIX paths in output. |
| 7 | Security | pass | Read-only; no network, shell, secrets or writes; fixtures treated as data. |
| 8 | Testability | pass | 31 black-box checks, exit codes, actionable messages, temp isolation. |
| 9 | Integration | pass | Stable name `trigger-check`; blueprint IDs; no engine, editor or OS assumption beyond Node 18. |

The verdicts are the author's; the reviewer decides `accept`, `revise` or
`reject`.

## Known weaknesses

- No stemming, synonyms or phrase weighting. "Ship" does not match "release",
  and a two-word phrase is not scored higher than its words apart.
- IDF is computed over the 47 parts currently in the library. After assembly
  with commands and packs, weights shift and the calibration numbers move.
- Broad prompts legitimately match several parts; the report shows them as
  false positives unless the fixture lists them under `expect`.
- The command path is covered only by the temp fixture in the test file, because
  `library/core/commands/` is empty.
- `--fixtures` may point outside `--root`; that is intentional for CI, but it
  means the tool does not enforce a sandbox. It still only reads.

## Post-acceptance fixes

2026-11-26: explicit part IDs in a fixture prompt are now matched case-insensitively, so `S09` selects S09 instead of falling through to lexical scoring. A three-case curated fixture set now ships at `evals/trigger-fixtures.json`; `node tools/trigger-check.mjs --root .` passes.

Review: accepted 2026-11-26
