# Portfolio — Systems Architecture & Engineering Specification

## 1. Architectural Flow & Topology

The Portfolio application is a high-performance, statically compiled showcase engineered for **Aayush Shukla** (Lead Systems Architect & AI Infrastructure Engineer). It serves as both an interactive resume and a failure-mode systems exhibition for high-scale backend, distributed IoT, and LangGraph agentic systems.

```
                              [Portfolio Client Application]
                                    (React 19 + Vite 8)
                                             │
      ┌──────────────────────┬───────────────┴───────────────┬──────────────────────┐
      ▼                      ▼                               ▼                      ▼
 [Hero & Axioms]    [Architecture Deep Dive]         [Project Catalog]     [Direct PDF Delivery]
 - OCC Mandate       - Dual-Service Topology          - DashResQ (Flagship)  - /Aayush_Shukla_Resume.pdf
 - Correctness > ... - 9-State OCC Machine (Postgres) - BITAID, MediConnect  - Embedded Iframe Modal
 - Metrics Bar       - LangGraph Triage Pipeline      - Knowledge-Bridge     - One-click Download
```

### 1.1 Key Modules & Component Boundaries
- **`src/components/Navbar.tsx`**: Monospace brand badge (`AS.SYSTEMS`), live heartbeat indicator, smooth anchor navigation, and direct resume triggers.
- **`src/components/Hero.tsx`**: High-impact systems lead identity, runtime status pill, command banner, core metrics ribbon (2,584 CI tests, 299 endpoints, LeetCode Knight 1899, Codeforces Expert 1649), and primary CTAs.
- **`src/components/AxiomsSection.tsx`**: Encapsulates the failure-mode analyst ethos: Decision Priority Hierarchy, Optimistic Concurrency Control, and Agentic Safety Floors.
- **`src/components/ArchitectureDeepDive.tsx`**: Interactive tabbed architectural inspection of DashResQ:
  1. *Dual-Service Topology*: DRQ Telemetry (:8001) vs Platform (:8000), internal HMAC bridge, and worker isolation.
  2. *9-State OCC Escalation*: Postgres partial unique index preventing duplicate dispatches.
  3. *LangGraph Triage Pipeline*: BM25 + dense pgvector hybrid retrieval with deterministic safety floors.
- **`src/components/ProjectsSection.tsx` & `ProjectModal.tsx`**: Filterable portfolio of 6 systems with deep-dive modal exposing failure modes and architectural invariants.
- **`src/components/ExperienceSection.tsx`**: Enterprise track record at Ernst & Young (Associate Consultant & Intern) and Veda AI.
- **`src/components/CompetitiveSection.tsx`**: Algorithmic rigor metrics (LeetCode, Codeforces, Adobe Hackathon semifinalist, BIT Mesra degree).
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
- **Failure Mode 3**: Broken resume asset links on external deployments.
  - *Root Cause*: Direct path referencing to local desktop files.
  - *Mitigation*: Copied `Aayush_Shukla_Resume.pdf` into `public/Aayush_Shukla_Resume.pdf` and `public/resume.pdf`, ensuring both Vite dev server and static production builds in `dist/` serve the binary directly with zero 404s.

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

