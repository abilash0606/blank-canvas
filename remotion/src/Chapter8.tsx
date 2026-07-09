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

/* TITLE */
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40, stiffness: 55 } });
  const push = interpolate(frame, [0, 240], [1.0, 1.06]);
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={1} />
      <Particles count={90} seed={81} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={140} glow={1.2} />
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif", fontSize: 24, letterSpacing: "0.55em",
          color: theme.cyan,
          opacity: interpolate(frame, [24, 60], [0, 1], { extrapolateRight: "clamp" }),
        }}>CHAPTER VIII</div>
        <Title delay={40} size={92}>Hospital Intelligence</Title>
        <Sub delay={80}>Running smarter hospitals.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — Intelligent Hospital: aerial building with lit departments */
const HospitalBuilding: React.FC = () => {
  const frame = useCurrentFrame();
  const depts = ["Reception", "Emergency", "ICU", "Operation Theatre", "Laboratory", "Radiology", "Pharmacy", "Administration"];
  return (
    <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
      <svg width={280} height={440} viewBox="0 0 280 440">
        <rect x={40} y={40} width={200} height={380} rx={10} fill="rgba(59,130,246,0.15)" stroke="rgba(120,180,255,0.6)" strokeWidth={1.5} />
        {Array.from({ length: 8 }).map((_, i) => {
          const y = 60 + i * 45;
          const litL = ((frame / 8 + i) % 3) > 1;
          const litR = ((frame / 8 + i + 1) % 3) > 1;
          return (
            <g key={i}>
              <rect x={60} y={y} width={70} height={28} rx={3} fill={litL ? "rgba(34,211,238,0.55)" : "rgba(34,211,238,0.12)"} />
              <rect x={150} y={y} width={70} height={28} rx={3} fill={litR ? "rgba(34,211,238,0.55)" : "rgba(34,211,238,0.12)"} />
            </g>
          );
        })}
        <text x={140} y={30} textAnchor="middle" fontFamily="Inter" fontSize={11} fill="#22d3ee" letterSpacing="0.3em">HUNOVA HOSPITAL</text>
      </svg>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 210px)", gap: 10 }}>
        {depts.map((d, i) => {
          const p = interpolate(frame - i * 12, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={d} style={{
              padding: "12px 14px", borderRadius: 10,
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.35)",
              color: theme.ink, fontFamily: "'Inter'", fontSize: 15, fontWeight: 300,
              opacity: p, transform: `translateX(${(1 - p) * 12}px)`,
            }}>{d}</div>
          );
        })}
      </div>
    </div>
  );
};
const S1_Hospital: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · The Intelligent Hospital"
    title="One hospital. One intelligence."
    sub="Every department synchronized inside a single operational fabric."
    seed={81}
  ><HospitalBuilding /></SceneShell>
);

