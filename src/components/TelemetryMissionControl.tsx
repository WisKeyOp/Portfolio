import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import { 
  ShieldCheck, 
  Radio, 
  Cpu, 
  Award, 
  Briefcase, 
  ExternalLink, 
  CheckCircle2,
  Trophy,
  ArrowDown,
  Activity,
  Zap,
  RefreshCw,
  Building,
  GraduationCap,
  MapPin,
  Network
} from 'lucide-react';
import { TELEMETRY_NODES, TOPOLOGY_LINKS } from '../data/telemetry-nodes';
import type { TelemetryNode } from '../data/telemetry-nodes';
import { PROJECTS, EXPERIENCES, COMPETITIVE_STATS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const TelemetryMissionControl: FC = () => {
  const [activeNode, setActiveNode] = useState<TelemetryNode>(TELEMETRY_NODES[0]);
  const [filterKind, setFilterKind] = useState<'all' | 'project' | 'experience' | 'achievement'>('all');
  const [viewMode, setViewMode] = useState<'topology' | 'geographic'>('topology');
  const [hoveredNode, setHoveredNode] = useState<TelemetryNode | null>(null);
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [isSimulatingSpike, setIsSimulatingSpike] = useState(false);
  const [occCollisionsCaught, setOccCollisionsCaught] = useState(14);

  const ecgCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Match active node to complete rich data
  const matchedProject = PROJECTS.find((p) => p.id === activeNode.projectId);
  const matchedExperience = EXPERIENCES.find((e) => 
    activeNode.projectId.includes('ey') ? e.company.includes('EY') : 
    activeNode.projectId.includes('career') ? e.company.includes('Veda') : false
  );

  const handleSelectNode = (node: TelemetryNode) => {
    setActiveNode(node);
  };

  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenSpec = () => {
    if (matchedProject) {
      setModalProject(matchedProject);
    } else {
      const fallbackProject: Project = {
        id: activeNode.projectId,
        title: activeNode.title,
        subtitle: activeNode.subtitle,
        category: activeNode.kind === 'experience' ? 'Full-Stack & Systems' : activeNode.kind === 'achievement' ? 'Full-Stack & Systems' : 'Safety-Critical & IoT',
        status: 'Verified & Active',
        role: activeNode.details.role,
        timeline: activeNode.details.timeline,
        technologies: activeNode.details.stack,
        metrics: [activeNode.metricBadge],
        summary: activeNode.subtitle,
        architecturePoints: activeNode.details.keyGuarantees,
        failureModes: [activeNode.details.failureModeMitigation],
        liveUrl: activeNode.details.liveUrl,
        githubUrl: activeNode.details.githubUrl,
      };
      setModalProject(fallbackProject);
    }
  };

  // 60 FPS Canvas Lead-II ECG Waveform Trace (Scoped exclusively to DashResQ)
  useEffect(() => {
    if (activeNode.projectId !== 'dashresq') return;

    const canvas = ecgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    const buffer: number[] = new Array(canvas.width).fill(canvas.height / 2);

    const render = () => {
      step = (step + 1) % 110;
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      let val = mid;
      if (step === 18) val = mid - 3;
      else if (step === 22) val = mid + 2;
      else if (step === 34) val = mid + 5;
      else if (step === 38) val = isSimulatingSpike ? mid - 30 : mid - 22;
      else if (step === 42) val = isSimulatingSpike ? mid + 16 : mid + 10;
      else if (step === 54) val = mid - 6;
      else {
        val = mid + (Math.random() - 0.5) * 1.5;
      }

      buffer.push(val);
      if (buffer.length > w) buffer.shift();

      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, w, h);

      // Fine grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 18) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 18) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Crisp waveform trace: Nominal var(--lime) [#cbff3a], Shock Spike var(--flame) [#ff4a17]
      ctx.beginPath();
      ctx.strokeStyle = isSimulatingSpike ? '#ff4a17' : '#cbff3a';
      ctx.lineWidth = 1.75;
      ctx.shadowBlur = 0;

      for (let i = 0; i < buffer.length; i++) {
        if (i === 0) ctx.moveTo(i, buffer[i]);
        else ctx.lineTo(i, buffer[i]);
      }
      ctx.stroke();

      // Leading beacon head
      const lastX = buffer.length - 1;
      const lastY = buffer[lastX];
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 2, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [activeNode.projectId, isSimulatingSpike]);

  const handleSimulateSpike = () => {
    setIsSimulatingSpike(true);
    setTimeout(() => setIsSimulatingSpike(false), 3800);
  };

  const handleTestOCC = () => {
    setOccCollisionsCaught((prev) => prev + 1);
  };

  return (
    <div className="w-full rounded-[var(--round)] bg-[var(--card)] border border-[var(--line)] overflow-hidden shadow-[var(--shadow-md)] font-sans text-[var(--ink)]">
      {/* Top Header Control Toolbar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between border-b border-[var(--line)] px-5 sm:px-8 py-5 bg-[var(--paper)]/60 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-[var(--flame)] shrink-0">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold tracking-tight text-[var(--ink)]">
                Systems Architecture & Network Topology
              </h3>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[var(--paper)] text-[var(--slate)] border border-[var(--line)]">
                TOPOLOGY ACTIVE // 9 NODES
              </span>
            </div>
            <p className="text-xs text-[var(--slate)] font-mono mt-0.5">
              Interactive distributed service topology · Node area ∝ complexity, throughput, and algorithmic rank
            </p>
          </div>
        </div>

        {/* View Switcher & Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Topology vs Geographical Network Mode */}
          <div className="flex items-center p-1 bg-[var(--card)] rounded-xl border border-[var(--line)]">
            <button
              onClick={() => setViewMode('topology')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'topology'
                  ? 'bg-[var(--flame)] text-white font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)]'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              <span>Service Mesh</span>
            </button>
            <button
              onClick={() => setViewMode('geographic')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'geographic'
                  ? 'bg-[var(--flame)] text-white font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Geo Anchors</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1 p-1 bg-[var(--card)] rounded-xl border border-[var(--line)] overflow-x-auto">
            <button
              onClick={() => setFilterKind('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap cursor-pointer ${
                filterKind === 'all'
                  ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
              }`}
            >
              All Entities (9)
            </button>
            <button
              onClick={() => setFilterKind('project')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                filterKind === 'project'
                  ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Projects (6)</span>
            </button>
            <button
              onClick={() => setFilterKind('experience')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                filterKind === 'experience'
                  ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
              }`}
            >
              <Briefcase className="w-3 h-3" />
              <span>Work Ex (2)</span>
            </button>
            <button
              onClick={() => setFilterKind('achievement')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                filterKind === 'achievement'
                  ? 'bg-[var(--ink)] text-[var(--paper)] font-semibold shadow-sm'
                  : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--paper)]'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>DSA Rigor (1)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Systems Architecture Network (Left) + Editorial Showcase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* Left Column: Interactive Topology Screen */}
        <div className="lg:col-span-7 relative bg-[var(--coal)] border-b lg:border-b-0 lg:border-r border-[var(--line)] min-h-[480px] sm:min-h-[560px] p-6 flex items-center justify-center overflow-hidden select-none">
          {/* Subtle Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none" 
            style={{ 
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', 
              backgroundSize: '24px 24px' 
            }} 
          />

          {/* SVG Network Edges & Topological Interconnects */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Concentric Architectural Boundary Circles */}
            <circle cx="50" cy="50" r="18" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.35" />
            <circle cx="50" cy="50" r="32" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.35" strokeDasharray="1 3" />
            <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.35" />

            {/* Topology Vectors */}
            {TOPOLOGY_LINKS.map((link, idx) => {
              const src = TELEMETRY_NODES.find((n) => n.id === link.from);
              const dst = TELEMETRY_NODES.find((n) => n.id === link.to);
              if (!src || !dst) return null;

              const isLinkActive = activeNode.id === src.id || activeNode.id === dst.id;

              return (
                <g key={idx}>
                  <line
                    x1={src.pos[0]}
                    y1={src.pos[1]}
                    x2={dst.pos[0]}
                    y2={dst.pos[1]}
                    stroke={isLinkActive ? 'var(--flame)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isLinkActive ? '0.75' : '0.35'}
                    strokeDasharray={link.dash}
                    strokeOpacity={isLinkActive ? 0.95 : 0.4}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central System Core Identifier */}
          <div className="absolute top-4 left-6 text-xs font-mono text-[var(--smoke)] pointer-events-none flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
            <span>DISTRIBUTED BACKEND BOUNDARY (:8000 & :8001)</span>
          </div>

          {/* Geographic Hubs Overlay (Minimal Swiss Editorial) */}
          {viewMode === 'geographic' && (
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6">
              <div className="flex justify-between items-start text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-[var(--void)]/85 border border-[var(--line-dark)] text-[var(--smoke)] backdrop-blur-md">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <Building className="w-3.5 h-3.5 text-[var(--lime)]" />
                    <span>PUNE, MAHARASHTRA</span>
                  </div>
                  <div className="text-[10px] text-[var(--smoke)] mt-0.5">Ernst & Young (EY) · Enterprise GenAI</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--void)]/85 border border-[var(--line-dark)] text-[var(--smoke)] backdrop-blur-md">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <GraduationCap className="w-3.5 h-3.5 text-[var(--flame)]" />
                    <span>RANCHI, JHARKHAND</span>
                  </div>
                  <div className="text-[10px] text-[var(--smoke)] mt-0.5">BIT Mesra (B.Tech CSE) · Algo Rigor</div>
                </div>
              </div>

              <div className="flex justify-between items-end text-[11px] font-mono">
                <div className="p-2.5 rounded-lg bg-[var(--void)]/85 border border-[var(--line-dark)] text-[var(--smoke)] backdrop-blur-md">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <MapPin className="w-3.5 h-3.5 text-[var(--lime)]" />
                    <span>LUCKNOW, U.P.</span>
                  </div>
                  <div className="text-[10px] text-[var(--smoke)] mt-0.5">Hometown / Base Coordinates</div>
                </div>

                <div className="p-2.5 rounded-lg bg-[var(--void)]/85 border border-[var(--line-dark)] text-[var(--smoke)] backdrop-blur-md">
                  <div className="font-bold flex items-center gap-1.5 text-white">
                    <Cpu className="w-3.5 h-3.5 text-[var(--flame)]" />
                    <span>CLOUD EDGE INFRA</span>
                  </div>
                  <div className="text-[10px] text-[var(--smoke)] mt-0.5">FastAPI · Azure APIM · Neon · Redis</div>
                </div>
              </div>
            </div>
          )}

          {/* Interactive Crisp Architectural Nodes */}
          <div className="absolute inset-0">
            {TELEMETRY_NODES.map((node) => {
              const isSelected = activeNode.id === node.id;
              const isDimmed = filterKind !== 'all' && node.kind !== filterKind;

              return (
                <div
                  key={node.id}
                  onClick={() => handleSelectNode(node)}
                  onMouseEnter={() => setHoveredNode(node)}
                  onMouseLeave={() => setHoveredNode(null)}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-200 pointer-events-auto ${
                    isDimmed ? 'opacity-20 hover:opacity-75' : 'opacity-100'
                  }`}
                  style={{
                    left: `${node.pos[0]}%`,
                    top: `${node.pos[1]}%`,
                    zIndex: isSelected ? 40 : node.weight * 6,
                  }}
                  role="button"
                  aria-label={`Select ${node.title}`}
                >
                  {/* Clean Selected Ring (Zero Glow Blur) */}
                  {isSelected && (
                    <span 
                      className="absolute inset-0 rounded-full pointer-events-none scale-125"
                      style={{
                        border: '1.5px solid var(--flame)',
                      }}
                    />
                  )}

                  {/* Core Proportional Dot */}
                  <div
                    className="relative flex items-center justify-center rounded-full transition-transform duration-200"
                    style={{
                      width: `${node.dotSize}px`,
                      height: `${node.dotSize}px`,
                      backgroundColor: isSelected 
                        ? 'var(--flame)' 
                        : (node.projectId === 'dashresq' ? 'var(--flame)' : (node.kind === 'experience' ? 'var(--lime)' : '#27272a')),
                      border: isSelected 
                        ? '2px solid #ffffff' 
                        : '1.5px solid rgba(255,255,255,0.25)',
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>

                  {/* Node Title & Port Tag */}
                  <div 
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 text-center whitespace-nowrap pointer-events-none transition-opacity duration-200 ${
                      isSelected ? 'opacity-100' : 'opacity-80'
                    }`}
                  >
                    <p className="text-[11px] font-bold font-mono tracking-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      {node.title}
                    </p>
                    <p className="text-[9px] font-mono px-2 py-0.5 rounded-full inline-block mt-0.5 border border-white/10 bg-black/85 text-[var(--smoke)]">
                      {node.portLabel || node.tag}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Hover Tooltip Overlay */}
          {hoveredNode && (
            <div className="absolute top-4 right-4 z-50 p-3.5 rounded-xl bg-[var(--void)]/95 backdrop-blur-md border border-[var(--line-dark)] text-xs text-[var(--smoke)] shadow-2xl pointer-events-none max-w-[280px]">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--smoke)] mb-1">
                <span className="w-2 h-2 rounded-full bg-[var(--flame)]" />
                <span>{hoveredNode.category}</span>
              </div>
              <p className="text-white font-bold text-sm">{hoveredNode.title}</p>
              <p className="text-[var(--smoke)] text-xs mt-0.5 line-clamp-2">{hoveredNode.subtitle}</p>
              {hoveredNode.locationHub && (
                <div className="mt-1.5 text-[10px] font-mono text-[var(--slate)]">
                  📍 {hoveredNode.locationHub}
                </div>
              )}
              <div className="mt-2 pt-2 border-t border-[var(--line-dark)] text-[10px] font-mono text-[var(--lime)] font-semibold">
                {hoveredNode.metricBadge}
              </div>
            </div>
          )}

          {/* Quiet 1-Line Legend Strip Beneath Canvas */}
          <div className="absolute bottom-3 left-6 right-6 z-30 flex items-center justify-between text-[10px] font-mono text-[var(--smoke)] bg-[var(--void)]/85 backdrop-blur-sm border border-[var(--line-dark)] px-3.5 py-1.5 rounded-lg">
            <span>● Proportional Node Scale: Area ∝ Complexity & Throughput</span>
            <span className="hidden sm:inline">Active: <span className="text-[var(--flame)] font-bold">{activeNode.title}</span></span>
          </div>
        </div>

        {/* Right Column: Integrated Editorial Mission Control Station */}
        <div className="lg:col-span-5 flex flex-col bg-[var(--card)] p-5 sm:p-7 justify-between overflow-y-auto">
          {/* SECTION A: WHEN A PROJECT IS CLICKED */}
          {activeNode.kind === 'project' && (
            <div className="space-y-4">
              {/* Category & Status Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--flame)] border border-[var(--line)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--flame)]" />
                  {activeNode.category}
                </span>
                <span className="text-xs font-mono text-[var(--slate)]">
                  {matchedProject?.timeline || activeNode.details.timeline}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {activeNode.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--slate)] mt-1 font-sans leading-relaxed">
                  {activeNode.subtitle}
                </p>
              </div>

              {/* DUAL DISPLAY: ECG MONITOR FOR DASHRESQ, CLEAN METRICS STRIP FOR ALL OTHERS */}
              {activeNode.projectId === 'dashresq' ? (
                <div className="rounded-xl border border-[var(--line)] bg-[#0a0a0a] p-3 overflow-hidden">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1.5">
                    <span className="flex items-center gap-1.5 text-[var(--lime)] font-bold">
                      <Activity className="w-3.5 h-3.5" />
                      LIVE LEAD-II ECG HUD // 600 VITALS/MIN
                    </span>
                    <span className="text-white font-mono font-bold">
                      {isSimulatingSpike ? 'SPIKE 168 BPM (5.4G)' : '142 BPM (NOMINAL)'}
                    </span>
                  </div>
                  <canvas
                    ref={ecgCanvasRef}
                    width={340}
                    height={68}
                    className="w-full h-[68px] rounded bg-[#0a0a0a]"
                  />
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={handleSimulateSpike}
                      disabled={isSimulatingSpike}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-[var(--paper)] hover:bg-[var(--line)]/10 border border-[var(--line)] text-[var(--flame)] text-[11px] font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      <Zap className="w-3 h-3" />
                      <span>{isSimulatingSpike ? 'Shock Sensed...' : 'Inject 5.4G Shock Spike'}</span>
                    </button>
                    <button
                      onClick={handleTestOCC}
                      className="flex-1 py-1.5 px-2.5 rounded-lg bg-[var(--paper)] hover:bg-[var(--line)]/10 border border-[var(--line)] text-[var(--ink)] text-[11px] font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Test OCC Dedup ({occCollisionsCaught})</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--slate)] font-bold">
                      PRIMARY PRODUCTION METRIC
                    </span>
                    <div className="text-sm font-mono font-bold text-[var(--ink)]">
                      {activeNode.metricBadge}
                    </div>
                    {activeNode.vitalSnippet && (
                      <p className="text-[11px] text-[var(--slate)] font-mono">
                        {activeNode.vitalSnippet.subtext}
                      </p>
                    )}
                  </div>
                  <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--slate)] font-bold">
                      NETWORK PORT & RUNTIME
                    </span>
                    <div className="text-sm font-mono font-bold text-[var(--flame)]">
                      {activeNode.portLabel || activeNode.tag}
                    </div>
                    <p className="text-[11px] text-[var(--slate)] font-mono">
                      {activeNode.locationHub || 'Distributed Cluster'}
                    </p>
                  </div>
                </div>
              )}

              {/* Tags with Subtle Bullet Dots */}
              <div className="wcard__tags">
                {(matchedProject?.tags || activeNode.details.stack.slice(0, 4)).map((tag) => (
                  <span key={tag}>
                    <i aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>

              {/* Key Invariant & Failure Mode Shield */}
              <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--flame)]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DETERMINISTIC ARCHITECTURAL INVARIANT</span>
                </div>
                <p className="text-xs text-[var(--slate)] font-sans leading-relaxed">
                  {activeNode.details.failureModeMitigation}
                </p>
              </div>

              {/* Actions & Integration Navigation */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={handleOpenSpec}
                  className="btn-primary text-xs !py-2.5 !px-4 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Explore Architecture Spec</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                {activeNode.details.liveUrl && (
                  <a
                    href={activeNode.details.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-cv text-xs !py-2.5 !px-4 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Launch Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeNode.details.githubUrl && (
                  <a
                    href={activeNode.details.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--card)] text-[var(--slate)] hover:text-[var(--ink)] transition-colors cursor-pointer shrink-0"
                    title="Source Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}

          {/* SECTION B: WHEN WORK EXPERIENCE IS CLICKED */}
          {activeNode.kind === 'experience' && (
            <div className="space-y-4">
              {/* Category & Status Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--lime)] border border-[var(--line)] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
                  ENTERPRISE WORK EXPERIENCE
                </span>
                <span className="text-xs font-mono text-[var(--slate)]">
                  {matchedExperience?.period || activeNode.details.timeline}
                </span>
              </div>

              {/* Company & Role */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {matchedExperience?.company || activeNode.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--slate)] mt-1 font-mono font-medium flex items-center gap-2">
                  <span>{matchedExperience?.role || activeNode.details.role}</span>
                  <span>—</span>
                  <span className="text-[var(--ink)] font-bold">Pune, India</span>
                </p>
              </div>

              {/* Achievements Highlights */}
              <div className="space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--slate)] font-bold">Key Production Impact:</p>
                {(matchedExperience?.achievements || activeNode.details.keyGuarantees).slice(0, 3).map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[var(--slate)] bg-[var(--paper)] p-2.5 rounded-xl border border-[var(--line)] leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[var(--lime)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Stack Chips */}
              <div className="voice__stack">
                {(matchedExperience?.stack || activeNode.details.stack).map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>

              {/* Actions: Jump to Experience */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <button
                  onClick={() => handleJumpToSection('experience')}
                  className="btn-primary text-xs !py-2.5 !px-5 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>View in Production History</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleOpenSpec}
                  className="btn-cv text-xs !py-2.5 !px-4 w-full sm:w-auto flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Specification Dossier</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* SECTION C: WHEN AN ACHIEVEMENT IS CLICKED */}
          {activeNode.kind === 'achievement' && (
            <div className="space-y-4">
              {/* Category & Status Header */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--paper)] text-[var(--flame)] border border-[var(--line)] flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[var(--flame)]" />
                  COMPETITIVE DSA & HACKATHON HONORS
                </span>
                <span className="text-xs font-mono text-[var(--slate)]">
                  Top 4.67% Global
                </span>
              </div>

              {/* Title & Refusal Mandate */}
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {activeNode.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--slate)] mt-1 font-sans leading-relaxed">
                  Algorithmic efficiency is an engineering reflex. Before writing any loop, approach, Time Complexity, and Space Complexity are verified.
                </p>
              </div>

              {/* Competitive Stats Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                {COMPETITIVE_STATS.map((stat, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[var(--slate)]">{stat.platform}</span>
                        <a href={stat.url} target="_blank" rel="noreferrer" className="text-[var(--slate)] hover:text-[var(--ink)]">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-xl font-extrabold font-mono text-[var(--ink)]">{stat.rating}</span>
                        <span className="text-[11px] font-mono text-[var(--flame)] font-bold">{stat.rank}</span>
                      </div>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-[var(--slate)]">
                      Percentile: <strong className="text-[var(--ink)]">{stat.percentile}</strong>
                    </div>
                  </div>
                ))}
              </div>

              {/* National Hackathon Honors Box */}
              <div className="p-3.5 rounded-xl bg-[var(--paper)] border border-[var(--line)] space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--flame)]">
                  <Award className="w-4 h-4" />
                  <span>NATIONAL TECHNOLOGY HONORS</span>
                </div>
                <p className="text-xs text-[var(--slate)] leading-relaxed">
                  • <strong>Adobe India Hackathon Semifinalist</strong> — Top 4K teams of 260K+ participants.<br/>
                  • <strong>Tata Imagination Challenge</strong> — Semifinalist in national flagship innovation challenge.
                </p>
              </div>

              {/* Actions: Jump to Axioms & Profile Links */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                <a
                  href="https://leetcode.com/u/ecarte/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary text-xs !py-2.5 !px-5 w-full sm:w-auto flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>LeetCode Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://codeforces.com/profile/nobitalovesshizuka"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-cv text-xs !py-2.5 !px-4 w-full sm:w-auto flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Codeforces Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleJumpToSection('axioms')}
                  className="p-2.5 rounded-xl border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--card)] text-[var(--slate)] hover:text-[var(--ink)] transition-colors cursor-pointer shrink-0"
                  title="Review Complexity Axioms"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Systems Telemetry Footer */}
          <div className="mt-5 pt-3.5 border-t border-[var(--line)] flex items-center justify-between text-[11px] font-mono text-[var(--slate)]">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
              <span>OCC Invariant Active // Zero Lost Dispatches</span>
            </div>
            <span className="text-[var(--flame)] font-semibold">2,584 Passing CI Tests</span>
          </div>
        </div>
      </div>

      {/* Project / Architecture Specification Modal */}
      <ProjectModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
};
