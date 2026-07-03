---
name: auto-video-edit
description: Use when the user wants a reusable workflow for video editing decisions, subtitle-aligned visual packaging, keyword card animations, Remotion Studio preview, and final export using Remotion plus GSAP.
---

# auto-video-edit

# 视频自动剪辑包装工作流

## Core Rule / 核心规则

Run this as a confirmation-gated workflow. Do not edit, package, render, or export until the matching user confirmation is reached. If a required tool is missing, install that tool and keep the requested stack; do not switch to another animation or video framework.

这是一个分阶段确认的工作流。未到对应确认节点前，不剪辑、不包装、不渲染、不导出。如果缺少必要工具，直接安装对应工具并保持用户指定技术栈；不要换成其它动画或视频方案。

## Progressive Single-Choice Interaction / 渐进式单选交互

Ask only one decision or unblocker at a time. Do not show future branch choices, optional settings, or irrelevant alternatives before the user's current answer makes them necessary.

一次只询问一个决策或一个阻塞项。不要在用户当前回答使其变得必要之前，提前展示后续分支、可选设置或无关选项。

Rules:

规则：

- Ask the current question in its smallest useful form, then wait for the answer.
- If the user chooses a branch, show only the next required question for that branch.
- Do not combine multiple choices in one prompt, such as transcription provider plus editing decision, editing decision plus edit style, or custom style plus style-source type.
- Do not explain or list unused branches. Mention only the active branch and the next action.
- Do not ask about optional controls that have defaults, such as project asset matching, extra asset paths, Dark Diagnostic HUD variants, or subtitle burning, unless the user raises them or the current step cannot continue without that answer.
- When a default is safe and already defined by this skill, apply it silently and state it briefly in the next progress update instead of turning it into a choice.

- 每次只问当前最小但足够推进的问题，然后等待回答。
- 用户选择某个分支后，只展示该分支下一步必须回答的问题。
- 不要把多个选择合并到一句里，例如“转写方式 + 是否剪辑”、“是否剪辑 + 剪辑方案”、“是否自定义风格 + 风格来源类型”。
- 不要解释或罗列未被使用的分支；只说明当前分支和下一步动作。
- 对已有默认值的可选项不要主动提问，例如项目素材匹配、额外素材路径、Dark Diagnostic HUD 变体、字幕烧录，除非用户主动提到，或当前步骤没有这个答案无法继续。
- 如果默认策略安全且已在本 skill 中定义，直接采用，并在下一条进度说明里简短告知，不要把它变成选择题。

Recommended question sequence:

推荐询问顺序：

1. Ask: "是否需要剪辑？"
2. If yes, ask for the source video folder, then run the fine-cut plan by default. If no, ask for the already-edited video file.
3. Transcribe the final video with local `faster-whisper` automatically. Do not ask the user to choose a transcription provider.
4. After a final video exists, ask: "是否需要自定义包装风格？"
5. If yes, ask for one style source type: Markdown or reference image. Then ask for the file/path. If no, use the default style.
6. Before packaging design, build the timing bundle, asset manifest, and gesture cues. Then generate the packaging design draft and ask for approval.

1. 先问：“是否需要剪辑？”
2. 如果需要，先问源视频文件夹，然后默认直接执行精剪方案。如果不需要，只问剪辑好的视频文件。
3. 基于最终视频自动使用本地 `faster-whisper` 转写。不要询问用户选择转写服务。
4. 拿到最终视频后，再问：“是否需要自定义包装风格？”
5. 如果需要，再问风格来源类型：Markdown 或参考图片；然后再要对应文件/路径。如果不需要，直接使用默认风格。
6. 包装设计前先生成时间包、素材清单和手势 cue，再生成包装动效设计稿并让用户确认。

Required companion skills:

- Use the installed `$video-use` skill for video analysis, cutting, SRT handling, and packaging-plan design. If `$video-use` is not installed or cannot be loaded, bootstrap it automatically before continuing.
- Use local `SYSTRAN/faster-whisper` for every transcription task. Do not offer external transcription providers or ask the user to choose a transcription provider.
- Use Remotion + GSAP for the animation implementation after the user approves the packaging design.
- Use the bundled style fidelity assets in `references/` and `templates/remotion-overlay-kit/` whenever generating the built-in overlay styles. These files are part of the skill, not optional inspiration.

必要关联技能：

- 使用已安装的 `$video-use` skill 做视频分析、剪辑、SRT 处理和包装方案设计。如果 `$video-use` 未安装或无法加载，先自动自举安装后再继续。
- 所有转写任务统一使用本地 `SYSTRAN/faster-whisper`。不要提供外部转写服务，也不要让用户选择转写方案。
- 用户确认包装设计后，用 Remotion + GSAP 实现动画包装。
- 生成内置 overlay 风格时，必须使用 `references/` 和 `templates/remotion-overlay-kit/` 中随 skill 打包的风格保真资产。这些文件是 skill 的组成部分，不是可选灵感。

## Style Fidelity Assets / 风格保真资产

The built-in style family is preserved through both specification files and reusable Remotion templates. Before designing or implementing any built-in style, read the relevant files below and cite their constraints in the packaging plan.

内置风格族通过“规范文件 + 可复用 Remotion 模板”一起保真。设计或实现任何内置风格前，必须读取下面相关文件，并在包装方案里引用实际采用的约束。

Required style references:

必须读取的风格参考：

- `references/card-style-library.md`: the active 5-style family and when each variant is allowed.
- `references/dark-diagnostic-hud-style-system.md`: complete Dark Diagnostic HUD tokens, layout grammar, component rules, motion language, and failure checks.
- `references/dark-diagnostic-hud-remotion-agent-prompt.md`: implementation prompt for agents generating this exact style in Remotion.
- `references/visual-quality-system.md`: quality bar for typography, hierarchy, materials, safe zones, and QA.
- `references/keyword-animation-effects.md`: keyword-triggered animation options.
- `templates/styles/style-index.json` and `templates/styles/STYLE_INDEX.md`: built-in style IDs, aliases, routing rules, required files, and compatibility notes.
- `templates/styles/dark-diagnostic-hud/`: complete default style pack with tokens, theme, components, example, and agent prompt.
- `templates/styles/signal-desk-overlay/`: complete standard popup style pack with tokens, theme, component exports, example, and agent prompt.
- `templates/styles/precision-hud-cards/`: complete precision HUD variant pack with tokens, theme, components, example, and agent prompt.
- `templates/styles/diagnostic-glass-cards/`: complete frosted/diagnostic glass variant pack with tokens, theme, components, example, and agent prompt.
- `templates/styles/terminal-agent-hud/`: complete terminal/agent execution variant pack with tokens, theme, components, example, and agent prompt.
- `templates/remotion-overlay-kit/`: shared legacy-compatible Signal Desk overlay kit and examples. Use it as a supporting source when adapting standard popup components.

- `references/card-style-library.md`：当前 5 种内置风格族及变体使用条件。
- `references/dark-diagnostic-hud-style-system.md`：完整 Dark Diagnostic HUD token、布局语法、组件规则、动效语言和失败检查。
- `references/dark-diagnostic-hud-remotion-agent-prompt.md`：让 Agent 在 Remotion 中复刻该风格的实现提示。
- `references/visual-quality-system.md`：字体、层级、材质、安全区和 QA 的质量标准。
- `references/keyword-animation-effects.md`：按字幕关键词触发的动效选项。
- `templates/styles/style-index.json` 和 `templates/styles/STYLE_INDEX.md`：内置风格 ID、别名、路由规则、必需文件和兼容说明。
- `templates/styles/dark-diagnostic-hud/`：完整默认风格包，包含 tokens、theme、components、example 和 agent prompt。
- `templates/styles/signal-desk-overlay/`：完整标准弹窗风格包，包含 tokens、theme、component exports、example 和 agent prompt。
- `templates/styles/precision-hud-cards/`：完整精密 HUD 变体包，包含 tokens、theme、components、example 和 agent prompt。
- `templates/styles/diagnostic-glass-cards/`：完整诊断玻璃变体包，包含 tokens、theme、components、example 和 agent prompt。
- `templates/styles/terminal-agent-hud/`：完整终端 Agent 执行变体包，包含 tokens、theme、components、example 和 agent prompt。
- `templates/remotion-overlay-kit/`：兼容旧结构的 Signal Desk 共享组件包和示例；改造标准弹窗组件时作为辅助来源。

Style preservation rules:

风格保真规则：

