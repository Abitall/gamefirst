# CLI07 - doctor: justification

Every block is listed with the failure it prevents and where the decision came
from. "Without it" is the concrete symptom a game repository would show, not a
style preference. Source numbers refer to `SOURCES.md`.

## File and process

| Unit | Why | Without it | Source |
|---|---|---|---|
| Shebang and header comment | A copied `tools/doctor.mjs` is executable and self-describing in a repo that has no package.json | A maintainer cannot tell what the file does or that it is read-only without reading 250 lines | blueprint CLI07; #5 |
| Read-only imports (`readFileSync`, `readdirSync`, `statSync`, `existsSync`, `node:path`) | The contract is "no writes, no network, no fix mode"; the import list proves it mechanically | A future edit could add a write or an HTTP call and no test would notice the intent change | rubric 7; #3 |
| `USAGE` text | `--help` is the only documentation shipped inside the game repo | Users guess flags or read the source; exit-code contract stays invisible | blueprint exit codes; #6 |
| `parseArgs` | One parser owns flags, positional directory and misuse | `--strict` could be swallowed as a directory name, turning a check into a silent no-op | #6 (fatal misuse separate) |
| `main` + `process.exitCode` | Exit 0/1/2 is the integration surface for CI and assembly | Scripts cannot distinguish "issues found" from "bad invocation"; assembly step 2 would treat misuse as findings | blueprint S05; #7 |
| JSON mode (`schema: 1`, `ok`) | Machines need one stable object; `ok` folds errors and strict warnings into one boolean | Consumers re-implement severity rules and drift from the human view | #6 (`--format json`); #7 |

## Discovery and parsing

