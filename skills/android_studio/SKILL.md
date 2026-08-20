---
name: android_studio
description: >
  Android game work with Android Studio: adb and logcat one-liners, CPU and
  memory profilers, Perfetto traces, native crash symbolication, Gradle and
  NDK build commands, APK analysis. Use when building, profiling, or
  debugging an Android target, especially a native game engine.
---

# android_studio

References: [Android Studio profilers](https://developer.android.com/studio/profile),
[adb](https://developer.android.com/tools/adb),
[Perfetto](https://perfetto.dev/docs/),
[NDK guides](https://developer.android.com/ndk/guides).

## see the device

```sh
adb devices
adb logcat -v threadtime | grep -iE 'tb|fatal|anr'   # your tags
adb logcat -b crash                                  # crash buffer only
adb shell dumpsys meminfo <package>
```

## build

```sh
./gradlew assembleRelease
./gradlew installDebug
./gradlew bundleRelease          # what the store gets
```

- Build variants are the contract: know which one you are on.
- `abiFilters` decide which native libraries ship; a missing ABI is a crash
  on that device class.
- Keep the unstripped `.so` files of every release build — they are the only
  way to read a native crash later.

## native crash to source line

```sh
ndk-stack -sym <unstripped_so_dir> -dump tombstone.txt
# or
llvm-addr2line -e libtb.so -f -C 0x1a2b3c
```

No symbols, no answer. Symbolicate before asking anyone anything. The full
pipeline from capture to regression test:
[crash_investigation](../crash_investigation/SKILL.md).

## profile, do not guess

1. Android Studio, Profiler, attach to the process: CPU, memory, energy.
2. For frame pacing and jank, record a system trace:

```sh
python3 record_android_trace -o trace.pftrace gfx view sched freq
```

Open the trace at [ui.perfetto.dev](https://ui.perfetto.dev). The timeline
shows the exact frame, thread, and slice that missed the budget.

3. A performance claim without a trace attached is a guess —
   [failure_modes](../../docs/failure_modes.md).

## apk analysis

Build, then Analyze APK in Android Studio: download size per ABI, dex count,
bundled assets. Run it on every release candidate; size regressions hide in
assets, not in code.

## agent grounding for android tasks

- the device or emulator image, and its API level
- the build variant and the ABI list
- the symbolicated crash or the Perfetto trace, as data
- the Gradle command that reproduces the build
