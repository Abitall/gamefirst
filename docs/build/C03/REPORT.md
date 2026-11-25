# C03 release-crew - report

## Summary

`library/game/crews/release-crew.md` defines a temporary three-role crew - partner (lead), engineer, critic - that carries one frozen candidate from the G2.5 feature freeze to the G3 ship decision and then disbands. The S13 release skill drives the checklist; the crew's job is to produce a complete evidence folder and a one-page G3 packet, then stop. It builds once from the tag, tests a clean install and the previous release's save, ships licenses and third-party notices inside the build, keeps secrets by reference, and stands up one crash channel with symbols for the exact build. The critic reads the folder blind before G3. Publish, spend, store contact and public posts wait for the user's explicit command naming the action and the target (R4, E12); one named human watches the crash channel for 72 hours after ship.

The boundary is negative as much as positive: no new features, no content production, no polish beyond the S12 pass, no live-ops, no hotfixes. A later release is a new crew.

## Size

| Unit | Characters | Tokens | Lines | Limit | Status |
|---|---|---|---|---|---|
| `artifact/library/game/crews/release-crew.md` | 2,510 | 628 | 37 | 700 tokens | pass (90%) |
| `JUSTIFICATION.md` | 7,863 | 1,966 | 27 | - | pass |
| `SOURCES.md` | 11,650 | 2,912 | 162 | - | pass |
| `REPORT.md` | 6,483 | 1,621 | 55 | - | this file |

Format model `library/game/crews/prototype-crew.md` is 2,673 characters / 668 tokens / 36 lines; the artifact sits just under it in size and matches its section order (purpose, Trigger, Members, Input, Work, Output, Limits).

## Checks

- Encoding: UTF-8, no BOM, LF only, ASCII-only content, no CRLF (`bytes = chars` for all three files).
- No YAML frontmatter; a single `#` title and `##` sections.
- Token count computed as `characters / 4`: 628, inside 620-680 and under the 700 limit.
- Cross-references present and used, not quoted: S12, S13, G2.5, G3, R1, R3, R4, R9, R10, E12.
- Rule text is not restated; R4 appears as behaviour ("publish, spend, store contact or a public post need the user's command naming the action and the target"), not as a rule quote.
- No secrets, keys, tokens or personal data; the only example paths are `evidence/<YYYY-MM-DD>-release/` and placeholders.
- POSIX paths, Windows-safe characters (no `:`, `*`, `?`, `"`, `<`, `>`, `|` in file names).
- Every unit has one row in `JUSTIFICATION.md` (20 units), and every row names a project source or one of S1-S9.
- `SOURCES.md` has exactly 9 repositories: 4 gamedev (S1-S4), 3 software (S5-S7), 2 AI-agent (S8-S9); one table row, one section, at least one quote and Borrow/Reject/Dead end each; stars dated 2026-11-25.
- No copying: quotes are single sentences used as evidence; no checklist item, code or paragraph was reproduced.
- Nothing written outside `staging/C03/`; no commit, no push, no publication.

## Rubric

1. **Necessity - PASS.** Without C03 the pipeline has a hole between "frozen and polished" and "shipped": nothing would test a clean install, a previous save, licenses or a crash channel, and the S13 checklist would have no owner. Blueprint lists C03 as one of the v0.3 units.
2. **Function - PASS.** The artifact answers who forms the crew and when, what each role owns, what must exist before it starts, what it does in order, what it produces, and what it may never do. The S13 steps are referenced by number instead of restated, so the crew cannot drift from the skill.
3. **Evidence - PASS.** Nine real repositories with URLs, stars, licenses, named in-repo artifacts and verbatim quotes; each has Borrow, Reject and Dead end. Two are kept despite modest stars (S3, S5) with the reason stated in place.
4. **Blueprint fit - PASS.** Role set matches the C03 row (partner + engineer + critic), the window matches G2.5 to G3, and the crew disbands after G3. Exclusions match the blueprint boundary and the eval E12.
5. **Size - PASS.** 628 tokens, 37 lines; every line carries a distinct unit; no duplicated rule text; the artifact is shorter than its own format model.
6. **Language and encoding - PASS.** English, plain Markdown, ASCII, LF, no BOM; no frontmatter.
7. **Security - PASS.** The one irreversible action (publish) is gated on an explicit user command naming action and target; spend, store contact and public posts sit behind the same gate; secrets by reference only, and a leak stops the crew; no credentials in any file.
8. **Testability - PASS.** Each checklist line needs a path under `evidence/<YYYY-MM-DD>-release/`; a line without a path is a hold; the critic marks what it cannot verify as `not verified`; the G3 packet is a fixed list, so a reviewer can check completeness mechanically.
9. **Integration - PASS.** Consumes S12's evidence folder and S13's steps; hands the G3 line to the partner and the decision to the user; the 72-hour watch and the disband rule close the loop without creating a standing team.

## Open questions

1. **Modest star counts.** S3 (butler, 1,012) and S5 (sig-release, 644) are below the "popular" bar used elsewhere in the batch. Both are kept as narrow, authoritative citations - first-party store CLI and the canonical temporary release team - and the reason is written into each section. If the reviewer applies the bar mechanically, S5 is the easier swap (nodejs/Release, 4,397), at the cost of a license field that could not be verified.
2. **Twelve-role overlap.** S4 MonoGame tests and deploys from one build folder; keeping deploy out of the crew is a deliberate reading of R4. Worth confirming that the blueprint does not expect a "deploy" role in C03.
3. **The 72-hour watch after disband.** The crew disbands after G3, yet its Limits section names a human who watches for 72 hours. The wording assigns the duty to a person, not to the crew, but a reviewer may read it as the crew living past G3. If that is a problem, the sentence can move to S13 as the owner with a one-line pointer here.
4. **Which targets count.** Work 1 cuts a target without a build command, but the project has no written position on whether a demo branch (for example a web build for the playtest host) is a release target. Not decided here; recorded for the producer.
5. **Hotfixes.** The Trigger sends post-launch hotfixes to a new crew, which matches "a later release is a new crew" but leaves open whether a one-line patch still needs the full S13 checklist. S13's fast-track idea suggests not; the crew's text does not decide it.

Review: pending
