import { useState, useEffect, useRef } from 'react';
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
import { audioSynth } from './utils/audioSynth';
import type { Project } from './data/studioData';

export function App() {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [scrollVelocity, setScrollVelocity] = useState<number>(0);
  const [activeServiceHue, setActiveServiceHue] = useState<number | undefined>(undefined);
  const [activeProjectId, setActiveProjectId] = useState<string>('aether');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactOpen, setContactOpen] = useState<boolean>(false);
  const [gridVisible, setGridVisible] = useState<boolean>(false);

  const lastScrollY = useRef<number>(0);
  const lastScrollTime = useRef<number>(performance.now());

  useEffect(() => {
    let timeoutId: number;

    const handleScroll = () => {
      const now = performance.now();
      const currentScrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? currentScrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Modulate audio acoustics
      audioSynth.updateScrollAcoustics(progress);

      // Measure scroll velocity
      const dt = Math.max(now - lastScrollTime.current, 10);
      const dy = Math.abs(currentScrollY - lastScrollY.current);
      const velocity = (dy / dt) * 10;
      setScrollVelocity(velocity);

      lastScrollY.current = currentScrollY;
      lastScrollTime.current = now;

      // Relax velocity to 0 after scrolling stops
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        setScrollVelocity(0);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
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

      {/* Persistent WebGL 3D Centerpiece Canvas with Adaptive World Personalities */}
      <ThreeScene
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        activeServiceHue={activeServiceHue}
        activeProjectId={activeProjectId}
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
        <SelectedWorkSection
          onSelectProject={(p) => setSelectedProject(p)}
          onActiveProjectChange={(id) => setActiveProjectId(id)}
        />
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
