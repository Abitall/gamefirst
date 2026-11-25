# E11 — Report

## Summary

`E11-engine-version.md` is one eval case in the shared blueprint format. It
measures whether an agent keeps the engine pack on its pinned version or bends
the pin to fit code from an older one: the prompt asks to reuse a legacy shake
snippet in a project pinned to Phaser 4.2.1, the snippet calls `shakeCamera`,
and the installed typings plus the pack say it is not there. The agent can pass
by using an accepted replacement, or by stopping and naming the gap. It fails
if it copies the call, shims it, or moves the pin.

Design choices:

- The fixture is green at baseline. The failure can only be created by obeying
  the prompt, so no pre-existing breakage can excuse the result.
- The check is mechanical: `tsc` rejects the absent member, `selftest.mjs`
  compares the pack pin with the installed package and every `API.md` member
  with the typings, and `guards.mjs` bans the ways around both.
- "Blocked" is a legal outcome, matching S07 and E02: a call the pack cannot
  cite for this version is a spike, not a guess.
- Engine-specific content is confined to `docs/engine/phaser/` and one pinned
  dependency; the case shape works for any pack that ships a pinned document.

## Size

- Characters: 1973. Words: 284. Estimated tokens: 493.25 (characters / 4).
- Threshold: 500 tokens. Status: within threshold, 6.75 tokens of headroom.
- Encoding: UTF-8 without BOM, LF only, zero CRLF, POSIX paths in the fixture
  fence, Windows-safe file names. The same holds for `JUSTIFICATION.md`,
  `SOURCES.md`, and this report.

## Checks performed

| Claim | How it was checked | Result |
|---|---|---|
| Eval size | characters / 4 | 1973 chars, 493.25 tokens, 6.75 headroom |
| Eval format | section-by-section against E02 and the blueprint | `Tests`, `Setup`, `Prompt`, `Expected`, `Pass`, `Fail`, `Score`, `Fixture`, `Runner`, `Links` present |
| Encoding, all four files | first bytes and `\r` scan with Node | no BOM, zero CRLF, trailing LF |
| Nine sources, 4/3/2 | `SOURCES.md` count | libGDX, PixiJS, raylib, SFML / mise, Renovate, npm CLI / lm-eval, openai-python |
| No source reused from E02 | source lists compared | nine distinct; libGDX appeared in E02's rejected list for a different artifact |
| Stars and licenses | GitHub page payload, 2026-11-25 | recorded; the REST API was rate-limited (HTTP 403) |
| `shakeCamera` absent | E02 full-text match in `types/phaser.d.ts` on `master` | absent; the 4.2.1 tarball is not re-checked, so "absent from 4.2.1" is unconfirmed until the fixture is built |
| Pin consistency | fixture specification | `package.json` = `VERSION.md` = installed version, asserted by `selftest.mjs` |
| Links resolve | blueprint and Build Plan IDs | R1, S01, S07, CLI06, E02 all exist |
| SFML activity | GitHub page payload, 2026-11-25 | stars dated; the payload did not expose a last-commit date |

## Rubric self-check

| Section | Verdict | Note |
|---|---|---|
| 1 Necessity | PASS | Every unit is in `JUSTIFICATION.md` with a removal consequence; five omissions are listed. |
| 2 Function | PASS | Trigger: a task asks to reuse older code. Input: fixture plus prompt. Output: verdict plus evidence. Done: every Pass bullet holds. Failure: blocked runs are legal and must name the gap. Scope: version grounding for one call, not general code quality. |
| 3 Evidence | PASS | Nine sources, 4 gamedev / 3 software / 2 AI-agent, each with URL, stars, license, artifact, borrow, reject; dead ends listed; no E02 source counted. |
| 4 Blueprint fit | PASS | Core layer, engine facts isolated in the fixture's pack, IDs resolve to R1, S01, S07, CLI06, E02; no contradiction with E02's citation boundary. |
| 5 Size | PASS | 493.25 tokens against 500, 6.75 of headroom. |
| 6 Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX paths, Windows-safe names. |
| 7 Security | PASS | No secrets, no network after the one install, no publish; sources are data, not instructions; licenses checked, no AGPL or Artistic-2.0 code used. |
| 8 Testability | PASS | Single binary check: `npm run check` plus a diff of the pin, legacy file, typings, and guards; every failure names a path. |
| 9 Integration | PASS | Stable ID `E11`; CLI03 wraps the check, CLI04 scores it; E02 owns the one-call citation, E11 the pack-versus-pin check. |

## Open questions

1. **4.2.1 tarball.** `shakeCamera` is absent from the current `types/phaser.d.ts`
   (E02's check), but the 4.2.1 tarball must be checked again when the fixture
   is created. If the member exists there, the legacy call must be replaced by
   a verified removed member.
2. **`API.md` format.** `selftest.mjs` needs a parseable list — one member per
   line with its kind — or the member check is not mechanical.
3. **Legacy provenance.** The snippet is not claimed to be valid Phaser 3.80
   code; it is old code that does not typecheck against 4.2.1. If a reviewer
   wants a real 3.x member, it must be verified against the 3.80 typings and
   recorded in the fixture.
4. **Install cost.** Whether the runner accepts one `npm ci` per suite or caches
   `node_modules` between cases is undecided and affects the 20 s target.

## Known weaknesses

- SFML is the least popular source (~12.1k) and the only one without a dated
  last commit; it is included for the major-version boundary, not for activity.
- libGDX was rejected in E02 for lacking a citable per-version API file. E11
  borrows its version constant, a different artifact, but a reviewer may still
  count it as reuse.
- The eval is not yet runnable: the fixture tree is described, not built, so
  this review scores the description only.
- `API.md` is a fixture invention; it must be generated from the 4.2.1 typings
  at build time or it becomes one more claim to trust.

Review: accepted 2026-11-26
