export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Safety-Critical & IoT' | 'AI & LangGraph' | 'Full-Stack & Systems';
  status: string;
  role: string;
  timeline: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
  metrics: string[];
  summary: string;
  architecturePoints: string[];
  failureModes: string[];
  image?: string;
  tags?: string[];
  meta?: string;
  year?: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  timeline: string;
  period: string;
  place: string;
  type: string;
  achievements: string[];
  summary: string;
  techStack: string[];
  stack: string[];
  image: string;
}

export interface Education {
  institution: string;
  degree: string;
  timeline: string;
  location: string;
  grade: string;
  highlights: string[];
}

export interface CompetitiveStat {
  platform: string;
  handle: string;
  rating: string;
  rank: string;
  url: string;
  percentile: string;
  badge: string;
}

const IMG = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const PERSONAL_INFO = {
  name: "Aayush Shukla",
  firstName: "Aayush",
  lastName: "Shukla",
  heroWord: "Systems Architect",
  title: "Generative AI Systems Engineer @ EY · Lead Systems Architect",
  tagline: "Building fault-tolerant distributed backends, LangGraph multi-agent systems, and safety-critical telemetry pipelines.",
  role: "Generative AI Systems Engineer",
  company: "Ernst & Young (EY)",
  location: "Lucknow, India (Working in Pune · Alum BIT Mesra, Ranchi)",
  baseLocation: "Lucknow, India",
  currentLocation: "Pune, India (Ernst & Young)",
  collegeLocation: "Ranchi, Jharkhand, India (BIT Mesra)",
  status: "Production Active · Systems Architect",
  email: "aayush.shukla1211@gmail.com",
  phone: "+91-8874235446",
  github: "https://github.com/WisKeyOp",
  linkedin: "https://www.linkedin.com/in/aayush-shukla-a13752383",
  leetcode: "https://leetcode.com/u/ecarte",
  codeforces: "https://codeforces.com/profile/nobitalovesshizuka",
  resumeUrl: "/Aayush_Shukla_Resume.pdf",
  cvUrl: "/Aayush_Shukla_Resume.pdf",
  portrait: "/portrait.png",
  portraitFallback: "/portrait-original.jpg",
  bio: "Lead Systems Architect and Failure-Mode Analyst. Specialized in Optimistic Concurrency Control (OCC), high-throughput IoT telemetry ingestion, and enterprise LangGraph multi-agent systems. Generative AI Systems Engineer at EY; Founding Systems Architect behind DashResQ's 299-endpoint distributed ecosystem.",
  socials: [
    {
      short: "In",
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/aayush-shukla-a13752383",
    },
    {
      short: "Gh",
      label: "GitHub",
      href: "https://github.com/WisKeyOp",
    },
    {
      short: "@",
      label: "Email",
      href: "mailto:aayush.shukla1211@gmail.com",
    },
    {
      short: "Lc",
      label: "LeetCode",
      href: "https://leetcode.com/u/ecarte/",
    },
  ],
};

export const CORE_METRICS = [
  { label: "Passing Tests (CI)", value: "2,584+", subtext: "100% green safety suite" },
  { label: "Production Endpoints", value: "299", subtext: "Dual FastAPI backends" },
  { label: "Continuous Telemetry", value: "600/m", subtext: "0 dropped dispatches" },
  { label: "LeetCode Rating", value: "1,899", subtext: "Knight (Top 4.67%)" },
  { label: "Codeforces Peak", value: "1,649", subtext: "Expert Rank" },
  { label: "Incident Escalation", value: "9-State", subtext: "OCC Idempotency" },
];

export const aboutData = {
  intro:
    "Hello! I'm Aayush Shukla. Generative AI Systems Engineer at EY and Lead Systems Architect behind high-integrity backends, multi-agent swarms, and safety-critical platforms.",
  points: [
    "Optimistic Concurrency Control (OCC)",
    "High-Throughput Telemetry (600 vitals/min)",
    "LangGraph Multi-Agent Workflows & MCP Servers",
    "Deterministic Medical Triage Guardrails",
    "Formal Verification & Zero Lost Dispatches",
  ],
  cards: [
    { value: 2584, suffix: "+", label: "Automated CI tests passing" },
    { value: 299, suffix: "", label: "Production API endpoints", dark: true },
    { value: 600, suffix: "+", label: "Vitals/min continuous telemetry", faces: true },
  ],
  outline: "Deterministic distributed systems, zero race conditions, shipped end to end.",
  ctaLabel: "Launch Systems Radar (8)",
  ctaHref: "#projects",
  floats: [
    { value: "99.99", suffix: "%", label: "Production uptime" },
    { value: "0", suffix: "", label: "Lost dispatches" },
  ],
  image: IMG("1558494949-ef010cbdcc31", 800),
};

