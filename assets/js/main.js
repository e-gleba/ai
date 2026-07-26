/* UI brain — Alpine + Fuse + vis-network. Content stays in data.js. */
(() => {
  const catalog = window.ai_data;
  if (!catalog) return;

  const hub_meta = [
    { id: "hub_core", label: "AI OS", group: "core", plain: "Your map of how to work with AI", detail: catalog.identity.blurb },
    { id: "hub_tools", label: "Tools", group: "tools", plain: "Apps opened every day", detail: "Cursor, OpenCode, search, arenas — the daily stack." },
    { id: "hub_prompts", label: "Prompts", group: "prompts", plain: "Ready-to-copy starters", detail: "Date-aware prompts for planning, review, research, digests." },
    { id: "hub_skills", label: "Skills", group: "skills", plain: "Repeatable playbooks", detail: catalog.skills_guide.blurb },
    { id: "hub_mcp", label: "MCP", group: "mcp", plain: "Live tools for agents", detail: catalog.mcp_guide.blurb },
    { id: "hub_dirs", label: "Folders", group: "dirs", plain: "Where agents look", detail: "AGENTS.md, .cursor/, .opencode/, compile_commands.json — the standard layout." },
    { id: "hub_cpp", label: "C++", group: "cpp", plain: "Systems engineering tips", detail: "compile_commands, godbolt proof, sanitizers, review order." },
    { id: "hub_specs", label: "Guides", group: "specs", plain: "Official docs & specs", detail: "AGENTS.md, Cursor, OpenCode, MCP, clangd — canonical links." },
    { id: "hub_digests", label: "Interests", group: "digests", plain: "Topics I follow", detail: "Engines, electronics, RE, OSINT, space, business." },
    { id: "hub_watch", label: "Watch", group: "watch", plain: "Where to look next", detail: "Changelogs, arenas, talks, OSINT, space feeds." },
    { id: "hub_org", label: "Organize", group: "org", plain: "Keep the system tidy", detail: "Thin rules, thick skills, human gates, golden tasks." },
  ];

  const colors = {
    core: "#ff6b9d",
    tools: "#ff8c42",
    prompts: "#5ec8ff",
    skills: "#3dd68c",
    mcp: "#c792ea",
    dirs: "#f0c674",
    cpp: "#7aa2f7",
    specs: "#bb9af7",
    digests: "#e0af68",
    watch: "#9ece6a",
    org: "#ff9e64",
  };

  const fill_vars = (tpl, extra = {}) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const map = {
      date,
      goal: "<goal>",
      stack: "C++ / systems",
      build: "CMake + Ninja",
      must_not: "<constraints>",
      bar: "no UB; measure hot paths",
      diff: "<paste diff or PR URL>",
      topic: "<topic>",
      n: "4",
      scope: "authorized research only",
      target: "<target class>",
      known: "<known facts>",
      mcu: "<MCU / board>",
      constraints: "<power / buses / toolchain>",
      role: "系统工程师",
      input: "<input>",
      task: "<task>",
      purpose: "<purpose>",
      slug: "my-skill",
      ...extra,
    };
    return String(tpl || "").replace(/\{\{(\w+)(?:\|([^}]+))?\}\}/g, (_, key, fallback) =>
      map[key] != null ? String(map[key]) : fallback || `{{${key}}}`
    );
  };

  const build_index = () => {
    const items = [];
    const push = (item) => items.push(item);

    hub_meta.forEach((h) =>
      push({
        id: h.id,
        kind: "hub",
        title: h.label,
        plain: h.plain,
        body: h.detail,
        group: h.group,
        copy: h.detail,
      })
    );

    catalog.daily_drivers.forEach((t, i) =>
      push({
        id: `tool_${i}`,
        kind: "tool",
        title: t.name,
        plain: t.note,
        body: t.note,
        url: t.url,
        group: "tools",
        tags: t.tags,
        copy: t.url,
        hub: "hub_tools",
      })
    );

    catalog.prompts.forEach((p) => {
      const body = fill_vars(p.body);
      push({
        id: `prompt_${p.id}`,
        kind: "prompt",
        title: p.title,
        plain: `Prompt · ${p.cat}`,
        body,
        group: "prompts",
        tags: p.tags,
        copy: body,
        hub: "hub_prompts",
      });
    });

    catalog.skills_guide.examples.forEach((s, i) =>
      push({
        id: `skill_${i}`,
        kind: "skill",
        title: s.name,
        plain: s.desc,
        body: s.desc,
        group: "skills",
        copy: `${s.name}\n\n${s.desc}`,
        hub: "hub_skills",
      })
    );

    catalog.mcp_guide.catalog.forEach((m, i) =>
      push({
        id: `mcp_${i}`,
        kind: "mcp",
        title: m.name,
        plain: m.use,
        body: m.use,
        group: "mcp",
        copy: `${m.name}: ${m.use}`,
        hub: "hub_mcp",
      })
    );

    catalog.agent_dirs.forEach((d, i) =>
      push({
        id: `dir_${i}`,
        kind: "dir",
        title: d.path,
        plain: d.what,
        body: `${d.what}\n\nUsed by: ${d.tools}\nTip: ${d.tip}`,
        group: "dirs",
        copy: d.path,
        hub: "hub_dirs",
      })
    );

    catalog.cpp_playbook.forEach((p, i) =>
      push({
        id: `cpp_${i}`,
        kind: "cpp",
        title: p.title,
        plain: p.body,
        body: p.body,
        group: "cpp",
        copy: `${p.title}\n\n${p.body}`,
        hub: "hub_cpp",
      })
    );

    catalog.specs.forEach((s, i) =>
      push({
        id: `spec_${i}`,
        kind: "spec",
        title: s.name,
        plain: s.note,
        body: s.note,
        url: s.url,
        group: "specs",
        copy: s.url,
        hub: "hub_specs",
      })
    );

    catalog.digests.forEach((d) => {
      const prompt = catalog.prompts.find((p) => p.id === d.prompt_id);
      const body = prompt ? fill_vars(prompt.body, { topic: d.title }) : d.topics.join(", ");
      push({
        id: `digest_${d.id}`,
        kind: "digest",
        title: d.title,
        plain: d.topics.slice(0, 3).join(" · "),
        body: `${d.topics.join(" · ")}\n\n${body}`,
        group: "digests",
        copy: body,
        hub: "hub_digests",
      });
    });

    catalog.organization.forEach((o, i) =>
      push({
        id: `org_${i}`,
        kind: "org",
        title: o.title,
        plain: o.body,
        body: o.body,
        group: "org",
        copy: `${o.title}\n\n${o.body}`,
        hub: "hub_org",
      })
    );

    catalog.templates.forEach((t) =>
      push({
        id: `tpl_${t.id}`,
        kind: "template",
        title: t.title,
        plain: "File template — copy into a repo",
        body: t.body,
        group: "dirs",
        copy: t.body,
        hub: "hub_dirs",
      })
    );

    catalog.watch.forEach((g, gi) =>
      g.links.forEach((l, li) =>
        push({
          id: `watch_${gi}_${li}`,
          kind: "watch",
          title: l.n,
          plain: g.group,
          body: `${g.group} · ${l.n}`,
          url: l.u,
          group: "watch",
          copy: l.u,
          hub: "hub_watch",
        })
      )
    );

    // Daily prompt card
    const day = catalog.daily_themes[new Date().getDay()];
    const daily_prompt = catalog.prompts.find((p) => p.id === day.prompt_id) || catalog.prompts[0];
    const daily_body = fill_vars(daily_prompt.body, { topic: day.focus });
    push({
      id: "daily",
      kind: "daily",
      title: `Today · ${day.focus}`,
      plain: day.hint,
      body: daily_body,
      group: "core",
      copy: daily_body,
      hub: "hub_core",
    });

    return items;
  };

  const build_graph = (items) => {
    const nodes = [];
    const edges = [];
    const seen = new Set();

    const add_node = (n) => {
      if (seen.has(n.id)) return;
      seen.add(n.id);
      nodes.push(n);
    };

    hub_meta.forEach((h) => {
      const is_core = h.id === "hub_core";
      add_node({
        id: h.id,
        label: h.label,
        title: h.plain,
        group: h.group,
        value: is_core ? 48 : 28,
        font: { size: is_core ? 22 : 16, face: "Syne, Outfit, sans-serif", color: "#f4f4f8" },
        color: {
          background: colors[h.group],
          border: colors[h.group],
          highlight: { background: "#ffffff", border: colors[h.group] },
          hover: { background: colors[h.group], border: "#ffffff" },
        },
        borderWidth: is_core ? 0 : 2,
      });
      if (!is_core) {
        edges.push({ from: "hub_core", to: h.id, color: { color: "rgba(255,255,255,0.14)", highlight: colors[h.group] } });
      }
    });

    // Cross links for a living map feel
    const cross = [
      ["hub_tools", "hub_skills"],
      ["hub_skills", "hub_mcp"],
      ["hub_dirs", "hub_skills"],
      ["hub_cpp", "hub_dirs"],
      ["hub_prompts", "hub_digests"],
      ["hub_specs", "hub_dirs"],
      ["hub_watch", "hub_tools"],
    ];
    cross.forEach(([a, b]) =>
      edges.push({ from: a, to: b, dashes: true, color: { color: "rgba(255,255,255,0.08)" }, width: 1 })
    );

    const leaves_per_hub = {
      hub_tools: items.filter((i) => i.hub === "hub_tools").slice(0, 8),
      hub_prompts: items.filter((i) => i.kind === "prompt").slice(0, 8),
      hub_skills: items.filter((i) => i.kind === "skill"),
      hub_mcp: items.filter((i) => i.kind === "mcp").slice(0, 6),
      hub_dirs: items.filter((i) => i.kind === "dir").slice(0, 7),
      hub_cpp: items.filter((i) => i.kind === "cpp"),
      hub_specs: items.filter((i) => i.kind === "spec").slice(0, 6),
      hub_digests: items.filter((i) => i.kind === "digest").slice(0, 8),
      hub_watch: items.filter((i) => i.kind === "watch").slice(0, 8),
      hub_org: items.filter((i) => i.kind === "org"),
      hub_core: items.filter((i) => i.id === "daily"),
    };

    Object.entries(leaves_per_hub).forEach(([hub, leaves]) => {
      leaves.forEach((item) => {
        add_node({
          id: item.id,
          label: item.title.length > 22 ? `${item.title.slice(0, 20)}…` : item.title,
          title: item.plain,
          group: item.group,
          value: 14,
          font: { size: 12, face: "Outfit, sans-serif", color: "#d8d8e0" },
          color: {
            background: "#1a1a24",
            border: colors[item.group] || "#888",
            highlight: { background: "#2a2a36", border: "#fff" },
            hover: { background: "#222230", border: colors[item.group] || "#fff" },
          },
          borderWidth: 1.5,
          shape: item.kind === "prompt" || item.kind === "template" ? "box" : "dot",
        });
        edges.push({
          from: hub,
          to: item.id,
          color: { color: "rgba(255,255,255,0.12)" },
          width: 1,
        });
      });
    });

    return { nodes, edges };
  };

  document.addEventListener("alpine:init", () => {
    Alpine.data("app", () => ({
      items: [],
      fuse: null,
      network: null,
      query: "",
      results: [],
      palette_open: false,
      drawer_open: false,
      selected: null,
      active_result: 0,
      toast: "",
      toast_timer: 0,
      theme_mode: localStorage.getItem("ai_theme_mode") || "dark",
      hint_visible: !localStorage.getItem("ai_hint_seen"),
      mod_key: /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent || "") ? "⌘K" : "Ctrl K",
      active_filter: "all",
      filters: [
        { id: "all", label: "All" },
        { id: "tools", label: "Tools" },
        { id: "prompts", label: "Prompts" },
        { id: "skills", label: "Skills" },
        { id: "dirs", label: "Folders" },
        { id: "cpp", label: "C++" },
        { id: "digests", label: "Interests" },
      ],

      init() {
        this.items = build_index();
        this.fuse = new Fuse(this.items, {
          keys: [
            { name: "title", weight: 0.5 },
            { name: "plain", weight: 0.3 },
            { name: "body", weight: 0.15 },
            { name: "tags", weight: 0.05 },
          ],
          threshold: 0.38,
          ignoreLocation: true,
        });
        this.apply_theme(this.theme_mode);
        this.$nextTick(() => this.mount_graph());
        window
          .matchMedia("(prefers-color-scheme: light)")
          .addEventListener("change", () => {
            if (this.theme_mode === "system") this.apply_theme("system");
          });
      },

      resolve_theme(mode) {
        if (mode === "system") {
          return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        }
        return mode === "light" ? "light" : "dark";
      },

      apply_theme(mode) {
        this.theme_mode = mode;
        const resolved = this.resolve_theme(mode);
        document.documentElement.setAttribute("data-theme", resolved);
        document.documentElement.setAttribute("data-theme-mode", mode);
        localStorage.setItem("ai_theme_mode", mode);
        if (this.network) this.mount_graph(true);
      },

      mount_graph(remount = false) {
        const el = document.getElementById("graph");
        if (!el || typeof vis === "undefined") return;
        if (this.network && remount) {
          this.network.destroy();
          this.network = null;
        }
        const { nodes, edges } = build_graph(this.items);
        const is_light = document.documentElement.getAttribute("data-theme") === "light";
        const nodes_ds = new vis.DataSet(
          nodes.map((n) => {
            if (n.group !== "core" && n.value >= 28) return n;
            if (n.value >= 28) return n;
            return {
              ...n,
              font: { ...n.font, color: is_light ? "#22222a" : "#d8d8e0" },
              color: {
                ...n.color,
                background: is_light ? "#ffffff" : "#1a1a24",
              },
            };
          })
        );
        const edges_ds = new vis.DataSet(edges);
        this.network = new vis.Network(
          el,
          { nodes: nodes_ds, edges: edges_ds },
          {
            autoResize: true,
            interaction: {
              hover: true,
              tooltipDelay: 120,
              navigationButtons: false,
              keyboard: false,
              zoomView: true,
              dragView: true,
            },
            physics: {
              enabled: true,
              solver: "forceAtlas2Based",
              forceAtlas2Based: {
                gravitationalConstant: -42,
                centralGravity: 0.012,
                springLength: 90,
                springConstant: 0.06,
                damping: 0.5,
                avoidOverlap: 0.6,
              },
              stabilization: { iterations: 120, fit: true },
            },
            nodes: {
              shape: "dot",
              scaling: { min: 10, max: 48 },
              shadow: {
                enabled: true,
                color: "rgba(0,0,0,0.35)",
                size: 12,
                x: 0,
                y: 4,
              },
            },
            edges: {
              smooth: { type: "continuous", roundness: 0.25 },
              selectionWidth: 2,
            },
          }
        );

        this.network.once("stabilizationIterationsDone", () => {
          this.network.setOptions({ physics: { enabled: false } });
          // gentle float: re-enable soft physics later? keep static for readability
        });

        this.network.on("click", (params) => {
          if (!params.nodes.length) return;
          this.open_item(params.nodes[0]);
        });
      },

      open_palette() {
        this.palette_open = true;
        this.query = "";
        this.results = this.default_results();
        this.active_result = 0;
        this.$nextTick(() => this.$refs.palette_input?.focus());
      },

      close_palette() {
        this.palette_open = false;
      },

      default_results() {
        return this.items.filter((i) => ["daily", "hub_tools", "hub_prompts", "hub_skills", "hub_cpp"].includes(i.id)).concat(
          this.items.filter((i) => i.kind === "tool").slice(0, 4)
        );
      },

      on_query() {
        const q = this.query.trim();
        if (!q) {
          this.results = this.default_results();
        } else {
          this.results = this.fuse.search(q).map((r) => r.item).slice(0, 12);
        }
        this.active_result = 0;
      },

      move_result(delta) {
        if (!this.results.length) return;
        this.active_result = (this.active_result + delta + this.results.length) % this.results.length;
      },

      confirm_result() {
        const item = this.results[this.active_result] || this.results[0];
        if (item) this.open_item(item.id);
      },

      open_item(id) {
        const item = this.items.find((i) => i.id === id);
        if (!item) return;
        this.selected = item;
        this.drawer_open = true;
        this.palette_open = false;
        this.dismiss_hint();
        if (this.network) {
          try {
            this.network.selectNodes([id]);
            this.network.focus(id, { scale: 1.15, animation: { duration: 450, easingFunction: "easeInOutQuad" } });
          } catch (_) {
            /* hub-only or filtered */
          }
        }
      },

      close_drawer() {
        this.drawer_open = false;
      },

      async copy_selected() {
        if (!this.selected?.copy) return;
        try {
          await navigator.clipboard.writeText(this.selected.copy);
          this.show_toast("Copied");
        } catch {
          this.show_toast("Copy failed");
        }
      },

      show_toast(msg) {
        this.toast = msg;
        clearTimeout(this.toast_timer);
        this.toast_timer = setTimeout(() => (this.toast = ""), 1600);
      },

      dismiss_hint() {
        this.hint_visible = false;
        localStorage.setItem("ai_hint_seen", "1");
      },

      set_filter(id) {
        this.active_filter = id;
        if (!this.network) return;
        const hub_id = id === "all" ? "hub_core" : `hub_${id === "dirs" ? "dirs" : id}`;
        const target =
          id === "all"
            ? "hub_core"
            : this.items.find((i) => i.id === hub_id || (i.kind === "hub" && i.group === id))?.id || "hub_core";
        try {
          this.network.focus(target, { scale: 1.05, animation: { duration: 500, easingFunction: "easeInOutQuad" } });
          this.network.selectNodes([target]);
          this.open_item(target);
        } catch (_) {}
      },

      kind_label(kind) {
        return (
          {
            hub: "Map",
            tool: "Tool",
            prompt: "Prompt",
            skill: "Skill",
            mcp: "MCP",
            dir: "Folder",
            cpp: "C++",
            spec: "Guide",
            digest: "Interest",
            watch: "Link",
            org: "Practice",
            template: "Template",
            daily: "Today",
          }[kind] || kind
        );
      },

      today_label() {
        return new Date().toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        });
      },
    }));
  });

  // Global keyboard — works even before Alpine focuses
  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    const typing = tag === "INPUT" || tag === "TEXTAREA";
    if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("ai-open-palette"));
    }
    if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("ai-open-palette"));
    }
  });
})();
