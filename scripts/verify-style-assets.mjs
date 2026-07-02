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
const requiredTokenKeys = ["canvas", "colors", "typography", "motion"];

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

console.log(`ok: verified ${styleIndex.styles.length} built-in style packs`);
