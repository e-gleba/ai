/* e-gleba /ai — content library. Edit here; UI renders from this. */
window.AI_DATA = {
  meta: {
    brand: "e-gleba",
    title: "AI Operating System",
    tagline: "Personal cheatsheet — prompts, tools, pipelines, digests. Built to revise how I work.",
    person: "Evgeniy Gleba",
    role: "C++ Systems Engineer · Game Engine R&D",
    where: "Lesta Games · Minsk",
    portfolio: "https://e-gleba.github.io",
    github: "https://github.com/e-gleba",
  },

  identity: {
    blurb:
      "Engineer who treats AI as a force multiplier for systems work — game engines, reverse engineering, OSINT, space, and regional tech/business context. This page is my living playbook: what to use, how to prompt, how to ship.",
    pillars: [
      { t: "Spec first", d: "Write the contract before the chat. Ambiguity is the tax." },
      { t: "Parallel threads", d: "One task ≠ one chat. Fan out research, synthesize once." },
      { t: "Verify always", d: "AI drafts. I own correctness, perf, and security." },
      { t: "Capture & reuse", d: "Prompts, SOPs, and fillers become assets — not one-offs." },
    ],
  },

  dailyDrivers: [
    { name: "Cursor", url: "https://cursor.com", tag: "ide", note: "Primary AI IDE. Agents, multi-file edits, cloud agents, PR review loops.", tags: ["ide", "agent"] },
    { name: "OpenCode", url: "https://opencode.ai", tag: "cli", note: "Terminal-native coding agent. Fast loops for scripts & infra.", tags: ["cli", "agent"] },
    { name: "You.com", url: "https://you.com", tag: "search", note: "Research + citations. Good for quick multi-source digests.", tags: ["research", "search"] },
    { name: "Scira.ai", url: "https://scira.ai", tag: "search", note: "Minimalist AI search. Clean answers when I want signal over chrome.", tags: ["research", "search"] },
    { name: "ChatGPT", url: "https://chatgpt.com", tag: "chat", note: "General reasoning, writing, light coding, voice.", tags: ["chat", "general"] },
    { name: "Claude", url: "https://claude.ai", tag: "chat", note: "Long-context analysis, careful editing, PR/spec reviews.", tags: ["chat", "review"] },
    { name: "Gemini", url: "https://gemini.google.com", tag: "chat", note: "Multimodal + Google-grounded research.", tags: ["chat", "research"] },
    { name: "Perplexity", url: "https://www.perplexity.ai", tag: "search", note: "Cited answers for news, papers, market scans.", tags: ["research", "search"] },
    { name: "GitHub Copilot", url: "https://github.com/features/copilot", tag: "ide", note: "Inline + PR summaries inside GitHub.", tags: ["ide", "github"] },
    { name: "LM Arena", url: "https://lmarena.ai", tag: "arena", note: "Blind model battles — calibrate taste vs hype.", tags: ["arena", "models"] },
  ],

  models: [
    { name: "Claude Opus / Sonnet", use: "Deep review, architecture, careful refactors, long docs", when: "High-stakes correctness" },
    { name: "GPT-5.x / o-series", use: "Broad reasoning, tool use, product + code hybrid tasks", when: "General daily driver" },
    { name: "Gemini 2.x / Flash", use: "Huge context, multimodal, fast drafts", when: "Docs dumps & scans" },
    { name: "DeepSeek / Qwen / Kimi", use: "Cost-efficient coding & Chinese-ecosystem know-how", when: "Volume + value" },
    { name: "Local (Ollama / llama.cpp)", use: "Private notes, offline drafts, sensitive snippets", when: "Air-gapped or privacy" },
  ],

  arenas: [
    { name: "LM Arena", url: "https://lmarena.ai", note: "Blind pairwise chat battles" },
    { name: "Artificial Analysis", url: "https://artificialanalysis.ai", note: "Speed, quality, price dashboards" },
    { name: "LMSYS Chatbot Arena", url: "https://chat.lmsys.org", note: "Classic arena leaderboard" },
    { name: "Hugging Face Open LLM", url: "https://huggingface.co/spaces/open-llm-leaderboard/open_llm_leaderboard", note: "Open model benchmarks" },
    { name: "LiveCodeBench", url: "https://livecodebench.github.io", note: "Coding contamination-aware bench" },
    { name: "Arena Hard / AEI", url: "https://github.com/lmarena/arena-hard-auto", note: "Hard-prompt eval kits" },
  ],

  prompts: [
    {
      id: "spec-first",
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
      id: "pr-review",
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
      id: "re-brief",
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
      id: "engine-digest",
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
      id: "osint-digest",
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
      id: "space-digest",
      title: "Space / satellites digest",
      cat: "digest",
      tags: ["space", "satellites", "digest"],
      body: `Astronomy · satellites · space systems digest — {{date}}.

Cover:
- Launch & constellation news
- Earth observation / SAR / SIGINT-relevant civilian tech
- Open datasets & software ( Orekit, GMAT, SatNOGS, etc.)
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
      id: "chinese-sop",
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
      id: "cursor-agent",
      title: "Cursor / cloud agent kickoff",
      cat: "agent",
      tags: ["agent", "cursor", "coding"],
      body: `Repo context: portfolio-adjacent AI cheatsheet / systems R&D.

Task: {{task}}
Branch naming: cursor/<slug>-xxxx
Done means:
- [ ] Code compiles / site builds
- [ ] CI green or explained
- [ ] Commit + push
- [ ] PR with concise why

Prefer official GitHub Actions (actions/checkout, configure-pages, upload-pages-artifact, deploy-pages). Avoid inventing custom deploy scripts.

Do not ask me to run commands you can run. Report artifacts & URLs at the end.`,
    },
    {
      id: "mcp-design",
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
      id: "fillers",
      title: "Context fillers (drop into any chat)",
      cat: "filler",
      tags: ["filler", "identity"],
      body: `About me (reuse):
- Evgeniy Gleba — C++ systems / game engine R&D engineer (Lesta Games, Minsk)
- Interests: custom engines, RE, electronics, OSINT, space/satellites, BY/RU tech business, open source
- AI stack: Cursor, OpenCode, You.com, Scira, Claude/GPT/Gemini, LM Arena for calibration
- Working style: spec-first, parallel research threads, verify everything, capture prompts as assets
- Date context: {{date}}`,
    },
  ],

  pipelines: [
    {
      title: "Idea → Spec → Agent → PR",
      steps: ["One-pager goal + constraints", "Prompt library kickoff", "Cloud/local agent implements", "CI + self-review checklist", "Human merge"],
      note: "Default shipping loop. Never skip the one-pager.",
    },
    {
      title: "PR review pipeline",
      steps: ["Bot summary", "Model review with PR prompt", "Human focus on blockers", "Request changes / approve", "Post-merge watch CI"],
      note: "AI accelerates; you own ABI, UB, and product risk.",
    },
    {
      title: "Research fan-out",
      steps: ["Frame question", "N parallel chats/tools", "Arena-check model disagreement", "Synthesize memo", "Park links in bookmark map"],
      note: "Use You/Scira/Perplexity + one strong reasoner.",
    },
    {
      title: "MCP-backed agent",
      steps: ["Define tools & schemas", "Least-privilege tokens", "Golden path script", "Eval on 5 real tasks", "Document failure modes"],
      note: "If the agent can't explain the tool, the description is wrong.",
    },
  ],

  mcps: [
    { name: "filesystem / repo", use: "Read-write scoped workspace for agents" },
    { name: "github", use: "Issues, PRs, checks — review & ship loops" },
    { name: "browser / fetch", use: "Docs & arena pages when allowed by egress" },
    { name: "search", use: "You / Scira / web — grounded research" },
    { name: "cursor-cloud", use: "Run metadata, env, agent diagnostics" },
    { name: "custom domain MCP", use: "Game data, sat APIs, internal tools — design per mcp-design prompt" },
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
      title: "Eval over vibes",
      body: "Keep 5–10 golden tasks. Re-run when switching models. Use LM Arena + Artificial Analysis to update priors.",
    },
    {
      title: "Human gates",
      body: "AI may draft commits/PRs; you gate secrets, licenses, security, and public statements.",
    },
    {
      title: "Prompt as code",
      body: "Version prompts next to the work. If it worked once, it becomes a template with {{vars}}.",
    },
  ],

  digests: [
    { id: "engine", title: "Game engines", icon: "◆", topics: ["Unreal / custom engines", "Vulkan · D3D12 · Metal", "ECS · job systems", "Content pipelines", "Profiling & memory"], promptId: "engine-digest" },
    { id: "gamedev", title: "Game development", icon: "▶", topics: ["Gameplay systems", "Netcode mental models", "Tools for designers", "Build & CI for games", "Platform cert notes"], promptId: "engine-digest" },
    { id: "electronics", title: "Electronics", icon: "⚡", topics: ["MCU bring-up", "RF / sensors basics", "Power & PDN", "Firmware architecture", "Test benches"], promptId: "electronics" },
    { id: "reveng", title: "Reverse engineering", icon: "⬡", topics: ["Static / dynamic RE", "Formats & protocols", "Anti-tamper landscape", "Legal scope discipline", "Report writing"], promptId: "re-brief" },
    { id: "osint", title: "OSINT", icon: "◎", topics: ["Source grading", "GEOINT / SOCMINT basics", "Sanctions & dual-use", "Verification habits", "Briefing format"], promptId: "osint-digest" },
    { id: "politeconomy", title: "Politeconomy", icon: "▣", topics: ["BY / RU industry", "Tech capital flows", "Regulation shocks", "Supply chains", "Scenario planning"], promptId: "osint-digest" },
    { id: "business", title: "BY / RU business", icon: "◈", topics: ["Local market reality", "Payments & infra", "Hiring & talent", "Risk matrix", "Builder playbooks"], promptId: "osint-digest" },
    { id: "rnd", title: "R&D", icon: "✳", topics: ["Hypothesis logs", "Spike → decide", "Paper → prototype", "Kill criteria", "Knowledge base"], promptId: "multithread" },
    { id: "opensource", title: "Open source", icon: "⎇", topics: ["Contribution etiquette", "License fitness", "Maintainer lens", "Release engineering", "Community signals"], promptId: "spec-first" },
    { id: "space", title: "Space & satellites", icon: "✦", topics: ["Orbits & constellations", "EO / SAR literacy", "Open ground software", "Radio & tracking", "Mission notes"], promptId: "space-digest" },
    { id: "astro", title: "Astronomy", icon: "☽", topics: ["Observation planning", "Data archives", "Astro software", "Citizen science", "Weekly sky hooks"], promptId: "space-digest" },
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
    { group: "Models & Arenas", links: [
      { n: "LM Arena", u: "https://lmarena.ai" },
      { n: "Artificial Analysis", u: "https://artificialanalysis.ai" },
      { n: "Hugging Face", u: "https://huggingface.co" },
      { n: "OpenRouter", u: "https://openrouter.ai" },
    ]},
    { group: "Engine / GPU", links: [
      { n: "GPUOpen", u: "https://gpuopen.com" },
      { n: "Vulkan Docs", u: "https://docs.vulkan.org" },
      { n: "Raph Levien blog", u: "https://raphlinus.github.io" },
      { n: "FG / Render papers", u: "https://papers.ssrn.com" },
    ]},
    { group: "RE & Security", links: [
      { n: "Ghidra", u: "https://ghidra-sre.org" },
      { n: "OSDev Wiki", u: "https://wiki.osdev.org" },
      { n: "Project Zero", u: "https://googleprojectzero.blogspot.com" },
      { n: "GTFOBins", u: "https://gtfobins.github.io" },
    ]},
    { group: "Space", links: [
      { n: "CelesTrak", u: "https://celestrak.org" },
      { n: "SatNOGS", u: "https://satnogs.org" },
      { n: "NASA SSD", u: "https://ssd.jpl.nasa.gov" },
      { n: "ESA EO", u: "https://earth.esa.int" },
    ]},
    { group: "OSINT", links: [
      { n: "Bellingcat", u: "https://www.bellingcat.com" },
      { n: "Liveuamap", u: "https://liveuamap.com" },
      { n: "OCCRP", u: "https://www.occrp.org" },
      { n: "Radar / ADS-B", u: "https://www.adsbexchange.com" },
    ]},
    { group: "Me", links: [
      { n: "Portfolio", u: "https://e-gleba.github.io" },
      { n: "GitHub", u: "https://github.com/e-gleba" },
      { n: "This page source", u: "https://github.com/e-gleba/ai" },
    ]},
  ],

  dailyThemes: [
    { day: 0, focus: "Systems & engines", hint: "Profiling, memory, rendering spikes", promptId: "engine-digest" },
    { day: 1, focus: "Reverse & security", hint: "One binary habit or paper", promptId: "re-brief" },
    { day: 2, focus: "Research fan-out", hint: "4-track synthesis memo", promptId: "multithread" },
    { day: 3, focus: "Electronics / embedded", hint: "Bring-up or RF literacy", promptId: "electronics" },
    { day: 4, focus: "OSINT / politeconomy", hint: "BY·RU · sanctions · industry", promptId: "osint-digest" },
    { day: 5, focus: "Space & astronomy", hint: "Orbits, EO, open tools", promptId: "space-digest" },
    { day: 6, focus: "Meta / tooling", hint: "Prompts, MCP, CI, arenas", promptId: "cursor-agent" },
  ],
};
