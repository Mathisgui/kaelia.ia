"use client";

import React, { useRef, useMemo, useCallback, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 3500;
const MAX_LINES = 2500;
const PURPLE = new THREE.Color("#7c3aed");
const RED = new THREE.Color("#ef4444");
const CYAN = new THREE.Color("#22d3ee");

/* Round glowing particle texture */
function createGlowTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const center = size / 2;
  const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.12, "rgba(255,255,255,0.85)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.3)");
  gradient.addColorStop(0.65, "rgba(255,255,255,0.05)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

// Color stops: purple → red → purple → cyan → purple
function getScrollColor(scroll: number): THREE.Color {
  const t = scroll * 3;
  const phase = t - Math.floor(t);
  const s = phase * 4;
  const seg = Math.floor(s);
  const f = s - seg;
  const smooth = f * f * (3 - 2 * f);

  switch (seg) {
    case 0: return new THREE.Color().lerpColors(PURPLE, RED, smooth);
    case 1: return new THREE.Color().lerpColors(RED, PURPLE, smooth);
    case 2: return new THREE.Color().lerpColors(PURPLE, CYAN, smooth);
    case 3: return new THREE.Color().lerpColors(CYAN, PURPLE, smooth);
    default: return PURPLE;
  }
}

/* ============ SHAPE FUNCTIONS ============ */

function hash(i: number, seed: number): number {
  const s = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453;
  return s - Math.floor(s);
}

// DENSE SPHERE — big, tight, luminous orb with gentle uniform pulse
function shapeSphere(i: number, t: number): [number, number, number] {
  const theta = hash(i, 60) * Math.PI * 2;
  const phi = Math.acos(2 * hash(i, 61) - 1);
  // Dense shell: most particles between r=3.0 and r=3.8
  const rawR = hash(i, 62);
  const r = 3.0 + rawR * rawR * 0.8; // squared for more density near surface
  // Very gentle uniform pulse — shape stays clearly spherical
  const pulse = 1 + Math.sin(t * 0.3) * 0.02;
  return [
    Math.sin(phi) * Math.cos(theta) * r * pulse,
    Math.sin(phi) * Math.sin(theta) * r * pulse,
    Math.cos(phi) * r * pulse,
  ];
}

// GALAXY SPIRAL — particles scatter into spiral arms
function shapeGalaxy(i: number, t: number): [number, number, number] {
  const arm = i % 4;
  const ratio = Math.floor(i / 4) / (COUNT / 4);
  const armAngle = (arm / 4) * Math.PI * 2;
  const spiralR = 0.3 + ratio * 6;
  const angle = armAngle + ratio * Math.PI * 3 + t * 0.04;
  const thickness = (1 - ratio) * 0.5;
  const h1 = hash(i, 30);
  return [
    Math.cos(angle) * spiralR + h1 * thickness * 0.5,
    (hash(i, 31) - 0.5) * thickness,
    Math.sin(angle) * spiralR + hash(i, 32) * thickness * 0.5,
  ];
}

// DENSE CUBE — big, slowly rotating on two axes
function shapeCube(i: number, t: number): [number, number, number] {
  const size = 3.8;
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
  // Rotate on Y axis
  const cy = Math.cos(t * 0.15);
  const sy = Math.sin(t * 0.15);
  const rx = x * cy - z * sy;
  const rz = x * sy + z * cy;
  // Slight tilt on X axis
  const cx = Math.cos(t * 0.08);
  const sx = Math.sin(t * 0.08);
  const ry = y * cx - rz * sx;
  const rz2 = y * sx + rz * cx;
  return [rx, ry, rz2];
}

// DNA DOUBLE HELIX
function shapeDNA(i: number, t: number): [number, number, number] {
  if (i < Math.floor(COUNT * 0.8)) {
    const strand = i < Math.floor(COUNT * 0.4) ? 0 : 1;
    const si = strand === 0 ? i : i - Math.floor(COUNT * 0.4);
    const frac = si / Math.floor(COUNT * 0.4);
    const y = (frac - 0.5) * 14;
    const angle = frac * Math.PI * 5 + t * 0.2 + strand * Math.PI;
    const r = 2.2;
    return [Math.cos(angle) * r, y, Math.sin(angle) * r];
  } else {
    const li = i - Math.floor(COUNT * 0.8);
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

// TUNNEL — rotating helix/vortex around a vertical axis (for Process/Méthode)
function shapeTunnel(i: number, t: number): [number, number, number] {
  const frac = i / COUNT; // 0..1 along the tunnel
  const y = (frac - 0.5) * 14; // spread vertically
  const angle = frac * Math.PI * 8 + t * 0.3; // 4 full spirals, rotating
  const radius = 2.0 + Math.sin(frac * Math.PI * 4 + t * 0.5) * 0.4; // pulsing radius
  // Add slight noise to make it organic
  const noise = hash(i, 70) * 0.3;
  return [
    Math.cos(angle) * (radius + noise),
    y,
    Math.sin(angle) * (radius + noise),
  ];
}

// NEURAL NETWORK
function shapeNeural(i: number, t: number): [number, number, number] {
  if (i < 300) {
    const layer = i % 6;
    const nodeIdx = Math.floor(i / 6);
    const x = (layer - 2.5) * 2.2;
    const angle = (nodeIdx / 50) * Math.PI * 2 + layer * 0.3;
    const r = 1.0 + (nodeIdx % 4) * 0.4;
    return [x + Math.sin(t * 0.1 + layer) * 0.15, Math.cos(angle) * r, Math.sin(angle) * r];
  } else {
    const spread = 5.5;
    return [
      (hash(i, 40) - 0.5) * spread * 2 + Math.sin(t * 0.12 + hash(i, 41) * 10) * 0.25,
      (hash(i, 42) - 0.5) * spread * 1.5 + Math.cos(t * 0.1 + hash(i, 43) * 10) * 0.25,
      (hash(i, 44) - 0.5) * spread * 2 + Math.sin(t * 0.08 + hash(i, 45) * 10) * 0.2,
    ];
  }
}

// EXPLOSION — scatter
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

/* ============ SHAPE SEQUENCE ============ */
// sphere → cube (Value) → galaxy (Services) → DNA (Stats) → tunnel (Méthode) → neural (Why) → explosion → sphere
const SHAPES = [shapeSphere, shapeCube, shapeGalaxy, shapeDNA, shapeTunnel, shapeNeural, shapeExplosion, shapeSphere];
const SEGMENT = 1 / SHAPES.length;

function getShapeTarget(i: number, scroll: number, t: number): [number, number, number] {
  const segIdx = Math.min(Math.floor(scroll / SEGMENT), SHAPES.length - 1);
  const nextIdx = Math.min(segIdx + 1, SHAPES.length - 1);
  const blend = (scroll - segIdx * SEGMENT) / SEGMENT;
  const smoothBlend = blend * blend * (3 - 2 * blend);

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
  const dists = [1.0, 1.3, 1.2, 2.0, 0.9, 1.5, 1.6, 1.0];
  return dists[segIdx];
}

/* ============ PARTICLE SYSTEM ============ */
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mouse3DRef = useRef(new THREE.Vector3()); // mouse position in 3D
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const introPhaseRef = useRef(0);
  const glowTexture = useMemo(() => createGlowTexture(), []);

  const { positions, velocities } = useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    const vel = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const theta = hash(i, 60) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i, 61) - 1);
      const r = hash(i, 62) * 0.3;
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

    // Intro phase: 0→1 (orb forms then expands)
    const introProgress = Math.min(1, introPhaseRef.current);
    if (introPhaseRef.current < 1) {
      introPhaseRef.current += 0.012; // ~1.4s at 60fps
    }
    const intro = introProgress * introProgress * (3 - 2 * introProgress);

    // Smooth scroll
    scrollRef.current += (targetScrollRef.current - scrollRef.current) * 0.04;
    const timeDrift = Math.sin(t * 0.12) * 0.06;
    const scroll = Math.max(0, Math.min(1, scrollRef.current + timeDrift));

    // Convert mouse to 3D world coordinates (on z=0 plane)
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const vHalf = camera.position.z * Math.tan((60 * Math.PI) / 360);
    const aspect = window.innerWidth / window.innerHeight;
    const targetMouse3D = new THREE.Vector3(
      mx * vHalf * aspect,
      my * vHalf,
      0
    );
    mouse3DRef.current.lerp(targetMouse3D, 0.12);

    const posAttr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const lerpSpeed = intro < 1 ? 0.015 + intro * 0.03 : 0.025;
    const breathe = Math.sin(t * 0.8) * 0.006;

    // Mouse attraction — strong magnet pulling particles toward cursor
    const magnetRadius = 5.0;
    const magnetStrength = 0.35;
    const mPos = mouse3DRef.current;

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      const [sx, sy, sz] = getShapeTarget(i, scroll, t);

      // Intro blend: tight orb → shape
      const orbR = (1 - intro) * 0.2;
      const theta = hash(i, 60) * Math.PI * 2;
      const phi = Math.acos(2 * hash(i, 61) - 1);
      const ox = Math.sin(phi) * Math.cos(theta) * orbR;
      const oy = Math.sin(phi) * Math.sin(theta) * orbR;
      const oz = Math.cos(phi) * orbR;

      let tx = ox + (sx - ox) * intro;
      let ty = oy + (sy - oy) * intro;
      const tz = oz + (sz - oz) * intro;

      // Mouse magnet: attract all nearby particles toward cursor
      const mdx = mPos.x - arr[i3];
      const mdy = mPos.y - arr[i3 + 1];
      const mdz = mPos.z - arr[i3 + 2];
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy + mdz * mdz);
      if (mDist < magnetRadius && mDist > 0.01) {
        const force = magnetStrength * Math.pow(1 - mDist / magnetRadius, 2);
        tx += mdx * force;
        ty += mdy * force;
      }

      const bx = arr[i3] * breathe;
      const by = arr[i3 + 1] * breathe;
      const bz = arr[i3 + 2] * breathe;
      arr[i3] += (tx - arr[i3]) * lerpSpeed + velocities[i3] + bx;
      arr[i3 + 1] += (ty - arr[i3 + 1]) * lerpSpeed + velocities[i3 + 1] + by;
      arr[i3 + 2] += (tz - arr[i3 + 2]) * lerpSpeed + velocities[i3 + 2] + bz;
    }
    posAttr.needsUpdate = true;

    // Particle glow during intro: bigger & brighter orb
    const ptsMat = pts.material as THREE.PointsMaterial;
    const introGlow = (1 - intro);
    ptsMat.size = 0.09 + introGlow * 0.2;
    ptsMat.opacity = 0.9 + introGlow * 0.1;

    // Connections
    const connDist = getConnDist(scroll);
    const connDistSq = connDist * connDist;
    let lineIdx = 0;

    const scrollColor = getScrollColor(scroll);
    const lr = scrollColor.r;
    const lg = scrollColor.g;
    const lb = scrollColor.b;
    ptsMat.color.copy(scrollColor);

    for (let i = 0; i < COUNT && lineIdx < MAX_LINES; i += 3) {
      const i3 = i * 3;
      for (let j = i + 3; j < COUNT && lineIdx < MAX_LINES; j += 3) {
        const j3 = j * 3;
        const ddx = arr[i3] - arr[j3];
        const ddy = arr[i3 + 1] - arr[j3 + 1];
        const ddz = arr[i3 + 2] - arr[j3 + 2];
        const distSq = ddx * ddx + ddy * ddy + ddz * ddz;
        if (distSq < connDistSq) {
          const alpha = 1 - distSq / connDistSq;
          const l6 = lineIdx * 6;
          linePositions[l6] = arr[i3];
          linePositions[l6 + 1] = arr[i3 + 1];
          linePositions[l6 + 2] = arr[i3 + 2];
          linePositions[l6 + 3] = arr[j3];
          linePositions[l6 + 4] = arr[j3 + 1];
          linePositions[l6 + 5] = arr[j3 + 2];
          const intensity = 0.15;
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

    // Camera — smooth shift during Value section
    const valuePeak = 0.15;
    const valueWidth = 0.06;
    const valueDelta = (scroll - valuePeak) / valueWidth;
    const valueShift = Math.exp(-valueDelta * valueDelta) * 8;

    const cx = mouseRef.current.x * 0.3 + valueShift;
    const cy = mouseRef.current.y * 0.2;
    camera.position.x += (cx - camera.position.x) * 0.035;
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
          map={glowTexture}
          color="#e8dff5"
          size={0.09}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial vertexColors transparent opacity={0.08} depthWrite={false} />
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
