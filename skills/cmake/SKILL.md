---
name: cmake
description: >
  Modern CMake practice for C++ projects: target-based design, presets,
  dependencies, install and packaging, and the compilation database agents need.
  Use when writing or reviewing CMakeLists.txt, CMakePresets.json, toolchain
  files, install rules, or when a build works on one machine and not another.
---

# cmake

Reference for the rules below: the official
[cmake documentation](https://cmake.org/cmake/help/latest/),
[cmake-buildsystem](https://cmake.org/cmake/help/latest/manual/cmake-buildsystem.7.html),
[cmake-presets](https://cmake.org/cmake/help/latest/manual/cmake-presets.7.html),
and *Professional CMake: A Practical Guide* by Craig Scott
[book](https://crascit.com/professional-cmake/), which is the closest thing to a
style guide the ecosystem has.

## the one idea

Everything is a target with properties, and properties propagate. Variables that
change global state are the old way and cause the "works on my machine" class of
bug.

```cmake
add_library(tb_core)
target_sources(tb_core PRIVATE src/core.cpp)
target_include_directories(tb_core PUBLIC include)   # consumers get this
target_compile_features(tb_core PUBLIC cxx_std_23)
target_link_libraries(tb_core PUBLIC tb::math PRIVATE fmt::fmt)
```

`PUBLIC` propagates to consumers, `PRIVATE` does not, `INTERFACE` applies only to
consumers. Choosing these three correctly removes most build breakage.

## rules

1. Never touch `CMAKE_CXX_FLAGS`, `include_directories`, `link_libraries`, or
   `add_definitions`. Use the `target_*` forms.
2. Never use `file(GLOB)` for sources: the build does not notice a new file.
   List sources explicitly.
3. Set the minimum version to something recent and honest, and use `project()`
   with `VERSION` and `LANGUAGES`.
4. Do not set the build type in the project; that is the caller's choice through
   a preset or the command line.
5. Alias every exported library so in-tree and installed use look the same:
   `add_library(tb::core ALIAS tb_core)`.
6. Warnings belong on the target, guarded per compiler, and never `PUBLIC`.
7. Generated files go in the binary directory, never in the source tree.
8. One `CMakeLists.txt` per directory that owns a target; no path gymnastics
   across directories.

## presets, the entry point

`CMakePresets.json` is what makes the build one command for a human, an agent, and
CI. Keep the names stable, because they end up in project instructions.

```json
{
  "version": 6,
  "configurePresets": [
    {
      "name": "dev",
      "generator": "Ninja",
      "binaryDir": "build/dev",
      "cacheVariables": {
        "CMAKE_BUILD_TYPE": "Debug",
        "CMAKE_EXPORT_COMPILE_COMMANDS": "ON",
        "TB_WARNINGS_AS_ERRORS": "ON"
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
    { "name": "dev", "configurePreset": "dev", "output": { "outputOnFailure": true } }
  ]
}
```

```sh
cmake --preset dev && cmake --build --preset dev -j && ctest --preset dev
```

## the compilation database

`CMAKE_EXPORT_COMPILE_COMMANDS=ON` produces `compile_commands.json`, the exact
flags per file, in the format defined by
[clang's compilation database spec](https://clang.llvm.org/docs/JSONCompilationDatabase.html).
It is consumed by `clangd`, `clang-tidy`, `include-what-you-use`, and by coding
agents that want to know your real dialect. Symlink it to the source root:

```sh
ln -sf build/dev/compile_commands.json .
```

Without it, an agent guesses the language standard and the include paths, and its
guesses are confidently wrong.

## dependencies, in order of preference

1. Already on the system, found with `find_package(... CONFIG REQUIRED)`.
2. A package manager the project already uses (vcpkg or Conan through a toolchain
   file, never hard-coded paths).
3. `FetchContent` for small, well-behaved libraries.
4. Vendored source, pinned, never edited, excluded from your warning settings.

Wrap every dependency in an imported target and depend on the target, never on
variables holding paths.

## install and export

```cmake
include(GNUInstallDirs)
install(TARGETS tb_core EXPORT tb_targets
        FILE_SET HEADERS DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
install(EXPORT tb_targets NAMESPACE tb:: DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/tb)
```

A project is only reusable when a consumer can do `find_package(tb)` and get the
same target name they used in-tree.

## review checklist for a cmake change

- Does any command set global state instead of target properties?
- Is any `PUBLIC` used where `PRIVATE` would do? That leaks flags to consumers.
- Are new sources listed explicitly?
- Does the change work from a clean build directory, not only incrementally?
- Do the presets still produce a compilation database?
- Does cross-compilation still work: no host-only assumptions, no absolute paths?
- Is generated output confined to the binary directory?

## when a build breaks only on one machine

```
1. Reproduce from a clean build directory. Half of these vanish.
2. Compare the failing compile command from compile_commands.json with a working one.
3. Check cache variables: cmake -LAH build/dev | grep -i <suspect>
4. Check generator and toolchain differences before touching the code.
5. Only then change CMake.
```
