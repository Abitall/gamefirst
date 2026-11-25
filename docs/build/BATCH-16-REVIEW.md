# Batch 16 review

Verdict: **PASS**. Five parts accepted, assembled, and smoke-tested. The engine
pack is beta; three deviations from N00 are listed at the end and must be
resolved before the Unity and Godot packs copy the shape.

## Parts

| Part | Target | Size (chars/4) | Lines | Sources | Rounds |
|---|---|---|---|---|---|
| X01 | `library/core/autonomy/CONTRACT.md` | 1,153.75 (4,615) | 89 | 5 | 2 |
| X02 | `library/core/security/SECURITY.md` | 1,178.00 (4,712) | 61 | 9 | 2 |
| X03 | `library/core/versioning/VERSIONING.md` | 888.25 (3,553) | 87 | 3 | 2 |
| N00 | `library/engines/CONTRACT.md` | 1,176.00 (4,704) | 100 | 5 | 2 |
| N01 | `library/engines/phaser/` | RULES 935.5; API 1,096.75; PITFALLS 920.75; RECIPES 557.25; selftest 208 lines | — | 9 | 2 |

## Review changes

- **X01**: no content change; all four files completed. Accepted with the
  worktree-branch note below.
- **X02**: header `Must be denied`; wrapper wording; docs completed; size synced
  to 4,712 / 1,178.0. Accepted with the template-enforcement note below.
- **X03**: line 53 no longer claims a `--prune` flag; it says a separate prune
  pass is not implemented in v0.3. Final 3,553 / 888.25 / 87; 11.75 tokens under
  the 900 cap, 8.25 over the 880 band top, disclosed.
- **N00**: `files` now excludes `manifest.json` (a manifest cannot hash itself);
  the selftest must fail on an empty list, a missing file, an extra file, or a
  hash mismatch. Permission rows are a diff the user applies; installers never
  edit `opencode.json`. The seed now names `packs: {}` and
  `default_agent: "partner"`. Report synced to 4,704 / 1,176.0 / 100.
- **N01**: manifest now has `parts: ["docs","recipe"]`, five `files`, five
  `hashes`, object `apiSource`, and `upgrade: "none"`. `selftest.mjs` is 208
  lines and fails on empty files, wrong hash, string `apiSource`, bad `upgrade`,
  and extra files; five mutations were exercised. Docs synced.
- **CLI01 integration**: `tools/new-project.mjs` and its staging artifact now
  write `packs: {}` and `default_agent: 'partner'`. 250 lines / 11,354 chars /
  2,838.5 tokens; 55/55 checks. `docs/build/CLI01` synced from the old
  11,317 / 2,829.25 / 53-check numbers.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b16-smoke.mjs`: **390
checks, 0 failures** (366 existing + 24 new). It confirms the three core docs,
the engine contract, the Phaser pack, the N01 manifest and hashes, the N01
selftest, and CLI01's new fields. Core shape: 10 rules, 4 agents, 13 skills, 3
crews, 5 gates, 12 evals, 10 tools, 6 commands, 32 permissions.

## Integration decisions

- Core docs live under `library/core/{autonomy,security,versioning}/`.
- The engine contract lives at `library/engines/CONTRACT.md`; the Phaser pack at
  `library/engines/phaser/` with its own `manifest.json` and `selftest.mjs`.
- Build docs copied to `docs/build/{X01,X02,X03,N00,N01}/`.
- CLI01 is the only tool changed in this batch; no template permissions changed.

## Open issues

1. **N01 beta uses an exact pin.** N00 says `beta` uses a floor and ceiling;
   N01 has `stability: beta` and `engineRange: "4.2.1"`. Resolve before N02/N03
   by either allowing a beta exact pin read from the tarball or changing N01.
2. **N01 pitfalls include unverified entries.** N00 says `PITFALLS.md` is
   reproduced failures only; four of seven are labeled unverified with recipes.
   A beta exception, or move them to a candidate section, is needed.
3. **N01 recipes are prose.** N00 names `step | cmd | required | artifact |
   mode`; the pack uses R0–R5 prose because R1–R5 are manual browser checks.
   Decide whether `manual` recipes may stay prose.
4. **X02 policy is stricter than the template.** The deny table names `.pem`,
   `.key`, `secrets/*`, `id_*`, `ssh`, `scp`, `gh api -X`, and store upload;
   `template/opencode.json` enforces only a subset. Ship a permission patch or
   mark the table as policy guidance.
5. **`THIRD-PARTY.md` does not exist** as a template file, though the license
   section requires it. Decide root, `docs/`, or first-import generation.
6. **No incident drill.** E12 scores release safety, not leak response. E13 is a
   candidate, not in v0.3.
7. **X01 worktree branch** is `run/<YYYY-MM-DD>`; two runs on one day collide.
   Use a slug or timestamp in v0.3.1.
8. **N01 runtime behaviour is not tested.** P1–P4 and P7 are unverified; the
   browser recipes were not run. The pack is beta for this reason.
9. **CLI01 historical review** says 53 checks; the tool now has 55. The Batch 10
   review is historical; this review is the current count.

## Next

Batch 17: N02 Unity pack, N03 Godot pack, and the pack manifests. Resolve issues
1–3 before copying the N01 shape.
