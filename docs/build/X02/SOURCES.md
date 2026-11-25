# Sources — X02 Security

Nine design sources: 4 gamedev, 3 software-development, 2 AI-agent. Stars were read on **2026-11-25** from the rendered repository page (`stargazerCount`) because the GitHub REST API returned 403 (rate limit); no figure is estimated. Stars move; the date is the snapshot. Each entry names the analog in `SECURITY.md`, what was borrowed, what was rejected, and one verbatim quote per borrowed unit. Quotes keep their original markup; nothing was copied into the artifact.

## Gamedev (4)

### S1. ValveSoftware/GameNetworkingSockets

- URL: https://github.com/ValveSoftware/GameNetworkingSockets
- Stars: 10,099 · License: BSD-3-Clause · Type: networking library (C++, game transport)
- Analog: "Secrets travel encrypted to an authenticated peer, never in a URL."
- Borrowed: transport encryption and peer authentication as a default, not an option.
- Rejected: the full netcode stack, connection state machine, and platform integration; the template does not ship a transport.
- Quote:
  > Encryption. AES-GCM-256 per packet, [Curve25519](https://github.com/valvesoftware/gamenetworkingsockets/blob/master/src/common/crypto_curve25519.h) for key exchange and cert signatures.

### S2. godotengine/godot-docs

- URL: https://github.com/godotengine/godot-docs · Artifact: https://docs.godotengine.org/en/stable/tutorials/io/data_paths.html
- Stars: 5,936 · License: CC-BY-3.0 (`LICENSE.txt`: "Creative Commons Attribution 3.0 Unported") · Type: engine documentation
- Analog: "A save sits in a writable user directory, so it is untrusted input", plus the save-validation bullet.
- Borrowed: the user-data directory is guaranteed writable, therefore player-editable, therefore untrusted.
- Rejected: the Godot path API and project settings; they are engine-specific and belong to the engine pack.
- Quote (reStructuredText source, verbatim):
  > Unlike ``res://``, the directory pointed at by ``user://`` is created automatically and guaranteed to be writable to, even in an exported project.

### S3. space-wizards/space-station-14

- URL: https://github.com/space-wizards/space-station-14 · Artifact: https://docs.spacestation14.com/en/ss14-by-example/basic-networking-and-you.html
- Stars: 3,912 (main repo; the artifact's source repo `space-wizards/docs` has 42) · License: MIT · Type: multiplayer game + official docs
- Analog: "Currency, unlocks, and scores that matter are validated outside the save."
- Borrowed: client input is untrusted, so the server decides state; a client claim is evidence of intent, not of truth.
- Rejected: engine/tooling details, the game's specific networking model, and the docs repo as a standalone source (too small).
- Quote:
  > When handling network event sent from the client on the server, you should obviously exercise caution and treat it as untrustworthy, since hackers can always send whatever data they please.

### S4. OpenRA/OpenRA

- URL: https://github.com/OpenRA/OpenRA
- Stars: 17,834 · License: GPL-3.0 · Type: game engine and RTS game
- Analog: the code row in the license table ("GPL, AGPL: ideas only") and the share-alike warning.
- Borrowed: the copyleft boundary — read GPL code for ideas, never paste it into a permissively licensed template.
- Rejected: the code itself; copying any part would relicense the framework.
- Quote:
  > This file is part of OpenRA, which is free software. It is made available to you under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

## Software development (3)

### S5. gitleaks/gitleaks

- URL: https://github.com/gitleaks/gitleaks
- Stars: 31,341 · License: MIT · Type: secret scanner
- Analog: the secret-read deny row and "scan the diff before a commit".
- Borrowed: detect secrets by pattern and path across files, diffs, and history; a path check runs before any value is read.
- Rejected: its rule set and configuration; a pinned copy would go stale and invite false confidence.
- Quote:
  > Gitleaks is a tool for detecting secrets like passwords, API keys, and tokens in git repos, files, and whatever else you wanna throw at it via `stdin`.

### S6. github/docs

- URL: https://github.com/github/docs · Artifact: `content/actions/security-guides/security-hardening-for-github-actions.md`
- Stars: 21,565 · License: CC-BY-4.0 (`LICENSE`: "Attribution 4.0 International"; page metadata said MIT, the LICENSE file wins) · Type: platform documentation
- Analog: "Pin CI actions to a full commit SHA, not a tag."
- Borrowed: immutable pinning by digest/SHA, so a moving tag cannot change what runs.
- Rejected: GitHub-hosted-runner and OIDC specifics; the template must not assume GitHub.
- Quote:
  > Pin actions to a full-length commit SHA

### S7. OWASP/CheatSheetSeries

- URL: https://github.com/OWASP/CheatSheetSeries · Artifact: https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html
- Stars: 34,203 · License: CC-BY-SA-4.0 · Type: security guidance
- Analog: the secret definition, prohibited channels, leak response, and rotation step.
- Borrowed: secrets are never hardcoded or stored in plaintext; scan for them, rotate on exposure, and remove the value rather than the evidence.
- Rejected: vault/HSM product guidance and the share-alike prose; enterprise infrastructure and a license that would spread.
- Quote:
  > Many organizations have them hardcoded within the source code in plaintext, littered throughout configuration files and configuration management tools.

## AI-agent (2)

### S8. OWASP/www-project-top-10-for-large-language-model-applications

- URL: https://github.com/OWASP/www-project-top-10-for-large-language-model-applications · Artifact: https://genai.owasp.org/llmrisk/llm01-prompt-injection/
- Stars: 1,512 · License: CC-BY-SA-4.0 · Type: risk taxonomy
- Analog: "is prompt injection" and the decision to constrain tools instead of claiming detection.
- Borrowed: prompt injection has no fool-proof prevention; mitigate impact by limiting what the model can do.
- Rejected: the rest of the LLM Top 10 taxonomy and its share-alike prose; out of scope and not copyable.
- Quote:
  > it is unclear if there are fool-proof methods of prevention for prompt injection. However, the following measures can mitigate the impact of prompt injections

### S9. modelcontextprotocol/modelcontextprotocol

- URL: https://github.com/modelcontextprotocol/modelcontextprotocol · Artifact: https://modelcontextprotocol.io/specification/2025-11-25/basic/security_best_practices
- Stars: 9,766 · License: MIT · Type: protocol specification
- Analog: "Validate and sanitize an MCP server's output" and "Installing is running".
- Borrowed: tool output is untrusted input; a local server is code execution with the client's privileges.
- Rejected: OAuth, session, and authorization-server details; the template's tools are local and do not need the hosted flow.
- Quotes (two borrowed units):
  > Validate and sanitize all input from MCP servers before processing

  > Local MCP servers with inadequate restrictions or from untrusted sources introduce several critical security risks
  >
  > - Arbitrary code execution. Attackers can execute any command with MCP client privileges.

## Dead ends

- **GitHub REST API** — returned 403 (rate limit) for every stars request. Stars came from the rendered repository HTML instead; the API was not retried with a token.
- **space-wizards/docs** — the official SS14 docs repo has 42 stars, too small to stand as a gamedev source on its own. The artifact is cited, the main game repo supplies the star count, and the discrepancy is stated above.
- **godot-docs: `binary_serialization_api.rst` and `runtime_file_loading_and_saving.rst`** — neither warns that saved data can be malicious or edited; dropped for `data_paths.rst`, which states writability directly.
- **godot-docs: FileAccess encryption tutorial** — the old path no longer resolves; no replacement was needed because the policy rejects "encryption equals authority" anyway.
- **trufflehog** — considered as the secret scanner; gitleaks won on primary artifact quality, MIT license, and the clearer diff/history model. trufflehog is not counted.
- **MCP specification HTML** — the page is rendered by Mintlify; only the `.md` endpoint returned a stable body, which is the quoted artifact.
- **Blog posts** — avoided; every claim above comes from the project's own repository, docs, or specification.
