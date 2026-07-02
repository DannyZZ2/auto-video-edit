import {Sequence} from "remotion";
import {PrecisionHudExampleLayer, PrecisionHudCard} from "./components";

export const PrecisionHudCardsExample = () => (
  <PrecisionHudExampleLayer>
    <Sequence from={18} durationInFrames={120} layout="none">
      <PrecisionHudCard label="QUALITY PASS" title="剪辑和弹窗节奏同步" rows={["转写生成时间轴", "关键词 cue 对齐", "卡片按语义组停留"]} />
    </Sequence>
  </PrecisionHudExampleLayer>
);
