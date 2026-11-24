# Portfolio — Systems Architecture & Engineering Specification

## 1. Architectural Flow & Topology

The Portfolio application is a high-performance, statically compiled showcase engineered for **Aayush Shukla** (Lead Systems Architect & AI Infrastructure Engineer). It serves as both an interactive resume and an audited failure-mode systems exhibition for high-scale distributed backends, IoT telemetry engines, and LangGraph multi-agent ecosystems.

```
                                      [Portfolio Client Application]
                                    (React 19 + Vite 8 + GSAP + Lenis)
                                                    │
        ┌───────────────────────────┬───────────────┴───────────────┬───────────────────────────┐
        ▼                           ▼                               ▼                           ▼
 [Header & Hero Parallax]   [Editorial Systems Stage]      [Systems Topology Radar]      [Deep-Dive Modals]
 - Fixed Glass Header       - 3-Col Asymmetric About       - Proportional Scale Radar    - Full OCC State Machine
 - 4-Dot Brand Quadrant     - Animated Live Stat Counters  - Projects / Ex / DSA Nodes   - Invariant Rules Spec
 - Viewport-Fitted Wordmark - Kinetic Scroll Statement     - Proportional Dot Radii      - Failure Modes Matrix
 - Cutout Baseline Layer    - Horizontal Drift Services    - 360° Rotating Sonar Sweep   - Direct PDF Resume
 - 3D Scroll Parallax       - Shadcn Segmented Works Tabs  - Live 60 FPS Canvas ECG HUD  - Interactive PG Index
 - ⌘K Command Palette       - Axioms Interactive Peek      - Network Topology Edges
                            - Experience Snap Slider       - Zero Duplicate Dispatches
                            - Tech Stack Infinite Loop
```

### 1.1 Visual & Kinetic Design Standards Integration
- **Design Language Synthesis**:
  Blends the editorial layout and smooth typography of high-craft portfolios with Shadcn UI precision primitives (Command Palette, Segmented Pill Tabs, Invariant Badges, Glass Nav Dock) and DashResQ mission-critical telemetry controls.
- **Color Discipline**:
  - Light Mode Surface: `--paper: #f4f3f1`, `--card: #ffffff`, `--ink: #0b0b0b`, `--slate: #6d6d6d`
  - Dark Mode Depth: `--paper: #06080d`, `--card: #121824`, `--ink: #f2f1ef`, `--slate: #9d9d9d`
  - Kinetic Accents: `--flame: #ff4a17` (primary brand, cursor, CTA), `--lime: #cbff3a` (status ping, progress), `--line: rgba(255,255,255,0.08)`
- **Typographic Hierarchy**:
  - Display Headline: `Archivo` (weight 800-900, tight tracking -0.04em)
  - Editorial Body: `Instrument Sans` & `Manrope` (weight 400-600)
  - Tabular & Telemetry Metadata: `IBM Plex Mono` / `Fira Code` (precise tabular numbers)

### 1.2 Systems Topology & Proportional Scale Radar (`TelemetryMissionControl.tsx`)
- **Proportional Dot Scale Architecture**:
  The map is a cybernetic distributed systems topology radar representing Projects, Work Experience, and Achievements where dot diameter is strictly proportional to system scale, user throughput, and architectural impact:
  - **Apex Flagship (DashResQ)**: Weight 5.0, 32px core beacon, 3 expanding sonar pulse waves (`drq-ping`), red glow (`#EF4444`). 2,584 CI tests, 299 endpoints, 600 vitals/min.
  - **Major Work Experience (EY GenAI Infrastructure)**: Weight 4.5, 26px beacon, 2 pulse waves, cyan glow (`#38BDF8`). Generative AI Systems Engineer, -30% RAG prompt overhead, Azure APIM gateway.
  - **Competitive DSA Milestones (Algorithmic Rigor)**: Weight 4.0, 22px beacon, 2 pulse waves, amber glow (`#F59E0B`). LeetCode Knight 1899 (Top 4.67%), Codeforces Expert 1649, Adobe Semifinalist.
  - **Temporal Ledgers & Clinical AI (PCAP, BITAID)**: Weight 4.0, 22px beacons, 2 pulse waves. Append-only OCC ledger and 18-class drug interaction consultation.
  - **Production Ecosystem Modules (MediConnect, Knowledge-Bridge, RapAid, Veda AI)**: Weight 3.0 - 3.5, 14px - 18px beacons.
