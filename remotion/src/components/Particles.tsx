import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

// Deterministic drifting particle field
export const Particles: React.FC<{ count?: number; seed?: number; opacity?: number }> = ({
  count = 90,
  seed = 1,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();
  const parts = useMemo(() => {
    const arr: { x: number; y: number; s: number; d: number; c: string }[] = [];
    let n = seed * 9301 + 49297;
    const rnd = () => {
      n = (n * 9301 + 49297) % 233280;
      return n / 233280;
    };
    for (let i = 0; i < count; i++) {
      arr.push({
        x: rnd() * 100,
        y: rnd() * 100,
        s: 1 + rnd() * 2.4,
        d: 0.3 + rnd() * 1.4,
        c: rnd() > 0.5 ? "#7dd3fc" : "#a5f3fc",
      });
    }
    return arr;
  }, [count, seed]);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {parts.map((p, i) => {
        const t = frame / 24;
        const dy = ((p.y + t * 3 * p.d) % 110) - 5;
        const dx = p.x + Math.sin(t * 0.4 * p.d + i) * 1.2;
        const alpha = (0.35 + 0.5 * Math.sin(t * p.d + i)) * opacity;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${dx}%`,
              top: `${dy}%`,
              width: p.s,
              height: p.s,
              borderRadius: 999,
              background: p.c,
              boxShadow: `0 0 ${p.s * 4}px ${p.c}`,
              opacity: alpha,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};