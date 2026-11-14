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
    <footer id="contact" className="pt-20 pb-12 bg-[#06080E] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800/80">
          {/* Left Column: Brand & Mandate (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Terminal className="w-4 h-4" />
              </div>
              <span className="font-mono text-base font-bold text-white tracking-wider">
                AAYUSH SHUKLA
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Lead Systems Architect & AI Infrastructure Engineer. Enforcing correctness, optimistic concurrency, and zero-hallucination agentic safety floors across mission-critical systems.
            </p>

            <div className="pt-2 flex items-center gap-2 font-mono text-xs text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for Principal Systems, High-Scale Backend & GenAI Architect Roles</span>
            </div>
          </div>

          {/* Right Column: Direct Contact & Channels (6 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-300">
              Direct Communication Channels
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Email Card with Copy */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  <span className="text-xs font-mono text-slate-200 truncate">{PERSONAL_INFO.email}</span>
                </div>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Phone Card */}
              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center gap-2.5 text-xs font-mono text-slate-200 transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub (@WisKeyOp)</span>
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-slate-300 hover:text-white transition-colors"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PERSONAL_INFO.leetcode}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LeetCode (Knight 1899)</span>
              </a>

              <a
                href={PERSONAL_INFO.codeforces}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Codeforces (Expert 1649)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            © {new Date().getFullYear()} Aayush Shukla. Built with React 19, TypeScript & Tailwind CSS.
          </div>
          <div className="flex items-center gap-4">
            <span>Latency: &lt;12ms</span>
            <span>•</span>
            <span>OCC Protocol: Active</span>
            <span>•</span>
            <span>CI Tests: 2,584 Passing</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
