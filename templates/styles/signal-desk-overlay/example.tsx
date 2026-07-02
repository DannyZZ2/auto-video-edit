import {AbsoluteFill, Sequence} from "remotion";
import {KeyPointPopup, ProcessPopup, SkillDropPopup, VideoBackdrop} from "./components";

export const SignalDeskOverlayExample = () => (
  <AbsoluteFill style={{background: "#F5F2EA"}}>
    <VideoBackdrop title="SIGNAL DESK / OVERLAY TEST" />
    <Sequence from={18} durationInFrames={96} layout="none">
      <KeyPointPopup
        label="AI GENERATED"
        title="口播剪辑和上方动画全部由 AI 自动生成"
        body="关键内容只在口播讲到对应信息时出现。"
        position="top-right"
      />
    </Sequence>
    <Sequence from={128} durationInFrames={128} layout="none">
      <ProcessPopup
        label="ITERATION"
        title="从复刻片段到完整方案"
        steps={[
          {index: "01", title: "复刻片段", detail: "单点模仿不够稳定。"},
          {index: "02", title: "调整几天", detail: "拆出口播、剪辑和弹窗节奏。"},
          {index: "03", title: "方案成型", detail: "下一条视频可复用。"},
        ]}
        position="center-right"
      />
    </Sequence>
    <Sequence from={322} durationInFrames={108} layout="none">
      <SkillDropPopup title="整套方案已整理成 skill" body="放在评论区，下一条视频可以直接调用。" position="bottom-right" />
    </Sequence>
  </AbsoluteFill>
);
