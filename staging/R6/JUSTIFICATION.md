# R6 — Justification

Every line in the rule is a decision, not a summary of the blueprint. The table
names the decision, the failure it prevents, and what is lost if the line is
removed. Sources are the nine repositories in `SOURCES.md` or the blueprint
section that already fixed the wording.

| # | Unit | Why it exists | What breaks if removed | Source / inspiration |
|---|---|---|---|---|
| 1 | Part types: rule, skill, agent, tool, pack, document | A closed list stops the gate from being dodged by renaming the addition | An agent adds a bundle and argues R6 does not apply to "packs" | Blueprint part inventory (10 rules, 13 skills, 4 agents, 10 templates) |
| 2 | Admission: repeated failure or measured gap | A part must answer something that already went wrong; unproven ideas have no forcing function | Additions become taste, and the library grows with opinion | superpowers, godot-proposals |
| 3 | `"Just in case" is not a reason` | Names the default rationalization so the reader catches it in their own sentence | The rule reads as advice; "we might need it" passes | Blueprint R6 wording |
| 4 | Why: a line read every task, or a file kept current | Makes the cost recurring rather than a one-time writing cost | A part looks free once written, so adding one looks cheap | 12-factor-agents, raylib |
| 5 | Why: 90 skills and 52 agents for one developer | A real count beats an argument; the failure already happened at scale | The cost is abstract and the warning reads as theory | This template's predecessor |
| 6 | Two proofs qualify; one is enough | Demanding both would make the gate unfalsifiable, since most real failures give only one | The gate is ignored in practice because nothing can pass it | M01 admission ("second project or two failures") |
| 7 | Repeated failure: same mistake in two separate sessions, each with an evidence path | One run can repeat a slip mechanically; two sessions show the model did not learn, and a path makes the claim checkable | A single bad run, or a flaky provider, counts as evidence | superpowers (watch it fail first), R1 |
| 8 | Measured gap: an eval, fixture, or playtest that fails for a missing capability | Second door for a hole that is known before it has caused a shipped mistake | Only bugs can add parts; a measured hole waits for a real error | E03, E07 |
| 9 | A single annoyance goes to `NOTES.md` or `lessons/` | Gives the impulse somewhere to go so it does not leak into a part | The only options are add or forget, and small frictions get promoted | kubernetes/enhancements (not-an-enhancement list) |
| 10 | Not reasons: symmetry, completeness, a tool you might need next month — each a guess about work not yet done | Three named forms of anticipation, plus a test for cases not listed | Parts are added to balance a table; "we might need it" returns | rust-lang/rfcs (impact of not doing), blueprint metric "unused skills: zero" |
| 11 | Smallest fix first, rung 1: clarify an existing rule or skill | Most failures are ambiguity in a part that already exists | Every unclear sentence becomes a new file, and duplicates accumulate | defold (compare solutions before choosing one) |
| 12 | Rung 2: one checklist line or one eval case | When the capability exists, a line inside it can carry the fix | A one-sentence fix is written as a new part, doubling what must stay true | Blueprint (skills carry checklists) |
| 13 | Rung 3: fix the tool that failed | A broken tool produces failures no document can prevent | The library grows prose about a bug that belongs in code | R1 (a run is evidence), S05 |
| 14 | Rung 4: add a new part | Makes the ordering explicit and defensible in review | The default move is a new skill, which is the predecessor's pattern | SFML, raylib (extension or nothing over core) |
| 15 | A new part is last because it is the most expensive to keep | States the criterion behind the order, not just the order | The ladder looks arbitrary and gets reordered by preference | 12-factor-agents (small focused units), raylib (compactness) |
| 16 | Five items: trigger, input, output, done check, proving eval or fixture | A part that cannot name them cannot be tested, so it cannot be retired either | Parts ship as prose and nobody can tell whether they work | REVIEW-RUBRIC §2, E03 |
| 17 | A part with no failing check is a wish | One-line test of whether the addition is real | The five items can be filled superficially and still pass | superpowers (fail first, then write) |
| 18 | A new library enters as one addition | The template's own build adds most of the library; without this, R6 forbids its own creation | Either R6 is broken at build time or the build has no rule at all | Blueprint (library construction) |
| 19 | One failure, one proof, many files | Separates one admitted decision from eighty separate guesses | The carve-out is read as a licence for bulk additions | godot-proposals (one issue per proposal, inverted) |
| 20 | Each later addition deletes or merges one part, named in the same change | Caps size without a quota, and naming the trade makes it visible in the diff | "One in, one out" becomes a slogan with no artifact behind it | Blueprint non-negotiable, django (removal path) |
| 21 | Unused across two projects: remove or move to `lessons/` | Use is the only honest measure; two projects filters novelty | Unused parts stay because deleting one feels like a loss | django (deprecation and removal), blueprint metric |
| 22 | Review that list once a quarter | Nothing else triggers the check; no failure announces an unused part | Review happens only after the library already hurts | django (scheduled removal) |
| 23 | Removal is one commit with the reason in its message; no deprecation period, no migration note, no question | The library is a copy, not a public API; a graceful path costs more than the part | Every deletion becomes a negotiation, so deletions stop | django (two-release window, rejected here) |
| 24 | Record: date, part, the two failures or the failing fixture, what it replaced | The proof must outlive the session that saw it | The next agent cannot tell why a part exists or whether it ever worked | D03 `DECISIONS.md` |
| 25 | Memory (M01) enters on the same gate | A memory item carries the same per-task cost; a looser gate creates a second pile | Notes accumulate "just in case" under another name | M01, E07 |
| 26 | Check: S03 proposes; imports (S04) and new tools (S05) pass this gate too | Closes the side doors, where additions usually enter unexamined | A tool or an imported skill bypasses admission by not being called a skill | S04, S05 |
| 27 | Check: S01 prior art | The gap may already be covered by an existing part or an outside tool | The library duplicates something the project already has | godot-proposals (search addons first), SFML |
| 28 | Check: R1 — the proving run is the artifact | Ties admission to the same evidence standard as a done claim | "I tried it and it worked" returns as evidence | R1 |
| 29 | Check: parts judged by the `DECISIONS.md` line and the fixture it names | Gives the reviewer an object to check instead of an opinion to weigh | Review debates value rather than verifying proof | D03 |
| 30 | Check: external material is read under R3 | Keeps sourcing in one rule; otherwise two rules can disagree about the same decision | Conflicting instructions for the same import | R3 |

