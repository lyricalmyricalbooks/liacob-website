#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');
const manifestPath = path.join(root, 'images', 'shopify', 'manifest.json');
const supported = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif', '.jfif']);

function usage() {
  console.log('Usage: node scripts/import-local-images.mjs /path/to/your/saved-images');
}

function walkFiles(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(full, out);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (supported.has(ext)) out.push(full);
    }
  }
  return out;
}

function sourceFileName(url) {
  const parsed = new URL(url);
  return path.basename(parsed.pathname).toLowerCase();
}

const sourceArg = process.argv[2];
if (!sourceArg) {
  usage();
  process.exit(1);
}

const sourceRoot = path.resolve(process.cwd(), sourceArg);
if (!fs.existsSync(sourceRoot) || !fs.statSync(sourceRoot).isDirectory()) {
  console.error(`Source folder not found: ${sourceRoot}`);
  process.exit(1);
}
if (!fs.existsSync(manifestPath)) {
  console.error(`Manifest not found: ${manifestPath}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const index = new Map();
for (const file of walkFiles(sourceRoot)) {
  const name = path.basename(file).toLowerCase();
  if (!index.has(name)) index.set(name, []);
  index.get(name).push(file);
}

let copied = 0;
let missing = 0;
for (const entry of manifest) {
  const expectedName = sourceFileName(entry.source_url);
  const candidates = index.get(expectedName) || [];
  if (candidates.length === 0) {
    missing += 1;
    continue;
  }

  const src = candidates[0];
  const dst = path.join(root, entry.local_path);
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
  copied += 1;
}

console.log(`Imported ${copied} file mappings.`);
if (missing > 0) {
  console.log(`Missing ${missing} mappings. Ensure the source folder contains the original Shopify filenames.`);
  process.exit(2);
}
console.log('Done. All mapped images were imported.');
