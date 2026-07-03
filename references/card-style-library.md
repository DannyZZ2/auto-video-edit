# 暗色诊断 HUD 风格库 / Dark Diagnostic HUD Style Library

> 用途：`$auto-video-edit` 的唯一内置风格库。旧风格已移除；生成包装时只能从下面的新风格族中选择。
> Purpose: the only built-in style library for `$auto-video-edit`. Old styles are removed; packaging generation may only use the new style family below.

## 内置风格策略 / Built-In Style Policy

Built-in styles:

内置风格：

```text
Default: Dark Diagnostic HUD / 暗色诊断 HUD
Variant: Signal Desk Overlay / 标准重点弹窗
Variant: Precision HUD Cards / 精密 HUD 卡片
Variant: Diagnostic Glass Cards / 诊断玻璃卡片
Variant: Terminal Agent HUD / 终端 Agent HUD
```

默认使用 `Dark Diagnostic HUD / 暗色诊断 HUD`。只有用户明确要求或包装方案明确指定时，才在同一风格族内切换到 `Signal Desk Overlay`、`Precision HUD Cards`、`Diagnostic Glass Cards` 或 `Terminal Agent HUD`。不要回退到任何已移除的旧包装风格。

Use `Dark Diagnostic HUD` by default. Switch within the same style family to `Signal Desk Overlay`, `Precision HUD Cards`, `Diagnostic Glass Cards`, or `Terminal Agent HUD` only when the user explicitly asks or the approved plan names that variant. Do not fall back to any removed legacy packaging style.

用户提供自定义 Markdown 或参考图时，只把它作为本次任务的外部 brief；除非用户明确要求更新 skill，否则不加入内置风格库。

If the user provides a custom Markdown style or reference image, treat it as an external brief for that task only. Do not add it to the built-in library unless the user explicitly asks to update the skill.

## 默认风格 / Default Style

### Dark Diagnostic HUD / 暗色诊断 HUD

适合：

- AI 工具讲解、视频体检、发布前预审、评分、自动化工作流、产品分析。
- 需要在实拍或屏幕录制上叠加“正在被 AI 工具分析”的感觉。
- 需要稳定复用到不同字幕和不同口播内容的短视频包装。

视觉结构：

- 暗调底层画面 + 黑色遮罩 + 蓝绿/蓝紫氛围光。
- 左上角固定 `HudSectionLabel`，英文大写 + 中文副标题。
- 一张主 `DiagnosticPanel`，搭配 1-3 个 `StatusChip`。
- 按语义显示扫描线、进度条、分数、清单行或输出文件卡。
- 底部保留 `BilingualSubtitle`，中文大、英文小。

Remotion 实现：

```text
base: dark scrim + subtle vignette + cool color wash
header: uppercase mono label + Chinese bold subtitle
panel: rgba(8,14,22,0.72-0.86) + 1px semantic border + weak glow + inset shadow
text: Inter / PingFang SC / Microsoft YaHei / SF Mono
motion: section reveal -> panel draw/slide -> rows stagger -> scan/progress/score emphasis
```

动效建议：

- 关键词 cue 前 4-8 帧出现左上 HUD label。
- 主面板在 cue 点附近用轻微位移、透明度和 scale 入场。
- 行项目按 4-6 帧错峰出现。
- 扫描线只在卡片内部移动，不做全屏扫描。
- 分数、状态和关键结果在 cue 点后 6-12 帧强调一次。

## 风格变体 / Style Variants

### Signal Desk Overlay / 标准重点弹窗

适合：

- 关键内容弹窗、短结论、数字提示、流程小卡、评论区 skill 提示。
- 底层视频已经足够清楚，只需要 2-4 秒的重点增强。
- 希望保持轻量，不进入完整诊断报告或评分仪表的镜头。

视觉结构：

- 紧凑卡片弹窗，优先放左右侧、上半区或不挡脸的位置。
- 一张卡只表达一个重点：一句结论、一个数字、一个步骤或一个提示。
- 暗色诊断语义仍保留：黑色半透明底、语义色侧边线/小标签、弱阴影。
- 不做整屏 PPT，不堆叠超过两张弹窗。

Remotion 实现：

```text
container: compact dark card, 8-12px radius, semantic accent rail, soft shadow
text: bold Chinese title, short body, optional mono label
motion: quick pop/slide, 10-14 frame enter, 8-10 frame exit, 4 frame row stagger
```

### Precision HUD Cards / 精密 HUD 卡片

