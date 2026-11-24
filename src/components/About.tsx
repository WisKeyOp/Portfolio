import type { FC } from 'react';
import { aboutData } from '../data/portfolio-data';

export const About: FC = () => {
  return (
    <section className="about" id="about">
      <div className="about__grid shell">
        {/* Left Column — Intro & Systems Invariants Checklist */}
        <aside className="about__intro" data-reveal>
          <p className="about__hello">{aboutData.intro}</p>

          <ul className="about__points">
            {aboutData.points.map((point) => (
              <li key={point}>
                <i aria-hidden="true">✛</i>
                {point}
              </li>
            ))}
          </ul>
        </aside>

        {/* Centre Column — Architecture Blueprint Media Plate */}
        <figure className="about__photo" data-reveal>
          <img
            src={aboutData.image}
            alt="Distributed systems and failure-mode topology"
            loading="lazy"
          />
        </figure>

        {/* Right Column — Floating Stat Cards with Live Animated Counters */}
        <div className="about__stats">
          {aboutData.cards.map((card) => (
            <div
              className={`stat${card.dark ? ' stat--dark' : ''}`}
              key={card.label}
              data-reveal
            >
              <b
                className="stat__num"
                data-count={card.value}
                data-suffix={card.suffix}
              >
                0
              </b>
              <span className="stat__label">{card.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Outlined Headline & Direct Mission Trigger */}
      <div className="about__tail shell">
        <p className="about__outline" data-reveal>
          {aboutData.outline}
        </p>

        <a className="btn-primary" href={aboutData.ctaHref} data-ripple>
          {aboutData.ctaLabel}
        </a>
      </div>

      {/* Floating System Guarantee Badges */}
      <div className="about__floats shell" aria-hidden="false">
        {aboutData.floats.map((f, i) => (
          <div
            className={`stat stat--float stat--${i === 0 ? 'left' : 'right'}`}
            key={f.label}
          >
            <b className="stat__num">
              {f.value}
              <span>{f.suffix}</span>
            </b>
            <span className="stat__label">{f.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
