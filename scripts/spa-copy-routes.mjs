// scripts/spa-copy-routes.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const routesPath = path.join(root, '.prerender-routes.json');
if (!existsSync(routesPath)) {
  console.warn('[spa-copy-routes] .prerender-routes.json not found. Skipping.');
  process.exit(0);
}

const routes = JSON.parse(readFileSync(routesPath, 'utf8')) || [];
const indexSrc = path.join(dist, 'index.html');

if (!existsSync(indexSrc)) {
  console.error('[spa-copy-routes] dist/index.html not found. Ensure vite build runs first.');
  process.exit(1);
}

let count = 0;
for (const r of routes) {
  const route = typeof r === 'string' ? r : r?.route;
  if (!route) continue;
  // normalize
  const clean = route === '/' ? '/' : route.replace(/\/+$/, '');
  const targetDir = clean === '/' ? dist : path.join(dist, clean);
  const target = path.join(targetDir, 'index.html');
  mkdirSync(targetDir, { recursive: true });
  copyFileSync(indexSrc, target);
  count++;
}

console.log(`[spa-copy-routes] wrote index.html for ${count} routes`);
