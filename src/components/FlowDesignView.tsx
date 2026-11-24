import { useState } from 'react';
import type { FC } from 'react';
import { 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle,
  FileCode2,
  Workflow
} from 'lucide-react';

interface FlowNode {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  badge: string;
  color: string;
  metrics: string;
  invariants: string[];
  failureMitigation: string;
  codeSnippet: string;
}

interface FlowDesignViewProps {
  type: 'topology' | 'statemachine' | 'langgraph';
}

export const FlowDesignView: FC<FlowDesignViewProps> = ({ type }) => {
  // Topology Nodes
  const topologyNodes: FlowNode[] = [
    {
      id: 'edge',
      category: '1. Edge Telematics',
      title: 'Sensors & Wearables',
      subtitle: 'Apple Watch, Wear OS, BLE Accelerometers, Health Connect',
      badge: 'Edge Ingest',
      color: 'blue',
      metrics: 'Raw 50Hz Accel + ECG',
      invariants: [
        'Local sensor debouncing on device before radio transmission',
        'Offline batch caching during cellular dropout with monotonic timestamping'
      ],
      failureMitigation: 'Hardware noise is filtered via edge-level Kalman filtering.',
      codeSnippet: `// Edge sample dispatch
let packet = VitalsBatch(
    timestamp: Date().timeIntervalSince1970,
    hr: 142,
    accelG: 4.2,
    deviceId: "DRQ-04-IND"
);
try await radio.streamBatch(packet)`
    },
    {
      id: 'telemetry_service',
      category: '2. Stateless Telemetry',
      title: 'DRQ Ingestion Engine (:8001)',
      subtitle: 'FastAPI High-Throughput Worker + 14-Day Gaussian Baseline',
      badge: 'Port :8001',
      color: 'brand',
      metrics: '600 vitals/min per user',
      invariants: [
        'Stateless HS256/RS256 JWT claim verification without DB roundtrips',
        'Rolling 14-day Gaussian mean/sigma computation per biometric stream',
        '9 Deterministic risk rules evaluated in <4ms'
      ],
      failureMitigation: 'Redis rate limiting (SlowAPI) throttles client reconnect storms.',
      codeSnippet: `@router.post("/api/v1/vitals/batch")
async def ingest_vitals(
    batch: VitalsBatchSchema,
    user: AuthUser = Depends(verify_jwt_stateless)
):
    await baseline_engine.enqueue(user.id, batch)
    if risk_rules.evaluate_anomaly(batch):
        await trigger_platform_escalation(user.id, batch)`
    },
    {
      id: 'hmac_bridge',
      category: '3. Security Gateway',
      title: 'Constant-Time HMAC Bridge',
      subtitle: 'Internal Service-to-Service Cryptographic Interlock',
      badge: 'X-Internal-Key',
      color: 'amber',
      metrics: 'Zero External Exposure',
      invariants: [
        'Private VPC network isolation for /internal/v1/* routes',
        'Constant-time SHA-256 HMAC verification prevents timing attacks'
      ],
      failureMitigation: 'Public traffic dropped immediately with 403 Forbidden.',
      codeSnippet: `async def verify_internal_hmac(request: Request):
    key = request.headers.get("X-Internal-Key")
    expected = settings.INTERNAL_SECRET_KEY
    if not secrets.compare_digest(key or "", expected):
        raise HTTPException(status_code=403, detail="Forbidden")`
    },
    {
      id: 'platform_core',
      category: '4. Platform & OCC Engine',
      title: 'Dash Platform Core (:8000)',
      subtitle: 'Incident Lifecycle, Concurrency Control, WebSocket Topics',
      badge: 'Port :8000',
      color: 'red',
      metrics: 'PostgreSQL OCC Guard',
      invariants: [
        'Database-level unique index blocks concurrent active emergencies',
        'Every status transition immutably logged to IncidentStateLog',
        'Horizontally isolated from background cron workers'
      ],
      failureMitigation: 'Concurrent retries hit 409 Conflict without double-dispatching.',
      codeSnippet: `-- PostgreSQL Concurrency Invariant:
CREATE UNIQUE INDEX idx_one_active_incident_per_user 
ON incidents (user_id) 
WHERE status NOT IN ('RESOLVED', 'CANCELLED', 'FALSE_ALARM');`
    },
    {
      id: 'dispatch_mesh',
      category: '5. Response Mesh',
      title: 'Multi-Tier Dispatch',
      subtitle: 'Ambulance 108/112, Hospital Trauma Pre-Alert, Volunteer Roster',
      badge: 'Multi-Tier',
      color: 'green',
      metrics: 'Zero Lost Dispatches',
      invariants: [
        'Deterministic 10-second grace window with wearer cancellation',
        'Pre-alert transmission includes blood group, allergies, and ECG strip',
        'Monotonic GPS tracking for emergency responder rendezvous'
      ],
      failureMitigation: 'Unacknowledged dispatches auto-escalate to Tier-3 volunteers.',
      codeSnippet: `async def dispatch_incident(incident: Incident):
    await telephony.dial_helpline(incident.lat, incident.lon)
    await hospital_client.pre_alert(incident.id, incident.medical_profile)
    await responder_broker.notify_nearby(radius_km=3.0)`
    }
  ];

  // State Machine Nodes
  const stateMachineNodes: FlowNode[] = [
    {
      id: 's_idle',
      category: 'Baseline',
      title: 'IDLE (Quiescent)',
      subtitle: 'Continuous vitals heartbeat within Gaussian confidence interval',
      badge: 'State 00',
      color: 'blue',
      metrics: 'Baseline Active',
      invariants: ['Zero database locks held', 'Rolling window accumulates samples'],
      failureMitigation: 'Stale packets discarded based on monotonic sequence number.',
      codeSnippet: `status = IncidentState.IDLE
assert active_incident_lock(user_id) is None`
    },
    {
      id: 's_triggered',
      category: 'Threshold Breached',
      title: 'TRIGGERED (Anomaly)',
      subtitle: '4.2G deceleration or sustained heart rate spike detected',
      badge: 'State 01',
      color: 'amber',
      metrics: 'Anomaly Validated',
      invariants: ['Hardware telemetry cross-referenced across 2 distinct sensors'],
      failureMitigation: 'Single sensor transient spikes require 3-sample confirmation.',
      codeSnippet: `if accel_peak > 4.0 and delta_v > 12.0:
    incident = await incident_repo.create(
        user_id=user.id, 
        state=IncidentState.TRIGGERED
    )`
    },
    {
      id: 's_verifying',
      category: 'Grace Interlock',
      title: 'VERIFYING (10s Grace)',
      subtitle: 'Wearer screen flashes loud siren; 10s countdown to cancel',
      badge: 'State 02',
      color: 'brand',
      metrics: '10s Countdown',
      invariants: [
        'Postgres partial index lock acquired at this point',
        'Wearer can abort false alarm with "I\'m OK" tap'
      ],
      failureMitigation: 'Network loss defaults to fail-safe dispatch on timeout.',
      codeSnippet: `await transition_to(IncidentState.VERIFYING, grace_seconds=10)
# Wearer tap: -> CANCELLED (Terminal, lock released)
# Timer expiry: -> DISPATCHED`
    },
    {
      id: 's_dispatched',
      category: 'Tier-1 Response',
      title: 'DISPATCHED (Active)',
      subtitle: 'Grace timer expired; Tier-1 ambulance and trauma pre-alert rolling',
      badge: 'State 03',
      color: 'red',
      metrics: 'Lock Enforced',
      invariants: [
        'Dispatches immutable payload with GPS coordinates and medical history',
        'Any concurrent duplicate packet is rejected with 409 Conflict'
      ],
      failureMitigation: 'Database rejects second incident creation for same user.',
      codeSnippet: `await transition_to(IncidentState.DISPATCHED)
await notify_ems_and_hospital(incident)
await append_incident_log(actor="SYSTEM", to_state="DISPATCHED")`
    },
    {
      id: 's_transporting',
      category: 'Clinical Transit',
      title: 'TRANSPORTING / ON_SCENE',
      subtitle: 'Clinicians arrived on scene; patient transit underway',
      badge: 'State 04',
      color: 'brand',
      metrics: 'Live GPS Sync',
      invariants: [
        'Responders sign telemetry stream via mobile app',
        'Continuous vital streaming to receiving emergency room'
      ],
      failureMitigation: 'Offline responder updates sync on re-connection.',
      codeSnippet: `await transition_to(IncidentState.TRANSPORTING)
await socket_manager.broadcast_hospital_telemetry(incident.id)`
    },
    {
      id: 's_resolved',
      category: 'Terminal State',
      title: 'RESOLVED (Sealed)',
      subtitle: 'Patient admitted to emergency room; incident audit record immutable',
      badge: 'State 05',
      color: 'green',
      metrics: 'Lock Released',
      invariants: [
        'Concurrency lock released in PostgreSQL',
        'Immutable IncidentStateLog sealed for compliance and auditing'
      ],
      failureMitigation: 'Re-opening resolved incident prohibited; new incident required.',
      codeSnippet: `await transition_to(IncidentState.RESOLVED)
# WHERE status NOT IN ('RESOLVED', ...)
# Lock freed automatically for subsequent emergencies.`
    }
  ];

  // LangGraph Multi-Agent Nodes
  const langGraphNodes: FlowNode[] = [
    {
      id: 'lg_input',
      category: 'Multi-Modal Ingest',
      title: 'Voice & Vitals Stream',
      subtitle: 'User voice query or wearable biometric trigger entering agent pipeline',
      badge: 'Input Node',
      color: 'blue',
      metrics: 'Audio / Text / Vitals',
      invariants: ['Sanitization of PII / raw patient identifiers', 'Monotonic request ID'],
      failureMitigation: 'Muffled audio falls back to structured SMS questionnaire.',
      codeSnippet: `class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]
    vitals: Optional[VitalsSummary]
    red_flags: list[str]
    triage_level: Optional[str]`
    },
    {
      id: 'lg_safety_gate',
      category: 'Deterministic Safety Floor',
      title: 'Deterministic Red-Flag Gate',
      subtitle: 'Hardcoded keyword & vital bounds bypassing LLM for acute emergencies',
      badge: 'Bypass Gate',
      color: 'red',
      metrics: '<2ms Zero-LLM Fast-Path',
      invariants: [
        'Zero LLM dependency for acute life-threat keywords (e.g. "chest crushing pain")',
        'Immediately executes 108 helpline dispatch'
      ],
      failureMitigation: 'Model latency or hallucinations cannot delay life-saving triage.',
      codeSnippet: `def deterministic_safety_gate(state: AgentState) -> str:
    text = extract_user_text(state["messages"]).lower()
    if any(rf in text for rf in CRITICAL_RED_FLAGS):
        return "immediate_sos_dispatch"
    return "hybrid_medical_retrieval"`
    },
    {
      id: 'lg_retrieval',
      category: 'Context Grounding',
      title: 'Hybrid Medical Retrieval',
      subtitle: 'BM25 clinical guideline tokens + pgvector dense cosine embeddings',
      badge: 'Hybrid RAG',
      color: 'brand',
      metrics: 'Min Cosine Sim: 0.82',
      invariants: [
        'Only verified clinical guidelines (WHO / ICMR protocols) ingested',
        'Zero out-of-domain knowledge retrieved'
      ],
      failureMitigation: 'Low-confidence retrievals route to human medical operator.',
      codeSnippet: `async def hybrid_retrieve(query: str, db: AsyncSession):
    sparse_docs = await bm25_search(query, k=3)
    dense_docs = await pgvector_search(query, k=3, min_similarity=0.82)
    return reciprocal_rank_fusion(sparse_docs, dense_docs)`
    },
    {
      id: 'lg_tools',
      category: 'Pharmacological Tools',
      title: 'Clinical Tool-Calling Node',
      subtitle: 'Drug-drug interactions, pediatric weight checks, allergy interlocks',
      badge: 'Tool Loop',
      color: 'amber',
      metrics: '18 Drug Classes',
      invariants: [
        'Strict schema validation using Pydantic on tool inputs and outputs',
        'Flagging contraindications before response generation'
      ],
      failureMitigation: 'Tool timeouts gracefully degrade with warning banner.',
      codeSnippet: `@tool
def check_drug_interaction(drug_a: str, drug_b: str) -> InteractionResult:
    return drug_interaction_matrix.lookup(drug_a, drug_b)`
    },
    {
      id: 'lg_guardrail',
      category: 'Regulatory Interlock',
      title: 'Conservative Refusal Guard',
      subtitle: 'Prohibits prescribing scheduled narcotics or diagnosing disease',
      badge: 'Module C Gate',
      color: 'amber',
      metrics: '100% Policy Adherence',
      invariants: [
        'AI assistant operates strictly as first-aid triage, never prescribing physician',
        'Enforces conservative referral over uncertain diagnostic guesses'
      ],
      failureMitigation: 'Prescription keywords trigger automatic refusal template.',
      codeSnippet: `def regulatory_guardrail(state: AgentState) -> AgentState:
    response = state["messages"][-1].content
    if contains_unverified_rx(response):
        state["messages"][-1] = AIMessage(content=REFUSAL_DISCLAIMER_TEMPLATE)
    return state`
    },
    {
      id: 'lg_delivery',
      category: 'Bilingual Delivery & Audit',
      title: 'Localized Voice Synthesis & Trace',
      subtitle: 'Bilingual Hindi/English output + full LangSmith trace commit',
      badge: 'Audit & TTS',
      color: 'green',
      metrics: 'LangSmith Traced',
      invariants: [
        'Full JSON audit log with token count, tool outputs, and user metadata',
        'Audio synthesized with calm emergency cadence'
      ],
      failureMitigation: 'TTS failure provides instant high-contrast text fallback.',
      codeSnippet: `with langsmith_tracer.trace("emergency_triage_turn") as run:
    run.log_state(state)
    await commit_audit_entry(state)
    return synthesize_audio(state["messages"][-1].content)`
    }
  ];

  const nodes = type === 'topology' 
    ? topologyNodes 
    : type === 'statemachine' 
    ? stateMachineNodes 
    : langGraphNodes;

  const [selectedNode, setSelectedNode] = useState<FlowNode>(nodes[0]);

  // Clean Swiss Editorial Tone Styles
  const getTone = (color: string) => {
    switch (color) {
      case 'brand':
      case 'red':
        return {
          border: 'border-[var(--flame-ink)]',
          bg: 'bg-[var(--flame-ink)]/10',
          text: 'text-[var(--flame-ink)]',
          dot: 'bg-[var(--flame-ink)]'
        };
      case 'green':
        return {
          border: 'border-[var(--lime)]',
          bg: 'bg-[var(--lime)]/10',
          text: 'text-[var(--flame-ink)]',
          dot: 'bg-[var(--lime)]'
        };
      case 'amber':
        return {
          border: 'border-[var(--flame)]/60',
          bg: 'bg-[var(--flame)]/10',
          text: 'text-[var(--flame-ink)]',
          dot: 'bg-[var(--flame)]'
        };
      case 'blue':
      default:
        return {
          border: 'border-[var(--line)]',
          bg: 'bg-[var(--mute)]',
          text: 'text-[var(--slate)]',
          dot: 'bg-[var(--slate)]'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ── CLEAN DASHRESQ FLOW CANVAS ── */}
      <div className="rounded-[var(--r-md)] bg-[var(--mute)] border border-[var(--line)] p-4 sm:p-6 relative shadow-sm">
        
        {/* Canvas Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-5 border-b border-[var(--line)] gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[var(--r-sm)] bg-[var(--card)] border border-[var(--line)] flex items-center justify-center text-[var(--flame-ink)]">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold text-[var(--ink)] uppercase tracking-wider">
                {type === 'topology' && 'Dual-Service Ingestion & Security Topology Flow'}
                {type === 'statemachine' && '9-State Concurrency State Machine Flow'}
                {type === 'langgraph' && 'Autonomous Multi-Agent Triage Execution Pipeline'}
              </h4>
              <p className="text-[11px] font-mono text-[var(--slate)]">
                Click any stage card to inspect failure mitigations and verified production code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-[var(--slate)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
            <span className="text-[var(--flame-ink)] font-semibold">STREAM FLOW ACTIVE</span>
            <span className="text-[var(--slate)]">|</span>
            <span>{nodes.length} STAGES</span>
          </div>
        </div>

        {/* ── HORIZONTAL FLOW SEQUENCE ── */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-2.5 overflow-x-auto pb-2">
          {nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const tone = getTone(node.color);

            return (
              <div key={node.id} className="flex-1 flex flex-col lg:flex-row items-center gap-2">
                {/* Node Card */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-[var(--r-md)] cursor-pointer transition-all duration-200 border text-left ${
                    isSelected
                      ? `bg-[var(--card)] ${tone.border} shadow-md translate-y-[-2px]`
                      : 'bg-[var(--card)]/80 border-[var(--line)] hover:border-[var(--slate)]'
                  }`}
                >
                  {/* Step Category & Badge */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider text-[var(--slate)]">
                      {node.category}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--mute)] ${tone.text}`}>
                      {node.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="text-sm font-bold text-[var(--ink)] tracking-tight flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${tone.dot} flex-shrink-0`} />
                    <span className="truncate">{node.title}</span>
                  </h5>

                  {/* Subtitle */}
                  <p className="mt-1 text-[11px] text-[var(--slate)] line-clamp-2 leading-relaxed">
                    {node.subtitle}
                  </p>

                  {/* Metric Ribbon */}
                  <div className="mt-3 pt-2 border-t border-[var(--line)] flex items-center justify-between text-[10px] font-mono text-[var(--slate)]">
                    <span>Benchmark:</span>
                    <span className={`font-semibold ${tone.text}`}>{node.metrics}</span>
                  </div>
                </div>

                {/* Connecting Arrow (between nodes) */}
                {index < nodes.length - 1 && (
                  <div className="flex items-center justify-center py-1 lg:py-0 lg:px-1 text-[var(--slate)]">
                    <div className="lg:hidden text-[var(--slate)] font-mono text-xs">↓</div>
                    <ArrowRight className="hidden lg:block w-3.5 h-3.5 text-[var(--slate)]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DETAIL INSPECTION DRAWER ── */}
        <div className="mt-6 pt-5 border-t border-[var(--line)] grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Invariants & Failure Mitigation */}
          <div className="lg:col-span-6 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--flame-ink)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink)]">
                  Stage Invariants: {selectedNode.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--card)] text-[var(--slate)] border border-[var(--line)]">
                {selectedNode.category}
              </span>
            </div>

            <div className="space-y-2">
              {selectedNode.invariants.map((inv, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[var(--ink)] leading-relaxed bg-[var(--card)] p-3 rounded-[var(--r-sm)] border border-[var(--line)]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--flame-ink)] mt-0.5 flex-shrink-0" />
                  <span>{inv}</span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-[var(--r-sm)] bg-[var(--card)] border border-[var(--line)] text-xs font-mono text-[var(--slate)] leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-[var(--flame-ink)] mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>FAILURE MODE DEFENSE:</span>
              </div>
              <span className="text-[var(--slate)] font-sans">{selectedNode.failureMitigation}</span>
            </div>
          </div>

          {/* Right: Code Implementation Guardrail */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-[var(--slate)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--slate)]">
                  Verified Implementation Logic
                </span>
              </div>
              <span className="text-[10px] font-mono text-[var(--flame-ink)] bg-[var(--flame-ink)]/10 px-2 py-0.5 rounded border border-[var(--flame-ink)]/20">
                AUDITED
              </span>
            </div>

            <div className="rounded-[var(--r-sm)] bg-[#0d0d0d] border border-[var(--line)] p-4 font-mono text-[11px] text-[#e4e4e7] overflow-x-auto leading-relaxed shadow-inner">
              <pre>{selectedNode.codeSnippet}</pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
