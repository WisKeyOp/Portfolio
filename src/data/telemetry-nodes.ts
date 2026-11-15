export interface TelemetryNode {
  id: string;
  projectId: string;
  title: string;
  subtitle: string;
  category: string;
  weight: 5 | 4.5 | 4 | 3.5 | 3;
  pos: [number, number]; // [xPercent, yPercent] on map
  color: string;
  glowColor: string;
  tag: string;
  metricBadge: string;
  pulseSpeed: string; // e.g. "1.2s", "1.6s", "2.2s"
  radarRingCount: number; // 3, 2, or 1
  vitalSnippet?: {
    label: string;
    value: string;
    subtext: string;
    tone: 'red' | 'green' | 'amber' | 'blue' | 'purple';
  };
  details: {
    role: string;
    timeline: string;
    stack: string[];
    keyGuarantees: string[];
    failureModeMitigation: string;
    liveUrl?: string;
    githubUrl?: string;
  };
}

export const TELEMETRY_NODES: TelemetryNode[] = [
  {
    id: "node-dashresq",
    projectId: "dashresq",
    title: "DashResQ",
    subtitle: "Distributed Safety-Critical IoT & Autonomous Emergency Triage Platform",
    category: "APEX // SAFETY-CRITICAL",
    weight: 5,
    pos: [32, 46],
    color: "#EF4444",
    glowColor: "rgba(239, 68, 68, 0.4)",
    tag: "APEX 01",
    metricBadge: "2,584 CI Tests · 299 Endpoints · 600/min Ingest",
    pulseSpeed: "1.2s",
    radarRingCount: 3,
    vitalSnippet: {
      label: "VITALS TELEMETRY",
      value: "142 bpm · 4.2G",
      subtext: "Impact Sensed · Grace Active",
      tone: "red",
    },
    details: {
      role: "Founding Architect & Lead Developer",
      timeline: "2025 – 2026",
      stack: ["FastAPI", "Python 3.11", "PostgreSQL", "Redis", "pgvector", "Next.js 14", "Expo RN", "Swift watchOS"],
      keyGuarantees: [
        "PostgreSQL partial unique index guarantees strictly one active incident per user.",
        "Zero un-debounced duplicate dispatches even under cellular retry storms.",
        "Dual-service boundary: DRQ Telemetry (:8001) decoupled from Platform Core (:8000).",
        "LangGraph 5-stage medical triage with BM25 + dense pgvector hybrid retrieval.",
      ],
      failureModeMitigation: "Sensor jitter filtered through 14-day rolling Gaussian baselines. Stale updates trigger OCC re-read rather than silent overwrites.",
      liveUrl: "https://www.dashresq.com",
      githubUrl: "https://github.com/WisKeyOp/DashResQ_monorepo",
    },
  },
  {
    id: "node-ey-infra",
    projectId: "ey-infra",
    title: "EY GenAI Infrastructure",
    subtitle: "Enterprise LangGraph Multi-Agent Workflows & MCP Servers",
    category: "ENTERPRISE // MULTI-AGENT",
    weight: 4.5,
    pos: [68, 22],
    color: "#38BDF8",
    glowColor: "rgba(56, 189, 248, 0.4)",
    tag: "EXP 01",
    metricBadge: "LangGraph Multi-Agent · -30% RAG Prompt Overhead",
    pulseSpeed: "1.5s",
    radarRingCount: 2,
    vitalSnippet: {
      label: "ENTERPRISE GATEWAY",
      value: "Azure APIM",
      subtext: "OAuth 2.0/OIDC · Tenant Isolation",
      tone: "blue",
    },
    details: {
      role: "Associate Consultant & Intern (GenAI)",
      timeline: "Jan 2026 – Present",
      stack: ["LangGraph", "LangChain", "MCP Protocol", "Azure APIM", "OAuth 2.0/OIDC", "Python", "RAG", "pgvector"],
      keyGuarantees: [
        "Model Context Protocol (MCP) tool servers fronted by Azure API Management.",
        "Slashing financial RAG token overhead by ~30% via semantic chunking.",
        "Stateful LangGraph multi-agent automation with strict human-in-the-loop review gates.",
      ],
      failureModeMitigation: "Enforced token validation and strict tenant boundary filters across all vector query paths.",
    },
  },
  {
    id: "node-bitaid",
    projectId: "bitaid",
    title: "BITAID",
    subtitle: "Autonomous Voice-First AI Medical Consultation Assistant",
    category: "CLINICAL // VOICE AI",
    weight: 4,
    pos: [18, 76],
    color: "#10B981",
    glowColor: "rgba(16, 185, 129, 0.4)",
    tag: "PROJ 02",
    metricBadge: "18 Drug Classes · Sub-2s Voice Turnaround",
    pulseSpeed: "1.8s",
    radarRingCount: 2,
    vitalSnippet: {
      label: "CLINICAL AUDIT",
      value: "18 Classes",
      subtext: "Contraindications Checked",
      tone: "green",
    },
    details: {
      role: "Core Creator & Architect",
      timeline: "2025 – 2026",
      stack: ["Next.js 15", "Neon PostgreSQL", "pgvector", "Drizzle ORM", "Gemini 2.0 Flash", "Vapi AI", "ElevenLabs"],
      keyGuarantees: [
        "Turn-based voice consultation pipeline (STT -> Gemini tool-calling -> TTS).",
        "Deterministic cross-referencing for 18 pharmacological contraindication classes.",
        "Longitudinal medical-memory extraction from transcripts into isolated family profiles.",
      ],
      failureModeMitigation: "Deterministic pediatric safety floor intercepts tool-calling loop if unverified pediatric dosage risks exist.",
      githubUrl: "https://github.com/WisKeyOp/BITAID",
    },
  },
  {
    id: "node-dsa",
    projectId: "dsa-rigor",
    title: "Algorithmic Rigor & DSA",
    subtitle: "Competitive Programming: LeetCode Knight & Codeforces Expert",
    category: "CORE // DSA COMPLEXITY",
    weight: 4,
    pos: [84, 52],
    color: "#F59E0B",
    glowColor: "rgba(245, 158, 11, 0.4)",
    tag: "CORE 01",
    metricBadge: "Knight 1899 (Top 4.67%) · Expert 1649 · Adobe Semifinalist",
    pulseSpeed: "1.8s",
    radarRingCount: 2,
    vitalSnippet: {
      label: "CONTEST METRIC",
      value: "Knight 1899",
      subtext: "Top 4.67% · 334+ Solved",
      tone: "amber",
    },
    details: {
      role: "Competitive Programming Lead",
      timeline: "2022 – 2026",
      stack: ["C++", "Python", "Data Structures", "Dynamic Programming", "Graph Algorithms", "OCC"],
      keyGuarantees: [
        "Mandatory approach, Time Complexity, and Space Complexity verification prior to code write.",
        "Codeforces Expert (Peak 1649 across 29 rated rounds).",
        "Adobe India Hackathon Semifinalist (Top 4K teams of 260K+ participants).",
        "Tata Imagination Challenge Semifinalist (Flagship national technology ideation).",
      ],
      failureModeMitigation: "Refusal rule: reject sub-optimal O(N^2) routines when O(N log N) or O(N) alternatives exist.",
      liveUrl: "https://leetcode.com/u/ecarte/",
      githubUrl: "https://codeforces.com/profile/nobitalovesshizuka",
    },
  },
  {
    id: "node-mediconnect",
    projectId: "mediconnect",
    title: "MediConnect",
    subtitle: "Zero-Cost ($0/mo) Integrated Emergency Healthcare Aggregator",
    category: "SYSTEMS // FULL-STACK",
    weight: 3.5,
    pos: [50, 16],
    color: "#60A5FA",
    glowColor: "rgba(96, 165, 250, 0.4)",
    tag: "PROJ 03",
    metricBadge: "$0/mo Total Hosting Cost · Real-Time Firestore Sync",
    pulseSpeed: "2.0s",
    radarRingCount: 1,
    details: {
      role: "Lead Systems Architect",
      timeline: "2024 – 2025",
      stack: ["Next.js (Pages SSR)", "Firebase Firestore", "MongoDB", "Leaflet.js", "Geoapify", "Tailwind CSS"],
      keyGuarantees: [
        "Zero-cost architecture operating production doctor chat, bed tracking, and delivery.",
        "Keyless geospatial mapping using Leaflet and backend-proxied Geoapify endpoints.",
        "Sub-200ms reactive chat powered by Firestore onSnapshot reactive listeners.",
      ],
      failureModeMitigation: "Enforced server-generated monotonic timestamps and client reconciliation to eliminate out-of-order messages.",
      githubUrl: "https://github.com/WisKeyOp/MEDICONNECT",
    },
  },
  {
    id: "node-knowledge-bridge",
    projectId: "knowledge-bridge",
    title: "Knowledge-Bridge",
    subtitle: "RAG-Powered EdTech & Lecture Intelligence Platform",
    category: "AI // EDTECH & RAG",
    weight: 3.5,
    pos: [54, 80],
    color: "#A855F7",
    glowColor: "rgba(168, 85, 247, 0.4)",
    tag: "PROJ 04",
    metricBadge: "Razorpay HMAC-SHA256 · Top-4 Cosine Timestamp Retrieval",
    pulseSpeed: "2.0s",
    radarRingCount: 1,
    details: {
      role: "Full-Stack & AI Engineer",
      timeline: "2025",
      stack: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Gemini Embeddings", "Razorpay"],
      keyGuarantees: [
        "Timestamped transcript chunking citing exact video timestamps for student questions.",
        "Constant-time HMAC-SHA256 signature verification on Razorpay payment callbacks.",
        "Idempotent $addToSet student course enrollment preventing double-crediting.",
      ],
      failureModeMitigation: "Guarded against cross-tenant transcript leaks via course-enrollment boundary validation before semantic search.",
      githubUrl: "https://github.com/WisKeyOp/Knowledge-Bridge",
    },
  },
  {
    id: "node-rapaid",
    projectId: "rapaid",
    title: "RapAid",
    subtitle: "Offline-First Mobile Disaster Coordination & Emergency Mesh",
    category: "IOT // DISASTER MESH",
    weight: 3,
    pos: [14, 24],
    color: "#FB923C",
    glowColor: "rgba(251, 146, 60, 0.4)",
    tag: "PROJ 05",
    metricBadge: "100% Offline Capable · ServiceWorker Background Sync",
    pulseSpeed: "2.4s",
    radarRingCount: 1,
    details: {
      role: "Systems Architect & Developer",
      timeline: "2024",
      stack: ["Vite", "React", "Tailwind CSS", "Leaflet.js", "ServiceWorker", "IndexedDB"],
      keyGuarantees: [
        "Complete offline-first triage logging backed by transactional IndexedDB.",
        "Automatic background synchronization upon cellular backhaul resumption.",
        "Sub-50ms local render latency under zero-connectivity environments.",
      ],
      failureModeMitigation: "Pending-sync markers on local database records with visual telemetry age indicators.",
      githubUrl: "https://github.com/WisKeyOp/RapAid",
    },
  },
  {
    id: "node-veda-ai",
    projectId: "career-connect",
    title: "Veda AI & Core Portals",
    subtitle: "0-to-1 Web Architecture, RBAC Middleware & Recruitment Engines",
    category: "STARTUP // 0-TO-1 WEB",
    weight: 3,
    pos: [78, 82],
    color: "#34D399",
    glowColor: "rgba(52, 211, 153, 0.4)",
    tag: "EXP 02",
    metricBadge: "20+ Production Iterations · Granular Session RBAC",
    pulseSpeed: "2.4s",
    radarRingCount: 1,
    details: {
      role: "Founding Software Engineer (Core Team)",
      timeline: "2024 – 2025",
      stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "Cloudinary", "JWT Auth"],
      keyGuarantees: [
        "Shipped 20+ production feature iterations from zero to launch with sub-100ms API response times.",
        "Engineered granular session management and role-based access control.",
        "Cloudinary CDN integration streaming documents directly with zero server memory footprint.",
      ],
      failureModeMitigation: "Enforced tenant isolation on all API middleware paths to prevent cross-account IDOR vulnerabilities.",
      githubUrl: "https://github.com/WisKeyOp/Career-Connect",
    },
  },
];

// Connection lines between nodes to visualize the distributed network topology
export const TOPOLOGY_LINKS = [
  { from: "node-dashresq", to: "node-ey-infra", color: "rgba(56, 189, 248, 0.35)", dash: "4 6" },
  { from: "node-dashresq", to: "node-bitaid", color: "rgba(16, 185, 129, 0.35)", dash: "4 6" },
  { from: "node-dashresq", to: "node-mediconnect", color: "rgba(96, 165, 250, 0.35)", dash: "4 6" },
  { from: "node-dashresq", to: "node-knowledge-bridge", color: "rgba(168, 85, 247, 0.35)", dash: "4 6" },
  { from: "node-dashresq", to: "node-rapaid", color: "rgba(251, 146, 60, 0.35)", dash: "4 6" },
  { from: "node-ey-infra", to: "node-dsa", color: "rgba(245, 158, 11, 0.35)", dash: "4 6" },
  { from: "node-dsa", to: "node-veda-ai", color: "rgba(52, 211, 153, 0.35)", dash: "4 6" },
];
