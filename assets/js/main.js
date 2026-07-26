(() => {
  const catalog = window.ai_data;
  if (!catalog) return;

  const qs = (sel, root = document) => root.querySelector(sel);
  const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

  const toast_el = qs("#toast");
  let toast_timer = 0;
  const show_toast = (msg) => {
    if (!toast_el) return;
    toast_el.textContent = msg;
    toast_el.classList.add("show");
    clearTimeout(toast_timer);
    toast_timer = setTimeout(() => toast_el.classList.remove("show"), 1800);
  };

  const copy_text = async (text, btn) => {
    try {
      await navigator.clipboard.writeText(text);
      if (btn) {
        const prev = btn.textContent;
        btn.classList.add("copied");
        btn.textContent = "copied";
        setTimeout(() => {
          btn.classList.remove("copied");
          btn.textContent = prev;
        }, 1400);
      }
      show_toast("Copied");
    } catch {
      show_toast("Copy failed");
    }
  };

  const fill_vars = (tpl, extra = {}) => {
    const now = new Date();
    const date = now.toLocaleDateString("en-CA", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const iso = now.toISOString().slice(0, 10);
    const map = {
      date,
      iso,
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
    return tpl.replace(/\{\{(\w+)(?:\|([^}]+))?\}\}/g, (_, key, fallback) =>
      map[key] != null ? String(map[key]) : fallback || `{{${key}}}`
    );
  };

  const find_prompt = (prompt_id) =>
    catalog.prompts.find((p) => p.id === prompt_id) || catalog.prompts[0];

  /* —— theme: dark / light / system —— */
  const root = document.documentElement;
  const theme_storage_key = "ai_theme_mode";
  const theme_buttons = qsa("[data-theme-mode]");

  const resolve_theme = (mode) => {
    if (mode === "system") {
      return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    return mode === "light" ? "light" : "dark";
  };

  const apply_theme = (mode) => {
    const resolved = resolve_theme(mode);
    root.setAttribute("data-theme", resolved);
    root.setAttribute("data-theme-mode", mode);
    localStorage.setItem(theme_storage_key, mode);
    theme_buttons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-theme-mode") === mode);
      btn.setAttribute("aria-pressed", btn.classList.contains("active") ? "true" : "false");
    });
  };

  const saved_mode = localStorage.getItem(theme_storage_key) || "dark";
  apply_theme(saved_mode);

  theme_buttons.forEach((btn) => {
    btn.addEventListener("click", () => apply_theme(btn.getAttribute("data-theme-mode")));
  });

  window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", () => {
    if ((localStorage.getItem(theme_storage_key) || "dark") === "system") apply_theme("system");
  });

  /* —— mobile nav —— */
  const sidebar = qs(".sidebar");
  const backdrop = qs(".backdrop");
  const open_nav = () => {
    sidebar?.classList.add("open");
    backdrop?.classList.add("show");
  };
  const close_nav = () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");
  };
  qs("#menu_toggle")?.addEventListener("click", open_nav);
  backdrop?.addEventListener("click", close_nav);
  qsa(".nav a").forEach((a) => a.addEventListener("click", close_nav));

  /* —— daily —— */
  const render_daily = () => {
    const now = new Date();
    const theme = catalog.daily_themes[now.getDay()];
    const prompt = find_prompt(theme.prompt_id);
    const date_str = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    qs("#daily_date").textContent = date_str;
    qs("#daily_focus").textContent = theme.focus;
    qs("#daily_hint").textContent = theme.hint;
    const body = fill_vars(prompt.body, { topic: theme.focus });
    const box = qs("#daily_prompt");
    box.textContent = body;
    box.dataset.raw = body;
    qs("#daily_prompt_title").textContent = prompt.title;
  };
  render_daily();

  qs("#copy_daily")?.addEventListener("click", (e) => {
    copy_text(qs("#daily_prompt").dataset.raw || qs("#daily_prompt").textContent, e.currentTarget);
  });

  qs("#reroll_daily")?.addEventListener("click", () => {
    const pick = catalog.daily_themes[Math.floor(Math.random() * catalog.daily_themes.length)];
    const prompt = find_prompt(pick.prompt_id);
    qs("#daily_focus").textContent = `${pick.focus} (reroll)`;
    qs("#daily_hint").textContent = pick.hint;
    const body = fill_vars(prompt.body, { topic: pick.focus });
    const box = qs("#daily_prompt");
    box.textContent = body;
    box.dataset.raw = body;
    qs("#daily_prompt_title").textContent = prompt.title;
    show_toast("Rerolled focus");
  });

  /* —— identity —— */
  const pillars = qs("#pillars");
  if (pillars) {
    pillars.innerHTML = catalog.identity.pillars
      .map(
        (p) =>
          `<div class="pillar" data-searchable="${p.t} ${p.d}"><strong>${p.t}</strong><span>${p.d}</span></div>`
      )
      .join("");
  }
  const identity_blurb = qs("#identity_blurb");
  if (identity_blurb) identity_blurb.textContent = catalog.identity.blurb;

  /* —— layers —— */
  const layers_body = qs("#layers_body");
  if (layers_body) {
    layers_body.innerHTML = catalog.layers
      .map(
        (row) => `
      <tr data-searchable="${row.name} ${row.job} ${row.put} ${row.example}">
        <td><code>${row.name}</code></td>
        <td>${row.job}</td>
        <td>${row.load}</td>
        <td><code>${row.put}</code></td>
        <td>${row.example}</td>
      </tr>`
      )
      .join("");
  }

  /* —— agent dirs —— */
  const dirs_grid = qs("#dirs_grid");
  if (dirs_grid) {
    dirs_grid.innerHTML = catalog.agent_dirs
      .map(
        (d) => `
      <article class="card" data-searchable="${d.path} ${d.tools} ${d.what} ${d.tip}">
        <button class="copy-btn" type="button" data-copy="${d.path}">copy</button>
        <h3><code>${d.path}</code></h3>
        <p class="note">${d.what}</p>
        <p class="meta-line">${d.tools}</p>
        <p class="tip-line">${d.tip}</p>
      </article>`
      )
      .join("");
  }

  /* —— skills guide —— */
  const skills_blurb = qs("#skills_blurb");
  if (skills_blurb) skills_blurb.textContent = catalog.skills_guide.blurb;

  const skills_vs = qs("#skills_vs_body");
  if (skills_vs) {
    skills_vs.innerHTML = catalog.skills_guide.vs_rules
      .map(
        (r) => `
      <tr data-searchable="${r.aspect} ${r.rule} ${r.skill}">
        <td>${r.aspect}</td>
        <td>${r.rule}</td>
        <td>${r.skill}</td>
      </tr>`
      )
      .join("");
  }

  const skills_how = qs("#skills_how");
  if (skills_how) {
    skills_how.innerHTML = catalog.skills_guide.how_to.map((s) => `<li data-searchable="${s}">${s}</li>`).join("");
  }

  const skills_examples = qs("#skills_examples");
  if (skills_examples) {
    skills_examples.innerHTML = catalog.skills_guide.examples
      .map(
        (s) => `
      <article class="card" data-searchable="${s.name} ${s.desc}">
        <button class="copy-btn" type="button" data-copy="${s.name}: ${s.desc}">copy</button>
        <h3><code>${s.name}</code></h3>
        <p>${s.desc}</p>
      </article>`
      )
      .join("");
  }

  /* —— mcp —— */
  const mcp_blurb = qs("#mcp_blurb");
  if (mcp_blurb) mcp_blurb.textContent = catalog.mcp_guide.blurb;

  const mcp_principles = qs("#mcp_principles");
  if (mcp_principles) {
    mcp_principles.innerHTML = catalog.mcp_guide.principles
      .map((p) => `<li data-searchable="${p}">${p}</li>`)
      .join("");
  }

  const mcp_body = qs("#mcp_body");
  if (mcp_body) {
    mcp_body.innerHTML = catalog.mcp_guide.catalog
      .map(
        (m) => `
      <tr data-searchable="${m.name} ${m.use}">
        <td><code>${m.name}</code></td>
        <td>${m.use}</td>
      </tr>`
      )
      .join("");
  }

  /* —— specs —— */
  const specs_grid = qs("#specs_grid");
  if (specs_grid) {
    specs_grid.innerHTML = catalog.specs
      .map(
        (s) => `
      <article class="card" data-searchable="${s.name} ${s.note}">
        <button class="copy-btn" type="button" data-copy="${s.url}">copy</button>
        <h3><a href="${s.url}" target="_blank" rel="noopener">${s.name}</a></h3>
        <p>${s.note}</p>
      </article>`
      )
      .join("");
  }

  /* —— cpp —— */
  const cpp_grid = qs("#cpp_grid");
  if (cpp_grid) {
    cpp_grid.innerHTML = catalog.cpp_playbook
      .map(
        (p) => `
      <article class="card" data-searchable="${p.title} ${p.body}">
        <button class="copy-btn" type="button" data-copy-encoded="${encodeURIComponent(p.title + "\\n\\n" + p.body)}">copy</button>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
      </article>`
      )
      .join("");
  }

  /* —— organization —— */
  const org_grid = qs("#org_grid");
  if (org_grid) {
    org_grid.innerHTML = catalog.organization
      .map(
        (p) => `
      <article class="card" data-searchable="${p.title} ${p.body}">
        <button class="copy-btn" type="button" data-copy-encoded="${encodeURIComponent(p.title + "\\n\\n" + p.body)}">copy</button>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
      </article>`
      )
      .join("");
  }

  /* —— drivers —— */
  const drivers = qs("#drivers_grid");
  if (drivers) {
    drivers.innerHTML = catalog.daily_drivers
      .map(
        (t) => `
      <article class="card" data-searchable="${t.name} ${t.note} ${t.tags.join(" ")}" data-tags="${t.tags.join(",")}">
        <button class="copy-btn" type="button" data-copy="${t.url}">copy</button>
        <h3><a href="${t.url}" target="_blank" rel="noopener">${t.name}</a></h3>
        <p>${t.note}</p>
        ${t.tags.map((x) => `<span class="tag">${x}</span>`).join("")}
      </article>`
      )
      .join("");
  }

  /* —— models —— */
  const models_body = qs("#models_body");
  if (models_body) {
    models_body.innerHTML = catalog.models
      .map(
        (m) => `
      <tr data-searchable="${m.name} ${m.use} ${m.when}">
        <td><code>${m.name}</code></td>
        <td>${m.use}</td>
        <td>${m.when}</td>
      </tr>`
      )
      .join("");
  }

  /* —— arenas —— */
  const arenas = qs("#arenas_grid");
  if (arenas) {
    arenas.innerHTML = catalog.arenas
      .map(
        (a) => `
      <article class="card" data-searchable="${a.name} ${a.note}">
        <button class="copy-btn" type="button" data-copy="${a.url}">copy</button>
        <h3><a href="${a.url}" target="_blank" rel="noopener">${a.name}</a></h3>
        <p>${a.note}</p>
      </article>`
      )
      .join("");
  }

  /* —— prompts —— */
  const prompts_el = qs("#prompts_list");
  const cats = ["all", ...new Set(catalog.prompts.map((p) => p.cat))];
  const filters = qs("#prompt_filters");
  if (filters) {
    filters.innerHTML = cats
      .map((c, i) => `<button type="button" class="chip${i === 0 ? " active" : ""}" data-filter="${c}">${c}</button>`)
      .join("");
  }

  const bind_copy_buttons = (scope = document) => {
    qsa(".copy-btn", scope).forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = btn.getAttribute("data-copy-target");
        const encoded = btn.getAttribute("data-copy-encoded");
        let text = "";
        if (target) text = qs(`#${CSS.escape(target)}`)?.textContent || "";
        else if (encoded != null) text = decodeURIComponent(encoded);
        else text = btn.getAttribute("data-copy") || "";
        if (text) copy_text(text.replace(/\\n/g, "\n"), btn);
      });
    });
  };

  const render_prompts = (filter = "all") => {
    if (!prompts_el) return;
    const list = filter === "all" ? catalog.prompts : catalog.prompts.filter((p) => p.cat === filter);
    prompts_el.innerHTML = list
      .map((p, idx) => {
        const filled = fill_vars(p.body);
        const id = `prompt_${p.id}_${idx}`;
        return `
        <article class="prompt-item" data-searchable="${p.title} ${p.cat} ${p.tags.join(" ")} ${p.body}" data-tags="${p.cat}">
          <button class="copy-btn" type="button" data-copy-target="${id}">copy</button>
          <h3>${p.title}</h3>
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          <div class="prompt-box" id="${id}">${filled.replace(/</g, "&lt;")}</div>
        </article>`;
      })
      .join("");
    bind_copy_buttons(prompts_el);
  };
  render_prompts();

  filters?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    qsa(".chip", filters).forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    render_prompts(chip.dataset.filter);
    apply_search(qs("#search")?.value || "");
  });

  /* —— templates —— */
  const templates_el = qs("#templates_list");
  if (templates_el) {
    templates_el.innerHTML = catalog.templates
      .map((t, idx) => {
        const id = `template_${t.id}_${idx}`;
        return `
        <article class="prompt-item" data-searchable="${t.title} ${t.body}">
          <button class="copy-btn" type="button" data-copy-target="${id}">copy</button>
          <h3>${t.title}</h3>
          <div class="prompt-box" id="${id}">${t.body.replace(/</g, "&lt;")}</div>
        </article>`;
      })
      .join("");
  }

  /* —— pipelines —— */
  const pipes = qs("#pipelines");
  if (pipes) {
    pipes.innerHTML = catalog.pipelines
      .map(
        (p) => `
      <article class="pipeline" data-searchable="${p.title} ${p.note} ${p.steps.join(" ")}">
        <h3>${p.title}</h3>
        <div class="steps">${p.steps.map((s, i) => `<span class="step"><n>${i + 1}.</n>${s}</span>`).join("")}</div>
        <p class="note">${p.note}</p>
      </article>`
      )
      .join("");
  }

  /* —— practices —— */
  const practices = qs("#practices_grid");
  if (practices) {
    practices.innerHTML = catalog.practices
      .map(
        (p) => `
      <article class="card" data-searchable="${p.title} ${p.body}">
        <button class="copy-btn" type="button" data-copy-encoded="${encodeURIComponent(p.title + "\\n\\n" + p.body)}">copy</button>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
      </article>`
      )
      .join("");
  }

  /* —— digests —— */
  const digests = qs("#digests_grid");
  if (digests) {
    digests.innerHTML = catalog.digests
      .map((d) => {
        const prompt = find_prompt(d.prompt_id);
        const body = fill_vars(prompt.body, { topic: d.title });
        return `
        <article class="card digest-tile" data-searchable="${d.title} ${d.topics.join(" ")}">
          <button class="copy-btn" type="button" data-copy-encoded="${encodeURIComponent(body)}">copy</button>
          <h3><span class="icon">${d.icon}</span>${d.title}</h3>
          <ul>${d.topics.map((t) => `<li>${t}</li>`).join("")}</ul>
        </article>`;
      })
      .join("");
  }

  /* —— watch / bookmarks —— */
  const watch_map = qs("#watch_map");
  if (watch_map) {
    watch_map.innerHTML = catalog.watch
      .map(
        (g) => `
      <div class="map-group" data-searchable="${g.group} ${g.links.map((l) => l.n).join(" ")}">
        <h3>${g.group}</h3>
        ${g.links.map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.n}</a>`).join("")}
      </div>`
      )
      .join("");
  }

  const bookmark_map = qs("#bookmark_map");
  if (bookmark_map) {
    bookmark_map.innerHTML = catalog.bookmarks
      .map(
        (g) => `
      <div class="map-group" data-searchable="${g.group} ${g.links.map((l) => l.n).join(" ")}">
        <h3>${g.group}</h3>
        ${g.links.map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.n}</a>`).join("")}
      </div>`
      )
      .join("");
  }

  bind_copy_buttons();

  /* —— search —— */
  const empty = qs("#empty_state");
  function apply_search(query) {
    const q = query.toLowerCase().trim();
    let visible = 0;
    qsa("[data-searchable]").forEach((el) => {
      const hay = (el.getAttribute("data-searchable") || "").toLowerCase();
      const show = !q || hay.includes(q);
      el.classList.toggle("search-hidden", !show);
      if (show) visible++;
    });
    empty?.classList.toggle("show", visible === 0);
  }
  qs("#search")?.addEventListener("input", (e) => apply_search(e.target.value));

  /* —— driver filters —— */
  const driver_filters = qs("#driver_filters");
  if (driver_filters) {
    const tags = ["all", ...new Set(catalog.daily_drivers.flatMap((d) => d.tags))];
    driver_filters.innerHTML = tags
      .map((t, i) => `<button type="button" class="chip${i === 0 ? " active" : ""}" data-filter="${t}">${t}</button>`)
      .join("");
    driver_filters.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      qsa(".chip", driver_filters).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      qsa("#drivers_grid .card").forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(",");
        card.classList.toggle("search-hidden", f !== "all" && !tags.includes(f));
      });
    });
  }

  /* —— active nav —— */
  const sections = qsa(".section");
  const nav_links = qsa(".nav a");
  const on_scroll = () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    nav_links.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", on_scroll, { passive: true });
  on_scroll();

  /* —— keyboard —— */
  const search_input = qs("#search");
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== search_input && document.activeElement?.tagName !== "INPUT") {
      e.preventDefault();
      search_input?.focus();
    }
    if (e.key === "Escape") {
      if (document.activeElement === search_input) {
        search_input.value = "";
        apply_search("");
        search_input.blur();
      }
      close_nav();
    }
  });

  const year_el = qs("#year");
  if (year_el) year_el.textContent = String(new Date().getFullYear());
})();
