import type { FC } from 'react';
import { Terminal, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenResume }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(148,163,184,0.18)] bg-[#07090F]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] flex items-center justify-center text-[#3C46D1] group-hover:border-[#3C46D1] transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-[#F1F4FA] tracking-wider">AAYUSH SHUKLA</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mr-1"></span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-[#8692A6] font-mono hidden sm:block">DashResQ Core Architect · Systems & AI</p>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-medium text-[#8692A6]">
          <a href="#projects" className="hover:text-[#F1F4FA] transition-colors">Systems Radar</a>
          <a href="#architecture" className="hover:text-[#F1F4FA] transition-colors">Architecture</a>
          <a href="#experience" className="hover:text-[#F1F4FA] transition-colors">Experience</a>
          <a href="#competitive" className="hover:text-[#F1F4FA] transition-colors">DSA & Metrics</a>
          <a href="#axioms" className="hover:text-[#F1F4FA] transition-colors">Axioms</a>
          <a href="#skills" className="hover:text-[#F1F4FA] transition-colors">Stack</a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-xs font-mono text-[#F1F4FA] transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#3C46D1]" />
            Resume
          </button>
          
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Aayush_Shukla_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3C46D1] hover:bg-[#343cb8] text-xs font-mono font-medium text-white transition-all shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </header>
  );
};
