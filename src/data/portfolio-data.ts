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
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  timeline: string;
  type: string;
  achievements: string[];
  techStack: string[];
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

export const PERSONAL_INFO = {
  name: "Aayush Shukla",
  title: "Lead Systems Architect & AI Infrastructure Engineer",
  tagline: "Building fault-tolerant distributed backends, LangGraph multi-agent systems, and safety-critical telemetry pipelines.",
  email: "aayush.shukla1211@gmail.com",
  phone: "+91-8787021382",
  location: "Pune / Ranchi, India",
  github: "https://github.com/WisKeyOp",
  linkedin: "https://www.linkedin.com/in/aayush-shukla-a13752383",
  leetcode: "https://leetcode.com/u/ecarte",
  codeforces: "https://codeforces.com/profile/nobitalovesshizuka",
  resumeUrl: "/Aayush_Shukla_Resume.pdf",
  bio: "Lead Systems Architect and Failure-Mode Analyst. Specialized in Optimistic Concurrency Control (OCC), high-throughput IoT telemetry ingestion, and enterprise LangGraph multi-agent systems. Currently an Associate Consultant in Generative AI & AI Infrastructure at EY; Founding Systems Architect behind DashResQ's 299-endpoint distributed ecosystem.",
};

export const CORE_METRICS = [
  { label: "Passing Tests (CI)", value: "2,584+", subtext: "100% green safety suite" },
  { label: "Production Endpoints", value: "299", subtext: "Dual FastAPI backends" },
  { label: "LeetCode Rating", value: "1,899", subtext: "Knight (Top 4.67%)" },
  { label: "Codeforces Peak", value: "1,649", subtext: "Expert Rank" },
  { label: "Incident Escalation", value: "9-State", subtext: "0 duplicate dispatches" },
  { label: "RAG Prompt Overhead", value: "-30%", subtext: "Semantic chunking at EY" },
];

