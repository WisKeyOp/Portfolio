import type { FC } from 'react';
import { X, Download, ExternalLink, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-hidden animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[90vh] rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] shadow-2xl flex flex-col overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[rgba(148,163,184,0.18)] flex items-center justify-between bg-[#07090F]/90">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#151B28] text-[#3C46D1] border border-[rgba(148,163,184,0.18)]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F1F4FA] font-mono">
                Aayush_Shukla_Resume.pdf
              </h2>
              <p className="text-xs text-[#8692A6] font-mono">
                Validated ATS-Compliant Document • Systems & GenAI Track
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PERSONAL_INFO.resumeUrl}
              download="Aayush_Shukla_Resume.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#3C46D1] hover:bg-[#343cb8] text-xs font-mono font-medium text-white transition-all shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <a
              href={PERSONAL_INFO.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="p-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-[#8692A6] hover:text-[#F1F4FA] transition-colors cursor-pointer"
              title="Open in new window"
            >
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl border border-[rgba(148,163,184,0.18)] bg-[#151B28] hover:bg-slate-800 text-[#8692A6] hover:text-[#F1F4FA] transition-colors cursor-pointer ml-1"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 w-full bg-[#07090F] p-2 relative">
          <iframe
            src={`${PERSONAL_INFO.resumeUrl}#toolbar=1&navpanes=0`}
            title="Aayush Shukla Resume"
            className="w-full h-full rounded-xl border border-[rgba(148,163,184,0.14)] bg-[#07090F]"
          />
        </div>

        {/* Footer Bar */}
        <div className="px-6 py-2.5 bg-[#07090F] border-t border-[rgba(148,163,184,0.18)] flex items-center justify-between text-xs font-mono text-[#8692A6]">
          <span>Format: Standard PDF (223 KB)</span>
          <span>Sha256 Verified Binary Delivery</span>
        </div>
      </div>
    </div>
  );
};
