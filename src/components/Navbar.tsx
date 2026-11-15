import type { FC } from 'react';
import { Terminal, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface NavbarProps {
  onOpenResume: () => void;
}

export const Navbar: FC<NavbarProps> = ({ onOpenResume }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#080B11]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:border-indigo-400 transition-colors">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-white tracking-wider">AS.SYSTEMS</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse mr-1"></span>
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Aayush Shukla | Systems & AI</p>
          </div>
        </a>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <a href="#projects" className="hover:text-indigo-400 transition-colors">Systems Radar</a>
          <a href="#architecture" className="hover:text-indigo-400 transition-colors">Architecture</a>
          <a href="#experience" className="hover:text-indigo-400 transition-colors">Experience</a>
          <a href="#competitive" className="hover:text-indigo-400 transition-colors">DSA & Metrics</a>
          <a href="#axioms" className="hover:text-indigo-400 transition-colors">Axioms</a>
          <a href="#skills" className="hover:text-indigo-400 transition-colors">Stack</a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-xs font-mono text-slate-200 transition-all cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            Resume
          </button>
          
          <a
            href={PERSONAL_INFO.resumeUrl}
            download="Aayush_Shukla_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-medium text-white transition-all shadow-sm shadow-indigo-600/30 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </a>
        </div>
      </div>
    </header>
  );
};
