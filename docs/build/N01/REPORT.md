# N01 — engine-phaser pack: report

## Summary

The pack at `staging/N01/artifact/library/engines/phaser/` is aligned with the N00 contract now on disk. `manifest.json` declares `parts: ["docs","recipe"]`, lists the five artifacts (everything except the manifest), carries a sha256 for each, uses `upgrade: "none"`, and records `apiSource` as an object.

`selftest.mjs` is a 208-line packaging check that prints one line per check and exits 0 or 1. It fails on a missing or stray file, a hash mismatch, a malformed `apiSource`, an invalid `upgrade`, an unresolved placeholder, and an over-budget document. It does not start a browser and does not claim to test Phaser at runtime.

`stability: beta` remains: the packaging checks pass, but P1–P4 and P7 have not been reproduced in a project.

## Size

| File | Chars | Tokens (chars / 4) | Lines | Budget |
|---|---:|---:|---:|---:|
| `manifest.json` | 900 | 225 | 25 | — |
| `RULES.md` | 3,742 | 936 | 56 | 1,500 tokens |
| `API.md` | 4,387 | 1,097 | 71 | 1,500 tokens |
| `PITFALLS.md` | 3,683 | 921 | 53 | 1,500 tokens |
| `RECIPES.md` | 2,229 | 558 | 52 | 1,500 tokens |
| `selftest.mjs` | 7,758 | 1,940 | 208 | 250 lines |

Largest document: `API.md`, 73% of its token budget. The manifest is not token-capped; the selftest is capped by lines, not tokens.

## Checks

| Check | Result |
|---|---|
| `node selftest.mjs` | exit 0; fourteen `ok` lines, from `ok manifest parses` to `ok installed pin: skipped: phaser not installed` |
| Manifest parses and fields validate | pass (`JSON.parse`; id, engine, pin, version, stability, parts, files, hashes, apiSource, upgrade) |
| Files equal the directory | pass: five files plus `manifest.json`, which is excluded by design |
| Hashes | pass: five keys equal `files`, each value equals the file's sha256 |
| Failure paths | pass on a scratch copy: empty `files`, wrong hash, string `apiSource`, bad `upgrade`, extra file — each exits 1 with the matching `FAIL` line |
| Token budget | pass: four documents under 6,000 chars (1,500 × 4) |
| Selftest line budget | pass: 208 ≤ 250 |
| UTF-8, no BOM, LF, no placeholders | pass on all six pack files |
| IDs resolve | pass: `files` is exactly the pack listing, and `selftest` names a file that exists |
| Installed pin | skipped with an explicit line: `phaser` is not installed above staging; the same check runs on a real project |
| Browser or scene test | not run and not claimed |

## Rubric

1. **Necessity — PASS.** Six files with distinct roles; no tutorial prose and no duplicated rule between RULES and PITFALLS.
2. **Function — PASS.** Rules are imperative; API rows carry signatures and line numbers; every recipe states an action and a pass condition.
3. **Evidence — CONCERNS.** Typings facts are exact and dated; P1–P4 and P7 remain unverified runtime reports, three source licenses are not displayed, and the pack has no runtime proof.
4. **Fit — CONCERNS.** Manifest and selftest follow N00, but three artifacts still differ: a beta pack with an exact `engineRange`, PITFALLS entries that are not reproduced, and prose recipes instead of the `step | cmd | required | artifact | mode` rows.
5. **Size — PASS.** Every document is under budget; the largest has 27% headroom.
6. **Language and encoding — PASS.** English artifacts; UTF-8, no BOM, LF, no placeholders.
7. **Security — PASS.** No secrets, no network calls, no browser automation; the selftest records a URL without fetching it.
8. **Testability — CONCERNS.** Packaging is automated and its failure paths were exercised; behaviour is still a manual checklist.
9. **Integration — PASS.** The manifest now uses the N00 field shapes and a command-form `selftest`; hashes are ready for `agent.lock.json`.

## Open questions

1. `engineRange`: N00 requires a beta pack to carry a floor and ceiling (`">=3.80 <5"`) and per-row version provenance; this pack keeps the exact `4.2.1` pin required by E11. Accept, or reclassify the pack.
2. `PITFALLS.md`: N00 says reproduced failures only. P1–P4 and P7 are labelled unverified — keep them as beta notes, or move them out of the pack.
3. `RECIPES.md`: N00 defines `step | cmd | required | artifact | mode` rows and `run` recipes. The pack uses prose plus one command; converting it would change hashes and needs a decision.
4. `apiSource`: `kind: "typings"` with a docs URL, and `date: 2026-11-25` while `API.md` says verified 2026-11-26. Which provenance wins?
5. The manifest `selftest` field changed from the earlier `selftest.mjs` value to `node selftest.mjs` per N00; confirm that installer tooling expects the command form.
6. Licenses for `phaserjs/examples`, `phaserjs/create-game` and `anthropics/skills` are not displayed; no code is copied, but the record needs acceptance.
7. Who runs R1–R5 on a real project to flip P1–P4 and P7 to verified?

Review: accepted 2026-11-26
