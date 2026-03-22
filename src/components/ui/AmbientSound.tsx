"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

/**
 * Ambient piano notes using Web Audio API.
 * Plays gentle, random classical-style notes at low volume.
 * Click sounds on interactive elements.
 */

const NOTES = [
  261.63, // C4
  293.66, // D4
  329.63, // E4
  392.0,  // G4
  440.0,  // A4
  523.25, // C5
  587.33, // D5
  659.25, // E5
];

function playNote(ctx: AudioContext, master: GainNode) {
  const freq = NOTES[Math.floor(Math.random() * NOTES.length)];
  const velocity = 0.03 + Math.random() * 0.04; // 0.03–0.07

  // Main tone (triangle for piano-like warmth)
  const osc1 = ctx.createOscillator();
  osc1.type = "triangle";
  osc1.frequency.value = freq;

  // Detuned layer for richness
  const osc2 = ctx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.value = freq * 1.002; // slight detune

  // Third layer an octave higher, very quiet
  const osc3 = ctx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.value = freq * 2;

  // Envelope
  const env = ctx.createGain();
  const now = ctx.currentTime;
  env.gain.setValueAtTime(0, now);
  env.gain.linearRampToValueAtTime(velocity, now + 0.01); // fast attack
  env.gain.exponentialRampToValueAtTime(velocity * 0.3, now + 0.8); // decay
  env.gain.exponentialRampToValueAtTime(0.001, now + 3); // release

  // Gain for each oscillator layer
  const g1 = ctx.createGain();
  g1.gain.value = 0.6;
  const g2 = ctx.createGain();
  g2.gain.value = 0.3;
  const g3 = ctx.createGain();
  g3.gain.value = 0.1;

  osc1.connect(g1).connect(env);
  osc2.connect(g2).connect(env);
  osc3.connect(g3).connect(env);

  // Soft lowpass filter
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 2000;
  filter.Q.value = 0.7;

  env.connect(filter).connect(master);

  osc1.start(now);
  osc2.start(now);
  osc3.start(now);
  osc1.stop(now + 3.5);
  osc2.stop(now + 3.5);
  osc3.stop(now + 3.5);
}

const AmbientSound: React.FC = () => {
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const initAudio = useCallback(() => {
    if (ctxRef.current) return ctxRef.current;

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // Master gain
    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    masterRef.current = master;

    return ctx;
  }, []);

  const startNotes = useCallback(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;

    // Play a note immediately
    playNote(ctx, master);

    // Schedule random notes
    const scheduleNext = () => {
      const delay = 2000 + Math.random() * 4000; // 2–6 seconds
      intervalRef.current = setTimeout(() => {
        if (ctxRef.current && masterRef.current) {
          playNote(ctxRef.current, masterRef.current);
          // Sometimes play a second note shortly after (chord feel)
          if (Math.random() > 0.6) {
            setTimeout(() => {
              if (ctxRef.current && masterRef.current) {
                playNote(ctxRef.current, masterRef.current);
              }
            }, 100 + Math.random() * 200);
          }
        }
        scheduleNext();
      }, delay);
    };
    scheduleNext();
  }, []);

  const stopNotes = useCallback(() => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const playClick = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx || muted) return;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.value = 800;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

    osc.connect(gain).connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.08);
  }, [muted]);

  const toggleSound = useCallback(() => {
    if (!playing) {
      const ctx = initAudio();
      if (ctx.state === "suspended") ctx.resume();

      // Fade in master
      const master = masterRef.current;
      if (master) {
        const now = ctx.currentTime;
        master.gain.setValueAtTime(0, now);
        master.gain.linearRampToValueAtTime(0.5, now + 1.5);
      }

      startNotes();
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
            master.gain.linearRampToValueAtTime(0, now + 0.5);
            stopNotes();
          } else {
            master.gain.linearRampToValueAtTime(0.5, now + 0.5);
            startNotes();
          }
        }
        return next;
      });
    }
  }, [playing, initAudio, startNotes, stopNotes]);

  // Click sounds on interactive elements
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        playClick();
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [playClick]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopNotes();
      ctxRef.current?.close();
    };
  }, [stopNotes]);

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
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#7c3aed"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </button>
  );
};

export default AmbientSound;
