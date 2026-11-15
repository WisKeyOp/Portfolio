import { useState } from 'react';
import type { FC } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, ShieldCheck, Layers, Workflow } from 'lucide-react';
import type { Project } from '../data/portfolio-data';
import { GithubIcon } from './Icons';
import { FlowDesignView } from './FlowDesignView';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  const [modalFlowType, setModalFlowType] = useState<'topology' | 'statemachine' | 'langgraph'>('topology');

  if (!project) return null;

  const isDashResQ = project.id.toLowerCase().includes('dashresq');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-[#8692A6] hover:text-[#F1F4FA] transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-[#07090F] text-indigo-300 border border-[rgba(148,163,184,0.18)]">
              {project.category}
            </span>
            <span className="text-xs font-mono text-[#8692A6]">{project.timeline}</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#F1F4FA]">
            {project.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-[#8692A6]">
            {project.subtitle}
          </p>
          <div className="mt-2 text-xs font-mono text-indigo-300">
            Role: <span className="text-[#10B981] font-bold">{project.role}</span>
          </div>
        </div>

        {/* Links */}
        <div className="mt-4 flex flex-wrap gap-2.5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3C46D1] hover:bg-[#343cb8] text-xs font-mono font-medium text-white transition-all shadow-sm cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Deployment</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#07090F] hover:bg-slate-800 text-xs font-mono text-[#F1F4FA] transition-all cursor-pointer"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>

        {/* Metrics Banner */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-3 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-center">
              <span className="text-xs font-mono text-[#10B981] block font-semibold">{metric}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold mb-2">
            Overview & Scope
          </h3>
          <p className="text-sm text-[#F1F4FA] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Interactive UI Flow Design for Flagship Architecture */}
        {isDashResQ && (
          <div className="mt-8 pt-6 border-t border-[rgba(148,163,184,0.18)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#F1F4FA] font-semibold">
                <Workflow className="w-4 h-4 text-[#3C46D1]" />
                <span>Architecture UI Flow Design</span>
              </div>

              <div className="inline-flex items-center p-1 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-xs font-mono gap-1">
                <button
                  onClick={() => setModalFlowType('topology')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    modalFlowType === 'topology' ? 'bg-[#3C46D1] text-white font-bold' : 'text-[#8692A6] hover:text-white'
                  }`}
                >
                  Topology Flow
                </button>
                <button
                  onClick={() => setModalFlowType('statemachine')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    modalFlowType === 'statemachine' ? 'bg-[#3C46D1] text-white font-bold' : 'text-[#8692A6] hover:text-white'
                  }`}
                >
                  OCC State Machine
                </button>
                <button
                  onClick={() => setModalFlowType('langgraph')}
                  className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    modalFlowType === 'langgraph' ? 'bg-[#3C46D1] text-white font-bold' : 'text-[#8692A6] hover:text-white'
                  }`}
                >
                  LangGraph Triage
                </button>
              </div>
            </div>

            <FlowDesignView type={modalFlowType} />
          </div>
        )}

        {/* Architecture Points */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold mb-3">
            <Layers className="w-4 h-4 text-[#3C46D1]" />
            <span>Architecture & Invariant Enforcement</span>
          </div>
          <div className="space-y-2">
            {project.architecturePoints.map((point, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.14)] flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                <span className="text-xs text-[#F1F4FA] leading-relaxed">{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Failure Modes */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Failure-Mode Analysis & Defenses</span>
          </div>
          <div className="space-y-2">
            {project.failureModes.map((fm, i) => (
              <div key={i} className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-amber-200 leading-relaxed">{fm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-6 pt-5 border-t border-[rgba(148,163,184,0.18)] flex flex-wrap gap-1.5">
          {project.technologies.map((t, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#07090F] text-[#8692A6] border border-[rgba(148,163,184,0.18)]">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
