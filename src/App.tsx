import React from 'react';
import { ThemeProvider, useTheme } from './lib/themeContext';
import { useLenis } from './lib/useLenis';
import { StyleBackground } from './components/style-theme/StyleBackground';
import { TopNav } from './components/style-theme/TopNav';
import { FloatingRightDock } from './components/style-theme/FloatingRightDock';
import { HeroStyleSection } from './components/style-theme/HeroStyleSection';
import { AboutStyleSection } from './components/style-theme/AboutStyleSection';
import { ServicesStyleSection } from './components/style-theme/ServicesStyleSection';
import { WorkStyleSection } from './components/style-theme/WorkStyleSection';
import { AiLabStyleSection } from './components/style-theme/AiLabStyleSection';
import { ContactStyleSection } from './components/style-theme/ContactStyleSection';
import { CommandPalette } from './components/common/CommandPalette';
import { ResumeModal } from './components/resume-viewer/ResumeModal';
import { ProjectDetailModal } from './components/projects/ProjectDetailModal';
import { RESUME_DATA } from './data/resumeData';

const PortfolioContent: React.FC = () => {
  const { isResumeModalOpen, closeResumeModal, activeProjectModalId, closeProjectModal } = useTheme();
  useLenis();

  const selectedProject = activeProjectModalId
    ? RESUME_DATA.projects.find((p) => p.id === activeProjectModalId)
    : null;

  return (
    <div className="min-h-screen bg-[#0C0B14] text-[#FFFFFF] relative selection:bg-[#F13024]/30 selection:text-white font-sans overflow-x-hidden">
      {/* 1. Atmospheric Visual Theme Layer (Constellation Canvas, Top-Left Splatter, Nebulae, 3D Brain Bulb, Plasma Vortex) */}
      <StyleBackground />

      {/* 2. Top Header Navigation (gowtham m. + Social Icons + Red GitHub Pill) */}
      <TopNav />

      {/* 3. Fixed Right Vertical Navigation Dock (Home, About, Services, Work, AI Lab, Contact) */}
      <FloatingRightDock />

      {/* 4. Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Hero matching img_main.png */}
        <HeroStyleSection />

        {/* Section 2: About matching img1.png */}
        <AboutStyleSection />

        {/* Section 3: Services matching img2.png */}
        <ServicesStyleSection />

        {/* Section 4: Work matching img3.png */}
        <WorkStyleSection />

        {/* Section 5: AI Lab & Swarm Simulator */}
        <AiLabStyleSection />

        {/* Section 6: Contact matching img4.png */}
        <ContactStyleSection />
      </main>

      {/* Global Command Palette (Cmd+K / Ctrl+K) */}
      <CommandPalette />

      {/* ATS-Optimized In-Browser Resume Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={closeResumeModal}
      />

      {/* Deep-Dive Project Detail & Architecture Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={closeProjectModal}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default App;
