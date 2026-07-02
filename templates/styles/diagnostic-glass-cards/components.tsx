import type {CSSProperties, ReactNode} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {diagnosticGlassTheme as theme} from "./theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const GlassCard = ({
  label,
  title,
  body,
  children,
}: {
  label: string;
  title: string;
  body: string;
  children?: ReactNode;
}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, theme.motion.enter], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  const shine = interpolate(frame, [8, 8 + theme.motion.shine], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  return (
    <div style={{...glassStyle, opacity: reveal, transform: `translate3d(0, ${(1 - reveal) * 18}px, 0) scale(${0.97 + reveal * 0.03})`}}>
      <div style={{position: "absolute", top: 0, bottom: 0, left: `${-38 + shine * 120}%`, width: 120, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.46), transparent)", transform: "skewX(-18deg)"}} />
      <div style={labelStyle}>{label}</div>
      <div style={titleStyle}>{title}</div>
      <div style={bodyStyle}>{body}</div>
      {children}
    </div>
  );
};

export const GlassExampleLayer = ({children}: {children?: ReactNode}) => (
  <AbsoluteFill style={{background: "linear-gradient(135deg, #F5F2EA, #DDE8F7 45%, #E8FFF8)"}}>
    <div style={{position: "absolute", left: 0, right: 0, top: 120, height: 120, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.30), transparent)", transform: "skewY(-6deg)"}} />
    <div style={{position: "absolute", right: theme.layout.safeX, top: theme.layout.safeY}}>
      {children}
    </div>
  </AbsoluteFill>
);

const glassStyle: CSSProperties = {
  position: "relative",
  width: theme.layout.panelWidth,
  padding: "34px 38px",
  borderRadius: theme.layout.radius,
  border: `1px solid ${theme.colors.rim}`,
  background: theme.colors.glass,
  boxShadow: "0 28px 90px rgba(20,22,26,0.18), inset 0 1px 0 rgba(255,255,255,0.74)",
  backdropFilter: "blur(20px) saturate(1.12)",
  WebkitBackdropFilter: "blur(20px) saturate(1.12)",
  color: theme.colors.text,
  fontFamily: theme.typography.body,
  overflow: "hidden",
};

const labelStyle: CSSProperties = {display: "inline-flex", alignItems: "center", height: 34, padding: "0 14px", borderRadius: 999, background: "rgba(24,169,153,0.14)", color: theme.colors.teal, fontFamily: theme.typography.mono, fontSize: 17, fontWeight: 740, marginBottom: 17};
const titleStyle: CSSProperties = {fontFamily: theme.typography.display, fontSize: 42, lineHeight: 1.1, fontWeight: 900};
const bodyStyle: CSSProperties = {marginTop: 14, color: theme.colors.textMuted, fontSize: 27, lineHeight: 1.32, fontWeight: 600};
