# CLI09 — `trigger-check`: justification

Every unit is in the tool. Removing it makes the check weaker in the stated way.

| # | Unit | Why it exists | If removed | Source |
|---:|---|---|---|---|
| 1 | Scans `library/` and `.opencode/` for Markdown parts | Those are the two places a gamefirst game keeps rules, agents, skills, commands, evals, crews and gates. | The check sees no parts or only half the install. | CLI01 layout, blueprint |
| 2 | Trigger text = frontmatter `description` + first paragraph under `## Trigger`, `## When` or `## Use when` | The router sees the description and the trigger section, not the whole file. | The score uses body prose that the router never reads. | A01, S01 |
| 3 | Commands use the description only | A command has no trigger section; its description is the routing text. | Commands are invisible to the check. | SL01/SL02 frontmatter |
| 4 | Fallback to the first body paragraph when no description exists | Older parts may predate frontmatter; a silent skip hides them. | A part with no description is never checked. | R5, S01 |
| 5 | Lowercase tokens, stopwords removed | Case and filler words add noise without routing signal. | `The` and `the` dominate every score. | Classic IR practice |
| 6 | IDF weights from the part set | Common words should not outweigh rare trigger words. | A prompt matches everything because every part shares common words. | IR / TF-IDF |
| 7 | Threshold on prompt coverage (default 0.3) | The check must turn a score into a pass/fail with one number. | Results are unranked and unusable. | S01 |
| 8 | `--threshold` in (0, 1] | A project may need a stricter or looser smoke line. | The user edits the source to tune it. | CLI08 `--budget` precedent |
| 9 | Fixture schema with prompt, expect, forbid | A trigger check without expected parts cannot report a false negative. | The tool prints scores but no verdict. | E-series eval pattern |
| 10 | False positive exits 1 and names the part | A wrong match routes work to the wrong skill; the name is the fix. | The user knows a case failed but not which part. | A01 routing |
| 11 | False negative exits 1 and names the missing part | A missed trigger is the more dangerous failure. | The check silently passes cases it cannot route. | S01 |
| 12 | `forbid` hit exits 1 | Some prompts must never reach a part (security, release). | A dangerous route passes because the expected part also matched. | R3, R4 |
| 13 | Read-only, offline, no model calls | The check must be cheap enough to run on every change. | It becomes a second eval runner with network and cost. | R1, S02 |
| 14 | `--root` | The tool must run against a game, not only the framework repo. | It can only check its own checkout. | CLI01/CLI02 |
| 15 | `--fixtures` | A project may keep fixtures outside `evals/`. | The path is hardcoded and breaks on a custom layout. | E03/E04 fixtures |
| 16 | `--json` schema 1 | CI and agents need a machine-readable result. | The caller parses a human table. | CLI02/CLI03/CLI08 |
| 17 | `--help` exits 0 | A tool that cannot explain itself is not portable. | The user reads the source to learn the flags. | CLI03–CLI08 |
| 18 | Exit 2 for bad args, missing/malformed fixtures, no parts | Usage/config errors are not findings. | A typo looks like a failed trigger. | CLI03–CLI08 |
| 19 | 2,000-file cap | A runaway tree must not hang the check. | A generated directory makes the tool walk forever. | CLI08 cap precedent |
| 20 | Summary line with root, fixtures, parts, threshold | One line tells the user what was actually checked. | A green run may have scanned zero parts. | S02 report shape |

## Deliberately absent

- No semantic model or embeddings. This is a lexical smoke check; CLI04 owns semantic evals.
- No writes, no autofix, no threshold learning. The fixture is the source of truth.
- No HTML or PDF parsing. Only Markdown parts.
- No per-case timing. The suite is small; a stopwatch would be noise.
