import type { FC } from 'react';
import { Cpu, Radio, ArrowRight, FileText } from 'lucide-react';
import { PERSONAL_INFO, CORE_METRICS } from '../data/portfolio-data';
import { GithubIcon, LinkedinIcon } from './Icons';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenResume }) => {
  return (
    <section className="relative pt-12 pb-20 overflow-hidden bg-[#07090F] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl">
          
          {/* Status pill matching DashResQ Live Rescue Header */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#151B28] border border-[rgba(148,163,184,0.18)] text-xs font-mono text-[#F1F4FA] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
            <span className="text-[#10B981] font-semibold">PRODUCTION RUNTIME</span>
            <span className="text-slate-600">|</span>
            <span className="text-[#8692A6]">EY Associate Consultant</span>
            <span className="text-slate-600">|</span>
            <span className="text-indigo-400 font-bold">DashResQ Core Architect</span>
          </div>

          {/* Name & Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#F1F4FA] leading-[1.08]">
            Aayush Shukla
            <span className="block mt-2.5 text-2xl sm:text-3xl lg:text-4xl font-bold text-[#8692A6]">
              Lead Systems Architect & AI Infrastructure Engineer
            </span>
          </h1>

          {/* Value proposition */}
          <p className="mt-6 text-base sm:text-lg text-[#8692A6] max-w-3xl leading-relaxed">
            I engineer high-integrity distributed backends, LangGraph multi-agent ecosystems, and safety-critical telemetry platforms.
            Architected systems processing <strong className="text-[#F1F4FA]">600 vitals/min</strong> with <strong className="text-[#F1F4FA]">zero lost dispatches</strong>, backed by an Optimistic Concurrency Control (OCC) state machine, Model Context Protocol (MCP) tool servers, and <strong className="text-[#F1F4FA]">2,584 automated CI tests</strong>.
          </p>

          {/* Terminal Banner */}
          <div className="mt-6 p-3.5 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] font-mono text-xs text-[#F1F4FA] flex items-center justify-between overflow-x-auto">
            <div className="flex items-center gap-2">
              <span className="text-[#10B981]">$</span>
              <span>sysctl -w cluster.invariants=enforced --dispatch-idempotency=strict</span>
            </div>
            <span className="text-[11px] text-[#8692A6] hidden sm:inline">SHA256: 8a7c... verified</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#3C46D1] hover:bg-[#343cb8] text-sm font-semibold text-white transition-all shadow-sm cursor-pointer"
            >
              <Radio className="w-4 h-4 text-emerald-300" />
              <span>Launch Systems Radar (8)</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            <a
              href="#architecture"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-sm font-semibold text-[#F1F4FA] transition-all cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-[#3C46D1]" />
              <span>Inspect Architecture</span>
            </a>

            <button
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-sm font-medium text-[#F1F4FA] transition-all cursor-pointer"
            >
              <FileText className="w-4 h-4 text-[#10B981]" />
              <span>Review Resume</span>
            </button>

            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-[#8692A6] hover:text-[#F1F4FA] transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
            </a>

            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-[#8692A6] hover:text-[#F1F4FA] transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CORE_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/50 transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#F1F4FA] tracking-tight">
                {metric.value}
              </div>
              <div className="mt-1 text-xs font-semibold text-[#8692A6]">
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
