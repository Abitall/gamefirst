# C01 sources

Nine repositories read on 2026-11-25 (star counts from the GitHub API that day,
licenses from the repository page or API). Method: find artifacts whose shape is
the crew's shape - one bounded question, a disposable build, evidence before a
verdict, a group that ends - then check whether the property transfers. Popular
and current only; no code is copied, and the artifact is written from the
scenario, not from the repos.

| # | Kind | Repository | URL | Stars | License | Analogous artifact |
|---|---|---|---|---|---|---|
| 1 | gamedev | godotengine/godot-proposals | https://github.com/godotengine/godot-proposals | 1464 | MIT | one-proposal issue with a required motivation |
| 2 | gamedev | godotengine/godot-demo-projects | https://github.com/godotengine/godot-demo-projects | 9838 | MIT | minimal demo scene with a one-loop README |
| 3 | gamedev | ncase/trust | https://github.com/ncase/trust | 6351 | CC0-1.0 | playable artifact built to answer one question |
| 4 | gamedev | Unity-Technologies/ml-agents | https://github.com/Unity-Technologies/ml-agents | 19892 | NOASSERTION (Unity license) | training config that declares a step budget |
| 5 | software | adr/madr | https://github.com/adr/madr | 2666 | MIT OR CC0-1.0 | decision record with considered options |
| 6 | software | google/eng-practices | https://github.com/google/eng-practices | 23274 | CC-By 3.0 (API: NOASSERTION) | one self-contained change, rejected when too large |
| 7 | software | nodejs/node | https://github.com/nodejs/node | 123997 | NOASSERTION (MIT plus third-party) | governance roles that expire into emeritus |
| 8 | ai-agent | crewAIInc/crewAI | https://github.com/crewAIInc/crewAI | 61300 | MIT | crews of role-playing agents with tasks |
| 9 | ai-agent | openai/swarm | https://github.com/openai/swarm | 22168 | MIT | stateless run with agent handoffs |

## 1. godotengine/godot-proposals (gamedev, 1464, MIT)

The intake channel for Godot engine changes. What transfers is the rule that an
inquiry stands alone and must carry its own motivation: the proposal form is the
closest public analog to "one question, one criterion".

> **Use one issue per proposal.** Do not cram multiple feature requests into a
> single proposal, as this makes it harder to discuss features individually.

> If you do not provide a well-founded motivation, your proposal will be closed.

- **Borrow:** one unit per question, and the rule that a question without a
  stated reason is closed, not discussed.
- **Reject:** the issue tracker as a home for the work; a crew writes a report
  into `prototypes/`, not into a backlog with labels.
- **Dead end:** the proposal template itself is engine-specific (rendering,
  platforms) and does not fit a fun question.

## 2. godotengine/godot-demo-projects (gamedev, 9838, MIT)

Dozens of small projects, each demonstrating one feature with a README that
states the one loop. The property borrowed is that the demo is the smallest
thing that shows the claim, and the README is the claim.

> a simple game where your character must move and avoid the enemies for as long
> as possible

- **Borrow:** smallest scene that answers the question, with the answer written
  beside it.
- **Reject:** the demos stay in the repository; our build is discarded and only
  the report and capture survive.
