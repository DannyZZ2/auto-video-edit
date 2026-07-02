export const darkDiagnosticHudTheme = {
  colors: {
    bg: "#050A12",
    panel: "rgba(8, 16, 26, 0.86)",
    panelSoft: "rgba(10, 18, 30, 0.76)",
    text: "#EAF7F4",
    textMuted: "rgba(234, 247, 244, 0.72)",
    cyan: "#18A999",
    cyanGlow: "rgba(24, 169, 153, 0.42)",
    blue: "#5B6CFF",
    amber: "#FFB000",
    danger: "#E45A4F",
    border: "rgba(24, 169, 153, 0.72)",
  },
  typography: {
    display: '"Inter", "SF Pro Display", "PingFang SC", "Microsoft YaHei", sans-serif',
    body: '"Inter", "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
  },
  layout: {
    safeX: 88,
    safeY: 72,
    radius: 8,
    panelWidth: 680,
  },
  motion: {
    enter: 14,
    exit: 10,
    stagger: 5,
  },
};

export type DarkDiagnosticHudTheme = typeof darkDiagnosticHudTheme;
