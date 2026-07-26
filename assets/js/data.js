/* e-gleba /ai — content catalog. Snake_case keys. Edit → UI re-renders. */
window.ai_data = {
  meta: {
    brand: "e-gleba",
    title: "AI Operating System",
    tagline: "Personal playbook — agents, skills, MCP, prompts, C++ workflows. Built to revise how I ship.",
    person: "Evgeniy Gleba",
    role: "C++ Systems Engineer · Game Engine R&D",
    where: "Lesta Games · Minsk",
    portfolio: "https://e-gleba.github.io",
    github: "https://github.com/e-gleba",
  },

  identity: {
    blurb:
      "Engineer who treats AI as a force multiplier for systems work — game engines, reverse engineering, OSINT, space, and regional tech context. This page is the living OS: dirs agents expect, skills vs rules vs MCP, prompts that ship, and where to watch the field.",
    pillars: [
      { t: "Spec first", d: "Write the contract before the chat. Ambiguity is the tax." },
      { t: "Layer context", d: "AGENTS.md + rules + skills + MCP — each layer has one job." },
      { t: "Verify always", d: "AI drafts. I own correctness, UB, perf, and security." },
      { t: "Capture & reuse", d: "Prompts and SOPs become repo assets — not one-offs." },
    ],
  },

  daily_drivers: [
    {
      name: "Cursor",
      url: "https://cursor.com",
      tag: "ide",
      note: "Primary AI IDE. Agents, multi-file edits, cloud agents, rules/skills, PR loops.",
      tags: ["ide", "agent"],
      limits: [
        "Fastest when the repo already has AGENTS.md / rules / compile_commands.",
        "Big blind refactors still need your review for UB, ABI, and product risk.",
        "Cloud agents help, but CI + local build remain the source of truth.",
      ],
    },
    {
      name: "OpenCode",
      url: "https://opencode.ai",
      tag: "cli",
      note: "Terminal coding agent. AGENTS.md, .opencode/, MCP via opencode.json.",
      tags: ["cli", "agent"],
      limits: [
        "Great for scriptable loops; weaker as a visual multi-file IDE.",
        "Permissions matter — lock down bash/edit for review-only agents.",
        "Keep AGENTS.md as the shared brain with Cursor to avoid drift.",
      ],
    },
    {
      name: "You.com",
      url: "https://you.com",
      tag: "search",
      note: "Hard research workhorse — large file drops, multi-source digests, citations.",
      tags: ["research", "search"],
      limits: [
        "Can strip or sanitize pasted content / pages — re-check critical quotes against originals.",
        "Model roster updates slowly; the label you pick is not always the exact backend model.",
        "On ~$20 plans, top models can hit soft caps — you may wait 1–2 days before the better tier feels available again.",
        "Handles large attachments (~20MB class) — use it for dense PDFs / dumps when other chats choke.",
        "Still a research front-end: verify claims before shipping engineering decisions.",
      ],
    },
    {
      name: "Scira.ai",
      url: "https://scira.ai",
      tag: "search",
      note: "Minimal AI search when I want signal over chrome.",
      tags: ["research", "search"],
      limits: [
        "Thin UI = fewer levers; not ideal for huge file dumps.",
        "Use for quick orientation, then deepen in You.com / a strong reasoner.",
      ],
    },
    {
      name: "ChatGPT",
      url: "https://chatgpt.com",
      tag: "chat",
      note: "General reasoning, writing, light coding, voice.",
      tags: ["chat", "general"],
      limits: [
        "Plan / rate limits throttle peak models; queue or fall back when capped.",
        "Web browsing quality varies — cite-check anything factual.",
        "Not a substitute for repo agents on multi-file C++ work.",
      ],
    },
    {
      name: "Claude",
      url: "https://claude.ai",
      tag: "chat",
      note: "Long-context analysis, careful editing, PR/spec reviews.",
      tags: ["chat", "review"],
      limits: [
        "Usage limits hit on heavy Opus days — keep Sonnet / local for volume.",
        "Excellent critic; still invents APIs if you don't ground it in files.",
      ],
    },
    {
      name: "Gemini",
      url: "https://gemini.google.com",
      tag: "chat",
      note: "Multimodal + Google-grounded research.",
      tags: ["chat", "research"],
      limits: [
        "Strong on huge context / multimodal; quieter on careful systems code review.",
        "Grounded answers still need engineer verification.",
      ],
    },
    {
      name: "Perplexity",
      url: "https://www.perplexity.ai",
      tag: "search",
      note: "Cited answers for news, papers, market scans.",
      tags: ["research", "search"],
      limits: [
        "Citations help, but sources can be thin or mirrored.",
        "Pro model access follows subscription caps — same patience game as other $20 tiers.",
      ],
    },
    {
      name: "GitHub Copilot",
      url: "https://github.com/features/copilot",
      tag: "ide",
      note: "Inline + PR summaries inside GitHub / CLI.",
      tags: ["ide", "github"],
      limits: [
        "Inline autocomplete ≠ architecture partner.",
        "PR summaries miss ABI / concurrency risk — keep a human/systems prompt.",
      ],
    },
    {
      name: "LM Arena",
      url: "https://lmarena.ai",
      tag: "arena",
      note: "Blind model battles — calibrate taste vs hype.",
      tags: ["arena", "models"],
      limits: [
        "Leaderboards ≠ your workload. Re-test on your golden tasks.",
        "Anonymous battles hide routing / distillation surprises.",
      ],
    },
    {
      name: "clangd",
      url: "https://clangd.llvm.org",
      tag: "cpp",
      note: "C++ language server. Agents need compile_commands.json.",
      tags: ["cpp", "ide"],
      limits: [
        "Without a fresh compile_commands.json it confidently lies.",
        "Cross toolchains need query-driver / correct sysroot wiring.",
      ],
    },
    {
      name: "Compiler Explorer",
      url: "https://godbolt.org",
      tag: "cpp",
      note: "Verify codegen / ABI claims the model invents.",
      tags: ["cpp", "verify"],
      limits: [
        "Snippet tool — not your full engine build.",
        "Match flags/std to the real project or the asm story is fiction.",
      ],
    },
  ],

  models: [
    { name: "Claude Opus / Sonnet", use: "Deep review, architecture, careful refactors, long docs", when: "High-stakes correctness" },
    { name: "GPT-5.x / o-series", use: "Broad reasoning, tool use, product + code hybrid", when: "General daily driver" },
    { name: "Gemini 2.x / Flash", use: "Huge context, multimodal, fast drafts", when: "Docs dumps & scans" },
    { name: "DeepSeek / Qwen / Kimi", use: "Cost-efficient coding & CN-ecosystem know-how", when: "Volume + value" },
    { name: "Local (Ollama / llama.cpp)", use: "Private notes, offline drafts, sensitive snippets", when: "Air-gapped or privacy" },
  ],

  arenas: [
    { name: "LM Arena", url: "https://lmarena.ai", note: "Blind pairwise chat battles" },
    { name: "Artificial Analysis", url: "https://artificialanalysis.ai", note: "Speed, quality, price dashboards" },
    { name: "LMSYS Chatbot Arena", url: "https://chat.lmsys.org", note: "Classic arena leaderboard" },
    { name: "Open LLM Leaderboard", url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard", note: "Open model benchmarks" },
    { name: "LiveCodeBench", url: "https://livecodebench.github.io", note: "Coding contamination-aware bench" },
    { name: "Arena-Hard", url: "https://github.com/lmarena/arena-hard-auto", note: "Hard-prompt eval kits" },
  ],

  /* —— layers: rules vs skills vs MCP —— */
  layers: [
    {
      name: "AGENTS.md / rules",
      job: "Ambient how-we-work",
      load: "Always (or glob-matched)",
      put: "AGENTS.md, .cursor/rules/*.mdc",
      example: "Boost snake_case; no UB; run tests before done",
    },
    {
      name: "Skills",
      job: "Invokable multi-step SOP",
      load: "On demand (/skill or @skill)",
      put: ".cursor/skills/, .agents/skills/, .opencode/skills/",
      example: "regenerate compile_commands → index → smoke test",
    },
    {
      name: "MCP",
      job: "Live tools & external data",
      load: "After server connect",
      put: "mcp.json / opencode.json mcp / Cursor MCP settings",
      example: "github, fetch, browser, custom domain APIs",
    },
    {
      name: "Hooks",
      job: "Deterministic lifecycle scripts",
      load: "On event (cannot be ignored)",
      put: ".cursor/hooks / tool-specific hooks",
      example: "format on edit, block commit if secrets",
    },
  ],

  /* —— standard dirs agents understand —— */
  agent_dirs: [
    {
      path: "AGENTS.md",
      tools: "Cursor, OpenCode, Codex, Copilot, Gemini CLI, Aider, …",
      what: "Cross-tool project brain. Build/test/style/PR rules for agents.",
      tip: "Commit it. Nest per package in monorepos. Closest file wins.",
    },
    {
      path: ".cursor/rules/*.mdc",
      tools: "Cursor",
      what: "Scoped rules with YAML frontmatter (globs, alwaysApply, description).",
      tip: "Split by domain. Keep each < 500 lines. Prefer over legacy .cursorrules.",
    },
    {
      path: ".cursor/skills/<name>/SKILL.md",
      tools: "Cursor (+ reads .agents/.claude/.codex skills)",
      what: "Invokable workflows. Progressive disclosure: name/desc → full SOP.",
      tip: "Use for deploy, compile_commands refresh, release checklists.",
    },
    {
      path: ".agents/skills/",
      tools: "Cross-tool / Cursor compatible",
      what: "Portable skills root when you want tool-agnostic layout.",
      tip: "Good default if team mixes Cursor + Claude Code + Codex.",
    },
    {
      path: ".opencode/ + opencode.json",
      tools: "OpenCode",
      what: "agents/, commands/, skills/, plugins/, themes/ + MCP config.",
      tip: "Run /init to scaffold AGENTS.md. Prefer AGENTS.md over CLAUDE.md.",
    },
    {
      path: "CLAUDE.md",
      tools: "Claude Code (fallback)",
      what: "Claude-specific instructions if AGENTS.md missing.",
      tip: "Symlink CLAUDE.md → AGENTS.md to avoid drift.",
    },
    {
      path: ".github/workflows/",
      tools: "All agents that ship",
      what: "CI truth. Agents should read and keep green.",
      tip: "Document required checks in AGENTS.md.",
    },
    {
      path: "compile_commands.json",
      tools: "clangd + any C++ agent",
      what: "Per-file compile flags. Without it, C++ agents guess wrong.",
      tip: "CMake: -DCMAKE_EXPORT_COMPILE_COMMANDS=ON; symlink to repo root.",
    },
    {
      path: ".mcp.json / mcp config",
      tools: "Cursor, OpenCode, Claude, …",
      what: "Which MCP servers, env, least-privilege tokens.",
      tip: "Never commit secrets. Describe tools so agents can choose them.",
    },
    {
      path: ".ai/ (informal)",
      tools: "Some teams / custom",
      what: "Ad-hoc prompts, evals, golden tasks — not a universal standard.",
      tip: "Prefer AGENTS.md + .agents/skills for portability; use .ai for extras.",
    },
  ],

  skills_guide: {
    blurb:
      "Skills are on-demand playbooks. Rules are always-on constraints. If you find yourself re-explaining a 15-step ritual every chat — that is a skill, not a rule.",
    vs_rules: [
      { aspect: "Purpose", rule: "Style, bans, invariants", skill: "Multi-step procedures" },
      { aspect: "When loaded", rule: "Matching globs / always", skill: "Relevant or /name" },
      { aspect: "Length", rule: "Short → a few hundred lines", skill: "Can be longer SOP" },
      { aspect: "Example", rule: "Use snake_case; no raw new", skill: "Full staging deploy checklist" },
    ],
    how_to: [
      "Create .cursor/skills/my-skill/SKILL.md (or .agents/skills/...)",
      "Frontmatter: name + description (agents scan these first)",
      "Body: steps, commands, failure modes, done criteria",
      "Optional: scripts/, references/, assets/ for progressive load",
      "Invoke with /my-skill or @my-skill — or let the agent pick it",
      "Keep metadata ~100 tokens; full skill ideally under ~5k tokens",
    ],
    examples: [
      { name: "cpp-compdb", desc: "Regenerate compile_commands.json for CMake/Ninja and verify clangd sees it" },
      { name: "pr-systems", desc: "Staff-level C++ PR review: UB → ABI → perf → tests → risk" },
      { name: "pages-deploy", desc: "Static site: prepare site/, Actions green, verify live URL" },
      { name: "osint-brief", desc: "Fact/claim/rumor graded brief for BY/RU tech landscape" },
    ],
  },

  mcp_guide: {
    blurb:
      "MCP (Model Context Protocol) exposes tools to agents — filesystem, GitHub, fetch, browsers, custom APIs. Skills tell the agent how to sequence tools you already have; MCP adds new tools.",
    principles: [
      "Least privilege — read-only by default; write scopes explicit",
      "Clear tool descriptions — agents choose tools by reading schemas",
      "Egress allowlists — know which domains the env permits",
      "Idempotent where possible — retries should not double-charge",
      "Golden-path eval — 5 real tasks before trusting a new server",
    ],
    catalog: [
      { name: "filesystem / repo", use: "Scoped read-write workspace for agents" },
      { name: "github", use: "Issues, PRs, checks, review & ship loops" },
      { name: "fetch / browser", use: "Docs & arena pages when egress allows" },
      { name: "search", use: "You / Scira / web — grounded research" },
      { name: "cursor-cloud", use: "Cloud agent run metadata & env diagnostics" },
      { name: "custom domain", use: "Game data, sat APIs, internal tools — design schemas first" },
    ],
  },

  specs: [
    { name: "AGENTS.md", url: "https://agents.md/", note: "Open format for agent project instructions (AAIF / Linux Foundation)" },
    { name: "Cursor Rules", url: "https://cursor.com/docs/context/rules", note: ".cursor/rules, AGENTS.md, nested rules" },
    { name: "Cursor Skills", url: "https://cursor.com/help/customization/skills", note: "SKILL.md layout, progressive disclosure" },
    { name: "OpenCode Rules", url: "https://opencode.ai/docs/rules", note: "AGENTS.md + /init scaffolding" },
    { name: "OpenCode Agents", url: "https://opencode.ai/docs/agents", note: ".opencode/agents/*.md subagents & permissions" },
    { name: "OpenCode Config", url: "https://opencode.ai/docs/config", note: "opencode.json providers, models, MCP" },
    { name: "MCP spec", url: "https://modelcontextprotocol.io/", note: "Tool protocol for agent ↔ server" },
    { name: "Agent Skills spec", url: "https://agentskills.io/", note: "Cross-tool skill format (name/description/SOP)" },
    { name: "compile_commands.json", url: "https://clang.llvm.org/docs/JSONCompilationDatabase.html", note: "C++ compilation database" },
    { name: "clangd", url: "https://clangd.llvm.org/", note: "C++ language server agents lean on" },
  ],

  cpp_playbook: [
    {
      title: "Ground in compile_commands.json",
      body: "CMake: -DCMAKE_EXPORT_COMPILE_COMMANDS=ON. Symlink/copy to repo root (or build/). Without this, agents and clangd invent flags and include paths.",
    },
    {
      title: "Ask for godbolt / asm proof",
      body: "For ABI, inlining, or 'this is free' claims — demand Compiler Explorer links or local -S output. Trust measurements over vibes.",
    },
    {
      title: "Lifetime & concurrency first",
      body: "Review order: UB → lifetime/ownership → data races → API/ABI → alloc/cache → tests. Style last.",
    },
    {
      title: "Small diffs, buildable steps",
      body: "Prefer agent PRs that compile at each step. Giant refactors hide regressions in game engines.",
    },
    {
      title: "Pin toolchain in AGENTS.md",
      body: "Document compiler, C++ standard, sanitizers, and the exact build/test commands agents must run.",
    },
    {
      title: "Sanitizers as truth",
      body: "ASan/TSan/UBSan beats a confident model. Put sanitizer recipes in a skill.",
    },
  ],

  organization: [
    {
      title: "One brain file",
      body: "Root AGENTS.md = source of truth. Cursor-only globs go in .cursor/rules. Don't duplicate paragraphs in three places.",
    },
    {
      title: "Skills for rituals",
      body: "Anything > ~8 steps or rarely needed → skill. Keeps ambient context thin and cheap.",
    },
    {
      title: "Prompt library in-repo",
      body: "Version prompts next to work (or here in data.js for personal OS). If it worked once, templatize {{vars}}.",
    },
    {
      title: "Parallel threads → one memo",
      body: "Fan out research (N chats/tools), then synthesize once. Arenas settle model disagreements.",
    },
    {
      title: "Human gates",
      body: "AI may draft commits/PRs; you gate secrets, licenses, security, public statements, ABI breaks.",
    },
    {
      title: "Golden tasks",
      body: "Keep 5–10 eval prompts. Re-run when switching models. Update priors from LM Arena + Artificial Analysis.",
    },
  ],

  watch: [
    { group: "Models & evals", links: [
      { n: "LM Arena", u: "https://lmarena.ai" },
      { n: "Artificial Analysis", u: "https://artificialanalysis.ai" },
      { n: "Hugging Face Blog", u: "https://huggingface.co/blog" },
      { n: "OpenRouter Models", u: "https://openrouter.ai/models" },
    ]},
    { group: "Agent tooling", links: [
      { n: "Cursor Changelog", u: "https://cursor.com/changelog" },
      { n: "OpenCode Docs", u: "https://opencode.ai/docs" },
      { n: "AGENTS.md", u: "https://agents.md/" },
      { n: "MCP", u: "https://modelcontextprotocol.io/" },
    ]},
    { group: "C++ systems", links: [
      { n: "CppCon / YouTube", u: "https://www.youtube.com/@CppCon" },
      { n: "GPUOpen", u: "https://gpuopen.com" },
      { n: "Vulkan Docs", u: "https://docs.vulkan.org" },
      { n: "Compiler Explorer", u: "https://godbolt.org" },
      { n: "clangd", u: "https://clangd.llvm.org" },
    ]},
    { group: "RE & security", links: [
      { n: "Project Zero", u: "https://googleprojectzero.blogspot.com" },
      { n: "Ghidra", u: "https://ghidra-sre.org" },
      { n: "OSDev Wiki", u: "https://wiki.osdev.org" },
    ]},
    { group: "Space / OSINT", links: [
      { n: "CelesTrak", u: "https://celestrak.org" },
      { n: "SatNOGS", u: "https://satnogs.org" },
      { n: "Bellingcat", u: "https://www.bellingcat.com" },
      { n: "Liveuamap", u: "https://liveuamap.com" },
    ]},
  ],

  prompts: [
    {
      id: "spec_first",
      title: "Spec-first task brief",
      cat: "planning",
      tags: ["planning", "coding"],
      body: `You are a senior engineer pair-programmer.

GOAL:
{{goal}}

CONSTRAINTS:
- Language/stack: {{stack}}
- Must not: {{must_not}}
- Performance / safety bar: {{bar}}

DELIVERABLES:
1. Clarifying questions (max 5) if anything is ambiguous
2. Minimal design (bullets)
3. Implementation plan (ordered steps)
4. Then code — only after I approve the plan

Today: {{date}}. Prefer correctness over cleverness.`,
    },
    {
      id: "pr_review",
      title: "PR review (systems / C++)",
      cat: "review",
      tags: ["review", "cpp", "github"],
      body: `Review this PR as a staff C++ systems engineer.

Focus order:
1. Correctness / UB / lifetime / concurrency
2. API & ABI impact
3. Perf hot paths (allocations, cache, syscalls)
4. Test gaps
5. Style only if it hurts clarity

Output format:
- Summary (3 lines)
- Blockers
- Suggestions (non-blocking)
- Test plan I should run
- Risk score 1–5 with reason

Diff / context:
{{diff}}`,
    },
    {
      id: "agents_md",
      title: "Draft AGENTS.md for this repo",
      cat: "agent",
      tags: ["agent", "agents_md", "org"],
      body: `Draft a root AGENTS.md for this repository (open format: https://agents.md/).

Include:
- Project overview (1 short para)
- Setup / toolchain (compilers, package managers)
- Build commands
- Test / lint / format commands
- Code style (Boost snake_case for C++; note exceptions)
- PR & commit expectations
- Security / secrets rules
- Where nested AGENTS.md live (if monorepo)

Style: laconic bullets agents can execute. No marketing.
Date: {{date}}.`,
    },
    {
      id: "skill_author",
      title: "Author a Cursor / agents skill",
      cat: "agent",
      tags: ["agent", "skills"],
      body: `Create a SKILL.md for: {{goal}}

Path suggestion: .cursor/skills/{{slug}}/SKILL.md (also fine: .agents/skills/)

Requirements:
- YAML frontmatter: name, description (trigger-rich)
- Step-by-step SOP with exact commands
- Failure modes & rollback
- Done criteria checklist
- Keep full body under ~5000 tokens; put deep refs in references/

Output the full file contents ready to save.`,
    },
    {
      id: "mcp_design",
      title: "MCP tool design brief",
      cat: "mcp",
      tags: ["mcp", "agent", "tooling"],
      body: `Design an MCP server for: {{purpose}}.

Include:
- Tools (name, params schema, side effects)
- Auth / egress constraints
- Failure modes & retries
- How an agent should sequence calls
- Minimal golden-path example

Optimize for least privilege and clear descriptions (agents read descriptions).`,
    },
    {
      id: "cursor_kickoff",
      title: "Cursor / cloud agent kickoff",
      cat: "agent",
      tags: ["agent", "cursor", "coding"],
      body: `Repo context: systems / game-engine R&D + portfolio-adjacent tools.

Task: {{task}}
Branch naming: cursor/<slug>-xxxx
Done means:
- [ ] Code compiles / site builds
- [ ] CI green or explained
- [ ] Commit + push
- [ ] PR with concise why

Prefer official GitHub Actions (actions/checkout, configure-pages, upload-pages-artifact, deploy-pages).
Avoid leading-underscore dir names; use snake_case identifiers.
Do not ask me to run commands you can run. Report artifacts & URLs at the end.`,
    },
    {
      id: "opencode_init",
      title: "OpenCode project init",
      cat: "agent",
      tags: ["agent", "opencode"],
      body: `Initialize this repo for OpenCode.

1. Propose AGENTS.md contents (or refine existing)
2. Propose opencode.json: model defaults, MCP stubs, permissions
3. Propose .opencode/agents/ for: review (read-only), implement, docs
4. List skills worth adding under .opencode/skills/
5. Show the exact file tree to create

Do not invent secrets. Prefer AGENTS.md over CLAUDE.md.
Date: {{date}}.`,
    },
    {
      id: "cpp_compdb",
      title: "C++ compile_commands bootstrap",
      cat: "cpp",
      tags: ["cpp", "clangd", "skills"],
      body: `Make this C++ project agent-ready for clangd.

Stack hints: {{stack}}
Build system: {{build}}

Deliver:
1. Exact commands to export compile_commands.json
2. Where to place/symlink it for clangd discovery
3. How to verify (open a TU, check includes resolve)
4. A SKILL.md "cpp-compdb" to regenerate after toolchain changes
5. Notes for cross-compilers / query-driver if needed

Today: {{date}}.`,
    },
    {
      id: "cpp_perf",
      title: "C++ hot-path investigation",
      cat: "cpp",
      tags: ["cpp", "perf"],
      body: `Investigate performance for: {{goal}}

Constraints: {{bar}}

Plan:
1. Hypotheses ranked by ROI
2. Instrumentation (timers, tracy/perf, counters)
3. Allocation / cache / branch suspects
4. Proposed micro-benchmarks
5. What would falsify each hypothesis

No drive-by refactors. Measure before claiming wins.`,
    },
    {
      id: "multithread",
      title: "Multi-thread research fan-out",
      cat: "research",
      tags: ["research", "osint", "planning"],
      body: `Topic: {{topic}}
Date: {{date}}

Spawn N parallel research tracks (N={{n|4}}). For each track return:
- Angle name
- Key claims (with uncertainty)
- Best sources / queries to run next
- What would falsify it

Then synthesize:
- Consensus
- Contested points
- Actionable next steps for me (engineer in Minsk, game-engine + RE context)`,
    },
    {
      id: "re_brief",
      title: "Reverse engineering brief",
      cat: "reveng",
      tags: ["reveng", "cpp", "security"],
      body: `Act as a careful reverse engineer. Legal / ethical scope only: {{scope}}.

Target class: {{target}}
Known facts: {{known}}

Produce:
1. Threat model & assumptions
2. Artifact map (binaries, formats, protocols)
3. Tooling plan (static → dynamic → differential)
4. Hypotheses ranked by ROI
5. Red lines (what not to do)
6. Report template headings

Prefer IDA/Ghidra/Binary Ninja mental models; keep steps reproducible.`,
    },
    {
      id: "engine_digest",
      title: "Game engine daily digest",
      cat: "digest",
      tags: ["gamedev", "engine", "digest"],
      body: `Daily digest for {{date}} — game engines & rendering.

Scan & summarize (bullet, laconic):
- Engine news (Unreal / Unity / custom / open)
- Rendering & GPU (Vulkan/D3D12/Metal, mesh shaders, RT)
- Physics / animation / tooling
- Notable open-source commits or papers
- One thing I should try in my R&D this week

Style: engineer notes, not blog. Include links when known.`,
    },
    {
      id: "osint_digest",
      title: "OSINT / geopolitics digest",
      cat: "digest",
      tags: ["osint", "politeconomy", "digest"],
      body: `OSINT + political economy digest for {{date}}.

Regions of interest: Belarus, Russia, broader CEE / tech sanctions landscape.
Themes: industry, dual-use tech, infra, capital flows, open sources.

Rules:
- Separate fact / claim / rumor
- Cite type of source (official, OSINT, media, leak)
- Note bias & confidence
- End with 3 implications for an engineer/builder`,
    },
    {
      id: "space_digest",
      title: "Space / satellites digest",
      cat: "digest",
      tags: ["space", "satellites", "digest"],
      body: `Astronomy · satellites · space systems digest — {{date}}.

Cover:
- Launch & constellation news
- Earth observation / SAR / SIGINT-relevant civilian tech
- Open datasets & software (Orekit, GMAT, SatNOGS, …)
- One learning rabbit-hole with a concrete tutorial or repo

Keep it technical. Skip hype.`,
    },
    {
      id: "electronics",
      title: "Electronics / embedded prompt",
      cat: "electronics",
      tags: ["electronics", "embedded"],
      body: `Embedded / electronics assistant.

Board / MCU: {{mcu}}
Goal: {{goal}}
Constraints: power, interfaces, toolchain = {{constraints}}

Return:
- Block diagram (ASCII)
- Pin / bus plan
- Firmware architecture
- Bring-up checklist
- Common failure modes
- Test equipment list`,
    },
    {
      id: "chinese_sop",
      title: "Chinese-style SOP agent (角色+流程)",
      cat: "practice",
      tags: ["practice", "agent", "planning"],
      body: `你是「资深{{role}}」。严格按 SOP 执行，不要跳步。

【角色】专业、直接、先结论后证据。
【目标】{{goal}}
【输入】{{input}}
【流程】
1. 澄清（最多 5 个问题；若信息足够则跳过）
2. 拆解任务为可执行子任务
3. 并行思路：哪些可同时做
4. 产出物按格式交付
5. 自检清单（正确性 / 遗漏 / 风险）

【输出格式】
- 结论
- 步骤
- 交付物
- 风险与验证

日期：{{date}}。用中文或英文（跟我输入语言）。`,
    },
    {
      id: "fillers",
      title: "Context fillers (drop into any chat)",
      cat: "filler",
      tags: ["filler", "identity"],
      body: `About me (reuse):
- Evgeniy Gleba — C++ systems / game engine R&D engineer (Lesta Games, Minsk)
- Interests: custom engines, RE, electronics, OSINT, space/satellites, BY/RU tech business, open source
- AI stack: Cursor, OpenCode, You.com, Scira, Claude/GPT/Gemini, LM Arena for calibration
- Working style: spec-first, AGENTS.md + skills + MCP layers, parallel research, verify everything
- Date context: {{date}}`,
    },
  ],

  templates: [
    {
      id: "agents_md_template",
      title: "AGENTS.md starter (C++ / systems)",
      body: `# AGENTS.md

## Overview
C++ systems / game-engine R&D. Prefer correctness, measurable perf, and small reviewable diffs.

## Toolchain
- Compiler / standard: <fill>
- Build: cmake -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON ...
- Symlink compile_commands.json to repo root for clangd

## Commands
- Configure: <fill>
- Build: <fill>
- Test: <fill>
- Format / lint: <fill>

## Style
- Boost-like snake_case for functions, variables, files
- No leading-underscore public API names
- Ownership explicit (unique/shared/span); no naked owning raw new/delete in new code

## Agent rules
- Spec first for non-trivial tasks
- Run tests you can run; fix failures before claiming done
- Do not invent credentials; do not commit secrets
- Prefer official GitHub Actions for Pages/CI

## PR
- Clear why + test plan
- Call out ABI / save-format / protocol risks
`,
    },
    {
      id: "skill_template",
      title: "SKILL.md starter",
      body: `---
name: cpp-compdb
description: Regenerate compile_commands.json for this CMake project and verify clangd can resolve includes. Use when agents lack code intelligence or after toolchain changes.
---

# cpp-compdb

## Steps
1. Configure with compile commands export
2. Symlink/copy compile_commands.json to repo root
3. Open a known TU and confirm includes resolve
4. Report paths and any missing flags

## Done
- [ ] compile_commands.json present at expected path
- [ ] Sample file resolves core headers
- [ ] Commands documented in AGENTS.md if changed
`,
    },
    {
      id: "cursor_rule_template",
      title: ".cursor/rules snippet (.mdc)",
      body: `---
description: C++ systems conventions for this repo
globs:
  - "**/*.{cpp,hpp,h,cc,cxx}"
alwaysApply: false
---

# C++ conventions
- Snake_case identifiers (Boost style)
- Prefer spans / string_view at API boundaries when lifetimes are clear
- Document thread-safety on shared types
- No drive-by refactors outside the task scope
`,
    },
  ],

  pipelines: [
    {
      id: "ship_feature",
      title: "Ship a feature",
      plain: "Spec → research → agent → CI → human gate",
      when: "Default path for any non-trivial change",
      note: "Never skip the one-pager. AI drafts; you own merge risk.",
      stages: [
        { title: "One-pager", tool: "Any chat", note: "Goal, constraints, done criteria", prompt: "Write a one-page spec for: {{goal}}\nStack: {{stack}}\nMust not: {{must_not}}\nDone means: checklist of 5 bullets.\nDate: {{date}}" },
        { title: "Clarify", tool: "Claude / GPT", note: "Max 5 questions, then stop", prompt: "Challenge this spec. Ask up to 5 clarifying questions only if blocking. If clear, say CLEAR and restate the plan in 6 bullets." },
        {
          title: "Fan-out research",
          note: "Parallel tracks — merge later",
          parallel: [
            { title: "Web dig", tool: "You.com", note: "~20MB dumps OK; re-check stripped quotes", prompt: "Research {{topic}} for an engineer. Separate fact/claim/rumor. Prefer primary sources. Flag anything that looks sanitized or incomplete." },
            { title: "Quick scan", tool: "Scira / Perplexity", note: "Orientation only", prompt: "Give a laconic landscape of {{topic}}: 7 bullets + 5 best next queries." },
          ],
        },
        { title: "Implement", tool: "Cursor / OpenCode", note: "Small buildable steps", prompt: "Implement from the approved spec. Branch cursor/<slug>. Prefer official Actions. Run tests you can. No drive-by refactors.\nSpec:\n{{goal}}" },
        { title: "Self-review", tool: "Claude", note: "Adversary pass", prompt: "Review this diff as staff C++/systems. Order: UB → lifetime → concurrency → ABI → tests. Blockers first." },
        { title: "Human merge", tool: "You", note: "Secrets, ABI, product", prompt: "Manual gate checklist:\n- [ ] CI green\n- [ ] No secrets\n- [ ] ABI/protocol risk called out\n- [ ] Test plan run" },
      ],
    },
    {
      id: "hard_research",
      title: "Hard research digest",
      plain: "Large files → fan-out → synthesis → actions",
      when: "Papers, dumps, OSINT packs, long PDFs",
      note: "You.com for bulk; strong reasoner for judgment. Expect plan caps on $20 tiers.",
      stages: [
        { title: "Frame the question", tool: "Any chat", note: "One sentence + success test", prompt: "Turn this fuzzy interest into a research brief:\nTopic: {{topic}}\nAudience: C++ systems eng in Minsk\nDeliver: questions, source types, kill criteria.\nDate: {{date}}" },
        {
          title: "Ingest (parallel)",
          note: "Bulk vs sniper",
          parallel: [
            { title: "Bulk upload", tool: "You.com", note: "Large attachments; watch stripping", prompt: "I will upload source files (up to ~20MB). Extract: timeline, actors, technical claims, contradictions. Quote sparingly and mark low-confidence if text looks truncated/sanitized." },
            { title: "Open web", tool: "Perplexity", note: "Cited news/papers", prompt: "Find recent primary sources for {{topic}}. Return title, url, 1-line why it matters, confidence." },
          ],
        },
        { title: "Deep reason", tool: "Claude / GPT", note: "If capped — wait 1–2 days or drop tier", prompt: "Using the extracted notes, write an engineer memo: consensus, contested, unknowns, 5 actions. Separate fact vs inference." },
        { title: "Arena check", tool: "LM Arena", note: "Calibrate, don't worship rank", prompt: "Ask the same 3 hard questions across models. Note disagreements only." },
        { title: "Park & reuse", tool: "This /ai map", note: "Save prompts + links", prompt: "Produce a reusable prompt template + bookmark list for future {{topic}} digests." },
      ],
    },
    {
      id: "pr_systems",
      title: "PR review (systems)",
      plain: "Bot → model → human blockers → merge watch",
      when: "Any non-trivial PR",
      note: "AI accelerates; you own ABI/UB.",
      stages: [
        { title: "Collect context", tool: "GitHub", note: "Diff + tests + linked issue", prompt: "Summarize this PR in 5 bullets for a staff eng: intent, touch points, risk areas.\n{{diff}}" },
        { title: "Model review", tool: "Claude", note: "Strict order", prompt: "Staff C++ review. Order: correctness/UB/lifetime/concurrency → API/ABI → perf → tests → style. Output: summary, blockers, suggestions, test plan, risk 1–5.\n{{diff}}" },
        {
          title: "Spot checks",
          note: "Only if claims appear",
          parallel: [
            { title: "Asm/ABI claim", tool: "godbolt", note: "Prove it", prompt: "Reproduce the disputed snippet on godbolt with project-like flags. Report whether the model claim holds." },
            { title: "Build truth", tool: "CI / local", note: "Sanitizers > vibes", prompt: "List exact commands to validate this PR (build, tests, ASan/TSan if relevant)." },
          ],
        },
        { title: "Human decision", tool: "You", note: "Approve / request changes", prompt: "Decision rubric: any blocker? ABI break? test gap? If approve, write a 2-line merge note." },
        { title: "Post-merge watch", tool: "GitHub Actions", note: "Don't walk away cold", prompt: "After merge: watch CI, smoke the hot path, note follow-ups as issues." },
      ],
    },
    {
      id: "cpp_agent_ready",
      title: "C++ agent onboard",
      plain: "compdb → AGENTS.md → skill → golden TU",
      when: "New repo or dumb agents",
      note: "Without compile_commands, agents guess.",
      stages: [
        { title: "Export compdb", tool: "CMake", note: "Symlink to root", prompt: "Give exact commands to configure {{build}} with CMAKE_EXPORT_COMPILE_COMMANDS and place compile_commands.json where clangd finds it." },
        { title: "Write AGENTS.md", tool: "Cursor", note: "Toolchain + commands", prompt: "Draft AGENTS.md for this C++ repo: overview, configure/build/test, style (snake_case), agent rules, PR expectations." },
        { title: "Add skill", tool: "Cursor skills", note: "cpp-compdb SOP", prompt: "Author .cursor/skills/cpp-compdb/SKILL.md to regenerate compile commands and verify clangd resolves includes." },
        { title: "Golden TU", tool: "clangd", note: "One file that must resolve", prompt: "Pick/create a golden translation unit and a checklist proving agents have real code intelligence." },
        { title: "Sanitizer recipe", tool: "Local toolchains", note: "Truth serum", prompt: "Document ASan/TSan/UBSan recipes in AGENTS.md with copy-paste commands." },
      ],
    },
    {
      id: "multi_agent",
      title: "Multi-agent day",
      plain: "Split roles — researcher / implementer / critic",
      when: "Complex work where one chat collapses",
      note: "Separate creator and critic. Parallel where possible.",
      stages: [
        { title: "Dispatch brief", tool: "Any", note: "Shared contract", prompt: "Create three role briefs for {{goal}}: Researcher, Implementer, Critic. Shared constraints: {{must_not}}. Shared done criteria." },
        {
          title: "Parallel roles",
          note: "Don't mix temperatures",
          parallel: [
            { title: "Researcher", tool: "You.com", note: "Sources + limits", prompt: "Role=Researcher. Gather evidence for {{goal}}. Mark sanitized/truncated sources. Output notes only." },
            { title: "Implementer", tool: "Cursor", note: "Code only after plan", prompt: "Role=Implementer. Propose minimal plan, wait for OK, then patch in small steps." },
            { title: "Critic", tool: "Claude", note: "No edits", prompt: "Role=Critic (read-only). Attack the plan/diff. No rewriting code — blockers + tests only." },
          ],
        },
        { title: "Merge thread", tool: "GPT / Claude", note: "One memo", prompt: "Synthesize researcher notes + critic blockers + implementer plan into a single go/no-go memo." },
        { title: "Execute & gate", tool: "Cursor + You", note: "Human owns merge", prompt: "Apply the approved plan. Run checks. Stop for human merge." },
      ],
    },
    {
      id: "mcp_pipeline",
      title: "MCP tool pipeline",
      plain: "Schema → least privilege → golden path → eval",
      when: "New agent tool surface",
      note: "If the agent can't explain the tool, the description is wrong.",
      stages: [
        { title: "Job story", tool: "Any chat", note: "What decision gets faster?", prompt: "Design MCP tools for {{purpose}}. List decisions an agent should make with them." },
        { title: "Schemas", tool: "Cursor", note: "Names + side effects", prompt: "Write tool schemas: name, params, side effects, errors. Least privilege by default." },
        { title: "Wire + auth", tool: "OpenCode / Cursor MCP", note: "No secrets in git", prompt: "Produce mcp config stubs with env placeholders and egress notes." },
        { title: "Golden path", tool: "Agent", note: "One happy script", prompt: "Write a 5-step golden-path script exercising the tools end-to-end." },
        { title: "Eval pack", tool: "You", note: "5 real tasks", prompt: "Define 5 eval tasks + pass/fail. Include one permission-denied case." },
      ],
    },
  ],

  practices: [
    {
      title: "角色 → 目标 → 格式 → 自检",
      body: "Chinese top-tier pattern: lock role, lock goal, lock output schema, then self-check. Most quality jumps come from format + critique, not longer prompts.",
    },
    {
      title: "Critique loop",
      body: "Draft → adversary pass → fix pass. Separate the creator and the critic (two chats or two roles).",
    },
    {
      title: "Context hygiene",
      body: "Paste only the slice that matters. Dumping whole repos burns attention; link paths and cite symbols.",
    },
    {
      title: "Rules thin, skills thick",
      body: "Ambient rules stay short. Put long SOPs in skills so everyday chats stay cheap.",
    },
    {
      title: "Eval over vibes",
      body: "Keep golden tasks. Re-run when switching models. Use arenas to update priors.",
    },
    {
      title: "Prompt as code",
      body: "Version prompts. If it worked once, it becomes a template with {{vars}}.",
    },
  ],

  digests: [
    { id: "engine", title: "Game engines", icon: "◆", topics: ["Unreal / custom engines", "Vulkan · D3D12 · Metal", "ECS · job systems", "Content pipelines", "Profiling & memory"], prompt_id: "engine_digest" },
    { id: "gamedev", title: "Game development", icon: "▶", topics: ["Gameplay systems", "Netcode mental models", "Tools for designers", "Build & CI for games", "Platform cert notes"], prompt_id: "engine_digest" },
    { id: "electronics", title: "Electronics", icon: "⚡", topics: ["MCU bring-up", "RF / sensors basics", "Power & PDN", "Firmware architecture", "Test benches"], prompt_id: "electronics" },
    { id: "reveng", title: "Reverse engineering", icon: "⬡", topics: ["Static / dynamic RE", "Formats & protocols", "Anti-tamper landscape", "Legal scope discipline", "Report writing"], prompt_id: "re_brief" },
    { id: "osint", title: "OSINT", icon: "◎", topics: ["Source grading", "GEOINT / SOCMINT basics", "Sanctions & dual-use", "Verification habits", "Briefing format"], prompt_id: "osint_digest" },
    { id: "politeconomy", title: "Politeconomy", icon: "▣", topics: ["BY / RU industry", "Tech capital flows", "Regulation shocks", "Supply chains", "Scenario planning"], prompt_id: "osint_digest" },
    { id: "business", title: "BY / RU business", icon: "◈", topics: ["Local market reality", "Payments & infra", "Hiring & talent", "Risk matrix", "Builder playbooks"], prompt_id: "osint_digest" },
    { id: "rnd", title: "R&D", icon: "✳", topics: ["Hypothesis logs", "Spike → decide", "Paper → prototype", "Kill criteria", "Knowledge base"], prompt_id: "multithread" },
    { id: "opensource", title: "Open source", icon: "⎇", topics: ["Contribution etiquette", "License fitness", "Maintainer lens", "Release engineering", "Community signals"], prompt_id: "spec_first" },
    { id: "space", title: "Space & satellites", icon: "✦", topics: ["Orbits & constellations", "EO / SAR literacy", "Open ground software", "Radio & tracking", "Mission notes"], prompt_id: "space_digest" },
    { id: "astro", title: "Astronomy", icon: "☽", topics: ["Observation planning", "Data archives", "Astro software", "Citizen science", "Weekly sky hooks"], prompt_id: "space_digest" },
  ],

  bookmarks: [
    { group: "Workbenches", links: [
      { n: "Cursor", u: "https://cursor.com" },
      { n: "OpenCode", u: "https://opencode.ai" },
      { n: "GitHub", u: "https://github.com" },
      { n: "godbolt", u: "https://godbolt.org" },
    ]},
    { group: "Research", links: [
      { n: "You.com", u: "https://you.com" },
      { n: "Scira", u: "https://scira.ai" },
      { n: "Perplexity", u: "https://www.perplexity.ai" },
      { n: "Semantic Scholar", u: "https://www.semanticscholar.org" },
    ]},
    { group: "Models & arenas", links: [
      { n: "LM Arena", u: "https://lmarena.ai" },
      { n: "Artificial Analysis", u: "https://artificialanalysis.ai" },
      { n: "Hugging Face", u: "https://huggingface.co" },
      { n: "OpenRouter", u: "https://openrouter.ai" },
    ]},
    { group: "Specs", links: [
      { n: "AGENTS.md", u: "https://agents.md/" },
      { n: "MCP", u: "https://modelcontextprotocol.io/" },
      { n: "Cursor Skills", u: "https://cursor.com/help/customization/skills" },
      { n: "OpenCode Docs", u: "https://opencode.ai/docs" },
    ]},
    { group: "Engine / GPU", links: [
      { n: "GPUOpen", u: "https://gpuopen.com" },
      { n: "Vulkan Docs", u: "https://docs.vulkan.org" },
      { n: "clangd", u: "https://clangd.llvm.org" },
    ]},
    { group: "RE & security", links: [
      { n: "Ghidra", u: "https://ghidra-sre.org" },
      { n: "OSDev Wiki", u: "https://wiki.osdev.org" },
      { n: "Project Zero", u: "https://googleprojectzero.blogspot.com" },
    ]},
    { group: "Space", links: [
      { n: "CelesTrak", u: "https://celestrak.org" },
      { n: "SatNOGS", u: "https://satnogs.org" },
      { n: "NASA SSD", u: "https://ssd.jpl.nasa.gov" },
    ]},
    { group: "OSINT", links: [
      { n: "Bellingcat", u: "https://www.bellingcat.com" },
      { n: "Liveuamap", u: "https://liveuamap.com" },
      { n: "OCCRP", u: "https://www.occrp.org" },
    ]},
    { group: "Me", links: [
      { n: "Portfolio", u: "https://e-gleba.github.io" },
      { n: "GitHub", u: "https://github.com/e-gleba" },
      { n: "This page source", u: "https://github.com/e-gleba/ai" },
    ]},
  ],

  daily_themes: [
    { day: 0, focus: "Systems & engines", hint: "Profiling, memory, rendering spikes", prompt_id: "engine_digest" },
    { day: 1, focus: "Reverse & security", hint: "One binary habit or paper", prompt_id: "re_brief" },
    { day: 2, focus: "Research fan-out", hint: "4-track synthesis memo", prompt_id: "multithread" },
    { day: 3, focus: "C++ agent tooling", hint: "compdb, clangd, skills", prompt_id: "cpp_compdb" },
    { day: 4, focus: "OSINT / politeconomy", hint: "BY·RU · sanctions · industry", prompt_id: "osint_digest" },
    { day: 5, focus: "Space & astronomy", hint: "Orbits, EO, open tools", prompt_id: "space_digest" },
    { day: 6, focus: "Meta / agents", hint: "AGENTS.md, skills, MCP, CI", prompt_id: "cursor_kickoff" },
  ],
};