- Do not rely on a short prose summary when the template or token file exists. Load the source file and reuse its values.
- Do not invent a new palette, border radius, typography scale, or entrance timing for a built-in style unless the approved plan explicitly overrides it.
- Before resolving a built-in style name, read `templates/styles/style-index.json` or `templates/styles/STYLE_INDEX.md`; use the canonical `id` and directory from the index.
- When implementing any built-in style, first load the matching `templates/styles/<style-name>/tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`.
- When maintaining or copying this skill, run `node scripts/verify-style-assets.mjs` after any change to `templates/styles/`, `SKILL.md`, or `README.md`.
- When implementing `Signal Desk Overlay`, use `templates/styles/signal-desk-overlay/` as the primary contract and `templates/remotion-overlay-kit/` as the shared component source.
- When implementing `Dark Diagnostic HUD`, use `templates/styles/dark-diagnostic-hud/`, `dark-diagnostic-hud-style-system.md`, and `card-style-library.md` as the contract.
- In `Dark Diagnostic HUD`, ordinary information cards must use continuous rounded rectangle borders from the bundled tokens: outer radius `14-18px`, inner/icon radius `10-12px`, and no corner-bracket/checkpoint frame unless the approved plan explicitly requests that harder HUD treatment.
- For every built-in style, preserve its `tokens.json.geometry` contract: card radius, inner/chip radius, border width, border style, and forbidden drift shapes. Do not borrow geometry from another style because that is what causes cross-project style drift.
- If a custom style is provided, treat it as an external brief for that task only; do not overwrite the built-in style fidelity assets.

