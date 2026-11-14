import React from 'react';
import { Layers } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolio-data';

export const SkillsMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-20 border-b border-white/5 bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 text-xs font-mono font-medium border border-sky-500/20">
            <Layers className="w-3.5 h-3.5" />
            TECHNICAL ARSENAL
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-white tracking-tight">
            Production Stack & Core Competencies
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            Strict dependency hygiene. Native platform capabilities and standard libraries prioritized before speculative third-party dependencies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all"
            >
              <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-indigo-400 mb-4 pb-2 border-b border-slate-800">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-black/40 text-slate-200 border border-slate-800/80 hover:border-indigo-500/40 hover:text-white transition-colors"
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

