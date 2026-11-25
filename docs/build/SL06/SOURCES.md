# SL06 — `/help`: sources

Thin protocol: two external repositories and one accepted internal part. Stars are GitHub API values on 2026-11-25. No code copied.

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/google-gemini/gemini-cli | 109,105 | Apache-2.0 | CLI help screen | One-screen command map, explicit labels, short descriptions, no prose | The full TUI, argument parser, model loop |
| 2 | https://github.com/bmad-code-org/BMAD-METHOD | 55,740 | MIT (API returns NOASSERTION) | Orientation and workflow map | "Where am I / what next" framing, phase names, one owner | The multi-agent roster, long workflow docs, install steps |
| 3 | `A01 partner` (internal, accepted) | n/a | project-internal | Owner, report format, language split | The `Game/Phase/Mode/Gate/Next` fields and the Russian/English split | The duties text, routing table, gate procedure |

## Considered and rejected

- `opencode` CLI — its own help is a command reference, not a project map.
- `claude-code` — help is product help, not a game project's state.
- `taskwarrior` — the next-action model was useful for `/next`, not for `/help`.
- A static `HELP.md` — the point is to read live state; a static page goes stale.

## Notes

- `gemini-cli` contributes the one-screen discipline: one line per item, no nested prose.
- `BMAD` contributes the phase vocabulary and the "one owner" line; the roster and ceremony were rejected.
- `A01` is the only internal part used; `SL01`/`SL02` were read for the command names but not borrowed as sources.