- **Topological Edge Network**:
  SVG network vectors (`TOPOLOGY_LINKS`) connect related systems with animated dashed paths and traveling data packets.
- **360° Rotating Sonar Sweep**:
  Continuous CSS conical gradient sweep beam scanning the radar field every 6 seconds.
- **Interactive Mission Control Console HUD**:
  - 60 FPS HTML5 Canvas Lead-II ECG waveform monitor.
  - Category Filter Controls: `All Nodes (9)`, `Projects (6)`, `Work Ex (2)`, `DSA Rigor (1)`.
  - Invariants & Failure-Mode Inspector (SQL Partial Unique Index, OCC Collisions Caught counter).
  - Direct deep-dive modal launch (`ProjectModal`).
  Allows seamless inspection of 3 real DashResQ incidents:
  - `INC-4F2A`: High-speed motorcycle collision & trauma (Outer Ring Rd, Marathahalli)
  - `INC-7B19`: Acute ventricular arrhythmia (MG Road Boulevard)
  - `INC-2C88`: Vehicle rollover extrication (Hosur Flyover)

### 1.3 Shadcn UI Primitives & Blended Architecture
- **Global Command Menu (`CommandMenu.tsx`)**:
  Accessible via `⌘K` / `Ctrl+K` keyboard shortcut or header search trigger. Features quick section jumps, project filter actions, theme toggle, and live OCC telemetry simulation triggers.
- **Segmented Filter Tabs (`Works.tsx`)**:
  Shadcn-style pill segmented tabs (`[All Architectures]`, `[Safety-Critical IoT]`, `[AI & LangGraph]`, `[Ledgers & Systems]`).
- **System Invariant & Metric Badges**:
  Each project card highlights formal system guarantees (`OCC Invariant`, `Idempotency: SHA-256`, `Append-Only Immutable State`) alongside production metrics (`2,584 Passing CI Tests`, `600 Vitals/Min`).
- **Modernized Floating Header Dock (`Header.tsx`)**:
  Features a brand mark with `SYS_ARCH` status pill, glass floating dock, quick search pill (`⌘K`), theme toggle, and resume trigger.

### 1.4 High-Craft Engineering Case-Study Specification (`ProjectModal.tsx`)
- **Restrained Linear/Stripe Engineering Aesthetic**:
  - Modal surface: `#0A0A0C` background, `#111114` elevated card surface, `border-white/[0.08]` 1px hairlines.
  - Text hierarchy: `#F4F4F5` (primary headline), `#A1A1AA` (body/qualifier), `#71717A` (eyebrow metadata).
  - Single Clean Sticky Header: Left minimal `← Back to Portfolio` button; right subtle emerald `PRODUCTION AUDITED` status dot + `GitHub Source` + `Live Demo` (when available) + `ESC` close button. Redundant bottom bar completely eliminated.
  - Zero personal contact strips inside modal: Contact coordinates (Lucknow, Ranchi, Pune, phone, email) remain exclusively in global portfolio header/footer.
  - 4-Column Bento Grid: Left-aligned, bold primary metric claim on top (`text-sm font-medium text-zinc-100`) and technical qualifier below (`text-xs text-zinc-400`).
  - Prose Measure Cap: Overview capped at `max-w-[65ch]` with `leading-relaxed` (1.6) and zero surrounding box border.
  - Two-Column Architectural Split:
    - Left: Deterministic Guarantees with subtle check icons and clean `divide-y divide-white/[0.06]` hairlines (no individual capsule borders).
    - Right: Failure-Mode Analysis with structured pairs (bold title on top, secondary mitigation beneath) anchored by a thin amber accent hairline (`border-l-2 border-amber-500/40 pl-3.5`).
  - Quiet Tech Stack Tags: `px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded-md text-zinc-300`.
  - Motion: GPU-composited `transform` and `opacity` only (`modalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)`). Verified on desktop (`1440x900`) and mobile (`390x844`) with zero horizontal overflow.

