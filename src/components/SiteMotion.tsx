import { useEffect } from 'react';
import type { FC } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export const SiteMotion: FC = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canHover = window.matchMedia('(hover: hover)').matches;
    const $ = <T extends HTMLElement = HTMLElement>(sel: string): T | null => document.querySelector(sel);
    const $$ = <T extends HTMLElement = HTMLElement>(sel: string): T[] => Array.from(document.querySelectorAll(sel));

    let lenis: Lenis | null = null;
    const cleanups: (() => void)[] = [];
    const on = (
      target: EventTarget | null | undefined,
      type: string,
      fn: EventListenerOrEventListenerObject,
      opts?: boolean | AddEventListenerOptions
    ) => {
      if (!target) return;
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const ctx = gsap.context(() => {
      // -------------------------------------------------------
      // Fit each hero line dynamically to the viewport width
      // -------------------------------------------------------
      const heroWord = $('.hero__word');
      const heroLines = $$('.hero__line');

      const fitHero = () => {
        try {
          if (!heroWord || !heroLines.length) return;
          const avail = heroWord.clientWidth;
          if (!avail) return;

          const range = document.createRange();
          const measure = (line: HTMLElement) => {
            range.selectNodeContents(line);
            return range.getBoundingClientRect().width;
          };

          heroLines.forEach((line) => {
            let size = 100;
            line.style.fontSize = `${size}px`;

            for (let pass = 0; pass < 4; pass += 1) {
              const width = measure(line);
              if (!width) return;
              if (Math.abs(width - avail) < 0.5) break;

              size = Math.min((size * avail) / width, 320);
              line.style.fontSize = `${size}px`;
            }
          });
        } catch {
          /* ignore calculation in non-standard layout states */
        }
      };

      fitHero();
      if (document.fonts?.ready) {
        document.fonts.ready.then(fitHero).catch(() => {});
      }
      on(window, 'resize', fitHero);

      // -------------------------------------------------------
      // Theme Toggle Logic
      // -------------------------------------------------------
      const root = document.documentElement;
      const themeBtn = $('#themeToggle');

      const applyTheme = (next: string, remember: boolean) => {
        root.setAttribute('data-theme', next);
        themeBtn?.setAttribute('aria-pressed', String(next === 'dark'));
        if (remember) {
          try {
            localStorage.setItem('theme', next);
          } catch {
            /* private mode */
          }
        }
        document
          .querySelector('meta[name="theme-color"]')
          ?.setAttribute('content', next === 'dark' ? '#06080d' : '#f4f3f1');
      };

      applyTheme(root.getAttribute('data-theme') || 'dark', false);

      on(themeBtn, 'click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next, true);
        ScrollTrigger.refresh();
      });

      // -------------------------------------------------------
      // Lenis Smooth Scroll Engine
      // -------------------------------------------------------
      if (!reduce) {
        try {
          lenis = new Lenis({ lerp: 0.1 });
          lenis.stop();
          lenis.on('scroll', ScrollTrigger.update);

          const lenisRaf = (time: number) => {
            if (lenis) lenis.raf(time * 1000);
          };
          gsap.ticker.add(lenisRaf);
          cleanups.push(() => gsap.ticker.remove(lenisRaf));
          gsap.ticker.lagSmoothing(0);
        } catch {
          lenis = null;
        }
      }

      const scrollTo = (el: Element) => {
        if (lenis) lenis.scrollTo(el, { offset: -70 });
        else el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      };

      // -------------------------------------------------------
      // Hero Parallax Scroll Animation & Lazy Transition
      // -------------------------------------------------------
      const heroSection = $('#hero');
      const heroFigure = $('.hero__figure');

      if (!reduce && heroSection && heroFigure) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: heroSection,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.5,
            },
          })
          .to(
            heroFigure,
            {
              yPercent: 18,
              scale: 1.05,
              ease: 'none',
            },
            0
          )
          .to(
            '.hero__word',
            {
              yPercent: -12,
              ease: 'none',
            },
            0
          )
          .to(
            heroSection,
            {
              opacity: 0.2,
              ease: 'power2.in',
            },
            0.5
          );
      }

      // -------------------------------------------------------
      // Preloader Curtain & Counter Animation
      // -------------------------------------------------------
      const preloader = $('#preloader');
      const countEl = $('#count');
      const barEl = $('#bar');

      let pageStarted = false;
      const startPage = () => {
        if (pageStarted) return;
        pageStarted = true;

        document.body.style.overflow = '';
        if (preloader) {
          preloader.style.pointerEvents = 'none';
          preloader.style.display = 'none';
        }
        if (lenis) lenis.start();

        if (!reduce) {
          gsap.to('.hero__word > span', {
            yPercent: 0,
            duration: 0.9,
            ease: 'power3.out',
          });
          gsap.fromTo(
            '.hero__figure',
            { yPercent: 12, opacity: 0 },
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              delay: 0.1,
              ease: 'power3.out',
            }
          );
        }

        ScrollTrigger.refresh();
      };

      // Failsafe timeout: under NO circumstances will preloader remain after 800ms
      const failsafe = setTimeout(() => {
        if (!pageStarted) {
          startPage();
        }
      }, 800);
      cleanups.push(() => clearTimeout(failsafe));

      if (reduce || !preloader) {
        startPage();
      } else {
        document.body.style.overflow = 'hidden';
        gsap.set('.hero__word > span', { yPercent: 110 });
        gsap.set('.preloader__word > span', { yPercent: 110 });

        const progress = { v: 0 };

        gsap
          .timeline({
            onComplete: startPage,
          })
          .to('.preloader__word > span', {
            yPercent: 0,
            duration: 0.35,
            ease: 'power3.out',
          })
          .to(
            progress,
            {
              v: 100,
              duration: 0.6,
              ease: 'power2.inOut',
              onUpdate: () => {
                const n = Math.round(progress.v);
                if (countEl) countEl.textContent = String(n);
                if (barEl) barEl.style.width = `${n}%`;
              },
            },
            0.05
          )
          .to('.preloader__word > span, .preloader__count', {
            yPercent: -110,
            duration: 0.25,
            ease: 'power3.in',
            stagger: 0.03,
          })
          .to(
            preloader,
            {
              yPercent: -100,
              duration: 0.45,
              ease: 'power3.inOut',
            },
            '-=0.05'
          );
      }

      // -------------------------------------------------------
      // Sticky Header & Back-to-Top State
      // -------------------------------------------------------
      const header = $('#header');
      const toTop = $('#toTop');

      const onScroll = () => {
        if (header) header.classList.toggle('is-stuck', window.scrollY > 40);
        if (toTop) toTop.classList.toggle('is-shown', window.scrollY > 700);
      };

      on(window, 'scroll', onScroll, { passive: true });
      onScroll();

      // -------------------------------------------------------
      // Offcanvas Drawer Navigation
      // -------------------------------------------------------
      const offcanvas = $('#offcanvas');
      const scrim = $('#scrim');
      const menuBtn = $('#menuBtn');

      const setMenu = (open: boolean) => {
        if (!offcanvas) return;

        offcanvas.classList.toggle('is-open', open);
        if (scrim) scrim.classList.toggle('is-open', open);
        offcanvas.setAttribute('aria-hidden', String(!open));
        if (menuBtn) menuBtn.setAttribute('aria-expanded', String(open));
        if (lenis) {
          if (open) lenis.stop();
          else lenis.start();
        }
        document.body.style.overflow = open ? 'hidden' : '';

        if (open) {
          const first = offcanvas.querySelector('a');
          if (first) first.focus();
        } else if (menuBtn) {
          menuBtn.focus();
        }
      };

      on(menuBtn, 'click', () => setMenu(true));
      on($('#menuClose'), 'click', () => setMenu(false));
      on(scrim, 'click', () => setMenu(false));

      // -------------------------------------------------------
      // Ripple Effect on Interactive Buttons
      // -------------------------------------------------------
      $$('[data-ripple]').forEach((btn) => {
        on(btn, 'click', ((e: MouseEvent) => {
          if (reduce) return;

          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height) * 2;
          const span = document.createElement('span');

          span.className = 'ripple';
          span.style.width = `${size}px`;
          span.style.height = `${size}px`;
          span.style.left = `${e.clientX - rect.left - size / 2}px`;
          span.style.top = `${e.clientY - rect.top - size / 2}px`;
          btn.appendChild(span);

          gsap.to(span, {
            scale: 1,
            opacity: 0,
            duration: 0.7,
            ease: 'power2.out',
            onComplete: () => span.remove(),
          });
        }) as EventListener);
      });

      // -------------------------------------------------------
      // Scroll Reveals
      // -------------------------------------------------------
      $$('[data-reveal], [data-fade]').forEach((el) => {
        if (reduce) {
          el.classList.add('is-in');
          return;
        }
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => el.classList.add('is-in'),
        });
      });

      // -------------------------------------------------------
      // Statement Section Word Lighting Scrub
      // -------------------------------------------------------
      const statement = $('#statementText');
      if (statement) {
        const words = Array.from(statement.querySelectorAll('.statement__word'));
        if (reduce) {
          words.forEach((w) => w.classList.add('is-lit'));
        } else {
          ScrollTrigger.create({
            trigger: statement,
            start: 'top 78%',
            end: 'bottom 55%',
            scrub: true,
            onUpdate: (self) => {
              const lit = Math.round(self.progress * words.length);
              words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
            },
          });
        }
      }

      // -------------------------------------------------------
      // Services Kinetic Horizontal Travel
      // -------------------------------------------------------
      const drift = () =>
        parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--svc-drift')) || 120;

      if (!reduce) {
        $$('.svc').forEach((row, i) => {
          const dir = i % 2 ? 1 : -1;
          gsap.fromTo(
            row,
            { x: dir * drift() },
            {
              x: -dir * drift(),
              ease: 'none',
              scrollTrigger: {
                trigger: row,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

      // -------------------------------------------------------
      // Marquee Filling Logic
      // -------------------------------------------------------
      const fillMarquees = () => {
        $$('.stack-marquee').forEach((mq) => {
          const track = mq.querySelector('.stack-marquee__track');
          if (!track || !track.firstElementChild) return;

          const base = track.firstElementChild as HTMLElement;
          const setWidth = base.getBoundingClientRect().width;
          const needed = mq.clientWidth;

          if (!(setWidth > 1) || !(needed > 0)) return;

          const perHalf = Math.max(1, Math.ceil(needed / setWidth));
          const target = Math.min(perHalf * 2, 8);

          while (track.children.length > target) {
            track.lastElementChild?.remove();
          }
          while (track.children.length < target) {
            const copy = base.cloneNode(true) as HTMLElement;
            copy.setAttribute('aria-hidden', 'true');
            track.appendChild(copy);
          }
        });
      };

      fillMarquees();
      if (document.fonts?.ready) {
        document.fonts.ready.then(fillMarquees).catch(() => {});
      }
      on(window, 'resize', fillMarquees);

      // -------------------------------------------------------
      // Motion Budget: Pause decorative loops when off-screen
      // -------------------------------------------------------
      if (!reduce && 'IntersectionObserver' in window) {
        const loopObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const el = entry.target as HTMLElement;
              if (entry.isIntersecting) {
                el.classList.remove('is-paused');
              } else {
                el.classList.add('is-paused');
              }
            });
          },
          { rootMargin: '100px 0px 100px 0px', threshold: 0.02 }
        );

        $$('.strip, .stack-marquee').forEach((el) => loopObserver.observe(el));
        cleanups.push(() => loopObserver.disconnect());
      }

      // -------------------------------------------------------
      // Tech Tiles Back-Out Pop
      // -------------------------------------------------------
      $$('.stack-group').forEach((group) => {
        const tiles = Array.from(group.querySelectorAll('.tech'));
        if (!tiles.length || reduce) return;

        gsap.set(tiles, { opacity: 0, y: 18, scale: 0.86 });

        ScrollTrigger.create({
          trigger: group,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(tiles, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              ease: 'back.out(1.7)',
              stagger: 0.04,
              clearProps: 'transform',
            }),
        });
      });

      // -------------------------------------------------------
      // Animated Stat Numbers on Scroll
      // -------------------------------------------------------
      $$('[data-count]').forEach((el) => {
        const target = parseFloat(el.getAttribute('data-count') || '0');
        const suffix = el.getAttribute('data-suffix') || '';

        if (reduce) {
          el.textContent = `${target}${suffix}`;
          return;
        }

        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 92%',
          once: true,
          onEnter: () => {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => {
                el.textContent = `${Math.round(obj.v)}${suffix}`;
              },
            });
          },
        });
      });

      // -------------------------------------------------------
      // Works Cards Mouse-Follower Bubble
      // -------------------------------------------------------
      const worksCards = $('#worksCards');
      const follow = $('#worksFollow');

      if (worksCards && follow && canHover && !reduce) {
        const works = worksCards.closest('.works') as HTMLElement;
        const toX = gsap.quickTo(follow, 'x', { duration: 0.4, ease: 'power3.out' });
        const toY = gsap.quickTo(follow, 'y', { duration: 0.4, ease: 'power3.out' });

        on(worksCards, 'mousemove', ((e: MouseEvent) => {
          if (!works) return;
          const box = works.getBoundingClientRect();
          const half = follow.offsetWidth / 2;
          toX(e.clientX - box.left - half);
          toY(e.clientY - box.top - half);
        }) as EventListener);

        on(worksCards, 'mouseenter', () =>
          gsap.to(follow, { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' })
        );
        on(worksCards, 'mouseleave', () =>
          gsap.to(follow, { opacity: 0, scale: 0.7, duration: 0.3, ease: 'power3.out' })
        );
      }

      // -------------------------------------------------------
      // Axioms Rows Cursor Image Peek Preview
      // -------------------------------------------------------
      const peekHost = $('#awardRows');
      const peek = $('#peek');

      if (peekHost && peek && canHover && !reduce) {
        const toX = gsap.quickTo(peek, 'x', { duration: 0.55, ease: 'power3.out' });
        const toY = gsap.quickTo(peek, 'y', { duration: 0.55, ease: 'power3.out' });
        const half = () => peek.getBoundingClientRect().width / 2;

        on(peekHost, 'mousemove', ((e: MouseEvent) => {
          const box = peekHost.getBoundingClientRect();
          toX(e.clientX - box.left - half());
          toY(e.clientY - box.top - half() * 1.2);
        }) as EventListener);

        $$('.row').forEach((row) => {
          on(row, 'mouseenter', () => {
            const bg = row.getAttribute('data-peek');
            if (bg) peek.style.backgroundImage = `url("${bg}")`;
            gsap.to(peek, { opacity: 1, scale: 1, duration: 0.35, ease: 'power3.out' });
          });
          on(row, 'mouseleave', () => {
            gsap.to(peek, { opacity: 0, scale: 0.9, duration: 0.3, ease: 'power3.out' });
          });
        });
      }

      // -------------------------------------------------------
      // Experience Horizontal Snap Slider Sync
      // -------------------------------------------------------
      const viewport = $('.voices__viewport');
      const dots = $$('#voicesDots button');

      if (viewport && dots.length) {
        const slides = $$('.voice');

        dots.forEach((dot, i) => {
          on(dot, 'click', () => {
            const slide = slides[i];
            if (!slide) return;
            slide.scrollIntoView({
              behavior: reduce ? 'auto' : 'smooth',
              inline: 'center',
              block: 'nearest',
            });
          });
        });

        const syncDots = () => {
          const mid = viewport.scrollLeft + viewport.clientWidth / 2;
          let best = 0;
          let bestGap = Infinity;

          slides.forEach((slide, i) => {
            const gap = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - mid);
            if (gap < bestGap) {
              bestGap = gap;
              best = i;
            }
          });

          dots.forEach((dot, i) => dot.setAttribute('aria-selected', String(i === best)));
        };

        on(viewport, 'scroll', syncDots, { passive: true });
        syncDots();
      }

      // -------------------------------------------------------
      // Magic Cursor Tracking
      // -------------------------------------------------------
      const cursor = $('#cursor');

      if (cursor && canHover && !reduce) {
        on(window, 'mousemove', ((e: MouseEvent) => {
          gsap.to(cursor, {
            x: e.clientX - 8,
            y: e.clientY - 8,
            duration: 0.45,
            ease: 'power3.out',
          });
        }) as EventListener);

        $$('a, button, .svc, .wcard, .row, .tech').forEach((el) => {
          on(el, 'mouseenter', () => gsap.to(cursor, { scale: 2.8, duration: 0.3 }));
          on(el, 'mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.3 }));
        });
      }

      // -------------------------------------------------------
      // Anchor Jumps & To-Top Handlers
      // -------------------------------------------------------
      $$('a[href^="#"]').forEach((a) => {
        on(a, 'click', (e) => {
          const id = a.getAttribute('href');
          if (!id || id.length < 2) return;

          const el = document.querySelector(id);
          if (!el) return;

          e.preventDefault();
          setMenu(false);
          scrollTo(el);
        });
      });

      const goTop = () => {
        if (lenis) lenis.scrollTo(0);
        else window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      };

      on(toTop, 'click', goTop);
      on($('#toTopFooter'), 'click', goTop);

      on(document, 'keydown', ((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setMenu(false);
        }
      }) as EventListener);
    });

    return () => {
      cleanups.forEach((fn) => fn());
      ctx.revert();
      if (lenis) {
        lenis.destroy();
        lenis = null;
      }
      document.body.style.overflow = '';
    };
  }, []);

  return null;
};
