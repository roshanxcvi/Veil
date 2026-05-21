// background.js
// Service worker. Three jobs:
//   1. Watch declarativeNetRequest rule matches and log them.
//   2. Receive fingerprinting reports from the page-world content script.
//   3. Answer queries from the popup and dashboard.
//
// MV3 service workers can be torn down at any time. Best practice:
// register every event listener SYNCHRONOUSLY at the top of the module
// so we don't miss events that wake the SW. State is hydrated lazily
// inside the handlers from chrome.storage.

import { TRACKER_BY_ID, CATEGORIES } from "./data/trackers.js";

const SCHEMA_VERSION = 1;

// ────────────────────────────────────────────────────────────────
// Cache (rehydrated on every SW wake-up)
// ────────────────────────────────────────────────────────────────

const cache = {
  ready: false,
  stats_global: null,
  sites: null,
  allowlist: null
};

let readyPromise = null;
function ensureReady() {
  if (cache.ready) return Promise.resolve();
  if (!readyPromise) readyPromise = (async () => {
    const v = (await chrome.storage.local.get("schema_version")).schema_version;
    if (v !== SCHEMA_VERSION) {
      await chrome.storage.local.set({
        schema_version: SCHEMA_VERSION,
        stats_global: { totalBlocked: 0, totalFingerprint: 0, byCategory: {}, byTracker: {} },
        sites: {},
        allowlist: [],
        install_date: Date.now()
      });
    }
    const r = await chrome.storage.local.get(["stats_global","sites","allowlist"]);
    cache.stats_global = r.stats_global || { totalBlocked: 0, totalFingerprint: 0, byCategory: {}, byTracker: {} };
    cache.sites = r.sites || {};
    cache.allowlist = r.allowlist || [];
    cache.ready = true;
  })();
  return readyPromise;
}

let flushTimer = null;
function scheduleFlush() {
  if (flushTimer) return;
  flushTimer = setTimeout(async () => {
    flushTimer = null;
    if (!cache.ready) return;
    try {
      await chrome.storage.local.set({
        stats_global: cache.stats_global,
        sites: cache.sites
      });
    } catch (e) {
      console.warn("Veil: flush failed", e);
    }
  }, 600);
}

// ────────────────────────────────────────────────────────────────
// 1. Rule-match logging
// ────────────────────────────────────────────────────────────────

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((info) => {
  handleRuleMatch(info).catch(e => console.warn("Veil rule-match handler error", e));
});

async function handleRuleMatch(info) {
  await ensureReady();
  const { rule, request } = info;
  const tracker = TRACKER_BY_ID[rule.ruleId];
  if (!tracker) return;

  // Find the top-level page hostname
  let pageHost = "";
  if (request.tabId >= 0) {
    try {
      const tab = await chrome.tabs.get(request.tabId);
      if (tab?.url) pageHost = new URL(tab.url).hostname;
    } catch (_) { /* tab gone */ }
  }
  if (!pageHost) {
    try { pageHost = new URL(request.documentUrl || request.initiator || request.url).hostname; } catch(_) {}
  }
  if (!pageHost) pageHost = "(unknown)";

  if (cache.allowlist.includes(pageHost)) return;

  const now = Date.now();

  cache.stats_global.totalBlocked += 1;
  cache.stats_global.byCategory[tracker.category] = (cache.stats_global.byCategory[tracker.category] || 0) + 1;
  cache.stats_global.byTracker[tracker.id] = (cache.stats_global.byTracker[tracker.id] || 0) + 1;

  const site = cache.sites[pageHost] ||= { firstSeen: now, lastSeen: now, blocked: [], fingerprint: [], categories: {} };
  site.lastSeen = now;
  site.categories[tracker.category] = (site.categories[tracker.category] || 0) + 1;
  site.blocked.push({ id: tracker.id, ts: now, url: request.url.slice(0, 200), type: request.type });
  if (site.blocked.length > 300) site.blocked.splice(0, site.blocked.length - 300);

  if (request.tabId >= 0) {
    await bumpTabCounter(request.tabId, pageHost, "blocked", tracker.category);
  }

  scheduleFlush();
}

async function bumpTabCounter(tabId, host, kind, category) {
  const key = `tab_${tabId}`;
  const cur = (await chrome.storage.session.get(key))[key]
            || { host, count: 0, fingerprint: 0, byCategory: {} };
  cur.host = host;
  if (kind === "blocked") {
    cur.count += 1;
    if (category) cur.byCategory[category] = (cur.byCategory[category] || 0) + 1;
  } else if (kind === "fingerprint") {
    cur.fingerprint += 1;
  }
  await chrome.storage.session.set({ [key]: cur });
  const total = cur.count + cur.fingerprint;
  try {
    chrome.action.setBadgeBackgroundColor({ color: "#7f1d1d" });
    chrome.action.setBadgeTextColor?.({ color: "#fafafa" });
    chrome.action.setBadgeText({ tabId, text: total > 99 ? "99+" : total > 0 ? String(total) : "" });
  } catch (_) {}
}

