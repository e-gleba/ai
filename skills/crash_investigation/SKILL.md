---
name: crash_investigation
description: >
  Platform-agnostic native crash analysis the way Sentry and Firebase
  Crashlytics do it: capture a dump, symbolicate before theorizing, read
  the exception code and faulting address, classify the failure into one
  of five shapes, reproduce under sanitizers, and close the loop with
  symbol upload in CI. Use when a native app or game crashes in
  production or locally, when reading a minidump, core dump, tombstone,
  or crash report, or when setting up crash reporting for a C++ target.
---

# crash_investigation

Sources: [Sentry Native](https://docs.sentry.io/platforms/native/) and its
[debug-files pipeline](https://docs.sentry.io/platforms/native/data-management/debug-files/),
[Firebase Crashlytics for NDK](https://firebase.google.com/docs/crashlytics/ndk-reports),
the [Breakpad](https://chromium.googlesource.com/breakpad/breakpad) minidump
format, and
[Crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/HEAD/README.md),
its successor handler.

## the one idea

A crash report is evidence, not a mystery. Symbolicate first — an
unsymbolicated address is a rumor. Then classify: nine out of ten native
crashes are one of five shapes, and each shape has one tool that proves it.
The faults are the same on every OS; only the code names differ.

## the pipeline

```
capture -> symbolicate -> read -> classify -> reproduce -> fix -> regression test
```

1. **Capture.** An in-process handler writes a minidump at crash time:
   Crashpad for new code, Breakpad for legacy. Every OS also captures on
   its own: Windows Error Reporting local dumps, macOS `.ips` reports in
   Console, Linux core dumps via `systemd-coredump` (`coredumpctl list`,
   then `coredumpctl gdb`), Android tombstones in logcat.
2. **Symbolicate.** The dump holds addresses; symbols turn them into
   functions. Windows: PDB. Apple: dSYM (`atos`, `dsymutil`). Linux and
   Android: the unstripped ELF or a Breakpad `.sym`. Tools:
   `minidump_stackwalk`, `llvm-symbolizer`,
   `addr2line -f -C -e app.so 0x1a2b3c`.
3. **Read.** Crashing thread first: exception code, faulting address,
   registers, then the stack top-down until the frames are yours. Stop
   there — the rest of the dump is read on demand, not up front.
4. **Classify.** See the five shapes below.
5. **Reproduce.** Debug build under ASan and UBSan — the sanitizer report
   names the exact line the dump only hinted at.
6. **Close the loop.** Fix, add a regression test built from the crash
   input, and upload symbols in CI so the next crash arrives readable.

## exception codes — the first clue

Same faults everywhere, different names per platform. Read the concept,
not the number; look the exact code up when one appears.

| fault | posix signal | windows | apple (mach) | usual cause |
| --- | --- | --- | --- | --- |
| bad memory access | `SIGSEGV` | `0xC0000005` | `EXC_BAD_ACCESS` | null or wild pointer, use-after-free |
| self-inflicted abort | `SIGABRT` | `0xC0000409` | `EXC_CRASH` | assert, `std::terminate`, pure virtual call |
| illegal instruction | `SIGILL` | `0xC000001D` | `EXC_BAD_INSTRUCTION` | smashed stack, bad function pointer, UB |
| arithmetic fault | `SIGFPE` | `0xC0000094` | `EXC_ARITHMETIC` | integer division by zero |
| misaligned or unmapped | `SIGBUS` | `0x80000002` | `EXC_BAD_ACCESS` | mmap past the end, alignment |
| stack overflow | `SIGSEGV` on the guard page | `0xC00000FD` | `EXC_BAD_ACCESS` on the guard page | unbounded recursion |
| breakpoint or trap | `SIGTRAP` | `0x80000003` | `EXC_BREAKPOINT` | a fired assert, `__builtin_trap` |

## the five shapes — classify before debugging

| shape | fingerprint in the dump | tool that proves it |
| --- | --- | --- |
| null dereference | faulting address near `0x0` | the stack itself |
| use-after-free | freed-memory patterns, ASan `heap-use-after-free` | ASan |
| stack overflow | thousands of repeating frames, guard-page fault | frame count |
| heap corruption | crash inside the allocator, far from the cause | ASan, debug heap |
| out of memory | failed allocation, giant request in the log | memory metrics |

Debug allocators paint the memory they hand out and take back, so a bad
read surfaces as a recognizable repeated-byte value in a register —
MSVC's `0xCD` fresh / `0xDD` freed / `0xCC` uninitialized stack are the
famous ones; every platform's debug heap and ASan do the same with their
own bytes. The bytes differ, the meaning never does: someone read memory
they did not own.

## context budget — dumps overflow a session

A raw dump is megabytes of binary and a stack can be ten thousand frames;
pasted whole, either one ends the session. Extract, never paste:

- **Never paste a dump file or a screenshot.** Run the tool —
  `minidump_stackwalk`, `coredumpctl gdb`, `atos` — and paste its text.
- **Triage fits in three lines:** exception code, faulting address, first
  application frame. Everything else is on request.
- **Crashing thread only.** Other threads enter context only for a
  suspected deadlock or race.
- **Cap the stack at 30 frames.** For recursion, paste one repeating
  cycle plus the repeat count — never the full unroll.
- **Logs by grep, not by file.** The fault line plus five lines around
  it; never the whole logcat or console output.
- **One dump per session.** A second dump is a second session.

## sentry and firebase in production

- **Symbols in CI, never by hand.** `sentry-cli upload-dif` after every
  release build; Crashlytics runs its symbol-upload task inside the build.
  A release without symbols is a crash you cannot read.
- **Watch crash-free users, not crash count.** One hot crash on a popular
  device outranks fifty rare ones.
- **Breadcrumbs and custom keys beat guessing.** Level id, last action,
  build version — into the crash context, before the crash.
- **Alert on "new in this version".** A regression in the current release
  is the one to fix first.

## review gates for a crash fix

```
0. was the dump symbolicated before any theory?          -> stop if not
1. does the fix name the mechanism, not only the site?   -> stop if not
2. is there a regression test built from the crash input?
3. are symbols uploaded for this build in CI?
4. did the crash-free rate move after the fix shipped?
```

## when the agent analyzes a crash

- Paste the symbolicated stack and the exception code, never a screenshot.
- State the platform, build id, and whether symbols were present.
- Ask for the classification first, the fix second.
- Respect the context budget above; a flooded context loses the evidence.

## reply contract

- Classification first, then the evidence, then the fix. No preamble, no
  restating the crash.
- Terse, balanced: drop filler; keep exception codes, addresses, and frame
  numbers exact. Clarity wins on destructive steps.
- Quote the one decisive line of tool output; never dump the log.
- A theory without a symbolicated stack is not a finding — mark it
  [unverified].
