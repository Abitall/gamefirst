# N01 — sources

Stars were read on 2026-11-25 from each repository page (`stargazerCount` in the HTML). The unauthenticated GitHub REST API returned 403, so no API figures are used. Where a license is not displayed on the page, the pack borrows only names, commands or structure from that repository and copies no code.

## Gamedev (4)

### 1. phaserjs/phaser

- URL: https://github.com/phaserjs/phaser
- Stars: 40,784
- License: MIT
- Artifact: npm package `phaser@4.2.1`, tarball sha512 `WUNwCPJpdjvZiuT6SgCfYVW8Qw/3j0jJ4ws7P2QkhFLFu74sbGuyHJcbFueGkY/AYO4Pi47bNQXn1OCJeLX//w==`; files used: `types/phaser.d.ts`, `skills/scenes/SKILL.md`, `changelog/v4/`.
- Analog: `API.md`, `RULES.md`, `PITFALLS.md`.
- Borrow: the pinned member signatures with line numbers; the lifecycle statement; the scene-plugin transition set; `worldX`; the texture API.
- Quote (verbatim, `types/phaser.d.ts`): `start<T extends Phaser.Scene>(key?: (T|string), data?: object): this;`
- Quote (verbatim, `skills/scenes/SKILL.md`): `Scenes are the organizational backbone of a Phaser game.`
- Reject: the engine source, the bundled examples, and every unversioned page as evidence.

### 2. phaserjs/examples

- URL: https://github.com/phaserjs/examples
- Stars: 1,671
- License: not displayed on the repository page.
- Analog: `RECIPES.md`.
- Borrow: the shape only — one mechanic per runnable example, a stated action and a visible pass condition.
- Quote: no text is quoted; this is a structural borrow and no code or wording is copied.
- Reject: the example code, because the repository targets Phaser 3 APIs.

### 3. phaserjs/template-vite-ts

- URL: https://github.com/phaserjs/template-vite-ts
- Stars: 198
- License: MIT
- Analog: `RECIPES.md` R0–R1.
- Borrow: project layout and scripts — source under `src/`, scenes in their own folder, Vite dev/build commands.
- Quote (verbatim, repository description): `A Phaser 3 project template that uses TypeScript and Vite for bundling`
- Reject: its Phaser 3 dependency and API usage. The pack does not inherit its version.

### 4. phaserjs/create-game

- URL: https://github.com/phaserjs/create-game
- Stars: 73
- License: not displayed on the repository page.
- Analog: `RECIPES.md` R1.
- Borrow: the official bootstrap command as the prerequisite for the manual recipes.
- Quote (verbatim, Phaser README): `npm create @phaserjs/game@latest`
- Reject: the CLI implementation and its templates; only the command name is used.

## Software development (3)

### 5. nodejs/node

- URL: https://github.com/nodejs/node
- Stars: 124,003
- License: the page reports `NOASSERTION`; no code is copied.
- Analog: `selftest.mjs`.
- Borrow: the built-in runner and its contract — a zero exit on success, a non-zero exit on failure, one readable reason.
- Quote (verbatim command): `node --test`
- Reject: any dependency on Node internals or on a test framework beyond the built-in runner.

### 6. microsoft/playwright

- URL: https://github.com/microsoft/playwright
- Stars: 101,066
- License: Apache-2.0
- Analog: `RECIPES.md` (R1–R5 are the manual form of the same checks).
- Borrow: the browser-smoke shape — open the page, wait for the canvas, fail on a console error.
- Quote (verbatim command): `npx playwright test`
- Reject: shipping Playwright in the pack. The pack has no automated browser test and the selftest does not pretend to be one.

### 7. npm/node-semver

- URL: https://github.com/npm/node-semver
- Stars: 5,477
- License: ISC
- Analog: `manifest.json` (`engineRange`), `selftest.mjs` pin check.
- Borrow: exact-version semantics — `"4.2.1"` accepts 4.2.1 only.
- Quote (verbatim range): `"4.2.1"`
- Reject: caret and tilde ranges; a patch drift must fail the pin, not pass silently.

## AI-agent (2)

### 8. anthropics/skills

- URL: https://github.com/anthropics/skills
- Stars: 200,452
- License: not displayed on the repository page.
- Analog: frontmatter shape of the pack's skill-facing files.
- Borrow: a skill file opens with YAML frontmatter carrying `name` and `description`, and the description states when to load it. The pinned Phaser package uses the same shape, e.g. `skills/scenes/SKILL.md` starts with `name: scenes`.
- Quote (verbatim keys): `name:` / `description:`
- Reject: any copied prose or example from the repository.

### 9. agentsmd/agents.md

- URL: https://github.com/agentsmd/agents.md
- Stars: 25,707
- License: MIT
- Analog: how a project points an agent at this pack.
- Borrow: the root-level `AGENTS.md` convention as the place that names the engine pack and its version.
- Quote (verbatim filename): `AGENTS.md`
- Reject: the site's examples; the pack only relies on the file name and the root placement.

## Dead ends

- `excaliburjs/Excalibur` (2,385, BSD-2): considered for the fourth gamedev slot. Rejected — a different engine adds no Phaser 4.2.1 fact, and its star count is irrelevant to this pin.
- `modelcontextprotocol` (9,766): considered as the second AI-agent source. Rejected — MCP is runtime plumbing, while the framework's need is the root instruction file (`AGENTS.md`).
- GitHub REST API: 403 unauthenticated, so star counts come from the repository HTML and are dated.
- `phaserjs/template-vite-ts` and `phaserjs/examples` are Phaser 3 artifacts: their code was rejected, structure and recipe shape only.
- `docs.phaser.io` version selector defaults to the latest release: an unversioned page cannot prove a 4.2.1 symbol.
- Assumption corrected during research: `setTintFill()` was expected to be removed in Phaser 4. The 4.2.1 typings still declare it (L14206), so the pack says "deprecated", not "absent".