- 有模板或 token 文件时，不要只凭简短文字总结实现；必须加载源文件并复用其中数值。
- 除非已确认方案明确覆盖，否则不要为内置风格发明新的配色、圆角、字号层级或入场时长。
- 解析内置风格名称前，先读取 `templates/styles/style-index.json` 或 `templates/styles/STYLE_INDEX.md`；使用索引中的标准 `id` 和目录。
- 实现任何内置风格时，先加载匹配的 `templates/styles/<style-name>/tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。
- 维护或复制本 skill 时，只要改过 `templates/styles/`、`SKILL.md` 或 `README.md`，都要运行 `node scripts/verify-style-assets.mjs`。
- 实现 `Signal Desk Overlay / 标准重点弹窗` 时，以 `templates/styles/signal-desk-overlay/` 为主契约，并把 `templates/remotion-overlay-kit/` 作为共享组件来源。
- 实现 `Dark Diagnostic HUD / 暗色诊断 HUD` 时，以 `templates/styles/dark-diagnostic-hud/`、`dark-diagnostic-hud-style-system.md` 和 `card-style-library.md` 为契约。
- `Dark Diagnostic HUD / 暗色诊断 HUD` 中，普通信息卡必须使用随附 token 中的连续圆角矩形描边：外圆角 `14-18px`，内部/图标圆角 `10-12px`；除非已确认方案明确要求硬 HUD 角标，否则不要使用 corner-bracket / checkpoint 外框。
- 每一种内置风格都必须保留自己的 `tokens.json.geometry` 几何契约：卡片圆角、内部/chip 圆角、描边宽度、描边样式和禁用跑偏形态。不要从其他风格借用几何形态，因为这会造成跨项目风格漂移。
- 用户提供自定义风格时，只作为当前任务的外部 brief，不覆盖内置风格保真资产。

## Dependency Bootstrap / 依赖自举

At the start of the workflow, check whether `$video-use` is available. If it is missing, reduce user setup friction by installing it automatically from its upstream repository:

流程开始时先检查 `$video-use` 是否可用。如果缺失，为降低用户使用成本，自动从上游仓库安装：

```bash
python3 ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py --repo browser-use/video-use --path . --name video-use
```

After installation:

安装后：

- Read the installed `video-use/install.md` only for general setup. Ignore any transcription-provider choice flow in that skill; this skill always uses local `faster-whisper`.
- Install or request only hard requirements that cannot be skipped, such as `ffmpeg`, `ffprobe`, Python 3.9+ dependencies, and `faster-whisper`.
- Never commit `.env`, local model caches, generated transcript files, or temporary audio extracts unless the user explicitly asks to version a specific artifact.
- If the current Codex session cannot dynamically load the newly installed skill, read the installed `video-use/SKILL.md` directly for this session and tell the user to restart Codex after the current workflow to pick up the skill normally.
- If GitHub access, network, package manager permissions, Python setup, `ffmpeg`, or `faster-whisper` setup fails, explain the exact missing requirement and ask the user only for that one unblocker.

- 读取已安装的 `video-use/install.md` 时，只参考通用安装步骤。忽略其中的转写服务选择流程；本 skill 始终使用本地 `faster-whisper`。
- 只安装或索取不能跳过的硬依赖，例如 `ffmpeg`、`ffprobe`、Python 3.9+ 依赖和 `faster-whisper`。
- 不提交 `.env`、本地模型缓存、生成的转写文件或临时音频提取文件，除非用户明确要求把某个产物纳入版本管理。
- 如果当前 Codex 会话不能动态加载新安装的 skill，本轮直接读取已安装的 `video-use/SKILL.md` 使用，并提醒用户当前流程结束后重启 Codex，以便后续正常识别。
- 如果 GitHub 访问、网络、包管理器权限、Python 环境、`ffmpeg` 或 `faster-whisper` 安装失败，只说明当前缺少的具体条件，并只向用户索取这一项阻塞信息。

## Local faster-whisper Transcription / 本地 faster-whisper 转写

Before any editing analysis, SRT generation, packaging timing work, or keyword cue extraction, use local `faster-whisper` automatically. Do not ask whether to use another transcription provider.

在任何剪辑分析、SRT 生成、包装时间轴设计或关键词 cue 提取之前，自动使用本地 `faster-whisper`。不要询问是否使用其他转写服务。

Required behavior:

必要行为：

1. Ensure `ffmpeg`, `ffprobe`, Python 3.9+, and `faster-whisper` are available. If missing, install only the missing hard requirement.
2. Prefer the Python API over shelling out to unrelated Whisper wrappers: create a `WhisperModel`, call `transcribe(..., word_timestamps=True, vad_filter=True)`, and consume the returned `segments` iterator before writing outputs.
3. Generate independent SRT by default. Do not burn subtitles into the video unless the user explicitly asks.
4. Store transcript text, segment timestamps, and word timestamps when available. Use word timestamps as the preferred source for cut boundaries, SRT timing, keyword animation timing, and subtitle-aligned packaging.
5. If word timestamps are unavailable for a specific run, use segment timestamps plus silence detection to estimate keyword triggers and mark cue confidence as `estimated`.

1. 确认 `ffmpeg`、`ffprobe`、Python 3.9+ 和 `faster-whisper` 可用。缺失时只安装缺失的硬依赖。
2. 优先使用 Python API，不要改走无关的 Whisper wrapper：创建 `WhisperModel`，调用 `transcribe(..., word_timestamps=True, vad_filter=True)`，并在写出产物前消费返回的 `segments` 迭代器。
3. 默认输出独立 SRT；除非用户明确要求，否则不烧录字幕。
4. 保存转写文本、分段时间戳和可用的词级时间戳。优先用词级时间戳作为剪辑边界、SRT 时间、关键词动画时间和字幕对齐包装的依据。
5. 如果某次运行无法产出词级时间戳，用分段时间戳配合静默检测估算关键词触发点，并把 cue 置信度标记为 `estimated`。

Minimal install command:

最小安装命令：

```bash
pip install -U faster-whisper
```

## Packaging Timing Bundle / 包装时间包

Before any packaging design, normalize the final edited video, subtitles, transcript, timestamps, and edit decisions into one packaging timing bundle. This rule applies whether the video came from a `$video-use` fine cut or from an already-edited video provided by the user.

进入任何包装设计前，必须把最终剪辑视频、字幕、转写文本、时间戳和剪辑决策统一整理成一个包装时间包。无论视频来自 `$video-use` 精剪，还是用户直接提供的剪辑成片，都适用这条规则。

The bundle must include:

时间包必须包含：

- `edited_video_path`: the final edited video used for packaging.
- `srt_path`: independent SRT path. Generate one by default and do not burn subtitles into the video.
- `transcript_text` or `transcript_path`: transcript text matched to the final edited video.
- `transcription_provider`: always `faster-whisper`.
- `word_timestamps_path`: required when `faster-whisper` emits word-level timestamps. If a run cannot emit word timestamps, set this to `none` and mark affected keyword cues as `estimated`.
- `segment_timestamps_path`: required for every `faster-whisper` run.
- `keyword_cues_path`: required for packaging. It must list each selected subtitle keyword, its subtitle line, trigger time, timing source, and confidence.
- `edl_path`: edit decision file when available. If the user provided an already-edited video and no EDL exists, set this to `none`.
- `asset_manifest_path`: required by default for packaging. Build it from the current Codex project/workspace files, plus any extra asset paths explicitly provided by the user. Do not scan the uploaded video's source folder or parent directory for assets unless the user explicitly designates that folder as an asset source. The manifest must list each asset path, source root, filename stem, filename-token aliases, dimensions, transparency, and suggested use. Do not OCR, classify, or infer meaning from the asset image content for matching.
- `gesture_cues_path`: required before packaging design when the video contains detectable pointing, dragging, swiping, circling, drawing, or line-marking gestures, or when the user requests gesture-aware placement. It must list each gesture's time range, hand/gesture position, direction, target area, and confidence.

- `edited_video_path`：用于包装的最终剪辑视频。
- `srt_path`：独立 SRT 路径。默认生成，不烧录进视频。
- `transcript_text` 或 `transcript_path`：与最终剪辑视频匹配的转写文本。
- `transcription_provider`：始终为 `faster-whisper`。
- `word_timestamps_path`：`faster-whisper` 产出词级时间戳时必须提供。如果某次运行无法产出词级时间戳，写 `none`，并把受影响的关键词 cue 标记为 `estimated`。
- `segment_timestamps_path`：每次 `faster-whisper` 转写都必须提供。
- `keyword_cues_path`：包装阶段必须提供。它要列出每个选中的字幕关键词、所属字幕行、触发时间、时间来源和置信度。
- `edl_path`：有剪辑决策文件时填写；如果用户提供的是已经剪辑好的视频且没有 EDL，写 `none`。
- `asset_manifest_path`：默认必须生成。素材来源是当前 Codex 项目/工作区文件，以及用户明确额外指定的素材路径。不要自动扫描用户上传视频所在的素材文件夹或父目录，除非用户明确把该目录指定为素材来源。清单要列出每个素材路径、来源根目录、文件名主干、文件名分词别名、尺寸、是否透明和建议用途。匹配时不要 OCR、不要分类、不要根据素材图片内容推断含义。
- `gesture_cues_path`：进入包装设计前生成；当视频中存在可检测的指、拖、划、圈选、画线等手势，或用户要求手势感知放置时必须提供。它要列出每个手势的时间范围、手部/手势位置、方向、目标区域和置信度。

If `$video-use` produced a fine cut, reuse cached transcript/SRT/timestamp artifacts only when they match the final edited video. If they were generated from the raw source or from an earlier preview, regenerate or normalize timing artifacts from the final edited video before packaging design.

如果 `$video-use` 产出了精剪成片，只有在缓存的转写、SRT、时间戳产物与最终剪辑视频一致时才复用。若这些产物来自原始素材或早期预览版本，进入包装设计前必须基于最终剪辑视频重新生成或归一化时间产物。

If the user provides an already-edited video, still run `faster-whisper` before packaging design unless the user provides both a usable SRT and verified word-level timestamps. A user-provided SRT can be used as subtitle text and base timing, but it is not a replacement for word-level keyword timing. When verified word-level timestamps are missing, run `faster-whisper` on the edited video and use its word timestamps for keyword animation when available.

如果用户提供的是已经剪辑好的视频，进入包装设计前仍要运行 `faster-whisper` 生成时间产物，除非用户同时提供可用 SRT 和已验证的词级时间戳。用户上传的 SRT 可以作为字幕文本和基础时间，但不能替代关键词动画所需的词级时间。缺少已验证词级时间戳时，对剪辑成片运行 `faster-whisper`，并优先使用它产出的词级时间戳驱动关键词动效。

Save the normalized bundle as `timing/<video-name>-packaging-timing.json` or `packaging-timing-<video-name>.json`, then pass this bundle to `$video-use`. `$video-use` must design packaging from the bundle instead of ad hoc transcript, SRT, or EDL paths.

将归一化后的时间包保存为 `timing/<video-name>-packaging-timing.json` 或 `packaging-timing-<video-name>.json`，然后交给 `$video-use`。`$video-use` 必须基于这个时间包做包装方案，不要临时拼接零散的转写、SRT 或 EDL 路径。

Packaging animations must be anchored to subtitle keyword cue points, but the design must be grouped by semantic beats, clauses, or information groups instead of blindly cutting a new segment for every word. Prefer exact word-level keyword start times from `word_timestamps_path` for entrance or emphasis timing. If only segment-level `faster-whisper` timing is available, estimate the keyword trigger inside the matching subtitle segment by text position and nearby silence/speech energy, then mark the cue confidence as estimated. Do not trigger effects only from evenly divided scene times or generic segment start times unless the segment has no usable keyword; in that case write `triggerKeyword: none` and explain why. Do not dismiss or exit a related card just because the next related keyword appears; keep related cards visible until the sentence, clause, list, comparison, or workflow step is semantically complete.

包装动效必须锚定字幕关键词落点，但设计分段要按语义节奏、从句或信息组来判断，不要机械地每个词都切一个新段。优先使用 `word_timestamps_path` 中精确的词级关键词开始时间作为入场或强调时间。如果只有 `faster-whisper` 分段时间，则根据关键词在字幕文本中的位置和附近静默/语音能量，在对应字幕段内估算触发点，并把 cue 置信度标记为 estimated。不要只按均分场景时间或泛泛的段落开始时间触发动效；除非该段没有可用关键词，此时必须写 `triggerKeyword: none` 并说明原因。不要因为下一个相关关键词出现，就让前一个相关卡片立即退场；相关卡片应保留到句子、从句、清单、对比或工作流步骤语义完成后再退场。

By default, search the current Codex project/workspace for packaging assets before designing overlays. Include common image and element formats such as `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg`, `.gif`, `.json` animation data, and clearly named asset folders. Exclude dependency/build/cache folders such as `node_modules`, `.git`, `dist`, `build`, `.next`, `out`, `exports`, and rendered video output folders. Do not search inside the uploaded video's project/source folder just because the video came from there. Match discovered assets to subtitle keywords by comparing only asset filenames, filename stems, path segment names, and filename-token aliases using exact and fuzzy matching. Do not inspect image contents, do not OCR visible text, and do not classify the image subject for matching. If an asset name is identical or semantically similar to a subtitle keyword or phrase, show that asset at the keyword cue time unless it would block the face, mouth, subtitles, or the approved style. If multiple assets match, choose the most specific filename match and record the reason. If no filename match exists, continue with generated cards.

默认在当前 Codex 项目/工作区中搜索包装素材，再进入包装设计。纳入 `.png`、`.jpg`、`.jpeg`、`.webp`、`.svg`、`.gif`、`.json` 动画数据和命名清晰的素材目录。排除 `node_modules`、`.git`、`dist`、`build`、`.next`、`out`、`exports`、渲染输出目录等依赖/构建/缓存目录。不要因为视频来自某个文件夹，就自动扫描用户上传视频所在的项目/素材文件夹。只用素材文件名、文件名主干、路径片段名称和文件名分词别名与字幕关键词做精确匹配和模糊匹配。不要理解图片内容，不要 OCR 可见文字，不要根据图片主体类别做匹配。若素材名称与字幕关键词或短语相同或语义相近，在该关键词落点展示这个素材，除非会挡脸、挡嘴、挡字幕或破坏已确认风格。多个素材都匹配时，选择文件名最具体的那个，并记录原因。没有文件名匹配素材时，继续使用生成卡片。

Before packaging design, inspect the final video for pointing, dragging, swiping, circling, drawing-line, or line-marking gestures and write the results into `gesture_cues_path`. Pass those gesture cues into `$video-use` together with subtitle keyword cues and the asset manifest. When a gesture is detected near an asset or animation cue, use the gesture position as the preferred placement anchor. Place the image or animation near the fingertip/gesture path endpoint or along the drawn path, offset enough to keep the hand and face visible. If gesture placement conflicts with face/mouth/subtitle safety, choose the nearest safe adjacent zone and record the offset decision.

进入包装设计前，必须先检查最终视频中是否有指、拖、划、圈选、画线等手势，并把结果写入 `gesture_cues_path`。将这些手势 cue 与字幕关键词 cue、素材清单一起交给 `$video-use`。当素材或动效 cue 附近检测到手势时，优先把手势位置作为放置锚点。图片或动画应出现在指尖、手势路径终点附近，或沿着画线路径出现，并保留足够偏移避免挡手和脸。如果手势位置与脸、嘴或字幕安全区冲突，选择最近的安全邻近区域，并记录偏移原因。

## Workflow / 流程

### 1. Prepare Local Transcription / 准备本地转写

Use local `faster-whisper` as the fixed transcription path. Do not ask the user to choose between transcription providers.

固定使用本地 `faster-whisper` 作为转写路径。不要让用户在多个转写服务之间选择。

- If `faster-whisper` is installed, use it directly for editing analysis, SRT generation, packaging timing, and keyword animation timing.
- If it is missing, install it in the current project or workflow environment before transcription. Ask the user only if package installation or model download is blocked.

- 如果已经安装 `faster-whisper`，直接用于剪辑分析、SRT 生成、包装时间轴和关键词动画时间。
- 如果缺失，先在当前项目或流程环境中安装。只有包安装或模型下载被阻塞时，才向用户索取这一项阻塞信息。

Keep this provider fixed for the full workflow.

整个流程都保持这个固定转写方案。

### 2. Ask Whether Editing Is Needed / 询问是否需要剪辑

Start by asking whether the user needs the raw footage edited.

先问用户是否需要对原始素材进行剪辑。

- If yes: ask only for the source video folder, then use the fine-cut plan below by default. Do not ask whether to use a normal edit plan. Invoke `$video-use` to inspect, transcribe, propose the fine-cut strategy, wait for confirmation when required by `video-use`, and produce the edited video or edit preview according to `video-use` rules.
- If no: ask the user to provide the already-edited video file.

- 如果需要：只先让用户提供需要剪辑的视频文件夹，然后默认使用下面的精剪方案。不要再询问普通剪辑还是精剪。调用 `$video-use` 检查素材、转写、提出精剪策略，按 `video-use` 需要等待确认，并按 `video-use` 规则产出剪辑版本或预览。
- 如果不需要：让用户提供已经剪辑好的视频文件。

Do not proceed without a concrete video asset from one of these branches.

没有拿到明确的视频文件前，不进入后续步骤。

#### Fine-Cut Plan / 精剪方案

When the user needs editing, use this fine-cut plan by default and give `$video-use` this intent:

用户需要剪辑时，默认使用此精剪方案，并把下面意图交给 `$video-use` 执行：

Goal: remove poorly delivered parts and keep the smoothest, most final-version-like expression.

目标：把讲得不好的地方去掉，保留表达最顺畅、最像最终版本的内容。

Preferences:

偏好：

1. For repeated takes, stumbles, trial runs, and restarts, delete earlier attempts by default and keep the last smooth version.
2. Remove obvious fillers and broken starts such as "嗯", "呃", "就是", half-sentences, restarted openings, and corrected mistakes when possible.
3. Do not only cut interruptions. Also inspect retained paragraphs for silence, breath gaps, waiting feel, and dead air.
4. If two sentences have obvious blank space, breath, or pause between them, shorten the gap.
5. Do not over-tighten. Preserve enough breathing room so the result does not feel mechanical.

1. 重复、卡壳、试讲、说到一半重来的地方，默认删掉前面几遍，保留最后一次讲顺的版本。
2. 明显的“嗯、呃、就是”、半句话、重新起头、说错重来，尽量删掉。
3. 不要只剪打断；保留下来的每个段落内部也要检查静默、气口、等待感。
4. 两句话之间如有明显空白、呼吸、停顿，就压短。
5. 不要剪得太紧，不要变成没有呼吸的机器感。

Fine-cut output requirements:

精剪输出要求：

1. Never overwrite the original video.
2. Keep `video-use` working artifacts and edit decisions in the normal `<videos_dir>/edit/` workspace.
3. Export or copy the fine-cut deliverable to the source video's directory as `<素材名称>_video-use精剪.<ext>`.
4. Preserve the edit decision file, such as `edl.json`, and any project notes generated by `$video-use`.
5. After rendering, run silence detection once to check for obvious mistakes, long blanks, or unexpected dead air. Fix clear issues before moving on.

1. 不覆盖原始视频。
2. `video-use` 工作文件和剪辑决策文件仍保留在标准 `<videos_dir>/edit/` 工作区。
3. 精剪成片导出或复制到素材同目录，命名为 `<素材名称>_video-use精剪.<ext>`。
4. 保留剪辑决策文件，例如 `edl.json`，以及 `$video-use` 生成的项目记录。
5. 渲染后跑一次静默检测，检查有没有明显错误、长空白或异常等待；发现明确问题先修正再进入后续步骤。

#### Post-Edit Handoff / 精剪后交接

After a fine-cut render passes verification, do not stop at "fine cut complete." Reply with the edited file path, the key verification results, and the next workflow action.

精剪渲染并通过检查后，不要停在“精剪完成”。必须回复剪辑后文件路径、关键检查结果，以及下一步流程动作。

Use this handoff shape:

使用下面这种交接格式：

```text
精剪完成，未覆盖原片。
输出文件：<edited-video-path>
检查结果：<duration / resolution / audio / silence check summary>

