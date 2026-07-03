# 视觉质量系统 / Visual Quality System

> 用途：约束 `$auto-video-edit` 的视频包装质感，重点解决字体普通、卡片廉价、层级不清、遮挡主体和动效过散的问题。
> Purpose: constrain `$auto-video-edit` packaging quality, especially typography, card polish, hierarchy, subject safety, and motion consistency.

## 核心原则 / Core Principles

1. 先做“设计系统”，再做单个动效。所有包装都必须从字体、组件、颜色、层级和安全区出发。
2. 包装元素服务口播，不抢人物主体。短视频包装应该是“信息增强”，不是把画面做成海报。
3. 一条视频只允许 1 个主视觉方向、1 套字体组合、1-2 个强调色和 3-5 个组件类型。
4. 任何包装方案都必须写明：字体、字重、字号区间、组件类型、颜色、层级、安全区和退场方式。
5. Remotion 实现后必须做截图验收；发现字体 fallback、遮挡脸嘴、文字过大或卡片过密，要先修正再让用户看。
6. 如果用户没有提供更强的自定义风格，默认使用 `card-style-library.md` 中的 `Dark Diagnostic HUD`，再按字幕语义选择诊断面板、扫描卡、评分仪表、终端 Agent 卡或文件输出卡。只有用户明确指定时才使用同一风格族内的变体：`Signal Desk Overlay`、`Precision HUD Cards`、`Diagnostic Glass Cards`、`Terminal Agent HUD`。
7. HUD 卡片和关键信息文字必须按“短视频快速读取”设计，不能沿用偏小、偏装饰的科技 UI 比例。信息必须在 1 秒内能被扫读，标题、关键词、状态结果优先放大。
8. 关键词时间戳只用于入场和强调锚点，不代表每个词都要切成一个独立动效段。动效生命周期按语义组、句子、从句、清单、对比或工作流步骤判断。

## 字体系统 / Typography System

| 角色 | 中文优先 | 英文/数字优先 | 用途 |
|---|---|---|---|
| 主标题 | HarmonyOS Sans SC Black, Source Han Sans Heavy, PingFang SC Heavy | Arial Black, Inter Black, Anton | 章节标题、强观点、封面式大字 |
| 关键词 | Source Han Sans Heavy, PingFang SC Heavy, HarmonyOS Sans SC Bold | Inter ExtraBold, DIN Alternate Bold | 关键词弹出、替换、高亮、标签 |
| 正文小字 | PingFang SC Semibold, Source Han Sans Medium | Inter SemiBold, IBM Plex Sans SemiBold | 卡片说明、步骤短句 |
| 技术标签 | SF Mono, JetBrains Mono, Menlo | JetBrains Mono, SF Mono | prompt、命令、状态标签 |

### 字体硬规则 / Typography Rules

- 不要裸用浏览器默认字体；Remotion 里必须显式设置 `fontFamily`。
- 中文标题必须使用 Heavy/Black 级别字重；普通 `font-weight: 400` 禁止用于包装主视觉。
- 关键词最多 2 行，每行不超过 8 个中文字符或 4 个英文词。
- 小字说明每行不超过 12 个中文字符或 5 个英文词。
- 字距不要用负值；技术短标签可以使用 `letter-spacing: 0.06em-0.14em`。
- 标题行高控制在 `0.9-1.08`；卡片正文行高控制在 `1.15-1.35`。
- 如果本机没有推荐字体，使用已安装的同类字体，但必须在设计稿和实现说明里写出 fallback。

## 字号与层级 / Size and Hierarchy

