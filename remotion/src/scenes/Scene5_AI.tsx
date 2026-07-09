import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Particles } from "../components/Particles";
import { Kicker, Title } from "../components/Type";
import { theme } from "../theme";

const PILLARS = [
  "Clinical",
  "Operational",
  "Predictive",
  "Patient",
  "Workforce",
  "Executive",
];

// 18s: holographic AI sphere with six intelligence pillars orbiting
export const Scene5_AI: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({ frame, fps, config: { damping: 30, stiffness: 60 } });

  const cx = 720;
  const cy = 540;
  const sphereR = 260;

  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={0.75} />
      <Particles count={70} seed={19} opacity={0.7} />

      {/* Sphere */}
      <AbsoluteFill>
        <svg width={1920} height={1080}>
          <defs>
            <radialGradient id="sphere" cx="50%" cy="45%" r="60%">
              <stop offset="0%" stopColor="#e0f7ff" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#22d3ee" stopOpacity="0.55" />
              <stop offset="70%" stopColor="#1e40af" stopOpacity="0.35" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* halo */}
          <circle cx={cx} cy={cy} r={sphereR * 1.8} fill="url(#sphere)" opacity={0.35 * entrance} />
          <circle cx={cx} cy={cy} r={sphereR} fill="url(#sphere)" opacity={entrance} />

          {/* wireframe latitudes */}
          {[0.35, 0.6, 0.85].map((k, i) => (
            <ellipse
              key={i}
              cx={cx}
              cy={cy}
              rx={sphereR * 0.98}
              ry={sphereR * k}
              fill="none"
              stroke="rgba(125,211,252,0.35)"
              strokeWidth={1}
              opacity={entrance}
            />
          ))}
          {/* longitudes rotating */}
          {[0, 1, 2, 3].map((i) => {
            const rot = (frame * 0.6 + i * 45) % 360;
            const rx = Math.abs(Math.cos((rot * Math.PI) / 180)) * sphereR * 0.98;
            return (
              <ellipse
                key={i}
                cx={cx}
                cy={cy}
                rx={rx}
                ry={sphereR * 0.98}
                fill="none"
                stroke="rgba(125,211,252,0.28)"
                strokeWidth={1}
                opacity={entrance}
              />
            );
          })}

          {/* data streams */}
          {Array.from({ length: 14 }).map((_, i) => {
            const t = (frame + i * 18) / 60;
            const a = (i / 14) * Math.PI * 2;
            const r = sphereR + 40 + (Math.sin(t) * 0.5 + 0.5) * 120;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r * 0.9;
            return (
              <circle key={i} cx={x} cy={y} r={2} fill="#7dd3fc" opacity={0.7 * entrance} />
            );
          })}
        </svg>
      </AbsoluteFill>

      {/* Pillars list on the right */}
      <AbsoluteFill
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: 160,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          {PILLARS.map((p, i) => {
            const start = 40 + i * 12;
            const s = spring({ frame: frame - start, fps, config: { damping: 200 } });
            return (
              <div
                key={p}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 22,
                  opacity: s,
                  transform: `translateX(${(1 - s) * 40}px)`,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 2,
                    background: "#22d3ee",
                    boxShadow: "0 0 14px #22d3ee",
                  }}
                />
                <div
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 200,
                    fontSize: 46,
                    color: theme.white,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p}{" "}
                  <span style={{ color: theme.inkDim, fontWeight: 200 }}>Intelligence</span>
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Headline */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 90,
          gap: 6,
          pointerEvents: "none",
        }}
      >
        <Kicker delay={140}>AI at the center</Kicker>
        <div style={{ display: "flex", gap: 22, alignItems: "baseline" }}>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 200,
              fontSize: 60,
              color: theme.white,
              letterSpacing: "-0.03em",
              opacity: interpolate(frame, [160, 200], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            AI assists.
          </div>
          <div
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 200,
              fontSize: 60,
              color: theme.cyan,
              letterSpacing: "-0.03em",
              opacity: interpolate(frame, [210, 250], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Healthcare professionals decide.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};