# D08 - engine doc: report

## Summary

`ENGINE.md` is a one-to-two-page English template for the engine document at
`template/docs/engine/ENGINE.md`, renamed to `docs/engine/<engine>.md` when the
engine is chosen. It has six sections: pin, API source, pitfalls, recipes, pack,
and verified. The page records the exact version and its authority, the members
proven against that version, reproduced failures, the build/test/smoke commands,
the engine pack and its selftest, and the date plus evidence path.

The page carries facts, not decisions: the engine choice, its matrix, and its
spike log stay in `DECISIONS.md` and are linked. A missing pin is `blocked` and a
question; the page never fills a version from memory. The only engine-specific
content is the E11 `shakeCamera` example, labeled as an example.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 2,566 | - | - |
| Tokens (chars / 4) | 641.5 | 900 | 258.5 (28.7%) |
| Lines | 56 | 1-2 pages | fits one page |
| Bytes | 2,566 | - | - |
| Fill slots | 11 | - | - |
| `##` headings | 6 | - | - |

UTF-8, no BOM, zero CR, LF, trailing newline, all ASCII. Paths are POSIX; there
are no non-ASCII characters. The 900-token limit is the task's; the rubric asks
for one page for a document template, and 56 lines fit.

## Check

Structural check run on the artifact with a Node one-liner that reads the raw
bytes and counts characters, lines, headings, and slots:

```json
{"ok":true,"chars":2566,"bytes":2566,"tokens":641.5,"lines":56,"headings":6,"slots":11,"bom":false,"crlf":0,"trailingLf":true,"nonAscii":0,"backslash":0,"tripleNewline":0}
```

Assertions: six `##` headings; eleven `[...]` slots; no double-brace placeholder; no CR; LF and a
trailing newline; no BOM; ASCII only; no backslashes; no triple blank line. All
cited IDs resolve: `A03`, `CLI06`, `E02`, `E11`, `N00`, `N01`, `N02`, `N03`,
`R1`, `R5`, `S02`, `S07`. No engine API is stated as fact except the E11
`shakeCamera` case. No recipe was executed: the page is a template, so its
commands are slots by design.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | 27 units, each with a failure mode in `JUSTIFICATION.md`; the page points at S02, E11, and S07 for procedures instead of restating their full text. |
| 2 | Function | PASS | Trigger: engine chosen or pin/pack changed. Input: installed metadata, pack, config. Output: one page. Done: pin, members, recipes, pack, date. Failure: `blocked` + question. Scope: no matrix, spike log, or gameplay. |
| 3 | Evidence | CONCERNS | Medium budget: 5 sources (3 external, 2 internal), not the rubric's nine. Godot, Bevy, TypeScript, E11, S02 cover the three mechanisms and two vocabularies; no AI-agent source. The task granted the smaller budget. |
| 4 | Blueprint fit | PASS | Matches D08 row and build plan row 91 (`template/docs/engine/ENGINE.md`); engine layer; no engine imports; consistent with `template/AGENTS.md:35` and `:41`. |
| 5 | Size | PASS | 641.5 / 900 tokens (28.7% headroom), 56 lines, one page; no cut needed. |
| 6 | Language and encoding | PASS | English, ASCII, UTF-8 no BOM, LF, trailing newline, POSIX paths, Windows-safe filename. |
| 7 | Security | PASS | Sources are data; licenses checked; no secrets; no command, publish, spend, or network write was run. |
| 8 | Testability | CONCERNS | The structural check is cheap and reproducible, and E11's selftest checks pin = installed = members. But no current check parses this page or validates the date, evidence path, or filled slots. |
| 9 | Integration | CONCERNS | Filename conventions differ across the brief, build plan, E02, and E11; S07 puts the pin in AGENTS.md; N00/N01 names are still pending. |

Overall: 6 PASS, 3 CONCERNS. Review-ready with the fixes below.

## Open questions

1. **Filename convention.** The brief says `docs/engine/<engine>.md`; the build
   plan target and E02 say `ENGINE.md`; E11's fixture uses
   `docs/engine/phaser/`. The artifact ships `ENGINE.md` and states the rename.
   Recommendation: keep `template/docs/engine/ENGINE.md` as the shipped path,
   make the rename an explicit project-init step in N01, and have E02 cite "the
   engine doc" without a fixed basename.
2. **Where the pin lives.** S07 step 7 pins the exact version in `AGENTS.md`;
   `AGENTS.md:41` says the pack owns the pin; D08 records the authority in
   `docs/engine/`. Recommendation: S07 writes the engine + version summary in
   `AGENTS.md`, records the machine-readable authority in `docs/engine/`, and
   runs the selftest; the three mentions point at one pin.
3. **Pending N00/N01 names.** `engineRange`, the `project.config.json` override
   field, and the selftest command are not defined yet. The template uses slots
   and cites N00 instead of guessing a schema. Recommendation: N00 fixes the
   names; if the config has no override field, cut "the project wins" from L13-14.
4. **E02's fixture shape.** E02 expects the camera members in
   `docs/engine/ENGINE.md`; this template has a generic members table.
   Recommendation: E02 cites the table by role, not by camera names, and keeps
   `shakeCamera` as the E11 example only.

## Known weaknesses

- An unfilled page is valid but useless: the eleven slots make the structure
  visible, not the facts. No check requires them to be filled.
- The Phaser example is the only engine-specific content; a careless copy into a
  Unity or Godot project carries a Phaser fact. It is labeled, not enforced.
- No automated lint checks the date, the evidence path, or slot completeness;
  E11's selftest does not read this page yet.
- The one-edit rule for the config and the recipe table is discipline; nothing
  detects a config change that leaves the table stale.

## Next action

Align D07/D09/D10 on the shared terms (`engineRange`, pack id, selftest, evidence
path), then assemble Batch 15.

Review: accepted 2026-11-26