### 1.5 Telemetry & Architecture Unification (`TelemetryMissionControl.tsx` & `ArchitectureDeepDive.tsx`)
- **Strict Design System Token Alignment**:
  - Removed all foreign navy/slate/indigo hex colors (`#060910`, `#07090F`, `#080C14`, `#151B28`, `#3C46D1`, `#0f172a`, `#8692A6`, `#F1F4FA`) and rainbow Tailwind accents (`sky-*`, `indigo-*`, `purple-*`, `rose-*`).
  - Surfaces inherit strictly from CSS variables: `var(--paper)`, `var(--card)`, `var(--mute)`, `var(--void)` (`#000000`), `var(--coal)` (`#0a0a0a`).
  - Text: `var(--ink)`, `var(--slate)`, `var(--smoke)`.
  - Borders: `var(--line)` and `var(--line-dark)`.
  - Restrained accents: `var(--flame)` (`#ff4a17`) for active node selections and errors; `var(--lime)` (`#cbff3a`) for verified indicators, active sandbox controls, and nominal telemetry.
- **De-Cluttered Topology & Scoped ECG Monitor**:
  - Eliminated gratuitous `animate-ping` / `animate-pulse` loops and glowing `boxShadow` halos.
  - Rendered crisp architectural nodes: neutral bordered circles when inactive, solid `var(--flame)` with 1px outer hairline ring when selected.
  - Minimal Swiss Geo Anchors overlay (`bg-[var(--void)]/85 border border-[var(--line-dark)] text-[var(--smoke)]`).
  - Replaced floating legend with a quiet 1-line inline footer strip beneath the canvas.
  - Scoped Lead-II ECG canvas strictly to DashResQ (`activeNode.projectId === 'dashresq'`) on `#0a0a0a` background with nominal `var(--lime)` and shock `var(--flame)` traces. Non-DashResQ projects render a clean 2-column metrics & runtime ports summary card.
- **Mounted `ArchitectureDeepDive.tsx`**:
  - Positioned as a dedicated `.dark` editorial band (`#architecture`) immediately following `#radar`.
  - Houses the 9-State OCC Machine, Ingestion Topology, LangGraph Triage Flow, and the interactive Live OCC Sandbox with append-only audit stream.
  - *Current Status*: Commented out alongside `TelemetryMissionControl` in `src/App.tsx`, `Header.tsx`, `Offcanvas.tsx`, and `CommandMenu.tsx` per user instruction. Preserved intact for future redeployment.

### 1.6 Systems Stack & Primitives Icon Architecture (`Logos.tsx` & `portfolio-data.ts`)
- **100% Vector SVG Tool Coverage**:
  - Replaced all fallback text boxes and broken third-party image URLs with 36 high-fidelity, theme-adaptive vector SVGs.
  - Implemented crisp dual-mode rendering: pure white `#FFFFFF` in dark bands, deep ink `#0B0B0B` in light bands, with dedicated brand hex accents (LangChain green `#1C3C3C`, Next.js black, Kafka orange, Azure blue, PyTorch red).
  - Integrated full tool manifest across: LangGraph, LangSmith, FastAPI, Azure, Docker, Kubernetes, PostgreSQL, Redis, Apache Kafka, Apache Spark, Databricks, BigQuery, ClickHouse, Apache Cassandra, Milvus, Qdrant, ChromaDB, Hugging Face, Ollama, vLLM, DeepSeek, PyTorch, v0, Claude Code, Cursor, Supabase, Git, Vite, Tailwind CSS, TypeScript, React, Python, C++, Go, Java, Linux.

