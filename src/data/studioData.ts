export interface Project {
  id: string;
  num: string;
  title: string;
  tagline: string;
  category: string;
  year: string;
  client: string;
  duration: string;
  deliverables: string[];
  themeColor: string;
  accentColor: string;
  heroImage: string;
  galleryImages: string[];
  overview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  stats: { label: string; value: string }[];
}

export interface Service {
  id: string;
  num: string;
  title: string;
  tag: string;
  description: string;
  capabilities: string[];
  themeHue: number;
}

export interface ProcessStage {
  step: string;
  title: string;
  phase: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export const STUDIO_PROJECTS: Project[] = [
  {
    id: 'aether',
    num: '01',
    title: 'AETHER',
    tagline: 'Neural Spatial Computing Engine & Real-Time World Generator',
    category: 'Spatial Web / WebGL',
    year: '2026',
    client: 'Aether Neurosystems Corp',
    duration: '16 Weeks',
    deliverables: ['Custom GLSL Shaders', 'WebGPU Compute Engine', 'Spatial UI Framework', 'Design System'],
    themeColor: '#00F0FF',
    accentColor: 'rgba(0, 240, 255, 0.2)',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&auto=format&fit=crop&q=80',
    ],
    overview: 'A real-time neural viewport that translates multidimensional neural datasets into fluid spatial visualizations rendering 120,000 instanced particles at 60 FPS directly within standard browser viewports.',
    challenge: 'Translating millions of live brain-computer telemetry vectors into responsive 3D topological terrains without triggering garbage collection bottlenecks or GPU thermal throttling.',
    solution: 'Engineered a bespoke WebGPU compute pass pipeline utilizing floating-point displacement textures and ping-pong framebuffers, reducing per-frame draw overhead by 78%.',
    techStack: ['Three.js', 'WebGPU', 'GLSL Custom Noise', 'React 19', 'Web Audio API'],
    stats: [
      { label: 'Render Throughput', value: '120k Particles' },
      { label: 'Frame Consistency', value: '60 FPS Fixed' },
      { label: 'Global Recognition', value: 'FWA of the Month' },
    ],
  },
  {
    id: 'nocturne',
    num: '02',
    title: 'NOCTURNE',
    tagline: 'Autonomous Sound, Light & Spatial Kinetic Architecture',
    category: 'Kinetic Installation / Audio',
    year: '2026',
    client: 'Berlin Biennial of Digital Arts',
    duration: '12 Weeks',
    deliverables: ['Generative Audio Node', 'Dynamic Lighting Engine', 'Interactive Web Twin', 'Exhibition Controller'],
    themeColor: '#7000FF',
    accentColor: 'rgba(112, 0, 255, 0.2)',
    heroImage: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop&q=80',
    ],
    overview: 'An interactive audio-visual monolith that listens to ambient room frequencies, deconstructs the acoustic signature through Fast Fourier Transforms, and generates procedural geometric luminescent sculptures.',
    challenge: 'Synchronizing physical DMX lighting fixtures with an ultra-low latency browser-based digital twin accessible worldwide.',
    solution: 'Designed an asynchronous WebSocket edge gateway operating with sub-8ms packet roundtrips, paired with a custom signed distance field (SDF) raymarcher.',
    techStack: ['WebGL 2.0', 'Web Audio FFT', 'Three.js SDF', 'TypeScript', 'Tailwind CSS'],
    stats: [
      { label: 'Latency', value: '< 8ms Gateway' },
      { label: 'Acoustic Bands', value: '1,024 FFT' },
      { label: 'Accolade', value: 'Awwwards SOTD' },
    ],
  },
  {
    id: 'vector',
    num: '03',
    title: 'VECTOR',
    tagline: 'Generative Kinetic Identity System for Next-Gen Autonomous AI',
    category: 'Brand Identity / Creative Code',
    year: '2025',
    client: 'Vector Robotics Lab',
    duration: '10 Weeks',
    deliverables: ['Real-Time Logo Generator', 'Interactive Web Architecture', 'Motion System', 'Brand Guidelines'],
    themeColor: '#00FF88',
    accentColor: 'rgba(0, 255, 136, 0.2)',
    heroImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&auto=format&fit=crop&q=80',
    ],
    overview: 'A living, breathing identity system where every digital touchpoint features a real-time reactive brand glyph that morphs according to server workload, user pointer momentum, and ambient light levels.',
    challenge: 'Maintaining razor-sharp typographic legibility while applying continuous fluid particle and magnetic wireframe distortions.',
    solution: 'Combined variable font weight interpolations with vector SVG matrix shaders rendered on a dedicated offscreen canvas.',
    techStack: ['Canvas API', 'Variable Typography', 'Three.js Shaders', 'Vite', 'React 19'],
    stats: [
      { label: 'Glyph Variants', value: 'Infinite (Procedural)' },
      { label: 'Bundle Footprint', value: '38 kB Core' },
      { label: 'Award', value: 'CSSDA Best UI/UX' },
    ],
  },
  {
    id: 'echo',
    num: '04',
    title: 'ECHO',
    tagline: 'Biospheric Climate Simulation Grid & High-Density Data Landscape',
    category: 'Data Experience / Interactive',
    year: '2025',
    client: 'Global Planetary Institute',
    duration: '14 Weeks',
    deliverables: ['Planetary Digital Twin', 'Microclimate Simulator', 'Interactive Editorial', 'WebGL Shaders'],
    themeColor: '#FFB800',
    accentColor: 'rgba(255, 184, 0, 0.2)',
    heroImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1400&auto=format&fit=crop&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&auto=format&fit=crop&q=80',
    ],
    overview: 'An interactive scientific data sculpture mapping 40 years of atmospheric moisture shifts across the global jet stream into an ethereal fluid particle simulation.',
    challenge: 'Rendering 500 million geolocated climate readings seamlessly across mobile devices with instant time-scrubbing capabilities.',
    solution: 'Utilized quadtree spatial indices and GPU vertex buffer instancing, enabling silky 60 FPS temporal exploration on phones and desktops alike.',
    techStack: ['Three.js', 'InstancedBufferGeometry', 'Geospatial Shaders', 'Web Audio API', 'React'],
    stats: [
      { label: 'Data Points', value: '500M+ Processed' },
      { label: 'Spatial Latency', value: '< 16ms Scrub' },
      { label: 'Accolade', value: 'FWA of the Day' },
    ],
  },
];