## Deliberate omissions

| Omitted | Reason |
|---|---|
| A deprecation period or migration note for removed parts | Django's two-release window protects outside users of a public API. A library part is a copied file with no dependants, so a window would delay a decision without helping anyone. |
| A value score or priority formula for additions | Any score can be argued upward. The gate is binary — proof or no proof — and a number would add negotiation, not rigour. |
| A cap on library size, such as "max 20 skills" | A cap invites deleting a working part to hit a number. An unused part is caught by the quarterly check without a ceiling. |
| Skill-writing ceremony (pressure scenarios, subagent tests) | That harness assumes a skill author with test infrastructure. A failing fixture in the project is cheaper and is already the accepted proof. |
| A request template for additions | The five required items live inside the part itself. A separate template would be a part about parts. |
| Roles or approvers for an addition | The template serves one developer. The proof is the approver; a role list would need its own evidence to exist. |
| A backlog of candidate parts | A backlog is a "just in case" queue with better manners. `NOTES.md` is scratch and carries no expectation of admission. |
| Memory item fields (id, scope, expiry) | M01 owns that schema. Repeating it here would drift the moment M01 changes. |
| Time-based expiry of parts | Age says nothing about use. A part used every week is not stale, and an unused one is caught by the two-project rule whatever its date. |
| R2's question budget and R3's sourcing detail | Those rules own their subjects. R6 points at them rather than restating them, so a change lands in one place. |
