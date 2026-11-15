import { useState } from 'react';
import type { FC } from 'react';
import { Mail, Phone, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio-data';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Footer: FC = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="pt-16 pb-12 bg-[#07090F] text-[#8692A6] border-t border-[rgba(148,163,184,0.18)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[rgba(148,163,184,0.12)]">
          {/* Left Column: Brand & Mandate (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] flex items-center justify-center text-[#3C46D1]">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-[#F1F4FA] tracking-wider">
                AAYUSH SHUKLA
              </span>
            </div>

            <p className="text-sm text-[#8692A6] max-w-md leading-relaxed">
              Lead Systems Architect & AI Infrastructure Engineer. Enforcing correctness, optimistic concurrency, and zero-hallucination agentic safety floors across mission-critical systems.
            </p>

            <div className="pt-1 flex items-center gap-2 font-mono text-xs text-[#10B981]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span>Available for Principal Systems, High-Scale Backend & GenAI Architect Roles</span>
            </div>
          </div>

          {/* Right Column: Direct Contact & Channels (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8692A6]">
              Direct Communication Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Email Card with Copy */}
              <div className="p-3.5 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-[#3C46D1] flex-shrink-0" />
                  <span className="text-xs font-mono text-[#F1F4FA] truncate">{PERSONAL_INFO.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-[#8692A6] hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-3.5 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/50 flex items-center gap-2.5 text-xs font-mono text-[#F1F4FA] transition-colors"
              >
                <Phone className="w-4 h-4 text-[#10B981] flex-shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-xs font-mono text-[#8692A6] hover:text-[#F1F4FA] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub (@WisKeyOp)</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-xs font-mono text-[#8692A6] hover:text-[#F1F4FA] transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LeetCode (Knight 1899)</span>
              </a>

              <a
                href={PERSONAL_INFO.codeforces}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Codeforces (Expert 1649)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Aayush Shukla · Lead Systems Architect & AI Infrastructure Engineer
          </div>
          <div className="flex items-center gap-4">
            <span>OCC Protocol: Active</span>
            <span>•</span>
            <span>CI Tests: 2,584 Passing</span>
            <span>•</span>
            <span className="text-[#10B981]">DashResQ Standards Enforced</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
