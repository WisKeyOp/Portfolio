import type { FC } from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { EXPERIENCES } from '../data/portfolio-data';

export const ExperienceSection: FC = () => {
  return (
    <section id="experience" className="py-20 border-b border-white/5 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B28] text-[#10B981] text-xs font-mono font-medium border border-[rgba(148,163,184,0.18)]">
            <Briefcase className="w-3.5 h-3.5" />
            <span>ENTERPRISE & STARTUP ENGINEERING</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-[#F1F4FA] tracking-tight">
            Work Experience & Infrastructure Track Record
          </h2>
          <p className="mt-1 text-sm text-[#8692A6]">
            Deploying agentic AI systems, enterprise Model Context Protocol (MCP) gateways, and financial document pipelines under stringent enterprise governance.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/40 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[rgba(148,163,184,0.14)]">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[#F1F4FA] tracking-tight">
                      {exp.company}
                    </h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#07090F] text-indigo-300 border border-[rgba(148,163,184,0.18)]">
                      {exp.type}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#8692A6] mt-0.5">
                    {exp.role}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8692A6]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#3C46D1]" />
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
                    <CheckCircle className="w-4 h-4 text-[#10B981] mt-0.5 flex-shrink-0" />
                    <p className="text-xs sm:text-sm text-[#F1F4FA] leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>

              {/* Technologies */}
              <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.12)] flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-mono text-[#8692A6] mr-2">Core Tech:</span>
                {exp.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#07090F] text-[#8692A6] border border-[rgba(148,163,184,0.18)]"
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
