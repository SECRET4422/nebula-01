import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  scrollProgress: number;
  activeServiceHue?: number;
  activeSection?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  scrollProgress,
  activeServiceHue,
  activeSection,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    artifactGroup: THREE.Group;
    mainMesh: THREE.Mesh;
    wireMesh: THREE.Mesh;
    particles: THREE.Points;
    pointLight1: THREE.PointLight;
    pointLight2: THREE.PointLight;
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
    clock: THREE.Clock;
    frameId: number;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.035);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // 2. WebGL Renderer with performance optimization
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Artifact Geometry & Custom Shaders
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Main icosahedron geometry
    const geom = new THREE.IcosahedronGeometry(1.6, 24);
    
    // Custom GLSL Vertex & Fragment Shaders for noise displacement & chromatic fresnel
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.28 },
        uColor1: { value: new THREE.Color(0x00f0ff) },
        uColor2: { value: new THREE.Color(0x7000ff) },
        uColor3: { value: new THREE.Color(0x00ff88) },
        uScroll: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uNoiseStrength;
        uniform float uScroll;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
        float snoise(vec3 v){
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min( g.xyz, l.zxy );
          vec3 i2 = max( g.xyz, l.zxy );
          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
          i = mod(i, 289.0 );
          vec4 p = permute( permute( permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
          float n_ = 0.142857142857;
          vec3  ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_ );
          vec4 x = x_ *ns.x + ns.yyyy;
          vec4 y = y_ *ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4( x.xy, y.xy );
          vec4 b1 = vec4( x.zw, y.zw );
          vec4 s0 = floor(b0)*2.0 + 1.0;
          vec4 s1 = floor(b1)*2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
          vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
          vec3 p0 = vec3(a0.xy,h.x);
          vec3 p1 = vec3(a0.zw,h.y);
          vec3 p2 = vec3(a1.xy,h.z);
          vec3 p3 = vec3(a1.zw,h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          
          float n = snoise(position * 1.5 + vec3(uTime * 0.4));
          vDisplacement = n;
          
          vec3 newPosition = position + normal * (n * uNoiseStrength * (1.0 + uScroll * 1.2));
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        uniform vec3 uColor3;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying float vDisplacement;

        void main() {
          vec3 viewDirection = normalize(-vPosition);
          float fresnel = dot(viewDirection, vNormal);
          fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
          fresnel = pow(fresnel, 2.5);

          vec3 color = mix(uColor1, uColor2, smoothstep(-0.5, 0.5, vDisplacement));
          color = mix(color, uColor3, fresnel * 0.8);
          color += fresnel * vec3(0.4, 0.9, 1.0);

          gl_FragColor = vec4(color, 0.88);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const mainMesh = new THREE.Mesh(geom, customMaterial);
    artifactGroup.add(mainMesh);

    // Outer wireframe shell
    const wireGeom = new THREE.IcosahedronGeometry(1.8, 6);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    artifactGroup.add(wireMesh);

    // 4. Ambient Particle Nebula
    const particleCount = 2000;
    const particleGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.5 + Math.random() * 8.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
      scaleArray[i / 3] = Math.random();
    }

    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeom.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3.5, 15);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7000ff, 3.0, 15);
    pointLight2.position.set(-4, -3, -2);
    scene.add(pointLight2);

    // 6. Interaction State
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Store refs
    sceneRef.current = {
      renderer,
      scene,
      camera,
      artifactGroup,
      mainMesh,
      wireMesh,
      particles,
      pointLight1,
      pointLight2,
      mouse,
      targetMouse,
      clock,
      frameId: 0,
    };

    // Animation Loop
    const animate = () => {
      if (!sceneRef.current) return;
      const {
        renderer,
        scene,
        camera,
        artifactGroup,
        mainMesh,
        wireMesh,
        particles,
        mouse,
        targetMouse,
        clock,
      } = sceneRef.current;

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      // Update shader uniform time
      (mainMesh.material as THREE.ShaderMaterial).uniforms.uTime.value = elapsedTime;

      // Base idle rotation + mouse parallax
      artifactGroup.rotation.y = elapsedTime * 0.25 + mouse.x * 0.6;
      artifactGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2 + mouse.y * 0.4;
      wireMesh.rotation.y = -elapsedTime * 0.15;
      wireMesh.rotation.z = elapsedTime * 0.1;

      // Rotate particle cloud slowly
      particles.rotation.y = elapsedTime * 0.04;
      particles.rotation.x = mouse.y * 0.1;

      renderer.render(scene, camera);
      sceneRef.current.frameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.frameId);
        renderer.dispose();
        geom.dispose();
        customMaterial.dispose();
        wireGeom.dispose();
        wireMat.dispose();
        particleGeom.dispose();
        particleMat.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  // Update 3D Transformations based on scrollProgress & active section
  useEffect(() => {
    if (!sceneRef.current) return;
    const { artifactGroup, camera, mainMesh, wireMesh, particles, pointLight1 } = sceneRef.current;

    const p = scrollProgress; // 0.0 -> 1.0
    const wireMat = wireMesh.material as THREE.MeshBasicMaterial;

    // Shader scroll uniform
    if (mainMesh.material) {
      (mainMesh.material as THREE.ShaderMaterial).uniforms.uScroll.value = p;
    }

    // Scroll state choreography
    if (p < 0.18) {
      // 01: HERO
      artifactGroup.position.set(0, 0, 0);
      artifactGroup.scale.setScalar(1.0 + Math.sin(p * Math.PI) * 0.2);
      wireMat.opacity = 0.18;
      camera.position.z = 7;
    } else if (p < 0.38) {
      // 02: MANIFESTO (Zoom into core, expand wireframe)
      const t = (p - 0.18) / 0.2;
      artifactGroup.position.set(0, 0, 0);
      artifactGroup.scale.setScalar(1.0 + t * 0.8);
      wireMesh.scale.setScalar(1.0 + t * 0.6);
      wireMat.opacity = 0.18 + t * 0.25;
      camera.position.z = 7 - t * 2.2;
    } else if (p < 0.62) {
      // 03: SELECTED WORK (Move to right/side, morph into orbital ring view)
      const t = (p - 0.38) / 0.24;
      artifactGroup.position.set(1.6 - t * 0.4, 0.2, 0);
      artifactGroup.scale.setScalar(1.3 - t * 0.3);
      wireMat.opacity = 0.22;
      camera.position.z = 5.5;
    } else if (p < 0.78) {
      // 04: EXPERIMENT LAB
      const t = (p - 0.62) / 0.16;
      artifactGroup.position.set(-1.8 + t * 0.6, -0.2, 0);
      artifactGroup.scale.setScalar(1.1 + Math.sin(t * Math.PI) * 0.3);
      camera.position.z = 6;
    } else if (p < 0.92) {
      // 05/06: SERVICES & PROCESS
      const t = (p - 0.78) / 0.14;
      artifactGroup.position.set(0, 0.4 - t * 0.4, 0);
      artifactGroup.scale.setScalar(1.0);
      camera.position.z = 6.5;
    } else {
      // 07: FINAL CTA (Explode particles & focal center)
      const t = (p - 0.92) / 0.08;
      artifactGroup.position.set(0, 0, 0);
      artifactGroup.scale.setScalar(1.0 + t * 0.5);
      particles.scale.setScalar(1.0 + t * 2.0);
      camera.position.z = 7 - t * 1.5;
    }

    // Dynamic light tint when hovering services
    if (activeServiceHue !== undefined) {
      const col = new THREE.Color().setHSL(activeServiceHue / 360, 1.0, 0.6);
      pointLight1.color.copy(col);
    }
  }, [scrollProgress, activeServiceHue, activeSection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
