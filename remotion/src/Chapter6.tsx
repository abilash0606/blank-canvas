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
      <Particles count={80} seed={61} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={140} glow={1.2} />
        </div>
        
        <Title delay={40} size={92}>
          Diagnostics Intelligence
        </Title>
        <Sub delay={80}>From diagnosis to recovery.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* Reusable pipeline card row */
const PipeStep: React.FC<{ delay: number; label: string; note?: string; done?: boolean }> = ({
  delay,
  label,
  note,
  done,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "12px 18px",
        borderRadius: 12,
        background: done ? "linear-gradient(135deg, rgba(34,211,238,0.20), rgba(59,130,246,0.14))" : "rgba(255,255,255,0.04)",
        border: `1px solid ${done ? "rgba(34,211,238,0.6)" : "rgba(120,180,255,0.25)"}`,
        color: theme.ink,
        fontFamily: "'Inter'",
        width: 620,
        opacity: p,
        transform: `translateX(${(1 - p) * 20}px)`,
        boxShadow: done ? "0 0 18px rgba(34,211,238,0.35)" : "none",
      }}
    >
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: done ? "#22d3ee" : "rgba(120,180,255,0.2)",
          color: done ? "#001220" : theme.cyan,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: done ? "0 0 12px #22d3ee" : "none",
        }}
      >
        ✓
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 16, fontWeight: 300 }}>{label}</div>
        {note && <div style={{ color: theme.inkDim, fontSize: 12 }}>{note}</div>}
      </div>
    </div>
  );
};

/* S1 — Laboratory intelligence */
const S1_Lab: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · Laboratory Intelligence"
    title="Fast results. Connected care."
    sub="Order · book · sample · verify · report — every step tracked automatically."
    seed={61}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <PipeStep delay={10} label="Order created" note="Dr. Mensah · CBC, Lipid Panel, HbA1c" done />
      <PipeStep delay={30} label="Patient booked slot" note="Tomorrow · 08:30 · Lab wing" done />
      <PipeStep delay={55} label="Barcode generated" note="LAB-2026-08812 · auto-linked" done />
      <PipeStep delay={80} label="Sample collected" note="Phlebotomist · 08:34" done />
      <PipeStep delay={110} label="Analysis complete" note="Technician verified · 09:41" done />
      <PipeStep delay={140} label="Report delivered" note="Doctor + patient notified · secure" done />
    </div>
  </SceneShell>
);

