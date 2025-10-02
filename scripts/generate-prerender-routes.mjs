import { writeFileSync } from 'fs';
import { blogPosts as staticBlogPosts } from '../src/data/staticBlogPosts.js';

const STRAPI_URL = process.env.VITE_STRAPI_URL || 'https://prized-comfort-f8701bc0e2.strapiapp.com';
const STRAPI_TOKEN = process.env.VITE_STRAPI_API_TOKEN || 'f95a0eaf4a65d7869fd6b7f1a9d30619b3ad058415c9c83c5ce365cf69feae15a76e5d280e6753c2c0918b74df18a1a98c437a660845ae3e05a9e56a920fa877ea03c8bbd16d4dc431947f302f3976e21f1cb53e35b78395f76abd673fdf456228b9f485f489bd4d444eaacca5deca2578093447d6a751185605cc4c510a39ca';

async function generatePrerenderRoutes() {
  console.log('📡 Fetching blog posts from Strapi...');

  const routes = [
    '/',
    '/about',
    '/services',
    '/services/digital-marketing',
    '/services/brand-development',
    '/services/content-creation',
    '/services/local-seo',
    '/services/lead-generation',
    '/services/online-advertising',
    '/services/web-development',
    '/blog',
    '/contact',
    '/lp/spinning-wheels',
    '/lp/better-marketing-map',
  ];

  try {
    // Fetch Strapi posts
    const headers = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=main_image&sort=createdAt:desc`, {
      headers,
    });

    if (response.ok) {
      const data = await response.json();
      const strapiPosts = data.data || [];
      console.log(`✅ Found ${strapiPosts.length} posts from Strapi`);

      // Add Strapi blog post routes
      strapiPosts.forEach(post => {
        if (post.slug) {
          routes.push(`/blog/${post.slug}`);
        }
      });
    } else {
      console.warn(`⚠️  Failed to fetch from Strapi: ${response.status}`);
    }
  } catch (error) {
    console.warn(`⚠️  Error fetching from Strapi:`, error.message);
  }

  // Add BabyLoveGrowth post routes
  const babylovePosts = staticBlogPosts.filter(post =>
    post.source === 'babylovegrowth' || post.id?.startsWith('babylove_')
  );
  console.log(`✅ Found ${babylovePosts.length} BabyLoveGrowth posts`);

  babylovePosts.forEach(post => {
    if (post.slug && !routes.includes(`/blog/${post.slug}`)) {
      routes.push(`/blog/${post.slug}`);
    }
  });

  // Write routes to file
  writeFileSync('.prerender-routes.json', JSON.stringify(routes, null, 2));
  console.log(`\n✅ Generated ${routes.length} routes for prerendering`);
  console.log(`   - ${routes.filter(r => r.startsWith('/blog/')).length} blog post routes`);
  console.log(`   - ${routes.filter(r => !r.startsWith('/blog/')).length} static page routes`);
}

generatePrerenderRoutes().catch(error => {
  console.error('❌ Failed to generate prerender routes:', error);
  process.exit(1);
});
