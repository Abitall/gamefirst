# SKELETON - Justification

Part: baseline game project copied by `new-project` (CLI01). Configuration and
empty structure only: no rules, skills, agents, commands, evals, game logic, or
engine code.

Sources are numbered as in `SOURCES.md`: S1 phaserjs/template-vite-ts,
S2 godotengine/godot-demo-projects, S3 libgdx/gdx-liftoff,
S4 TheBevyFlock/bevy_new_2d, S5 jsynowiec/node-typescript-boilerplate,
S6 github/gitignore, S7 cookiecutter/cookiecutter, S8 github/spec-kit,
S9 bmad-code-org/BMAD-METHOD.

## 1. Files

| File | Why it exists | If removed | Source |
|---|---|---|---|
| `AGENTS.md` | The only file OpenCode loads unconditionally; carries identity, modes, priority, and pointers to every other part. | The agent has no mode, no priority order, and no idea that rules and skills exist. | S8 constitution pattern; S9 one-page routing |
| `opencode.json` | Turns the blueprint's security and loading rules into enforced configuration. Rules are advice; permissions are law. | Every tool call falls back to OpenCode defaults: edits and arbitrary shell allowed, `.env` readable on approval, no destructive deny-list. | S5 (scripts + config as product), OpenCode docs |
| `.gitignore` | Keeps generated and secret files out of history; keeps `evidence/` and `runs/` tracked because they are proof. | `node_modules` and build output enter history; `.env` can be committed; or, with a blunt ignore, the proof of done disappears. | S6, S1 |
| `.gitattributes` | One line-ending rule for Windows and CI, and binary assets that are never text-merged. | CRLF/LF churn in every diff; corrupted binary assets after a merge. | S6 sibling practice; blueprint doctor checks LF |
| `README.md` | Human entry point: what this is, how to start, how to verify, where things are. | A new contributor (or the user after a month) has to read `AGENTS.md` to learn where anything lives. | S1, S5 |
| `{{GAME_NAME}}` in the two titles | The single substitution `new-project` makes. A named placeholder is greppable, so "no placeholder left" is a one-command check. | The copied repo is titled `gamefirst` or `Game project`, and a finished copy cannot be told apart from the template. | S4 `*.template` files; S7 substitution step |
| `.gitkeep` x15 | Git cannot track empty directories; `new-project` copies a tree, not a manifest. | `docs/systems/`, `evidence/`, `runs/`, `src/*` and `.opencode/*` vanish from a fresh clone; the agent writes to paths that do not exist. | S7 (template is a plain tree) |

## 2. `AGENTS.md` units

| Unit | Why | If removed | Source |
|---|---|---|---|
| Title `{{GAME_NAME}}` + three-sentence intro | The title is the only placeholder in the template. The intro states the framework (`gamefirst v0.3`), the first principle (playable), and the doc rule (one page, one fact). | The agent optimizes for documents, the exact failure the framework exists to prevent. | Blueprint non-negotiables; S9; S4 placeholder pattern |
| `## Modes` list | The five modes are the top of the priority chain and change agent behaviour. | Mode conflicts are resolved by whoever wrote last. | Blueprint "Modes and priority"; S8 phase commands |
| "active mode is recorded in `STATE.md`" | Names the single place the mode lives, so it is not restated per session. | Two sources of truth for the mode. | Blueprint D02 |
| `mode > rules > skill > pack > docs` | The conflict rule, verbatim from the blueprint. | A pack silently overrides a rule. | Blueprint; rubric 4 |
| `## Parts` pointer with ID ranges | Tells the agent that R1-R10, S01-S13, A01-A04 exist and where; avoids copying their text. | The agent invents its own process or duplicates rules in the repo root. | Blueprint IDs; S8 thin commands + templates |
| "Load only the parts in use" | Active-subset rule; keeps context inside budget (E10). | Every session loads the whole library. | Blueprint; S9 scale-adaptive |
| Build is truth (R1) + evidence/runs | The core promise; also names where proof goes, so "done" has a location. | Claims without artifacts; empty `evidence/` with no explanation. | Blueprint R1, X01 |
| Code before docs (R5) | Prevents documentation of mechanics that do not exist. | Speculative docs become the source of truth. | Blueprint R5 |
| `verify` before done (S02) | The check that makes R1 mechanical. | "Done" is a claim. | Blueprint S02, E03 |
| Ask budget (R2) | Caps questions per stage and demands a recommendation. | Interview-style sessions; the user answers instead of choosing. | Blueprint R2 |
| New idea to `BACKLOG.md` (R9) | Scope guard with a destination, not just a prohibition. | Ideas either derail the sprint or get lost. | Blueprint R9; S9 |
| Commit is not publish (R4), no secrets | The two irreversible actions a local agent can take. | Accidental push, release, spend, or secret in history. | Blueprint R4, X02 |
| `## Documents` one-line map | Gives each document one job and one line; prevents a second copy of the same fact. | Documents overlap and drift; the agent does not know which file to update. | Blueprint D01-D09; S8 artifacts |
| `## Code` engine boundary | States the one architectural rule the skeleton can state without an engine: `src/systems` and `src/data` are engine-free, `src/game` is the adapter. | Engine imports leak into game logic; the pack is no longer replaceable. | Blueprint layers, N00; S4 adapter/demo split; S3 |