| 层级 | 1080x1920 竖屏建议 | 1920x1080 横屏建议 | 使用限制 |
|---|---:|---:|---|
| Hero 标题 | 56-92px | 72-128px | 只用于开头钩子或章节，不常驻 |
| 关键词 | 38-68px | 44-84px | 1-4 个字最佳，出现后快速收束 |
| 卡片标题 | 28-42px | 30-48px | 必须比正文明显粗 |
| 卡片正文 | 22-30px | 22-34px | 不写长段落 |
| 技术标签 | 16-24px | 18-28px | 全大写或短中文标签 |
| HUD 主信息 | 34-56px | 42-72px | 短视频可读优先；用于状态、结果、评分、步骤标题 |
| HUD 辅助信息 | 22-34px | 26-40px | 用于表格行、卡片说明、状态值；不得小到像桌面软件 UI |

包装视觉权重从高到低：人物脸部/主体 > 当前口播关键词 > 说明卡片 > 标签 > 装饰线条。任何装饰线条不能比关键词更抢眼。

短视频快速读取规则：

- HUD/信息图卡片的主标题、结果词、步骤名、风险/通过状态必须明显大于普通 UI 标签。
- 不要把 HUD 做成真实软件界面截图比例；小标签、表格列名、状态 chip 只保留必要信息。
- 一屏内 HUD 主信息优先 2-4 个视觉焦点，辅助说明宁可减少也不要缩小到难读。
- 横屏 1920x1080 中，HUD 关键中文词低于 36px 通常视为风险；竖屏 1080x1920 中低于 30px 通常视为风险。

## 组件库 / Component Library

动效方案和 Remotion 实现优先从这些组件中选，不要每段重新发明样式。

| 组件 | 结构 | 适用 | 动效建议 |
|---|---|---|---|
| `HudSectionLabel` | 英文大写 mono + 中文副标题 + 左侧发光条 | 章节身份、当前诊断模式 | 横向揭示，发光条点亮 |
| `StatusChip` | 状态点 + 英文短标签 + 中文短标签 | 状态、标签、来源、阶段 | pop 入场，状态点弱脉冲 |
| `DiagnosticPanel` | 标题 + 语义描边 + 内部 rows/cards | 体检报告、预审清单、分析结果 | 面板滑入，描边点亮，行错峰 |
| `ScanCard` | 状态头 + 进度行 + 内部扫描线 | 扫描、检查、读取文档 | 扫描线循环，进度条增长 |
| `ScoreGauge` | 半圆或圆形 SVG 仪表 + 大数字 | 流量评分、质量分、风险分 | path draw，数字递增，结果高亮 |
| `ChecklistPanel` | checkbox/序号 + 文案 + 状态色 | 发布前检查、合规项、执行步骤 | 行入场，勾选或警告点亮 |
| `DocumentPanel` | 半透明文档卡 + 高亮行 + 扫描遮罩 | 文案提取、脚本扫描、报告页面 | 文档浮入，行高亮，局部扫描 |
| `MouseClickCallout` | 鼠标指针 + 点击光圈 + 高亮 | 操作演示、按钮、prompt | 移动、点击、光圈 6-10 帧 |
| `MagnetFlow` | 标签吸附 + 连线节点 | 工作流、Agent、自动化链路 | 错峰飞入、磁吸、连线生长 |
| `TerminalAgentCard` | mono header + 2-4 行状态 + 完成 chip | prompt、Agent、skill、导出文件 | 短打字机，状态点 pulse，完成行 check |
| `ExportFileCard` | 文件图标 + 类型标签 + 中文说明 | SRT、REPORT、PROMPT、SKILL | 文件卡弹出，类型标签点亮 |
| `KeyPointPopup` | 紧凑标题 + 短正文 + 语义色侧边线 | 关键结论、短提示、重点句 | 快速 pop/slide，短暂停留，轻退场 |
| `StatPopup` | 大数字 + 单句解释 + 状态标签 | 数字、评分、效率提升 | 数字递增，标签点亮 |
| `ProcessPopup` | 步骤列表 + 当前行高亮 | 2-4 步流程、前后变化 | 行错峰，当前步骤 pulse |
| `SkillDropPopup` | 文件/skill 标签 + 位置提示 | 评论区、skill、文件落点提示 | 文件卡弹出，类型标签点亮 |
| `BilingualSubtitle` | 中文主行 + 英文副行 + 阴影/描边 | 底部双语字幕 | 随字幕 timing 切换，不遮挡 |
| `GitHubRepoCard` | GitHub 图标 + owner/repo + 功能说明 + visibility badge + 语言占比条 | GitHub 仓库、开源项目、repo、代码项目、工具仓库 | 卡片滑入，repo 高亮，badge pop，语言占比条依次增长 |

