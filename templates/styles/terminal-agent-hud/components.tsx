import type {CSSProperties} from "react";
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from "remotion";
import {terminalAgentTheme as theme} from "./theme";

const ease = Easing.bezier(0.16, 1, 0.3, 1);

export const TerminalAgentCard = ({label, title, rows}: {label: string; title: string; rows: string[]}) => {
  const frame = useCurrentFrame();
  const reveal = interpolate(frame, [0, theme.motion.enter], [0, 1], {extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease});
  return (
    <div style={{...panelStyle, opacity: reveal, transform: `translate3d(0, ${(1 - reveal) * 20}px, 0)`}}>
      <TerminalTopBar label={label} />
      <div style={{padding: "26px 30px 0"}}>
        <TypeLine text={`> ${title}`} delay={0} size={32} color={theme.colors.green} />
        <div style={{display: "grid", gap: 11, marginTop: 22}}>
          {rows.map((row, index) => (
            <TypeLine key={row} text={row} delay={12 + index * 13} size={23} color={row.includes("[ok]") || row.includes("[ready]") ? theme.colors.text : theme.colors.amber} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TerminalAgentExampleLayer = () => (
  <AbsoluteFill style={{background: theme.colors.bg}}>
    <div style={{position: "absolute", left: 88, top: 78, fontFamily: theme.typography.mono, fontSize: 15, color: "rgba(123, 255, 203, 0.78)"}}>
      codex-agent / overlay-render / session: skill-demo
    </div>
    <div style={{position: "absolute", right: theme.layout.safeX, top: theme.layout.safeY}}>
      <TerminalAgentCard label="agent.run" title="generate_voiceover_edit()" rows={["[ok] transcript segmented", "[ok] speech edit assembled", "[ok] overlay animation generated"]} />
    </div>
  </AbsoluteFill>
);

const TerminalTopBar = ({label}: {label: string}) => (
  <div style={{height: 52, display: "flex", alignItems: "center", gap: 10, padding: "0 18px", borderBottom: "1px solid rgba(255,255,255,0.10)", background: "rgba(255,255,255,0.035)", color: theme.colors.green, fontSize: 16, fontWeight: 740}}>
    <span style={{width: 10, height: 10, borderRadius: 999, background: theme.colors.red}} />
    <span style={{width: 10, height: 10, borderRadius: 999, background: "#FFB000"}} />
    <span style={{width: 10, height: 10, borderRadius: 999, background: "#18A999"}} />
    <span style={{marginLeft: 12}}>{label}</span>
  </div>
);

const TypeLine = ({text, delay, size, color}: {text: string; delay: number; size: number; color: string}) => {
  const frame = useCurrentFrame();
  const count = Math.max(0, Math.floor((frame - delay) * theme.motion.typeSpeed));
  const visible = text.slice(0, count);
  const caret = frame % 18 < 9 ? "_" : " ";
  return <div style={{fontSize: size, lineHeight: 1.25, color, whiteSpace: "pre-wrap", overflowWrap: "break-word"}}>{visible}{count < text.length ? caret : ""}</div>;
};

const panelStyle: CSSProperties = {
  width: theme.layout.panelWidth,
  padding: "0 0 26px",
  background: theme.colors.panel,
  border: `1px solid ${theme.colors.border}`,
  borderRadius: theme.layout.radius,
  boxShadow: "0 28px 88px rgba(0,0,0,0.38)",
  color: theme.colors.text,
  fontFamily: theme.typography.mono,
  overflow: "hidden",
};
