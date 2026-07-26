/* Personal AI recipe book — Alpine + Fuse only. Content in data.js. */
(() => {
  const catalog = window.ai_data;
  if (!catalog) return;

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
      company: "<company / person>",
      lang: "English",
      ...extra,
    };
    return String(tpl || "").replace(/\{\{(\w+)(?:\|([^}]+))?\}\}/g, (_, key, fallback) =>
      map[key] != null ? String(map[key]) : fallback || `{{${key}}}`
    );
  };

  const find_prompt = (id) => catalog.prompts.find((p) => p.id === id);

  const build_index = () => {
    const items = [];
    const push = (i) => items.push(i);

    // daily
    const day = catalog.daily_themes[new Date().getDay()];
    const daily_prompt = find_prompt(day.prompt_id) || catalog.prompts[0];
    const daily_body = fill_vars(daily_prompt.body, { topic: day.focus });
    push({
      id: "daily",
      kind: "daily",
      title: `Today · ${day.focus}`,
      plain: day.hint,
      body: daily_body,
      group: "today",
      copy: daily_body,
      focus: day.focus,
      hint: day.hint,
    });

    catalog.daily_drivers.forEach((t, i) => {
      const limits = t.limits || [];
      const body = [t.note, limits.length ? "Limitations:" : "", ...limits.map((l) => `• ${l}`)]
        .filter(Boolean)
        .join("\n");
      push({
        id: `tool_${i}`,
        kind: "tool",
        title: t.name,
        plain: t.note,
        body,
        limits,
        specs: t.specs,
        url: t.url,
        group: "tools",
        tags: t.tags,
        copy: body,
      });
    });

    (catalog.models || []).forEach((m, i) =>
      push({
        id: `model_${i}`,
        kind: "model",
        title: m.name,
        plain: m.use,
        body: `${m.use}\n\nWhen: ${m.when}`,
        group: "models",
        copy: `${m.name}\n${m.use}\n${m.when}`,
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
      });
    });

    (catalog.pipelines || []).forEach((pipe) =>
      push({
        id: `pipeline_${pipe.id}`,
        kind: "pipeline",
        title: pipe.title,
        plain: pipe.plain || pipe.note,
        body: pipe.note || "",
        when: pipe.when,
        note: pipe.note,
        stages: pipe.stages || [],
        group: "pipelines",
        copy: pipe.note || pipe.title,
      })
    );

    (catalog.business || []).forEach((b, i) => {
      const prompt = find_prompt(b.prompt_id);
      const body = prompt ? fill_vars(prompt.body) : b.note;
      push({
        id: `biz_${i}`,
        kind: "business",
        title: b.title,
        plain: b.plain,
        body,
        note: b.note,
        group: "business",
        copy: body,
      });
    });

    (catalog.music || []).forEach((m, i) =>
      push({
        id: `music_${i}`,
        kind: "music",
        title: m.name,
        plain: m.note,
        body: m.note,
        url: m.url,
        group: "vibe",
        tags: m.tags,
        copy: `${m.name}\n${m.url}`,
      })
    );

    (catalog.signals || []).forEach((s, i) =>
      push({
        id: `signal_${i}`,
        kind: "signal",
        title: s.name,
        plain: s.note,
        body: s.note,
        url: s.url,
        group: "vibe",
        copy: s.url,
      })
    );

    catalog.digests.forEach((d) => {
      const prompt = find_prompt(d.prompt_id);
      const body = prompt ? fill_vars(prompt.body, { topic: d.title }) : d.topics.join(", ");
      push({
        id: `digest_${d.id}`,
        kind: "digest",
        title: d.title,
        plain: d.topics.slice(0, 3).join(" · "),
        body,
        group: "digests",
        copy: body,
      });
    });

    (catalog.skills_guide?.examples || []).forEach((s, i) =>
      push({
        id: `skill_${i}`,
        kind: "skill",
        title: s.name,
        plain: s.desc,
        body: s.desc,
        group: "skills",
        copy: `${s.name}\n\n${s.desc}`,
      })
    );

    (catalog.practices || []).forEach((p, i) =>
      push({
        id: `practice_${i}`,
        kind: "practice",
        title: p.title,
        plain: p.body,
        body: p.body,
        group: "practices",
        copy: `${p.title}\n\n${p.body}`,
      })
    );

    (catalog.organization || []).forEach((o, i) =>
      push({
        id: `org_${i}`,
        kind: "org",
        title: o.title,
        plain: o.body,
        body: o.body,
        group: "practices",
        copy: `${o.title}\n\n${o.body}`,
      })
    );

    (catalog.specs || []).forEach((s, i) =>
      push({
        id: `spec_${i}`,
        kind: "spec",
        title: s.name,
        plain: s.note,
        body: s.note,
        url: s.url,
        group: "watch",
        copy: s.url,
      })
    );

    (catalog.watch || []).forEach((g, gi) =>
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
        })
      )
    );

    return items;
  };

  document.addEventListener("alpine:init", () => {
    Alpine.data("app", () => ({
      items: [],
      fuse: null,
      query: "",
      results: [],
      palette_open: false,
      drawer_open: false,
      selected: null,
      active_result: 0,
      toast: "",
      toast_timer: 0,
      theme_mode: localStorage.getItem("ai_theme_mode") || "dark",
      mod_key: /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent || "") ? "⌘K" : "Ctrl K",
      active_filter: "today",
      filters: [
        { id: "today", label: "Today" },
        { id: "tools", label: "Tools" },
        { id: "pipelines", label: "Pipelines" },
        { id: "prompts", label: "Prompts" },
        { id: "business", label: "Business" },
        { id: "vibe", label: "Vibe" },
        { id: "digests", label: "Digests" },
        { id: "skills", label: "Skills" },
        { id: "practices", label: "Practices" },
        { id: "watch", label: "Watch" },
        { id: "all", label: "All" },
      ],

      get visible_items() {
        const list =
          this.active_filter === "all"
            ? this.items.filter((i) => i.kind !== "hub")
            : this.items.filter((i) => i.group === this.active_filter);
        return list;
      },

      get daily() {
        return this.items.find((i) => i.id === "daily");
      },

      get meta() {
        return catalog.meta;
      },

      get identity() {
        return catalog.identity;
      },

      get personality() {
        return catalog.personality;
      },

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
        window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
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
        document.documentElement.setAttribute("data-theme", this.resolve_theme(mode));
        document.documentElement.setAttribute("data-theme-mode", mode);
        localStorage.setItem("ai_theme_mode", mode);
      },

      set_filter(id) {
        this.active_filter = id;
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
        return this.items
          .filter((i) => ["daily", "tool_0", "tool_2", "pipeline_ship_feature", "biz_0", "music_0"].includes(i.id))
          .concat(this.items.filter((i) => i.kind === "prompt").slice(0, 3));
      },

      on_query() {
        const q = this.query.trim();
        this.results = q ? this.fuse.search(q).map((r) => r.item).slice(0, 14) : this.default_results();
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
      },

      close_drawer() {
        this.drawer_open = false;
      },

      async copy_text(text) {
        try {
          await navigator.clipboard.writeText(text);
          this.show_toast("Copied");
        } catch {
          this.show_toast("Copy failed");
        }
      },

      async copy_selected() {
        if (!this.selected?.copy) return;
        await this.copy_text(this.selected.copy);
      },

      async copy_daily() {
        if (this.daily?.copy) await this.copy_text(this.daily.copy);
      },

      stage_prompt(stage) {
        return fill_vars(stage.prompt || "");
      },

      async copy_stage(stage) {
        const text = this.stage_prompt(stage);
        if (text) await this.copy_text(text);
      },

      async copy_pipeline() {
        if (!this.selected || this.selected.kind !== "pipeline") return;
        const chunks = [`# ${this.selected.title}`, this.selected.note || "", ""];
        (this.selected.stages || []).forEach((stage, idx) => {
          if (stage.parallel) {
            chunks.push(`## ${idx + 1}. ${stage.title}`);
            stage.parallel.forEach((p) => {
              chunks.push(`### ${p.title} (${p.tool || ""})`, this.stage_prompt(p), "");
            });
          } else {
            chunks.push(`## ${idx + 1}. ${stage.title} (${stage.tool || ""})`, this.stage_prompt(stage), "");
          }
        });
        await this.copy_text(chunks.join("\n"));
      },

      show_toast(msg) {
        this.toast = msg;
        clearTimeout(this.toast_timer);
        this.toast_timer = setTimeout(() => (this.toast = ""), 1600);
      },

      kind_label(kind) {
        return (
          {
            daily: "Today",
            tool: "Tool",
            model: "Model",
            prompt: "Prompt",
            pipeline: "Pipeline",
            business: "Business",
            music: "Music",
            signal: "Signal",
            digest: "Digest",
            skill: "Skill",
            practice: "Practice",
            org: "Practice",
            spec: "Guide",
            watch: "Watch",
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
