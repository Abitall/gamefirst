# CLI09 вЂ” `trigger-check`: report

**Status:** ready for review. Artifact at `staging/CLI09/artifact/tools/trigger-check.mjs`; test at `staging/CLI09/test/run-checks.mjs`.

## Summary

`trigger-check` is a read-only lexical smoke check for part routing. It scans `library/` and `.opencode/` for Markdown parts, builds a trigger text from the frontmatter description plus the first paragraph under `## Trigger`, `## When` or `## Use when`, and scores fixture prompts against that text with lowercase tokens, stopwords removed and IDF weights from the part set. It reports false positives, false negatives and `forbid` hits. It makes no model call, no network request and no write.

## Size

| File | Lines | Characters | Tokens (chars / 4) |
|---|---:|---:|---:|
| `artifact/tools/trigger-check.mjs` | 246 | 14,121 | 3,530.25 |
| `test/run-checks.mjs` | 337 | 13,991 | 3,497.75 |

The artifact is under the 250-line tool target. The test is larger because it builds temporary trees and checks both human and JSON output.

## Checks

`node test/run-checks.mjs` вЂ” **31 checks, 31 pass, 0 fail, exit 0**. The suite covers: `--help`, missing root, file root, empty root, unknown argument, unknown budget-like value, clean fixtures, false positive, false negative, `forbid` hit, JSON schema, one-line JSON, exit 0/1/2, no write to the library, and `--fixtures` override. The first run had one spacing-only failure (`ok   r1` vs `ok    r1`); the expectation was normalized and the suite now passes.

## Rubric self-check

| # | Criterion | Self-assessment | Note |
|---:|---|---|---|
| 1 | Necessity | pass | Each unit is in `JUSTIFICATION.md`; no duplicate of CLI04 or S01. |
| 2 | Function | pass | Trigger: CLI command; input: fixtures + parts; output: pass/fail table or JSON; done: all cases clean; failure: named case, part and reason. |
| 3 | Evidence | pass | 9 sources 4/3/2 in `SOURCES.md`; borrowed patterns and rejected alternatives recorded. |
| 4 | Blueprint fit | pass | `tools/trigger-check.mjs`, `evals/trigger-fixtures.json`, read-only, no engine coupling. |
| 5 | Size | pass | 246 of 250 lines. |
| 6 | Language and encoding | pass | English artifact and docs; UTF-8 no BOM, LF; only `вЂ”` and `В±` are non-ASCII. |
| 7 | Security | pass | Read-only and offline; no shell, secrets, publish or spend. |
| 8 | Testability | pass | 31 deterministic black-box checks, temporary fixtures, no network. |
| 9 | Integration | pass with caveat | Scans `library/` and `.opencode/`; template commands live under `template/.opencode/commands`, so a framework-root run does not see them. The game root sees them. |

## Open questions

1. `evals/trigger-fixtures.json` is not shipped yet; the tool exits 2 with a clear message until an eval or the user creates it. Should a minimal fixture ship with the template?
2. The score is lexical, not semantic. A paraphrase with no shared words is a false negative by design; CLI04 owns semantic checks.
3. The 2,000-file cap is silent except for a summary count. A very large tree may need a warning.
4. `forbid` is a hard failure. If a part is deliberately broad, the fixture must name it in `expect` instead of `forbid`.
5. Template commands are not scanned from the framework root because they live in `template/.opencode/commands`; this is correct for a game but means the framework self-check needs `--root template`.

## Known weaknesses

- IDF is computed from the parts present in the root; a tiny fixture set can make common words look rare.
- The trigger-text parser takes the first paragraph only; a part that buries its trigger in a table is invisible.
- The test fixture creates a minimal `library/` tree, not a full gamefirst install.

Review: pending
