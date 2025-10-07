// scripts/inject-og-into-html.mjs
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { load } from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist'); // change to 'build' if that's your output
const routesFile = path.join(root, '.prerender-routes.json');

// Site identity & fallbacks
const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://www.marketingcar.com';

const SITE_NAME = 'Marketing Car';

const DEFAULTS = {
  title: 'Marketing Car',
  desc: 'Expert small business marketing that drives real growth with SEO, local marketing, content strategy, branding & paid ads. Book your free consultation today!',
  image: '/og/og-default.png',
};

// Load optional per-route overrides (shared with SEOHelmet)
const overridesPath = path.join(root, 'src/seo/overrides.json');
let overrides = {};
if (existsSync(overridesPath)) {
  try {
    overrides = JSON.parse(readFileSync(overridesPath, 'utf8'));
  } catch (e) {
    console.warn('[og-inject] Could not parse overrides.json:', e.message);
  }
}

// Load blog post data for dynamic OG tags
const blogDataPath = path.join(root, 'src/data/staticBlogPosts.js');
let blogPosts = [];
if (existsSync(blogDataPath)) {
  try {
    const blogDataContent = readFileSync(blogDataPath, 'utf8');
    // Extract the blogPosts array from the JS module
    const blogPostsMatch = blogDataContent.match(/export const blogPosts = (\[[\s\S]*?\]);/);
    if (blogPostsMatch) {
      blogPosts = JSON.parse(blogPostsMatch[1]);
      console.log('[og-inject] Loaded', blogPosts.length, 'blog posts');
    }
  } catch (e) {
    console.warn('[og-inject] Could not parse blog posts:', e.message);
  }
}

// Load Ghost pages data
const pagesDataPath = path.join(root, 'src/data/staticPages.js');
let ghostPages = [];
if (existsSync(pagesDataPath)) {
  try {
    const pagesDataContent = readFileSync(pagesDataPath, 'utf8');
    const pagesMatch = pagesDataContent.match(/export const pages = (\[[\s\S]*?\]);/);
    if (pagesMatch) {
      ghostPages = JSON.parse(pagesMatch[1]);
      console.log('[og-inject] Loaded', ghostPages.length, 'Ghost pages');
    }
  } catch (e) {
    console.warn('[og-inject] Could not parse Ghost pages:', e.message);
  }
}

// Load services data - extract just the meta information we need
const servicesDataPath = path.join(root, 'src/data/servicesData.js');
let services = [];
if (existsSync(servicesDataPath)) {
  try {
    const servicesDataContent = readFileSync(servicesDataPath, 'utf8');
    // Extract each service object's slug and meta info
    const serviceMatches = servicesDataContent.matchAll(/\{\s*slug:\s*["']([^"']+)["'][\s\S]*?meta:\s*\{([^}]+)\}/g);
    for (const match of serviceMatches) {
      const slug = match[1];
      const metaContent = match[2];

      // Extract meta fields
      const titleMatch = metaContent.match(/title:\s*["']([^"']+)["']/);
      const descriptionMatch = metaContent.match(/description:\s*["']([^"']+)["']/);
      const ogTitleMatch = metaContent.match(/ogTitle:\s*["']([^"']+)["']/);
      const ogDescriptionMatch = metaContent.match(/ogDescription:\s*["']([^"']+)["']/);

      services.push({
        slug,
        meta: {
          title: titleMatch ? titleMatch[1] : null,
          description: descriptionMatch ? descriptionMatch[1] : null,
          ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
          ogDescription: ogDescriptionMatch ? ogDescriptionMatch[1] : null
        }
      });
    }
    console.log('[og-inject] Loaded', services.length, 'services');
  } catch (e) {
    console.warn('[og-inject] Could not parse services data:', e.message);
  }
}

