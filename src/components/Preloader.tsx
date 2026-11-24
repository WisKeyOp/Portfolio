import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const Preloader: FC = () => {
  // Check session storage so returning users or refreshes don't get trapped
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('seen_portfolio_preloader') === '1';
    }
    return false;
  });

  useEffect(() => {
    if (dismissed) {
      document.body.style.overflow = '';
      return;
    }

    // Hard architectural guarantee: never trap user behind preloader beyond 1.0s
    const timer = setTimeout(() => {
      setDismissed(true);
      document.body.style.overflow = '';
      try {
        sessionStorage.setItem('seen_portfolio_preloader', '1');
      } catch {
        /* ignore */
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className="preloader"
      id="preloader"
      aria-hidden="true"
      onClick={() => {
        setDismissed(true);
        document.body.style.overflow = '';
        try {
          sessionStorage.setItem('seen_portfolio_preloader', '1');
        } catch {
          /* ignore */
        }
      }}
      title="Click to enter portfolio immediately"
      style={{ cursor: 'pointer' }}
    >
      <div className="preloader__word mask">
        <span>
          {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
        </span>
      </div>
      <div className="preloader__count" id="count">0</div>
      <div className="preloader__bar" id="bar" />
    </div>
  );
};
