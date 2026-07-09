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
      <Particles count={80} seed={31} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={140} glow={1.2} />
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 24,
            letterSpacing: "0.55em",
            color: theme.cyan,
            opacity: interpolate(frame, [24, 60], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          CHAPTER IV
        </div>
        <Title delay={40} size={92}>
          Doctor Intelligence
        </Title>
        <Sub delay={80}>Empowering every clinical decision.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* S1 — A busy morning: hospital cross-section */
const HospitalPulse: React.FC = () => {
  const frame = useCurrentFrame();
  const rows = 5;
  const cols = 8;
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 60px)`,
        gap: 10,
        padding: 30,
        borderRadius: 22,
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(120,180,255,0.20)",
        boxShadow: "0 30px 90px rgba(0,20,60,0.5)",
      }}
    >
      {Array.from({ length: rows * cols }).map((_, i) => {
        const t = frame / 24;
        const a = 0.2 + 0.7 * Math.sin(t * 1.2 + i * 0.35);
        const hot = a > 0.6;
        return (
          <div
            key={i}
            style={{
              height: 46,
              borderRadius: 8,
              background: hot
                ? "linear-gradient(135deg, rgba(34,211,238,0.55), rgba(59,130,246,0.35))"
                : "rgba(59,130,246,0.10)",
              border: "1px solid rgba(120,180,255,0.25)",
              boxShadow: hot ? "0 0 18px rgba(34,211,238,0.5)" : "none",
            }}
          />
        );
      })}
    </div>
  );
};

const S1_Morning: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · A Busy Morning"
    title="Every decision matters."
    sub="Rounds. Emergencies. Consultations. A day where seconds carry weight."
    seed={31}
  >
    <HospitalPulse />
  </SceneShell>
);

/* S2 — AI Patient Summary: holographic dossier */
const PatientDossier: React.FC = () => {
  const frame = useCurrentFrame();
  const sections = [
    "Medical History",
    "Allergies",
    "Chronic Diseases",
    "Current Medications",
    "Previous Surgeries",
    "Lab Trends",
    "Radiology Reports",
    "Preventive Alerts",
  ];
  return (
    <div style={{ width: 620, display: "flex", flexDirection: "column", gap: 14 }}>
      <GlassCard delay={10} width={620} padding={22}>
        <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>PATIENT · ID 41902</div>
        <div style={{ fontSize: 30, fontWeight: 300, marginTop: 6 }}>Michael Osei · 58</div>
        <div style={{ color: theme.inkDim, fontSize: 15 }}>Hypertension · Type 2 Diabetes · Last visit 12d</div>
      </GlassCard>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {sections.map((s, i) => {
          const p = interpolate(frame, [20 + i * 8, 40 + i * 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={s}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "rgba(120,180,255,0.06)",
                border: "1px solid rgba(120,180,255,0.20)",
                color: theme.ink,
                fontFamily: "'Inter'",
                fontSize: 15,
                opacity: p,
                transform: `translateY(${(1 - p) * 10}px)`,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>{s}</span>
              <span style={{ color: theme.cyan }}>✓</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const S2_Summary: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · AI Patient Summary"
    title="The complete patient story. One intelligent view."
    sub="No searching. No paperwork. Everything the doctor needs — instantly."
    seed={32}
  >
    <PatientDossier />
  </SceneShell>
);

/* S3 — Consultation: doctor + patient silhouettes with data lines */
const ConsultVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.4 + 0.5 * Math.sin(frame / 14);
  return (
    <svg width={620} height={480} viewBox="0 0 620 480">
      {/* left silhouette (doctor) */}
      <g opacity={0.9}>
        <circle cx={140} cy={140} r={44} fill="rgba(59,130,246,0.35)" stroke="#3b82f6" />
        <rect x={90} y={190} width={100} height={200} rx={40} fill="rgba(59,130,246,0.22)" stroke="#3b82f6" />
      </g>
      {/* right silhouette (patient) */}
      <g opacity={0.9}>
        <circle cx={480} cy={140} r={44} fill="rgba(34,211,238,0.35)" stroke="#22d3ee" />
        <rect x={430} y={190} width={100} height={200} rx={40} fill="rgba(34,211,238,0.22)" stroke="#22d3ee" />
      </g>
      {/* data lines */}
      {[0, 1, 2, 3, 4].map((i) => {
        const t = ((frame + i * 18) % 90) / 90;
        const x = 200 + t * 220;
        return (
          <circle
            key={i}
            cx={x}
            cy={230 + Math.sin(t * Math.PI * 2 + i) * 22}
            r={4}
            fill="#22d3ee"
            style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }}
          />
        );
      })}
      <line x1={200} y1={230} x2={420} y2={230} stroke="rgba(125,211,252,0.4)" strokeDasharray="4 6" />
      <line x1={200} y1={280} x2={420} y2={280} stroke="rgba(125,211,252,0.2)" strokeDasharray="4 6" />
      <line x1={200} y1={330} x2={420} y2={330} stroke="rgba(125,211,252,0.15)" strokeDasharray="4 6" />
      {/* floating clinical panel */}
      <g opacity={0.9} transform={`translate(220,60)`}>
        <rect width={180} height={54} rx={10} fill="rgba(255,255,255,0.06)" stroke="rgba(120,180,255,0.35)" />
        <text x={90} y={22} textAnchor="middle" fontFamily="Inter" fontSize={11} fill="#22d3ee" letterSpacing="0.24em">
          AI · LISTENING
        </text>
        <text x={90} y={42} textAnchor="middle" fontFamily="Inter" fontSize={14} fill="#e2f3ff">
          Contextual insights ready
        </text>
      </g>
      <circle cx={310} cy={430} r={40 + pulse * 6} fill="none" stroke="rgba(34,211,238,0.4)" />
    </svg>
  );
};

const S3_Consult: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Consultation"
    title="More listening. Less searching."
    sub="AI stays quiet in the background — surfacing only what matters."
    seed={33}
  >
    <ConsultVisual />
  </SceneShell>
);

/* S4 — AI Clinical Assistant: alerts with approve/reject */
const AlertRow: React.FC<{ delay: number; type: string; msg: string; tone: "warn" | "info" | "danger" }> = ({
  delay,
  type,
  msg,
  tone,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const c = tone === "danger" ? "#f87171" : tone === "warn" ? "#facc15" : theme.cyan;
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * 22}px)`,
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.05)",
        border: `1px solid ${c}55`,
        color: theme.ink,
        fontFamily: "'Inter'",
        width: 620,
      }}
    >
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: c, boxShadow: `0 0 12px ${c}` }} />
      <div style={{ flex: 1 }}>
        <div style={{ color: c, fontSize: 11, letterSpacing: "0.28em" }}>{type}</div>
        <div style={{ fontSize: 17, fontWeight: 300 }}>{msg}</div>
      </div>
      <div style={{ color: theme.cyan, fontSize: 13, letterSpacing: "0.2em" }}>APPROVE</div>
      <div style={{ color: theme.inkDim, fontSize: 13, letterSpacing: "0.2em" }}>REJECT</div>
    </div>
  );
};

