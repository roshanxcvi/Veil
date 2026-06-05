# 🛡️ Veil — AI & Behavior Tracker Blocker

> Block the trackers that quietly profile you for marketing, behavioral analytics, identity graphs, and AI training — then see exactly what every website tried to collect.

<p align="left">
  <img alt="version" src="https://img.shields.io/badge/version-1.1-ef4444">
  <img alt="manifest" src="https://img.shields.io/badge/Manifest-V3-111">
  <img alt="platform" src="https://img.shields.io/badge/Chrome-110%2B-444">
  <img alt="privacy" src="https://img.shields.io/badge/data%20leaves%20your%20browser-never-22c55e">
  <img alt="license" src="https://img.shields.io/badge/license-MIT-blue">
</p>

Veil is a Chrome extension that does two things most blockers don't:

1. **Blocks the data pipelines that feed AI and behavioral profiling** — session recorders, fingerprinters, customer-data platforms, and marketing pixels — not just visible ads.
2. **Explains what it caught, in plain English.** Most blockers show a counter. Veil shows you *which* company tried to collect your data, *what* they were after, and *why* it matters — in a forensic-style dashboard.

Everything runs locally. **Nothing is ever sent off your machine** — no accounts, no servers, no telemetry.

---

## Why this exists

The web you actually browse is wired with invisible instruments. Open a typical news or shopping page and, before you've read a word, it may have:

- **Recorded your session** — every mouse move, scroll, and sometimes keystroke, replayable by staff or fed into models (Hotjar, FullStory, Microsoft Clarity, LogRocket).
- **Fingerprinted your device** — built a unique signature from your GPU, canvas, audio stack, and fonts that tracks you *even with cookies blocked* (FingerprintJS, ThreatMetrix).
- **Streamed your behavior into a data platform** — piped your activity into systems that train recommendation, ranking, and generative-AI models (Segment, Mixpanel, Amplitude, Heap, RudderStack).
- **Pinged ad networks and data brokers** — reported your visit so you can be re-targeted elsewhere, and resold your profile to advertisers, insurers, and AI training datasets (Meta Pixel, TikTok, LiveRamp, Acxiom).

You agreed to none of this in a way you'd recognize as agreement. Veil's premise is simple: **you should be able to see it, and switch it off.**

### The real-world stakes

- **Session-replay tools have leaked passwords, card numbers, and medical info** that users typed into forms — captured because the recorder grabbed the whole page, not just what was submitted.
- **Fingerprinting defeats "private" browsing.** Clearing cookies or going incognito does little when a site can re-identify your device from its hardware signature.
- **Your behavior is training data now.** Clickstreams, dwell time, and chat transcripts increasingly flow into model-training pipelines. A 2026 surge in AI crawler traffic (ClaudeBot volume alone rose ~800% in early 2026) is the server-side half of the same story — Veil handles the client-side half that lives in *your* browser.
- **Data brokers resell who you are.** Identity graphs assembled from these signals are sold to advertisers, insurers, and employers with almost no visibility to you.

---

## What Veil blocks

Veil ships with a curated database of **76 named trackers** across **8 categories**, each tagged with a risk level (`critical` · `high` · `medium` · `low`) and a plain-English explanation.

| Category | What it does | Examples |
|---|---|---|
| 🧠 **AI / ML data pipeline** | Streams your behavior into systems that train recommendation, ranking, and generative-AI models | Segment, RudderStack, Snowplow, mParticle, Tealium |
| 🎥 **Session replay** | Records mouse movement, scrolls, clicks, and sometimes keystrokes so staff or models can rewatch your visit | Hotjar, FullStory, Microsoft Clarity, LogRocket, Mouseflow |
| 🫆 **Device fingerprinting** | Builds a unique device signature to identify you across sessions — works even with cookies blocked | FingerprintJS, ThreatMetrix, Iovation, MaxMind |
| 🎯 **Marketing pixel** | Reports your visit to an ad network so it can target you elsewhere | Meta Pixel, TikTok, LinkedIn, X, Pinterest, Reddit |
| 📊 **Analytics** | Logs pageviews/events, often shared with the vendor's wider data graph | GA4, Google Tag Manager, Adobe Analytics, Yandex, Matomo |
| 📢 **Ad network** | Loads or measures ads and builds an advertising profile of you | DoubleClick, Criteo, Taboola, Outbrain, The Trade Desk |
| 🗃️ **Data broker** | Resells identity and behavior data to advertisers, insurers, employers, and AI datasets | LiveRamp, Acxiom, BlueKai, Lotame, Nielsen, ID5, UID2 |
| 💬 **AI chat widget** | Embedded chatbots whose conversations are typically stored and reused for model training | Intercom, Drift, Ada, Crisp, Tidio |

