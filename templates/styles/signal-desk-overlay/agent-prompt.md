# Agent Prompt / Agent 提示词

Use this style for general keyword popups, process callouts, quote cards, skill/file callouts, and short explanatory overlays.

用于通用关键词弹窗、流程提示、引用卡片、skill/文件提示和短说明型 overlay。

## 中文

你正在为 Remotion 生成视频 overlay 弹窗动画。必须使用本 skill 随附的 `templates/styles/signal-desk-overlay/` Signal Desk Overlay 风格包。

硬性规则：

1. 优先使用 `theme.ts` 和 `components/` 中已有组件。
2. 只做视频上方的关键内容弹窗，不要改成整屏 PPT 或完整栏目包装。
3. 每个弹窗只表达一个重点：一句结论、一个数字、一个步骤或一个提示。
4. 动画只能使用 Remotion 的 `useCurrentFrame()`、`interpolate()`、`spring()` 和 `Sequence`。
5. 不要使用 CSS transition、CSS animation、CSS keyframes 或 Tailwind animation class。
6. 弹窗必须避开字幕、人脸和关键 UI。默认使用 `top-right`、`top-left`、`bottom-right`、`bottom-left`、`center-right` 等位置预设。
7. 中文优先保证可读性，不要压缩字距，不要让文字溢出卡片。
8. 强调色只能小面积使用，不能把整个画面做成大色块。
9. 几何契约：使用 `tokens.json` 里的紧凑圆角弹窗，卡片圆角 8px，chip 圆角 999px，描边/侧边线保持 1px 左右。
10. 不要改成整屏 PPT、大 HUD 框、corner-bracket 外框或 checkpoint 框。

目标：让弹窗像一套稳定的短视频知识点包装，而不是随机出现的装饰卡片。

## English

You are generating Remotion video overlay popup animation. You must use the bundled Signal Desk Overlay style pack from `templates/styles/signal-desk-overlay/`.

Hard rules:

1. Use `theme.ts` and existing components first.
2. Create key-content popups above video footage. Do not turn the scene into a full-screen presentation.
3. One popup should communicate one idea: one conclusion, number, step, or prompt.
4. Animate only with Remotion `useCurrentFrame()`, `interpolate()`, `spring()`, and `Sequence`.
5. Do not use CSS transitions, CSS animations, CSS keyframes, or Tailwind animation classes.
6. Popups must avoid subtitles, faces, and important UI. Prefer position presets such as `top-right`, `top-left`, `bottom-right`, `bottom-left`, and `center-right`.
7. Chinese text readability comes first. Do not compress letter spacing or let text overflow.
8. Accent colors should be small-area highlights, not large color blocks.
9. Geometry contract: use compact rounded popups from `tokens.json` with 8px card radius, 999px chip radius, and about 1px border/accent rail.
10. Do not turn this style into a full-screen presentation, large HUD frame, corner-bracket frame, or checkpoint box.

Goal: make the popups feel like a stable short-video knowledge overlay system, not random decorative cards.
