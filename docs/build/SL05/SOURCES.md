# SL05 /retro — sources

Three sources for a thin artifact. Two are external repositories, read through the GitHub API on
2026-11-25 with `gh api repos/<owner>/<name>`; the third is the accepted internal skill the command
triggers. No code and no prose is copied: what is borrowed is a structure or a behaviour, restated in
this project's own words. Line-level quotes appear only to prove the reading was real.

## 1. OpenCode — the command format this file is written against

- **Repository**: https://github.com/anomalyco/opencode
- **Stars (2026-11-25)**: 229,153
- **Active**: pushed 2026-11-25T19:56:45Z, default branch `dev`, not archived
- **License**: MIT
- **Artifact read**: https://opencode.ai/docs/commands/ (page for the release line this template targets)
- **Analogue**: the command loader itself. Every `.md` file in `.opencode/commands/` is a command, the
  body is the prompt, and the frontmatter is the only place to declare agent and subagent behaviour. Our
  file is a data file for this loader; if the shape is wrong the command does not exist.
- **Quote**: "The trimmed Markdown body is always the prompt template." Also: "Only `.md` files are
  discovered." and, on the key used here, "Always use the current session, even when the selected agent
  has `mode: subagent`."
- **Borrowed**: the three-key frontmatter. `description` is the only line the command list shows, so it
  has to say what the command does in one clause. `agent: partner` places the run in A01, which is where
  the stage closes and where `STATE.md` and the retro file are owned. `subtask: false` keeps the five
  lines in the session the user is reading instead of a background child that reports back later. Also
  borrowed: the argument fallback, "When a template has no `$ARGUMENTS` or positional placeholder,
  OpenCode appends non-empty arguments after a blank line" — which is why the command has one sentence
  saying what a bare argument means rather than a placeholder syntax.
- **Rejected**: a `!` shell block for reading `git log` or the test output. The docs state that such
  blocks run "outside the agent's tool permission flow". A retro that can run shell can regenerate
  evidence instead of reading it, which defeats the point of counting evidence paths. Also rejected: a
  `model` override, and a `template` key in Markdown frontmatter (the body is the template; the key
  belongs to the JSON command form).

## 2. adr-tools — a dated record written from a template

- **Repository**: https://github.com/npryce/adr-tools
- **Stars (2026-11-25)**: 5,786
- **Active**: pushed 2024-04-25T18:22:02Z, default branch `master`; the repository still carries
  `.travis.yml`, so the CI is stale and the tool is maintained rather than developed
- **License**: GPL-3.0-or-later. The API reports `NOASSERTION`; `LICENSE.txt` opens with the GPL v3 text
  ("either version 3 of the License"), and `GPL.txt` is present. Treated as GPL for the purposes of this
  note.
- **Artifact read**: `src/adr-new`, 3901 bytes
- **Analogue**: the closest small tool that does what `/retro` does at the filesystem level — take a
  short prompt, produce one dated record at a predictable path, then print the path so the caller can
  open it. It is the same shape as a retro without the method.
- **Quote**: `date=${ADR_DATE:-$(date +%Y-%m-%d)}`, and the final line of the script, `echo $dstfile`,
  which prints the created path to stdout.
- **Borrowed**: three behaviours, no code.
  1. Create the destination directory before writing: `mkdir -p $dstdir`. `docs/retro/` is in the
     blueprint tree but is not in the shipped template, so the first retro would otherwise have nowhere
     to write. The command says "(create the folder)".
  2. Build the filename from the date, and print the path at the end. The command's "five lines, then the
     path" is the same contract: the human gets the locator, not just the content.
  3. Record, never rewrite, history. `adr-new -s` does not delete the superseded record; it links both
     ways and removes the "Accepted" status, so the old file still says what it said. The command's
     "Never rewrite a past retro" is the same rule, for the same reason: R6 needs two records that still
     read as failures before a part may be added.
- **Rejected**: the four-digit sequence and the slug in the filename. A retro is keyed by the day it
  closes, not by a global counter, and S03 already fixes the `-2` suffix for a second retro on the same
  day. Also rejected: its template-substitution step (`cat $template | sed ...`), because our five lines
  are the format and a second template file would be a second thing to keep in sync.

## 3. S03 retrospect — the accepted internal method

- **Status**: accepted, `docs/BUILD-PLAN.md` row 38; the skill is `library/core` content and ships with
  the template
- **Artifact read**: `staging/S03/artifact/library/core/skills/retrospect/SKILL.md`, 65 lines, 3116 bytes
- **Analogue**: the method itself. The command is a trigger for this skill, not a second version of it.
- **Quote**: "Write five lines to `docs/retro/<YYYY-MM-DD>.md` and one pointer line in `STATE.md`"; the
  output block names `Worked:`, `Failed:`, `Why:`, `Change:`, `Next:`.
- **Borrowed**: the five labels and their order; the failure behaviour (no evidence becomes a `Failed:`
  line, a second change goes to `BACKLOG.md` under R9, a vague change is not allowed); the `-2` suffix
  for a same-day repeat; and the sentence that a change names what it adds or deletes, which is where R6
  enters. The command restates none of the seven steps; it reads "Run S03 as written" and adds only the
  inputs, the file, and the print.
- **Rejected**: inlining the evidence-hunting steps, because two copies of a method drift and the
  command would exceed one screen. Also rejected: S03's assumption that the command receives a stage or
  gate identifier and an evidence path. The command instead treats a bare argument as the stage or gate
  and discovers the paths itself, which closes S03's open question 2 in the direction the command format
  allows (no placeholder means no positional contract). `library/lessons/` still has no writer; that is
  S03's open question 3 and stays out of this part.

## Considered and rejected

| Repository | Stars (2026-11-25) | License | Why not the analogue |
|---|---|---|---|
| https://github.com/obra/superpowers | 326,500 | MIT | An agent-skills framework: its artifacts are prompt prose for a different skill set. It has no dated-record mechanism to compare against, and borrowing its voice would pull the command toward motivational coaching, which unit 24 of the justification bans |
| https://github.com/thomvaill/log4brains | 1,613 | Apache-2.0 | Publishes ADRs as a static site. The publishing half is irrelevant to a five-line record, and the repository has not moved since 2024-12-17 |
| https://github.com/adr/madr | 2,666 | NOASSERTION | A template collection. The record skeleton was already borrowed by S03; `/retro` adds a write and a screen, not another skeleton, so this would be a second source for a debt already paid |

## License note

OpenCode is MIT and adr-tools is GPL-3.0-or-later; both are read here for reference only. No source file,
script, or documentation prose from either repository is reproduced in the artifact or in this staging
folder beyond the short quotations above, each of which is attributed and used to evidence a reading
rather than to supply implementation. The three behaviours taken from `adr-new` — create the directory,
name by date, print the path — are unprotected ideas, restated in the command's own words. The artifact
therefore carries no copyleft obligation from adr-tools. S03 is first-party content from this project and
is reused by reference rather than by copy.
