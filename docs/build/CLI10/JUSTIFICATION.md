# CLI10 - capture: justification

Every block is listed with the failure it prevents and where the decision came
from. "Without it" is the concrete symptom a game repository would show, not a
style preference. Source numbers refer to `SOURCES.md`; "rubric N" refers to
`docs/REVIEW-RUBRIC.md`.

## File and process

| Unit | Why | Without it | Source |
|---|---|---|---|
| Shebang and header comment | A copied `tools/capture.mjs` is executable and self-describing in a repo that has no package.json | A maintainer cannot tell what the file does, or that video is deliberately absent, without reading 220 lines | blueprint CLI10; #3 |
| Imports: `node:child_process`, `node:fs`, `node:os`, `node:path` | The tool must run in the assembled template with no install step; the import list is the proof that it has no client, no parser and no HTTP library | A dependency breaks `node tools/capture.mjs` in a bare repo; an added HTTP client opens a second network path nobody audits | rubric 7; #5 |
| `USAGE` text | `--help` is the only documentation shipped inside the game repo | Users guess flag names and exit codes; the video exclusion is invisible and someone files a bug asking for mp4 | blueprint exit codes; #7 |
| `FLAGS` list | One list drives parsing, so an unknown option is an error rather than a silently ignored argument | `--captur` typo runs a default shot into `evidence/<date>-capture/`, and the user finds out at review time | #7 (strict options) |
| `GRACE_MS` (60 s over `--wait`) | A page that never settles must not hang the caller | CI waits until the job timeout, reports "cancelled" and leaves no evidence | #5 (bounded command) |
| `posix()` | Every printed path is repo-relative POSIX | Windows users see `\` in JSON and prose while the rubric requires POSIX paths | rubric 6; blueprint "POSIX paths" |
| `under()` | Candidate paths join an optional environment root | A missing `LOCALAPPDATA` produces `undefined/Google/...` and a confusing search failure | #5 (executable discovery) |
| `process.exitCode = await main()` | Exit status is the integration surface for assembly and CI | A missing browser and a failed capture both look like success; assembly accepts an empty evidence directory | blueprint exit codes |

## Discovery

| Unit | Why | Without it | Source |
|---|---|---|---|
| `CANDIDATES` (14 paths) | Chrome and Edge install per machine and per user on Windows, as app bundles on macOS, and under two names on Linux | A Linux CI box and a macOS laptop report "no browser" while one is installed a directory away | #5 |
| `--browser <path>` | Managed machines keep the browser outside the standard list | The tool is unusable exactly where policy controls the install | #5; rubric 9 |
| `.js`/`.mjs`/`.cjs` path runs under the current node | The suite needs a real external process on Windows, where `spawn` refuses `.cmd` without a shell | The success path can only be tested with a 300 MB install, so on CI it is not tested at all | dead end in `SOURCES.md`; rubric 8 |
| `existsSync` + `statSync().isFile()` | A directory or a stale path must fail as usage, not as a browser crash | `--browser ./chrome` (a folder) spawns, fails with `EACCES`, and is reported as a capture failure | #5 |

## Input guards

| Unit | Why | Without it | Source |
|---|---|---|---|
| `parseArgs` (`--x=y` and `--x y`) | Both spellings appear in scripts and in muscle memory | `--url=http://...` becomes an unknown argument; a URL after a typo flag is silently ignored | rubric 6; #7 |
| `slug()` | `--claim` becomes a directory name | `--claim ../../notes` writes outside `evidence/`; spaces and `#` break shell quoting and links | #9 (explicit names are contained); rubric 7 |
| `stamp()` | Date prefix orders runs and groups evidence by day | Two claims land in one folder and the reviewer cannot say when a shot was taken | #7 (dated filename) |
| `parseTarget` | `new URL` plus an http/https allowlist and a host check | `file://` renders local files into evidence; `javascript:` and `data:` produce a png of something that is not the game | rubric 7 |
| `parseSize` (64..8192 per side) | A viewport has meaningful bounds | `0x0` produces a valid but empty png that passes the signature check; a huge value crashes the browser with a message about memory | #2 |
| `parseWait` (0..600000, digits only) | The wait is milliseconds and must be a number | `--wait 3s` becomes `NaN`, the budget flag is dropped, and the shot shows a blank canvas | #2; #7 |

## Path containment

| Unit | Why | Without it | Source |
|---|---|---|---|
| `evidence/` as the only root | All evidence for a repo lives in one place | Screenshots scatter into `src/` and get committed, or ignored, by accident | #9 (output directory) |
| Default `evidence/<date>-<claim>/capture.png` | The common case needs no path argument | Every caller invents a layout and the evidence tree becomes unreadable | #7 (dated name) |
| `.png` suffix check | Evidence must be an image a reviewer can open | `--out report.json` writes a png into a file no viewer opens, and the error surfaces in the review | #9 (explicit names are still resolved by a rule) |
| `inside()` before any write | String containment is the cheapest correct guard | `--out ../shot.png` overwrites a file outside evidence before anyone notices | rubric 7 |
| `realpathSync` re-check after `mkdir` | A symlinked `evidence/` can point anywhere | A link defeats the string check and the tool writes outside the repo | rubric 7 |
| Same-day same-claim overwrite | One path per claim per day is the stable address a review cites | Deliberate: a re-run refreshes the evidence at the path already quoted. Documented as an open question because it differs from CLI03's `-2` suffix | open question in `REPORT.md` |

