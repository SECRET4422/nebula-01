import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isMagnetic, setIsMagnetic] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && 'ontouchstart' in window) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;
    let dotX = -100;
    let dotY = -100;
    let lastX = 0;
    let lastY = 0;
    let velocity = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Check cursor data attribute on targets
      const target = (e.target as HTMLElement)?.closest('[data-cursor]');
      const magneticTarget = (e.target as HTMLElement)?.closest('[data-magnetic]') as HTMLElement | null;

      if (magneticTarget) {
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Magnetic pull towards center
        mouseX = centerX + (e.clientX - centerX) * 0.35;
        mouseY = centerY + (e.clientY - centerY) * 0.35;
        setIsMagnetic(true);
      } else {
        setIsMagnetic(false);
      }

      if (target) {
        const text = target.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      // Linear interpolation with smooth spring damping
      cursorX += (mouseX - cursorX) * 0.16;
      cursorY += (mouseY - cursorY) * 0.16;
      dotX += (mouseX - dotX) * 0.48;
      dotY += (mouseY - dotY) * 0.48;

      // Calculate velocity for kinetic elongation
      const vx = mouseX - lastX;
      const vy = mouseY - lastY;
      velocity = Math.sqrt(vx * vx + vy * vy);
      lastX = mouseX;
      lastY = mouseY;

      const angle = Math.atan2(vy, vx) * (180 / Math.PI);
      const stretch = Math.min(velocity * 0.012, 0.4);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) rotate(${angle}deg) scale(${
          1 + stretch
        }, ${1 - stretch * 0.45})`;
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Magnetic Ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[#00F0FF]/60 mix-blend-difference flex items-center justify-center transition-all duration-150 ease-out will-change-transform ${
          isHovered || isMagnetic
            ? 'w-16 h-16 bg-[#00F0FF]/15 border-[#00F0FF] scale-110'
            : 'w-8 h-8 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-[#00F0FF] font-bold whitespace-nowrap drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]">
            {cursorText}
          </span>
        )}
      </div>

      {/* Center Micro Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#00F0FF] transition-opacity duration-100 will-change-transform ${
          isHovered ? 'w-1.5 h-1.5 opacity-30' : 'w-1 h-1 opacity-90'
        }`}
      />
    </>
  );
};
