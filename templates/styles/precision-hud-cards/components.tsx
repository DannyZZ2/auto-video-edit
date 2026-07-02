import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {precisionHudTheme as theme} from "./theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const PrecisionHudCard = ({
  label,
  title,
  rows,
  progress = 0.72,
}: {
  label: string;
  title: string;
  rows: string[];
  progress?: number;
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, theme.motion.enter], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  const bar = interpolate(frame, [12, 32], [0, progress], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  return (
    <div style={{...cardStyle, opacity: reveal, transform: `translate3d(${(1 - reveal) * 18}px, 0, 0)`}}>
      <div style={metaStyle}>{label}</div>
      <div style={titleStyle}>{title}</div>
      <div style={{display: "grid", gap: 12, marginTop: 20}}>
        {rows.map((row, index) => (
          <div key={row} style={{...rowStyle, opacity: interpolate(frame, [16 + index * 5, 26 + index * 5], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp"})}}>
            <span style={{color: index === rows.length - 1 ? theme.colors.pass : theme.colors.active}}>0{index + 1}</span>
            <span>{row}</span>
          </div>
        ))}
      </div>
      <div style={progressTrackStyle}>
        <div style={{height: "100%", width: `${bar * 100}%`, background: `linear-gradient(90deg, ${theme.colors.active}, ${theme.colors.pass})`}} />
      </div>
    </div>
  );
};

export const PrecisionHudExampleLayer = ({children}: {children?: ReactNode}) => (
  <AbsoluteFill style={{background: theme.colors.bg}}>
    <div style={{position: "absolute", inset: 0, backgroundImage: `linear-gradient(${theme.colors.grid} 1px, transparent 1px), linear-gradient(90deg, ${theme.colors.grid} 1px, transparent 1px)`, backgroundSize: "36px 36px"}} />
    <div style={{position: "absolute", right: theme.layout.safeX, top: theme.layout.safeY}}>
      {children ?? (
        <PrecisionHudCard label="ITERATION TRACE" title="从复刻片段到完整方案" rows={["检查口播节奏", "压缩无效停顿", "同步关键词弹窗", "输出可复用方案"]} />
      )}
    </div>
  </AbsoluteFill>
);

const cardStyle: CSSProperties = {
  width: theme.layout.panelWidth,
  padding: "30px 34px",
  borderRadius: theme.layout.radius,
  border: `1px solid ${theme.colors.active}`,
  background: theme.colors.panel,
  boxShadow: "0 26px 80px rgba(0,0,0,0.30)",
  color: theme.colors.text,
  fontFamily: theme.typography.display,
};

const metaStyle: CSSProperties = {fontFamily: theme.typography.mono, color: theme.colors.pass, fontSize: 16, marginBottom: 12};
const titleStyle: CSSProperties = {fontSize: 38, lineHeight: 1.12, fontWeight: 850};
const rowStyle: CSSProperties = {display: "grid", gridTemplateColumns: "42px 1fr", gap: 12, paddingTop: 10, borderTop: `1px solid ${theme.colors.line}`, fontSize: 24, lineHeight: 1.25, color: theme.colors.muted};
const progressTrackStyle: CSSProperties = {height: 5, marginTop: 24, background: "rgba(255,255,255,0.08)", overflow: "hidden"};