### 1.7 Portrait Cutout Sub-Pixel Matting, Color Decontamination & Stage Integration (`scripts/refine_portrait.py` & `src/globals.css`)
- **Direct U2-Net Salient Segmentation Architecture**:
  - Replaced legacy GrabCut base masks (which suffered from asymmetric 45px shoulder clipping on foliage boundaries) with full-scale U2-Net salient human segmentation pinned to single-thread CPU execution (`intra_op_num_threads = 1`).
  - Restored 15,568 missing pixels of the shoulders, sleeves, and lapels directly from `portrait-original.jpg`.
  - Maintained exact 620x676 layout dimensions with symmetric margin distribution (14px left, 7px right) and solid baseline anchoring.
- **Mathematical Alpha Matting & Defringing Pipeline**:
  - **Sub-Pixel Transition**: Full 256-level continuous 8-bit alpha gradient across boundary pixels, eliminating stair-stepped aliasing.
  - **Boundary Color Decontamination (`estimate_foreground_ml`)**: Reconstructed true local foreground color ($F$) at edge pixels, completely eliminating background sky, terrace wall, and green leaf color spill.
- **Photographic Tone Harmonization & Color Grading**:
  - **Specular Highlight Compression**: Rolled off harsh outdoor midday sunlight glare on glasses frames and forehead using soft-knee compression on upper luminance ($L > 185$).
  - **Black Point Grounding**: Deepened suit shadow floor from lifted milky blue (RGB 17, 26, 38) down to rich architectural charcoal (RGB 8, 12, 18) without crushing fabric weave.
  - **Sunlit Shoulder Balancing**: Neutralized harsh sunlit flare on the right shoulder, harmonizing exposure across both shoulders.
  - **Green Despill**: Neutralized yellow-green ambient bounce from nearby foliage on the left lapel.
  - **Studio Skin Tone Balance**: Gentle warm shift in LAB $A^*/B^*$ channels (+1.0 / +1.5) countering cold blue outdoor sky fill.
- **Stage Depth & Grounding in CSS (`src/globals.css`)**:
  - **Atmospheric Rim Backlight (`.hero__figure::before`)**: Positioned radial depth gradient behind silhouette (subtle warm flame/white diffusion in Dark Mode, luminous eggshell diffusion in Light Mode) providing clean optical separation from hero typography.
  - **Dual-Layer Optical Drop Shadow (`.hero__figure img`)**: Applied `drop-shadow(0 20px 40px rgba(0,0,0,0.35)) drop-shadow(0 4px 10px rgba(0,0,0,0.18))` for physical grounding on both desktop and mobile viewports.
  - **Smooth Baseline Dissolve**: Graduated linear mask (`mask-image: linear-gradient(to bottom, #000 86%, rgba(0,0,0,0.75) 94%, transparent 100%)`) seamlessly fading suit into lower section boundary.
- **100% Vector Asset Coverage Across All 5 Engineering Domains**:
  - Eliminated all placeholder text abbreviation lettermarks (`abbr`) across all 36 tools in `toolGroups`.
  - Added official brand-filled Simple Icons SVGs to `public/icons/`:
    - Languages: `swift.svg` (`#F05138`).
    - AI & Agents: `langgraph.svg` (`#E0234E`), `langchain.svg` (`#10B981`), `googlegemini.svg` (`#8E75B2`), `claude.svg` (`#D97757`).
    - Backend & Systems: `fastapi.svg` (`#009688`), `openid.svg` (`#F78C40`), `websocket.svg` (`#38BDF8`), `socketdotio.svg` (`#E2E8F0`).
    - Databases & Storage: `mongodb.svg` (`#47A248`), `neon.svg` (`#00E599`), `sqlalchemy.svg` (`#D71F00`), `drizzle.svg` (`#C5F74F`).
    - Frontend & Mobile: `expo.svg` (`#E2E8F0`), `swift.svg` (`#F05138`).
  - Authored dedicated vector SVGs for architecture primitives: `mcp.svg` (Model Context Protocol connector), `rag.svg` (Retrieval-Augmented Generation vector stack), `chunking.svg` (Semantic token chunking), and `neon.svg` (Neon Serverless prism).
- **Defensive Error Handling Fallback**:
  - Implemented inline `onError` event handling in `Logos.tsx` that smoothly hides failed image elements and surfaces the styled abbreviation pill, preventing broken image placeholders.
  - Verified 36/36 tool references exist on disk and decode with 0 errors on Playwright.

