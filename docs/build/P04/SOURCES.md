# P04 sources

Nine sources read on 2026-11-26: four gamedev projects, three software projects,
and two AI-agent projects. Stars are GitHub counts on that date. No code was
copied; the quotes are short excerpts used to justify checklist rows.

| # | Kind | Repository | URL | Stars | License | Analogous artifact |
|---|---|---|---|---|---|---|
| S1 | gamedev | godotengine/godot-demo-projects | https://github.com/godotengine/godot-demo-projects | 9,838 | MIT | `audio/bpm_sync`, audio demo recipes |
| S2 | gamedev | bevyengine/bevy | https://github.com/bevyengine/bevy | 50,006 | MIT OR Apache-2.0 | `examples/audio/audio.rs`, asset and player split |
| S3 | gamedev | raysan5/raylib | https://github.com/raysan5/raylib | 35,792 | Zlib | `src/raudio.c`, one audio module with mixing channels |
| S4 | gamedev | MonoGame/MonoGame | https://github.com/MonoGame/MonoGame | 14,670 | MS-PL | `SoundEffectInstance.cs`, `MediaPlayer.cs` |
| S5 | software | ffmpeg/ffmpeg | https://github.com/ffmpeg/ffmpeg | 68,186 | LGPL-2.1-or-later | `doc/filters.texi`, loudnorm and ebur128 |
| S6 | software | mackron/miniaudio | https://github.com/mackron/miniaudio | 7,701 | Unlicense OR MIT-0 | `miniaudio.h`, sound groups with own volume |
| S7 | software | WebAudio/web-audio-api | https://github.com/WebAudio/web-audio-api | 1,137 | W3C Software and Document License | `index.bs`, suspended/running context lifecycle |
| S8 | AI-agent | pipecat-ai/pipecat | https://github.com/pipecat-ai/pipecat | 17,438 | BSD-2-Clause | `src/pipecat/frames/frames.py`, `InterruptionFrame` |
| S9 | AI-agent | livekit/agents | https://github.com/livekit/agents | 15,344 | Apache-2.0 | `voice/speech_handle.py`, `SpeechHandle` priority |

## S1 godot-demo-projects - audio demos as recipes

Quoted from `audio/bpm_sync/README.md`:

> "A demo of how to sync the audio playback with the time for a consistent BPM."

**Borrow.** Playback can follow a clock or BPM instead of free-running; a demo is
a recipe for one problem, not a product structure.

**Reject.** The demo project layout and GDScript code. The pack has no runtime.

**Dead end.** Per-demo implementation detail; it does not describe a repeatable
audio process.

## S2 bevy - asset path and player entity

Quoted from `examples/audio/audio.rs`:

> "This example illustrates how to load and play an audio file."

**Borrow.** Separate the asset (path and settings) from the player instance. A
cue id can resolve to an asset while playback stays a separate concern.

**Reject.** The ECS model and the example's runtime code. Engine choice is out of
scope.

**Dead end.** The spatial audio example depends on engine transforms and does not
transfer to a pack.

## S3 raylib - one audio module

Quoted from the `src/raudio.c` header:

> "raudio v1.1 - A simple and easy-to-use audio library based on miniaudio"

The same header lists "Manage mixing channels" among its features.

**Borrow.** One boundary for load, unload, play, stop, pause, and mixing channels;
sound versus music is a useful distinction in the cue table.

**Reject.** The C API and module internals. The pack states contracts, not calls.

**Dead end.** Format macros such as `SUPPORT_FILEFORMAT_*`; they are engine build
flags, not project policy.

## S4 MonoGame - instance pooling and a music player

`MonoGame.Framework/Audio/SoundEffectInstance.cs` contains
`internal bool _isPooled = true;` and documents the type as:

> "Represents a single instance of a playing, paused, or stopped sound."

`MonoGame.Framework/Media/MediaPlayer.cs` documents:

> "Provides methods and properties to play, pause, resume, and stop songs."

