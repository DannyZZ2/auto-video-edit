# Dark Diagnostic HUD Agent Prompt / 暗色诊断 HUD Agent 提示

Use this style when the video needs AI analysis, diagnostic review, publishing checks, scoring, workflow automation, or a tool-running feeling.

适用于 AI 分析、诊断体检、发布前检查、评分、自动化工作流和工具运行感的视频包装。

Hard rules:

1. Use `tokens.json`, `theme.ts`, and `components.tsx` as the implementation contract.
2. Use dark translucent panels, semantic cyan/blue/amber borders, weak glow, inset shadow, and explicit typography.
3. Keep scan lines, progress bars, and gauges inside cards. Never create a whole-video progress bar.
4. Use keyword cue times for entrance and emphasis, but keep related cards alive until the semantic group ends.
5. Do not cover face, mouth, hand gestures, or subtitles.

硬规则：

1. 以 `tokens.json`、`theme.ts` 和 `components.tsx` 作为实现契约。
2. 使用暗色半透明面板、青/蓝/琥珀语义描边、弱发光、内阴影和显式字体。
3. 扫描线、进度条和仪表只能在卡片内部，不做整条视频进度条。
4. 入场和强调绑定字幕关键词 cue，但相关卡片保留到语义组结束。
5. 不遮挡脸、嘴、手势和字幕。
