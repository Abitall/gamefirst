# A04 — Sources

Nine repositories whose artifacts answer "how does a reviewer judge someone
else's work without becoming its author": four gamedev, three software, two
AI-agent. Stars were read on 2026-11-25 with `gh api repos/<owner>/<repo>
--jq .stargazers_count`. Quotes are verbatim and short; nothing is copied — no
code, no license text, no paragraph.

## Gamedev (4)

### 1. OpenTTD/OpenTTD — 8,531 stars

- URL: https://github.com/OpenTTD/OpenTTD
- Artifact: `REVIEWING.md`.
- Quote: "Code reviews have a number of aspects to consider. 1. Does the code
  work as described?" Also: "(Nobody can approve their own pull request.)" And:
  "Try to avoid suggesting feature-creep."
- Analogous to: a review guide that starts from behavior, forbids self-approval,
  and treats scope as part of the review.
- Borrowed: the first question is whether the change does what it claims
  (R1/E03); the author and the reviewer are different parties; a finding that
  widens the promised scope is a finding (R9/E06).
- Rejected: the maintainer/triage hierarchy and the approval count. A solo
  project has no quorum, and the critic issues one verdict, not a merge.

### 2. bevyengine/bevy-website — 251 stars

- URL: https://github.com/bevyengine/bevy-website
- Artifact: `content/learn/contribute/helping-out/reviewing-pull-requests.md`,
  the page served as `bevy.org/learn/contribute/helping-out/reviewing-pull-requests/`.
- Quote: "anyone can catch missing tests, unclear docs, logic errors, and so
  on." Also: "The purpose of an open source code review is to assess the code as
  it is, not to tell the author what to do." And: "Keep scope in mind."
- Analogous to: a reviewer charter that limits the reviewer to assessment and
  names missing tests as a first-class finding.
- Borrowed: review the artifact as it stands, not the artifact you would have
  written; missing test evidence is a finding; scope is a review dimension.
- Rejected: the approval quorum (one member, two members, two SMEs, a 45-day
  clock) and the Discord escalation path. Those coordinate a large community;
  A04 coordinates nothing.
- Honest caveat: the website repository is small; it is the official site for
  `bevyengine/bevy` (~50k stars). The count understates reach, so it is recorded
  rather than rounded.

### 3. OpenMW/OpenMW — 6,784 stars

- URL: https://github.com/OpenMW/OpenMW
- Artifact: `CONTRIBUTING.md`, the merge-request rules.
- Quote: "Review threads should be resolved by the thread author so that they
  can confirm that their concerns have been adequately dealt with." Also: "Small
  merge requests are easier to review and are less likely to require further
  changes before we can merge them."
- Analogous to: review produces findings the author closes; the reviewer does not
  close them by editing.
- Borrowed: the reviewer writes findings and stops; the author resolves them.
  This is why A04 has `edit: deny` and why findings are one line each (R7 and
  the read-only protocol).
- Rejected: GitLab threads, the "Future" label policy, and the merge-request
  template. Tooling and project governance, not review judgment.

### 4. cocos2d/cocos2d-x — 19,256 stars

- URL: https://github.com/cocos2d/cocos2d-x
- Artifact: `CONTRIBUTING.md`, the pull-request checklist.
- Quote: "Include test cases if applicable"; "Must NOT break existing tests
  cases"; "Must be tested in all supported platforms".
- Analogous to: tests are attachments to the change, and a regression blocks it
  regardless of how good the new behavior is.
- Borrowed: evidence is part of the artifact under review (E03); a broken old
  test is a finding even when the new feature works; the claim "tested" needs a
  named test, not an adjective.
- Rejected: the platform matrix and the per-platform sign-off. Core rules stay
  engine-agnostic; platform checks belong to the engine pack.

## Software (3)

### 5. nodejs/node — 123,997 stars

- URL: https://github.com/nodejs/node
- Artifact: `doc/contributing/pull-requests.md`, "Reviewing pull requests" and
  "Approving a change".
- Quote: "Collaborators are not permitted to approve their own pull requests."
  Also: "Reviews and feedback must be helpful, insightful, and geared towards
  improving the contribution as opposed to simply blocking it." And: "When
  reviewing a pull request, the primary goals are for the codebase to improve
  and for the person submitting the request to succeed."
- Analogous to: a review code that separates the reviewer from the author and
  measures feedback by whether it can be acted on.
- Borrowed: no self-review; every finding must be actionable; a verdict is not a
  veto and must name what would change it.
- Rejected: the two-collaborator approval rule, `LGTM`, and the Code of Conduct
  process. A solo reviewer cannot supply a second collaborator.

### 6. torvalds/linux — 256,703 stars

- URL: https://github.com/torvalds/linux
- Artifact: `Documentation/process/submitting-patches.rst`, "Reviewer's
  statement of oversight".
- Quote: "Reviewed-by:, instead, indicates that the patch has been reviewed and
  found acceptable according to the Reviewer's Statement:" followed by "By
  offering my Reviewed-by: tag, I state that: (a) I have carried out a technical
  review of this patch to evaluate its appropriateness and readiness for
  inclusion into the mainline kernel." And "(b) Any problems, concerns, or
  questions relating to the patch have been communicated back to the submitter."
- Analogous to: a review is a statement of oversight with named obligations, and
  its output is communication back to the author, not a silent correction.
