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
  // Heartbeat pulse ring
  const beat = Math.max(0, Math.sin(frame / 8)) ** 3;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={1} />
      <Particles count={90} seed={71} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)`, position: "relative" }}>
          <div style={{
            position: "absolute", inset: -40, borderRadius: "50%",
            border: "2px solid rgba(239,68,68,0.5)",
            transform: `scale(${1 + beat * 0.4})`, opacity: 1 - beat * 0.8,
          }} />
          <Logo size={140} glow={1.2} />
        </div>
        
        <Title delay={40} size={92}>Critical Care Intelligence</Title>
        <Sub delay={80}>When every second counts.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — Emergency Command Center */
const AmbulanceStrip: React.FC = () => {
  const frame = useCurrentFrame();
  const x = interpolate(frame % 120, [0, 120], [-200, 1200]);
  return (
    <svg width={720} height={140} viewBox="0 0 720 140">
      <line x1={0} y1={100} x2={720} y2={100} stroke="rgba(120,180,255,0.3)" strokeDasharray="10 12" />
      <g transform={`translate(${x} 40)`}>
        <rect x={0} y={0} width={110} height={60} rx={6} fill="rgba(239,68,68,0.35)" stroke="#ef4444" />
        <rect x={80} y={-10} width={30} height={20} rx={3} fill="#ef4444" opacity={0.5 + 0.5 * Math.sin(frame / 3)} />
        <circle cx={22} cy={70} r={10} fill="#0a0f1e" stroke="#22d3ee" />
        <circle cx={90} cy={70} r={10} fill="#0a0f1e" stroke="#22d3ee" />
      </g>
    </svg>
  );
};

const S1_ER: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { at: 40, k: "Patient identity", v: "Verified" },
    { at: 65, k: "Medical history", v: "Loaded" },
    { at: 90, k: "Allergies", v: "Penicillin" },
    { at: 115, k: "Current medications", v: "2 active" },
    { at: 140, k: "Chronic diseases", v: "Hypertension" },
    { at: 165, k: "Previous reports", v: "Attached" },
  ];
  return (
    <SceneShell
      kicker="Scene 01 · Emergency Command Center"
      title="Prepared before arrival."
      sub="The moment the ambulance departs, the hospital already knows the patient."
      seed={71}
    >
      <div style={{ width: 720, display: "flex", flexDirection: "column", gap: 10 }}>
        <AmbulanceStrip />
        {items.map((it, i) => {
          const p = interpolate(frame - it.at, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={i} style={{
              padding: "10px 16px", borderRadius: 12,
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.35)",
              display: "flex", justifyContent: "space-between",
              color: theme.ink, fontFamily: "'Inter'",
              opacity: p, transform: `translateX(${(1 - p) * 18}px)`,
            }}>
              <span style={{ fontSize: 15 }}><span style={{ color: theme.cyan, marginRight: 10 }}>✓</span>{it.k}</span>
              <span style={{ color: theme.inkDim, fontSize: 13 }}>{it.v}</span>
            </div>
          );
        })}
      </div>
    </SceneShell>
  );
};

/* S2 — Surgery Intelligence */
const SurgeryGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const items = ["Surgeon", "Assistant", "Anaesthetist", "Nursing team", "Operation theatre", "Medical equipment", "Recovery bed", "Blood units"];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 300px)", gap: 14 }}>
      {items.map((n, i) => {
        const p = interpolate(frame - i * 14, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={n} style={{
            padding: "16px 20px", borderRadius: 14,
            background: "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(59,130,246,0.14))",
            border: "1px solid rgba(34,211,238,0.55)",
            boxShadow: p > 0.9 ? "0 0 22px rgba(34,211,238,0.35)" : "none",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            <span style={{ fontSize: 17, fontWeight: 300 }}>{n}</span>
            <span style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em" }}>READY</span>
          </div>
        );
      })}
    </div>
  );
};
const S2_Surgery: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Surgery Intelligence"
    title="Every resource. Perfectly coordinated."
    sub="Team · theatre · equipment — verified and standing by before the patient arrives."
    seed={72}
  ><SurgeryGrid /></SceneShell>
);

/* S3 — Blood Intelligence Network */
const BloodNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const hospital = { x: 400, y: 240 };
  const donors = [
    { x: 120, y: 120 }, { x: 660, y: 100 }, { x: 720, y: 340 },
    { x: 200, y: 380 }, { x: 500, y: 90 }, { x: 100, y: 300 },
  ];
  const acceptedIndex = 1;
  return (
    <svg width={820} height={480} viewBox="0 0 820 480">
      {/* pulse rings */}
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 90) / 90;
        return (
          <circle key={i} cx={hospital.x} cy={hospital.y} r={30 + t * 200}
            fill="none" stroke="rgba(239,68,68,0.4)" strokeWidth={2} opacity={1 - t} />
        );
      })}
      {donors.map((d, i) => {
        const accepted = i === acceptedIndex && frame > 90;
        const t = ((frame + i * 15) % 120) / 120;
        const dx = hospital.x + (d.x - hospital.x) * t;
        const dy = hospital.y + (d.y - hospital.y) * t;
        return (
          <g key={i}>
            <line x1={hospital.x} y1={hospital.y} x2={d.x} y2={d.y}
              stroke={accepted ? "#22d3ee" : "rgba(120,180,255,0.25)"} strokeWidth={accepted ? 2 : 1} />
            {accepted && <circle cx={dx} cy={dy} r={5} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />}
            <circle cx={d.x} cy={d.y} r={22}
              fill={accepted ? "rgba(34,211,238,0.35)" : "rgba(59,130,246,0.18)"}
              stroke={accepted ? "#22d3ee" : "rgba(120,180,255,0.6)"} />
            <text x={d.x} y={d.y + 4} textAnchor="middle" fontFamily="Inter" fontSize={10} fill="#e2f3ff">O-</text>
            {accepted && <text x={d.x} y={d.y - 30} textAnchor="middle" fontFamily="Inter" fontSize={11} fill="#22d3ee" letterSpacing="0.2em">ACCEPTED</text>}
          </g>
        );
      })}
      <g>
        <circle cx={hospital.x} cy={hospital.y} r={42} fill="rgba(239,68,68,0.25)" stroke="#ef4444" strokeWidth={2} />
        <text x={hospital.x} y={hospital.y + 4} textAnchor="middle" fontFamily="Inter" fontSize={11} fill="#e2f3ff" letterSpacing="0.18em">HOSPITAL</text>
      </g>
    </svg>
  );
};
const S3_Blood: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Blood Intelligence Network"
    title="Connecting lives. Saving lives."
    sub="Verified opt-in donors, notified securely — privacy protected end-to-end."
    seed={73}
  ><BloodNetwork /></SceneShell>
);

/* S4 — Insurance Intelligence */
const InsuranceFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const steps = [
    { at: 20, label: "Coverage verified", v: "Policy #IN-8842" },
    { at: 55, label: "Documents prepared", v: "Auto-attached" },
    { at: 90, label: "Preauthorization sent", v: "To insurer" },
    { at: 130, label: "Approval received", v: "12 min" },
    { at: 170, label: "Hospital · patient · insurer synced", v: "Live" },
  ];
  return (
    <div style={{ width: 660, display: "flex", flexDirection: "column", gap: 12 }}>
      <GlassCard delay={0} width={660} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>CLAIM WORKFLOW · REAL-TIME</div>
        <div style={{ fontSize: 20, marginTop: 4, fontWeight: 300 }}>Kwame Owusu · Emergency admission</div>
      </GlassCard>
      {steps.map((s, i) => {
        const p = interpolate(frame - s.at, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div key={i} style={{
            padding: "12px 18px", borderRadius: 12,
            background: "rgba(59,130,246,0.10)",
            border: "1px solid rgba(120,180,255,0.35)",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 8}px)`,
          }}>
            <span style={{ fontSize: 15 }}><span style={{ color: theme.cyan, marginRight: 10 }}>✓</span>{s.label}</span>
            <span style={{ color: theme.inkDim, fontSize: 13 }}>{s.v}</span>
          </div>
        );
      })}
    </div>
  );
};
const S4_Insurance: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Insurance Intelligence"
    title="Healthcare first. Paperwork simplified."
    sub="Verification, authorization and updates — running in parallel with care."
    seed={74}
  ><InsuranceFlow /></SceneShell>
);

