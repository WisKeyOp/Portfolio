import { useState } from 'react';
import type { FC } from 'react';
import { ShieldCheck, Terminal, ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolio-data';
import type { Project } from '../data/portfolio-data';

interface WorksProps {
  onSelectProject?: (project: Project) => void;
}

export const Works: FC<WorksProps> = ({ onSelectProject }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: 'All Projects' },
    { id: 'Safety-Critical & IoT', label: 'Safety-Critical & IoT' },
    { id: 'AI & LangGraph', label: 'AI & LangGraph' },
    { id: 'Full-Stack & Systems', label: 'Ledgers & Systems' },
  ];

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  return (
    <section className="works" id="work">
      {/* Sticky Wordmark & Stage */}
      <div className="works__stage">
        <div className="works__bg" aria-hidden="true">
          <h2 className="works__word">Projects</h2>
        </div>

        <span className="sr-only">Selected Architectural Systems</span>

        <span className="works__badge" aria-hidden="true">
          Deterministic
          <br />
          Architectures <i>↗</i>
        </span>

        {/* Shadcn-Style Segmented Category Tabs */}
        <div className="relative z-20 flex items-center justify-center pt-8 pb-4 px-4">
          <div className="flex items-center gap-1.5 p-1 rounded-[var(--r-pill)] bg-[var(--card)] border border-[var(--line)] shadow-xl overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-1.5 rounded-[var(--r-pill)] text-xs font-mono transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[var(--mute)] text-[var(--ink)] font-semibold border border-[var(--line)]'
                    : 'text-[var(--slate)] hover:text-[var(--ink)] hover:bg-[var(--mute)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="works__cards" id="worksCards">
          {filteredProjects.map((project, i) => (
            <article
              className={`wcard wcard--${i % 2 ? 'right' : 'left'}`}
              key={project.id}
              data-project={i}
              tabIndex={0}
              role="button"
              aria-label={`Open architectural deep-dive for ${project.title}`}
              onClick={() => onSelectProject?.(project)}
            >
              <header className="wcard__head">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-[var(--r-sm)] text-[10px] font-mono uppercase bg-[var(--flame)]/10 text-[var(--flame-ink)] border border-[var(--flame)]/20 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      {project.category}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--slate)]">
                      // {project.year || '2026'}
                    </span>
                  </div>
                  <h3 className="wcard__title">{project.title}</h3>
                </div>
                <span className="wcard__go" aria-hidden="true">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </header>

              {/* Technical Metrics & Invariant Summary */}
              <div className="px-5 pb-3">
                <p className="text-xs text-[var(--slate)] font-sans line-clamp-2 leading-relaxed">
                  {project.subtitle}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {(project.metrics || []).slice(0, 2).map((metric, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-[var(--r-sm)] bg-[var(--mute)] border border-[var(--line)] text-[10px] font-mono text-[var(--slate)]"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="wcard__tags">
                {(project.tags || []).map((tag) => (
                  <span key={tag}>
                    <i aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="wcard__frame relative overflow-hidden group">
                <img 
                  src={project.image || 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'} 
                  alt={project.title} 
                  loading="lazy" 
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-xs font-mono text-white flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-[var(--lime)]" />
                    <span>Click to inspect failure modes & OCC invariant</span>
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Floating Pointer-Follower Bubble */}
      <span className="works__follow" id="worksFollow" aria-hidden="true">
        View
      </span>
    </section>
  );
};
