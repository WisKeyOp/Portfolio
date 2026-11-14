import type { FC } from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, ShieldCheck, Layers } from 'lucide-react';
import type { Project } from '../data/portfolio-data';
import { GithubIcon } from './Icons';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl rounded-2xl bg-[#0D121F] border border-slate-700/80 shadow-2xl p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="pr-12">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500">{project.timeline}</span>
          </div>

          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white">
            {project.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-400">
            {project.subtitle}
          </p>
          <div className="mt-2 text-xs font-mono text-indigo-300">
            Role: {project.role}
          </div>
        </div>

        {/* Links */}
        <div className="mt-4 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-medium text-white transition-all shadow-sm"
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
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800/60 hover:bg-slate-700 text-xs font-mono text-slate-200 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Source Repository</span>
            </a>
          )}
        </div>

        {/* Metrics Banner */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {project.metrics.map((metric, i) => (
            <div key={i} className="p-3 rounded-lg bg-black/40 border border-slate-800 text-center">
              <span className="text-xs font-mono text-emerald-400 block font-semibold">{metric}</span>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
            Overview & Scope
          </h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Architecture Points */}
        <div className="mt-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-400 font-semibold mb-3">
            <Layers className="w-4 h-4" />
            <span>Architecture & Invariant Enforcement</span>
          </div>
          <div className="space-y-2.5">
            {project.architecturePoints.map((point, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80 flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300 leading-relaxed">{point}</span>
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
          <div className="space-y-2.5">
            {project.failureModes.map((fm, i) => (
              <div key={i} className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300 leading-relaxed">{fm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap gap-1.5">
          {project.technologies.map((t, i) => (
            <span key={i} className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/60">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
