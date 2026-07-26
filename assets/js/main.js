(() => {
  const D = window.AI_DATA;
  if (!D) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const toastEl = $("#toast");
  const showToast = (msg) => {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove("show"), 1800);
  };

  const copy = async (text, btn) => {
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
      showToast("Copied");
    } catch {
      showToast("Copy failed");
    }
  };

  const fillVars = (tpl, extra = {}) => {
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
      ...extra,
    };
    return tpl.replace(/\{\{(\w+)(?:\|([^}]+))?\}\}/g, (_, key, fallback) =>
      map[key] != null ? String(map[key]) : fallback || `{{${key}}}`
    );
  };

  // Theme
  const root = document.documentElement;
  const themeBtn = $("#theme-toggle");
  const saved = localStorage.getItem("ai-theme") || "dark";
  root.setAttribute("data-theme", saved);
  const syncThemeLabel = () => {
    if (themeBtn) themeBtn.textContent = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  };
  syncThemeLabel();
  themeBtn?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("ai-theme", next);
    syncThemeLabel();
  });

  // Mobile nav
  const sidebar = $(".sidebar");
  const backdrop = $(".backdrop");
  const openNav = () => {
    sidebar?.classList.add("open");
    backdrop?.classList.add("show");
  };
  const closeNav = () => {
    sidebar?.classList.remove("open");
    backdrop?.classList.remove("show");
  };
  $("#menu-toggle")?.addEventListener("click", openNav);
  backdrop?.addEventListener("click", closeNav);
  $$(".nav a").forEach((a) => a.addEventListener("click", closeNav));

  // Daily panel
  const renderDaily = () => {
    const now = new Date();
    const theme = D.dailyThemes[now.getDay()];
    const prompt = D.prompts.find((p) => p.id === theme.promptId) || D.prompts[0];
    const dateStr = now.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    $("#daily-date").textContent = dateStr;
    $("#daily-focus").textContent = theme.focus;
    $("#daily-hint").textContent = theme.hint;
    const body = fillVars(prompt.body, { topic: theme.focus });
    const box = $("#daily-prompt");
    box.textContent = body;
    box.dataset.raw = body;
    $("#daily-prompt-title").textContent = prompt.title;
  };
  renderDaily();

  $("#copy-daily")?.addEventListener("click", (e) => {
    copy($("#daily-prompt").dataset.raw || $("#daily-prompt").textContent, e.currentTarget);
  });

  $("#reroll-daily")?.addEventListener("click", () => {
    const pick = D.dailyThemes[Math.floor(Math.random() * D.dailyThemes.length)];
    const prompt = D.prompts.find((p) => p.id === pick.promptId) || D.prompts[0];
    $("#daily-focus").textContent = pick.focus + " (reroll)";
    $("#daily-hint").textContent = pick.hint;
    const body = fillVars(prompt.body, { topic: pick.focus });
    const box = $("#daily-prompt");
    box.textContent = body;
    box.dataset.raw = body;
    $("#daily-prompt-title").textContent = prompt.title;
    showToast("Rerolled focus");
  });

  // Identity pillars
  const pillars = $("#pillars");
  if (pillars) {
    pillars.innerHTML = D.identity.pillars
      .map((p) => `<div class="pillar" data-searchable="${p.t} ${p.d}"><strong>${p.t}</strong><span>${p.d}</span></div>`)
      .join("");
  }
  $("#identity-blurb").textContent = D.identity.blurb;

  // Drivers
  const drivers = $("#drivers-grid");
  if (drivers) {
    drivers.innerHTML = D.dailyDrivers
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

  // Models table
  const modelsBody = $("#models-body");
  if (modelsBody) {
    modelsBody.innerHTML = D.models
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

  // Arenas
  const arenas = $("#arenas-grid");
  if (arenas) {
    arenas.innerHTML = D.arenas
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

  // Prompts
  const promptsEl = $("#prompts-list");
  const cats = ["all", ...new Set(D.prompts.map((p) => p.cat))];
  const filters = $("#prompt-filters");
  if (filters) {
    filters.innerHTML = cats
      .map((c, i) => `<button type="button" class="chip${i === 0 ? " active" : ""}" data-filter="${c}">${c}</button>`)
      .join("");
  }

  const renderPrompts = (filter = "all") => {
    if (!promptsEl) return;
    const list = filter === "all" ? D.prompts : D.prompts.filter((p) => p.cat === filter);
    promptsEl.innerHTML = list
      .map((p, idx) => {
        const filled = fillVars(p.body);
        const id = `prompt-${p.id}-${idx}`;
        return `
        <article class="prompt-item" data-searchable="${p.title} ${p.cat} ${p.tags.join(" ")} ${p.body}" data-tags="${p.cat}">
          <button class="copy-btn" type="button" data-copy-target="${id}">copy</button>
          <h3>${p.title}</h3>
          ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
          <div class="prompt-box" id="${id}">${filled.replace(/</g, "&lt;")}</div>
        </article>`;
      })
      .join("");
    bindCopyButtons(promptsEl);
  };
  renderPrompts();

  filters?.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    $$(".chip", filters).forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    renderPrompts(chip.dataset.filter);
    applySearch($("#search")?.value || "");
  });

  // Pipelines
  const pipes = $("#pipelines");
  if (pipes) {
    pipes.innerHTML = D.pipelines
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

  // MCPs
  const mcpBody = $("#mcp-body");
  if (mcpBody) {
    mcpBody.innerHTML = D.mcps
      .map(
        (m) => `
      <tr data-searchable="${m.name} ${m.use}">
        <td><code>${m.name}</code></td>
        <td>${m.use}</td>
      </tr>`
      )
      .join("");
  }

  // Practices
  const practices = $("#practices-grid");
  if (practices) {
    practices.innerHTML = D.practices
      .map(
        (p) => `
      <article class="card" data-searchable="${p.title} ${p.body}">
        <button class="copy-btn" type="button" data-copy="${p.title}\\n\\n${p.body}">copy</button>
        <h3>${p.title}</h3>
        <p>${p.body}</p>
      </article>`
      )
      .join("");
  }

  // Digests
  const digests = $("#digests-grid");
  if (digests) {
    digests.innerHTML = D.digests
      .map((d) => {
        const prompt = D.prompts.find((p) => p.id === d.promptId);
        const body = prompt ? fillVars(prompt.body, { topic: d.title }) : "";
        const encoded = encodeURIComponent(body);
        return `
        <article class="card digest-tile" data-searchable="${d.title} ${d.topics.join(" ")}">
          <button class="copy-btn" type="button" data-copy-encoded="${encoded}">copy</button>
          <h3><span class="icon">${d.icon}</span>${d.title}</h3>
          <ul>${d.topics.map((t) => `<li>${t}</li>`).join("")}</ul>
        </article>`;
      })
      .join("");
  }

  // Bookmarks
  const map = $("#bookmark-map");
  if (map) {
    map.innerHTML = D.bookmarks
      .map(
        (g) => `
      <div class="map-group" data-searchable="${g.group} ${g.links.map((l) => l.n).join(" ")}">
        <h3>${g.group}</h3>
        ${g.links.map((l) => `<a href="${l.u}" target="_blank" rel="noopener">${l.n}</a>`).join("")}
      </div>`
      )
      .join("");
  }

  function bindCopyButtons(scope = document) {
    $$(".copy-btn", scope).forEach((btn) => {
      if (btn.dataset.bound) return;
      btn.dataset.bound = "1";
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const target = btn.getAttribute("data-copy-target");
        const encoded = btn.getAttribute("data-copy-encoded");
        let text = "";
        if (target) text = $(`#${CSS.escape(target)}`)?.textContent || "";
        else if (encoded != null) text = decodeURIComponent(encoded);
        else text = btn.getAttribute("data-copy") || "";
        if (text) copy(text.replace(/\\n/g, "\n"), btn);
      });
    });
  }
  bindCopyButtons();

  // Search
  const empty = $("#empty-state");
  function applySearch(query) {
    const q = query.toLowerCase().trim();
    let visible = 0;
    $$("[data-searchable]").forEach((el) => {
      const hay = (el.getAttribute("data-searchable") || "").toLowerCase();
      const show = !q || hay.includes(q);
      el.classList.toggle("search-hidden", !show);
      if (show) visible++;
    });
    empty?.classList.toggle("show", visible === 0);
  }
  $("#search")?.addEventListener("input", (e) => applySearch(e.target.value));

  // Driver filter chips
  const driverFilters = $("#driver-filters");
  if (driverFilters) {
    const tags = ["all", ...new Set(D.dailyDrivers.flatMap((d) => d.tags))];
    driverFilters.innerHTML = tags
      .map((t, i) => `<button type="button" class="chip${i === 0 ? " active" : ""}" data-filter="${t}">${t}</button>`)
      .join("");
    driverFilters.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip");
      if (!chip) return;
      $$(".chip", driverFilters).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      $$("#drivers-grid .card").forEach((card) => {
        const tags = (card.getAttribute("data-tags") || "").split(",");
        card.classList.toggle("search-hidden", f !== "all" && !tags.includes(f));
      });
    });
  }

  // Active nav on scroll
  const sections = $$(".section");
  const navLinks = $$(".nav a");
  const onScroll = () => {
    let current = "";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Keyboard
  const searchInput = $("#search");
  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput && document.activeElement?.tagName !== "INPUT") {
      e.preventDefault();
      searchInput?.focus();
    }
    if (e.key === "Escape") {
      if (document.activeElement === searchInput) {
        searchInput.value = "";
        applySearch("");
        searchInput.blur();
      }
      closeNav();
    }
  });

  // Meta year
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
