import { useState } from 'react';
import type { FC } from 'react';
import { PERSONAL_INFO } from '../data/portfolio-data';

interface HeroProps {
  onOpenResume?: () => void;
}

export const Hero: FC<HeroProps> = ({ onOpenResume }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const lines = PERSONAL_INFO.heroWord.trim().split(/\s+/);

  return (
    <section className="hero" id="hero">
      {/* Dynamic Edge-to-Edge Wordmark Layer (Z-Index 1) */}
      <h1 className="hero__word mask" aria-label={`${PERSONAL_INFO.name} — ${PERSONAL_INFO.title}`}>
        <span className="hero__inner">
          {lines.map((line) => (
            <span className="hero__line" key={line}>
              {line}
            </span>
          ))}
        </span>
      </h1>

      {/* Portrait Cutout Layer (Z-Index 2) */}
      <figure
        className={`hero__figure ${imageLoaded ? 'is-loaded' : 'is-loading'}`}
        aria-hidden="true"
      >
        <img
          src={PERSONAL_INFO.portrait}
          alt={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName} — Lead Systems Architect`}
          width="620"
          height="676"
          fetchPriority="high"
          data-fallback={PERSONAL_INFO.portraitFallback}
          onLoad={() => setImageLoaded(true)}
          style={{
            opacity: imageLoaded ? 1 : 0.4,
            transition: 'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </figure>

      {/* Quick Navigation Anchor Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-auto">
        <a
          href="#work"
          className="btn-primary text-xs !py-2.5 !px-5"
          data-ripple
        >
          Selected Projects <i>↓</i>
        </a>
        {onOpenResume && (
          <button
            onClick={onOpenResume}
            className="btn-cv text-xs !py-2.5 !px-5"
            type="button"
            data-ripple
          >
            Review Resume
          </button>
        )}
      </div>
    </section>
  );
};
