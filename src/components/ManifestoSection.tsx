import React, { useEffect, useRef, useState } from 'react';
import { Compass, Eye, Cpu, Sparkles } from 'lucide-react';
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
      className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none"
    >
      {/* Section Tag */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-12">
        <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
        <span className="tracking-widest uppercase font-semibold">02 / MANIFESTO</span>
        <div className="h-[1px] flex-1 max-w-[120px] bg-[#00F0FF]/30" />
      </div>

      {/* Massive Editorial Headline with Scroll-Scrubbed Illumination */}
      <div className="mb-20 md:mb-32">
        <h2
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight max-w-5xl"
          data-cursor="READ"
        >
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.15 ? 'text-white translate-x-2' : 'text-white/30'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            THE WEB SHOULD NOT FEEL
          </span>
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.35 ? 'text-[#8E8E93] translate-x-4' : 'text-[#8E8E93]/20'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            LIKE A FLAT DOCUMENT.
          </span>
          <span
            className={`block transition-all duration-700 cursor-default ${
              scrollFraction > 0.55
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-white translate-x-6'
                : 'text-white/10'
            }`}
            onMouseEnter={() => audioSynth.playHover()}
          >
            IT SHOULD FEEL LIKE AN INHABITED DIMENSION.
          </span>
        </h2>
      </div>

      {/* Three Spatial Pillar Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 hairline-top pt-12">
        {/* Pillar 01 */}
        <div
          className="group flex flex-col justify-between p-8 rounded-xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md hover:border-[#00F0FF]/50 hover:bg-[#00F0FF]/[0.03] transition-all duration-500 shadow-xl"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor="PILLAR"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#00F0FF] font-semibold">01 / 03</span>
              <Compass className="w-5 h-5 text-[#8E8E93] group-hover:text-[#00F0FF] group-hover:rotate-45 transition-all duration-500" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4 group-hover:text-[#00F0FF] transition-colors">
              Spatial Depth Over 2D Flatness
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              We reject the monotonous sea of identical rectangular cards and commoditized templates. We sculpt depth, volumetric lighting, and physical perspective directly into the canvas.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#00F0FF] transition-colors flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span>SPATIAL PARADIGM →</span>
          </div>
        </div>

        {/* Pillar 02 */}
        <div
          className="group flex flex-col justify-between p-8 rounded-xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md hover:border-[#7000FF]/50 hover:bg-[#7000FF]/[0.03] transition-all duration-500 shadow-xl"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor="PILLAR"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#7000FF] font-semibold">02 / 03</span>
              <Cpu className="w-5 h-5 text-[#8E8E93] group-hover:text-[#7000FF] group-hover:scale-110 transition-all duration-500" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4 group-hover:text-[#7000FF] transition-colors">
              Procedural Systems Over Static Assets
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              Instead of pre-rendered video loops and bloated assets, our experiences compute live mathematical fields, particle vectors, and real-time noise shaders at 60 FPS.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#7000FF] transition-colors flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span>COMPUTATIONAL BEAUTY →</span>
          </div>
        </div>

        {/* Pillar 03 */}
        <div
          className="group flex flex-col justify-between p-8 rounded-xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md hover:border-[#00FF88]/50 hover:bg-[#00FF88]/[0.03] transition-all duration-500 shadow-xl"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor="PILLAR"
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#00FF88] font-semibold">03 / 03</span>
              <Eye className="w-5 h-5 text-[#8E8E93] group-hover:text-[#00FF88] group-hover:scale-110 transition-all duration-500" />
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-4 group-hover:text-[#00FF88] transition-colors">
              Emotive Resonance Over Utilitarian Boredom
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              Utilitarian function is the baseline, not the destination. We design digital worlds that evoke wonder, tactile pleasure, and unforgettable brand memorability.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#00FF88] transition-colors flex items-center gap-2">
            <Sparkles className="w-3 h-3" />
            <span>VISCERAL IMPACT →</span>
          </div>
        </div>
      </div>
    </section>
  );
};
