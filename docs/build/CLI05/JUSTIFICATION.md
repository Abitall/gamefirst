# CLI05 justification — `sync-agent`

Artifact: `staging/CLI05/artifact/tools/sync-agent.mjs` — 250 lines, 12,170 characters.
Contract: pull, push or diff library parts through `agent.lock.json`; no network,
no submodules, atomic writes, path containment, exit 0 clean / 1 conflict or
missing / 2 usage.

Sources are cited as **S1–S9** from `SOURCES.md`; internal references are **B**
(`docs/V0.3-BLUEPRINT.md`, CLI05 and X03), **C1**
(`staging/CLI01/artifact/tools/new-project.mjs`), **ST** (`tools/status.mjs`) and
**DR** (`tools/doctor.mjs`).

## 1. Functions

| Unit | Does | Why | Without it | Source |
|---|---|---|---|---|
| Header comment and synopsis | States purpose and invocation | A tool found in `tools/` must explain itself in one screen | The next maintainer reads 250 lines to learn the contract | S6, S8 |
| Imports | `crypto`, `fs`, `path`, `url` only | Node 18+ standard library keeps the tool dependency-free and offline | A package manager or network layer would be required | B, C1 |
| `HERE` | Directory of the running file | Framework discovery must work from any cwd | Paths would depend on where the user stands | C1 |
| `COMMANDS`, `STATUSES`, `EDITS` | Closed vocabularies | Typos become explicit failures instead of silent branches | `pull`/`pul` or a status miss would fall through to a wrong action | S6, ST |
| `MAP`, `SKILLS` | Lock path to library path mapping | The lock stores game paths, the library stores source paths | Every command would need its own path table | C1, B |
| `HASH` | Accepts 64 lowercase hex characters | A malformed hash would make every file look modified | Corruption in the lock would be indistinguishable from edits | S5 |
| `CliError` / `fail` | Carries message, exit code and hint | Usage errors and data errors need different exit codes | Every error would exit 1 or print without a fix hint | C1 |
| `USAGE` | One-screen help | `--help` is the only discovery path for flags and exit codes | Users guess flags or read source | S2, S6 |
| `parseArgs` | Command, optional game dir, three flags, help | Positional game dir matches `new-project` and `status`; flags may appear anywhere | Commands would be order-sensitive and unknown flags ignored | C1, ST |
| `isDir` / `findFramework` | Walk up for `library/`, `template/`, `docs/V0.3-BLUEPRINT.md` | The tool lives in the framework but targets another directory | A hardcoded relative path breaks when the framework moves | C1 |
| `inside` | Relative-path containment check | Lock paths are untrusted input and must not escape the game or library | `../` or a sibling path could read or write outside the project | S3, S4 |
| `readLock` | Existence, JSON, shape and part validation | The lock is the only input; a bad lock must fail before any write | Partial or ambiguous locks could apply half a sync | S5, S8 |
| `librarySource` | Maps `.opencode/...` and `evals/...` to `library/core` or `library/game` | This mapping is the contract CLI01 wrote into the lock | The tool would copy from the wrong tree or fail on every skill | C1, B |
| `hashFile` | SHA-256 of a regular file; symlinks and non-files are blocked | Content, not mtime, decides clean/modified; symlinks could escape containment | Timestamps lie after checkout; a link could redirect a write | S5, S1 |
| `inspect` | Builds one status and both hashes per part | All three commands need the same classification | pull, push and diff would drift apart | S7, S1 |
| `writeAtomic` | Write a sibling temp file, rename over the target, clean up on error | A crash must not leave a truncated rule, skill or lock | A half-written file can break an agent session and is hard to diagnose | C1, S3 |
| `saveLock` | Rewrites the whole lock, 2-space JSON, final LF | Hashes must persist or the next run loses the base version | Every run would report unknown/diverged and force users to guess | S5, S8 |
| `countStatuses` | Zero-filled counts for all statuses | Human and JSON summaries must agree, including zero counts | Consumers would special-case missing keys | ST |
| `pull` | Applies safe statuses, refuses local edits unless forced, updates hashes | Forward sync must be safe by default | A routine pull could destroy a local rule edit | S8, S4 |
| `push` | Reverse sync, refuses without force, skips stale, blocks missing target | Writing the shared library is a deliberate act | A local experiment could silently become the library source | S6, S9 |
| `diff` | Read-only report, exit 1 on any non-clean part | CI and agents need a check that never mutates | The only way to compare would be a mutating pull | S7, S6 |
| `report` | One JSON object, schema 1 | Automation needs stable keys, not prose | Callers would parse padded columns | ST, S7 |
| `render` | Human lines plus targeted hints | Conflicts need a next action, not just a status | Users see `modified` and do not know that `--force` is the escape | S1, S6 |
| `main` | Resolves paths, loads the lock, dispatches, prints, returns code | One exit point keeps stdout/stderr and exit codes consistent | Each command would invent its own flow | ST, C1 |
| Top-level catch | JSON error object or stderr, preserves 1/2 | A stack trace is not an API and leaks paths | Scripts would see exit 1 with unparsable output | C1, ST |

