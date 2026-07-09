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

/* TITLE — Ch IX */
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40, stiffness: 55 } });
  const push = interpolate(frame, [0, 240], [1.0, 1.06]);
  // AI core pulse
  const beat = 0.5 + 0.5 * Math.sin(frame / 12);
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={1} />
      <Particles count={110} seed={91} opacity={0.95} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)`, position: "relative" }}>
          <div style={{
            position: "absolute", inset: -50, borderRadius: "50%",
            border: "1px solid rgba(34,211,238,0.55)",
            transform: `scale(${1 + beat * 0.15})`, opacity: 0.9 - beat * 0.5,
            boxShadow: "0 0 40px rgba(34,211,238,0.45)",
          }} />
          <div style={{
            position: "absolute", inset: -90, borderRadius: "50%",
            border: "1px solid rgba(59,130,246,0.4)",
            transform: `scale(${1 + beat * 0.08})`, opacity: 0.6 - beat * 0.3,
          }} />
          <Logo size={150} glow={1.4} />
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 24, letterSpacing: "0.55em",
          color: theme.cyan,
          opacity: interpolate(frame, [24, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}>CHAPTER IX</div>
        <Title delay={40} size={92}>The AI Intelligence Layer</Title>
        <Sub delay={80}>The intelligence behind every decision.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — The Digital Brain */
const DigitalBrain: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 360, cy = 260, R = 130;
  const streams = ["Patients", "Doctors", "Hospitals", "Laboratories", "Radiology", "Pharmacy", "Insurance", "Administration", "Emergency"];
  return (
    <div style={{ position: "relative", width: 720, height: 520 }}>
      <svg width={720} height={520}>
        <defs>
          <radialGradient id="core9" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#e0f7ff" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="80%" stopColor="#1e40af" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={R * 1.9} fill="url(#core9)" opacity={0.45} />
        <circle cx={cx} cy={cy} r={R} fill="url(#core9)" />
        {[0.35, 0.65, 0.95].map((k, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={R * 0.98} ry={R * k}
            fill="none" stroke="rgba(125,211,252,0.4)" strokeWidth={1} />
        ))}
        {streams.map((label, i) => {
          const angle = (i / streams.length) * Math.PI * 2 + frame / 240;
          const rNode = R + 150;
          const nx = cx + Math.cos(angle) * rNode;
          const ny = cy + Math.sin(angle) * rNode * 0.75;
          const t = ((frame + i * 20) % 90) / 90;
          const px = nx + (cx - nx) * t;
          const py = ny + (cy - ny) * t;
          const appear = interpolate(frame - 20 - i * 8, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <g key={label} opacity={appear}>
              <line x1={nx} y1={ny} x2={cx} y2={cy} stroke="rgba(120,180,255,0.18)" />
              <circle cx={px} cy={py} r={2.5} fill="#22d3ee" opacity={0.9} />
              <circle cx={nx} cy={ny} r={4} fill="#3b82f6" stroke="#22d3ee" />
              <text x={nx} y={ny - 10} textAnchor="middle" fontFamily="Inter" fontSize={12}
                fill="#e2f3ff" letterSpacing="0.14em">{label.toUpperCase()}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
const S1_Brain: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · The Digital Brain"
    title="One intelligence. Every decision."
    sub="Every signal in healthcare converges into a single, connected mind."
    seed={91}
  ><DigitalBrain /></SceneShell>
);

/* Helper: intelligence pillar scene */
const PillarList: React.FC<{ items: string[]; label: string }> = ({ items, label }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", gap: 12 }}>
      <GlassCard delay={0} width={640} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.3em" }}>{label}</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>Assist. Analyze. Recommend.</div>
      </GlassCard>
      {items.map((r, i) => {
        const p = interpolate(frame - 15 - i * 10, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            padding: "14px 20px", borderRadius: 12,
            background: "rgba(59,130,246,0.10)",
            border: "1px solid rgba(120,180,255,0.28)",
            display: "flex", alignItems: "center", gap: 14,
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateX(${(1 - p) * 16}px)`,
          }}>
            <span style={{ width: 8, height: 8, background: "#22d3ee", borderRadius: 2, boxShadow: "0 0 10px #22d3ee" }} />
            <span style={{ fontSize: 18, fontWeight: 300 }}>{r}</span>
          </div>
        );
      })}
    </div>
  );
};

