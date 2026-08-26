import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenContact: () => void;
  gridVisible: boolean;
  onToggleGrid: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(audioSynth.getMuted());
    const unsub = audioSynth.subscribe((muted) => setIsMuted(muted));

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unsub();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (id: string) => {
    audioSynth.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const newMuted = audioSynth.toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#070709]/80 backdrop-blur-lg border-b border-white/[0.06] py-3.5'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Confident Minimalist Brand Identity */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor="NEBULA"
        >
          <span className="font-display font-black text-base tracking-wider text-white">
            NEBULA <span className="text-[#00F0FF]">/</span> 01
          </span>
        </a>

        {/* Quiet Editorial Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Manifesto', id: 'manifesto' },
            { label: 'Work', id: 'work' },
            { label: 'Lab', id: 'lab' },
            { label: 'Services', id: 'services' },
            { label: 'Process', id: 'process' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => audioSynth.playHover()}
              className="font-tech text-xs tracking-widest uppercase text-[#8E8E93] hover:text-white transition-colors relative py-1"
              data-cursor="GO"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Streamlined Controls & Primary Action */}
        <div className="flex items-center gap-3">
          {/* Minimalist Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => audioSynth.playHover()}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all text-xs font-mono ${
              !isMuted
                ? 'border-[#00F0FF] bg-[#00F0FF]/10 text-[#00F0FF]'
                : 'border-white/10 text-[#8E8E93] hover:text-white hover:border-white/20'
            }`}
            title={isMuted ? 'Enable Sound Experience' : 'Mute Sound'}
            data-cursor="AUDIO"
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
              {!isMuted ? 'SOUND ON' : 'SOUND OFF'}
            </span>
          </button>

          {/* Primary Initiate CTA Button */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onOpenContact();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-[#00F0FF] hover:border-[#00F0FF] transition-all duration-300 shadow-sm"
            data-cursor="TALK"
            data-magnetic="true"
          >
            <span>Initiate</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8E8E93] hover:text-white font-mono text-xs"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#070709]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4">
          {['manifesto', 'work', 'lab', 'services', 'process'].map((id) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className="text-left font-tech text-base uppercase tracking-widest text-[#8E8E93] hover:text-[#00F0FF] py-2 border-b border-white/5"
            >
              {id}
            </button>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="w-full mt-2 py-3 rounded-full bg-[#00F0FF] text-black font-tech font-bold text-xs uppercase tracking-widest text-center"
          >
            Initiate Project
          </button>
        </div>
      )}
    </header>
  );
};