export const statementData = {
  text: "I turn distributed failure modes into deterministic guarantees — idempotent state machines, audited telemetry, and architectures verified against real-world chaos.",
};

export const stripWords = [
  "Distributed Systems",
  "LangGraph Agents",
  "Optimistic Concurrency",
  "Safety-Critical IoT",
  "MCP Servers",
  "Zero Lost Dispatches",
];

export const serviceDomains = [
  {
    name: "Distributed Telemetry & IoT Architecture",
    tags: ["FastAPI", "PostgreSQL", "Redis", "WebSockets", "HealthKit", "OCC"],
    image: IMG("1518770660439-4636190af475", 700),
  },
  {
    name: "Enterprise Multi-Agent Swarms & MCP",
    tags: ["LangGraph", "LangChain", "MCP Tools", "Azure APIM", "pgvector", "RAG"],
    image: IMG("1677442136019-21780ecad995", 700),
  },
  {
    name: "Temporal Ledgers & Concurrency Machines",
    tags: ["PostgreSQL OCC", "Partial Unique Indexes", "Idempotency", "Docker"],
    image: IMG("1551288049-bebda4e38f71", 700),
  },
  {
    name: "High-Throughput Backend & API Engineering",
    tags: ["Python 3.11", "TypeScript", "Next.js", "Redis Caching", "OAuth 2.0"],
    image: IMG("1526374965328-7f61d4dc18c5", 700),
  },
];

