---
version: 1
slug: "client-src-app-jsx"
primary_target: "client/src/App.jsx"
related_targets: ["client/src/styles.css","client/src/pages/Dashboard.jsx","client/src/pages/Login.jsx"]
---

# SukiMart back office (app shell, all pages)

Scope: the whole client app: Login, Dashboard (extra polish), Employee Registration, Payroll, POS, four reports, User Account. Mode: Operate.

Audience and job: the instructor grades each required page; demo users play admin and cashier on desktop, phone and touch. Avoid: template look, hard-to-find features, flashy effects, plainness.

## Direction contract

THESIS: The store's cement-tile floor is the system. Every panel is a square tile laid on a thin grout grid, and only one tile per screen carries the full pattern: the thing that matters most right now. It refuses the generic white-card admin template with a blue accent.

OWN-WORLD: Oxblood rail (#7a2a26), ochre (#c98a2b) for the live or selected thing, slate (#3c4f5c) for data, pale tile (#f3efe7) panels on a grey-warm grout ground (#e7e2da), ink #1f1b18. Square corners (4px max), 4px grout gaps, one-pixel rules. Quarter-motif corners on tiles; the full four-fold motif on one tile only. One grotesque (Schibsted Grotesk) for everything, tabular figures for money.

STORY: The grader logs in, sees today's store at a glance, finds every required page in a labelled sidebar, and each Save shows a clear pop-up.

FIRST VIEWPORT: Dashboard: oxblood rail left with Forms / Reports / Admin groups, current page brightest with an ochre edge. Main: greeting and date top-left, Register employee and Open POS top-right. Row of four tiles: Today's sales on the full-pattern tile (largest figure), receipts, active employees, payroll this month. Below: this week's sales bars (slate, today ochre) beside latest receipts table. Login: one centred full-pattern tile holding the form on the grout ground.

FORM: Machuca cement tile, candidate 7 of 7 on the third hand; seed:b93e039a65cac655. Raises: current section brightest; next actions always at top; tables one type size; one-pixel rules, three values per screen; no ornament outside tiles. Signature move: the single full-pattern tile.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
