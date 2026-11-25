# SL04 - sources

Thin part: `docs/BUILD-PLAN.md` sets the thin protocol at 3 sources (2 external repositories + 1 accepted internal artifact), not the 9-repo default. Stars, push dates, and licenses were read with authenticated `gh api` on 2026-11-25 and are quoted as returned. No source code was copied; quotes are short, attributed, and verified that day. "Borrowed" means a structural idea, not text or code.

## 1. OpenCode - `anomalyco/opencode`

- URL: https://github.com/anomalyco/opencode (formerly `sst/opencode`)
- Stars: 229,153
- Active: pushed 2026-11-25T19:56:45Z; default branch `dev`; not archived
- License: MIT
- Artifact: https://opencode.ai/docs/commands/ - the published command reference, fetched 2026-11-25. The repository supplies stars and activity; the page supplies the command contract.
- Quote: "Only `.md` files are discovered." / "The trimmed Markdown body is always the prompt template." / `subtask`: "Deprecated alias for `subagent`." / `subagent: false` "forces the current session."
- Analogue: a project command stored as `.opencode/commands/*.md`, with YAML frontmatter and a Markdown prompt body that receives the invocation arguments.
- Borrowed: the file location and format; the body as the prompt; `description` and `agent` in frontmatter; `subtask: false` so the verdict stays in the claiming session; `$ARGUMENTS` as the single claim.
- Rejected: `model` override (the brief pins the partner); `!` shell blocks (they run outside the permission flow); the JSON command form; global and nested command names; the `subagent` key, because the brief fixes `subtask`.
- Dead end: treating `$ARGUMENTS` as a free-form argument list. The command needs exactly one claim, so the body rejects an empty invocation instead of parsing flags.

## 2. pre-commit - `pre-commit/pre-commit`

- URL: https://github.com/pre-commit/pre-commit
- Stars: 15,713
- Active: pushed 2026-11-09T21:42:14Z; not archived
- License: MIT
- Artifact: the documentation repository `pre-commit/pre-commit.com`, `sections/cli.md`, https://github.com/pre-commit/pre-commit.com/blob/main/sections/cli.md
- Quote: "`pre-commit` exits with specific codes:" "- `1`: a detected / expected error" "- `3`: an unexpected error" "- `130`: the process was interrupted by `^C`" / "`--show-diff-on-failure`: when hooks fail, run `git diff` directly afterward." / "`pre-commit run --all-files`: run all the hooks against all the files. This is a useful invocation if you are using pre-commit in CI."
- Quote, `sections/advanced.md`: the `SKIP` environment variable "allows you to skip a single hook instead of `--no-verify`ing the entire commit."
- Analogue: a local runner that executes the project's own configured commands, prints a named result per check (`black....Passed`), and makes the exit code the verdict.
- Borrowed: run the configured command, never a hand-typed one; name every result; show the failing item's output next to the verdict (`--show-diff-on-failure`); treat a skipped check as not passed; keep the exit code as the machine-readable result.
- Rejected: `SKIP` and `--no-verify` (a skipped required check is not a pass); auto-fixing hooks (the command never edits code); stop-at-first-failure (CLI03 records every check); hook installation, staging, and commit-time semantics.
- Dead end: adopting the hook model. `/verify` is not a git hook: it runs on one claim, on demand, and writes its own evidence folder. Only the reporting discipline was kept.

## 3. S02 - `verify` skill (accepted internal artifact)

- URL: none - internal project artifact
- Stars: not applicable
- Active: assembled in `docs/BUILD-PLAN.md` row 23; installed at `library/core/skills/verify/SKILL.md`
- License: project-owned
- Artifact: `staging/S02/artifact/library/core/skills/verify/SKILL.md`
- Quote, line 9: "CLI03 and /verify: prove a claim, never fix it. R1/E03 own it."
- Analogue: the accepted method for proving one claim - select the checks, run them with logs, write the evidence report, and hand back the smallest next action on failure.
- Borrowed: the ownership split (method, runner, scoring); the refusal list (no weakened assertion, no skipped check, no re-run until green, no PASS without an artifact); failure ends in the smallest next action; the rule that the command proves a claim and never repairs it.
- Rejected: the seven-step procedure, the claim table, visual capture, the playtest note, and `REPORT.md` authoring. Those stay in S02; copying them into the command would fork the method, duplicate CLI03's report writer, and break the 300-token budget.
- Dead end: restating S02's steps as a short checklist. Even a compressed version repeated the skill and pushed the command over budget; the cross-reference is smaller and cannot drift.

## Dead ends

- No game-development repository with an analogous "verify one claim" command was found inside the thin-part time box. The protocol allows two software sources for this shape; padding with a weak gamedev link would fail the evidence and necessity tests.
- A network check-runner (a CI status view) was considered for the verdict table and rejected: `/verify` must work offline and must not depend on authentication.
- The pre-commit documentation repository is separate from the code repository and its GitHub license field is null; the project root is MIT, and only short documentation quotes are used.

## License note

Both external repositories are MIT. No code, comments, or documentation text was copied; the quotes are attributed and used for review only. S02 is project-owned. No license files are shipped with this part.
