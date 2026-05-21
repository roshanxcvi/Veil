// content_isolated.js
// Runs in the extension's isolated world. Its only job is to relay
// fingerprinting reports from the page-world script (which can't directly
// call chrome.runtime.sendMessage) up to the service worker.

const REPORT_KEY = "__veil_report__";

window.addEventListener("message", (ev) => {
  if (ev.source !== window) return;
  const data = ev.data;
  if (!data || !data[REPORT_KEY]) return;
  try {
    chrome.runtime.sendMessage({
      type: "veil:fingerprint",
      api: String(data.api).slice(0, 80),
      count: Number(data.count) || 1
    }).catch(() => { /* SW may be asleep; reports are best-effort */ });
  } catch (_) {}
}, false);
