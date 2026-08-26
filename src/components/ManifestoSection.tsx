import React, { useEffect, useRef, useState } from 'react';
import { audioSynth } from '../utils/audioSynth';

export const ManifestoSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollFraction, setScrollFraction] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height + windowHeight;
      const current = windowHeight - rect.top;
      const progress = Math.min(Math.max(current / total, 0), 1);
      setScrollFraction(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="manifesto"
      ref={sectionRef}
      className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-16">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
        <span className="tracking-widest uppercase font-semibold">02 / MANIFESTO</span>
      </div>

      {/* Primary Statement: Scroll-Scrubbed Typographic Illumination */}
      <div className="mb-24 md:mb-36">
        <h2
          className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.06] tracking-tight max-w-5xl"
          data-cursor="READ"
        >
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.15 ? 'text-white' : 'text-white/20'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            THE WEB SHOULD NOT FEEL
          </span>
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.35 ? 'text-[#8E8E93]' : 'text-[#8E8E93]/20'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            LIKE A FLAT DOCUMENT.
          </span>
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.55
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-white'
                : 'text-white/10'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            IT SHOULD FEEL LIKE AN INHABITED DIMENSION.
          </span>
        </h2>
      </div>

      {/* Three Editorial Philosophy Columns (Minimal & Clean, Non-Card Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 border-t border-white/[0.06] pt-12">
        {/* Pillar 01 */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#00F0FF] font-semibold block">
            01 // SPATIAL DEPTH
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Depth Over Flatness
          </h3>
          <p className="font-sans text-sm text-[#8E8E93] leading-relaxed font-light">
            We reject the monotonous sea of identical rectangular cards. We sculpt volumetric depth, lighting, and physical perspective directly into the canvas.
          </p>
        </div>

        {/* Pillar 02 */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#7000FF] font-semibold block">
            02 // PROCEDURAL CODE
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Generative Systems
          </h3>
          <p className="font-sans text-sm text-[#8E8E93] leading-relaxed font-light">
            Instead of pre-rendered video loops and bloated assets, our experiences compute live mathematical fields, particle vectors, and real-time noise shaders at 60 FPS.
          </p>
        </div>

        {/* Pillar 03 */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#00FF88] font-semibold block">
            03 // EMOTIVE IMPACT
          </span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
            Visceral Resonance
          </h3>
          <p className="font-sans text-sm text-[#8E8E93] leading-relaxed font-light">
            Utilitarian function is the baseline, not the destination. We design digital worlds that evoke wonder, tactile pleasure, and unforgettable memorability.
          </p>
        </div>
      </div>
    </section>
  );
};