## 2. Statuses

| Status | Condition | Why it exists | What breaks without it | Source |
|---|---|---|---|---|
| `clean` | Source and game hashes equal | Fast no-op path; proves idempotence | Clean pulls rewrite or report noise | S5, S7 |
| `stale` | Game equals lock hash, library changed | Safe auto-update: nobody edited locally | Pull cannot distinguish “behind” from “edited” | S7, S8 |
| `modified` | Library equals lock hash, game changed | Protects local work | Pull overwrites edits; push cannot identify them | S1, S6 |
| `diverged` | Both sides differ from lock and from each other | Requires a human or force decision | The tool silently picks a winner | S7, S6 |
| `unknown` | No hash and files differ | CLI01 locks have no hash; change cannot be attributed | Legacy projects are permanently stuck or blindly overwritten | S5, B |
| `missing` | Source exists, game file absent | Pull can restore; push has nothing to send | Pull leaves a broken install; push reads ENOENT | S3, DR |
| `missing-source` | Library source absent | Library is incomplete or a pack was removed | Pull invents content or crashes; push cannot know the base | S3, S5 |
| `blocked` | Symlink, directory, or I/O error | Containment and file-type safety | A link or special file could redirect or corrupt a write | S1, S4 |

## 3. Commands, options and exit codes

| Unit | Behavior | Why | Without it | Source |
|---|---|---|---|---|
| `pull` | Copies stale/missing and, with force, modified/diverged/unknown; always reports missing-source/blocked | The common direction is framework to game | Users copy files by hand and lose the hash base | S8, S3 |
| `push` | Copies modified/diverged/unknown/missing-source back; refuses all without force | Framework edits start in a game and must be promoted deliberately | Shared library changes happen by accident | S6, S9 |
| `diff` | Never writes; exit 1 for any non-clean part | A check command for CI and review | No read-only way to detect drift | S7, S6 |
| `--dry-run` | Classifies and reports, writes nothing; pull conflicts still exit 1, push preview exits 0 | Users need to see a plan before consenting | Every inspection is destructive or impossible | S6 |
| `--force` | Pull overwrites local edits; push writes the library; pull still cannot bypass missing-source/blocked | Explicit escape hatch for real divergence | No recovery from a deliberate local rewrite | S6, S9 |
| `--json` | One object, schema 1, also for errors | Stable contract for scripts and agents | Callers scrape human text | ST, S7 |
| `--help` | Usage and exit codes, exit 0 | Discoverability without reading source | Flags and codes are guessed | S2, S6 |
| `game-dir` positional, default `.` | Target can be explicit or cwd | Works from the framework or from the game | One of the two common cwds always needs a flag | C1, ST |
| Exit 0 | No conflict and no missing/blocked part | Success must be machine-checkable | CI cannot gate on the command | B, C1 |
| Exit 1 | Conflict, refusal, missing lock/part, unsafe path | Data problems are not usage problems | Scripts would treat a broken lock as a typo | C1, ST |
| Exit 2 | Unknown command, unknown option, missing game dir | The caller invoked the tool wrongly | Retrying cannot help and the distinction is lost | C1 |

## 4. Guards

