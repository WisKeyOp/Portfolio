import type { FC } from 'react';
import { PERSONAL_INFO } from '../data/portfolio-data';

const navLinks = [
  { href: "#about", label: "01 // About" },
  { href: "#services", label: "02 // Engineering Domains" },
  { href: "#work", label: "03 // Selected Projects" },
  { href: "#axioms", label: "04 // Engineering Principles" },
  { href: "#experience", label: "05 // Work Experience" },
  { href: "#stack", label: "06 // Technologies" },
  { href: "#contact", label: "07 // Contact" },
];

const contactDetails = [
  { icon: "✉", text: PERSONAL_INFO.email, href: `mailto:${PERSONAL_INFO.email}` },
  { icon: "☎", text: PERSONAL_INFO.phone, href: `tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, "")}` },
  { icon: "📍", text: PERSONAL_INFO.location },
  { icon: "⚡", text: "Generative AI Systems Engineer @ EY" },
];

export const Offcanvas: FC = () => {
  return (
    <>
      <div className="scrim" id="scrim" />

      <aside className="offcanvas" id="offcanvas" aria-hidden="true" aria-label="Menu">
        <div className="offcanvas__left">
          <span className="offcanvas__brand">
            <span className="brand__mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            <b>{PERSONAL_INFO.firstName}</b>
          </span>

          <nav className="offcanvas__nav">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                <span>{link.label}</span>
                <i className="offcanvas__chev" aria-hidden="true">
                  ›
                </i>
              </a>
            ))}
          </nav>
        </div>

        <div className="offcanvas__right">
          <button className="offcanvas__close" id="menuClose" aria-label="Close menu">
            ✕
          </button>

          <h2 className="offcanvas__heading">Systems Coordinates</h2>

          <ul className="offcanvas__contact">
            {contactDetails.map((d) => (
              <li key={d.text}>
                <i aria-hidden="true">{d.icon}</i>
                {d.href ? <a href={d.href}>{d.text}</a> : <span>{d.text}</span>}
              </li>
            ))}
          </ul>

          <div className="offcanvas__pills">
            {PERSONAL_INFO.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer">
                {s.label} <i aria-hidden="true">↗</i>
              </a>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
