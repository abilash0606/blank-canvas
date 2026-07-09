import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
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
      <Particles count={80} seed={51} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={140} glow={1.2} />
        </div>
        
        <Title delay={40} size={92}>
          Smart Care Coordination
        </Title>
        <Sub delay={80}>Every minute matters.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — Smart Queue: reordering timeline */
const SmartQueueVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = [
    { label: "Lab return · Adjoa", src: "LAB", pri: 1 },
    { label: "Radiology return · Kwame", src: "RAD", pri: 2 },
    { label: "Emergency review · Ama", src: "ER", pri: 0 },
    { label: "Same-day follow-up · Yaw", src: "F/U", pri: 3 },
    { label: "Scheduled · Efua", src: "SCH", pri: 4 },
  ];
  // reorder around frame ~120
  const t = interpolate(frame, [90, 150], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const sorted = [...rows].sort((a, b) => a.pri - b.pri);
  return (
    <div style={{ width: 620, display: "flex", flexDirection: "column", gap: 12 }}>
      {rows.map((r, i) => {
        const targetIndex = sorted.indexOf(r);
        const currentIndex = interpolate(t, [0, 1], [i, targetIndex]);
        const y = currentIndex * 62;
        const isTop = targetIndex === 0 && t > 0.6;
        return (
          <div
            key={r.label}
            style={{
              position: "absolute",
              transform: `translateY(${y}px)`,
              width: 620,
              padding: "14px 18px",
              borderRadius: 14,
              background: isTop
                ? "linear-gradient(135deg, rgba(34,211,238,0.28), rgba(59,130,246,0.18))"
                : "rgba(255,255,255,0.05)",
              border: `1px solid ${isTop ? "rgba(34,211,238,0.7)" : "rgba(120,180,255,0.28)"}`,
              boxShadow: isTop ? "0 0 26px rgba(34,211,238,0.5)" : "none",
              color: theme.ink,
              fontFamily: "'Inter'",
              display: "flex",
              alignItems: "center",
              gap: 14,
              transition: "none",
            }}
          >
            <div
              style={{
                width: 46,
                textAlign: "center",
                color: theme.cyan,
                fontSize: 11,
                letterSpacing: "0.24em",
              }}
            >
              {r.src}
            </div>
            <div style={{ flex: 1, fontSize: 17, fontWeight: 300 }}>{r.label}</div>
            {isTop && (
              <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.24em" }}>NEXT</div>
            )}
          </div>
        );
      })}
      <div style={{ height: rows.length * 62 }} />
    </div>
  );
};

const S1_SmartQueue: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · AI Smart Queue"
    title="Every available minute becomes meaningful."
    sub="The doctor finishes early. HuNova recommends the best next patient — instantly."
    seed={51}
  >
    <div style={{ position: "relative", height: 5 * 62 }}>
      <SmartQueueVisual />
    </div>
  </SceneShell>
);