| Guard | Rejects | Why | Without it | Source |
|---|---|---|---|---|
| Command whitelist | Anything but `pull`, `push`, `diff` | Closed command set | A typo could be treated as a directory and fail confusingly | C1 |
| Option whitelist | Unknown `--...`, extra positional | Flags are part of the API | Misspelled `--forse` silently performs a safe pull | S6 |
| Game directory check | Missing or non-directory target | Every path is resolved under it | Reads/writes would land in the framework or cwd | C1, S4 |
| Framework marker check | Missing `library/`, `template/`, blueprint | Prevents running against an arbitrary tree | The tool could copy from a random `library` directory | C1 |
| Lock existence/JSON/shape | Missing file, invalid JSON, no `parts` array | Fail before any write | A corrupt lock could trigger a partial sync | S8, DR |
| Part fields | Non-object, missing/non-string `id`, `path`, `version` | These fields drive mapping and reporting | Undefined paths or duplicate identities | DR |
| Path syntax | Backslash, leading slash, drive letter, `..` segment | Lock paths are POSIX relative paths | Windows separators and traversal escape containment | S3, S4, DR |
| Duplicate path | The same `path` twice | Two parts would write the same file with different sources | Last-writer-wins and non-deterministic results | DR |
| Hash format | Anything but 64 lowercase hex | A bad base hash would misclassify every part | Silent unknown/diverged for the whole project | S5 |
| Mapping whitelist | Paths outside the five prefixes and skills | The lock format is finite | Arbitrary files could be read or written | C1, B |
| Game containment | Resolved target outside the game | Defense in depth after syntax checks | A crafted path could escape through symlinks or joins | S3, S4 |
| Library containment | Resolved source outside the library | The framework tree is not a general source | A mapping bug could copy `docs/` or secrets | S3 |
| File-type check | Symlink, directory, socket, unreadable file | Only regular files are parts | A link could exfiltrate or overwrite an unrelated file | S1, S4 |
| Pull overwrite guard | `modified`, `diverged`, `unknown` without force | Local edits are user work | Routine pulls destroy customised rules and skills | S1, S8 |
| Push write guard | Every candidate without force | The library is shared and versioned | Local experiments leak into every game | S6, S9 |
| No network / no submodules | No imports or child processes for either | Scope is local files only | A hidden fetch or submodule would break reproducibility | B, S8 |

## 5. Write paths and failure policy

| Path | When written | Why | Without it | Source |
|---|---|---|---|---|
| Game part file | `pull` for stale/missing, or forced edits | Forward sync | Pull would report a plan but not apply it | S3, S8 |
| Library part file | `push --force` only | Reverse sync is deliberate | No way to promote a proven local change | S6, S9 |
| `agent.lock.json` | After any part write, or when clean parts gain a first hash | The next run needs a base version | Every run would be `unknown` and require force | S5, S8 |
| Lock root fields | Preserved as JSON values; only `parts[].hash` is added/updated | CLI01 writes `version`, `core`, `created`; sync must not drop them | A pull would erase the game/framework version metadata | C1, ST |
| Temp sibling + rename | Every part and lock write | Atomic replace; a crash leaves the old file intact | Truncated or empty files after a failure | C1, S3 |
| Temp cleanup | On any write error | No `.sync-<pid>.tmp` litter | The next run or a commit could pick up a partial file | C1 |

Failure policy: each file is atomic, the lock is written last, and no file is
deleted. A crash can leave a subset of parts updated, but never a partially
written file; a re-run converges. `diff`, `--dry-run`, `--help`, validation
errors and refused pushes write nothing. The tool never runs git, never publishes
and never opens a socket; a `push` is only a local copy, reviewed with git in the
framework checkout.

## 6. Rejected alternatives

- **Git submodules for library parts.** Blueprint forbids submodules; they add a
  second checkout state and do not help a copied template.
- **Network registry or “latest version” fetch.** The task forbids network and
  publish; a game must be reproducible from its lock and the local library.
- **Timestamp-based comparison.** Git checkouts reset mtimes; content hashes are
  the only stable base (S5).
- **Copying whole directories.** Skills are single `SKILL.md` parts in this
  library; directory copies would also bring unrelated files.
- **Deleting files absent from the lock.** Removal is a separate, destructive
  operation; `doctor` reports orphans instead.

## 7. Open questions

The four questions from the task are resolved in `REPORT.md`; the remaining
design nits are recorded there as residual questions (skill name collision,
push preview exit code, lock-schema documentation).
