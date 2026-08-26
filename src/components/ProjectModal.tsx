import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, Award, Layers } from 'lucide-react';
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
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    setActiveImageIndex(0);
    if (!project) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioSynth.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const allImages = [project.heroImage, ...(project.galleryImages || [])];
  const currentImage = allImages[activeImageIndex] || project.heroImage;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto bg-[#0C0C0F] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-2 tracking-wider">
              <span>{project.num}</span>
              <span>/</span>
              <span>{project.category.toUpperCase()}</span>
              <span>/</span>
              <span>{project.year}</span>
            </div>
            <h2
              id="modal-project-title"
              className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight"
            >
              {project.title}
            </h2>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
            aria-label="Close project modal"
            data-cursor="CLOSE"
            data-magnetic="true"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Gallery Image Inspector */}
        <div className="space-y-4">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
            <img
              src={currentImage}
              alt={`${project.title} showcase visual ${activeImageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute top-4 left-4 font-mono text-[11px] px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-white flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
              <span>FRAME 0{activeImageIndex + 1} / 0{allImages.length}</span>
            </div>
          </div>

          {/* Interactive Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {allImages.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioSynth.playHover();
                    setActiveImageIndex(idx);
                  }}
                  className={`relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0 border transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'border-[#00F0FF] ring-2 ring-[#00F0FF]/30 scale-105'
                      : 'border-white/15 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Case Study Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h3 className="font-tech text-xs uppercase tracking-widest text-[#00F0FF] mb-2 font-bold">
                Project Overview
              </h3>
              <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light">
                {project.overview}
              </p>
            </div>

            {/* Impact Metric Cards */}
            {project.stats && project.stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                {project.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4"
                  >
                    <div className="p-2.5 rounded-xl bg-[#00F0FF]/10 text-[#00F0FF]">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-display font-black text-2xl text-white">
                        {stat.value}
                      </div>
                      <div className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6 bg-white/[0.02] border border-white/10 rounded-2xl p-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8E8E93] block mb-1">
                CLIENT
              </span>
              <span className="font-sans text-sm text-white font-medium">
                {project.client}
              </span>
            </div>

            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#8E8E93] block mb-2">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="font-mono text-[11px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  audioSynth.playClick();
                  onOpenContact();
                }}
                className="w-full py-3.5 rounded-full bg-[#00F0FF] hover:bg-white text-black font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2"
                data-cursor="INQUIRE"
                data-magnetic="true"
              >
                <span>Request Commission</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
