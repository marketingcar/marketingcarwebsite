import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const routesFile = path.join(projectRoot, '.prerender-routes.json');

if (!existsSync(routesFile)) {
  console.error('[copy-routes] Missing .prerender-routes.json. Run the routes script first.');
  process.exit(1);
}

const routes = JSON.parse(readFileSync(routesFile, 'utf8'));
const srcIndex = path.join(distDir, 'index.html');
if (!existsSync(srcIndex)) {
  console.error('[copy-routes] Missing dist/index.html. Run `vite build` first.');
  process.exit(1);
}

for (const route of routes) {
  // Skip root (already exists)
  if (route === '/') continue;

  // /about -> dist/about/index.html
  const destIndex = path.join(distDir, route.replace(/^\//, ''), 'index.html');
  mkdirSync(path.dirname(destIndex), { recursive: true });
  copyFileSync(srcIndex, destIndex);

  // Inject a canonical tag for this route if one isn't present
  let html = readFileSync(destIndex, 'utf8');
  if (!/rel=["']canonical["']/.test(html)) {
    const canonical = `<link rel="canonical" href="https://www.marketingcar.com${route.replace(/\/$/, '')}">`;
    html = html.replace('</head>', `${canonical}\n</head>`);
    writeFileSync(destIndex, html);
  }
  console.log('[copy-routes] wrote', destIndex);
}

console.log(`[copy-routes] Done. Created ${routes.length - 1} route files.`);