- **Dead end:** already cited in S08. Reused here for a different property
  (disposable demo, not the skill's step order); disclosed to keep the count
  honest.

## 3. ncase/trust (gamedev, 6351, CC0-1.0)

A playable explanation of game theory, built to answer one question for a human
who plays it. It is the model for a build whose only job is to settle an
argument, and its dedication makes disposal legitimate.

> The Evolution of Trust is dedicated to the public domain.

- **Borrow:** one question, one short playable artifact, the human as the
  instrument.
- **Reject:** narrative framing and polish; a prototype that tells a story is
  already production.
- **Dead end:** also cited in S08, same reason as above: the property borrowed is
  the human-in-the-loop verdict, not the build steps.

## 4. Unity-Technologies/ml-agents (gamedev, 19892, NOASSERTION)

Unity's toolkit for training agents in game environments. Its training config
declares a step budget up front and the run ends when the budget is spent; that
is the strongest public example of a bounded run with a logged result.

> Total number of steps (i.e., observation collected and action taken) that must
> be taken in the environment (or across all environments if using multiple in
> parallel) before ending the training process.

- **Borrow:** the budget is a config value, the run is bounded, and the result
  is read from logs rather than felt.
- **Reject:** automated tuning and checkpoint resumes; a crew that resumes has
  no timebox. The license is not reusable code for us.
- **Dead end:** kind is gamedev (Unity's game-dev toolkit), though the artifact
  reads like ML tooling; it was kept for the budget property only.

## 5. adr/madr (software, 2666, MIT OR CC0-1.0)

The Markdown Architectural Decision Records template. Its minimal form separates
the problem, the options, and the outcome, which is exactly the shape of a
prototype report after the build.

> ## Context and Problem Statement
>
> ## Considered Options
>
> ## Decision Outcome

- **Borrow:** options listed before the outcome, and one chosen line with its
  reason; the date comes from the blueprint's gate rule.
- **Reject:** the full ADR apparatus (status, consequences, links) for a two-day
  question.
- **Dead end:** the repository's own examples are architecture decisions, not
  play decisions; no example of a rejected option with evidence.

## 6. google/eng-practices (software, 23274, CC-By 3.0)

Google's code review guidance, archived on 2025-11-21 and still the reference
text. "Small CLs" is the closest description of a timeboxed deliverable: one
self-contained change, cheap to reject.

> In general, the right size for a CL is **one self-contained change**.

> **reviewers have discretion to reject your change outright for the sole reason
> of it being too large.**

- **Borrow:** size is a rejection reason, and small work is cheap to throw away.
- **Reject:** the review etiquette and the CL splitting strategies; a crew has
  one question and no review queue.
- **Dead end:** archived, so no fresh commits; cited for the stable rule, not for
  current practice. (Typo check: "delivverable" above is a typo and would be a
  finding.)

## 7. nodejs/node (software, 123997, NOASSERTION)

The Node.js governance document. It defines roles that are not permanent: a
collaborator who stops contributing becomes emeritus, which is the public
precedent for a role that ends by rule rather than by decision.

> The TSC can remove inactive collaborators or provide them with _emeritus_
> status.

> A collaborator is automatically made emeritus (and removed from active
> collaborator status) if it has been more than 12 months since the collaborator
> has authored or approved a commit that has landed.

- **Borrow:** membership expires; ending is written into the rules, not
  negotiated at the end.
- **Reject:** the 12-month clock; a crew ends in days, and its verdict is the
  clock. Also rejected: the consensus machinery around roles.
- **Dead end:** working groups are mentioned only as an activity, with no
  lifecycle text; the lifecycle had to come from the role rules instead.

## 8. crewAIInc/crewAI (ai-agent, 61300, MIT)

A framework for role-playing agent teams with tasks. It is the artifact most
often cited as the model for a "crew", which is why it had to be read before the
word was used.

> Crews: Teams of AI agents with true autonomy and agency, working together to
> accomplish complex tasks through role-based collaboration.

- **Borrow:** explicit roles and a task boundary per role; the word "crew" itself.
- **Reject:** true autonomy and persistent collaboration; C01 has a human in the
  loop, a timebox, and a disband date, and no agent chooses its own next task.
- **Dead end:** the README's examples are content pipelines; none ends with a
  kill verdict or a discarded build.

## 9. openai/swarm (ai-agent, 22168, MIT)

An educational multi-agent framework built on handoffs, now superseded by the
Agents SDK. Its useful property for C01 is the opposite of a standing team: a run
keeps nothing between calls.

> Swarm is entirely powered by the Chat Completions API and is hence stateless
> between calls.

> Swarm runs (almost) entirely on the client and, much like the Chat Completions
> API, does not store state between calls.

- **Borrow:** a run leaves no standing state; what survives is the written
  result.
- **Reject:** automatic handoffs between agents; in a three-person crew the
  partner routes, and a machine choosing the next speaker hides the cost.
- **Dead end:** the repository is explicitly superseded, so it was used for the
  statelessness statement only, not as current practice.

## Dead ends hit during research

| Attempt | Outcome |
|---|---|
| GlobalGameJam/game-jam-toolkit, ldjam/ldjam | 404: no such repository |
| basecamp/shape-up, mobtime/mobtime, thoughtbot/playbook, mixandjam/BossRoom | 404: no such repository |
| kubernetes/community working-group docs | 404 on master and main; contents API 403; replaced by nodejs/node governance |
| GitHub search: "game jam team", "playtest tools", "game design team roles" | school projects and link lists, no analogous artifact |
| GitHub org repository listing | 403 rate limit; repo endpoints used instead |

## What was deliberately not used

- crewAI's persistent memory and autonomous task choice.
- swarm's automatic handoffs and its SDK successor.
- ml-agents' automated tuning, checkpoints, and Unity license.
- MADR's full template and status fields.
- eng-practices' review etiquette and change-splitting advice.
- godot-proposals' issue template and labels.
- Demo-project art and assets; only the scene-and-README property was taken.
