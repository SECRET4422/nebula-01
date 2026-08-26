import React, { useState, useEffect, useRef } from 'react';
import { FlaskConical } from 'lucide-react';
import * as THREE from 'three';
import { audioSynth } from '../utils/audioSynth';

export const ExperimentLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'particles' | 'typography' | 'shader3d'>('particles');

  return (
    <section id="lab" className="relative py-28 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 font-mono text-xs text-[#00F0FF] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF]" />
            <span className="tracking-widest uppercase font-semibold">04 / EXPERIMENT LAB</span>
            <div className="h-[1px] w-16 bg-[#00F0FF]/30" />
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            CREATIVE SANDBOXES
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-lg border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md">
          {[
            { id: 'particles', label: 'EXP_A // Particles' },
            { id: 'typography', label: 'EXP_B // Kinetic Text' },
            { id: 'shader3d', label: 'EXP_C // 3D Lattice' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                audioSynth.playClick();
                setActiveTab(tab.id as 'particles' | 'typography' | 'shader3d');
              }}
              onMouseEnter={() => audioSynth.playHover()}
              className={`px-4 py-2 rounded font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#00F0FF] text-black font-bold shadow-lg shadow-[#00F0FF]/20'
                  : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
              }`}
              data-cursor="SELECT"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Sandbox Canvas Container */}
      <div className="relative rounded-2xl border border-white/15 bg-[#0E0E12]/90 backdrop-blur-xl overflow-hidden min-h-[560px] flex flex-col justify-between shadow-2xl">
        {/* Top Sandbox Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 border-b border-white/10 font-mono text-xs text-[#8E8E93] bg-black/40">
          <div className="flex items-center gap-3">
            <FlaskConical className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-white font-medium">
              {activeTab === 'particles' && 'EXPERIMENT A: QUAD-VORTEX PARTICLE ACCELERATOR'}
              {activeTab === 'typography' && 'EXPERIMENT B: KINETIC MATRIX TYPOGRAPHY DISTORTION'}
              {activeTab === 'shader3d' && 'EXPERIMENT C: PROCEDURAL 3D SHADER LATTICE'}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-[#00FF88] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] beacon-pulse" />
              STATUS: LIVE INTERACTIVE
            </span>
          </div>
        </div>

        {/* Experiment Content Rendering */}
        <div className="relative flex-1 min-h-[440px] flex items-center justify-center p-4">
          {activeTab === 'particles' && <ParticleExperiment />}
          {activeTab === 'typography' && <TypographyExperiment />}
          {activeTab === 'shader3d' && <Shader3DExperiment />}
        </div>
      </div>
    </section>
  );
};

/* =========================================================================
   EXPERIMENT A: PARTICLE ACCELERATOR
   ========================================================================= */
