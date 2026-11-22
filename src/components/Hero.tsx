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

      {/* Floating Status Pill */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full border border-white/10 bg-[var(--card)]/80 backdrop-blur-md text-[11px] font-mono uppercase tracking-wider text-[var(--slate)] shadow-sm flex items-center gap-2.5 pointer-events-auto"
        data-fade
      >
        <span className="w-2 h-2 rounded-full bg-[var(--lime)] animate-ping" />
        <span className="text-[var(--ink)] font-semibold">Production Runtime</span>
        <span className="opacity-30">|</span>
        <span className="hidden sm:inline">600 Vitals/Min Telemetry</span>
        <span className="hidden sm:inline opacity-30">|</span>
        <span className="text-[var(--flame)] font-semibold">OCC State Machine</span>
      </div>

      {/* Quick Navigation Anchor Bar */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 pointer-events-auto">
        <a
          href="#work"
          className="btn-primary text-xs !py-2.5 !px-5"
          data-ripple
        >
          Explore Systems <i>↓</i>
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
