import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Activity, Layers, Terminal } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const HeroSection: React.FC = () => {
  const [fps, setFps] = useState<number>(60);
  const [activeWord, setActiveWord] = useState<number | null>(null);

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
    <section className="relative min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Top Telemetry & Index Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#8E8E93] hairline-bottom pb-4">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF] text-[10px] tracking-widest uppercase font-bold flex items-center gap-1.5">
            <Terminal className="w-3 h-3" />
            VOL. 01 / 2026
          </span>
          <span className="hidden sm:inline text-white/70">SPATIAL COMPUTING & CREATIVE CODE</span>
        </div>

        <div className="flex items-center gap-6 text-[11px]">
          <div className="flex items-center gap-1.5 text-white">
            <Activity className="w-3.5 h-3.5 text-[#00FF88]" />
            <span>ENGINE: <strong className="text-[#00FF88]">{fps} FPS</strong></span>
          </div>
          <div className="hidden md:flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>PIPELINE: WEBGPU / GLSL 2.0</span>
          </div>
        </div>
      </div>

      {/* Center Monolithic Headline with Masked Reveal Choreography */}
      <div className="my-auto py-12 md:py-16">
        <div className="inline-flex items-center gap-2 mb-6 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-[#00F0FF]" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#8E8E93]">
            STUDIO MONOGRAPH & PORTFOLIO
          </span>
        </div>

        <h1
          className="font-display font-extrabold text-[13vw] sm:text-[11vw] lg:text-[9.5vw] leading-[0.88] tracking-tighter uppercase text-white"
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
                  ? 'text-[#00F0FF] translate-x-4 scale-105'
                  : 'text-white'
              }`}
            >
              WE BUILD
            </span>
          </div>

          {/* Row 2: DIGITAL */}
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00F0FF] to-white/70">
            <span
              onMouseEnter={() => {
                audioSynth.playHover();
                setActiveWord(2);
              }}
              onMouseLeave={() => setActiveWord(null)}
              className={`inline-block transition-all duration-500 cursor-default ${
                activeWord === 2
                  ? 'text-white translate-x-4 scale-105'
                  : ''
              }`}
            >
              DIGITAL
            </span>
          </div>

          {/* Row 3: WORLDS. + Editorial Subtext */}
          <div className="overflow-hidden flex flex-wrap items-baseline gap-4 sm:gap-8">
            <span
              onMouseEnter={() => {
                audioSynth.playHover();
                setActiveWord(3);
              }}
              onMouseLeave={() => setActiveWord(null)}
              className={`inline-block transition-all duration-500 cursor-default ${
                activeWord === 3
                  ? 'text-[#00FF88] translate-x-4 scale-105'
                  : 'text-white'
              }`}
            >
              WORLDS.
            </span>
            <span className="hidden sm:inline-block font-mono text-xs md:text-sm text-[#8E8E93] tracking-normal font-normal max-w-[280px] normal-case leading-snug">
              Autonomous 3D worlds, bespoke GLSL shaders, and visceral interaction design.
            </span>
          </div>
        </h1>
      </div>

      {/* Bottom Editorial Narrative & Magnetic Scroll Anchor */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end hairline-top pt-6">
        <div className="md:col-span-6 lg:col-span-5 font-sans text-sm md:text-base text-[#8E8E93] leading-relaxed">
          <p>
            <strong className="text-white font-medium">NEBULA / 01</strong> is an international creative technology studio. We engineer transformative digital experiences, real-time spatial installations, and experimental browser paradigms for pioneering brands worldwide.
          </p>
        </div>

        <div className="hidden lg:block md:col-span-3 font-mono text-[11px] text-[#8E8E93] space-y-1">
          <div>LAT: 52° 31' 12'' N</div>
          <div>LON: 13° 24' 18'' E</div>
          <div className="text-[#00F0FF]">CORE: SIMPLEX NOISE VORTEX</div>
        </div>

        <div className="md:col-span-6 lg:col-span-4 flex items-center justify-between md:justify-end gap-6">
          <button
            onClick={scrollToManifesto}
            onMouseEnter={() => audioSynth.playHover()}
            className="group flex items-center gap-3 font-mono text-xs tracking-widest text-[#8E8E93] hover:text-[#00F0FF] transition-colors"
            data-cursor="SCROLL"
            data-magnetic="true"
          >
            <span>EXPLORE MANIFESTO</span>
            <div className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/15 transition-all">
              <ArrowDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 animate-bounce" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