下一步进入视觉包装流程：
1. 我会基于这条精剪视频生成独立 SRT，默认不烧录字幕。
2. 接下来只需要先确认是否继续做视觉包装。

请确认：继续做视觉包装吗？
```

If the user confirms packaging, continue with the next single required decision. If the user already selected a style earlier, skip the style question and ask for approval to generate the packaging motion design draft from the edited video, transcript/SRT, EDL, selected style, and keyword-animation reference.

如果用户确认继续包装，再进入下一个单独的必要决策。如果用户前面已经确认过风格，不要重复询问风格；直接询问是否基于剪辑后视频、转写/SRT、EDL、已选风格和关键词动效参考生成包装动效设计稿。

Before asking for packaging approval, create or update the packaging timing bundle from the final fine-cut video, including gesture cues when detectable. The next-step handoff should refer to this bundle rather than separate transcript, SRT, EDL, or gesture files.

询问是否进入包装方案前，先基于最终精剪视频创建或更新时间包，并在可检测到手势时一并生成手势 cue。下一步交接时应引用这个时间包，而不是零散引用转写、SRT、EDL 或手势文件。

### 3. Ask About Custom Style / 询问是否自定义风格

After receiving the edited video, ask whether the user wants a custom visual style.

拿到剪辑好视频后，询问用户是否需要自定义视觉风格。

- If yes: next ask one separate question about the custom style source type: style Markdown or reference image(s). After the user chooses that source type, ask for the matching file or path.
- If no: use the project/default `DESIGN.md`. If no usable `DESIGN.md` exists, read `references/default-design.md` from this skill and use `Dark Diagnostic HUD` as the default visual style brief.
- Use current Codex project/workspace assets by default for packaging. Scan the current Codex project files for images, logos, UI screenshots, product pictures, transparent PNGs, icons, stickers, or element folders, then build the asset manifest. Do not ask about extra asset paths or disabling project-asset matching unless the user mentions assets or the current step cannot continue without that answer.
- Do not use the uploaded video's source folder as the default asset search root. If the edited video is outside the current Codex project, treat it only as the video input, not as an asset directory.

- 如果需要：下一步只单独询问自定义风格来源类型：风格 Markdown 或参考图片。用户选定来源类型后，再索取对应文件或路径。
- 如果不需要：使用项目或默认的 `DESIGN.md`。如果没有可用的 `DESIGN.md`，读取本 skill 的 `references/default-design.md`，并使用 `Dark Diagnostic HUD / 暗色诊断 HUD` 作为默认视觉风格简报。
- 默认使用当前 Codex 项目/工作区里的素材做包装。扫描当前 Codex 项目文件中的图片、logo、UI 截图、产品图、透明 PNG、图标、贴纸或元素文件夹，并生成素材清单。不要主动询问是否补充额外素材路径或关闭项目素材匹配，除非用户提到素材，或当前步骤缺少该答案无法继续。
- 不要把用户上传视频所在的源文件夹作为默认素材搜索根目录。如果剪辑视频在当前 Codex 项目之外，只把它当作视频输入，不把其所在目录当素材目录。

Read the selected style source before designing packaging. Carry forward hard constraints such as safe zones, colors, typography, and forbidden transitions.

设计包装前必须先读取所选风格来源。要继承安全区、颜色、字体、禁用转场等硬约束。

If the user provides reference image(s), inspect the image(s) first and extract a concise style brief before packaging design. The extracted brief must cover: layout pattern, card shape and border style, typography feel, color palette, glow/shadow treatment, icon elements, density, safe-zone implications, motion assumptions, and what not to copy if it would block faces, mouths, or subtitles.

如果用户提供参考图片，必须先观察图片并提取精简风格 brief，再进入包装设计。提取出的 brief 必须包含：布局模式、卡片形状和描边样式、字体气质、配色、发光/阴影处理、图标元素、信息密度、安全区影响、动效假设，以及哪些元素如果会挡脸、挡嘴或挡字幕就不要照搬。

If a reference image file name contains `github`, or the image visibly contains a GitHub mark, repository path, `owner / repo` pattern, public/private badge, or language bar, extract a GitHub repository card pattern from it. The extracted pattern must include: user/organization name, project name, project function, visibility badge when visible, language list with percentages when visible, and the card's visual treatment. When a later subtitle keyword or user-provided asset matches `github`, `repo`, `仓库`, `项目`, `开源`, a repository name, or a tool name from that card, generate a `GitHubRepoCard` instead of a generic card.

如果参考图片文件名包含 `github`，或图片中明显出现 GitHub 标识、仓库路径、`用户名 / 项目名` 结构、Public/Private 标记、语言占比条等信息，必须从中提取 GitHub 项目卡片模式。提取内容必须包括：用户名/组织名、项目名、项目功能、可见的公开/私有标记、可见的语言列表和占比，以及卡片视觉处理方式。后续字幕关键词或用户素材匹配到 `github`、`repo`、`仓库`、`项目`、`开源`、仓库名或卡片中的工具名时，优先生成 `GitHubRepoCard`，不要退化成普通卡片。

Before packaging design, build an asset manifest from the current Codex project/workspace and any user-specified extra asset paths, then inspect the final video for gesture cues. For images, inspect only the file name, path segment names, dimensions, and alpha channel/transparent background. Add aliases only from filename tokens and user-explicit asset names. Do not inspect image contents, do not OCR visible text, and do not infer rough subject, product type, or semantic meaning from the pixels. Do not treat these assets as style references unless the user explicitly says so.

进入包装设计前，必须基于当前 Codex 项目/工作区和用户明确补充的素材路径建立素材清单，然后检查最终视频中的手势 cue。对图片只检查文件名、路径片段名称、尺寸、透明通道/透明背景。别名只来自文件名分词和用户明确提供的素材名称。不要理解图片内容，不要 OCR 可见文字，不要根据像素推断主体、产品类型或语义。除非用户明确说明，否则不要把这些素材当作风格参考图。

When a discovered or user-specified content asset file name contains `github`, create a `githubRepoCard` entry only from filename tokens or user-provided metadata. Do not inspect the asset image content to extract repository data. If filename/metadata contains enough information, add `owner`, `repo`, `function`, `visibility`, `languages`, `languagePercents`, `matchedKeywords`, and `sourceImage`; otherwise keep missing fields as `unknown` for the design draft to fill manually or omit.

当扫描发现或用户明确指定的内容素材文件名包含 `github` 时，只能从文件名分词或用户提供的元数据建立 `githubRepoCard` 条目。不要理解素材图片内容来提取仓库信息。如果文件名/元数据足够，填写 `owner`、`repo`、`function`、`visibility`、`languages`、`languagePercents`、`matchedKeywords` 和 `sourceImage`；否则缺失字段写 `unknown`，留给设计稿手动补充或省略。

After reading a style Markdown or extracting a brief from reference image(s), pass the hard constraints and visual direction into `$video-use` as part of the packaging-design brief. If no stronger custom style is provided, pass `references/card-style-library.md` as the unified default card-polish and material-quality reference. Always pass the current-project asset manifest and matching rule unless the user explicitly disables asset matching. The packaging plan must be designed by `$video-use` from the edited video, transcript text, EDL, SRT/timestamps, selected style Markdown or extracted image-style brief, asset manifest, gesture cues, card style library, and keyword-animation reference together. The main agent must not bypass `$video-use` and draft the packaging plan by itself.

读取风格 Markdown 或从参考图片提取 brief 后，必须把其中的硬约束和视觉方向作为包装设计 brief 交给 `$video-use`。如果用户没有提供更强的自定义风格，把 `references/card-style-library.md` 作为统一的默认卡片质感和材质质量参考。除非用户明确关闭素材匹配，否则始终把当前项目素材清单和匹配规则一起放进 brief。包装方案必须由 `$video-use` 基于剪辑后视频、转写文本、EDL、SRT/时间戳、所选风格 Markdown 或图片风格提取 brief、素材清单、手势 cue、卡片风格库，以及关键词动效参考一起设计。主 Agent 不得绕过 `$video-use` 自行产出包装方案。

Default style brief when `DESIGN.md` is missing: read `references/default-design.md` completely before packaging design.

缺少 `DESIGN.md` 时的默认风格简报：进入包装设计前，完整读取 `references/default-design.md`。

### 4. Design The Packaging Plan Only / 只设计包装方案

Use `$video-use` to analyze the edited video and align visual packaging to the transcript/subtitle content. This step must not render, modify, or overwrite the source video.

使用 `$video-use` 分析剪辑后的视频，并把视觉包装与字幕/文案内容对齐。此步骤不得渲染、不得修改、不得覆盖原视频。

The main agent's role in this step is to prepare inputs for `$video-use`, including the packaging timing bundle, selected style Markdown or extracted image-style brief, asset manifest when available, gesture cues when detectable, `references/visual-quality-system.md`, and the keyword-animation reference. Gesture cue extraction belongs before this packaging-design call, not after it. Verify that the bundle exists and points to the final edited video before asking `$video-use` for a plan. `$video-use` must return the packaging motion design draft. The main agent may summarize or relay that draft to the user, but must not replace it with a self-authored packaging plan.

此步骤中，主 Agent 的职责是为 `$video-use` 准备输入，包括包装时间包、已选择的风格 Markdown 或图片风格提取 brief、可用素材清单、可检测到的手势 cue、`references/visual-quality-system.md`，以及关键词动效参考。手势 cue 提取属于包装方案设计前置步骤，不是设计后再补。请求 `$video-use` 出方案前，必须确认时间包存在，并且指向最终剪辑视频。包装动效设计稿必须由 `$video-use` 返回。主 Agent 可以整理或转述该设计稿给用户，但不得用自己另写的包装方案替代它。

Before drafting the packaging plan, read `references/visual-quality-system.md`, `references/card-style-library.md`, `references/keyword-animation-effects.md`, `references/dark-diagnostic-hud-style-system.md`, `references/dark-diagnostic-hud-remotion-agent-prompt.md`, and `templates/styles/style-index.json` or `templates/styles/STYLE_INDEX.md`. Resolve the canonical style `id` from the index. Then read the matching complete style pack under `templates/styles/<style-name>/`, including `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md`. The default built-in style is `Dark Diagnostic HUD`, mapped to `templates/styles/dark-diagnostic-hud/`. The built-in variants map to `templates/styles/signal-desk-overlay/`, `templates/styles/precision-hud-cards/`, `templates/styles/diagnostic-glass-cards/`, and `templates/styles/terminal-agent-hud/`. Use a variant only when the user explicitly requests it or the approved design draft names it. A user-provided Markdown style or reference image may still be used as an explicit external custom style for that task.

设计包装方案前，先读取 `references/visual-quality-system.md`、`references/card-style-library.md`、`references/keyword-animation-effects.md`、`references/dark-diagnostic-hud-style-system.md`、`references/dark-diagnostic-hud-remotion-agent-prompt.md`，以及 `templates/styles/style-index.json` 或 `templates/styles/STYLE_INDEX.md`。先从索引解析标准风格 `id`。然后读取 `templates/styles/<style-name>/` 下匹配的完整风格包，包括 `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md`。默认内置风格是 `Dark Diagnostic HUD / 暗色诊断 HUD`，对应 `templates/styles/dark-diagnostic-hud/`。内置变体分别对应 `templates/styles/signal-desk-overlay/`、`templates/styles/precision-hud-cards/`、`templates/styles/diagnostic-glass-cards/` 和 `templates/styles/terminal-agent-hud/`。只有用户明确要求或已确认设计稿指定时才使用变体。用户提供的风格 Markdown 或参考图片仍可作为该任务的外部自定义风格使用。

The design draft must include, for every animation segment:

每一段动效设计稿都必须包含：

- Time node: start and end time.
- Trigger keyword cue: exact subtitle keyword, cue time, timing source, and confidence.
- On-screen text: exact visible words, keywords, cards, labels, or captions.
- Animation effect: entrance, hold/idle, emphasis, exit or handoff.
- Motion details: direction, speed feel, easing, stagger, highlight timing.
- Layout: safe zone, face/mouth avoidance, subtitle-safe area, layer order.
- Visual style: colors, font/weight, card style, glow, borders, hierarchy.
- Card material: glass layer, dark gradient, semantic border, inner/outer shadow, icon container, and highlight treatment.
- Matched asset: asset path/name, match source, match confidence, or `none`.
- Gesture anchor: gesture type, position/region, placement decision, or `none`.
- Applied style constraints: cite the specific constraints from the selected style Markdown or extracted image-style brief that shaped this segment.
- Style asset source: cite the exact bundled reference or template files used for this segment, such as `card-style-library.md`, `dark-diagnostic-hud-style-system.md`, or `templates/styles/dark-diagnostic-hud/theme.ts`.
- Typography: exact `fontFamily`, weight, size range, line height, and fallback.
- Component: one component from `references/visual-quality-system.md`, such as `KeywordChip`, `TerminalCard`, or `StepListCard`.
- Quality risk: state whether this segment may block face, mouth, subtitles, become too dense, or suffer font fallback.
- Semantic group lifecycle: state whether this segment starts, updates, coexists with, or exits an information group, and when related cards should remain visible together.

- 时间节点：开始和结束时间。
- 触发关键词落点：准确的字幕关键词、cue 时间、时间来源和置信度。
- 画面文字：屏幕上实际出现的文字、关键词、卡片、标签或字幕。
- 动画效果：入场、待机、重点强调、退场或交接。
- 运动细节：方向、速度感、缓动、错峰、重点高亮时间；如果包含连线/箭头/path，必须说明光点如何沿实际生成的 SVG/path 轨迹运动。
- 布局：安全区、不挡脸不挡嘴、字幕安全区、层级顺序。
- 视觉风格：颜色、字体/字重、卡片样式、发光、边框、层级。
- 卡片材质：玻璃层、暗色渐变、语义描边、内外阴影、图标容器和高光处理。
- 匹配素材：素材路径/名称、匹配来源、匹配置信度，或写 `none`。
- 手势锚点：手势类型、位置/区域、放置决策，或写 `none`。
- 已应用的风格约束：说明该段具体采用了所选风格 Markdown 或图片风格提取 brief 中的哪些约束。
- 风格资产来源：说明该段使用了哪些随 skill 打包的 reference 或 template 文件，例如 `card-style-library.md`、`dark-diagnostic-hud-style-system.md` 或 `templates/styles/dark-diagnostic-hud/theme.ts`。
- 字体：具体 `fontFamily`、字重、字号区间、行高和 fallback。
- 组件：从 `references/visual-quality-system.md` 选择一个组件，例如 `KeywordChip`、`TerminalCard` 或 `StepListCard`。
- 质量风险：说明该段是否可能挡脸、挡嘴、挡字幕、信息过密或字体 fallback。
- 语义组生命周期：说明该段是在开始、更新、共存还是结束一个信息组，以及相关卡片应共存到什么时候。

The packaging motion design draft must use this exact Markdown block format. Do not replace it with a table, a loose paragraph, or a general style summary:

包装动效设计稿必须使用下面这种 Markdown 分段格式。不得用表格、散文段落或泛泛的风格总结替代：

```text
包装动效方案

