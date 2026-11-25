# Phaser 4.2.1 — verified API surface

Authority: `types/phaser.d.ts` from the pinned npm package `phaser@4.2.1` (tarball sha512 `WUNwCPJpdjvZiuT6SgCfYVW8Qw/3j0jJ4ws7P2QkhFLFu74sbGuyHJcbFueGkY/AYO4Pi47bNQXn1OCJeLX//w==`). Line numbers refer to that file.

Public docs: https://docs.phaser.io/api-documentation/api-documentation — select 4.2.1 in the version selector. The unversioned page tracks the latest release and is not evidence for this pin.

Verified 2026-11-26. This is the surface the project uses, not the whole engine.

## Scenes

Declared on `class Phaser.Scene` (L130440): `add` (GameObjectFactory), `cameras`, `children`, `events` (L130499), `game` (L130457), `input`, `load`, `physics` (ArcadePhysics), `registry`, `renderer` (L130612), `scale`, `scene` (ScenePlugin, L130527), `sys` (L130450), `textures` (L130492), `time`, `tweens`.

`this.scene` members, checked verbatim:

- `start<T extends Phaser.Scene>(key?: (T|string), data?: object): this;` — L129775
- `restart(data?: object): this;` — L129784
- `launch<T extends Phaser.Scene>(key: (T|string), data?: object): this;` — L129840
- `sleep<T extends Phaser.Scene>(key?: (T|string), data?: object): this;` — L129886
- `wake<T extends Phaser.Scene>(key?: (T|string), data?: object): this;` — L129896
- `switch<T extends Phaser.Scene>(key: (T|string), data?: any): this;` — L129906
- `stop<T extends Phaser.Scene>(key?: (T|string), data?: any): this;` — L129916

Other `ScenePlugin` members may exist; only these are cleared for use without a fresh check.

## Scale, camera, input, math

- `Phaser.Scale.FIT` — `const FIT: number;` L128944; `Phaser.Scale.CENTER_BOTH` — `const CENTER_BOTH: number;` L128892 (namespace `Scale` L128112).
- Camera shake — `shake(duration?: number, intensity?: number | Phaser.Math.Vector2, force?: boolean, callback?: Function, context?: any): this;` L4014, called as `this.cameras.main.shake(...)`.
- `Phaser.Input.Pointer.worldX` — `worldX: number;` L86032. `worldY` sits beside it; use the pair for canvas picks.
- `createCursorKeys(): Phaser.Types.Input.Keyboard.CursorKeys;` L84859 on the keyboard plugin (`this.input.keyboard`).
- `Phaser.Math.TAU` — `var TAU: number;` L91671 (= 2 * PI).

## Textures

- `class TextureManager` — L135231; reached as `this.textures`.
- `exists(key: string): boolean;` — L135640.
- `remove(key: string | Phaser.Textures.Texture): Phaser.Textures.TextureManager;` — L135313.
- `createCanvas(key: string, width?: number, height?: number): Phaser.Textures.CanvasTexture | null;` — L135409.
- `addCanvas(key: string, source: HTMLCanvasElement, skipCache?: boolean): Phaser.Textures.CanvasTexture | null;` — L135419.

## Physics (Arcade)

- `collider(object1, object2, collideCallback?, processCallback?, callbackContext?): Phaser.Physics.Arcade.Collider;` — L111659.
- `this.physics.add.sprite(x, y, key, frame?)` — `sprite(...): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;` L111718 on the Arcade factory.
- `Body.reset(x: number, y: number): void;` — L110298; the supported teleport.

## Rendering and config

- `Phaser.AUTO` L5602, `Phaser.CANVAS` L5608, `Phaser.WEBGL` L5615. TypeScript doc on `GameConfig.type` (L95732, verbatim): "AUTO picks WEBGL if available, otherwise CANVAS."
- `class Phaser.Game` L5669: `renderer` L5686, `canvas` L5703, `events` L5727, `textures` L5741, `scene` L5769, `scale` L5784, `loop` L5801.
- `Phaser.TintModes` enum — L128073; `setTintMode(mode: number | Phaser.TintModes): this;` L14199.
- `addMask(mask?, invert?, viewCamera?, viewTransform?, scaleFactor?): Phaser.Filters.Mask;` — L18840.
- `Phaser.Scenes.Events.SHUTDOWN` — `const SHUTDOWN: string;` L82369.

## Absent in 4.2.1 (checked, zero matches)

- `shakeCamera` — no such member. Shake a camera instead (L4014).
- `Phaser.Geom.Point` — the `Geom` namespace exists, `Point` under it does not. Pick a type that exists in the typings.
- `setTintFill()` — present (L14206) but deprecated; new code uses `setTint` + `setTintMode`.

## How to check a symbol

```bash
grep -n "start<T extends Phaser.Scene>" node_modules/phaser/types/phaser.d.ts
npx tsc --noEmit
```

1. Grep the installed typings, not a website snippet.
2. Search `node_modules/phaser/changelog/` for a rename.
3. If the symbol is absent, use a verified replacement or record a spike and stop (E11). Never patch the typings, wrap the engine to fake the member, or pin an older Phaser.
