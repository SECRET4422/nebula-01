import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicking, setIsClicking] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const posRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const targetPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Accessibility: Disable custom cursor on touch devices or if user prefers reduced motion
    const touchMatch = window.matchMedia('(pointer: coarse)');
    const motionMatch = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (touchMatch.matches || motionMatch.matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        setCursorText(cursorTarget.getAttribute('data-cursor') || '');
        setIsHovered(true);
      } else {
        const interactive = target.closest('button, a, input, textarea, [role="button"]');
        if (interactive) {
          setCursorText('');
          setIsHovered(true);
        } else {
          setCursorText('');
          setIsHovered(false);
        }
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    const lerpCursor = () => {
      posRef.current.x += (targetPosRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetPosRef.current.y - posRef.current.y) * 0.18;
      setTrailingPos({ x: posRef.current.x, y: posRef.current.y });
      rafId.current = requestAnimationFrame(lerpCursor);
    };

    rafId.current = requestAnimationFrame(lerpCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${isClicking ? 0.75 : 1})`,
          width: '6px',
          height: '6px',
          backgroundColor: '#00F0FF',
          boxShadow: '0 0 10px #00F0FF, 0 0 20px #00F0FF',
        }}
        aria-hidden="true"
      />

      {/* Trailing Aura Ring with Text Indicator */}
      <div
        className="pointer-events-none fixed top-0 left-0 z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 backdrop-blur-[1px] flex items-center justify-center transition-all duration-300 ease-out"
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0) scale(${
            isHovered ? (cursorText ? 2.4 : 1.8) : 1
          })`,
          width: '36px',
          height: '36px',
          backgroundColor: isHovered ? 'rgba(0, 240, 255, 0.1)' : 'transparent',
          borderColor: isHovered ? '#00F0FF' : 'rgba(255, 255, 255, 0.3)',
        }}
        aria-hidden="true"
      >
        {cursorText && (
          <span className="font-mono text-[6px] tracking-widest text-[#00F0FF] font-bold uppercase select-none">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};
