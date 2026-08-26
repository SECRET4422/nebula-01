import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface CtaSectionProps {
  onOpenContact: () => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenContact }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = () => {
    audioSynth.playClick();
    navigator.clipboard.writeText('dispatch@nebula01.studio');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative py-36 md:py-56 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-16">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
        <span className="tracking-widest uppercase font-semibold">07 // TRANSMISSION</span>
      </div>

      {/* Monumental Headline (Pure Visual Power) */}
      <div className="mb-20">
        <h2
          className="font-display font-black text-[12vw] sm:text-[10vw] lg:text-[8.5vw] leading-[0.88] tracking-tighter uppercase text-white"
          data-cursor="FUTURE"
        >
          <div className="overflow-hidden">
            <span className="block text-white">LET'S MAKE</span>
          </div>
          <div className="overflow-hidden text-transparent bg-clip-text bg-gradient-to-r from-white via-[#7000FF] to-[#00F0FF]">
            <span className="block">SOMETHING</span>
          </div>
          <div className="overflow-hidden">
            <span className="block text-white">IMPOSSIBLE.</span>
          </div>
        </h2>
      </div>

      {/* Final Action Row (Clean, Decisive, Restrained) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end border-t border-white/[0.08] pt-12">
        <div className="md:col-span-6 space-y-4">
          <p className="font-sans text-base sm:text-lg text-[#8E8E93] max-w-lg leading-relaxed font-light">
            We partner with visionary founders, world-class agencies, and cultural institutions to shape what digital space feels like next.
          </p>
          <div>
            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => audioSynth.playHover()}
              className="font-mono text-xs text-[#8E8E93] hover:text-white flex items-center gap-2 transition-colors py-1"
              title="Copy studio email"
              data-cursor="COPY"
              data-magnetic="true"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00FF88]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'DISPATCH@NEBULA01.STUDIO'}</span>
            </button>
          </div>
        </div>

        <div className="md:col-span-6 flex justify-start md:justify-end">
          <button
            onClick={() => {
              audioSynth.playClick();
              onOpenContact();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="group relative inline-flex items-center gap-4 px-9 py-5 rounded-full bg-[#00F0FF] hover:bg-white text-black font-tech font-black text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-[#00F0FF]/25 hover:scale-105"
            data-cursor="START"
            data-magnetic="true"
          >
            <span>Initiate Project</span>
            <div className="w-8 h-8 rounded-full bg-black text-[#00F0FF] flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
