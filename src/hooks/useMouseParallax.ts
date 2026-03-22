"use client";

import { useRef, useCallback } from "react";

interface MouseParallaxResult {
  ref: React.RefObject<HTMLElement | null>;
  onMouseMove: (e: React.MouseEvent) => { x: number; y: number };
  onMouseLeave: () => void;
}

/**
 * Tracks mouse position relative to an element's center.
 * Returns normalised offset values in the range [-1, 1].
 */
export function useMouseParallax(): MouseParallaxResult {
  const ref = useRef<HTMLElement | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent): { x: number; y: number } => {
      const el = ref.current;
      if (!el) return { x: 0, y: 0 };

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);

      return {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      };
    },
    [],
  );

  const onMouseLeave = useCallback(() => {
    /* consumer resets position on leave */
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
