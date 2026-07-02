# 默认包装风格 / Default Packaging Style

## 风格名称 / Style Name

**Dark Diagnostic HUD / 暗色诊断 HUD**

这是 `$video-auto-edit` 的唯一默认包装风格。它来自已确认的参考视频效果：暗调实拍或屏幕录制作为底层画面，上方叠加像 AI 工具实时体检、扫描、评分和输出报告的 HUD 卡片。

This is the only default packaging style for `$video-auto-edit`. It is based on the approved reference-video effect: dark talking-head or screen-recording footage with HUD overlays that feel like an AI tool scanning, scoring, auditing, and reporting in real time.

## 核心气质 / Core Feel

- 暗调、可信、工具化，不做随机科幻装饰。
- 像创作者工具的实时诊断界面，而不是后台仪表盘截图。
- 每个镜头只表达一个主要信息：体检报告、文档扫描、评分、清单、导出状态或 Agent 执行步骤。
- 卡片要能被 Remotion + React + GSAP 直接复刻：`div`、SVG、渐变、描边、滤镜、帧驱动动画。
- 保护人物脸部、嘴部、手势和中下方字幕安全区。

- Dark, credible, tool-like, not random sci-fi decoration.
- Feels like a real-time creator-tool diagnostic interface, not a backend dashboard screenshot.
- Each shot communicates one main idea: health report, document scan, score, checklist, export state, or agent execution step.
- Cards must be reproducible with Remotion, React, and GSAP: `div`, SVG, gradients, strokes, filters, and frame-driven animation.
- Protect the face, mouth, gestures, and lower subtitle safe zone.

## 视觉公式 / Visual Formula

```text
dark talking-head or screen footage
+ cinematic black scrim
+ blue/green or blue/purple color wash
+ top-left HUD section label
+ one main diagnostic panel
+ 1-3 small status chips
+ bottom bilingual subtitles
```

```text
暗调真人口播或屏幕录制
+ 电影感黑色遮罩
+ 蓝绿或蓝紫氛围光
+ 左上角 HUD 章节标签
+ 一张主诊断面板
+ 1-3 个小状态 chip
+ 底部双语字幕
```

## 颜色 / Color

```text
deep black: #05070B
panel black: rgba(8,14,22,0.78)
soft panel: rgba(12,20,32,0.64)
text white: #F5F8FF
text muted: rgba(220,232,255,0.68)
diagnostic blue: #2DA8FF
health green: #36E07D
warning amber: #FFB84D
risk red: #FF4F64
agent purple: #8A5CFF
```

颜色语义固定：

- 蓝色：系统、扫描、评分、主路径。
- 绿色：通过、完成、建议、就绪。
- 琥珀色：注意、待检查、警告。
- 红色：只用于风险或失败。
- 紫色：Agent、自动化、模型执行。

Semantic colors:

- Blue: system, scan, score, main path.
- Green: pass, complete, suggestion, ready.
- Amber: attention, checklist, warning.
- Red: risk or failure only.
- Purple: agent, automation, model execution.

## 字体 / Typography

```text
Display: Inter, SF Pro Display, PingFang SC, Microsoft YaHei, sans-serif
Body: Inter, SF Pro Text, PingFang SC, Microsoft YaHei, sans-serif
Mono: SF Mono, JetBrains Mono, Menlo, monospace
```

字号建议：

- 巨型中文标题：`92-132px`，ExtraBold/Black。
- HUD 英文标签：`18-24px`，mono，全大写，可少量正字距。
- 中文副标题：`24-32px`，Bold。
- 面板标题：`32-44px`，Bold。
- 面板正文：`22-28px`，Medium/Semibold。
- 小型元信息：`14-18px`，Mono。
- 中文字幕：`34-44px`，Bold，底部居中。
- 英文字幕：`18-24px`，Medium，位于中文下方。

Typography rules:

- Remotion components must set `fontFamily` explicitly.
- Do not use negative letter spacing for Chinese.
- Body text must fit inside the card; use adaptive sizing or shorter copy.
- Subtitles need high contrast, shadow, or stroke.

## 布局与安全区 / Layout and Safe Zones

- 左侧 HUD 边距：`64-88px`。
- 顶部标签边距：`48-72px`。
- 底部字幕区域：预留 `130-170px`。
- 人脸、嘴部、眼睛、胸前麦克风和主要手势优先级最高。
- 主面板优先放左侧、右侧或上半区；不要压住口型和字幕。
- 单镜头最多 1 张主面板 + 3 个状态 chip；超过则分批出现或按语义组收纳。

