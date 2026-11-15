# Portfolio — Systems Architecture & Engineering Specification

## 1. Architectural Flow & Topology

The Portfolio application is a high-performance, statically compiled showcase engineered for **Aayush Shukla** (Lead Systems Architect & AI Infrastructure Engineer). It serves as both an interactive resume and a failure-mode systems exhibition for high-scale backend, distributed IoT, and LangGraph agentic systems.

```
                              [Portfolio Client Application]
                                    (React 19 + Vite 8)
                                             │
      ┌──────────────────────┬───────────────┴───────────────┬──────────────────────┐
      ▼                      ▼                               ▼                      ▼
 [Hero & Navbar]    [Distributed Systems Radar]       [Architecture Deep Dive]  [Direct PDF Delivery]
 - Runtime Status    - 360° Tactical Radar Sweep      - DashResQ 9-State OCC    - /Aayush_Shukla_Resume.pdf
 - Core Metrics      - Weight-scaled Beacons (8)      - LangGraph Triage Flow   - Embedded Iframe Modal
 - Fast Anchors      - Telemetry Packet Flight        - Dual-Service Topology   - Instant Download
                     - Main Command Console Decodes
```

### 1.1 Key Modules & Component Boundaries
- **`src/components/Navbar.tsx`**: Monospace brand badge (`AS.SYSTEMS`), live heartbeat indicator, smooth anchor navigation (`Systems Radar`, `Architecture`, `Experience`, `DSA & Metrics`, `Axioms`, `Stack`), and direct resume triggers.
- **`src/components/Hero.tsx`**: High-impact systems lead identity, runtime status pill, command banner, core metrics ribbon (2,584 CI tests, 299 endpoints, LeetCode Knight 1899, Codeforces Expert 1649), and primary CTAs (`Launch Systems Radar (8)` and `Inspect Architecture`).
- **`src/components/TelemetryMissionControl.tsx`**: **Core Interactive Centerpiece**:
  - *Tactical Radar Map*: 360° gradient sweep (`@keyframes radarSweep`), distance range rings, sector coordinate grid, and live vital monitor (142 bpm · 4.2G accelerometer).
  - *Weighted Telemetry Beacons*: 8 system nodes (`dashresq`, `ey-infra`, `bitaid`, `dsa-rigor`, `mediconnect`, `knowledge-bridge`, `rapaid`, `veda-ai`) revealed sequentially on scroll with weight-scaled ping radiuses (DashResQ 5.0 apex with triple rings).
  - *Packet Flight Animation*: Clicking any beacon shoots an illuminated SVG packet (`@keyframes rescueDash`) across the screen into the Main Command Console.
  - *Main Command Console*: Decodes incoming telemetry packets on impact, updates ingestion event streams, reveals invariants, failure modes, metrics, stack, and triggers `ProjectModal.tsx` for full systems inspection.
- **`src/components/ArchitectureDeepDive.tsx`**: Interactive tabbed architectural inspection of DashResQ:
  1. *Dual-Service Topology*: DRQ Telemetry (:8001) vs Platform (:8000), internal HMAC bridge, and worker isolation.
  2. *9-State OCC Escalation*: Postgres partial unique index preventing duplicate dispatches.
  3. *LangGraph Triage Pipeline*: BM25 + dense pgvector hybrid retrieval with deterministic safety floors.
- **`src/components/ExperienceSection.tsx`**: Enterprise track record at Ernst & Young (Associate Consultant & Intern) and Veda AI.
- **`src/components/CompetitiveSection.tsx`**: Algorithmic rigor metrics (LeetCode, Codeforces, Adobe Hackathon semifinalist, BIT Mesra degree).
- **`src/components/AxiomsSection.tsx`**: Encapsulates the failure-mode analyst ethos: Decision Priority Hierarchy, Optimistic Concurrency Control, and Agentic Safety Floors.
- **`src/components/SkillsMatrix.tsx`**: Verified production stack across Languages, Distributed Systems, AI Orchestration, and DevOps.
- **`src/components/ResumeModal.tsx`**: In-app PDF preview and download pipeline for `Aayush_Shukla_Resume.pdf`.

---

## 2. Failure-Mode Analysis & Error Logging

### 2.1 Build & Typecheck Errors
- **Failure Mode 1**: `verbatimModuleSyntax` and `noUnusedLocals` compiler flags causing build failure on standard React or interface imports.
  - *Root Cause*: `tsconfig.app.json` has strict compiler rules where unused imports and non-type-only interface imports (`import { Project }` instead of `import type { Project }`) are treated as fatal errors.
  - *Mitigation*: Strictly use `import type { FC, Project }` and remove all unused identifiers.
- **Failure Mode 2**: Missing brand icons in `lucide-react` (e.g. `Github`, `Linkedin`).
  - *Root Cause*: Lucide has phased out certain third-party brand icons to keep standard library size minimal.
  - *Mitigation*: Isolated custom SVG definitions in `src/components/Icons.tsx` adhering to the standard `SVGProps<SVGSVGElement>` interface.
- **Failure Mode 3**: Unused Lucide icons in `TelemetryMissionControl.tsx` (`RotateCcw`, `AlertTriangle`, `Layers`, `ChevronRight`).
  - *Root Cause*: Icon references retained from draft layout.
  - *Mitigation*: Pruned all uncalled icons, validated with `tsc -b && vite build` (0 warnings, 0 errors).
- **Failure Mode 4**: Packet collision during rapid consecutive beacon clicks.
  - *Root Cause*: Triggering new requestAnimationFrame while existing packet flight is active caused packet jump or stale coordinate state.
  - *Mitigation*: Guarded in `handleNodeClick` with `if (packet?.active) return;` guaranteeing clean atomicity for every telemetry transmission.

---

## 3. Build & Deployment Commands

```bash
# Install dependencies
npm install

# Run development server (instant HMR)
npm run dev

# Run production build (typecheck + vite bundling)
npm run build

# Preview production build locally
npm run preview
```
