import React, { useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const HeroSection: React.FC = () => {
  const [activeWord, setActiveWord] = useState<number | null>(null);

  const scrollToManifesto = () => {
    audioSynth.playClick();
    const el = document.getElementById('manifesto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Top Quiet Index Tag */}
      <div className="flex items-center justify-between font-mono text-xs text-[#8E8E93] border-b border-white/[0.06] pb-4">
        <div className="flex items-center gap-3">
          <span className="text-white font-medium">VOL. 01</span>
          <span className="text-white/20">/</span>
          <span>CREATIVE TECHNOLOGY & 3D WORLDS</span>
        </div>
        <div className="hidden sm:block text-[11px] text-[#8E8E93]/70 uppercase tracking-wider">
          BERLIN — TOKYO — LONDON
        </div>
      </div>

      {/* Center Monolithic Hero Headline (The Primary Protagonist) */}
      <div className="my-auto py-12 md:py-20">
        <h1
          className="font-display font-black text-[13vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.88] tracking-tighter uppercase text-white"
          data-cursor="NEBULA"
        >
          {/* Row 1: WE BUILD */}
          <div className="overflow-hidden">
            <span
              onMouseEnter={() => {
                audioSynth.playHover();
                setActiveWord(1);
              }}
              onMouseLeave={() => setActiveWord(null)}
              className={`inline-block transition-all duration-500 cursor-default ${
                activeWord === 1
                  ? 'text-[#00F0FF] translate-x-3'
                  : 'text-white'
              }`}
            >
              WE BUILD
            </span>
          </div>

          {/* Row 2: DIGITAL */}
          <div className="overflow-hidden">
            <span
              onMouseEnter={() => {
                audioSynth.playHover();
                setActiveWord(2);
              }}
              onMouseLeave={() => setActiveWord(null)}
              className={`inline-block transition-all duration-500 cursor-default ${
                activeWord === 2
                  ? 'text-white translate-x-3'
                  : 'text-white/90'
              }`}
            >
              DIGITAL
            </span>
          </div>

          {/* Row 3: WORLDS. */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-4 sm:gap-8">
            <span
              onMouseEnter={() => {
                audioSynth.playHover();
                setActiveWord(3);
              }}
              onMouseLeave={() => setActiveWord(null)}
              className={`inline-block transition-all duration-500 cursor-default ${
                activeWord === 3
                  ? 'text-[#00FF88] translate-x-3'
                  : 'text-white'
              }`}
            >
              WORLDS.
            </span>
            <span className="hidden lg:inline-block font-sans text-xs md:text-sm text-[#8E8E93] tracking-normal font-light max-w-[260px] normal-case leading-relaxed">
              Spatial installations, bespoke GLSL shaders, and visceral interaction design.
            </span>
          </div>
        </h1>
      </div>

      {/* Bottom Editorial Narrative & Magnetic Scroll Anchor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/[0.06] pt-6">
        <div className="md:col-span-8 lg:col-span-6 font-sans text-sm md:text-base text-[#8E8E93] leading-relaxed font-light">
          <p>
            <strong className="text-white font-medium">NEBULA / 01</strong> is an international creative technology studio. We engineer transformative digital experiences, real-time spatial installations, and experimental browser paradigms for pioneering brands.
          </p>
        </div>

        <div className="md:col-span-4 lg:col-span-6 flex justify-start md:justify-end">
          <button
            onClick={scrollToManifesto}
            onMouseEnter={() => audioSynth.playHover()}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-[#8E8E93] hover:text-[#00F0FF] transition-colors"
            data-cursor="SCROLL"
            data-magnetic="true"
          >
            <span>MANIFESTO</span>
            <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10 transition-all">
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
