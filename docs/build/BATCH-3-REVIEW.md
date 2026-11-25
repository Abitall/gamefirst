# Batch 3 Review

Date: 2026-11-25
Verdict: **PASS**

Batch 3 adds rules R8–R10 and agents A01 (partner) and A04 (critic).
All five parts were built from nine sources each, reviewed against
`docs/REVIEW-RUBRIC.md`, and assembled only after acceptance.

## Parts

| Part | Agent | Size chars/4 | Size words×1.35 | Limit | Sources | Rounds |
|---|---|---:|---:|---:|---:|---:|
| R8 fun | game-designer | 569.8 | 585.9 | 600 | 9 (4/3/2) | 2 |
| R9 scope | producer | 563.75 | 567.0 | 600 | 9 (4/3/2) | 2 |
| R10 autonomy | technical-director | 563.75 | 527.85 | 600 | 9 (4/3/2) | 2 |
| A01 partner | producer | 637.8 | 540.0 | 700 | 9 (4/3/2) | 2 |
| A04 critic | qa-lead | 609.5 | 519.75 | 700 | 9 (4/3/2) | 2 |

R8's word-based estimate is above the 580 target band but under the 600
ceiling. It is accepted with that note; no other part exceeds its target.

## Review changes

- **R8**: `One human` became `At least one human`; `extend once` became
  `extend once for this loop`; the playtest note now names D07. The requested
  "15–20 minutes of play" change was left out because it was not needed and
  would have pushed the word metric higher.
- **R9**: added the boundary "A fix that restores intended behavior is not a
  feature; a fix that changes a system is." and made S11 own the cut list and
  its order as well as the reuse matrix.
- **R10**: removed the duplicate `; no publish` from the `report` field. R4
  still owns publish, and `## Limits` still says so.
- **A01**: confirmed from the OpenCode docs that global permissions are
  appended before agent rules, so omitting `shell` is correct; `edit` covers
  edit/write/patch; resources are game-root relative. The report's unit count
  was corrected to 31 and the resolved questions were closed.
- **A04**: removed the `read`/`glob`/`grep` allow rules so the global `.env`
  deny is not overridden by the last matching rule; added the redaction
  sentence; added `question: deny`. The agent now has six deny-only rules:
  edit, shell, subagent, webfetch, websearch, question.

## Smoke test

Disposable game:
`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b3\smoke-game`

Result: **78 checks, 0 failures**.

Covered: `opencode.json` parses with 31 permissions; shell ask; `git push`
deny; `.env` deny and `.env.example` allow; Windows recursive-delete denies;
`instructions` path; 10 plain-text rules; every rule ≤600 chars/4; partner
`mode: primary`, `subagent * allow`, `src/** deny`, no shell rule; critic
`mode: subagent` with six denies and no allows; verify skill frontmatter; no
BOM/CRLF; no `{{` placeholders; all five build-doc sets present.

The bare template deliberately has no `default_agent`. N00 must set
`default_agent: partner` after copying the agent into `.opencode/agents/`.

## Integration decisions

- Ten core rules now load through `.opencode/rules/*.md`; the template remains
  engine-free.
- `library/core/agents/` now holds `partner.md` and `critic.md`. A01 is the
  primary dialogue owner; A04 is a read-only subagent.
- A04 relies on the global `.env` deny and on the global shell/publish denies;
  it adds no broad allow that could override them.
- A01 relies on the global `shell * ask` and publish denies by omitting a
  `shell` rule; its edit allows are listed before the `src/**` deny.
- `edit` covers edit, write, and patch; no separate `write` action exists in V2.
- `default_agent: partner` belongs to N00, not the bare template.

## Open issues carried forward

- R8: note home is D07; S08–S10 must use it. Open questions 3 (build vs visit)
  and 5 (evidence path) remain in the part report.
- R9: D02 `STATE.md` must carry the stage budget; cut order is owned by S11.
- R10: X01 may later introduce a separate `CONTRACT.md`; the template and rule
  must move together. `runs/questions.jsonl` writer is still X01's call.
- A01 and A04 have no dedicated eval yet; E04/E06/E12 exercise the partner
  indirectly.
- N00 must copy the agents and set `default_agent: partner`.

## Next

Batch 4: A02 designer, A03 engineer, S01 research, S03 retrospect, S04 import.
Do not start Batch 5 until Batch 4 is accepted and the ten rules plus two
agents load together in a disposable game.