export const SYSTEM_AXIOMS = [
  {
    title: "Decision Priority Hierarchy",
    rule: "Correctness > Security > Auditability > Reliability > Performance > Convenience",
    description: "Never sacrifice a higher-priority property for a lower-priority one without stating the tradeoff explicitly.",
    year: "Axiom 01",
    image: IMG("1550439062-609e1531270e", 600),
  },
  {
    title: "Optimistic Concurrency Control",
    rule: "Partial Unique Indexing & Zero Blind Retries",
    description: "State transitions in safety-critical domains must be strictly idempotent. A single active incident per user constraint eliminates race conditions and duplicate ambulance dispatches.",
    year: "Axiom 02",
    image: IMG("1558494949-ef010cbdcc31", 600),
  },
  {
    title: "Agentic Guardrail Verification",
    rule: "Verified Retrieval & Deterministic Safety Floors",
    description: "High-stakes AI must never rely on unverified model hallucination. LangGraph agents enforce hard deterministic constraints and bilingual medical triage rulebooks.",
    year: "Axiom 03",
    image: IMG("1677442136019-21780ecad995", 600),
  },
  {
    title: "Fault-Tolerant Telemetry Streams",
    rule: "Rolling Baselines & Signal Debouncing",
    description: "Sensors are noisy, hardware fails, and network jitter is constant. Filter Gaussian deviations across 14-day windows before escalating alarms.",
    year: "Axiom 04",
    image: IMG("1518770660439-4636190af475", 600),
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Ernst & Young (EY)",
    role: "Generative AI Systems Engineer",
    location: "Pune, India",
    place: "Pune, India",
    timeline: "Aug 2026 – Present",
    period: "Aug 2026 — Present",
    type: "Full-Time",
    achievements: [
      "Architect and ship stateful multi-agent workflows in LangGraph/LangChain that automate enterprise data-processing pipelines with structured LLM extraction and human-in-the-loop review.",
      "Develop Model Context Protocol (MCP) tool servers fronted by Azure API Management with OAuth 2.0/OIDC authorization, per-client token rate limiting, and multi-tenant isolation.",
      "Optimize enterprise RAG pipelines to cut token overhead, reduce vector latency, and enforce grounded citations.",
    ],
    summary:
      "Architecting stateful LangGraph multi-agent workflows, Model Context Protocol (MCP) servers fronted by Azure APIM with OAuth 2.0/OIDC, and high-precision RAG pipelines for enterprise automation.",
    techStack: ["LangGraph", "LangChain", "MCP", "Azure APIM", "OAuth 2.0/OIDC", "Python", "RAG", "pgvector"],
    stack: ["LangGraph", "MCP Tools", "Azure APIM", "OAuth 2.0", "Python", "pgvector"],
    image: IMG("1551288049-bebda4e38f71", 700),
  },
  {
    company: "Ernst & Young (EY)",
    role: "Generative AI Engineering Intern",
    location: "Pune, India",
    place: "Pune, India",
    timeline: "Jan 2026 – Jul 2026",
    period: "Jan 2026 — Jul 2026",
    type: "Internship",
    achievements: [
      "Engineered enterprise Generative AI agents (Invoice Analyzer, PPT Generator, Fair Market Value Calculator, PCAP capital-call automation) with OCR ingestion, LLM reasoning, and human-in-the-loop review gates.",
      "Optimized a financial RAG pipeline using semantic chunking in place of arbitrary token splits, slashing prompt token overhead by ~30%.",
      "Implemented server-side token validation and secure inter-service boundaries across 3+ internal microservices.",
    ],
    summary:
      "Engineered enterprise GenAI agents with OCR vision ingestion, LLM reasoning, and financial RAG semantic chunking that cut prompt overhead by ~30%.",
    techStack: ["Python", "Semantic Chunking", "OCR Vision", "FastAPI", "Prompt Engineering", "RAG"],
    stack: ["Python", "Semantic Chunking", "FastAPI", "RAG", "OCR Vision"],
    image: IMG("1526374965328-7f61d4dc18c5", 700),
  },
  {
    company: "Veda AI",
    role: "Founding Software Engineer (Core Team)",
    location: "Remote",
    place: "Remote",
    timeline: "Mar 2025 – Sep 2025",
    period: "Mar 2025 — Sep 2025",
    type: "Startup Incubation",
    achievements: [
      "Built the 0-to-1 core web platform (Next.js, Node.js, MongoDB), shipping 20+ production feature iterations with sub-100ms API response times.",
      "Engineered 15+ REST API endpoints with custom Express.js middleware for granular session management and role-based access control.",
    ],
    summary:
      "Built the 0-to-1 core platform on Next.js, Node.js, and MongoDB, delivering sub-100ms response times and strict role-based access control.",
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "RBAC", "TypeScript"],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "TypeScript"],
    image: IMG("1522202176988-66273c2fd55f", 700),
  },
];

