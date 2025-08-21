// scripts/prerender.routes.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// --- helpers ---
const normalize = r => {
  if (!r) return '/';
  let out = r.startsWith('/') ? r : `/${r}`;
  if (out !== '/' && !out.endsWith('/')) out += '/';
  return out.replace(/\/{2,}/g, '/');
};

async function safeImport(modPath) {
  try { return await import(modPath); } catch { return null; }
}

// Try multiple extensions for who-we-help data
const whoCandidates = [
  path.join(root, 'src', 'data', 'whoWeHelpData.js'),
  path.join(root, 'src', 'data', 'whoWeHelpData.mjs'),
  path.join(root, 'src', 'data', 'whoWeHelpData.json'),
  path.join(root, 'src', 'data', 'whoWeHelpData.jsx'),
  path.join(root, 'src', 'data', 'whoWeHelpData.ts'),
  path.join(root, 'src', 'data', 'whoWeHelpData.tsx'),
];

// Load services data (JS module is fine in Node)
const servicesMod = await safeImport(path.join(root, 'src', 'data', 'servicesData.js'));
const servicesData = (servicesMod?.services || servicesMod?.default || []).filter(Boolean);

// Load whoWeHelp from a JS-friendly module if possible
let whoWeHelp = [];
let whoSourceUsed = null;

for (const candidate of whoCandidates) {
  if (!existsSync(candidate)) continue;
  whoSourceUsed = candidate;

  // If it’s a JS/MJS/JSON, import directly
  if (/\.(m?js|json)$/.test(candidate)) {
    const m = await safeImport(candidate);
    whoWeHelp = (m?.whoWeHelp || m?.default || []).filter(Boolean);
    break;
  }

  // Otherwise it’s JSX/TS/TSX: read and regex slugs
  if (/\.(jsx|ts|tsx)$/.test(candidate)) {
    const src = readFileSync(candidate, 'utf8');

    // 1) Try to parse explicit arrays like whoWeHelp = [{ slug: 'therapists' }, ...]
    const slugRegex = /slug\s*:\s*['"]([^'"]+)['"]/g;
    const found = new Set();
    for (let m; (m = slugRegex.exec(src)); ) found.add(m[1]);

    // 2) Also catch hardcoded links like "/who-we-help/<slug>"
    const linkRegex = /['"`]\/who-we-help\/([^\/'"\s]+)\/?['"`]/g;
    for (let m; (m = linkRegex.exec(src)); ) found.add(m[1]);

    whoWeHelp = Array.from(found).map(slug => ({ slug }));
    break;
  }
}

// Base routes
const base = [
  '/',
  '/about/',
  '/services/',
  '/who-we-help/',
  '/contact/',
];

// Build service subpages
const serviceRoutes = servicesData
  .map(s => s?.slug)
  .filter(Boolean)
  .map(slug => normalize(`/services/${slug}/`));

// Build who-we-help subpages
const whoRoutes = (whoWeHelp || [])
  .map(w => w?.slug || w?.path || w?.id)
  .filter(Boolean)
  .map(slug => normalize(`/who-we-help/${slug}/`));

// Merge + dedupe
const set = new Set([...base.map(normalize), ...serviceRoutes, ...whoRoutes]);
const routes = Array.from(set).sort((a, b) => {
  if (a === '/') return -1;
  if (b === '/') return 1;
  return a.localeCompare(b);
});

// Write output
const outPath = path.join(root, '.prerender-routes.json');
writeFileSync(outPath, JSON.stringify(routes, null, 2));

console.log(`[prerender] services slugs: ${serviceRoutes.length}`);
console.log(`[prerender] who-we-help from: ${whoSourceUsed || 'not found'} (${whoRoutes.length} routes)`);
console.log(`[prerender] wrote ${routes.length} routes to .prerender-routes.json`);