Not included on purpose: rule text, skill steps, agent prompts, eval cases,
engine commands, document templates. They are separate parts; duplicating them
would create two sources of truth.

## 3. `opencode.json` keys

| Key | Why | If removed | Source |
|---|---|---|---|
| `$schema` | Editor validation and autocomplete against the published V2 schema. | Typos in permission actions fail silently. | OpenCode docs/config |
| `instructions` | Loads `.opencode/rules/*.md`. OpenCode auto-discovers only `agents/`, `commands/`, `skills/`, `plugins/`, so rules need an explicit entry. | Copied rules sit on disk and never reach the model. | OpenCode docs/instructions |
| `permissions` | The V2 ordered rule list (`action`, `resource`, `effect`; last match wins). | Defaults apply: edits allowed, shell allowed, `.env` readable on approval. | OpenCode docs/permissions |

Deliberately absent keys: `model`, `providers`, `mcp`, `plugins`, `agents`,
`commands`, `skills`, `formatter`, `watcher`. Each is either a user choice, a
pack's job, or automatic discovery. `skills`, `agents`, and `commands` need no
key: OpenCode discovers `.opencode/skills/`, `.opencode/agents/`, and
`.opencode/commands/` by convention (docs/config, docs/skills). Adding them
would duplicate discovery and pin paths that the blueprint already fixes.

`AGENTS.md` is not listed in `instructions`. OpenCode loads `AGENTS.md` by
discovery and loads configured instructions *alongside* it, so listing it would
inject the same file twice.

### 3.1 Permission rules

Order matters: the last matching rule wins, so the shell allow-list follows the
broad `ask`, and the deny-list follows everything.