0.00-1.55s
触发关键词：GPT 5.6 @ 0.34s，source=word_timestamps，confidence=exact
画面文字：GPT 5.6、发布
动效：左上角模式标题卡从左滑入，GPT 5.6 关键词轻微 pop，发布 标签短促点亮后收起。
运动：ease-out，关键元素错峰进入；如无独立运动细节，写“同动效描述”。
布局：左上三分区，不碰脸部；层级在人物前但低视觉权重。
卡片材质：黑色半透明玻璃底 + 深色渐变 + 蓝色语义描边 + 弱外发光 + 内阴影 + 左侧图标容器。
匹配素材：none。
手势锚点：none。
已应用的风格约束：引用所选风格 Markdown 或图片风格提取 brief 中实际采用的颜色、字体、卡片、安全区或禁用项。
风格资产来源：references/dark-diagnostic-hud-style-system.md + references/card-style-library.md。
字体：Source Han Sans Heavy / Inter Black，56-72px，line-height 0.96，fallback PingFang SC Heavy。
组件：HudSectionLabel + DiagnosticPanel。
质量风险：注意不要变成整句大字；标题卡不得压到脸部或字幕区。
语义组生命周期：开始“发布信息”组；本卡保留到 1.55s，与下一段模式芯片不重叠。

1.55-3.20s
触发关键词：推理模式 @ 1.82s，source=word_timestamps，confidence=exact
画面文字：2 种推理模式
动效：两枚模式芯片从标题卡下方 stagger 弹出，先显示空芯片，再填入 Max / Ultra 轮廓。
运动：ease-out，芯片间 4 帧错峰，边框青色脉冲一次。
布局：左侧中上，保留下方字幕区。
卡片材质：每枚芯片使用半哑光深色底、1px 语义色渐变描边、内侧暗角和图标弱发光，禁止纯色扁平矩形。
匹配素材：assets/max-mode.png，source=filename+keyword，confidence=fuzzy；在“Max”关键词 cue 时显示为小图标贴片。
手势锚点：pointing-right @ upper-left-safe-zone，confidence=estimated；贴片放在指向终点右侧 32px，避开手部。
已应用的风格约束：引用所选风格 Markdown 或图片风格提取 brief 中实际采用的约束。
风格资产来源：references/dark-diagnostic-hud-style-system.md + references/visual-quality-system.md。
字体：Inter ExtraBold / PingFang SC Semibold，28-36px，line-height 1.18。
组件：DiagnosticPanel + StatusChip。
质量风险：两枚芯片不要同时遮挡人物手势；边框发光不能过曝。
语义组生命周期：开始“模式说明”组；两枚芯片在同一组内共存到 3.20s，再一起收纳或退场。

