// scripts/generate-rss.mjs
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { fetchAndTransformBabyloveArticles } from '../src/lib/babyloveApi.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE_URL = process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://marketingcar.com';
const SITE_NAME = 'Marketing Car';
const SITE_DESCRIPTION = 'Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.';

async function generateRSSFeed() {
  console.log('=📡 Starting RSS feed generation...');

  const blogDirectory = path.join(root, 'content', 'blog');
  const posts = [];

  // Load static markdown blog posts
  if (existsSync(blogDirectory)) {
    try {
      const files = readdirSync(blogDirectory);
      console.log(`📁 Found ${files.length} blog files`);

      for (const file of files) {
        if (file.endsWith('.md')) {
          const fullPath = path.join(blogDirectory, file);
          const fileContents = readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          // Only include published posts
          if (data.published !== false) {
            posts.push({
              title: data.title || 'Untitled',
              slug: data.slug || file.replace(/\.md$/, ''),
              description: data.excerpt || content.substring(0, 200).replace(/[#*`]/g, '').trim() + '...',
              date: new Date(data.date || Date.now()),
              author: data.author || 'Marketing Car',
              content: content.trim()
            });
          }
        }
      }

      console.log(`✅ Processed ${posts.length} static blog posts`);
    } catch (error) {
      console.warn('📁 Error reading blog directory:', error.message);
    }
  } else {
    console.log('📁 No blog directory found');
  }

  // Load API blog posts from Babylove
  try {
    console.log('🌐 Fetching API blog posts...');
    const apiPosts = await fetchAndTransformBabyloveArticles();

    for (const apiPost of apiPosts) {
      posts.push({
        title: apiPost.title || 'Untitled',
        slug: apiPost.slug,
        description: apiPost.excerpt || apiPost.title,
        date: new Date(apiPost.created_at || Date.now()),
        author: 'Marketing Car',
        content: apiPost.content || ''
      });
    }

    console.log(`✅ Processed ${apiPosts.length} API blog posts`);
  } catch (error) {
    console.warn('🌐 Error fetching API blog posts:', error.message);
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