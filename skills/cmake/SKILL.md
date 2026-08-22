---
name: cmake
description: >
  Modern CMake practice: target-based design, presets, dependencies, install
  and packaging, and the compilation database agents need. Use when writing
  or reviewing CMakeLists.txt, CMakePresets.json, toolchain files, install
  rules, or when a build works on one machine and not another.
---

# cmake

Primary sources, in order: the
[official documentation](https://cmake.org/cmake/help/latest/),
[cmake-buildsystem](https://cmake.org/cmake/help/latest/manual/cmake-buildsystem.7.html),
[cmake-presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html),
*Professional CMake: A Practical Guide* by Craig Scott
[book](https://crascit.com/professional-cmake/), and
[Modern CMake](https://cliutils.gitlab.io/modern-cmake/).

## the one idea

Everything is a target with properties; properties propagate to consumers.
Global state is the old way and causes the "works on my machine" class of
bug.

```cmake
cmake_minimum_required(VERSION 4.4)   # latest stable; lower only on explicit request
project(tb_core VERSION 1.0 LANGUAGES CXX)

# no modules in use -> do not pay for scanning them
set(CMAKE_CXX_SCAN_FOR_MODULES OFF)

add_library(tb_core)
add_library(tb::core ALIAS tb_core)

target_sources(tb_core PRIVATE src/core.cpp)
target_compile_features(tb_core PUBLIC cxx_std_23)
set_target_properties(tb_core PROPERTIES CXX_EXTENSIONS OFF)

# build tree sees the source dir, installed tree sees the prefix: no leaks
target_include_directories(tb_core PUBLIC
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>)

target_link_libraries(tb_core PUBLIC tb::math PRIVATE fmt::fmt)
```

`PUBLIC` propagates, `PRIVATE` does not, `INTERFACE` applies only to
consumers. Most build breakage is one of these three being wrong.

## rules

1. Never touch `CMAKE_CXX_FLAGS`, `include_directories`, `link_libraries`,
   or `add_definitions`. Use the `target_*` forms.
2. No `file(GLOB)` for sources: the build does not notice a new file.
3. Do not set `CMAKE_BUILD_TYPE` in the project; that is the preset's job.
4. Alias every exported library: in-tree and installed use look identical.
5. Warnings on the target, guarded per compiler, never `PUBLIC`.
6. Generated files stay in the binary directory.
7. Your variables `snake_case`; CMake's own stay as they are.
8. One `CMakeLists.txt` per directory that owns a target.
9. No requested minimum means latest stable (4.4 today): the plain
   `cmake_minimum_required(VERSION x.y)` form already sets every policy up
   to `x.y` to NEW, so a current floor opts into current behavior for
   free. Lower only when the user names a version, and cap the presets
   schema `version` at what that floor reads: 12 needs 4.4, 10 needs
   3.31, 8 needs 3.28.

## presets, the entry point

One command for a human, an agent, and CI. Keep preset names stable; they
end up in project instructions.

```json
{
  "$schema": "https://json.schemastore.org/cmake-presets.json",
  "version": 12,
  "cmakeMinimumRequired": { "major": 4, "minor": 4, "patch": 0 },
  "configurePresets": [
    {
      "name": "dev",
      "generator": "Ninja",
      "binaryDir": "build/dev",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug",
        "CMAKE_EXPORT_COMPILE_COMMANDS": "ON",
        "tb_warnings_as_errors": "ON"
      }
    },
    {
      "name": "asan",
      "inherits": "dev",
      "binaryDir": "build/asan",
      "cacheVariables": {
        "CMAKE_CXX_FLAGS": "-fsanitize=address,undefined -fno-omit-frame-pointer"
      }
    }
  ],
  "buildPresets": [{ "name": "dev", "configurePreset": "dev" }],
  "testPresets": [
    {
      "name": "dev",
      "configurePreset": "dev",
      "output": { "outputOnFailure": true },
      "execution": { "noTestsAction": "error" }
    }
  ]
}
```

The first three lines are explicit on purpose. `$schema` is what the
editor's JSON language server reads to validate and autocomplete the
file; point it at the SchemaStore mirror, which tracks Kitware's own
schema. The `cmake.org/_downloads/` schema URLs change with every patch
release, and Kitware says not to reference them. `version` is the newest
preset schema the floor CMake reads, and `cmakeMinimumRequired` restates
the floor where `cmake --preset` enforces it. `noTestsAction: error`
turns "zero tests ran" into a failure instead of a silent pass.

```sh
cmake --preset dev && cmake --build --preset dev -j && ctest --preset dev
```

## the compilation database

`CMAKE_EXPORT_COMPILE_COMMANDS=ON` produces `compile_commands.json`: the
exact flags per file, per the
[clang spec](https://clang.llvm.org/docs/JSONCompilationDatabase.html).
Consumed by `clangd`, `clang-tidy`, and every coding agent that needs your
real dialect. Symlink it to the source root:

```sh
ln -sf build/dev/compile_commands.json .
```

Without it an agent guesses the standard and the include paths, confidently
wrong.

## dependencies, in order of preference

1. On the system: `find_package(... CONFIG REQUIRED)`.
2. The project's package manager, vcpkg or Conan, through a toolchain file.
3. `FetchContent` for small, well-behaved libraries.
4. Vendored source: pinned, never edited, excluded from your warnings.

Depend on imported targets, never on variables holding paths.

## install and export

```cmake
include(GNUInstallDirs)

target_sources(tb_core PUBLIC FILE_SET HEADERS BASE_DIRS include
  FILES include/tb/core.hpp)

install(TARGETS tb_core EXPORT tb_targets
  FILE_SET HEADERS DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
install(EXPORT tb_targets NAMESPACE tb::
  DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/tb)
```

Reusable means a consumer calls `find_package(tb)` and gets the same
`tb::core` they used in-tree. The `$<INSTALL_INTERFACE:...>` generator
expression above is what keeps your absolute build paths out of the
installed package.

## review checklist

- Global state set anywhere instead of target properties?
- `PUBLIC` where `PRIVATE` would do? That leaks flags to consumers.
- New sources listed explicitly?
- Works from a clean build directory, not only incrementally?
- Presets still produce a compilation database?
- `$schema` set in the presets file, and `version` within the floor?
- No host-only assumptions or absolute paths, so cross-compilation works?
- Module scan disabled if modules are not used?

## breaks on one machine only

```
1. Reproduce from a clean build directory. Half of these vanish.
2. Diff the failing compile command in compile_commands.json against a
   working one.
3. cmake -LAH build/dev | grep -i <suspect>
4. Check generator and toolchain differences before touching code.
5. Only then change CMake.
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
  claim ships with a measurement, never alone.
- If the sources do not settle it, say what would prove it. Never guess
  confidently.
