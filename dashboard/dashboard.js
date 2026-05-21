// dashboard/dashboard.js

const $ = (id) => document.getElementById(id);
const send = (msg) => chrome.runtime.sendMessage(msg);

const CATEGORY_DOT = {
  ai_pipeline: "ai", session_replay: "replay", fingerprint: "fingerprint",
  marketing: "marketing", analytics: "analytics", ads: "ads",
  data_broker: "broker", ai_chat: "ai"
};

let DATA = null;

async function init() {
  DATA = await send({ type: "veil:getDashboardData" });
  if (!DATA) return;
  render();

  $("reset-btn").addEventListener("click", async () => {
    if (!confirm("Reset all collected data? This cannot be undone.")) return;
    await send({ type: "veil:resetAll" });
    DATA = await send({ type: "veil:getDashboardData" });
    render();
  });

  $("export-btn").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(DATA, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `veil-report-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  $("drawer-close").addEventListener("click", closeDrawer);
  document.querySelector(".drawer-scrim").addEventListener("click", closeDrawer);

  // refresh every 5s
  setInterval(async () => {
    DATA = await send({ type: "veil:getDashboardData" });
    render();
  }, 5000);
}

function render() {
  renderHero();
  renderCategories();
  renderSites();
  renderTrackers();
  renderAllowlist();
}

// ── Hero ────────────────────────────────────────────────
function renderHero() {
  const { global, sites } = DATA;
  const totalSites = Object.keys(sites || {}).length;
  const distinctTrackers = Object.keys(global.byTracker || {}).length;
  const installDays = (() => {
    // We didn't pass install_date through getDashboardData; fall back.
    return null;
  })();

  $("m-total").textContent = (global.totalBlocked || 0).toLocaleString();
  $("m-fp").textContent    = (global.totalFingerprint || 0).toLocaleString();
  $("m-sites").textContent = totalSites.toLocaleString();
  $("m-trackers").textContent = distinctTrackers.toLocaleString();

  // Estimate "monitoring active for X days" from the earliest site firstSeen we have
  const earliest = Object.values(sites || {})
    .map(s => s.firstSeen).filter(Boolean)
    .reduce((a, b) => Math.min(a, b), Date.now());
  const days = Math.max(0, Math.floor((Date.now() - earliest) / 86400000));
  $("install-age").textContent = days === 0 ? "monitoring today" : `${days} day${days === 1 ? "" : "s"} of records`;
}

// ── Categories ────────────────────────────────────────
function renderCategories() {
  const { global, categories } = DATA;
  const counts = global.byCategory || {};
  const max = Math.max(1, ...Object.values(counts));
  const order = Object.entries(categories);
  const wrap = $("cat-list");

  wrap.innerHTML = order.map(([key, meta]) => {
    const n = counts[key] || 0;
    const pct = (n / max) * 100;
    return `
      <article class="cat-card">
        <div>
          <div class="cat-title">
            <span class="cat-swatch ${CATEGORY_DOT[key] || ""}"></span>
            <div>
              <div class="cat-name">${meta.label}</div>
            </div>
          </div>
        </div>
        <div>
          <div class="cat-blurb">${meta.blurb}</div>
          <div class="cat-bar-wrap" style="margin-top:14px">
            <div class="cat-bar"><div class="cat-bar-fill" style="width:${pct}%; background: var(--${cssColorFor(key)})"></div></div>
          </div>
        </div>
        <div class="cat-num">${n.toLocaleString()}</div>
      </article>
    `;
  }).join("");
}

function cssColorFor(catKey) {
  return ({
    ai_pipeline: "warn",
    session_replay: "hot",
    fingerprint: "gold",
    marketing: "pink",
    analytics: "violet",
    ads: "rose",
    data_broker: "rose-2",
    ai_chat: "warn"
  })[catKey] || "warn";
}

// ── Sites ────────────────────────────────────────────
function renderSites() {
  const sites = DATA.sites || {};
  const rows = Object.entries(sites)
    .map(([host, s]) => ({
      host,
      n: (s.blocked || []).length + (s.fingerprint || []).length,
      lastSeen: s.lastSeen,
      fpN: (s.fingerprint || []).length
    }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 25);

  const wrap = $("sites-list");
  if (rows.length === 0) {
    wrap.innerHTML = `<div class="empty-card">No tracker activity recorded yet. Browse the web for a while — you'll see plenty.</div>`;
    return;
  }

  wrap.innerHTML = rows.map(r => `
    <div class="site-row" data-host="${escapeAttr(r.host)}">
      <div class="site-host">${escapeHtml(r.host)}</div>
      <div class="site-meta">${timeAgo(r.lastSeen)}${r.fpN ? ` · ${r.fpN} fp` : ""}</div>
      <div class="site-count">${r.n}</div>
    </div>
  `).join("");

  wrap.querySelectorAll(".site-row").forEach(el => {
    el.addEventListener("click", () => openDrawer(el.dataset.host));
  });
}

// ── Trackers ────────────────────────────────────────
function renderTrackers() {
  const { global, trackers } = DATA;
  const rows = Object.entries(global.byTracker || {})
    .map(([id, count]) => ({ tracker: trackers[id], count }))
    .filter(r => r.tracker)
    .sort((a, b) => b.count - a.count)
    .slice(0, 30);

  const wrap = $("trackers-list");
  if (rows.length === 0) {
    wrap.innerHTML = `<div class="empty-card">No trackers blocked yet.</div>`;
    return;
  }

  wrap.innerHTML = rows.map(({ tracker, count }) => `
    <div class="tracker-row">
      <div class="tracker-name">
        ${escapeHtml(tracker.name)}
        <span class="risk-pill ${tracker.risk}">${tracker.risk}</span>
        <small>${escapeHtml(tracker.company)}</small>
      </div>
      <div class="tracker-why">${escapeHtml(tracker.why)}</div>
      <div class="tracker-count">${count}</div>
    </div>
  `).join("");
}

