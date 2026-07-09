import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont } from "@remotion/google-fonts/Inter";

import { Scene1_Beginning } from "./scenes/Scene1_Beginning";
import { Scene2_Ecosystem } from "./scenes/Scene2_Ecosystem";
import { Scene3_Platform } from "./scenes/Scene3_Platform";
import { Scene4_Journey } from "./scenes/Scene4_Journey";
import { Scene5_AI } from "./scenes/Scene5_AI";
import { Scene6_Closing } from "./scenes/Scene6_Closing";

loadFont("normal", { weights: ["200", "300", "400", "500"], subsets: ["latin"] });

// Total ≈ 100s at 24fps = 2400 frames
// Scenes (with 24-frame overlap fades):
// S1 360  S2 432  S3 360  S4 480  S5 432  S6 336
// Sum 2400; 5 transitions * 24 overlap = 120 lost. Effective = 2400 - 120 = 2280 ≈ 95s

export const Chapter2: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#000308" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={360}>
          <Scene1_Beginning />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 24 })}
        />
        <TransitionSeries.Sequence durationInFrames={432}>
          <Scene2_Ecosystem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 24 })}
        />
        <TransitionSeries.Sequence durationInFrames={360}>
          <Scene3_Platform />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 24 })}
        />
        <TransitionSeries.Sequence durationInFrames={480}>
          <Scene4_Journey />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 24 })}
        />
        <TransitionSeries.Sequence durationInFrames={432}>
          <Scene5_AI />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 24 })}
        />
        <TransitionSeries.Sequence durationInFrames={456}>
          <Scene6_Closing />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};