**Borrow.** Pool short one-shot instances; keep music on a separate player with
its own transport. Cap concurrency and steal the lowest priority first.

**Reject.** Platform backends and the XACT integration. They are engine-specific.

**Dead end.** XACT and `SoundBank` add authoring complexity the pack does not need.

## S5 ffmpeg - loudness measurement, not peak normalization

Quoted from `doc/filters.texi` (loudnorm, ebur128):

> "EBU R128 loudness normalization. Includes both dynamic and linear normalization modes."

> "This algorithm can target IL, LRA, and maximum true peak."

**Borrow.** Measure integrated loudness, loudness range, and true peak on the
candidate build. Peak normalization alone does not make a mix.

**Reject.** Committing a filter chain or an encoder pipeline. The project chooses
its meter and encoder.

**Dead end.** The codec matrix and video paths; unrelated to the checklist.

## S6 miniaudio - buses with independent volume

Quoted from `miniaudio.h`:

> "A sound group is used as a mechanism to organise sounds into groups which have
> their own effect processing and volume control. An example is a game which might
> have separate groups for sfx, voice and music. Each of these groups have their
> own independent volume control."

**Borrow.** A bus graph (music, SFX, UI, voice, ambience) with independent volume
and mute; sliders map to buses, not to individual files.

**Reject.** The C engine and node graph. No runtime is shipped.

**Dead end.** Capture and voice-activity code; not a game mixing concern here.

## S7 Web Audio API - explicit context lifecycle

Quoted from `index.bs`:

> "This context is currently suspended (context time is not proceeding, audio
> hardware may be powered down/released)."

**Borrow.** Treat playback as an explicit lifecycle: suspended until a user
gesture, running, and suspended again on focus loss; resume without restarting.

**Reject.** The node graph and automation API. They are platform detail, not a
project target.

**Dead end.** Automation curves and offline rendering; interesting, but the pack
does not prescribe implementation.

## S8 pipecat - interruption cancels in-progress output

`src/pipecat/frames/frames.py` defines `InterruptionFrame`; the class documents:

> "Frame pushed to interrupt the pipeline."

Its docstring adds that it is used "when a user starts speaking to cancel any
in-progress bot output."

**Borrow.** An interruption is a first-class event that cancels in-progress
output; priority and cancel semantics belong in the contract.

**Reject.** The microphone, VAD, and transport pipeline; voice chat is not the
subject.

**Dead end.** Transport adapters; they solve connectivity, not mixing.

## S9 livekit/agents - explicit speech priority

`livekit-agents/livekit/agents/voice/speech_handle.py` defines `SpeechHandle`
with priorities documented as:

> "Priority for messages that should be played after all other messages in the queue"

> "Priority for important messages that should be played before others."

**Borrow.** Name priorities explicitly (low, normal, high) and record which event
may interrupt which cue. This maps to the 0-10 priority column.

**Reject.** The realtime room and WebRTC stack. No network layer is in scope.

**Dead end.** `background_audio.py` ships built-in ambience clips; those are vendor
assets, not a process to copy.

## Dead ends

| Candidate | Why not used |
|---|---|
| libgdx/libgdx (25,560, Apache-2.0) | Audio API is engine-bound; no additional process insight. |
| cocos2d/cocos2d-x (19,256, MIT) | Same: implementation detail, no checklist material. |
| ardour/ardour (5,458, GPL-2.0) | DAW workflow; the pack must not prescribe a DAW. |
| libsndfile/libsndfile (1,735, LGPL-2.1) | File I/O library; format table would restate engine support. |
| godotengine/godot | Engine source is too broad; demos already cover the audio recipe. |
| openai/openai-agents-python | Already used by C03; no audio-specific analog. |

## What was deliberately not used

- No code, no vendored headers, no audio files, no screenshots.
- No star count as a quality argument; stars only identify active projects.
- No license text copied; licenses are named, not reproduced.
- No loudness or format number treated as platform certification.
