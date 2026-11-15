import { useState } from 'react';
import type { FC } from 'react';
import { 
  Cpu, 
  CheckCircle, 
  Terminal, 
  Play, 
  RotateCcw, 
  AlertTriangle, 
  ShieldCheck
} from 'lucide-react';
import { FlowDesignView } from './FlowDesignView';

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
    <section id="architecture" className="py-20 border-b border-white/5 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B28] border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA]">
              <Cpu className="w-3.5 h-3.5 text-[#3C46D1]" />
              <span className="font-bold">SYSTEM DESIGN & FORMAL ARCHITECTURE</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#F1F4FA] tracking-tight">
              DashResQ Distributed Architecture
            </h2>
            <p className="mt-1 text-sm text-[#8692A6] max-w-2xl">
              Engineered to resolve life-critical race conditions: sensor jitter and cellular retry storms must never trigger double dispatches or dropped alerts.
            </p>
          </div>

          {/* Architecture tabs (Clean DashResQ Styling) */}
          <div className="flex flex-wrap items-center p-1 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] gap-1">
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'topology'
                  ? 'bg-[#3C46D1] text-white shadow-sm'
                  : 'text-[#8692A6] hover:text-[#F1F4FA]'
              }`}
            >
              1. Ingestion Topology
            </button>
            <button
              onClick={() => setActiveTab('statemachine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'statemachine'
                  ? 'bg-[#3C46D1] text-white shadow-sm'
                  : 'text-[#8692A6] hover:text-[#F1F4FA]'
              }`}
            >
              2. 9-State OCC Machine
            </button>
            <button
              onClick={() => setActiveTab('langgraph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'langgraph'
                  ? 'bg-[#3C46D1] text-white shadow-sm'
                  : 'text-[#8692A6] hover:text-[#F1F4FA]'
              }`}
            >
              3. LangGraph Triage Flow
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-[#10B981] text-white shadow-sm'
                  : 'text-[#10B981] hover:text-emerald-300'
              }`}
            >
              <Play className="w-3 h-3" />
              <span>4. Live OCC Sandbox</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Dual-Service Topology */}
        {activeTab === 'topology' && (
          <FlowDesignView type="topology" />
        )}

        {/* Tab 2: 9-State OCC Machine */}
        {activeTab === 'statemachine' && (
          <FlowDesignView type="statemachine" />
        )}

        {/* Tab 3: LangGraph Triage Flow */}
        {activeTab === 'langgraph' && (
          <FlowDesignView type="langgraph" />
        )}

        {/* Tab 4: Live OCC Simulator */}
        {activeTab === 'simulator' && (
          <div className="p-6 sm:p-8 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(148,163,184,0.18)]">
              <div>
                <span className="text-xs font-mono text-[#10B981] font-semibold uppercase tracking-wider">
                  Interactive Concurrency & State Machine Tester
                </span>
                <h3 className="text-xl font-bold text-[#F1F4FA] mt-1">
                  OCC Idempotency & Partial Unique Index Sandbox
                </h3>
              </div>

              {/* Current Active State Display */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[#8692A6]">ACTIVE STATE</div>
                  <div className="text-sm font-mono font-bold text-[#F1F4FA] flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      simState === 'IDLE' ? 'bg-slate-400' :
                      simState === 'TRIGGERED' || simState === 'VERIFYING' ? 'bg-amber-400 animate-pulse' :
                      simState === 'DISPATCHED' || simState === 'ESCALATED' ? 'bg-rose-500 animate-ping' :
                      simState === 'ON_SCENE' ? 'bg-sky-400' :
                      'bg-[#10B981]'
                    }`} />
                    {simState}
                  </div>
                </div>

                <button
                  onClick={resetSim}
                  className="p-2 rounded-lg bg-[#07090F] hover:bg-slate-800 text-[#8692A6] hover:text-white transition-colors cursor-pointer border border-[rgba(148,163,184,0.18)]"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
              {/* Simulator Controls (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold">
                  Test Scenarios & Signal Injections
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={triggerAnomaly}
                    disabled={simState === 'VERIFYING' || simState === 'DISPATCHED'}
                    className="p-3.5 rounded-xl bg-[#07090F] hover:bg-[#3C46D1]/20 disabled:opacity-40 text-left transition-all border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-indigo-300">
                      <Play className="w-3.5 h-3.5" />
                      1. Trigger Anomaly
                    </div>
                    <div className="text-[11px] text-[#8692A6] mt-1">Simulate watchOS crash / SpO2 anomaly</div>
                  </button>

                  <button
                    onClick={cancelGrace}
                    disabled={simState !== 'VERIFYING' && simState !== 'TRIGGERED'}
                    className="p-3.5 rounded-xl bg-[#07090F] hover:bg-emerald-600/20 disabled:opacity-40 text-left transition-all border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      2. Wearer "I'm OK"
                    </div>
                    <div className="text-[11px] text-[#8692A6] mt-1">Cancels within 10s grace window</div>
                  </button>

                  <button
                    onClick={dispatchAmbulance}
                    disabled={simState !== 'VERIFYING'}
                    className="p-3.5 rounded-xl bg-[#07090F] hover:bg-rose-600/20 disabled:opacity-40 text-left transition-all border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-rose-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      3. Grace Window Timeout
                    </div>
                    <div className="text-[11px] text-[#8692A6] mt-1">Auto-dispatches Tier-1 EMS network</div>
                  </button>

                  <button
                    onClick={injectDuplicatePacket}
                    disabled={simState === 'IDLE' || simState === 'RESOLVED' || simState === 'CANCELLED'}
                    className="p-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 disabled:opacity-40 text-left transition-all border border-amber-500/30 text-xs font-mono text-amber-200 cursor-pointer"
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
                    className="p-3.5 rounded-xl bg-[#07090F] hover:bg-sky-600/20 disabled:opacity-40 text-left transition-all border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-sky-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      5. Clinician Check-In
                    </div>
                    <div className="text-[11px] text-[#8692A6] mt-1">HMAC GPS handshake on scene</div>
                  </button>

                  <button
                    onClick={resolveIncident}
                    disabled={simState !== 'ON_SCENE' && simState !== 'TRANSPORTING'}
                    className="p-3.5 rounded-xl bg-[#07090F] hover:bg-emerald-600/20 disabled:opacity-40 text-left transition-all border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                      <CheckCircle className="w-3.5 h-3.5" />
                      6. Finalize & Resolve
                    </div>
                    <div className="text-[11px] text-[#8692A6] mt-1">Audit log closed, lock released</div>
                  </button>
                </div>
              </div>

              {/* Simulator Live Logs (6 cols) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[#10B981]" />
                    Live Audit Log Stream
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">Append-Only Invariant</span>
                </div>

                <div className="p-4 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] font-mono text-xs max-h-[300px] overflow-y-auto space-y-2">
                  {simLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="text-slate-500">{log.timestamp}</span>
                      <span className={`px-1 rounded text-[10px] font-bold ${
                        log.level === 'INFO' ? 'bg-emerald-500/20 text-[#10B981]' :
                        log.level === 'WARN' ? 'bg-amber-500/20 text-[#F59E0B]' :
                        'bg-rose-500/20 text-[#EF4444]'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-indigo-300 font-semibold">{log.event}:</span>
                      <span className="text-[#F1F4FA]">{log.details}</span>
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
