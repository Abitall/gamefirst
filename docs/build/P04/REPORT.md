# P04 audio pack - report

## Summary

P04 adds an on-demand audio reference pack at `library/packs/audio/`. It supplies
pillars, a cue-table brief, loudness and format targets, implementation contracts,
mixing and accessibility checks, licensing rules, a review checklist, holds, and
cross-references. It ships no runtime code, no engine API, no audio assets, and no
vendor choice. The package passes its own offline self-test, including four
negative mutations.

## Size

| File | Bytes | Chars | Lines | Tokens (chars/4) | Limit | Status |
|---|---|---|---|---|---|---|
| `PACK.md` | 5,948 | 5,948 | 139 | 1,487 | 6,000 chars / 1,500 tokens | PASS |
| `manifest.json` | 517 | 517 | 15 | 129 | exactly 8 keys | PASS |
| `selftest.mjs` | 8,814 | 8,814 | 239 | 2,204 | 250 lines | PASS |
| `templates/audio-brief.md` | 1,932 | 1,932 | 50 | 483 | 4,000 chars | PASS |
| `JUSTIFICATION.md` | 6,631 | 6,631 | 91 | 1,658 | no cap | PASS |
| `SOURCES.md` | 7,914 | 7,914 | 181 | 1,979 | 9 sources, 4/3/2 | PASS |
| `REPORT.md` | 4,460 | 4,460 | 96 | 1,115 | no cap | PASS |

The audio payload is 17,211 bytes across the four artifact files. `PACK.md` sits
52 characters under the hard cap, so any edit needs a fresh self-test.

## Checks

`node selftest.mjs`, run from the pack directory:

```text
ok   1 manifest parses
ok   2 identity
ok   3 eight keys
ok   4 file entries
ok   5 file set equals disk
ok   6 sha256 hashes
ok   7 encoding and placeholders
ok   8 token caps
ok   9 sections and line cap
ok   10 no secrets
ok   negative: extra file
ok   negative: bad hash
ok   negative: string files
ok   negative: missing section

14/14 checks passed
```

Exit code: 0.

Manual checks:

- Manifest has exactly the eight required keys; no `$schema`; `requires` is
  `["core","game"]`; `loaded` is `on-demand`; `upgrade` is `none`.
- Every file except the manifest is listed; hashes match on disk.
- `PACK.md` has all ten section headings and the load trigger above them.
- Token count is 1,487 by chars/4, under 1,500; the hard cap check is 6,000.
- Template uses only `[...]` slots; no double-brace placeholders anywhere in the pack.
- UTF-8, no BOM, LF only, no U+FFFD; checked by the self-test and again over the
  staging docs.
- No private-key, GitHub-token, or AWS-key pattern; no publish, spend, download,
  or account step.
- No vendor, DAW, codec product, or store is required; no engine call is named.
- Sources: 9 total, 4 gamedev, 3 software, 2 AI-agent; stars dated 2026-11-26.
- Files outside `staging/P04/` were not touched; no commit was made.

## Rubric 1-9

| # | Criterion | Verdict | Evidence |
|---|---|---|---|
| 1 | Shape matches the release pack | PASS | Same PACK/manifest/selftest/template shape, 8-key manifest, on-demand load. |
| 2 | Scope is reference and checklist only | PASS | No runtime, engine API, asset pipeline, DAW, vendor, or publish step. |
| 3 | All required sections exist | PASS | Load trigger plus boundaries, pillars, brief, targets, hooks, mixing, licensing, checklist, holds, cross-refs. |
| 4 | Targets are measurable and actionable | PASS | LUFS, true peak, sample rate, format, loop seam, size budget, latency, voice caps. |
| 5 | Licensing is enforceable | PASS | One row per asset; accept/reject lists; proof, attribution, date, replace-by; hold. |
| 6 | Mixing and accessibility are covered | PASS | Bus trims, ducking, sliders, mono, night mode, two-output test, visual twins, muted run. |
| 7 | Manifest and hashes are exact | PASS | Eight keys, all paths listed, SHA-256 matches, no `$schema`. |
| 8 | Self-test is meaningful | PASS | Ten packaging checks and four real mutations, all passing offline. |
| 9 | Sources and docs support the claims | PASS | Nine dated sources with quotes, borrow/reject, dead ends; justification and report. |

## Open questions

1. Should a later revision add a JSON schema for the cue table, or keep the fields
   as a markdown table to avoid another format to maintain?
2. Is 50 ms input-to-audible realistic on the oldest supported browser and
   hardware, or should the target be 80 ms with a measured exception?
3. Who owns the loudness evidence at G2.5: the S12 polish owner, QA, or a human
   audio reviewer?
4. Do music transitions belong in S12 or in a separate small skill once the slice
   has more than one state?
5. Does the pack need a short store/platform annex, or is "stricter current spec
   wins" enough until the first release candidate?

Review: accepted 2026-11-26