---

## 2. Failure-Mode Analysis & Error Logging

### 2.1 Build & Typecheck Errors
- **Failure Mode 1**: `verbatimModuleSyntax` and `noUnusedLocals` compiler flags causing build failure on standard React or interface imports.
  - *Root Cause*: Strict compiler rules treated non-type-only interface imports as fatal errors.
  - *Mitigation*: Strictly enforce `import type { FC, Project }` across all modules.
- **Failure Mode 2**: Missing optional fields in `Project` interface when instantiating ad-hoc telemetry nodes.
  - *Root Cause*: `TelemetryMissionControl.tsx` created project fallback structures missing newly introduced visual metadata fields (`image`, `tags`, `meta`, `year`).
  - *Mitigation*: Made visual decoration fields optional (`image?: string; tags?: string;`) with deterministic fallback defaults in `Works.tsx`.
- **Failure Mode 3**: Impure function calls (`new Date()`) inside component render blocks detected by `oxlint`.
  - *Root Cause*: Dynamic `new Date().getFullYear()` in `Footer.tsx` and timestamp generation in `ArchitectureDeepDive.tsx` violates React Compiler pure render expectations.
  - *Mitigation*: Hoisted static timestamp initializations (`CURRENT_YEAR = 2026`) outside render functions.
- **Failure Mode 7**: `TS6133` unused imports under strict TypeScript compiler.
  - *Root Cause*: Unused icons or hook imports in `Works.tsx`, `CommandMenu.tsx`, and `TelemetryMissionControl.tsx`.
  - *Mitigation*: Cleaned all unused local identifiers; verified with `tsc -b && vite build`.
- **Failure Mode 8**: React Compiler `react(set-state-in-effect)` warning on synchronous `setState` in `useEffect`.
  - *Root Cause*: Calling `setStreamPackets(initialLogs)` and `setQuery('')` synchronously in `useEffect` causes cascading re-renders.
  - *Mitigation*: Initialized state directly in `useState(INITIAL_LOGS)` and reset query on action triggers.
- **Failure Mode 9**: Trapped Modal Navigation & Lost Browser Back Button.
  - *Root Cause*: Opening `ResumeModal` or `ProjectModal` toggled local component state (`isResumeOpen = true`) without pushing state to `window.history`. When recruiters or visitors clicked the browser Back button or performed a mobile swipe-back gesture, the browser navigated away from the portfolio completely to the prior site.
  - *Mitigation*: Implemented dual-way `window.history.pushState` and `window.addEventListener('popstate')` synchronization. Navigating back gracefully closes the active modal while keeping the user on the portfolio. Added sticky floating back buttons with `ESC` keyboard shortcuts.
- **Failure Mode 10**: Isolated Radar Map vs. Cohesive Distributed Systems Architecture.
  - *Root Cause*: Early radar iteration used arbitrary cardinal directions (`000° NORTH`) and green sonar sweeps resembling a naval simulator, completely isolated from the portfolio's editorial typography, theme variables, and systems architecture narrative.
  - *Mitigation*: Rebuilt as an **Integrated Distributed Systems Architecture & Network Topology Station**. Connected nodes represent actual microservice topologies (`:8000 Core`, `:8001 DRQ Worker`, `PostgreSQL OCC Ledger`, `LangGraph Triage DAG`, `EY APIM Gateway`), integrated a live 60 FPS Lead-II ECG waveform canvas tracking 600 vitals/min, added OCC spike simulation controls, and provided a view toggle between Service Mesh and Geographical Engineering Anchors (Pune, Ranchi, Lucknow, Cloud).
- **Failure Mode 11**: De-emphasized Recruiter Maneuvering & Buried Source Links.
  - *Root Cause*: Architectural deep-dive modals buried live deployment URLs and GitHub repositories inside understated text links, preventing recruiters from directly testing the systems.
  - *Mitigation*: Engineered prominent, high-contrast primary CTA buttons (`[ 🌐 Launch Live Platform ↗ ]`, `[ ⌥ View GitHub Source ↗ ]`) both at the top header and in a persistent sticky bottom recruiter bar. Added a verified candidate dossier ribbon highlighting base location (Lucknow), college (BIT Mesra, Ranchi), working city (Pune @ EY), and direct telephone (`+91 8874235446`).