export const PROJECTS: Project[] = [
  {
    id: "dashresq",
    title: "DashResQ",
    subtitle: "Distributed Safety-Critical IoT & Autonomous Emergency Triage Platform",
    category: "Safety-Critical & IoT",
    status: "Live & Production-Ready",
    role: "Founding Architect & Lead Developer",
    timeline: "2025 – 2026",
    year: "2026",
    liveUrl: "https://www.dashresq.com",
    githubUrl: "https://github.com/WisKeyOp/DashResQ_monorepo",
    technologies: ["FastAPI", "Python 3.11", "PostgreSQL", "Redis", "pgvector", "Next.js 14", "Expo RN", "Swift watchOS", "Docker"],
    tags: ["Safety-Critical", "IoT", "FastAPI", "PostgreSQL OCC"],
    meta: "High-scale emergency response ecosystem uniting wearable telemetry (Heart Rate, SpO2, HRV) with an autonomous emergency dispatch engine and LangGraph medical triage agent. Processed 600 vitals/min with zero lost dispatches across 2,584 CI tests.",
    metrics: [
      "299 REST endpoints & 86 SQL tables",
      "2,584 passing tests in continuous integration",
      "600 events/min continuous vitals ingestion per user",
      "9-state OCC escalation engine with 0 duplicate dispatches",
    ],
    summary: "High-scale emergency response ecosystem uniting wearable physiological telemetry (Heart Rate, SpO2, HRV) from Apple HealthKit, Health Connect, and BLE with an autonomous emergency dispatch engine and LangGraph medical triage agent.",
    architecturePoints: [
      "Dual FastAPI microservice topology: Platform service (:8000) for auth, dispatch, circles, and state machines; DRQ service (:8001) for high-throughput telematics ingestion and rolling baselines.",
      "Formally verified 9-state incident escalation state machine with a PostgreSQL partial unique index guaranteeing exactly one active incident per user.",
      "5-stage LangGraph medical triage agent combining hybrid BM25 and dense pgvector retrieval governed by a deterministic bilingual (English/Hindi) safety rulebook.",
      "Constant-time HMAC internal gateway authentication, rotating refresh JWT tokens, and role-authorized WebSocket broadcast topics.",
    ],
    failureModes: [
      "Hardware Sensor Jitter: Handled via 14-day rolling Gaussian baseline deviations and signal debouncing before triggering incident escalation.",
      "Network Partitions & Duplicate Retries: Guaranteed idempotent incident creation via unique constraint deduplication on source telemetry sample IDs.",
      "Double Dispatches: Enforced via PostgreSQL row-level locks and partial unique indices on active incident statuses.",
    ],
    image: IMG("1518770660439-4636190af475", 900),
  },
  {
    id: "temporal-pcap",
    title: "Temporal PCAP Ledger",
    subtitle: "Append-Only Immutable State Machine & Capital Call Engine",
    category: "Full-Stack & Systems",
    status: "Production Architecture",
    role: "Lead Systems Architect",
    timeline: "2026",
    year: "2026",
    githubUrl: "https://github.com/WisKeyOp",
    technologies: ["Python", "FastAPI", "PostgreSQL OCC", "Docker", "pgvector"],
    tags: ["Temporal Ledger", "OCC", "Financial Engine", "FastAPI"],
    meta: "Deterministic capital-call financial ledger using append-only immutable records, optimistic concurrency control (OCC), and automated zero-leakage state reconstruction at any historical timestamp (t).",
    metrics: [
      "100% immutable append-only transaction log",
      "Zero silent lost updates via OCC version fencing",
      "State reconstruction at any point in time (t)",
      "Automated compensating entries for corrections",
    ],
    summary: "Financial ledger architecture engineered under strict zero-mutation invariants: balances are never stored without source entries, and all corrections are compensating records.",
    architecturePoints: [
      "Optimistic Concurrency Control (OCC) version fencing rejecting stale updates.",
      "Temporal query replay engine reconstructing ledger state at any point in time.",
      "Compensating transaction pipeline guaranteeing zero destructive updates.",
    ],
    failureModes: [
      "Concurrent Double Spend: Blocked via version check in WHERE clause.",
      "Late-Arriving Reconciliation: Handled through deterministic monotonic timestamp replay.",
    ],
    image: IMG("1551288049-bebda4e38f71", 900),
  },
  {
    id: "bitaid",
    title: "BITAID Voice Clinical AI",
    subtitle: "Voice-First Autonomous AI Medical Consultation Assistant",
    category: "AI & LangGraph",
    status: "Active Open-Source",
    role: "Core Creator & Architect",
    timeline: "2025 – 2026",
    year: "2026",
    githubUrl: "https://github.com/WisKeyOp/BITAID",
    technologies: ["Next.js 15", "Neon PostgreSQL", "pgvector", "Drizzle ORM", "Gemini 2.0 Flash", "Vapi AI", "ElevenLabs", "Clerk"],
    tags: ["LangGraph AI", "Voice STT/TTS", "pgvector", "Next.js 15"],
    meta: "Voice-driven clinical assistant featuring real-time conversational STT/TTS, autonomous LLM tool-calling for clinical guidelines, and automated extraction of longitudinal family health histories with zero-hallucination paediatric safety floor.",
    metrics: [
      "18 drug-interaction classes verified",
      "Sub-2s voice latency turn-around",
      "Longitudinal medical memory across 100% of visits",
      "Zero-hallucination paediatric safety floor",
    ],
    summary: "Voice-driven clinical assistant featuring real-time conversational STT/TTS, autonomous LLM tool-calling for clinical guidelines, and automated extraction of longitudinal family health histories.",
    architecturePoints: [
      "Turn-based voice consultation pipeline integrating speech-to-text, Gemini 2.0 tool-calling execution loops, and ultra-low-latency voice synthesis.",
      "Three autonomous clinical tools: structured patient-history search, 18-class drug interaction cross-referencing, and age-tiered home-care triage protocols.",
      "Longitudinal medical memory: Post-consultation LLM extraction writes diagnosed conditions, allergies, and active medications into persistent family profile records injected into future sessions.",
    ],
    failureModes: [
      "Hallucinatory Medication Guidance: Addressed via a deterministic rulebook barrier intercepting tool execution if unverified pediatric contraindications exist.",
      "Voice Connection Dropouts: Audio buffer resume with session-state checkpoints in Neon PostgreSQL.",
      "Cross-Profile Memory Leakage: Strict cryptographic tenant and family profile isolation on every vector search query.",
    ],
    image: IMG("1677442136019-21780ecad995", 900),
  },
  {
    id: "mediconnect",
    title: "MediConnect Health Aggregator",
    subtitle: "Zero-Cost ($0/mo) Integrated Emergency Healthcare Aggregator",
    category: "Full-Stack & Systems",
    status: "Production Architecture",
    role: "Lead Systems Architect",
    timeline: "2024 – 2025",
    year: "2025",
    githubUrl: "https://github.com/WisKeyOp/MEDICONNECT",
    technologies: ["Next.js (Pages SSR)", "Firebase Firestore", "MongoDB", "Mongoose", "Leaflet.js", "Geoapify", "Tailwind CSS"],
    tags: ["Healthcare", "Zero-Cost Infra", "Leaflet.js", "MongoDB"],
    meta: "All-in-one emergency healthcare aggregator with real-time doctor-patient sync under 200ms, keyless map proxying, and hospital bed telemetry at $0/mo infrastructure cost.",
    metrics: [
      "$0/mo total hosting and infrastructure cost",
      "Real-time doctor-patient sync under 200ms",
      "100% keyless open-source map proxying",
      "Zero credential exposure in client bundles",
    ],
    summary: "All-in-one healthcare aggregator providing real-time doctor-patient consultations, nearby emergency hospital/bed tracking, pharmacy delivery, and medical record synchronization at zero monthly infrastructure cost.",
    architecturePoints: [
      "Zero-cost architectural design leveraging free-tier serverless services (Vercel, MongoDB Atlas, Firebase Firestore free quota) without breaking production guarantees.",
      "Real-time bidirectional consultation chat powered by Firestore onSnapshot reactive listeners and arrayUnion atomic writes instead of dedicated WebSocket servers.",
      "Keyless geospatial map rendering using Leaflet.js and a backend-proxied Geoapify integration preventing API credential leakages.",
    ],
    failureModes: [
      "Database Quota Exhaustion: Mitigated by local state caching and debounced Firestore snapshot listener bindings.",
      "Out-of-Order Message Sequences: Enforced server-generated monotonic timestamps and client reconciliation sort keys.",
    ],
    image: IMG("1576091160399-112ba8d25d1d", 900),
  },
  {
    id: "knowledge-bridge",
    title: "Knowledge-Bridge RAG",
    subtitle: "RAG-Powered Lecture Intelligence Platform",
    category: "AI & LangGraph",
    status: "Completed",
    role: "Full-Stack & AI Engineer",
    timeline: "2025",
    year: "2025",
    githubUrl: "https://github.com/WisKeyOp/Knowledge-Bridge",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Gemini Embeddings", "Razorpay HMAC", "Cloudinary"],
    tags: ["RAG Intelligence", "Embeddings", "Node.js", "HMAC SHA-256"],
    meta: "Full-stack educational platform with an integrated retrieval-augmented generation study assistant that parses timestamped lecture transcripts to cite exact video timestamps for student questions.",
    metrics: [
      "Top-4 semantic cosine similarity retrieval",
      "Constant-time HMAC-SHA256 payment verification",
      "40+ REST API endpoints with RBAC",
      "Idempotent $addToSet student enrollment",
    ],
    summary: "Full-stack educational platform with an integrated retrieval-augmented generation study assistant that parses timestamped lecture transcripts to cite exact video timestamps for student questions.",
    architecturePoints: [
      "Timestamped lecture transcript ingestion pipeline chunking video dialogues and indexing embeddings via Gemini for semantic search.",
      "Enforces tenant enrollment boundaries: vector search rejects queries unless the user's active course ownership is verified.",
      "Cryptographically hardened payment flow using Razorpay webhooks, constant-time HMAC-SHA256 signature verification, and idempotent enrollment operations.",
    ],
    failureModes: [
      "Payment Webhook Replays: Prevented by checking previous order settlement state in MongoDB before initiating fulfillment.",
      "Tenant Course Isolation: Guaranteed through User.findOne({ _id: userId, courses: courseId }) guards on all semantic retrieval paths.",
    ],
    image: IMG("1498050108023-c5249f4df085", 900),
  },
  {
    id: "rapaid",
    title: "RapAid Offline Mesh",
    subtitle: "Offline-First Mobile Disaster Coordination & Emergency Mesh",
    category: "Safety-Critical & IoT",
    status: "Prototype",
    role: "Systems Architect & Developer",
    timeline: "2024",
    year: "2024",
    githubUrl: "https://github.com/WisKeyOp/RapAid",
    technologies: ["Vite", "React", "Tailwind CSS", "Leaflet.js", "ServiceWorker", "IndexedDB"],
    tags: ["Offline-First", "Disaster Mesh", "IndexedDB", "ServiceWorker"],
    meta: "Low-bandwidth disaster coordination progressive web application enabling rescue teams and citizens to broadcast rescue requests and resource needs even during total cellular backhaul disruptions.",
    metrics: [
      "100% offline-capable incident capture",
      "Sub-50ms local render from IndexedDB",
      "Automatic background sync when connectivity resumes",
    ],
    summary: "Low-bandwidth disaster coordination progressive web application enabling rescue teams and citizens to broadcast rescue requests and resource needs even during total cellular backhaul disruptions.",
    architecturePoints: [
      "Offline-first ServiceWorker caching architecture backed by IndexedDB local transactional storage.",
      "Queue-and-reconcile synchronization worker that uploads queued telemetry packets upon network reconnection.",
      "Lightweight SVG and canvas-based map rendering optimizing memory usage on low-end mobile devices.",
    ],
    failureModes: [
      "Sudden Connection Drops: All dispatches write to IndexedDB first with a pending-sync marker before dispatching network requests.",
      "Stale Geo-Coordinates: Visual indicators denoting age of cached position reports.",
    ],
    image: IMG("1451187580459-43490279c0fa", 900),
  },
];

