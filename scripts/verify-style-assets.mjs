import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const indexPath = path.join(rootDir, "templates/styles/style-index.json");
const requiredStyleIds = new Set([
  "dark-diagnostic-hud",
  "signal-desk-overlay",
  "precision-hud-cards",
  "diagnostic-glass-cards",
  "terminal-agent-hud",
]);
const requiredFiles = [
  "tokens.json",
  "theme.ts",
  "components.tsx",
  "example.tsx",
  "agent-prompt.md",
];
const requiredTokenKeys = ["canvas", "colors", "typography", "motion", "geometry"];
const expectedGeometry = {
  "dark-diagnostic-hud": {
    cardRadius: 16,
    innerRadius: 12,
    borderWidth: 2,
    borderStyle: "continuous-rounded-rectangle",
  },
  "signal-desk-overlay": {
    cardRadius: 8,
    chipRadius: 999,
    borderWidth: 1,
    borderStyle: "compact-rounded-popup",
  },
  "precision-hud-cards": {
    cardRadius: 8,
    innerRadius: 6,
    borderWidth: 1,
    borderStyle: "precision-thin-rounded-rectangle",
  },
  "diagnostic-glass-cards": {
    cardRadius: 18,
    innerRadius: 12,
    borderWidth: 1,
    borderStyle: "frosted-rounded-glass-rim",
    blurPx: 20,
  },
  "terminal-agent-hud": {
    cardRadius: 8,
    innerRadius: 6,
    borderWidth: 1,
    borderStyle: "terminal-rounded-panel-with-topbar",
  },
};
const expectedPromptSnippets = {
  "dark-diagnostic-hud": ["16px", "12px", "2px", "corner-bracket", "checkpoint"],
  "signal-desk-overlay": ["8px", "999px", "1px", "full-screen", "checkpoint"],
  "precision-hud-cards": ["8px", "6px", "1px", "glass blobs", "corner brackets"],
  "diagnostic-glass-cards": ["18px", "12px", "1px", "20px", "opaque hud", "flat solid"],
  "terminal-agent-hud": ["8px", "6px", "1px", "top bar", "code rain", "native os"],
};

function fail(message) {
  console.error(`style asset verification failed: ${message}`);
  process.exit(1);
}

function readJson(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    fail(`${path.relative(rootDir, filePath)} is not valid JSON: ${error.message}`);
  }
}

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`missing ${path.relative(rootDir, filePath)}`);
  }
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    fail(`${path.relative(rootDir, filePath)} is not a file`);
  }
  const content = fs.readFileSync(filePath, "utf8").trim();
  if (!content) {
    fail(`${path.relative(rootDir, filePath)} is empty`);
  }
  return content;
}

if (!fs.existsSync(indexPath)) {
  fail("missing templates/styles/style-index.json");
}

const styleIndex = readJson(indexPath);

if (!Array.isArray(styleIndex.requiredFilesPerStyle)) {
  fail("style-index.json must define requiredFilesPerStyle");
}

for (const fileName of requiredFiles) {
  if (!styleIndex.requiredFilesPerStyle.includes(fileName)) {
    fail(`style-index.json requiredFilesPerStyle must include ${fileName}`);
  }
}

if (!Array.isArray(styleIndex.styles)) {
  fail("style-index.json must define styles[]");
}

const styleIds = new Set();
const aliasKeys = new Set();