| Rule | Why | If removed | Source |
|---|---|---|---|
| `read * allow` | Explicit read baseline. Reading is free and safe. | Relies on an undocumented default. | OpenCode docs/permissions |
| `glob * allow` | File discovery without a shell call. | The agent shells out to `ls` for every search. | same |
| `grep * allow` | Content search without a shell call. | Same, plus regex on the command line. | same |
| `webfetch * allow` | Research (S01) is read-only and frequent; R3 makes fetched content data, not instructions. | A prompt per source; research stalls. | Blueprint S01, R3 |
| `websearch * allow` | Same as above for search. | Same. | same |
| `edit * ask` | Every write is approved; the collaboration protocol requires it. | Silent rewrites of docs and code. | Blueprint X02 "permissions are law" |
| `shell * ask` | Arbitrary bash is the largest blast radius. | Any command runs unattended. | Blueprint X02 |
| `git status * allow` | Read-only state check; needed constantly by `status`. | A prompt per status check. | S5 script ergonomics |
| `git diff * allow` | Read-only review. | Same. | same |
| `git log * allow` | Read-only history. | Same. | same |
| `git show * allow` | Read-only inspection of one commit. | Same. | same |
| `git branch * allow` | Read-only branch listing. | Same. | same |
| `git rev-parse * allow` | Read-only repo root and HEAD lookup used by tools. | Same. | same |
| `ls * allow` | Directory listing on POSIX shells. | A prompt per listing. | S5 |
| `dir * allow` | Directory listing on Windows. | Same, on the primary platform. | S5 |
| `read *.env deny` | Secrets must not enter the model context, not even on approval. | A single approval can leak a key into history. | Blueprint X02 |
| `read *.env.* deny` | Covers `.env.local`, `.env.production`. | Same leak by another name. | same |
| `read *.env.example allow` | The documented, secret-free template stays readable. | The agent cannot explain required variables. | same |
| `rm -rf * deny` | Recursive delete is unrecoverable and never part of the workflow. | One bad path wipes the repo or `dist/` siblings. | Blueprint X02 |
| `rm -fr * deny` | Same command, flags swapped. | Trivial bypass of the rule above. | same |
| `* -Recurse * deny` | PowerShell recursive delete, both flag positions, one pattern. | The Windows-native form bypasses both `rm` rules. | same |
| `rmdir /s *`, `rd /s *`, `del /s *` deny | Native Windows recursive delete; `* -Recurse *` covers PowerShell only. | A native `rmdir /s` bypasses the POSIX and PowerShell rules. | Windows command reference; same threat as `rm -rf` |
| `sudo * deny` | Privilege escalation is never needed to build a game. | Root-level damage on macOS/Linux. | same |
| `git reset --hard * deny` | Discards uncommitted work without recovery. | Silent loss of a session's edits. | same |
| `git clean -f * deny` | Deletes untracked files, including new evidence. | Loss of untracked work. | same |
| `git push * deny` | R4: publish is an explicit user action. Deny, not ask, because the user can run git themselves. | The agent can publish. | Blueprint R4 |
| `gh release create * deny` | Release is publish. | A release goes out from a routine command. | Blueprint R4, E12 |
| `gh repo delete * deny` | Irreversible and outside any game task. | Repository loss. | Blueprint X02 |
| `external_directory * ask` | The game repo is the workspace; anything outside it is a surprise. | Silent reads and writes anywhere on disk. | OpenCode docs/permissions "Directories" |

Build and test commands are **not** allow-listed. They differ per engine, and
the engine pack (N00) owns test recipes; the pack appends its own allow rules.
Adding `npm`/`dotnet`/`godot` here would put engine facts in the engine-free
template.

## 4. `.gitignore` lines

| Line | Why | If removed | Source |
|---|---|---|---|
| `node_modules/` | Installed dependencies, reproducible from the lockfile, tens of thousands of files. | History bloat and merge noise. | S6 Node template |
| `dist/` | Build output, regenerated by `verify`. | Stale builds get committed and reviewed as source. | S1, S5 |
| `dist-play/` | Playtest build served to the human; regenerated on each publish. | A binary snapshot of the game enters history on every playtest. | S1 build output practice |
| `coverage/` | Generated by the test run. | Thousands of generated HTML files per commit. | S5 |
| `.env` | Secrets and local overrides. | Keys enter history. | Blueprint X02; S6 Global |
| `.env.*` | Per-environment variants of the same secret file. | `.env.local` leaks. | S6 |
| `!.env.example` | Keeps a documented, secret-free variable list visible. | The one file that explains the variables is ignored. | S6 |
| `*.log` | Generated logs, including logs written inside `runs/` and `evidence/`. | Logs bloat the repo and drown the evidence. | S6 Global |
| `*.tmp` | Scratch files from tools and editors. | Noise and accidental commits of half-written data. | S6 Global |
| `.DS_Store` | macOS folder metadata. | Noise and conflicts on every folder open. | S6 Global/macOS |
| `Thumbs.db` | Windows thumbnail cache. | Same, on Windows. | S6 Global/Windows |
| `desktop.ini` | Windows folder customisation. | Same. | S6 Global/Windows |
| `.vscode/` | Editor state, not project state. | Personal settings and workspace paths get committed. | S4 rejects this (see SOURCES) |
| `.idea/` | Same for JetBrains. | Same. | S4 |

`evidence/` and `runs/` are **not** ignored wholesale. `evidence/` is the proof
that R1 demands, and `runs/AUTONOMY.jsonl` is the append-only audit log of X01.
Both are tracked via `.gitkeep`; generated `.log` and `.tmp` files inside them
are already covered by the two global patterns above.