export const toolGroups = [
  {
    label: "Languages",
    items: [
      { name: "Python", icon: "python", brand: "#3776AB" },
      { name: "TypeScript", icon: "typescript", brand: "#3178C6" },
      { name: "JavaScript", icon: "javascript", brand: "#F7DF1E" },
      { name: "C++", icon: "cplusplus", brand: "#00599C" },
      { name: "C", icon: "c", brand: "#A8B9CC" },
      { name: "Java", icon: "java", brand: "#ED8B00" },
      { name: "SQL", icon: "postgresql", brand: "#4169E1" },
      { name: "Swift", icon: "swift", brand: "#F05138" },
    ],
  },
  {
    label: "AI, Agents & Vector",
    items: [
      { name: "LangGraph", icon: "langgraph", brand: "#E0234E" },
      { name: "LangChain", icon: "langchain", brand: "#10B981" },
      { name: "Model Context Protocol", icon: "mcp", brand: "#6E56CF" },
      { name: "RAG Architecture", icon: "rag", brand: "#10B981" },
      { name: "pgvector", icon: "postgresql", brand: "#4169E1" },
      { name: "Gemini 2.0 API", icon: "googlegemini", brand: "#8E75B2" },
      { name: "Claude Vision", icon: "claude", brand: "#D97706" },
      { name: "Semantic Chunking", icon: "chunking", brand: "#8B5CF6" },
    ],
  },
  {
    label: "Backend & Systems",
    items: [
      { name: "FastAPI", icon: "fastapi", brand: "#009688" },
      { name: "Node.js", icon: "nodejs", brand: "#5FA04E" },
      { name: "Express.js", icon: "express", brand: "#0B0B0B" },
      { name: "Redis", icon: "redis", brand: "#FF4438" },
      { name: "Docker", icon: "docker", brand: "#2496ED" },
      { name: "WebSockets", icon: "websocket", brand: "#38BDF8" },
      { name: "Azure APIM", icon: "azure", brand: "#0078D4" },
      { name: "OAuth 2.0 / OIDC", icon: "openid", brand: "#F78C40" },
    ],
  },
  {
    label: "Databases & Storage",
    items: [
      { name: "PostgreSQL", icon: "postgresql", brand: "#4169E1" },
      { name: "Neon Serverless", icon: "neon", brand: "#00E599" },
      { name: "MongoDB", icon: "mongodb", brand: "#47A248" },
      { name: "Redis Caching", icon: "redis", brand: "#FF4438" },
      { name: "SQLAlchemy", icon: "sqlalchemy", brand: "#D71F00" },
      { name: "Drizzle ORM", icon: "drizzle", brand: "#C5F74F" },
    ],
  },
  {
    label: "Frontend & Mobile",
    items: [
      { name: "Next.js", icon: "nextjs", brand: "#0B0B0B" },
      { name: "React 19", icon: "react", brand: "#61DAFB" },
      { name: "TypeScript", icon: "typescript", brand: "#3178C6" },
      { name: "Tailwind CSS", icon: "tailwindcss", brand: "#06B6D4" },
      { name: "React Native (Expo)", icon: "expo", brand: "#4630EB" },
      { name: "Swift (watchOS)", icon: "swift", brand: "#F05138" },
    ],
  },
];