/* S2 — Workforce Intelligence */
const WorkforceDash: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    { k: "Doctors on shift", v: "38 / 42" },
    { k: "Nurses on shift", v: "112 / 120" },
    { k: "Shift swaps approved", v: "6" },
    { k: "Leave requests", v: "4 pending" },
    { k: "Burnout risk (dept.)", v: "ICU · elevated" },
    { k: "Training progress", v: "82%" },
  ];
  return (
    <div style={{ width: 700, display: "flex", flexDirection: "column", gap: 10 }}>
      <GlassCard delay={0} width={700} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>WORKFORCE INTELLIGENCE · TODAY</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>Right people. Right time. Right place.</div>
      </GlassCard>
      {rows.map((r, i) => {
        const p = interpolate(frame - 15 - i * 12, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            padding: "12px 18px", borderRadius: 12,
            background: "rgba(59,130,246,0.10)",
            border: "1px solid rgba(120,180,255,0.28)",
            display: "flex", justifyContent: "space-between",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateX(${(1 - p) * 14}px)`,
          }}>
            <span style={{ fontSize: 15 }}>{r.k}</span>
            <span style={{ color: theme.cyan, fontSize: 14, letterSpacing: "0.14em" }}>{r.v}</span>
          </div>
        );
      })}
    </div>
  );
};
const S2_Workforce: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Workforce Intelligence"
    title="The right people. At the right time."
    sub="AI recommends. Management approves. Schedules stay optimized in real time."
    seed={82}
  ><WorkforceDash /></SceneShell>
);

/* S3 — Smart Hospital Operations */
const OperationsGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const tiles = [
    { k: "Appointments today", v: "1,284" },
    { k: "Beds occupied", v: "312 / 380" },
    { k: "ICU occupancy", v: "24 / 30" },
    { k: "OT scheduled", v: "18 procedures" },
    { k: "Patient flow (avg wait)", v: "14 min" },
    { k: "Inventory alerts", v: "3 items low" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 240px)", gap: 14 }}>
      {tiles.map((t, i) => {
        const p = interpolate(frame - i * 10, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            padding: "18px 20px", borderRadius: 16, minHeight: 130,
            background: "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
            border: "1px solid rgba(120,180,255,0.28)",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em" }}>{t.k.toUpperCase()}</div>
            <div style={{ fontSize: 30, fontWeight: 300, letterSpacing: "-0.02em" }}>{t.v}</div>
          </div>
        );
      })}
    </div>
  );
};
const S3_Ops: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Smart Hospital Operations"
    title="Everything updates live."
    sub="Reception · beds · theatres · billing · inventory — one coordinated view."
    seed={83}
  ><OperationsGrid /></SceneShell>
);

/* S4 — Executive Analytics */
const ExecDash: React.FC = () => {
  const frame = useCurrentFrame();
  const bars = [42, 55, 48, 63, 71, 68, 82, 78, 90, 88, 96, 100];
  return (
    <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard delay={0} width={720} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>EXECUTIVE DASHBOARD · Q4</div>
        <div style={{ fontSize: 24, marginTop: 4, fontWeight: 300 }}>+ 34% patient growth · + 22% efficiency</div>
      </GlassCard>
      {/* bar chart */}
      <div style={{
        padding: 18, borderRadius: 16,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(120,180,255,0.28)",
      }}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em", marginBottom: 10 }}>PATIENT GROWTH (12 MO)</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 160 }}>
          {bars.map((b, i) => {
            const p = interpolate(frame - i * 6, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div key={i} style={{
                flex: 1,
                height: `${b * p}%`,
                background: "linear-gradient(180deg, #22d3ee, #3b82f6)",
                borderRadius: 4,
                boxShadow: "0 0 12px rgba(34,211,238,0.4)",
              }} />
            );
          })}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {[
          { k: "Revenue", v: "+ 28%" },
          { k: "Utilization", v: "84%" },
          { k: "Wait time", v: "-31%" },
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
const S4_Exec: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Executive Analytics"
    title="Decisions driven by intelligence."
    sub="Growth · performance · efficiency — visualized for leadership."
    seed={84}
  ><ExecDash /></SceneShell>
);

/* S5 — Predictive Operations */
const PredictiveChart: React.FC = () => {
  const frame = useCurrentFrame();
  const points = Array.from({ length: 40 }, (_, i) => {
    const base = 40 + Math.sin(i / 4) * 15 + i * 1.2;
    return base;
  });
  const draw = interpolate(frame, [10, 120], [0, points.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const pathHistory = points.slice(0, Math.min(25, Math.floor(draw)))
    .map((y, i) => `${i === 0 ? "M" : "L"} ${i * 18} ${180 - y}`).join(" ");
  const forecastStart = 25;
  const pathForecast = points.slice(forecastStart, Math.floor(draw))
    .map((y, i) => `${i === 0 ? "M" : "L"} ${(forecastStart + i) * 18} ${180 - y}`).join(" ");
  return (
    <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard delay={0} width={720} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>PREDICTIVE OPERATIONS</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>Peak volume expected · Fri 10:00–14:00</div>
      </GlassCard>
      <div style={{
        padding: 18, borderRadius: 16, background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(120,180,255,0.28)",
      }}>
        <svg width={720} height={200} viewBox="0 0 720 200">
          <line x1={forecastStart * 18} y1={0} x2={forecastStart * 18} y2={200} stroke="rgba(120,180,255,0.3)" strokeDasharray="4 6" />
          <text x={forecastStart * 18 + 8} y={16} fontFamily="Inter" fontSize={10} fill="#22d3ee" letterSpacing="0.2em">FORECAST</text>
          <path d={pathHistory} stroke="#93c5fd" strokeWidth={2} fill="none" />
          <path d={pathForecast} stroke="#22d3ee" strokeWidth={2.5} fill="none" strokeDasharray="6 4" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
        </svg>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {["Staffing pre-scheduled", "Beds pre-allocated", "Inventory replenished"].map((s, i) => {
          const p = interpolate(frame - 100 - i * 15, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              padding: "12px 16px", borderRadius: 12,
              background: "rgba(34,211,238,0.10)", border: "1px solid rgba(34,211,238,0.4)",
              color: theme.ink, fontFamily: "'Inter'", fontSize: 14,
              opacity: p, transform: `translateY(${(1 - p) * 10}px)`,
            }}><span style={{ color: theme.cyan, marginRight: 8 }}>✓</span>{s}</div>
          );
        })}
      </div>
    </div>
  );
};
const S5_Predict: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Predictive Operations"
    title="Predict. Prepare. Perform."
    sub="Volume · staffing · demand — anticipated before it happens."
    seed={85}
  ><PredictiveChart /></SceneShell>
);

/* S6 — One Connected Hospital */
const HospitalChain: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = ["Reception", "Doctors", "Nurses", "Laboratory", "Radiology", "Pharmacy", "Administration", "Executives"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 220px)", gap: 12 }}>
      {nodes.map((n, i) => {
        const p = interpolate(frame - i * 12, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={n} style={{
            padding: "18px 20px", borderRadius: 14, textAlign: "center",
            background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(59,130,246,0.16))",
            border: "1px solid rgba(34,211,238,0.55)",
            boxShadow: "0 0 22px rgba(34,211,238,0.28)",
            color: theme.ink, fontFamily: "'Inter'",
            fontSize: 17, fontWeight: 300, letterSpacing: "0.06em",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
          }}>{n}</div>
        );
      })}
    </div>
  );
};
const S6_Connected: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · One Connected Hospital"
    title="Every department. Every level."
    sub="Reception to executive suite — one intelligent operational ecosystem."
    seed={86}
  ><HospitalChain /></SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 300], [1.25, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [300, 440], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const hospitals = [
    { x: 200, y: 300 }, { x: 420, y: 200 }, { x: 640, y: 320 },
    { x: 860, y: 220 }, { x: 1050, y: 340 }, { x: 340, y: 420 },
    { x: 780, y: 420 },
  ];
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})`, opacity: opac }}>
        <svg width={1200} height={540} viewBox="0 0 1200 540">
          {hospitals.map((a, i) =>
            hospitals.slice(i + 1).map((b, j) => {
              const t = ((frame + i * 7 + j * 3) % 100) / 100;
              const px = a.x + (b.x - a.x) * t;
              const py = a.y + (b.y - a.y) * t;
              return (
                <g key={`${i}-${j}`}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(120,180,255,0.14)" />
                  <circle cx={px} cy={py} r={2.5} fill="#22d3ee" opacity={0.75} />
                </g>
              );
            })
          )}
          {hospitals.map((h, i) => (
            <g key={i}>
              <rect x={h.x - 22} y={h.y - 30} width={44} height={60} rx={4}
                fill="rgba(59,130,246,0.22)" stroke="rgba(120,180,255,0.7)" />
              <circle cx={h.x} cy={h.y - 42} r={6} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }} />
            </g>
          ))}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{
        justifyContent: "center", alignItems: "center",
        background: `radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,${outro * 0.85}) 0%, transparent 80%)`,
      }}>
        <div style={{ opacity: outro, textAlign: "center" }}>
          <Kicker delay={300}>Smarter operations · Better healthcare</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={320} size={78}>One intelligent hospital network.</Title>
          <Sub delay={350}>Next · AI Intelligence · Community · The Future.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Chapter 8 — 4240 frames @ 24fps ≈ 3 min */
export const Chapter8: React.FC = () => {
  const T = 24;
  const SCENE = 600;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}><TitleScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Hospital /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Workforce /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Ops /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Exec /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Predict /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Connected /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={400}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
