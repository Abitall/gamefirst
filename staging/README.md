# Staging

Build-time drafts live here. Nothing in `staging/` is shipped in the final
template.

## Layout

```text
staging/<ID>/
├── artifact/          # files mirroring their final path under gamefirst/
├── JUSTIFICATION.md   # why every semantic unit exists
├── SOURCES.md         # nine repositories, with stars and what was borrowed
└── REPORT.md          # summary, size, open questions, known weaknesses
```

## Rules

- One part per folder. Do not edit another part's folder.
- `artifact/` mirrors the final path. Example:
  `staging/S02/artifact/library/core/skills/verify/SKILL.md`.
- `JUSTIFICATION.md` uses a table: unit, why, what breaks if removed, source.
- `SOURCES.md` lists exactly nine repositories: 4 gamedev, 3 software, 2 AI-agent.
- No secrets, no copied code, no generated binaries.
- The author writes a short `REPORT.md`; the reviewer writes the verdict in the
  same file under `## Review`.
- Accepted parts are copied to their target and marked `accepted` in
  `docs/BUILD-PLAN.md`.
