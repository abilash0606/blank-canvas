import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";

import { Backdrop } from "./components/Backdrop";
import { Particles } from "./components/Particles";
import { Kicker, Title, Sub } from "./components/Type";
import { Logo } from "./components/Logo";
import { SceneShell, GlassCard } from "./components/SceneShell";
import { theme } from "./theme";

loadFont("normal", { weights: ["200", "300", "400", "500"], subsets: ["latin"] });

/* TITLE — Ch X */
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40, stiffness: 55 } });
  const push = interpolate(frame, [0, 240], [1.0, 1.06]);
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={1} />
      <Particles count={120} seed={101} opacity={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={150} glow={1.4} />
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 24, letterSpacing: "0.55em",
          color: theme.cyan,
          opacity: interpolate(frame, [24, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}>CHAPTER X</div>
        <Title delay={40} size={92}>The Future of Healthcare</Title>
        <Sub delay={80}>Built for today. Designed for tomorrow.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — Enterprise Technology Stack */
const StackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const layers = [
    "React", "TypeScript", "Flutter", ".NET 9", "Clean Architecture", "CQRS",
    "Entity Framework", "PostgreSQL", "Redis", "SignalR", "Docker", "Kubernetes",
    "Cloud Infrastructure", "AI Intelligence Engine",
  ];
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", gap: 6 }}>
      {layers.map((l, i) => {
        const p = interpolate(frame - i * 6, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const isAI = i === layers.length - 1;
        return (
          <div key={l} style={{
            padding: "10px 18px", borderRadius: 10,
            background: isAI
              ? "linear-gradient(90deg, rgba(34,211,238,0.28), rgba(59,130,246,0.20))"
              : "rgba(59,130,246,0.10)",
            border: `1px solid ${isAI ? "rgba(34,211,238,0.6)" : "rgba(120,180,255,0.28)"}`,
            color: theme.ink, fontFamily: "'Inter'",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            opacity: p, transform: `translateY(${(1 - p) * 10}px)`,
            boxShadow: isAI ? "0 0 24px rgba(34,211,238,0.35)" : "none",
          }}>
            <span style={{ fontSize: 17, fontWeight: 300 }}>{l}</span>
            <span style={{ color: theme.cyan, fontSize: 10, letterSpacing: "0.24em" }}>
              {isAI ? "INTELLIGENCE" : "LAYER"}
            </span>
          </div>
        );
      })}
    </div>
  );
};
const S1_Stack: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · Enterprise Technology"
    title="Built to scale."
    sub="Every layer engineered for enterprise healthcare."
    seed={101}
  ><StackScene /></SceneShell>
);

/* S2 — Cyber Defense: shield + incoming threats */
const ShieldScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 360, cy = 260, R = 140;
  const threats = Array.from({ length: 10 }).map((_, i) => {
    const t = ((frame + i * 40) % 180) / 180;
    const angle = (i / 10) * Math.PI * 2;
    const startR = 320;
    const r = startR * (1 - t);
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r * 0.85;
    const blocked = r < R + 20;
    return { x, y, blocked, i };
  });
  const controls = [
    "Zero Trust Security", "End-to-end Encryption", "Role-based Access",
    "Audit Trails", "Threat Detection", "Continuous Monitoring", "Compliance Frameworks",
  ];
  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <svg width={520} height={520}>
        <defs>
          <radialGradient id="shd" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.55" />
            <stop offset="60%" stopColor="#1e40af" stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={R * 1.4} fill="url(#shd)" opacity={0.5} />
        <circle cx={cx} cy={cy} r={R} fill="none" stroke="#22d3ee" strokeWidth={2}
          style={{ filter: "drop-shadow(0 0 18px #22d3ee)" }} />
        <circle cx={cx} cy={cy} r={R - 14} fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth={1} />
        <text x={cx} y={cy + 6} textAnchor="middle" fontFamily="Inter" fontSize={16}
          fill="#e2f3ff" letterSpacing="0.3em">PROTECTED</text>
        {threats.map((t) => (
          <g key={t.i}>
            <circle cx={t.x} cy={t.y} r={t.blocked ? 6 : 3.5}
              fill={t.blocked ? "#ef4444" : "#f59e0b"}
              opacity={t.blocked ? 0.3 : 0.85}
              style={{ filter: t.blocked ? "none" : "drop-shadow(0 0 6px #f59e0b)" }} />
          </g>
        ))}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {controls.map((c, i) => {
          const p = interpolate(frame - 15 - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={c} style={{
              padding: "10px 16px", borderRadius: 10,
              background: "rgba(34,211,238,0.10)",
              border: "1px solid rgba(34,211,238,0.4)",
              color: theme.ink, fontFamily: "'Inter'", fontSize: 15,
              opacity: p, transform: `translateX(${(1 - p) * 12}px)`,
            }}>
              <span style={{ color: theme.cyan, marginRight: 8 }}>✓</span>{c}
            </div>
          );
        })}
      </div>
    </div>
  );
};
const S2_Cyber: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · AI Cyber Defense"
    title="Security by design."
    sub="Every threat detected. Every patient protected."
    seed={102}
  ><ShieldScene /></SceneShell>
);

