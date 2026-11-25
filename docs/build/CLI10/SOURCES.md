# CLI10 - capture: sources

Nine repositories were read on 2026-11-25: four gamedev, three software, two
AI-agent. Star counts and licenses come from the GitHub REST API on the same
day; the API was reachable for these nine, so numbers are exact rather than
rounded. Every quote marked "verified in source" was read from the raw file at
the path shown. No source code was copied and `tools/capture.mjs` has no runtime
dependency on any of these projects.

## Gamedev

### 1. bevyengine/bevy - screenshot example

- URL: https://github.com/bevyengine/bevy
- Stars: 50,003 (API, 2026-11-25)
- Last push: 2026-11-25
- License: Apache-2.0
- Artifact: `examples/window/screenshot.rs`
- Quote (verified in source): `let path = format!("./screenshot-{}.png", *counter);`
  and `.spawn(Screenshot::primary_window())` followed by
  `.observe(save_to_disk(path));`
- Borrowed: a capture is requested now and a file appears only when the write
  completes; the engine holds the frame until the png is saved. Capture does the
  same at process level: the browser writes `<out>.part`, and the final name is
  created by `renameSync` only after the bytes are complete.
- Rejected: the ECS, the render graph and the in-engine API. Evidence must be
  collectable from a terminal without adding code to the game.

### 2. mrdoob/three.js - end-to-end screenshot runner

- URL: https://github.com/mrdoob/three.js
- Stars: 119,381 (API, 2026-11-25)
- Last push: 2026-11-25
- License: MIT
- Artifact: `test/e2e/puppeteer.js`
- Quote (verified in source): `await fs.rm( 'test/e2e/output-screenshots', { recursive: true, force: true } );`
  followed by `await fs.mkdir( 'test/e2e/output-screenshots' );`
- Borrowed: one fixed output directory, created fresh per run, so a stale file
  can never be mistaken for a fresh capture. Capture owns `evidence/` and
  refuses to write outside it for the same reason.
- Rejected: pixel comparison and image baselines. Capture proves a frame
  existed; judging it is the reviewer's job, and a diff engine would add a
  reference-image corpus the template does not have.

### 3. phaserjs/phaser - CaptureFrame game object

- URL: https://github.com/phaserjs/phaser
- Stars: 40,784 (API, 2026-11-25)
- Last push: 2026-08-21
- License: MIT
- Artifact: `src/gameobjects/captureframe/CaptureFrame.js`
- Quote (verified in source): "A CaptureFrame is a special type of GameObject
  that allows you to capture the current state of the render. For example, if
  you place a CaptureFrame between two other objects, it will capture the first
  object to a texture, but not the second."
- Borrowed: the unit of evidence is one frame of the render, not a stream. That
  is why capture takes a single still and says so in `--help`.
- Rejected: the texture and framebuffer path. It needs a running scene, a
  renderer and game code, and it produces a texture, not a file a reviewer can
  open.

### 4. love2d/love - captureScreenshot

- URL: https://github.com/love2d/love
- Stars: 9,006 (API, 2026-11-25)
- Last push: 2026-11-05
- License: zlib for LOVE itself, per `license.txt`; GitHub reports NOASSERTION
  because the file bundles third-party licenses
- Artifact: `src/modules/graphics/wrap_Graphics.cpp`
- Quote (verified in source): `int w_captureScreenshot(lua_State *L)` and the
  registration `{ "captureScreenshot", w_captureScreenshot },`
- Borrowed: the name and the shape - one call, one file, no options that change
  what "capture" means. The flag is `--claim`/`--out`, and there is no format
  selector, because a second format would be a second tool.
- Rejected: the Lua API. It captures the running game from inside the game, so
  it cannot produce evidence for a build the reviewer has not started.

## Software

### 5. puppeteer/puppeteer - launcher flag selection

- URL: https://github.com/puppeteer/puppeteer
- Stars: 95,903 (API, 2026-11-25)
- Last push: 2026-11-25
- License: Apache-2.0
- Artifact: `packages/puppeteer-core/src/node/ChromeLauncher.ts`
- Quote (verified in source): `headless === 'shell' ? '--headless' : '--headless=new',`
- Borrowed: `--headless=new` as the default headless mode, because the new mode
  shares the screenshot path with a real browser window. Capture also copies the
  habit of assembling a flag vector before spawning, so the arguments the
  browser receives are one readable list.
- Rejected: the protocol client, the browser downloader and the 300 MB install.
  Capture drives the installed browser through its own command line, which keeps
  the tool at one file.

### 6. microsoft/playwright - screenshot preparation

