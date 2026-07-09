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
import { Kicker, Title } from "../components/Type";
import { theme } from "../theme";

// 15s: HuNova VitaCore reveal — logo materializes at the center with orbit of flows
export const Scene3_Platform: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const reveal = spring({ frame: frame - 8, fps, config: { damping: 22, stiffness: 90 } });
  const glow = interpolate(reveal, [0, 1], [0, 1]);
  const scale = interpolate(reveal, [0, 1], [0.6, 1]);
  const push = interpolate(frame, [0, 360], [1.05, 1.0]);

  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={0.8} />
      <Particles count={60} seed={7} opacity={0.7} />

      {/* orbit flow rings */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        {[0, 1, 2].map((i) => {
          const rot = (frame * (0.25 + i * 0.15)) % 360;
          const size = 640 + i * 160;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1px dashed rgba(125,211,252,${0.22 - i * 0.05})`,
                transform: `rotate(${rot}deg)`,
                opacity: glow,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -6,
                  width: 12,
                  height: 12,
                  marginLeft: -6,
                  borderRadius: "50%",
                  background: "#22d3ee",
                  boxShadow: "0 0 24px #22d3ee",
                }}
              />
            </div>
          );
        })}

        {/* glass halo */}
        <div
          style={{
            position: "absolute",
            width: 520,
            height: 520,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(34,211,238,0.28) 0%, rgba(59,130,246,0.18) 40%, transparent 70%)",
            filter: "blur(20px)",
            opacity: glow,
          }}
        />

        {/* Logo */}
        <div
          style={{
            width: 380,
            height: 380,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${scale})`,
            opacity: reveal,
            filter: `drop-shadow(0 0 40px rgba(59,130,246,${0.55 * glow}))`,
          }}
        >
          <Img
            src={staticFile("images/hunova-logo.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>
      </AbsoluteFill>

      {/* Copy */}
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: "center",
          paddingBottom: 130,
          gap: 14,
        }}
      >
        <Kicker delay={30}>HuNova VitaCore</Kicker>
        <Title delay={50} size={82}>One Intelligent Platform.</Title>
        <div
          style={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 200,
            fontSize: 44,
            color: theme.cyan,
            letterSpacing: "-0.02em",
            opacity: interpolate(frame, [80, 120], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Every stage of care.
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};