import React from 'react';
import { Compass, Eye, Cpu } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const ManifestoSection: React.FC = () => {
  return (
    <section id="manifesto" className="relative py-28 md:py-40 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
      {/* Section Tag */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-12">
        <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
        <span className="tracking-widest uppercase font-semibold">02 / MANIFESTO</span>
        <div className="h-[1px] flex-1 max-w-[120px] bg-[#00F0FF]/30" />
      </div>

      {/* Massive Editorial Headline */}
      <div className="mb-20 md:mb-32">
        <h2
          className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight text-white max-w-5xl"
          data-cursor="READ"
        >
          <span
            className="block text-white hover:text-[#00F0FF] transition-colors duration-300 cursor-default"
            onMouseEnter={() => audioSynth.playHover()}
          >
            THE WEB SHOULD NOT FEEL
          </span>
          <span
            className="block text-[#8E8E93] hover:text-white transition-colors duration-300 cursor-default"
            onMouseEnter={() => audioSynth.playHover()}
          >
            LIKE A FLAT DOCUMENT.
          </span>
          <span
            className="block text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#7000FF] to-white hover:opacity-90 transition-opacity cursor-default"
            onMouseEnter={() => audioSynth.playHover()}
          >
            IT SHOULD FEEL LIKE AN INHABITED DIMENSION.
          </span>
        </h2>
      </div>

      {/* Three Editorial Pillar Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 hairline-top pt-12">
        {/* Pillar 01 */}
        <div
          className="group flex flex-col justify-between p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-[#00F0FF]/30 hover:bg-[#00F0FF]/[0.02] transition-all duration-300"
          onMouseEnter={() => audioSynth.playHover()}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#00F0FF]">01 / 03</span>
              <Compass className="w-5 h-5 text-[#8E8E93] group-hover:text-[#00F0FF] transition-colors" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Spatial Depth Over 2D Flatness
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              We reject the monotonous sea of identical rectangular cards and commoditized templates. We sculpt depth, volumetric lighting, and physical perspective directly into the canvas.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#00F0FF] transition-colors">
            SPATIAL PARADIGM →
          </div>
        </div>

        {/* Pillar 02 */}
        <div
          className="group flex flex-col justify-between p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-[#7000FF]/40 hover:bg-[#7000FF]/[0.02] transition-all duration-300"
          onMouseEnter={() => audioSynth.playHover()}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#7000FF]">02 / 03</span>
              <Cpu className="w-5 h-5 text-[#8E8E93] group-hover:text-[#7000FF] transition-colors" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Procedural Systems Over Static Assets
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              Instead of pre-rendered video loops and bloated assets, our experiences compute live mathematical fields, particle vectors, and real-time noise shaders at 60 FPS.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#7000FF] transition-colors">
            COMPUTATIONAL BEAUTY →
          </div>
        </div>

        {/* Pillar 03 */}
        <div
          className="group flex flex-col justify-between p-6 rounded-lg border border-white/5 bg-white/[0.02] hover:border-[#00FF88]/30 hover:bg-[#00FF88]/[0.02] transition-all duration-300"
          onMouseEnter={() => audioSynth.playHover()}
        >
          <div>
            <div className="flex items-center justify-between mb-8">
              <span className="font-mono text-xs text-[#00FF88]">03 / 03</span>
              <Eye className="w-5 h-5 text-[#8E8E93] group-hover:text-[#00FF88] transition-colors" />
            </div>
            <h3 className="font-display font-bold text-xl text-white mb-4">
              Emotive Resonance Over Utilitarian Boredom
            </h3>
            <p className="font-sans text-sm text-[#8E8E93] leading-relaxed">
              Utilitarian function is the baseline, not the destination. We design digital worlds that evoke wonder, tactile pleasure, and unforgettable brand memorability.
            </p>
          </div>
          <div className="mt-8 font-mono text-[11px] text-white/40 group-hover:text-[#00FF88] transition-colors">
            VISCERAL IMPACT →
          </div>
        </div>
      </div>
    </section>
  );
};
