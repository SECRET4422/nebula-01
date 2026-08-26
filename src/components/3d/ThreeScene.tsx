import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeSceneProps {
  scrollProgress: number;
  scrollVelocity?: number;
  activeServiceHue?: number;
  activeSection?: string;
}

export const ThreeScene: React.FC<ThreeSceneProps> = ({
  scrollProgress,
  scrollVelocity = 0,
  activeServiceHue,
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
    // Target transforms for smooth lerp
    targetPos: THREE.Vector3;
    targetScale: number;
    targetCameraZ: number;
    targetWireOpacity: number;
    currentWireOpacity: number;
    targetLightColor: THREE.Color;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070709, 0.032);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // 2. High-Performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Artifact Geometry & Custom Shaders
    const artifactGroup = new THREE.Group();
    scene.add(artifactGroup);

    // Main icosahedron geometry
    const geom = new THREE.IcosahedronGeometry(1.6, 28);

    // Custom GLSL Vertex & Fragment Shaders with Simplex Noise & Chromatic Fresnel
    const customMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uNoiseStrength: { value: 0.32 },
        uColor1: { value: new THREE.Color(0x00f0ff) },
        uColor2: { value: new THREE.Color(0x7000ff) },
        uColor3: { value: new THREE.Color(0x00ff88) },
        uScroll: { value: 0 },
        uVelocity: { value: 0 },
      },
      vertexShader: `
        uniform float uTime;
        uniform float uNoiseStrength;
        uniform float uScroll;
        uniform float uVelocity;
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
          
          float dynamicSpeed = uTime * 0.45 + uVelocity * 2.5;
          float n = snoise(position * 1.4 + vec3(dynamicSpeed));
          vDisplacement = n;
          
          float amp = uNoiseStrength * (1.0 + uScroll * 1.1 + uVelocity * 1.5);
          vec3 newPosition = position + normal * (n * amp);
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
          fresnel = pow(fresnel, 2.4);

          vec3 baseColor = mix(uColor1, uColor2, smoothstep(-0.45, 0.45, vDisplacement));
          vec3 finalColor = mix(baseColor, uColor3, fresnel * 0.85);
          finalColor += fresnel * vec3(0.5, 0.95, 1.0);

          gl_FragColor = vec4(finalColor, 0.90);
        }
      `,
      transparent: true,
      wireframe: false,
    });

    const mainMesh = new THREE.Mesh(geom, customMaterial);
    artifactGroup.add(mainMesh);

    // Outer wireframe cage
    const wireGeom = new THREE.IcosahedronGeometry(1.85, 6);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    artifactGroup.add(wireMesh);

    // 4. Ambient Particle Nebula
    const particleCount = 2200;
    const particleGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.4 + Math.random() * 8.5;
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
      size: 0.036,
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f0ff, 3.8, 16);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x7000ff, 3.2, 16);
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

    // Store refs with interpolation targets
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
      targetPos: new THREE.Vector3(0, 0, 0),
      targetScale: 1.0,
      targetCameraZ: 7.0,
      targetWireOpacity: 0.18,
      currentWireOpacity: 0.18,
      targetLightColor: new THREE.Color(0x00f0ff),
    };

    // Continuous Animation Loop with Exponential Lerp Smoothing
    const animate = () => {
      if (!sceneRef.current) return;
      const state = sceneRef.current;
      const elapsedTime = state.clock.getElapsedTime();

      // Smooth mouse interpolation
      state.mouse.x += (state.targetMouse.x - state.mouse.x) * 0.06;
      state.mouse.y += (state.targetMouse.y - state.mouse.y) * 0.06;

      // Smooth camera and group transformation lerp
      state.artifactGroup.position.lerp(state.targetPos, 0.05);
      const currentScale = state.artifactGroup.scale.x;
      const newScale = THREE.MathUtils.lerp(currentScale, state.targetScale, 0.05);
      state.artifactGroup.scale.setScalar(newScale);

      state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, state.targetCameraZ, 0.05);

      // Smooth wireframe opacity lerp
      state.currentWireOpacity = THREE.MathUtils.lerp(state.currentWireOpacity, state.targetWireOpacity, 0.05);
      (state.wireMesh.material as THREE.MeshBasicMaterial).opacity = state.currentWireOpacity;

      // Smooth light color lerp
      state.pointLight1.color.lerp(state.targetLightColor, 0.05);

      // Update shader uniforms
      const mat = state.mainMesh.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = elapsedTime;

      // Base idle rotation + mouse parallax
      state.artifactGroup.rotation.y = elapsedTime * 0.22 + state.mouse.x * 0.55;
      state.artifactGroup.rotation.x = Math.sin(elapsedTime * 0.18) * 0.18 + state.mouse.y * 0.35;
      state.wireMesh.rotation.y = -elapsedTime * 0.14;
      state.wireMesh.rotation.z = elapsedTime * 0.08;

      // Rotate particle cloud gently
      state.particles.rotation.y = elapsedTime * 0.035;
      state.particles.rotation.x = state.mouse.y * 0.08;

      state.renderer.render(state.scene, state.camera);
      state.frameId = requestAnimationFrame(animate);
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

  // Update target states smoothly based on scrollProgress & velocity
  useEffect(() => {
    if (!sceneRef.current) return;
    const state = sceneRef.current;
    const p = scrollProgress; // 0.0 -> 1.0

    const mat = state.mainMesh.material as THREE.ShaderMaterial;
    if (mat && mat.uniforms) {
      mat.uniforms.uScroll.value = p;
      mat.uniforms.uVelocity.value = Math.min(Math.abs(scrollVelocity) * 0.02, 0.6);
    }

    // Scroll state choreography with continuous spatial targets
    if (p < 0.18) {
      // 01: HERO
      state.targetPos.set(0, 0, 0);
      state.targetScale = 1.0 + Math.sin(p * Math.PI) * 0.15;
      state.targetWireOpacity = 0.18;
      state.targetCameraZ = 7.0;
    } else if (p < 0.38) {
      // 02: MANIFESTO (Zoom into computational core)
      const t = (p - 0.18) / 0.2;
      state.targetPos.set(0, 0, 0);
      state.targetScale = 1.0 + t * 0.75;
      state.targetWireOpacity = 0.18 + t * 0.28;
      state.targetCameraZ = 7.0 - t * 2.2;
    } else if (p < 0.62) {
      // 03: SELECTED WORK (Move to side, orbital ring perspective)
      const t = (p - 0.38) / 0.24;
      state.targetPos.set(1.5 - t * 0.3, 0.15, 0);
      state.targetScale = 1.25 - t * 0.25;
      state.targetWireOpacity = 0.22;
      state.targetCameraZ = 5.6;
    } else if (p < 0.78) {
      // 04: EXPERIMENT LAB
      const t = (p - 0.62) / 0.16;
      state.targetPos.set(-1.6 + t * 0.5, -0.15, 0);
      state.targetScale = 1.1 + Math.sin(t * Math.PI) * 0.25;
      state.targetCameraZ = 6.0;
    } else if (p < 0.92) {
      // 05/06: SERVICES & PROCESS
      const t = (p - 0.78) / 0.14;
      state.targetPos.set(0, 0.35 - t * 0.35, 0);
      state.targetScale = 1.0;
      state.targetCameraZ = 6.4;
    } else {
      // 07: FINAL CTA (Expanded particle horizon)
      const t = (p - 0.92) / 0.08;
      state.targetPos.set(0, 0, 0);
      state.targetScale = 1.0 + t * 0.45;
      state.targetCameraZ = 7.0 - t * 1.4;
    }

    // Dynamic light color on service hover
    if (activeServiceHue !== undefined) {
      state.targetLightColor.setHSL(activeServiceHue / 360, 1.0, 0.58);
    } else {
      state.targetLightColor.setHex(0x00f0ff);
    }
  }, [scrollProgress, scrollVelocity, activeServiceHue]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
