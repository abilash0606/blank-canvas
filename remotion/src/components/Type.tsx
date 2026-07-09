import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";

export const Kicker: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: frame - delay, fps, config: { damping: 200 } });
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: 20,
        letterSpacing: "0.42em",
        textTransform: "uppercase",
        color: theme.cyan,
        opacity: s,
        transform: `translateY(${(1 - s) * 12}px)`,
      }}
    >
      {children}
    </div>
  );
};

export const Title: React.FC<{ children: React.ReactNode; delay?: number; size?: number }> = ({
  children,
  delay = 0,
  size = 96,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blur = interpolate(p, [0, 1], [18, 0]);
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 200,
        fontSize: size,
        lineHeight: 1.02,
        letterSpacing: "-0.045em",
        color: theme.white,
        opacity: p,
        filter: `blur(${blur}px)`,
        transform: `translateY(${(1 - p) * 22}px)`,
        textShadow: "0 0 60px rgba(59,130,246,0.35)",
      }}
    >
      {children}
    </div>
  );
};

export const Sub: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 300,
        fontSize: 30,
        letterSpacing: "-0.01em",
        color: theme.inkDim,
        opacity: p,
        transform: `translateY(${(1 - p) * 12}px)`,
        maxWidth: 1100,
      }}
    >
      {children}
    </div>
  );
};