const S2_Clinical: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Clinical Intelligence"
    title="Support for every consultation."
    sub="AI reviews. The doctor decides."
    seed={92}
  >
    <PillarList
      label="CLINICAL INTELLIGENCE"
      items={["Medical history", "Allergies & interactions", "Chronic disease context", "Laboratory trends", "Radiology findings", "Medication safety", "Preventive care", "Clinical guidelines"]}
    />
  </SceneShell>
);

const S3_Patient: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Patient Intelligence"
    title="Healthcare beyond treatment."
    sub="Proactive, personalized, always in the patient's pocket."
    seed={93}
  >
    <PillarList
      label="PATIENT INTELLIGENCE"
      items={["Health timeline", "Medication reminders", "Appointment suggestions", "Preventive care nudges", "Wellness insights", "Personalized recommendations"]}
    />
  </SceneShell>
);

/* S4 — Operational Intelligence with mini forecast tiles */
const OpsCards: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { k: "Patient flow", v: "Peak in 90 min" },
    { k: "Bed availability", v: "12 opening" },
    { k: "Waiting time", v: "-24%" },
    { k: "Staff allocation", v: "Balanced" },
    { k: "Resource utilization", v: "87%" },
    { k: "Department performance", v: "On target" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 300px)", gap: 14 }}>
      {items.map((t, i) => {
        const p = interpolate(frame - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            padding: "18px 20px", borderRadius: 16, minHeight: 110,
            background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(120,180,255,0.28)",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em" }}>{t.k.toUpperCase()}</div>
            <div style={{ fontSize: 24, fontWeight: 300, letterSpacing: "-0.02em" }}>{t.v}</div>
          </div>
        );
      })}
    </div>
  );
};
const S4_Ops: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Operational Intelligence"
    title="Predict. Optimize. Improve."
    sub="Recommendations arrive before problems do."
    seed={94}
  ><OpsCards /></SceneShell>
);

const S5_Workforce: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Workforce Intelligence"
    title="Care for the people who care."
    sub="AI recommends. Healthcare professionals remain in control."
    seed={95}
  >
    <PillarList
      label="WORKFORCE INTELLIGENCE"
      items={["Shift planning", "Burnout risk signals", "Emergency staffing", "Leave planning", "Training progress"]}
    />
  </SceneShell>
);

/* S6 — Executive Intelligence: holographic command center */
const ExecHolo: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = [38, 52, 46, 61, 70, 66, 80, 76, 88, 86, 94, 100];
  return (
    <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard delay={0} width={720} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.3em" }}>EXECUTIVE COMMAND · LIVE</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>Leadership powered by intelligence.</div>
      </GlassCard>
      <div style={{
        padding: 18, borderRadius: 16, background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(120,180,255,0.28)",
      }}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em", marginBottom: 10 }}>REVENUE FORECAST · 12 MO</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 140 }}>
          {bars.map((b, i) => {
            const p = interpolate(frame - i * 6, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                flex: 1, height: `${b * p}%`,
                background: "linear-gradient(180deg, #22d3ee, #3b82f6)",
                borderRadius: 4, boxShadow: "0 0 12px rgba(34,211,238,0.4)",
              }} />
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {[
          { k: "Growth", v: "+ 34%" },
          { k: "Satisfaction", v: "96%" },
          { k: "Efficiency", v: "+ 22%" },
        ].map((s, i) => {
          const p = interpolate(frame - 80 - i * 12, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              padding: "14px 16px", borderRadius: 12,
              background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.4)",
              opacity: p, transform: `translateY(${(1 - p) * 10}px)`,
              color: theme.ink, fontFamily: "'Inter'",
            }}>
              <div style={{ color: theme.cyan, fontSize: 10, letterSpacing: "0.24em" }}>{s.k.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 300, marginTop: 2 }}>{s.v}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
const S6_Exec: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · Executive Intelligence"
    title="Leadership powered by intelligence."
    sub="Every strategic decision, supported."
    seed={96}
  ><ExecHolo /></SceneShell>
);

/* S7 — Community Innovation */
const CommunityGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const contributors = ["Patients", "Doctors", "Nurses", "Hospital staff", "Researchers", "Partners"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 200px)", gap: 12 }}>
      {contributors.map((n, i) => {
        const p = interpolate(frame - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={n} style={{
            padding: "24px 20px", borderRadius: 14, textAlign: "center",
            background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(59,130,246,0.16))",
            border: "1px solid rgba(34,211,238,0.55)",
            boxShadow: "0 0 22px rgba(34,211,238,0.28)",
            color: theme.ink, fontFamily: "'Inter'",
            fontSize: 18, fontWeight: 300, letterSpacing: "0.06em",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
          }}>{n}</div>
        );
      })}
    </div>
  );
};
const S7_Community: React.FC = () => (
  <SceneShell
    kicker="Scene 07 · Community Innovation"
    title="Innovation never stops."
    sub="Ideas from the field. Voted. Delivered."
    seed={97}
  ><CommunityGrid /></SceneShell>
);

