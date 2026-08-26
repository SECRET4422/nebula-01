import React, { useState } from 'react';
import { ArrowRight, Sparkles, Code2, Box, Wand2, Radio, Compass } from 'lucide-react';
import { STUDIO_SERVICES } from '../data/studioData';
import type { Service } from '../data/studioData';
import { audioSynth } from '../utils/audioSynth';

interface ServicesSectionProps {
  onHoverService: (hue?: number) => void;
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onHoverService,
  onOpenContact,
}) => {
  const [expandedId, setExpandedId] = useState<string>('creative-dev');

  const icons: Record<string, React.ReactNode> = {
    'creative-dev': <Code2 className="w-5 h-5 text-[#00F0FF]" />,
    '3d-experiences': <Box className="w-5 h-5 text-[#7000FF]" />,
    'motion-design': <Wand2 className="w-5 h-5 text-[#00FF88]" />,
    'installations': <Radio className="w-5 h-5 text-[#FFB800]" />,
    'art-direction': <Compass className="w-5 h-5 text-[#FF0055]" />,
  };

  const handleMouseEnter = (service: Service) => {
    audioSynth.playHover();
    setExpandedId(service.id);
    onHoverService(service.themeHue);
  };

  const handleMouseLeave = () => {
    onHoverService(undefined);
  };

  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">05 / CAPABILITIES & SERVICES</span>
            <div className="h-[1px] w-16 bg-[#00F0FF]/30" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            HOW WE BUILD
          </h2>
        </div>

        <p className="font-sans text-sm md:text-base text-[#8E8E93] max-w-md leading-relaxed">
          Every capability is built upon bespoke code, mathematical rigour, and spatial choreography. No off-the-shelf templates.
        </p>
      </div>

      {/* Editorial Interactive List */}
      <div className="hairline-top" onMouseLeave={handleMouseLeave}>
        {STUDIO_SERVICES.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => handleMouseEnter(service)}
              className={`hairline-bottom transition-all duration-500 cursor-pointer ${
                isExpanded ? 'bg-white/[0.035] py-10 md:py-14 pl-4 sm:pl-8' : 'py-8 hover:bg-white/[0.015]'
              }`}
              data-cursor="CAPABILITY"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Index Number, Icon & Title */}
                <div className="md:col-span-6 flex items-start gap-5">
                  <span className="font-mono text-sm text-[#00F0FF] font-bold pt-1">{service.num} //</span>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                        {icons[service.id]}
                      </div>
                      <span className="font-mono text-xs text-[#8E8E93] tracking-wider uppercase">
                        {service.tag}
                      </span>
                    </div>
                    <h3
                      className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight transition-colors duration-300 ${
                        isExpanded ? 'text-white' : 'text-[#8E8E93]'
                      }`}
                    >
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Description & Capabilities */}
                <div className="md:col-span-6 space-y-6">
                  <p className="font-sans text-sm sm:text-base text-[#8E8E93] leading-relaxed">
                    {service.description}
                  </p>

                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className={`font-mono text-xs px-3 py-1 rounded-lg border transition-all ${
                          isExpanded
                            ? 'border-[#00F0FF]/40 bg-[#00F0FF]/10 text-white'
                            : 'border-white/10 bg-white/5 text-[#8E8E93]'
                        }`}
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Commission Banner */}
      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 p-8 rounded-2xl border border-white/15 bg-[#0E0E12]/80 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl border border-[#00F0FF] bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF] shadow-lg shadow-[#00F0FF]/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-white">Have a bespoke technical challenge?</h4>
            <p className="font-sans text-xs text-[#8E8E93]">We build customized WebGL & WebGPU pipelines from scratch.</p>
          </div>
        </div>
        <button
          onClick={() => {
            audioSynth.playClick();
            onOpenContact();
          }}
          onMouseEnter={() => audioSynth.playHover()}
          className="px-7 py-3 rounded-xl border border-white/20 bg-white hover:bg-[#00F0FF] hover:border-[#00F0FF] text-black font-tech font-bold text-xs uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 shadow-lg shadow-white/10"
          data-magnetic="true"
        >
          <span>Initiate Commission</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
