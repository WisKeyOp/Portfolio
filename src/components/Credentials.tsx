import type { FC } from 'react';
import { Award, GraduationCap, Trophy, ExternalLink } from 'lucide-react';
import { EDUCATION_DATA, COMPETITIVE_STATS } from '../data/portfolio-data';

export const Credentials: FC = () => {
  return (
    <section className="credentials shell py-12 md:py-16" id="credentials">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--flame-ink)] font-bold">
            Verified Academic & Algorithmic Credentials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--ink)] mt-1.5">
            Education & Competitive Rigor
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[var(--slate)] max-w-[48ch] leading-relaxed">
          Grounded in foundational computer science, high-stakes algorithmic optimization, and national competitive milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Education */}
        <div className="p-5 rounded-[var(--r-md)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[var(--slate)] mb-2">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
                <span>B.Tech CSE</span>
              </span>
              <span>{EDUCATION_DATA.timeline}</span>
            </div>
            <div className="text-base font-bold text-[var(--ink)]">
              BIT Mesra, Ranchi
            </div>
            <div className="text-xs text-[var(--slate)] mt-1">
              CGPA: {EDUCATION_DATA.grade}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--line)] text-[11px] font-mono text-[var(--slate)]">
            Distributed Systems & OS Focus
          </div>
        </div>

        {/* 2. LeetCode Knight */}
        {COMPETITIVE_STATS[0] && (
          <a
            href={COMPETITIVE_STATS[0].url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-[var(--r-md)] bg-[var(--card)] border border-[var(--line)] shadow-sm hover:border-[var(--flame-ink)] transition-colors flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--slate)] mb-2">
                <span className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-amber-500" />
                  <span>LeetCode Knight</span>
                </span>
                <ExternalLink className="w-3 h-3 text-[var(--slate)] group-hover:text-[var(--ink)] transition-colors" />
              </div>
              <div className="text-base font-bold text-[var(--ink)]">
                Rating {COMPETITIVE_STATS[0].rating}
              </div>
              <div className="text-xs text-[var(--slate)] mt-1">
                {COMPETITIVE_STATS[0].percentile} Global Rank
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--line)] text-[11px] font-mono text-[var(--slate)]">
              {COMPETITIVE_STATS[0].badge}
            </div>
          </a>
        )}

        {/* 3. Codeforces Expert */}
        {COMPETITIVE_STATS[1] && (
          <a
            href={COMPETITIVE_STATS[1].url}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-[var(--r-md)] bg-[var(--card)] border border-[var(--line)] shadow-sm hover:border-[var(--flame-ink)] transition-colors flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[var(--slate)] mb-2">
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-blue-500" />
                  <span>Codeforces Expert</span>
                </span>
                <ExternalLink className="w-3 h-3 text-[var(--slate)] group-hover:text-[var(--ink)] transition-colors" />
              </div>
              <div className="text-base font-bold text-[var(--ink)]">
                Peak {COMPETITIVE_STATS[1].rating}
              </div>
              <div className="text-xs text-[var(--slate)] mt-1">
                Div. 2 Expert Rank
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[var(--line)] text-[11px] font-mono text-[var(--slate)]">
              {COMPETITIVE_STATS[1].badge}
            </div>
          </a>
        )}

        {/* 4. National Hackathons / Honors */}
        <div className="p-5 rounded-[var(--r-md)] bg-[var(--card)] border border-[var(--line)] shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-[var(--slate)] mb-2">
              <span className="flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[var(--flame-ink)]" />
                <span>National Honors</span>
              </span>
              <span>2024 – 2025</span>
            </div>
            <div className="text-base font-bold text-[var(--ink)]">
              Adobe GenSolve
            </div>
            <div className="text-xs text-[var(--slate)] mt-1">
              National Semifinalist (Top 1.4%)
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-[var(--line)] text-[11px] font-mono text-[var(--slate)]">
            Tata Crucible Campus Semifinalist
          </div>
        </div>
      </div>
    </section>
  );
};
