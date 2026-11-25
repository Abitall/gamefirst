# N02 - report

## Summary

Unity engine pack, `stability: beta`, range `>=6000.0 <6001`. Six files under
`artifact/library/engines/unity/`: manifest, four docs, one packaging selftest.
Every API member was checked against the installed `6000.3.24f1` and
`6000.0.83f1` reference assemblies. Three verified API-level traps are stated in
`API.md`; `PITFALLS.md` is status-only because no runtime failure was reproduced.
No Unity Editor session or player build was run, so the pack stays beta.

The selftest passes 15/15. Eight deliberate corruptions of a copy each make it
exit 1 with the expected failing check.

## Sizes

| File | Chars | Tokens (chars/4) | Lines | Cap |
|---|---:|---:|---:|---:|
| `manifest.json` | 1,002 | 251 | 34 | - |
| `RULES.md` | 4,633 | 1,159 | 95 | 1,500 tokens |
| `API.md` | 5,122 | 1,281 | 90 | 1,500 tokens |
| `PITFALLS.md` | 422 | 106 | 10 | 1,500 tokens |
| `RECIPES.md` | 1,051 | 263 | 14 | 1,500 tokens |
| `selftest.mjs` | 10,028 | 2,507 | 238 | 250 lines |

## Checks

| Check | Command | Result |
|---|---|---|
| Packaging selftest | `node selftest.mjs` | exit 0, `15/15 checks passed` |
| Manifest identity and beta pin | included in selftest | `ok` |
| Files equal directory listing, no extras | included | `ok` |
| Every file non-empty, sha256 matches | included | `ok` |
| `apiSource` object, local URI resolves | included | `ok` |
| Encoding, BOM/CR/U+FFFD, placeholders | included | `ok` |
| Token caps and selftest line cap | included | `ok` |
| Recipe table, modes, R0 `run` exits 0 | included | `ok` |
| API evidence needles (10) | included | `ok` |
| API traps in `API.md`; `PITFALLS.md` status-only | manual review | `ok` |

### Negative mutations

Each case was applied to a disposable copy under
`C:\Users\Chirv\AppData\Local\Temp\opencode\n02neg3`; the artifact itself was
not modified.

| Case | Mutation | Exit | Expected failure observed |
|---|---|---:|---|
| `apistring` | `apiSource` replaced by a string | 1 | `apiSource object` |
| `badupgrade` | `upgrade` set to `42` | 1 | `upgrade field` |
| `emptyfile` | `RULES.md` emptied | 1 | `files exist and are non-empty` |
| `extrafiles` | `EXTRA.md` added | 1 | `files listing shape` |
| `badhash` | one `API.md` hash changed | 1 | `hashes match` |
| `placeholder` | `{{TODO}}` inserted in `RULES.md` | 1 | `unreplaced placeholder` |
| `crlf` | `API.md` rewritten with CRLF | 1 | `CR found` |
| `longselftest` | 20 padded blocks appended to `selftest.mjs` | 1 | `278 lines (max 250)` |

## Rubric

| # | Criterion | Verdict | Reason |
|---:|---|---|---|
| 1 | Necessity | PASS | The template needs one engine pack per engine; without it the agent has no pinned Unity surface and no installable recipe. |
| 2 | Function | PASS | Manifest installs, selftest proves packaging, recipes cover editor import, scene lifecycle, player build, and API audit. |
| 3 | Evidence | CONCERNS | Every member is verified in two installed assemblies and the 6.3 docs, but no runtime behaviour was reproduced and Addressables/Input System were not verified at all. Beta reflects this. |
| 4 | Fit | PASS | Follows N00: beta floor and ceiling, per-row version provenance, table recipes, `run` only for commands, docs separated from the machine-read manifest. |
| 5 | Size | PASS | Largest doc is 1,281 tokens of 1,500; selftest is 239 of 250 lines. No filler. |
| 6 | Language | PASS | English artifacts, imperative rules, exact signatures. No tutorial prose. |
| 7 | Security | PASS | No secrets, no network in selftest, no executable payload, no downloaded code. Local paths only. |
| 8 | Testability | PASS | 15 packaging checks plus 8 negative cases. The only `run` recipe is the selftest itself, so verification never needs Unity. |
| 9 | Integration | CONCERNS | Manifest shape and recipe columns match `tools/verify.mjs`, but `apiSource.uri` is an absolute local editor path; a different machine fails the resolve check until the path or strategy changes. |

## Open questions

1. When can a Unity Editor/player run be scheduled? It is the only way to
   promote this pack to `stable` and to put reproduced failures in
   `PITFALLS.md`.
2. Which exact `com.unity.addressables` and `com.unity.inputsystem` versions
   should be pinned? Neither is verified today; Addressables is not even in the
   local package cache.
3. Should `apiSource` stay a local file URI, switch to the 6.3 docs URL, or
   accept a machine-specific override? The current path proves the exact
   assembly but does not travel.
4. Should candidate pitfalls (additive unload leftovers, missing `Resources`
   asset, mixed input backends) be promoted once R2/R3 are actually run?
5. Should a batchmode compile recipe become a second `run` row after the game
   project exists, or stay `manual` until CI has a Unity licence?

Review: accepted 2026-11-26
