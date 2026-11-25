# Phaser 4.2.1 — pitfalls

Status: **verified** = confirmed against the pinned 4.2.1 tarball (typings or changelog); **unverified** = reported but not reproduced in this pack. Each unverified entry names the recipe that confirms or kills it.

## P1. Clicks land away from the target on a scaled canvas — unverified

- Symptom: at any window size other than the design size a click hits a neighbouring cell; the error grows with the zoom.
- Cause: the position came from `clientX`, `offsetX` or a manual `getBoundingClientRect()` calculation. Scale.FIT scales the canvas in CSS, so those are CSS pixels.
- Fix: `pointer.worldX` / `pointer.worldY` for world objects (L86032), `pointer.x` / `pointer.y` for game-space UI.
- Check: R2 at 50% and 150%.

## P2. An asset requested in `create()` never appears — unverified

- Symptom: no error, the object is missing or has a placeholder texture; the Network tab shows no request.
- Cause: `this.load.*` was called after the loader had already completed. The loader only runs between `preload()` and `create()`.
- Fix: move the call to `preload()`; if it must be dynamic, start the loader explicitly and wait for `complete`.
- Check: R3.

## P3. Scene restart leaks textures and logs a key collision — unverified

- Symptom: the second visit prints "Texture key already in use" (or silently reuses the old image); memory grows with every restart.
- Cause: a runtime texture was created with a fixed key on every `create()`. `this.textures` is game-global and outlives the scene.
- Fix: guard with `this.textures.exists(key)` (L135640) before `createCanvas` (L135409) / `addCanvas` (L135419), or create it once in a boot scene; call `remove(key)` (L135313) when the scene owns it.
- Check: R5.

## P4. Teleported physics body still collides at the old position — unverified

- Symptom: the sprite appears at the new place but one frame later snaps back, or a collider fires where nothing is visible.
- Cause: `sprite.x` / `body.position` was written directly; Arcade Physics syncs the body from the game object and overwrites the write.
- Fix: `body.reset(x, y)` (L110298) for teleports; velocity for ordinary movement.
- Check: R4.

## P5. A rendering feature works on one machine and is blank on another — verified

- Symptom: filters or shader effects are missing, or startup warns about the Canvas renderer, only on some machines.
- Cause: `Phaser.AUTO` fell back to Canvas. The 4.2.1 typings say (L95732): "AUTO picks WEBGL if available, otherwise CANVAS." Canvas is deprecated in Phaser 4 and does not implement the WebGL feature set.
- Fix: set `type: Phaser.WEBGL` (L5615); if the game must run without WebGL, state it and test it explicitly.
- Check: R1.

## P6. Phaser 3 names fail at runtime — verified

- Symptom: `this.cameras.shakeCamera is not a function`; `Phaser.Geom.Point is not a constructor`.
- Cause: code copied from a Phaser 3 tutorial. Both symbols were checked against 4.2.1 typings: zero matches.
- Fix: `this.cameras.main.shake(duration, intensity)` (L4014); use a type that exists in the typings instead of `Geom.Point`. `setTintFill()` exists but is deprecated: use `setTint(color)` + `setTintMode(Phaser.TintModes.FILL)` (L14199).
- Check: `API.md` absent list; grep the installed typings.

## P7. A handler fires twice after leaving a scene — unverified

- Symptom: one keypress runs the old scene's handler again; the console mentions a freed object.
- Cause: the listener was attached to `this.game.events` or `window`, which are not scene-scoped, and was never removed.
- Fix: remove it in `this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)` (L82369); prefer scene input for gameplay keys.
- Check: R5.
