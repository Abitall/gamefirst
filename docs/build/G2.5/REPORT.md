# G2.5 report

## Summary

G2.5 is the freeze that follows a G2 `proceed`: the human appends one dated decision to `DECISIONS.md` and `STATE.md` points at it, with four parts (date, features in, cut list, content budget by reference to the G2 packet). After it only fixes land; a fix restores promised behavior, a feature adds a mechanic, system, mode, screen, input or content type. An addition removes something of comparable cost (R9). A found bug is triaged in one line, blockers and regressions are fixed with a test, the rest goes to the backlog. S11 fills the budget, S12 polishes, G3 decides ship. The freeze does not re-check the nine G2 points, add a tenth, reopen the slice, or move a G2 number.

## Artifact

`staging/G2.5/artifact/library/game/gates/G2.5-feature-freeze.md` -> `library/game/gates/G2.5-feature-freeze.md`.

## Size

| Measure | Value |
|---|---|
| Characters | 1,767 |
| Tokens at chars/4 | 441.8 |
| Words | 327 |
| Tokens at words x 1.35 | 441.5 |
| Lines | 26 |
| Limit | 500 (brief; the rubric has no gate row) |

## Checks

| Check | Result |
|---|---|
| UTF-8, no BOM | PASS - first byte is `#`, not `EF BB BF` |
| Line endings | PASS - LF only, no CR |
| POSIX text | PASS - ASCII only, no tabs, trailing newline |
| No YAML | PASS - no `---` frontmatter |
| Structure | PASS - title, role line, Record, After the freeze, Boundary, cross-refs |
| Brief coverage | PASS - not-a-gate, date, list, cut list, budget by reference, fixes only, one-in-one-out, fix/feature test, human decides, DECISIONS entry + STATE pointer, bug handling, S11/S12, no G2 reopen, no tenth point |
| IDs | PASS - G2, G3, S10, S11, S12, R9, E06 all resolve |
| Single source | PASS - no budget copy; STATE points at the decision, the numbers stay in G2 |
| Sources | PASS - 9 rows, 4 gamedev / 3 software / 2 AI-agent, stars dated 2026-11-25, 6 dead ends |
| Copying | PASS - no code taken; quotes are single sentences used as evidence |

Cheap re-check:

```bash
cd staging/G2.5 && node -e "const s=require('fs').readFileSync('artifact/library/game/gates/G2.5-feature-freeze.md','utf8');const need=['# G2.5 - feature freeze','## Record','## After the freeze','## Boundary','DECISIONS.md','STATE.md','G2','G3','S10','S11','S12','R9','E06'];const miss=need.filter(x=>!s.includes(x));if(miss.length)throw new Error('missing: '+miss.join(', '));if(s.charCodeAt(0)===0xFEFF)throw new Error('BOM found');if(s.includes('\r'))throw new Error('CRLF found');if(s.length/4>500)throw new Error('over budget: '+(s.length/4).toFixed(1)+' tokens');console.log('ok '+(s.length/4).toFixed(1)+' tokens');"
```

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 13 units, each with a named failure; 9 deliberate omissions. |
| 2 | Function | PASS | Trigger G2 `proceed`; input feature list, cut list, budget by reference; output one dated decision; done when `DECISIONS.md` carries it and `STATE.md` points at it; failure stated as "no dated line means no S11"; scope bounded. |
| 3 | Evidence | PASS | 9 repos, 4/3/2, all live on 2026-11-25; licenses include two NOASSERTION and one custom; 6 dead ends. |
| 4 | Fit | PASS | Game-layer gate, no engine imports, same voice and shape as G2; agrees with R9, S11, S12. |
| 5 | Size | PASS | 441.8 at chars/4, 441.5 at words x 1.35, under 500. |
| 6 | Language and encoding | PASS | English artifact, ASCII, UTF-8 no BOM, LF, POSIX. |
| 7 | Security and licenses | PASS | No secrets; GPL-3.0, CC-BY-SA-3.0 and CC-BY-3.0 sources cited, not reproduced. |
| 8 | Testability | PASS | The Node check above prints the missing token and the overrun; it passes now. |
| 9 | Integration | PASS | Every ID resolves; the file loads alone; no YAML. |

## Open questions

1. The rubric has no row for gates, so the 500-token bar comes from the brief. Should it be written into the rubric before G3?
2. Date precision: the decision uses a day, not a time. Which timezone signs it when the human and the agent are in different ones?
3. Feature granularity: the list is by entry point (screen, mode, input). Should it instead reference D06 system cards where they exist?
4. Human availability: the freeze needs one signature. R10's autonomous mode has no substitute, and S12's feel pass has the same dependency.
5. Projects that skip G2 have no packet to point at. Does the freeze then require a budget record first?
6. "Disable" assumes a flag or a build switch. If none exists, disabling means cutting, which is a second trade; S12 should name the mechanism.

## Boundary

Written only under `staging/G2.5/`. No commits, no edits to G2, R9, S11, S12 or the blueprint.

Review: accepted 2026-11-26
