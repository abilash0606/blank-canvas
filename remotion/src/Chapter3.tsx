import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  TransitionSeries,
  linearTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";

import { Backdrop } from "./components/Backdrop";
import { Particles } from "./components/Particles";
import { Kicker, Title, Sub } from "./components/Type";
import { Logo } from "./components/Logo";
import { SceneShell, GlassCard } from "./components/SceneShell";
import { theme } from "./theme";

loadFont("normal", { weights: ["200", "300", "400", "500"], subsets: ["latin"] });

/* ─────────────────────────────────────────────────
   TITLE — "CHAPTER III · PATIENT & FAMILY INTELLIGENCE"
   ───────────────────────────────────────────────── */
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 40, stiffness: 55 } });
  const push = interpolate(frame, [0, 240], [1.0, 1.06]);
  return (
    <AbsoluteFill style={{ background: theme.bgDeep, transform: `scale(${push})` }}>
      <Backdrop intensity={1} />
      <Particles count={80} seed={11} opacity={0.9} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", gap: 32 }}>
        <div style={{ opacity: s, transform: `translateY(${(1 - s) * 20}px)` }}>
          <Logo size={140} glow={1.2} />
        </div>
        
        <Title delay={40} size={92}>
          Patient &amp; Family Intelligence
        </Title>
        <Sub delay={80}>Healthcare begins with the individual.</Sub>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────────────────────────────────────────────
   S1 — THE BEGINNING (mobile app on a worried night)
   ───────────────────────────────────────────────── */
const PhoneMock: React.FC<{ label: string; sub: string; accent?: string }> = ({
  label,
  sub,
  accent = theme.cyan,
}) => {
  const frame = useCurrentFrame();
  const glow = 0.5 + 0.5 * Math.sin(frame / 20);
  return (
    <div
      style={{
        width: 340,
        height: 660,
        borderRadius: 46,
        background: "linear-gradient(160deg, #0b1a33, #050b1a)",
        border: "1px solid rgba(120,180,255,0.35)",
        boxShadow: `0 40px 120px rgba(0,0,0,0.6), 0 0 ${60 * glow}px rgba(34,211,238,0.35)`,
        padding: 18,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      <div
        style={{
          alignSelf: "center",
          width: 100,
          height: 26,
          borderRadius: 20,
          background: "#000",
          marginBottom: 8,
        }}
      />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Logo size={40} glow={0.8} float={false} />
        <div style={{ color: theme.ink, fontFamily: "'Inter'", fontSize: 15, letterSpacing: "0.2em" }}>
          HUNOVA
        </div>
      </div>
      <div style={{ flex: 1, borderRadius: 22, background: "rgba(255,255,255,0.04)", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ color: accent, fontFamily: "'Inter'", fontSize: 12, letterSpacing: "0.28em" }}>{sub}</div>
        <div style={{ color: theme.white, fontFamily: "'Inter'", fontSize: 24, fontWeight: 300, lineHeight: 1.15 }}>
          {label}
        </div>
        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ height: 42, borderRadius: 12, background: "rgba(120,180,255,0.08)", border: "1px solid rgba(120,180,255,0.15)" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

const S1_Beginning: React.FC = () => (
  <SceneShell
    kicker="Scene 01 · The Beginning"
    title="Healthcare begins before the hospital."
    sub="A child's fever. A family's worry. One tap opens a calmer path forward."
    seed={21}
  >
    <PhoneMock sub="EVENING · HOME" label="Emma, 7 — a fever." />
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S2 — INTELLIGENT REGISTRATION (holo health record)
   ───────────────────────────────────────────────── */
const HoloRecord: React.FC = () => {
  const frame = useCurrentFrame();
  const rot = frame * 0.25;
  return (
    <div style={{ position: "relative", width: 560, height: 560, perspective: 1200 }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            inset: 60 + i * 30,
            border: "1px solid rgba(125,211,252,0.35)",
            borderRadius: "50%",
            transform: `rotateX(70deg) rotateZ(${rot + i * 40}deg)`,
            boxShadow: "0 0 40px rgba(34,211,238,0.15) inset",
          }}
        />
      ))}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <GlassCard width={340} padding={22} delay={20}>
          <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>DIGITAL HEALTH ID</div>
          <div style={{ fontSize: 26, fontWeight: 300, color: theme.white, marginTop: 8 }}>Emma Carter</div>
          <div style={{ color: theme.inkDim, fontSize: 15, marginTop: 6 }}>DOB · 12/03/2018 · O+</div>
          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {["Allergies", "Vaccines", "History", "Family"].map((k) => (
              <div key={k} style={{ padding: "8px 10px", borderRadius: 10, background: "rgba(59,130,246,0.10)", border: "1px solid rgba(120,180,255,0.20)", color: theme.ink, fontSize: 13 }}>
                {k}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

const S2_Registration: React.FC = () => (
  <SceneShell
    kicker="Scene 02 · Intelligent Registration"
    title="One secure digital health identity."
    sub="Verified once. Trusted everywhere. Family profiles linked, private, permission-based."
    seed={22}
  >
    <HoloRecord />
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S3 — AI DOCTOR RECOMMENDATION
   ───────────────────────────────────────────────── */
const DoctorRow: React.FC<{ delay: number; name: string; role: string; tags: string; match: number; highlight?: boolean }> = ({
  delay,
  name,
  role,
  tags,
  match,
  highlight,
}) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 18,
        padding: "16px 20px",
        borderRadius: 16,
        background: highlight
          ? "linear-gradient(90deg, rgba(34,211,238,0.18), rgba(59,130,246,0.10))"
          : "rgba(255,255,255,0.04)",
        border: `1px solid ${highlight ? "rgba(34,211,238,0.55)" : "rgba(120,180,255,0.18)"}`,
        opacity: p,
        transform: `translateX(${(1 - p) * 20}px)`,
        boxShadow: highlight ? "0 0 40px rgba(34,211,238,0.25)" : "none",
      }}
    >
      <div style={{ width: 46, height: 46, borderRadius: "50%", background: "linear-gradient(135deg,#1e40af,#22d3ee)" }} />
      <div style={{ flex: 1, color: theme.ink, fontFamily: "'Inter'" }}>
        <div style={{ fontSize: 18, fontWeight: 400 }}>{name}</div>
        <div style={{ fontSize: 13, color: theme.inkDim }}>{role} · {tags}</div>
      </div>
      <div style={{ color: highlight ? theme.cyan : theme.inkDim, fontSize: 20, fontWeight: 300 }}>{match}%</div>
    </div>
  );
};

const S3_Doctor: React.FC = () => (
  <SceneShell
    kicker="Scene 03 · AI Doctor Match"
    title="The right doctor at the right time."
    sub="Symptoms, specialty, availability, language, location — matched in seconds."
    seed={23}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 560 }}>
      <DoctorRow delay={20} name="Dr. Aisha Rahman" role="Pediatrics" tags="EN · AR · today 6:40 PM" match={97} highlight />
      <DoctorRow delay={40} name="Dr. Marcus Lee" role="Family Medicine" tags="EN · today 7:15 PM" match={91} />
      <DoctorRow delay={60} name="Dr. Sofia Alvarez" role="Pediatrics" tags="EN · ES · tomorrow 9:00 AM" match={88} />
      <DoctorRow delay={80} name="Dr. Kenji Tanaka" role="Pediatric Care" tags="EN · JA · tomorrow 11:30" match={82} />
    </div>
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S4 — SMART APPOINTMENT (route + confirmation)
   ───────────────────────────────────────────────── */
const MapRoute: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });
  return (
    <svg width={560} height={420} viewBox="0 0 560 420">
      <defs>
        <linearGradient id="rt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* soft grid streets */}
      {[...Array(8)].map((_, i) => (
        <line key={`h${i}`} x1={0} x2={560} y1={i * 55} y2={i * 55} stroke="rgba(120,180,255,0.10)" />
      ))}
      {[...Array(10)].map((_, i) => (
        <line key={`v${i}`} y1={0} y2={420} x1={i * 60} x2={i * 60} stroke="rgba(120,180,255,0.10)" />
      ))}
      <path
        d="M40 360 Q 180 320 200 240 T 360 180 T 520 60"
        fill="none"
        stroke="url(#rt)"
        strokeWidth={5}
        strokeLinecap="round"
        strokeDasharray={800}
        strokeDashoffset={800 - p * 800}
        style={{ filter: "drop-shadow(0 0 12px rgba(34,211,238,0.6))" }}
      />
      <circle cx={40} cy={360} r={10} fill="#22d3ee" />
      <circle cx={520} cy={60} r={14} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
    </svg>
  );
};