| Unit | Why | Without it | Source |
|---|---|---|---|
| `TEXT` extension set | The checks apply to text that ships in the repo: docs, config, code and scripts | A BOM inside `.mjs` or `.jsonl` would pass while the same BOM in `.md` fails: inconsistent health | template `.gitattributes` (text types) |
| `SKIP` directory set | `node_modules`, `dist`, `dist-play`, VCS and caches are generated or ignored | The report drowns in third-party files; runtime grows with install size | blueprint tree (`dist*` ignored) |
| `walk` (symlink skip, 5000 cap) | Health checks must finish in a user's flow and never loop through links | A symlink cycle hangs doctor; a huge `node_modules` makes it unusable | #4 (compact fixed output) |
| `posix` and `lineOf` | Every reported path is repo-relative POSIX; every finding points at a line | Windows users see `\` in a tool that forbids `\`; findings without lines cannot be fixed | rubric 6; blueprint "POSIX paths" |
| `readText` (raw bytes -> text) | BOM must be detected from bytes; stripping it first would hide the defect | A BOM is normalized away and reported healthy, then breaks tooling downstream | encoding rule; rubric 6 |
| `loadJson` | One loader turns missing, invalid and valid JSON into distinct states | Each check would invent its own error wording; invalid JSON would crash instead of report | #6 (fatal parse handled, not thrown) |
| `LINK` regex | Finds relative Markdown links in the two entry documents | Broken onboarding links ship silently; the first thing a new contributor clicks 404s | template AGENTS/README |
| `CODE` regex | Finds backticked paths, where these docs carry commands and directories | Windows paths and cited `.opencode` paths stay invisible | template AGENTS/README |

## Checks

| Unit | Why | Without it | Source |
|---|---|---|---|
| `scanMarkdown` link resolution | Skips anchors, schemes and queries, then resolves relative targets from the document | False positives on `#top`/`https://` make the check ignored; real broken links go unnoticed | #5 (aggregate, not noise) |
| Link target backslash error | A `\` link works on the author's machine and breaks on POSIX and in Markdown renderers | Repo looks healthy on Windows and is broken everywhere else | rubric 6; #4 |
| `scanMarkdown` backtick Windows paths | Catches `C:\...` and multi-segment relative `\` paths in prose | The blueprint names Windows paths as a defect class; this is the only place prose can carry one | blueprint CLI07 |
| BOM check | UTF-8 BOM breaks JSON parsers, YAML front matter and some loaders | Assembled trees fail at runtime with an unrelated parser error | encoding rule; #6 |
| CRLF check | `template/.gitattributes` pins `eol=lf`; mixed endings create whole-file diffs | Every save on Windows rewrites files; reviews become unreadable | template `.gitattributes` |
| `{{` placeholder check | N00 stamps `{{GAME_NAME}}`; an unreplaced marker means the project was never instantiated | A game ships with the template's literal name in AGENTS.md and README.md | CLI01 placeholder |
| Cited `.opencode/` path check | AGENTS.md points contributors at rules, skills and agents | A renamed directory leaves onboarding instructions pointing at nothing | template AGENTS; #5 |
| `checkLock`: file required | CLI01 writes the lock; absence means the repo was copied without its parts inventory | Doctor cannot tell what should exist, so "missing parts" is unanswerable | CLI01 lock format |
| `checkLock`: `version`/`core` semver | The lock records tool and core versions; non-semver breaks comparators and upgrades | `sync-agent` and future upgrades cannot order versions | CLI01; #1 (named facts) |
| `checkLock`: parts array and fields | Parts are the contract between CLI01, X03 and doctor | A malformed part is skipped silently, hiding a missing rule or skill | CLI01 `{id,kind,path,version}` |
| `checkLock`: kind allowlist | `rule/agent/skill/crew/gate/eval` are the installed categories | A typo (`plugin`, `Rule`) is treated as a valid part forever | CLI01 `KIND_ORDER` |
| `checkLock`: duplicate warn | Two rows for one path inflate counts and make uninstall ambiguous | Status reports more parts than exist; removing one leaves the other | #1 (registry consistency) |
| `checkLock`: path safety | Backslash, absolute and `..` paths escape the repo or break POSIX | A lock can point outside the game directory, and doctor would confirm it exists | rubric 7; #4 |
| `checkLock`: existence | The lock's purpose is to prove installed parts are present | A deleted rule stays "installed" and no command notices | CLI01; #5 |
| `locked` set into `checkOpencode` | Orphan detection needs the exact install list | Hand-added or stale `.opencode/**/*.md` files are never reconciled with the lock | CLI01 |
| `checkInstructions` | `opencode.json` instructs the agent with paths and globs | A renamed rules directory silently loads nothing, and the agent loses its rules | template `instructions`; #9 (bounded detail) |
| `checkPermissions` action/effect/resource | Only eight actions and three effects exist; an unsupported row is ignored by the harness | A permission the author believes is `deny` never applies | template opencode.json |
| `checkPermissions` unknown-key warn | Extra keys indicate a copy of a newer schema or a typo | Rows look configured but the harness ignores the typo'd field | #6 (warnings visible, not fatal) |
| `checkOpencode` directory check | `.opencode/` is where every installed part lives | Doctor could pass a repo with no active rules, skills or agents at all | blueprint tree |
| `checkProject` config and recipe | N00 creates `project.config.json`; the verify recipe is how "done" is proven | A project without a recipe cannot run its own verification, and doctor calls it healthy | blueprint N00; #7 (result by command) |
| Severity (`error` vs `warn`) | Structural breakage fails; advisory drift is reported | Every warning blocks work, or every error is ignorable; both make the tool useless | #6 (`--max-warnings` informed strict) |
| `--strict` | CI can require zero warnings without a second tool | Warning debt grows unobserved until it becomes breakage | #6 |
| `build` aggregation | One pass collects findings and counts; no check prints directly | Output order depends on check execution, and JSON/human views diverge | #1 (central registry) |
| `render` fixed columns | Findings are scannable in one screen, message last | Long paths push messages out of alignment and off narrow terminals | #2; #4; #8 |
| Human result line | States healthy/failed and the counts, including warnings | Exit code alone does not explain why CI failed | #9 (one status row) |

## Deliberate exclusions

| Excluded | Why | What would break if added | Source |
|---|---|---|---|
| Fix/repair mode | The tool is a health check; writes need ownership and backups | Doctor could corrupt a repo while diagnosing it | rubric 7; #3 |
| Network (link HTTP status) | Offline repos, rate limits and flaky CI | A green build depends on GitHub availability | #5 rejected auth/network |
| Requiring `toolbox/`, `prototypes/`, `docs/retro/`, `runs/*.jsonl`, `evals/fixtures/` | BATCH-10 records these as not yet shipped by the template | Every fresh project fails doctor on day one | BATCH-10 open issues |
| Full OpenCode schema validation | The harness owns its schema; doctor checks only the rules the template depends on | Doctor becomes a second, drifting schema authority | #6 (don't rebuild the lint engine) |
| Executing the verify recipe | Recipe execution belongs to the build/QA loop | Doctor gains side effects and runtime cost | #7 (exit code is the result) |
