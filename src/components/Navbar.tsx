import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Grid, Terminal, ArrowUpRight } from 'lucide-react';
import { audioSynth } from '../utils/audioSynth';

interface NavbarProps {
  onOpenContact: () => void;
  gridVisible: boolean;
  onToggleGrid: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenContact,
  gridVisible,
  onToggleGrid,
}) => {
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [timeUtc, setTimeUtc] = useState<string>('');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsMuted(audioSynth.getMuted());
    const unsub = audioSynth.subscribe((muted) => setIsMuted(muted));

    const updateClocks = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'UTC',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setTimeUtc(`${timeStr} UTC`);
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      unsub();
      clearInterval(interval);
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070709]/80 backdrop-blur-md hairline-bottom py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand / Identifier */}
        <a
          href="#"
          className="flex items-center gap-3 group"
          onMouseEnter={() => audioSynth.playHover()}
          data-cursor="NEBULA"
        >
          <div className="w-8 h-8 rounded border border-white/20 bg-white/5 flex items-center justify-center group-hover:border-[#00F0FF] group-hover:bg-[#00F0FF]/10 transition-colors">
            <span className="font-display font-extrabold text-sm text-[#00F0FF]">N</span>
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
              NEBULA <span className="text-[#00F0FF]">/</span> 01
            </span>
            <span className="font-mono text-[9px] uppercase tracking-widest text-[#8E8E93]">
              Creative Tech Studio
            </span>
          </div>
        </a>

        {/* Global Clocks & Telemetry (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6 font-mono text-[11px] text-[#8E8E93]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] beacon-pulse" />
            <span className="text-white font-medium">DISPATCH: ACTIVE</span>
          </div>
          <div className="h-3 w-[1px] bg-white/10" />
          <div>{timeUtc}</div>
          <div className="h-3 w-[1px] bg-white/10" />
          <div className="text-[10px] text-[#00F0FF]">COORDS: 52.5200° N, 13.4050° E</div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
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
              className="font-tech text-xs tracking-widest uppercase text-[#8E8E93] hover:text-[#00F0FF] transition-colors relative py-1 group"
              data-cursor="GO"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#00F0FF] group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </nav>

        {/* Controls & CTA Button */}
        <div className="flex items-center gap-3">
          {/* Grid Overlay Toggle */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onToggleGrid();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className={`hidden sm:flex items-center justify-center w-8 h-8 rounded border transition-colors ${
              gridVisible
                ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]'
                : 'border-white/10 text-[#8E8E93] hover:text-white hover:border-white/30'
            }`}
            title="Toggle Architectural Grid Overlay"
            data-cursor="GRID"
          >
            <Grid className="w-3.5 h-3.5" />
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => audioSynth.playHover()}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded border transition-all text-xs font-mono ${
              !isMuted
                ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]'
                : 'border-white/10 text-[#8E8E93] hover:text-white hover:border-white/30'
            }`}
            title={isMuted ? 'Enable Sound Experience' : 'Mute Sound'}
            data-cursor="AUDIO"
          >
            {!isMuted ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider">
              {!isMuted ? 'AUDIO ON' : 'AUDIO OFF'}
            </span>
          </button>

          {/* Magnetic Initiate Project CTA */}
          <button
            onClick={() => {
              audioSynth.playClick();
              onOpenContact();
            }}
            onMouseEnter={() => audioSynth.playHover()}
            className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded border border-white/20 bg-white text-black font-tech font-bold text-xs uppercase tracking-wider hover:bg-[#00F0FF] hover:border-[#00F0FF] transition-all duration-300"
            data-cursor="TALK"
          >
            <span>Initiate</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8E8E93] hover:text-white"
          >
            <Terminal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-full bg-[#070709]/95 backdrop-blur-xl hairline-bottom px-6 py-6 flex flex-col gap-4 border-t border-white/10">
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
            className="w-full mt-2 py-3 rounded bg-[#00F0FF] text-black font-tech font-bold text-xs uppercase tracking-widest text-center"
          >
            Initiate Project
          </button>
        </div>
      )}
    </header>
  );
};
