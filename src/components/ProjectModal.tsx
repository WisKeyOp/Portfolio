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
        className="relative w-full max-w-4xl rounded-[var(--r-lg)] bg-[var(--card)] border border-[var(--line)] shadow-2xl p-6 py-8 md:px-10 md:py-10 my-6 max-h-[92vh] overflow-y-auto text-left font-sans text-[var(--ink)] space-y-8 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        }}
      >
        {/* 1. STICKY HEADER BAR (SINGLE CLEAN SOURCE OF NAVIGATION) */}
        <div className="sticky top-0 -mx-6 md:-mx-10 -mt-8 md:-mt-10 px-6 md:px-10 py-4 bg-[var(--card)]/95 backdrop-blur-md border-b border-[var(--line)] flex items-center justify-between gap-3 z-30">
          {/* Left: Minimal Back Button */}
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--slate)] hover:text-[var(--ink)] transition-colors group cursor-pointer shrink-0"
            title="Return to portfolio (Esc or Browser Back)"
            autoFocus
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[var(--slate)] group-hover:text-[var(--ink)]" />
            <span className="hidden sm:inline">← Back to Portfolio</span>
            <span className="sm:hidden">← Back</span>
          </button>

          {/* Right: Understated Audit Dot + Source / Demo + Close */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--slate)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--lime)]" />
              PRODUCTION AUDITED
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--mute)] hover:bg-[var(--line)] !text-[var(--ink)] text-xs font-mono font-medium transition-colors cursor-pointer"
                title="Launch Live Production Application"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5 text-[var(--slate)]" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--mute)] hover:bg-[var(--line)] !text-[var(--slate)] hover:!text-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
                title="Inspect Source Code on GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}

            {!project.liveUrl && !project.githubUrl && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-sm)] border border-[var(--line)] bg-[var(--mute)] text-xs font-mono text-[var(--slate)]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
                <span>Proprietary / Enterprise System</span>
              </span>
            )}

            <button
              onClick={handleClose}
              className="p-1.5 rounded-[var(--r-sm)] text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--mute)] transition-colors cursor-pointer"
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
          <div className="text-[11px] font-mono uppercase tracking-widest text-[var(--flame-ink)] font-bold flex flex-wrap items-center gap-2">
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.year || project.timeline}</span>
            <span>·</span>
            <span>{project.role}</span>
          </div>

          {/* Large Crisp Title & Subtitle */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--ink)] mt-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-[var(--slate)] mt-2 max-w-[65ch] leading-relaxed">
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
                className="p-4 rounded-[var(--r-md)] bg-[var(--mute)] border border-[var(--line)] text-left flex flex-col justify-between"
              >
                <div className="text-sm font-bold text-[var(--ink)] leading-snug">
                  {parsed.primary}
                </div>
                <div className="text-xs text-[var(--slate)] mt-1.5 leading-normal">
                  {parsed.secondary}
                </div>
              </div>
            );
          })}
        </div>

        {/* 4. ARCHITECTURE OVERVIEW (PROSE MEASURE MAX 65CH, NO SURROUNDING BOX) */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--slate)] font-bold">
            Architecture Overview
          </h3>
          <p className="text-sm md:text-base text-[var(--ink)] max-w-[65ch] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* 5. INTERACTIVE ARCHITECTURAL FLOW (FLAGSHIP DASHRESQ) */}
        {isDashResQ && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--slate)] font-bold flex items-center gap-2">
                <Workflow className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
                <span>Interactive Architectural Flow</span>
              </h3>

              {/* Minimal Flow Switcher */}
              <div className="flex items-center gap-1 p-0.5 rounded-[var(--r-sm)] bg-[var(--mute)] border border-[var(--line)]">
                <button
                  onClick={() => setModalFlowType('topology')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-[var(--r-sm)] transition-colors ${
                    modalFlowType === 'topology'
                      ? 'bg-[var(--card)] text-[var(--ink)] font-bold shadow-sm border border-[var(--line)]'
                      : 'text-[var(--slate)] hover:text-[var(--ink)]'
                  }`}
                >
                  Topology
                </button>
                <button
                  onClick={() => setModalFlowType('statemachine')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-[var(--r-sm)] transition-colors ${
                    modalFlowType === 'statemachine'
                      ? 'bg-[var(--card)] text-[var(--ink)] font-bold shadow-sm border border-[var(--line)]'
                      : 'text-[var(--slate)] hover:text-[var(--ink)]'
                  }`}
                >
                  9-State OCC
                </button>
                <button
                  onClick={() => setModalFlowType('langgraph')}
                  className={`px-2.5 py-1 text-xs font-mono rounded-[var(--r-sm)] transition-colors ${
                    modalFlowType === 'langgraph'
                      ? 'bg-[var(--card)] text-[var(--ink)] font-bold shadow-sm border border-[var(--line)]'
                      : 'text-[var(--slate)] hover:text-[var(--ink)]'
                  }`}
                >
                  LangGraph DAG
                </button>
              </div>
            </div>

            {/* Quiet Flow Container */}
            <div className="rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)] p-4 overflow-hidden shadow-sm">
              <FlowDesignView type={modalFlowType} />
            </div>
          </div>
        )}

        {/* 6. TWO-COLUMN SPLIT: GUARANTEES & FAILURE MODES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 pt-2">
          {/* Left: Deterministic Guarantees (Clean Hairlines, No Capsules) */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--slate)] font-bold">
              Deterministic Guarantees
            </h3>
            <div className="divide-y divide-[var(--line)]">
              {project.architecturePoints.map((point, i) => (
                <div 
                  key={i} 
                  className="py-3 first:pt-0 last:pb-0 text-sm text-[var(--ink)] leading-relaxed flex items-start gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--flame-ink)] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Failure-Mode Analysis & Mitigations (Structured Pairs + Accent Hairline) */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--slate)] font-bold">
              Failure-Mode Analysis & Mitigations
            </h3>
            <div className="space-y-4">
              {project.failureModes.map((mode, i) => {
                const parsed = parseFailureMode(mode);
                return (
                  <div 
                    key={i} 
                    className="border-l-2 border-[var(--flame-ink)] pl-3.5 space-y-1"
                  >
                    <div className="text-sm font-bold text-[var(--ink)]">
                      {parsed.title}
                    </div>
                    {parsed.mitigation && (
                      <div className="text-xs text-[var(--slate)] leading-relaxed">
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
        <div className="space-y-3 pt-4 border-t border-[var(--line)]">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--slate)] font-bold">
            Engineered Tech Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-[var(--mute)] border border-[var(--line)] rounded-[var(--r-sm)] text-[var(--slate)]"
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
