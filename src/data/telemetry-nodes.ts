export interface TelemetryNode {
  id: string;
  projectId: string;
  title: string;
  subtitle: string;
  kind: 'project' | 'experience' | 'achievement';
  category: string;
  weight: 5 | 4.5 | 4 | 3.5 | 3;
  dotSize: number; // visual dot diameter in px (proportional to weight)
  pos: [number, number]; // [xPercent, yPercent] on radar map (0 - 100)
  color: string;
  glowColor: string;
  tag: string;
  metricBadge: string;
  locationHub?: string;
  portLabel?: string;
  vitalSnippet?: {
    label: string;
    value: string;
    subtext: string;
    tone: 'flame' | 'lime' | 'neutral';
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
    kind: "project",
    category: "APEX FLAGSHIP // SAFETY-CRITICAL",
    weight: 5,
    dotSize: 32,
    pos: [48, 50],
    color: "var(--flame)",
    glowColor: "rgba(255, 74, 23, 0.25)",
    tag: "APEX // 01",
    metricBadge: "2,584 CI Tests · 299 Endpoints · 600/min Telemetry",
    locationHub: "Cloud / Distributed Engine",
    portLabel: "Port :8000 / :8001",
    vitalSnippet: {
      label: "OCC VITALS INGESTION",
      value: "600 vitals/min",
      subtext: "0 Duplicate Dispatches · 14ms Latency",
      tone: "flame",
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
    },
  },
  {
    id: "node-ey-infra",
    projectId: "ey-infra",
    title: "Ernst & Young (EY)",
    subtitle: "Enterprise LangGraph Multi-Agent Workflows & MCP Servers",
    kind: "experience",
    category: "ENTERPRISE // WORK EXPERIENCE",
    weight: 4.5,
    dotSize: 26,
    pos: [74, 28],
    color: "var(--lime)",
    glowColor: "rgba(203, 255, 58, 0.25)",
    tag: "WORK EX // EY",
    metricBadge: "Generative AI Systems Engineer · -30% RAG Prompt Overhead",
    locationHub: "Pune, India (Ernst & Young)",
    portLabel: "Azure APIM / MCP",
    vitalSnippet: {
      label: "ENTERPRISE GATEWAY",
      value: "Azure APIM + MCP",
      subtext: "OAuth 2.0/OIDC · Multi-Tenant Isolation",
      tone: "lime",
    },
    details: {
      role: "Generative AI Systems Engineer",
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
    id: "node-dsa",
    projectId: "dsa-rigor",
    title: "Algorithmic Rigor & DSA",
    subtitle: "Competitive Programming: LeetCode Knight & Codeforces Expert",
    kind: "achievement",
    category: "MILESTONE // COMPETITIVE DSA",
    weight: 4,
    dotSize: 22,
    pos: [76, 68],
    color: "#f4f4f5",
    glowColor: "rgba(244, 244, 245, 0.15)",
    tag: "ACHIEVEMENT",
    metricBadge: "Knight 1899 (Top 4.67%) · Expert 1649 · Adobe Semifinalist",
    locationHub: "Ranchi, India (BIT Mesra CSE)",
    portLabel: "Knight 1899 // Top 4.67%",
    vitalSnippet: {
      label: "GLOBAL RATING",
      value: "Knight 1899",
      subtext: "Top 4.67% Global · 334+ Solved",
      tone: "neutral",
    },
    details: {
      role: "Competitive Programming Specialist",
      timeline: "2022 – 2026",
      stack: ["C++", "Python", "Data Structures", "Dynamic Programming", "Graph Theory", "Monotonic Stacks"],
      keyGuarantees: [
        "Mandatory approach, Time Complexity, and Space Complexity verification prior to code write.",
        "Codeforces Expert (Peak 1649 across 29 rated rounds).",
        "Adobe India Hackathon Semifinalist (Top 4K teams of 260K+ participants).",
        "Tata Imagination Challenge Semifinalist (National technology ideation).",
      ],
      failureModeMitigation: "Refusal rule: reject sub-optimal O(N^2) routines when O(N log N) or O(N) alternatives exist.",
    },
  },
  {
    id: "node-pcap",
    projectId: "temporal-pcap",
    title: "Temporal PCAP Ledger",
    subtitle: "Append-Only Immutable State Machine & Capital Call Engine",
    kind: "project",
    category: "FINANCIAL // TEMPORAL LEDGER",
    weight: 4,
    dotSize: 22,
    pos: [24, 30],
    color: "#f4f4f5",
    glowColor: "rgba(244, 244, 245, 0.15)",
    tag: "PROJECT",
    metricBadge: "100% Append-Only · Zero Silent Lost Updates · OCC Versioning",
    locationHub: "Ranchi, India (BIT Mesra CSE)",
    portLabel: "OCC State Engine",
    vitalSnippet: {
      label: "LEDGER AUDIT",
      value: "Zero Lost Updates",
      subtext: "OCC Fencing · Compensating Reversals",
      tone: "neutral",
    },
    details: {
      role: "Lead Systems Architect",
      timeline: "2026",
      stack: ["Python", "FastAPI", "PostgreSQL OCC", "Docker", "pgvector"],
      keyGuarantees: [
        "Optimistic Concurrency Control (OCC) version fencing rejecting stale updates.",
        "Temporal query replay engine reconstructing ledger state at any point in time.",
        "Compensating transaction pipeline guaranteeing zero destructive updates.",
      ],
      failureModeMitigation: "Concurrent Double Spend: Blocked via version check in WHERE clause. Late-arriving events handled via deterministic replay.",
    },
  },
  {
    id: "node-bitaid",
    projectId: "bitaid",
    title: "BITAID Voice Clinical AI",
    subtitle: "Voice-First Autonomous AI Medical Consultation Assistant",
    kind: "project",
    category: "CLINICAL // VOICE AI",
    weight: 4,
    dotSize: 22,
    pos: [22, 70],
    color: "#f4f4f5",
    glowColor: "rgba(244, 244, 245, 0.15)",
    tag: "PROJECT",
    metricBadge: "18 Drug Classes · Sub-2s Voice Latency Turnaround",
    locationHub: "Ranchi, India (BIT Mesra CSE)",
    portLabel: "Gemini 2.0 // Vapi",
    vitalSnippet: {
      label: "CLINICAL AUDIT",
      value: "18 Classes Checked",
      subtext: "Deterministic Pediatric Safety Floor",
      tone: "neutral",
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
    id: "node-mediconnect",
    projectId: "mediconnect",
    title: "MediConnect",
    subtitle: "Zero-Cost ($0/mo) Integrated Emergency Healthcare Aggregator",
    kind: "project",
    category: "HEALTHCARE // FULL-STACK",
    weight: 3.5,
    dotSize: 18,
    pos: [50, 16],
    color: "#a1a1aa",
    glowColor: "rgba(161, 161, 170, 0.12)",
    tag: "PROJECT",
    metricBadge: "$0/mo Total Hosting Cost · Real-Time Firestore Sync",
    locationHub: "Lucknow, India (Zero-Cost Infra)",
    portLabel: "Firestore / Leaflet",
    details: {
      role: "Lead Systems Architect",
      timeline: "2024 – 2025",
      stack: ["Next.js", "Firebase Firestore", "MongoDB", "Leaflet.js", "Geoapify", "Tailwind CSS"],
      keyGuarantees: [
        "Zero-cost architecture operating production doctor chat, bed tracking, and delivery.",
        "Keyless geospatial mapping using backend-proxied Geoapify endpoints.",
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
    kind: "project",
    category: "AI // EDTECH & RAG",
    weight: 3.5,
    dotSize: 18,
    pos: [50, 84],
    color: "#a1a1aa",
    glowColor: "rgba(161, 161, 170, 0.12)",
    tag: "PROJECT",
    metricBadge: "Razorpay HMAC-SHA256 · Top-4 Cosine Timestamp Retrieval",
    locationHub: "Lucknow, India (Zero-Cost Infra)",
    portLabel: "Gemini / Razorpay",
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
    kind: "project",
    category: "IOT // DISASTER MESH",
    weight: 3,
    dotSize: 14,
    pos: [14, 48],
    color: "#a1a1aa",
    glowColor: "rgba(161, 161, 170, 0.12)",
    tag: "PROJECT",
    metricBadge: "100% Offline Capable · ServiceWorker Background Sync",
    locationHub: "Ranchi / Disaster Mesh",
    portLabel: "IndexedDB / Offline",
    details: {
      role: "Systems Architect & Developer",
      timeline: "2024",
      stack: ["Vite", "React", "Tailwind CSS", "ServiceWorker", "IndexedDB"],
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
    kind: "experience",
    category: "STARTUP // WORK EXPERIENCE",
    weight: 3,
    dotSize: 14,
    pos: [86, 46],
    color: "#a1a1aa",
    glowColor: "rgba(161, 161, 170, 0.12)",
    tag: "WORK EX // VEDA",
    metricBadge: "20+ Production Iterations · Granular Session RBAC",
    locationHub: "Remote / Incubation",
    portLabel: "Next.js / Node.js",
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
    },
  },
];

// Topological network edges linking projects, experiences and achievements (subtle neutral lines)
export const TOPOLOGY_LINKS = [
  { from: "node-dashresq", to: "node-ey-infra", color: "rgba(255, 255, 255, 0.12)", dash: "3 4" },
  { from: "node-dashresq", to: "node-pcap", color: "rgba(255, 255, 255, 0.12)", dash: "3 4" },
  { from: "node-dashresq", to: "node-bitaid", color: "rgba(255, 255, 255, 0.12)", dash: "3 4" },
  { from: "node-dashresq", to: "node-dsa", color: "rgba(255, 255, 255, 0.12)", dash: "3 4" },
  { from: "node-dashresq", to: "node-mediconnect", color: "rgba(255, 255, 255, 0.08)", dash: "2 4" },
  { from: "node-dashresq", to: "node-knowledge-bridge", color: "rgba(255, 255, 255, 0.08)", dash: "2 4" },
  { from: "node-dashresq", to: "node-rapaid", color: "rgba(255, 255, 255, 0.08)", dash: "2 4" },
  { from: "node-ey-infra", to: "node-veda-ai", color: "rgba(255, 255, 255, 0.1)", dash: "3 4" },
  { from: "node-dsa", to: "node-veda-ai", color: "rgba(255, 255, 255, 0.1)", dash: "3 4" },
  { from: "node-pcap", to: "node-rapaid", color: "rgba(255, 255, 255, 0.1)", dash: "3 4" },
];
