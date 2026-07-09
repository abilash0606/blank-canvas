import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Particles } from "../components/Particles";
import { Kicker, Title } from "../components/Type";
import { theme } from "../theme";

const NODES = [
  "Patients",
  "Families",
  "Doctors",
  "Nurses",
  "Specialists",
  "Hospitals",
  "Laboratories",
  "Radiology",
  "Pharmacies",
  "Insurance",
  "Emergency",
  "Administration",
];

// 18s: AI core radiates connections to 12 healthcare nodes on an orbit
export const Scene2_Ecosystem: React.FC = () => {
  const frame = useCurrentFrame();

  const cx = 960;
  const cy = 540;
  const rBase = 380;

  // slow rotation "camera"
  const rot = interpolate(frame, [0, 432], [0, 24]);
  // zoom out feel
  const zoom = interpolate(frame, [0, 240, 432], [1.35, 1.0, 0.94]);

  const nodes = useMemo(() => {
    return NODES.map((name, i) => {
      const a = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
      return { name, a };
    });
  }, []);

  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={0.7} />
      <Particles count={80} seed={5} opacity={0.6} />

      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
        <svg width={1920} height={1080} style={{ position: "absolute", inset: 0 }}>
          <defs>
            <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="#22d3ee" />
              <stop offset="75%" stopColor="#1e40af" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Orbit rings */}
          {[0.55, 0.85, 1.15].map((k, i) => (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={rBase * k}
              fill="none"
              stroke="rgba(125,211,252,0.14)"
              strokeWidth={1}
              strokeDasharray="2 8"
              transform={`rotate(${rot * (i + 1) * 0.4} ${cx} ${cy})`}
            />
          ))}

          {/* Connections drawn one by one */}
          {nodes.map((n, i) => {
            const start = 8 + i * 8;
            const p = interpolate(frame - start, [0, 22], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const ang = n.a + (rot * Math.PI) / 180;
            const x = cx + Math.cos(ang) * rBase;
            const y = cy + Math.sin(ang) * rBase;
            const ix = cx + Math.cos(ang) * (rBase * p);
            const iy = cy + Math.sin(ang) * (rBase * p);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={ix}
                y2={iy}
                stroke="url(#lineGrad)"
                strokeWidth={1.4}
                opacity={0.75}
              />
            );
          })}

          {/* Core */}
          <circle cx={cx} cy={cy} r={90} fill="url(#coreGrad)" />
          <circle cx={cx} cy={cy} r={22} fill="#ffffff" opacity={0.9} />

          {/* Nodes */}
          {nodes.map((n, i) => {
            const start = 8 + i * 8;
            const appear = interpolate(frame - (start + 18), [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const ang = n.a + (rot * Math.PI) / 180;
            const x = cx + Math.cos(ang) * rBase;
            const y = cy + Math.sin(ang) * rBase;
            const pulse = 1 + 0.12 * Math.sin((frame - start) / 10 + i);
            return (
              <g key={i} opacity={appear} transform={`translate(${x} ${y}) scale(${pulse})`}>
                <circle r={14} fill="#22d3ee" opacity={0.28} />
                <circle r={7} fill="#ffffff" />
                <circle r={7} fill="none" stroke="#22d3ee" strokeWidth={1.5} />
              </g>
            );
          })}

          {/* Node labels */}
          {nodes.map((n, i) => {
            const start = 8 + i * 8 + 26;
            const p = interpolate(frame - start, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const ang = n.a + (rot * Math.PI) / 180;
            const labelR = rBase + 42;
            const x = cx + Math.cos(ang) * labelR;
            const y = cy + Math.sin(ang) * labelR;
            const anchor =
              Math.cos(ang) > 0.3 ? "start" : Math.cos(ang) < -0.3 ? "end" : "middle";
            return (
              <text
                key={i}
                x={x}
                y={y + 5}
                fill="#e2f3ff"
                opacity={p * 0.9}
                fontFamily="Inter, sans-serif"
                fontSize={18}
                fontWeight={300}
                letterSpacing="0.18em"
                textAnchor={anchor}
                style={{ textTransform: "uppercase" }}
              >
                {n.name}
              </text>
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: 90, gap: 16 }}>
        <Kicker delay={10}>Chapter 02 · The HuNova Vision</Kicker>
        <Title delay={20} size={66}>An ecosystem awakens.</Title>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};