- **Failure Mode 12**: ONNX Runtime Native Buffer Bad Allocation on Windows Python 3.13 during Neural Matting.
  - *Root Cause*: Executing `rembg` (`u2net.onnx` / `isnet-general-use.onnx`) under Python 3.13 Microsoft Store environment fails with `[ONNXRuntimeError] : 6 : RUNTIME_EXCEPTION ... bad allocation` because multi-threaded node reordering (`ReorderInput`) exceeds native thread pool buffer quotas.
  - *Mitigation*: Built a deterministic OpenCV GrabCut segmentation pipeline with pinned foreground/background seed polygons, morphological closing, anti-aliased Gaussian edge smoothing, and single-threaded OpenBLAS constraints. Cropped to balanced 620x676 aspect ratio and verified zero visual artifacts on Playwright across desktop and mobile viewports.

### 2.2 Kinetic & Motion Errors
- **Failure Mode 4**: Double initialization under React StrictMode in development.
  - *Root Cause*: Double-mounting triggered concurrent Lenis instances and duplicate ScrollTrigger listeners.
  - *Mitigation*: Guarded in `SiteMotion.tsx` using `started.current` ref and full `gsap.context()` teardown in the cleanup return handler.
- **Failure Mode 5**: Packet collision during rapid consecutive beacon clicks in `TelemetryMissionControl.tsx`.
  - *Root Cause*: Triggering new requestAnimationFrame while existing packet flight is active caused packet jump or stale coordinate state.
  - *Mitigation*: Guarded in `handleNodeClick` with `if (packetPos) return;` guaranteeing clean atomicity for every telemetry transmission.
- **Failure Mode 6**: Preloader freezing at 0% under React 19 StrictMode double-mount.
  - *Root Cause*: React StrictMode mounts, unmounts, and re-mounts components in development mode. On unmount, `ctx.revert()` cancelled GSAP tweens. On the second mount, a `started.current` guard blocked re-initialization, leaving the preloader overlay permanently fixed at 0%. Concurrently, `lenis?.raf` remained bound in `gsap.ticker` without an unmount remove listener.
  - *Mitigation*: Removed `started.current` short-circuit to let `gsap.context` cleanly initialize on the active mount, registered `gsap.ticker.remove(lenisRaf)` in teardown, added a hard React state unmount timer (`setTimeout(() => setDismissed(true), 1000)`) in `Preloader.tsx`, and bypassed preloader entirely on subsequent visits via `sessionStorage.getItem('seen_portfolio_preloader')`.

---

## 3. Build & Deployment Commands

```bash
# Install dependencies
npm install

# Run development server (active daemon on port 5173)
# http://localhost:5173/ | http://192.168.29.248:5173/
npx vite --port 5173 --host

# Run production build (typecheck + vite bundling)
npm run build

# Run Oxlint validation (0 warnings, 0 errors)
npm run lint

# Preview production build locally
npm run preview
```

---

## 4. Mistake Log

### Entry 01
- **Mistake**: Used `print()` for debugging in production-ready agents.
- **Why**: Zero observability and hard to filter.
- **Rule**: Use structured logging with context.
- **Check**: Reject any PR with `print()` in core logic.

### Entry 02
- **Mistake**: Forgot `None` checks in LangGraph state transitions.
- **Why**: Brittle flow and hidden runtime crashes.
- **Rule**: Validate state at every boundary.
- **Check**: Verify optional fields before transition logic.

### Entry 03
- **Mistake**: Synchronous `setState` inside `useEffect` on component mount.
- **Why**: Triggers cascading re-renders and violates React 19 / React Compiler strict purity rules.
- **Rule**: Initialize state directly via `useState(initialValue)` or state initializers; use effects solely for external system synchronization.
- **Check**: `oxlint` rule `react(set-state-in-effect)`.

