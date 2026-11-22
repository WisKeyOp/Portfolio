import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Preloader } from './components/Preloader';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Offcanvas } from './components/Offcanvas';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Statement } from './components/Statement';
import { Strip } from './components/Strip';
import { Services } from './components/Services';
import { Works } from './components/Works';
import { Axioms } from './components/Axioms';
import { Experience } from './components/Experience';
import { Logos } from './components/Logos';
// import { TelemetryMissionControl } from './components/TelemetryMissionControl';
// import { ArchitectureDeepDive } from './components/ArchitectureDeepDive';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ToTop } from './components/ToTop';
import { SiteMotion } from './components/SiteMotion';
import { ResumeModal } from './components/ResumeModal';
import { ProjectModal } from './components/ProjectModal';
import { CommandMenu } from './components/CommandMenu';
import { PROJECTS } from './data/portfolio-data';
import type { Project } from './data/portfolio-data';

export const App: FC = () => {
  const [isResumeOpen, setIsResumeOpen] = useState(() => typeof window !== 'undefined' && window.location.hash === '#resume');
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(() => {
    if (typeof window === 'undefined') return null;
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      const projectId = hash.replace('#project-', '');
      return PROJECTS.find((p) => p.id === projectId) || null;
    }
    return null;
  });

  // Sync with URL hash on popstate and handle command palette
  useEffect(() => {
    const handleOpenCommand = () => setIsCommandMenuOpen(true);
    window.addEventListener('open-command-menu', handleOpenCommand);

    const syncHashState = () => {
      const hash = window.location.hash;
      setIsResumeOpen(hash === '#resume');

      if (hash.startsWith('#project-')) {
        const projectId = hash.replace('#project-', '');
        const match = PROJECTS.find((p) => p.id === projectId);
        setSelectedProject(match || null);
      } else {
        setSelectedProject(null);
      }
    };

    window.addEventListener('popstate', syncHashState);

    return () => {
      window.removeEventListener('open-command-menu', handleOpenCommand);
      window.removeEventListener('popstate', syncHashState);
    };
  }, []);

  return (
    <>
      <Preloader />
      <Cursor />
      <Header 
        onOpenResume={() => setIsResumeOpen(true)} 
        onOpenCommandMenu={() => setIsCommandMenuOpen(true)}
      />
      <Offcanvas />

      <main id="top">
        {/* Hero Section with Parallax Scroll & Baseline Cutout */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* About Section — 3-Column Editorial Grid & Live Counter Badges */}
        <About />

        {/* Kinetic Manifesto — Word-Lighting Scrub on Scroll */}
        <Statement />

        {/* Dark Core Band — Infinite Marquee, Kinetic Drift Services, Works & Axioms */}
        <section className="dark">
          <Strip />
          <Services />
          <Works onSelectProject={(project) => setSelectedProject(project)} />
          <Axioms />
        </section>

        {/* Experience Snap Slider */}
        <Experience />

        {/* Systems Stack Marquee & Back-Out Popping Tiles */}
        <Logos />

        {/* Live Distributed Systems Topology Radar & Architecture Deep Dive (Commented out per user request) */}
        {/*
        <section id="radar" className="py-20 shell">
          <div className="mb-10" data-reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--card)] border border-[var(--line)] text-xs font-mono text-[var(--flame)] mb-3">
              <span className="w-2 h-2 rounded-full bg-[var(--flame)]" />
              <span>LIVE SYSTEMS TOPOLOGY // PROPORTIONAL SCALE RADAR</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Systems Topology & Mission Control
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[var(--slate)] max-w-2xl font-sans">
              Proportional scale architecture radar mapping core projects, enterprise work experience, and competitive DSA achievements. Dot diameter directly scales with system complexity, production throughput, and architectural impact.
            </p>
          </div>

          <TelemetryMissionControl />
        </section>

        <ArchitectureDeepDive />
        */}

        {/* Dark Close — Contact Form & Editorial Footer */}
        <section className="dark">
          <Contact />
          <Footer />
        </section>
      </main>

      <ToTop />

      {/* GSAP + Lenis Engine Driving Animations, Parallax & ScrollTriggers */}
      <SiteMotion />

      {/* Modals & Command Menu */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CommandMenu
        isOpen={isCommandMenuOpen}
        onClose={() => setIsCommandMenuOpen(false)}
        onSelectProject={(p) => setSelectedProject(p)}
        onOpenResume={() => setIsResumeOpen(true)}
      />
    </>
  );
};

export default App;
