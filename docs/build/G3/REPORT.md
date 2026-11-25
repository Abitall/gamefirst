# G3 - ship: report

## Summary

G3 is the last gate: after S13 has packed the release and C03 is standing at
the store door, one human writes a dated line that says `ship` or `hold`. The
gate reads evidence - build, checksum, clean-profile install, store metadata,
rollback, crash channel, post-launch owner, open defects - and never builds,
publishes or re-opens G2/G2.5. A hold names exactly one blocker and one next
action. The ship line has one home, `DECISIONS.md`; `STATE.md` only points at
it. The artifact is plain Markdown, ASCII, with no YAML and no extra check.

## Artifact

`artifact/library/game/gates/G3-ship.md` - the gate itself, 8 checks, one dated
decision line, an out-of-scope paragraph and the cross-refs.

## Size

| chars | chars/4 | words | lines | limit |
|---|---|---|---|---|
| 1,706 | 426.5 | 300 | 37 | 500 tokens (2,000 chars), 35-45 lines |

## Checks

1. UTF-8 without BOM - pass (first bytes are `# G3`, no EF BB BF).
2. LF only, no CR - pass.
3. ASCII only - pass.
4. No YAML frontmatter - pass (starts with the H1).
5. chars/4 at or under 500 - pass (426.5).
6. Lines between 35 and 45 - pass (37).
7. The decision is one dated line - pass (`ship` or `hold` templates).
8. The gate contains no publish command - pass; publish is named as R4's.
9. Cross-refs R1, R4, R9, S13, C03, E12, G2.5 all present - pass.
10. Nothing written outside `staging/G3/` - pass; no commit made.

## Rubric (1-9)

| # | Criterion | Score | Note |
|---|---|---|---|
| 1 | The human decision is unmistakable | 5 | Role line, decision section, one line |
| 2 | Evidence is named, not described | 5 | Check 2 asks for the previous save only when saves exist, so a first release can pass |
| 3 | Fits R1, R4, R9, S13, C03, E12 | 5 | Each rule is cited where it binds |
| 4 | Length discipline | 5 | 426.5 tokens against a 500 limit |
| 5 | Sourcing and quotes | 5 | Nine repositories, one verbatim quote each |
| 6 | Non-duplication of G2/G2.5 | 4 | OpenTTD returns from G2, though with a different quote |
| 7 | A hold is actionable | 5 | Exactly one blocker, exactly one next action |
| 8 | Checkable by a stranger | 4 | Checks 2 and 5 rest on human evidence |
| 9 | Voice and tone match G0-G2 | 4 | The ship line now carries three clauses; still one line, slightly denser |

## Open questions

- With more than two storefronts, should check 3 split per storefront or stay
  one line with a list?
- Is "no open regression" measurable before the project has a bug tracker?

## Known weaknesses

- Checks 2 and 5 depend on evidence a human produces; the gate cannot verify
  them by itself.
- OpenTTD appears again, after G2, so one source is reused across two gates.
- There is no legal check by design: if S13 is skipped, nothing in G3 catches a
  missing license.
- "No open blocker" assumes a shared severity scale; S13's pack defines it, not
  this gate.

Review: accepted 2026-11-26
