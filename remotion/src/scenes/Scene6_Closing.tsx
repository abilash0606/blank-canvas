import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Backdrop } from "../components/Backdrop";
import { Particles } from "../components/Particles";
import { theme } from "../theme";

// 14s: pull-back — full ecosystem re-forms around HuNova, tagline lands, fade to blue for Ch3
export const Scene6_Closing: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cx = 960;
  const cy = 540;
  const rBase = 300;

  const zoom = interpolate(frame, [0, 200], [1.3, 1.0]);
  const logoIn = spring({ frame: frame - 10, fps, config: { damping: 28, stiffness: 60 } });

  // fade to blue at the end for transition into ch3
  const fadeOut = interpolate(frame, [280, 336], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={0.9} />
      <Particles count={90} seed={23} opacity={0.9} />

      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: "50% 50%" }}>
        <svg width={1920} height={1080}>
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            const p = interpolate(frame - i * 3, [0, 30], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const r = rBase + (i % 3) * 60;
            const x = cx + Math.cos(a) * r;
            const y = cy + Math.sin(a) * r;
            return (
              <g key={i} opacity={p}>
                <line
                  x1={cx}
                  y1={cy}
                  x2={x}
                  y2={y}
                  stroke="rgba(125,211,252,0.35)"
                  strokeWidth={1}
                />
                <circle cx={x} cy={y} r={5} fill="#22d3ee" />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            width: 260,
            height: 260,
            transform: `scale(${logoIn})`,
            opacity: logoIn,
            filter: "drop-shadow(0 0 40px rgba(59,130,246,0.6))",
          }}
        >
          <Img
            src={staticFile("images/hunova-logo.png")}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 130,
          gap: 8,
        }}
      >
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 200,
            fontSize: 90,
            color: theme.white,
            letterSpacing: "-0.04em",
            opacity: interpolate(frame, [90, 130], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            textShadow: "0 0 60px rgba(59,130,246,0.4)",
          }}
        >
          One AI.
        </div>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 200,
            fontSize: 60,
            color: theme.cyan,
            letterSpacing: "-0.03em",
            opacity: interpolate(frame, [150, 200], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Every stage of life.
        </div>
        <div
          style={{
            marginTop: 30,
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            color: "rgba(125,211,252,0.7)",
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            opacity: interpolate(frame, [220, 260], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Next · Patient &amp; Family Intelligence
        </div>
      </AbsoluteFill>

      {/* transition wash to Ch3 */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.9) 0%, rgba(6,18,36,0.95) 60%, #000 100%)",
          opacity: fadeOut,
        }}
      />
    </AbsoluteFill>
  );
};