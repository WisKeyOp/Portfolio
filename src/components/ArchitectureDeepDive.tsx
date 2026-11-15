import { useState } from 'react';
import type { FC } from 'react';
import { 
  Cpu, 
  CheckCircle, 
  Terminal, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck,
  Workflow,
  Code2
} from 'lucide-react';
import { FlowDesignView } from './FlowDesignView';
import { MermaidViewer } from './MermaidViewer';

type IncidentState = 'IDLE' | 'TRIGGERED' | 'VERIFYING' | 'DISPATCHED' | 'ESCALATED' | 'ON_SCENE' | 'TRANSPORTING' | 'RESOLVED' | 'CANCELLED';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  event: string;
  details: string;
}

const TOPOLOGY_MERMAID = `flowchart LR
    classDef edge fill:#091E2A,stroke:#06B6D4,stroke-width:1px,color:#CFFAFE;
    classDef service fill:#141738,stroke:#6366F1,stroke-width:1px,color:#E0E7FF;
    classDef security fill:#2A1E0D,stroke:#F59E0B,stroke-width:1px,color:#FEF3C7;
    classDef core fill:#2A0F1E,stroke:#F43F5E,stroke-width:1px,color:#FFE4E6;
    classDef dispatch fill:#0D2818,stroke:#10B981,stroke-width:1px,color:#D1FAE5;

    subgraph E["1. Edge Telematics"]
        W1["Apple Watch (watchOS)"]:::edge
        W2["Wear OS / BLE Sensors"]:::edge
        W3["Health Connect (Android)"]:::edge
    end

    subgraph DRQ["2. Wearable Telemetry Service (:8001)"]
        Ingest["Vitals Ingest Handler\n(600/min per user)"]:::service
        Gaussian["14-Day Rolling\nGaussian Baseline"]:::service
        RiskEngine["9 Deterministic Rules\n(Cardiac · Accel · SpO2)"]:::service
    end

    subgraph Sec["3. Security Gateway"]
        HMAC["Internal HMAC Key\n(Constant-Time SHA-256)"]:::security
    end

    subgraph Plat["4. Dash Platform Service (:8000)"]
        OCC["9-State Incident Machine\n(Optimistic Concurrency Control)"]:::core
        PartialIndex[("Postgres Partial Index\nidx_one_active_incident")]:::core
        AuditLog[("IncidentStateLog\nImmutable Audit Trail")]:::core
        LangGraph["LangGraph Triage Agent\n(BM25 + pgvector Hybrid)"]:::core
    end

    subgraph Mesh["5. Multi-Tier Response Mesh"]
        T1["Tier-1 EMS Ambulance"]:::dispatch
        T2["Tier-2 Hospital Trauma Center"]:::dispatch
        T3["Tier-3 Verified Responders"]:::dispatch
    end

    W1 & W2 & W3 -->|Vitals Batch| Ingest
    Ingest --> Gaussian --> RiskEngine
    RiskEngine -->|Anomaly Alert| HMAC
    HMAC -->|X-Internal-Key Verified| OCC
    OCC --> PartialIndex
    OCC --> AuditLog
    OCC --> LangGraph
    OCC -->|Grace Timeout| T1
    OCC -->|Trauma Pre-Alert| T2
    OCC -->|Escalation Timeout| T3`;

const STATEMACHINE_MERMAID = `stateDiagram-v2
    [*] --> IDLE: Normal Baseline
    IDLE --> TRIGGERED: Hardware Crash / 4.2G Deceleration
    TRIGGERED --> VERIFYING: 10s Grace Window Starts
    
    VERIFYING --> CANCELLED: Wearer Taps "I'm OK" (Lock Released)
    VERIFYING --> DISPATCHED: Grace Timeout Expires (Tier-1 Rolling)
    
    DISPATCHED --> ESCALATED: No Responder ACK in 3 mins
    DISPATCHED --> ON_SCENE: Ambulance Arrives at Coordinates
    ESCALATED --> ON_SCENE: Tier-3 Responders Arrive
    
    ON_SCENE --> TRANSPORTING: Patient Loaded into Ambulance
    TRANSPORTING --> RESOLVED: Hospital Admitted (Lock Released)
    
    CANCELLED --> [*]
    RESOLVED --> [*]`;

