# Dark Diagnostic HUD Style System / 暗调诊断 HUD 风格系统

## 1. Style Positioning / 风格定位

Dark Diagnostic HUD is a video overlay style for AI tools, workflow demos, product audits, technical explainers, and creator-facing tutorials.

Dark Diagnostic HUD 是一种适合 AI 工具、工作流演示、产品体检、技术讲解和创作者教程的视频 overlay 风格。

The style makes the video feel like a real-time diagnostic system: the speaker or screen recording stays as the base footage, while interface panels scan, score, classify, and summarize the key information.

这套风格的核心感觉是“实时诊断系统”：真人口播或屏幕录制作为底层画面，上方叠加界面面板，对内容进行扫描、评分、分类和总结。

## 2. Core Keywords / 核心关键词

- Dark room / 暗调空间
- Diagnostic interface / 诊断界面
- Traffic score / 流量评分
- AI health report / AI 体检报告
- Pre-publish audit / 发布前预审
- System status / 系统状态
- Bilingual clarity / 双语清晰字幕

Avoid making it look like generic sci-fi. The goal is not spaceship UI; the goal is a creator tool that looks practical, credible, and slightly futuristic.

避免做成泛科幻界面。目标不是飞船 UI，而是一个看起来实用、可信、略带未来感的创作者工具。

## 3. Visual Formula / 视觉公式

Use this formula for most shots:

大多数镜头使用这个公式：

```text
dark talking-head or screen footage
+ cinematic color wash
+ left/top HUD section label
+ one main diagnostic panel
+ 1-3 small status chips
+ bottom bilingual subtitles
```

Keep one primary overlay idea per shot. If the shot is about scoring, show score. If it is about extracting copy, show document extraction. If it is about publishing, show checklist or export state.

每个镜头只保留一个主要 overlay 主题。如果这一段讲评分，就展示评分；讲文案提取，就展示文档提取；讲发布，就展示清单或导出状态。

## 4. Color System / 颜色系统

### Base / 基础色

- Deep black: `#05070B`
- Panel black: `rgba(8, 14, 22, 0.78)`
- Soft panel: `rgba(12, 20, 32, 0.64)`
- Text white: `#F5F8FF`
- Text muted: `rgba(220, 232, 255, 0.68)`

### Accents / 强调色

- Diagnostic blue: `#2DA8FF`
- Health green: `#36E07D`
- Warning amber: `#FFB84D`
- Risk red: `#FF4F64`
- Purple agent: `#8A5CFF`

### Usage / 使用规则

- Blue is for navigation, score, scan, and system identity.
- 蓝色用于导航、评分、扫描和系统身份。
- Green is for pass, live, ready, complete, and improvement suggestions.
- 绿色用于通过、上线、就绪、完成和改善建议。
- Amber is for attention, caution, pending, and checklist items.
- 琥珀色用于注意、待处理、待检查和清单项。
- Red is rare and only for compliance or failure.
- 红色少用，只表示违规或失败。

Do not fill large cards with saturated colors. Use accents as outlines, rails, icons, progress bars, dots, and small labels.

不要用高饱和颜色填满大卡片。强调色只用于描边、侧边线、图标、进度条、圆点和小标签。

## 5. Typography / 字体

### Font Stack / 字体栈

```text
Display: Inter, SF Pro Display, PingFang SC, Microsoft YaHei, sans-serif
Body: Inter, SF Pro Text, PingFang SC, Microsoft YaHei, sans-serif
Mono: SF Mono, JetBrains Mono, Menlo, monospace
```

### Type Roles / 字号角色

