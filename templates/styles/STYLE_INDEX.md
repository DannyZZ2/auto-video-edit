# Built-In Style Index / 内置风格索引

Use `style-index.json` as the routing manifest before selecting or implementing a built-in overlay style.

选择或实现内置 overlay 风格前，先读取 `style-index.json` 作为路由清单。

## Required Flow / 必需流程

1. Read `style-index.json`.
2. Resolve the requested style by `id`, `displayName`, or `aliases`.
3. Read the selected style directory.
4. Keep these files together: `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
5. Copy or adapt the selected components before inventing new components.
6. Preserve the selected style's `tokens.json.geometry` contract. Do not borrow radius, frame shape, border style, or forbidden shapes from another style.

1. 读取 `style-index.json`。
2. 用 `id`、`displayName` 或 `aliases` 匹配用户指定风格。
3. 读取匹配的风格目录。
4. 始终成套使用 `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
5. 新写组件前，先复制或改造对应风格组件。
6. 保留所选风格的 `tokens.json.geometry` 几何契约。不要从其他风格借用圆角、外框形态、描边方式或禁用形态。

## Style IDs / 风格 ID

| ID | Name | 中文名 | Best For |
| --- | --- | --- | --- |
| `dark-diagnostic-hud` | Dark Diagnostic HUD | 暗色诊断 HUD | AI analysis, checks, scoring, workflow automation |
| `signal-desk-overlay` | Signal Desk Overlay | 标准重点弹窗 | General keyword popups and process callouts |
| `precision-hud-cards` | Precision HUD Cards | 精密 HUD 卡片 | Metrics, comparisons, structured workflow steps |
| `diagnostic-glass-cards` | Diagnostic Glass Cards | 诊断玻璃卡片 | Soft translucent key-point cards |
| `terminal-agent-hud` | Terminal Agent HUD | 终端 Agent HUD | Prompt, command, generation, verification, export |

## Routing Rules / 路由规则

- The default style is `dark-diagnostic-hud`.
- If the user says HUD without more detail, prefer `dark-diagnostic-hud`; if they mention metrics or comparison, prefer `precision-hud-cards`.
- If the user says glass, translucent, or soft card, prefer `diagnostic-glass-cards`.
- If the user says terminal, command, agent, verification, or export, prefer `terminal-agent-hud`.
- If the user says popup, overlay demo, card popup, or key-point popup, prefer `signal-desk-overlay`.
- Before implementing, read `tokens.json.geometry` for the selected style and keep its card radius, inner/chip radius, border width, border style, and forbidden shapes.

- 默认风格是 `dark-diagnostic-hud`。
- 用户只说 HUD 时，优先用 `dark-diagnostic-hud`；如果提到指标或对比，优先用 `precision-hud-cards`。
- 用户说玻璃、半透明、柔和卡片时，优先用 `diagnostic-glass-cards`。
- 用户说终端、命令、agent、校验或导出时，优先用 `terminal-agent-hud`。
- 用户说弹窗、overlay demo、卡片弹窗或重点弹窗时，优先用 `signal-desk-overlay`。
- 实现前先读取所选风格的 `tokens.json.geometry`，并保持卡片圆角、内部/chip 圆角、描边宽度、描边样式和禁用形态。

## Geometry Contracts / 几何契约

| ID | Card Radius | Inner / Chip Radius | Border Style | Forbidden Drift |
| --- | --- | --- | --- | --- |
| `dark-diagnostic-hud` | `16px` | `12px` | `2px` continuous semantic rounded rectangle | checkpoint frame, corner bracket, sharp HUD box |
| `signal-desk-overlay` | `8px` | `999px` chip | `1px` compact popup with accent rail | full-screen PPT, hard HUD frame, checkpoint frame |
| `precision-hud-cards` | `8px` | `6px` | `1px` thin precision rounded rectangle | soft glass blob, large pillow card, corner bracket |
| `diagnostic-glass-cards` | `18px` | `12px` | `1px` frosted glass rim, about `20px` blur | opaque HUD frame, corner bracket, flat solid card |
| `terminal-agent-hud` | `8px` | `6px` | `1px` terminal rounded panel with top bar | code rain, native OS clone, corner bracket |

| ID | 卡片圆角 | 内部 / Chip 圆角 | 描边样式 | 禁止跑偏方向 |
| --- | --- | --- | --- | --- |
| `dark-diagnostic-hud` | `16px` | `12px` | `2px` 连续语义圆角矩形 | checkpoint 框、corner bracket、尖锐 HUD 外框 |
| `signal-desk-overlay` | `8px` | `999px` chip | `1px` 紧凑弹窗与强调侧边线 | 整屏 PPT、硬 HUD 大框、checkpoint 框 |
| `precision-hud-cards` | `8px` | `6px` | `1px` 精密细描边圆角矩形 | 玻璃泡泡、大圆角枕形卡、corner bracket |
| `diagnostic-glass-cards` | `18px` | `12px` | `1px` 玻璃边缘高光，约 `20px` 模糊 | 不透明 HUD 框、corner bracket、纯色扁平卡 |
| `terminal-agent-hud` | `8px` | `6px` | `1px` 终端圆角面板与顶部栏 | 代码雨、原生系统窗口仿制、corner bracket |
