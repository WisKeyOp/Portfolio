# Systems Engineering & Architecture Portfolio

Production portfolio of Aayush Shukla: Generative AI Systems Engineer at Ernst & Young (EY) and Lead Systems Architect. This application serves as an architectural case study and interactive showcase of high-integrity distributed backends, LangGraph multi-agent workflows, and safety-critical telemetry pipelines.

---

## 1. Architectural Overview

The portfolio is built as a high-performance, static client application enforcing strict engineering invariants:

- **Runtime & Toolchain**: React 19, TypeScript (strict mode), Vite 8, Tailwind CSS v4, Oxlint.
- **Motion & Physics Engine**: GSAP 3 (ScrollTrigger, quickTo), Lenis smooth scrolling, strict `prefers-reduced-motion` compliance, and viewport-aware animation budgeting via `IntersectionObserver`.
- **Design System**: Fully tokenized CSS custom property architecture in `src/globals.css`. Zero hardcoded palette classes or un-tokenized colors across all mounted components.
- **State & Deep-Dive Modals**: Full Browser History API (`popstate`) synchronization (`#project-{id}`, `#resume`), keyboard navigation (Escape to dismiss, Tab focus trapping), and lock-free body scroll management.
- **Accessibility & Contrast**: 100% WCAG 2.1 AA compliant across both Dark and Light themes (verified via axe-core with 0 violations), minimum 44x44px touch targets on all interactive elements, and explicit `:focus-visible` states.
- **Zero Auth Footprint**: Completely static client-side deployment without runtime session overhead, third-party authentication tracking, or client-exposed secrets.

---

## 2. Core Engineering Invariants

### 2.1 Design Token Architecture
All visual primitives (typography, spacing, borders, shadows, durations, easing curves, and color values) derive exclusively from semantic tokens defined in `src/globals.css`:

- **Type Scale**: `--fs-micro` (12px), `--fs-small` (14px), `--fs-body` (16px), `--fs-lead` (20px), `--fs-h4` (21.6px), `--fs-h3` (fluid clamp), `--fs-h2` (fluid clamp), `--fs-display` (fluid clamp).
- **Tracking Scale**: `--track-tight` (-0.025em), `--track-normal` (0), `--track-label` (0.08em uppercase).
- **Radius Scale**: `--r-sm` (6px), `--r-md` (12px), `--r-lg` (20px), `--r-pill` (999px).
- **Motion Durations**: `--dur-fast` (150ms), `--dur-base` (300ms), `--dur-slow` (600ms).
- **Color Roles**: `--paper` (canvas background), `--card` (raised surface), `--mute` (subtle inset), `--ink` (primary high-contrast text), `--slate` (secondary text, >= 4.5:1 AA compliant), `--flame` (primary operational accent), `--lime` (telemetry/success indicator).

### 2.2 Accessibility Standards (WCAG 2.1 AA)
- Contrast ratio >= 4.5:1 for normal text and >= 3:1 for large display text across both Light (`[data-theme="light"]`) and Dark (`[data-theme="dark"]`) modes.
- Keyboard navigation across the entire DOM tree: skip links, focus traps in modals, keyboard-scrollable overflow containers (`tabIndex={0}`, `role="region"`), and explicit `:focus-visible` outline rings with offset.
- Screen reader semantic labeling: all icons and decorative elements use `aria-hidden="true"`, dynamic state buttons declare `aria-expanded` and `aria-selected`, and carousel tracks declare `role="tablist"` and `role="tab"`.

### 2.3 Motion Budget & Fallback Resilience
- When `prefers-reduced-motion: reduce` is detected:
  - Lenis smooth scroll engine is completely bypassed in favor of native instant scrolling.
  - All scroll-scrubbed transforms and parallax layers are neutralized.
  - CSS animation durations and transitions collapse to `0.01ms !important`.
  - Marquee loops and decorative floating cursors are disabled.
- **No-JS Compatibility**: Critical content begins with full visibility via `html.no-js [data-reveal]` fallback rules, swapped to `html.js` by an early inline script in `index.html`.
- **CPU/Battery Preservation**: Off-screen marquee tracks and decorative strips are automatically paused via an `IntersectionObserver` adding `.is-paused` (`animation-play-state: paused !important`).

---

## 3. Flagship Systems Showcased

