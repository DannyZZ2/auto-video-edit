import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {darkDiagnosticHudTheme as theme} from "./theme";

export type HudPosition = "top-left" | "top-right" | "center-left" | "center-right" | "bottom-left" | "bottom-right";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

const anchorStyle = (position: HudPosition): CSSProperties => {
  const x = theme.layout.safeX;
  const y = theme.layout.safeY;
  if (position === "top-left") return {left: x, top: y};
  if (position === "top-right") return {right: x, top: y};
  if (position === "center-left") return {left: x, top: "50%", transform: "translateY(-50%)"};
  if (position === "center-right") return {right: x, top: "50%", transform: "translateY(-50%)"};
  if (position === "bottom-left") return {left: x, bottom: y};
  return {right: x, bottom: y};
};

export const HudLayer = ({
  children,
  position = "top-right",
  width = theme.layout.panelWidth,
  visibleFrames,
  style,
}: {
  children: ReactNode;
  position?: HudPosition;
  width?: number;
  visibleFrames: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({
    frame,
    fps,
    config: {damping: 18, stiffness: 150, mass: 0.8},
    durationInFrames: theme.motion.enter,
  });
  const exit = interpolate(frame, [visibleFrames - theme.motion.exit, visibleFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
  const opacity = interpolate(frame, [0, 10], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease}) * exit;
  const anchor = anchorStyle(position);
  const transform = [anchor.transform, `translate3d(0, ${(1 - enter) * 22 - (1 - exit) * 12}px, 0) scale(${0.965 + enter * 0.035})`]
    .filter(Boolean)
    .join(" ");

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div style={{position: "absolute", width, maxWidth: "calc(100% - 176px)", ...anchor, opacity, transform, ...style}}>
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const DiagnosticPanel = ({
  label,
  status = "READY",
  title,
  body,
  position = "top-right",
  visibleFrames = 96,
}: {
  label: string;
  status?: string;
  title: string;
  body: string;
  position?: HudPosition;
  visibleFrames?: number;
}) => {
  const frame = useCurrentFrame();
  const rail = interpolate(frame, [4, 16], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  return (
    <HudLayer position={position} visibleFrames={visibleFrames}>
      <div style={panelStyle}>
        <HudCorners />
        <div style={labelRowStyle}>
          <span>{label}</span>
          <span style={{color: theme.colors.amber}}>{status}</span>
        </div>
        <div style={{height: 3, width: `${rail * 100}%`, background: `linear-gradient(90deg, ${theme.colors.cyan}, rgba(24,169,153,0))`, marginBottom: 22}} />
        <div style={titleStyle}>{title}</div>
        <div style={bodyStyle}>{body}</div>
      </div>
    </HudLayer>
  );
};

export const StatusChip = ({text, tone = "cyan"}: {text: string; tone?: "cyan" | "blue" | "amber" | "danger"}) => {
  const color = theme.colors[tone];
  return (
    <span style={{display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", border: `1px solid ${color}`, color, fontFamily: theme.typography.mono, fontSize: 16}}>
      <span style={{width: 7, height: 7, borderRadius: 999, background: color, boxShadow: `0 0 14px ${color}`}} />
      {text}
    </span>
  );
};

export const ScoreCard = ({label, value, detail, visibleFrames = 86}: {label: string; value: string; detail: string; visibleFrames?: number}) => (
  <HudLayer position="top-right" width={520} visibleFrames={visibleFrames}>
    <div style={{...panelStyle, borderColor: "rgba(91,108,255,0.72)"}}>
      <HudCorners accent={theme.colors.blue} />
      <div style={{fontFamily: theme.typography.mono, color: "#8FA0FF", fontSize: 17, fontWeight: 740}}>{label}</div>
      <div style={{marginTop: 8, fontFamily: theme.typography.display, fontSize: 76, lineHeight: 0.92, fontWeight: 900}}>{value}</div>
      <div style={bodyStyle}>{detail}</div>
    </div>
  </HudLayer>
);

const panelStyle: CSSProperties = {
  position: "relative",
  padding: "30px 34px 32px",
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.layout.radius,
  background: theme.colors.panel,
  boxShadow: "0 26px 80px rgba(0, 0, 0, 0.30), inset 0 0 0 1px rgba(255,255,255,0.06)",
  color: theme.colors.text,
  fontFamily: theme.typography.body,
  overflow: "hidden",
};

const labelRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 18,
  marginBottom: 18,
  fontFamily: theme.typography.mono,
  fontSize: 17,
  color: "#63F3DF",
};

const titleStyle: CSSProperties = {
  fontFamily: theme.typography.display,
  fontSize: 42,
  lineHeight: 1.08,
  fontWeight: 900,
  color: theme.colors.text,
};

const bodyStyle: CSSProperties = {
  marginTop: 14,
  fontSize: 27,
  lineHeight: 1.32,
  color: theme.colors.textMuted,
  fontWeight: 600,
};

export const HudCorners = ({accent = theme.colors.cyan}: {accent?: string}) => (
  <>
    {[
      {position: {left: 10, top: 10}, border: {borderLeftWidth: 2, borderTopWidth: 2}},
      {position: {right: 10, top: 10}, border: {borderRightWidth: 2, borderTopWidth: 2}},
      {position: {left: 10, bottom: 10}, border: {borderLeftWidth: 2, borderBottomWidth: 2}},
      {position: {right: 10, bottom: 10}, border: {borderRightWidth: 2, borderBottomWidth: 2}},
    ].map((corner, index) => (
      <div key={index} style={{position: "absolute", width: 26, height: 26, borderColor: accent, borderStyle: "solid", borderWidth: 0, ...corner.border, ...corner.position}} />
    ))}
  </>
);