export const SYSTEM_AXIOMS = [
  {
    title: "Decision Priority Hierarchy",
    rule: "Correctness > Security > Auditability > Reliability > Performance > Convenience",
    description: "Never sacrifice a higher-priority property for a lower-priority one without stating the tradeoff explicitly.",
  },
  {
    title: "Optimistic Concurrency Control",
    rule: "Partial Unique Indexing & Zero Blind Retries",
    description: "State transitions in safety-critical domains must be strictly idempotent. A single active incident per user constraint eliminates race conditions and duplicate ambulance dispatches.",
  },
  {
    title: "Agentic Guardrail Verification",
    rule: "Verified Retrieval & Deterministic Safety Floors",
    description: "High-stakes AI must never rely on unverified model hallucination. LangGraph agents enforce hard deterministic constraints and bilingual medical triage rulebooks.",
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Ernst & Young (EY)",
    role: "Associate Consultant, Generative AI & AI Infrastructure",
    location: "Pune, India",
    timeline: "Aug 2026 – Present",
    type: "Full-Time",
    achievements: [
      "Architect and ship stateful multi-agent workflows in LangGraph/LangChain that automate enterprise data-processing pipelines with structured LLM extraction and human-in-the-loop review.",
      "Develop Model Context Protocol (MCP) tool servers fronted by Azure API Management with OAuth 2.0/OIDC authorization, per-client token rate limiting, and multi-tenant isolation.",
      "Optimize enterprise RAG pipelines to cut token overhead, reduce vector latency, and enforce grounded citations.",
    ],
    techStack: ["LangGraph", "LangChain", "MCP", "Azure APIM", "OAuth 2.0/OIDC", "Python", "RAG", "pgvector"],
  },
  {
    company: "Ernst & Young (EY)",
    role: "Generative AI Engineering Intern",
    location: "Pune, India",
    timeline: "Jan 2026 – Jul 2026",
    type: "Internship",
    achievements: [
      "Engineered enterprise Generative AI agents (Invoice Analyzer, PPT Generator, Fair Market Value Calculator, PCAP capital-call automation) with OCR ingestion, LLM reasoning, and human-in-the-loop review gates.",
      "Optimized a financial RAG pipeline using semantic chunking in place of arbitrary token splits, slashing prompt token overhead by ~30%.",
      "Implemented server-side token validation and secure inter-service boundaries across 3+ internal microservices.",
    ],
    techStack: ["Python", "Semantic Chunking", "OCR Vision", "FastAPI", "Prompt Engineering", "RAG"],
  },
  {
    company: "Veda AI",
    role: "Founding Software Engineer (Core Team)",
    location: "Remote",
    timeline: "Mar 2025 – Sep 2025",
    type: "Startup Incubation",
    achievements: [
      "Built the 0-to-1 core web platform (Next.js, Node.js, MongoDB), shipping 20+ production feature iterations with sub-100ms API response times.",
      "Engineered 15+ REST API endpoints with custom Express.js middleware for granular session management and role-based access control.",
    ],
    techStack: ["Next.js", "Node.js", "Express.js", "MongoDB", "RBAC", "TypeScript"],
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
    liveUrl: "https://www.dashresq.com",
    githubUrl: "https://github.com/WisKeyOp/DashResQ_monorepo",
    technologies: ["FastAPI", "Python 3.11", "PostgreSQL", "Redis", "pgvector", "Next.js 14", "Expo RN", "Swift watchOS", "Docker"],
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
  },
  {
    id: "bitaid",
    title: "BITAID",
    subtitle: "Voice-First Autonomous AI Medical Consultation Assistant",
    category: "AI & LangGraph",
    status: "Active Open-Source",
    role: "Core Creator & Architect",
    timeline: "2025 – 2026",
    githubUrl: "https://github.com/WisKeyOp/BITAID",
    technologies: ["Next.js 15", "Neon PostgreSQL", "pgvector", "Drizzle ORM", "Gemini 2.0 Flash", "Vapi AI", "ElevenLabs", "Clerk"],
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
  },
  {
    id: "mediconnect",
    title: "MediConnect",
    subtitle: "Zero-Cost ($0/mo) Integrated Emergency Healthcare Aggregator",
    category: "Full-Stack & Systems",
    status: "Production Architecture",
    role: "Lead Systems Architect",
    timeline: "2024 – 2025",
    githubUrl: "https://github.com/WisKeyOp/MEDICONNECT",
    technologies: ["Next.js (Pages SSR)", "Firebase Firestore", "MongoDB", "Mongoose", "Leaflet.js", "Geoapify", "Tailwind CSS"],
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
  },
  {
    id: "knowledge-bridge",
    title: "Knowledge-Bridge",
    subtitle: "RAG-Powered EdTech & Lecture Intelligence Platform",
    category: "AI & LangGraph",
    status: "Completed",
    role: "Full-Stack & AI Engineer",
    timeline: "2025",
    githubUrl: "https://github.com/WisKeyOp/Knowledge-Bridge",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB", "Gemini Embeddings", "Razorpay HMAC", "Cloudinary"],
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
  },
  {
    id: "rapaid",
    title: "RapAid",
    subtitle: "Offline-First Mobile Disaster Coordination & Emergency Mesh",
    category: "Safety-Critical & IoT",
    status: "Prototype",
    role: "Systems Architect & Developer",
    timeline: "2024",
    githubUrl: "https://github.com/WisKeyOp/RapAid",
    technologies: ["Vite", "React", "Tailwind CSS", "Leaflet.js", "ServiceWorker", "IndexedDB"],
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
  },
  {
    id: "career-connect",
    title: "Career-Connect",
    subtitle: "Role-Based High-Throughput Recruitment Portal",
    category: "Full-Stack & Systems",
    status: "Completed",
    role: "Full-Stack Developer",
    timeline: "2024",
    githubUrl: "https://github.com/WisKeyOp/Career-Connect",
    technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary CDN", "JWT Auth"],
    metrics: [
      "Isolated role dashboards (Employer vs Applicant)",
      "Streamlined resume parsing & media CDN pipeline",
      "Zero cross-role IDOR authorization leaks",
    ],
    summary: "Production-ready job board featuring strict role-based access control, applicant tracking pipelines, and Cloudinary-integrated resume parsing.",
    architecturePoints: [
      "Strict separation of candidate and employer capabilities via Express middleware role validators.",
      "Asynchronous resume upload pipeline streaming documents directly to secure Cloudinary buckets.",
    ],
    failureModes: [
      "IDOR Vulnerabilities: Candidate applications check authorization against both employer organization and applicant user ID.",
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

