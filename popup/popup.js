// popup/popup.js

const CATEGORY_LABELS = {
  ai_pipeline:    "AI/ML pipelines",
  session_replay: "Session replay",
  fingerprint:    "Fingerprinting",
  marketing:      "Marketing pixels",
  analytics:      "Analytics",
  ads:            "Ad networks",
  data_broker:    "Data brokers",
  ai_chat:        "AI chat widgets"
};
const CATEGORY_DOT = {
  ai_pipeline: "ai", session_replay: "replay", fingerprint: "fingerprint",
  marketing: "marketing", analytics: "analytics", ads: "ads",
  data_broker: "broker", ai_chat: "ai"
};

const $ = (id) => document.getElementById(id);
const send = (msg) => chrome.runtime.sendMessage(msg);

async function init() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return;

  const data = await send({ type: "veil:getPopupData", tabId: tab.id });
  render(data, tab);

  // refresh every second while popup is open
  const ticker = setInterval(async () => {
    const d = await send({ type: "veil:getPopupData", tabId: tab.id });
    render(d, tab);
  }, 1000);
  window.addEventListener("unload", () => clearInterval(ticker));

  $("allow-toggle").addEventListener("change", async (e) => {
    const allowed = !e.target.checked; // checkbox is "block on this site"
    await send({ type: "veil:setAllowlist", host: data.host, allowed });
    // reload the tab so the change takes effect
    chrome.tabs.reload(tab.id);
    setTimeout(() => window.close(), 100);
  });

  $("open-dash").addEventListener("click", openDashboard);
  $("open-dash-2").addEventListener("click", openDashboard);
}

function openDashboard() {
  chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/dashboard.html") });
  window.close();
}

function render(data, tab) {
  const host = data.host || "—";
  $("host").textContent = host || (tab.url ? "internal page" : "—");
  $("blocked-num").textContent = (data.tab?.count || 0).toString();
  $("fp-num").textContent = (data.tab?.fingerprint || 0).toString();

  // breakdown
  const wrap = $("breakdown");
  const cats = data.tab?.byCategory || {};
  const entries = Object.entries(cats).sort((a,b) => b[1] - a[1]);
  if (entries.length === 0) {
    wrap.innerHTML = '<div class="empty">No client-side trackers seen on this page yet.</div>';
  } else {
    wrap.innerHTML = entries.map(([cat, n]) => `
      <div class="cat-row">
        <span class="cat-name"><span class="cat-dot ${CATEGORY_DOT[cat] || ""}"></span>${CATEGORY_LABELS[cat] || cat}</span>
        <span class="cat-count">${n}</span>
      </div>
    `).join("");
  }

  // toggle (checked = blocking on)
  $("allow-toggle").checked = !data.allowed;
  $("toggle-sub").textContent = data.allowed
    ? "This site is allowlisted — page reloads on toggle"
    : "Trackers are being blocked on this site";

  // footer
  $("global-total").textContent =
    `${(data.globalTotal || 0).toLocaleString()} lifetime blocks`;
}

init().catch(e => console.error(e));