组件半径优先使用所选风格自己的 `tokens.json.geometry`。没有明确风格 token 时，普通卡片半径可在 10-24px 内选择。不要把所有卡片都做成同一种大圆角胶囊，也不要把某个风格的外框形态套到另一个风格上。

## 颜色与材质 / Color and Material

- 背景遮罩：`rgba(0,0,0,0.20-0.62)`，不要把人物压成死黑。
- 主文字：白色或接近白色，阴影克制。
- 主强调：诊断蓝 `#2DA8FF`；辅助强调可用健康绿 `#36E07D`、琥珀 `#FFB84D` 或 Agent 紫 `#8A5CFF`，但单镜头最多 2 个强调色。
- 卡片底：深蓝黑或黑色半透明，透明度 60%-84%。
- 描边：1-2px，使用透明渐变边框或语义色描边。
- 发光只服务边框、图标、连线光点或关键词落点，不要大面积糊光。
- 禁止全屏扫光、顶部/底部整条视频进度条、全屏系统框、随机粒子和无意义赛博图标。
- 使用 `Signal Desk Overlay` 时，保持紧凑弹窗、单卡单重点和 2-4 秒停留，不做完整诊断大面板。
- 使用 `Precision HUD Cards` 时，保持细描边、紧凑网格和清晰状态结果，不做密集桌面仪表盘。
- 使用 `Diagnostic Glass Cards` 时，允许透明玻璃、语义色边缘光和一次性局部扫光；禁止循环扫光和厚重灰雾。
- 使用 `Terminal Agent HUD` 时，允许短终端行、状态点和 Agent 紫强调；禁止长命令堆叠和不可读小字。
- 所有内置风格都必须保留自身几何契约：Dark Diagnostic 是 `16px/12px/2px` 连续圆角语义卡，Signal Desk 是 `8px` 紧凑弹窗，Precision HUD 是 `8px/6px/1px` 精密细描边，Diagnostic Glass 是 `18px/12px/1px` 磨砂玻璃，Terminal Agent 是 `8px/6px/1px` 终端面板。不要跨风格借用外框形态。

### 高级卡片材质 / Premium Card Material

默认卡片不要做成单层扁平矩形。参考 `card-style-library.md`，明确卡片材质、描边、内外光影、字体和内容层。卡片至少应包含：

- 半透明或半哑光深色底。
- 1px 透明渐变边框或语义色描边。
- 内侧高光或暗角。
- 软外阴影。
- 图标容器和文字层级。

By default, cards must not be single-layer flat rectangles. Follow `card-style-library.md` and specify material, border, inner/outer lighting, typography, and content layers.

## 布局与安全区 / Layout and Safe Zones