/* S5 — Care Companion Network */
const CompanionVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const cards = [
    { name: "Grace A.", role: "Verified · 4.9 ★", note: "Post-op recovery specialist" },
    { name: "Emmanuel K.", role: "Verified · 4.8 ★", note: "Chronic care companion" },
    { name: "Sarah M.", role: "Verified · 5.0 ★", note: "Elderly care · 6 yrs" },
  ];
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", gap: 12 }}>
      {cards.map((c, i) => {
        const p = interpolate(frame - i * 30, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        const selected = i === 0 && frame > 120;
        return (
          <div key={i} style={{
            padding: "16px 20px", borderRadius: 16,
            background: selected
              ? "linear-gradient(135deg, rgba(34,211,238,0.24), rgba(59,130,246,0.18))"
              : "rgba(255,255,255,0.04)",
            border: `1px solid ${selected ? "rgba(34,211,238,0.7)" : "rgba(120,180,255,0.28)"}`,
            boxShadow: selected ? "0 0 22px rgba(34,211,238,0.4)" : "none",
            display: "flex", alignItems: "center", gap: 16,
            color: theme.ink, fontFamily: "'Inter'",
            opacity: p, transform: `translateY(${(1 - p) * 14}px)`,
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #22d3ee)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 500, color: "#001220",
            }}>{c.name[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 300 }}>{c.name}</div>
              <div style={{ color: theme.inkDim, fontSize: 13 }}>{c.note}</div>
            </div>
            <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.22em" }}>
              {selected ? "ASSIGNED" : c.role}
            </div>
          </div>
        );
      })}
    </div>
  );
};
const S5_Companion: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Care Companion Network"
    title="Because recovery needs human care."
    sub="Verified companions — matched to the patient, confirmed by the hospital."
    seed={75}
  ><CompanionVisual /></SceneShell>
);

