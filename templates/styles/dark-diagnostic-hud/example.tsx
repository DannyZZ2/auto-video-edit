import {AbsoluteFill, Sequence} from "remotion";
import {DiagnosticPanel, ScoreCard, StatusChip} from "./components";
import {darkDiagnosticHudTheme as theme} from "./theme";

export const DarkDiagnosticHudExample = () => (
  <AbsoluteFill style={{background: theme.colors.bg}}>
    <div style={{position: "absolute", inset: 0, background: "radial-gradient(circle at 68% 20%, rgba(24,169,153,0.20), transparent 38%), radial-gradient(circle at 20% 78%, rgba(91,108,255,0.18), transparent 34%)"}} />
    <Sequence from={18} durationInFrames={104} layout="none">
      <DiagnosticPanel label="AI_GENERATED" status="AUTO" title="口播剪辑 + 上方动画" body="全部由 AI 自动生成，当前 HUD 用于标记观众必须听到的重点。" />
    </Sequence>
    <Sequence from={140} durationInFrames={96} layout="none">
      <ScoreCard label="OUTPUT" value="1 SET" detail="剪辑、口播、动画 overlay、复用流程" />
    </Sequence>
    <div style={{position: "absolute", left: 88, top: 72, display: "flex", gap: 10}}>
      <StatusChip text="TRANSCRIBE" />
      <StatusChip text="VERIFY" tone="amber" />
      <StatusChip text="EXPORT" tone="blue" />
    </div>
  </AbsoluteFill>
);
