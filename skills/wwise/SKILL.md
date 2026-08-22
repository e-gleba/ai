---
name: wwise
description: >
  Audiokinetic Wwise integration in a game engine: events not raw sounds,
  soundbank lifecycle, RTPCs, states and switches, memory and voice budgets,
  and profiler-driven debugging. Use when touching audio code, integrating
  Wwise callbacks, diagnosing missing or late sounds, or reviewing audio
  memory use.
---

# wwise

Sources: the [Wwise SDK documentation](https://www.audiokinetic.com/en/library/edge/?source=SDK&id=index.html),
the integration course [Wwise-101](https://www.audiokinetic.com/en/courses/wwise101/),
and [Wwise-251](https://www.audiokinetic.com/en/courses/wwise251/) for
performance. The profiler answers most questions this skill gets.

## the one idea

The game posts events; the sound designer owns what an event does. Code that
names a sound file bypasses the authoring tool and breaks the contract.

```cpp
// right: an event id from the generated header, and the result checked
const AkPlayingID playing_id =
    AK::SoundEngine::PostEvent(AK::EVENTS::PLAY_TANK_SHOT, game_object_id);
if (playing_id == AK_INVALID_PLAYING_ID)
    log_audio_error("tank_shot", game_object_id);   // fail loud, not silent

// wrong: reaching past the event layer
// AK::SoundEngine::PostEvent(L"play_shot_final_v2.wav", game_object_id);
```

## lifecycle

```cpp
const AKRESULT bank_result = AK::SoundEngine::LoadBank(AK::BANKS::MAIN);
if (bank_result != AK_Success)
    return;   // the level has no audio; that is a bug, not a mood
// ... level runs ...
AK::SoundEngine::UnloadBank(AK::BANKS::MAIN, nullptr);
```

- Register every game object before posting on it:
  `AK::SoundEngine::RegisterGameObj(id)` — an unregistered id is the most
  common silent failure.
- Unload what the scene left behind; a bank that never unloads is a leak.
- `RenderAudio` runs every frame; a stalled audio thread is late sound.
- Every `AKRESULT` and every `AkPlayingID` is checked. The profiler shows
  the failure in the studio; the check is what catches it in production.

## dynamics without code changes

| need | wwise mechanism |
| --- | --- |
| volume follows speed | RTPC: `SetRTPCValue(AK::GAME_PARAMETERS::SPEED, v, id)` |
| day versus night mix | states |
| surface-dependent footsteps | switches |
| indoor echo | environments and aux buses |

If a value changes per frame, it is an RTPC, not a new event.

## budgets

- Voice count and virtual-voice thresholds live in the authoring project;
  the game respects them, it does not override them.
- Watch `AK::MemoryMgr` statistics in the profiler.
- Streaming for music and long ambience; in-memory for short,
  latency-critical one-shots.

## debug with the profiler

1. Build with the communication module enabled — profile or debug config,
   never release.
2. Wwise authoring, Connect to Platform, capture.
3. The capture log shows every event, voice, RTPC, and error with
   timestamps. Paste the relevant excerpt into any prompt about audio
   behaviour — it replaces guessing.

## review gates for audio diffs

```
0. does it post a file path instead of an event id?    -> stop
1. are game objects registered and unregistered in pairs? -> stop if not
2. is every bank load matched by an unload on each exit path?
3. per-frame RTPC spam where a state would do?
4. new memory use measured in the profiler?
5. is every AKRESULT checked, every playing id validated?
```

## reply contract

- Code first, then two lines on what it does and why. No preamble, no
  praise, no restating the task.
- Terse, balanced: drop filler and hedging; keep negations, numbers, and
  the words that carry meaning. Clarity wins on security, irreversible
  steps, and ordered procedures.
- Minimum code that solves the problem: no abstraction used once, no
  unrequested options, no error handling for impossible states.
- Every claim carries its source or is marked [unverified]. A performance
  claim ships with a profiler capture, never alone.
- If the sources do not settle it, say what would prove it. Never guess
  confidently.
