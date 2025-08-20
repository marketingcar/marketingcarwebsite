// If you use dotenv, keep this line. If you prefer Node's --env-file, remove it.
import 'dotenv/config';

import { fileURLToPath } from 'url';
import path from 'node:path';
import { writeFileSync } from 'node:fs';
import { createClient } from '@supabase/supabase-js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.resolve(__dirname, '../.prerender-routes.json');

// Core static routes you want prerendered
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/who-we-help',
  '/contact',
  '/book-now',
  '/about/blog',
  '/lp-free-marketing-tips',
  '/lp-webinar-1',
  '/lp-webinar-2'
];

async function fetchBlogRoutes() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    console.warn('[prerender] Missing SUPABASE_URL or SUPABASE_ANON_KEY; continuing with static routes only.');
    return [];
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

    // Select slugs from your "posts" table (no 'published' filter since that column isn't in your schema)
    const { data, error } = await supabase
      .from('posts')
      .select('slug')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return (data ?? [])
      .map(r => r?.slug)
      .filter(Boolean)
      .map(slug => `/about/blog/${slug}`);
  } catch (e) {
    console.warn('[prerender] Supabase fetch failed:', e.message);
    return [];
  }
}

const blogRoutes = await fetchBlogRoutes();
const routes = [...new Set([...staticRoutes, ...blogRoutes])];

writeFileSync(out, JSON.stringify(routes, null, 2));
console.log(`[prerender] Wrote ${routes.length} routes -> ${out}`);
