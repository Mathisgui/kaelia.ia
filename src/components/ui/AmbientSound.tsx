"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

/**
 * Ambient meditation — very soft evolving pad with occasional gentle swells.
 * No piano, no harsh sounds. Think: spa, meditation app, breath.
 */

function createAmbientPad(ctx: AudioContext, master: GainNode) {
  // Very soft evolving drone — two sine waves slowly detuning
  const osc1 = ctx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.value = 174.61; // F3 — warm, grounding

  const osc2 = ctx.createOscillator();
  osc2.type = "sine";
  osc2.frequency.value = 261.63; // C4 — perfect fifth above

  const osc3 = ctx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.value = 220.0; // A3 — fills out the chord

  // Very slow LFO to gently modulate osc2 frequency (creates movement)
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.05; // one cycle per 20 seconds
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 1.5; // very subtle pitch drift
  lfo.connect(lfoGain).connect(osc2.frequency);
  lfo.start();

  // Individual gains — very quiet
  const g1 = ctx.createGain();
  g1.gain.value = 0.018;
  const g2 = ctx.createGain();
  g2.gain.value = 0.012;
  const g3 = ctx.createGain();
  g3.gain.value = 0.010;

  // Lowpass to remove all harshness — only warmth
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 400; // very muffled, like through a wall
  lp.Q.value = 0.3;

  const padBus = ctx.createGain();
  padBus.gain.value = 1;

  osc1.connect(g1).connect(padBus);
  osc2.connect(g2).connect(padBus);
  osc3.connect(g3).connect(padBus);
  padBus.connect(lp).connect(master);

  osc1.start();
  osc2.start();
  osc3.start();

  return [osc1, osc2, osc3, lfo];
}

function playSwell(ctx: AudioContext, master: GainNode) {
  // Gentle swell — a soft tone that rises and falls over several seconds
  const freqs = [261.63, 329.63, 392.0, 523.25]; // C4, E4, G4, C5
  const freq = freqs[Math.floor(Math.random() * freqs.length)];
  const peakVol = 0.02 + Math.random() * 0.015;

  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = freq;

  // Slow swell envelope: 3s rise, 4s fall
  const env = ctx.createGain();
  const now = ctx.currentTime;
  const rise = 2.5 + Math.random() * 2;
  const fall = 3 + Math.random() * 3;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(peakVol, now + rise);
  env.gain.exponentialRampToValueAtTime(0.001, now + rise + fall);

  // Heavy lowpass — keep it dreamy
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 800;
  lp.Q.value = 0.3;

  osc.connect(env).connect(lp).connect(master);
  osc.start(now);
  osc.stop(now + rise + fall + 0.5);
}

const AmbientSound: React.FC = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const oscsRef = useRef<OscillatorNode[]>([]);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const initAudio = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    masterRef.current = master;

    return ctx;
  }, []);

  const startSound = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    // Start ambient pad if not already running
    if (oscsRef.current.length === 0) {
      oscsRef.current = createAmbientPad(ctx, master);
    }

    // Schedule gentle swells
    const scheduleNext = () => {
      const delay = 8000 + Math.random() * 12000; // 8–20 seconds
      intervalRef.current = setTimeout(() => {
        if (ctxRef.current && masterRef.current) {
          playSwell(ctxRef.current, masterRef.current);
        }
        scheduleNext();
      }, delay);
    };

    // First swell after a pause
    intervalRef.current = setTimeout(() => {
      if (ctxRef.current && masterRef.current) {
        playSwell(ctxRef.current, masterRef.current);
      }
      scheduleNext();
    }, 5000);
  }, []);

  const stopSound = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggleSound = useCallback(() => {
    if (!playing) {
      const ctx = initAudio();
      if (ctx.state === "suspended") ctx.resume();

      const master = masterRef.current;
      if (master) {
        const now = ctx.currentTime;
        master.gain.setValueAtTime(0, now);
        master.gain.linearRampToValueAtTime(0.8, now + 3); // slow fade in
      }

      startSound();
      setPlaying(true);
      setMuted(false);
    } else {
      setMuted((m) => {
        const next = !m;
        const master = masterRef.current;
        const ctx = ctxRef.current;
        if (ctx && master) {
          const now = ctx.currentTime;
          if (next) {
            master.gain.linearRampToValueAtTime(0, now + 1.5);
            stopSound();
          } else {
            master.gain.linearRampToValueAtTime(0.8, now + 2);
            startSound();
          }
        }
        return next;
      });
    }
  }, [playing, initAudio, startSound, stopSound]);

  useEffect(() => {
    return () => {
      stopSound();
      try {
        oscsRef.current.forEach((o) => o.stop());
      } catch {
        // already stopped
      }
      ctxRef.current?.close();
    };
  }, [stopSound]);

  return (
    <button
      onClick={toggleSound}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
        playing && !muted
          ? "border-[#7c3aed]/40 bg-[#7c3aed]/10 backdrop-blur-md"
          : "border-white/10 bg-white/5 backdrop-blur-md animate-pulse-slow hover:border-[#7c3aed]/40 hover:bg-white/10"
      }`}
      aria-label={playing && !muted ? "Couper le son" : "Activer le son"}
      title={playing && !muted ? "Couper le son" : "Activer le son ambiant"}
    >
      {playing && !muted ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};

export default AmbientSound;
