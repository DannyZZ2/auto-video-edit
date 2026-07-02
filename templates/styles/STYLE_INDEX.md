# Built-In Style Index / 内置风格索引

Use `style-index.json` as the routing manifest before selecting or implementing a built-in overlay style.

选择或实现内置 overlay 风格前，先读取 `style-index.json` 作为路由清单。

## Required Flow / 必需流程

1. Read `style-index.json`.
2. Resolve the requested style by `id`, `displayName`, or `aliases`.
3. Read the selected style directory.
4. Keep these files together: `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
5. Copy or adapt the selected components before inventing new components.

1. 读取 `style-index.json`。
2. 用 `id`、`displayName` 或 `aliases` 匹配用户指定风格。
3. 读取匹配的风格目录。
4. 始终成套使用 `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
5. 新写组件前，先复制或改造对应风格组件。

## Style IDs / 风格 ID

| ID | Name | 中文名 | Best For |
| --- | --- | --- | --- |
| `dark-diagnostic-hud` | Dark Diagnostic HUD | 暗色诊断 HUD | AI analysis, checks, scoring, workflow automation |
| `signal-desk-overlay` | Signal Desk Overlay | 标准重点弹窗 | General keyword popups and process callouts |
| `precision-hud-cards` | Precision HUD Cards | 精密 HUD 卡片 | Metrics, comparisons, structured workflow steps |
| `diagnostic-glass-cards` | Diagnostic Glass Cards | 诊断玻璃卡片 | Soft translucent key-point cards |
| `terminal-agent-hud` | Terminal Agent HUD | 终端 Agent HUD | Prompt, command, generation, verification, export |

## Compatibility Rules / 兼容规则

- The default style is `dark-diagnostic-hud`.
- If the user says HUD without more detail, prefer `dark-diagnostic-hud`; if they mention metrics or comparison, prefer `precision-hud-cards`.
- If the user says glass, translucent, or soft card, prefer `diagnostic-glass-cards`.
- If the user says terminal, command, agent, verification, or export, prefer `terminal-agent-hud`.
- If the user says popup, overlay demo, card popup, or key-point popup, prefer `signal-desk-overlay`.
- `signal-desk-overlay` may also use `templates/remotion-overlay-kit/` as its shared component source.

- 默认风格是 `dark-diagnostic-hud`。
- 用户只说 HUD 时，优先用 `dark-diagnostic-hud`；如果提到指标或对比，优先用 `precision-hud-cards`。
- 用户说玻璃、半透明、柔和卡片时，优先用 `diagnostic-glass-cards`。
- 用户说终端、命令、agent、校验或导出时，优先用 `terminal-agent-hud`。
- 用户说弹窗、overlay demo、卡片弹窗或重点弹窗时，优先用 `signal-desk-overlay`。
- `signal-desk-overlay` 可以同时使用 `templates/remotion-overlay-kit/` 作为共享组件来源。
