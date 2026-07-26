/* UI brain — Alpine + Fuse + Cytoscape + cytoscape-cola. Content lives in data.js. */
(() => {
  const catalog = window.ai_data;
  if (!catalog) return;

  const GROUPS = {
    core: { color: "#ff5f6d", label: "Today" },
    tools: { color: "#ff8f6b", label: "Tools" },
    models: { color: "#ff9f0a", label: "Models" },
    prompts: { color: "#5b9cff", label: "Prompts" },
    skills: { color: "#34c759", label: "Skills" },
    mcp: { color: "#bf5af2", label: "MCP" },
    dirs: { color: "#ffd60a", label: "Folders" },
    cpp: { color: "#64d2ff", label: "C++" },
    specs: { color: "#ac8eff", label: "Guides" },
    digests: { color: "#ff9f0a", label: "Interests" },
    watch: { color: "#30d158", label: "Watch" },
    flow: { color: "#ff375f", label: "Pipelines" },
    org: { color: "#ff7a45", label: "Organize" },
    decision: { color: "#5ac8fa", label: "Decisions" },
    calc: { color: "#ffcc00", label: "Calc" },
  };

  const LIGHT_ADJUST = (hex, isLight) => {
    if (!isLight) return hex;
    // darken slightly for light mode readability
    const num = parseInt(hex.slice(1), 16);
    const r = Math.max(0, (num >> 16) - 24);
    const g = Math.max(0, ((num >> 8) & 0xff) - 24);
    const b = Math.max(0, (num & 0xff) - 24);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  };

  const fill_vars = (tpl, extra = {}) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
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

  const fmt_num = (n) => new Intl.NumberFormat("en-US").format(n);

  const build_index = () => {
    const items = [];
    const push = (i) => items.push(i);

    // hubs
    Object.entries(GROUPS).forEach(([id, g]) => {
      if (id === "core") return;
      push({ id: `hub_${id}`, kind: "hub", title: g.label, plain: g.label, body: g.label, group: id, copy: g.label });
    });

    // core
    push({ id: "hub_core", kind: "hub", title: "AI OS", plain: "Your map of how to work with AI", body: catalog.identity.blurb, group: "core", copy: catalog.identity.blurb });

    // daily
    const day = catalog.daily_themes[new Date().getDay()];
    const daily_prompt = catalog.prompts.find((p) => p.id === day.prompt_id) || catalog.prompts[0];
    const daily_body = fill_vars(daily_prompt.body, { topic: day.focus });
    push({ id: "daily", kind: "daily", title: `Today · ${day.focus}`, plain: day.hint, body: daily_body, group: "core", copy: daily_body });

    // tools
    catalog.daily_drivers.forEach((t, i) => {
      const limits = t.limits || [];
      let body = t.note;
      if (t.specs) body += `\n\n**Context:** ${t.specs.context}\n**Speed:** ${t.specs.speed}\n**Cost:** ${t.specs.cost}\n**Best for:** ${t.specs.best}`;
      if (limits.length) body += "\n\n**Limitations:**\n" + limits.map((l) => `- ${l}`).join("\n");
      push({ id: `tool_${i}`, kind: "tool", title: t.name, plain: t.note, body, limits, specs: t.specs, url: t.url, group: "tools", tags: t.tags, copy: body, hub: "hub_tools" });
    });

    // models
    catalog.models.forEach((m, i) => {
      const body = `**Use:** ${m.use}\n**Context:** ${m.context}\n**Speed:** ${m.speed}\n**Cost:** ${m.cost}\n**Best for:** ${m.best}`;
      push({ id: `model_${i}`, kind: "model", title: m.name, plain: m.use, body, group: "models", copy: body, hub: "hub_models" });
    });

    // pipelines
    catalog.pipelines.forEach((pipe) => {
      const stage_lines = [];
      (pipe.stages || []).forEach((stage, idx) => {
        if (stage.parallel) {
          stage_lines.push(`${idx + 1}. ${stage.title} (parallel)`);
          stage.parallel.forEach((p) => stage_lines.push(`   ├─ ${p.title} · ${p.tool || ""}`));
        } else {
          stage_lines.push(`${idx + 1}. ${stage.title}${stage.tool ? ` · ${stage.tool}` : ""}`);
        }
      });
      const body = `${pipe.when || ""}\n${pipe.note || ""}\n\n${stage_lines.join("\n")}`.trim();
      push({ id: `pipeline_${pipe.id}`, kind: "pipeline", title: pipe.title, plain: pipe.plain || pipe.note, body, when: pipe.when, note: pipe.note, stages: pipe.stages || [], group: "flow", copy: pipe.note || pipe.plain || pipe.title, hub: "hub_flow" });
    });

    // prompts
    catalog.prompts.forEach((p) => {
      const body = fill_vars(p.body);
      push({ id: `prompt_${p.id}`, kind: "prompt", title: p.title, plain: `Prompt · ${p.cat}`, body, group: "prompts", tags: p.tags, copy: body, hub: "hub_prompts" });
    });

    // skills
    catalog.skills_guide.examples.forEach((s, i) => push({ id: `skill_${i}`, kind: "skill", title: s.name, plain: s.desc, body: s.desc, group: "skills", copy: `${s.name}\n\n${s.desc}`, hub: "hub_skills" }));

    // mcp
    catalog.mcp_guide.catalog.forEach((m, i) => push({ id: `mcp_${i}`, kind: "mcp", title: m.name, plain: m.use, body: m.use, group: "mcp", copy: `${m.name}: ${m.use}`, hub: "hub_mcp" }));

    // dirs
    catalog.agent_dirs.forEach((d, i) => push({ id: `dir_${i}`, kind: "dir", title: d.path, plain: d.what, body: `${d.what}\n\n**Used by:** ${d.tools}\n**Tip:** ${d.tip}`, group: "dirs", copy: d.path, hub: "hub_dirs" }));

    // cpp
    catalog.cpp_playbook.forEach((p, i) => push({ id: `cpp_${i}`, kind: "cpp", title: p.title, plain: p.body, body: p.body, group: "cpp", copy: `${p.title}\n\n${p.body}`, hub: "hub_cpp" }));

    // specs
    catalog.specs.forEach((s, i) => push({ id: `spec_${i}`, kind: "spec", title: s.name, plain: s.note, body: s.note, url: s.url, group: "specs", copy: s.url, hub: "hub_specs" }));

    // digests
    catalog.digests.forEach((d) => {
      const prompt = catalog.prompts.find((p) => p.id === d.prompt_id);
      const body = prompt ? fill_vars(prompt.body, { topic: d.title }) : d.topics.join(", ");
      push({ id: `digest_${d.id}`, kind: "digest", title: d.title, plain: d.topics.slice(0, 3).join(" · "), body: `${d.topics.join(" · ")}\n\n${body}`, group: "digests", copy: body, hub: "hub_digests" });
    });

    // org
    catalog.organization.forEach((o, i) => push({ id: `org_${i}`, kind: "org", title: o.title, plain: o.body, body: o.body, group: "org", copy: `${o.title}\n\n${o.body}`, hub: "hub_org" }));

    // templates
    catalog.templates.forEach((t) => push({ id: `tpl_${t.id}`, kind: "template", title: t.title, plain: "File template — copy into a repo", body: t.body, group: "dirs", copy: t.body, hub: "hub_dirs" }));

    // watch
    catalog.watch.forEach((g, gi) => g.links.forEach((l, li) => push({ id: `watch_${gi}_${li}`, kind: "watch", title: l.n, plain: g.group, body: `${g.group} · ${l.n}`, url: l.u, group: "watch", copy: l.u, hub: "hub_watch" })));

    // decisions
    catalog.decisions.forEach((d) => push({ id: `decision_${d.id}`, kind: "decision", title: d.title, plain: d.subtitle, body: d.subtitle, group: "decision", decision: d, copy: d.subtitle, hub: "hub_decision" }));

    // calc
    push({ id: "calc_context", kind: "calc", title: "Context & cost calculator", plain: "Estimate tokens, cost, and context usage", body: "Use the calculator in the drawer.", group: "calc", copy: "Context & cost calculator", hub: "hub_calc" });

    return items;
  };

  const build_graph_elements = (items, isLight) => {
    const nodes = [];
    const edges = [];
    const hub_ids = new Set();

    // Hubs as compound parents? No, simple nodes + edges; compound for pipelines only.
    const hub_meta = [
      { id: "hub_core", label: "AI OS", group: "core" },
      { id: "hub_tools", label: "Tools", group: "tools" },
      { id: "hub_models", label: "Models", group: "models" },
      { id: "hub_prompts", label: "Prompts", group: "prompts" },
      { id: "hub_skills", label: "Skills", group: "skills" },
      { id: "hub_mcp", label: "MCP", group: "mcp" },
      { id: "hub_dirs", label: "Folders", group: "dirs" },
      { id: "hub_cpp", label: "C++", group: "cpp" },
      { id: "hub_specs", label: "Guides", group: "specs" },
      { id: "hub_digests", label: "Interests", group: "digests" },
      { id: "hub_watch", label: "Watch", group: "watch" },
      { id: "hub_flow", label: "Pipelines", group: "flow" },
      { id: "hub_org", label: "Organize", group: "org" },
      { id: "hub_decision", label: "Decisions", group: "decision" },
      { id: "hub_calc", label: "Calc", group: "calc" },
    ];

    hub_meta.forEach((h) => {
      hub_ids.add(h.id);
      nodes.push({
        data: { id: h.id, label: h.label, kind: "hub", group: h.group },
        classes: "hub",
      });
    });

    // core connects to all hubs
    hub_meta.forEach((h) => {
      if (h.id !== "hub_core") edges.push({ data: { source: "hub_core", target: h.id }, classes: "hub-edge" });
    });

    // attach leaves
    const leaves = items.filter((i) => !hub_ids.has(i.id));
    leaves.forEach((item) => {
      const hub = item.hub || `hub_${item.group}`;
      const color = LIGHT_ADJUST(GROUPS[item.group]?.color || "#888", isLight);
      nodes.push({
        data: { id: item.id, label: item.title, kind: item.kind, group: item.group, parent: item.kind === "pipeline" ? hub : undefined },
        classes: item.kind === "pipeline" ? "leaf compound-leaf" : "leaf",
        style: { "border-color": color },
      });
      if (item.kind !== "pipeline") edges.push({ data: { source: hub, target: item.id }, classes: "leaf-edge" });
    });

    // compound nodes for pipelines
    catalog.pipelines.forEach((pipe) => {
      const hub = "hub_flow";
      const pid = `pipeline_${pipe.id}`;
      nodes.push({ data: { id: `group_${pipe.id}`, label: pipe.title, parent: hub }, classes: "pipeline-group" });
      // reparent pipeline leaf
      const pnode = nodes.find((n) => n.data.id === pid);
      if (pnode) pnode.data.parent = `group_${pipe.id}`;
      // add stage nodes inside compound
      (pipe.stages || []).forEach((stage, si) => {
        const sid = `${pid}_stage_${si}`;
        nodes.push({ data: { id: sid, label: stage.title, parent: `group_${pipe.id}`, kind: "stage" }, classes: "stage-node" });
        edges.push({ data: { source: pid, target: sid }, classes: "stage-edge" });
        if (stage.parallel) {
          stage.parallel.forEach((branch, bi) => {
            const bid = `${sid}_branch_${bi}`;
            nodes.push({ data: { id: bid, label: branch.title, parent: `group_${pipe.id}`, kind: "stage" }, classes: "stage-node branch" });
            edges.push({ data: { source: sid, target: bid }, classes: "stage-edge" });
          });
        }
      });
    });

    return { nodes, edges };
  };

  const build_decision_elements = (decision) => {
    const nodes = [];
    const edges = [];
    let idx = 0;
    const walk = (node, parentId) => {
      const id = `${decision.id}_node_${idx++}`;
      nodes.push({ data: { id, label: node.q || node.a || node.result, isResult: !!node.result }, classes: node.result ? "dt-result" : "dt-node" });
      if (parentId) edges.push({ data: { source: parentId, target: id, label: node.a || "" } });
      if (node.children) node.children.forEach((c) => walk(c, id));
    };
    walk(decision.root, null);
    return { nodes, edges };
  };

  document.addEventListener("alpine:init", () => {
    Alpine.data("app", () => ({
      items: [],
      fuse: null,
      cy: null,
      treeCy: null,
      query: "",
      results: [],
      palette_open: false,
      drawer_open: false,
      tree_open: false,
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
        { id: "models", label: "Models" },
        { id: "flow", label: "Pipelines" },
        { id: "prompts", label: "Prompts" },
        { id: "skills", label: "Skills" },
        { id: "dirs", label: "Folders" },
        { id: "cpp", label: "C++" },
        { id: "digests", label: "Interests" },
        { id: "decision", label: "Decisions" },
      ],
      calc_input: 4000,
      calc_output: 1000,
      calc_model: "gpt4o",
      calc_models: catalog.calc_models,

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
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
          if (this.theme_mode === "system") this.apply_theme("system");
        });
      },

      resolve_theme(mode) {
        if (mode === "system") return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
        return mode === "light" ? "light" : "dark";
      },

      apply_theme(mode) {
        this.theme_mode = mode;
        const resolved = this.resolve_theme(mode);
        document.documentElement.setAttribute("data-theme", resolved);
        localStorage.setItem("ai_theme_mode", mode);
        this.$nextTick(() => this.mount_graph(true));
      },

      set_theme(mode) { this.apply_theme(mode); },

      is_light() { return document.documentElement.getAttribute("data-theme") === "light"; },

      mount_graph(remount = false) {
        const el = document.getElementById("graph");
        if (!el || typeof cytoscape === "undefined") return;
        if (this.cy && remount) { this.cy.destroy(); this.cy = null; }
        const isLight = this.is_light();
        const { nodes, edges } = build_graph_elements(this.items, isLight);

        const bg = isLight ? "#f5f6fa" : "#0b0b0f";
        const fg = isLight ? "#0b0b10" : "#f5f6fa";
        const fgDim = isLight ? "rgba(11,11,16,.55)" : "rgba(245,246,250,.55)";
        const line = isLight ? "rgba(11,11,16,.1)" : "rgba(255,255,255,.1)";

        this.cy = cytoscape({
          container: el,
          elements: [...nodes, ...edges],
          style: [
            {
              selector: "node",
              style: {
                "background-color": "#888",
                "label": "data(label)",
                "color": fg,
                "font-family": "Inter, sans-serif",
                "font-size": "13px",
                "font-weight": 600,
                "text-valign": "center",
                "text-halign": "center",
                "text-wrap": "wrap",
                "text-max-width": "100px",
                "width": "mapData(degree, 1, 8, 28, 72)",
                "height": "mapData(degree, 1, 8, 28, 72)",
                "border-width": 2,
                "border-opacity": 0.8,
                "transition-property": "background-color, border-color, width, height",
                "transition-duration": "0.2s",
              },
            },
            {
              selector: ".hub",
              style: {
                "background-color": (ele) => GROUPS[ele.data("group")]?.color || "#888",
                "border-color": (ele) => GROUPS[ele.data("group")]?.color || "#888",
                "color": "#fff",
                "font-size": "15px",
                "font-weight": 700,
                "width": 88,
                "height": 88,
                "text-max-width": "90px",
                "shadow-blur": 20,
                "shadow-color": (ele) => GROUPS[ele.data("group")]?.color || "#888",
                "shadow-opacity": 0.35,
              },
            },
            {
              selector: ".leaf",
              style: {
                "background-color": isLight ? "#ffffff" : "#1a1a22",
                "border-color": (ele) => GROUPS[ele.data("group")]?.color || "#888",
                "color": fg,
                "font-size": "11px",
                "font-weight": 500,
                "width": 54,
                "height": 54,
                "text-max-width": "80px",
              },
            },
            {
              selector: ".compound-leaf",
              style: { "background-opacity": 0.15, "border-width": 1, "font-size": "12px", "font-weight": 700, "text-valign": "top", "text-margin-y": 6 },
            },
            {
              selector: ".pipeline-group",
              style: { "background-opacity": 0.06, "border-width": 1, "border-style": "dashed", "border-color": GROUPS.flow.color, "padding": 20 },
            },
            {
              selector: ".stage-node",
              style: { "background-color": isLight ? "#fff" : "#1a1a22", "border-color": GROUPS.flow.color, "color": fg, "width": 36, "height": 36, "font-size": "9px", "font-weight": 500, "text-max-width": "60px" },
            },
            {
              selector: ".stage-node.branch",
              style: { "background-color": isLight ? "rgba(255,55,95,.08)" : "rgba(255,55,95,.12)", "border-style": "dashed" },
            },
            {
              selector: "edge",
              style: {
                "width": 1.5,
                "line-color": line,
                "target-arrow-color": line,
                "target-arrow-shape": "triangle",
                "arrow-scale": 0.8,
                "curve-style": "bezier",
              },
            },
            {
              selector: ".hub-edge",
              style: { "width": 2, "line-color": isLight ? "rgba(11,11,16,.14)" : "rgba(255,255,255,.16)", "target-arrow-shape": "none" },
            },
            {
              selector: ".leaf-edge",
              style: { "width": 1, "line-color": isLight ? "rgba(11,11,16,.1)" : "rgba(255,255,255,.1)", "target-arrow-shape": "none" },
            },
            {
              selector: ".stage-edge",
              style: { "width": 1.5, "line-color": GROUPS.flow.color, "target-arrow-shape": "triangle", "arrow-scale": 0.7, "curve-style": "bezier" },
            },
            {
              selector: ":selected",
              style: { "border-width": 4, "border-color": GROUPS.core.color, "background-color": GROUPS.core.color },
            },
          ],
          layout: { name: "grid" },
          minZoom: 0.2,
          maxZoom: 2.5,
          wheelSensitivity: 0.18,
        });

        this.run_layout();

        this.cy.on("tap", (evt) => {
          if (evt.target === this.cy) return;
          const node = evt.target;
          if (node.isNode && node.isNode()) this.open_item(node.id());
        });
        this.cy.on("mouseover", "node", (evt) => {
          evt.target.animate({ style: { "border-width": 4 } }, { duration: 120 });
        });
        this.cy.on("mouseout", "node", (evt) => {
          evt.target.animate({ style: { "border-width": 2 } }, { duration: 120 });
        });
      },

      run_layout() {
        if (!this.cy) return;
        const isLight = this.is_light();
        const layout = this.cy.layout({
          name: "cola",
          infinite: true,
          fit: true,
          padding: 30,
          nodeSpacing: 24,
          edgeLength: 110,
          maxSimulationTime: 4000,
          ungrabifyWhileSimulating: false,
          avoidOverlap: true,
          animate: true,
          randomize: false,
          gravity: 0.08,
        });
        layout.run();
        setTimeout(() => this.cy.fit({ padding: 40 }), 100);
      },

      cy_fit() { if (this.cy) this.cy.fit({ padding: 40, animate: true }); },
      cy_zoom(factor) { if (this.cy) this.cy.zoom(this.cy.zoom() * factor); },
      focus_graph() { document.getElementById("stage")?.scrollIntoView({ behavior: "smooth" }); this.cy_fit(); },

      open_palette() {
        this.palette_open = true;
        this.query = "";
        this.results = this.default_results();
        this.active_result = 0;
        this.$nextTick(() => this.$refs.palette_input?.focus());
      },
      close_palette() { this.palette_open = false; },
      default_results() {
        return this.items
          .filter((i) => ["daily", "hub_tools", "hub_models", "hub_flow", "hub_prompts", "hub_decision", "calc_context"].includes(i.id))
          .concat(this.items.filter((i) => i.kind === "pipeline").slice(0, 3))
          .concat(this.items.filter((i) => i.kind === "tool").slice(0, 3));
      },
      on_query() {
        const q = this.query.trim();
        this.results = q ? this.fuse.search(q).map((r) => r.item).slice(0, 12) : this.default_results();
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
        if (this.cy) {
          this.cy.$id(id).select();
          this.cy.animate({ fit: { eles: this.cy.$id(id), padding: 80 }, duration: 300 });
        }
        if (item.kind === "calc") this.$nextTick(() => this.init_calc());
      },

      close_drawer() { this.drawer_open = false; },

      async copy_selected() {
        if (!this.selected?.copy) return;
        try { await navigator.clipboard.writeText(this.selected.copy); this.show_toast("Copied"); } catch { this.show_toast("Copy failed"); }
      },

      stage_prompt(stage) { return fill_vars(stage.prompt || ""); },

      async copy_stage(stage) {
        const text = this.stage_prompt(stage);
        if (!text) return;
        try { await navigator.clipboard.writeText(text); this.show_toast("Stage prompt copied"); } catch { this.show_toast("Copy failed"); }
      },

      async copy_pipeline() {
        if (!this.selected || this.selected.kind !== "pipeline") return;
        const chunks = [`# ${this.selected.title}`, this.selected.note || "", ""];
        (this.selected.stages || []).forEach((stage, idx) => {
          if (stage.parallel) {
            chunks.push(`## ${idx + 1}. ${stage.title}`);
            stage.parallel.forEach((p) => chunks.push(`### ${p.title} (${p.tool || ""})`, this.stage_prompt(p), ""));
          } else {
            chunks.push(`## ${idx + 1}. ${stage.title} (${stage.tool || ""})`, this.stage_prompt(stage), "");
          }
        });
        try { await navigator.clipboard.writeText(chunks.join("\n")); this.show_toast("Full pipeline copied"); } catch { this.show_toast("Copy failed"); }
      },

      show_toast(msg) {
        this.toast = msg;
        clearTimeout(this.toast_timer);
        this.toast_timer = setTimeout(() => (this.toast = ""), 1600);
      },

      dismiss_hint() { this.hint_visible = false; localStorage.setItem("ai_hint_seen", "1"); },

      set_filter(id) {
        this.active_filter = id;
        if (!this.cy) return;
        if (id === "all") { this.cy.elements().show(); this.cy_fit(); return; }
        const group = id === "dirs" ? "dirs" : id;
        this.cy.elements().show();
        this.cy.nodes().filter((n) => n.data("group") !== group && n.data("id") !== `hub_${group}`).hide();
        this.cy.edges().filter((e) => e.source().hidden() || e.target().hidden()).hide();
        const target = this.cy.$(`#hub_${group}`);
        if (target.length) this.cy.animate({ fit: { eles: target.closedNeighborhood(), padding: 60 }, duration: 350 });
      },

      kind_label(kind) {
        return {
          hub: "Map", tool: "Tool", model: "Model", prompt: "Prompt", skill: "Skill", mcp: "MCP",
          dir: "Folder", cpp: "C++", spec: "Guide", digest: "Interest", watch: "Link",
          org: "Practice", template: "Template", daily: "Today", pipeline: "Pipeline",
          decision: "Decision", calc: "Calculator", stage: "Stage",
        }[kind] || kind;
      },

      today_label() {
        return new Date().toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
      },

      format_body(text) {
        if (!text) return "";
        return text
          .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
          .replace(/`([^`]+)`/g, "<code>$1</code>")
          .replace(/^- (.+)$/gm, "<li>$1</li>")
          .replace(/(<li>.+<\/li>\n?)+/g, "<ul>$&</ul>")
          .replace(/\n/g, "<p></p>");
      },

      // decision tree modal
      open_tree(decisionId) {
        const item = this.items.find((i) => i.id === decisionId);
        const decision = item?.decision || catalog.decisions.find((d) => `decision_${d.id}` === decisionId);
        if (!decision) return;
        this.tree_title = decision.title;
        this.tree_subtitle = decision.subtitle;
        this.tree_open = true;
        this.$nextTick(() => this.mount_tree(decision));
      },
      close_tree() { this.tree_open = false; if (this.treeCy) { this.treeCy.destroy(); this.treeCy = null; } },
      reset_tree() { if (this.treeCy) { this.treeCy.fit(); this.treeCy.elements().unselect(); } },

      mount_tree(decision) {
        const el = document.getElementById("tree-graph");
        if (!el || typeof cytoscape === "undefined") return;
        const { nodes, edges } = build_decision_elements(decision);
        const isLight = this.is_light();
        const fg = isLight ? "#0b0b10" : "#f5f6fa";
        this.treeCy = cytoscape({
          container: el,
          elements: [...nodes, ...edges],
          style: [
            { selector: "node", style: { "background-color": isLight ? "#fff" : "#1a1a22", "border-color": GROUPS.decision.color, "border-width": 2, "label": "data(label)", "color": fg, "font-family": "Inter, sans-serif", "font-size": "12px", "font-weight": 600, "text-valign": "center", "text-halign": "center", "text-wrap": "wrap", "text-max-width": "120px", "width": 90, "height": 54 } },
            { selector: ".dt-result", style: { "background-color": GROUPS.decision.color, "border-color": GROUPS.decision.color, "color": "#fff", "shape": "roundrectangle", "width": 140, "height": 70 } },
            { selector: "edge", style: { "width": 2, "line-color": GROUPS.decision.color, "target-arrow-color": GROUPS.decision.color, "target-arrow-shape": "triangle", "curve-style": "bezier", "label": "data(label)", "color": fg, "font-size": "11px", "font-weight": 600, "text-background-color": isLight ? "#f5f6fa" : "#0b0b0f", "text-background-opacity": 1, "text-background-padding": 3, "text-background-shape": "roundrectangle" } },
          ],
          layout: { name: "breadthfirst", directed: true, padding: 20, spacingFactor: 1.1, animate: true },
          minZoom: 0.3,
          maxZoom: 2,
          wheelSensitivity: 0.2,
        });
        this.treeCy.on("tap", "node", (evt) => {
          const n = evt.target;
          if (n.hasClass("dt-result")) this.show_toast("Result: " + n.data("label"));
        });
      },

      // calc
      fmt_num(n) { return fmt_num(n); },
      calc_cost() {
        const m = this.calc_models.find((x) => x.id === this.calc_model);
        if (!m) return "$0";
        const cost = (this.calc_input / 1e6) * m.in + (this.calc_output / 1e6) * m.out;
        return m.in === 0 && m.out === 0 ? "free (local)" : `~$${cost.toFixed(4)}`;
      },
      calc_pct() {
        const m = this.calc_models.find((x) => x.id === this.calc_model);
        if (!m) return "0%";
        const pct = ((this.calc_input + this.calc_output) / m.ctx) * 100;
        return `${pct.toFixed(1)}%`;
      },
      init_calc() { /* reactive sliders already bound */ },
    }));
  });

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
