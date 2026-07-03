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

const referenceFiles = new Set([
  "card-style-library.md",
  "external-project-style-contract.md",
]);

const bannedPhrases = [
  ["remotion", "-overlay-kit"].join(""),
  ["video", "-overlay-kit"].join(""),
  ["$video", "-use"].join(""),
  ["video", "-use"].join(""),
  ["faster", "-whisper"].join(""),
  ["GitHub", "RepoCard"].join(""),
  ["default", "-design.md"].join(""),
  ["visual", "-quality-system.md"].join(""),
  ["keyword", "-animation-effects.md"].join(""),
  ["dark", "-diagnostic-hud-style-system.md"].join(""),
  ["dark", "-diagnostic-hud-remotion-agent-prompt.md"].join(""),
  ["Hud", "Corners"].join(""),
];

function fail(message) {
  console.error(`style asset verification failed: ${message}`);
  process.exit(1);
}

function rel(filePath) {
  return path.relative(rootDir, filePath);
}

function readText(filePath) {
  if (!fs.existsSync(filePath)) {
    fail(`missing ${rel(filePath)}`);
  }
  const stat = fs.statSync(filePath);
  if (!stat.isFile()) {
    fail(`${rel(filePath)} is not a file`);
  }
  const content = fs.readFileSync(filePath, "utf8");
  if (!content.trim()) {
    fail(`${rel(filePath)} is empty`);
  }
  return content;
}

function readJson(filePath) {
  try {
    return JSON.parse(readText(filePath));
  } catch (error) {
    fail(`${rel(filePath)} is not valid JSON: ${error.message}`);
  }
}

function walkFiles(dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const filePath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(filePath));
    } else if (entry.isFile()) {
      result.push(filePath);
    }
  }
  return result;
}

const legacyKitDir = path.join(rootDir, "templates", ["remotion", "-overlay-kit"].join(""));
if (fs.existsSync(legacyKitDir)) {
  fail("legacy shared overlay kit directory must not exist");
}

const referencesDir = path.join(rootDir, "references");
const actualReferences = fs.readdirSync(referencesDir).filter((name) => !name.startsWith("."));
for (const name of actualReferences) {
  if (!referenceFiles.has(name)) {
    fail(`references/${name} is not part of the five-style contract`);
  }
}
for (const name of referenceFiles) {
  readText(path.join(referencesDir, name));
}

const styleIndex = readJson(indexPath);

if (styleIndex.defaultStyleId !== "dark-diagnostic-hud") {
  fail("defaultStyleId must be dark-diagnostic-hud");
}

if (!Array.isArray(styleIndex.requiredFilesPerStyle)) {
  fail("style-index.json must define requiredFilesPerStyle");
}
for (const fileName of requiredFiles) {
  if (!styleIndex.requiredFilesPerStyle.includes(fileName)) {
    fail(`style-index.json requiredFilesPerStyle must include ${fileName}`);
  }
}

if (!Array.isArray(styleIndex.styles) || styleIndex.styles.length !== requiredStyleIds.size) {
  fail("style-index.json must define exactly five styles");
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
  if (!requiredStyleIds.has(style.id)) {
    fail(`unexpected style id ${style.id}`);
  }
  styleIds.add(style.id);

  if (style.directory !== `templates/styles/${style.id}`) {
    fail(`${style.id} directory must be templates/styles/${style.id}`);
  }

  if (!style.displayName || !style.zhName) {
    fail(`${style.id} must define displayName and zhName`);
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

  const styleDir = path.join(rootDir, style.directory);
  const dirEntries = fs.readdirSync(styleDir).filter((name) => !name.startsWith("."));
  for (const fileName of requiredFiles) {
    if (!dirEntries.includes(fileName)) {
      fail(`${style.id} is missing ${fileName}`);
    }
  }

  const tokens = readJson(path.join(styleDir, "tokens.json"));
  for (const key of requiredTokenKeys) {
    if (!(key in tokens)) {
      fail(`${style.id}/tokens.json must include ${key}`);
    }
  }

  const expected = expectedGeometry[style.id];
  for (const [key, value] of Object.entries(expected)) {
    if (tokens.geometry[key] !== value) {
      fail(`${style.id}/tokens.json geometry.${key} must be ${JSON.stringify(value)}`);
    }
  }
  if (!Array.isArray(tokens.geometry.forbidden) || tokens.geometry.forbidden.length < 2) {
    fail(`${style.id}/tokens.json geometry.forbidden must list forbidden drift shapes`);
  }

  const theme = readText(path.join(styleDir, "theme.ts"));
  const components = readText(path.join(styleDir, "components.tsx"));
  const example = readText(path.join(styleDir, "example.tsx"));
  const agentPrompt = readText(path.join(styleDir, "agent-prompt.md"));

  if (!theme.includes("geometry") && !theme.includes("radius")) {
    fail(`${style.id}/theme.ts must expose geometry or radius values`);
  }
  if (!components.includes("export")) {
    fail(`${style.id}/components.tsx must export reusable components`);
  }
  if (!example.includes("Example") && !example.includes("Composition")) {
    fail(`${style.id}/example.tsx must include an example component`);
  }
  if (!agentPrompt.toLowerCase().includes("use this style")) {
    fail(`${style.id}/agent-prompt.md must explain when to use the style`);
  }
  if (!agentPrompt.includes("Geometry contract") && !agentPrompt.includes("几何契约")) {
    fail(`${style.id}/agent-prompt.md must include a geometry contract`);
  }
}

for (const id of requiredStyleIds) {
  if (!styleIds.has(id)) {
    fail(`style-index.json is missing ${id}`);
  }
}

const styleIndexMd = readText(path.join(rootDir, "templates/styles/STYLE_INDEX.md"));
for (const id of requiredStyleIds) {
  if (!styleIndexMd.includes(id)) {
    fail(`STYLE_INDEX.md must mention ${id}`);
  }
}
if (!styleIndexMd.includes("Geometry Contracts")) {
  fail("STYLE_INDEX.md must document geometry contracts");
}

const contract = readText(path.join(rootDir, "references/external-project-style-contract.md"));
if (!contract.includes("style-contract/") || !contract.includes("tokens.json.geometry")) {
  fail("external-project-style-contract.md must define external reuse and geometry rules");
}
for (const id of requiredStyleIds) {
  if (!contract.includes(id)) {
    fail(`external-project-style-contract.md must include ${id}`);
  }
}

const allFiles = walkFiles(rootDir);
for (const filePath of allFiles) {
  if (rel(filePath) === "scripts/verify-style-assets.mjs") continue;
  const content = fs.readFileSync(filePath, "utf8");
  for (const phrase of bannedPhrases) {
    if (content.includes(phrase)) {
      fail(`${rel(filePath)} must not reference removed workflow or legacy style content: ${phrase}`);
    }
  }
}

const skillMd = readText(path.join(rootDir, "SKILL.md"));
const readmeMd = readText(path.join(rootDir, "README.md"));
for (const [name, content] of [["SKILL.md", skillMd], ["README.md", readmeMd]]) {
  for (const phrase of [
    "templates/styles/style-index.json",
    "tokens.json",
    "components.tsx",
    "agent-prompt.md",
    "style-contract/",
  ]) {
    if (!content.includes(phrase)) {
      fail(`${name} must document ${phrase}`);
    }
  }
}

console.log(`ok: verified ${styleIndex.styles.length} self-contained style packs`);
