import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Particles } from "../components/Particles";
import { Kicker, Title } from "../components/Type";
import { theme } from "../theme";

const STOPS = [
  "Registration",
  "AI Doctor Match",
  "Appointment",
  "Smart Queue",
  "Consultation",
  "Laboratory",
  "Radiology",
  "Pharmacy",
  "Insurance",
  "Follow-up",
  "Preventive Care",
];

// 20s: cinematic patient-journey rail — camera pans right through 11 stops
export const Scene4_Journey: React.FC = () => {
  const frame = useCurrentFrame();

  const totalW = 3600;
  const startPad = 200;
  const endPad = 200;
  const usable = totalW - startPad - endPad;
  const stopX = (i: number) => startPad + (usable / (STOPS.length - 1)) * i;

  // camera pan from 0 to (totalW - 1920) plus slight parallax
  const panX = interpolate(frame, [0, 480], [0, totalW - 1920], {
    extrapolateRight: "clamp",
  });

  // patient "dot" moves along the rail
  const patientI = interpolate(frame, [30, 470], [0, STOPS.length - 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const patientX = interpolate(
    patientI,
    STOPS.map((_, i) => i),
    STOPS.map((_, i) => stopX(i)),
  );
  const patientY = 540 + Math.sin(frame / 12) * 6;

  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={0.55} />
      <Particles count={50} seed={11} opacity={0.4} />

      <AbsoluteFill style={{ transform: `translateX(${-panX}px)` }}>
        <svg width={totalW} height={1080} style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <linearGradient id="railGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e40af" />
              <stop offset="50%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>

          {/* rail */}
          <line
            x1={startPad}
            y1={540}
            x2={totalW - endPad}
            y2={540}
            stroke="rgba(125,211,252,0.18)"
            strokeWidth={2}
            strokeDasharray="4 10"
          />
          {/* progress overlay */}
          <line
            x1={startPad}
            y1={540}
            x2={patientX}
            y2={540}
            stroke="url(#railGrad)"
            strokeWidth={3}
            style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
          />

          {/* stops */}
          {STOPS.map((s, i) => {
            const x = stopX(i);
            const done = patientI >= i - 0.1;
            const alpha = done ? 1 : 0.5;
            return (
              <g key={i} opacity={alpha}>
                <circle
                  cx={x}
                  cy={540}
                  r={done ? 16 : 10}
                  fill={done ? "#22d3ee" : "#0b1a2b"}
                  stroke={done ? "#ffffff" : "rgba(125,211,252,0.6)"}
                  strokeWidth={1.6}
                />
                {done && (
                  <circle cx={x} cy={540} r={26} fill="none" stroke="#22d3ee" strokeWidth={1} opacity={0.4} />
                )}
                <text
                  x={x}
                  y={i % 2 === 0 ? 480 : 620}
                  textAnchor="middle"
                  fill="#e2f3ff"
                  fontFamily="Inter, sans-serif"
                  fontSize={22}
                  fontWeight={300}
                  letterSpacing="0.14em"
                  style={{ textTransform: "uppercase" }}
                >
                  {s}
                </text>
                <text
                  x={x}
                  y={i % 2 === 0 ? 452 : 648}
                  textAnchor="middle"
                  fill="rgba(125,211,252,0.6)"
                  fontFamily="Inter, sans-serif"
                  fontSize={14}
                  letterSpacing="0.3em"
                >
                  {String(i + 1).padStart(2, "0")}
                </text>
              </g>
            );
          })}

          {/* patient dot */}
          <g>
            <circle cx={patientX} cy={patientY} r={30} fill="rgba(255,255,255,0.16)" />
            <circle cx={patientX} cy={patientY} r={14} fill="#ffffff" style={{ filter: "drop-shadow(0 0 18px #22d3ee)" }} />
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ padding: 90, gap: 16, pointerEvents: "none" }}>
        <Kicker delay={6}>The Patient Journey</Kicker>
        <Title delay={16} size={62}>One patient. One continuous experience.</Title>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};