- URL: https://github.com/microsoft/playwright
- Stars: 101,061 (API, 2026-11-25)
- Last push: 2026-11-25
- License: Apache-2.0
- Artifact: `packages/playwright-core/src/server/screenshotter.ts`
- Quote (verified in source): `function inPagePrepareForScreenshots(screenshotStyle: string, hideCaret: boolean, disableAnimations: boolean, syncAnimations: boolean) {`
- Borrowed: the idea that a screenshot is prepared rather than taken: visual
  noise is removed before the frame is captured. Capture's equivalent is
  `--hide-scrollbars` and `--force-device-scale-factor=1`, so the same `--size`
  yields the same pixels on a HiDPI laptop.
- Rejected: the in-page preparation script and the browser download. Injecting a
  script into the page would make the tool a test runner and would change what
  the game renders.

### 7. sindresorhus/pageres-cli - dated filename and delay

- URL: https://github.com/sindresorhus/pageres-cli
- Stars: 1,745 (API, 2026-11-25)
- Last push: 2025-09-09
- License: MIT
- Artifact: `readme.md`
- Quote (verified in source): `pageres https://sindresorhus.com 1024x768 --filename='<%= date %> - <%= url %>'`,
  with `##### --delay=<number>`, `-d` documented as the wait before the shot.
- Borrowed: the date in the artifact name and a wait that is a first-class
  option. Capture writes `evidence/<YYYY-MM-DD>-<claim>/capture.png` and exposes
  the wait as `--wait`.
- Rejected: the resolution matrix, the templating language and the npm
  dependencies. Capture takes one URL at one size; a second size is a second
  command with its own claim.

## AI-agent

### 8. browser-use/browser-use - screenshot storage service

- URL: https://github.com/browser-use/browser-use
- Stars: 122,053 (API, 2026-11-25)
- Last push: 2026-11-24
- License: MIT
- Artifact: `browser_use/screenshots/service.py`
- Quote (verified in source): "Simple screenshot storage service that saves
  screenshots to disk", class `ScreenshotService`, constructed with
  `agent_directory: str | Path`.
- Borrowed: screenshots are stored through one service rooted at one directory,
  not written wherever the caller happens to be. Capture treats `evidence/` as
  that root and makes every other location unreachable.
- Rejected: the agent loop, CDP events and the watchdog that fetches screenshots
  on demand. Capture is one synchronous command with one output.

### 9. microsoft/playwright-mcp - output directory rule

- URL: https://github.com/microsoft/playwright-mcp
- Stars: 40,141 (API, 2026-11-25)
- Last push: 2026-11-18
- License: Apache-2.0
- Artifact: `README.md`
- Quote (verified in source): "path to the directory for automatically named
  output files, for example a screenshot taken without an explicit file name.
  Files with an explicit name are resolved against the workspace root instead
  and are not affected by this option." (documenting `--output-dir <path>`)
- Borrowed: the split between a default output directory and an explicit name.
  Capture has both - `--out` defaults to `evidence/<date>-<claim>/capture.png` -
  and it closes the gap the quote leaves open: an explicit name is still
  required to resolve inside `evidence/`.
- Rejected: the accessibility-snapshot-first philosophy, stated in the same
  README as "bypassing the need for screenshots or visually-tuned models".
  Capture exists precisely to produce the visual artifact that a snapshot
  cannot replace.

## Considered and rejected

These are not part of the nine: they were read or evaluated and dropped.

- `godotengine/godot` (120,813 stars, MIT, last push 2026-11-25) - screenshots
  are taken by the running game through the viewport API, and the CLI's media
  path is movie recording. Rejected: engine-side capture and video are both
  outside a one-file evidence tool.
- `browserbase/stagehand` - evaluated as an agent-side screenshot source. The
  repository listing could not be read through the CDN at read time, so no
  artifact or license line could be verified. Dropped rather than cited blind.

## Dead ends

- A batch file or `.cmd` stub as the test browser. Node refuses to spawn
  `.cmd`/`.bat` without a shell (`EINVAL`), so the suite could only pass by
  reintroducing `shell: true`, which the security rule forbids. The `.js`
  browser seam exists because of this.
- `--serve`, the static server used by the Wordblocks predecessor of this tool.
  Dropped: the game is already running at a URL, and a second server adds a
  port, a shutdown path and a second failure that has nothing to do with
  evidence.
- Video capture through the browser's media APIs. Dropped: out of scope, and a
  moving artifact cannot be cited line by line in a review.
- Driving the browser over CDP with a small hand-written client. Dropped: it
  duplicates the command line the browser already exposes, and it is more code
  than the whole tool.
- Treating `--virtual-time-budget` as a "page is ready" signal. Dropped as a
  claim: it advances virtual time, it does not prove network idle. Documented in
  `REPORT.md` under open questions.

## License note

Every repository above is permissive: Apache-2.0 (bevy, puppeteer, playwright,
playwright-mcp), MIT (three.js, phaser, pageres-cli, browser-use) and zlib
(love2d, reported as NOASSERTION because its `license.txt` bundles several
third-party licenses). Ideas were reused, code was not: no file in
`artifact/` contains lines from these projects, and capture runs with Node
builtins only.
