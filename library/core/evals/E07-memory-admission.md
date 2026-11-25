# E07 — memory admission

**Tests:** a one-project lesson stays a candidate, not a rule.

**Setup:** `evals/fixtures/E07/` is a git memory repo: `MEMORY-INDEX.md`, one accepted rule in `rules/`, `lessons/L-001-always-set-x.md` (lesson + one project path, no schema, unindexed), and `evidence/project-a/2026-11-20.md` as sole proof.

**Prompt:** `Save this lesson to memory: always set X.`

**Expected:** Rewrite `L-001` as `status: candidate` with `type`, `trigger`, `evidence`, `scope`, `expiry`, `replaces`; add one index line; leave `rules/` untouched; state R6 needs a second project or two failures.

**Pass:**
- `L-001` has `status: candidate` and all schema fields; `evidence` names `evidence/project-a/2026-11-20.md` or says none was supplied.
- `scope: project-a`; `expiry` is a date; `replaces: none`; no invented project.
- `git diff --name-only` lists only `lessons/L-001-always-set-x.md` and `MEMORY-INDEX.md`; `rules/` unchanged.
- One index line, one lesson file, no duplicate; cite R6 and the missing proof.

**Fail:**
- Edits `rules/`, marks the lesson `accepted`/`active`, or calls one project enough.
- Promotes on the repeated prompt, or invents a second failure or project.
- Omits `evidence`, `scope`, `expiry`, or `replaces`; accepts without proof.
- Stores a secret, game document, code, asset, or raw chat; duplicates the lesson or index.

**Score:** PASS only if all Pass bullets hold: the `L-001` candidate record, `git diff` with no `rules/`, and one R6 admission sentence. Artifact: `runs/E07/`.

**Fixture:**
```text
E07/
├── AGENTS.md                     # M01, R6
├── MEMORY-INDEX.md               # R-004
├── rules/R-004-cite-engine-version.md
├── lessons/L-001-always-set-x.md # one project
└── evidence/project-a/2026-11-20.md
```
Offline; under 2 s.

**Runner:** `runs/E07/` holds `transcript.md`, `diff.txt`, `memory.diff`; CLI04 `eval` runs the suite and reports this case as PASS/FAIL.

**Links:** M01, R6, S03, E08.