const ParticleExperiment: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<'attract' | 'repel' | 'vortex'>('attract');
  const [colorTheme, setColorTheme] = useState<'cyan' | 'violet' | 'emerald'>('cyan');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      baseX: number;
      baseY: number;
      alpha: number;
    }> = [];

    const numParticles = 800;
    for (let i = 0; i < numParticles; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2.2 + 0.8,
        baseX: x,
        baseY: y,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let isHovering = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      isHovering = true;
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(14, 14, 18, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const colorMap = {
        cyan: '0, 240, 255',
        violet: '112, 0, 255',
        emerald: '0, 255, 136',
      };
      const rgb = colorMap[colorTheme];

      particles.forEach((p) => {
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isHovering && dist < 220) {
          const force = (220 - dist) / 220;
          if (mode === 'attract') {
            p.vx += (dx / dist) * force * 1.2;
            p.vy += (dy / dist) * force * 1.2;
          } else if (mode === 'repel') {
            p.vx -= (dx / dist) * force * 2.0;
            p.vy -= (dy / dist) * force * 2.0;
          } else if (mode === 'vortex') {
            p.vx += (-dy / dist) * force * 2.5 + (dx / dist) * 0.4;
            p.vy += (dx / dist) * force * 2.5 + (dy / dist) * 0.4;
          }
        }

        p.vx *= 0.94;
        p.vy *= 0.94;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(${rgb}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mode, colorTheme]);

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full rounded-xl cursor-crosshair" />

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#8E8E93]">PHYSICS:</span>
          {(['attract', 'repel', 'vortex'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                audioSynth.playClick();
                setMode(m);
              }}
              className={`px-2.5 py-1 rounded border transition-colors uppercase ${
                mode === m ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]' : 'border-white/10 text-[#8E8E93]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#8E8E93]">SPECTRUM:</span>
          {(['cyan', 'violet', 'emerald'] as const).map((c) => (
            <button
              key={c}
              onClick={() => {
                audioSynth.playClick();
                setColorTheme(c);
              }}
              className={`px-2.5 py-1 rounded border transition-colors uppercase ${
                colorTheme === c ? 'border-white bg-white/20 text-white' : 'border-white/10 text-[#8E8E93]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   EXPERIMENT B: KINETIC TYPOGRAPHY DISTORTION
   ========================================================================= */
const TypographyExperiment: React.FC = () => {
  const [customText, setCustomText] = useState<string>('NEBULA COMPUTING');
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const rows = 7;
  const chars = customText.toUpperCase().split('');

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-full min-h-[420px] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-3 my-auto">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 sm:gap-4 font-display font-black text-2xl sm:text-4xl lg:text-5xl">
            {chars.map((char, charIndex) => {
              const charKey = `${rowIndex}-${charIndex}`;
              const offsetX = (charIndex - chars.length / 2) * 40;
              const offsetY = (rowIndex - rows / 2) * 40;
              const dist = Math.sqrt(
                Math.pow(mousePos.x - (300 + offsetX), 2) + Math.pow(mousePos.y - (200 + offsetY), 2)
              );
              const distort = Math.max(0, 1 - dist / 280);

              return (
                <span
                  key={charKey}
                  style={{
                    transform: `translateY(${distort * -24}px) scale(${1 + distort * 0.4}) rotate(${distort * 15}deg)`,
                    color: distort > 0.4 ? '#00F0FF' : distort > 0.1 ? '#7000FF' : 'rgba(255, 255, 255, 0.25)',
                    transition: 'transform 0.1s ease-out, color 0.15s ease-out',
                  }}
                  className="inline-block will-change-transform"
                >
                  {char}
                </span>
              );
            })}
          </div>
        ))}
      </div>

      <div className="mt-6 w-full max-w-md flex items-center gap-3 p-2 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md">
        <span className="font-mono text-xs text-[#00F0FF] pl-2">INPUT:</span>
        <input
          type="text"
          value={customText}
          maxLength={18}
          onChange={(e) => setCustomText(e.target.value)}
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none uppercase tracking-wider"
          placeholder="ENTER TEXT TO DEFORM"
        />
      </div>
    </div>
  );
};

/* =========================================================================
   EXPERIMENT C: 3D SHADER LATTICE
   ========================================================================= */
const Shader3DExperiment: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [geomType, setGeomType] = useState<'torus' | 'octa' | 'knot'>('knot');

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const createGeometry = (type: string) => {
      if (type === 'torus') return new THREE.TorusGeometry(1.3, 0.45, 30, 100);
      if (type === 'octa') return new THREE.OctahedronGeometry(1.6, 3);
      return new THREE.TorusKnotGeometry(1.1, 0.35, 128, 32);
    };

    const material = new THREE.MeshNormalMaterial({
      wireframe: wireframe,
    });

    const currentMesh = new THREE.Mesh(createGeometry(geomType), material);
    scene.add(currentMesh);

    let frameId: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      currentMesh.rotation.x = time * 0.8;
      currentMesh.rotation.y = time * 1.2;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      material.dispose();
      currentMesh.geometry.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [wireframe, geomType]);

  return (
    <div className="relative w-full h-full min-h-[420px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#8E8E93]">GEOMETRY:</span>
          {(['knot', 'torus', 'octa'] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                audioSynth.playClick();
                setGeomType(g);
              }}
              className={`px-2.5 py-1 rounded border transition-colors uppercase ${
                geomType === g ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]' : 'border-white/10 text-[#8E8E93]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              audioSynth.playClick();
              setWireframe(!wireframe);
            }}
            className={`px-3 py-1 rounded border transition-colors uppercase ${
              wireframe ? 'border-[#00FF88] bg-[#00FF88]/15 text-[#00FF88]' : 'border-white/10 text-[#8E8E93]'
            }`}
          >
            WIREFRAME: {wireframe ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