for (const style of styleIndex.styles) {
  if (!style.id || typeof style.id !== "string") {
    fail("every style must have a string id");
  }
  if (styleIds.has(style.id)) {
    fail(`duplicate style id ${style.id}`);
  }
  styleIds.add(style.id);

  if (!requiredStyleIds.has(style.id)) {
    fail(`unexpected style id ${style.id}`);
  }

  if (!style.directory || style.directory !== `templates/styles/${style.id}`) {
    fail(`${style.id} directory must be templates/styles/${style.id}`);
  }

  if (!Array.isArray(style.aliases) || style.aliases.length === 0) {
    fail(`${style.id} must define aliases[]`);
  }

  for (const alias of style.aliases) {
    if (!alias || typeof alias !== "string") {
      fail(`${style.id} contains an invalid alias`);
    }
    const key = alias.toLowerCase();
    if (aliasKeys.has(key)) {
      fail(`duplicate alias ${alias}`);
    }
    aliasKeys.add(key);
  }

  for (const fileName of requiredFiles) {
    assertFile(path.join(rootDir, style.directory, fileName));
  }

  const tokensPath = path.join(rootDir, style.directory, "tokens.json");
  const tokens = readJson(tokensPath);

  for (const key of requiredTokenKeys) {
    if (!(key in tokens)) {
      fail(`${style.id}/tokens.json must include ${key}`);
    }
  }

  const expected = expectedGeometry[style.id];
  if (!expected) {
    fail(`${style.id} is missing expected geometry verification`);
  }
  for (const [key, value] of Object.entries(expected)) {
    if (tokens.geometry[key] !== value) {
      fail(`${style.id}/tokens.json geometry.${key} must be ${JSON.stringify(value)}`);
    }
  }
  if (!Array.isArray(tokens.geometry.forbidden) || tokens.geometry.forbidden.length < 2) {
    fail(`${style.id}/tokens.json geometry.forbidden must list forbidden drift shapes`);
  }

  if (!("styleName" in tokens) && !("name" in tokens)) {
    fail(`${style.id}/tokens.json must include styleName or name`);
  }

  const components = assertFile(path.join(rootDir, style.directory, "components.tsx"));
  const example = assertFile(path.join(rootDir, style.directory, "example.tsx"));
  const agentPrompt = assertFile(path.join(rootDir, style.directory, "agent-prompt.md"));

  if (!components.includes("export")) {
    fail(`${style.id}/components.tsx must export reusable components`);
  }
  if (!example.includes("Composition") && !example.includes("Example")) {
    fail(`${style.id}/example.tsx must include an example component`);
  }
  if (!agentPrompt.toLowerCase().includes("use this style")) {
    fail(`${style.id}/agent-prompt.md must explain when to use the style`);
  }
  if (!agentPrompt.includes("Geometry contract") && !agentPrompt.includes("几何契约")) {
    fail(`${style.id}/agent-prompt.md must include a geometry contract`);
  }
  const normalizedPrompt = agentPrompt.toLowerCase();
  for (const snippet of expectedPromptSnippets[style.id]) {
    if (!normalizedPrompt.includes(snippet)) {
      fail(`${style.id}/agent-prompt.md geometry contract must mention ${snippet}`);
    }
  }

  if (style.id === "dark-diagnostic-hud") {
    if (!tokens.layout || Number(tokens.layout.radius) < 14) {
      fail("dark-diagnostic-hud/tokens.json layout.radius must be at least 14 for rounded card fidelity");
    }
    if (!("innerRadius" in tokens.layout) || Number(tokens.layout.innerRadius) < 10) {
      fail("dark-diagnostic-hud/tokens.json layout.innerRadius must be at least 10");
    }
    if (components.includes("HudCorners")) {
      fail("dark-diagnostic-hud/components.tsx must not expose HudCorners in the default style pack");
    }
    if (!agentPrompt.toLowerCase().includes("rounded")) {
      fail("dark-diagnostic-hud/agent-prompt.md must mention rounded card geometry");
    }
  }
}

const indexContent = assertFile(indexPath);
if (indexContent.includes("HudCorners")) {
  fail("style-index.json must not route agents to HudCorners");
}

for (const id of requiredStyleIds) {
  if (!styleIds.has(id)) {
    fail(`style-index.json is missing ${id}`);
  }
}

if (styleIndex.defaultStyleId !== "dark-diagnostic-hud") {
  fail("defaultStyleId must be dark-diagnostic-hud");
}

const styleIndexMd = assertFile(path.join(rootDir, "templates/styles/STYLE_INDEX.md"));
for (const id of requiredStyleIds) {
  if (!styleIndexMd.includes(id)) {
    fail(`STYLE_INDEX.md must mention ${id}`);
  }
}
if (!styleIndexMd.includes("Geometry Contracts")) {
  fail("STYLE_INDEX.md must document geometry contracts");
}

const externalContract = assertFile(path.join(rootDir, "references/external-project-style-contract.md"));
if (!externalContract.includes("External Project Style Contract") || !externalContract.includes("tokens.json.geometry")) {
  fail("external-project-style-contract.md must define external reuse and geometry rules");
}
if (!externalContract.includes("bundled reference Remotion project") || !externalContract.includes("Do not add new Composition")) {
  fail("external-project-style-contract.md must forbid adding production compositions to bundled reference templates");
}
for (const id of requiredStyleIds) {
  if (!externalContract.includes(id)) {
    fail(`external-project-style-contract.md must include a geometry lock row for ${id}`);
  }
}

const skillMd = assertFile(path.join(rootDir, "SKILL.md"));
const readmeMd = assertFile(path.join(rootDir, "README.md"));
for (const [name, content] of [
  ["SKILL.md", skillMd],
  ["README.md", readmeMd],
]) {
  for (const phrase of [
    "bundled reference Remotion project",
    "generated packaging project",
    "new Composition",
  ]) {
    if (!content.includes(phrase)) {
      fail(`${name} must document ${phrase}`);
    }
  }
  if (content.includes("Create a fresh Remotion project for each approved animation implementation")) {
    fail(`${name} must not require a fresh Remotion project for every animation`);
  }
}

console.log(`ok: verified ${styleIndex.styles.length} built-in style packs`);