// Load who we help data - extract just the meta information we need
const whoWeHelpDataPath = path.join(root, 'src/data/whoWeHelpData.jsx');
let professionals = [];
if (existsSync(whoWeHelpDataPath)) {
  try {
    const whoWeHelpDataContent = readFileSync(whoWeHelpDataPath, 'utf8');
    // Extract each professional object's slug and meta info
    const professionalMatches = whoWeHelpDataContent.matchAll(/\{\s*slug:\s*['"]([^'"]+)['"][\s\S]*?meta:\s*\{([^}]+)\}/g);
    for (const match of professionalMatches) {
      const slug = match[1];
      const metaContent = match[2];

      // Extract meta fields
      const titleMatch = metaContent.match(/title:\s*["']([^"']+)["']/);
      const descriptionMatch = metaContent.match(/description:\s*["']([^"']+)["']/);
      const ogTitleMatch = metaContent.match(/ogTitle:\s*["']([^"']+)["']/);
      const ogDescriptionMatch = metaContent.match(/ogDescription:\s*["']([^"']+)["']/);

      professionals.push({
        slug,
        meta: {
          title: titleMatch ? titleMatch[1] : null,
          description: descriptionMatch ? descriptionMatch[1] : null,
          ogTitle: ogTitleMatch ? ogTitleMatch[1] : null,
          ogDescription: ogDescriptionMatch ? ogDescriptionMatch[1] : null
        }
      });
    }
    console.log('[og-inject] Loaded', professionals.length, 'who-we-help pages');
  } catch (e) {
    console.warn('[og-inject] Could not parse who-we-help data:', e.message);
  }
}

// Create blog post overrides
const blogOverrides = {};
for (const post of blogPosts) {
  const routePath = `/blog/${post.slug}`;
  blogOverrides[routePath] = {
    title: `${post.title} | Marketing Car Blog`,
    description: post.excerpt || post.content.replace(/<[^>]*>/g, '').substring(0, 160).trim() + '...',
    image: post.image_url || '/og/og-default.png',
    type: 'article',
    schema: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt || post.meta_description,
      "image": post.image_url || post.og_image,
      "datePublished": post.created_at,
      "author": {
        "@type": "Organization",
        "name": "Marketing Car",
        "url": "https://www.marketingcar.com"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Marketing Car",
        "logo": {
          "@type": "ImageObject",
          "url": "https://www.marketingcar.com/mainlogo.png"
        }
      }
    }
  };
}

// Create Ghost page overrides
const pageOverrides = {};
for (const page of ghostPages) {
  const routePath = `/p/${page.slug}`;
  pageOverrides[routePath] = {
    title: `${page.title} | Marketing Car`,
    description: page.excerpt || page.meta_description || page.title,
    image: page.image_url || page.og_image || '/og/og-default.png',
    type: 'website',
    schema: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "headline": page.title,
      "description": page.meta_description || page.excerpt,
      "image": page.image_url,
      "datePublished": page.created_at,
      "author": {
        "@type": "Organization",
        "name": page.author || "Marketing Car"
      }
    }
  };
}

// Create service overrides
const serviceOverrides = {};
for (const service of services) {
  const routePath = `/services/${service.slug}`;
  serviceOverrides[routePath] = {
    title: service.meta?.title,
    description: service.meta?.description,
    image: '/og/og-default.png',
    type: 'website'
  };
}

// Create who-we-help overrides
const whoWeHelpOverrides = {};
for (const professional of professionals) {
  const routePath = `/who-we-help/${professional.slug}`;
  whoWeHelpOverrides[routePath] = {
    title: professional.meta?.title,
    description: professional.meta?.description,
    image: '/og/og-default.png',
    type: 'website'
  };
}

// Merge all overrides
overrides = { ...overrides, ...blogOverrides, ...pageOverrides, ...serviceOverrides, ...whoWeHelpOverrides };

function walk(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const p = path.join(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (p.endsWith('.html')) out.push(p);
  }
  return out;
}