### Entry 04
- **Mistake**: Opening full-screen modals without browser history (`popstate`) synchronization.
- **Why**: Traps the user or navigates completely away from the portfolio when the browser Back button or mobile back gesture is triggered.
- **Rule**: Every full-page or deep-dive modal must push state to `window.history` (`#resume`, `#project-{id}`) and cleanly dismiss on `popstate`.
- **Check**: Trigger modal, hit browser back button; ensure the modal closes while preserving portfolio page position.

### Entry 05
- **Mistake**: Placing redundant personal contact strips and duplicate navigation bars inside deep-dive case-study modals.
- **Why**: Clutters architectural focus, creates duplicate scroll traps, and violates single source of navigation principles.
- **Rule**: Deep-dive project modals must contain exactly ONE sticky top navigation bar (`← Back` on left, `Source/Demo` + `ESC` on right), cap prose at `max-w-[65ch]`, and avoid repetitive personal contact blocks already present in global navigation.
- **Check**: Audit modal DOM; verify 0 personal contact pills, 1 top bar, 0 bottom bars, and clean 2-column split with hairline dividers.

### Entry 06
- **Mistake**: Relying on unconstrained ONNX Runtime multi-threading in Windows sandbox environments for asset processing.
- **Why**: Triggers native memory allocator crashes (`bad allocation` in `ReorderInput`) and blocks pipeline execution.
- **Rule**: Pin execution providers to single-thread (`intra_op_num_threads = 1`, `OPENBLAS_NUM_THREADS = 1`) or use deterministic C++ OpenCV GrabCut algorithms with explicit seed polygons.
- **Check**: Test asset pipelines under constrained memory environments before production asset deployment.

### Entry 07
- **Mistake**: Introducing foreign hex color values (`#060910`, `#151B28`, `#3C46D1`) and gratuitous `animate-ping` / `animate-pulse` loops into telemetry and architecture components.
- **Why**: Breaks visual cohesion across sections, produces jarring HUD sci-fi tropes, causes paint-invalidation jitter, and fails dark/light theme switching.
- **Rule**: All sub-components must inherit strictly from `globals.css` design system tokens (`var(--paper)`, `var(--card)`, `var(--void)`, `var(--coal)`, `var(--flame)`, `var(--lime)`), remove unchoreographed ping/pulse loops, and scope specialized widgets (e.g., ECG canvas) strictly to the relevant project context.
- **Check**: Grep codebase for foreign hex color codes and `animate-ping`; verify visual consistency and zero horizontal overflow in both light and dark modes via Playwright.

### Entry 08
- **Mistake**: Exporting raw binary mask cutouts without sub-pixel alpha matting, color decontamination (defringing), or tonal grounding.
- **Why**: Causes stair-stepped jagged edges (aliasing), bright sky/foliage halo fringes, washed-out lifted shadow floors, and a harsh "sticker" appearance against dark and light editorial backgrounds.
- **Rule**: All photographic cutouts must undergo sub-pixel matting (256-level alpha), boundary foreground color reconstruction (`estimate_foreground_ml`), highlight knee rolloff, black-point alignment, and CSS atmospheric stage depth (rim backlight + optical drop shadow).
- **Check**: Inspect cutout perimeter at $10\times$ zoom over both pure `#000000` and `#FFFFFF` backgrounds via Playwright; verify zero bright fringe halos, continuous alpha falloff, and smooth baseline fade.

### Entry 09
- **Mistake**: Bootstrapping alpha matting trimaps from defective legacy GrabCut masks instead of re-segmenting raw source imagery.
- **Why**: GrabCut masks frequently suffer from edge clipping on low-contrast or foliage-adjacent contours (e.g. slicing 40-50px off human shoulders), and matting trimap erosion/dilation locks in that deformed geometry permanently.
- **Rule**: Never derive trimaps from unverified legacy crops. Run deep salient segmentation (e.g. single-threaded U2-Net) directly on the full raw high-resolution source photo before executing matting, defringing, or cropping.
- **Check**: Compare silhouette contour coordinates against the raw camera source; verify anatomical symmetry and complete preservation of shoulder/sleeve spans across all horizontal scanlines.
