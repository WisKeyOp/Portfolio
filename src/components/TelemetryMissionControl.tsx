import { useState, useRef } from 'react';
import type { FC } from 'react';
import { 
  Activity, 
  Terminal, 
  ExternalLink, 
  ShieldCheck, 
  CheckCircle2, 
  Maximize2,
  Workflow,
  Radio,
  Cpu,
  Layers,
  HeartPulse,
  Flame,
  Code
} from 'lucide-react';
import { TELEMETRY_NODES } from '../data/telemetry-nodes';
import type { TelemetryNode } from '../data/telemetry-nodes';
import { PROJECTS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

// Esri Gray Canvas tile URLs used in DashResQ
const ARCGIS = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas";
const tileUrl = (x: number, y: number): string =>
  `${ARCGIS}/World_Dark_Gray_Base/MapServer/tile/13/${y}/${x}`;
const labelUrl = (x: number, y: number): string =>
  `${ARCGIS}/World_Dark_Gray_Reference/MapServer/tile/13/${y}/${x}`;

const TILES = [
  { key: "tl", x: 5851, y: 3415, left: 0, top: 0 },
  { key: "tr", x: 5852, y: 3415, left: "50%", top: 0 },
  { key: "bl", x: 5851, y: 3416, left: 0, top: "50%" },
  { key: "br", x: 5852, y: 3416, left: "50%", top: "50%" },
];

// Clean DashResQ color palette
const DRQ = {
  page: "#07090F",
  card: "#151B28",
  line: "rgba(148, 163, 184, 0.18)",
  brand: "#3C46D1",
  fg: "#F1F4FA",
  fg2: "#8692A6",
  fg3: "#8692A6",
  mapVeil: "rgba(10, 14, 28, 0.38)",
  red: "#EF4444",
  redText: "#F87171",
  green: "#10B981",
  greenText: "#10B981",
  amber: "#F59E0B",
  amberText: "#F59E0B",
  blue: "#1D4ED8",
  blueText: "#60A5FA",
};

interface CleanFeedItem {
  id: string;
  time: string;
  tag: string;
  text: string;
  color: string;
}

export const TelemetryMissionControl: FC = () => {
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [packetPos, setPacketPos] = useState<{ x: number; y: number; color: string } | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const [feedLogs, setFeedLogs] = useState<CleanFeedItem[]>([
    { id: '1', time: '00:01', tag: 'ENGINE', text: 'DashResQ Apex engine online · 600 vitals/min streaming', color: DRQ.brand },
    { id: '2', time: '00:02', tag: 'OCC LOCK', text: 'idx_one_active_incident_per_user lock enforced', color: DRQ.greenText },
    { id: '3', time: '00:03', tag: 'ROUTER', text: '8 production distributed systems linked in sector', color: DRQ.blueText },
  ]);

  const animationFrameRef = useRef<number | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);

  // Filter nodes
  const filteredNodes = TELEMETRY_NODES.filter(node => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'APEX') return node.weight >= 4.5;
    if (filterCategory === 'AI') return node.category.includes('AI');
    if (filterCategory === 'SYSTEMS') return node.category.includes('SAFETY') || node.category.includes('SYSTEMS');
    if (filterCategory === 'DSA') return node.category.includes('DSA');
    return true;
  });

  // Handle clicking a node -> clean packet dot travels along connection into console
  const handleNodeClick = (node: TelemetryNode) => {
    if (packetPos) return; // avoid concurrent collisions

    const startX = node.pos[0];
    const startY = node.pos[1];
    const targetX = 38; // center engine
    const targetY = 28;

    const startTime = performance.now();
    const duration = 550; // ms

    const animatePacket = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);

      const curX = startX + (targetX - startX) * ease;
      const curY = startY + (targetY - startY) * ease;

      setPacketPos({ x: curX, y: curY, color: node.color });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animatePacket);
      } else {
        setPacketPos(null);
        setActiveNode(node);

        const time = new Date().toISOString().substring(14, 19);
        setFeedLogs(prev => [
          {
            id: String(Date.now()),
            time,
            tag: node.tag,
            text: `Decoded payload for ${node.title} · OCC Invariants verified`,
            color: node.color
          },
          ...prev.slice(0, 7)
        ]);

        if (window.innerWidth < 1024) {
          consoleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }
    };

    animationFrameRef.current = requestAnimationFrame(animatePacket);
  };

  const openFullModal = (node: TelemetryNode) => {
    const proj = PROJECTS.find(p => p.id === node.projectId);
    if (proj) {
      setModalProject(proj);
    } else {
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
        summary: `${node.subtitle}. Built under rigorous failure-mode constraints with deterministic concurrency controls.`,
        architecturePoints: node.details.keyGuarantees,
        failureModes: [node.details.failureModeMitigation],
        liveUrl: node.details.liveUrl,
        githubUrl: node.details.githubUrl,
      });
    }
  };

  // Node Icons mapped cleanly
  const getNodeIcon = (id: string) => {
    switch (id) {
      case 'dashresq':
        return <Activity className="w-5 h-5 text-rose-400" />;
      case 'ey-infra':
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case 'bitaid':
        return <HeartPulse className="w-5 h-5 text-purple-400" />;
      case 'dsa-rigor':
        return <Code className="w-5 h-5 text-emerald-400" />;
      case 'mediconnect':
        return <Layers className="w-5 h-5 text-sky-400" />;
      case 'knowledge-bridge':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'rapaid':
        return <Flame className="w-5 h-5 text-orange-400" />;
      default:
        return <Terminal className="w-5 h-5 text-slate-300" />;
    }
  };

  return (
    <section id="projects" className="py-16 sm:py-20 border-b border-white/5 bg-[#07090F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B28] border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
              <span className="text-[#10B981] font-bold">LIVE TELEMETRY · SECTOR 28°36'N</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">DashResQ Primary Ingestion Engine</span>
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-[#F1F4FA] tracking-tight">
              Distributed Systems Radar
            </h2>
            <p className="mt-1 text-sm text-[#8692A6] max-w-2xl">
              Clean geospatial mapping of production codebases and distributed backends. Click any beacon to transmit telemetry directly into the command console.
            </p>
          </div>

          {/* Clean Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)]">
            {['ALL', 'APEX', 'AI', 'SYSTEMS', 'DSA'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-[#3C46D1] text-white shadow-sm'
                    : 'text-[#8692A6] hover:text-[#F1F4FA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ══ DUAL PANEL TACTICAL MAP & FEED (DASHRESQ STANDARD) ══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* ── LEFT PANEL: THE CLEAN BASMAP MAP (7 cols) ── */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0D111A] border border-[rgba(148,163,184,0.18)] relative overflow-hidden flex flex-col justify-between shadow-xl min-h-[540px] sm:min-h-[580px]">
            
            {/* Real ArcGIS Dark Gray Tiles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {TILES.map(({ key, x, y, left, top }) => (
                <img
                  key={key}
                  src={tileUrl(x, y)}
                  alt=""
                  className="absolute w-1/2 h-1/2 object-cover opacity-85"
                  style={{ left, top }}
                />
              ))}
              {TILES.map(({ key, x, y, left, top }) => (
                <img
                  key={`label-${key}`}
                  src={labelUrl(x, y)}
                  alt=""
                  className="absolute w-1/2 h-1/2 object-cover opacity-75"
                  style={{ left, top }}
                />
              ))}
              {/* Subtle map veil overlay */}
              <div className="absolute inset-0 bg-[#0A0E1C]/40" />
            </div>

            {/* Map Top Bar */}
            <div className="px-5 py-3 border-b border-[rgba(148,163,184,0.18)] bg-[#07090F]/80 flex items-center justify-between z-20 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F1F4FA]">
                <Radio className="w-3.5 h-3.5 text-[#3C46D1] animate-pulse" />
                <span className="font-bold tracking-wider">GEOSPATIAL INGESTION MESH</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-[#8692A6]">
                <span>NODES: {filteredNodes.length}/8 ACTIVE</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              </div>
            </div>

            {/* SVG Connection Lines */}
            <div className="relative flex-1 w-full overflow-hidden">
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="none" 
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Lines from DashResQ central engine (38, 28) to other nodes */}
                {filteredNodes.filter(n => n.id !== 'dashresq').map((n) => (
                  <line
                    key={n.id}
                    x1={38}
                    y1={28}
                    x2={n.pos[0]}
                    y2={n.pos[1]}
                    stroke="rgba(148, 163, 184, 0.25)"
                    strokeWidth={0.8}
                    strokeDasharray="3 4"
                    style={{ animation: 'rescueDash 2s linear infinite' }}
                  />
                ))}

                {/* Flying Telemetry Packet */}
                {packetPos && (
                  <circle
                    cx={packetPos.x}
                    cy={packetPos.y}
                    r={2.2}
                    fill={packetPos.color}
                    stroke="#151B28"
                    strokeWidth={0.8}
                  />
                )}
              </svg>

              {/* ── CLEAN DASHRESQ BEACONS (SQUIRCLE CARDS) ── */}
              {filteredNodes.map((node) => {
                const isSelected = activeNode.id === node.id;
                const isApex = node.id === 'dashresq';

                return (
                  <div
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    style={{
                      left: `${node.pos[0]}%`,
                      top: `${node.pos[1]}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className="absolute z-20 cursor-pointer group select-none text-center"
                  >
                    {/* Squircle Node Box matching live-demo.tsx */}
                    <div 
                      className={`relative w-11 h-11 mx-auto rounded-2xl flex items-center justify-center transition-all duration-200 border ${
                        isSelected 
                          ? 'bg-[#151B28] border-[#3C46D1] ring-2 ring-[#3C46D1]/40 scale-110 shadow-lg' 
                          : 'bg-[#151B28] border-[rgba(148,163,184,0.22)] hover:border-slate-400 group-hover:scale-105'
                      }`}
                    >
                      {/* Subtle Ping */}
                      {isSelected && (
                        <span 
                          className="absolute inset-0 rounded-2xl border border-[#3C46D1]"
                          style={{ animation: 'rescuePing 2s ease-out infinite' }}
                        />
                      )}
                      
                      {getNodeIcon(node.id)}
                    </div>

                    {/* Clean Pill Label Below Node */}
                    <div className="mt-1.5 inline-block px-2.5 py-0.5 rounded-full bg-[#151B28] border border-[rgba(148,163,184,0.18)] shadow-md">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: node.color }} />
                        <span className="font-mono text-[9.5px] font-bold tracking-wider uppercase text-[#F1F4FA]">
                          {node.title}
                        </span>
                        {isApex && (
                          <span className="text-[8px] font-mono font-bold px-1 rounded bg-rose-500/20 text-rose-300 ml-0.5">
                            APEX
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* ── SIGNATURE DASHRESQ APPLE WATCH WIDGET ── */}
              <div className="absolute right-4 bottom-4 z-20 hidden sm:block">
                <div className="w-[172px] bg-[#151B28] border border-[rgba(148,163,184,0.18)] rounded-3xl p-3.5 shadow-xl font-mono relative">
                  {/* Digital crown representation */}
                  <div className="absolute right-[-4px] top-6 w-1 h-5 rounded-sm bg-slate-700" />
                  
                  <div className="text-[9.5px] font-bold tracking-wider uppercase text-center text-[#10B981]">
                    OCC LOCK ACTIVE
                  </div>
                  <div className="mt-2 text-center text-2xl font-bold text-[#F1F4FA]">
                    142<span className="text-xs text-[#8692A6] ml-1">bpm</span>
                  </div>
                  <div className="mt-0.5 text-center text-[10px] text-[#8692A6]">
                    4.2G Accel · SpO2 98%
                  </div>
                  <div className="mt-2.5 text-center py-1 rounded-full bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-[9.5px] font-bold text-slate-300">
                    DRQ-04 · LINKED
                  </div>
                </div>
              </div>

            </div>

            {/* Map Footer Bar */}
            <div className="px-5 py-2.5 border-t border-[rgba(148,163,184,0.18)] bg-[#07090F]/80 flex items-center justify-between text-xs font-mono text-[#8692A6] z-20">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3C46D1]" />
                <span>TAP ANY BEACON TO ROUTE TO FEED</span>
              </span>
              <span className="hidden sm:inline">LATENCY: &lt;14ms</span>
            </div>
          </div>

          {/* ── RIGHT PANEL: SYSTEM FEED & CONSOLE (5 cols) ── */}
          <div 
            ref={consoleRef}
            className="lg:col-span-5 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] flex flex-col justify-between shadow-xl"
          >
            {/* Console Header Bar */}
            <div className="p-4 sm:p-5 border-b border-[rgba(148,163,184,0.18)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#07090F] border border-[rgba(148,163,184,0.18)] flex items-center justify-center text-[#3C46D1]">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#F1F4FA]">
                    SYSTEM FEED & CONSOLE
                  </h3>
                  <div className="text-[10px] font-mono text-[#8692A6]">
                    PORT 8000 · OCC ENFORCED
                  </div>
                </div>
              </div>

              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded bg-[#07090F] text-indigo-300 border border-[rgba(148,163,184,0.18)]">
                {activeNode.tag}
              </span>
            </div>

            {/* Feed Stream (first 3 rows like live-demo) */}
            <div className="px-5 py-3 border-b border-[rgba(148,163,184,0.18)] bg-[#0A0E1A]/40 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#8692A6] uppercase tracking-wider pb-1 border-b border-[rgba(148,163,184,0.1)]">
                <span>Recent Ingestion Events</span>
                <span className="text-[#10B981]">STREAM LIVE</span>
              </div>
              {feedLogs.slice(0, 3).map((item) => (
                <div key={item.id} className="flex items-start gap-2.5 text-[11px] font-mono">
                  <span className="text-slate-500 w-10 flex-shrink-0">{item.time}</span>
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: item.color }} />
                  <div className="flex-1 truncate">
                    <span className="font-bold text-[#F1F4FA] mr-1.5">[{item.tag}]</span>
                    <span className="text-[#8692A6]">{item.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Active System Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between overflow-y-auto max-h-[460px]">
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-xs font-mono font-bold text-[#3C46D1] uppercase tracking-wider">
                    {activeNode.category}
                  </span>
                  <span className="text-xs font-mono text-[#8692A6]">
                    {activeNode.details.timeline}
                  </span>
                </div>

                <h4 className="text-2xl font-extrabold text-[#F1F4FA] tracking-tight">
                  {activeNode.title}
                </h4>
                <p className="mt-1 text-xs text-[#8692A6] leading-relaxed">
                  {activeNode.subtitle}
                </p>

                {/* Role Pill */}
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-xs font-mono text-slate-300">
                  <span className="text-[#8692A6]">Role:</span>
                  <span className="text-[#10B981] font-bold">{activeNode.details.role}</span>
                </div>

                {/* Benchmark Banner */}
                <div className="mt-4 p-3 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] font-mono text-xs text-[#10B981] font-semibold flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                  <span>{activeNode.metricBadge}</span>
                </div>

                {/* Architectural Guarantees */}
                <div className="mt-4 space-y-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#3C46D1]" />
                    <span>Architectural Invariants</span>
                  </div>
                  {activeNode.details.keyGuarantees.slice(0, 3).map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#F1F4FA] leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] mt-0.5 flex-shrink-0" />
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
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#07090F] text-[#8692A6] border border-[rgba(148,163,184,0.18)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.18)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => openFullModal(activeNode)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#3C46D1] hover:bg-[#343cb8] text-xs font-mono font-bold text-white transition-all shadow-md cursor-pointer"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Inspect System Design</span>
                  </button>

                  {activeNode.id === 'dashresq' && (
                    <a
                      href="#architecture"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#07090F] hover:bg-slate-800 text-xs font-mono font-semibold text-[#F1F4FA] transition-all"
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
                      className="p-2 rounded-lg border border-[rgba(148,163,184,0.18)] bg-[#07090F] hover:bg-slate-800 text-[#8692A6] hover:text-white transition-colors"
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
                      className="p-2 rounded-lg border border-[rgba(148,163,184,0.18)] bg-[#07090F] hover:bg-slate-800 text-[#8692A6] hover:text-white transition-colors"
                      title="Live Deployment"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
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
