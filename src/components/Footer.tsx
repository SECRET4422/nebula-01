import React from 'react';
import { ArrowUp } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    audioSynth.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-white/[0.08] py-24 px-6 md:px-12 z-10 text-[#8E8E93] font-mono text-xs select-none">
      <div className="max-w-[1600px] mx-auto space-y-16">
        {/* Global Studio Hubs (Clean Editorial Layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              BERLIN (HQ)
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed font-light">
              Oranienstraße 185, Kreuzberg<br />
              10999 Berlin, Germany<br />
              berlin@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              TOKYO LAB
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed font-light">
              Roppongi Hills Mori Tower 34F<br />
              Minato-ku, Tokyo 106-6108<br />
              tokyo@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              LONDON OFFICE
            </span>
            <p className="font-sans text-xs text-[#8E8E93] leading-relaxed font-light">
              42 Shoreditch High St<br />
              London E1 6JJ, United Kingdom<br />
              london@nebula01.studio
            </p>
          </div>

          <div>
            <span className="text-white font-tech font-bold text-sm tracking-wider uppercase block mb-3">
              ACCOLADES
            </span>
            <div className="space-y-1.5 text-xs font-sans text-[#8E8E93] font-light">
              <div>Awwwards Site of the Month</div>
              <div>14× FWA of the Day</div>
              <div>CSSDA Best Innovation & UI/UX</div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/[0.06] pt-8">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold">NEBULA / 01</span>
            <span className="text-white/20">|</span>
            <span>ALL RIGHTS RESERVED © 2026</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              TWITTER / X
            </a>
            <a
              href="https://github.com/SECRET4422/nebula-01"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              GITHUB
            </a>
            <a
              href="https://awwwards.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors"
            >
              AWWWARDS
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => audioSynth.playHover()}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
              title="Return to top"
              data-cursor="TOP"
              data-magnetic="true"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
