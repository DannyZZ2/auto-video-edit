# Dark Diagnostic HUD Remotion Agent Prompt / Dark Diagnostic HUD Remotion Agent 提示词

## Chinese / 中文

你正在为 Remotion 生成视频 overlay 动画。请使用 **Dark Diagnostic HUD** 风格。

这不是普通科技风，也不是纯玻璃卡片。它应该像一个创作者工具正在对视频、文案或发布流程进行实时体检、扫描、评分和预审。

硬性规则：

1. 底层画面使用暗调真人口播或屏幕录制。加黑色遮罩、蓝紫/绿蓝氛围光和轻微暗角。
2. 左上角必须有 HUD 章节标签：英文大写小标题 + 中文副标题，例如 `TRAFFIC SCORE / 流量潜力评分`。
3. 主要 overlay 使用暗色半透明面板，带细描边、轻微 glow、扫描线、进度条或状态点。
4. 语义颜色固定：蓝色表示系统/扫描/评分，绿色表示通过/完成/建议，琥珀色表示注意/检查，红色只表示风险。
5. 每个镜头只表达一个主要信息：工具介绍、体检报告、文档扫描、评分仪表、预审清单或文件导出。
6. 底部必须保留双语字幕：中文大而粗，英文小一号在下方。不要让 overlay 遮挡字幕。
7. 中文标题可以很大，但卡片正文必须清晰可读，不能溢出容器。
8. 动画只能使用 Remotion 的 `useCurrentFrame()`、`interpolate()`、`spring()` 和 `Sequence`。不要使用 CSS transition、CSS animation、keyframes 或 Tailwind animation class。
9. 不要使用随机赛博装饰、粒子、无意义图标或过多发光。所有 HUD 元素都必须像工具界面的一部分。
10. 不要照搬某个具体视频的品牌名、专有文案或 logo。复用视觉方法，不复用具体身份。
11. 几何契约必须保留：普通信息卡是连续圆角矩形，外层圆角 `16px`，内部/图标圆角 `12px`，语义描边 `2px`。不要把普通卡片替换成 corner-bracket 外框、checkpoint 框或尖锐 HUD 大框。

建议组件：

- `HudSectionLabel`
- `StatusChipStack`
- `DiagnosticPanel`
- `ScanCard`
- `ScoreGauge`
- `DocumentPanel`
- `ExportFileCard`
- `BilingualSubtitle`

推荐镜头结构：

```tsx
<AbsoluteFill>
  <BaseVideoOrImage />
  <ColorWash />
  <HudSectionLabel english="AI HEALTH REPORT" chinese="发布前体检" />
  <Sequence from={12} durationInFrames={110} layout="none">
    <DiagnosticPanel />
  </Sequence>
  <Sequence from={28} durationInFrames={90} layout="none">
    <StatusChipStack />
  </Sequence>
  <BilingualSubtitle zh="进行一个多维度的打分" en="Do a multi-dimensional scoring." />
</AbsoluteFill>
```

视觉目标：让观众感觉“这个视频正在被一个 AI 工具实时分析”，同时信息仍然清楚、克制、可信。

## English

You are generating Remotion video overlay animation. Use the **Dark Diagnostic HUD** style.

This is not generic sci-fi and not pure glassmorphism. It should feel like a creator tool that is scanning, scoring, auditing, and reporting on a video, script, or publishing workflow in real time.

Hard rules:

1. Use a dark cinematic talking-head or screen-recording base. Add black scrim, blue/purple or green/blue color wash, and a subtle vignette.
2. Every shot should have a top-left HUD section label: uppercase English title plus Chinese subtitle, such as `TRAFFIC SCORE / 流量潜力评分`.
3. Main overlays use translucent dark panels with thin borders, subtle glow, scan lines, progress bars, or status dots.
4. Semantic colors are fixed: blue for system/scan/score, green for pass/complete/suggestions, amber for attention/checklist, red only for risk.
5. One shot should communicate one main idea: tool identity, health report, document scan, score gauge, audit checklist, or file export.
6. Keep bottom bilingual subtitles: large bold Chinese line and smaller English line below. Do not cover subtitles with overlays.
7. Chinese titles may be large, but card body text must remain readable and must not overflow.
8. Animate only with Remotion `useCurrentFrame()`, `interpolate()`, `spring()`, and `Sequence`. Do not use CSS transitions, CSS animations, keyframes, or Tailwind animation classes.
9. Avoid random cyberpunk decoration, particles, meaningless icons, and excessive glow. Every HUD element must feel like part of a tool interface.
10. Do not copy a specific video's brand name, proprietary wording, or logo. Reuse the visual method, not the specific identity.
11. Preserve the geometry contract: ordinary information cards are continuous rounded rectangles with `16px` outer radius, `12px` inner/icon radius, and `2px` semantic border. Do not replace ordinary cards with corner-bracket frames, checkpoint frames, or sharp HUD boxes.

Suggested components:

- `HudSectionLabel`
- `StatusChipStack`
- `DiagnosticPanel`
- `ScanCard`
- `ScoreGauge`
- `DocumentPanel`
- `ExportFileCard`
- `BilingualSubtitle`

Recommended scene structure:

```tsx
<AbsoluteFill>
  <BaseVideoOrImage />
  <ColorWash />
  <HudSectionLabel english="AI HEALTH REPORT" chinese="发布前体检" />
  <Sequence from={12} durationInFrames={110} layout="none">
    <DiagnosticPanel />
  </Sequence>
  <Sequence from={28} durationInFrames={90} layout="none">
    <StatusChipStack />
  </Sequence>
  <BilingualSubtitle zh="进行一个多维度的打分" en="Do a multi-dimensional scoring." />
</AbsoluteFill>
```

Visual goal: make the viewer feel that the video is being analyzed by an AI tool in real time, while keeping the information clear, restrained, and credible.
