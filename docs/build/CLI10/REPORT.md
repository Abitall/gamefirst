# CLI10 - capture: report

**Status:** ready for review
**Artifact:** `artifact/tools/capture.mjs`, assembled to `tools/capture.mjs`
**Scope:** one command that saves one still screenshot as evidence. Video is out
of scope and `--help` says so.

## Summary

`capture` drives an installed Chrome, Edge or Chromium in headless mode and
saves one png under `evidence/<YYYY-MM-DD>-<claim>/capture.png`. It finds the
browser in the standard install locations on Windows, macOS and Linux, or takes
`--browser <path>`. The browser is spawned without a shell, with a throwaway
profile, into a `.part` file; the final name appears only after the browser
exits with code 0 and the file carries a valid png signature. Usage is refused
before anything is written: a non-http(s) URL, a screenshot path outside
`evidence/`, a bad viewport, a bad wait or a missing browser all exit 2 and
touch nothing. A failed capture exits 1 and leaves the previous evidence intact.

The tool has no dependencies beyond Node builtins, makes no network request of
its own, and prints either two human lines or one JSON object.

## Size

| File | Lines | Characters | Words | Tokens (chars / 4) |
|---|---|---|---|---|
| `artifact/tools/capture.mjs` | 221 | 10,135 | 1,256 | ~2,534 |
| `test/run-checks.mjs` | 205 | 13,119 | 1,377 | ~3,280 |
| `JUSTIFICATION.md` | 102 | 11,661 | 2,122 | ~2,915 |
| `SOURCES.md` | 204 | 10,024 | 1,448 | ~2,506 |

Lines are newline-terminated lines, which is what `wc -l` counts. Splitting the
same bytes on `\n` yields one extra field, which is why the artifact can read as
222 lines. The budget is 250 lines for the artifact; it uses 221, leaving 29 for
review fixes.

## Checks

`node test/run-checks.mjs` -> **85 passed, 0 failed, exit 0**. The suite took the
whole run below two seconds on Windows and needs no network and no real browser:
the "browser" is a Node script that logs its argv and writes a fake png.

| Group | Checks | What it proves |
|---|---|---|
| Artifact shape | 6 | at most 250 lines, ASCII, LF, no BOM, `node:` imports only, no `shell:`, no HTTP client |
| `--help` | 6 | Exit 0, every flag listed, all three exit codes, video exclusion, default path, no browser started |
| Usage errors | 9 | Unknown flag, missing/dangling value, JSON shape on misuse, nothing written to disk |
| URL rejection | 7 | `file:`, `ftp:`, `javascript:`, schemeless and `data:` exit 2 and never spawn a browser |
| Option bounds | 7 | Bad `--size` (4 cases) and bad `--wait` (3 cases) exit 2 |
| Out containment | 6 | Outside `evidence/`, `..` climb, absolute path, non-`.png` all exit 2 with the rule named |
| Browser discovery | 3 | Missing file and directory exit 2; the path is named |
| Success | 12 | Exit 0, file at the default path, real png, every headless flag, `.part` target, URL last, no `.part` left |
| Options and slugging | 7 | Claim slug, https, custom size and wait reach the browser, explicit `--out` inside evidence |
| JSON | 6 | One line, `schema: 1`, `ok: true`, byte count, POSIX relative path, empty stderr |
| Failure exits 1 | 11 | Crash, silent exit, HTML payload, empty file, png-then-crash: exit 1, no promoted file, cause named |
| Atomicity and cleanup | 5 | A failed re-run keeps the earlier capture; profile removed on success and failure; `.part` removed |

## Reproduction

Observed on Windows, Node 26.13.0, with a stub browser (no game was running, so a
900-byte png stands in for a real frame):

```text
$ node artifact/tools/capture.mjs --url "http://localhost:5173/?level=2" \
    --claim "demo shot" --size 960x540 --wait 2500 --browser "$TEMP/gf-demo-browser.js"
capture  http://localhost:5173/?level=2
shot     evidence/2026-11-25-demo-shot/capture.png  960x540  908 B  41 ms

$ node artifact/tools/capture.mjs --url "http://localhost:5173" \
    --claim "demo shot" --browser "$TEMP/gf-demo-browser.js" --json
{"schema":1,"ok":true,"error":null,"detail":[],"url":"http://localhost:5173/",
 "claim":"demo-shot","out":"evidence/2026-11-25-demo-shot/capture.png",
 "browser":"C:/Users/.../gf-demo-browser.js","width":1280,"height":720,
 "wait":3000,"bytes":908,"ms":40}

$ node artifact/tools/capture.mjs --url "file:///etc/passwd" --browser "$TEMP/gf-demo-browser.js"
capture: --url must be http or https, not file:
```