// ── Allowlist ────────────────────────────────────────
function renderAllowlist() {
  const list = DATA.allowlist || [];
  const wrap = $("allowlist-list");
  if (list.length === 0) {
    wrap.innerHTML = `<div class="empty-card">No allowlisted sites. Veil is blocking on every site you visit.</div>`;
    return;
  }
  wrap.innerHTML = list.map(host => `
    <div class="allow-row">
      <div class="site-host">${escapeHtml(host)}</div>
      <button class="allow-remove" data-host="${escapeAttr(host)}">remove</button>
    </div>
  `).join("");
  wrap.querySelectorAll(".allow-remove").forEach(b => {
    b.addEventListener("click", async () => {
      await send({ type: "veil:setAllowlist", host: b.dataset.host, allowed: false });
      DATA = await send({ type: "veil:getDashboardData" });
      render();
    });
  });
}

// ── Drawer ────────────────────────────────────────
function openDrawer(host) {
  const site = DATA.sites[host];
  if (!site) return;
  $("drawer-host").textContent = host;

  const trackerCounts = {};
  (site.blocked || []).forEach(b => {
    trackerCounts[b.id] = (trackerCounts[b.id] || 0) + 1;
  });
  const trackerRows = Object.entries(trackerCounts)
    .map(([id, count]) => ({ tracker: DATA.trackers[id], count }))
    .filter(r => r.tracker)
    .sort((a, b) => b.count - a.count);

  const fpCounts = {};
  (site.fingerprint || []).forEach(f => {
    fpCounts[f.api] = (fpCounts[f.api] || 0) + (f.count || 1);
  });
  const fpRows = Object.entries(fpCounts).sort((a, b) => b[1] - a[1]);

  $("drawer-meta").innerHTML = `
    <div class="m"><div class="mn">${(site.blocked || []).length}</div><div class="ml">blocked</div></div>
    <div class="m"><div class="mn">${(site.fingerprint || []).length}</div><div class="ml">fingerprint</div></div>
    <div class="m"><div class="mn">${trackerRows.length}</div><div class="ml">distinct trackers</div></div>
    <div class="m"><div class="mn">${timeAgo(site.lastSeen)}</div><div class="ml">last seen</div></div>
  `;

  const body = [];
  if (trackerRows.length) {
    body.push(`<div class="drawer-section"><h4>Trackers attempted</h4>${
      trackerRows.map(({tracker, count}) => `
        <div class="drawer-tracker">
          <div class="drawer-tracker-head">
            <div class="drawer-tracker-name">${escapeHtml(tracker.name)} <span class="risk-pill ${tracker.risk}">${tracker.risk}</span></div>
            <div class="drawer-tracker-count">${count}×</div>
          </div>
          <div class="drawer-tracker-why">${escapeHtml(tracker.why)}</div>
          <div class="drawer-tracker-company">${escapeHtml(tracker.company)} · ${escapeHtml(tracker.domain)}</div>
        </div>
      `).join("")
    }</div>`);
  }
  if (fpRows.length) {
    body.push(`<div class="drawer-section"><h4>Fingerprinting API calls</h4>${
      fpRows.map(([api, n]) => `
        <div class="drawer-tracker">
          <div class="drawer-tracker-head">
            <div class="drawer-tracker-name">${escapeHtml(api)}</div>
            <div class="drawer-tracker-count">${n}×</div>
          </div>
          <div class="drawer-tracker-why">${describeFpApi(api)}</div>
        </div>
      `).join("")
    }</div>`);
  }
  if (!body.length) body.push(`<div class="empty-card">No tracker history yet.</div>`);
  $("drawer-body").innerHTML = body.join("");
  $("drawer").classList.remove("hidden");
}
function closeDrawer() { $("drawer").classList.add("hidden"); }

function describeFpApi(api) {
  const m = {
    "canvas.toDataURL":      "The site rendered hidden text or shapes to a canvas and asked for the pixel data — a classic browser fingerprint.",
    "canvas.toBlob":         "Same as toDataURL but returned as a blob.",
    "canvas.getImageData":   "Pixel-level read from a canvas — used to generate a stable device-specific hash.",
    "webgl.unmasked":        "The site asked WebGL for the real GPU vendor and renderer string — one of the strongest fingerprinting signals.",
    "audio.offlineRender":   "Audio fingerprinting: a silent oscillator is rendered and the floating-point result is used as a device ID.",
    "client-hints.highEntropy": "The site requested high-entropy User-Agent client hints (model, full version, architecture).",
    "battery.api":           "The deprecated Battery API was queried — historically used for cross-site identification.",
    "font.enumeration":      "Rapid measureText calls suggest the site is enumerating installed fonts to build a device profile."
  };
  return m[api] || "A known fingerprinting API was accessed.";
}

// ── Utilities ────────────────────────────────────────
function timeAgo(ts) {
  if (!ts) return "—";
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  return `${Math.floor(s/86400)}d ago`;
}
function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c]));
}
function escapeAttr(s) { return escapeHtml(s).replace(/"/g, "&quot;"); }

init().catch(e => {
  console.error(e);
  document.body.innerHTML = `<pre style="color:#ef4444;padding:40px;font-family:JetBrains Mono,monospace">Dashboard error: ${escapeHtml(e.message)}</pre>`;
});