function ensure($, sel, attr, value) {
  // ALWAYS remove existing tags first to prevent duplicates and ensure our values win
  if (sel.startsWith('meta[')) {
    const m = sel.match(/\[(name|property)=["']([^"']+)["']\]/);
    if (m) {
      const [, attrName, attrValue] = m;
      $(`meta[${attrName}="${attrValue}"]`).remove();
    }
  } else if (sel.startsWith('link[')) {
    const m = sel.match(/\[rel=["']([^"']+)["']\]/);
    if (m) {
      $(`link[rel="${m[1]}"]`).remove();
    }
  }

  // Now add the new tag with our value
  if (sel.startsWith('meta[')) {
    const $m = $('<meta/>');
    const m = sel.match(/\[(name|property)=["']([^"']+)["']\]/);
    if (m) $m.attr(m[1], m[2]);
    $m.attr(attr, value);
    $('head').append($m);
  } else if (sel.startsWith('link[')) {
    const $l = $('<link/>');
    const m = sel.match(/\[rel=["']([^"']+)["']\]/);
    if (m) $l.attr('rel', m[1]);
    $l.attr(attr, value);
    $('head').append($l);
  }
}

function absUrl(pathOrUrl) {
  try { return new URL(pathOrUrl, SITE_URL).href; } catch { return pathOrUrl; }
}

const htmlFiles = walk(dist);
const routes = (() => {
  try { return JSON.parse(readFileSync(routesFile, 'utf8')); }
  catch { return ['/']; }
})();

for (const file of htmlFiles) {
  const rel = `/${path.relative(dist, file).replace(/\\/g, '/')}`;
  // e.g. dist/about/index.html -> /about
  const routePath = rel.replace(/\/index\.html$/, '') || '/';
  const url = new URL(routePath, SITE_URL).href;

  const $ = load(readFileSync(file, 'utf8'));

  // Baseline from the document, then apply per-route overrides
  const docTitle = $('title').first().text().trim();
  const docDesc  = $('meta[name="description"]').attr('content');

  const ov = overrides[routePath] || {};

  const finalTitle = ov.title || docTitle || DEFAULTS.title;
  const finalDesc  = ov.description || docDesc || DEFAULTS.desc;
  const finalType  = ov.type || 'website';
  const finalImg   = absUrl(ov.image || DEFAULTS.image);
  const robotsNoIndex = typeof ov.noIndex === 'boolean' ? ov.noIndex : false;

  // ALWAYS update title tag with the final title (don't trust React Helmet)
  $('title').first().text(finalTitle);

  // Canonical
  ensure($, 'link[rel="canonical"]', 'href', url);

  // Basic description (keep existing <meta name="description"> if present, else add)
  ensure($, 'meta[name="description"]', 'content', finalDesc);

  // Open Graph
  ensure($, 'meta[property="og:title"]', 'content', finalTitle);
  ensure($, 'meta[property="og:description"]', 'content', finalDesc);
  ensure($, 'meta[property="og:type"]', 'content', finalType);
  ensure($, 'meta[property="og:url"]', 'content', url);
  ensure($, 'meta[property="og:image"]', 'content', finalImg);
  ensure($, 'meta[property="og:image:secure_url"]', 'content', finalImg);
  ensure($, 'meta[property="og:site_name"]', 'content', SITE_NAME);
  ensure($, 'meta[property="og:image:width"]', 'content', '1200');
  ensure($, 'meta[property="og:image:height"]', 'content', '630');

  // Twitter
  ensure($, 'meta[name="twitter:card"]', 'content', 'summary_large_image');
  ensure($, 'meta[name="twitter:title"]', 'content', finalTitle);
  ensure($, 'meta[name="twitter:description"]', 'content', finalDesc);
  ensure($, 'meta[name="twitter:image"]', 'content', finalImg);

  // Robots
  ensure($, 'meta[name="robots"]', 'content', robotsNoIndex ? 'noindex,nofollow' : 'index,follow');

  // JSON-LD Schema
  if (ov.schema) {
    // Remove any existing JSON-LD schema first
    $('script[type="application/ld+json"]').remove();

    // Add new schema
    const schemaScript = $('<script type="application/ld+json"></script>');
    schemaScript.text(JSON.stringify(ov.schema));
    $('head').append(schemaScript);
  }

  writeFileSync(file, $.html());
  console.log('[og-inject] updated', routePath || '/');
}

console.log(`[og-inject] Done. Modified ${htmlFiles.length} HTML files.`);
