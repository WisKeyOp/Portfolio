import { useState } from 'react';
import type { FC } from 'react';
import { GitBranch, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PROJECTS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';
import { ProjectModal } from './ProjectModal';
import { GithubIcon } from './Icons';

export const ProjectsSection: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Safety-Critical & IoT', 'AI & LangGraph', 'Full-Stack & Systems'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 border-b border-white/5 bg-[#090D15]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
              <GitBranch className="w-3.5 h-3.5" />
              SYSTEM PORTFOLIO
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
              Production Systems & Flagship Codebases
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-2xl">
              Every project is backed by verified failure-mode tests, idempotent state invariants, and clean distributed architectures.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-slate-900 border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glow-card rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {project.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500">{project.timeline}</span>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>

                {/* Role & status */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono border-y border-slate-800/80 py-2">
                  <span className="text-slate-400">{project.role}</span>
                  <span className="text-emerald-400 font-semibold">{project.status}</span>
                </div>

                {/* Metrics */}
                <div className="mt-3 space-y-1">
                  {project.metrics.slice(0, 2).map((m, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs font-mono text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0"></span>
                      <span className="truncate">{m}</span>
                    </div>
                  ))}
                </div>

                {/* Tech chips */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800/80 text-slate-300 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-800/50 text-slate-400">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Inspect Architecture</span>
                </button>

                <div className="flex items-center gap-2">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-4 h-4" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                      title="Live Deployment"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Deep-dive Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
