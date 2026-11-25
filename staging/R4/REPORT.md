# R4 — Report: Commit is not publish

## Summary

R4 is one core rule: a local commit, tag, build, or artifact is private, and
everything that sends work somewhere it cannot be recalled — push, release,
deploy, store upload, paid spend, public post, handing a build to someone — is a
publish that needs an explicit user command naming both the action and the target.
The rule supplies the four-part pre-publish display (diff or artifact, target,
version, rollback path), the wait for a clear yes, the ban on chaining
commit-and-push, the secret surface, the remote/branch check, and the evidence
record that G3 reads. Enforcement is delegated to the permission baseline that
already exists in `template/opencode.json`; the rule does not restate the schema,
and it does not restate R1's evidence table or R2's question format — it points at
them by ID.

Nine sources: MonoGame, Mindustry, bevy, libgdx; cargo, goreleaser, cli/cli;
openai/codex, anthropics/claude-code. Five carry a verbatim quote from a file read
on 2026-11-25; four are marked **paraphrase** because their source file moved or
the tool is not installed, and no quote is claimed for them.

## Size

| File | Chars | Tokens (chars/4) | Limit |
|---|---|---|---|
| `artifact/library/core/rules/R4-commit-is-not-publish.md` | 2225 | 556.25 | 600 (target 520–580) |
| `JUSTIFICATION.md` | 9285 | 2321.25 | — |
| `SOURCES.md` | 10687 | 2671.75 | — |
| `REPORT.md` | this file | — | — |

The artifact sits at 92.7% of the hard cap and inside the target band with 23.75
tokens of headroom before 580.

## Checks run

- **Size**: measured with `[IO.File]::ReadAllText` in PowerShell; 2225 characters,
  556.25 tokens by chars/4, 381 words.
- **Encoding**: UTF-8 without BOM on all files; zero CRLF pairs (LF only); zero
  U+FFFD replacement characters; the only non-ASCII are typographic dashes and
  quotes, matching Batch 1. Four `->` arrows replaced literal arrow characters in
  SOURCES and one in JUSTIFICATION so the non-ASCII set stays identical to R1's.
- **Paths**: POSIX separators inside all documents; filenames ASCII, no Windows
  reserved names, no trailing dots or spaces.
- **Frontmatter**: none — the file starts with `# R4 — Commit is not publish`, so
  it loads as plain `.opencode/rules/*.md`.
- **Cross-references**: R1 (twice: release evidence), R2 (once: question shape),
  E12 (once: scorer), G3 (twice: reads the evidence). No other IDs referenced; R10
  was removed to stay inside the allowed list.
- **Duplication**: R1's evidence table and R2's question format are named, never
  restated; the permission schema is pointed at, not copied.
- **Source counts**: `gh api` star counts on 2026-11-25; unauthenticated REST was
  403 and is recorded as a dead end.

## Open questions

1. The rule requires a "clear yes" but does not define one, deliberately. A
   reviewer may want a minimal shape (a sentence naming action and target), which
   would make it testable and also closer to duplicating R2.
2. "Sending a build or a link to anyone, testers included" implies that handing a
   build to a co-developer is a publish. That is the strict reading and the safe
   one, but it may be re-litigated.

Settled in the review round: the permissions path (now "the project
`opencode.json`… this template ships it as `template/opencode.json`") and the
local-tag versus pushed-tag overlap (now stated on both sides).

## Known weaknesses

- No named eval scenario exists for R4 yet (R1 has CLI03). A reviewer could add a
  "would you push?" probe to the eval set; without it, the rule is scored only by
  reading.
- The rule has no enforcement for auto-publish added later by a CI change. It says
  "no auto-release", but nothing mechanical stops a workflow file from appearing.
- The `## Before` block is a five-item display in one message; an agent may
  satisfy it in five messages, which reads as compliance.

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | Pass | Every line carries one of: the private/public test, an action list, the pre-publish display, the ban, the secret surface, the remote check, the evidence link, the enforcement pointer, or the blocked exit. |
| 2 | Function | Pass | An agent reading it can answer "may I push this?" in one step and knows what to show before asking. |
| 3 | Evidence | 3 / 4 | Five verbatim quotes, four marked paraphrases, nine repos across three categories, dead ends recorded. Not 4/4 because two software sources rest on documented behaviour rather than a file. |
| 4 | Blueprint fit | Pass | Matches the R4 definition, the non-negotiable, the auto-publish non-goal, E12 and G3; adds nothing the blueprint does not ask for. |
| 5 | Size | Pass | 556.25 tokens, cap 600. |
| 6 | Language / encoding | Pass | UTF-8 no BOM, LF, ASCII punctuation set, POSIX paths, English. |
| 7 | Security | Pass | Deny list kept, never widened; keys out of repo and chat; leak escalated to incident; remote checked before naming the target. |
| 8 | Testability | Partial | The deny list and the four display items are checkable; "clear yes" and "active" are judgement calls. |
| 9 | Integration | Pass | Names R1, R2, E12, G3, one concept each, no restatement, no conflicting rule. |

Review: pending
