#!/usr/bin/env node
import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

function parseArgs() {
  const args = process.argv.slice(2);
  const cmd = args[0];
  const opts = { target: "", features: [], dryRun: false };
  for (let i = 1; i < args.length; i++) {
    const a = args[i];
    if (a === "--target") opts.target = args[++i] || "";
    else if (a === "--features") opts.features = (args[++i] || "").split(",").map(s => s.trim()).filter(Boolean);
    else if (a === "--dry-run") opts.dryRun = true;
  }
  return { cmd, opts };
}

function loadJSON(p) { return JSON.parse(readFileSync(p, "utf8")); }
function saveJSON(p, obj) { writeFileSync(p, JSON.stringify(obj, null, 2) + "\n"); }

function ensureDeps(pkg, section, deps) {
  pkg[section] ||= {};
  let changed = false;
  for (const [k, v] of Object.entries(deps)) {
    if (!pkg[section][k]) { pkg[section][k] = v; changed = true; }
  }
  return changed;
}

function copyIfMissing(src, dest, dryRun) {
  if (existsSync(dest)) { console.log("SKIP exists:", dest); return false; }
  if (dryRun) { console.log("DRY copy:", src, "->", dest); return true; }
  mkdirSync(dirname(dest), { recursive: true });
  cpSync(src, dest, { recursive: true });
  console.log("ADD file:", dest);
  return true;
}

function injectImportStyles(targetRoot, dryRun) {
  const mainCandidates = ["src/main.tsx", "src/main.ts", "src/index.tsx"];
  for (const rel of mainCandidates) {
    const p = join(targetRoot, rel);
    if (!existsSync(p)) continue;
    const s = readFileSync(p, "utf8");
    if (s.includes('./styles.css') || s.includes("./styles.css")) { console.log("SKIP import styles in", rel); return false; }
    const next = `import "./styles.css";\n` + s;
    if (dryRun) { console.log("DRY inject styles import into", rel); return true; }
    writeFileSync(p, next); console.log("EDIT import styles in", rel); return true;
  }
  console.log("WARN no main file to inject styles");
  return false;
}

function applyUI(target, dryRun) {
  const targetRoot = resolve(process.cwd(), target);
  const pkgPath = join(targetRoot, "package.json");
  if (!existsSync(pkgPath)) throw new Error(`No package.json at ${pkgPath}`);
  const pkg = loadJSON(pkgPath);

  const tokensExists = existsSync(resolve(process.cwd(), "packages/tokens/tailwind-preset.js"));
  const depsChanged =
    ensureDeps(pkg, "dependencies", { "clsx": "^2.1.1", ...(tokensExists ? { "@mother-project/tokens": "workspace:*" } : {}) }) |
    ensureDeps(pkg, "devDependencies", { "tailwindcss": "^3.4.14", "postcss": "^8.4.47", "autoprefixer": "^10.4.20" });

  if (depsChanged) { if (dryRun) console.log("DRY edit:", pkgPath); else saveJSON(pkgPath, pkg); } else { console.log("SKIP deps (already present)"); }

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const tmpl = resolve(__dirname, "..", "templates", "ui");
  copyIfMissing(join(tmpl, "tailwind.config.js"), join(targetRoot, "tailwind.config.js"), dryRun);
  copyIfMissing(join(tmpl, "postcss.config.js"), join(targetRoot, "postcss.config.js"), dryRun);
  mkdirSync(join(targetRoot, "src"), { recursive: true });
  copyIfMissing(join(tmpl, "styles.css"), join(targetRoot, "src", "styles.css"), dryRun);

  injectImportStyles(targetRoot, dryRun);

  console.log("\nNext:");
  console.log(`  npm --prefix ${target} install`);
  console.log(`  # start dev server in ${target} per its scripts`);
}

function main() {
  const { cmd, opts } = parseArgs();
  if (cmd !== "apply") { console.log("Usage: gddev apply --target <path> --features ui[,other] [--dry-run]"); process.exit(1); }
  if (!opts.target) throw new Error("--target is required");
  if (opts.features.length === 0) opts.features = ["ui"];

  for (const f of opts.features) {
    if (f === "ui") applyUI(opts.target, opts.dryRun);
    else console.log("Unknown feature:", f);
  }
}

main();
