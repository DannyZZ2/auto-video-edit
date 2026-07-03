import type {CSSProperties, ReactNode} from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  AccentName,
  PopupPosition,
  accentColor,
  theme,
} from "./theme";

type PopupShellProps = {
  children: ReactNode;
  accent?: AccentName;
  position?: PopupPosition;
  width?: number;
  visibleFrames?: number;
  delay?: number;
  style?: CSSProperties;
};

type ProcessStep = {
  index?: string;
  label?: string;
  title: string;
  detail?: string;
};

const signalEase = Easing.bezier(...theme.motion.easing);

export const safeTextStyle: CSSProperties = {
  overflowWrap: "break-word",
  wordBreak: "break-word",
  letterSpacing: 0,
};

export const adaptiveFontSize = (
  text: string,
  baseSize: number,
  minSize: number,
  maxCharsAtBase: number,
) => {
  const length = [...text].reduce(
    (total, char) => total + (/[\u4e00-\u9fff]/.test(char) ? 2 : 1),
    0,
  );
  if (length <= maxCharsAtBase) return baseSize;
  const ratio = maxCharsAtBase / Math.max(length, 1);
  return Math.max(minSize, Math.round(baseSize * (0.82 + ratio * 0.18)));
};

const textFromNode = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  return "";
};

export const AdaptiveText = ({
  children,
  text,
  baseSize,
  minSize = Math.round(baseSize * 0.78),
  lineHeight = 1.18,
  maxCharsAtBase = 22,
  style,
}: {
  children: ReactNode;
  text?: string;
  baseSize: number;
  minSize?: number;
  lineHeight?: number;
  maxCharsAtBase?: number;
  style?: CSSProperties;
}) => {
  const source = text ?? textFromNode(children);
  const fontSize = adaptiveFontSize(source, baseSize, minSize, maxCharsAtBase);

  return (
    <div style={{...safeTextStyle, fontSize, lineHeight, ...style}}>
      {children}
    </div>
  );
};

const usePopupMotion = (visibleFrames: number, delay = 0, lift = 22) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - delay;
  const enter = spring({
    frame: local,
    fps,
    config: theme.motion.spring,
    durationInFrames: theme.motion.enter,
  });
  const exit = interpolate(
    frame,
    [Math.max(0, visibleFrames - theme.motion.exit), visibleFrames],
    [1, 0],
    {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: signalEase},
  );
  const opacity = interpolate(local, [0, theme.motion.enter], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: signalEase,
  });

  return {
    opacity: opacity * exit,
    transform: `translate3d(0, ${(1 - enter) * lift + (1 - exit) * -12}px, 0) scale(${0.96 + enter * 0.04})`,
  };
};

const useLineReveal = (delay = 0, duration = 12) => {
  const frame = useCurrentFrame();
  return interpolate(frame - delay, [0, duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: signalEase,
  });
};

const positionStyle = (position: PopupPosition): CSSProperties => {
  const edge = {
    left: theme.spacing.safeX,
    right: theme.spacing.safeX,
    top: theme.spacing.safeY,
    bottom: theme.spacing.safeY,
  };
  if (position === "top-left") return {left: edge.left, top: edge.top};
  if (position === "top-right") return {right: edge.right, top: edge.top};
  if (position === "center-left") return {left: edge.left, top: "50%", transform: "translateY(-50%)"};
  if (position === "center-right") return {right: edge.right, top: "50%", transform: "translateY(-50%)"};
  if (position === "bottom-left") return {left: edge.left, bottom: edge.bottom};
  if (position === "bottom-right") return {right: edge.right, bottom: edge.bottom};
  return {left: "50%", top: "50%", transform: "translate(-50%, -50%)"};
};

