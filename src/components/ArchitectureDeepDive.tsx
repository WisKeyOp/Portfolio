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

const INITIAL_TIMESTAMP = '18:42:01';

export const ArchitectureDeepDive: FC = () => {
  const [activeTab, setActiveTab] = useState<'topology' | 'statemachine' | 'langgraph' | 'simulator'>('topology');

  // Simulator state
  const [simState, setSimState] = useState<IncidentState>('IDLE');
  const [simLogs, setSimLogs] = useState<LogEntry[]>([
    {
      timestamp: INITIAL_TIMESTAMP,
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
    <section id="architecture" className="dark py-20 border-t border-b border-[var(--line-dark)] bg-[var(--void)] text-white">
      <div className="shell">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--coal)] border border-[var(--line-dark)] text-xs font-mono text-[var(--smoke)]">
              <Cpu className="w-3.5 h-3.5 text-[var(--flame)]" />
              <span className="font-bold">SYSTEM DESIGN & FORMAL ARCHITECTURE</span>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              DashResQ Distributed Architecture
            </h2>
            <p className="mt-1 text-sm text-[var(--slate)] max-w-2xl font-sans leading-relaxed">
              Engineered to resolve life-critical race conditions: sensor jitter and cellular retry storms must never trigger double dispatches or dropped alerts.
            </p>
          </div>

          {/* Architecture tabs (Restrained Swiss Styling) */}
          <div className="flex flex-wrap items-center p-1 rounded-xl bg-[var(--coal)] border border-[var(--line-dark)] gap-1">
            <button
              onClick={() => setActiveTab('topology')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'topology'
                  ? 'bg-[var(--flame)] text-white shadow-sm font-semibold'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              1. Ingestion Topology
            </button>
            <button
              onClick={() => setActiveTab('statemachine')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'statemachine'
                  ? 'bg-[var(--flame)] text-white shadow-sm font-semibold'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              2. 9-State OCC Machine
            </button>
            <button
              onClick={() => setActiveTab('langgraph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                activeTab === 'langgraph'
                  ? 'bg-[var(--flame)] text-white shadow-sm font-semibold'
                  : 'text-[var(--smoke)] hover:text-white'
              }`}
            >
              3. LangGraph Triage Flow
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'bg-[var(--lime)] text-[var(--on-lime,#000)] shadow-sm font-bold'
                  : 'text-[var(--lime)] hover:text-white'
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
          <div className="p-6 sm:p-8 rounded-[var(--round)] bg-[var(--coal)] border border-[var(--line-dark)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--line-dark)]">
              <div>
                <span className="text-xs font-mono text-[var(--lime)] font-semibold uppercase tracking-wider">
                  Interactive Concurrency & State Machine Tester
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  OCC Idempotency & Partial Unique Index Sandbox
                </h3>
              </div>

              {/* Current Active State Display */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[11px] font-mono text-[var(--smoke)]">ACTIVE STATE</div>
                  <div className="text-sm font-mono font-bold text-white flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${
                      simState === 'IDLE' ? 'bg-zinc-500' :
                      simState === 'TRIGGERED' || simState === 'VERIFYING' ? 'bg-[var(--flame)]' :
                      simState === 'DISPATCHED' || simState === 'ESCALATED' ? 'bg-[var(--flame)] ring-2 ring-[var(--flame)]/40' :
                      simState === 'ON_SCENE' ? 'bg-[var(--lime)]' :
                      'bg-[var(--lime)]'
                    }`} />
                    {simState}
                  </div>
                </div>

                <button
                  onClick={resetSim}
                  className="p-2 rounded-lg bg-[var(--void)] hover:bg-zinc-800 text-[var(--smoke)] hover:text-white transition-colors cursor-pointer border border-[var(--line-dark)]"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 items-start">
              {/* Simulator Controls (6 cols) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[var(--smoke)] font-semibold">
                  Test Scenarios & Signal Injections
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={triggerAnomaly}
                    disabled={simState === 'VERIFYING' || simState === 'DISPATCHED'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--flame)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <Play className="w-3.5 h-3.5 text-[var(--flame)]" />
                      1. Trigger Anomaly
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">Simulate watchOS crash / SpO2 anomaly</div>
                  </button>

                  <button
                    onClick={cancelGrace}
                    disabled={simState !== 'VERIFYING' && simState !== 'TRIGGERED'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--lime)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--lime)]" />
                      2. Wearer "I'm OK"
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">Cancels within 10s grace window</div>
                  </button>

                  <button
                    onClick={dispatchAmbulance}
                    disabled={simState !== 'VERIFYING'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--flame)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--flame)]" />
                      3. Grace Window Timeout
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">Auto-dispatches Tier-1 EMS network</div>
                  </button>

                  <button
                    onClick={injectDuplicatePacket}
                    disabled={simState === 'IDLE' || simState === 'RESOLVED' || simState === 'CANCELLED'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--flame)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <ShieldCheck className="w-3.5 h-3.5 text-[var(--flame)]" />
                      4. Inject Duplicate Packet
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">Proves OCC partial index block</div>
                  </button>

                  <button
                    onClick={clinicianOnScene}
                    disabled={simState !== 'DISPATCHED' && simState !== 'ESCALATED'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--lime)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--lime)]" />
                      5. Clinician Check-In
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">HMAC GPS handshake on scene</div>
                  </button>

                  <button
                    onClick={resolveIncident}
                    disabled={simState !== 'ON_SCENE' && simState !== 'TRANSPORTING'}
                    className="p-3.5 rounded-xl bg-[var(--void)] hover:bg-white/[0.04] disabled:opacity-40 text-left transition-all border border-[var(--line-dark)] hover:border-[var(--lime)]/40 text-xs font-mono text-[#f4f4f5] cursor-pointer"
                  >
                    <div className="font-bold flex items-center gap-1.5 text-white">
                      <CheckCircle className="w-3.5 h-3.5 text-[var(--lime)]" />
                      6. Finalize & Resolve
                    </div>
                    <div className="text-[11px] text-[var(--smoke)] mt-1">Audit log closed, lock released</div>
                  </button>
                </div>
              </div>

              {/* Simulator Live Logs (6 cols) */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--smoke)] font-semibold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--lime)]" />
                    Live Audit Log Stream
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">Append-Only Invariant</span>
                </div>

                <div className="p-4 rounded-xl bg-[var(--void)] border border-[var(--line-dark)] font-mono text-xs max-h-[300px] overflow-y-auto space-y-2">
                  {simLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] leading-tight">
                      <span className="text-zinc-500">{log.timestamp}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        log.level === 'INFO' ? 'bg-[var(--lime)]/15 text-[var(--lime)]' :
                        log.level === 'WARN' ? 'bg-white/10 text-[var(--smoke)]' :
                        'bg-[var(--flame)]/15 text-[var(--flame)]'
                      }`}>
                        {log.level}
                      </span>
                      <span className="text-white font-semibold">{log.event}:</span>
                      <span className="text-[#f4f4f5]">{log.details}</span>
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