/* S3 — National Connectivity: city with nodes */
const NationalScene: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    { x: 120, y: 240, l: "Hospital" },
    { x: 300, y: 140, l: "Laboratory" },
    { x: 500, y: 220, l: "Radiology" },
    { x: 220, y: 380, l: "Pharmacy" },
    { x: 420, y: 380, l: "Emergency" },
    { x: 600, y: 340, l: "Insurance" },
  ];
  return (
    <svg width={720} height={480}>
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => {
          const t = ((frame + i * 9 + j * 5) % 100) / 100;
          const px = a.x + (b.x - a.x) * t;
          const py = a.y + (b.y - a.y) * t;
          return (
            <g key={`${i}-${j}`}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(120,180,255,0.16)" />
              <circle cx={px} cy={py} r={2.5} fill="#22d3ee" opacity={0.85} />
            </g>
          );
        })
      )}
      {nodes.map((n, i) => {
        const p = interpolate(frame - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <g key={n.l} opacity={p}>
            <circle cx={n.x} cy={n.y} r={12} fill="rgba(59,130,246,0.35)" stroke="#22d3ee" strokeWidth={1.5}
              style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }} />
            <text x={n.x} y={n.y - 22} textAnchor="middle" fontFamily="Inter" fontSize={13}
              fill="#e2f3ff" letterSpacing="0.16em">{n.l.toUpperCase()}</text>
          </g>
        );
      })}
    </svg>
  );
};
const S3_National: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · National Connectivity"
    title="Connected healthcare. Trusted access."
    sub="Secure flows — with patient consent and full compliance."
    seed={103}
  ><NationalScene /></SceneShell>
);

/* S4 — Global Vision: globe with pulses */
const GlobeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 360, cy = 260, R = 180;
  const cities = [
    { a: 0.2, b: 0.1 }, { a: 1.2, b: -0.3 }, { a: 2.2, b: 0.2 },
    { a: 3.4, b: -0.2 }, { a: 4.5, b: 0.35 }, { a: 5.4, b: -0.15 },
  ];
  return (
    <svg width={720} height={520}>
      <defs>
        <radialGradient id="glb" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#1e40af" stopOpacity="0.25" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R} fill="url(#glb)" />
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="rgba(125,211,252,0.5)" strokeWidth={1.2} />
      {[0.3, 0.55, 0.8].map((k, i) => (
        <ellipse key={i} cx={cx} cy={cy} rx={R} ry={R * k}
          fill="none" stroke="rgba(125,211,252,0.35)" />
      ))}
      {[0, 1, 2, 3].map((i) => {
        const rot = (frame * 0.5 + i * 45) % 180;
        const rx = Math.abs(Math.cos((rot * Math.PI) / 180)) * R;
        return (
          <ellipse key={i} cx={cx} cy={cy} rx={rx} ry={R}
            fill="none" stroke="rgba(125,211,252,0.25)" />
        );
      })}
      {cities.map((c, i) => {
        const angle = c.a + frame / 300;
        const x = cx + Math.cos(angle) * R * 0.9;
        const y = cy + c.b * R + Math.sin(angle) * 8;
        const pulse = 1 + 0.4 * Math.sin(frame / 8 + i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={5 * pulse} fill="#22d3ee" opacity={0.35} />
            <circle cx={x} cy={y} r={3} fill="#fff"
              style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
          </g>
        );
      })}
    </svg>
  );
};
const S4_Global: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Global Vision"
    title="Designed for global healthcare."
    sub="Interoperable. Respectful of every regulation and every patient."
    seed={104}
  ><GlobeScene /></SceneShell>
);

