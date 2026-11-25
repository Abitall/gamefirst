# Phaser 4.2.1 — agent rules

Scope: files under `src/game/`. `src/systems/**` and core stay engine-agnostic and must not import Phaser. Pack contract: N00. Version policy: E11.

## 1. Pin and authority

- Engine is `phaser@4.2.1`, WebGL. Read the installed `node_modules/phaser/types/phaser.d.ts` before using a symbol; `API.md` lists the verified subset this pack relies on.
- Phaser 3 tutorials, snippets and memory are not a source. A v3 symbol missing in 4.2.1 is a gap, not a puzzle.
- Missing symbol: stop, record it, use a member that exists in the typings, or escalate. No shims, no `.d.ts` augmentation, no downgrade (E11).

## 2. Scene lifecycle

- One `new Phaser.Game(config)` per page in `src/main.ts`; list scenes in `config.scene`. Never create a second Game to "restart".
- Order: `init(data)` -> `preload()` -> `create(data)` -> `update(time, delta)`. `update` runs only while the scene is RUNNING.
- `preload()` is the only place for `this.load.*`. A load call in `create()` runs after the loader stopped and loads nothing.
- Transitions: `this.scene.start(key, data)` stops the caller; `launch(key, data)` runs in parallel; `sleep`/`wake` for overlays; `restart(data)` for the same scene. Pass data as the second argument and read it in `init(data)`.
- Scene keys are unique strings; keep them in one module, not scattered as literals.

## 3. Input on a scaled canvas

- `Phaser.Scale.FIT` scales the canvas with CSS; DOM coordinates are CSS pixels, not game pixels.
- Use `pointer.worldX` / `pointer.worldY` for world picks and `pointer.x` / `pointer.y` for game-space UI. Never use `clientX`, `offsetX` or `getBoundingClientRect()` for gameplay.
- Keyboard: `this.input.keyboard.on('keydown-SPACE', fn)` or `this.input.keyboard.createCursorKeys()`.
- Do not add DOM listeners for gameplay: they ignore scene pause/sleep and survive scene shutdown.

## 4. Loader and textures

- Declare keys and URLs in `preload()`; react with `this.load.once('complete', ...)`.
- Check `this.textures.exists(key)` before creating a texture at runtime.
- Runtime textures are global, not scene-owned: remove them on shutdown (section 7).

## 5. Physics

- Config: `physics: { default: 'arcade', arcade: { gravity: { x: 0, y: 0 }, debug: false } }`.
- `this.physics.add.sprite(x, y, key)` returns a dynamic body; `this.physics.add.collider(a, b, onHit)` registers collisions.
- Drive movement with velocity; teleport with `body.reset(x, y)`. Writing body position fields directly is overwritten by the next physics step.
- Gameplay rules live in `src/systems/`; the scene reads input, calls systems, and renders.

## 6. Rendering

- `type: Phaser.WEBGL`. Do not rely on `Phaser.AUTO` falling back to Canvas (Canvas is deprecated in Phaser 4) and do not call WebGL directly.
- Effects are filters. `preFX`/`postFX`, pipelines and `BitmapMask` are Phaser 3 names.
- Tint: `setTint(color)`, and `.setTintMode(Phaser.TintModes.FILL)` for a solid fill. `setTintFill()` still exists in 4.2.1 but is deprecated.
- `roundPixels` defaults to `false` in Phaser 4; opt in per object when pixel art needs it.

## 7. Teardown

- Scene children, tweens, timers and scene input are destroyed by the scene. Do not free them by hand.
- Anything outside the scene must be removed in `this.events.once(Phaser.Scenes.Events.SHUTDOWN, ...)`: listeners on `this.game.events`, listeners on `window`, and textures or canvases the scene created.
- Never keep scene objects in module-level variables, autoloads or singletons; they outlive the scene and fail on the next one.

## 8. Before you ship

- Run the pack selftest and the recipes R1–R5 in `RECIPES.md`.
- If a rule here contradicts the installed typings, the typings win: fix the rule in the same change.
