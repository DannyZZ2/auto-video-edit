---
name: auto-video-edit
description: Use when generating or reusing Remotion overlay animations with one of the five bundled style packs: Dark Diagnostic HUD, Signal Desk Overlay, Precision HUD Cards, Diagnostic Glass Cards, or Terminal Agent HUD.
---

# auto-video-edit

# Remotion 五风格 Overlay 复现契约 / Remotion Five-Style Overlay Fidelity Contract

## Root Purpose / 根目的

This skill exists only to preserve five specific Remotion overlay styles across projects.

本 skill 只用于在不同项目中保真复现 5 种指定 Remotion overlay 风格。

## Style Source Of Truth / 风格唯一事实来源

There is no global visual constraint. Determine style only through `templates/styles/style-index.json`, then use the selected style directory as the contract.

不存在全局视觉约束。只能通过 `templates/styles/style-index.json` 确定风格，然后以所选风格目录作为契约。

Required resolution flow:

必需解析流程：

1. Read `templates/styles/style-index.json`.
2. Resolve the requested style by `id`, `displayName`, `zhName`, or `aliases`.
3. If the user does not specify a style, use `defaultStyleId`, currently `dark-diagnostic-hud`.
4. Read the selected directory listed in the index.
5. Use these files together as one contract: `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
6. Preserve that style's own `tokens.json.geometry`; never borrow geometry from another style.

1. 读取 `templates/styles/style-index.json`。
2. 通过 `id`、`displayName`、`zhName` 或 `aliases` 解析用户指定的风格。
3. 用户没有指定风格时，使用 `defaultStyleId`，当前为 `dark-diagnostic-hud`。
4. 读取索引中对应的风格目录。
5. 成套使用 `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
6. 保留该风格自己的 `tokens.json.geometry`；不要从其他风格借用几何。

## Built-In Styles / 内置风格

Only these five styles are available:

只保留以下 5 种风格：

| Style ID | Display Name | 中文名 |
| --- | --- | --- |
| `dark-diagnostic-hud` | Dark Diagnostic HUD | 暗色诊断 HUD |
| `signal-desk-overlay` | Signal Desk Overlay | 标准重点弹窗 |
| `precision-hud-cards` | Precision HUD Cards | 精密 HUD 卡片 |
| `diagnostic-glass-cards` | Diagnostic Glass Cards | 诊断玻璃卡片 |
| `terminal-agent-hud` | Terminal Agent HUD | 终端 Agent HUD |

Do not use removed or unselected styles. Do not call any legacy shared overlay kit.

不要使用已删除或未选择的旧风格。不要调用任何旧共享 overlay kit。

## Implementation Rules / 实现规则

- Implement approved animations with Remotion and GSAP when animation logic needs timeline/easing support.
- Treat this skill's bundled style files as read-only reference assets.
- When generating inside another project, first copy the full style contract described in `references/external-project-style-contract.md`.
- On first run for a target workspace, create a generated packaging Remotion project outside the copied style contract.
- On later runs in that workspace, reuse that generated Remotion project and add a new uniquely named Composition.
- Do not add production Composition files to the bundled reference style files, copied `style-contract/`, or existing reference templates.
- Before writing new overlay components, copy or adapt the selected style's `components.tsx` and `example.tsx`.
- Keep text, spacing, radius, border width, border style, shadow, material, and motion timing tied to the selected style's tokens.
- If different subtitles or content require layout changes, change only content, placement, and component composition. The selected style geometry must remain unchanged.

- 动画实现使用 Remotion；需要时间线或缓动计算时使用 GSAP。
- 本 skill 随附的风格文件都是只读参考资产。
- 在其他项目中生成时，先按 `references/external-project-style-contract.md` 复制完整风格契约。
- 某个目标工作区首次运行时，在风格契约外创建生成用 Remotion 工程。
- 同一工作区后续运行时，复用该生成工程，只新增唯一命名的 Composition。
- 不要把正式 Composition 写进本 skill 的风格文件、复制后的 `style-contract/` 或参考模板中。
- 写新 overlay 组件前，先复制或改造所选风格的 `components.tsx` 与 `example.tsx`。
- 文本、间距、圆角、描边宽度、描边形态、阴影、材质和动效时间都必须来自所选风格 tokens。
- 更换字幕或内容时，只调整内容、位置和组件组合；所选风格的几何契约不能变。

## Forbidden Drift / 禁止跑偏

- Do not create one shared HUD/card geometry for all five styles.
- Do not replace a selected style with a prose interpretation of words like `HUD`, `glass`, `terminal`, or `popup`.
- Do not use legacy references, old component kits, old examples, or removed style names.
- Do not add global typography, material, safe-zone, motion, or other rules that override a selected style pack.
- Do not paste only `agent-prompt.md` into another project; copy the whole style contract.
- Do not modify `tokens.json` unless the task is explicitly to update the style itself.

- 不要为 5 种风格创建一套共用 HUD/card 几何。
- 不要根据 `HUD`、`glass`、`terminal` 或 `popup` 等词重新解释风格。
- 不要使用旧 reference、旧组件包、旧示例或已删除风格名。
- 不要增加会覆盖所选风格包的全局字体、材质、安全区、动效或其他规则。
- 在其他项目中不要只粘贴 `agent-prompt.md`；必须复制完整风格契约。
- 除非任务明确要求更新风格本身，否则不要修改 `tokens.json`。

## Verification / 校验

After any change to this skill, run:

修改本 skill 后运行：

```bash
node scripts/verify-style-assets.mjs
```

The verifier checks that only the five style packs remain, legacy style calls are absent, each style pack is complete, each geometry contract matches its tokens, and external reuse instructions point to the style contract instead of old global constraints.

校验脚本会确认：只保留 5 个风格包、旧风格调用不存在、每个风格包完整、每个几何契约与 tokens 一致，并且外部复用说明指向完整风格契约而不是旧全局约束。
