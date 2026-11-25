# D06 — system card: sources

Thin protocol: two external repositories and one accepted internal part. Stars are GitHub API values on 2026-11-25. No code copied.

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/kubernetes/enhancements | 3,991 | Apache-2.0 | KEP template | One-page structure, status vocabulary, explicit "tests" and "graduation criteria" | The multi-page KEP process, review roles, release stages |
| 2 | https://github.com/rust-lang/rfcs | 6,643 | Apache-2.0 | RFC template | "Motivation / Guide-level / Reference-level" split, exact names over prose, open questions at the end | The RFC lifecycle, shepherding, comment periods |
| 3 | `S02 verify` (internal, accepted) | n/a | project-internal | Evidence and `verified by` | The claim→check table, evidence path, PASS/FAIL vocabulary | The seven-step verification procedure, recipe resolution |

## Considered and rejected

- `godotengine/godot-proposals` (1,464★, MIT) — proposal template, not a per-system card; the status field was useful, the rest is process.
- `LazyHatGuy/GDDMarkdownTemplate` (64★, NOASSERTION, 2023) — a full GDD template; too broad for one system, stale license.
- `microsoft/code-with-engineering-playbook` (2,761★, CC-BY-4.0) — engineering playbook; no per-system card, and the license is documentation-only.

## Notes

- Kubernetes contributes the idea that a system card is a status document, not an essay: name, status, tests, evidence.
- Rust RFC contributes the "exact names, not counts" rule and the open-questions tail.
- S02 is the only internal source: `verified by` and the evidence folder are its vocabulary; the card does not restate the verify steps.
