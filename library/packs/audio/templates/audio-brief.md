# Audio brief - [game]

Owner: [name] | Date: [YYYY-MM-DD] | Build: [commit or build id]

## Pillars

- Signature: [the sound a player repeats after one session]
- Silence: [what stays silent, and why]
- Feedback: [action 1] / [action 2] / [action 3] - each audible without looking.

Fit test: [ten-second capture path]. If two pillars conflict, the loop wins;
[parked pillar] waits and costs [cost] (R9).

## Cue table

| id | event | trigger | priority 0-10 | length | loop | variations | bus | cooldown | license | evidence |
|---|---|---|---|---|---|---|---|---|---|---|
| [sfx_hit_01] | [player hit] | [on damage] | [8] | [0.2 s] | [no] | [2] | [sfx] | [50 ms] | [L-001] | [path] |
| [mus_play_loop] | [play state] | [scene start] | [10] | [45 s] | [yes] | [1] | [music] | [-] | [L-002] | [path] |

SFX count at G2: [24]. A new cue is a row and a cost (R9).

## Targets

- Master: [-16 LUFS +/-1], true peak [<= -1 dBTP]; measured on [build] with
  [meter], evidence at [path].
- Music under SFX: [6-10 dB]; voice: [-18 LUFS], duck [-6 dB].
- Source: [48 kHz / 24-bit WAV]; runtime: [format], [size MB] of [budget MB].
- Loops: [30 s] seam check by [name] on [date]; loop point stored in [row].
- Names: [sfx_event_variant.ogg], [mus_state_loop.ogg].

## Licenses

| id | file | source URL | author | license | commercial | attribution | proof | date | replace-by |
|---|---|---|---|---|---|---|---|---|---|
| [L-001] | [file] | [url] | [name] | [CC0] | [yes] | [none] | [path] | [date] | [n/a] |

## Review

- [ ] Pillars and fit capture approved by [name].
- [ ] Every cue played in [build]; missing ids: [0].
- [ ] Mix heard on [output 1] and [output 2] by [name].
- [ ] Visual twin for every meaningful cue; muted run by [name].
- [ ] Holds: [none] or [blocker, owner, date].

## Holds

[No license / no visual twin / master clips / loop gap / no two-output listen /
no budget / missing engine feature. Name one and stop.]
