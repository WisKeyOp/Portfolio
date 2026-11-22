import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { 
  ArrowLeft, 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Workflow
} from 'lucide-react';
import type { Project } from '../data/portfolio-data';
import { GithubIcon } from './Icons';
import { FlowDesignView } from './FlowDesignView';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

// Helper: parse metric string into primary bold claim and secondary technical qualifier
const parseMetric = (text: string) => {
  if (text.includes('·')) {
    const [p, s] = text.split('·');
    return { primary: p.trim(), secondary: s.trim() };
  }
  if (text.includes('&')) {
    const [p, s] = text.split('&');
    return { primary: p.trim(), secondary: s.trim() };
  }
  if (text.includes('with')) {
    const [p, s] = text.split('with');
    return { primary: p.trim(), secondary: s.trim() };
  }
  if (text.includes('via')) {
    const [p, s] = text.split('via');
    return { primary: p.trim(), secondary: s.trim() };
  }
  if (text.includes('across')) {
    const [p, s] = text.split('across');
    return { primary: p.trim(), secondary: s.trim() };
  }
  if (text.includes('under')) {
    const [p, s] = text.split('under');
    return { primary: p.trim(), secondary: `Under ${s.trim()}` };
  }
  const words = text.split(' ');
  if (words.length >= 3) {
    return {
      primary: words.slice(0, 3).join(' '),
      secondary: words.slice(3).join(' '),
    };
  }
  return { primary: text, secondary: 'Verified production floor' };
};