- Giant Chinese title: `92-132px`, extra bold, white.
- 大号中文标题：`92-132px`，超粗，白色。
- HUD section label: `18-24px`, mono, uppercase English with spaced letters.
- HUD 章节标签：`18-24px`，等宽字体，大写英文，可稍微拉开字距。
- Chinese section subtitle: `24-32px`, bold.
- 中文章节副标题：`24-32px`，加粗。
- Panel title: `32-44px`, bold.
- 面板标题：`32-44px`，加粗。
- Panel body: `22-28px`, medium.
- 面板正文：`22-28px`，中等字重。
- Small metadata: `14-18px`, mono.
- 小型元信息：`14-18px`，等宽字体。
- Chinese subtitle: `34-44px`, bold, centered.
- 中文字幕：`34-44px`，加粗，居中。
- English subtitle: `18-24px`, regular or medium, centered below Chinese.
- 英文字幕：`18-24px`，常规或中等字重，放在中文下方居中。

Do not use negative letter spacing for Chinese. Use high contrast and thick outlines/shadows for subtitles.

中文不要使用负字距。字幕必须高对比，并使用清晰描边或阴影。

## 6. Layout System / 版式系统

### Safe Areas / 安全区域

- Left HUD margin: `64-88px`
- 左侧 HUD 边距：`64-88px`
- Top label margin: `48-72px`
- 顶部标签边距：`48-72px`
- Bottom subtitle area: reserve `130-170px`
- 底部字幕区域：预留 `130-170px`

### Common Shot Types / 常见镜头类型

1. Hero identity shot / 主标题身份镜头
   - Speaker remains visible.
   - 真人主体保留可见。
   - Large circular radar or dotted ring behind title.
   - 大号圆形雷达或点阵圆环放在标题后。
   - Huge Chinese product or concept name in center.
   - 中央放大号中文产品名或概念名。
   - Status chips stack on the left.
   - 左侧堆叠状态胶囊。

2. Document scan shot / 文档扫描镜头
   - Large translucent screenshot/document panel on the right or center.
   - 右侧或中央放大型半透明截图/文档面板。
   - Left side shows diagnostic categories.
   - 左侧展示诊断分类。
   - A scanning bar or progress lines move through the document.
   - 扫描条或进度线穿过文档。

3. Health report shot / 体检报告镜头
   - One dark report panel with 3 vertical steps.
   - 一个暗色报告面板，包含 3 个纵向步骤。
   - Steps usually map to: Copy, Improvement, Traffic.
   - 步骤通常对应：文案、改进建议、流量潜力。
   - Each step has icon, index number, color, progress bars.
   - 每步包含图标、序号、颜色和进度条。

4. Score shot / 评分镜头
   - Circular gauge or semi-ring score.
   - 圆形或半圆仪表盘评分。
   - Score number appears large, often `82/100` style.
   - 分数大号展示，例如 `82/100`。
   - Small category cards sit below score.
   - 分数下方放小型分类卡片。

5. Export / skill / file shot / 导出、Skill、文件镜头
   - Use file cards like `SRT`, `REPORT`, `PROMPT`, `SKILL`.
   - 使用 `SRT`、`REPORT`、`PROMPT`、`SKILL` 这类文件卡。
   - Cards should feel like system output, not decorative stickers.
   - 文件卡应该像系统输出，而不是装饰贴纸。

## 7. Component Library / 组件库

### `HudSectionLabel`

Top-left label with English uppercase and Chinese subtitle.

左上角章节标签，包含英文大写和中文副标题。

Example:

```text
TRAFFIC COMPASS
发布前体检
```

### `StatusChipStack`

Left-side vertical status chips. Each chip has icon, English label, Chinese label, and accent color.

左侧纵向状态胶囊。每个胶囊包含图标、英文标签、中文标签和强调色。

Example:

```text
LIVE / 已上线
OPEN SOURCE / 开源
MIT / 许可证
```

### `DiagnosticPanel`

Dark translucent panel with thin border, glow, and internal rows.

暗色半透明面板，带细描边、发光和内部信息行。

Use for document analysis, health report, audit checklist, and tool output.

用于文档分析、体检报告、预审清单和工具输出。

### `ScanCard`

Layered card showing scanning state.

展示扫描状态的层叠卡片。

Required parts:

必要元素：