- Left HUD margin: `64-88px`.
- Top label margin: `48-72px`.
- Bottom subtitle area: reserve `130-170px`.
- Face, mouth, eyes, mic, and main gestures have highest priority.
- Main panels prefer left, right, or upper regions; avoid mouth and subtitles.
- One shot should have at most 1 main panel plus 3 status chips; otherwise stagger or collapse by semantic group.

## 默认组件 / Default Components

### `HudSectionLabel`

左上角章节标签：英文大写 + 中文副标题。

Top-left section label: uppercase English plus Chinese subtitle.

```text
AI HEALTH REPORT
发布前体检
```

### `StatusChipStack`

左侧或面板旁的状态 chip 组。每个 chip 包含状态点、英文短标签、中文短标签和语义色。

Left-side or panel-adjacent status chips. Each chip includes a status dot, short English label, short Chinese label, and semantic color.

### `DiagnosticPanel`

主诊断面板。用于文档扫描、体检报告、预审清单、自动化结果、工具输出。必须包含暗色半透明底、细描边、内阴影、弱 glow 和清晰标题。

Main diagnostic panel for document scans, health reports, audit checklists, automation results, and tool output. It must include a dark translucent fill, thin border, inner shadow, weak glow, and readable title.

### `ScanCard`

扫描态卡片。包含 `SCANNING`、`CHECKING`、`READY` 等状态、2-4 行进度条和一条移动扫描线。扫描线只在卡片内部移动。

Scanning-state card with statuses such as `SCANNING`, `CHECKING`, or `READY`, 2-4 progress rows, and one moving scan line. The scan line only moves inside the card.

### `ScoreGauge`

圆形或半圆评分仪表。每个镜头最多一个，数值必须大而清楚，例如 `82/100`。

Circular or semi-circular score gauge. Use at most one per shot, with a large readable value such as `82/100`.

### `TerminalAgentCard`

短终端/Agent 执行卡。只显示 2-4 行关键步骤，不打整段长命令。

Short terminal or agent execution card. Show only 2-4 key steps, not long command dumps.

### `BilingualSubtitle`

底部双语字幕。中文为主，英文小一号在下方。字幕不可被 overlay 遮挡。

Bottom bilingual subtitles. Chinese is dominant; English is smaller underneath. Overlays must not cover subtitles.

## 动效 / Motion

- 小 chip 入场：`8-12` 帧。
- 主面板入场：`14-22` 帧。
- 大标题揭示：`18-28` 帧。
- 行项目错峰：`4-6` 帧。
- 扫描线循环：`60-120` 帧。
- 分数增长：`18-36` 帧。
- 退场：`8-14` 帧，淡出或轻微位移，不闪白。

- Small chip enter: `8-12` frames.
- Main panel enter: `14-22` frames.
- Large title reveal: `18-28` frames.
- Row stagger: `4-6` frames.
- Scan line loop: `60-120` frames.
- Score count-up: `18-36` frames.
- Exit: `8-14` frames, fade or slight offset, no white flash.

所有动画必须由 Remotion 帧驱动：`useCurrentFrame()`、`interpolate()`、`spring()`、`Sequence`，或 GSAP 仅用于根据帧计算缓动/路径状态。不要使用 CSS transition、CSS animation、keyframes 或 Tailwind animation class。

All motion must be frame-driven by Remotion: `useCurrentFrame()`, `interpolate()`, `spring()`, `Sequence`, or GSAP only for frame-based easing/path state. Do not use CSS transitions, CSS animations, keyframes, or Tailwind animation classes.

## 禁用 / Do Not

- 不复用任何已移除的旧包装风格。
- 不生成整条视频顶部/底部全局进度条。
- 不做无意义粒子、随机赛博图标、全屏扫描光或强闪白。
- 不把完整口播句子做成大字卡。
- 不让卡片遮挡脸、嘴、字幕和主要手势。
- 不复制参考视频的品牌名、专有文案或 logo；只复用视觉方法。

- Do not reuse any removed legacy packaging style.
- Do not generate global top/bottom video progress bars.
- Do not add meaningless particles, random cyber icons, full-screen scan light, or white flashes.
- Do not turn full transcript sentences into giant type cards.
- Do not cover the face, mouth, subtitles, or main gestures.
- Do not copy a reference video's brand name, proprietary wording, or logo; reuse the visual method only.