| Project | Domain | Architecture Highlights | Invariants & Guarantees |
|---|---|---|---|
| **DashResQ** | Safety-Critical IoT & Autonomous Emergency Triage | Dual FastAPI services (`:8000` & `:8001`), PostgreSQL, Redis, pgvector, Next.js 14, Swift watchOS, Expo. | 9-state OCC escalation engine, partial unique index enforcing single active incident per user, 600 vitals/min continuous ingestion, 0 duplicate dispatches across 2,584 CI tests. |
| **Temporal PCAP Ledger** | Distributed Systems & Financial Tech | Python 3.11, FastAPI, PostgreSQL OCC, Docker, pgvector. | 100% append-only immutable ledger, version-fenced optimistic concurrency control blocking double-spends, zero destructive updates, deterministic historical state reconstruction at any timestamp (t). |
| **BITAID** | High-Stakes Agentic Triage | LangGraph, Python, FastAPI, React 19, Tailwind CSS. | Hybrid BM25 and dense vector search, deterministic safety guardrails, automated multi-tier ticket routing with audit logs. |
| **MEDICONNECT** | Healthcare Data Systems | React 19, Node.js, Express, MongoDB, WebSockets. | Role-based access control, cryptographic verification of medical history, real-time consultation dispatching with zero cross-tenant leakage. |
| **Knowledge-Bridge** | Semantic Search & Retrieval | Python, FastAPI, Qdrant Vector DB, React. | Sub-50ms vector query latency, hybrid keyword-dense reranking, semantic token chunking pipelines. |
| **RapAid** | Disaster Mesh & Coordination | React, Leaflet.js, ServiceWorker, IndexedDB. | 100% offline-first incident capture, sub-50ms local render from IndexedDB, automated background replay upon cellular reconnection. |

---

## 4. Systems Stack & Primitives

- **Languages**: Python, TypeScript, JavaScript, C++, C, Java, SQL, Swift.
- **AI, Agents & Vector**: LangGraph, LangChain, Model Context Protocol (MCP), RAG Architectures, pgvector, Gemini 2.0 API, Claude Vision, Semantic Chunking.
- **Backend & Systems**: FastAPI, Node.js, Express.js, WebSockets, Optimistic Concurrency Control (OCC), Redis Caching, Docker, Azure API Management (APIM), OAuth 2.0 / OIDC.
- **Databases & Storage**: PostgreSQL, Neon Serverless, MongoDB, Supabase, SQLAlchemy, Drizzle ORM.
- **Frontend & Mobile**: Next.js (App & Pages Router), React 19, React Native (Expo), Swift (watchOS), Vite, Tailwind CSS, Redux Toolkit.

---

## 5. Directory Structure

```
Portfolio/
|-- public/
|   |-- icons/                   # 36 dual-mode, theme-adaptive vector SVGs
|   |-- Aayush_Shukla_Resume.pdf # Audited production resume document
|   |-- portrait.png             # Salient U2-Net segmented portrait cutout
|   |-- favicon.svg              # SVG brand icon
|-- src/
|   |-- components/
|   |   |-- About.tsx            # Background, metrics cards, and mission statement
|   |   |-- Axioms.tsx           # Engineering decision priority principles
|   |   |-- CommandMenu.tsx      # Keyboard-driven command palette (Cmd/Ctrl + K)
|   |   |-- Contact.tsx          # Direct communication interface and vCard
|   |   |-- Credentials.tsx      # Academic, competitive programming, and hackathon honors
|   |   |-- Cursor.tsx           # Floating canvas cursor tracker
|   |   |-- Experience.tsx       # Horizontal snap-slider work history (EY, Veda AI)
|   |   |-- FlowDesignView.tsx   # Interactive 5-stage architecture topology engine
|   |   |-- Footer.tsx           # Colophon, timestamp, and copyright metadata
|   |   |-- Header.tsx           # Fixed glass header with navigation anchors
|   |   |-- Hero.tsx             # Typographic display, fluid word fitting, portrait
|   |   |-- Logos.tsx            # Full-width infinite scrolling tech primitive marquee
|   |   |-- Offcanvas.tsx        # Mobile navigation drawer with focus management
|   |   |-- Preloader.tsx        # Zero-trap session-cached entry counter
|   |   |-- ProjectModal.tsx     # Deep-dive case study dialog with popstate routing
|   |   |-- ResumeModal.tsx      # In-app audited PDF resume viewer with direct actions
|   |   |-- Services.tsx         # Kinetic horizontal drift engineering domains
|   |   |-- SiteMotion.tsx       # GSAP/ScrollTrigger/Lenis orchestration engine
|   |   |-- Statement.tsx        # Scroll-lit typography statement
|   |   |-- Strip.tsx            # Architectural mantra marquee strip
|   |   |-- ToTop.tsx            # Scroll-triggered return-to-top control
|   |   |-- Works.tsx            # Categorized project showcase with editorial cards
|   |   |-- ArchitectureDeepDive.tsx # Dormant 9-state OCC simulator & audit stream
|   |   |-- MermaidViewer.tsx    # Strict-security vector diagram rendering engine
|   |-- data/
|   |   |-- portfolio-data.ts    # Single source of truth for projects, stack, and metrics
|   |   |-- telemetry-nodes.ts   # Node manifests for interactive topologies
|   |-- globals.css              # Core design tokens, theme definitions, component styles
|   |-- App.tsx                  # Root application tree and layout assembly
|   |-- main.tsx                 # React 19 client bootstrap entrypoint
|-- scripts/
|   |-- baseline_metrics.py      # Automated design token and defect audit scanner
|   |-- refine_portrait.py       # U2-Net matting and color decontamination pipeline
|-- index.html                   # HTML entrypoint with pre-paint theme injection
|-- package.json                 # Project dependencies, scripts, and engine specifications
|-- tsconfig.json                # TypeScript compiler configuration (strict mode)
|-- vite.config.ts               # Vite bundler configuration
|-- INSTRUCTION.md               # Architecture manual, operational logs, and mistake ledger
|-- README.md                    # System documentation and repository overview
```

