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
  color: string; // 'indigo' | 'emerald' | 'amber' | 'rose' | 'purple' | 'cyan'
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
      color: 'cyan',
      metrics: 'Raw 50Hz Accel + ECG',
      invariants: [
        'Local sensor debouncing on device before radio transmission',
        'Offline batch caching during cellular dropout with monotonic timestamping'
      ],
      failureMitigation: 'Hardware noise is filtered via Kalman filtering on edge.',
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
      color: 'indigo',
      metrics: '600 vitals/min per user',
      invariants: [
        'Stateless HS256/RS256 JWT claim verification without DB hits',
        'Rolling 14-day Gaussian mean/sigma computation per biometric stream',
        '9 Deterministic risk rules evaluated in <4ms'
      ],
      failureMitigation: 'Redis rate limiting (SlowAPI) throttles client reconnect loops.',
      codeSnippet: `@router.post("/api/v1/vitals/batch")
async def ingest_vitals(
    batch: VitalsBatchSchema,
    user: AuthUser = Depends(verify_jwt_stateless)
):
    # Non-blocking async queue
    await baseline_engine.enqueue(user.id, batch)
    if risk_rules.evaluate_anomaly(batch):
        await trigger_platform_escalation(user.id, batch)`
    },
    {
      id: 'hmac_bridge',
      category: '3. Security Boundary',
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
      color: 'rose',
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
      color: 'emerald',
      metrics: 'Zero Lost Dispatches',
      invariants: [
        'Deterministic 10-second grace window with wearer cancellation',
        'Pre-alert transmission includes blood group, allergies, and ECG strip',
        'Monotonic GPS tracking for emergency responder rendezvous'
      ],
      failureMitigation: 'Unacknowledged dispatches auto-escalate to Tier-3 volunteers.',
      codeSnippet: `async def dispatch_incident(incident: Incident):
    # Tier 1: Emergency Helplines
    await telephony.dial_helpline(incident.lat, incident.lon)
    # Tier 2: Nearest Hospital Trauma Pre-Alert
    await hospital_client.pre_alert(incident.id, incident.medical_profile)
    # Tier 3: Push Notification Mesh
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
      badge: 'State: 00',
      color: 'cyan',
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
      badge: 'State: 01',
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
      badge: 'State: 02',
      color: 'indigo',
      metrics: '10s Countdown',
      invariants: [
        'Postgres partial index lock acquired at this point',
        'Wearer can abort false alarm with "I\'m OK" tap'
      ],
      failureMitigation: 'Network loss defaults to fail-safe dispatch on timeout.',
      codeSnippet: `await transition_to(
    IncidentState.VERIFYING, 
    grace_seconds=10
)
# If wearer taps "I'm OK":
#   -> CANCELLED (Terminal, lock released)
# If timer expires:
#   -> DISPATCHED`
    },
    {
      id: 's_dispatched',
      category: 'Tier-1 Response',
      title: 'DISPATCHED (Active)',
      subtitle: 'Grace timer expired; Tier-1 ambulance and trauma pre-alert rolling',
      badge: 'State: 03',
      color: 'rose',
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
      badge: 'State: 04',
      color: 'purple',
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
      badge: 'State: 05',
      color: 'emerald',
      metrics: 'Lock Released',
      invariants: [
        'Concurrency lock released in PostgreSQL',
        'Immutable IncidentStateLog sealed for compliance and auditing'
      ],
      failureMitigation: 'Re-opening resolved incident prohibited; new incident required.',
      codeSnippet: `await transition_to(IncidentState.RESOLVED)
# Partial index filter: WHERE status NOT IN ('RESOLVED', ...)
# Lock automatically freed for subsequent emergencies.`
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
      color: 'cyan',
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
      color: 'rose',
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
      color: 'indigo',
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
      color: 'purple',
      metrics: '18 Drug Classes',
      invariants: [
        'Strict schema validation using Pydantic on tool inputs and outputs',
        'Flagging contraindications before response generation'
      ],
      failureMitigation: 'Tool timeouts gracefully degrade with warning banner.',
      codeSnippet: `@tool
def check_drug_interaction(drug_a: str, drug_b: str) -> InteractionResult:
    """Verifies potential adverse reactions between pharmacological substances."""
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
        state["messages"][-1] = AIMessage(
            content=REFUSAL_DISCLAIMER_TEMPLATE
        )
    return state`
    },
    {
      id: 'lg_delivery',
      category: 'Bilingual Delivery & Audit',
      title: 'Localized Voice Synthesis & Trace',
      subtitle: 'Bilingual Hindi/English output + full LangSmith trace commit',
      badge: 'Audit & TTS',
      color: 'emerald',
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

  // Color mapping utilities
  const getColorStyles = (color: string) => {
    switch (color) {
      case 'cyan':
        return {
          border: 'border-cyan-500/40',
          bg: 'bg-cyan-500/10',
          text: 'text-cyan-400',
          ring: 'ring-cyan-500/30',
          dot: 'bg-cyan-400'
        };
      case 'indigo':
        return {
          border: 'border-indigo-500/40',
          bg: 'bg-indigo-500/10',
          text: 'text-indigo-400',
          ring: 'ring-indigo-500/30',
          dot: 'bg-indigo-400'
        };
      case 'amber':
        return {
          border: 'border-amber-500/40',
          bg: 'bg-amber-500/10',
          text: 'text-amber-400',
          ring: 'ring-amber-500/30',
          dot: 'bg-amber-400'
        };
      case 'rose':
        return {
          border: 'border-rose-500/40',
          bg: 'bg-rose-500/10',
          text: 'text-rose-400',
          ring: 'ring-rose-500/30',
          dot: 'bg-rose-400'
        };
      case 'purple':
        return {
          border: 'border-purple-500/40',
          bg: 'bg-purple-500/10',
          text: 'text-purple-400',
          ring: 'ring-purple-500/30',
          dot: 'bg-purple-400'
        };
      case 'emerald':
      default:
        return {
          border: 'border-emerald-500/40',
          bg: 'bg-emerald-500/10',
          text: 'text-emerald-400',
          ring: 'ring-emerald-500/30',
          dot: 'bg-emerald-400'
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* ── FLOW DESIGN CANVAS ── */}
      <div className="rounded-2xl bg-[#07090F] border border-slate-800 p-5 sm:p-7 relative overflow-hidden shadow-2xl">
        
        {/* Ambient grid background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

        {/* Canvas Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-6 border-b border-slate-800/80 gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Workflow className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                {type === 'topology' && 'Dual-Service Ingestion & Security Topology Flow'}
                {type === 'statemachine' && '9-State Concurrency State Machine Flow'}
                {type === 'langgraph' && 'Autonomous Multi-Agent Triage Execution Pipeline'}
              </h4>
              <p className="text-[11px] font-mono text-slate-400">
                Click any step to inspect code invariants, concurrency locks, and failure modes.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-400 font-semibold">STREAM FLOW ACTIVE</span>
            <span className="text-slate-600">|</span>
            <span>{nodes.length} STAGES</span>
          </div>
        </div>

        {/* ── HORIZONTAL FLOW SEQUENCE ── */}
        <div className="relative z-10 flex flex-col lg:flex-row items-stretch justify-between gap-3 overflow-x-auto pb-3 pt-2">
          {nodes.map((node, index) => {
            const isSelected = selectedNode.id === node.id;
            const cStyles = getColorStyles(node.color);

            return (
              <div key={node.id} className="flex-1 flex flex-col lg:flex-row items-center gap-2">
                {/* Node Card */}
                <div
                  onClick={() => setSelectedNode(node)}
                  className={`w-full p-4 rounded-xl cursor-pointer transition-all duration-200 border relative group text-left ${
                    isSelected
                      ? `bg-slate-900/90 ${cStyles.border} shadow-lg ring-2 ${cStyles.ring} translate-y-[-2px]`
                      : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  {/* Step Category & Badge */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                      {node.category}
                    </span>
                    <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${cStyles.bg} ${cStyles.text} ${cStyles.border}`}>
                      {node.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h5 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${cStyles.dot} flex-shrink-0`} />
                    <span className="truncate">{node.title}</span>
                  </h5>

                  {/* Subtitle */}
                  <p className="mt-1 text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {node.subtitle}
                  </p>

                  {/* Metric Ribbon */}
                  <div className="mt-3 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span className="text-slate-500">Benchmark:</span>
                    <span className={`font-semibold ${cStyles.text}`}>{node.metrics}</span>
                  </div>
                </div>

                {/* Connecting Arrow (between nodes) */}
                {index < nodes.length - 1 && (
                  <div className="flex items-center justify-center py-1 lg:py-0 lg:px-1 text-slate-600 group-hover:text-indigo-400 transition-colors">
                    <div className="lg:hidden text-indigo-400 font-mono text-xs">↓</div>
                    <ArrowRight className="hidden lg:block w-4 h-4 text-indigo-400/80 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── DETAIL INSPECTION DRAWER ── */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left: Invariants & Failure Mitigation */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  Stage Invariants: {selectedNode.title}
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {selectedNode.category}
              </span>
            </div>

            <div className="space-y-2">
              {selectedNode.invariants.map((inv, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed bg-black/40 p-2.5 rounded-lg border border-slate-800/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span>{inv}</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200 leading-relaxed">
              <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>FAILURE MODE DEFENSE:</span>
              </div>
              <span>{selectedNode.failureMitigation}</span>
            </div>
          </div>

          {/* Right: Code Implementation Guardrail */}
          <div className="lg:col-span-6">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <FileCode2 className="w-4 h-4 text-sky-400" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Verified Implementation Logic
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                AUDITED
              </span>
            </div>

            <div className="rounded-xl bg-black/80 border border-slate-800 p-4 font-mono text-[11.5px] text-slate-300 overflow-x-auto leading-relaxed shadow-inner">
              <pre>{selectedNode.codeSnippet}</pre>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
