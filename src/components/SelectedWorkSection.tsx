import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { STUDIO_PROJECTS } from '../data/studioData';
import type { Project } from '../data/studioData';
import { audioSynth } from '../utils/audioSynth';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = useState<boolean>(true);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
      setScrollProgress(scrollLeft / (scrollWidth - clientWidth || 1));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      checkScroll();
    }
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scrollByAmount = (amount: number) => {
    audioSynth.playClick();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="relative py-28 md:py-36 z-10">
      {/* Header & Controls */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">03 / SELECTED WORK</span>
            <div className="h-[1px] w-16 bg-[#00F0FF]/30" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            FLAGSHIP WORLDS
          </h2>
        </div>

        {/* Progress Bar & Arrow Controls */}
        <div className="flex items-center gap-6">
          {/* Progress Bar */}
          <div className="hidden sm:flex flex-col gap-1.5 w-32">
            <div className="flex justify-between font-mono text-[10px] text-[#8E8E93]">
              <span>INDEX</span>
              <span>{Math.round(scrollProgress * 100)}%</span>
            </div>
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#00F0FF] transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress * 100)}%` }}
              />
            </div>
          </div>

          {/* Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollByAmount(-500)}
              disabled={!canScrollLeft}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              title="Previous project"
              data-cursor="PREV"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollByAmount(500)}
              disabled={!canScrollRight}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              title="Next project"
              data-cursor="NEXT"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="horizontal-scroll-container flex gap-6 md:gap-8 px-6 md:px-12 pb-6 overflow-x-auto select-none"
        data-cursor="DRAG"
      >
        {STUDIO_PROJECTS.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              audioSynth.playClick();
              onSelectProject(project);
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="scroll-snap-card group flex-shrink-0 w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[740px] rounded-xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md overflow-hidden hover:border-[#00F0FF]/50 transition-all duration-500 cursor-pointer flex flex-col justify-between"
            data-cursor="INSPECT"
          >
            {/* Card Header */}
            <div className="p-6 md:p-8 flex items-start justify-between border-b border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#00F0FF]">
                  <span>{project.num} //</span>
                  <span className="uppercase tracking-widest text-[#8E8E93]">{project.category}</span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-[#00F0FF] transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-white group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Media Image Showcase */}
            <div className="relative aspect-[16/10] overflow-hidden bg-black">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-80" />

              {/* Float Tags */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="font-mono text-[10px] px-2 py-1 rounded bg-black/60 backdrop-blur-md border border-white/15 text-white/80">
                  {project.year}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-xs text-white/70">CLIENT: {project.client}</span>
                <span className="font-mono text-xs text-[#00F0FF] underline underline-offset-4 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles className="w-3 h-3" />
                  CASE STUDY
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 md:p-8 bg-white/[0.01] border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <p className="font-sans text-xs sm:text-sm text-[#8E8E93] line-clamp-2 max-w-lg">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#8E8E93]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
