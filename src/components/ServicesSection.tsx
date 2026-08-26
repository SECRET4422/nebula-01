import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
    <section id="services" className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">05 / CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            HOW WE BUILD
          </h2>
        </div>

        <p className="font-sans text-sm md:text-base text-[#8E8E93] max-w-md leading-relaxed font-light">
          Every capability is built upon bespoke code, mathematical rigour, and spatial choreography. No off-the-shelf templates.
        </p>
      </div>

      {/* Editorial Interactive List (Minimal, High-Legibility) */}
      <div className="border-t border-white/[0.08]" onMouseLeave={handleMouseLeave}>
        {STUDIO_SERVICES.map((service) => {
          const isExpanded = expandedId === service.id;

          return (
            <div
              key={service.id}
              onMouseEnter={() => handleMouseEnter(service)}
              className={`border-b border-white/[0.08] transition-all duration-500 cursor-pointer ${
                isExpanded ? 'py-12 md:py-16' : 'py-8 hover:opacity-100 opacity-60'
              }`}
              data-cursor="CAPABILITY"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Index Number & Title */}
                <div className="md:col-span-6 flex items-baseline gap-6">
                  <span className="font-mono text-xs text-[#00F0FF] font-semibold">{service.num} //</span>
                  <div>
                    <h3
                      className={`font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight transition-colors duration-300 ${
                        isExpanded ? 'text-white' : 'text-[#8E8E93]'
                      }`}
                    >
                      {service.title}
                    </h3>
                    <span className="font-mono text-xs text-[#8E8E93]/70 mt-2 block tracking-wider uppercase">
                      {service.tag}
                    </span>
                  </div>
                </div>

                {/* Narrative & Capabilities */}
                <div className="md:col-span-6 space-y-6">
                  <p className="font-sans text-sm sm:text-base text-[#8E8E93] leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Capabilities Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {service.capabilities.map((cap, i) => (
                      <span
                        key={i}
                        className={`font-mono text-xs px-3 py-1 rounded-full border transition-all ${
                          isExpanded
                            ? 'border-white/20 bg-white/5 text-white'
                            : 'border-white/5 text-[#8E8E93]'
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

      {/* Understated Commission Link */}
      <div className="mt-16 flex items-center justify-between border-t border-white/[0.08] pt-8">
        <span className="font-mono text-xs text-[#8E8E93]">BESPOKE WEBGPU & SHADER PIPELINES</span>
        <button
          onClick={() => {
            audioSynth.playClick();
            onOpenContact();
          }}
          onMouseEnter={() => audioSynth.playHover()}
          className="group font-tech text-xs uppercase tracking-widest text-white hover:text-[#00F0FF] inline-flex items-center gap-2 transition-colors"
          data-magnetic="true"
        >
          <span>Initiate Commission</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
    </section>
  );
};
