---
name: tb_engine
description: >
  Working inside a heavily modified private fork of the DAVA cross-platform
  game engine that uses a tb:: namespace. Use when editing engine core,
  platform layers, rendering, resource pipeline, audio, or tools in that
  fork, and when an agent needs public reference points because the real
  sources cannot be shared.
---

# tb_engine

The engine is a private, heavily modified descendant of DAVA. Public
relatives exist and are the only material an agent may be pointed at:

- [smile4u/dava.engine](https://github.com/smile4u/dava.engine) — widely
  mirrored public snapshot, BSD-3-Clause
- [the-tuxedo-cat/dava.engine](https://github.com/the-tuxedo-cat/dava.engine) —
  documentation-oriented rewrite of the same tree
- [dava.framework mirror](https://github.com/jjiezheng/dava.framework) — the
  older framework the engine grew out of

Treat these as **shape references only**. Names, layering, and asset formats
have diverged; the fork's behaviour always beats anything a public mirror
says.

Related skills: [wwise](../wwise/SKILL.md) for audio,
[android_studio](../android_studio/SKILL.md) for the mobile targets,
[cmake](../cmake/SKILL.md) and [cpp20](../cpp20/SKILL.md) for the basics.

## hard rules

1. Nothing from the private tree goes into a hosted model: no engine
   sources, no platform SDK headers, no unreleased hardware notes, no asset
   dumps. Reproduce the question with public API shapes and generic names,
   or use a local model — [local_models](../../docs/local_models.md).
2. Everything the fork owns lives in `tb::`. Upstream-derived code kept for
   compatibility stays under its original namespace; never mix the two in
   one header.
3. Platform-specific code lives only in the platform layer. Portable code
   that includes a platform header is a defect, not a shortcut —
   [engine_rnd](../../docs/engine_rnd.md).
4. Public headers are a contract. Layout, inline definitions, and exported
   symbols change only with a deprecation path.
5. Generated code, vendored third-party code, and tool output are read-only.

## namespace and naming

```cpp
namespace tb
{
    class resource_pack;                        // engine-owned type
    namespace render   { class command_buffer; }
    namespace platform { class file_system; }   // implementations behind this
}

namespace tb::detail {}   // implementation only; never in a public header
```

- `snake_case` for types and functions, matching the fork's existing style
  and the [cpp20](../cpp20/SKILL.md) defaults.
- No `m_` prefixes, no Hungarian notation.
- A type in a public header must be forward-declarable: no platform type in
  its signature.

## skeleton an agent may safely work against

When the real subsystem cannot be shared, hand over a skeleton instead:

```cpp
namespace tb
{
    struct resource_id { std::uint64_t value {}; };

    class resource_store
    {
    public:
        // never throws across the boundary
        [[nodiscard]] std::expected<resource_handle, load_error>
        acquire(resource_id id);

        void release(resource_handle handle) noexcept;

        // called once per frame, main thread only
        void collect_unused();

    private:
        class impl;
        std::unique_ptr<impl> impl_;
    };
}
```

State the threading contract, the error contract, and the ownership. Those
three facts prevent most wrong patches.

## asset and tool pipeline

The DAVA lineage brings its own scene files, packed archives, and converters,
visible in the public mirrors; in this fork the names may differ. Before
touching a pipeline step:

```
1. Find the converter or packer target in the build files.
2. Read its command line, not its documentation.
3. Reproduce one asset end to end before changing anything.
4. Modify, then re-run the same asset and compare bytes.
```

Round-trip equality on a real asset is the acceptance criterion for any
pipeline change.

## task card template

```
TASK: {{one_sentence}}
NAMESPACE: tb::{{subsystem}}
FILES YOU MAY TOUCH: {{explicit_list}}
OFF LIMITS: public headers, platform sdk wrappers, vendored code, generated code
BUILD: {{per_platform_build_cmd}}
TEST: {{test_cmd}} plus the address-sanitizer preset
DONE WHEN: all targets build warning-free and {{observable_check}} holds
IF BLOCKED: write BLOCKED.md and stop. Do not invent a platform workaround.
```

## review gates, in order

```
0. does it cross the platform boundary layer?   -> stop, redesign
1. does it change a public header or the abi?   -> deprecation path required
2. does it mix tb:: with upstream namespaces?   -> stop
3. lifetime and ownership
4. undefined behaviour
5. threading contract as documented
6. performance, with numbers from a real capture
7. style, delegated to the linter
```

## grounding checklist before asking for engine help

- `compile_commands.json` present and current — [cmake](../cmake/SKILL.md)
- the build command for the platform in question
- the profile, trace, or crash data when the task is about behaviour
- the module dependency rules: who may include whom
- the list of directories the agent must not open