export const EDUCATION_DATA: Education = {
  institution: "Birla Institute of Technology, Mesra, Ranchi",
  degree: "Bachelor of Technology in Computer Science & Engineering",
  timeline: "2022 – 2026",
  location: "Ranchi, Jharkhand, India",
  grade: "8.03 / 10 CGPA",
  highlights: [
    "Specialization in Distributed Systems, Operating Systems, Algorithm Analysis, and Database Management.",
    "Competitive programming lead; mentored junior students in data structures and algorithmic complexity.",
  ],
};

export const COMPETITIVE_STATS: CompetitiveStat[] = [
  {
    platform: "LeetCode",
    handle: "ecarte",
    rating: "1,899",
    rank: "Knight",
    url: "https://leetcode.com/u/ecarte/",
    percentile: "Top 4.67%",
    badge: "Knight (334+ Solved)",
  },
  {
    platform: "Codeforces",
    handle: "nobitalovesshizuka",
    rating: "1,649",
    rank: "Expert",
    url: "https://codeforces.com/profile/nobitalovesshizuka",
    percentile: "Div. 2 Specialist/Expert",
    badge: "Expert (29 Contests)",
  },
];

export const HONORS = [
  {
    title: "Adobe India Hackathon Semifinalist",
    organization: "Adobe India",
    year: "2025",
    description: "Ranked among the top 4,000 teams nationwide out of 260,000+ participating engineering students.",
  },
  {
    title: "Tata Imagination Challenge Semifinalist",
    organization: "Tata Group",
    year: "2024",
    description: "National-level flagship entrepreneurial idea and technology challenge evaluating architectural feasibility and social impact.",
  },
];

export const SKILL_CATEGORIES = [
  {
    category: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "C++", "Java", "SQL", "Swift"],
  },
  {
    category: "AI & Agentic Systems",
    skills: ["LangGraph", "LangChain", "Model Context Protocol (MCP)", "RAG", "pgvector", "Gemini 2.0 API", "Claude Vision", "Semantic Chunking"],
  },
  {
    category: "Backend & Systems",
    skills: ["FastAPI", "Node.js", "Express.js", "WebSockets", "Optimistic Concurrency Control", "Redis", "Docker", "Azure APIM", "OAuth 2.0/OIDC"],
  },
  {
    category: "Databases & Storage",
    skills: ["PostgreSQL", "Neon Serverless", "MongoDB", "SQLAlchemy", "Drizzle ORM", "Redis Caching", "Cloudinary"],
  },
  {
    category: "Frontend & Mobile",
    skills: ["Next.js (App & Pages Router)", "React 19", "React Native (Expo)", "Swift (watchOS)", "Tailwind CSS", "Redux Toolkit"],
  },
];
