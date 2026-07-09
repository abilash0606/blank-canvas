import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { theme } from "../theme";

// Persistent cinematic backdrop: deep navy gradient + drifting nebula glows + subtle grain
export const Backdrop: React.FC<{ intensity?: number }> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();
  const t = frame / 24;
  const x1 = 50 + Math.sin(t * 0.15) * 12;
  const y1 = 45 + Math.cos(t * 0.11) * 10;
  const x2 = 60 + Math.cos(t * 0.09) * 14;
  const y2 = 60 + Math.sin(t * 0.13) * 12;
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(120% 90% at 50% 55%, #061224 0%, ${theme.bgDeep} 60%, #000 100%)`,
      }}
    >
      <AbsoluteFill
        style={{
          background: `radial-gradient(40% 40% at ${x1}% ${y1}%, rgba(34,211,238,${0.18 * intensity}) 0%, transparent 60%),
                       radial-gradient(48% 48% at ${x2}% ${y2}%, rgba(59,130,246,${0.22 * intensity}) 0%, transparent 62%),
                       radial-gradient(60% 60% at 50% 120%, rgba(20,184,166,${0.10 * intensity}) 0%, transparent 60%)`,
          filter: "blur(2px)",
        }}
      />
      {/* thin grid */}
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(120,180,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(120,180,255,0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
          maskImage: "radial-gradient(70% 60% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 50%, black 40%, transparent 100%)",
        }}
      />
    </AbsoluteFill>
  );
};