import type { FC } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolio-data';

export const ExperienceSection: FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-white/5 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium border border-emerald-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            ENTERPRISE & STARTUP ENGINEERING
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
            Work Experience & Infrastructure Track Record
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Deploying agentic AI systems, enterprise Model Context Protocol (MCP) gateways, and financial document pipelines under stringent enterprise governance.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-slate-300 mt-0.5">
                    {exp.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {exp.timeline}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-5 space-y-2.5">
                {exp.achievements.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-500 mr-2">Core Tech:</span>
                {exp.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-black/40 text-slate-300 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
