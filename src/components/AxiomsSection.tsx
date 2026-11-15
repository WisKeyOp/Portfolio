import type { FC } from 'react';
import { ShieldAlert, CheckCircle2, Lock, RefreshCw, Cpu } from 'lucide-react';
import { SYSTEM_AXIOMS } from '../data/portfolio-data';

export const AxiomsSection: FC = () => {
  return (
    <section id="axioms" className="py-16 border-b border-white/5 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B28] text-[#3C46D1] text-xs font-mono font-medium border border-[rgba(148,163,184,0.18)]">
            <Lock className="w-3.5 h-3.5" />
            <span>ENGINEERING STANDARDS</span>
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#F1F4FA] tracking-tight">
            Failure-Mode Analysis & System Axioms
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#8692A6]">
            Reliability under failure is not an afterthought. In high-stakes environments—whether dispatching ambulances or orchestrating enterprise agentic workflows—the system must enforce hard invariants at database, protocol, and state boundaries.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEM_AXIOMS.map((axiom, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-indigo-300">
                    AXIOM 0{idx + 1}
                  </span>
                  {idx === 0 && <ShieldAlert className="w-5 h-5 text-[#3C46D1]" />}
                  {idx === 1 && <RefreshCw className="w-5 h-5 text-sky-400" />}
                  {idx === 2 && <Cpu className="w-5 h-5 text-[#10B981]" />}
                </div>
                <h3 className="text-lg font-bold text-[#F1F4FA] mb-2">
                  {axiom.title}
                </h3>
                <div className="p-3 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.14)] mb-3 text-xs font-mono text-[#10B981]">
                  {axiom.rule}
                </div>
                <p className="text-xs text-[#8692A6] leading-relaxed">
                  {axiom.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[rgba(148,163,184,0.12)] flex items-center gap-2 text-[11px] font-mono text-[#8692A6]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                <span>Audited in all production repositories</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
