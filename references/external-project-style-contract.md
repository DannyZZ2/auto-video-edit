# External Project Style Contract / 外部项目风格契约

This file defines how another Remotion project must reuse the five `$auto-video-edit` style packs.

本文定义其他 Remotion 项目如何复用 `$auto-video-edit` 的 5 个风格包。

## Root Rule / 根规则

Do not copy only a prompt or verbal description. Copy the full read-only style contract and implement from the selected style files.

不要只复制提示词或口头描述。必须复制完整只读风格契约，并从所选风格文件实现。

## Required Folder / 必需目录

```text
style-contract/
  references/card-style-library.md
  references/external-project-style-contract.md
  templates/styles/style-index.json
  templates/styles/STYLE_INDEX.md
  templates/styles/dark-diagnostic-hud/
  templates/styles/signal-desk-overlay/
  templates/styles/precision-hud-cards/
  templates/styles/diagnostic-glass-cards/
  templates/styles/terminal-agent-hud/
  scripts/verify-style-assets.mjs
```

The `style-contract/` folder is not the production Remotion project. Do not add new Composition files inside it. Create or reuse a generated Remotion project next to it, then add production Compositions there.

`style-contract/` 不是正式生产用 Remotion 工程。不要在其中添加 new Composition。应在它旁边创建或复用生成用 Remotion 工程，并只在那里添加正式 Composition。

## Required Use Order / 必需使用顺序

1. Read `templates/styles/style-index.json`.
2. Resolve the style by `id`, display name, Chinese name, or alias.
3. Read the selected style folder as a complete set: `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
4. Copy or adapt the selected `components.tsx` and `example.tsx`.
5. Preserve the selected style's `tokens.json.geometry` exactly.
6. Run `node style-contract/scripts/verify-style-assets.mjs` before opening Remotion Studio.

1. 读取 `templates/styles/style-index.json`。
2. 通过 `id`、显示名、中文名或别名解析风格。
3. 成套读取所选风格目录：`tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
4. 复制或改造所选 `components.tsx` 与 `example.tsx`。
5. 严格保留所选风格的 `tokens.json.geometry`。
6. 打开 Remotion Studio 前运行 `node style-contract/scripts/verify-style-assets.mjs`。

## Geometry Lock / 几何锁

Keep a small local style lock near generated overlay code:

在生成的 overlay 代码附近保留本地风格锁：

```ts
// styleId: dark-diagnostic-hud
// geometry: cardRadius=16, innerRadius=12, borderWidth=2, borderStyle=continuous-rounded-rectangle
// forbidden: corner-bracket-frame, checkpoint-frame, sharp-hud-box
```

Use the selected style's actual row:

按所选风格替换为对应行：

| Style ID | Geometry Lock |
| --- | --- |
| `dark-diagnostic-hud` | `cardRadius=16, innerRadius=12, borderWidth=2, borderStyle=continuous-rounded-rectangle` |
| `signal-desk-overlay` | `cardRadius=8, chipRadius=999, borderWidth=1, borderStyle=compact-rounded-popup` |
| `precision-hud-cards` | `cardRadius=8, innerRadius=6, borderWidth=1, borderStyle=precision-thin-rounded-rectangle` |
| `diagnostic-glass-cards` | `cardRadius=18, innerRadius=12, borderWidth=1, borderStyle=frosted-rounded-glass-rim, blurPx=20` |
| `terminal-agent-hud` | `cardRadius=8, innerRadius=6, borderWidth=1, borderStyle=terminal-rounded-panel-with-topbar` |

## Failure Pattern / 失败模式

The common failure is recreating a style from words such as `HUD`, `glass`, or `popup` while ignoring the selected `tokens.json.geometry`. That causes roundness, line thickness, border shape, material, and spacing to drift.

常见失败模式是只根据 `HUD`、`glass` 或 `popup` 等词重新创作，而没有使用所选 `tokens.json.geometry`。这会导致圆角、线条粗细、边框形态、材质和间距漂移。
