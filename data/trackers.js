// data/trackers.js
// Catalog of known trackers. Each entry powers both the blocking rule and the
// dashboard explanation shown to the user. Keep `id` stable — it's the
// declarativeNetRequest rule id and the storage key. Risk: low | medium | high | critical.

export const CATEGORIES = {
  ai_pipeline: {
    label: "AI / ML data pipeline",
    blurb: "Streams your behavior into systems that train recommendation, ranking and generative-AI models.",
    accent: "ai"
  },
  session_replay: {
    label: "Session replay",
    blurb: "Records mouse movement, scrolls, clicks and sometimes form keystrokes so staff or models can rewatch your visit.",
    accent: "replay"
  },
  fingerprint: {
    label: "Device fingerprinting",
    blurb: "Builds a unique signature of your browser/device to identify you across sessions — works even when cookies are blocked.",
    accent: "fingerprint"
  },
  marketing: {
    label: "Marketing pixel",
    blurb: "Reports your visit to an ad network so the network can target you elsewhere on the web.",
    accent: "marketing"
  },
  analytics: {
    label: "Analytics",
    blurb: "Logs pageviews and events. Often shared with the analytics vendor's wider data graph.",
    accent: "analytics"
  },
  ads: {
    label: "Ad network",
    blurb: "Loads or measures ads and builds an advertising profile of you.",
    accent: "ads"
  },
  data_broker: {
    label: "Data broker",
    blurb: "Resells identity and behavior data to advertisers, insurers, employers and AI training datasets.",
    accent: "broker"
  },
  ai_chat: {
    label: "AI chat widget",
    blurb: "Embedded chatbot whose conversations are typically stored and reused for model training.",
    accent: "ai"
  }
};