/* S2 — Intelligent patient flow: phone notification + waiting room */
const FlowVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const seats = 20;
  return (
    <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
      {/* phone */}
      <div
        style={{
          width: 220,
          height: 440,
          borderRadius: 32,
          background: "linear-gradient(160deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          border: "1px solid rgba(120,180,255,0.35)",
          padding: 18,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          boxShadow: "0 30px 80px rgba(0,20,60,0.6)",
        }}
      >
        <div style={{ color: theme.cyan, fontSize: 10, letterSpacing: "0.28em" }}>HUNOVA · CARE</div>
        {[
          { t: "New waiting time", v: "18 min" },
          { t: "Your room", v: "Cons. 04" },
          { t: "Doctor", v: "Dr. Mensah" },
          { t: "Directions", v: "Wing B · Floor 2" },
        ].map((n, i) => {
          const p = interpolate(frame - i * 12, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={n.t}
              style={{
                padding: "10px 12px",
                borderRadius: 10,
                background: "rgba(59,130,246,0.15)",
                border: "1px solid rgba(120,180,255,0.3)",
                opacity: p,
                transform: `translateY(${(1 - p) * 8}px)`,
              }}
            >
              <div style={{ color: theme.inkDim, fontSize: 10, letterSpacing: "0.2em" }}>{n.t.toUpperCase()}</div>
              <div style={{ color: theme.ink, fontSize: 15, fontWeight: 400, marginTop: 2 }}>{n.v}</div>
            </div>
          );
        })}
      </div>
      {/* waiting room seats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 44px)", gap: 12 }}>
        {Array.from({ length: seats }).map((_, i) => {
          const filled = i < 12 - Math.floor(interpolate(frame, [30, 200], [0, 8], { extrapolateRight: "clamp" }));
          return (
            <div
              key={i}
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: filled ? "rgba(34,211,238,0.4)" : "rgba(120,180,255,0.08)",
                border: `1px solid ${filled ? "rgba(34,211,238,0.7)" : "rgba(120,180,255,0.2)"}`,
                boxShadow: filled ? "0 0 14px rgba(34,211,238,0.35)" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

const S2_Flow: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Intelligent Patient Flow"
    title="Fewer queues. Better information."
    sub="Notifications. Room numbers. Directions — patients always know what's next."
    seed={52}
  >
    <FlowVisual />
  </SceneShell>
);

/* S3 — Nurse intelligence: shift dashboard */
const NurseDashboard: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { t: "Bed 12 · Ama", tag: "MEDS 09:30", tone: theme.cyan },
    { t: "Bed 14 · Kojo", tag: "VITALS DUE", tone: "#facc15" },
    { t: "Bed 07 · Efua", tag: "POST-OP CHECK", tone: theme.cyan },
    { t: "Bed 09 · Yaw", tag: "PAIN 8/10", tone: "#f87171" },
    { t: "Bed 03 · Adjoa", tag: "DISCHARGE PREP", tone: theme.cyan },
    { t: "Bed 18 · Kwame", tag: "IV CHANGE", tone: theme.cyan },
  ];
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", gap: 10 }}>
      <GlassCard delay={0} width={640} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>NURSE · SHIFT 07:00–15:00</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>6 patients · 14 tasks · 2 alerts</div>
      </GlassCard>
      {items.map((it, i) => {
        const p = interpolate(frame - 20 - i * 10, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={it.t}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${it.tone}55`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: theme.ink,
              fontFamily: "'Inter'",
              opacity: p,
              transform: `translateX(${(1 - p) * 18}px)`,
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 300 }}>{it.t}</span>
            <span style={{ color: it.tone, fontSize: 11, letterSpacing: "0.24em" }}>{it.tag}</span>
          </div>
        );
      })}
    </div>
  );
};

const S3_Nurse: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Nurse Intelligence"
    title="The right information. At the right moment."
    sub="Every patient. Every medication. Every priority — automatically ordered."
    seed={53}
  >
    <NurseDashboard />
  </SceneShell>
);

/* S4 — Connected clinical care: chart updating live */
const LiveChart: React.FC = () => {
  const frame = useCurrentFrame();
  const events = [
    { at: 20, k: "BP", v: "128/82", by: "Nurse · 09:14" },
    { at: 60, k: "Metformin", v: "500 mg given", by: "Nurse · 09:22" },
    { at: 100, k: "SpO₂", v: "98%", by: "Auto · 09:24" },
    { at: 140, k: "Note", v: "Ambulating well", by: "Nurse · 09:30" },
    { at: 180, k: "Recovery", v: "On track", by: "AI · 09:31" },
  ];
  return (
    <div style={{ width: 620, display: "flex", flexDirection: "column", gap: 10 }}>
      <GlassCard delay={0} width={620} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>PATIENT RECORD · LIVE</div>
        <div style={{ fontSize: 22, marginTop: 4, fontWeight: 300 }}>Kojo Boateng · Bed 14</div>
      </GlassCard>
      {events.map((e, i) => {
        const p = interpolate(frame - e.at, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              padding: "10px 16px",
              borderRadius: 12,
              background: "rgba(59,130,246,0.10)",
              border: "1px solid rgba(120,180,255,0.25)",
              opacity: p,
              transform: `translateY(${(1 - p) * 8}px)`,
              color: theme.ink,
              fontFamily: "'Inter'",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ fontSize: 15 }}>
              <span style={{ color: theme.cyan, marginRight: 10 }}>{e.k}</span>
              {e.v}
            </span>
            <span style={{ color: theme.inkDim, fontSize: 12 }}>{e.by}</span>
          </div>
        );
      })}
    </div>
  );
};

const S4_ConnectedCare: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Connected Clinical Care"
    title="One record. Updated by everyone. Instantly."
    sub="Nurses record. Doctors see. Patients benefit — no duplicate documentation."
    seed={54}
  >
    <LiveChart />
  </SceneShell>
);

/* S5 — Telemedicine: video call frame */
const TelemedVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + 0.5 * Math.sin(frame / 12);
  return (
    <div style={{ position: "relative", width: 640, height: 420 }}>
      {/* main video panel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: "linear-gradient(135deg, rgba(34,211,238,0.16), rgba(59,130,246,0.10))",
          border: "1px solid rgba(120,180,255,0.35)",
          boxShadow: "0 30px 80px rgba(0,20,60,0.6)",
          overflow: "hidden",
        }}
      >
        {/* silhouette of patient at home */}
        <svg viewBox="0 0 640 420" width={640} height={420}>
          <circle cx={320} cy={170} r={70} fill="rgba(34,211,238,0.35)" stroke="#22d3ee" />
          <rect x={230} y={240} width={180} height={200} rx={60} fill="rgba(34,211,238,0.22)" stroke="#22d3ee" />
        </svg>
        <div style={{ position: "absolute", top: 16, left: 20, color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>
          PATIENT · HOME
        </div>
        <div style={{ position: "absolute", top: 16, right: 20, display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#22d3ee", opacity: pulse, boxShadow: "0 0 10px #22d3ee" }} />
          <span style={{ color: theme.ink, fontSize: 12, letterSpacing: "0.2em" }}>LIVE</span>
        </div>
      </div>
      {/* PIP doctor */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
          width: 160,
          height: 110,
          borderRadius: 12,
          background: "linear-gradient(135deg, rgba(59,130,246,0.4), rgba(30,64,175,0.4))",
          border: "1px solid rgba(120,180,255,0.5)",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 160 110" width={160} height={110}>
          <circle cx={80} cy={40} r={22} fill="rgba(59,130,246,0.55)" stroke="#3b82f6" />
          <rect x={50} y={65} width={60} height={60} rx={16} fill="rgba(59,130,246,0.35)" stroke="#3b82f6" />
        </svg>
        <div style={{ position: "absolute", top: 6, left: 8, color: theme.ink, fontSize: 10, letterSpacing: "0.2em" }}>DR. MENSAH</div>
      </div>
      {/* side actions */}
      {[
        { at: 90, label: "Digital prescription issued" },
        { at: 140, label: "Follow-up scheduled · 7 days" },
        { at: 190, label: "Family notified" },
      ].map((a, i) => {
        const p = interpolate(frame - a.at, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={a.label}
            style={{
              position: "absolute",
              left: -260,
              top: 40 + i * 70,
              width: 240,
              padding: "10px 14px",
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(34,211,238,0.4)",
              color: theme.ink,
              fontFamily: "'Inter'",
              fontSize: 14,
              opacity: p,
              transform: `translateX(${(1 - p) * -20}px)`,
            }}
          >
            <div style={{ color: theme.cyan, fontSize: 10, letterSpacing: "0.24em", marginBottom: 3 }}>✓ AUTO</div>
            {a.label}
          </div>
        );
      })}
    </div>
  );
};

const S5_Telemed: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Telemedicine"
    title="Care without boundaries."
    sub="Consultations · prescriptions · follow-ups — healthcare that reaches home."
    seed={55}
  >
    <TelemedVisual />
  </SceneShell>
);

/* S6 — Connected experience: workflow chain */
const WorkflowChain: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = ["Patient", "Doctor", "Nurse", "Telemedicine", "Home Recovery"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
      {nodes.map((n, i) => {
        const p = interpolate(frame - i * 18, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <React.Fragment key={n}>
            <div
              style={{
                padding: "16px 34px",
                minWidth: 260,
                textAlign: "center",
                borderRadius: 16,
                background: "linear-gradient(135deg, rgba(34,211,238,0.22), rgba(59,130,246,0.18))",
                border: "1px solid rgba(34,211,238,0.55)",
                boxShadow: "0 0 24px rgba(34,211,238,0.35)",
                color: theme.ink,
                fontFamily: "'Inter'",
                fontSize: 20,
                fontWeight: 300,
                letterSpacing: "0.06em",
                opacity: p,
                transform: `translateY(${(1 - p) * 12}px)`,
              }}
            >
              {n}
            </div>
            {i < nodes.length - 1 && (
              <div
                style={{
                  width: 2,
                  height: 24,
                  background: "linear-gradient(180deg, rgba(34,211,238,0.7), rgba(34,211,238,0.1))",
                  opacity: p,
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const S6_Chain: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · One Connected Experience"
    title="Every hand-off. Synchronized."
    sub="From consultation to home recovery — one platform, one continuous story."
    seed={56}
  >
    <WorkflowChain />
  </SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 260], [1.35, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [260, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const buildings = 7;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})`, opacity: opac }}>
        <svg width={1200} height={520} viewBox="0 0 1200 520">
          {Array.from({ length: buildings }).map((_, i) => {
            const x = 80 + i * 155;
            const h = 200 + (i % 3) * 80;
            const a = 0.35 + 0.55 * Math.sin(frame / 20 + i);
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={520 - h}
                  width={110}
                  height={h}
                  rx={8}
                  fill="rgba(59,130,246,0.15)"
                  stroke="rgba(120,180,255,0.5)"
                />
                <circle cx={x + 55} cy={520 - h - 20} r={8 + a * 4} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 12px #22d3ee)" }} />
              </g>
            );
          })}
          {/* connecting arcs */}
          {Array.from({ length: buildings - 1 }).map((_, i) => {
            const x1 = 80 + i * 155 + 55;
            const x2 = 80 + (i + 1) * 155 + 55;
            const t = ((frame + i * 18) % 100) / 100;
            const mx = x1 + (x2 - x1) * t;
            const my = 60 - Math.sin(t * Math.PI) * 40;
            return (
              <g key={`a${i}`}>
                <path
                  d={`M ${x1} 80 Q ${(x1 + x2) / 2} 20 ${x2} 80`}
                  stroke="rgba(34,211,238,0.45)"
                  strokeWidth={1.5}
                  fill="none"
                />
                <circle cx={mx} cy={my + 20} r={4} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 6px #22d3ee)" }} />
              </g>
            );
          })}
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: `radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,${outro * 0.85}) 0%, transparent 80%)`,
        }}
      >
        <div style={{ opacity: outro, textAlign: "center" }}>
          <Kicker delay={260}>Connected teams · Connected care</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={280} size={78}>
            Better outcomes, together.
          </Title>
          <Sub delay={310}>Next · Diagnostics Intelligence — Lab · Radiology · Pharmacy.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* CHAPTER 5 COMPOSITION — 2 min */
// Title 240 + 6 scenes @ 400 = 2400 + Closing 400 = 3040. 7 transitions × 24 = 168 lost → 2872/24 ≈ 119.6s
export const Chapter5: React.FC = () => {
  const T = 24;
  const SCENE = 400;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}>
          <TitleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_SmartQueue /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Flow /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Nurse /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_ConnectedCare /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Telemed /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Chain /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={400}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
