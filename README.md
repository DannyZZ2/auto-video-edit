# auto-video-edit

`auto-video-edit` is now a focused Codex skill for faithfully reusing five bundled Remotion overlay styles.

`auto-video-edit` 现在是一个聚焦的 Codex skill，用于保真复用 5 种随附 Remotion overlay 风格。

## Install / 安装

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo DannyZZ2/auto-video-edit --path . --name auto-video-edit
```

## What Determines Style / 风格由什么决定

Only `templates/styles/style-index.json` determines which built-in style is used. After resolving the style, the selected directory is the only visual contract.

只有 `templates/styles/style-index.json` 决定使用哪一种内置风格。解析风格后，所选目录就是唯一视觉契约。

Each style directory contains:

每个风格目录包含：

- `tokens.json`
- `theme.ts`
- `components.tsx`
- `example.tsx`
- `agent-prompt.md`

There is no global visual style file. Do not use old shared kits or deleted reference files.

不存在全局视觉风格文件。不要使用旧共享组件包或已删除 reference。

## Built-In Styles / 内置风格

| Style ID | Display Name | 中文名 |
| --- | --- | --- |
| `dark-diagnostic-hud` | Dark Diagnostic HUD | 暗色诊断 HUD |
| `signal-desk-overlay` | Signal Desk Overlay | 标准重点弹窗 |
| `precision-hud-cards` | Precision HUD Cards | 精密 HUD 卡片 |
| `diagnostic-glass-cards` | Diagnostic Glass Cards | 诊断玻璃卡片 |
| `terminal-agent-hud` | Terminal Agent HUD | 终端 Agent HUD |

Default style: `dark-diagnostic-hud`.

默认风格：`dark-diagnostic-hud`。

## External Reuse / 外部项目复用

When using these styles in another Remotion project, copy the complete read-only style contract:

在其他 Remotion 项目中使用时，复制完整的只读风格契约：

```text
style-contract/
  references/card-style-library.md
  references/external-project-style-contract.md
  templates/styles/style-index.json
  templates/styles/STYLE_INDEX.md
  templates/styles/<five-style-directories>/
  scripts/verify-style-assets.mjs
```

Then create or reuse a generated Remotion project outside `style-contract/`. Add new production Compositions only in that generated project.

然后在 `style-contract/` 外创建或复用生成用 Remotion 工程。正式 Composition 只添加到生成工程里。

## Included Files / 包含文件

- `SKILL.md`
- `README.md`
- `agents/openai.yaml`
- `scripts/verify-style-assets.mjs`
- `references/card-style-library.md`
- `references/external-project-style-contract.md`
- `templates/styles/style-index.json`
- `templates/styles/STYLE_INDEX.md`
- `templates/styles/dark-diagnostic-hud/`
- `templates/styles/signal-desk-overlay/`
- `templates/styles/precision-hud-cards/`
- `templates/styles/diagnostic-glass-cards/`
- `templates/styles/terminal-agent-hud/`

## Verify / 校验

```bash
node scripts/verify-style-assets.mjs
```

The verifier fails if legacy style calls, global visual constraints, removed references, or incomplete style packs are present.

如果存在旧风格调用、全局视觉约束、已删除 reference 或不完整风格包，校验会失败。
