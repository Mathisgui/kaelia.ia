"use client";

import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 1800;
const MAX_LINES = 2500;
const PURPLE = new THREE.Color("#7c3aed");
const RED = new THREE.Color("#ef4444");
const CYAN = new THREE.Color("#22d3ee");

// Color stops: purple → red → purple → cyan → purple (loops smoothly)
function getScrollColor(scroll: number): THREE.Color {
  const t = scroll * 3; // cycle faster
  const phase = t - Math.floor(t); // 0..1 repeating
  const s = phase * 4; // 4 segments
  const seg = Math.floor(s);
  const f = s - seg; // fraction within segment
  const smooth = f * f * (3 - 2 * f); // smoothstep

  switch (seg) {
    case 0: return new THREE.Color().lerpColors(PURPLE, RED, smooth);
    case 1: return new THREE.Color().lerpColors(RED, PURPLE, smooth);
    case 2: return new THREE.Color().lerpColors(PURPLE, CYAN, smooth);
    case 3: return new THREE.Color().lerpColors(CYAN, PURPLE, smooth);
    default: return PURPLE;
  }
}

/* ============ SHAPE FUNCTIONS ============ */

// Deterministic pseudo-random per particle
function hash(i: number, seed: number): number {
  const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

// 1. DENSE CUBE — particles fill the faces and edges of a cube
function shapeCube(i: number, t: number): [number, number, number] {
  const size = 3.2;
  const face = i % 6;
  const h1 = hash(i, 1);
  const h2 = hash(i, 2);
  const u = (h1 - 0.5) * 2 * size;
  const v = (h2 - 0.5) * 2 * size;
  let x: number, y: number, z: number;
  switch (face) {
    case 0: x = u; y = v; z = -size; break;
    case 1: x = u; y = v; z = size; break;
    case 2: x = -size; y = u; z = v; break;
    case 3: x = size; y = u; z = v; break;
    case 4: x = u; y = -size; z = v; break;
    default: x = u; y = size; z = v; break;
  }
  // Slow rotation
  const c = Math.cos(t * 0.12);
  const s = Math.sin(t * 0.12);
  return [x * c - z * s, y, x * s + z * c];
}

// 2. ROBOT HEAD — box head + eyes + mouth + antenna
function shapeRobot(i: number, t: number): [number, number, number] {
  if (i < 900) {
    // Head shell — dense particles on a box
    const face = i % 6;
    const h1 = hash(i, 3);
    const h2 = hash(i, 4);
    const w = 2.8, h = 3.2, d = 2.4;
    const u = (h1 - 0.5) * 2;
    const v = (h2 - 0.5) * 2;
    switch (face) {
      case 0: return [u * w * 0.5, v * h * 0.5, -d * 0.5];
      case 1: return [u * w * 0.5, v * h * 0.5, d * 0.5];
      case 2: return [-w * 0.5, u * h * 0.5, v * d * 0.5];
      case 3: return [w * 0.5, u * h * 0.5, v * d * 0.5];
      case 4: return [u * w * 0.5, -h * 0.5, v * d * 0.5];
      default: return [u * w * 0.5, h * 0.5, v * d * 0.5];
    }
  } else if (i < 1100) {
    // Left eye — filled bright square
    const li = i - 900;
    const h1 = hash(li, 5);
    const h2 = hash(li, 6);
    return [-0.7 + (h1 - 0.5) * 0.7, 0.6 + (h2 - 0.5) * 0.7, -d()];
  } else if (i < 1300) {
    // Right eye
    const li = i - 1100;
    const h1 = hash(li, 7);
    const h2 = hash(li, 8);
    return [0.7 + (h1 - 0.5) * 0.7, 0.6 + (h2 - 0.5) * 0.7, -d()];
  } else if (i < 1550) {
    // Mouth — horizontal line
    const li = i - 1300;
    const frac = li / 250;
    return [-1.0 + frac * 2.0, -0.6 + Math.sin(frac * Math.PI * 3 + t) * 0.08, -d()];
  } else {
    // Antenna
    const li = i - 1550;
    const frac = li / 250;
    const ay = 1.6 + frac * 1.5;
    const swing = Math.sin(t * 2) * 0.2 * frac;
    return [swing, ay, 0];
  }
  function d() { return 1.25; }
}

// 3. EXPLOSION — particles scatter outward from center
function shapeExplosion(i: number, t: number): [number, number, number] {
  const h1 = hash(i, 10);
  const h2 = hash(i, 11);
  const h3 = hash(i, 12);
  const r = 2 + h1 * 6;
  const theta = h2 * Math.PI * 2;
  const phi = Math.acos(2 * h3 - 1);
  const pulse = 1 + Math.sin(t * 0.8 + h1 * 6) * 0.15;
  return [
    r * Math.sin(phi) * Math.cos(theta) * pulse,
    r * Math.sin(phi) * Math.sin(theta) * pulse,
    r * Math.cos(phi) * pulse,
  ];
}

// 4. CIRCUIT BOARD — grid with traces
function shapeCircuit(i: number, t: number): [number, number, number] {
  if (i < 1000) {
    // Grid lines
    const isH = i % 2 === 0;
    const lineIdx = Math.floor(i / 40) % 20;
    const frac = (i % 40) / 40;
    const linePos = (lineIdx - 10) * 0.6;
    const span = 6;
    if (isH) {
      return [-span + frac * span * 2, linePos, Math.sin(linePos + t * 0.3) * 0.1];
    } else {
      return [linePos, -span + frac * span * 2, Math.cos(linePos + t * 0.3) * 0.1];
    }
  } else {
    // Junction nodes — glowing dots at intersections
    const li = i - 1000;
    const gx = (li % 20 - 10) * 0.6;
    const gy = (Math.floor(li / 20) % 20 - 10) * 0.6;
    const spread = 0.12;
    return [
      gx + hash(li, 20) * spread,
      gy + hash(li, 21) * spread,
      Math.sin(t + li * 0.1) * 0.1,
    ];
  }
}

// 5. DNA DOUBLE HELIX
function shapeDNA(i: number, t: number): [number, number, number] {
  if (i < 1400) {
    const strand = i < 700 ? 0 : 1;
    const si = strand === 0 ? i : i - 700;
    const frac = si / 700;
    const y = (frac - 0.5) * 14;
    const angle = frac * Math.PI * 5 + t * 0.2 + strand * Math.PI;
    const r = 2.2;
    return [Math.cos(angle) * r, y, Math.sin(angle) * r];
  } else {
    // Cross-links
    const li = i - 1400;
    const rungGroup = Math.floor(li / 8);
    const rungParam = (li % 8) / 7;
    const frac = rungGroup / 50;
    const y = (frac - 0.5) * 14;
    const angle = frac * Math.PI * 5 + t * 0.2;
    const r = 2.2;
    const x1 = Math.cos(angle) * r, z1 = Math.sin(angle) * r;
    const x2 = Math.cos(angle + Math.PI) * r, z2 = Math.sin(angle + Math.PI) * r;
    return [x1 + (x2 - x1) * rungParam, y, z1 + (z2 - z1) * rungParam];
  }
}

// 6. GALAXY SPIRAL
function shapeGalaxy(i: number, t: number): [number, number, number] {
  const arm = i % 4;
  const ratio = Math.floor(i / 4) / (COUNT / 4);
  const armAngle = (arm / 4) * Math.PI * 2;
  const spiralR = 0.3 + ratio * 5;
  const angle = armAngle + ratio * Math.PI * 2.5 + t * 0.06;
  const thickness = (1 - ratio) * 0.4;
  const h1 = hash(i, 30);
  return [
    Math.cos(angle) * spiralR + h1 * thickness * 0.5,
    (hash(i, 31) - 0.5) * thickness,
    Math.sin(angle) * spiralR + hash(i, 32) * thickness * 0.5,
  ];
}

// 7. NEURAL NETWORK — layered nodes
function shapeNeural(i: number, t: number): [number, number, number] {
  if (i < 300) {
    // Hub nodes in 6 layers
    const layer = i % 6;
    const nodeIdx = Math.floor(i / 6);
    const x = (layer - 2.5) * 2.2;
    const angle = (nodeIdx / 50) * Math.PI * 2 + layer * 0.3;
    const r = 1.0 + (nodeIdx % 4) * 0.4;
    return [
      x + Math.sin(t * 0.1 + layer) * 0.15,
      Math.cos(angle) * r,
      Math.sin(angle) * r,
    ];
  } else {
    // Cloud
    const spread = 5.5;
    return [
      (hash(i, 40) - 0.5) * spread * 2 + Math.sin(t * 0.12 + hash(i, 41) * 10) * 0.25,
      (hash(i, 42) - 0.5) * spread * 1.5 + Math.cos(t * 0.1 + hash(i, 43) * 10) * 0.25,
      (hash(i, 44) - 0.5) * spread * 2 + Math.sin(t * 0.08 + hash(i, 45) * 10) * 0.2,
    ];
  }
}

/* ============ SHAPE SEQUENCE ============ */
// 8 shapes spread over scroll 0→1 with transitions
// Order: explosion → cube → robot → DNA → circuit(Méthode) → galaxy → neural → explosion
const SHAPES = [shapeExplosion, shapeCube, shapeRobot, shapeDNA, shapeCircuit, shapeGalaxy, shapeNeural, shapeExplosion];
const SEGMENT = 1 / SHAPES.length; // ~0.125 each

function getShapeTarget(i: number, scroll: number, t: number): [number, number, number] {
  const segIdx = Math.min(Math.floor(scroll / SEGMENT), SHAPES.length - 1);
  const nextIdx = Math.min(segIdx + 1, SHAPES.length - 1);
  const blend = (scroll - segIdx * SEGMENT) / SEGMENT;
  const smoothBlend = blend * blend * (3 - 2 * blend); // smoothstep

  const [x1, y1, z1] = SHAPES[segIdx](i, t);
  if (segIdx === nextIdx) return [x1, y1, z1];
  const [x2, y2, z2] = SHAPES[nextIdx](i, t);
  return [
    x1 + (x2 - x1) * smoothBlend,
    y1 + (y2 - y1) * smoothBlend,
    z1 + (z2 - z1) * smoothBlend,
  ];
}

function getConnDist(scroll: number): number {
  const segIdx = Math.min(Math.floor(scroll / SEGMENT), SHAPES.length - 1);
  const dists = [2.0, 1.2, 1.1, 2.0, 0.9, 1.3, 1.5, 1.6];
  return dists[segIdx];
}

/* ============ PARTICLE SYSTEM ============ */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const introPhaseRef = useRef(0); // 0→1 over ~2.5s, controls orb→explosion

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      // Start all particles at center (tight orb)
      const theta = hash(i, 60) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i, 61) - 1);
      const r = hash(i, 62) * 0.3; // very tight cluster
      pos[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      pos[i * 3 + 2] = Math.cos(phi) * r;
      vel[i * 3] = (hash(i, 50) - 0.5) * 0.0004;
      vel[i * 3 + 1] = (hash(i, 51) - 0.5) * 0.0004;
      vel[i * 3 + 2] = (hash(i, 52) - 0.5) * 0.0004;
    }
    return { positions: pos, velocities: vel };
  }, []);

  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 6), []);
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 6), []);
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    geo.setDrawRange(0, 0);
    return geo;
  }, [linePositions, lineColors]);

  const handlePointerMove = useCallback((e: { clientX: number; clientY: number }) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const handleScroll = useCallback(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    targetScrollRef.current = max > 0 ? window.scrollY / max : 0;
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handlePointerMove, handleScroll]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const pts = pointsRef.current;
    if (!pts) return;

    // Intro phase: 0→1 over first 2.5 seconds (orb → explode into first shape)
    const introProgress = Math.min(1, introPhaseRef.current);
    if (introPhaseRef.current < 1) {
      introPhaseRef.current += 0.02; // ~1s at 60fps — fast explosion
    }
    // Smoothstep for intro
    const intro = introProgress * introProgress * (3 - 2 * introProgress);

    // Smooth scroll + slow auto-drift so shapes & colors stay alive when idle
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.04;
    const timeDrift = Math.sin(t * 0.12) * 0.06;
    const scroll = Math.max(0, Math.min(1, scrollRef.current + timeDrift));

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // During intro: lerp speed is faster, particles move from orb to shape
    const lerpSpeed = intro < 1 ? 0.015 + intro * 0.03 : 0.025;

    // Move particles toward target shape + breathing motion
    const breathe = Math.sin(t * 0.8) * 0.008;
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const [sx, sy, sz] = getShapeTarget(i, scroll, t);

      // During intro, target is a blend from orb center to shape
      const orbR = (1 - intro) * 0.15;
      const theta = hash(i, 60) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i, 61) - 1);
      const ox = Math.sin(phi) * Math.cos(theta) * orbR;
      const oy = Math.sin(phi) * Math.sin(theta) * orbR;
      const oz = Math.cos(phi) * orbR;

      const tx = ox + (sx - ox) * intro;
      const ty = oy + (sy - oy) * intro;
      const tz = oz + (sz - oz) * intro;

      const bx = arr[i3] * breathe;
      const by = arr[i3 + 1] * breathe;
      const bz = arr[i3 + 2] * breathe;
      arr[i3] += (tx - arr[i3]) * lerpSpeed + velocities[i3] + bx;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * lerpSpeed + velocities[i3 + 1] + by;
      arr[i3 + 2] += (tz - arr[i3 + 2]) * lerpSpeed + velocities[i3 + 2] + bz;
    }
    posAttr.needsUpdate = true;

    // Particle glow during intro: bigger & brighter when clustered
    const ptsMat = pts.material as THREE.PointsMaterial;
    const introGlow = (1 - intro);
    ptsMat.size = 0.04 + introGlow * 0.12; // starts big, shrinks to normal
    ptsMat.opacity = 0.85 + introGlow * 0.15; // starts brighter

    // Connections
    const connDist = getConnDist(scroll);
    const connDistSq = connDist * connDist;
    let lineIdx = 0;

    const scrollColor = getScrollColor(scroll);
    const lr = scrollColor.r;
    const lg = scrollColor.g;
    const lb = scrollColor.b;

    // Update particle color to match
    ptsMat.color.copy(scrollColor);

    for (let i = 0; i < COUNT && lineIdx < MAX_LINES; i += 2) {
      const i3 = i * 3;
      for (let j = i + 2; j < COUNT && lineIdx < MAX_LINES; j += 2) {
        const j3 = j * 3;
        const dx = arr[i3] - arr[j3];
        const dy = arr[i3 + 1] - arr[j3 + 1];
        const dz = arr[i3 + 2] - arr[j3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;
        if (distSq < connDistSq) {
          const alpha = 1 - distSq / connDistSq;
          const l6 = lineIdx * 6;
          linePositions[l6] = arr[i3];
          linePositions[l6 + 1] = arr[i3 + 1];
          linePositions[l6 + 2] = arr[i3 + 2];
          linePositions[l6 + 3] = arr[j3];
          linePositions[l6 + 4] = arr[j3 + 1];
          linePositions[l6 + 5] = arr[j3 + 2];
          const intensity = 0.2;
          lineColors[l6] = lr * alpha * intensity;
          lineColors[l6 + 1] = lg * alpha * intensity;
          lineColors[l6 + 2] = lb * alpha * intensity;
          lineColors[l6 + 3] = lr * alpha * intensity;
          lineColors[l6 + 4] = lg * alpha * intensity;
          lineColors[l6 + 5] = lb * alpha * intensity;
          lineIdx++;
        }
      }
    }

    lineGeometry.setDrawRange(0, lineIdx * 2);
    (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

    // Camera — centered at start, smooth shift left during Value, smooth return at Services
    // Smooth bell curve for fluid transition
    const valuePeak = 0.15;
    const valueWidth = 0.06;
    const valueDelta = (scroll - valuePeak) / valueWidth;
    const valueShift = Math.exp(-valueDelta * valueDelta) * 8;

    const cx = mouseRef.current.x * 0.5 + valueShift;
    const cy = mouseRef.current.y * 0.4;
    camera.position.x += (cx - camera.position.x) * 0.035; // smooth lerp
    camera.position.y += (cy - camera.position.y) * 0.02;
    camera.position.z = 9 + scroll * 2;
    camera.lookAt(valueShift * 0.7, 0, 0);
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
            count={COUNT}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#a78bfa"
          size={0.04}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.15} depthWrite={false} />
      </lineSegments>
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ background: "#0a0a12" }}
    >
      <fog attach="fog" args={["#0a0a12", 7, 18]} />
      <Particles />
    </Canvas>
  );
}