/* S6 — One Connected Response */
const ResponseChain: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = ["Emergency", "Surgery", "Blood", "Insurance", "Care Companion", "Recovery"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18 }}>
      {nodes.map((n, i) => {
        const p = interpolate(frame - i * 18, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <React.Fragment key={n}>
            <div style={{
              padding: "16px 34px", minWidth: 300, textAlign: "center",
              borderRadius: 16,
              background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(59,130,246,0.18))",
              border: "1px solid rgba(34,211,238,0.55)",
              boxShadow: "0 0 22px rgba(34,211,238,0.3)",
              color: theme.ink, fontFamily: "'Inter'",
              fontSize: 20, fontWeight: 300, letterSpacing: "0.08em",
              opacity: p, transform: `translateY(${(1 - p) * 12}px)`,
            }}>{n}</div>
            {i < nodes.length - 1 && (
              <div style={{ width: 2, height: 20, background: "linear-gradient(180deg, rgba(34,211,238,0.7), rgba(34,211,238,0.1))", opacity: p }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
const S6_Chain: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · One Connected Response"
    title="One platform. Every critical moment."
    sub="AI coordinates. Doctors, nurses and specialists remain in control."
    seed={76}
  ><ResponseChain /></SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 300], [1.25, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [300, 440], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})`, opacity: opac }}>
        <svg width={1200} height={520} viewBox="0 0 1200 520">
          {/* central hospital */}
          <circle cx={600} cy={260} r={54} fill="rgba(34,211,238,0.28)" stroke="#22d3ee" strokeWidth={2} />
          <text x={600} y={264} textAnchor="middle" fontFamily="Inter" fontSize={12} fill="#e2f3ff" letterSpacing="0.2em">HOSPITAL</text>
          {/* orbiting emergencies */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2 + frame / 80;
            const rx = 380 + Math.sin(frame / 30 + i) * 20;
            const ry = 180 + Math.cos(frame / 30 + i) * 20;
            const x = 600 + Math.cos(angle) * rx;
            const y = 260 + Math.sin(angle) * ry;
            const a = 0.5 + 0.5 * Math.sin(frame / 12 + i);
            return (
              <g key={i}>
                <line x1={600} y1={260} x2={x} y2={y} stroke="rgba(120,180,255,0.15)" />
                <circle cx={x} cy={y} r={8} fill="rgba(239,68,68,0.5)" stroke="#ef4444" opacity={a} />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill style={{
        justifyContent: "center", alignItems: "center",
        background: `radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,${outro * 0.85}) 0%, transparent 80%)`,
      }}>
        <div style={{ opacity: outro, textAlign: "center" }}>
          <Kicker delay={300}>An intelligent healthcare network</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={320} size={78}>Every critical moment. Connected.</Title>
          <Sub delay={350}>Next · Hospital Operations · Workforce · Executive Analytics.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Chapter 7 — 4240 frames @ 24fps ≈ 3 min */
export const Chapter7: React.FC = () => {
  const T = 24;
  const SCENE = 600;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}><TitleScene /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_ER /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Surgery /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Blood /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Insurance /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Companion /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Chain /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={400}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
