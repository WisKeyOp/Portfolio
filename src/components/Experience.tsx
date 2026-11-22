import type { FC } from 'react';
import { EXPERIENCES } from '../data/portfolio-data';

export const Experience: FC = () => {
  return (
    <section className="voices" id="experience">
      <h2 className="voices__head shell" data-reveal>
        Engineering high-integrity distributed backends, LangGraph multi-agent ecosystems, and safety-critical telemetry pipelines.
      </h2>

      <div className="voices__viewport">
        <div className="voices__track" id="voicesTrack">
          {EXPERIENCES.map((item) => (
            <article className="voice" key={`${item.company}-${item.role}`}>
              <figure className="voice__media">
                <img src={item.image} alt={item.company} loading="lazy" />
              </figure>

              <div className="voice__body">
                <span className="voice__mark" aria-hidden="true">
                  &rdquo;
                </span>

                <p className="voice__period">{item.period}</p>
                <p className="voice__summary">{item.summary}</p>

                <div className="voice__stack">
                  {item.stack.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>

                <div className="voice__who">
                  <strong>{item.company}</strong>
                  <span>
                    {item.role} — {item.place}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div
        className="voices__dots"
        id="voicesDots"
        role="tablist"
        aria-label="Experience Track"
      >
        {EXPERIENCES.map((item, i) => (
          <button
            key={`${item.company}-${i}`}
            data-dot={i}
            role="tab"
            aria-label={`${item.company} — ${item.role}`}
            aria-selected={i === 0}
          />
        ))}
      </div>
    </section>
  );
};