The JSON object is wrapped for width; the tool prints it on one line.
The second run overwrote the first file at the same path, which is the documented
same-day behaviour (see open questions).

## Coverage

| Requirement | Where | Proven by |
|---|---|---|
| Screenshot to `evidence/<date>-<claim>/capture.png` | default `out` in `main()` | Success checks 1-3 |
| Screenshot only, video stated as out of scope | `USAGE`, header comment | Help check 4 |
| Find Chromium on Windows/macOS/Linux | `CANDIDATES` + `--browser` | Browser discovery checks |
| `--headless=new --disable-gpu --hide-scrollbars --window-size --virtual-time-budget --screenshot` | flag vector in `main()` | Success checks 4-9 |
| Wait for exit, verify png exists and is non-empty | `launch()` + signature check | Success check 3, failure checks 3-5 |
| Flags `--url --claim --out --browser --size --wait --json --help` | `parseArgs`, `FLAGS` | Help check 2, options checks |
| Refuse non-http(s) URLs | `parseTarget` | URL rejection checks |
| Refuse paths outside `evidence/` | `inside()` + `realpathSync` | Containment checks |
| Exit 0 / 1 / 2 | `main()` return values | Success, failure, usage checks |
| No network except the target, no publish, no shell | imports, `shell: false` | Shape checks 5-6 |

## Open questions

1. **Browser path override.** `--browser` also accepts a `.js` file and runs it
   with the current node. This is what makes the success path testable on
   Windows, where Node refuses to spawn `.cmd` without a shell, but it widens
   the flag beyond "browser binary". Keep it, or drop it and make the suite
   require a real Chrome?
2. **Still image vs video.** The blueprint says "screenshot or video"; this part
   implements stills only and states the exclusion. Is one image enough for a
   review of a moving game, or does the template need a short recording later?
3. **OS coverage.** Windows is the only platform this part ran on. The macOS app
   bundles and the Linux `/usr/bin` names are unverified on real machines, as is
   `--headless=new` on older Chrome builds that only ship the old headless mode.
4. **Evidence path.** A second run on the same day with the same claim overwrites
   the previous png at the same path. CLI03 appends `-2`/`-3` instead. Which is
   right for evidence that a review already links to? And should `evidence/` be
   gitignored by default or committed as part of the review trail?

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | A reviewer needs a visual artifact; the template has no other way to produce one from a running game. |
| 2 | Function | PASS | Every flag and exit code from the part contract is implemented and asserted. |
| 3 | Evidence | PASS | Writes the evidence path and verifies the png signature. Caveat: verified with a stub browser, not a real Chrome. |
| 4 | Blueprint fit | PASS | `tools/capture.mjs`, `evidence/` layout, POSIX paths in output, ASCII and LF. |
| 5 | Size | PASS | 221 of 250 lines; 10,135 characters. |
| 6 | Language | PASS | ASCII, LF, no BOM, English artifact and docs; no mixed line endings. |
| 7 | Security | PASS | http(s) allowlist, containment plus realpath, no shell, no HTTP client, throwaway profile, no secrets read. |
| 8 | Testability | PASS | 85 black-box checks, deterministic, no network, no browser installed. |
| 9 | Integration | CONCERNS | The `.js` browser seam is an extension not named in the blueprint, and same-day overwrite differs from CLI03. Both are documented open questions. |

## Known weaknesses

- No run against a real Chrome in this environment; the flag vector follows the
  browser's documented command line and the sibling Wordblocks tool, not a live
  capture.
- `--virtual-time-budget` advances virtual time; it does not prove the page has
  finished loading. A game that fetches assets after the budget yields a partial
  frame.
- A profile directory that Windows still holds can survive cleanup; the error is
  swallowed so the capture is never lost because of it.
- The same-day overwrite can replace a file a review already links to.
- `--size` is a viewport, not a window: a game that letterboxes keeps the
  letterbox inside the shot.
- Chrome may print to stderr on success; those lines are ignored unless the
  capture fails, so a warning in a successful run is not surfaced.

## Review

Reviewer verdict goes here.

Review: accepted 2026-11-26