Blocking is done with Chrome's **`declarativeNetRequest`** engine — requests to tracker domains are stopped *before they leave your browser*.

### Fingerprinting: detect, don't break

For fingerprinting, Veil takes a **detect-only** approach. It wraps the APIs commonly abused for device fingerprinting — `canvas.toDataURL`, `getImageData`, WebGL `UNMASKED_RENDERER`, `OfflineAudioContext`, high-entropy client hints, the Battery API, and font-enumeration storms via `measureText` — and **logs the attempt without changing the return value.** This means Veil can *show you* a site fingerprinting you without breaking logins, captchas, or banking pages that legitimately touch those APIs.

---

## What Veil does **not** do (read this)

Veil is honest about its limits:

- **It does not block server-side AI crawlers** like GPTBot, ClaudeBot, CCBot, or Google-Extended. Those bots hit a *website's server* directly and never touch your browser — no extension can see or stop them. Blocking those is the site operator's job, via `robots.txt` or CDN rules.
- **It is not a general ad blocker.** It won't strip every banner, skip YouTube ads, or auto-reject cookie banners. If that's what you want, pair it with uBlock Origin. Veil's job is the *behavioral/AI data layer*, explained.
- **Determined fingerprinters can detect the wrappers.** Client-side detection is inherently visible to a sufficiently aggressive script. Veil prioritizes not breaking the web over being undetectable.

---

## Install (Load Unpacked)

Veil isn't on the Chrome Web Store yet — install it manually:

1. **Download** this repo (green **Code** button → **Download ZIP**) and unzip it, or `git clone` it.
2. Open Chrome and go to `chrome://extensions`.
3. Toggle **Developer mode** on (top-right).
4. Click **Load unpacked** and select the extension folder (the one containing `manifest.json`).
5. Pin the ▲ **Veil** icon to your toolbar.

Browse normally. Click the icon for a per-page summary, or open the full dashboard from the popup.

> **Note:** Veil uses `onRuleMatchedDebug` for live block logging, which Chrome only exposes to **unpacked** extensions. A Web Store build would swap this for `getMatchedRules()` polling.

---

## Privacy & security

Veil is built to the standard it asks of others:

- **No network calls of its own.** Strict Content-Security-Policy (`script-src 'self'; connect-src 'self'; …`). Fonts are bundled locally — the dashboard never phones home, not even to Google Fonts.
- **Not fingerprintable as an extension.** `web_accessible_resources` is empty, so websites can't probe for Veil's presence.
- **All data is local.** Stats live in `chrome.storage.local`; per-tab counters in `chrome.storage.session`. Uninstalling or hitting **Reset all data** wipes everything.
- **Bounded storage.** The site history is capped (most-recently-seen hosts) so it never bloats your profile.
- **Export is yours.** The dashboard's **Export JSON** hands you the full record as a file — it isn't uploaded anywhere.

---

## Extending the tracker list

Add an entry to `data/trackers.js`:

```js
{
  id: "examplecorp",
  name: "ExampleCorp Analytics",
  company: "ExampleCorp Inc.",
  category: "analytics",          // one of the 8 categories
  risk: "high",                   // low | medium | high | critical
  domain: "track.examplecorp.com",
  why: "Logs every page you view and links it to an advertising ID."
}
```

Then regenerate the block rules (see the script referenced in the in-extension README) and reload the extension.

---

---

## Contributing

Issues and PRs welcome — especially new tracker entries, accuracy fixes to the "why" explanations, and false-positive reports. Keep the project's promise intact: **no remote code, no telemetry, everything local.**

---

## License

MIT © **roshanxcvi**

---

## Disclaimer

Veil is a transparency and privacy tool, not a security guarantee. It reduces client-side tracking and shows you what sites attempt to collect, but it cannot stop server-side data collection, account-level tracking, or determined adversaries. Use it alongside good habits — and a general ad blocker if you want one.

---

<p align="center"><sub>Veil v1.1 · developed by <b>roshanxcvi</b> · built for those who'd rather not be the dataset</sub></p>
