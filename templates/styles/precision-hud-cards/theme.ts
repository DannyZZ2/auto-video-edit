export const precisionHudTheme = {
  colors: {
    bg: "#07101A",
    panel: "rgba(7, 15, 26, 0.88)",
    text: "#EAF7F4",
    muted: "rgba(234, 247, 244, 0.68)",
    grid: "rgba(24, 169, 153, 0.14)",
    active: "#5B6CFF",
    pass: "#18A999",
    caution: "#FFB000",
    line: "rgba(174, 183, 196, 0.32)",
  },
  typography: {
    display: '"Inter", "PingFang SC", "Microsoft YaHei", sans-serif',
    mono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
  },
  layout: {safeX: 88, safeY: 72, radius: 8, panelWidth: 720},
  motion: {enter: 12, exit: 9, stagger: 5},
};

export type PrecisionHudTheme = typeof precisionHudTheme;
