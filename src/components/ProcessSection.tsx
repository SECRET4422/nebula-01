import React, { useState } from 'react';
import { PROCESS_STAGES } from '../data/studioData';
import { audioSynth } from '../utils/audioSynth';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleStepClick = (index: number) => {
    audioSynth.playClick();
    setActiveStep(index);
  };

  const currentStage = PROCESS_STAGES[activeStep];

  return (
    <section id="process" className="relative py-32 md:py-48 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">06 / METHODOLOGY</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            THE PIPELINE
          </h2>
        </div>

        <div className="font-mono text-xs text-[#8E8E93]">
          VELOCITY: <span className="text-white font-semibold">12–16 WEEKS STANDARD</span>
        </div>
      </div>

      {/* Clean Step Navigation Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4 mb-16">
        {PROCESS_STAGES.map((stage, idx) => (
          <button
            key={stage.step}
            onClick={() => handleStepClick(idx)}
            onMouseEnter={() => audioSynth.playHover()}
            className={`p-5 rounded-xl text-left transition-all duration-300 flex flex-col justify-between h-24 border ${
              activeStep === idx
                ? 'border-white bg-white/10 text-white'
                : 'border-white/[0.08] text-[#8E8E93] hover:border-white/20'
            }`}
            data-cursor="STEP"
          >
            <span className="font-mono text-xs font-semibold">{stage.step}</span>
            <span className="font-display font-bold text-sm uppercase tracking-wider">
              {stage.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active Phase Narrative (Uncluttered, Generous Whitespace) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-white/[0.08] pt-12 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-4 font-mono text-xs text-[#8E8E93]">
            <span className="text-[#00F0FF] font-semibold">PHASE {currentStage.step}</span>
            <span className="text-white/20">|</span>
            <span>{currentStage.duration}</span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
            {currentStage.phase}
          </h3>

          <p className="font-sans text-base text-[#8E8E93] leading-relaxed font-light">
            {currentStage.description}
          </p>
        </div>

        <div className="lg:col-span-5 space-y-4">
          <span className="font-mono text-xs uppercase tracking-wider text-white/50 block mb-4">
            KEY DELIVERABLES
          </span>
          <div className="space-y-3">
            {currentStage.deliverables.map((del, i) => (
              <div key={i} className="flex items-center gap-3 font-sans text-sm text-white/80">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
                <span>{del}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
