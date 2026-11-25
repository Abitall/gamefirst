# Batch 17 review — Unity/Godot engine packs and release pack

Date: 2026-11-26. Verdict: **PASS**.

## Parts

| Part | Artifact | Size | Weight | Sources | Checks |
|---|---|---|---|---|---|
| N02 | `library/engines/unity/` | RULES 4,633 B / 1,159 tok; API 5,122 / 1,281; PITFALLS 422 / 106; RECIPES 1,051 / 263; selftest 10,028 B / 238 lines; manifest 1,002 | beta, `>=6000.0 <6001` | 9 (4/3/2) | selftest 15/15, 8 negative |
| N03 | `library/engines/godot/` | RULES 4,447 / 1,112; API 5,631 / 1,408; PITFALLS 736 / 184; RECIPES 2,080 / 520; selftest 9,868 / 213; manifest 944 | beta, `>=4.0 <5` | 9 (4/3/2) | selftest 21/21, 6 negative |
| P01 | `library/packs/release/` | PACK 4,375 / 1,094; manifest 525; selftest 7,908 / 220; template 1,460 | on-demand | 9 (4/3/2) | selftest 13/13, 2 negative |

Copies: N02 -> `library/engines/unity/`, N03 -> `library/engines/godot/`,
P01 -> `library/packs/release/`. Docs: `docs/build/{N02,N03,P01}/`.

## Smoke

`gamefirst-b17-smoke.mjs`: **155 checks, 0 failures**. 10 rules, 4 agents,
13 skills, 3 crews, 5 gates, 12 evals, 10 tools, 6 commands, 32 permissions,
3 engine packs, 1 implemented pack. Each pack selftest runs; manifests, files,
hashes, `apiSource`, encoding, placeholders and token/line caps are checked.

## Review changes

- **N02:** moved verified API-level traps from `PITFALLS.md` to `API.md`; kept
  `PITFALLS.md` strict to N00 (no reproduced runtime failure, so no entry).
  Candidates remain in `REPORT.md` open questions. `API.md` 1,281 tokens.
- **N03:** followed N00 strictly; `PITFALLS.md` is a status-only file because
  Godot was not installed, so no failure was reproduced. `API.md` has 92 tokens
  of headroom.
- **P01:** selftest and encoding checked at acceptance; report sizes synced.
  `PACK.md` defines the shared pack shape for P02-P07.

## Open issues

1. N02 `apiSource.uri` is an absolute local Unity path, so the pack is beta and
   not portable until a docs URL or machine override is chosen.
2. Neither N02 nor N03 has a runtime reproduction; both `PITFALLS.md` files are
   empty by policy. A runtime run is the only path to `stable`.
3. N01 (Phaser) remains beta with its three Batch 16 deviations: exact pin vs
   range, unverified pitfalls, prose recipes. N02/N03 do not copy them.
4. P01 `requires`/`loaded` have no consumer yet; CLI01/CLI05 read the manifest
   shape but not pack activation. P02-P07 should reuse the P01 contract.
5. Store rules change; P01 links to holder documents rather than dated
   snapshots. Re-read before certification.
6. `library/packs/{obsidian,art,audio,narrative,localization,marketing}` exist as
   empty scaffolds; the smoke counts implemented packs by `PACK.md`.

## Next

Batch 18: P02 obsidian, P03 art, P04 audio, P05 narrative, P06 localization.
Batch 19: P07 marketing. Then final assembly, four reviewers and the final
report.