- Header: `AI HEALTH REPORT` or equivalent.
- 标题：`AI HEALTH REPORT` 或等价文案。
- Status: `SCANNING`, `CHECKING`, `READY`.
- 状态：`SCANNING`、`CHECKING`、`READY`。
- 2-4 rows with progress bars.
- 2-4 行进度条。
- One moving scan line.
- 一条移动扫描线。

### `ScoreGauge`

Circular or semi-circular score visualization.

圆形或半圆形评分仪表。

Use sparingly. One score per shot.

克制使用。每个镜头只放一个评分。

### `BilingualSubtitle`

Bottom-centered subtitle block.

底部居中的双语字幕块。

Chinese line is dominant. English line is smaller. Use dark shadow or stroke.

中文为主，英文较小。使用暗色阴影或描边。

## 8. Motion Rules / 动效规则

The motion should feel like a system interface booting, scanning, and reporting.

动效应该像一个系统界面在启动、扫描和生成报告。

### Timing at 30fps / 30fps 时间规则

- Small chip enter: `8-12` frames.
- 小胶囊进入：`8-12` 帧。
- Main panel enter: `14-22` frames.
- 主面板进入：`14-22` 帧。
- Large title reveal: `18-28` frames.
- 大标题出现：`18-28` 帧。
- Row stagger: `4-6` frames.
- 行错位：`4-6` 帧。
- Scan line loop: `60-120` frames.
- 扫描线循环：`60-120` 帧。
- Score count-up: `24-42` frames.
- 分数递增：`24-42` 帧。

### Motion Types / 动效类型

- HUD labels slide in from left with opacity.
- HUD 标签从左侧滑入并淡入。
- Panels scale from `0.96` to `1` with slight y movement.
- 面板从 `0.96` 缩放到 `1`，并带轻微纵向位移。
- Progress bars reveal from left to right.
- 进度条从左到右展开。
- Scan lines move vertically or horizontally across panels.
- 扫描线在面板上纵向或横向移动。
- Radar rings pulse subtly behind hero titles.
- 雷达圆环在主标题后轻微脉冲。
- Status dots blink slowly, never aggressively.
- 状态点缓慢闪烁，不要刺眼。

Remotion rule: animate with `useCurrentFrame()`, `interpolate()`, `spring()`, and `Sequence`. Do not use CSS transitions, CSS animations, keyframes, or Tailwind animation classes.

Remotion 规则：使用 `useCurrentFrame()`、`interpolate()`、`spring()` 和 `Sequence` 做动画。不要使用 CSS transition、CSS animation、keyframes 或 Tailwind animation class。

## 9. Background Treatment / 背景处理

Use a darkened, cinematic base video.

底层视频使用暗调电影感处理。

Recommended treatment:

推荐处理：

- Add black overlay: `rgba(0,0,0,0.28-0.48)`
- 加黑色遮罩：`rgba(0,0,0,0.28-0.48)`
- Add blue/purple wash on one side.
- 一侧加入蓝紫色氛围光。
- Add green/blue wash for diagnostic shots.
- 诊断类镜头加入绿蓝色氛围光。
- Keep the speaker visible but secondary when panels are active.
- 面板出现时，真人可见但退为次要。
- Use slight vignette around edges.
- 画面边缘使用轻微暗角。

Avoid bright backgrounds behind HUD text. If footage is bright, add a local dark scrim behind overlays.

避免 HUD 文字后方背景过亮。如果素材较亮，需要给 overlay 局部加暗色遮罩。

## 10. Subtitle Style / 字幕样式

Subtitles are an important part of the style, not an afterthought.

字幕是这套风格的重要组成，不是附属品。

Recommended style:

推荐样式：

- Chinese line: white, bold, `38-44px`.
- 中文行：白色，加粗，`38-44px`。
- English line: white, `20-24px`, placed below.
- 英文行：白色，`20-24px`，放在下方。
- Use soft black shadow and optional 2px stroke.
- 使用柔和黑色阴影，可加 2px 描边。
- Centered at bottom.
- 底部居中。
- Avoid covering UI panels.
- 避免遮挡 UI 面板。