export const PopupShell = ({
  children,
  accent = "teal",
  position = "top-right",
  width = 640,
  visibleFrames = 90,
  delay = 0,
  style,
}: PopupShellProps) => {
  const motion = usePopupMotion(visibleFrames, delay);
  const color = accentColor(accent);
  const anchor = positionStyle(position);
  const transform = [anchor.transform, motion.transform].filter(Boolean).join(" ");

  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div
        style={{
          position: "absolute",
          ...anchor,
          ...motion,
          transform,
          width,
          maxWidth: `calc(100% - ${theme.spacing.safeX * 2}px)`,
          padding: theme.spacing.lg,
          borderRadius: theme.radius.card,
          border: `${theme.geometry.borderWidth}px solid ${theme.colors.line}`,
          background: theme.colors.card,
          boxShadow: theme.shadow.popup,
          color: theme.colors.ink,
          fontFamily: theme.typography.body,
          overflow: "hidden",
          ...style,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 8,
            background: color,
          }}
        />
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const KeyPointPopup = ({
  label,
  title,
  body,
  accent = "teal",
  position = "top-right",
  visibleFrames = 90,
  delay = 0,
  style,
}: {
  label: string;
  title: ReactNode;
  body?: ReactNode;
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  delay?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  return (
    <PopupShell accent={accent} position={position} width={690} visibleFrames={visibleFrames} delay={delay} style={style}>
      <div style={{...labelStyle, color}}>{label}</div>
      <AdaptiveText baseSize={theme.typography.sizes.popupTitle} minSize={32} lineHeight={1.12} maxCharsAtBase={20} style={popupTitleStyle}>
        {title}
      </AdaptiveText>
      {body ? (
        <AdaptiveText baseSize={theme.typography.sizes.popupBody} minSize={21} lineHeight={1.32} maxCharsAtBase={46} style={popupBodyStyle}>
          {body}
        </AdaptiveText>
      ) : null}
    </PopupShell>
  );
};

export const StatPopup = ({
  label,
  value,
  detail,
  accent = "amber",
  position = "center-right",
  visibleFrames = 86,
  style,
}: {
  label: string;
  value: string;
  detail: string;
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  return (
    <PopupShell accent={accent} position={position} width={560} visibleFrames={visibleFrames} style={style}>
      <div style={{...labelStyle, color}}>{label}</div>
      <AdaptiveText text={value} baseSize={theme.typography.sizes.stat} minSize={48} lineHeight={0.95} maxCharsAtBase={8} style={{...popupTitleStyle, marginTop: theme.spacing.xs, color: theme.colors.ink}}>
        {value}
      </AdaptiveText>
      <AdaptiveText text={detail} baseSize={theme.typography.sizes.popupBody} minSize={21} lineHeight={1.3} maxCharsAtBase={38} style={popupBodyStyle}>
        {detail}
      </AdaptiveText>
    </PopupShell>
  );
};

export const QuotePopup = ({
  quote,
  source,
  accent = "blue",
  position = "bottom-left",
  visibleFrames = 90,
  style,
}: {
  quote: string;
  source?: string;
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  return (
    <PopupShell accent={accent} position={position} width={720} visibleFrames={visibleFrames} style={{background: theme.colors.cardWarm, ...style}}>
      <div style={{marginLeft: 12, color, fontFamily: theme.typography.display, fontSize: 54, lineHeight: 0.8, fontWeight: theme.typography.weights.heavy}}>"</div>
      <AdaptiveText text={quote} baseSize={38} minSize={28} lineHeight={1.16} maxCharsAtBase={28} style={{...popupTitleStyle, marginTop: theme.spacing.xs}}>
        {quote}
      </AdaptiveText>
      {source ? <div style={{...safeTextStyle, marginLeft: 12, marginTop: theme.spacing.md, color: theme.colors.muted, fontFamily: theme.typography.mono, fontSize: theme.typography.sizes.caption}}>{source}</div> : null}
    </PopupShell>
  );
};

export const ProcessPopup = ({
  label,
  title,
  steps,
  accent = "amber",
  position = "center-left",
  visibleFrames = 118,
  style,
}: {
  label: string;
  title: string;
  steps: ProcessStep[];
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  return (
    <PopupShell accent={accent} position={position} width={760} visibleFrames={visibleFrames} style={style}>
      <div style={{...labelStyle, color}}>{label}</div>
      <AdaptiveText text={title} baseSize={38} minSize={30} lineHeight={1.14} maxCharsAtBase={20} style={{...popupTitleStyle, marginBottom: theme.spacing.md}}>
        {title}
      </AdaptiveText>
      <div style={{display: "grid", gap: theme.spacing.sm, marginLeft: 12}}>
        {steps.slice(0, 4).map((step, index) => (
          <ProcessRow key={`${step.title}-${index}`} index={index} step={step} accent={accent} />
        ))}
      </div>
    </PopupShell>
  );
};

const ProcessRow = ({index, step, accent}: {index: number; step: ProcessStep; accent: AccentName}) => {
  const reveal = useLineReveal(8 + index * theme.motion.stagger, 12);
  const color = accentColor(accent);
  const marker = step.label ?? step.index ?? `0${index + 1}`;
  return (
    <div style={{opacity: reveal, transform: `translate3d(${(1 - reveal) * 14}px, 0, 0)`, display: "grid", gridTemplateColumns: "48px 1fr", gap: theme.spacing.sm, alignItems: "start", paddingTop: theme.spacing.sm, borderTop: `1px solid ${index === 0 ? theme.colors.lineStrong : theme.colors.line}`}}>
      <div style={{height: 32, borderRadius: theme.radius.chip, display: "flex", alignItems: "center", justifyContent: "center", background: `${color}1A`, color, fontFamily: theme.typography.mono, fontSize: 16, fontWeight: theme.typography.weights.bold}}>
        {marker}
      </div>
      <div>
        <AdaptiveText text={step.title} baseSize={28} minSize={22} lineHeight={1.18} maxCharsAtBase={16} style={{fontWeight: theme.typography.weights.bold, color: theme.colors.ink}}>
          {step.title}
        </AdaptiveText>
        {step.detail ? (
          <AdaptiveText text={step.detail} baseSize={theme.typography.sizes.caption} minSize={18} lineHeight={1.28} maxCharsAtBase={36} style={{marginTop: 5, color: theme.colors.muted}}>
            {step.detail}
          </AdaptiveText>
        ) : null}
      </div>
    </div>
  );
};

export const SkillDropPopup = ({
  title = "完整方案已整理成 Skill",
  body = "放在评论区，直接复用到下一条视频。",
  tag = "COMMENT AREA",
  accent = "teal",
  position = "bottom-right",
  visibleFrames = 105,
  style,
}: {
  title?: string;
  body?: string;
  tag?: string;
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  return (
    <PopupShell accent={accent} position={position} width={650} visibleFrames={visibleFrames} style={style}>
      <div style={{marginLeft: 12}}>
        <div style={{...chipStyle, background: `${color}1A`, color}}>{tag}</div>
        <AdaptiveText text={title} baseSize={42} minSize={32} lineHeight={1.1} maxCharsAtBase={18} style={{fontFamily: theme.typography.display, fontWeight: theme.typography.weights.heavy}}>
          {title}
        </AdaptiveText>
        <AdaptiveText text={body} baseSize={theme.typography.sizes.popupBody} minSize={21} lineHeight={1.3} maxCharsAtBase={44} style={{marginTop: theme.spacing.sm, color: theme.colors.muted, fontWeight: theme.typography.weights.medium}}>
          {body}
        </AdaptiveText>
      </div>
    </PopupShell>
  );
};

export const CalloutLabel = ({
  text,
  accent = "blue",
  position = "top-left",
  visibleFrames = 70,
  style,
}: {
  text: string;
  accent?: AccentName;
  position?: PopupPosition;
  visibleFrames?: number;
  style?: CSSProperties;
}) => {
  const color = accentColor(accent);
  const motion = usePopupMotion(visibleFrames, 0, 12);
  const anchor = positionStyle(position);
  const transform = [anchor.transform, motion.transform].filter(Boolean).join(" ");
  return (
    <AbsoluteFill style={{pointerEvents: "none"}}>
      <div style={{position: "absolute", ...anchor, ...motion, transform, display: "inline-flex", alignItems: "center", gap: theme.spacing.xs, height: 42, maxWidth: 560, padding: "0 16px", borderRadius: theme.radius.chip, background: theme.colors.card, border: `${theme.geometry.borderWidth}px solid ${theme.colors.line}`, boxShadow: theme.shadow.popup, fontFamily: theme.typography.mono, fontSize: theme.typography.sizes.label, fontWeight: theme.typography.weights.bold, color: theme.colors.ink, ...style}}>
        <span style={{width: 8, height: 8, borderRadius: 999, background: color}} />
        <span style={safeTextStyle}>{text}</span>
      </div>
    </AbsoluteFill>
  );
};

export const VideoBackdrop = ({title = "SIGNAL DESK / OVERLAY TEST"}: {title?: string}) => (
  <AbsoluteFill style={{background: theme.colors.paper, fontFamily: theme.typography.body, color: theme.colors.ink, overflow: "hidden"}}>
    <div style={{position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(20,22,26,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,22,26,0.05) 1px, transparent 1px)", backgroundSize: "44px 44px"}} />
    <div style={{position: "absolute", left: 110, top: 108, width: 1060, height: 610, borderRadius: 14, background: "#20242B", boxShadow: "0 34px 100px rgba(20, 22, 26, 0.24)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.16)"}}>
      <div style={{height: 58, display: "flex", alignItems: "center", padding: "0 24px", gap: 10, color: "#EEF1F5", borderBottom: "1px solid rgba(255,255,255,0.12)"}}>
        <Dot color="#E45A4F" />
        <Dot color="#FFB000" />
        <Dot color="#18A999" />
        <div style={{marginLeft: 18, fontFamily: theme.typography.mono, fontSize: 17, color: "rgba(255,255,255,0.72)"}}>{title}</div>
      </div>
      <div style={{position: "absolute", left: 48, right: 48, top: 105, height: 310, borderRadius: 10, background: "linear-gradient(135deg, rgba(24,169,153,0.20), rgba(91,108,255,0.12)), #11151B", border: "1px solid rgba(255,255,255,0.12)"}} />
    </div>
  </AbsoluteFill>
);

const Dot = ({color}: {color: string}) => <div style={{width: 12, height: 12, borderRadius: 999, background: color}} />;

const labelStyle: CSSProperties = {
  ...safeTextStyle,
  marginLeft: 12,
  fontFamily: theme.typography.mono,
  fontSize: theme.typography.sizes.label,
  fontWeight: theme.typography.weights.bold,
  letterSpacing: 0,
  marginBottom: theme.spacing.sm,
};

const popupTitleStyle: CSSProperties = {
  marginLeft: 12,
  fontFamily: theme.typography.display,
  fontWeight: theme.typography.weights.heavy,
};

const popupBodyStyle: CSSProperties = {
  marginLeft: 12,
  marginTop: theme.spacing.sm,
  color: theme.colors.muted,
  fontWeight: theme.typography.weights.medium,
};

const chipStyle: CSSProperties = {
  ...safeTextStyle,
  display: "inline-flex",
  alignItems: "center",
  height: 34,
  padding: "0 14px",
  borderRadius: theme.radius.chip,
  fontFamily: theme.typography.mono,
  fontSize: theme.typography.sizes.label,
  fontWeight: theme.typography.weights.bold,
  letterSpacing: 0,
  marginBottom: theme.spacing.sm,
};