/* S2 — Radiology intelligence */
const RadVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const scan = interpolate(frame % 90, [0, 90], [0, 1]);
  const findings = [
    { at: 60, x: 210, y: 150, r: 14, label: "Nodule" },
    { at: 110, x: 320, y: 220, r: 10, label: "Density" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, alignItems: "center" }}>
      {/* scan panel */}
      <div
        style={{
          width: 460,
          height: 320,
          borderRadius: 16,
          background: "radial-gradient(circle at center, rgba(34,211,238,0.18), rgba(0,4,10,0.9))",
          border: "1px solid rgba(120,180,255,0.4)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <svg viewBox="0 0 460 320" width={460} height={320}>
          {/* faux ribcage */}
          <ellipse cx={230} cy={175} rx={170} ry={120} fill="none" stroke="rgba(120,180,255,0.35)" strokeWidth={1.5} />
          <path d="M100 100 Q230 60 360 100" stroke="rgba(120,180,255,0.35)" fill="none" />
          <path d="M100 250 Q230 290 360 250" stroke="rgba(120,180,255,0.35)" fill="none" />
          {[80, 130, 180, 230, 280].map((y) => (
            <path key={y} d={`M110 ${y} Q230 ${y - 12} 350 ${y}`} stroke="rgba(120,180,255,0.22)" fill="none" />
          ))}
          {/* scan line */}
          <line
            x1={0}
            x2={460}
            y1={scan * 320}
            y2={scan * 320}
            stroke="rgba(34,211,238,0.8)"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 10px #22d3ee)" }}
          />
          {findings.map((f, i) => {
            const p = interpolate(frame - f.at, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <g key={i} opacity={p}>
                <circle cx={f.x} cy={f.y} r={f.r} fill="none" stroke="#facc15" strokeWidth={2} />
                <line x1={f.x + f.r} y1={f.y} x2={f.x + 90} y2={f.y - 30} stroke="#facc15" />
                <text x={f.x + 95} y={f.y - 26} fontFamily="Inter" fontSize={12} fill="#facc15">
                  {f.label}
                </text>
              </g>
            );
          })}
        </svg>
        <div style={{ position: "absolute", top: 10, left: 12, color: theme.cyan, fontSize: 10, letterSpacing: "0.28em" }}>
          CT · CHEST · AI HIGHLIGHTS
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {["Booked", "Scanned", "AI reviewed", "Report signed", "Doctor notified"].map((s, i) => {
          const p = interpolate(frame - 30 - i * 20, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={s}
              style={{
                padding: "8px 14px",
                borderRadius: 20,
                border: "1px solid rgba(34,211,238,0.5)",
                background: "rgba(34,211,238,0.10)",
                color: theme.ink,
                fontFamily: "'Inter'",
                fontSize: 12,
                letterSpacing: "0.12em",
                opacity: p,
              }}
            >
              {s}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const S2_Rad: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Radiology Intelligence"
    title="Every image. Every insight."
    sub="MRI · CT · Ultrasound · X-Ray — AI surfaces findings, radiologists confirm."
    seed={62}
  >
    <RadVisual />
  </SceneShell>
);

/* S3 — Pharmacy intelligence */
const PharmaVisual: React.FC = () => {
  const frame = useCurrentFrame();
  const checks = [
    { at: 30, label: "Drug allergies", val: "None" },
    { at: 55, label: "Drug interactions", val: "0 conflicts" },
    { at: 80, label: "Duplicate therapy", val: "Clear" },
    { at: 105, label: "Dose safety", val: "Within range" },
    { at: 130, label: "Availability", val: "In stock" },
  ];
  return (
    <div style={{ width: 640, display: "flex", flexDirection: "column", gap: 10 }}>
      <GlassCard delay={0} width={640} padding={18}>
        <div style={{ color: theme.cyan, fontSize: 11, letterSpacing: "0.28em" }}>DIGITAL PRESCRIPTION · SIGNED</div>
        <div style={{ fontSize: 20, marginTop: 4, fontWeight: 300 }}>Michael Osei · Metformin 500 mg · Amlodipine 5 mg</div>
      </GlassCard>
      {checks.map((c, i) => {
        const p = interpolate(frame - c.at, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={c.label}
            style={{
              padding: "12px 18px",
              borderRadius: 12,
              background: "rgba(34,211,238,0.08)",
              border: "1px solid rgba(34,211,238,0.35)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: theme.ink,
              fontFamily: "'Inter'",
              opacity: p,
              transform: `translateY(${(1 - p) * 8}px)`,
            }}
          >
            <span style={{ fontSize: 15 }}>
              <span style={{ color: theme.cyan, marginRight: 10 }}>✓</span>
              {c.label}
            </span>
            <span style={{ color: theme.inkDim, fontSize: 13 }}>{c.val}</span>
          </div>
        );
      })}
      {/* fallback network */}
      <div
        style={{
          marginTop: 8,
          padding: "12px 16px",
          borderRadius: 12,
          background: "rgba(59,130,246,0.10)",
          border: "1px dashed rgba(120,180,255,0.4)",
          color: theme.ink,
          fontFamily: "'Inter'",
          fontSize: 13,
          opacity: interpolate(frame - 180, [0, 24], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }}
      >
        <span style={{ color: theme.cyan, letterSpacing: "0.24em", fontSize: 10 }}>NEARBY PARTNER PHARMACIES</span>
        <div style={{ marginTop: 4, color: theme.inkDim }}>
          Recommended by availability · distance · price — if hospital stock is low.
        </div>
      </div>
    </div>
  );
};

const S3_Pharm: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · Pharmacy Intelligence"
    title="Safe medication. Intelligent dispensing."
    sub="Every prescription checked, every dose verified, every patient notified."
    seed={63}
  >
    <PharmaVisual />
  </SceneShell>
);

/* S4 — Intelligent diagnostics network */
const NetworkGraph: React.FC = () => {
  const frame = useCurrentFrame();
  const nodes = [
    { x: 400, y: 60, label: "Doctor" },
    { x: 150, y: 200, label: "Laboratory" },
    { x: 400, y: 250, label: "Radiology" },
    { x: 650, y: 200, label: "Pharmacy" },
    { x: 400, y: 440, label: "Patient" },
  ];
  const edges: Array<[number, number]> = [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 4],
    [2, 4],
    [3, 4],
    [1, 2],
    [2, 3],
  ];
  return (
    <svg width={800} height={500} viewBox="0 0 800 500">
      {edges.map(([a, b], i) => {
        const na = nodes[a];
        const nb = nodes[b];
        const t = ((frame + i * 12) % 90) / 90;
        const px = na.x + (nb.x - na.x) * t;
        const py = na.y + (nb.y - na.y) * t;
        return (
          <g key={i}>
            <line x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="rgba(120,180,255,0.35)" />
            <circle cx={px} cy={py} r={4} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
          </g>
        );
      })}
      {nodes.map((n, i) => {
        const isPatient = n.label === "Patient";
        const isDoctor = n.label === "Doctor";
        const r = isPatient || isDoctor ? 44 : 38;
        return (
          <g key={n.label}>
            <circle
              cx={n.x}
              cy={n.y}
              r={r}
              fill={isDoctor ? "rgba(34,211,238,0.28)" : "rgba(59,130,246,0.20)"}
              stroke={isDoctor ? "#22d3ee" : "rgba(120,180,255,0.7)"}
              strokeWidth={isDoctor ? 2 : 1}
            />
            <text
              x={n.x}
              y={n.y + 5}
              textAnchor="middle"
              fontFamily="Inter"
              fontSize={13}
              fill="#e2f3ff"
              letterSpacing="0.14em"
            >
              {n.label.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const S4_Network: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Intelligent Diagnostics Network"
    title="Every department. One intelligence."
    sub="No paper. No duplicate entries. No repeated appointments."
    seed={64}
  >
    <NetworkGraph />
  </SceneShell>
);

/* S5 — Comparison */
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

const S5_Compare: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · A Better Experience"
    title="Diagnostics that finally work together."
    sub="What changes when Lab, Radiology and Pharmacy share one intelligence."
    seed={65}
    align="center"
  >
    <div style={{ display: "flex", gap: 24, width: 1300 }}>
      <CompareSide
        delay={20}
        title="Traditional"
        accent="#94a3b8"
        items={["Paper reports", "Repeat visits", "Manual dispensing", "Isolated departments", "Slow turnaround"]}
      />
      <CompareSide
        delay={50}
        title="HuNova Intelligence"
        accent={theme.cyan}
        items={["Digital reports", "One visit, many services", "Verified dispensing", "Connected departments", "Instant results"]}
      />
    </div>
  </SceneShell>
);

/* CLOSING */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 320], [1.35, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [320, 460], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const nodes = [
    { x: 200, y: 200, label: "LAB" },
    { x: 500, y: 130, label: "RAD" },
    { x: 820, y: 220, label: "RX" },
    { x: 350, y: 380, label: "HOSPITAL" },
    { x: 700, y: 400, label: "CLINIC" },
    { x: 1000, y: 340, label: "PHARMACY" },
    { x: 100, y: 380, label: "PATIENT" },
    { x: 1100, y: 150, label: "DOCTOR" },
  ];
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <Backdrop intensity={1} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", transform: `scale(${zoom})`, opacity: opac }}>
        <svg width={1300} height={560} viewBox="0 0 1300 560">
          {nodes.map((a, i) =>
            nodes.slice(i + 1).map((b, j) => {
              const t = ((frame + (i * 7 + j * 3)) % 100) / 100;
              const px = a.x + (b.x - a.x) * t;
              const py = a.y + (b.y - a.y) * t;
              return (
                <g key={`${i}-${j}`}>
                  <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(120,180,255,0.12)" />
                  <circle cx={px} cy={py} r={2.5} fill="#22d3ee" opacity={0.7} />
                </g>
              );
            })
          )}
          {nodes.map((n) => (
            <g key={n.label}>
              <circle cx={n.x} cy={n.y} r={34} fill="rgba(59,130,246,0.20)" stroke="rgba(120,180,255,0.7)" />
              <text
                x={n.x}
                y={n.y + 4}
                textAnchor="middle"
                fontFamily="Inter"
                fontSize={11}
                fill="#e2f3ff"
                letterSpacing="0.2em"
              >
                {n.label}
              </text>
            </g>
          ))}
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
          <Kicker delay={320}>One connected healthcare ecosystem</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={340} size={78}>
            Intelligence, quietly orchestrating care.
          </Title>
          <Sub delay={370}>Next · Emergency · Insurance · Companion · Blood Network.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* CHAPTER 6 COMPOSITION — 3 min */
// Title 240 + 5 scenes @ 620 = 3100 + Closing 500 = 3840. 6 transitions × 24 = 144 lost → 3696/24 ≈ 154s ~2:34.
// Bump scenes to 700 each: Title 240 + 5*700 + 500 = 4240. − 144 = 4096/24 ≈ 170s ~2:50.
export const Chapter6: React.FC = () => {
  const T = 24;
  const SCENE = 700;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}>
          <TitleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Lab /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Rad /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Pharm /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Network /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Compare /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={500}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
