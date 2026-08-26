import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    discipline: 'Spatial Web & WebGL',
    budget: '$50k – $100k',
    message: '',
  });

  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        audioSynth.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioSynth.playClick();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      discipline: 'Spatial Web & WebGL',
      budget: '$50k – $100k',
      message: '',
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-2xl bg-[#0C0C0F] border border-white/15 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl space-y-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-[#00F0FF] mb-2 tracking-widest uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF]" />
              <span>TRANSMISSION GATEWAY</span>
            </div>
            <h2
              id="contact-modal-title"
              className="font-display font-black text-3xl sm:text-4xl text-white uppercase tracking-tight"
            >
              Initiate Project
            </h2>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white hover:border-[#00F0FF] hover:bg-[#00F0FF]/10 transition-colors"
            aria-label="Close contact modal"
            data-cursor="CLOSE"
            data-magnetic="true"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#00FF88]/10 text-[#00FF88] border border-[#00FF88]/30 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-display font-bold text-2xl text-white mb-2">
                Transmission Received
              </h3>
              <p className="font-sans text-sm text-[#8E8E93] max-w-md mx-auto font-light leading-relaxed">
                Our creative directors in Berlin and Tokyo have received your briefing. You will receive a bespoke inquiry docket within 24 hours.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-full bg-white text-black font-tech font-bold text-xs uppercase tracking-widest hover:bg-[#00F0FF] transition-all"
            >
              Close Dispatch
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-name"
                  className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider block mb-2"
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Elena Rostova"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider block mb-2"
                >
                  Email Address *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="elena@dimension.studio"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="contact-discipline"
                  className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider block mb-2"
                >
                  Core Discipline
                </label>
                <select
                  id="contact-discipline"
                  value={formData.discipline}
                  onChange={(e) => setFormData({ ...formData, discipline: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0E12] border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                >
                  <option>Spatial Web & WebGL</option>
                  <option>Kinetic Identity System</option>
                  <option>3D Audio Experience</option>
                  <option>Data Visualization Ecosystem</option>
                  <option>Full Creative Technology Retainer</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="contact-budget"
                  className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider block mb-2"
                >
                  Target Investment
                </label>
                <select
                  id="contact-budget"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#0E0E12] border border-white/15 text-white font-sans text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all"
                >
                  <option>$30k – $50k</option>
                  <option>$50k – $100k</option>
                  <option>$100k – $250k</option>
                  <option>$250k+</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="font-mono text-xs text-[#8E8E93] uppercase tracking-wider block mb-2"
              >
                Project Vision & Timeline
              </label>
              <textarea
                id="contact-message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe the world or system you wish to build..."
                className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/15 text-white placeholder-white/20 font-sans text-sm focus:outline-none focus:border-[#00F0FF] focus:ring-1 focus:ring-[#00F0FF] transition-all resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <span className="font-mono text-[11px] text-[#8E8E93]">
                CONFIDENTIALITY GUARANTEED
              </span>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#00F0FF] hover:bg-white text-black font-tech font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-xl disabled:opacity-50"
                data-cursor="TRANSMIT"
                data-magnetic="true"
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Dispatch Briefing'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
