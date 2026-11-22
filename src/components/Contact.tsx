import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import { PERSONAL_INFO } from '../data/portfolio-data';

export const Contact: FC = () => {
  const [status, setStatus] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const email = String(fd.get('email') || '').trim();
    const message = String(fd.get('message') || '').trim();

    if (!name || !email || !message) {
      setStatus('Fill in your name, email, and message before dispatching.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("That email address doesn't look valid.");
      return;
    }

    setSubmitting(true);
    setStatus('Sending message...');

    // Mailto fallback or local acknowledgement for static portfolio builds
    setTimeout(() => {
      setStatus("Message recorded. Redirecting to your mail client...");
      window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
        `[Systems Architecture Inquiry] from ${name}`
      )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      setSubmitting(false);
      form.reset();
    }, 600);
  };

  return (
    <div className="contact shell" id="contact">
      <div className="contact__grid">
        <div className="contact__left">
          <h2 className="contact__title" data-reveal>
            <span>Let's Engineer</span>
            <span className="is-accent">Deterministic Systems</span>
          </h2>

          <div className="contact__lines">
            <a href={`mailto:${PERSONAL_INFO.email}`}>{PERSONAL_INFO.email}</a>
            <a href={`tel:${PERSONAL_INFO.phone.replace(/[^0-9+]/g, '')}`}>
              {PERSONAL_INFO.phone}
            </a>
          </div>

          <div className="vcard">
            <span className="vcard__face overflow-hidden rounded-full" aria-hidden="true">
              <img
                src={PERSONAL_INFO.portraitFallback}
                alt={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </span>

            <div>
              <strong>
                {PERSONAL_INFO.firstName} {PERSONAL_INFO.lastName}
              </strong>
              <span>
                {PERSONAL_INFO.role} — {PERSONAL_INFO.company}
              </span>

              <div className="vcard__links">
                {PERSONAL_INFO.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {s.short}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <form id="contactForm" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="cf-name">Name</label>
            <input
              id="cf-name"
              type="text"
              name="name"
              autoComplete="given-name"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="cf-email">Email Address</label>
            <input
              id="cf-email"
              type="email"
              name="email"
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="cf-message">Message</label>
            <textarea id="cf-message" name="message" rows={5} required />
          </div>

          <button
            className="btn-send"
            type="submit"
            disabled={submitting}
            data-ripple
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </button>

          <p className="form-note" id="formNote" role="status">
            {status}
          </p>
        </form>
      </div>
    </div>
  );
};