3.20-4.60s
触发关键词：开源仓库 @ 3.42s，source=word_timestamps，confidence=exact
画面文字：code-wahaha / traffic-compass、抖音发布前、AI 合规自查 + 流量潜力评分、Python 68%、HTML 22%、CSS 10%
动效：GitHub 项目卡片从手势指向侧滑入，owner 白色、repo 语义绿色高亮，Public badge 弹出，语言占比条从左到右增长。
运动：ease-out，卡片入场 10 帧，项目名 4 帧后高亮，语言条 14 帧内依次增长。
布局：放在人物指向位置附近或右侧安全区，不挡脸、嘴、字幕；语言条保持在卡片底部。
卡片材质：深色半透明卡片 + 绿色语义描边 + GitHub 线性图标 + 弱外发光 + 内阴影。
匹配素材：assets/github-code-wahaha-traffic-compass-python68-html22-css10.png，source=filename，confidence=exact；按文件名解析为 GitHubRepoCard。
手势锚点：pointing/right-drag @ right-safe-zone，confidence=estimated；卡片放在指尖终点外侧 32px。
已应用的风格约束：使用参考图中的深色卡片、owner/repo 标题结构、Public badge 和语言占比条；不复制会挡脸的大尺寸。
风格资产来源：references/dark-diagnostic-hud-style-system.md + references/card-style-library.md。
字体：Inter Black / Source Han Sans Heavy，title 34-44px，meta 22-28px，mono/language 20-26px。
组件：GitHubRepoCard。
质量风险：语言条不能做成整条视频进度条；只表示项目语言占比。
语义组生命周期：开始“仓库说明”组；GitHub 卡保持到该句结束，如果后续还在解释同一仓库，则继续保留并只更新高亮。
```

Each segment must start with a precise `start-end` time range and must include `触发关键词`、`画面文字`、`动效`、`运动`、`布局`、`卡片材质`、`匹配素材`、`手势锚点`、`已应用的风格约束`、`风格资产来源`、`字体`、`组件`、`质量风险`、`语义组生命周期`. If a segment has no visible overlay, write `画面文字：无` and explain why no overlay should appear. The visible text must be short and concrete; do not use full transcript sentences as on-screen overlay text unless the user explicitly requests it. If a matching asset exists, the plan must either use it or explicitly explain why it is not used. If a GitHub repository reference image or asset matches the cue, use `GitHubRepoCard` and include owner, project name, project function, and languages. If two or more cards explain the same clause, comparison, list, or workflow, the plan must keep them on screen together until the semantic group finishes, then exit or compress them as a group.

每个段落必须以精确的 `开始-结束` 时间范围开头，并且必须包含 `触发关键词`、`画面文字`、`动效`、`运动`、`布局`、`卡片材质`、`匹配素材`、`手势锚点`、`已应用的风格约束`、`风格资产来源`、`字体`、`组件`、`质量风险`、`语义组生命周期`。如果某段不应出现包装元素，写 `画面文字：无` 并说明不出现动效的原因。画面文字必须短而具体；除非用户明确要求，不要把完整口播句子直接作为包装大字。如果存在匹配素材，方案必须使用它，或明确说明为什么不用。如果 GitHub 仓库参考图或素材匹配到当前 cue，必须使用 `GitHubRepoCard`，并包含用户名、项目名、项目功能和语言。如果两张或多张卡片解释同一个从句、对比、清单或工作流，方案必须让它们共存到该语义组结束，再作为一组退场或收纳。

Present the draft to the user and wait for approval. Do not implement Remotion before approval.

把设计稿发给用户确认。用户未确认前，不进入 Remotion 实现。

### 5. Implement Remotion + GSAP Preview / 实现 Remotion + GSAP 预览

After approval, create a new Remotion project for the video packaging. Do not modify an existing Remotion project, source/reference video, reference image, `references/` file, `templates/` file, or bundled style asset unless the user explicitly asks to edit that exact artifact.

用户确认后，新建一个 Remotion 项目来实现视频包装。不要修改已有 Remotion 项目、源视频/参考视频、参考图片、`references/` 文件、`templates/` 文件或随 skill 打包的风格资产，除非用户明确要求编辑那个具体文件。

Implementation requirements:

实现要求：

- Use Remotion for composition structure, video placement, timeline, Studio, and export.
- Use GSAP for animation easing/timeline calculations or element motion logic.
- Use the approved packaging plan as the source of truth.
- Always create a fresh Remotion project directory for the approved packaging implementation. Prefer `<video-name>-remotion-packaging/`; if that path already exists, create a unique sibling such as `<video-name>-remotion-packaging-YYYYMMDD-HHMMSS/`. Do not reuse or patch an existing Remotion project by default.
- Treat style references, user reference images, original videos, edited input videos, and bundled templates as read-only inputs. Copy only the needed assets into the new Remotion project, then adapt the copies.
- Before writing new overlay components, resolve the built-in style through `templates/styles/style-index.json`, then copy or adapt the bundled implementation assets from the matching `templates/styles/<style-name>/` directory. Keep `tokens.json`, `theme.ts`, `components.tsx`, `example.tsx`, and `agent-prompt.md` together so spacing, radius, shadows, typography, and timing stay consistent.
- When implementing inside another project, copy the full read-only style contract described in `references/external-project-style-contract.md` into that project before generating Remotion scenes. Do not paste only the prompt, and do not recreate a style from words like `HUD`, `glass`, or `popup`.
- Drive overlay entrances, highlights, bounces, clicks, card collisions, and exits from the approved subtitle keyword cue times. Convert cue seconds to Remotion frames and use those frames as animation anchors.
- Preserve the approved semantic group lifecycle. Do not unmount or fade out a card only because the next keyword cue starts if the approved plan says the cards are related or should coexist.
- When the approved plan includes a matched asset, import or copy that image/element into the Remotion project asset folder and display it at the approved keyword cue. Preserve aspect ratio, clamp max size to the safe area, and use the approved style's card/frame treatment when needed.
- When implementing connector, arrow, route, or flow-line effects, render the line as an SVG path and move the glow dot along that exact generated path. Use `getPointAtLength`, GSAP MotionPath, or equivalent path sampling from the same path data. Do not fake the motion with endpoint interpolation, fixed x/y animation, or blinking at the line ends.
- When the approved plan includes `GitHubRepoCard`, implement it with text and vector/CSS elements rather than using the reference image as a flat bitmap unless the user explicitly asks for screenshot reuse. The card must expose editable fields for owner, repo, function, visibility, languages, and language percentages.
- When the approved plan includes a gesture anchor, place the matched asset or animation at the gesture-derived region first, then apply the recorded safety offset. Do not recenter it into a generic layout unless gesture placement would block the face, mouth, subtitles, or key hand motion.
- Use `references/visual-quality-system.md` as the implementation quality bar for typography, components, hierarchy, spacing, and motion polish.
- Use `references/card-style-library.md` as the unified implementation reference for the selected built-in or custom style. Default to `Dark Diagnostic HUD`; use `Signal Desk Overlay`, `Precision HUD Cards`, `Diagnostic Glass Cards`, or `Terminal Agent HUD` only when explicitly selected in the approved plan.
- Use `references/dark-diagnostic-hud-style-system.md` and `references/dark-diagnostic-hud-remotion-agent-prompt.md` as the detailed contract for Dark Diagnostic HUD implementations. Use the matching `templates/styles/<style-name>/` directory as the implementation contract for every built-in style.
- Keep video and audio aligned to the edited video.
- Keep overlays outside face/mouth and subtitle-safe zones unless the approved plan explicitly says otherwise.
- Explicitly set `fontFamily`, weight, size, line height, and fallback for every text component; do not rely on browser default fonts.
- Do not add transition flashes, scan wipes, full-screen frames, or dashboard shells if the selected style forbids them.
- Do not add global top/bottom video progress bars. Progress bars are allowed only inside task cards or loading panels when they represent content-specific progress.
- Do not render or export at this stage.

- 用 Remotion 负责合成结构、视频放置、时间线、Studio 和导出。
- 用 GSAP 负责动画缓动、时间线计算或元素运动逻辑。
- 以用户确认的包装方案为唯一实现依据。
- 每次确认包装实现后，都新建独立 Remotion 工程目录。优先使用 `<video-name>-remotion-packaging/`；如果路径已存在，创建同级唯一目录，例如 `<video-name>-remotion-packaging-YYYYMMDD-HHMMSS/`。默认不要复用或修改已有 Remotion 工程。
- 把风格参考、用户参考图、原始视频、剪辑后输入视频和随 skill 打包模板都视为只读输入。只把需要的素材复制到新的 Remotion 工程里，然后改造副本。
- 写新的 overlay 组件前，先通过 `templates/styles/style-index.json` 解析内置风格，再复制或改造匹配的 `templates/styles/<style-name>/` 目录中随 skill 打包的实现资产。保持 `tokens.json`、`theme.ts`、`components.tsx`、`example.tsx` 和 `agent-prompt.md` 一起使用，避免间距、圆角、阴影、字体和动效时间漂移。
- 在其他项目内部实现时，先按 `references/external-project-style-contract.md` 把完整只读风格契约复制进目标项目，再生成 Remotion 场景。不要只粘贴 prompt，也不要根据 `HUD`、`glass` 或 `popup` 这些词重新创造风格。
- 按已确认方案中的字幕关键词落点驱动包装元素入场、高亮、弹跳、点击、卡片碰撞和退场。将 cue 秒数转换成 Remotion 帧，并以这些帧作为动画锚点。
- 保留已确认方案中的语义组生命周期。如果方案说明卡片相关或需要共存，不要仅因为下一个关键词 cue 开始就卸载或淡出前一张卡。
- 当确认方案包含匹配素材时，把该图片/元素导入或复制到 Remotion 项目素材目录，并在对应关键词 cue 展示。保持原始比例，把最大尺寸限制在安全区内，必要时套用已选风格的卡片/边框处理。
- 实现连线、箭头、路径或流程线动效时，线条必须是 SVG path，光点必须沿这条实际生成的 path 运动。使用同一份 path 数据的 `getPointAtLength`、GSAP MotionPath 或等价路径采样方法；不要用端点插值、固定 x/y 动画或端点闪烁伪装沿线运动。
- 当确认方案包含 `GitHubRepoCard` 时，优先用文字和矢量/CSS 元素实现，不要把参考图直接当作扁平截图贴上去，除非用户明确要求复用截图。卡片必须暴露可编辑字段：用户名、项目名、项目功能、公开/私有标记、语言和语言占比。
- 当确认方案包含手势锚点时，优先把匹配素材或动画放到手势推导区域，再应用记录的安全偏移。除非手势位置会挡脸、挡嘴、挡字幕或关键手部动作，否则不要改成通用居中布局。
- 使用 `references/visual-quality-system.md` 作为字体、组件、层级、间距和动效质感的实现质量标准。
- 使用 `references/card-style-library.md` 作为已选内置或自定义风格的统一实现参考。默认使用 `Dark Diagnostic HUD / 暗色诊断 HUD`；只有在确认方案明确选择时才使用 `Signal Desk Overlay / 标准重点弹窗`、`Precision HUD Cards / 精密 HUD 卡片`、`Diagnostic Glass Cards / 诊断玻璃卡片` 或 `Terminal Agent HUD / 终端 Agent HUD`。
- 使用 `references/dark-diagnostic-hud-style-system.md` 和 `references/dark-diagnostic-hud-remotion-agent-prompt.md` 作为 Dark Diagnostic HUD 实现的详细契约。每个内置风格都使用匹配的 `templates/styles/<style-name>/` 目录作为实现契约。
- 保持视频与音频和剪辑后视频对齐。
- 除非方案明确允许，否则包装元素必须避开脸部、嘴部和字幕安全区。
- 每个文字组件都必须显式设置 `fontFamily`、字重、字号、行高和 fallback；不要依赖浏览器默认字体。
- 如果风格文件禁止转场闪烁、扫描光效、全屏框或仪表盘外壳，就不得添加。
- 不要添加顶部或底部的整条视频全局进度条。只有表示内容内部状态的任务卡片进度条或加载面板进度条可以使用。
- 此阶段不渲染、不导出。

If dependencies are missing, install only what is needed for this stack, such as `remotion`, `@remotion/cli`, `react`, `react-dom`, `typescript`, and `gsap`. Do not replace Remotion + GSAP with HyperFrames, plain HTML, PIL, Manim, or another animation system unless the user explicitly changes the requirement.

如果依赖缺失，只安装这个技术栈必需的依赖，例如 `remotion`、`@remotion/cli`、`react`、`react-dom`、`typescript`、`gsap`。不要把 Remotion + GSAP 替换成 HyperFrames、普通 HTML、PIL、Manim 或其它动画系统，除非用户明确改需求。

Run a TypeScript or build check when available.

如果项目支持，运行 TypeScript 或构建检查。

#### Silent Remotion Studio QA / Remotion Studio 静默自检

Before opening Remotion Studio, run this silent QA even when the user says "do not render" or "open Studio only." This QA renders still frames only; it must not export the full video.

打开 Remotion Studio 前，即使用户说“不渲染”或“只打开 Studio”，也必须先做下面的静默自检。此自检只渲染静帧，不得导出完整视频。

Required checks:

必须检查：

1. Run the available project checks, such as `npm run typecheck`, `npm run build`, or `npm run compositions`.
2. Capture still frames with `remotion still` at a minimum of 3 key moments: one early overlay moment, one middle keyword/card moment, and one late/risk or payoff moment. Prefer 5 frames when the composition has many timed keyword cues.
3. Inspect the stills before showing Studio. Confirm that the frame is not blank, the base video is visible, the packaging layer is above the video, and at least one expected overlay is visible at each sampled cue time.
4. Verify subtitle keyword timing: an overlay tied to a keyword must be absent before its cue and visible at or just after its cue. If exact pre/post frame checks are too expensive, check at least the cue frame and one nearby later frame.
5. Check typography, face/mouth safety, subtitle safety, card density, glow intensity, material layering, semantic border color, and global-progress-bar violations.
6. For connector/path scenes, sample at least two frames during the dot loop and verify the glow dot sits on the rendered line path, not beside it, at endpoints only, or on a straight shortcut.
7. If any sampled frame is blank, missing overlays, hidden behind video, off-canvas, blocking the face/mouth, showing the wrong keyword timing, or showing a glow dot that does not follow the generated path, fix the issue and rerun the relevant still checks before opening Studio.
8. Only after silent QA passes, open Remotion Studio and give the user the local Studio URL. Summarize only pass/fail and key fixes; do not require the user to manually discover basic visibility bugs.

1. 运行项目可用检查，例如 `npm run typecheck`、`npm run build` 或 `npm run compositions`。
2. 用 `remotion still` 抽取至少 3 个关键静帧：一个早期包装出现点、一个中段关键词/卡片点、一个后段风险或 payoff 点。若合成里有很多关键词 cue，优先抽 5 帧。
3. 打开 Studio 前先检查这些静帧。确认画面不是空白、底层视频可见、包装层在视频上方，并且每个抽样 cue 时间点至少有一个预期包装元素可见。
4. 检查字幕关键词时间：绑定关键词的包装元素在 cue 前应不可见，在 cue 当帧或稍后应可见。如果逐个前后帧成本太高，至少检查 cue 帧和一个稍后的邻近帧。
5. 检查字体、脸部/嘴部安全、字幕安全、卡片密度、发光强度、材质层次、语义描边颜色和全局进度条违规。
6. 对连线/path 场景，至少抽查光点循环中的两个帧，确认发光点贴在已渲染线条路径上，而不是偏在线外、只停在端点，或走两点之间的直线捷径。
7. 如果任何抽样帧空白、包装缺失、被视频盖住、跑到画面外、挡脸/挡嘴、关键词时间错误，或光点没有沿生成路径运动，先修复并重新跑相关静帧检查，再打开 Studio。
8. 静默自检通过后，才打开 Remotion Studio 并给用户本地 Studio URL。只向用户总结通过/失败和关键修复点；不要让用户手动发现基础可见性问题。

### 6. Export Only After Final Approval / 最终确认后才导出

Wait for the user to review Studio and explicitly confirm export.

等待用户在 Studio 中检查并明确确认导出。

Only then render/export the final video. Preserve the edited input video and style/design artifacts. If subtitles are requested, keep SRT as a separate file unless the user explicitly asks to burn subtitles into the video.

只有在用户确认后才渲染/导出最终视频。保留剪辑后输入视频和风格/设计稿文件。如果用户需要字幕，默认输出独立 SRT；除非用户明确要求，否则不烧录字幕。

## Output Naming / 输出命名

Prefer explicit artifacts:

推荐产出命名清晰的文件：

- `packaging-plan-<video-name>.md` for the approved motion design.
- `timing/<video-name>-packaging-timing.json` or `packaging-timing-<video-name>.json` for the normalized packaging timing bundle.
- `timing/<video-name>-keyword-cues.json` for subtitle keyword cue points used by packaging animations.
- `references/card-style-library.md` as the unified active card style library.
- `subtitles/<video-name>.srt` for optional SRT.
- `<video-name>-remotion-packaging/` for the new Remotion project. If it already exists, create `<video-name>-remotion-packaging-YYYYMMDD-HHMMSS/`; never overwrite an existing project by default.
- `final/` or `exports/` only after the final export confirmation.

## Confirmation Gates / 确认节点

Never skip these gates, but present them progressively. Show only the current gate. Do not list later gates or ask later-gate questions until the active gate is resolved.

不要跳过这些确认点，但必须渐进展示。每次只展示当前确认点。当前确认点解决前，不要列出后续确认点，也不要提前询问后续确认点的问题。

1. Confirm whether editing is needed.
2. If editing is needed, ask for the source folder, then use the fine-cut plan by default.
3. Transcribe with local `faster-whisper` automatically. This is not a user choice gate.
4. Confirm whether custom style is needed. If yes, ask the style source type in a separate follow-up question, then ask for the matching file/path.
5. Generate the timing bundle, asset manifest, and gesture cues before packaging design.
6. Confirm the packaging motion design before Remotion implementation.
7. Confirm Studio preview before final export.

## Common Mistakes / 常见错误

- Do not generate only one scene when the transcript has multiple sentences; every meaningful sentence or beat needs packaging consideration.
- Do not let cards, terminals, titles, or transition effects cover the speaker's face or mouth.
- Do not render during the planning or Studio-preview stage.
- Do not burn subtitles by default.
- Do not generate whole-video playback progress bars as decorative elements.
- Do not stop after fine-cut verification without telling the user the next packaging action.
- Do not skip the packaging timing bundle after fine-cut or user-provided edited-video handoff.
- Do not treat user-provided SRT as word-level keyword timing unless it is accompanied by verified word-level timestamps.
- Do not trigger every animation from generic scene starts, equal time slices, or hand-picked decorative timings; use subtitle keyword cue points.
- Do not split every word into a separate animation segment. Use keyword cues as anchors, then decide card lifetime by semantic group completion.
- Do not generate flat single-layer cards. Cards need glass material, gradient, semantic border, inner/outer shadows, icon container, and explicit typography hierarchy.
- Do not generate sharp checkpoint frames or corner-bracket HUD boxes for ordinary information cards. Use the rounded-card geometry from the selected template tokens unless the approved plan explicitly requests hard HUD corner brackets.
- Do not mix geometry between styles. For example, glass cards must not become precision HUD frames, Signal Desk popups must not become large HUD boxes, and Terminal Agent cards must not become native OS window clones.
- Do not use removed or unselected styles. Default to `Dark Diagnostic HUD`; use `Signal Desk Overlay`, `Precision HUD Cards`, `Diagnostic Glass Cards`, or `Terminal Agent HUD` only when explicitly selected.
- Do not ignore bundled style fidelity files. If the built-in style is used, read `templates/styles/style-index.json`, the matching `references/` files, and copy/adapt matching `templates/styles/<style-name>/` code before inventing components.
- Do not change, remove, or add a built-in style without running `node scripts/verify-style-assets.mjs`.
- Do not ignore reference image(s) when the user provides them as the custom style source; extract a style brief first.
- Do not ignore current-project content assets. If an asset filename, path segment, or filename-token alias matches a subtitle keyword, use it at that keyword cue or explicitly explain why it is unsafe or unsuitable. Do not use image content, OCR, labels inferred from pixels, or subject classification for matching.
- Do not search for packaging assets in the uploaded video's folder by default. Use the current Codex project/workspace as the default asset source; only use the video folder if the user explicitly designates it as an asset source.
- Do not place gesture-driven assets in a generic center position. If pointing, dragging, swiping, circling, or line-drawing gestures are visible, use the gesture region as the preferred placement anchor with a safety offset.
- Do not fake connector glow-dot motion with endpoint blinking, straight-line shortcuts, or fixed x/y offsets; it must follow the generated SVG/path.
- Do not silently switch from Remotion + GSAP to another tool when setup is inconvenient.
- Do not overwrite the original or edited source video.
- Do not modify existing reference files, bundled style templates, user reference images, or existing Remotion projects while generating a new Remotion animation. Create a fresh project and work on copied assets.

- 不要在文案有多句话时只生成一个场景；每个有意义的句子或节奏点都要考虑包装。
- 不要让卡片、终端框、标题或转场效果挡住人物脸部和嘴部。
- 不要在方案阶段或 Studio 预览阶段渲染。
- 默认不要烧录字幕。
- 不要把整条视频播放进度条当作装饰元素生成。
- 不要在精剪检查完成后停住而不告诉用户下一步包装动作。
- 精剪或用户提供成片交接后，不要跳过包装时间包。
- 不要把用户提供的 SRT 当作词级关键词时间，除非同时有已验证的词级时间戳。
- 不要用泛泛的场景开始时间、均分时间片或手选装饰时间触发所有动效；必须使用字幕关键词落点。
- 不要把每个词都切成独立动效段。关键词只作为锚点，卡片生命周期要根据语义组是否完成来判断。
- 不要生成单层扁平卡片。卡片需要玻璃材质、渐变、语义描边、内外阴影、图标容器和明确字体层级。
- 普通信息卡不要生成尖锐 checkpoint 外框或 corner-bracket HUD 框。除非已确认方案明确要求硬 HUD 角标，否则使用已选模板 token 里的圆角卡片几何。
- 不要混用不同风格的几何。比如玻璃卡片不要变成精密 HUD 框，Signal Desk 弹窗不要变成大 HUD 框，Terminal Agent 卡片不要变成原生系统窗口仿制。
- 不要混用已移除或未被选择的风格。默认使用 `Dark Diagnostic HUD / 暗色诊断 HUD`；只有明确选择时才使用 `Signal Desk Overlay / 标准重点弹窗`、`Precision HUD Cards / 精密 HUD 卡片`、`Diagnostic Glass Cards / 诊断玻璃卡片` 或 `Terminal Agent HUD / 终端 Agent HUD`。
- 不要忽略随 skill 打包的风格保真文件。使用内置风格时，先读取 `templates/styles/style-index.json`、匹配的 `references/` 文件，并先复制或改造匹配的 `templates/styles/<style-name>/` 代码，再考虑新写组件。
- 不要在没有运行 `node scripts/verify-style-assets.mjs` 的情况下修改、删除或新增内置风格。
- 用户提供参考图片作为自定义风格来源时，不要忽略图片；必须先提取风格 brief。
- 不要忽略当前项目内容素材。只要素材文件名、路径片段或文件名分词别名匹配字幕关键词，就在该关键词 cue 使用，或明确说明为什么不安全/不适合。不要用图片内容、OCR、从像素推断的标签或主体分类做匹配。
- 不要默认去用户上传视频所在文件夹里找包装素材。默认素材来源是当前 Codex 项目/工作区；只有用户明确指定时，才把视频所在目录当素材来源。
- 不要把手势触发的素材放到通用居中位置。如果画面中有指、拖、划、圈选或画线手势，优先使用手势区域作为放置锚点，并做安全偏移。
- 不要用端点闪烁、两点直线捷径或固定 x/y 偏移伪装连线光点运动；光点必须沿实际生成的 SVG/path 运动。
- 不要因为环境麻烦就偷偷换掉 Remotion + GSAP。
- 不要覆盖原始视频或剪辑后源视频。
- 生成新的 Remotion 动画时，不要修改已有参考文件、随 skill 打包的风格模板、用户参考图片或已有 Remotion 工程。必须新建工程，并只改复制进去的素材副本。