---

## 6. Local Development & Verification

### 6.1 Prerequisites
- Node.js >= 20.0.0
- npm >= 10.0.0

### 6.2 Installation
```bash
git clone https://github.com/WisKeyOp/Portfolio.git
cd Portfolio
npm install
```

### 6.3 Development Server
Start the local development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The server will bind to `http://localhost:5173/`.

### 6.4 Static Verification Pipeline
Before committing any changes, run the full automated verification chain:
```bash
npm run lint && npm run build
```
This executes:
1. `oxlint`: Fast AST linting enforcing React 19 purity and TypeScript invariants.
2. `tsc -b`: Strict type checking across the entire project tree.
3. `vite build`: Production rollup bundling with gzip size inspection.

### 6.5 Production Preview
Preview the production build locally:
```bash
npm run preview
```

---

## 7. Audit & Quality Gate Results

The portfolio underwent a comprehensive 11-phase architectural refactor to eliminate design drift and enforce token discipline:

| Verification Metric | Initial Baseline | Post-Refactor State | Measurement Detail |
|---|---|---|---|
| **Hardcoded Hex Values Outside Tokens** | 221 | 98 | Reduced by 55.7%; remaining values are restricted to brand icon specs and image masks. |
| **Tailwind Palette Overrides** | 190 | 0 | 100% eliminated (`zinc-*`, `slate-*`, `emerald-*`, `amber-*`, `indigo-*` removed). |
| **Unchoreographed Animation Loops** | 3 | 0 | `animate-ping` and `animate-pulse` replaced with CSS transitions and motion budgeting. |
| **Distinct Font Sizes in CSS** | 42 | 9 | Consolidated into a strict 8-step modular type scale. |
| **Distinct Border Radii in CSS** | 13 | 7 | Consolidated into semantic `--r-sm`, `--r-md`, `--r-lg`, and `--r-pill` tokens. |
| **Distinct Letter Spacings** | 15 | 3 | Consolidated into `--track-tight`, `--track-normal`, and `--track-label`. |
| **Distinct Transition Durations** | 14 | 3 | Standardized to `--dur-fast` (150ms), `--dur-base` (300ms), and `--dur-slow` (600ms). |
| **WCAG 2.1 AA Violations (axe-core)** | 7 | 0 | Verified 0 errors across Dark and Light themes for both desktop and mobile viewports. |
| **Production CSS Bundle Size** | 86.13 kB | 75.88 kB | -11.9% reduction in compiled stylesheet weight. |

---

## 8. Deployment & Operational Policy

- **Target Environment**: Railway / Cloudflare Pages / Vercel (Static Hosting).
- **Security Boundaries**:
  - Zero sensitive environment variables required at build time or runtime.
  - No client-side API secret injection.
  - Production deployments require clean passing runs of `oxlint`, `tsc -b`, and `vite build`.
  - Deployment status and runtime logs are monitored via CLI (`railway logs`).

---

## 9. License

Source code is available under the MIT License. Architectural concepts, project content, and brand assets are copyright Aayush Shukla.