const S4_Assistant: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · AI Clinical Assistant"
    title="AI Assists. Doctors Decide."
    sub="Every recommendation is reviewed. Every choice stays with the clinician."
    seed={34}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <AlertRow delay={20} type="DRUG INTERACTION" msg="Metformin ↔ contrast dye — hold 48h before imaging." tone="danger" />
      <AlertRow delay={40} type="ALLERGY WARNING" msg="Documented penicillin reaction on file." tone="danger" />
      <AlertRow delay={60} type="LAB TREND" msg="HbA1c trending upward over 3 quarters." tone="warn" />
      <AlertRow delay={80} type="PREVENTIVE" msg="Retinal screening overdue (annual)." tone="info" />
      <AlertRow delay={100} type="GUIDELINE" msg="ADA 2026 — consider SGLT2 add-on." tone="info" />
    </div>
  </SceneShell>
);

/* S5 — Connected Care: order pipeline */
const OrderPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const orders = ["Lab", "Radiology", "Rx", "Follow-up", "Video Consult"];
  return (
    <div style={{ width: 620 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {orders.map((o, i) => {
          const t = interpolate(frame, [i * 20, i * 20 + 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div key={o} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1 }}>
              <div
                style={{
                  width: 66,
                  height: 66,
                  borderRadius: 18,
                  background: `linear-gradient(135deg, rgba(34,211,238,${0.15 + t * 0.35}), rgba(59,130,246,${0.15 + t * 0.35}))`,
                  border: `1px solid rgba(34,211,238,${0.3 + t * 0.5})`,
                  boxShadow: t > 0.7 ? "0 0 26px rgba(34,211,238,0.55)" : "none",
                  transform: `translateY(${(1 - t) * 12}px)`,
                }}
              />
              <div style={{ color: theme.ink, fontFamily: "'Inter'", fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase", opacity: t }}>
                {o}
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ height: 2, background: "linear-gradient(90deg, rgba(34,211,238,0.6), rgba(59,130,246,0.2))", marginTop: 26, borderRadius: 2 }} />
      <div style={{ marginTop: 30, color: theme.ink, fontFamily: "'Inter'", fontSize: 20, fontWeight: 300, textAlign: "center" }}>
        Orders dispatched · departments notified · patient synced
      </div>
    </div>
  );
};

const S5_Orders: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Connected Care"
    title="From consultation to coordinated care."
    sub="Lab · Radiology · Prescription · Follow-up — dispatched in a single motion."
    seed={35}
  >
    <OrderPipeline />
  </SceneShell>
);

/* S6 — Intelligent Collaboration: web of roles */
const CollabWeb: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    { x: 300, y: 60, label: "Nurse" },
    { x: 540, y: 160, label: "Lab" },
    { x: 540, y: 340, label: "Pharmacy" },
    { x: 300, y: 440, label: "Radiology" },
    { x: 60, y: 340, label: "Specialist" },
    { x: 60, y: 160, label: "Records" },
  ];
  const cx = 300;
  const cy = 250;
  return (
    <svg width={600} height={500} viewBox="0 0 600 500">
      {nodes.map((a, i) =>
        nodes.slice(i + 1).map((b, j) => (
          <line key={`${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(120,180,255,0.10)" />
        ))
      )}
      {nodes.map((n, i) => (
        <line key={`c${i}`} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="rgba(120,180,255,0.35)" />
      ))}
      {nodes.map((n, i) => {
        const t = ((frame + i * 15) % 80) / 80;
        const px = cx + (n.x - cx) * t;
        const py = cy + (n.y - cy) * t;
        return (
          <g key={n.label}>
            <circle cx={px} cy={py} r={5} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
            <circle cx={n.x} cy={n.y} r={30} fill="rgba(59,130,246,0.20)" stroke="rgba(120,180,255,0.6)" />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontFamily="Inter" fontSize={13} fill="#e2f3ff">
              {n.label}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={70} fill="rgba(34,211,238,0.10)" stroke="rgba(34,211,238,0.5)" />
      <circle cx={cx} cy={cy} r={44} fill="rgba(34,211,238,0.30)" stroke="#22d3ee" strokeWidth={2} />
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="Inter" fontSize={13} fill="#fff" letterSpacing="0.24em">
        DOCTOR
      </text>
    </svg>
  );
};

const S6_Collab: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · Intelligent Collaboration"
    title="One team. Zero friction."
    sub="No repeated calls. No duplicate entries. Information flows where it's needed."
    seed={36}
  >
    <CollabWeb />
  </SceneShell>
);

/* S7 — Better Outcomes: split screen comparison */
const CompareSide: React.FC<{ title: string; items: string[]; accent: string; delay: number }> = ({
  title,
  items,
  accent,
  delay,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        flex: 1,
        padding: "26px 28px",
        borderRadius: 20,
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${accent}66`,
        opacity: p,
        transform: `translateY(${(1 - p) * 18}px)`,
        color: theme.ink,
        fontFamily: "'Inter'",
      }}
    >
      <div style={{ color: accent, fontSize: 12, letterSpacing: "0.28em" }}>{title.toUpperCase()}</div>
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map((it) => (
          <div key={it} style={{ fontSize: 18, fontWeight: 300 }}>
            · {it}
          </div>
        ))}
      </div>
    </div>
  );
};

const S7_Outcomes: React.FC = () => (
  <SceneShell
    kicker="Scene 07 · Better Outcomes"
    title="Technology should reduce complexity, not create it."
    sub="What changes when intelligence supports every clinician."
    seed={37}
    align="center"
  >
    <div style={{ display: "flex", gap: 24, width: 1300 }}>
      <CompareSide
        delay={20}
        title="Traditional"
        accent="#94a3b8"
        items={["More paperwork", "Slower diagnosis", "Fragmented data", "Isolated teams", "Reactive care"]}
      />
      <CompareSide
        delay={50}
        title="HuNova Intelligence"
        accent={theme.cyan}
        items={["Ambient documentation", "Faster, safer diagnosis", "Unified patient story", "Connected specialists", "Proactive care"]}
      />
    </div>
  </SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 260], [1.35, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [280, 400], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const rows = 10;
  const cols = 18;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${zoom})`,
          opacity: opac,
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 60px)`, gap: 20 }}>
          {Array.from({ length: rows * cols }).map((_, i) => {
            const x = i % cols;
            const y = Math.floor(i / cols);
            const t = frame / 24;
            const d = Math.hypot(x - cols / 2, y - rows / 2);
            const a = 0.25 + 0.65 * Math.sin(t * 0.8 - d * 0.35);
            return (
              <div
                key={i}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: "linear-gradient(135deg, rgba(59,130,246,0.35), rgba(34,211,238,0.15))",
                  border: "1px solid rgba(120,180,255,0.35)",
                  boxShadow: `0 0 ${8 + a * 22}px rgba(34,211,238,${a * 0.6})`,
                  opacity: Math.max(0.35, a),
                }}
              />
            );
          })}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          background: `radial-gradient(60% 50% at 50% 50%, rgba(0,0,0,${outro * 0.85}) 0%, transparent 80%)`,
        }}
      >
        <div style={{ opacity: outro, textAlign: "center" }}>
          <Kicker delay={280}>One platform · thousands of doctors</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={300} size={78}>
            Millions of better decisions.
          </Title>
          <Sub delay={330}>Next · Smart Queue, Nurse Intelligence &amp; Telemedicine.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* CHAPTER 4 COMPOSITION */
// Title 240 + 7 scenes @ 432 = 3024 + Closing 420 = 3684. 8 transitions × 24 = 192 lost → 3492 ≈ 145.5s
export const Chapter4: React.FC = () => {
  const T = 24;
  const SCENE = 432;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}>
          <TitleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Morning /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Summary /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Consult /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Assistant /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Orders /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Collab /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S7_Outcomes /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={420}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
