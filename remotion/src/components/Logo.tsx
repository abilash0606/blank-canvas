import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";

export const Logo: React.FC<{ size?: number; glow?: number; float?: boolean }> = ({
  size = 120,
  glow = 1,
  float = true,
}) => {
  const frame = useCurrentFrame();
  const t = frame / 24;
  const y = float ? Math.sin(t * 0.9) * 6 : 0;
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: `translateY(${y}px)`,
        filter: `drop-shadow(0 0 ${28 * glow}px rgba(59,130,246,0.55)) drop-shadow(0 0 ${60 * glow}px rgba(34,211,238,0.35))`,
      }}
    >
      <Img
        src={staticFile("images/hunova-logo.png")}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    </div>
  );
};