- 口播人物视频默认保留脸部、嘴部、手势和下方中间字幕安全区。
- 卡片优先放左侧、右侧或上三分区；底部只放短标签或字幕，不放大卡片。
- 竖屏人物居中时，左右边缘可放窄卡；人物偏右时，左侧可放主卡。
- 单屏最多 1 张主卡 + 2 个标签；超过时要分批出现。
- 包装元素应在当前语义组完成后退场，避免堆积；如果多个卡片解释同一句、同一组清单、同一组对比或同一工作流步骤，它们应共存到该语义组结束，再一起退场或收纳。
- 不要因为下一个相关关键词出现就立刻让前一个相关卡片消失；只做局部高亮、位置调整或组内新增卡片。
- 用户提供或当前项目中的图片、logo、UI 截图、透明 PNG、图标、贴纸或元素图，只按文件名、路径片段名称或文件名分词别名匹配字幕关键词；不要通过理解图片内容、OCR 可见文字或推断主体类别来匹配。
- 素材名称匹配字幕关键词时，优先作为该关键词的包装元素展示。
- 素材展示必须保留原始比例，并按画面安全区限制最大尺寸；不拉伸、不裁掉关键信息，不把小图强行放成大海报。
- 当参考图文件名包含 `github`，或用户明确提供的参考图中出现 GitHub 标识、`owner / repo`、Public/Private badge、语言占比条时，优先解析为 `GitHubRepoCard`，展示用户名、项目名、项目功能和语言占比。普通内容素材只从文件名或用户元数据生成 GitHub 卡片，不理解图片内容。
- `GitHubRepoCard` 的语言条只表示仓库语言占比，不得做成整条视频进度条；语言颜色应贴近 GitHub 语义色，最多显示 3-4 种语言。
- 画面中有指、拖、划、圈选或画线手势时，素材或动画优先贴近指尖、路径终点或划线路径出现，但必须偏移 16-48px 避免盖住手部。
- 手势锚点和脸部/嘴部/字幕安全区冲突时，优先保护脸、嘴和字幕，把素材移动到最近的安全邻近区域，并在方案中说明偏移。
- 没有可靠手势位置时，不要猜测手势锚点；回到左侧、右侧或上半区的常规布局。

## 动效质感 / Motion Quality

- 入场：180-360ms，`power2.out` 或 `back.out(1.2)`，弹跳幅度小。
- 强调：80-160ms，关键词 pop、描边点亮、局部高亮。
- 待机：只允许轻微呼吸、边框脉冲、光点循环或光标闪烁，不要所有元素一直动。
- 退场：120-240ms，淡出或轻微位移，不做强转场闪烁。
- 错峰：同组元素间隔 3-8 帧，帮助观众分辨顺序。
- 任何抖动最多 2-3 次；不能让整条视频长期抖动。
- 卡片入场拆成主体、图标、文字、边框高光 4 个错峰步骤，不要整卡一次性淡入。
- 连线、箭头、分支路径上的发光点必须沿实际生成的 SVG path/曲线路径运动。光点位置要由同一条 path 的 `getPointAtLength`、MotionPath 或等价计算得到，不能用两端点直线插值、固定 x/y 位移或端点闪烁假装沿线移动。
- 相关卡片的退场应由语义完成触发，而不是由下一个词的 cue 触发。若下一 cue 仍属于同一信息组，只做强调更新，不做前卡退场。

## 包装方案必须包含 / Required In Packaging Plans

每个动效段落必须额外写清：

- 字体：具体 `fontFamily`、字重、字号区间。
- 组件：从组件库选择，如 `DiagnosticPanel`、`ScanCard`、`TerminalAgentCard`。
- 层级：在人物、字幕、卡片、装饰之间的前后关系。
- 质量风险：是否可能挡脸、挡嘴、挡字幕、字太小或卡片太密。
- 语义组生命周期：该卡片是开始、更新、共存还是结束信息组，和哪些卡片需要同时保留。

## Remotion 实现验收 / Remotion QA

打开 Studio 前必须至少检查一个桌面尺寸截图；如果是竖屏视频，也检查竖屏构图。验收项：

1. 字体加载成功，没有 fallback 成普通系统默认字。
2. 没有遮挡脸部、嘴部和字幕安全区。
3. 关键词不是整句字幕；只显示短词或短语。
4. 卡片数量、发光、描边和文字密度可读。
5. 没有整条视频的顶部/底部全局进度条。
6. 动效段落覆盖每个有意义句子或节奏点，而不是只做第一句；但不要机械按词切割，相关卡片应共存到语义组结束。
7. Studio 预览不渲染导出，等用户确认后再导出。
8. 卡片不是扁平纯色矩形；至少能看到材质底、内外光影、语义色描边和明确字体层级。
