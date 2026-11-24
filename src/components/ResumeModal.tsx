import { useEffect, useCallback } from 'react';
import type { FC } from 'react';
import { 
  ArrowLeft, 
  X, 
  Download, 
  ExternalLink, 
  FileText, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin,
  Building,
  GraduationCap
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  // Safe back navigation handler respecting browser history
  const handleClose = useCallback(() => {
    if (window.location.hash === '#resume') {
      window.history.back();
    } else {
      onClose();
    }
  }, [onClose]);

  // Synchronize modal state with Browser History (popstate) & Keyboard (Escape)
  useEffect(() => {
    if (!isOpen) return;

    // Push hash state if not already in URL
    if (window.location.hash !== '#resume') {
      window.history.pushState({ modal: 'resume' }, '', '#resume');
    }

    const handlePopState = () => {
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Aayush Shukla Resume Specification"
    >
      {/* Floating Immediate Back Pill for Mobile & Quick Access */}
      <button
        onClick={handleClose}
        className="fixed top-4 left-4 z-[10000] inline-flex items-center gap-2 px-3 py-1.5 rounded-[var(--r-pill)] bg-[var(--card)] hover:bg-[var(--mute)] text-[var(--ink)] text-xs font-mono font-medium border border-[var(--line)] shadow-2xl transition-all cursor-pointer group"
        title="Return to portfolio (Esc or Browser Back)"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[var(--flame)]" />
        <span>← Back to Portfolio</span>
        <kbd className="hidden sm:inline-block text-[10px] px-1 py-0.5 bg-[var(--mute)] rounded-[var(--r-sm)] font-mono text-[var(--slate)]">ESC</kbd>
      </button>

      <div 
        className="relative w-full max-w-6xl h-[94vh] rounded-[var(--r-lg)] bg-[var(--card)] border border-[var(--line)] shadow-2xl flex flex-col overflow-hidden text-left font-sans text-[var(--ink)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Navigation & Recruiter Fast-Action Bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-[var(--line)] flex flex-col md:flex-row md:items-center justify-between bg-[var(--mute)] gap-3 shrink-0">
          {/* Left: Primary Back CTA & Document Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[var(--r-md)] bg-[var(--card)] hover:bg-[var(--mute)] text-[var(--ink)] text-xs font-mono font-semibold transition-all shadow-sm cursor-pointer group border border-[var(--line)]"
              title="Return to portfolio (Esc or Browser Back)"
              autoFocus
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[var(--flame)]" />
              <span>Back to Portfolio</span>
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[var(--slate)] pl-3 border-l border-[var(--line)]">
              <FileText className="w-4 h-4 text-[var(--flame-ink)]" />
              <span className="text-[var(--ink)] font-semibold">{PERSONAL_INFO.name}_Resume.pdf</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--flame)]/10 text-[var(--flame-ink)] border border-[var(--flame)]/20 font-bold">
                AUDITED & VERIFIED
              </span>
            </div>
          </div>

          {/* Right: Download, New Tab, Direct Contact & Close */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <a
              href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--r-md)] bg-[var(--card)] hover:bg-[var(--mute)] text-[var(--slate)] text-xs font-mono border border-[var(--line)] transition-colors"
              title="Direct Telephone"
            >
              <Phone className="w-3.5 h-3.5 text-[var(--lime)]" />
              <span>{PERSONAL_INFO.phone}</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Aayush_Shukla_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[var(--r-md)] bg-[var(--flame-btn)] hover:opacity-90 text-xs font-mono font-bold text-white transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)] hover:bg-[var(--mute)] text-[var(--slate)] hover:text-[var(--ink)] transition-colors cursor-pointer"
              title="Open raw PDF in new browser tab"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={handleClose}
              className="flex items-center gap-1.5 p-2 rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)] hover:bg-[var(--flame)]/20 hover:border-[var(--flame)]/40 text-[var(--slate)] hover:text-[var(--flame-ink)] transition-colors cursor-pointer ml-1"
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
              <kbd className="hidden sm:inline-block text-[10px] font-mono text-[var(--slate)]">ESC</kbd>
            </button>
          </div>
        </div>

        {/* Recruiter Fast-Context Ribbon */}
        <div className="px-4 sm:px-6 py-2 bg-[var(--mute)] border-b border-[var(--line)] flex flex-wrap items-center justify-between text-xs font-mono text-[var(--slate)] gap-2 shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-[var(--ink)]">
              <Building className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
              <span>EY (Pune, India)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[var(--ink)]">
              <GraduationCap className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
              <span>BIT Mesra (Ranchi, India)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[var(--ink)]">
              <MapPin className="w-3.5 h-3.5 text-[var(--lime)]" />
              <span>Lucknow, India (Base)</span>
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[var(--flame-ink)]">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>2,584 Passing CI Tests · LeetCode Knight 1899 · Codeforces 1649</span>
          </div>
        </div>

        {/* Embedded PDF Viewer with Fallback */}
        <div className="flex-1 w-full bg-[var(--coal)] p-2 sm:p-3 relative flex flex-col min-h-0">
          <iframe
            src={`${PERSONAL_INFO.resumeUrl}#toolbar=1&navpanes=0`}
            title="Aayush Shukla Resume Document"
            className="w-full h-full rounded-[var(--r-md)] border border-[var(--line)] bg-[var(--card)]"
          />

          {/* Mobile Fallback Overlay if browser iframe is uncooperative */}
          <noscript>
            <div className="p-4 text-center">
              <p>Your browser doesn't support embedded PDF preview.</p>
              <a href={PERSONAL_INFO.resumeUrl} className="text-[var(--flame-ink)] underline mt-2 inline-block">
                Download Aayush Shukla Resume
              </a>
            </div>
          </noscript>
        </div>

        {/* Footer Navigation Bar */}
        <div className="px-4 sm:px-6 py-2.5 bg-[var(--mute)] border-t border-[var(--line)] flex items-center justify-between text-xs font-mono text-[var(--slate)] shrink-0">
          <button
            onClick={handleClose}
            className="inline-flex items-center gap-1.5 text-[var(--ink)] hover:text-[var(--flame-ink)] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-[var(--flame)]" />
            <span className="underline underline-offset-2">Return to Portfolio Website</span>
          </button>

          <div className="flex items-center gap-3">
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="hover:text-[var(--flame-ink)] transition-colors hidden sm:flex items-center gap-1 text-[var(--ink)]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <span className="text-[var(--slate)]">|</span>
            <span className="text-[11px] text-[var(--slate)]">Phone: {PERSONAL_INFO.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
