import type { FC } from 'react';
import { SYSTEM_AXIOMS } from '../data/portfolio-data';

export const Axioms: FC = () => {
  return (
    <section className="awards shell" id="axioms">
      <div className="mb-8" data-reveal>
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--flame)]">
          // Lead Systems Architect Mandate
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold mt-2 tracking-tight">
          System Axioms & Invariant Rules
        </h2>
      </div>

      <div className="rows" id="awardRows">
        {SYSTEM_AXIOMS.map((axiom, i) => (
          <div
            className="row"
            key={axiom.title}
            data-peek={axiom.image}
          >
            <span className="row__no">{String(i + 1).padStart(2, '0')}</span>
            <span className="row__org">{axiom.title}</span>
            <span className="row__what">{axiom.rule}</span>
            <span className="row__year">{axiom.year}</span>
          </div>
        ))}

        {/* Floating preview card that springs to cursor on hover */}
        <div className="peek" id="peek" aria-hidden="true" />
      </div>
    </section>
  );
};
