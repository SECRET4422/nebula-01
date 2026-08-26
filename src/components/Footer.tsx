import React from 'react';
import { ArrowUp } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] hairline-top py-20 px-6 md:px-12 z-10 text-[#8E8E93] font-mono text-xs">
      <div className="max-w-[1600px] mx-auto space-y-16">
        {/* Accolades Marquee Banner */}
        <div className="hairline-bottom pb-12 overflow-hidden select-none">
          <div className="flex gap-12 items-center text-white/50 text-xs font-mono tracking-widest uppercase animate-marquee whitespace-nowrap">
            <span>AWWWARDS SITE OF THE MONTH // 2026</span>
            <span className="text-[#00F0FF]">✦</span>
            <span>FWA OF THE DAY // 14 HONORS</span>
            <span className="text-[#7000FF]">✦</span>
            <span>CSSDA BEST INNOVATION & UI/UX</span>
            <span className="text-[#00FF88]">✦</span>
            <span>WEBGPU SPATIAL ENGINE VERIFIED</span>
            <span className="text-[#00F0FF]">✦</span>
            <span>NEBULA STUDIO GLOBAL NODES</span>
            <span className="text-[#7000FF]">✦</span>
            <span>AWWWARDS SITE OF THE MONTH // 2026</span>
            <span className="text-[#00F0FF]">✦</span>
            <span>FWA OF THE DAY // 14 HONORS</span>
          </div>
        </div>

        {/* Global Studio Hubs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              BERLIN (HQ)
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
              Oranienstraße 185, Kreuzberg<br />
              10999 Berlin, Germany<br />
              berlin@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              TOKYO LAB
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
              Roppongi Hills Mori Tower 34F<br />
              Minato-ku, Tokyo 106-6108<br />
              tokyo@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              LONDON OFFICE
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed">
              42 Shoreditch High St<br />
              London E1 6JJ, United Kingdom<br />
              london@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              TELEMETRY & SPECS
            </span>
            <div className="space-y-1 text-[11px]">
              <div>STACK: REACT 19 / THREE.JS / GLSL</div>
              <div>ENCRYPTION: TLS 1.3 / AES-256</div>
              <div className="text-[#00F0FF]">STATUS: ALL SYSTEMS NOMINAL</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 hairline-top pt-8">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">NEBULA / 01 © 2026</span>
            <span className="text-white/20">|</span>
            <span>ALL RIGHTS RESERVED</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00F0FF] transition-colors"
            >
              TWITTER / X
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00F0FF] transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://awwwards.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#00F0FF] transition-colors"
            >
              AWWWARDS
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              title="Return to summit"
              data-cursor="TOP"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
