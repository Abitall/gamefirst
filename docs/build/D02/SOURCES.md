# D02 — STATE: sources

Thin protocol: two external repositories and one accepted internal part. Stars
are GitHub API values on 2026-11-25. No code copied.

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/todotxt/todo.txt | 3,459 | GPL-3.0 | Plain-text task state | One fact per line, a short status vocabulary, no history in the current view | The priority letters, projects, contexts, date rules |
| 2 | https://github.com/upptime/upptime | 17,214 | MIT | Status page | Phase/status + last-updated line + blocked line; a reader sees state in one screen | Uptime checks, incidents, hosted dashboard |
| 3 | SL02 `/status` (internal, accepted) | n/a | project-internal | The reader contract | The headings `Phase`, `Active`, `Gate`, `Next`, `Blocked`, `Since` and the missing-file behavior | The command implementation |

## Considered and rejected

- `public-apis/public-apis` (501,411★, MIT) — a list, no state model.
- `sindresorhus/awesome` (542,757★, CC0-1.0) — a list, no state model.
- `k88hudson/git-flight-rules` (42,571★, CC BY-SA 4.0) — recovery recipes, not state.
- `elsewhencode/project-guidelines` (29,406★, MIT) — team rules, not a file.
- `jlevy/the-art-of-command-line` (162,848★, no license) — no license, no state.
- `github/roadmap` (8,984★, CC-BY-4.0) — a public roadmap, not a per-project state page; the status/date idea is already in upptime.

## License note

`todo.txt` is GPL-3.0; only its plain-text idea is borrowed, no code. `upptime`
is MIT; only the status-page layout is borrowed. SL02 is project-internal.
