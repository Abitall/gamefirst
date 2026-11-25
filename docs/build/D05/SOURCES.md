# D05 — sources

Thin protocol: two external repositories and one accepted internal part. Each external source names its analogue and what was borrowed or rejected. No code is copied; the template's wording is original. Star counts are from the GitHub API on 2026-11-25.

## 1. godotengine/godot-proposals

- URL: https://github.com/godotengine/godot-proposals
- Stars on 2026-11-25: 1,464
- License: MIT
- Active: pushed 2026-09-15
- Artifact type: a public proposal tracker for one engine, issues plus discussions
- Analogue: an idea lives as one proposal, apart from the code, and is priced before it can enter. Closure is deliberate; a rejected idea keeps a home elsewhere.
- Quote: "Use one issue per proposal. Do not cram multiple feature requests into a single proposal, as this makes it harder to discuss features individually." The rules also say "Search existing proposals and ideas for potential duplicates", and the evaluation asks "How complex would the proposed change be?"
- Borrowed: one idea per line; the duplicate check before writing; cost as complexity; closure as a deliberate act, never a silent deletion; a rejected idea is not destroyed.
- Rejected: the required detailed design, the ban on AI-written proposals, the support polling, the addon-or-GDExtension test, and maintainer discretion. A backlog line is written in a minute and decided by a gate, not by a proposal review.
- Weakness: 1,464 stars is modest for a repository; it is the live gamedev proposal process, and the practice matters more than the count. This is stated, not hidden.

## 2. github/roadmap

- URL: https://github.com/github/roadmap
- Stars on 2026-11-25: 8,984
- License: CC-BY-4.0
- Active: pushed 2024-10-15
- Artifact type: a public product roadmap of issues with release-phase labels
- Analogue: a public list of things not yet built, each carrying a phase, explicitly not a commitment or a date.
- Quote: "Every item on the roadmap is an issue, with a label that indicates each of the following: A release phase that describes the next expected phase of the roadmap item." The exploratory items "have no timeframe available. These are included in the roadmap only for early feedback." The disclaimer: "The forward-looking product roadmap does not represent a commitment, guarantee, obligation or promise to deliver any product or feature".
- Borrowed: the opening claim that an idea is not a promise; a status word on every line; "exploring" as the ancestor of `parked`; a list where an idea waits without a date.
- Rejected: the product-area, SKU and deployment labels, the quarterly board, the read-only issue mechanics, and the "shipped" label that closes an issue. D05 has five fields and one page.
- Weakness: last push 2024-10-15; the repository is read-only and two years stale. The disclaimer is still the clearest wording of "not a promise"; the staleness is stated, not hidden.

## 3. R9 — scope is budget (accepted internal part)

- URL: not applicable; internal artifact.
- Stars on 2026-11-25: not applicable.
- License: project-internal; no public license.
- Active: accepted in `docs/BUILD-PLAN.md:31`.
- Artifact: `library/core/rules/R9-scope-is-budget.md`
- Analogue: the rule that owns the file. It defines the one-line idea, the wait, the cut-or-park choice, and the budget the line is measured against.
- Quote: "An idea that arrives mid-stage goes to `BACKLOG.md` in one line: what it is, the value it adds, the cost it carries. Then it waits." And: "Nothing is rejected — the backlog is where a good idea keeps its value until a gate can pay for it." And: "Over budget means cut or park. It never means expand."
- Borrowed: one line with value and cost; the wait until a gate pays; no rejection; cut or park; the budget stays in `STATE.md`, not here.
- Rejected: R9's budget arithmetic and gate mechanics. D05 does not restate the numbers or the checks E06 and A04 run.

G2.5 is the second internal caller, not the source: it prices an idea after the freeze, but it does not define the line. `SOURCES.md` keeps three entries; `JUSTIFICATION.md` carries the full cross-reference table.

## Considered and rejected

- `kubernetes/enhancements`: KEP stages and tracking issues are a close analogue for status words, but the process is a multi-page design record. Borrowing it would pull a one-page backlog toward a spec.
- `rust-lang/rfcs`: the "postponed" state is close to `parked`, but an RFC is a design document, not a one-line list.
- Taskwarrior: already borrowed by SL03 as a selection shape, not a formula; reusing it here would duplicate that source and add a scoring idea R9 does not need.

## License note

godot-proposals is MIT; github/roadmap is CC-BY-4.0; R9 is project-internal. Only short quotations are used, with attribution. No source code is copied. The five fields and three statuses are an original synthesis of the three sources, checked against R9, G2.5 and E06.
