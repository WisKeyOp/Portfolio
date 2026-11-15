import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TelemetryMissionControl } from './components/TelemetryMissionControl';
import { ArchitectureDeepDive } from './components/ArchitectureDeepDive';
import { ExperienceSection } from './components/ExperienceSection';
import { CompetitiveSection } from './components/CompetitiveSection';
import { AxiomsSection } from './components/AxiomsSection';
import { SkillsMatrix } from './components/SkillsMatrix';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080B11] text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />
      
      <main className="flex-grow">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <TelemetryMissionControl />
        <ArchitectureDeepDive />
        <ExperienceSection />
        <CompetitiveSection />
        <AxiomsSection />
        <SkillsMatrix />
      </main>

      <Footer />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default App;
