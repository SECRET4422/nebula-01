import React, { useRef, useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Sparkles, Filter } from 'lucide-react';
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
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const categories = ['ALL', 'SPATIAL WEB', 'KINETIC', 'IDENTITY', 'DATA EXPERIENCE'];

  const filteredProjects = STUDIO_PROJECTS.filter((p) => {
    if (selectedFilter === 'ALL') return true;
    if (selectedFilter === 'SPATIAL WEB') return p.category.includes('Spatial');
    if (selectedFilter === 'KINETIC') return p.category.includes('Kinetic');
    if (selectedFilter === 'IDENTITY') return p.category.includes('Identity');
    if (selectedFilter === 'DATA EXPERIENCE') return p.category.includes('Data');
    return true;
  });

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
  }, [filteredProjects]);

  const scrollByAmount = (amount: number) => {
    audioSynth.playClick();
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="relative py-28 md:py-36 z-10 select-none">
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

        {/* Filter Pills & Progress Bar */}
        <div className="flex flex-wrap items-center gap-6">
          {/* Filter Pills */}
          <div className="hidden lg:flex items-center gap-2 p-1 rounded-lg border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md">
            <span className="px-2 text-[10px] font-mono text-[#8E8E93] flex items-center gap-1">
              <Filter className="w-3 h-3" />
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  audioSynth.playClick();
                  setSelectedFilter(cat);
                }}
                onMouseEnter={() => audioSynth.playHover()}
                className={`px-3 py-1 rounded font-mono text-[11px] uppercase tracking-wider transition-all ${
                  selectedFilter === cat
                    ? 'bg-[#00F0FF] text-black font-bold'
                    : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Progress Bar & Arrows */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col gap-1.5 w-28">
              <div className="flex justify-between font-mono text-[10px] text-[#8E8E93]">
                <span>SCRUB</span>
                <span>{Math.round(scrollProgress * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#00F0FF] transition-all duration-150"
                  style={{ width: `${Math.max(20, scrollProgress * 100)}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollByAmount(-550)}
                disabled={!canScrollLeft}
                onMouseEnter={() => audioSynth.playHover()}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-25 disabled:cursor-not-allowed hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 transition-all"
                title="Previous project"
                data-cursor="PREV"
                data-magnetic="true"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount(550)}
                disabled={!canScrollRight}
                onMouseEnter={() => audioSynth.playHover()}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white disabled:opacity-25 disabled:cursor-not-allowed hover:border-[#00F0FF] hover:bg-[#00F0FF]/15 transition-all"
                title="Next project"
                data-cursor="NEXT"
                data-magnetic="true"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Carousel Track */}
      <div
        ref={scrollRef}
        className="horizontal-scroll-container flex gap-6 md:gap-8 px-6 md:px-12 pb-8 overflow-x-auto select-none"
        data-cursor="DRAG"
      >
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => {
              audioSynth.playClick();
              onSelectProject(project);
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="scroll-snap-card group flex-shrink-0 w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[760px] rounded-2xl border border-white/10 bg-[#0E0E12]/90 backdrop-blur-xl overflow-hidden hover:border-[#00F0FF]/60 transition-all duration-500 cursor-pointer flex flex-col justify-between shadow-2xl hover:shadow-[0_0_30px_rgba(0,240,255,0.15)]"
            data-cursor="INSPECT"
          >
            {/* Card Header */}
            <div className="p-6 md:p-8 flex items-start justify-between border-b border-white/5">
              <div>
                <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[#00F0FF]">
                  <span className="font-bold">{project.num} //</span>
                  <span className="uppercase tracking-widest text-[#8E8E93]">{project.category}</span>
                </div>
                <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight uppercase group-hover:text-[#00F0FF] transition-colors">
                  {project.title}
                </h3>
              </div>
              <div className="w-11 h-11 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-white group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF] group-hover:text-black transition-all duration-300">
                <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>

            {/* Media Image Showcase */}
            <div className="relative aspect-[16/9] overflow-hidden bg-black">
              <img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-85" />

              {/* Float Tags */}
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="font-mono text-[10px] px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/15 text-white/90">
                  {project.year}
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
                <span className="font-mono text-xs text-white/80">CLIENT: {project.client}</span>
                <span className="font-mono text-xs text-[#00F0FF] flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 px-3 py-1 rounded-full border border-[#00F0FF]/30 backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  CASE STUDY
                </span>
              </div>
            </div>

            {/* Card Footer */}
            <div className="p-6 md:p-8 bg-white/[0.015] border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
              <p className="font-sans text-xs sm:text-sm text-[#8E8E93] line-clamp-2 max-w-lg leading-relaxed">
                {project.overview}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techStack.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/80"
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