适合：

- 流程分解、指标拆解、状态判断、对比结论。
- 需要更克制、更锐利、更像信息工程图的镜头。

视觉结构：

- 深色半透明卡片，边缘使用 1px 蓝/绿语义描边。
- 大标题 + 小型 mono 元信息 + 2-4 行结构化信息。
- 线条、刻度、进度条都必须服务内容，不做纯装饰。

Remotion 实现：

```text
container: dark glass, 8-12px radius, thin semantic border
accent: blue for active path, green for pass, amber for caution
layout: tight grid, clear alignment, no dense dashboard table
motion: snap-in, row stagger, border pulse, numeric count-up
```

### Diagnostic Glass Cards / 诊断玻璃卡片

适合：

- 口播重点弹窗、轻量功能摘要、侧边提示、结尾 skill/文件提示。
- 需要比默认 HUD 更透明、更轻，但仍保留诊断语义色的镜头。

视觉结构：

- 半透明玻璃卡片，低饱和蓝/绿/紫边缘光。
- 文字区域保持高对比，不让背景干扰可读性。
- 允许一次性局部扫光，但不能循环扫光或铺满全屏。

Remotion 实现：

```text
container: backdrop-filter blur(8px-14px) saturate(1.25-1.45)
fill: rgba(255,255,255,0.04-0.12) over dark scrim
border: rgba(255,255,255,0.28-0.44) + semantic rim glow
motion: card slide/pop -> one-shot local shine -> icon/text stagger -> subtle idle float
```

### Terminal Agent HUD / 终端 Agent HUD

适合：

- prompt、命令、自动生成、skill、Agent 执行、文件输出。
- 需要表达“AI 正在执行步骤”的镜头。

视觉结构：

- 短终端卡或 Agent 执行卡，不做大段真实终端。
- 2-4 行关键状态：`ANALYZE`、`GENERATE`、`VERIFY`、`EXPORT`。
- 使用紫色表示 Agent/模型，绿色表示完成，琥珀色表示待检查。

Remotion 实现：

```text
container: dark panel + mono header + status dots + short command rows
text: SF Mono / JetBrains Mono for labels, PingFang SC for Chinese result
motion: header draw -> short type-in -> status dot pulse -> completed row check
```

## 组件库 / Component Variants

| Component | 用途 | 结构 | 动效 |
|---|---|---|---|
| `HudSectionLabel` | 章节身份、当前诊断模式 | 英文大写 mono + 中文副标题 + 左侧发光条 | 轻微横向揭示，发光条点亮 |
| `StatusChip` | 状态、标签、来源、阶段 | 状态点 + 英文短标签 + 中文短标签 | pop 入场，状态点弱脉冲 |
| `DiagnosticPanel` | 体检报告、预审清单、分析结果 | 标题 + 语义描边 + 内部 rows/cards | 面板滑入，描边点亮，行错峰 |
| `ScanCard` | 扫描、检查、读取文档 | 状态头 + 进度行 + 内部扫描线 | 扫描线循环，进度条增长 |
| `ScoreGauge` | 流量评分、质量分、风险分 | 半圆或圆形 SVG 仪表 + 大数字 | path draw，数字递增，结果高亮 |
| `ChecklistPanel` | 发布前检查、合规项、执行步骤 | checkbox/序号 + 文案 + 状态色 | 行入场，勾选或警告点亮 |
| `DocumentPanel` | 文案提取、脚本扫描、报告页面 | 半透明文档卡 + 高亮行 + 扫描遮罩 | 文档浮入，行高亮，局部扫描 |
| `TerminalAgentCard` | prompt、Agent、skill、导出文件 | mono header + 2-4 行状态 + 完成 chip | 短打字机，状态点 pulse，完成行 check |
| `ExportFileCard` | SRT、REPORT、PROMPT、SKILL | 文件图标 + 类型标签 + 中文说明 | 文件卡弹出，类型标签点亮 |
| `KeyPointPopup` | 关键结论、短提示、重点句 | 紧凑标题 + 短正文 + 语义色侧边线 | 快速 pop/slide，短暂停留，轻退场 |
| `StatPopup` | 数字、评分、效率提升 | 大数字 + 单句解释 + 状态标签 | 数字递增，标签点亮 |
| `ProcessPopup` | 2-4 步流程、前后变化 | 步骤列表 + 当前行高亮 | 行错峰，当前步骤 pulse |
| `SkillDropPopup` | 评论区、skill、文件落点提示 | 文件/skill 标签 + 位置提示 | 文件卡弹出，类型标签点亮 |
| `BilingualSubtitle` | 底部字幕 | 中文主行 + 英文副行 + 阴影/描边 | 随字幕 timing 切换，不做遮挡 |
| `GitHubRepoCard` | 仓库、开源项目、代码项目 | GitHub 图标 + owner/repo + 功能说明 + language bar | 卡片滑入，repo 高亮，语言条增长 |

