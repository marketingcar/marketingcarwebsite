import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio'; // ✅ correct Cheerio import

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');               // or 'build' if you use that
const routesFile = path.join(root, '.prerender-routes.json');

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://www.marketingcar.com';

const DEFAULTS = {
  title: 'Marketing Car',
  desc: 'Marketing that actually drives your business forward.',
  image: '/og/og-default.png',
};

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function ensure($, sel, attr, value) {
  const el = $(sel).first();
  if (el.length) { el.attr(attr, value); return; }
  // create missing tag
  if (sel.startsWith('meta[')) {
    const $m = $('<meta />');
    const m = sel.match(/\[(name|property)=["']([^"']+)["']\]/);
    if (m) $m.attr(m[1], m[2]);
    $m.attr(attr, value);
    $('head').append($m);
  } else if (sel.startsWith('link[')) {
    const $l = $('<link />');
    const m = sel.match(/\[rel=["']([^"']+)["']\]/);
    if (m) $l.attr('rel', m[1]);
    $l.attr(attr, value);
    $('head').append($l);
  }
}

const htmlFiles = walk(dist);
const routes = (() => {
  try { return JSON.parse(readFileSync(routesFile, 'utf8')); }
  catch { return ['/']; }
})();

// const routeSet = new Set(routes.map(r => r.endsWith('/') ? r : `${r}`)); // (unused)

for (const file of htmlFiles) {
  const rel = `/${path.relative(dist, file).replace(/\\/g, '/')}`;
  // infer route path from dist structure: about/index.html -> /about
  const routePath = rel.replace(/\/index\.html$/, '') || '/';
  const url = new URL(routePath, SITE_URL).href;

  const $ = load(readFileSync(file, 'utf8')); // ✅ use load(), not cheerio.load()

  // derive fallbacks from document if present
  const docTitle = $('title').first().text().trim() || DEFAULTS.title;
  const docDesc  = $('meta[name="description"]').attr('content') || DEFAULTS.desc;

  // inject/ensure
  ensure($, 'link[rel="canonical"]', 'href', url);

  ensure($, 'meta[property="og:title"]', 'content', docTitle);
  ensure($, 'meta[property="og:description"]', 'content', docDesc);
  ensure($, 'meta[property="og:type"]', 'content', 'website');
  ensure($, 'meta[property="og:url"]', 'content', url);
  ensure($, 'meta[property="og:image"]', 'content',
    new URL(DEFAULTS.image, SITE_URL).href);
  ensure($, 'meta[property="og:site_name"]', 'content', 'Marketing Car');
  ensure($, 'meta[property="og:image:width"]', 'content', '1200');
  ensure($, 'meta[property="og:image:height"]', 'content', '630');

  ensure($, 'meta[name="twitter:card"]', 'content', 'summary_large_image');
  ensure($, 'meta[name="twitter:title"]', 'content', docTitle);
  ensure($, 'meta[name="twitter:description"]', 'content', docDesc);
  ensure($, 'meta[name="twitter:image"]', 'content',
    new URL(DEFAULTS.image, SITE_URL).href);

  writeFileSync(file, $.html());
  console.log('[og-inject] updated', routePath || '/');
}

console.log(`[og-inject] Done. Modified ${htmlFiles.length} HTML files.`);
