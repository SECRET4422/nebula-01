import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Activity, Layers } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const HeroSection: React.FC = () => {
  const [fps, setFps] = useState<number>(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(Math.round((frameCount * 1000) / (now - lastTime)), 60));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const scrollToManifesto = () => {
    audioSynth.playClick();
    const el = document.getElementById('manifesto');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E93] hairline-bottom pb-4">
        <div className="flex items-center gap-3">
          <span className="px-2 py-0.5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] tracking-wider uppercase font-semibold">
            VOL. 01 / 2026
          </span>
          <span className="hidden sm:inline">SPATIAL COMPUTING & CREATIVE CODE</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-white">
            <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>ENGINE: {fps} FPS</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>RENDERER: WEBGL 2.0</span>
          </div>
        </div>
      </div>

      {/* Center Giant Headline */}
      <div className="my-auto py-12 md:py-16">
        <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8E8E93]">
            STUDIO MONOGRAPH & PORTFOLIO
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-[13vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.88] tracking-tighter uppercase text-white select-none"
          data-cursor="NEBULA"
        >
          <div className="overflow-hidden">
            <span
              className="inline-block transition-transform duration-500 hover:text-[#00F0FF] hover:translate-x-3 cursor-default"
              onMouseEnter={() => audioSynth.playHover()}
            >
              WE BUILD
            </span>
          </div>
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-white/60">
            <span
              className="inline-block transition-transform duration-500 hover:text-white hover:translate-x-3 cursor-default"
              onMouseEnter={() => audioSynth.playHover()}
            >
              DIGITAL
            </span>
          </div>
          <div className="overflow-hidden flex items-center gap-4 sm:gap-8">
            <span
              className="inline-block transition-transform duration-500 hover:text-[#00FF88] hover:translate-x-3 cursor-default"
              onMouseEnter={() => audioSynth.playHover()}
            >
              WORLDS.
            </span>
            <span className="hidden sm:inline-block font-mono text-sm md:text-base text-[#8E8E93] tracking-normal font-normal max-w-[280px] normal-case leading-snug">
              Autonomous 3D worlds, bespoke GLSL shaders, and visceral interaction design.
            </span>
          </div>
        </h1>
      </div>

      {/* Bottom Editorial Narrative & Scroll Anchor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end hairline-top pt-6">
        <div className="md:col-span-6 lg:col-span-5 font-sans text-sm md:text-base text-[#8E8E93] leading-relaxed">
          <p>
            <strong className="text-white font-medium">NEBULA / 01</strong> is an international creative technology studio. We engineer transformative digital experiences, real-time spatial installations, and experimental browser paradigms for pioneering brands worldwide.
          </p>
        </div>

        <div className="hidden lg:block md:col-span-3 font-mono text-[11px] text-[#8E8E93] space-y-1">
          <div>LAT: 52° 31' 12'' N</div>
          <div>LON: 13° 24' 18'' E</div>
          <div className="text-[#00F0FF]">CORE: DISPLACEMENT SHADER 01</div>
        </div>

        <div className="md:col-span-6 lg:col-span-4 flex items-center justify-between md:justify-end gap-6">
          <button
            onClick={scrollToManifesto}
            onMouseEnter={() => audioSynth.playHover()}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-[#8E8E93] hover:text-[#00F0FF] transition-colors"
            data-cursor="SCROLL"
          >
            <span>EXPLORE MANIFESTO</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10 transition-all">
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-0.5 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
