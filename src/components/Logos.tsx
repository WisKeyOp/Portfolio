import type { FC } from 'react';
import { toolGroups } from '../data/portfolio-data';

export const Logos: FC = () => {
  return (
    <section className="stack" id="stack" aria-label="Distributed Systems Stack">
      <p className="stack__label" data-reveal>
        The systems stack & primitives I engineer with
      </p>

      <div className="stack__groups">
        {toolGroups.map((group, gi) => (
          <div className="stack-group" key={group.label}>
            <h3 className="stack-group__label">
              <span>{group.label}</span>
            </h3>

            <div className="stack-marquee">
              <div
                className={`stack-marquee__track${gi % 2 ? ' is-reverse' : ''}`}
                style={{
                  animationDuration: `${Math.max(18, group.items.length * 4.2)}s`,
                }}
              >
                {[0, 1].map((copy) => (
                  <div
                    className="stack-marquee__set"
                    key={copy}
                    aria-hidden={copy === 1 ? 'true' : undefined}
                  >
                    {group.items.map((item) => (
                      <figure
                        className="tech"
                        key={item.name}
                        style={{ '--brand': item.brand } as React.CSSProperties}
                        title={item.name}
                      >
                        <span className="tech__art">
                          {'icon' in item && item.icon ? (
                            <img
                              src={`/icons/${item.icon}.svg`}
                              alt={item.name}
                              width="48"
                              height="48"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const sibling = e.currentTarget.nextElementSibling;
                                if (sibling) (sibling as HTMLElement).style.display = 'grid';
                              }}
                            />
                          ) : null}
                          <b
                            className="tech__abbr"
                            style={{ display: 'icon' in item && item.icon ? 'none' : 'grid' }}
                          >
                            {'abbr' in item && typeof item.abbr === 'string' ? item.abbr : item.name.slice(0, 2)}
                          </b>
                        </span>

                        <figcaption className="tech__name">{item.name}</figcaption>
                      </figure>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
