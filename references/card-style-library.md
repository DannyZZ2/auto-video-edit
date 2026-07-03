# Five Built-In Style Library / 五种内置风格索引

This file is only a routing summary. It is not a global visual constraint. The selected `templates/styles/<style-id>/` directory remains the source of truth.

本文档只作为路由摘要，不是全局视觉约束。所选 `templates/styles/<style-id>/` 目录始终是唯一事实来源。

| Style ID | Display Name | 中文名 | Use When |
| --- | --- | --- | --- |
| `dark-diagnostic-hud` | Dark Diagnostic HUD | 暗色诊断 HUD | AI analysis, diagnostic checks, scoring, workflow automation |
| `signal-desk-overlay` | Signal Desk Overlay | 标准重点弹窗 | General key-point popups, process callouts, short overlay cards |
| `precision-hud-cards` | Precision HUD Cards | 精密 HUD 卡片 | Metrics, comparisons, structured status cards, workflow steps |
| `diagnostic-glass-cards` | Diagnostic Glass Cards | 诊断玻璃卡片 | Soft translucent key-point cards and lightweight prompts |
| `terminal-agent-hud` | Terminal Agent HUD | 终端 Agent HUD | Prompt, command, generation, verification, export, agent execution |

Required use order:

必需使用顺序：

1. Read `templates/styles/style-index.json`.
2. Resolve one style.
3. Read that style's `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
4. Copy or adapt the selected style's components.
5. Preserve `tokens.json.geometry` exactly.

Geometry belongs to each style, not to this summary.

几何属于各自风格，不属于本文档摘要。