export const STUDIO_SERVICES: Service[] = [
  {
    id: 'creative-dev',
    num: '01',
    title: 'Creative Development',
    tag: 'WebGPU / WebGL / Next.js',
    description: 'We engineer high-performance web experiences that push browser execution boundaries. From bespoke GLSL shaders to zero-layout-shift UI choreography, our code is built for awards and longevity.',
    capabilities: ['Custom WebGL & Three.js Shaders', 'WebGPU Compute Pipelines', 'Kinetic React Architecture', 'High-FPS Momentum Physics', 'Headless Creative Engines'],
    themeHue: 190, // Cyan
  },
  {
    id: '3d-experiences',
    num: '02',
    title: '3D Experiences',
    tag: 'Real-Time Spatial Systems',
    description: 'We construct interactive 3D digital environments, procedural product configurators, and hyper-tactile virtual artifacts that invite touch, exploration, and spatial discovery.',
    capabilities: ['Procedural Mesh Generation', 'PBR Lighting & Volumetric Glow', 'Instanced Particle Simulations', 'Interactive World Systems', 'Hardware-Aware Performance'],
    themeHue: 270, // Violet
  },
  {
    id: 'motion-design',
    num: '03',
    title: 'Motion Design & Choreography',
    tag: 'Spatial Rhythm & Physics',
    description: 'Motion is not an afterthought; it is our narrative language. We choreograph viewport transitions, typographic rhythm, and micro-interactions that guide intent and mesmerize.',
    capabilities: ['Scroll-Linked Choreography', 'Physics-Driven Springs & Inertia', 'Custom Typography Demasking', 'Clip-Path Spatial Reveals', 'Magnetic Pointer Dynamics'],
    themeHue: 150, // Emerald
  },
  {
    id: 'installations',
    num: '04',
    title: 'Interactive Installations',
    tag: 'Physical & Digital Blends',
    description: 'Bridging physical architectural spaces with digital twins. We create responsive museum exhibits, live performance stage visuals, and spatial sensor networks.',
    capabilities: ['Real-Time Audio Reactive FFT', 'Spatial Sensor Integration', 'High-Res Multi-Display Sync', 'Projection Mapping Shaders', 'Edge Gateway Controllers'],
    themeHue: 40, // Amber
  },
  {
    id: 'art-direction',
    num: '05',
    title: 'Digital Art Direction',
    tag: 'Bold Editorial Vision',
    description: 'We define singular, unapologetic creative visions. Combining brutalist typography, asymmetric negative space, and evocative color palettes that demand reverence.',
    capabilities: ['Monolithic Typography Systems', 'Art-Directed Design Tokens', 'Generative Visual Identities', 'Editorial Grid Architecture', 'Cultural Soundscapes'],
    themeHue: 320, // Magenta
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    step: '01',
    title: 'DISCOVER',
    phase: 'Conceptual Cartography & Creative Research',
    duration: 'Weeks 1–2',
    description: 'We deconstruct your domain to uncover latent creative opportunities. We establish the emotional arc, acoustic tone, aesthetic constraints, and technical frontiers.',
    deliverables: ['Creative Manifesto', 'Aesthetic Mood Architecture', 'Shader Feasibility Prototypes', 'Technical Architecture Map'],
  },
  {
    step: '02',
    title: 'DESIGN',
    phase: 'Spatial Choreography & Editorial Layouts',
    duration: 'Weeks 3–5',
    description: 'We craft asymmetric editorial grids, monolithic typographic hierarchies, custom design tokens, and motion storyboards with zero reliance on generic templates.',
    deliverables: ['High-Fidelity Spatial Mockups', 'Motion Language Spec', '3D Asset Art Direction', 'Typography Systems'],
  },
  {
    step: '03',
    title: 'PROTOTYPE',
    phase: 'WebGL Shader R&D & Interaction Lab',
    duration: 'Weeks 6–8',
    description: 'We build live browser sandboxes to tune physics springs, GLSL fragment math, camera interpolation curves, and Web Audio frequencies until every micro-interaction feels effortless.',
    deliverables: ['Live 3D Testbed', 'Shader Performance Benchmarks', 'Kinetic Micro-Interaction Suite', 'Audio Synthesizer Engine'],
  },
  {
    step: '04',
    title: 'BUILD',
    phase: 'Production Engineering & Optimization',
    duration: 'Weeks 9–12',
    description: 'Full-stack assembly utilizing React 19, TypeScript, and Three.js. Rigorous GPU profiling, memory leak prevention, DPR scaling, and WCAG accessibility verification.',
    deliverables: ['Production React Application', 'Zero-Layout-Shift Stylesheet', 'Automated Test Suite', 'Cross-Device Fallbacks'],
  },
  {
    step: '05',
    title: 'LAUNCH',
    phase: 'Global Deployment & Award Submission',
    duration: 'Week 13+',
    description: 'CDN edge deployment, lighthouse optimization, analytics telemetry, and submission to international design authorities (Awwwards, FWA, CSS Design Awards).',
    deliverables: ['Global Edge Deployment', 'Lighthouse 95+ Scorecard', 'Awwwards Case Video Kit', 'Long-Term Creative Support'],
  },
];

export const STUDIO_METRICS = [
  { label: 'Awwwards SOTD / SOTM', value: '18+' },
  { label: 'FWA of the Day', value: '14+' },
  { label: 'Global Creative Awards', value: '42' },
  { label: 'Avg Viewport Framerate', value: '60 FPS' },
];
