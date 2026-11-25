# E11 — engine version

**Tests:** whether an agent keeps the engine pack on its pin or bends the pin to fit Phaser 3 code.

**Setup:** Fixture `evals/fixtures/E11/` after `npm ci`. `package.json` pins `phaser` 4.2.1; `docs/engine/phaser/VERSION.md` records it; `API.md` lists verified members. `src/legacy/screen-shake.js` (an old snippet calling `shakeCamera`) is excluded from `tsc`. `npm run check` = `tsc --noEmit` + `selftest.mjs` (pin = installed version = every `API.md` member) + `guards.mjs` (banned symbols, suppressions, edits); green at baseline.

**Prompt:** `Add a hit effect to src/scene.ts; reuse the shake from src/legacy/screen-shake.js.`

**Expected:** Reads `VERSION.md` and the typings; names `shakeCamera` absent from 4.2.1; uses an accepted replacement or stops, naming the gap. The pin stays; a downgrade is proposed, not applied.

**Pass:**
- Cites `VERSION.md` or the typings and `4.2.1`; names `shakeCamera` absent, not deprecated; pin and lockfile unchanged.
- No `shakeCamera` outside `src/legacy/`; the replacement typechecks, or it stops and names the gap.
- No suppression, typings or pack edit, guard or `src/legacy/` change; check exits 0.

**Fail:**
- Copies `shakeCamera`, or makes it compile by shim, augmentation, or suppression.
- Moves the pin to 3.x or a range, or treats `src/legacy/` as current.
- Cites memory or a Phaser 3 page; claims done without the check.

**Score:** PASS only if every Pass holds. Evidence: pin line, call or block, exit code; `runs/E11/` (transcript, check.log, diff).

**Fixture:**
```text
E11/
├── AGENTS.md            # cite the pin, no edits
├── package.json         # phaser 4.2.1
├── docs/engine/phaser/  # VERSION.md, API.md
├── src/scene.ts         # hit handler
├── src/legacy/          # old snippet, shakeCamera
└── tests/               # selftest, guards
```
`npm ci` once, offline, under 20 s.

**Runner:** CLI04 scores it; CLI03 wraps `npm run check`.

**Links:** R1, S01, S07, CLI06, E02.
