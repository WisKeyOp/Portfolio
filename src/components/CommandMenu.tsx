import { useState, useEffect, useCallback } from 'react';
import type { FC } from 'react';
import {
  Search,
  Terminal,
  Cpu,
  ShieldCheck,
  Layers,
  FileText,
  Sun,
  X,
  ArrowRight
} from 'lucide-react';
import { PROJECTS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
  onOpenResume: () => void;
  onTriggerSimulation?: (action: string) => void;
}

export const CommandMenu: FC<CommandMenuProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  onOpenResume,
  onTriggerSimulation: _onTriggerSimulation,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut: Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          // Open menu
          const event = new CustomEvent('open-command-menu');
          window.dispatchEvent(event);
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);



  const toggleTheme = useCallback(() => {
    const root = document.documentElement;
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
    onClose();
  }, [onClose]);

  const jumpTo = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onClose();
  }, [onClose]);

  // Command items
  const navigationItems = [
    { id: 'work', label: 'Selected Projects & Engineering Work', icon: <Cpu className="w-4 h-4 text-[var(--flame-ink)]" />, section: 'Navigation', action: () => jumpTo('work') },
    { id: 'axioms', label: 'Engineering Principles & Guarantees', icon: <ShieldCheck className="w-4 h-4 text-[var(--flame-ink)]" />, section: 'Navigation', action: () => jumpTo('axioms') },
    { id: 'experience', label: 'Work Experience & History', icon: <Layers className="w-4 h-4 text-[var(--flame-ink)]" />, section: 'Navigation', action: () => jumpTo('experience') },
    { id: 'contact', label: 'Get in Touch (Contact)', icon: <Terminal className="w-4 h-4 text-[var(--flame-ink)]" />, section: 'Navigation', action: () => jumpTo('contact') },
  ];

  const projectItems = PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    label: `${p.title} — ${p.subtitle}`,
    icon: <Terminal className="w-4 h-4 text-[var(--flame)]" />,
    section: 'Selected Projects',
    action: () => {
      onSelectProject(p);
      onClose();
    },
  }));

  const actionItems = [
    {
      id: 'act-resume',
      label: 'View Resume (CV)',
      icon: <FileText className="w-4 h-4 text-[var(--lime)]" />,
      section: 'Quick Actions',
      action: () => {
        onOpenResume();
        onClose();
      },
    },
    {
      id: 'act-theme',
      label: 'Toggle Dark / Light Theme',
      icon: <Sun className="w-4 h-4 text-[var(--flame-ink)]" />,
      section: 'Quick Actions',
      action: toggleTheme,
    },
  ];

  const allItems = [...navigationItems, ...projectItems, ...actionItems];

  const filtered = allItems.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.section.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[12vh] px-4 bg-black/60 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#0d1117] border border-white/10 rounded-xl shadow-2xl overflow-hidden flex flex-col font-sans transition-all duration-200"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Command Palette"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--line)] bg-[var(--mute)]">
          <Search className="w-4 h-4 text-[var(--slate)] shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-[var(--ink)] placeholder-[var(--slate)] outline-none font-sans"
            placeholder="Search systems, telemetry simulations, invariants, or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-[var(--slate)] bg-[var(--card)] rounded-[var(--r-sm)] border border-[var(--line)]">
            ESC
          </kbd>
          <button
            onClick={onClose}
            className="text-[var(--slate)] hover:text-[var(--ink)] p-1 cursor-pointer"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-[var(--line)]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-[var(--slate)] font-mono">
              No matching architectural modules or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-[var(--r-md)] text-left text-xs transition-colors duration-150 cursor-pointer ${selectedIndex === idx
                    ? 'bg-[var(--mute)] text-[var(--ink)] font-semibold'
                    : 'text-[var(--slate)] hover:bg-[var(--mute)] hover:text-[var(--ink)]'
                  }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-1 rounded-[var(--r-sm)] bg-[var(--mute)] border border-[var(--line)] shrink-0">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-[var(--ink)]">{item.label}</p>
                    <p className="text-[10px] text-[var(--slate)] font-mono">{item.section}</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--slate)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-[var(--line)] bg-[var(--mute)] flex items-center justify-between text-[11px] text-[var(--slate)] font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center gap-1.5 text-[var(--flame-ink)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--flame)]" />
            <span>OCC State Machine Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
