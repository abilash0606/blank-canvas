import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Particles } from "../components/Particles";
import { Title, Sub } from "../components/Type";
import { theme } from "../theme";

// 15s: blue light expands into an AI core; two-line headline reveals
export const Scene1_Beginning: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Core grows from a pinpoint into a glowing orb
  const growth = spring({ frame, fps, config: { damping: 40, stiffness: 45, mass: 1.4 } });
  const coreSize = interpolate(growth, [0, 1], [10, 520]);
  const coreGlow = interpolate(growth, [0, 1], [0.2, 1]);

  // Slow inward push
  const push = interpolate(frame, [0, 360], [1.0, 1.08]);

  // Rings pulse outward
  const ringPulse = (offset: number) => {
    const local = ((frame + offset) % 120) / 120;
    return {
      scale: interpolate(local, [0, 1], [0.4, 2.6]),
      opacity: interpolate(local, [0, 0.2, 1], [0, 0.55, 0]),
    };
  };

  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={0.9} />
      <Particles count={70} seed={2} opacity={interpolate(growth, [0, 1], [0.2, 0.9])} />

      {/* Core */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {[0, 40, 80].map((o, i) => {
          const r = ringPulse(o);
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: 640,
                height: 640,
                borderRadius: "50%",
                border: "1px solid rgba(125,211,252,0.55)",
                transform: `scale(${r.scale})`,
                opacity: r.opacity,
              }}
            />
          );
        })}
        <div
          style={{
            width: coreSize,
            height: coreSize,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 45% 40%, #cffafe 0%, #22d3ee 22%, #3b82f6 55%, #1e3a8a 85%, transparent 100%)",
            boxShadow: `0 0 ${180 * coreGlow}px 40px rgba(59,130,246,${0.55 * coreGlow}),
                        0 0 ${420 * coreGlow}px 120px rgba(34,211,238,${0.35 * coreGlow})`,
            filter: `blur(${interpolate(growth, [0, 1], [8, 0])}px)`,
          }}
        />
        {/* inner iris */}
        <div
          style={{
            position: "absolute",
            width: coreSize * 0.42,
            height: coreSize * 0.42,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.0) 60%)",
            opacity: coreGlow,
          }}
        />
      </AbsoluteFill>

      {/* Copy */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 150,
          gap: 22,
        }}
      >
        <Title delay={100} size={78}>The future isn't another hospital system.</Title>
        <Sub delay={210}>The future is connected intelligence.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};