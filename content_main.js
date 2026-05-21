// content_main.js
// Runs in the page's own JavaScript context (world: MAIN). We wrap APIs
// commonly used for browser fingerprinting and post a message whenever
// the page reads from them. We do NOT alter return values — that would
// break legitimate features. The dashboard simply shows what was attempted.

(() => {
  if (window.__veilInstalled) return;
  window.__veilInstalled = true;

  const REPORT_KEY = "__veil_report__";
  const buckets = Object.create(null);   // api -> count since last flush
  let flushTimer = null;

  function note(api) {
    buckets[api] = (buckets[api] || 0) + 1;
    if (flushTimer) return;
    flushTimer = setTimeout(flush, 1500);
  }
  function flush() {
    flushTimer = null;
    for (const api in buckets) {
      window.postMessage({ [REPORT_KEY]: true, api, count: buckets[api] }, "*");
    }
    for (const k in buckets) delete buckets[k];
  }

  function wrap(obj, name, label) {
    try {
      const orig = obj[name];
      if (typeof orig !== "function") return;
      const wrapped = new Proxy(orig, {
        apply(target, thisArg, args) {
          try { note(label); } catch(_) {}
          return Reflect.apply(target, thisArg, args);
        }
      });
      Object.defineProperty(obj, name, { value: wrapped, writable: true, configurable: true });
    } catch (_) {}
  }

  // ── Canvas fingerprinting ────────────────────────────────────
  try {
    wrap(HTMLCanvasElement.prototype, "toDataURL", "canvas.toDataURL");
    wrap(HTMLCanvasElement.prototype, "toBlob",    "canvas.toBlob");
    wrap(CanvasRenderingContext2D.prototype, "getImageData", "canvas.getImageData");
  } catch (_) {}

  // ── WebGL fingerprinting ─────────────────────────────────────
  function instrumentWebGL(proto) {
    try {
      const orig = proto.getParameter;
      proto.getParameter = function(param) {
        try {
          // 37445 = UNMASKED_VENDOR_WEBGL, 37446 = UNMASKED_RENDERER_WEBGL
          if (param === 37445 || param === 37446) note("webgl.unmasked");
        } catch(_) {}
        return orig.apply(this, arguments);
      };
    } catch(_) {}
  }
  try { if (typeof WebGLRenderingContext !== "undefined")  instrumentWebGL(WebGLRenderingContext.prototype); } catch(_) {}
  try { if (typeof WebGL2RenderingContext !== "undefined") instrumentWebGL(WebGL2RenderingContext.prototype); } catch(_) {}

  // ── Audio fingerprinting ─────────────────────────────────────
  try {
    if (typeof OfflineAudioContext !== "undefined") {
      wrap(OfflineAudioContext.prototype, "startRendering", "audio.offlineRender");
    }
  } catch(_) {}

  // ── High-entropy client hints ────────────────────────────────
  try {
    if (navigator.userAgentData && navigator.userAgentData.getHighEntropyValues) {
      wrap(navigator.userAgentData, "getHighEntropyValues", "client-hints.highEntropy");
    }
  } catch(_) {}

  // ── Battery API (deprecated but still used for fingerprinting) ──
  try {
    if (navigator.getBattery) wrap(navigator, "getBattery", "battery.api");
  } catch(_) {}

  // ── Font enumeration via measureText storms ──────────────────
  try {
    const origMT = CanvasRenderingContext2D.prototype.measureText;
    let mtCount = 0, mtWindow = 0;
    CanvasRenderingContext2D.prototype.measureText = function() {
      try {
        const now = performance.now();
        if (now - mtWindow > 1000) { mtWindow = now; mtCount = 0; }
        mtCount += 1;
        if (mtCount === 50) note("font.enumeration"); // 50 measures in a second is suspicious
      } catch(_) {}
      return origMT.apply(this, arguments);
    };
  } catch(_) {}
})();
