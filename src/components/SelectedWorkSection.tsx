import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
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

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
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
    <section id="work" className="relative py-32 md:py-44 z-10 select-none">
      {/* Header & Clean Navigation */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">03 / SELECTED WORK</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            FLAGSHIP WORLDS
          </h2>
        </div>

        {/* Minimal Navigation Arrows */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollByAmount(-580)}
            disabled={!canScrollLeft}
            onMouseEnter={() => audioSynth.playHover()}
            className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:border-white hover:bg-white/10 transition-all"
            title="Previous project"
            data-cursor="PREV"
            data-magnetic="true"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scrollByAmount(580)}
            disabled={!canScrollRight}
            onMouseEnter={() => audioSynth.playHover()}
            className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-white disabled:opacity-20 disabled:cursor-not-allowed hover:border-white hover:bg-white/10 transition-all"
            title="Next project"
            data-cursor="NEXT"
            data-magnetic="true"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Track: High-Impact Visuals */}
      <div
        ref={scrollRef}
        className="horizontal-scroll-container flex gap-8 md:gap-10 px-6 md:px-12 pb-6 overflow-x-auto select-none"
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
            className="scroll-snap-card group flex-shrink-0 w-[88vw] sm:w-[600px] md:w-[720px] lg:w-[820px] cursor-pointer flex flex-col justify-between"
            data-cursor="INSPECT"
          >
            {/* Cinematic Full-Frame Media Image */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0E0E12] border border-white/10 mb-6">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* Floating Minimal Tag */}
              <div className="absolute top-5 right-5 font-mono text-[11px] px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
                {project.year}
              </div>

              {/* Corner Expand Icon */}
              <div className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-md group-hover:bg-[#00F0FF] group-hover:border-[#00F0FF] group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>

            {/* Clean Editorial Meta Row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-[#00F0FF] mb-1.5 tracking-wider">
                  {project.num} // {project.category.toUpperCase()}
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase group-hover:text-[#00F0FF] transition-colors">
                  {project.title}
                </h3>
              </div>
              <p className="hidden sm:block font-sans text-xs text-[#8E8E93] max-w-xs font-light text-right leading-relaxed">
                {project.tagline}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
