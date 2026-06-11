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
  { id: 125, name: "Crisp",            company: "Crisp",            category: "ai_chat",        risk: "low",      domain: "crisp.chat",            why: "Chat widget with AI assistant features." },

  // ═══════════════════════════════════════════════════════════════════
  //  ADVANCED PACK (v1.1) — broader coverage across every category.
  //  Note: some fraud/identity vendors below double as access gates;
  //  if a site misbehaves, allowlist it from the popup.
  // ═══════════════════════════════════════════════════════════════════

  // ─── Session replay (advanced) ─────────────────────────────────────
  { id: 200, name: "Contentsquare",    company: "Contentsquare",    category: "session_replay", risk: "high",     domain: "contentsquare.net",     why: "Experience analytics that reconstructs full user journeys, sold explicitly to optimization and ML teams." },
  { id: 201, name: "Decibel",          company: "Medallia",         category: "session_replay", risk: "high",     domain: "decibelinsight.net",    why: "Scores and replays user sessions to model frustration and intent." },
  { id: 202, name: "VWO",              company: "Wingify",          category: "session_replay", risk: "medium",   domain: "visualwebsiteoptimizer.com", why: "A/B testing suite with heatmaps and session recordings." },
  { id: 203, name: "Plerdy",           company: "Plerdy",           category: "session_replay", risk: "medium",   domain: "plerdy.com",            why: "Heatmaps and session replay tied to conversion tracking." },
  { id: 204, name: "Sprig",            company: "Sprig",            category: "session_replay", risk: "medium",   domain: "sprig.com",             why: "In-product session capture and surveys feeding AI-summarized insights." },
  { id: 205, name: "SessionCam",       company: "Contentsquare",    category: "session_replay", risk: "medium",   domain: "sessioncam.com",        why: "Records sessions and builds struggle/abandonment scores." },

  // ─── AI / ML pipeline (advanced) ───────────────────────────────────
  { id: 220, name: "Adobe Exp. Edge",  company: "Adobe",            category: "ai_pipeline",    risk: "high",     domain: "adobedc.net",           why: "Adobe Experience Platform edge — streams your activity into Adobe's profile graph and AI products." },
  { id: 221, name: "BlueConic",        company: "BlueConic",        category: "ai_pipeline",    risk: "high",     domain: "blueconic.net",         why: "Customer Data Platform assembling a unified profile of you across visits." },
  { id: 222, name: "Treasure Data",    company: "Treasure Data",    category: "ai_pipeline",    risk: "high",     domain: "treasuredata.com",      why: "Enterprise CDP routing behavioral data into warehouses and models." },
  { id: 223, name: "Lytics",           company: "Lytics",           category: "ai_pipeline",    risk: "high",     domain: "lytics.io",             why: "CDP with built-in machine-learning audience scoring." },
  { id: 224, name: "Freshpaint",       company: "Freshpaint",       category: "ai_pipeline",    risk: "high",     domain: "freshpaint.io",         why: "Auto-collects every event and fans it out to dozens of destinations." },
  { id: 225, name: "Kissmetrics",      company: "Kissmetrics",      category: "ai_pipeline",    risk: "medium",   domain: "kissmetrics.io",        why: "Person-level behavioral analytics tied to a persistent identity." },

  // ─── Fingerprinting / device-fraud (advanced) ──────────────────────
  { id: 240, name: "Sift",             company: "Sift",             category: "fingerprint",    risk: "high",     domain: "siftscience.com",       why: "Fraud platform that fingerprints your device and scores your behavior." },
  { id: 241, name: "Forter",           company: "Forter",           category: "fingerprint",    risk: "high",     domain: "forter.com",            why: "Identity and device fingerprinting for fraud decisions." },
  { id: 242, name: "Riskified",        company: "Riskified",        category: "fingerprint",    risk: "high",     domain: "riskified.com",         why: "Collects device and behavioral signals to score transactions." },
  { id: 243, name: "Signifyd",         company: "Signifyd",         category: "fingerprint",    risk: "medium",   domain: "signifyd.com",          why: "Device fingerprinting for commerce fraud protection." },
  { id: 244, name: "DataDome",         company: "DataDome",         category: "fingerprint",    risk: "high",     domain: "datadome.co",           why: "Bot-detection that fingerprints every visitor; may gate site access." },
  { id: 245, name: "HUMAN (PerimeterX)", company: "HUMAN",          category: "fingerprint",    risk: "high",     domain: "perimeterx.net",        why: "Bot/fraud defense that fingerprints the browser; may gate site access." },
  { id: 246, name: "Arkose Labs",      company: "Arkose Labs",      category: "fingerprint",    risk: "medium",   domain: "arkoselabs.com",        why: "Device-risk fingerprinting behind many login challenges." },

  // ─── Marketing automation pixels (advanced) ────────────────────────
  { id: 260, name: "Snap Pixel",       company: "Snap",             category: "marketing",      risk: "high",     domain: "tr.snapchat.com",       why: "Reports your visit and conversions back to Snapchat Ads." },
  { id: 261, name: "HubSpot",          company: "HubSpot",          category: "marketing",      risk: "medium",   domain: "hs-analytics.net",      why: "Tracks page views and forms, tying them to a marketing contact record." },
  { id: 262, name: "Marketo",          company: "Adobe",            category: "marketing",      risk: "medium",   domain: "mktoresp.com",          why: "Munchkin tracking links your browsing to a lead profile." },
  { id: 263, name: "Pardot",           company: "Salesforce",       category: "marketing",      risk: "medium",   domain: "pardot.com",            why: "B2B marketing tracking tied to your email identity." },
  { id: 264, name: "Klaviyo",          company: "Klaviyo",          category: "marketing",      risk: "medium",   domain: "klaviyo.com",           why: "E-commerce tracking that links browsing to your email profile." },
  { id: 265, name: "Mailchimp",        company: "Intuit",           category: "marketing",      risk: "medium",   domain: "list-manage.com",       why: "Email-marketing tracking of opens, clicks and site visits." },
  { id: 266, name: "Reddit Pixel",     company: "Reddit",           category: "marketing",      risk: "medium",   domain: "pixel.reddit.com",      why: "Conversion pixel reporting your activity to Reddit Ads." },
  { id: 267, name: "Bizible",          company: "Adobe",            category: "marketing",      risk: "medium",   domain: "bizible.com",           why: "Marketing-attribution tracking across your visits." },

  // ─── Analytics & measurement (advanced) ────────────────────────────
  { id: 280, name: "Comscore",         company: "Comscore",         category: "analytics",      risk: "high",     domain: "scorecardresearch.com", why: "Cross-site audience measurement building demographic profiles." },
  { id: 281, name: "Quantcast",        company: "Quantcast",        category: "analytics",      risk: "high",     domain: "quantserve.com",        why: "Audience measurement and consent tool that profiles visitors for ads." },
  { id: 282, name: "Chartbeat",        company: "Chartbeat",        category: "analytics",      risk: "medium",   domain: "chartbeat.com",         why: "Real-time engagement analytics for publishers." },
  { id: 283, name: "Parse.ly",         company: "Automattic",       category: "analytics",      risk: "medium",   domain: "parsely.com",           why: "Content analytics tracking what you read and for how long." },
  { id: 284, name: "New Relic Browser",company: "New Relic",        category: "analytics",      risk: "low",      domain: "nr-data.net",           why: "Real-user monitoring; performance telemetry tied to your session." },
  { id: 285, name: "Cloudflare Insights",company: "Cloudflare",     category: "analytics",      risk: "low",      domain: "cloudflareinsights.com",why: "Lightweight web analytics; privacy-friendlier but still tracking." },
  { id: 286, name: "Statcounter",      company: "Statcounter",      category: "analytics",      risk: "medium",   domain: "statcounter.com",       why: "Classic visitor analytics logging IP, referrer and path." },
  { id: 287, name: "Optimizely",       company: "Optimizely",       category: "analytics",      risk: "medium",   domain: "optimizely.com",        why: "Experimentation platform that buckets and tracks you across tests." },
  { id: 288, name: "Plausible",        company: "Plausible",        category: "analytics",      risk: "low",      domain: "plausible.io",          why: "Privacy-focused analytics — still counts your visit, but no cookies." },
  { id: 289, name: "Fathom",           company: "Fathom",           category: "analytics",      risk: "low",      domain: "usefathom.com",         why: "Privacy-focused analytics; minimal data, still site-side tracking." },

  // ─── Ad networks & exchanges (advanced) ────────────────────────────
  { id: 300, name: "Amazon Ad System", company: "Amazon",           category: "ads",            risk: "high",     domain: "amazon-adsystem.com",   why: "Amazon's ad exchange and retargeting across the open web." },
  { id: 301, name: "Index Exchange",   company: "Index Exchange",   category: "ads",            risk: "high",     domain: "casalemedia.com",       why: "Programmatic ad exchange that auctions your impression in real time." },
  { id: 302, name: "Sharethrough",     company: "Sharethrough",     category: "ads",            risk: "medium",   domain: "sharethrough.com",      why: "Native-ad exchange and bidder." },
  { id: 303, name: "Sovrn",            company: "Sovrn",            category: "ads",            risk: "medium",   domain: "lijit.com",             why: "Ad exchange and audience-data marketplace." },
  { id: 304, name: "Equativ",          company: "Equativ",          category: "ads",            risk: "medium",   domain: "smartadserver.com",     why: "Ad server and supply-side platform." },
  { id: 305, name: "Teads",            company: "Teads",            category: "ads",            risk: "medium",   domain: "teads.tv",              why: "Outstream video-ad platform that profiles viewers." },
  { id: 306, name: "GumGum",           company: "GumGum",           category: "ads",            risk: "medium",   domain: "gumgum.com",            why: "Contextual ad platform with cross-site tracking." },
  { id: 307, name: "Adform",           company: "Adform",           category: "ads",            risk: "high",     domain: "adform.net",            why: "Full-stack ad platform with identity and retargeting." },
  { id: 308, name: "AdRoll",           company: "NextRoll",         category: "ads",            risk: "high",     domain: "adroll.com",            why: "Retargeting network that follows you across sites with ads." },
  { id: 309, name: "Media.net",        company: "Media.net",        category: "ads",            risk: "medium",   domain: "media.net",             why: "Large contextual ad network (Yahoo/Bing supply)." },
  { id: 310, name: "Yieldmo",          company: "Yieldmo",          category: "ads",            risk: "medium",   domain: "yieldmo.com",           why: "Ad exchange that fingerprints attention and interaction." },

  // ─── Data brokers & identity graphs (advanced) ─────────────────────
  { id: 330, name: "LiveIntent",       company: "LiveIntent",       category: "data_broker",    risk: "high",     domain: "liadm.com",             why: "Email-based identity graph linking you across newsletters and sites." },
  { id: 331, name: "Tapad",            company: "Experian",         category: "data_broker",    risk: "high",     domain: "tapad.com",             why: "Cross-device identity graph tying your phone, laptop and TV together." },
  { id: 332, name: "Neustar",          company: "TransUnion",       category: "data_broker",    risk: "high",     domain: "agkn.com",              why: "Identity and audience data resold for ad targeting." },
  { id: 333, name: "Epsilon",          company: "Publicis",         category: "data_broker",    risk: "critical", domain: "epsilon.com",           why: "Major data broker matching online behavior to offline purchase records." },
  { id: 334, name: "Zeotap",           company: "Zeotap",           category: "data_broker",    risk: "high",     domain: "zeotap.com",            why: "CDP and identity broker enriching your profile with third-party data." },
  { id: 335, name: "Permutive",        company: "Permutive",        category: "data_broker",    risk: "medium",   domain: "permutive.app",         why: "Publisher audience platform that segments you for ad buyers." },
  { id: 336, name: "33Across",         company: "33Across",         category: "data_broker",    risk: "high",     domain: "33across.com",          why: "Identity-resolution and addressability vendor syncing your IDs." },

  // ─── AI chat / support widgets (advanced) ──────────────────────────
  { id: 350, name: "Zendesk Chat",     company: "Zendesk",          category: "ai_chat",        risk: "low",      domain: "zopim.com",             why: "Support chat (Zopim) whose transcripts feed Zendesk AI." },
  { id: 351, name: "LivePerson",       company: "LivePerson",       category: "ai_chat",        risk: "medium",   domain: "liveperson.net",        why: "Conversational-AI platform that stores and models chat data." },
  { id: 352, name: "Freshchat",        company: "Freshworks",       category: "ai_chat",        risk: "low",      domain: "freshchat.com",         why: "Support chat widget with AI bot features." },
  { id: 353, name: "Tawk.to",          company: "Tawk.to",          category: "ai_chat",        risk: "low",      domain: "tawk.to",               why: "Free live-chat widget that loads on countless sites." },
  { id: 354, name: "Olark",            company: "Olark",            category: "ai_chat",        risk: "low",      domain: "olark.com",             why: "Live-chat widget with visitor tracking." },
  { id: 355, name: "LiveChat",         company: "LiveChat",         category: "ai_chat",        risk: "low",      domain: "livechatinc.com",       why: "Live-chat widget with AI assist and visitor analytics." },
  { id: 356, name: "Help Scout",       company: "Help Scout",       category: "ai_chat",        risk: "low",      domain: "helpscout.net",         why: "Support 'Beacon' widget that tracks visitors and chats." }
];

// Convenience lookup tables
export const TRACKER_BY_ID = Object.fromEntries(TRACKERS.map(t => [t.id, t]));
export const TRACKER_BY_DOMAIN = Object.fromEntries(TRACKERS.map(t => [t.domain, t]));
