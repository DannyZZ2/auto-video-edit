# video-auto-edit

`video-auto-edit` is a Codex skill for a confirmation-gated video workflow: optional fine-cut editing, SRT/timing generation, subtitle-keyword-anchored but semantic-group-driven visual packaging, Remotion + GSAP animation preview, and final export after user approval.

`video-auto-edit` 是一个 Codex skill，用于把视频流程固定成：可选精剪、生成 SRT/时间包、以语音/字幕关键词作为锚点但按语义组控制生命周期的视觉包装、用 Remotion + GSAP 生成动效预览，并在用户确认后再导出。

## Install / 安装

Install with the Codex skill installer:

使用 Codex skill 安装器：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo DannyZZ2/auto-video-edit --path . --name video-auto-edit
```

Manual install is also possible:

也可以手动安装：

```bash
git clone https://github.com/DannyZZ2/auto-video-edit.git ~/.codex/skills/video-auto-edit
```

The GitHub repository is named `auto-video-edit`; the installed skill name remains `video-auto-edit` for compatibility with existing `$video-auto-edit` prompts.

GitHub 仓库名是 `auto-video-edit`；安装后的 skill 名称仍保留 `video-auto-edit`，以兼容现有 `$video-auto-edit` 调用方式。

## Requirements / 依赖

- Codex with skill support.
- `ffmpeg` and `ffprobe` for video/audio inspection.
- `$video-use` skill. This skill is configured to bootstrap `$video-use` automatically when missing.
- Local Whisper-compatible transcription by default. ElevenLabs/Scribe is opt-in only after explicit user choice, upload consent, and API-key availability in a local ignored env/config file.
- Remotion + GSAP for approved animation implementation and Studio preview.

- 支持 skill 的 Codex。
- 用于视频/音频检查的 `ffmpeg` 和 `ffprobe`。
- `$video-use` skill。本 skill 已配置为缺失时自动安装 `$video-use`。
- 默认使用本地 Whisper 兼容转写；只有用户明确需要 ElevenLabs、同意上传音频并在本地已忽略 env/config 文件中填写 API key 后，才使用 ElevenLabs/Scribe。
- 用户确认动效方案后，使用 Remotion + GSAP 实现动画并打开 Studio 预览。

## Workflow / 工作流

The workflow is progressive: ask only one decision or unblocker at a time. Do not show future branch choices or optional settings until the user's current answer makes them necessary.

这个工作流是渐进式的：一次只询问一个决策或一个阻塞项。不要在用户当前回答使其变得必要之前，提前展示后续分支或可选设置。

1. Ask only whether ElevenLabs transcription is needed. Do not present Whisper as a choice; it is the default.
2. If ElevenLabs is needed, ask upload consent first, then open the local ignored env/config file for the user to fill `ELEVENLABS_API_KEY`.
3. Ask whether the user needs editing.
4. If editing is needed, ask for the source video folder, then run the fine-cut plan by default. Do not ask normal edit or fine-cut.
5. If editing is not needed, ask for the already-edited video.
6. Generate or normalize SRT, transcript, timestamp, edit-decision, keyword-cue, current-project asset, and gesture-cue data into one packaging timing bundle before packaging design.
7. Ask whether the user wants a custom style. If yes, ask the style source type in a separate follow-up, then ask for the matching Markdown or reference image path. Use current Codex project/workspace assets by default; do not ask about extra asset paths or disabling asset matching unless the user raises it or the step is blocked.
8. Match current-project asset filenames, path segment names, and filename-token aliases to subtitle keywords. Do not inspect image contents, OCR visible text, or classify the image subject for matching. When a subtitle keyword matches an asset name, show that asset at the keyword cue unless safety or style constraints prevent it. Do not scan the uploaded video's source folder by default.
9. If a reference image file name contains `github`, or the explicitly provided reference image contains a GitHub repository pattern, parse it into a `GitHubRepoCard`. For ordinary content assets, create GitHub cards only from filename tokens or user-provided metadata, not from image-content understanding.
10. Before packaging design, inspect the final video for pointing, dragging, swiping, circling, or line-drawing gestures. If gestures are visible near a cue, pass them to `$video-use` and use the gesture position as the preferred image/animation anchor.
11. If no custom style is provided, use the default `Dark Diagnostic HUD` style. The built-in variants are `Signal Desk Overlay`, `Precision HUD Cards`, `Diagnostic Glass Cards`, and `Terminal Agent HUD`, and they are used only when explicitly selected.
12. Use `$video-use` to generate a packaging motion design draft from the final video, timing bundle, selected style, asset manifest, gesture cues, card style library, and keyword animation library.
13. Wait for user confirmation.
14. Implement the approved design with Remotion + GSAP.
15. Open Remotion Studio for preview only.
16. Export only after the user confirms the Studio preview.

1. 只问用户是否需要使用 ElevenLabs 转写。不要把 Whisper 作为选项展示；Whisper 是默认方案。
2. 如果需要 ElevenLabs，先问是否同意上传音频，再打开本地已忽略 env/config 文件，让用户填写 `ELEVENLABS_API_KEY`。
3. 再问用户是否需要剪辑。
4. 如果需要剪辑，先让用户提供源视频文件夹，然后默认执行精剪方案。不要再询问普通剪辑还是精剪。
5. 如果不需要剪辑，让用户提供已经剪辑好的视频。
6. 在包装设计前，将 SRT、转写文本、时间戳、剪辑决策、关键词 cue、当前项目素材和手势 cue 统一整理为包装时间包。
7. 询问是否使用自定义风格。如果需要，再单独询问风格来源类型，然后索取对应 Markdown 或参考图片路径。默认使用当前 Codex 项目/工作区素材；不要主动询问是否补充额外素材路径或关闭素材匹配，除非用户主动提到或当前步骤被阻塞。
8. 用当前项目素材文件名、路径片段名称和文件名分词别名匹配字幕关键词。不要理解图片内容，不要 OCR 可见文字，不要根据图片主体分类做匹配。字幕关键词匹配到素材名称时，在该关键词 cue 展示素材，除非安全区或风格约束不允许。默认不要扫描用户上传视频所在的源文件夹。
9. 如果参考图文件名包含 `github`，或用户明确提供的参考图中有 GitHub 仓库结构，解析为 `GitHubRepoCard`。普通内容素材只能从文件名分词或用户提供的元数据生成 GitHub 卡片，不根据图片内容理解生成。
10. 包装设计前先检查最终视频中是否有指、拖、划、圈选或画线手势。如果 cue 附近有手势，把手势 cue 传给 `$video-use`，并优先使用手势位置作为图片/动画锚点。
11. 如果没有自定义风格，默认使用 `Dark Diagnostic HUD / 暗色诊断 HUD`。内置变体是 `Signal Desk Overlay / 标准重点弹窗`、`Precision HUD Cards / 精密 HUD 卡片`、`Diagnostic Glass Cards / 诊断玻璃卡片`、`Terminal Agent HUD / 终端 Agent HUD`，且只有明确选择时才使用。
12. 调用 `$video-use`，基于最终视频、时间包、风格、素材清单、手势 cue、卡片风格库和关键词动效库生成包装动效设计稿。
13. 等用户确认。
14. 用 Remotion + GSAP 实现确认后的动效。
15. 只打开 Remotion Studio 预览。
16. 用户确认 Studio 效果后再导出。

## Core Rules / 核心规则

- Do not edit, package, render, or export before the matching confirmation step.
- Generate independent SRT by default; do not burn subtitles unless explicitly requested.
- Anchor packaging animation entrances and emphasis to subtitle/voice keyword cue points, but keep related cards alive by semantic group rather than splitting every word into separate segments.
- Use matching current Codex project assets by default when asset filenames, path segment names, or filename-token aliases match subtitle keywords.
- Do not match assets by understanding image content, OCR, inferred labels, or subject classification.
- Do not search the uploaded video's source folder for packaging assets unless the user explicitly designates it as an asset source.
- Parse GitHub-like reference images, or filename/metadata-based GitHub assets, into editable `GitHubRepoCard` overlays with owner, repo, function, and languages.
- Use visible pointing, dragging, swiping, circling, or line-drawing gestures as preferred placement anchors.
- Avoid blocking faces, mouths, gestures, and the subtitle safe zone.
- Do not generate global top or bottom video progress bars.
- Do not switch away from Remotion + GSAP for animation implementation.
- Never commit `.env`, API keys, tokens, or local secrets.

- 未到对应确认节点前，不剪辑、不包装、不渲染、不导出。
- 默认生成独立 SRT；除非用户明确要求，否则不烧录字幕。
- 包装动效入场和强调以语音/字幕关键词落点作为锚点，但相关卡片按语义组控制停留和退场，不要每个词都切成独立段落。
- 默认使用当前 Codex 项目素材；当素材文件名、路径片段名称或文件名分词别名匹配字幕关键词时，优先使用该素材。
- 不要通过理解图片内容、OCR、推断标签或主体分类来匹配素材。
- 除非用户明确指定，否则不要去用户上传视频所在源文件夹里找包装素材。
- 把 GitHub 类参考图，或基于文件名/元数据的 GitHub 素材，解析成可编辑的 `GitHubRepoCard`，包含用户名、项目名、项目功能和语言。
- 当画面中有指、拖、划、圈选或画线手势时，优先把它作为包装元素的放置锚点。
- 避免遮挡脸、嘴、手势和字幕安全区。
- 不生成顶部/底部整条视频进度条。
- 动画实现不切换到 Remotion + GSAP 以外的方案。
- 不提交 `.env`、API key、token 或任何本地密钥。

## Included Files / 包含文件

- `SKILL.md`
- `agents/openai.yaml`
- `references/default-design.md`
- `references/card-style-library.md`
- `references/keyword-animation-effects.md`
- `references/visual-quality-system.md`

The repository intentionally does not include local videos, Remotion projects, generated renders, reference images, or API keys.

仓库有意不包含本地视频、Remotion 工程、生成成片、参考图片或 API key。
