# Report — X02 Security

## Summary

`artifact/library/core/security/SECURITY.md` is the project security policy: nine blocks (policy precedent, permissions, secrets, external content, supply chain, licenses, save and player data, incident response, Check). It states decisions and leaves procedure to the owner: R3 for external content and source hierarchy, R4 for publishing, E05 and E12 for the scored failures. It is written for the core layer, names no engine, and assumes npm only because the template stack does.

Built from nine primary sources (4 gamedev, 3 software-development, 2 AI-agent), each with a verified star count on 2026-11-25, a license, an explicit borrow/reject, and a verbatim quote. Stars came from repository HTML because the GitHub REST API returned 403; `SOURCES.md` records that and the dead ends. No source code, prose, or asset was copied.

## Size

| Metric | Value | Limit / target |
|---|---:|---|
| Characters | 4,712 | 4,800 max (1,200 tokens) |
| chars/4 | 1,178.0 | 1,050–1,180 target |
| Words | 786 | — |
| words×1.35 | 1,061.1 | — |
| Lines | 61 | — |
| Budget used | 98.2% | — |

All three measures sit inside the target band; the hard maximum has 2.1% headroom. The two tables (deny list, licenses) are shorter than the prose they replace. `JUSTIFICATION.md` carries 49 units; `SOURCES.md` carries 9 entries; this report is the fourth file.

## Checks

| Check | Result |
|---|---|
| UTF-8, no BOM | Pass — first code unit is not `U+FEFF` |
| LF only | Pass — no `CRLF` in any of the four files |
| No template placeholders | Pass — no double-brace tokens |
| No YAML frontmatter | Pass — starts with `# Security` |
| IDs resolve | R3, R4, R10, S04, E05, E12 present in the library; X01, N00, X03 staged at `library/core/autonomy/CONTRACT.md`, `library/engines/CONTRACT.md`, `library/core/versioning/VERSIONING.md` |
| No secrets or personal data | Pass — paths and placeholders only, no values |
| No destructive default | Pass — every destructive or publishing action is denied or user-approved |
| Source count and mix | Pass — 9 entries: 4 / 3 / 2 |
| Stars verified on date | Pass — 2026-11-25; API 403 disclosed |

## Rubric 1–9

1. **Necessity — pass.** 49 units in `JUSTIFICATION.md`, each with why, what breaks without it, and a source. Two tables replace longer prose. Nothing is justified as "good practice"; the omissions list names what was deliberately left to R3, R4, E05, E12, and the engine packs.
2. **Function — pass.** Trigger: any security decision, dependency, save, secret, external content, or incident. Input: the task, diff, package, save, or tool output. Output: a decision the agent applies and the user can audit. Done: the Check list. Failure: E05 and E12. Scope: repository, tools, and player data; engine internals are out.
3. **Evidence — pass.** Nine primary artifacts, 4/3/2, stars and licenses dated, borrow/reject per source, one quote per borrowed unit. The synthesis is ours; no text copied. Dead ends are named honestly, including the 403 and the 42-star docs repo.
4. **Fit — pass.** Core layer, no engine imports, no project-specific content. References use rule/eval IDs and staged paths. Priority is stated in the first line (rule > page, permission > rule), matching the blueprint. No contradiction with R3, R4, R10, E05, E12.
5. **Size — pass, with a note.** The artifact is a policy document, not a rule or skill, so the 600/800 thresholds do not apply. The task cap is 1,200 tokens; it uses 1,178.0. The density is deliberate: seven domains plus Check, no examples.
6. **Language — pass.** English artifact, UTF-8 no BOM, LF, POSIX paths, no double-brace placeholders. Russian is not used in the artifact, as required.
7. **Security — pass.** The policy itself follows its rules: external content is data, secrets are cited by path, no value or personal datum appears, and every destructive/publishing/spending action needs explicit permission. All nine licenses were checked; two share-alike sources are quote-only, not copied.
8. **Testability — pass.** The Check block names six runnable checks plus E05 and E12. No new eval is created because the two existing evals already exercise the highest-risk behaviors (injection, secret read, publish). A leak-response drill is the missing test, listed below.
9. **Integration — pass.** Stable IDs and paths; the document loads without the rest of the library; no OS, editor, or engine assumption. X01, N00, and X03 were staged while this part was built, so their references now point at real files.

**Proposed verdict: accept**, pending the review below.

## Open questions

1. `template/opencode.json` enforces only a subset of the deny table: reads of `.env` are denied, but `*.pem`, `*.key`, `secrets/*`, and `id_*` are not; the shell deny list covers recursive delete, push, release, and publish, but not `ssh`, `scp`, `gh api -X`, or store upload. Should X02 ship a permission patch, or does the envelope own `opencode.json`?
2. `THIRD-PARTY.md` is required by the license section but is not yet a template file. Root, `docs/`, or generated at first import?
3. No incident drill exists. E12 scores release safety, not leak response; should a small fixture (canary + fake token in a log) become E13, or is the Check list enough?
4. The transport sentence ("encrypted to an authenticated peer") is a core default, but a game transport may live in an engine pack. Confirm it belongs here rather than in N00.

Review: pending
