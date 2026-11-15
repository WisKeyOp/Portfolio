import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { 
  Activity, 
  Terminal, 
  Play, 
  Pause, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Zap, 
  Radio, 
  Maximize2,
  Workflow
} from 'lucide-react';
import { TELEMETRY_NODES, TOPOLOGY_LINKS } from '../data/telemetry-nodes';
import type { TelemetryNode } from '../data/telemetry-nodes';
import { PROJECTS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

interface PacketFlight {
  active: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  color: string;
  label: string;
}

export const TelemetryMissionControl: FC = () => {
  // Selected active node (default to DashResQ as apex anchor)
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  
  // Controls how many nodes are revealed (scroll / timeline sequence)
  const [visibleCount, setVisibleCount] = useState<number>(TELEMETRY_NODES.length);
  const [isAutoScanning, setIsAutoScanning] = useState<boolean>(false);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  // Packet animation state
  const [packet, setPacket] = useState<PacketFlight | null>(null);
  const [isConsoleDecoding, setIsConsoleDecoding] = useState<boolean>(false);
  const [consoleImpact, setConsoleImpact] = useState<boolean>(false);

  // Modal deep dive
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Live Console Feed Log
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "00:01 [INIT] Mission Control active · 8 distributed systems linked",
    "00:02 [APEX] DashResQ telemetry beacon online · 600 vitals/min",
    "00:03 [OCC_INDEX] idx_one_active_incident_per_user lock confirmed",
    "00:04 [RADAR] Ready for interactive telemetry transmission"
  ]);

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Filtered nodes
  const filteredNodes = TELEMETRY_NODES.filter(node => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'APEX') return node.weight >= 4.5;
    if (filterCategory === 'AI') return node.category.includes('AI') || node.category.includes('MULTI-AGENT');
    if (filterCategory === 'SYSTEMS') return node.category.includes('SAFETY') || node.category.includes('SYSTEMS') || node.category.includes('IOT');
    if (filterCategory === 'DSA') return node.category.includes('DSA');
    return true;
  });

  // Auto-scan cycle
  useEffect(() => {
    if (!isAutoScanning) return;
    const interval = setInterval(() => {
      setActiveNode(prev => {
        const nextIdx = (TELEMETRY_NODES.findIndex(n => n.id === prev.id) + 1) % TELEMETRY_NODES.length;
        const nextNode = TELEMETRY_NODES[nextIdx];
        handleNodeClick(nextNode);
        return nextNode;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoScanning]);

  // Handle clicking a node -> launches the telemetry packet to console
  const handleNodeClick = (node: TelemetryNode) => {
    if (packet?.active) return; // avoid collision during inflight transmission

    const startX = node.pos[0];
    const startY = node.pos[1];
    const targetX = 98; // right edge towards console
    const targetY = 32;

    setPacket({
      active: true,
      startX,
      startY,
      currentX: startX,
      currentY: startY,
      color: node.color,
      label: node.title
    });

    // Animate packet flight
    const startTime = performance.now();
    const duration = 650; // ms

    const animatePacket = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      
      // Eased trajectory
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currX = startX + (targetX - startX) * easeProgress;
      const currY = startY + (targetY - startY) * easeProgress;

      setPacket({
        active: true,
        startX,
        startY,
        currentX: currX,
        currentY: currY,
        color: node.color,
        label: node.title
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePacket);
      } else {
        // Impact at Console!
        setPacket(null);
        setConsoleImpact(true);
        setIsConsoleDecoding(true);
        setTimeout(() => setConsoleImpact(false), 400);

        // Update active node and logs
        setTimeout(() => {
          setActiveNode(node);
          setIsConsoleDecoding(false);
          const time = new Date().toISOString().substring(14, 19);
          setConsoleLogs(prev => [
            `${time} [INGEST] Decoded payload: ${node.title} · OCC Invariants verified`,
            `${time} [STREAM] Active lock acquired on node: ${node.tag}`,
            ...prev.slice(0, 8)
          ]);
        }, 320);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animatePacket);
  };

  // Open full project modal
  const openFullModal = (node: TelemetryNode) => {
    const proj = PROJECTS.find(p => p.id === node.projectId);
    if (proj) {
      setModalProject(proj);
    } else {
      // Fallback synthetic project for EY / DSA
      setModalProject({
        id: node.projectId,
        title: node.title,
        subtitle: node.subtitle,
        category: 'AI & LangGraph',
        status: 'Active Production Track',
        role: node.details.role,
        timeline: node.details.timeline,
        technologies: node.details.stack,
        metrics: [node.metricBadge],
        summary: node.subtitle + ". Architected with strict adherence to failure-mode analysis, verified retrieval, and boundary constraints.",
        architecturePoints: node.details.keyGuarantees,
        failureModes: [node.details.failureModeMitigation],
        liveUrl: node.details.liveUrl,
        githubUrl: node.details.githubUrl,
      });
    }
  };

  // Scroll handler to reveal points one by one
  useEffect(() => {
    const handleScroll = () => {
      if (!mapContainerRef.current) return;
      const rect = mapContainerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      
      // Calculate scroll progress through section (0 to 1)
      const topOffset = rect.top;
      if (topOffset < windowH * 0.85) {
        const progress = Math.min(1, Math.max(0, (windowH * 0.85 - topOffset) / (windowH * 0.7)));
        const count = Math.max(2, Math.ceil(progress * TELEMETRY_NODES.length));
        setVisibleCount(count);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="telemetry-grid" className="py-16 sm:py-24 border-b border-white/10 bg-[#07090F] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[350px] bg-rose-600/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-bold">TACTICAL RADAR · 360° LIVE SWEEP</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">DashResQ Primary Ingestion Engine</span>
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
              Distributed Systems Radar
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
              Every point on the grid represents an engineering architecture or benchmark. 
              <strong className="text-white"> Click any beacon</strong> to transmit its telemetry stream directly into the Main Command Console.
            </p>
          </div>

          {/* Quick Filters / Scrubber */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900/90 border border-slate-800">
            {['ALL', 'APEX', 'AI', 'SYSTEMS', 'DSA'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setIsAutoScanning(prev => !prev)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
                isAutoScanning
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title="Automate sequential telemetry transmission"
            >
              {isAutoScanning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              <span>{isAutoScanning ? 'Auto: ON' : 'Scan'}</span>
            </button>
          </div>
        </div>

        {/* ══ DUAL PANEL TACTICAL GRID (MAP + MAIN CONSOLE) ══ */}
        <div ref={mapContainerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── LEFT PANEL: THE TACTICAL SYSTEMS MAP (7 cols) ── */}
          <div className="lg:col-span-7 rounded-2xl bg-[#090C15]/90 border border-slate-800/90 relative overflow-hidden flex flex-col justify-between shadow-2xl min-h-[560px] sm:min-h-[620px]">
            
            {/* Tactical Map Header Bar */}
            <div className="px-5 py-3.5 border-b border-slate-800/80 bg-slate-950/70 flex items-center justify-between z-20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">
                  TELEMETRY SECTOR: 28°36'N 77°12'E
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                <span className="hidden sm:inline">NODES: {filteredNodes.slice(0, visibleCount).length}/{TELEMETRY_NODES.length} ACTIVE</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
              </div>
            </div>

            {/* Map Canvas with Grid Pattern & SVG Lines */}
            <div className="relative flex-1 w-full bg-grid-pattern overflow-hidden">
              
              {/* Radar Sweep Effect (Rotating 360° gradient beam) */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-25"
                style={{
                  background: 'conic-gradient(from 0deg at 50% 50%, rgba(99, 102, 241, 0.28) 0deg, transparent 65deg, transparent 360deg)',
                  animation: 'radarSweep 9s linear infinite',
                  borderRadius: '999px',
                  transformOrigin: '50% 50%',
                  scale: '1.4'
                }}
              />

              {/* Concentric distance range rings */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[280px] h-[280px] rounded-full border border-indigo-500/10" />
                <div className="w-[480px] h-[480px] rounded-full border border-indigo-500/10 absolute" />
                <div className="w-[680px] h-[680px] rounded-full border border-indigo-500/5 absolute" />
              </div>

              {/* Crosshair coordinate markers */}
              <div className="absolute left-6 top-6 font-mono text-[10px] text-slate-600 pointer-events-none">
                + SECTOR_01 // INGESTION_BUFFER
              </div>
              <div className="absolute right-6 bottom-6 font-mono text-[10px] text-slate-600 pointer-events-none">
                + SECTOR_02 // CONCURRENCY_LOCK
              </div>

              {/* SVG Network Topology Connections */}
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Static topology connections */}
                {TOPOLOGY_LINKS.map((link, idx) => {
                  const fromNode = TELEMETRY_NODES.find(n => n.id === link.from);
                  const toNode = TELEMETRY_NODES.find(n => n.id === link.to);
                  if (!fromNode || !toNode) return null;
                  return (
                    <line
                      key={idx}
                      x1={fromNode.pos[0]}
                      y1={fromNode.pos[1]}
                      x2={toNode.pos[0]}
                      y2={toNode.pos[1]}
                      stroke={link.color}
                      strokeWidth={0.5}
                      strokeDasharray={link.dash}
                      style={{ animation: 'rescueDash 3s linear infinite' }}
                    />
                  );
                })}

                {/* Inflight Packet Trajectory Beam (drawn when node is clicked) */}
                {packet && (
                  <g>
                    <path
                      d={`M ${packet.startX} ${packet.startY} Q ${(packet.startX + packet.currentX) / 2} ${Math.min(packet.startY, packet.currentY) - 8} ${packet.currentX} ${packet.currentY}`}
                      fill="none"
                      stroke={packet.color}
                      strokeWidth={1.2}
                      strokeDasharray="2 2"
                      opacity={0.8}
                    />
                    <circle
                      cx={packet.currentX}
                      cy={packet.currentY}
                      r={1.8}
                      fill={packet.color}
                      filter="drop-shadow(0 0 4px currentColor)"
                    />
                  </g>
                )}
              </svg>

              {/* ── INTERACTIVE TELEMETRY BEACONS / NODES ── */}
              {filteredNodes.slice(0, visibleCount).map((node) => {
                const isSelected = activeNode.id === node.id;
                const isApex = node.weight === 5;

                return (
                  <div
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    style={{
                      left: `${node.pos[0]}%`,
                      top: `${node.pos[1]}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute z-30 cursor-pointer group transition-all duration-300 select-none`}
                  >
                    {/* Multi-Ring Radar Pulses based on Weightage */}
                    <div className="relative flex items-center justify-center">
                      {node.radarRingCount >= 3 && (
                        <span 
                          className="absolute rounded-full border"
                          style={{
                            width: isApex ? 64 : 48,
                            height: isApex ? 64 : 48,
                            borderColor: node.color,
                            animation: `rescuePing ${node.pulseSpeed} cubic-bezier(0,0,0.2,1) infinite`,
                            opacity: 0.7
                          }} 
                        />
                      )}
                      {node.radarRingCount >= 2 && (
                        <span 
                          className="absolute rounded-full border"
                          style={{
                            width: isApex ? 46 : 36,
                            height: isApex ? 46 : 36,
                            borderColor: node.color,
                            animation: `rescuePing ${node.pulseSpeed} cubic-bezier(0,0,0.2,1) infinite 0.4s`,
                            opacity: 0.5
                          }} 
                        />
                      )}
                      
                      {/* Node Core Orb */}
                      <div
                        style={{
                          backgroundColor: node.color,
                          boxShadow: `0 0 20px ${node.glowColor}`,
                        }}
                        className={`rounded-full transition-transform duration-300 flex items-center justify-center font-bold text-white ${
                          isApex 
                            ? 'w-9 h-9 border-2 border-white ring-4 ring-rose-500/30' 
                            : node.weight >= 4 
                            ? 'w-7 h-7 border-2 border-white/80' 
                            : 'w-5 h-5 border border-white/70'
                        } ${isSelected ? 'scale-125 ring-4 ring-white/40' : 'group-hover:scale-110'}`}
                      >
                        {isApex && <Zap className="w-4 h-4 text-white fill-white" />}
                      </div>
                    </div>

                    {/* Node Tag & Callout Pill */}
                    <div 
                      className={`mt-2 transition-all duration-200 pointer-events-none text-center ${
                        isSelected ? 'scale-105 opacity-100' : 'opacity-85 group-hover:opacity-100'
                      }`}
                    >
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-700/80 shadow-lg text-[10px] font-mono font-bold whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                        <span className="text-white">{node.title}</span>
                        {isApex && <span className="text-[9px] px-1 rounded bg-rose-500/20 text-rose-300 ml-0.5">APEX</span>}
                      </div>

                      {/* Vital Snippet for DashResQ / Flagships */}
                      {node.vitalSnippet && (
                        <div className="mt-1 hidden sm:block">
                          <span className="text-[9px] font-mono text-emerald-400 bg-black/80 px-2 py-0.5 rounded border border-emerald-500/30">
                            {node.vitalSnippet.value}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* ── MINI VITAL WATCH MONITOR (DASHRESQ SIGNATURE) ── */}
              <div className="absolute left-4 bottom-4 z-20 hidden md:block">
                <div className="p-3.5 rounded-xl bg-slate-950/85 border border-slate-800 backdrop-blur-md font-mono text-xs shadow-xl max-w-[210px]">
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pb-1.5 border-b border-slate-800">
                    <span className="font-bold text-rose-400">DRQ-04 VITAL WATCH</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                  </div>
                  <div className="mt-2 flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-white">142</span>
                    <span className="text-xs text-rose-400 font-bold">bpm</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">SpO2: 98% · Accelerometer: 4.2G</div>
                  <div className="mt-2 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-center">
                    OCC LOCK ACTIVE: ZERO LOST
                  </div>
                </div>
              </div>

            </div>

            {/* Tactical Map Footer Instructions */}
            <div className="px-5 py-3 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between text-xs font-mono text-slate-400 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                <span>TAP ANY BEACON TO TRANSMIT PAYLOAD TO CONSOLE</span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline">LATENCY: &lt;12ms</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: MAIN COMMAND CONSOLE (5 cols) ── */}
          <div 
            className={`lg:col-span-5 rounded-2xl bg-[#090C15] border flex flex-col justify-between shadow-2xl transition-all duration-300 ${
              consoleImpact 
                ? 'border-indigo-400 ring-4 ring-indigo-500/30' 
                : 'border-slate-800'
            }`}
          >
            {/* Console Header Bar with Ingestion Status */}
            <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-extrabold uppercase tracking-wider text-white">
                    MAIN COMMAND CONSOLE
                  </h3>
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
                    <span>PORT 8000</span>
                    <span>•</span>
                    <span className={isConsoleDecoding ? "text-amber-400 animate-pulse" : "text-emerald-400"}>
                      {isConsoleDecoding ? "DECODING TELEMETRY..." : "TELEMETRY LINKED"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Tag */}
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-slate-800 text-indigo-300 border border-slate-700">
                {activeNode.tag}
              </span>
            </div>

            {/* Console Body: Render Project Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between overflow-y-auto max-h-[500px]">
              <div>
                {/* Node Category & Status */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
                    {activeNode.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    {activeNode.details.timeline}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-2xl font-extrabold text-white tracking-tight">
                  {activeNode.title}
                </h4>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed font-medium">
                  {activeNode.subtitle}
                </p>

                {/* Role Pill */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs font-mono text-slate-300">
                  <span className="text-slate-500">Role:</span>
                  <span className="text-emerald-400 font-bold">{activeNode.details.role}</span>
                </div>

                {/* Metric Banner */}
                <div className="mt-4 p-3 rounded-xl bg-black/60 border border-slate-800 font-mono text-xs text-emerald-400 font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{activeNode.metricBadge}</span>
                </div>

                {/* Key Architectural Invariants */}
                <div className="mt-5 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Architectural Guarantees</span>
                  </div>
                  {activeNode.details.keyGuarantees.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Failure Mode Defense */}
                <div className="mt-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs font-mono text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-400">DEFENSE: </span>
                  {activeNode.details.failureModeMitigation}
                </div>

                {/* Tech Chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {activeNode.details.stack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => openFullModal(activeNode)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-bold text-white transition-all shadow-md shadow-indigo-600/30 cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect Full System Design</span>
                  </button>

                  {activeNode.id === 'dashresq' && (
                    <a
                      href="#architecture"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-mono font-semibold text-slate-300 hover:text-white transition-all"
                    >
                      <Workflow className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Architecture Flow ↓</span>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {activeNode.details.githubUrl && (
                    <a
                      href={activeNode.details.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Source Code"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {activeNode.details.liveUrl && (
                    <a
                      href={activeNode.details.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                      title="Live System"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Live Event Log Stream (Console Footer) */}
            <div className="px-5 py-3 border-t border-slate-800 bg-black/60 font-mono text-[11px] text-slate-400">
              <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider mb-1.5">
                <span>Ingestion Event Stream</span>
                <span className="text-emerald-400">OCC: STRICT</span>
              </div>
              <div className="space-y-1 max-h-[64px] overflow-hidden text-[10px]">
                {consoleLogs.slice(0, 3).map((log, i) => (
                  <div key={i} className="truncate text-slate-400">
                    {log}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Deep-dive Project Architecture Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  );
};

