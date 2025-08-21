// scripts/spa-copy-routes.mjs
import { readFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');
const routesPath = path.join(root, '.prerender-routes.json');

function normalize(r) {
  if (!r) return '/';
  let out = r.startsWith('/') ? r : `/${r}`;
  if (out !== '/' && !out.endsWith('/')) out += '/';
  return out.replace(/\/{2,}/g, '/');
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

// Read and normalize routes
let routes = [];
try {
  const raw = JSON.parse(readFileSync(routesPath, 'utf8')) || [];
  routes = raw.map(r => normalize(typeof r === 'string' ? r : r?.route)).filter(Boolean);
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

  const targetDir = path.join(dist, route); // route already has trailing slash
  const targetFile = path.join(targetDir, 'index.html');

  mkdirSync(targetDir, { recursive: true });
  copyFileSync(indexSrc, targetFile);
  copied++;
}

console.log(`[spa-copy-routes] Wrote index.html for ${copied} routes`);
