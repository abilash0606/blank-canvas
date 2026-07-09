import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "./Backdrop";
import { Particles } from "./Particles";
import { Kicker, Title, Sub } from "./Type";
import { Logo } from "./Logo";
import { theme } from "../theme";

// Reusable premium scene layout: kicker + title + subtitle on left, illustration on right.
export const SceneShell: React.FC<{
  kicker?: string;
  title: string;
  sub?: string;
  headline?: string; // large "quote" style headline (centered under illustration)
  seed?: number;
  intensity?: number;
  children?: React.ReactNode; // illustration
  align?: "split" | "center";
  showLogo?: boolean;
}> = ({ kicker: rawKicker, title, sub, headline, seed = 3, intensity = 0.9, children, align = "split", showLogo = true }) => {
  // Strip auto-generated "Scene NN · ..." and "Chapter NN · ..." labels per user request.
  const kicker = rawKicker && /^(scene|chapter)\s*\d/i.test(rawKicker.trim()) ? undefined : rawKicker;
  const frame = useCurrentFrame();
  const push = interpolate(frame, [0, 480], [1.0, 1.05]);
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={intensity} />
      <Particles count={55} seed={seed} opacity={0.7} />

      {showLogo && (
        <div style={{ position: "absolute", top: 56, left: 72, display: "flex", alignItems: "center", gap: 18 }}>
          <Logo size={64} glow={0.7} float={false} />
          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 22,
              letterSpacing: "0.32em",
              color: theme.ink,
              opacity: 0.8,
            }}
          >
            HUNOVA
          </div>
        </div>
      )}

      {align === "split" ? (
        <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: 120,
              paddingRight: 40,
              gap: 24,
            }}
          >
            {kicker && <Kicker delay={4}>{kicker}</Kicker>}
            <Title delay={16} size={72}>
              {title}
            </Title>
            {sub && <Sub delay={40}>{sub}</Sub>}
          </div>
          <div
            style={{
              flex: 1.05,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: 100,
            }}
          >
            {children}
          </div>
        </AbsoluteFill>
      ) : (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 40 }}>
          {kicker && <Kicker delay={4}>{kicker}</Kicker>}
          <Title delay={16} size={88}>
            {title}
          </Title>
          {sub && <Sub delay={40}>{sub}</Sub>}
          <div style={{ marginTop: 20 }}>{children}</div>
        </AbsoluteFill>
      )}

      {headline && (
        <div
          style={{
            position: "absolute",
            bottom: 90,
            left: 0,
            right: 0,
            textAlign: "center",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            fontSize: 34,
            color: theme.ink,
            letterSpacing: "-0.01em",
            opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: "clamp" }),
            textShadow: "0 0 40px rgba(34,211,238,0.35)",
          }}
        >
          {headline}
        </div>
      )}
    </AbsoluteFill>
  );
};

// Reusable glass card
export const GlassCard: React.FC<{
  children: React.ReactNode;
  width?: number | string;
  padding?: number;
  delay?: number;
  style?: React.CSSProperties;
}> = ({ children, width = 460, padding = 28, delay = 0, style }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        width,
        padding,
        borderRadius: 22,
        background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        border: "1px solid rgba(120,180,255,0.22)",
        boxShadow: "0 20px 60px rgba(0,20,60,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px)`,
        color: theme.ink,
        fontFamily: "'Inter', sans-serif",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