const LANGGRAPH_MERMAID = `flowchart TD
    classDef input fill:#091E2A,stroke:#06B6D4,stroke-width:1px,color:#CFFAFE;
    classDef gate fill:#2A0F1E,stroke:#F43F5E,stroke-width:1px,color:#FFE4E6;
    classDef agent fill:#141738,stroke:#6366F1,stroke-width:1px,color:#E0E7FF;
    classDef tool fill:#221338,stroke:#A855F7,stroke-width:1px,color:#F3E8FF;
    classDef guard fill:#2A1E0D,stroke:#F59E0B,stroke-width:1px,color:#FEF3C7;
    classDef out fill:#0D2818,stroke:#10B981,stroke-width:1px,color:#D1FAE5;

    In(["Voice / Vitals Telemetry Input"]):::input --> SafetyGate{"1. Deterministic Safety Gate"}:::gate
    
    SafetyGate -->|Acute Red-Flag Symptoms\nChest Crushing Pain / Asphyxia| SOS["Immediate Emergency Escalation\n(Zero-LLM Fast Path · Tier-1 Dispatch)"]:::gate
    SafetyGate -->|Non-Critical Symptoms| Hybrid["2. Hybrid Medical RAG\nDense pgvector + Sparse BM25"]:::agent
    
    Hybrid --> ToolAgent["3. Clinical Tooling Node\n(LangGraph State Machine)"]:::agent
    
    subgraph ToolServer["Verified Clinical Tool Server"]
        D1["18 Drug Interaction Classes"]:::tool
        D2["Pediatric / Geriatric Bounds"]:::tool
        D3["Longitudinal Health History"]:::tool
    end
    
    ToolAgent <--> ToolServer
    ToolAgent --> Guard{"4. Regulatory Guardrail\n(Module C Safety Floor)"}:::guard
    
    Guard -->|Prescription Attempt| Refuse["Conservative Refusal\n(Prohibit Unverified Prescriptions)"]:::guard
    Guard -->|Verified First-Aid| Deliver["5. Bilingual Delivery\n(Hindi & English Cadence)"]:::out
    
    Deliver --> Commit[("LangSmith Trace &\nImmutable Audit Commit")]:::out
    Refuse --> Commit
    SOS --> Commit`;