const S4_Appointment: React.FC = () => (
  <SceneShell
    kicker="Scene 04 · Smart Appointment"
    title="Confirmed. Guided. Effortless."
    sub="Navigation. ETA. Parking. Digital check-in — all handled before you arrive."
    seed={24}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
      <MapRoute />
      <GlassCard delay={70} width={520} padding={20}>
        <div style={{ display: "flex", justifyContent: "space-between", color: theme.ink }}>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>ETA</div>
            <div style={{ fontSize: 24, fontWeight: 300 }}>18 min</div>
          </div>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>PARKING</div>
            <div style={{ fontSize: 24, fontWeight: 300 }}>Bay 24 · P2</div>
          </div>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>CHECK-IN</div>
            <div style={{ fontSize: 24, fontWeight: 300 }}>Digital ✓</div>
          </div>
        </div>
      </GlassCard>
    </div>
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S5 — SMART QUEUE (live timeline)
   ───────────────────────────────────────────────── */
const QueueTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const p = interpolate(frame, [0, 200], [0, 1], { extrapolateRight: "clamp" });
  const steps = ["Arrived", "Triage", "Waiting", "Consult", "Follow-up"];
  return (
    <div style={{ width: 620 }}>
      <div style={{ position: "relative", height: 6, borderRadius: 3, background: "rgba(120,180,255,0.15)" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: 6,
            width: `${p * 100}%`,
            borderRadius: 3,
            background: "linear-gradient(90deg,#22d3ee,#3b82f6)",
            boxShadow: "0 0 20px rgba(34,211,238,0.6)",
          }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
        {steps.map((s, i) => {
          const active = p * 4 >= i - 0.2;
          return (
            <div key={s} style={{ textAlign: "center", color: active ? theme.white : theme.inkDim, fontFamily: "'Inter'" }}>
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  margin: "0 auto 10px",
                  background: active ? theme.cyan : "rgba(255,255,255,0.15)",
                  boxShadow: active ? "0 0 16px rgba(34,211,238,0.6)" : "none",
                }}
              />
              <div style={{ fontSize: 14, letterSpacing: "0.14em", textTransform: "uppercase" }}>{s}</div>
            </div>
          );
        })}
      </div>
      <GlassCard delay={40} width={620} padding={20} style={{ marginTop: 34 }}>
        <div style={{ display: "flex", justifyContent: "space-between", color: theme.ink }}>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>QUEUE</div>
            <div style={{ fontSize: 26, fontWeight: 300 }}>#4 of 12</div>
          </div>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>ESTIMATED</div>
            <div style={{ fontSize: 26, fontWeight: 300 }}>~ 12 min</div>
          </div>
          <div>
            <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>STATUS</div>
            <div style={{ fontSize: 26, fontWeight: 300 }}>Optimizing</div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

const S5_Queue: React.FC = () => (
  <SceneShell
    kicker="Scene 05 · Smart Queue"
    title="Waiting becomes predictable."
    sub="No crowded rooms. Live position, live ETA, live optimization."
    seed={25}
  >
    <QueueTimeline />
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S6 — CONNECTED CARE (network flow between depts)
   ───────────────────────────────────────────────── */
const DeptNetwork: React.FC = () => {
  const frame = useCurrentFrame();
  const depts = [
    { x: 90, y: 60, label: "Doctor" },
    { x: 460, y: 40, label: "Lab" },
    { x: 520, y: 220, label: "Radiology" },
    { x: 400, y: 400, label: "Pharmacy" },
    { x: 60, y: 380, label: "Insurance" },
    { x: 30, y: 220, label: "Follow-up" },
  ];
  const center = { x: 280, y: 220 };
  return (
    <svg width={620} height={480} viewBox="0 0 620 480">
      <defs>
        <radialGradient id="hub" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22d3ee" stopOpacity="1" />
          <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {depts.map((d, i) => {
        const t = ((frame + i * 20) % 90) / 90;
        const cx = center.x + (d.x - center.x) * t;
        const cy = center.y + (d.y - center.y) * t;
        return (
          <g key={d.label}>
            <line x1={center.x} y1={center.y} x2={d.x} y2={d.y} stroke="rgba(120,180,255,0.28)" strokeWidth={1.5} />
            <circle cx={cx} cy={cy} r={5} fill="#22d3ee" style={{ filter: "drop-shadow(0 0 8px #22d3ee)" }} />
            <circle cx={d.x} cy={d.y} r={26} fill="rgba(59,130,246,0.18)" stroke="rgba(120,180,255,0.5)" />
            <text
              x={d.x}
              y={d.y + 4}
              fontFamily="Inter"
              fontSize={13}
              fill="#e2f3ff"
              textAnchor="middle"
              style={{ letterSpacing: "0.08em" }}
            >
              {d.label}
            </text>
          </g>
        );
      })}
      <circle cx={center.x} cy={center.y} r={70} fill="url(#hub)" />
      <circle cx={center.x} cy={center.y} r={36} fill="rgba(34,211,238,0.35)" stroke="#22d3ee" strokeWidth={2} />
      <text x={center.x} y={center.y + 5} fontFamily="Inter" fontSize={14} fill="#fff" textAnchor="middle" letterSpacing="0.24em">
        HUNOVA
      </text>
    </svg>
  );
};

const S6_Connected: React.FC = () => (
  <SceneShell
    kicker="Scene 06 · Connected Care"
    title="One consultation. Every department."
    sub="Lab. Radiology. Prescription. Insurance. Follow-up — orchestrated in real time."
    seed={26}
  >
    <DeptNetwork />
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S7 — FAMILY INTELLIGENCE (notifications to family)
   ───────────────────────────────────────────────── */
const NotifCard: React.FC<{ delay: number; who: string; msg: string }> = ({ delay, who, msg }) => {
  const frame = useCurrentFrame();
  const p = interpolate(frame - delay, [0, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <div
      style={{
        opacity: p,
        transform: `translateX(${(1 - p) * 24}px)`,
        padding: "14px 18px",
        borderRadius: 14,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(120,180,255,0.22)",
        color: theme.ink,
        fontFamily: "'Inter'",
        display: "flex",
        gap: 14,
        alignItems: "center",
        width: 480,
      }}
    >
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg,#22d3ee,#3b82f6)" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", color: theme.cyan }}>{who}</div>
        <div style={{ fontSize: 17, marginTop: 3, fontWeight: 300 }}>{msg}</div>
      </div>
    </div>
  );
};

const S7_Family: React.FC = () => (
  <SceneShell
    kicker="Scene 07 · Family Intelligence"
    title="Families stay connected."
    sub="Private. Permission-based. Everyone who cares — kept quietly in the loop."
    seed={27}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <NotifCard delay={20} who="MOM · APPOINTMENT" msg="Consult confirmed — 6:40 PM with Dr. Rahman." />
      <NotifCard delay={45} who="DAD · MEDICATION" msg="Emma's next dose in 2 hours." />
      <NotifCard delay={70} who="GRANDMA · UPDATE" msg="Follow-up scheduled for Friday." />
      <NotifCard delay={95} who="EMERGENCY · READY" msg="Contacts synced. One-tap escalation available." />
    </div>
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   S8 — PREVENTIVE HEALTHCARE (wellness timeline)
   ───────────────────────────────────────────────── */
const WellnessTimeline: React.FC = () => {
  const frame = useCurrentFrame();
  const items = [
    { m: "Today", t: "Recovery check-in", c: theme.cyan },
    { m: "Week 2", t: "Wellness reminder", c: "#7dd3fc" },
    { m: "Month 3", t: "Vaccination update", c: "#5eead4" },
    { m: "Year 1", t: "Preventive screening", c: "#93c5fd" },
  ];
  return (
    <div style={{ width: 620, position: "relative", padding: "20px 0" }}>
      <div
        style={{
          position: "absolute",
          left: 24,
          top: 20,
          bottom: 20,
          width: 2,
          background: "linear-gradient(180deg, rgba(34,211,238,0.7), rgba(59,130,246,0.2))",
        }}
      />
      {items.map((it, i) => {
        const p = interpolate(frame, [20 + i * 22, 40 + i * 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 22,
              padding: "14px 0",
              opacity: p,
              transform: `translateX(${(1 - p) * 22}px)`,
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                marginLeft: 16,
                background: it.c,
                boxShadow: `0 0 16px ${it.c}`,
              }}
            />
            <div style={{ color: theme.ink, fontFamily: "'Inter'" }}>
              <div style={{ color: theme.cyan, fontSize: 12, letterSpacing: "0.28em" }}>{it.m.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 300 }}>{it.t}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const S8_Preventive: React.FC = () => (
  <SceneShell
    kicker="Scene 08 · Preventive Healthcare"
    title="Care doesn't end after treatment."
    sub="Wellness. Vaccination. Screening. Lifelong intelligence, quietly working."
    seed={28}
  >
    <WellnessTimeline />
  </SceneShell>
);

/* ─────────────────────────────────────────────────
   CLOSING — thousands of patients / network expansion
   ───────────────────────────────────────────────── */
const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 240], [1.4, 1.0]);
  const opac = interpolate(frame, [0, 60], [0, 1], { extrapolateRight: "clamp" });
  const outro = interpolate(frame, [280, 380], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // Grid of patients
  const rows = 14;
  const cols = 24;
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
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 46px)`, gap: 14 }}>
          {Array.from({ length: rows * cols }).map((_, i) => {
            const x = i % cols;
            const y = Math.floor(i / cols);
            const t = frame / 24;
            const dist = Math.hypot(x - cols / 2, y - rows / 2);
            const a = 0.3 + 0.6 * Math.sin(t * 0.9 - dist * 0.4);
            return (
              <div
                key={i}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(34,211,238,${Math.max(0.15, a)}), rgba(59,130,246,0.05))`,
                  boxShadow: `0 0 ${10 + a * 20}px rgba(34,211,238,${a * 0.6})`,
                  border: "1px solid rgba(120,180,255,0.25)",
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
          <Kicker delay={280}>Every patient · every family</Kicker>
          <div style={{ height: 22 }} />
          <Title delay={300} size={82}>
            Every patient deserves intelligent care.
          </Title>
          <Sub delay={330}>Next · Doctor Intelligence &amp; AI Clinical Assistant.</Sub>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ─────────────────────────────────────────────────
   CHAPTER 3 COMPOSITION
   ───────────────────────────────────────────────── */
// 24fps. Target ~150s = 3600 frames.
// Title 240 + 8 scenes @ 384 = 3072 + Closing 400 = 3712. 9 transitions × 24 overlap = 216 lost → 3496 ≈ 145.6s
export const Chapter3: React.FC = () => {
  const T = 24;
  const SCENE = 384;
  return (
    <AbsoluteFill style={{ background: theme.bgDeep }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={240}>
          <TitleScene />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S1_Beginning /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S2_Registration /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S3_Doctor /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S4_Appointment /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S5_Queue /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S6_Connected /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S7_Family /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={SCENE}><S8_Preventive /></TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: T })} />
        <TransitionSeries.Sequence durationInFrames={400}><ClosingScene /></TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
