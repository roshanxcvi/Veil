# Veil — AI & behavior tracker blocker

A Chrome / Edge / Brave extension that blocks the client-side trackers
that quietly profile you for marketing, behavioral analytics, identity
graphs and AI training pipelines. It then shows you, in a dashboard,
exactly what every site you visit tried to collect.

## What it actually does

**Blocks** (via `declarativeNetRequest`):
- Session replay tools — Hotjar, FullStory, Microsoft Clarity, LogRocket, Mouseflow, Smartlook, Inspectlet, Quantum Metric, Glassbox, Lucky Orange…
- Customer-data-platform / AI pipelines — Segment, RudderStack, mParticle, Tealium, Snowplow, Mixpanel, Amplitude, Heap, Pendo…
- Marketing pixels — Meta, TikTok, LinkedIn, X/Twitter, Pinterest, Snap, Reddit, Quora, Microsoft Ads…
- Fingerprinting services — FingerprintJS, ThreatMetrix, Iovation, MaxMind device…
- Ad networks — DoubleClick, Criteo, Taboola, Outbrain, AppNexus/Xandr, PubMatic, Magnite, OpenX, The Trade Desk…
- Data brokers — LiveRamp, Acxiom, BlueKai, Lotame, Nielsen Exelate, ID5, UID2…
- AI chat widgets that record conversations — Intercom, Drift, Tidio, Ada, Crisp
- (~75 rules at v0.1, easy to extend in `data/trackers.js`)

**Detects** (in the page's own JS context):
- Canvas fingerprinting (`toDataURL`, `toBlob`, `getImageData`)
- WebGL fingerprinting (`UNMASKED_VENDOR_WEBGL` / `UNMASKED_RENDERER_WEBGL`)
- AudioContext fingerprinting (`OfflineAudioContext.startRendering`)
- High-entropy client-hints requests
- Battery API fingerprinting
- Font enumeration via measureText storms

**Shows you**, in the dashboard:
- Lifetime counts and per-site breakdown
- Which categories the trackers fall into, and *what each category actually does* in plain English
- Per-tracker leaderboard with the company that runs it and why it's a problem
- A drawer for any site showing the exact list of trackers it tried to load

## What it does *not* do

It cannot block server-side AI crawlers like `GPTBot`, `ClaudeBot`,
`CCBot`, `Google-Extended`, `Bytespider`, `PerplexityBot`, etc. Those
hit websites' servers directly and never touch your browser. Stopping
those requires the *website* to add a `robots.txt` entry or block them
at the CDN. The dashboard explains this near the bottom.

## Install (unpacked, for development)

1. Open `chrome://extensions` (or `edge://extensions`, `brave://extensions`).
2. Toggle **Developer mode** on (top right).
3. Click **Load unpacked**.
4. Select this folder (`ai-privacy-blocker/`).
5. Pin the extension to the toolbar.

The `declarativeNetRequestFeedback` permission lets the extension see
*which* of its own rules matched in real time — that's how the
dashboard knows what to log. It only works for unpacked / developer
extensions, which is fine because this is a personal tool. If you
ever publish to the Chrome Web Store, you'd swap that for
`chrome.declarativeNetRequest.getMatchedRules()` polling.

## Use

- Click the toolbar icon to see what was blocked on the current page.
- Click **full report →** (or the `⤢` button) to open the dashboard.
- Toggle the switch in the popup to allowlist a site if blocking
  broke it. The page will reload.

## Extend

To add a tracker, append an entry to `TRACKERS` in
`data/trackers.js`, then regenerate the rules file:

```bash
node -e "import('./data/trackers.js').then(m => { \
  const fs = require('fs'); \
  const rules = m.TRACKERS.map(t => ({ id: t.id, priority: 1, action: {type:'block'}, \
    condition: { urlFilter: t.urlFilter || '||' + t.domain, \
      resourceTypes:['script','xmlhttprequest','image','ping','sub_frame','stylesheet','media','object','font','websocket','other']}})); \
  fs.writeFileSync('rules/tracker_rules.json', JSON.stringify(rules, null, 2)); \
})"
```

Reload the extension at `chrome://extensions` after editing.

## Storage

Everything stays in your browser. `chrome.storage.local` for durable
stats and the allowlist, `chrome.storage.session` for live per-tab
counters. Nothing is sent anywhere. The "Export report (JSON)" button
on the dashboard lets you take your data with you.

Yours. Modify freely.
