# External Project Style Contract / 外部项目风格使用契约

This file defines how another Remotion project must reuse the `$auto-video-edit` built-in styles.

本文定义其他 Remotion 项目如何复用 `$auto-video-edit` 的内置风格。

## Root Rule / 根规则

Do not copy only a prompt or a verbal style description. Copy the full style contract folder and implement from the files.

不要只复制提示词或口头风格描述。必须复制完整风格契约目录，并从文件实现。

## Required Folder / 必需目录

In the target project, create a read-only style contract folder such as:

在目标项目中创建一个只读风格契约目录，例如：

```text
style-contract/
  references/card-style-library.md
  references/default-design.md
  references/dark-diagnostic-hud-style-system.md
  references/dark-diagnostic-hud-remotion-agent-prompt.md
  references/visual-quality-system.md
  templates/styles/style-index.json
  templates/styles/STYLE_INDEX.md
  templates/styles/<all-five-style-directories>/
  templates/remotion-overlay-kit/
  scripts/verify-style-assets.mjs
```

The target project may copy components into its own generated packaging project `src/` folder, but the original contract files should stay unchanged. The `style-contract/` folder and bundled reference Remotion project/templates are not the production Remotion project. Do not add new Composition files inside them.

目标项目可以把组件复制到自己的 generated packaging project 的 `src/` 目录中改造，但原始契约文件应保持不变。`style-contract/` 目录和随附参考 Remotion 项目/模板不是正式生产用 Remotion 工程。不要在里面添加 new Composition 文件。

## Required Use Order / 必需使用顺序

1. Read `templates/styles/style-index.json`.
2. Resolve the style by `id`, display name, or alias.
3. Read the selected style folder as a complete set:
   `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
4. Treat the selected style's own `tokens.json.geometry` as hard constraints: card radius, inner/chip radius, border width, border style, and forbidden drift shapes. These values are intentionally different across the five styles.
5. Copy or adapt `components.tsx` and `example.tsx`; do not rewrite the style from memory.
6. Use the selected style's `agent-prompt.md` only after reading the tokens and components.
7. Run `node style-contract/scripts/verify-style-assets.mjs` before generating or modifying Remotion scenes.

1. 读取 `templates/styles/style-index.json`。
2. 通过 `id`、显示名称或别名解析风格。
3. 成套读取所选风格目录：
   `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
4. 把所选风格自己的 `tokens.json.geometry` 当作硬约束：卡片圆角、内部/chip 圆角、描边宽度、描边样式和禁用跑偏形态。5 种风格的这些数值本来就应该不同。
5. 复制或改造 `components.tsx` 与 `example.tsx`；不要凭记忆重写风格。
6. 只有在读取 tokens 和组件之后，才使用所选风格的 `agent-prompt.md`。
7. 生成或修改 Remotion 场景前，运行 `node style-contract/scripts/verify-style-assets.mjs`。

## Geometry Lock / 几何锁

Every generated Remotion project should keep a small local style lock comment near the overlay implementation:

每个生成的 Remotion 项目都应在 overlay 实现附近保留一个本地风格锁注释：

```ts
// styleId: dark-diagnostic-hud
// geometry: cardRadius=16, innerRadius=12, borderWidth=2, borderStyle=continuous-rounded-rectangle
// forbidden: corner-bracket-frame, checkpoint-frame, sharp-hud-box
```

Replace the example values with the selected style's row:

实际使用时必须用所选风格对应行替换示例数值：

| Style ID | Geometry Lock |
| --- | --- |
| `dark-diagnostic-hud` | `cardRadius=16, innerRadius=12, borderWidth=2, borderStyle=continuous-rounded-rectangle` |
| `signal-desk-overlay` | `cardRadius=8, chipRadius=999, borderWidth=1, borderStyle=compact-rounded-popup` |
| `precision-hud-cards` | `cardRadius=8, innerRadius=6, borderWidth=1, borderStyle=precision-thin-rounded-rectangle` |
| `diagnostic-glass-cards` | `cardRadius=18, innerRadius=12, borderWidth=1, borderStyle=frosted-rounded-glass-rim, blurPx=20` |
| `terminal-agent-hud` | `cardRadius=8, innerRadius=6, borderWidth=1, borderStyle=terminal-rounded-panel-with-topbar` |

This lock is not decoration. It tells future agents which shape contract must survive subtitle, text, layout, or component changes.

这个锁不是装饰。它告诉后续 agent：换字幕、换文案、换布局或改组件时，哪些形态契约必须保留。

## Agent Instruction Snippet / Agent 指令片段

Use this snippet when asking an agent in another project to generate Remotion overlays:

在其他项目中要求 agent 生成 Remotion overlay 时，使用以下片段：

```text
Use the local style contract under style-contract/.
First read templates/styles/style-index.json.
Resolve the selected style, then read that style's tokens.json, theme.ts, components.tsx, example.tsx, and agent-prompt.md.
Preserve tokens.json.geometry exactly.
Copy/adapt the bundled components; do not recreate the style from the phrase "HUD", "glass", or "popup".
Do not use any forbidden geometry from tokens.json.geometry.forbidden.
Run node style-contract/scripts/verify-style-assets.mjs before opening Studio.
```

```text
使用 style-contract/ 下的本地风格契约。
先读取 templates/styles/style-index.json。
解析所选风格后，读取该风格的 tokens.json、theme.ts、components.tsx、example.tsx 和 agent-prompt.md。
严格保留 tokens.json.geometry。
复制或改造随附组件；不要根据 “HUD”、“glass” 或 “popup” 这些词重新创造风格。
不要使用 tokens.json.geometry.forbidden 中禁止的几何形态。
打开 Studio 前运行 node style-contract/scripts/verify-style-assets.mjs。
```

## Failure Pattern To Avoid / 必须避免的失败模式

The common failure is copying labels such as "HUD", "glass", or "popup" but not the selected style's geometry. That causes cross-style drift: Dark Diagnostic can turn into checkpoint boxes, Signal Desk can turn into a large HUD frame, Glass can turn opaque, and Terminal can turn into a native OS window clone.

最常见失败是只复制 “HUD”、“glass” 或 “popup” 这种标签，却没有复制所选风格自己的几何契约。这样会发生跨风格漂移：Dark Diagnostic 变成 checkpoint 框，Signal Desk 变成大 HUD 框，Glass 变成不透明卡，Terminal 变成原生系统窗口仿制。

## Success Criteria / 成功标准

- The target project contains the full `style-contract/` folder.
- The selected style uses its own bundled tokens and components.
- `tokens.json.geometry` values are visible in the implementation or local style lock.
- Forbidden shapes do not appear unless the approved plan explicitly asks for them.
- The verifier passes before Studio preview.

- 目标项目包含完整 `style-contract/` 目录。
- 所选风格使用自己的随附 tokens 和组件。
- `tokens.json.geometry` 数值能在实现或本地风格锁中看到。
- 禁用形态不会出现，除非已确认方案明确要求。
- 打开 Studio 预览前校验脚本通过。
