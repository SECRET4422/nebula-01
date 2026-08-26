import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Layers, Cpu, Radio, Shield } from 'lucide-react';
import { STUDIO_PROJECTS } from '../data/studioData';
import type { Project } from '../data/studioData';
import { audioSynth } from '../utils/audioSynth';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
  onActiveProjectChange?: (projectId: string) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({
  onSelectProject,
  onActiveProjectChange,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const activeProject = STUDIO_PROJECTS[activeIndex];
  const totalProjects = STUDIO_PROJECTS.length;

  const navigateTo = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    audioSynth.playClick();
    setIsTransitioning(true);
    const newIdx = (index + totalProjects) % totalProjects;
    setActiveIndex(newIdx);
    onActiveProjectChange?.(STUDIO_PROJECTS[newIdx].id);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 450);
  };

  useEffect(() => {
    onActiveProjectChange?.(activeProject.id);
  }, []);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') navigateTo(activeIndex + 1);
      if (e.key === 'ArrowLeft') navigateTo(activeIndex - 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isTransitioning]);

  // Project-specific identity badges and themes
  const projectAtmospheres = {
    aether: {
      accent: '#00F0FF',
      glow: 'rgba(0, 240, 255, 0.18)',
      tag: '01 // NEURAL SPATIAL ENGINE',
      icon: <Sparkles className="w-4 h-4 text-[#00F0FF]" />,
      vibe: 'FLUID / ORGANIC / SYNAPTIC',
      statLabel: 'THROUGHPUT',
      statVal: '120K PARTICLES @ 60FPS',
    },
    nocturne: {
      accent: '#7000FF',
      glow: 'rgba(112, 0, 255, 0.22)',
      tag: '02 // ACOUSTIC LIGHT SCULPTURE',
      icon: <Radio className="w-4 h-4 text-[#7000FF]" />,
      vibe: 'VOLUMETRIC / ATMOSPHERIC / RESONANT',
      statLabel: 'LATENCY',
      statVal: '< 8MS WEBSOCKET GATEWAY',
    },
    vector: {
      accent: '#00FF88',
      glow: 'rgba(0, 255, 136, 0.18)',
      tag: '03 // GENERATIVE KINETIC IDENTITY',
      icon: <Cpu className="w-4 h-4 text-[#00FF88]" />,
      vibe: 'COMPUTATIONAL / PRECISE / VECTORIAL',
      statLabel: 'SYSTEM FOOTPRINT',
      statVal: '38 KB CORE PIPELINE',
    },
    echo: {
      accent: '#FFB800',
      glow: 'rgba(255, 184, 0, 0.18)',
      tag: '04 // BIOSPHERIC DATA LANDSCAPE',
      icon: <Shield className="w-4 h-4 text-[#FFB800]" />,
      vibe: 'SPATIAL / REFLECTIVE / MINIMAL',
      statLabel: 'DATA SCULPTURE',
      statVal: '500M+ GEOLOCATED POINTS',
    },
  };

  const currentAtmo = projectAtmospheres[activeProject.id as keyof typeof projectAtmospheres] || projectAtmospheres.aether;

  return (
    <section id="work" className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Section Header & Dimension Index */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">03 / SPATIAL WORLDS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            SELECTED WORK
          </h2>
        </div>

        {/* Spatial Dimension Stepper Navigation */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 p-1.5 rounded-full border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md">
            {STUDIO_PROJECTS.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => navigateTo(idx)}
                onMouseEnter={() => audioSynth.playHover()}
                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeIndex === idx
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-[#8E8E93] hover:text-white'
                }`}
                data-cursor="SELECT"
                data-magnetic="true"
              >
                0{idx + 1} {proj.title}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo(activeIndex - 1)}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
              title="Previous project"
              data-cursor="PREV"
              data-magnetic="true"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo(activeIndex + 1)}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all"
              title="Next project"
              data-cursor="NEXT"
              data-magnetic="true"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Spatial Stage Monolith: The Project Itself Becomes the Interface */}
      <div
        className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0E0E12]/90 backdrop-blur-2xl transition-all duration-700 shadow-2xl group"
        style={{
          boxShadow: `0 0 80px ${currentAtmo.glow}`,
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px] items-stretch">
          {/* Left Column: Asymmetric Monolithic Typography & Narrative */}
          <div className="lg:col-span-5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between z-10 bg-gradient-to-b from-[#0E0E12]/90 via-[#0E0E12]/75 to-[#0E0E12]/95 border-b lg:border-b-0 lg:border-r border-white/10">
            {/* Top Identity Tag */}
            <div>
              <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-[#8E8E93] mb-6">
                {currentAtmo.icon}
                <span style={{ color: currentAtmo.accent }}>{currentAtmo.tag}</span>
              </div>

              {/* Giant Art-Directed Project Title */}
              <h3 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[0.92] mb-6">
                {activeProject.title}
              </h3>

              <p className="font-sans text-base sm:text-lg text-[#8E8E93] font-light leading-relaxed mb-8 max-w-md">
                {activeProject.tagline}
              </p>

              {/* Technical Character Spec */}
              <div className="space-y-3 font-mono text-xs border-t border-white/10 pt-6">
                <div className="flex justify-between text-white/60">
                  <span>DISCIPLINE:</span>
                  <span className="text-white">{activeProject.category}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>CLIENT:</span>
                  <span className="text-white">{activeProject.client}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>CHARACTER:</span>
                  <span style={{ color: currentAtmo.accent }}>{currentAtmo.vibe}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>{currentAtmo.statLabel}:</span>
                  <span className="text-white font-bold">{currentAtmo.statVal}</span>
                </div>
              </div>
            </div>

            {/* Bottom Interaction Trigger */}
            <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  audioSynth.playClick();
                  onSelectProject(activeProject);
                }}
                onMouseEnter={() => audioSynth.playHover()}
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-white hover:bg-[#00F0FF] text-black font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl"
                data-cursor="INSPECT"
                data-magnetic="true"
              >
                <span>Enter Dimension</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <span className="font-mono text-xs text-[#8E8E93]">
                WORLD 0{activeIndex + 1} / 0{totalProjects}
              </span>
            </div>
          </div>

          {/* Right Column: Full-Frame Spatial Viewport with Dynamic Depth */}
          <div
            onClick={() => {
              audioSynth.playClick();
              onSelectProject(activeProject);
            }}
            className="lg:col-span-7 relative min-h-[380px] lg:min-h-full overflow-hidden cursor-pointer group/viewport"
            data-cursor="EXPAND"
          >
            <img
              src={activeProject.heroImage}
              alt={activeProject.title}
              className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover/viewport:scale-105 ${
                isTransitioning ? 'opacity-40 scale-110 filter blur-sm' : 'opacity-100 scale-100'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E12] via-transparent to-transparent opacity-60 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-60 lg:hidden" />

            {/* Ambient Atmosphere Overlay Pill */}
            <div className="absolute top-6 right-6 font-mono text-[11px] px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-white/90 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>SPATIAL INSPECT</span>
            </div>

            {/* Hint Badge */}
            <div className="absolute bottom-6 right-6 font-mono text-xs text-white/80 flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/15 opacity-0 group-hover/viewport:opacity-100 transition-opacity">
              <span>CLICK TO EXPAND CASE STUDY</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#00F0FF]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
