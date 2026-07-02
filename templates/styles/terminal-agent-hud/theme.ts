export const terminalAgentTheme = {
  colors: {
    bg: "#04070A",
    panel: "rgba(5, 10, 14, 0.92)",
    text: "#DFFFEF",
    muted: "rgba(223, 255, 239, 0.66)",
    green: "#7BFFCB",
    purple: "#9A7BFF",
    amber: "#FFCF66",
    red: "#E45A4F",
    border: "rgba(123, 255, 203, 0.42)",
  },
  typography: {
    mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
    body: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
  },
  layout: {safeX: 88, safeY: 72, radius: 8, panelWidth: 720},
  motion: {enter: 14, exit: 10, typeSpeed: 1.35},
};

export type TerminalAgentTheme = typeof terminalAgentTheme;
