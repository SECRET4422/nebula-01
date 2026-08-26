import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, CheckCircle2, Cpu, Sparkles, Layers } from 'lucide-react';
import type { Project } from '../data/studioData';
import { audioSynth } from '../utils/audioSynth';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenContact,
}) => {
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  useEffect(() => {
    setActiveImageIdx(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const allImages = [project.heroImage, ...project.galleryImages];

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-2xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] bg-[#0E0E12] border border-white/20 rounded-2xl shadow-[0_0_80px_rgba(0,240,255,0.15)] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0E0E12]/95 backdrop-blur-xl hairline-bottom">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00F0FF] font-bold">{project.num} // CASE STUDY</span>
            <span className="text-white/20">|</span>
            <span className="font-tech text-xs tracking-wider uppercase text-[#8E8E93]">{project.category}</span>
          </div>
          <button
            onClick={() => {
              audioSynth.playClick();
              onClose();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-[#8E8E93] hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 transition-all"
            data-cursor="CLOSE"
            data-magnetic="true"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-12 select-none">
          {/* Title & Header */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                {project.title}
              </h2>
              <span className="font-mono text-xs px-3.5 py-1 rounded-full border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] font-bold">
                LAUNCHED {project.year}
              </span>
            </div>
            <p className="font-sans text-lg md:text-xl text-[#8E8E93] font-light max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Interactive Media Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/15 group shadow-2xl bg-black">
              <img
                src={allImages[activeImageIdx]}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-white/90">
                <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10">
                  CLIENT: {project.client}
                </span>
                <span className="px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10">
                  DURATION: {project.duration}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="flex gap-3">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioSynth.playClick();
                    setActiveImageIdx(idx);
                  }}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden border transition-all ${
                    activeImageIdx === idx
                      ? 'border-[#00F0FF] scale-105 shadow-md shadow-[#00F0FF]/30'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Metrics Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 md:p-8 rounded-xl bg-white/[0.02] border border-white/15 shadow-inner">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-xs text-[#8E8E93] uppercase mb-1.5">{stat.label}</span>
                <span className="font-display font-black text-2xl sm:text-3xl text-[#00F0FF] tracking-tight">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Deep Architectural Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 hairline-top pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF] font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              01 // THE CHALLENGE
            </div>
            <div className="md:col-span-8 font-sans text-base text-[#8E8E93] leading-relaxed">
              {project.challenge}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 hairline-top pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00FF88] font-bold flex items-center gap-2">
              <Layers className="w-3.5 h-3.5" />
              02 // ARCHITECTURAL SOLUTION
            </div>
            <div className="md:col-span-8 font-sans text-base text-[#8E8E93] leading-relaxed">
              {project.solution}
            </div>
          </div>

          {/* Tech Stack & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 hairline-top pt-8">
            <div>
              <h4 className="font-mono text-xs uppercase text-[#8E8E93] mb-4 tracking-wider">TECHNOLOGIES USED</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white flex items-center gap-2"
                  >
                    <Cpu className="w-3.5 h-3.5 text-[#00F0FF]" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase text-[#8E8E93] mb-4 tracking-wider">KEY DELIVERABLES</h4>
              <div className="space-y-2.5">
                {project.deliverables.map((del) => (
                  <div key={del} className="flex items-center gap-2.5 font-sans text-sm text-[#8E8E93]">
                    <CheckCircle2 className="w-4 h-4 text-[#00FF88] flex-shrink-0" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Commission Prompt */}
          <div className="flex flex-wrap items-center justify-between gap-6 p-8 rounded-xl bg-[#00F0FF]/5 border border-[#00F0FF]/25 shadow-xl">
            <div>
              <h4 className="font-display font-bold text-xl text-white mb-1">Inspired by this project?</h4>
              <p className="font-sans text-xs sm:text-sm text-[#8E8E93]">We can build a comparable world for your product or brand.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              onMouseEnter={() => audioSynth.playHover()}
              className="px-6 py-3 rounded-xl bg-[#00F0FF] hover:bg-white text-black font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-[#00F0FF]/20"
              data-cursor="COMMISSION"
              data-magnetic="true"
            >
              <span>Commission Similar Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
