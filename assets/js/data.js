/* AI OS — content catalog. Edit here → UI updates. */
window.ai_data = {
  meta: {
    brand: "e-gleba",
    title: "AI Recipe Book",
    tagline: "Simple AI cooking guide — tools, prompts, pipelines, digests. Reopen daily.",
    person: "Evgeniy Gleba",
    role: "C++ Systems Engineer · Game Engine R&D",
    where: "Lesta Games · Minsk",
    portfolio: "https://e-gleba.github.io",
    github: "https://github.com/e-gleba",
  },

  identity: {
    blurb:
      "C++ systems / game-engine engineer in Minsk. AI as leverage — engines, RE, chips, space, BY/RU business & law. Soundtrack: Orchestra · Twin Atlantic · Halo. Working rule: clear value, clear ask, copy only what ships.",
    pillars: [
      { t: "Spec first", d: "Write the contract before the chat. Ambiguity is the tax." },
      { t: "Layer context", d: "AGENTS.md + rules + skills + MCP — each layer has one job." },
      { t: "Verify always", d: "AI drafts. I own correctness, UB, perf, and security." },
      { t: "Clear ask", d: "State the value, the ask, and the next step. No fluff." },
    ],
  },

  personality: {
    blurb: "Minsk · engines · RE · chips · space · clear asks. Soundtrack optional but recommended.",
    traits: [
      { t: "Systems taste", d: "C++ / engines / RE — correctness before cleverness." },
      { t: "Clear ask", d: "Lead with value, exact ask, easy next step." },
      { t: "Builder curiosity", d: "Chips, satellites, OSINT, BY/RU business reality." },
      { t: "Soundtrack", d: "Orchestra · Twin Atlantic · Halo — focus fuel." },
    ],
  },

  music: [
    { name: "Orchestra", note: "Favorite — atmospheric loops for deep work.", url: "https://open.spotify.com/search/Orchestra", tags: ["focus", "fav"] },
    { name: "Twin Atlantic", note: "Favorite — energy for shipping nights.", url: "https://open.spotify.com/search/Twin%20Atlantic", tags: ["energy", "fav"] },
    { name: "Halo (OST / vibe)", note: "Favorite — epic calm for long R&D.", url: "https://open.spotify.com/search/Halo%20soundtrack", tags: ["epic", "fav"] },
    { name: "Find more like these", note: "Ask any AI for similar artists + focus playlists.", url: "https://open.spotify.com/", tags: ["search"] },
  ],

  signals: [
    { name: "LM Arena", url: "https://lmarena.ai", note: "Calibrate models, not vibes." },
    { name: "Artificial Analysis", url: "https://artificialanalysis.ai", note: "Speed / quality / price dashboards." },
    { name: "OpenRouter", url: "https://openrouter.ai", note: "Try models behind one API." },
    { name: "Hugging Face", url: "https://huggingface.co", note: "Models, datasets, spaces." },
  ],

  business: [
    { title: "Company ask / mailing", plain: "Email that gets a yes", prompt_id: "business_ask", note: "Intros, data, partnerships — clear next step." },
    { title: "BY / regional law research", plain: "Orientation for counsel", prompt_id: "by_law", note: "Not legal advice — prepare questions for a licensed expert." },
    { title: "Career / comp framing", plain: "Clear-ask leverage memo", prompt_id: "career_ask", note: "Before a review, offer, or hard conversation." },
  ],

  /* —— tools with full specs —— */
  daily_drivers: [
    {
      name: "Cursor",
      url: "https://cursor.com",
      tag: "ide",
      note: "Primary AI IDE. Agents, multi-file edits, cloud agents, rules/skills, PR loops.",
      tags: ["ide", "agent"],
      specs: { context: "200k tokens (context); ~50 files practical", speed: "Fast inline; cloud agents minutes", cost: "$20/mo Pro; usage caps apply", best: "Daily coding, multi-file refactors, agent loops" },
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
      specs: { context: "Depends on model; usually 128k–200k", speed: "CLI batch speed", cost: "Free tier + paid; bring your own keys", best: "Scriptable agent loops, CI integration, terminal-first workflows" },
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
      specs: { context: "~20 MB file drops; long threads", speed: "Slower deep research mode", cost: "~$20/mo Pro; top models can hit soft caps", best: "Dense PDFs, large dumps, multi-source research" },
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
      specs: { context: "Web + short context", speed: "Very fast", cost: "Free tier available", best: "Quick orientation, fact checks, fast lookups" },
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
      specs: { context: "128k (GPT-4o); 200k (o-series varies)", speed: "Fast for 4o; slower for o-reasoners", cost: "$20/mo Plus; higher tiers for power users", best: "General reasoning, writing, voice, quick prototypes" },
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
      specs: { context: "200k tokens", speed: "Opus slow; Sonnet fast", cost: "Pro $20/mo; API per-token", best: "Long docs, careful review, adversarial critique" },
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
      specs: { context: "1M+ tokens (Flash); 128k–1M depending on model", speed: "Flash is very fast", cost: "Free tier; API cheap per token", best: "Huge context, multimodal, fast first-pass scans" },
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
      specs: { context: "Web + uploaded files; ~5 MB", speed: "Fast", cost: "$20/mo Pro", best: "News, papers, market scans with citations" },
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
      specs: { context: "Limited to current file + nearby", speed: "Very fast inline", cost: "$10/mo individual; included in Pro", best: "Autocomplete, PR summaries, CLI suggestions" },
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
      specs: { context: "Varies by model", speed: "Queue-based", cost: "Free", best: "Calibrating model preference on your own tasks" },
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
      specs: { context: "Full TU + index", speed: "Fast after index", cost: "Free / open source", best: "C++ code intelligence, go-to-def, diagnostics" },
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
      specs: { context: "Single translation unit", speed: "Fast", cost: "Free; Patreon supports", best: "ASM proof, ABI checks, compiler behavior" },
      limits: [
        "Snippet tool — not your full engine build.",
        "Match flags/std to the real project or the asm story is fiction.",
      ],
    },
  ],

  /* —— model specs —— */
  models: [
    { name: "Claude Opus 4", use: "Deep review, architecture, careful refactors, long docs", context: "200k", speed: "Slow", cost: "$15 / 1M in · $75 / 1M out", best: "High-stakes correctness" },
    { name: "Claude Sonnet 4", use: "Daily coding, balanced reasoning", context: "200k", speed: "Fast", cost: "$3 / 1M in · $15 / 1M out", best: "Daily driver" },
    { name: "GPT-4o", use: "Broad reasoning, tool use, product + code hybrid", context: "128k", speed: "Fast", cost: "$2.50 / 1M in · $10 / 1M out", best: "General daily driver" },
    { name: "GPT-5", use: "Latest frontier reasoning", context: "128k–256k", speed: "Medium", cost: "Tiered; check OpenAI pricing", best: "Frontier tasks" },
    { name: "o3 / o4-mini", use: "Hard reasoning, math, coding contests", context: "200k", speed: "Slow", cost: "Higher per token", best: "Hard reasoning" },
    { name: "Gemini 2.5 Pro", use: "Huge context reasoning, multimodal", context: "1M", speed: "Medium", cost: "Low per token", best: "Long docs & multimodal" },
    { name: "Gemini 2.5 Flash", use: "Fast huge-context drafts", context: "1M", speed: "Very fast", cost: "Very low", best: "Volume scans" },
    { name: "DeepSeek-V3 / R1", use: "Cost-efficient coding & CN-ecosystem know-how", context: "64k–128k", speed: "Fast", cost: "Very low", best: "Volume + value" },
    { name: "Qwen 2.5 / 3", use: "Open multilingual coding models", context: "128k", speed: "Fast", cost: "Low", best: "Open models, local/volume" },
    { name: "Kimi k1.5", use: "Long-context Chinese docs", context: "200k–2M", speed: "Medium", cost: "Low", best: "Long Chinese documents" },
    { name: "Local (Ollama / llama.cpp)", use: "Private notes, offline drafts, sensitive snippets", context: "Depends on model / VRAM", speed: "Depends on hardware", cost: "Hardware only", best: "Air-gapped or privacy" },
  ],

  /* —— context calc config —— */
  calc_models: [
    { id: "gpt4o", name: "GPT-4o", ctx: 128000, in: 2.50, out: 10.0 },
    { id: "claude_sonnet", name: "Claude Sonnet 4", ctx: 200000, in: 3.0, out: 15.0 },
    { id: "claude_opus", name: "Claude Opus 4", ctx: 200000, in: 15.0, out: 75.0 },
    { id: "gemini_flash", name: "Gemini 2.5 Flash", ctx: 1000000, in: 0.15, out: 0.60 },
    { id: "gemini_pro", name: "Gemini 2.5 Pro", ctx: 1000000, in: 1.25, out: 10.0 },
    { id: "deepseek", name: "DeepSeek-V3", ctx: 64000, in: 0.27, out: 1.10 },
    { id: "local", name: "Local 7B", ctx: 32000, in: 0, out: 0 },
  ],

  /* —— layers —— */
  layers: [
    { name: "AGENTS.md / rules", job: "Ambient how-we-work", load: "Always (or glob-matched)", put: "AGENTS.md, .cursor/rules/*.mdc", example: "Boost snake_case; no UB; run tests before done" },
    { name: "Skills", job: "Invokable multi-step SOP", load: "On demand (/skill or @skill)", put: ".cursor/skills/, .agents/skills/, .opencode/skills/", example: "regenerate compile_commands → index → smoke test" },
    { name: "MCP", job: "Live tools & external data", load: "After server connect", put: "mcp.json / opencode.json mcp / Cursor MCP settings", example: "github, fetch, browser, custom domain APIs" },
    { name: "Hooks", job: "Deterministic lifecycle scripts", load: "On event (cannot be ignored)", put: ".cursor/hooks / tool-specific hooks", example: "format on edit, block commit if secrets" },
  ],

  agent_dirs: [
    { path: "AGENTS.md", tools: "Cursor, OpenCode, Codex, Copilot, Gemini CLI, Aider, …", what: "Cross-tool project brain. Build/test/style/PR rules for agents.", tip: "Commit it. Nest per package in monorepos. Closest file wins." },
    { path: ".cursor/rules/*.mdc", tools: "Cursor", what: "Scoped rules with YAML frontmatter (globs, alwaysApply, description).", tip: "Split by domain. Keep each < 500 lines. Prefer over legacy .cursorrules." },
    { path: ".cursor/skills/<name>/SKILL.md", tools: "Cursor (+ reads .agents/.claude/.codex skills)", what: "Invokable workflows. Progressive disclosure: name/desc → full SOP.", tip: "Use for deploy, compile_commands refresh, release checklists." },
    { path: ".agents/skills/", tools: "Cross-tool / Cursor compatible", what: "Portable skills root when you want tool-agnostic layout.", tip: "Good default if team mixes Cursor + Claude Code + Codex." },
    { path: ".opencode/ + opencode.json", tools: "OpenCode", what: "agents/, commands/, skills/, plugins/, themes/ + MCP config.", tip: "Run /init to scaffold AGENTS.md. Prefer AGENTS.md over CLAUDE.md." },
    { path: "CLAUDE.md", tools: "Claude Code (fallback)", what: "Claude-specific instructions if AGENTS.md missing.", tip: "Symlink CLAUDE.md → AGENTS.md to avoid drift." },
    { path: ".github/workflows/", tools: "All agents that ship", what: "CI truth. Agents should read and keep green.", tip: "Document required checks in AGENTS.md." },
    { path: "compile_commands.json", tools: "clangd + any C++ agent", what: "Per-file compile flags. Without it, C++ agents guess wrong.", tip: "CMake: -DCMAKE_EXPORT_COMPILE_COMMANDS=ON; symlink to repo root." },
    { path: ".mcp.json / mcp config", tools: "Cursor, OpenCode, Claude, …", what: "Which MCP servers, env, least-privilege tokens.", tip: "Never commit secrets. Describe tools so agents can choose them." },
    { path: ".ai/ (informal)", tools: "Some teams / custom", what: "Ad-hoc prompts, evals, golden tasks — not a universal standard.", tip: "Prefer AGENTS.md + .agents/skills for portability; use .ai for extras." },
  ],

  skills_guide: {
    blurb: "Skills are on-demand playbooks. Rules are always-on constraints. If you find yourself re-explaining a 15-step ritual every chat — that is a skill, not a rule.",
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
    blurb: "MCP (Model Context Protocol) exposes tools to agents — filesystem, GitHub, fetch, browsers, custom APIs. Skills tell the agent how to sequence tools you already have; MCP adds new tools.",
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
    { title: "Ground in compile_commands.json", body: "CMake: -DCMAKE_EXPORT_COMPILE_COMMANDS=ON. Symlink/copy to repo root (or build/). Without this, agents and clangd invent flags and include paths." },
    { title: "Ask for godbolt / asm proof", body: "For ABI, inlining, or 'this is free' claims — demand Compiler Explorer links or local -S output. Trust measurements over vibes." },
    { title: "Lifetime & concurrency first", body: "Review order: UB → lifetime/ownership → data races → API/ABI → alloc/cache → tests. Style last." },
    { title: "Small diffs, buildable steps", body: "Prefer agent PRs that compile at each step. Giant refactors hide regressions in game engines." },
    { title: "Pin toolchain in AGENTS.md", body: "Document compiler, C++ standard, sanitizers, and the exact build/test commands agents must run." },
    { title: "Sanitizers as truth", body: "ASan/TSan/UBSan beats a confident model. Put sanitizer recipes in a skill." },
  ],

  organization: [
    { title: "One brain file", body: "Root AGENTS.md = source of truth. Cursor-only globs go in .cursor/rules. Don't duplicate paragraphs in three places." },
    { title: "Skills for rituals", body: "Anything > ~8 steps or rarely needed → skill. Keeps ambient context thin and cheap." },
    { title: "Prompt library in-repo", body: "Version prompts next to work (or here in data.js for personal OS). If it worked once, templatize {{vars}}." },
    { title: "Parallel threads → one memo", body: "Fan out research (N chats/tools), then synthesize once. Arenas settle model disagreements." },
    { title: "Human gates", body: "AI may draft commits/PRs; you gate secrets, licenses, security, public statements, ABI breaks." },
    { title: "Golden tasks", body: "Keep 5–10 eval prompts. Re-run when switching models. Update priors from LM Arena + Artificial Analysis." },
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
      body: `You are a senior engineer pair-programmer.\n\nGOAL:\n{{goal}}\n\nCONSTRAINTS:\n- Language/stack: {{stack}}\n- Must not: {{must_not}}\n- Performance / safety bar: {{bar}}\n\nDELIVERABLES:\n1. Clarifying questions (max 5) if anything is ambiguous\n2. Minimal design (bullets)\n3. Implementation plan (ordered steps)\n4. Then code — only after I approve the plan\n\nToday: {{date}}. Prefer correctness over cleverness.`,
    },
    {
      id: "pr_review",
      title: "PR review (systems / C++)",
      cat: "review",
      tags: ["review", "cpp", "github"],
      body: `Review this PR as a staff C++ systems engineer.\n\nFocus order:\n1. Correctness / UB / lifetime / concurrency\n2. API & ABI impact\n3. Perf hot paths (allocations, cache, syscalls)\n4. Test gaps\n5. Style only if it hurts clarity\n\nOutput format:\n- Summary (3 lines)\n- Blockers\n- Suggestions (non-blocking)\n- Test plan I should run\n- Risk score 1–5 with reason\n\nDiff / context:\n{{diff}}`,
    },
    {
      id: "agents_md",
      title: "Draft AGENTS.md for this repo",
      cat: "agent",
      tags: ["agent", "agents_md", "org"],
      body: `Draft a root AGENTS.md for this repository (open format: https://agents.md/).\n\nInclude:\n- Project overview (1 short para)\n- Setup / toolchain (compilers, package managers)\n- Build commands\n- Test / lint / format commands\n- Code style (Boost snake_case for C++; note exceptions)\n- PR & commit expectations\n- Security / secrets rules\n- Where nested AGENTS.md live (if monorepo)\n\nStyle: laconic bullets agents can execute. No marketing.\nDate: {{date}}.`,
    },
    {
      id: "skill_author",
      title: "Author a Cursor / agents skill",
      cat: "agent",
      tags: ["agent", "skills"],
      body: `Create a SKILL.md for: {{goal}}\n\nPath suggestion: .cursor/skills/{{slug}}/SKILL.md (also fine: .agents/skills/)\n\nRequirements:\n- YAML frontmatter: name, description (trigger-rich)\n- Step-by-step SOP with exact commands\n- Failure modes & rollback\n- Done criteria checklist\n- Keep full body under ~5000 tokens; put deep refs in references/\n\nOutput the full file contents ready to save.`,
    },
    {
      id: "mcp_design",
      title: "MCP tool design brief",
      cat: "mcp",
      tags: ["mcp", "agent", "tooling"],
      body: `Design an MCP server for: {{purpose}}.\n\nInclude:\n- Tools (name, params schema, side effects)\n- Auth / egress constraints\n- Failure modes & retries\n- How an agent should sequence calls\n- Minimal golden-path example\n\nOptimize for least privilege and clear descriptions (agents read descriptions).`,
    },
    {
      id: "cursor_kickoff",
      title: "Cursor / cloud agent kickoff",
      cat: "agent",
      tags: ["agent", "cursor", "coding"],
      body: `Repo context: systems / game-engine R&D + portfolio-adjacent tools.\n\nTask: {{task}}\nBranch naming: cursor/<slug>-xxxx\nDone means:\n- [ ] Code compiles / site builds\n- [ ] CI green or explained\n- [ ] Commit + push\n- [ ] PR with concise why\n\nPrefer official GitHub Actions (actions/checkout, configure-pages, upload-pages-artifact, deploy-pages).\nAvoid leading-underscore dir names; use snake_case identifiers.\nDo not ask me to run commands you can run. Report artifacts & URLs at the end.`,
    },
    {
      id: "opencode_init",
      title: "OpenCode project init",
      cat: "agent",
      tags: ["agent", "opencode"],
      body: `Initialize this repo for OpenCode.\n\n1. Propose AGENTS.md contents (or refine existing)\n2. Propose opencode.json: model defaults, MCP stubs, permissions\n3. Propose .opencode/agents/ for: review (read-only), implement, docs\n4. List skills worth adding under .opencode/skills/\n5. Show the exact file tree to create\n\nDo not invent secrets. Prefer AGENTS.md over CLAUDE.md.\nDate: {{date}}.`,
    },
    {
      id: "cpp_compdb",
      title: "C++ compile_commands bootstrap",
      cat: "cpp",
      tags: ["cpp", "clangd", "skills"],
      body: `Make this C++ project agent-ready for clangd.\n\nStack hints: {{stack}}\nBuild system: {{build}}\n\nDeliver:\n1. Exact commands to export compile_commands.json\n2. Where to place/symlink it for clangd discovery\n3. How to verify (open a TU, check includes resolve)\n4. A SKILL.md "cpp-compdb" to regenerate after toolchain changes\n5. Notes for cross-compilers / query-driver if needed\n\nToday: {{date}}.`,
    },
    {
      id: "cpp_perf",
      title: "C++ hot-path investigation",
      cat: "cpp",
      tags: ["cpp", "perf"],
      body: `Investigate performance for: {{goal}}\n\nConstraints: {{bar}}\n\nPlan:\n1. Hypotheses ranked by ROI\n2. Instrumentation (timers, tracy/perf, counters)\n3. Allocation / cache / branch suspects\n4. Proposed micro-benchmarks\n5. What would falsify each hypothesis\n\nNo drive-by refactors. Measure before claiming wins.`,
    },
    {
      id: "multithread",
      title: "Multi-thread research fan-out",
      cat: "research",
      tags: ["research", "osint", "planning"],
      body: `Topic: {{topic}}\nDate: {{date}}\n\nSpawn N parallel research tracks (N={{n|4}}). For each track return:\n- Angle name\n- Key claims (with uncertainty)\n- Best sources / queries to run next\n- What would falsify it\n\nThen synthesize:\n- Consensus\n- Contested points\n- Actionable next steps for me (engineer in Minsk, game-engine + RE context)`,
    },
    {
      id: "re_brief",
      title: "Reverse engineering brief",
      cat: "reveng",
      tags: ["reveng", "cpp", "security"],
      body: `Act as a careful reverse engineer. Legal / ethical scope only: {{scope}}.\n\nTarget class: {{target}}\nKnown facts: {{known}}\n\nProduce:\n1. Threat model & assumptions\n2. Artifact map (binaries, formats, protocols)\n3. Tooling plan (static → dynamic → differential)\n4. Hypotheses ranked by ROI\n5. Red lines (what not to do)\n6. Report template headings\n\nPrefer IDA/Ghidra/Binary Ninja mental models; keep steps reproducible.`,
    },
    {
      id: "engine_digest",
      title: "Game engine daily digest",
      cat: "digest",
      tags: ["gamedev", "engine", "digest"],
      body: `Daily digest for {{date}} — game engines & rendering.\n\nScan & summarize (bullet, laconic):\n- Engine news (Unreal / Unity / custom / open)\n- Rendering & GPU (Vulkan/D3D12/Metal, mesh shaders, RT)\n- Physics / animation / tooling\n- Notable open-source commits or papers\n- One thing I should try in my R&D this week\n\nStyle: engineer notes, not blog. Include links when known.`,
    },
    {
      id: "osint_digest",
      title: "OSINT / geopolitics digest",
      cat: "digest",
      tags: ["osint", "politeconomy", "digest"],
      body: `OSINT + political economy digest for {{date}}.\n\nRegions of interest: Belarus, Russia, broader CEE / tech sanctions landscape.\nThemes: industry, dual-use tech, infra, capital flows, open sources.\n\nRules:\n- Separate fact / claim / rumor\n- Cite type of source (official, OSINT, media, leak)\n- Note bias & confidence\n- End with 3 implications for an engineer/builder`,
    },
    {
      id: "space_digest",
      title: "Space / satellites digest",
      cat: "digest",
      tags: ["space", "satellites", "digest"],
      body: `Astronomy · satellites · space systems digest — {{date}}.\n\nCover:\n- Launch & constellation news\n- Earth observation / SAR / SIGINT-relevant civilian tech\n- Open datasets & software (Orekit, GMAT, SatNOGS, …)\n- One learning rabbit-hole with a concrete tutorial or repo\n\nKeep it technical. Skip hype.`,
    },
    {
      id: "electronics",
      title: "Electronics / embedded prompt",
      cat: "electronics",
      tags: ["electronics", "embedded"],
      body: `Embedded / electronics assistant.\n\nBoard / MCU: {{mcu}}\nGoal: {{goal}}\nConstraints: power, interfaces, toolchain = {{constraints}}\n\nReturn:\n- Block diagram (ASCII)\n- Pin / bus plan\n- Firmware architecture\n- Bring-up checklist\n- Common failure modes\n- Test equipment list`,
    },
    {
      id: "chinese_sop",
      title: "Chinese-style SOP agent (角色+流程)",
      cat: "practice",
      tags: ["practice", "agent", "planning"],
      body: `你是「资深{{role}}」。严格按 SOP 执行，不要跳步。\n\n【角色】专业、直接、先结论后证据。\n【目标】{{goal}}\n【输入】{{input}}\n【流程】\n1. 澄清（最多 5 个问题；若信息足够则跳过）\n2. 拆解任务为可执行子任务\n3. 并行思路：哪些可同时做\n4. 产出物按格式交付\n5. 自检清单（正确性 / 遗漏 / 风险）\n\n【输出格式】\n- 结论\n- 步骤\n- 交付物\n- 风险与验证\n\n日期：{{date}}。用中文或英文（跟我输入语言）。`,
    },
    {
      id: "chips_digest",
      title: "Microchips daily digest",
      cat: "digest",
      tags: ["chips", "electronics", "digest"],
      body: `Microchips / silicon digest — {{date}}.

Cover (laconic bullets):
- Foundry & packaging news
- GPU / NPU / edge silicon
- Export controls & supply shocks relevant to BY/RU/CEE
- One open tool / paper worth opening
- One implication for game-engine or embedded work

Style: engineer notes. Skip hype.`,
    },
    {
      id: "business_ask",
      title: "Company ask / mailing",
      cat: "business",
      tags: ["business", "mailing"],
      body: `Write a clear, polite, high-agency email in {{lang|English}}.

From: Evgeniy Gleba — C++ systems / game engine R&D (Minsk)
To: {{company}}
Goal: {{goal}}
Tone: professional, concise, no fluff — clear value, clear ask, easy next step.

Include:
- 2-line context who I am
- Exact ask
- Why it is easy for them to say yes
- Concrete next step + timing
- Soft close

Date: {{date}}`,
    },
    {
      id: "by_law",
      title: "Belarus / regional law research",
      cat: "business",
      tags: ["law", "belarus", "research"],
      body: `You are assisting with legal *research orientation* (not legal advice).

Jurisdiction focus: Belarus (+ comparative RU/EE if useful)
Question: {{goal}}
Known facts: {{known}}

Deliver:
1. Issue map (what branches of law)
2. Primary sources to check (codes, decrees, registries)
3. Practical questions for a licensed BY counsel
4. Red flags / common pitfalls for tech builders
5. What an engineer should *not* DIY

Separate: fact vs interpretation. Date: {{date}}.`,
    },
    {
      id: "career_ask",
      title: "Career / comp framing",
      cat: "business",
      tags: ["career", "business"],
      body: `Help me think with clear value and a clear ask — no fluff, no cope.

Context: C++ systems / game-engine R&D eng in Minsk.
Situation: {{goal}}

Return:
- What leverage I actually have
- What to ask for (comp / scope / title / remote) with ranges as hypotheses
- Script for the conversation
- What evidence to collect this week
- Kill criteria if the deal is bad

Date: {{date}}. Direct tone.`,
    },
    {
      id: "fillers",
      title: "Context fillers (drop into any chat)",
      cat: "filler",
      tags: ["filler", "identity"],
      body: `About me (reuse):\n- Evgeniy Gleba — C++ systems / game engine R&D engineer (Lesta Games, Minsk)\n- Interests: custom engines, RE, electronics, OSINT, space/satellites, BY/RU tech business, open source\n- AI stack: Cursor, OpenCode, You.com, Scira, Claude/GPT/Gemini, LM Arena for calibration\n- Working style: spec-first, AGENTS.md + skills + MCP layers, parallel research, verify everything\n- Date context: {{date}}`,
    },
  ],

  templates: [
    {
      id: "agents_md_template",
      title: "AGENTS.md starter (C++ / systems)",
      body: `# AGENTS.md\n\n## Overview\nC++ systems / game-engine R&D. Prefer correctness, measurable perf, and small reviewable diffs.\n\n## Toolchain\n- Compiler / standard: <fill>\n- Build: cmake -G Ninja -DCMAKE_EXPORT_COMPILE_COMMANDS=ON ...\n- Symlink compile_commands.json to repo root for clangd\n\n## Commands\n- Configure: <fill>\n- Build: <fill>\n- Test: <fill>\n- Format / lint: <fill>\n\n## Style\n- Boost-like snake_case for functions, variables, files\n- No leading-underscore public API names\n- Ownership explicit (unique/shared/span); no naked owning raw new/delete in new code\n\n## Agent rules\n- Spec first for non-trivial tasks\n- Run tests you can run; fix failures before claiming done\n- Do not invent credentials; do not commit secrets\n- Prefer official GitHub Actions for Pages/CI\n\n## PR\n- Clear why + test plan\n- Call out ABI / save-format / protocol risks\n`,
    },
    {
      id: "skill_template",
      title: "SKILL.md starter",
      body: `---\nname: cpp-compdb\ndescription: Regenerate compile_commands.json for this CMake project and verify clangd can resolve includes. Use when agents lack code intelligence or after toolchain changes.\n---\n\n# cpp-compdb\n\n## Steps\n1. Configure with compile commands export\n2. Symlink/copy compile_commands.json to repo root\n3. Open a known TU and confirm includes resolve\n4. Report paths and any missing flags\n\n## Done\n- [ ] compile_commands.json present at expected path\n- [ ] Sample file resolves core headers\n- [ ] Commands documented in AGENTS.md if changed\n`,
    },
    {
      id: "cursor_rule_template",
      title: ".cursor/rules snippet (.mdc)",
      body: `---\ndescription: C++ systems conventions for this repo\nglobs:\n  - "**/*.{cpp,hpp,h,cc,cxx}"\nalwaysApply: false\n---\n\n# C++ conventions\n- Snake_case identifiers (Boost style)\n- Prefer spans / string_view at API boundaries when lifetimes are clear\n- Document thread-safety on shared types\n- No drive-by refactors outside the task scope\n`,
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

  /* —— decision trees —— */
  decisions: [
    {
      id: "pick_model",
      title: "Which model should I use?",
      subtitle: "A context/cost/correctness decision tree",
      root: {
        q: "What matters most?",
        children: [
          {
            a: "Highest correctness",
            q: "Is it code / systems work?",
            children: [
              { a: "Yes", result: "Claude Opus 4 or Sonnet 4. Ground with files + compile_commands." },
              { a: "No", result: "Claude Opus 4 for long docs; GPT-5 for general reasoning." },
            ],
          },
          {
            a: "Huge context",
            q: "Need multimodal too?",
            children: [
              { a: "Yes", result: "Gemini 2.5 Pro / Flash — 1M context, images/video OK." },
              { a: "No", result: "Claude 200k or Gemini Flash for cheap long scans." },
            ],
          },
          {
            a: "Lowest cost / volume",
            q: "Quality bar?",
            children: [
              { a: "Acceptable quality", result: "DeepSeek-V3, Qwen 2.5, Gemini Flash." },
              { a: "High quality", result: "Sonnet 4 or Gemini Pro — still cheaper than Opus." },
            ],
          },
          {
            a: "Privacy / offline",
            result: "Local Ollama / llama.cpp. Pick model by your VRAM.",
          },
        ],
      },
    },
    {
      id: "pick_tool",
      title: "Which AI tool for the job?",
      subtitle: "IDE vs search vs chat vs agent",
      root: {
        q: "What are you doing?",
        children: [
          {
            a: "Writing / editing code",
            q: "Multi-file or single file?",
            children: [
              { a: "Multi-file", result: "Cursor or OpenCode with AGENTS.md." },
              { a: "Single file / autocomplete", result: "GitHub Copilot or Cursor inline." },
            ],
          },
          {
            a: "Research / reading",
            q: "How big are the sources?",
            children: [
              { a: "Huge PDFs / dumps", result: "You.com (up to ~20MB)." },
              { a: "Quick lookup / citations", result: "Scira, Perplexity, or Gemini grounded search." },
            ],
          },
          {
            a: "Review / critique",
            result: "Claude for careful review; Cursor agent for in-repo diff review.",
          },
          {
            a: "Deploy / CI loop",
            result: "OpenCode + MCP GitHub, or Cursor cloud agent.",
          },
        ],
      },
    },
    {
      id: "context_or_skill",
      title: "Rule, skill, or MCP?",
      subtitle: "How to layer agent instructions",
      root: {
        q: "How often does the agent need it?",
        children: [
          { a: "Every message", result: "Rule (AGENTS.md / .cursor/rules). Keep short." },
          {
            a: "On specific tasks",
            q: "Is it a procedure with many steps?",
            children: [
              { a: "Yes", result: "Skill (.cursor/skills or .agents/skills)." },
              { a: "No", result: "Prompt template or short rule." },
            ],
          },
          {
            a: "Needs live data / external action",
            result: "MCP server. Design schemas first, least privilege.",
          },
        ],
      },
    },
    {
      id: "ship_or_spike",
      title: "Ship now or spike first?",
      subtitle: "Risk-based task routing",
      root: {
        q: "Do you understand the problem and solution?",
        children: [
          {
            a: "Yes",
            q: "Is the change risky (ABI, security, perf, public API)?",
            children: [
              { a: "Yes", result: "Spec + review pipeline. Use Claude/Opus for review." },
              { a: "No", result: "Cursor/OpenCode implement with tests." },
            ],
          },
          {
            a: "No",
            q: "Is it a research or engineering unknown?",
            children: [
              { a: "Research unknown", result: "Hard research pipeline first." },
              { a: "Engineering unknown", result: "Time-boxed spike → decision memo." },
            ],
          },
        ],
      },
    },
  ],

  practices: [
    { title: "角色 → 目标 → 格式 → 自检", body: "Chinese top-tier pattern: lock role, lock goal, lock output schema, then self-check. Most quality jumps come from format + critique, not longer prompts." },
    { title: "Critique loop", body: "Draft → adversary pass → fix pass. Separate the creator and the critic (two chats or two roles)." },
    { title: "Context hygiene", body: "Paste only the slice that matters. Dumping whole repos burns attention; link paths and cite symbols." },
    { title: "Rules thin, skills thick", body: "Ambient rules stay short. Put long SOPs in skills so everyday chats stay cheap." },
    { title: "Eval over vibes", body: "Keep golden tasks. Re-run when switching models. Use arenas to update priors." },
    { title: "Prompt as code", body: "Version prompts. If it worked once, it becomes a template with {{vars}}." },
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
    { id: "chips", title: "Microchips", icon: "▣", topics: ["Foundry news", "GPU / NPU silicon", "Export controls", "Supply & packaging", "Open tooling"], prompt_id: "chips_digest" },
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
    { group: "Soundtrack", links: [
      { n: "Orchestra", u: "https://open.spotify.com/search/Orchestra" },
      { n: "Twin Atlantic", u: "https://open.spotify.com/search/Twin%20Atlantic" },
      { n: "Halo OST", u: "https://open.spotify.com/search/Halo%20soundtrack" },
    ]},
    { group: "Law / research (BY)", links: [
      { n: "pravo.by", u: "https://pravo.by" },
      { n: "etalonline.by", u: "https://etalonline.by" },
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
    { day: 3, focus: "Chips & silicon", hint: "Foundry, GPU/NPU, export controls", prompt_id: "chips_digest" },
    { day: 4, focus: "OSINT / politeconomy", hint: "BY·RU · sanctions · industry", prompt_id: "osint_digest" },
    { day: 5, focus: "Space & astronomy", hint: "Orbits, EO, open tools", prompt_id: "space_digest" },
    { day: 6, focus: "Career & clear asks", hint: "Leverage memo + mailings", prompt_id: "career_ask" },
  ],
};
