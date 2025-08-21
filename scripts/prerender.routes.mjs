// scripts/prerender.routes.mjs
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { writeFileSync, readFileSync, existsSync } from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const normalize = (r) => {
  if (!r) return '/';
  let out = r.startsWith('/') ? r : `/${r}`;
  if (out !== '/' && !out.endsWith('/')) out += '/';
  return out.replace(/\/{2,}/g, '/');
};

const joinRoute = (base, slug) => {
  let b = normalize(base);
  if (!b.endsWith('/')) b += '/';
  let s = String(slug || '').replace(/^\/+|\/+$/g, '');
  return normalize(`${b}${s}/`);
};

const read = (p) => readFileSync(p, 'utf8');

// 1) Read all <Route path="..."> from App.jsx and ignore redirects
const appPath = path.join(root, 'src', 'App.jsx');
let declaredRoutes = [];
if (existsSync(appPath)) {
  const src = read(appPath);
  const routeRegex = /<Route\s+path\s*=\s*["']([^"']+)["']\s+element\s*=\s*{([^}]+)}/g;
  let m;
  while ((m = routeRegex.exec(src))) {
    const p = m[1];
    const el = m[2];
    if (el.includes('Navigate')) continue; // skip redirects like /blog -> /about/blog
    declaredRoutes.push(p);
  }
}

// 2) Extract slugs by regex so JSX in data files will not break Node
function extractSlugsFrom(filePath) {
  if (!existsSync(filePath)) return [];
  const src = read(filePath);
  const found = new Set();
  const slugRegex = /slug\s*:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = slugRegex.exec(src))) found.add(m[1]);
  return Array.from(found);
}

// Data sources
const servicesFile = path.join(root, 'src', 'data', 'servicesData.js');
const whoFile = path.join(root, 'src', 'data', 'whoWeHelpData.jsx'); // exports `professionals`
const caseStudiesFile = path.join(root, 'src', 'data', 'caseStudiesData.jsx');
const blogFiles = [
  path.join(root, 'src', 'data', 'localBlogData.js'),
  path.join(root, 'src', 'data', 'blogPosts.js'),
];

const serviceSlugs = extractSlugsFrom(servicesFile);
const whoSlugs = extractSlugsFrom(whoFile);
const caseSlugs = extractSlugsFrom(caseStudiesFile);

let blogSlugs = [];
for (const f of blogFiles) {
  const slugs = extractSlugsFrom(f);
  if (slugs.length) { blogSlugs = slugs; break; }
}

// 3) Build routes
const base = new Set([
  '/', '/about/', '/services/', '/who-we-help/', '/contact/', '/book-now/',
  '/lp-free-marketing-tips/', '/lp-spinning-wheels/', '/lp-spinning-wheels-therapists/',
  '/lp-spinning-wheels-trades/', '/lp-webinar-1/', '/lp-webinar-2/', '/thank-you/',
  '/webinars/', '/case-studies/', '/about/case-studies/', '/about/the-marketing-car/',
  '/about/webinars/', '/about/blog/'
].map(normalize));

// add non dynamic routes declared in App.jsx
for (const p of declaredRoutes) {
  if (!p.includes('/:')) base.add(normalize(p));
}

// expand dynamics according to what App.jsx actually declares
const needsServices = declaredRoutes.some(p => p.includes('/services/:slug'));
const needsWho = declaredRoutes.some(p => p.includes('/who-we-help/:slug'));
const needsCase = declaredRoutes.some(p => p.includes('/about/case-studies/:slug') || p.includes('/case-studies/:slug'));
const needsBlog = declaredRoutes.some(p => p.includes('/about/blog/:slug') || p.includes('/blog/:slug'));

if (needsServices) serviceSlugs.forEach(s => base.add(joinRoute('/services', s)));
if (needsWho) whoSlugs.forEach(s => base.add(joinRoute('/who-we-help', s)));
if (needsCase) {
  const caseBase = declaredRoutes.find(p => p.includes('/about/case-studies/:slug')) ? '/about/case-studies' : '/case-studies';
  caseSlugs.forEach(s => base.add(joinRoute(caseBase, s)));
}
if (needsBlog) {
  const blogBase = declaredRoutes.find(p => p.includes('/about/blog/:slug')) ? '/about/blog' : '/blog';
  blogSlugs.forEach(s => base.add(joinRoute(blogBase, s)));
}

// 4) Write
const routes = Array.from(base).sort((a, b) => (a === '/' ? -1 : b === '/' ? 1 : a.localeCompare(b)));
writeFileSync(path.join(root, '.prerender-routes.json'), JSON.stringify(routes, null, 2));

console.log(`[prerender] Declared routes: ${declaredRoutes.length}`);
console.log(`[prerender] Slugs — services:${serviceSlugs.length} who:${whoSlugs.length} case:${caseSlugs.length} blog:${blogSlugs.length}`);
console.log(`[prerender] Total routes written: ${routes.length}`);
