import { blogPosts } from '../src/data/staticBlogPosts.js';

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '7f187d008b1ccc06649dc8779e8959eefefc991dd55022f3ee75dede8addfcf64262ba0770500ebf560398147d520dc957fd012b1643f0317bc58482a52f9cc0db7191b304ea3212b5e24307710342d5a3384daba01422b787b532afebf8ac239cc41513793ecacb235decc0997fe7f31292b566b7e13c9e563167a8ec29aee8';

async function migrateBlogPosts() {
  console.log(`Starting migration of ${blogPosts.length} blog posts to Strapi...`);

  let successCount = 0;
  let errorCount = 0;

  for (const post of blogPosts) {
    try {
      const payload = {
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          image_url: post.image_url,
          published: post.published !== false,
          tags: Array.isArray(post.tags) ? post.tags.join(', ') : (post.tags || ''),
        }
      };

      const response = await fetch(`${STRAPI_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${STRAPI_TOKEN}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Failed to migrate "${post.title}":`, response.status);
        console.error(`   Error:`, errorText);
        errorCount++;
      } else {
        const result = await response.json();
        console.log(`✅ Migrated: ${post.title} (ID: ${result.data.id})`);
        successCount++;
      }
    } catch (error) {
      console.error(`❌ Error migrating "${post.title}":`, error.message);
      errorCount++;
    }
  }

  console.log('\n=== Migration Complete ===');
  console.log(`✅ Successfully migrated: ${successCount} posts`);
  console.log(`❌ Failed: ${errorCount} posts`);
}

migrateBlogPosts();
