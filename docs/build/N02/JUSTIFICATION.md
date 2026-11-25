# N02 - justification

Method: read N00 (`library/engines/CONTRACT.md`) and the accepted N01 shape,
then verify every Unity member against the installed `6000.3.24f1` and
`6000.0.83f1` reference assemblies and XML doc sets. No Unity Editor session,
Play Mode run, or player build was performed. The pack is therefore `beta`, not
`stable`. Sources are numbered G1-G4, S1-S3, A1-A2 in `SOURCES.md`.

## Per-file

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| `manifest.json` | The only machine-read file: identity, beta range `>=6000.0 <6001`, file list, sha256, selftest command, local API source. | Installer cannot place or verify the pack; N00 U9/U16 checks fail. | N00, G1 |
| `RULES.md` | Turns the verified surface into rules for `src/game/`: scene/prefab lifecycle, serialization, input, resources, physics, teardown, API discipline. | Gameplay code drifts into unverified Unity APIs and cross-scene references; E11 fails on the first audit. | N00, G1, G2, G3, G4 |
| `API.md` | Exact signatures for the only approved members, with both checked versions, evidence paths, and the three verified API traps. | The agent guesses overloads or return types; "no invented API" becomes unenforceable, and the traps are lost. | G1, G2 |
| `PITFALLS.md` | Status only: no runtime failure was reproduced, so no pitfall is listed; candidates are tracked in `REPORT.md` open questions. | N00 U5 has no honest status file and the pack starts collecting folklore. | N00, G1 |
| `RECIPES.md` | One `run` row (packaging) plus four `manual` editor/player checks with pass conditions. | Verify cannot install a recipe; scene, build, and API audits are unowned. | G3, S2 |
| `selftest.mjs` | Packaging proof: manifest, files, hashes, apiSource, upgrade, encoding, placeholders, caps, recipe modes, API evidence. | N00 U13/U16/U17/U28 have no executable check; a broken pack can be marked ready. | N00, S1, S3 |

## Deliberate omissions

- No `install/` directory: the pack is docs plus one packaging recipe, not a
  Unity project template.
- No Addressables or Input System API rows. Both are packages; Addressables is
  not even in the local package cache, so neither can meet E11 today.
- No runtime pitfalls, no performance numbers, no editor-automation recipe.
  None was reproduced; inventing them would violate N00 U5.
- No generated C# seed under `src/game/`. The pack describes the adapter; the
  project owns its code.

## Why beta

The selftest passes, but two facts keep this pack off `stable`: no Unity run has
exercised the recipes, and `apiSource.uri` is a local installed-editor path that
does not exist on another machine. N00 U9 requires a floor and a ceiling for
beta; the range `>=6000.0 <6001` covers the installed 6.0 and 6.3 LTS lines.
Promotion needs a green run on one exact pin and a portable API source.

## Sizes (chars / tokens at chars/4)

| File | Chars | Tokens | Cap |
|---|---:|---:|---:|
| `RULES.md` | 4,633 | 1,159 | 1,500 |
| `API.md` | 5,122 | 1,281 | 1,500 |
| `PITFALLS.md` | 422 | 106 | 1,500 |
| `RECIPES.md` | 1,051 | 263 | 1,500 |
| `selftest.mjs` | 10,028 | 2,507 | 250 lines |
| `manifest.json` | 1,002 | 251 | - |
