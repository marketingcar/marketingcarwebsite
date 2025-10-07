// scripts/generate-rss.mjs
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://marketingcar.com';
const SITE_NAME = 'Marketing Car';
const SITE_DESCRIPTION = 'Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.';

async function generateRSSFeed() {
  console.log('=📡 Starting RSS feed generation...');

  const posts = [];

  // Load ALL blog posts from staticBlogPosts.js (includes Ghost + BabyLove)
  const staticBlogFile = path.join(root, 'src', 'data', 'staticBlogPosts.js');
  if (existsSync(staticBlogFile)) {
    try {
      const fileContents = readFileSync(staticBlogFile, 'utf8');
      const match = fileContents.match(/export const blogPosts = (\[[\s\S]*?\]);/);

      if (match) {
        const blogPosts = JSON.parse(match[1]);
        console.log(`📁 Found ${blogPosts.length} total blog posts (Ghost + BabyLove)`);

        for (const post of blogPosts) {
          posts.push({
            title: post.title || 'Untitled',
            slug: post.slug,
            description: post.excerpt || post.meta_description || post.title,
            date: new Date(post.created_at || Date.now()),
            author: post.author || 'Marketing Car',
            content: post.content || '',
            image: post.image_url || post.og_image
          });
        }

        console.log(`✅ Processed ${posts.length} blog posts for RSS`);
      }
    } catch (error) {
      console.warn('📁 Error reading staticBlogPosts.js:', error.message);
    }
  } else {
    console.warn('📁 staticBlogPosts.js not found - run build-blog-static.mjs first');
  }

  // Sort posts by date (newest first)
  posts.sort((a, b) => b.date - a.date);

  // Generate RSS XML
  const rssItems = posts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${SITE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${post.date.toUTCString()}</pubDate>
      <author>noreply@marketingcar.com (${post.author})</author>
    </item>`).join('\n');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-US</language>
    <managingEditor>noreply@marketingcar.com (Marketing Car)</managingEditor>
    <webMaster>noreply@marketingcar.com (Marketing Car)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  // Ensure dist directory exists
  if (!existsSync(dist)) {
    mkdirSync(dist, { recursive: true });
  }

  // Create feed directory
  const feedDir = path.join(dist, 'feed');
  if (!existsSync(feedDir)) {
    mkdirSync(feedDir, { recursive: true });
  }

  // Write RSS files
  writeFileSync(path.join(dist, 'feed.xml'), rssXml, 'utf-8');
  writeFileSync(path.join(feedDir, 'index.xml'), rssXml, 'utf-8');

  console.log(`✅ Generated RSS feed with ${posts.length} total posts at:`);
  console.log(`   - ${SITE_URL}/feed.xml`);
  console.log(`   - ${SITE_URL}/feed/`);

  return posts.length;
}

async function main() {
  try {
    const postCount = await generateRSSFeed();
    console.log(`✅ RSS feed generation completed successfully! Generated feed with ${postCount} posts`);
  } catch (error) {
    console.error('❌ RSS feed generation failed:', error);
    process.exit(1);
  }
}

main();