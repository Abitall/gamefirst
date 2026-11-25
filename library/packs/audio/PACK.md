# Audio pack

Load when sound enters the slice (S10), content adds cues (S11), S12 mixes, or
S13 collects licenses. Supplies targets and evidence; not an engine, DAW lesson,
or asset pipeline.

## Boundaries

- No publish, upload, purchase, account, or license acceptance; a human decides (R4).
- No vendor, plugin, codec, or store is required; record the tool, keep it
  replaceable; pillars and cues need approval.
- No engine API or runtime code; N00/N01 owns playback.
- No audio-only information; no mix approval without two listening outputs.
- Targets are not certification; a stricter spec wins.

## Audio pillars

Write three lines in `audio-brief.md` before the first asset; every cue serves one.

- **Signature**: the sound a player would describe after one session.
- **Silence**: what stays silent, and why; silence is a budgeted choice.
- **Feedback**: three actions audible without looking (hit, fail, reward).

A pillar inaudible in ten seconds is a mood sentence. If two conflict, the loop
wins; the other waits with its cost (R9).

## SFX and music brief

One cue table is the source of truth. A row: id, event, trigger, priority 0-10,
length, loop, variations, bus, cooldown, license, evidence.

- SFX count is fixed at G2 (for example 24 for a slice); a new cue is a row and a
  cost (R9).
- One bed per state (menu, play, win, lose); a transition is a timed cue, not a
  crossfade guessed in code. No adaptive layers until needed.
- A cue repeated more than once a minute gets two variations and recorded pitch
  and volume bounds (for example +/-5%).
- No one-shot over six seconds. A missing cue is silent, logged once; a missing
  id is a hold.

## Loudness, format, loop, compression

Measure the candidate build with one meter; record number and path.

| Item | Target | Evidence |
|---|---|---|
| Master | -16 LUFS +/-1; true peak <= -1 dBTP | build meter |
| Music under SFX | 6-10 dB below a one-shot | A/B note |
| One-shot peak | <= -3 dBTP; bus <= 0 dBTP | bus meter |
| Voice | -18 LUFS; duck music -6 dB | duck test |

- Source: 48 kHz, 24-bit WAV; mono for point sources, stereo for music and
  ambience; archive the source.
- Runtime: one lossy format for music and ambience (for example OGG q5-q7 or
  native); short SFX may stay uncompressed; engine decides.
- Loop: zero-crossing points, no gap or seam fade, seamless for 30 s by ear; the
  loop point lives in the row.
- Compression: at most 20% of build size or 25 MB, lower at 1.0; the number lives
  in `project.config.json`; over budget means a cut.
- Names: `sfx_<event>_<variant>.ogg`, `mus_<state>_<loop>.ogg`; lower case,
  underscore, no spaces; variants `01`-`09`.

## Implementation hooks

Contracts, not code; the engine pack owns calls.

- One cue table under `src/data/`, keyed by id; gameplay emits ids, never paths.
- One audio boundary owns play, stop, bus level, duck, and mute-all.
- Buses: master -> music, sfx, ui, voice, ambience; each has saved volume, mute,
  meter; sliders persist with settings, not saves.
- Preload per scene, unload on exit, never decode on the playing frame; a
  first-play hitch is a defect.
- Voice caps per bus (for example 16 SFX, 4 UI, 2 music); lowest priority stolen
  first; cooldown (for example 50 ms) and concurrency cap per cue.
- Priority 10 is never stolen, 0 goes first; win or lose cues interrupt the bed
  and cannot be interrupted.
- Lifecycle: silent until the first gesture, suspend on focus loss, resume without
  restarting, respect OS mute.
- Timing: input to audible at most 50 ms; an animation cue is scheduled, not late.

## Mixing and accessibility

- Static mix first: bus trims, music/SFX ratio, per-cue trim. Duck music -6 dB
  under voice or a critical stinger, release 200-400 ms.
- Every meaningful sound has a visual twin: caption, icon, or text; a settings
  preview plays the cue as its slider moves.
- Separate music, SFX, and UI sliders; 0-100 maps to dB, not amplitude; persist
  values; mono downmix available.
- Optional night mode uses a limiter or DRC with a stated target, never a hidden
  boost. Test headphones, laptop, phone speaker, and muted at 50% and 100%.
- No sound is the only carrier of a required action, timer, or warning; a deaf
  player can finish the slice.

## Licensing

One row per asset before it ships: id, file, source URL, author, license,
commercial use, attribution text, proof path, date, replace-by.

- Accept original work, commission, CC0, CC-BY with attribution, or a paid
  license covering every target.
- Reject no license, "free for personal use", NC or ND for a sold game, ripped
  game or film audio, stream previews, unreadable terms.
- AI audio: record tool, model, date, terms; reject if commercial use is forbidden
  or disclosure is required. Attribution ships in credits; an unshowable license
  is a hold.

## Review checklist

Each row: pass, fail, or N/A, with evidence, owner, date.

- [ ] Pillars written; every cue names its pillar.
- [ ] Every id resolves to a file; no orphan file.
- [ ] Every cue played once; missing-id counter zero.
- [ ] Loudness measured on the candidate build.
- [ ] Loop seams pass 30 s by ear.
- [ ] Format, rate, channels, and size inside budget.
- [ ] Voice caps and cooldowns hold in the worst case.
- [ ] Mix passes on two outputs at 50% and 100%.
- [ ] Every meaningful cue has a visual twin; a muted run completes.
- [ ] Every asset has a license row with proof.
- [ ] Build size and first-play hitch inside budget.

## Holds

Stop on one blocker:

- an asset has no license or unreadable terms;
- a meaningful cue has no visual twin;
- the master clips or loudness is unmeasured;
- a loop has a gap, or a cue is missing at runtime;
- no human has listened on two outputs;
- the audio budget has no number, or the build is over it uncut;
- the pinned version lacks a needed feature (E11).

## Cross-refs

S10, S11, S12, S13, G2.5, G3; R1, R4, R9, R10, E11, E12; X02, P01, P03, N00,
N01.
