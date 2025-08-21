// scripts/generate-sitemaps.mjs
import { fileURLToPath } from 'node:url';
import { readdirSync, statSync, writeFileSync, readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://marketingcar.com';

// 1) Collect routes from prerender file if present
const prerenderFile = path.join(root, '.prerender-routes.json');
let routeList = [];
if (existsSync(prerenderFile)) {
  try {
    routeList = JSON.parse(readFileSync(prerenderFile, 'utf8')) || [];
  } catch {
    routeList = [];
  }
}

// 2) Also crawl dist/ for any index.html pages to be safe
function walkHtml(dir, base = dist) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = path.join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walkHtml(p, base));
    else if (name === 'index.html') {
      const rel = `/${path.relative(base, p).replace(/\\/g, '/')}`;
      const route = rel.replace(/\/index\.html$/, '') || '/';
      out.push({ route, mtime: s.mtime });
    }
  }
  return out;
}
const crawled = existsSync(dist) ? walkHtml(dist) : [];

// 3) Merge and dedupe
const map = new Map();
for (const r of routeList) {
  const route = typeof r === 'string' ? r : r?.route;
  if (!route) continue;
  const key = route.endsWith('/') ? route.slice(0, -1) || '/' : route;
  map.set(key, { route: key, mtime: undefined });
}
for (const { route, mtime } of crawled) {
  const key = route.endsWith('/') ? route.slice(0, -1) || '/' : route;
  map.set(key, { route: key, mtime });
}

// 3a) Hard-guarantee the homepage
if (!map.has('/')) {
  let mtime;
  const indexPath = path.join(dist, 'index.html');
  if (existsSync(indexPath)) {
    try { mtime = statSync(indexPath).mtime; } catch {}
  }
  map.set('/', { route: '/', mtime });
}

const entries = [...map.values()].sort((a, b) => a.route.localeCompare(b.route));
const toAbs = r => new URL(r || '/', SITE_URL).href;
const urls = entries.map(e => toAbs(e.route));

// 4) Write sitemap.xml
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  entries.map(({ route, mtime }) => {
    const loc = toAbs(route);
    const lastmod = mtime ? `<lastmod>${new Date(mtime).toISOString()}</lastmod>` : '';
    return `  <url><loc>${loc}</loc>${lastmod}</url>`;
  }).join('\n') +
  `\n</urlset>\n`;

writeFileSync(path.join(dist, 'sitemap.xml'), xml);
console.log(`[sitemaps] wrote dist/sitemap.xml with ${entries.length} URLs`);

// 5) Write sitemap.txt (one URL per line)
writeFileSync(path.join(dist, 'sitemap.txt'), urls.join('\n') + '\n');
console.log(`[sitemaps] wrote dist/sitemap.txt with ${urls.length} URLs`);

// 6) Ensure robots.txt references both (create if missing)
const robotsPath = path.join(dist, 'robots.txt');
let robots = existsSync(robotsPath)
  ? readFileSync(robotsPath, 'utf8')
  : `User-agent: *\nAllow: /\n`;

const sitemapXml = `Sitemap: ${new URL('/sitemap.xml', SITE_URL).href}`;
const sitemapTxt = `Sitemap: ${new URL('/sitemap.txt', SITE_URL).href}`;

if (!robots.includes(sitemapXml)) robots += (robots.endsWith('\n') ? '' : '\n') + sitemapXml + '\n';
if (!robots.includes(sitemapTxt)) robots += sitemapTxt + '\n';

writeFileSync(robotsPath, robots);
console.log(`[sitemaps] ensured robots.txt lists both sitemap.xml and sitemap.txt`);