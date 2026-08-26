import React, { useState, useEffect, useRef } from 'react';
import { FlaskConical } from 'lucide-react';
import * as THREE from 'three';
import { audioSynth } from '../utils/audioSynth';

export const ExperimentLabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'particles' | 'typography' | 'shader3d'>('particles');

  return (
    <section id="lab" className="relative py-28 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto z-10 select-none">
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
        <div className="flex items-center gap-2 p-1.5 rounded-xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-md">
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
              className={`px-4 py-2 rounded-lg font-mono text-xs tracking-wider uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#00F0FF] text-black font-bold shadow-lg shadow-[#00F0FF]/25'
                  : 'text-[#8E8E93] hover:text-white hover:bg-white/5'
              }`}
              data-cursor="SELECT"
              data-magnetic="true"
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Sandbox Canvas Container */}
      <div className="relative rounded-2xl border border-white/15 bg-[#0E0E12]/95 backdrop-blur-xl overflow-hidden min-h-[580px] flex flex-col justify-between shadow-2xl">
        {/* Top Sandbox Header Bar */}
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

        {/* Experiment Viewport */}
        <div className="relative flex-1 min-h-[480px] flex items-center justify-center p-4">
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
      alpha: number;
    }> = [];

    const numParticles = 750;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.6,
        vy: (Math.random() - 0.5) * 1.6,
        size: Math.random() * 2.2 + 0.8,
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
      ctx.fillStyle = 'rgba(14, 14, 18, 0.20)';
      ctx.fillRect(0, 0, width, height);

      const colorMap = {
        cyan: '0, 240, 255',
        violet: '112, 0, 255',
        emerald: '0, 255, 136',
      };
      const rgb = colorMap[colorTheme];

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (isHovering && dist < 240) {
          const force = (240 - dist) / 240;
          if (mode === 'attract') {
            p.vx += (dx / dist) * force * 1.3;
            p.vy += (dy / dist) * force * 1.3;
          } else if (mode === 'repel') {
            p.vx -= (dx / dist) * force * 2.2;
            p.vy -= (dy / dist) * force * 2.2;
          } else if (mode === 'vortex') {
            p.vx += (-dy / dist) * force * 2.6 + (dx / dist) * 0.3;
            p.vy += (dx / dist) * force * 2.6 + (dy / dist) * 0.3;
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
      }

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
    <div className="relative w-full h-full min-h-[460px] flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full rounded-xl cursor-crosshair" />

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/10 bg-black/75 backdrop-blur-md font-mono text-xs">
        <div className="flex items-center gap-3">
          <span className="text-[#8E8E93]">PHYSICS:</span>
          {(['attract', 'repel', 'vortex'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                audioSynth.playClick();
                setMode(m);
              }}
              className={`px-3 py-1 rounded-md border transition-colors uppercase font-bold ${
                mode === m ? 'border-[#00F0FF] bg-[#00F0FF]/15 text-[#00F0FF]' : 'border-white/10 text-[#8E8E93]'
              }`}
              data-magnetic="true"
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
              className={`px-3 py-1 rounded-md border transition-colors uppercase font-bold ${
                colorTheme === c ? 'border-white bg-white/20 text-white' : 'border-white/10 text-[#8E8E93]'
              }`}
              data-magnetic="true"
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
   EXPERIMENT B: KINETIC MATRIX TYPOGRAPHY DISTORTION
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
      className="relative w-full h-full min-h-[460px] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      <div className="flex flex-col items-center justify-center gap-2 sm:gap-3 my-auto">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 sm:gap-3.5 font-display font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight">
            {chars.map((char, charIndex) => {
              const charKey = `${rowIndex}-${charIndex}`;
              const offsetX = (charIndex - chars.length / 2) * 44;
              const offsetY = (rowIndex - rows / 2) * 44;
              const dist = Math.sqrt(
                Math.pow(mousePos.x - (340 + offsetX), 2) + Math.pow(mousePos.y - (220 + offsetY), 2)
              );
              const distort = Math.max(0, 1 - dist / 290);

              return (
                <span
                  key={charKey}
                  style={{
                    transform: `translateY(${distort * -28}px) scale(${1 + distort * 0.45}) rotate(${distort * 16}deg)`,
                    color: distort > 0.4 ? '#00F0FF' : distort > 0.1 ? '#7000FF' : 'rgba(255, 255, 255, 0.28)',
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

      <div className="mt-6 w-full max-w-md flex items-center gap-3 p-2.5 rounded-xl border border-white/10 bg-black/70 backdrop-blur-md">
        <span className="font-mono text-xs text-[#00F0FF] pl-2 font-bold">INPUT:</span>
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
   EXPERIMENT C: PROCEDURAL 3D SHADER LATTICE (HIGH VISIBILITY & INTERACTIVE)
   ========================================================================= */
const Shader3DExperiment: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [geomType, setGeomType] = useState<'knot' | 'torus' | 'octa' | 'icosa'>('knot');

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    // Guaranteed dimensions
    const getDims = () => {
      const rect = container.getBoundingClientRect();
      return {
        width: Math.max(rect.width || container.clientWidth || 800, 320),
        height: Math.max(rect.height || container.clientHeight || 460, 320),
      };
    };

    const { width, height } = getDims();

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // High performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Group for mouse rotation interaction
    const group = new THREE.Group();
    scene.add(group);

    // Geometry Creator
    const createGeometry = (type: string) => {
      if (type === 'torus') return new THREE.TorusGeometry(1.25, 0.42, 32, 100);
      if (type === 'octa') return new THREE.OctahedronGeometry(1.5, 4);
      if (type === 'icosa') return new THREE.IcosahedronGeometry(1.5, 3);
      return new THREE.TorusKnotGeometry(1.05, 0.36, 140, 32);
    };

    // Inner Glowing Mesh with Chromatic Normals
    const innerGeom = createGeometry(geomType);
    const innerMaterial = new THREE.MeshNormalMaterial({
      wireframe: false,
      transparent: true,
      opacity: wireframe ? 0.35 : 0.92,
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMaterial);
    group.add(innerMesh);

    // Outer Cyber Wireframe Cage
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: wireframe ? 0.85 : 0.25,
    });
    const wireMesh = new THREE.Mesh(innerGeom, wireMaterial);
    wireMesh.scale.setScalar(1.02);
    group.add(wireMesh);

    // Interactive Lighting
    const pointLight = new THREE.PointLight(0x00f0ff, 4, 15);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x7000ff, 3, 15);
    pointLight2.position.set(-3, -3, -2);
    scene.add(pointLight2);

    // Interactive Drag Rotation
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      group.rotation.y += deltaX * 0.01;
      group.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let frameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      if (!isDragging) {
        group.rotation.x += delta * 0.4;
        group.rotation.y += delta * 0.6;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Resize Handler via ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      const { width: w, height: h } = getDims();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      innerGeom.dispose();
      innerMaterial.dispose();
      wireMaterial.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [wireframe, geomType]);

  return (
    <div className="relative w-full h-full min-h-[460px] flex items-center justify-center">
      <div
        ref={containerRef}
        className="w-full h-full min-h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center"
        data-cursor="ROTATE"
      />

      <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border border-white/15 bg-black/85 backdrop-blur-md font-mono text-xs shadow-2xl z-10">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="text-[#8E8E93] font-bold">GEOMETRY:</span>
          {(['knot', 'torus', 'octa', 'icosa'] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                audioSynth.playClick();
                setGeomType(g);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all uppercase font-bold text-xs ${
                geomType === g
                  ? 'border-[#00F0FF] bg-[#00F0FF] text-black shadow-md shadow-[#00F0FF]/30'
                  : 'border-white/15 text-[#8E8E93] hover:text-white hover:border-white/30'
              }`}
              data-magnetic="true"
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
            className={`px-4 py-1.5 rounded-lg border transition-all uppercase font-bold text-xs ${
              wireframe
                ? 'border-[#00FF88] bg-[#00FF88] text-black shadow-md shadow-[#00FF88]/30'
                : 'border-white/15 text-[#8E8E93] hover:text-white hover:border-white/30'
            }`}
            data-magnetic="true"
          >
            WIREFRAME: {wireframe ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};