## 11. Content Mapping / 内容映射规则

For any future script, map each paragraph to one of these visual modes:

未来任何口播文案，都先映射到以下视觉模式：

| Script Intent | Visual Mode | Example Overlay |
|---|---|---|
| Introduce a tool or concept | Hero identity shot | Large title + radar ring |
| Explain what it does | Health report shot | 3-step diagnostic panel |
| Show evidence or examples | Document scan shot | Screenshot + scan line |
| Compare before and after | Checklist shot | Failed / fixed / ready rows |
| Mention score or result | Score shot | Circular gauge |
| Call to action | Export shot | Skill / file / comment card |

| 文案意图 | 视觉模式 | 示例 overlay |
|---|---|---|
| 介绍工具或概念 | 主标题身份镜头 | 大标题 + 雷达圆环 |
| 解释功能 | 体检报告镜头 | 3 步诊断面板 |
| 展示证据或案例 | 文档扫描镜头 | 截图 + 扫描线 |
| 对比前后变化 | 清单镜头 | 失败 / 修复 / 就绪行 |
| 提到评分或结果 | 评分镜头 | 圆形仪表盘 |
| 行动引导 | 导出镜头 | Skill / 文件 / 评论卡 |

## 12. Do And Do Not / 要做与不要做

Do:

要做：

- Keep overlays data-like and purposeful.
- 保持 overlay 像数据界面，有明确用途。
- Use a consistent left-side HUD identity.
- 保持一致的左侧 HUD 身份系统。
- Use blue/green/amber as semantic colors.
- 使用蓝/绿/琥珀作为语义颜色。
- Keep subtitles clear and central.
- 字幕保持清晰居中。
- Make panels feel layered over real footage.
- 让面板像真实叠加在视频上。

Do not:

不要：

- Fill the screen with random cyberpunk decoration.
- 不要用随机赛博装饰填满画面。
- Use too many panels at once.
- 不要同时出现太多面板。
- Cover the speaker's face unless intentionally transitioning.
- 不要遮挡人脸，除非是有意转场。
- Mix unrelated colors beyond the system palette.
- 不要混入系统色板之外的无关颜色。
- Use decorative icons without meaning.
- 不要使用没有语义的装饰图标。

## 13. Minimal Remotion Scene Skeleton / 最小 Remotion 镜头结构

```tsx
<AbsoluteFill>
  <BaseVideoOrImage />
  <ColorWash />
  <HudSectionLabel english="TRAFFIC COMPASS" chinese="发布前体检" />
  <Sequence from={12} durationInFrames={110} layout="none">
    <DiagnosticPanel mode="health-report" />
  </Sequence>
  <Sequence from={36} durationInFrames={90} layout="none">
    <StatusChipStack items={statusItems} />
  </Sequence>
  <BilingualSubtitle zh="进行一个多维度的打分" en="Do a multi-dimensional scoring." />
</AbsoluteFill>
```

## 14. Reusable Prompt Summary / 可复用提示摘要

Use the Dark Diagnostic HUD style: dark cinematic talking-head or screen-recording base, blue/green/amber diagnostic HUD overlays, top-left uppercase English section labels with Chinese subtitles, translucent black panels, scan lines, progress bars, status chips, score gauges, large white Chinese conclusions, and bottom-centered bilingual subtitles. Keep it practical and tool-like, not generic sci-fi. Every overlay must have a semantic purpose: scan, score, classify, warn, complete, export, or guide.

使用 Dark Diagnostic HUD 风格：暗调电影感真人或屏幕录制底层画面，叠加蓝/绿/琥珀色诊断 HUD；左上角英文大写章节标签加中文副标题；暗色半透明面板、扫描线、进度条、状态胶囊、评分仪表、大号白色中文结论和底部居中的双语字幕。整体要像实用工具界面，不要做成泛科幻装饰。每个 overlay 都必须有语义目的：扫描、评分、分类、警告、完成、导出或引导。