## 5. `.gitattributes` lines

| Line | Why | If removed | Source |
|---|---|---|---|
| `* text=auto eol=lf` | One byte sequence for every text file on Windows, macOS, and CI; `doctor` checks LF. | CRLF/LF churn, phantom diffs, broken shell scripts. | Blueprint CLI07; S6 practice |
| `*.png` ... `*.ase` (16 lines) | Each names a format the game will actually store: raster art, audio, fonts, video, Aseprite sources. `binary` stops EOL conversion, text diff, and merge. | Git tries to merge a PNG as text and corrupts it; fonts get line-ending rewritten. | S1, S2, S4 asset sets |

No language-specific attribute is set: the template has no source files yet, and
the engine pack owns its toolchain.

## 6. `.gitkeep` directories

| Path | Why it exists | If removed | Source |
|---|---|---|---|
| `.opencode/skills/` | Active skills (S01-S13 subset) are copied here by `new-project`/`sync-agent`. | The copy target does not exist. | Blueprint tree |
| `.opencode/agents/` | Active agents (A01-A04). | Same. | Blueprint tree |
| `.opencode/commands/` | Slash commands (SL01-SL06). | Same. | Blueprint tree |
| `.opencode/rules/` | Active rules (R1-R10), loaded by `opencode.json`. | Same, and the `instructions` glob has no directory. | Blueprint tree |
| `docs/systems/` | One card per mechanic (D06). | The agent has no place for a system card and writes it into the root. | Blueprint D06 |
| `docs/playtests/` | One page per playtest (D07). | Playtest evidence has no home. | Blueprint D07 |
| `docs/engine/` | Engine pack facts (D08). | Engine version and pitfalls end up in `AGENTS.md`. | Blueprint D08, N00 |
| `docs/guide/` | User help (D09). | The user-facing guide is lost or merged into `README.md`. | Blueprint D09 |
| `src/systems/` | Engine-agnostic game logic. | The boundary that makes the engine replaceable has no directory. | Blueprint layers |
| `src/game/` | The engine adapter. | Engine code spreads into `src/`. | Blueprint layers |
| `src/data/` | Data tables and tuning values. | Values get hardcoded. | Blueprint layers |
| `tests/` | Test files, outside `src/`. | Tests land next to source and get bundled. | S5 |
| `evidence/` | Screenshots, recordings, playtest proof. | R1's artifact has no location. | Blueprint R1, X01 |
| `runs/` | `AUTONOMY.jsonl` and run logs. | The autonomy audit trail has no location. | Blueprint X01 |
| `evals/` | Eval results per project. | Eval output has no location; the suite writes to the root. | Blueprint evals |

## 7. Assembly decisions and deviations

Five items were settled at assembly on 2026-11-25; three remain deviations from
the literal part brief. None of them changes the artifact bytes.

| Item | Status | Why |
|---|---|---|
| `{{GAME_NAME}}` is the only placeholder | Required | The two title lines carry it and `new-project` (CLI01) substitutes it; no other byte changes. The braces are greppable, so an unreplaced copy is caught by one command instead of by reading the docs. |
| No `VERSION` file | Decided | `docs/BUILD-PLAN.md` listed it in the SKELETON row, but the blueprint's game-repo tree has no `VERSION`; the game version lives in `agent.lock.json` (X03), written by CLI01. The framework root `VERSION` is an assembly concern. |
| `dist-play/` ignored | Decided | Local playtest build output. The blueprint does not name it because it is a build artifact, not a tracked directory. |
| Engine packs append build/test commands to the allow-list | Decided | That is N00's contract at pack install time. A build command baked into the skeleton would pick an engine. |
| `evidence/` tracked, LFS deferred | Decided | Evidence is proof (R7); deleting it to slim the repo defeats its purpose. LFS returns when binary evidence outgrows git. |
| `instructions` lists `.opencode/rules/*.md`, not `AGENTS.md` | Deviation | `AGENTS.md` is auto-discovered; listing it would load it twice. |
| No keys for skills, agents, commands | Deviation | Automatic discovery; a key would duplicate it. |
| `git push` denied, not asked | Deviation | R4 makes publish a user action; `ask` would let a routine approval publish. |
