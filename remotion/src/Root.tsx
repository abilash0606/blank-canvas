import { Composition } from "remotion";
import { Chapter2 } from "./Chapter2";
import { Chapter3 } from "./Chapter3";
import { Chapter4 } from "./Chapter4";
import { Chapter5 } from "./Chapter5";
import { Chapter6 } from "./Chapter6";
import { Chapter7 } from "./Chapter7";
import { Chapter8 } from "./Chapter8";
import { Chapter9 } from "./Chapter9";
import { Chapter10 } from "./Chapter10";

// 24fps throughout for continuity with Chapter 1 & 2.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="chapter2" component={Chapter2} durationInFrames={2400} fps={24} width={1920} height={1080} />
    <Composition id="chapter3" component={Chapter3} durationInFrames={3712} fps={24} width={1920} height={1080} />
    <Composition id="chapter4" component={Chapter4} durationInFrames={3684} fps={24} width={1920} height={1080} />
    <Composition id="chapter5" component={Chapter5} durationInFrames={3040} fps={24} width={1920} height={1080} />
    <Composition id="chapter6" component={Chapter6} durationInFrames={4240} fps={24} width={1920} height={1080} />
    <Composition id="chapter7" component={Chapter7} durationInFrames={4240} fps={24} width={1920} height={1080} />
    <Composition id="chapter8" component={Chapter8} durationInFrames={4240} fps={24} width={1920} height={1080} />
    <Composition id="chapter9" component={Chapter9} durationInFrames={3640} fps={24} width={1920} height={1080} />
    <Composition id="chapter10" component={Chapter10} durationInFrames={4540} fps={24} width={1920} height={1080} />
  </>
);