/* S5 — Continuous Innovation */
const InnovationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const capabilities = [
    "Ambient documentation", "Predictive diagnostics", "Voice-first workflows",
    "Genomics integration", "Remote monitoring", "AI care copilots",
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 300px)", gap: 12 }}>
      {capabilities.map((c, i) => {
        const p = interpolate(frame - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={c} style={{
            padding: "18px 20px", borderRadius: 14,
            background: "linear-gradient(160deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            border: "1px solid rgba(120,180,255,0.28)",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
          }}>
            <div style={{ color: theme.cyan, fontSize: 10, letterSpacing: "0.24em" }}>ROADMAP</div>
            <div style={{ fontSize: 20, fontWeight: 300, marginTop: 4 }}>{c}</div>
          </div>
        );
      })}
    </div>
  );
};
const S5_Innovation: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Continuous Innovation"
    title="Always learning. Always improving."
    sub="Healthcare evolves. HuNova evolves with it."
    seed={105}
  ><InnovationScene /></SceneShell>
);

/* S6 — Final Cinematic Ending */
const FinaleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const rotate = interpolate(frame, [0, 480], [0, 120]);
  const zoom = interpolate(frame, [0, 300], [1.1, 1.0]);
  const logoIn = interpolate(frame, [140, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line1 = interpolate(frame, [240, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line2 = interpolate(frame, [300, 340], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const line3 = interpolate(frame, [360, 400], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const brand = interpolate(frame, [440, 500], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#000" }}>

      <Backdrop intensity={0.9} />
      <Particles count={110} seed={106} opacity={0.85} />
      {/* Earth */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})` }}>
        <svg width={900} height={620} viewBox="0 0 900 620">
          <defs>
            <radialGradient id="earth" cx="45%" cy="45%" r="55%">
              <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6" />
              <stop offset="70%" stopColor="#0a1a3a" stopOpacity="0.7" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <g transform={`translate(450 310)`}>
            <circle r={220} fill="url(#earth)" />
            <circle r={220} fill="none" stroke="rgba(125,211,252,0.4)" />
            <g transform={`rotate(${rotate})`}>
              {[0.35, 0.6, 0.85].map((k, i) => (
                <ellipse key={i} rx={220} ry={220 * k}
                  fill="none" stroke="rgba(125,211,252,0.28)" />
              ))}
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return (
                  <circle key={i}
                    cx={Math.cos(a) * 200} cy={Math.sin(a) * 200 * 0.9}
                    r={3} fill="#22d3ee"
                    style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
                );
              })}
            </g>
          </g>
        </svg>
      </AbsoluteFill>

      {/* Logo overlay center */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", opacity: logoIn }}>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -60, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.45), transparent 70%)",
            filter: "blur(8px)",
          }} />
          <Logo size={170} glow={1.6} />
        </div>
      </AbsoluteFill>

      {/* Final lines */}
      <AbsoluteFill style={{
        justifyContent: "flex-end", alignItems: "center",
        paddingBottom: 110, gap: 10,
      }}>
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 200, fontSize: 46,
          letterSpacing: "-0.02em", color: theme.white, opacity: line1,
        }}>One platform.</div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 200, fontSize: 46,
          letterSpacing: "-0.02em", color: theme.cyan, opacity: line2,
        }}>One intelligence.</div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 200, fontSize: 46,
          letterSpacing: "-0.02em", color: theme.white, opacity: line3,
        }}>Every stage of life.</div>
        <div style={{ height: 30 }} />
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 22,
          letterSpacing: "0.42em", color: theme.ink, opacity: brand,
        }}>HUNOVA VITACORE</div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 15,
          letterSpacing: "0.3em", color: theme.inkDim, opacity: brand,
        }}>AI HEALTHCARE INTELLIGENCE PLATFORM</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* End credits */
const CreditsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const words = ["Vision", "Innovation", "Intelligence", "Trust", "Compassion"];
  const fadeIn = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [260, 360], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: "#000", opacity: fadeIn * fadeOut }}>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 22 }}>
        {words.map((w, i) => {
          const p = interpolate(frame - 20 - i * 22, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={w} style={{
              fontFamily: "Inter, sans-serif", fontWeight: 200, fontSize: 42,
              letterSpacing: "0.32em", color: theme.ink, opacity: p,
            }}>{w.toUpperCase()}</div>
          );
        })}
        <div style={{ height: 40 }} />
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 300, fontSize: 16,
          letterSpacing: "0.3em", color: theme.inkDim,
          opacity: interpolate(frame, [160, 200], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>POWERED BY</div>
        <div style={{
          fontFamily: "Inter, sans-serif", fontWeight: 400, fontSize: 26,
          letterSpacing: "0.42em", color: theme.white,
          opacity: interpolate(frame, [180, 220], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}>HUNOVA VITACORE</div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Chapter 10 — ~3 min */
export const Chapter10: React.FC = () => {
  const T = 10;
  const SCENE = 560;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}><TitleScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Stack /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Cyber /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_National /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Global /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Innovation /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={840}><FinaleScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: 36 })} />
        <TransitionSeries.Sequence durationInFrames={360}><CreditsScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
