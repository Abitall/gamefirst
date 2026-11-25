# Phaser 4.2.1 — recipes

Scope: R0 is a command and checks files only. R1–R5 are manual browser checks in a real project that installed `phaser@4.2.1`. This pack has no automated browser test and must not be described as one.

## R0. Pack selftest — command

```bash
node library/engines/phaser/selftest.mjs
```

Pass: exit 0 and one `ok ... pin 4.2.1` line.
Fail: exit 1 with `FAIL ...`; fix the pack before scene work. The script checks packaging, not Phaser behaviour.

## R1. Scene boot — manual

1. `npm run dev`; open the URL Vite prints.
2. In DevTools, confirm `game.renderer instanceof Phaser.Renderer.WebGL.WebGLRenderer` is `true`.
3. `npm run build`.

Pass: the canvas appears, the first scene runs, the console is clean, the renderer check is `true`, and the build exits 0.

## R2. Input on a scaled canvas — manual

1. Show `pointer.x`, `pointer.y`, `pointer.worldX`, `pointer.worldY` in a debug text object.
2. DevTools device toolbar: test at 50%, 100% and 150%.
3. Click the centre of a known sprite at each size.

Pass: `worldX/worldY` match the sprite position within 2 px at every scale, and the highlight lands on the clicked sprite.

## R3. Asset load — manual

1. Open the Network tab, filter the asset, reload.
2. Rename the asset file, reload.
3. Restore the file.

Pass: step 1 shows 200 and the texture renders; step 2 shows a loader error in the console or through `this.load.once('loaderror', ...)`, not a silent empty texture; step 3 returns to step 1.

## R4. Physics collider — manual

1. Run with `arcade.debug: true`; one dynamic sprite above a static platform.
2. Let it fall, then call `body.reset(x, y)` to move it elsewhere.

Pass: the sprite rests on the platform with `body.velocity.y` near 0; after `reset` it continues from the new position and no collider fires at the old one.

## R5. Save and teardown — manual

1. Write state to `localStorage`, reload, restore it.
2. Enter and leave the scene three times, creating one runtime texture per visit.
3. Press a gameplay key once after leaving the scene.

Pass: state restores; no "Texture key already in use"; the texture count returns to its baseline after each visit; one keypress fires one handler. This is the check for P3 and P7.
