import React, { useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle2, Cpu } from 'lucide-react';
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
  useEffect(() => {
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

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#0E0E12] border border-white/15 rounded-xl shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#0E0E12]/95 backdrop-blur-md hairline-bottom">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#00F0FF]">{project.num} / CASE STUDY</span>
            <span className="text-white/20">|</span>
            <span className="font-tech text-xs tracking-wider uppercase text-[#8E8E93]">{project.category}</span>
          </div>
          <button
            onClick={() => {
              audioSynth.playClick();
              onClose();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#8E8E93] hover:text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
            data-cursor="CLOSE"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 space-y-12">
          {/* Title & Tagline */}
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
              <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                {project.title}
              </h2>
              <span className="font-mono text-xs px-3 py-1 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                LAUNCHED {project.year}
              </span>
            </div>
            <p className="font-sans text-lg md:text-xl text-[#8E8E93] font-light max-w-3xl leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Hero Media Preview */}
          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden border border-white/10 group">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-xs text-white/80">
              <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                CLIENT: {project.client}
              </span>
              <span className="px-2 py-1 rounded bg-black/60 backdrop-blur-sm border border-white/10">
                DURATION: {project.duration}
              </span>
            </div>
          </div>

          {/* Metrics / Key Stats Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6 rounded-lg bg-white/[0.02] border border-white/10">
            {project.stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-mono text-xs text-[#8E8E93] uppercase mb-1">{stat.label}</span>
                <span className="font-display font-bold text-2xl text-[#00F0FF]">{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Deep Overview, Challenge, Solution */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 hairline-top pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00F0FF]">
              01 // THE CHALLENGE
            </div>
            <div className="md:col-span-8 font-sans text-base text-[#8E8E93] leading-relaxed">
              {project.challenge}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 hairline-top pt-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-[#00FF88]">
              02 // ARCHITECTURAL SOLUTION
            </div>
            <div className="md:col-span-8 font-sans text-base text-[#8E8E93] leading-relaxed">
              {project.solution}
            </div>
          </div>

          {/* Secondary Gallery Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 hairline-top pt-8">
            {project.galleryImages.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
                <img src={img} alt={`${project.title} detail ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Tech Stack & Deliverables */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 hairline-top pt-8">
            <div>
              <h4 className="font-mono text-xs uppercase text-[#8E8E93] mb-4">TECHNOLOGIES USED</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-xs px-3 py-1 rounded bg-white/5 border border-white/10 text-white flex items-center gap-1.5"
                  >
                    <Cpu className="w-3 h-3 text-[#00F0FF]" />
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-mono text-xs uppercase text-[#8E8E93] mb-4">KEY DELIVERABLES</h4>
              <div className="space-y-2">
                {project.deliverables.map((del) => (
                  <div key={del} className="flex items-center gap-2 font-sans text-sm text-[#8E8E93]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-lg bg-[#00F0FF]/5 border border-[#00F0FF]/20">
            <div>
              <h4 className="font-display font-bold text-lg text-white mb-1">Inspired by this project?</h4>
              <p className="font-sans text-xs text-[#8E8E93]">We can build a comparable world for your product or brand.</p>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-6 py-2.5 rounded bg-[#00F0FF] hover:bg-white text-black font-tech font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
            >
              <span>Commission Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