## 字体 / Typography

```text
Display: Inter Black / SF Pro Display Heavy / PingFang SC Heavy / Microsoft YaHei Bold
Body: Inter SemiBold / SF Pro Text / PingFang SC Semibold / Microsoft YaHei
Mono: SF Mono / JetBrains Mono / Menlo
```

规则：

- 必须显式设置 `fontFamily`。
- 中文关键词最多 2 行，每行 1-8 个字。
- 英文标签只做短识别符，例如 `SCAN`、`READY`、`SCORE`、`EXPORT`。
- 不使用负字距；mono 标签可以使用 `letter-spacing: 0.06em-0.14em`。
- HUD 主信息必须按短视频扫读尺寸放大，不要做成小型桌面软件 UI。

## 材质 / Material

- 主面板：暗色半透明底、连续圆角矩形、1.5-2px 语义描边、弱外发光、内阴影。普通卡片外圆角保持 `14-18px`，内部图标/小框圆角保持 `10-12px`。
- 玻璃变体：透明玻璃底、边缘高光、一次性局部扫光。
- 终端变体：暗色面板、mono 标签、状态点、短命令行。
- 连线：SVG path + 圆头线帽 + 弱 `drop-shadow` + 沿实际路径移动的光点。
- 进度条：只存在于卡片内部，表示内容状态，不表示整条视频播放进度。

## 几何契约 / Geometry Contracts

| 风格 / Style | 圆角 / Radius | 描边 / Border | 必须避免 / Avoid |
| --- | --- | --- | --- |
| Dark Diagnostic HUD | 外层 `16px`，内部 `12px` | `2px` 连续语义圆角描边 | checkpoint 框、corner bracket、尖锐 HUD 大框 |
| Signal Desk Overlay | 卡片 `8px`，chip `999px` | `1px` 弹窗描边 + 小面积强调侧边线 | 整屏 PPT、大 HUD 框、checkpoint 框 |
| Precision HUD Cards | 外层 `8px`，内部 `6px` | `1px` 精密细描边 | 玻璃泡泡、大圆角枕形卡、corner bracket |
| Diagnostic Glass Cards | 外层 `18px`，内部 `12px` | `1px` 玻璃边缘高光 + 约 `20px` 模糊 | 不透明 HUD 框、纯色扁平卡、corner bracket |
| Terminal Agent HUD | 外层 `8px`，内部 `6px` | `1px` 终端面板描边 + 顶栏 | 全屏代码雨、原生系统窗口仿制、corner bracket |

## 动效规则 / Motion Rules

- 动效必须锚定字幕关键词 cue，但卡片生命周期按语义组决定。
- 同一语义组内相关卡片应共存到句子、从句、清单或流程步骤完成。
- 入场 `180-360ms`，使用 `power2.out`、`back.out(1.2)` 或 Remotion `spring()`。
- 强调 `80-160ms`，可用结果 pop、描边点亮、状态 chip pulse。
- 待机只允许弱边框呼吸、状态点 pulse、扫描线或路径光点循环。
- 退场 `120-240ms`，淡出或轻微位移，不做闪白。
- 同组元素错峰 `3-8` 帧。
- 连线光点必须沿实际 SVG path 运动，不能用端点闪烁或直线插值伪装。

## 禁用 / Do Not

- 不使用任何已移除的旧包装风格。
- 不生成顶部或底部整条视频全局进度条。
- 不生成全屏系统框、随机粒子、无意义赛博图标或强扫描光。
- 不把卡片做成纯色扁平矩形。
- 不把普通信息卡做成尖锐大 HUD 外框、checkpoint 框或 corner bracket 角标框。除非用户明确要求“硬核 HUD 角标”，否则默认使用连续圆角描边卡片。
- 不把完整口播句子作为大字卡片。
- 不按每个词机械切换卡片；相关卡片必须按信息组共存。
- 不让连线光点停在终点，必须沿实际生成的线/path 循环运动。
- 不遮挡脸部、嘴部、手势和字幕安全区。
