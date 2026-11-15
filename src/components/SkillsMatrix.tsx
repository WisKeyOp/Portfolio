import type { FC } from 'react';
import { Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolio-data';

export const SkillsMatrix: FC = () => {
  return (
    <section id="skills" className="py-20 border-b border-white/5 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B28] text-[#3C46D1] text-xs font-mono font-medium border border-[rgba(148,163,184,0.18)]">
            <Layers className="w-3.5 h-3.5" />
            <span>TECHNICAL ARSENAL</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-[#F1F4FA] tracking-tight">
            Production Stack & Core Competencies
          </h2>
          <p className="mt-1 text-sm text-[#8692A6]">
            Strict dependency hygiene. Native platform capabilities and standard libraries prioritized before speculative third-party dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/40 transition-all"
            >
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 mb-4 pb-2 border-b border-[rgba(148,163,184,0.12)]">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-[#07090F] text-[#F1F4FA] border border-[rgba(148,163,184,0.14)] hover:border-[#3C46D1]/50 transition-colors"
                  >
                    {skill}
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
