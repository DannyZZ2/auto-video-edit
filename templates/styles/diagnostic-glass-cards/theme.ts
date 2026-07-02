export const diagnosticGlassTheme = {
  colors: {
    glass: "rgba(255, 255, 255, 0.58)",
    glassDark: "rgba(255, 255, 255, 0.10)",
    text: "#14161A",
    textMuted: "#666D78",
    teal: "#18A999",
    blue: "#5B6CFF",
    amber: "#FFB000",
    rim: "rgba(255,255,255,0.62)",
  },
  typography: {
    display: '"Inter", "SF Pro Display", "PingFang SC", "Microsoft YaHei", sans-serif',
    body: '"Inter", "SF Pro Text", "PingFang SC", "Microsoft YaHei", sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
  },
  layout: {safeX: 88, safeY: 72, radius: 18, panelWidth: 700},
  motion: {enter: 14, exit: 10, shine: 22},
};

export type DiagnosticGlassTheme = typeof diagnosticGlassTheme;
