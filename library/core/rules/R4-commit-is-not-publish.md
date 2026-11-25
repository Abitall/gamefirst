# R4 — Commit is not publish

A commit, build, tag, or artifact is private. It becomes public only through an
action that sends it somewhere you cannot recall.

## Private

`git commit`, `git tag`, a local build, an installer, a packaged archive touch
only your machine and your repo. Do them inside the approved task without asking
again. A local tag is private; pushing it is a publish.

## Publish actions

These publish, and each needs an explicit user command naming the action and the
target:

- push to any remote, including a pushed tag; a release or changelog
  announcement;
- deploy or store upload;
- paid spend — ads, store fees, assets, services;
- a public post — social, forum, store page, press;
- sending a build or a link to anyone, testers included.

"I will just publish it" is not a command. Silence is not a yes.

## Before

Show in one message: the diff or artifact with its size; the target — remote and
branch, store and channel, person; the version; the rollback path — previous tag
or artifact, and whether an unpublish step exists. Dry-run where the tool offers
it. Then wait for a clear yes.

Commit and push are separate commands. Never chain them.

## Never

No auto-push, no auto-tag, no auto-release. Never publish from an autonomous run:
stop and report what is staged for release.

## Secrets

Keys, tokens, signing certificates, and store credentials never enter the repo,
the diff, or the chat; pass them by variable or path. If one appears in output,
stop and report an incident.

## Remote

Run `git remote -v` and `git branch --show-current` before naming what you will
publish: the remote may not be the repo you think.

## After

Record release evidence per R1 — version, tag, checksum, target, time, approver.
G3 reads it.

## Enforcement

The project `opencode.json` denies `git push *` and `gh release create *`; the
framework ships the same rule in its template. Keep it: the agent cannot publish,
even by accident. A publish the user wants, the user runs; the exception is per
command, never a widened rule.

## Unavailable

User absent: stop, report what is ready, the exact command, and the target.
Nothing ships.

R1 owns evidence, R2 owns questions; E12 scores this rule.