// Helper: parse failure mode into title and mitigation
const parseFailureMode = (text: string) => {
  const colonIndex = text.indexOf(':');
  if (colonIndex !== -1) {
    return {
      title: text.slice(0, colonIndex).trim(),
      mitigation: text.slice(colonIndex + 1).trim(),
    };
  }
  return {
    title: text,
    mitigation: '',
  };
};

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const [modalFlowType, setModalFlowType] = useState<'topology' | 'statemachine' | 'langgraph'>('topology');

  // Safe back navigation handler respecting browser history
  const handleClose = useCallback(() => {
    if (window.location.hash.startsWith('#project-')) {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  // Synchronize modal state with Browser History (popstate) & Keyboard (Escape)
  useEffect(() => {
    if (!project) return;

    const hash = `#project-${project.id}`;
    if (window.location.hash !== hash) {
      window.history.pushState({ modal: 'project', id: project.id }, '', hash);
    }

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, handleClose, onClose]);

  if (!project) return null;

  const isDashResQ = project.id.toLowerCase().includes('dashresq');

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Architectural Case Study`}
    >
      <style>{`
        @keyframes modalScaleIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>

      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#0A0A0C] border border-white/[0.08] shadow-2xl p-6 py-8 md:px-10 md:py-10 my-6 max-h-[92vh] overflow-y-auto text-left font-sans text-zinc-200 space-y-10 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* 1. STICKY HEADER BAR (SINGLE CLEAN SOURCE OF NAVIGATION) */}
        <div className="sticky top-0 -mx-6 md:-mx-10 -mt-8 md:-mt-10 px-6 md:px-10 py-4 bg-[#0A0A0C]/95 backdrop-blur-md border-b border-white/[0.08] flex items-center justify-between gap-3 z-30">
          {/* Left: Minimal Back Button */}
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors group cursor-pointer shrink-0"
            title="Return to portfolio (Esc or Browser Back)"
            autoFocus
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-zinc-400 group-hover:text-zinc-100" />
            <span className="hidden sm:inline">← Back to Portfolio</span>
            <span className="sm:hidden">← Back</span>
          </button>

          {/* Right: Understated Audit Dot + Source / Demo + Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
              PRODUCTION AUDITED
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.12] bg-white/[0.06] hover:bg-white/[0.12] !text-zinc-100 text-xs font-mono font-medium transition-colors cursor-pointer"
                title="Launch Live Production Application"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] !text-zinc-300 hover:!text-white text-xs font-mono transition-colors cursor-pointer"
                title="Inspect Source Code on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}

            <button
              onClick={handleClose}
              className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.05] transition-colors cursor-pointer"
              title="Close (ESC)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. HERO HEADER */}
        <div>
          {/* Muted Metadata Row */}
          <div className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 flex flex-wrap items-center gap-2">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year || project.timeline}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>

          {/* Large Crisp Title & Subtitle */}
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100 mt-2">
            {project.title}
          </h2>
          <p className="text-base text-zinc-400 mt-2 max-w-[65ch] leading-relaxed">
            {project.subtitle}
          </p>
        </div>

        {/* 3. KEY INVARIANTS / METRICS STRIP (4-COLUMN BENTO GRID) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {project.metrics.map((metric, i) => {
            const parsed = parseMetric(metric);
            return (
              <div 
                key={i} 
                className="p-4 rounded-xl bg-[#141418] border border-white/[0.07] text-left flex flex-col justify-between"
              >
                <div className="text-sm font-medium text-zinc-100 leading-snug">
                  {parsed.primary}
                </div>
                <div className="text-xs text-zinc-400 mt-1 leading-normal">
                  {parsed.secondary}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. ARCHITECTURE OVERVIEW (PROSE MEASURE MAX 65CH, NO SURROUNDING BOX) */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            Architecture Overview
          </h3>
          <p className="text-sm md:text-base text-zinc-300 max-w-[65ch] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* 5. INTERACTIVE ARCHITECTURAL FLOW (FLAGSHIP DASHRESQ) */}
        {isDashResQ && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-emerald-400/80" />
                <span>Interactive Architectural Flow</span>
              </h3>

              {/* Minimal Flow Switcher */}
              <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <button
                  onClick={() => setModalFlowType('topology')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    modalFlowType === 'topology'
                      ? 'bg-white/[0.1] text-zinc-100 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  Topology
                </button>
                <button
                  onClick={() => setModalFlowType('statemachine')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    modalFlowType === 'statemachine'
                      ? 'bg-white/[0.1] text-zinc-100 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  9-State OCC
                </button>
                <button
                  onClick={() => setModalFlowType('langgraph')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-md transition-colors ${
                    modalFlowType === 'langgraph'
                      ? 'bg-white/[0.1] text-zinc-100 font-medium'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  LangGraph DAG
                </button>
              </div>
            </div>

            {/* Quiet Flow Container */}
            <div className="rounded-xl border border-white/[0.08] bg-[#111114] p-4 overflow-hidden">
              <FlowDesignView type={modalFlowType} />
            </div>
          </div>
        )}

        {/* 6. TWO-COLUMN SPLIT: GUARANTEES & FAILURE MODES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-2">
          {/* Left: Deterministic Guarantees (Clean Hairlines, No Capsules) */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Deterministic Guarantees
            </h3>
            <div className="divide-y divide-white/[0.06]">
              {project.architecturePoints.map((point, i) => (
                <div 
                  key={i} 
                  className="py-3 first:pt-0 last:pb-0 text-sm text-zinc-300 leading-relaxed flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400/80 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Failure-Mode Analysis & Mitigations (Structured Pairs + Accent Hairline) */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
              Failure-Mode Analysis & Mitigations
            </h3>
            <div className="space-y-4">
              {project.failureModes.map((mode, i) => {
                const parsed = parseFailureMode(mode);
                return (
                  <div 
                    key={i} 
                    className="border-l-2 border-amber-500/40 pl-3.5 space-y-1"
                  >
                    <div className="text-sm font-medium text-zinc-200">
                      {parsed.title}
                    </div>
                    {parsed.mitigation && (
                      <div className="text-xs text-zinc-400 leading-relaxed">
                        {parsed.mitigation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 7. TECH STACK FOOTER (CLEAN QUIET INLINE TAGS) */}
        <div className="space-y-3 pt-4 border-t border-white/[0.06]">
          <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 font-semibold">
            Engineered Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/[0.08] rounded-md text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
