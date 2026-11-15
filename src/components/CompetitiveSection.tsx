import type { FC } from 'react';
import { Award, GraduationCap, Trophy, ExternalLink } from 'lucide-react';
import { COMPETITIVE_STATS, HONORS, EDUCATION_DATA } from '../data/portfolio-data';

export const CompetitiveSection: FC = () => {
  return (
    <section id="competitive" className="py-20 border-b border-white/5 bg-[#07090F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#151B28] text-amber-400 text-xs font-mono font-medium border border-[rgba(148,163,184,0.18)]">
            <Trophy className="w-3.5 h-3.5" />
            <span>ALGORITHMIC RIGOR & COMPLEXITY</span>
          </div>
          <h2 className="mt-3 text-3xl font-extrabold text-[#F1F4FA] tracking-tight">
            Competitive Programming & Honors
          </h2>
          <p className="mt-1 text-sm text-[#8692A6]">
            Algorithmic efficiency is an engineering reflex. Before writing any loop, approach, Time Complexity, and Space Complexity are strictly defined.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Competitive Stats & Hackathons (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold">
              Live Ratings & Competitive Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COMPETITIVE_STATS.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] hover:border-[#3C46D1]/40 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[#8692A6]">
                        {stat.platform}
                      </span>
                      <a
                        href={stat.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8692A6] hover:text-[#F1F4FA] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold font-mono text-[#F1F4FA]">
                        {stat.rating}
                      </span>
                      <span className="text-xs font-mono font-semibold text-amber-400">
                        {stat.rank}
                      </span>
                    </div>

                    <div className="mt-1 text-xs font-mono text-[#8692A6]">
                      Percentile: <span className="text-[#10B981] font-bold">{stat.percentile}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[rgba(148,163,184,0.12)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-slate-500">Handle: @{stat.handle}</span>
                    <span className="text-indigo-400">{stat.badge}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Honors & Hackathons */}
            <div className="pt-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold mb-4">
                National Competitions & Hackathons
              </h3>

              <div className="space-y-3">
                {HONORS.map((honor, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] flex items-start gap-3.5"
                  >
                    <div className="p-2 rounded-xl bg-[#07090F] border border-amber-500/20 text-amber-400 mt-0.5">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#F1F4FA]">{honor.title}</span>
                        <span className="text-xs font-mono text-[#8692A6]">({honor.year})</span>
                      </div>
                      <div className="text-xs font-mono text-indigo-400 mt-0.5">{honor.organization}</div>
                      <p className="mt-1 text-xs text-[#8692A6] leading-relaxed">
                        {honor.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Formal Education (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[#8692A6] font-semibold">
              Formal Academic Credentials
            </h3>

            <div className="p-6 rounded-2xl bg-[#151B28] border border-[rgba(148,163,184,0.18)] space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#07090F] border border-[rgba(148,163,184,0.18)] text-[#3C46D1]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#F1F4FA]">
                    {EDUCATION_DATA.institution}
                  </h4>
                  <p className="text-xs text-[#8692A6] font-mono mt-0.5">
                    {EDUCATION_DATA.location}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(148,163,184,0.12)]">
                <div className="text-sm font-semibold text-[#F1F4FA]">
                  {EDUCATION_DATA.degree}
                </div>
                <div className="flex items-center justify-between text-xs font-mono mt-2">
                  <span className="text-[#8692A6]">{EDUCATION_DATA.timeline}</span>
                  <span className="px-2 py-0.5 rounded bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 font-bold">
                    CGPA: {EDUCATION_DATA.grade}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(148,163,184,0.12)] space-y-2">
                <div className="text-xs font-mono text-[#8692A6] uppercase tracking-wider font-semibold">
                  Key Coursework & Honors
                </div>
                {EDUCATION_DATA.highlights.map((h, i) => (
                  <p key={i} className="text-xs text-[#8692A6] leading-relaxed">
                    • {h}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
