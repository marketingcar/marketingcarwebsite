// scripts/spa-copy-routes.mjs
import { readFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const routesPath = path.join(root, '.prerender-routes.json');

function normalize(r) {
  if (!r || typeof r !== 'string') return '/';
  let out = r.trim().replace(/[?#].*$/, '');
  if (!out.startsWith('/')) out = `/${out}`;
  out = out.replace(/\/{2,}/g, '/');
  if (out !== '/' && !out.endsWith('/')) out += '/';
  if (out === '/*' || out === '*/') return '/';
  return out;
}

function isBad(r) {
  if (!r) return true;
  if (r === '/') return false;
  return r.includes('*') || r.includes(':') || r.includes('..');
}

// Convert a normalized route like "/about/us/" to "about/us/"
function toRelativeFolder(route) {
  const rel = route.replace(/^\/+/, '');
  return rel; // may be empty for root
}

if (!existsSync(routesPath)) {
  console.warn('[spa-copy-routes] .prerender-routes.json not found. Skipping.');
  process.exit(0);
}

if (!existsSync(dist)) {
  console.error('[spa-copy-routes] dist folder not found. Run vite build first.');
  process.exit(1);
}

const indexSrc = path.join(dist, 'index.html');
if (!existsSync(indexSrc)) {
  console.error('[spa-copy-routes] dist/index.html not found. Ensure vite build runs before this script.');
  process.exit(1);
}

// Read and sanitize routes
let routes = [];
try {
  const raw = JSON.parse(readFileSync(routesPath, 'utf8')) || [];
  routes = raw
    .map(r => (typeof r === 'string' ? r : r?.route))
    .filter(Boolean)
    .map(normalize)
    .filter(r => !isBad(r));
} catch (e) {
  console.error('[spa-copy-routes] Failed to read .prerender-routes.json:', e.message);
  process.exit(1);
}

// Deduplicate, keep root, sort
const set = new Set(routes);
const finalRoutes = Array.from(set).sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));

let copied = 0;
for (const route of finalRoutes) {
  // Root already has dist/index.html
  if (route === '/') continue;

  const relFolder = toRelativeFolder(route);
  if (!relFolder) continue; // safety

  const targetDir = path.join(dist, relFolder);
  const targetFile = path.join(targetDir, 'index.html');

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(indexSrc, targetFile);
  copied++;
}

console.log(`[spa-copy-routes] Wrote index.html for ${copied} routes`);
