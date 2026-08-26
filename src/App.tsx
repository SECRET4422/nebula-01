import { useState, useEffect } from 'react';
import { ThreeScene } from './components/3d/ThreeScene';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { SelectedWorkSection } from './components/SelectedWorkSection';
import { ExperimentLabSection } from './components/ExperimentLabSection';
import { ServicesSection } from './components/ServicesSection';
import { ProcessSection } from './components/ProcessSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { ContactModal } from './components/ContactModal';
import type { Project } from './data/studioData';

export function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeServiceHue, setActiveServiceHue] = useState<number | undefined>(undefined);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [gridVisible, setGridVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#F5F5F7] font-sans selection:bg-[#00F0FF] selection:text-black">
      {/* Film Grain Texture Overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Architectural Grid Lines Overlay */}
      {gridVisible && (
        <div className="arch-grid" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="arch-grid-col" />
          ))}
        </div>
      )}

      {/* Velocity-Reactive Magnetic Custom Cursor */}
      <CustomCursor />

      {/* Persistent WebGL 3D Centerpiece Canvas */}
      <ThreeScene
        scrollProgress={scrollProgress}
        activeServiceHue={activeServiceHue}
      />

      {/* Sticky Navigation Header */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        gridVisible={gridVisible}
        onToggleGrid={() => setGridVisible(!gridVisible)}
      />

      {/* Main Narrative Page Sections */}
      <main className="relative z-10">
        <HeroSection />
        <ManifestoSection />
        <SelectedWorkSection onSelectProject={(p) => setSelectedProject(p)} />
        <ExperimentLabSection />
        <ServicesSection
          onHoverService={(hue) => setActiveServiceHue(hue)}
          onOpenContact={() => setContactOpen(true)}
        />
        <ProcessSection />
        <CtaSection onOpenContact={() => setContactOpen(true)} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Case Study Deep Dive Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => {
          setSelectedProject(null);
          setContactOpen(true);
        }}
      />

      {/* Project Commission Inquiry Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </div>
  );
}

export default App;
