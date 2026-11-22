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
    { id: 'work', label: 'Explore Systems & Architectures', icon: <Cpu className="w-4 h-4 text-emerald-400" />, section: 'Navigation', action: () => jumpTo('work') },
    // { id: 'radar', label: 'DashResQ Tactical Telemetry Radar', icon: <Activity className="w-4 h-4 text-red-400" />, section: 'Navigation', action: () => jumpTo('radar') },
    { id: 'axioms', label: 'Architectural Axioms & Invariants', icon: <ShieldCheck className="w-4 h-4 text-amber-400" />, section: 'Navigation', action: () => jumpTo('axioms') },
    { id: 'experience', label: 'Engineering Timeline & Experience', icon: <Layers className="w-4 h-4 text-blue-400" />, section: 'Navigation', action: () => jumpTo('experience') },
    { id: 'contact', label: 'Establish Secure Transmission (Contact)', icon: <Terminal className="w-4 h-4 text-purple-400" />, section: 'Navigation', action: () => jumpTo('contact') },
  ];

  const projectItems = PROJECTS.map((p) => ({
    id: `project-${p.id}`,
    label: `${p.title} — ${p.subtitle}`,
    icon: <Terminal className="w-4 h-4 text-orange-400" />,
    section: 'Architectural Systems',
    action: () => {
      onSelectProject(p);
      onClose();
    },
  }));

  // Simulation items disabled while telemetry section is commented out
  /*
  const simulationItems = [
    {
      id: 'sim-occ',
      label: 'Simulate OCC Concurrency Collision (idx_one_active_incident)',
      icon: <Zap className="w-4 h-4 text-red-500" />,
      section: 'Telemetry Simulation',
      action: () => {
        jumpTo('radar');
        onTriggerSimulation?.('occ');
      },
    },
    {
      id: 'sim-spike',
      label: 'Inject Sensor Fall & Arrhythmia Spike (168 bpm / 4.8G)',
      icon: <Activity className="w-4 h-4 text-amber-500" />,
      section: 'Telemetry Simulation',
      action: () => {
        jumpTo('radar');
        onTriggerSimulation?.('spike');
      },
    },
  ];
  */

  const actionItems = [
    {
      id: 'act-resume',
      label: 'Review Architecture Specification & Resume (CV)',
      icon: <FileText className="w-4 h-4 text-emerald-400" />,
      section: 'Quick Actions',
      action: () => {
        onOpenResume();
        onClose();
      },
    },
    {
      id: 'act-theme',
      label: 'Toggle Dark / Light Theme',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
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
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-black/30">
          <Search className="w-4 h-4 text-neutral-400 shrink-0" />
          <input
            type="text"
            className="w-full bg-transparent text-sm text-neutral-100 placeholder-neutral-500 outline-none font-sans"
            placeholder="Search systems, telemetry simulations, invariants, or jump to section..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-800 rounded border border-neutral-700">
            ESC
          </kbd>
          <button 
            onClick={onClose} 
            className="text-neutral-400 hover:text-neutral-200 p-1"
            aria-label="Close command palette"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-sm text-neutral-500 font-mono">
              No matching architectural modules or commands found.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.id}
                onClick={item.action}
                onMouseEnter={() => setSelectedIndex(idx)}
                className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg text-left text-xs transition-colors duration-150 ${
                  selectedIndex === idx
                    ? 'bg-neutral-800/80 text-white'
                    : 'text-neutral-300 hover:bg-neutral-800/40 hover:text-neutral-100'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="p-1 rounded bg-neutral-900 border border-white/5 shrink-0">
                    {item.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="font-medium truncate text-neutral-200">{item.label}</p>
                    <p className="text-[10px] text-neutral-500 font-mono">{item.section}</p>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2 border-t border-white/10 bg-black/40 flex items-center justify-between text-[11px] text-neutral-500 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>OCC State Machine Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};