- Borrowed: the reviewer owes a technical reading, not a skim; problems go back
  to the author; the sign-off means "I checked", not "I like it".
- Rejected: the trailer protocol and the maintainer hierarchy. A04 writes a
  verdict, not a commit tag, and has no maintainer to escalate to.

### 7. microsoft/TypeScript — 111,898 stars

- URL: https://github.com/microsoft/TypeScript
- Artifact: `CONTRIBUTING.md`, the pull-request requirements.
- Quote: "Pull requests should describe the problem, the implementation, and the
  tests". Also: "The TypeScript team, as policy, does not review pull requests
  for changes that aren't pre-approved for inclusion in the project."
- Analogous to: a change must state its problem, its implementation, and its
  tests before review; work outside the approved scope is not reviewed at all.
- Borrowed: the three-part claim (problem, implementation, tests) is the shape
  the critic checks for; scope is checked before depth (R9/E06), so an
  out-of-scope idea is one finding, not a design debate.
- Rejected: pre-approval by a team and the duplicate-PR rule. A solo developer
  approves scope through BACKLOG and the gate, not a committee.

## AI-agent workflow (2)

### 8. obra/superpowers — 326,373 stars

- URL: https://github.com/obra/superpowers
- Artifact: `skills/requesting-code-review/SKILL.md` and
  `skills/requesting-code-review/code-reviewer.md`.
- Quote: "The reviewer gets precisely crafted context for evaluation — never
  your session's history." Also: "Your review is read-only on this checkout."
  And: "Do all of this review yourself. Never spawn a subagent to review part of
  the diff".
- Analogous to: a reviewer subagent isolated from the author's context, barred
  from mutation, and barred from spawning further reviewers.
- Borrowed: the blind protocol (artifact and evidence first, author's rationale
  after); the read-only permission set; the ban on delegating review, which is
  the `subagent: deny` rule; "Review early, review often" is narrowed to the
  closed set because R7 forbids review during divergence.
- Rejected: the git-SHA dispatch template and the "general-purpose" agent. A04
  reviews a part, a playtest, a build, or a gate candidate, not a diff range,
  and it is a named role, not a generic worker.

### 9. openai/evals — 19,803 stars

- URL: https://github.com/openai/evals
- Artifact: `docs/eval-templates.md`, "The model-graded eval template".
- Quote: "In general, the evaluation model and the model being evaluated don't
  have to be the same". Also: "many other evals can be implemented by specifying
  a \"rubric\" detailing the criteria of interest". And, rejected: "we have found
  that using the model to grade itself is a viable strategy for automated
  evaluation".
- Analogous to: a judge can be a separate model from the generator, and a rubric
  turns an open judgment into checkable criteria.
- Borrowed: the judge is not the author; the checks are a rubric (evidence,
  consistency, fun, scope, safety, docs) rather than a taste impression; a
  verdict is parsed from the answer, so it must be one of three words.
- Rejected: self-grading and the `cot_classify` output (reason, then label). A04
  reports one line per finding and a verdict; the reasoning stays in the review
  chat, not in the graded format.

## Considered, not counted

| Repository | Stars | Why it is not one of the nine |
|---|---|---|
| godotengine/godot | 120,803 | `CONTRIBUTING.md` points review guidance to `contributing.godotengine.org`; the in-repo PR template asks the author to flag risky areas but states no reviewer obligation. |
| OpenRCT2/OpenRCT2 | 16,608 | `CONTRIBUTING.md` covers bug reports, translation and style; review lives on the wiki, which cannot be quoted from the repository. |
| SFML/SFML | 12,121 | `CONTRIBUTING.md` redirects to the website; no in-repo review artifact. |
| veloren/veloren | 7,717 | `CONTRIBUTING.md` is an AI-taint and licensing rule, not a review procedure. |
| google/eng-practices | 23,274 | Strong "standard of review" material, but last push 2024-09-19; R1 and R5 already rejected it for currency, and A04 must not reverse that judgment. |
| git/git | 64,495 | `Reviewed-by:` trailer definition is close to Linux's; using both would count one idea twice. |
| UKGovernmentBEIS/inspect_ai | 3,335 | `model-graded.qmd` has the cleaner blind-grading default (history excluded), but the repository is small and `openai/evals` carries the same borrow with more reach. |

## Dead ends encountered

- `nodejs/node` `doc/contributing/reviewing-prs.md` returns 404 on `main`; the
  content was reorganized into `doc/contributing/pull-requests.md`.
- `google/eng-practices` `review/reviewer/index.md` is a 786-byte index, not the
  standard; `standard.md` holds the text, but the repository was left out for
  currency.
- `bevyengine/bevy/CONTRIBUTING.md` no longer carries the review page; the
  artifact lives in `bevyengine/bevy-website`, whose star count is small. The
  caveat is recorded above instead of substituting the engine repository's count.
- `OpenRCT2/OpenRCT2` review guidance is on a wiki page; `SFML/SFML` guidance is
  on `sfml-dev.org`; neither can be quoted from a repository file, so both were
  dropped rather than paraphrased.
- `godotengine/godot-contributing-docs` returned 404 through the contents API at
  the attempted path; the Godot review guideline was not read, so no quote from
  it appears here.
- Authenticated `gh api` worked for every star count; no unauthenticated
  `curl` fallback was needed.