// ────────────────────────────────────────────────────────────────
// 2. Messages from content scripts, popup, dashboard
// ────────────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  handleMessage(msg, sender)
    .then(sendResponse)
    .catch(e => { console.error("Veil onMessage error", e); sendResponse({ ok: false, error: String(e) }); });
  return true; // keep the channel open for async sendResponse
});

async function handleMessage(msg, sender) {
  await ensureReady();
  switch (msg?.type) {

    case "veil:fingerprint": {
      const host = sender.tab?.url ? new URL(sender.tab.url).hostname : "(unknown)";
      if (cache.allowlist.includes(host)) return { ok: true };
      const now = Date.now();
      cache.stats_global.totalFingerprint += 1;
      const site = cache.sites[host] ||= { firstSeen: now, lastSeen: now, blocked: [], fingerprint: [], categories: {} };
      site.lastSeen = now;
      site.fingerprint.push({ api: msg.api, ts: now, count: msg.count || 1 });
      if (site.fingerprint.length > 200) site.fingerprint.splice(0, site.fingerprint.length - 200);
      if (sender.tab?.id != null) await bumpTabCounter(sender.tab.id, host, "fingerprint");
      scheduleFlush();
      return { ok: true };
    }

    case "veil:getPopupData": {
      const tabId = msg.tabId;
      let host = "";
      try { const tab = await chrome.tabs.get(tabId); host = tab?.url ? new URL(tab.url).hostname : ""; } catch (_) {}
      const tabData = (await chrome.storage.session.get(`tab_${tabId}`))[`tab_${tabId}`]
                   || { host, count: 0, fingerprint: 0, byCategory: {} };
      return {
        host,
        allowed: cache.allowlist.includes(host),
        tab: tabData,
        siteHistory: cache.sites[host] || null,
        globalTotal: (cache.stats_global.totalBlocked || 0) + (cache.stats_global.totalFingerprint || 0)
      };
    }

    case "veil:getDashboardData": {
      return {
        global: cache.stats_global,
        sites: cache.sites,
        allowlist: cache.allowlist,
        categories: CATEGORIES,
        trackers: TRACKER_BY_ID
      };
    }

    case "veil:setAllowlist": {
      const { host, allowed } = msg;
      if (!host) return { ok: false };
      if (allowed) {
        if (!cache.allowlist.includes(host)) cache.allowlist.push(host);
      } else {
        cache.allowlist = cache.allowlist.filter(h => h !== host);
      }
      await chrome.storage.local.set({ allowlist: cache.allowlist });
      await updateAllowlistRules();
      return { ok: true, allowlist: cache.allowlist };
    }

    case "veil:resetAll": {
      cache.stats_global = { totalBlocked: 0, totalFingerprint: 0, byCategory: {}, byTracker: {} };
      cache.sites = {};
      await chrome.storage.local.set({ stats_global: cache.stats_global, sites: cache.sites });
      await chrome.storage.session.clear();
      const tabs = await chrome.tabs.query({});
      for (const t of tabs) try { await chrome.action.setBadgeText({ tabId: t.id, text: "" }); } catch(_) {}
      return { ok: true };
    }

    case "veil:openDashboard": {
      await chrome.tabs.create({ url: chrome.runtime.getURL("dashboard/dashboard.html") });
      return { ok: true };
    }
  }
  return { ok: false, error: "unknown_message" };
}

// ────────────────────────────────────────────────────────────────
// Allowlist: per-host allow rule that overrides the block rules
// ────────────────────────────────────────────────────────────────

async function updateAllowlistRules() {
  const existing = await chrome.declarativeNetRequest.getDynamicRules();
  const removeRuleIds = existing.map(r => r.id);
  const addRules = cache.allowlist.map((host, i) => ({
    id: 100000 + i,
    priority: 100, // beats the static block rules (priority 1)
    action: { type: "allowAllRequests" },
    condition: {
      requestDomains: [host],
      resourceTypes: ["main_frame","sub_frame"]
    }
  }));
  await chrome.declarativeNetRequest.updateDynamicRules({ removeRuleIds, addRules });
}

// ────────────────────────────────────────────────────────────────
// 3. Housekeeping
// ────────────────────────────────────────────────────────────────

chrome.runtime.onInstalled.addListener(() => { ensureReady(); });
chrome.runtime.onStartup.addListener(() => { ensureReady(); });

chrome.tabs.onRemoved.addListener(async (tabId) => {
  try { await chrome.storage.session.remove(`tab_${tabId}`); } catch (_) {}
});

chrome.webNavigation.onCommitted.addListener(async (details) => {
  if (details.frameId !== 0) return;
  try { await chrome.storage.session.remove(`tab_${details.tabId}`); } catch (_) {}
  try { chrome.action.setBadgeText({ tabId: details.tabId, text: "" }); } catch (_) {}
});
