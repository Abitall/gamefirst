# G3 - ship: justification

Every unit of `artifact/library/game/gates/G3-ship.md`, why it is there, what
breaks without it, whether it could be shorter, and the source that suggested
it.

## Units

| Unit | Why | What breaks without it | Shorter? | Source |
|---|---|---|---|---|
| Title and role line | States who decides: a human, over a packet the agent prepared | The agent drifts into deciding, or the gate becomes a checklist somebody scores | No - one sentence carries the whole authority model | SRC6, SRC9 |
| Input: S13 evidence | The gate reads a packed release, not a working tree | A gate over an unfinished build, with evidence invented at the door | No - each item is a separate artifact | SRC7 |
| Input: C03 crew | The crew is the hands at the store door; it must be standing there before the decision | Nobody knows who packs, who waits, or who is dismissed after ship | No | SRC4 |
| Input: E12 safety | Publish and spend are separate commands, not consequences of a decision | The gate accidentally ships a build because it was told to decide | No | SRC7 |
| Input: G2.5 freeze | Scope must be closed before the door opens | A feature sneaks in between freeze and ship, and the tested build is not the shipped one | No | SRC8 |
| Input: known bugs | Accepted risk has to be written down with a severity and an owner | Serious known bugs ship silently and surface as reviews | No | SRC3 |
| Check 1: artifact, tag, checksum | Proves the binary is the tagged source and the same binary everyone tested | An unverifiable build, or a rebuild that differs from the tested one | No | SRC1 |
| Check 2: clean-profile install | R1: release ready means installed and run from a clean OS profile, and, when saves exist, a previous-release save loads | "Works on my machine"; a first-run crash no one saw; a save that breaks on upgrade | No - the five steps are the test; only the previous save is conditional | SRC9 |
| Check 3: store metadata | A good build still fails at the store page if price, channel or requirements are wrong | Delisting, wrong price, or a platform requirement missed at submission | No | SRC2 |
| Check 4: rollback | No publish without a way back | A broken build goes live and stays live | No | SRC8 |
| Check 5: crash channel | You cannot watch what you cannot see | 72 blind hours after launch | No | SRC9 |
| Check 6: post-launch owner | One named human for the first 72 hours, not a team or a rota | Nobody answers at 3am, or everybody assumes somebody does | No | SRC6 |
| Check 7: no open blocker | The gate must be able to stop on a known defect | A known crash ships because the date was fixed | No | SRC9 |
| Check 8: publish is separate | G3 never presses the button; R4 owns that command | The gate becomes the publisher and the decision loses its second pair of eyes | No | SRC7 |
| Decision: ship line | The decision must be one dated line with one home, DECISIONS.md, not a meeting | No record, no date, no way to audit who said ship; two copies that drift | No - one line, one home | SRC5 |
| Decision: hold, one blocker | A hold has to be actionable and single | Hold becomes a list of everything, and nothing gets fixed | No | SRC9 |
| Out of scope | Keeps the gate a gate | Re-litigating G2 and G2.5 at the last minute, or adding a feature | No | SRC8 |
| Cross-refs | Ties the gate to the rules that give it force | The gate drifts from R1, R4 and R9 and becomes opinion | No | SRC1 |

## Units deliberately absent

- A separate legal or license check. S13 owns the license and attribution list
  and hands it over as evidence; re-checking it here would be a ninth check.
- Save compatibility as its own point. Folded into check 2: load a save from
  the previous release when saves exist, or the break is declared.
- Price and channel as their own points. Folded into check 3, next to the
  store metadata they depend on.
- A score, percentage or readiness meter. The output is one line, ship or hold.
- A re-review of G2 or G2.5. Both are closed; G3 reads their result, not their
  arguments.
- 72-hour metric targets. Those belong to post-release monitoring, after the
  gate, not inside it.
- Marketing copy and launch announcements. The gate names the owner; the words
  belong to the community manager.
