import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
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

  const handleMouseEnter = (service: Service) => {
    audioSynth.playHover();
    setExpandedId(service.id);
    onHoverService(service.themeHue);
  };

  const handleMouseLeave = () => {
    onHoverService(undefined);
  };

  return (
    <section id="services" className="relative py-28 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
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

        <p className="font-sans text-sm text-[#8E8E93] max-w-md">
          Every capability is built upon bespoke code, mathematical rigour, and spatial choreography. No off-the-shelf templates.
        </p>
      </div>

      {/* Editorial Interactive List (Non-card Layout) */}
      <div className="hairline-top" onMouseLeave={handleMouseLeave}>
        {STUDIO_SERVICES.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => handleMouseEnter(service)}
              className={`hairline-bottom transition-all duration-500 cursor-pointer ${
                isExpanded ? 'bg-white/[0.03] py-10 md:py-14' : 'py-8 hover:bg-white/[0.01]'
              }`}
              data-cursor="CAPABILITY"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Index Number & Title */}
                <div className="md:col-span-6 flex items-baseline gap-6">
                  <span className="font-mono text-sm text-[#00F0FF] font-semibold">{service.num} //</span>
                  <div>
                    <h3
                      className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight transition-colors duration-300 ${
                        isExpanded ? 'text-white' : 'text-[#8E8E93]'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs text-[#8E8E93] mt-2 block tracking-wider">
                      {service.tag}
                    </span>
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
                        className={`font-mono text-xs px-3 py-1 rounded border transition-colors ${
                          isExpanded
                            ? 'border-[#00F0FF]/30 bg-[#00F0FF]/10 text-white'
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
      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 p-8 rounded-xl border border-white/10 bg-[#0E0E12]/60 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-[#00F0FF] bg-[#00F0FF]/10 flex items-center justify-center text-[#00F0FF]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-display font-bold text-lg text-white">Have a unique technical challenge?</h4>
            <p className="font-sans text-xs text-[#8E8E93]">We build bespoke WebGL & WebGPU pipelines from scratch.</p>
          </div>
        </div>
        <button
          onClick={() => {
            audioSynth.playClick();
            onOpenContact();
          }}
          className="px-6 py-2.5 rounded border border-white/20 bg-white hover:bg-[#00F0FF] hover:border-[#00F0FF] text-black font-tech font-bold text-xs uppercase tracking-wider transition-colors inline-flex items-center gap-2"
        >
          <span>Initiate Commission</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
