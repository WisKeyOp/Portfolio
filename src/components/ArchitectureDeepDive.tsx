import { useState } from 'react';
import type { FC } from 'react';
import { Cpu, CheckCircle, Terminal, Play, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

type IncidentState = 'IDLE' | 'TRIGGERED' | 'VERIFYING' | 'DISPATCHED' | 'ESCALATED' | 'ON_SCENE' | 'TRANSPORTING' | 'RESOLVED' | 'CANCELLED';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  event: string;
  details: string;
}

export const ArchitectureDeepDive: FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'statemachine' | 'langgraph' | 'simulator'>('topology');

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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-mono font-medium border border-sky-500/20">
              <Cpu className="w-3.5 h-3.5" />
              SYSTEM DESIGN & FORMAL ARCHITECTURE
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
              DashResQ Distributed Architecture
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Engineered from scratch to solve the life-critical race condition: sensor jitter and retry storms must never trigger double dispatches or dropped alerts.
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

        {/* Tab 1: Dual-Service Topology */}
        {activeTab === 'topology' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                    Distributed Service Boundaries & Gateway
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    299 Endpoints | 86 Tables
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  <div className="text-sky-400 font-semibold mb-2"># Dual-Service Ingestion & Escalation Topology</div>
                  <pre className="text-[11.5px] leading-tight text-slate-300">
{`[ Edge Telemetry Layer ]
   Apple Watch (watchOS) ──┐
   Wear OS / BLE Sensors  ──┼──> [DRQ Telemetry Service :8001]
   Health Connect (Android)─┘     │ High-throughput Ingestion (600/min)
                                  │ Rolling 14-Day Baseline Worker
                                  │ Deterministic 9 Risk Rules Engine
                                  │
                                  ▼ (Internal HMAC: /internal/v1/incidents)
[ Dash Platform Service :8000 ] <─┘
   ├── Incident Escalation State Machine (OCC Guard)
   ├── LangGraph Clinical Triage Agent (BM25 + pgvector)
   ├── Multi-Tier Responder Orchestrator (Ambulance / Clinicians)
   ├── SIWA / JWT Auth + Rotating Refresh & Revocation
   └── WebSocket Topics (Real-Time Live Vitals & Map)`}
                  </pre>
                </div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-xs font-mono font-bold text-white mb-1">
                      Platform Service (:8000)
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Orchestrates user auth, emergency circles, responder assignments, real-time WebSocket topics, and the incident life cycle.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                    <div className="text-xs font-mono font-bold text-white mb-1">
                      Wearable Service (:8001)
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Stateless JWT-authenticated high-throughput vitals ingestion engine maintaining 14-day rolling Gaussian baselines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Architectural Invariants Enforced
                </h3>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    Stateless Inter-Service Auth
                  </div>
                  <p className="text-xs text-slate-400">
                    Shared canonical schemas in <code className="text-indigo-300">packages/shared_schemas</code>; cross-service calls validated via constant-time HMAC headers.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    Background Worker Isolation
                  </div>
                  <p className="text-xs text-slate-400">
                    Guarded via <code className="text-indigo-300">BACKGROUND_WORKERS_ENABLED=False</code> on horizontally scaled web pods to eliminate concurrent timeout loop execution.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-1">
                    <CheckCircle className="w-4 h-4" />
                    Non-Blocking Stream Ingest
                  </div>
                  <p className="text-xs text-slate-400">
                    Handles 600 events/min per user with async batches into PostgreSQL and Redis rate limiting (SlowAPI).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 9-State OCC Escalation State Machine */}
        {activeTab === 'statemachine' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                    OCC State Machine & Lock Strategy
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    PostgreSQL Partial Unique Index
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  <div className="text-emerald-400 font-semibold mb-2"># State Transitions & Concurrency Invariant</div>
                  <pre className="text-[11.5px] leading-tight text-slate-300">
{`[TRIGGERED] (Hardware Crash / Telemetry Anomaly)
    │
    ▼ (10s countdown grace window)
[VERIFYING] ──────> User cancels ("I'm OK") ───> [CANCELLED] (Terminal)
    │
    ▼ (Grace timeout expires)
[DISPATCHED] (Tier-1 Ambulance & Tier-2 Clinicians notified)
    │
    ├──> Escalation Timeout ───> [ESCALATED] (Tier-3 Field Responders)
    ├──> Clinician Arrived ────> [ON_SCENE]
    └──> Responder Handshake ──> [TRANSPORTING]
                                     │
                                     ▼
                                 [RESOLVED] (Terminal Audit Record)`}
                  </pre>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-black/50 border border-slate-800 font-mono text-xs text-slate-400">
                  <span className="text-sky-400">-- PostgreSQL Concurrency Guardrail:</span>
                  <div className="text-slate-300 mt-1">
                    CREATE UNIQUE INDEX idx_one_active_incident_per_user ON incidents (user_id)<br/>
                    WHERE status NOT IN ('RESOLVED', 'CANCELLED', 'FALSE_ALARM');
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Failure-Mode Mitigations
                </h3>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 mb-1">
                    Zero Duplicate Dispatches
                  </div>
                  <p className="text-xs text-slate-400">
                    The database-level partial unique index physically prevents concurrent insertion of two active emergencies for the same user, even under extreme cellular packet retry storms.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 mb-1">
                    Deterministic Incident State Log
                  </div>
                  <p className="text-xs text-slate-400">
                    Every transition writes an immutable <code className="text-indigo-300">IncidentStateLog</code> record with monotonic timestamps, actor metadata, and prior state verification.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-indigo-400 mb-1">
                    Optimistic Concurrency Control (OCC)
                  </div>
                  <p className="text-xs text-slate-400">
                    State mutation uses version-checked updates; stale updates trigger explicit retry re-reads rather than overwriting parallel clinician check-ins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: LangGraph Triage Flow */}
        {activeTab === 'langgraph' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                    LangGraph Stateful Multi-Agent Pipeline
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    BM25 + pgvector Hybrid Retrieval
                  </span>
                </div>

                <div className="p-5 rounded-xl bg-black/70 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
                  <div className="text-purple-400 font-semibold mb-2"># LangGraph Autonomous Triage Cycle</div>
                  <pre className="text-[11.5px] leading-tight text-slate-300">
{`[Voice / Text Telemetry Input]
   │
   ▼
[1. Deterministic Safety Gate] ─── Red-flag Symptoms? ───> Immediate SOS Trigger
   │ (Non-hallucinatory keyword floor)
   ▼
[2. Medical Context Retrieval]
   ├── Dense Vector Search (pgvector cosine similarity)
   └── Sparse Keyword Match (BM25 clinical guideline terms)
   │
   ▼
[3. Clinical Tool-Calling Node]
   ├── Drug Interaction Engine (18 pharmacological classes)
   ├── Pediatric / Geriatric Dosage Boundary Checks
   └── Longitudinal Health History Injector
   │
   ▼
[4. Bilingual Safety Formulation] (Hindi / English)
   │ (Deterministic prohibition of unverified prescriptions)
   ▼
[5. Structured State Transition & Audit Log Commit]`}
                  </pre>
                </div>

                <div className="mt-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xs font-mono font-bold text-white mb-1">
                    Regulatory & Observability Guardrails
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Designed strictly under Module C guidelines: AI assists triage context aggregation but never dispenses ungrounded prescription advice. LangSmith tracing active across all turns.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-sm font-mono font-semibold uppercase tracking-wider text-slate-300">
                  Agentic Safety Invariants
                </h3>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-purple-400 mb-1">
                    Zero Medical Hallucinations
                  </div>
                  <p className="text-xs text-slate-400">
                    Guideline retrieval is bound to verified medical corpora with strict minimum cosine similarity thresholds and human-in-the-loop escalation paths.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-purple-400 mb-1">
                    Deterministic State Boundaries
                  </div>
                  <p className="text-xs text-slate-400">
                    Defensive None-checking at all node boundaries; failures gracefully route to conservative triage escalation rather than unhandled exception crashes.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
                  <div className="text-xs font-bold text-purple-400 mb-1">
                    Tenant & Patient Data Isolation
                  </div>
                  <p className="text-xs text-slate-400">
                    All vector searches enforce patient ID filter masks at the PostgreSQL query level to physically eliminate cross-patient context leakage.
                  </p>
                </div>
              </div>
            </div>
          </div>
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
