import type { FC } from 'react';
import { PERSONAL_INFO } from '../data/portfolio-data';

const footerLinks = [
  { href: '#top', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Domains' },
  { href: '#work', label: 'Systems' },
  { href: '#axioms', label: 'Axioms' },
  { href: '#radar', label: 'Radar' },
  { href: '#contact', label: 'Contact' },
];

const CURRENT_YEAR = 2026;

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <div className="footer__bar shell">
        <div className="footer__links">
          <p>Quick links</p>
          <nav>
            {footerLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <button
          className="footer__top"
          id="toTopFooter"
          aria-label="Back to top"
        >
          ↑
        </button>

        <div className="footer__meta">
          <p>
            {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
          </p>
          <span>© {CURRENT_YEAR} — Lead Systems Architect. All rights reserved.</span>
        </div>
      </div>

      <h2 className="footer__name" aria-hidden="true">
        <span>{PERSONAL_INFO.firstName}</span>
        <span>{PERSONAL_INFO.lastName}</span>
      </h2>
    </footer>
  );
};
