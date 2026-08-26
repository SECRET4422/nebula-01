import React, { useState, useEffect } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioSynth } from '../utils/audioSynth';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$50k - $100k',
    scope: '3D Spatial Web Experience',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playSuccess();
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#00F0FF', '#7000FF', '#00FF88', '#FFFFFF'],
    });

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-[#0E0E12] border border-white/15 rounded-2xl p-6 sm:p-10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            audioSynth.playClick();
            onClose();
          }}
          className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[#8E8E93] hover:text-white hover:border-[#00F0FF] transition-colors"
          data-cursor="CLOSE"
        >
          <X className="w-4 h-4" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PROJECT DISPATCH // INITIATE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight uppercase mb-2">
              LET'S BUILD A WORLD
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#8E8E93] mb-8">
              Tell us about your ambition. We review inquiries within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white font-sans text-sm focus:border-[#00F0FF] focus:outline-none"
                    placeholder="e.g. Elena Rostova"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white font-sans text-sm focus:border-[#00F0FF] focus:outline-none"
                    placeholder="elena@enterprise.io"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white font-sans text-sm focus:border-[#00F0FF] focus:outline-none"
                    placeholder="e.g. Frontier Robotics"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                    Anticipated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-[#15151B] text-white font-sans text-sm focus:border-[#00F0FF] focus:outline-none"
                  >
                    <option>$30k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k - $250k</option>
                    <option>$250k+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[10px] uppercase text-[#8E8E93] mb-1">
                  Project Vision & Scope
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-white font-sans text-sm focus:border-[#00F0FF] focus:outline-none resize-none"
                  placeholder="Describe your vision, timeline, and key milestones..."
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-lg bg-[#00F0FF] hover:bg-white text-black font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-[#00F0FF]/20"
                data-cursor="TRANSMIT"
              >
                <Send className="w-4 h-4" />
                <span>Transmit Project Dispatch</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="py-12 text-center space-y-4 animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-[#00FF88]/20 border border-[#00FF88] flex items-center justify-center text-[#00FF88] mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-3xl text-white">DISPATCH TRANSMITTED</h3>
            <p className="font-sans text-sm text-[#8E8E93] max-w-md mx-auto">
              Your transmission has been encrypted and routed to the studio partners. We will respond within 24 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
