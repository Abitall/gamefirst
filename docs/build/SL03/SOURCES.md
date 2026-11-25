# SL03 — sources

Thin part: `docs/BUILD-PLAN.md` sets the thin protocol at 3 sources (2 external + 1 accepted internal artifact), not the 9-repo default. Stars and last-push dates were read with authenticated `gh api` on 2026-11-25 and are quoted as returned. No source code was copied; quotes are short and verified that day. "Borrowed" means a structural idea, not text or code.

## 1. OpenCode — `anomalyco/opencode`

- URL: https://github.com/anomalyco/opencode (formerly `sst/opencode`)
- Stars: 229,153
- Active: pushed 2026-11-25T19:56:45Z; default branch `dev`
- License: MIT
- Artifact: https://opencode.ai/docs/commands/ — the published command reference. The repository supplies stars and activity; the page supplies the command contract.
- Quote: "Only `.md` files are discovered." / "The trimmed Markdown body is always the prompt template." / `subtask` — "Deprecated alias for `subagent`." / `subagent: false` "forces the current session."
- Borrowed: project commands live in `.opencode/commands/*.md`; the Markdown body is the prompt; YAML frontmatter carries `description` and `agent`; `subtask: false` keeps the command in the current session; when no placeholder exists, non-empty arguments are appended and must be ignored.
- Rejected: `$ARGUMENTS` and `$1` placeholders (the command takes no arguments); `!` shell blocks (they run outside the permission flow); JSON command form; `model` override; global and nested command names.

## 2. Taskwarrior — `GothenburgBitFactory/taskwarrior`

- URL: https://github.com/GothenburgBitFactory/taskwarrior
- Stars: 6,185
- Active: pushed 2026-11-25T15:07:50Z; default branch `develop`
- License: MIT
- Artifact: https://taskwarrior.org/docs/urgency/ — the published urgency and `next` report documentation. The repository supplies stars and activity.
- Quote: "Taskwarrior has a `next` report, which is sorted by decreasing urgency." / "Urgency is a numeric score Taskwarrior assigns to each task. It is based on a dozen or more factors that combine to form an overall urgency score." / "Note that blocked tasks have a coefficient of -5.0, which means that they reduce the urgency score."
- Borrowed: a single `next` selection from a prioritized queue; explicit factors (priority, blocking, already-started); blocked or waiting work as terms that push an item down; the command reads the queue and does not mutate it.
- Rejected: urgency arithmetic and coefficients; configurable weights; the `+next` special tag; `task next` CLI filters and report columns; due-date and age scoring; any numeric score in the output.

## 3. SL02 — `/status` (accepted internal artifact)

- URL: none — internal project artifact
- Stars: not applicable
- Active: accepted in `docs/BUILD-PLAN.md` line 79
- License: project-owned
- Artifact: `staging/SL02/artifact/template/.opencode/commands/status.md`; the installed copy `template/.opencode/commands/status.md` is hash-identical
- Quote: "`/next` (SL03) selects the next action; `/status` only reports." / "`Missing: <file> — <part>` lines before the six labels" / "A01 owns the work; R1, R5, R10 apply as written."
- Borrowed: read-only one-screen discipline; `Missing:` plus the part that owns the file; a fixed label order; a cross-reference to A01 and the rules without restating them; the boundary that BACKLOG items belong to `/next`.
- Rejected: its six status labels and the `unknown`/`not recorded` values (SL02's report job); `Since` and the active-parts list; any duplication of the status screen.

## Considered and rejected

- A01 `partner` — an accepted internal alternative and the owner of STATE. It defines the STATE fields and says `/next` reads them, but it is the author of the duty, not a command-shape precedent. SL02 is closer and is the accepted sibling that `/next` must not duplicate.
- SL01 `/start` — an accepted shape precedent for frontmatter, missing-source mapping, and rule cross-reference, but it selects a mode and asks up to three questions; `/next` selects an action and asks none. Citing SL01 would blur that boundary.
- A game-development repository with an analogous "pick the next task" command — not found within the thin-part time box. The protocol permits two external software sources for this shape; padding with a weak gamedev link would fail the evidence test.
- `gh status` — already used by SL02; its fixed sections are a status shape, not a selection rule.

## License note

Both external repositories are MIT. No code, comments, or documentation text was copied; quotes are attributed and used for review only. SL02 is project-owned. No license files ship with this part.
