import React, { useState } from 'react';
import { CheckCircle2, Clock } from 'lucide-react';
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
    <section id="process" className="relative py-28 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">06 / METHODOLOGY</span>
            <div className="h-[1px] w-16 bg-[#00F0FF]/30" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            THE CHOREOGRAPHY
          </h2>
        </div>

        <div className="font-mono text-xs text-[#8E8E93] flex items-center gap-2">
          <span>PIPELINE VELOCITY:</span>
          <span className="text-[#00FF88] font-bold">12–16 WEEKS STANDARD</span>
        </div>
      </div>

      {/* Progress Navigation Rail */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-12">
        {PROCESS_STAGES.map((stage, idx) => (
          <button
            key={stage.step}
            onClick={() => handleStepClick(idx)}
            onMouseEnter={() => audioSynth.playHover()}
            className={`p-4 rounded-xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-28 ${
              activeStep === idx
                ? 'border-[#00F0FF] bg-[#00F0FF]/10 shadow-lg shadow-[#00F0FF]/15'
                : 'border-white/10 bg-[#0E0E12]/80 hover:border-white/20'
            }`}
            data-cursor="STEP"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#00F0FF]">{stage.step}</span>
              {activeStep > idx ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00FF88]" />
              ) : (
                <span className="text-[10px] font-mono text-[#8E8E93]">{stage.duration}</span>
              )}
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-wider">
              {stage.title}
            </span>
          </button>
        ))}
      </div>

      {/* Active Stage Deep Inspection Panel */}
      <div className="p-8 md:p-12 rounded-2xl border border-white/15 bg-[#0E0E12]/90 backdrop-blur-xl shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs px-2.5 py-1 rounded border border-[#00F0FF]/30 bg-[#00F0FF]/10 text-[#00F0FF]">
                PHASE {currentStage.step} // {currentStage.title}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-xs text-[#8E8E93]">
                <Clock className="w-3.5 h-3.5" />
                {currentStage.duration}
              </span>
            </div>

            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
              {currentStage.phase}
            </h3>

            <p className="font-sans text-base text-[#8E8E93] leading-relaxed">
              {currentStage.description}
            </p>
          </div>

          <div className="lg:col-span-5 p-6 rounded-xl border border-white/10 bg-white/[0.02]">
            <h4 className="font-mono text-xs uppercase text-[#00F0FF] mb-4 tracking-wider">
              KEY PHASE DELIVERABLES
            </h4>
            <div className="space-y-3">
              {currentStage.deliverables.map((del, i) => (
                <div key={i} className="flex items-center gap-3 font-sans text-sm text-white/90">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