/* S8 — Unified Intelligence Sphere */
const UnifiedSphere: React.FC = () => {
  const frame = useCurrentFrame();
  const cx = 360, cy = 260, R = 180;
  const rings = ["Clinical", "Patient", "Operational", "Workforce", "Executive", "Community"];
  return (
    <svg width={720} height={520}>
      <defs>
        <radialGradient id="uni" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="40%" stopColor="#22d3ee" stopOpacity="0.65" />
          <stop offset="80%" stopColor="#1e40af" stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx={cx} cy={cy} r={R * 1.6} fill="url(#uni)" opacity={0.5} />
      <circle cx={cx} cy={cy} r={R} fill="url(#uni)" />
      {rings.map((label, i) => {
        const angle = (i / rings.length) * Math.PI * 2 - Math.PI / 2 + frame / 300;
        const r = R + 60;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;
        const p = interpolate(frame - 30 - i * 12, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <g key={label} opacity={p}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(125,211,252,0.35)" />
            <circle cx={x} cy={y} r={7} fill="#22d3ee" stroke="#fff" strokeWidth={1} />
            <text x={x} y={y - 16} textAnchor="middle" fontFamily="Inter" fontSize={13}
              fill="#e2f3ff" letterSpacing="0.18em">{label.toUpperCase()}</text>
          </g>
        );
      })}
    </svg>
  );
};
const S8_Unified: React.FC = () => (
  <SceneShell
    kicker="Scene 08 · The Unified Intelligence"
    title="One connected AI ecosystem."
    sub="Every capability, one intelligence layer."
    seed={98}
  ><UnifiedSphere /></SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 260], [1.15, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [200, 340], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <Particles count={100} seed={99} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})`, opacity: opac }}>
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -80, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,211,238,0.35), transparent 65%)",
            filter: "blur(6px)",
          }} />
          <Logo size={180} glow={1.6} />
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{
        justifyContent: "center", alignItems: "center",
        background: `radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,${outro * 0.85}) 0%, transparent 80%)`,
      }}>
        <div style={{ opacity: outro, textAlign: "center" }}>
          <Kicker delay={220}>The intelligence layer connecting healthcare</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={240} size={76}>One AI. Infinite possibilities.</Title>
          <Sub delay={270}>Next · Technology · Cyber Defense · The Future.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Chapter 9 — ~2.5 min */
export const Chapter9: React.FC = () => {
  const T = 10;
  const SCENE = 380;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}><TitleScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Brain /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Clinical /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Patient /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Ops /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Workforce /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Exec /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S7_Community /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S8_Unified /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade({ shouldFadeOutExitingScene: false })} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={360}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
