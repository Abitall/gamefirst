# N03 - Godot engine pack - report

## Summary

The pack is a Godot 4 engine pack for the file-tool layer: five files plus a
manifest, with no install script and no runtime code. `RULES.md` states the
constraints Godot imposes on scene tree, signals, resources, input, physics,
save/load, teardown, and version range. `API.md` holds only members read in both
the `4.0-stable` and `4.7.2-stable` class XML trees, with the tag and class page
named per row. `PITFALLS.md` is empty by evidence: Godot is not installed, so no
failure was reproduced. `RECIPES.md` has two commands that run without Godot and
six editor checks. `selftest.mjs` validates the package and executes the two
commands; it passes 21 of 21 checks and rejects six negative mutations.
`engineRange` is `>=4.0 <5`, `stability` is `beta`, and `apiSource` names the
4.7.2 class XML tree at source.

## Sizes

| File | Chars | Tokens (chars/4) | Lines | Budget |
|---|---|---|---|---|
| `manifest.json` | 944 | 236 | 34 | n/a |
| `RULES.md` | 4,447 | 1,112 | 82 | 1,500 tokens |
| `API.md` | 5,631 | 1,408 | 50 | 1,500 tokens |
| `PITFALLS.md` | 736 | 184 | 15 | 1,500 tokens |
| `RECIPES.md` | 2,080 | 520 | 34 | 1,500 tokens |
| `selftest.mjs` | 9,868 | 2,467 | 213 | 250 lines |

Total: 23,706 chars, 5,927 tokens by chars/4. `API.md` has 92 tokens of
headroom; every other document is well below its cap.

## Checks

`node selftest.mjs` from the pack root, Node v26.13.0, exit 0:

| # | Check | Result |
|---|---|---|
| 1 | manifest parses | pass |
| 2 | identity is engine-godot | pass |
| 3 | engineRange is one beta floor and ceiling | pass |
| 4 | pack version is semver | pass |
| 5 | stability is stable or beta | pass |
| 6 | parts are known roles | pass |
| 7 | files are POSIX relative and exclude manifest | pass |
| 8 | files equal the directory listing | pass |
| 9 | every listed file is non-empty | pass |
| 10 | hashes cover exactly the files | pass |
| 11 | every hash is sha256 and matches | pass |
| 12 | selftest command is node plus a file | pass |
| 13 | upgrade is none or from plus note | pass |
| 14 | apiSource is an object with four fields | pass |
| 15 | apiSource version sits inside engineRange | pass |
| 16 | encoding and placeholders are clean | pass |
| 17 | docs stay under the token cap | pass |
| 18 | selftest stays under the line cap | pass |
| 19 | API.md cites both versions and class URLs | pass |
| 20 | recipes have the five-column table | pass |
| 21 | installed version or not installed | pass (not installed) |

Negative mutations were run on disposable copies, not on the artifact:

| Mutation | Expected failure | Observed |
|---|---|---|
| Add `EXTRA.md` | directory listing | `FAIL files equal the directory listing: directory [...] vs files [...]` |
| Empty `API.md` | non-empty file | `FAIL every listed file is non-empty: API.md is empty` |
| Replace one hash | sha256 match | `FAIL every hash is sha256 and matches: RULES.md hash does not match` |
| Set `apiSource` to a string | object shape | `FAIL apiSource is an object with four fields: apiSource is not an object` |
| Set `upgrade` to a string | upgrade shape | `FAIL upgrade is none or from plus note: upgrade is not an object` |
| Delete `RULES.md` | directory listing | `FAIL files equal the directory listing: directory [...] vs files [...]` |

No check runs Godot. The six `manual` recipe rows are the only runtime claims
and each names its evidence.

## Rubric

1. **Necessity - PASS.** Every unit in `JUSTIFICATION.md` names the failure it
   prevents; deliberate omissions cover scaffolding, style, Godot 3, C#,
   performance, and pitfalls without reproduction.
2. **Function - PASS.** `selftest.mjs` has a trigger (`node selftest.mjs`),
   input (manifest and five files), output (one line per check plus a summary),
   done (exit 0), failure (exit 1 with the failing check named), and scope
   (packaging only). `RECIPES.md` separates `run` from `manual` with pass
   criteria per row.
3. **Evidence - PASS.** Nine repositories in the required 4/3/2 split, each with
   URL, stars on 2026-11-26, license, commit, in-repo artifact, analog, borrow,
   verbatim quote, and reject; dead ends include the 403, the 4.7-only member,
   and the missing Godot binary.
4. **Fit - PASS.** `id` is `engine-godot`, the directory is
   `library/engines/godot/`, and the pack carries only `docs` and `recipe`. It
   has no gameplay or core imports and no install side effects.
5. **Size - PASS.** Four documents are under 1,500 tokens and the selftest is
   under 250 lines. `API.md` is the tight one at 1,408 tokens; growth requires
   trimming an existing row first.
6. **Language - PASS.** English artifacts, UTF-8 without BOM, LF only, POSIX
   relative paths. The encoding check scans the manifest and every listed file.
7. **Security - PASS.** The selftest makes no network call and executes only the
   two reviewable `run` rows; manual rows cannot carry a shell command. `RULES.md`
   warns that `get_var()` on user-writable files can execute code.
8. **Testability - PASS.** 21 packaging checks plus six negative mutations, each
   with a named failure and a non-zero exit. The selftest can go red on every
   class of drift it claims to catch.
9. **Integration - PASS.** Manifest fields follow N00, `files` lists every file
   except the manifest, hashes match, `apiSource` is an object pointing at the
   Godot source tree, and `upgrade` is `none` for the first release.

## Open questions

- `API.md` has 88 tokens of headroom; the next verified member requires trimming
  or moving a row into `RULES.md`.
- A reproduced pitfall needs an installed Godot inside `>=4.0 <5`; until then
  `PITFALLS.md` stays empty by policy.
- When Godot 5 ships, the `<5` ceiling needs a review; the pack does not claim
  forward compatibility.

Review: accepted 2026-11-26