## Capture

| Unit | Why | Without it | Source |
|---|---|---|---|
| `launch()` with `shell: false` | URL and path arguments must reach the browser as arguments, never as shell syntax | A URL containing `&` or `"` becomes a shell command; on Windows the tool would need `cmd.exe` in the path | #5; rubric 7 |
| stderr captured, capped at 8 KB | Browser errors are the only diagnosis a headless run leaves behind | A failure reports "exit 1" with no cause, and the user cannot tell a bad URL from a locked profile | #5 |
| Timeout and `SIGKILL` | A browser that ignores the virtual time budget must end the run | CI hangs; the job is cancelled with no png and no message | #5 |
| `--headless=new` | The new headless mode shares the screenshot path with a real window | The old headless implementation renders differently, so evidence disagrees with what a player sees | #5 (line 275) |
| `--disable-gpu` | Build machines have no usable GPU | The GPU process fails repeatedly and the log fills with errors that look like capture failures | #2 |
| `--hide-scrollbars` | A scrollbar is browser chrome, not game content | Every shot shows a scrollbar the game does not have, and every review mentions it | #6 (prepare the frame) |
| `--force-device-scale-factor=1` | HiDPI machines double the png dimensions for the same CSS size | The same `--size` produces 1280x720 here and 2560x1440 on a laptop, so images cannot be compared | #6 |
| `--window-size=W,H` | The requested viewport must be the shot | The browser default 800x600 silently replaces the game resolution the reviewer asked for | #2 |
| `--virtual-time-budget=<ms>` | The game needs frames before anything is drawn | The png is a blank canvas and looks like a broken build | #7 (`--delay`) |
| `--user-data-dir=<mkdtemp>` | A fresh profile avoids locks, stale sessions and first-run pages | Chrome refuses to start next to a running profile, or opens a "restore pages" dialog instead of the game | #5 |
| Write to `<out>.part` | The final name must never name an incomplete file | A killed run leaves a truncated png at the evidence path that looks like a capture | #1 (a file appears only when the write completes) |
| PNG signature check | A 200 error page saved as `.png` is not evidence | A "screenshot" of an HTML error page is cited in a review and nobody opens the file | #3 (a frame, not a file that merely exists) |
| `renameSync` after the check | Promotion is atomic on one filesystem | A reader can open the file mid-write and see half a png | #1 |
| `finally`: remove `.part` and the profile | Temporary data must not accumulate in a CI workspace | Profile directories pile up with random names, and a `.part` file survives the next run | rubric 8 (cleanup checks) |

## Reporting

| Unit | Why | Without it | Source |
|---|---|---|---|
| `emit()` builds one body for both views | The human and JSON reports cannot disagree about what happened | Two code paths drift, and JSON says `ok: true` while the terminal shows a failure | #6 |
| JSON `{schema: 1, ok, error, detail, ...}` | Automation needs one stable object, including on usage errors | Consumers parse sentences, or get no output at all when the command fails | #6 |
| Human report: two lines | People read stdout in a terminal | The tool prints a JSON wall for a one-file operation | #6 |
| Exit 0 / 1 / 2 | Capture failure and misuse must be distinguishable | CI retries a bad invocation forever, or ignores a failed capture as "expected" | blueprint exit codes |
| `hints()` | Every failed run should name the first cause | The reviewer sees "browser exited with 1" and opens the source to learn why | #5 |
| `ms` and `bytes` in the result | The report can state what was captured without opening the file | Evidence claims rest on the folder name alone | #3 |

## Tests

| Unit | Why | Without it | Source |
|---|---|---|---|
| Stub browser as a Node script | The suite must run on Windows, macOS and Linux without a real Chrome | Tests need a browser install, so they run on one developer machine and nowhere else | rubric 8 |
| `STUB_MODE` (`ok`, `html`, `empty`, `crash`, `silent`, `png-then-crash`) | Each failure class needs a deterministic producer | Failure paths are asserted by reading code, not by running it | rubric 8 |
| `run()` via `spawnSync` | The tool must be exercised as a process, with the real exit code | `main()` could be imported and the exit-code contract never tested | rubric 8 |
| `argsOf()` / `flagValue()` read the stub's log | Assertions must see the argv the browser actually received | Tests assert the tool's own variables and pass while the flag order is wrong | rubric 8 |
| 85 checks across shape, help, usage, URL, bounds, containment, discovery, success, JSON, failure, atomicity and cleanup | Each guard above has an observable consequence | A guard can be deleted and the suite stays green | rubric 8 |

## Deliberate exclusions

| Excluded | Why |
|---|---|
| Video capture | Out of scope by the part contract: one still image can be cited; a video needs a player, a codec and a duration policy. Stated in `--help` and in the header. |
| `--serve` static server | The game is already running at a URL. A server would add a port, a shutdown path and a second failure mode. |
| Puppeteer, Playwright, CDP client | A 300 MB dependency for a screenshot the installed browser already takes from its command line. See `SOURCES.md` `#5`, `#6`, `#8`. |
| Image comparison / baselines | Capture proves a frame existed. Judging it needs reference images the template does not ship. |
| Retries on failure | A retry hides the flake a reviewer needs to see. The caller decides how many times to try. |
| Config file | Three defaults (size, wait, claim) live in `--help`. A config file is a fourth place to look and a fifth format to validate. |
| Telemetry or logs | The tool writes one png and nothing else; stdout is the report. |
