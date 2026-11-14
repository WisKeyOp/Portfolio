import type { FC } from 'react';
import { Cpu, GitBranch, ArrowRight, FileText } from 'lucide-react';
import { PERSONAL_INFO, CORE_METRICS } from '../data/portfolio-data';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-grid-pattern border-b border-white/5">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-cyan-600/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          {/* Status pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-slate-300 mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-emerald-400 font-semibold">PRODUCTION RUNTIME</span>
            <span className="text-slate-600">|</span>
            <span>EY Associate Consultant</span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400">DashResQ Core Architect</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
            Aayush Shukla
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
              Lead Systems Architect & AI Infrastructure Engineer
            </span>
          </h1>

          {/* Value proposition & failure mode ethos */}
          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            I engineer high-integrity distributed backends, LangGraph multi-agent ecosystems, and safety-critical telemetry platforms.
            Architected systems processing <strong className="text-white">600 vitals/min</strong> with <strong className="text-white">zero lost dispatches</strong>, backed by an Optimistic Concurrency Control (OCC) state machine, Model Context Protocol (MCP) tool servers, and <strong className="text-white">2,584 automated CI tests</strong>.
          </p>

          {/* Terminal Banner */}
          <div className="mt-6 p-3 rounded-lg bg-black/60 border border-slate-800 font-mono text-xs text-slate-300 flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">$</span>
              <span>sysctl -w cluster.invariants=enforced --dispatch-idempotency=strict</span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:inline">SHA256: 8a7c... verified</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold text-white transition-all shadow-lg shadow-indigo-600/25"
            >
              <Cpu className="w-4 h-4" />
              <span>Inspect Architecture</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-sm font-semibold text-slate-200 transition-all"
            >
              <GitBranch className="w-4 h-4 text-indigo-400" />
              <span>Project Catalog (6)</span>
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-sm font-medium text-slate-300 transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Review Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CORE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-indigo-500/40 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white tracking-tight">
                {metric.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-300">
                {metric.label}
              </div>
              <div className="mt-0.5 text-[11px] text-slate-500 font-mono">
                {metric.subtext}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