export const ArchitectureDeepDive: FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'statemachine' | 'langgraph' | 'simulator'>('topology');
  const [viewStyle, setViewStyle] = useState<'ui-flow' | 'mermaid'>('ui-flow');

  // Simulator state
  const [simState, setSimState] = useState<IncidentState>('IDLE');
  const [simLogs, setSimLogs] = useState<LogEntry[]>([
    {
      timestamp: new Date().toISOString().substring(11, 19),
      level: 'INFO',
      event: 'SYSTEM_BOOT',
      details: 'OCC state machine initialized. PostgreSQL partial unique index enforced.',
    },
  ]);

  const addLog = (level: 'INFO' | 'WARN' | 'ERROR', event: string, details: string) => {
    const newEntry: LogEntry = {
      timestamp: new Date().toISOString().substring(11, 19),
      level,
      event,
      details,
    };
    setSimLogs((prev) => [newEntry, ...prev.slice(0, 14)]);
  };

  const triggerAnomaly = () => {
    if (simState !== 'IDLE' && simState !== 'RESOLVED' && simState !== 'CANCELLED') {
      addLog('WARN', '409_CONFLICT', 'User already has an active incident lock. Duplicate trigger rejected by idx_one_active_incident_per_user.');
      return;
    }
    setSimState('TRIGGERED');
    addLog('INFO', 'TELEMETRY_ANOMALY', 'Heart rate drop + 4.2G impact sensed via watchOS HealthKit stream.');
    setTimeout(() => {
      setSimState('VERIFYING');
      addLog('INFO', 'STATE_TRANSITION', 'Transitioned to VERIFYING. 10-second wearer grace countdown started.');
    }, 400);
  };

  const cancelGrace = () => {
    if (simState !== 'VERIFYING' && simState !== 'TRIGGERED') {
      addLog('WARN', 'INVALID_TRANSITION', `Cannot cancel incident from state ${simState}.`);
      return;
    }
    setSimState('CANCELLED');
    addLog('INFO', 'WEARER_CANCELLED', 'Wearer tapped "I\'m OK". IncidentStateLog committed with status CANCELLED. Lock released.');
  };

  const dispatchAmbulance = () => {
    if (simState !== 'VERIFYING') {
      addLog('WARN', 'INVALID_TRANSITION', 'Dispatch requires expiration of VERIFYING grace window.');
      return;
    }
    setSimState('DISPATCHED');
    addLog('INFO', 'TIER1_DISPATCH', 'Grace timeout expired without cancellation. Dispatched Tier-1 EMS and Tier-2 hospital emergency room.');
  };

  const injectDuplicatePacket = () => {
    if (simState === 'IDLE' || simState === 'RESOLVED' || simState === 'CANCELLED') {
      addLog('WARN', 'NO_OP', 'No active incident to collision-test.');
      return;
    }
    addLog('ERROR', 'COLLISION_BLOCKED', 'Inbound BLE retry packet with duplicate sample_id detected. Blocked by partial unique index without double-dispatching.');
  };

  const clinicianOnScene = () => {
    if (simState !== 'DISPATCHED' && simState !== 'ESCALATED') {
      addLog('WARN', 'INVALID_TRANSITION', 'Clinician arrival requires prior DISPATCHED state.');
      return;
    }
    setSimState('ON_SCENE');
    addLog('INFO', 'RESPONDER_HANDSHAKE', 'Ambulance & clinician arrived on scene. Monotonic state updated with GPS verification.');
  };

  const resolveIncident = () => {
    if (simState !== 'ON_SCENE' && simState !== 'TRANSPORTING') {
      addLog('WARN', 'INVALID_TRANSITION', 'Resolution requires on-scene stabilization.');
      return;
    }
    setSimState('RESOLVED');
    addLog('INFO', 'INCIDENT_RESOLVED', 'Patient stabilized. Final medical audit record immutably sealed. Concurrency lock released.');
  };

  const resetSim = () => {
    setSimState('IDLE');
    setSimLogs([
      {
        timestamp: new Date().toISOString().substring(11, 19),
        level: 'INFO',
        event: 'SIM_RESET',
        details: 'Simulator returned to IDLE state. Ready for new telemetry stream.',
      },
    ]);
  };

  return (
    <section id="architecture" className="py-20 border-b border-white/5 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-mono font-medium border border-sky-500/20">
              <Cpu className="w-3.5 h-3.5" />
              SYSTEM DESIGN & FORMAL ARCHITECTURE
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
              DashResQ Distributed Architecture
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Engineered to resolve life-critical race conditions: sensor jitter and cellular retry storms must never trigger double dispatches or dropped alerts.
            </p>
          </div>

          {/* Architecture tabs */}
          <div className="flex flex-wrap items-center p-1 rounded-xl bg-slate-900 border border-slate-800 gap-1">
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'topology'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              1. Dual-Service Topology
            </button>
            <button
              onClick={() => setActiveTab('statemachine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'statemachine'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              2. 9-State OCC Machine
            </button>
            <button
              onClick={() => setActiveTab('langgraph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'langgraph'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              3. LangGraph Triage Flow
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-400 hover:text-emerald-300'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>4. Live OCC Sandbox</span>
            </button>
          </div>
        </div>

        {/* ── VIEW MODE SELECTOR (UI FLOW DESIGN VS MERMAID CODE) ── */}
        {activeTab !== 'simulator' && (
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">RENDER VIEW:</span>
              <div className="inline-flex items-center p-1 rounded-lg bg-slate-900 border border-slate-800">
                <button
                  onClick={() => setViewStyle('ui-flow')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewStyle === 'ui-flow'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5" />
                  <span>Interactive UI Flow Design</span>
                </button>
                <button
                  onClick={() => setViewStyle('mermaid')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono font-bold transition-all cursor-pointer ${
                    viewStyle === 'mermaid'
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Mermaid Flow & Code</span>
                </button>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-500">
              <span>CANONICAL: packages/shared_schemas</span>
              <span>•</span>
              <span className="text-emerald-400">OCC: ENFORCED</span>
            </div>
          </div>
        )}

        {/* Tab 1: Dual-Service Topology */}
        {activeTab === 'topology' && (
          viewStyle === 'ui-flow' ? (
            <FlowDesignView type="topology" />
          ) : (
            <div className="space-y-6">
              <MermaidViewer chart={TOPOLOGY_MERMAID} id="topology-flow" />
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-indigo-400 font-bold mb-1">Topology Invariants:</div>
                <div className="text-slate-400 leading-relaxed">
                  Stateless inter-service JWT authorization, dedicated private HMAC channel (<code className="text-indigo-300">X-Internal-Key</code>), and strict decoupling between edge ingestion (:8001) and incident orchestration (:8000).
                </div>
              </div>
            </div>
          )
        )}

        {/* Tab 2: 9-State OCC Machine */}
        {activeTab === 'statemachine' && (
          viewStyle === 'ui-flow' ? (
            <FlowDesignView type="statemachine" />
          ) : (
            <div className="space-y-6">
              <MermaidViewer chart={STATEMACHINE_MERMAID} id="statemachine-flow" />
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-rose-400 font-bold mb-1">PostgreSQL OCC Invariant:</div>
                <div className="text-slate-400 leading-relaxed">
                  <code className="text-indigo-300">CREATE UNIQUE INDEX idx_one_active_incident_per_user ON incidents (user_id) WHERE status NOT IN ('RESOLVED', 'CANCELLED', 'FALSE_ALARM');</code>
                  <br />Physically eliminates dual-ambulance dispatch under identical cellular retry storms.
                </div>
              </div>
            </div>
          )
        )}

        {/* Tab 3: LangGraph Triage Flow */}
        {activeTab === 'langgraph' && (
          viewStyle === 'ui-flow' ? (
            <FlowDesignView type="langgraph" />
          ) : (
            <div className="space-y-6">
              <MermaidViewer chart={LANGGRAPH_MERMAID} id="langgraph-flow" />
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 font-mono text-xs text-slate-300">
                <div className="text-purple-400 font-bold mb-1">Agentic Safety Floor Invariants:</div>
                <div className="text-slate-400 leading-relaxed">
                  Deterministic fast-path for acute cardiac/asphyxia distress bypassing LLM latency, hybrid BM25 + dense pgvector retrieval, 18 drug interaction classes, and conservative refusal on unverified prescription generation.
                </div>
              </div>
            </div>
          )
        )}

        {/* Tab 4: Live OCC Simulator */}
        {activeTab === 'simulator' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-semibold uppercase tracking-wider">
                  Interactive Concurrency & State Machine Tester
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  OCC Idempotency & Partial Unique Index Sandbox
                </h3>
              </div>

              {/* Current Active State Display */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] font-mono text-slate-400">ACTIVE STATE</div>
                  <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      simState === 'IDLE' ? 'bg-slate-400' :
                      simState === 'TRIGGERED' || simState === 'VERIFYING' ? 'bg-amber-400 animate-pulse' :
                      simState === 'DISPATCHED' || simState === 'ESCALATED' ? 'bg-rose-500 animate-ping' :
                      simState === 'ON_SCENE' ? 'bg-sky-400' :
                      'bg-emerald-400'
                    }`} />
                    {simState}
                  </div>
                </div>

                <button
                  onClick={resetSim}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
              {/* Simulator Controls (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                  Test Scenarios & Signal Injections
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={triggerAnomaly}
                    disabled={simState === 'VERIFYING' || simState === 'DISPATCHED'}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-indigo-600 disabled:opacity-40 disabled:hover:bg-slate-800/80 text-left transition-all border border-slate-700 text-xs font-mono text-white cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-indigo-300">
                      <Play className="w-3.5 h-3.5" />
                      1. Trigger Anomaly
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Simulate watchOS crash / SpO2 anomaly</div>
                  </button>

                  <button
                    onClick={cancelGrace}
                    disabled={simState !== 'VERIFYING' && simState !== 'TRIGGERED'}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-slate-800/80 text-left transition-all border border-slate-700 text-xs font-mono text-white cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      2. Wearer "I'm OK"
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Cancels within 10s grace window</div>
                  </button>

                  <button
                    onClick={dispatchAmbulance}
                    disabled={simState !== 'VERIFYING'}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-rose-600 disabled:opacity-40 disabled:hover:bg-slate-800/80 text-left transition-all border border-slate-700 text-xs font-mono text-white cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      3. Grace Window Timeout
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Auto-dispatches Tier-1 EMS network</div>
                  </button>

                  <button
                    onClick={injectDuplicatePacket}
                    disabled={simState === 'IDLE' || simState === 'RESOLVED' || simState === 'CANCELLED'}
                    className="p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-40 text-left transition-all border border-amber-500/30 text-xs font-mono text-amber-200 cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-amber-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      4. Inject Duplicate Packet
                    </div>
                    <div className="text-[11px] text-amber-300/70 mt-1">Proves OCC partial index block</div>
                  </button>

                  <button
                    onClick={clinicianOnScene}
                    disabled={simState !== 'DISPATCHED' && simState !== 'ESCALATED'}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-sky-600 disabled:opacity-40 disabled:hover:bg-slate-800/80 text-left transition-all border border-slate-700 text-xs font-mono text-white cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-sky-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      5. Clinician Check-In
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">HMAC GPS handshake on scene</div>
                  </button>

                  <button
                    onClick={resolveIncident}
                    disabled={simState !== 'ON_SCENE' && simState !== 'TRANSPORTING'}
                    className="p-3 rounded-xl bg-slate-800/80 hover:bg-emerald-600 disabled:opacity-40 disabled:hover:bg-slate-800/80 text-left transition-all border border-slate-700 text-xs font-mono text-white cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      6. Finalize & Resolve
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">Audit log closed, lock released</div>
                  </button>
                </div>
              </div>

              {/* Simulator Live Logs (6 cols) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                    Live Audit Log Stream
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Append-Only Invariant</span>
                </div>

                <div className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs max-h-[300px] overflow-y-auto space-y-2">
                  {simLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <span className={`px-1 rounded text-[10px] font-bold ${
                        log.level === 'INFO' ? 'bg-emerald-500/20 text-emerald-400' :
                        log.level === 'WARN' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-rose-500/20 text-rose-400'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-indigo-300 font-semibold">{log.event}:</span>
                      <span className="text-slate-300">{log.details}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
