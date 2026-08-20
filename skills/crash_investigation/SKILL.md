---
name: crash_investigation
description: >
  Native crash analysis the way Sentry and Firebase Crashlytics do it:
  capture a minidump, symbolicate before theorizing, read the exception
  code and faulting address, classify the failure into one of five shapes,
  reproduce under sanitizers, and close the loop with symbol upload in CI.
  Use when a native app or game crashes in production or locally, when
  reading a minidump, core dump, tombstone, or crash report, or when
  setting up crash reporting for a C++ target.
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

## the pipeline

```
capture -> symbolicate -> read -> classify -> reproduce -> fix -> regression test
```

1. **Capture.** An in-process handler writes a minidump at crash time:
   Crashpad for new code, Breakpad for legacy. On Linux a core dump works
   too: `ulimit -c unlimited`, collected by `systemd-coredump`
   (`coredumpctl list`, then `coredumpctl gdb`).
2. **Symbolicate.** The dump holds addresses; symbols turn them into
   functions. Windows: PDB. Apple: dSYM (`atos`, `dsymutil`). Linux and
   Android: the unstripped ELF or a Breakpad `.sym`. Tools:
   `minidump_stackwalk`, `llvm-symbolizer`,
   `addr2line -f -C -e app.so 0x1a2b3c`.
3. **Read.** Crashing thread first: exception code, faulting address,
   registers, then the stack top-down until the frames are yours.
4. **Classify.** See the five shapes below.
5. **Reproduce.** Debug build under ASan and UBSan — the sanitizer report
   names the exact line the dump only hinted at.
6. **Close the loop.** Fix, add a regression test built from the crash
   input, and upload symbols in CI so the next crash arrives readable.

## exception codes — the first clue

| code | meaning | usual cause |
| --- | --- | --- |
| `SIGSEGV` | bad memory access | null or wild pointer, use-after-free |
| `SIGABRT` | self-inflicted abort | assert, `std::terminate`, pure virtual call |
| `SIGILL` | illegal instruction | smashed stack, bad function pointer, UB |
| `SIGFPE` | arithmetic fault | integer division by zero |
| `SIGBUS` | misaligned or unmapped access | mmap past the end, alignment |
| `0xC0000005` | Windows access violation | same as `SIGSEGV` |
| `0xC00000FD` | Windows stack overflow | unbounded recursion |
| `0x80000003` | Windows breakpoint | `__debugbreak`, a fired assert |

## the five shapes — classify before debugging

| shape | fingerprint in the dump | tool that proves it |
| --- | --- | --- |
| null dereference | faulting address near `0x0` | the stack itself |
| use-after-free | freed-memory patterns, ASan `heap-use-after-free` | ASan |
| stack overflow | thousands of repeating frames, guard-page fault | frame count |
| heap corruption | crash inside `malloc`/`free`, far from the cause | ASan, page heap |
| out of memory | failed allocation, giant request in the log | memory metrics |

MSVC debug fills make the second shape visible in registers: `0xCD` fresh
heap, `0xDD` freed heap, `0xCC` uninitialized stack, `0xFD` fence. One of
these in a pointer register means someone read what they should not have.

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
- State the build id and whether symbols were present.
- Ask for the classification first, the fix second.
- One dump per session; a second dump is a second session.