export const TRACKERS = [
  // ─── Session replay ────────────────────────────────────────────────
  { id: 1,  name: "Hotjar",            company: "Contentsquare",    category: "session_replay", risk: "high",     domain: "hotjar.com",            why: "Records full session replays plus heatmaps of every click and scroll." },
  { id: 2,  name: "FullStory",         company: "FullStory",        category: "session_replay", risk: "critical", domain: "fullstory.com",         why: "Captures DOM-level session replay including text in form fields unless explicitly masked." },
  { id: 3,  name: "Microsoft Clarity", company: "Microsoft",        category: "session_replay", risk: "high",     domain: "clarity.ms",            why: "Free session replay from Microsoft. Data flows into Microsoft's wider advertising stack." },
  { id: 4,  name: "LogRocket",         company: "LogRocket",        category: "session_replay", risk: "high",     domain: "logrocket.com",         why: "Session replay marketed to engineering teams; records Redux state and network calls." },
  { id: 5,  name: "LogRocket CDN",     company: "LogRocket",        category: "session_replay", risk: "high",     domain: "lr-ingest.io",          why: "LogRocket ingestion endpoint." },
  { id: 6,  name: "Mouseflow",         company: "Mouseflow",        category: "session_replay", risk: "high",     domain: "mouseflow.com",         why: "Session replay and form analytics." },
  { id: 7,  name: "Smartlook",         company: "Cisco/Smartlook",  category: "session_replay", risk: "high",     domain: "smartlook.com",         why: "Records every interaction on the page." },
  { id: 8,  name: "Inspectlet",        company: "Inspectlet",       category: "session_replay", risk: "high",     domain: "inspectlet.com",        why: "Session replay including keystroke capture." },
  { id: 9,  name: "Lucky Orange",      company: "Lucky Orange",     category: "session_replay", risk: "high",     domain: "luckyorange.com",       why: "Session replay, heatmaps and form analytics." },
  { id: 10, name: "Crazy Egg",         company: "Crazy Egg",        category: "session_replay", risk: "medium",   domain: "crazyegg.com",          why: "Heatmaps and recordings." },
  { id: 11, name: "Quantum Metric",    company: "Quantum Metric",   category: "session_replay", risk: "high",     domain: "quantummetric.com",     why: "Enterprise behavioral analytics with full session capture." },
  { id: 12, name: "Glassbox",          company: "Glassbox",         category: "session_replay", risk: "high",     domain: "glassbox.com",          why: "Records every digital interaction; markets explicitly to AI/ML teams." },

  // ─── AI / ML pipeline (CDPs and behavioral data warehouses) ────────
  { id: 20, name: "Segment",           company: "Twilio",           category: "ai_pipeline",    risk: "critical", domain: "segment.io",            why: "Customer Data Platform — routes everything you do on a site into the operator's data warehouse and downstream AI models." },
  { id: 21, name: "Segment alt",       company: "Twilio",           category: "ai_pipeline",    risk: "critical", domain: "segment.com",           why: "Segment alternate endpoint." },
  { id: 22, name: "RudderStack",       company: "RudderStack",      category: "ai_pipeline",    risk: "critical", domain: "rudderstack.com",       why: "Open-source Segment alternative. Same pipeline-to-warehouse role." },
  { id: 23, name: "RudderStack CDN",   company: "RudderStack",      category: "ai_pipeline",    risk: "critical", domain: "rudderlabs.com",        why: "RudderStack ingestion." },
  { id: 24, name: "Mixpanel",          company: "Mixpanel",         category: "ai_pipeline",    risk: "high",     domain: "mixpanel.com",          why: "Product analytics. Records every event you perform and ties it to a persistent identity." },
  { id: 25, name: "Amplitude",         company: "Amplitude",        category: "ai_pipeline",    risk: "high",     domain: "amplitude.com",         why: "Product analytics. Recently launched an AI agent built on top of your behavioral data." },
  { id: 26, name: "Heap",              company: "Contentsquare",    category: "ai_pipeline",    risk: "high",     domain: "heap.io",               why: "Auto-captures every event on the page without the site having to specify them." },
  { id: 27, name: "Heap analytics",    company: "Contentsquare",    category: "ai_pipeline",    risk: "high",     domain: "heapanalytics.com",     why: "Heap ingestion endpoint." },
  { id: 28, name: "Pendo",             company: "Pendo",            category: "ai_pipeline",    risk: "medium",   domain: "pendo.io",              why: "In-app product analytics with AI-powered insights derived from your behavior." },
  { id: 29, name: "PostHog Cloud",     company: "PostHog",          category: "ai_pipeline",    risk: "medium",   domain: "posthog.com",           why: "Event analytics and session replay. Self-hosted is private; cloud is not." },
  { id: 30, name: "Snowplow",          company: "Snowplow",         category: "ai_pipeline",    risk: "high",     domain: "snowplowanalytics.com", why: "Behavioral data pipeline feeding warehouses and AI models." },
  { id: 31, name: "mParticle",         company: "mParticle",        category: "ai_pipeline",    risk: "high",     domain: "mparticle.com",         why: "CDP. Same routing role as Segment." },
  { id: 32, name: "Tealium",           company: "Tealium",          category: "ai_pipeline",    risk: "high",     domain: "tealium.com",           why: "Enterprise CDP and tag manager." },
  { id: 33, name: "Tealium IQ",        company: "Tealium",          category: "ai_pipeline",    risk: "high",     domain: "tiqcdn.com",            why: "Tealium tag delivery CDN." },

  // ─── Fingerprinting ────────────────────────────────────────────────
  { id: 40, name: "FingerprintJS",     company: "FingerprintJS",    category: "fingerprint",    risk: "critical", domain: "fingerprintjs.com",     why: "Generates a stable device ID using ~70 browser signals. Re-identifies you even after cookie wipes." },
  { id: 41, name: "FingerprintJS Pro", company: "FingerprintJS",    category: "fingerprint",    risk: "critical", domain: "fpjs.io",               why: "Hosted fingerprinting API." },
  { id: 42, name: "ThreatMetrix",      company: "LexisNexis",       category: "fingerprint",    risk: "critical", domain: "threatmetrix.com",      why: "Device fingerprinting marketed for fraud detection; feeds the LexisNexis risk graph." },
  { id: 43, name: "Iovation",          company: "TransUnion",       category: "fingerprint",    risk: "critical", domain: "iovation.com",          why: "Device reputation graph operated by credit-bureau TransUnion." },
  { id: 44, name: "MaxMind device",    company: "MaxMind",          category: "fingerprint",    risk: "high",     domain: "device.maxmind.com",    why: "Device intelligence service." },

  // ─── Marketing pixels ──────────────────────────────────────────────
  { id: 50, name: "Meta Pixel",        company: "Meta",             category: "marketing",      risk: "high",     domain: "connect.facebook.net",  why: "Reports your visit and on-page actions to Facebook so Meta can target ads to you elsewhere." },
  { id: 51, name: "Meta Pixel beacon", company: "Meta",             category: "marketing",      risk: "high",     domain: "facebook.com",          urlFilter: "||facebook.com/tr", why: "The /tr endpoint where Meta Pixel ships its data." },
  { id: 52, name: "TikTok Pixel",      company: "ByteDance",        category: "marketing",      risk: "high",     domain: "analytics.tiktok.com",  why: "TikTok's marketing pixel. Data flows to ByteDance and feeds TikTok's recommendation models." },
  { id: 53, name: "LinkedIn Insight",  company: "Microsoft",        category: "marketing",      risk: "high",     domain: "snap.licdn.com",        why: "LinkedIn Insight tag — Microsoft's B2B marketing pixel." },
  { id: 54, name: "LinkedIn Pixel",    company: "Microsoft",        category: "marketing",      risk: "high",     domain: "px.ads.linkedin.com",   why: "LinkedIn pixel beacon endpoint." },
  { id: 55, name: "Twitter Pixel",     company: "X Corp",           category: "marketing",      risk: "high",     domain: "ads-twitter.com",       why: "X/Twitter conversion tracking." },
  { id: 56, name: "Pinterest Tag",     company: "Pinterest",        category: "marketing",      risk: "medium",   domain: "ct.pinterest.com",      why: "Pinterest conversion tracking." },
  { id: 57, name: "Snap Pixel",        company: "Snap Inc.",        category: "marketing",      risk: "medium",   domain: "sc-static.net",         why: "Snapchat ads pixel." },
  { id: 58, name: "Reddit Pixel",      company: "Reddit",           category: "marketing",      risk: "medium",   domain: "redditstatic.com",      urlFilter: "||redditstatic.com/ads", why: "Reddit advertising pixel." },
  { id: 59, name: "Quora Pixel",       company: "Quora",            category: "marketing",      risk: "medium",   domain: "q.quora.com",           why: "Quora ads pixel." },
  { id: 60, name: "Bing UET",          company: "Microsoft",        category: "marketing",      risk: "medium",   domain: "bat.bing.com",          why: "Microsoft Ads conversion pixel." },

  // ─── Analytics ─────────────────────────────────────────────────────
  { id: 70, name: "Google Analytics 4", company: "Google",          category: "analytics",      risk: "medium",   domain: "google-analytics.com",  why: "Google's pageview and event tracker. Data is joined with Google's signed-in user graph." },
  { id: 71, name: "Google Tag Manager", company: "Google",          category: "analytics",      risk: "medium",   domain: "googletagmanager.com",  why: "Container that loads other trackers. Blocking it usually stops a whole stack at once." },
  { id: 72, name: "GA collect",        company: "Google",           category: "analytics",      risk: "medium",   domain: "analytics.google.com",  why: "GA4 collection endpoint." },
  { id: 73, name: "Adobe Analytics",   company: "Adobe",            category: "analytics",      risk: "high",     domain: "omtrdc.net",            why: "Adobe's enterprise analytics endpoint." },
  { id: 74, name: "Adobe DTM",         company: "Adobe",            category: "analytics",      risk: "medium",   domain: "adobedtm.com",          why: "Adobe Dynamic Tag Management — loads downstream trackers." },
  { id: 75, name: "Adobe Audience",    company: "Adobe",            category: "analytics",      risk: "critical", domain: "demdex.net",            why: "Adobe Audience Manager — cross-site identity graph." },
  { id: 76, name: "Yandex Metrica",    company: "Yandex",           category: "analytics",      risk: "high",     domain: "mc.yandex.ru",          why: "Yandex analytics; includes session replay and webvisor." },
  { id: 77, name: "Matomo cloud",      company: "Matomo",           category: "analytics",      risk: "low",      domain: "matomo.cloud",          why: "Matomo's hosted analytics. Self-hosted Matomo is private; the cloud version still phones home." },

  // ─── Ad networks ───────────────────────────────────────────────────
  { id: 80, name: "DoubleClick",       company: "Google",           category: "ads",            risk: "high",     domain: "doubleclick.net",       why: "Google's primary ad-serving network. Sees you across most of the commercial web." },
  { id: 81, name: "Google Adsense",    company: "Google",           category: "ads",            risk: "medium",   domain: "googlesyndication.com", why: "Google's display-ad delivery network." },
  { id: 82, name: "Google Ads",        company: "Google",           category: "ads",            risk: "medium",   domain: "googleadservices.com",  why: "Google Ads conversion and click tracking." },
  { id: 83, name: "Criteo",            company: "Criteo",           category: "ads",            risk: "high",     domain: "criteo.com",            why: "Retargeting network. Records what you looked at, follows you elsewhere." },
  { id: 84, name: "Criteo static",     company: "Criteo",           category: "ads",            risk: "high",     domain: "criteo.net",            why: "Criteo asset CDN." },
  { id: 85, name: "Taboola",           company: "Taboola",          category: "ads",            risk: "high",     domain: "taboola.com",           why: "Recommendation/ad widget; profiles your reading behavior." },
  { id: 86, name: "Outbrain",          company: "Outbrain",         category: "ads",            risk: "high",     domain: "outbrain.com",          why: "Recommendation/ad widget similar to Taboola." },
  { id: 87, name: "AppNexus / Xandr",  company: "Microsoft",        category: "ads",            risk: "high",     domain: "adnxs.com",             why: "Major real-time-bidding exchange." },
  { id: 88, name: "PubMatic",          company: "PubMatic",         category: "ads",            risk: "high",     domain: "pubmatic.com",          why: "Ad exchange." },
  { id: 89, name: "Rubicon / Magnite", company: "Magnite",          category: "ads",            risk: "high",     domain: "rubiconproject.com",    why: "Ad exchange." },
  { id: 90, name: "OpenX",             company: "OpenX",            category: "ads",            risk: "high",     domain: "openx.net",             why: "Ad exchange." },
  { id: 91, name: "The Trade Desk",    company: "The Trade Desk",   category: "ads",            risk: "high",     domain: "adsrvr.org",            why: "Demand-side platform that bids on you in real time." },

  // ─── Data brokers ──────────────────────────────────────────────────
  { id: 100, name: "LiveRamp",         company: "LiveRamp",         category: "data_broker",    risk: "critical", domain: "liveramp.com",          why: "Identity-resolution graph linking your offline identity to your online behavior." },
  { id: 101, name: "LiveRamp idx",     company: "LiveRamp",         category: "data_broker",    risk: "critical", domain: "rlcdn.com",             why: "LiveRamp ID sync endpoint." },
  { id: 102, name: "Acxiom",           company: "Acxiom",           category: "data_broker",    risk: "critical", domain: "acxiom.com",            why: "Long-running data broker with profiles on most U.S. adults." },
  { id: 103, name: "Oracle BlueKai",   company: "Oracle",           category: "data_broker",    risk: "critical", domain: "bluekai.com",           why: "Oracle's data management platform — wind-down announced but still active in many tags." },
  { id: 104, name: "Lotame",           company: "Lotame",           category: "data_broker",    risk: "critical", domain: "lotame.com",            why: "Audience data exchange." },
  { id: 105, name: "Nielsen Exelate",  company: "Nielsen",          category: "data_broker",    risk: "high",     domain: "exelator.com",          why: "Nielsen-owned audience data platform." },
  { id: 106, name: "ID5",              company: "ID5",              category: "data_broker",    risk: "high",     domain: "id5-sync.com",          why: "Cross-vendor user ID for cookieless tracking." },
  { id: 107, name: "TheTradeDesk UID2",company: "The Trade Desk",   category: "data_broker",    risk: "high",     domain: "uidapi.com",            why: "Unified ID 2.0 — replacement for third-party cookies." },

  // ─── AI chat widgets ───────────────────────────────────────────────
  { id: 120, name: "Intercom",         company: "Intercom",         category: "ai_chat",        risk: "medium",   domain: "intercom.io",           why: "Live chat with AI features. Conversations are stored and can be used to train Intercom's Fin AI." },
  { id: 121, name: "Intercom CDN",     company: "Intercom",         category: "ai_chat",        risk: "medium",   domain: "intercomcdn.com",       why: "Intercom widget assets." },
  { id: 122, name: "Drift",            company: "Salesloft",        category: "ai_chat",        risk: "medium",   domain: "drift.com",             why: "AI sales chatbot." },
  { id: 123, name: "Tidio",            company: "Tidio",            category: "ai_chat",        risk: "medium",   domain: "tidio.co",              why: "AI chatbot widget." },
  { id: 124, name: "Ada",              company: "Ada",              category: "ai_chat",        risk: "medium",   domain: "ada.support",           why: "Enterprise AI customer-service bot." },
  { id: 125, name: "Crisp",            company: "Crisp",            category: "ai_chat",        risk: "low",      domain: "crisp.chat",            why: "Chat widget with AI assistant features." }
];

// Convenience lookup tables
export const TRACKER_BY_ID = Object.fromEntries(TRACKERS.map(t => [t.id, t]));
export const TRACKER_BY_DOMAIN = Object.fromEntries(TRACKERS.map(t => [t.domain, t]));
