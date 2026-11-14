import type { FC } from 'react';
import { ShieldAlert, CheckCircle2, Lock, RefreshCw, Cpu } from 'lucide-react';
import { SYSTEM_AXIOMS } from '../data/portfolio-data';

export const AxiomsSection: FC = () => {
  return (
    <section id="axioms" className="py-16 border-b border-white/5 bg-[#090D15]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
            <Lock className="w-3.5 h-3.5" />
            ENGINEERING STANDARDS
          </div>
          <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Failure-Mode Analysis & System Axioms
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            Reliability under failure is not an afterthought. In high-stakes environments—whether dispatching ambulances or orchestrating financial capital calls—the system must enforce hard invariants at compile, database, and state boundaries.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {SYSTEM_AXIOMS.map((axiom, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    AXIOM 0{idx + 1}
                  </span>
                  {idx === 0 && <ShieldAlert className="w-5 h-5 text-indigo-400" />}
                  {idx === 1 && <RefreshCw className="w-5 h-5 text-sky-400" />}
                  {idx === 2 && <Cpu className="w-5 h-5 text-emerald-400" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">
                  {axiom.title}
                </h3>
                <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800/80 mb-3 text-xs font-mono text-emerald-400">
                  {axiom.rule}
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {axiom.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-[11px] font-mono text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Audited in all production repos</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
