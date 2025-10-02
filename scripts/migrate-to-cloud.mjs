import { blogPosts } from '../src/data/staticBlogPosts.js';
import { htmlToStrapiBlocks } from './html-to-strapi-blocks.mjs';

const LOCAL_STRAPI_URL = 'http://localhost:1337';
const LOCAL_STRAPI_TOKEN = '7f187d008b1ccc06649dc8779e8959eefefc991dd55022f3ee75dede8addfcf64262ba0770500ebf560398147d520dc957fd012b1643f0317bc58482a52f9cc0db7191b304ea3212b5e24307710342d5a3384daba01422b787b532afebf8ac239cc41513793ecacb235decc0997fe7f31292b566b7e13c9e563167a8ec29aee8';

const CLOUD_STRAPI_URL = 'https://prized-comfort-f8701bc0e2.strapiapp.com';
const CLOUD_STRAPI_TOKEN = '79cf8ff9c39b7386666c4520a4825259318834aa554233ee286af128fe6319ebca703c85bb9ac1c4f8cea59f208c030c0412dd3c215fa8d95813ba4f64c09572fdf3d0ab32b700e4bd15856b7d2e89c6f3a969b75bc55d028090d3b524d31c1cd8d65fa511eadcbe576763a9d7975d27fffc71fefa64d8d14ed5d43eddf62077';

async function migrateToCloud() {
  console.log('Fetching posts from local Strapi...');

  // Fetch all posts from local Strapi
  const response = await fetch(`${LOCAL_STRAPI_URL}/api/blogs`, {
    headers: {
      'Authorization': `Bearer ${LOCAL_STRAPI_TOKEN}`,
    },
  });

  const localData = await response.json();
  const localPosts = localData.data;

  console.log(`Found ${localPosts.length} posts in local Strapi`);

  let successCount = 0;
  let errorCount = 0;

  for (const post of localPosts) {
    try {
      console.log(`Creating: ${post.title}`);

      // Step 1: Create post without content
      // Convert tags to JSON format if needed
      let tagsValue = null;
      if (post.tags) {
        if (typeof post.tags === 'string') {
          // Convert comma-separated string to array
          tagsValue = post.tags.split(',').map(t => t.trim()).filter(Boolean);
        } else if (Array.isArray(post.tags)) {
          tagsValue = post.tags;
        }
      }

      const createPayload = {
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          image_url: post.image_url,
          published: post.published !== false,
          tags: tagsValue,
        }
      };

      const createResponse = await fetch(`${CLOUD_STRAPI_URL}/api/blogs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CLOUD_STRAPI_TOKEN}`,
        },
        body: JSON.stringify(createPayload),
      });

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        console.error(`❌ Failed to create "${post.title}":`, createResponse.status);
        console.error(`   Error:`, errorText);
        errorCount++;
        continue;
      }

      const createdPost = await createResponse.json();
      console.log(`✅ Created: ${post.title}`);

      // Step 2: Update with content
      if (post.content) {
        console.log(`   Updating content for: ${post.title}`);

        const updateResponse = await fetch(`${CLOUD_STRAPI_URL}/api/blogs/${createdPost.data.documentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${CLOUD_STRAPI_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              content: post.content
            }
          }),
        });

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error(`   ⚠️  Failed to update content:`, updateResponse.status);
        } else {
          console.log(`   ✅ Content updated`);
        }
      }

      successCount++;
    } catch (error) {
      console.error(`❌ Error migrating "${post.title}":`, error.message);
      errorCount++;
    }
  }

  console.log('\n=== Migration Complete ===');
  console.log(`✅ Successfully migrated: ${successCount} posts`);
  console.log(`❌ Failed: ${errorCount} posts`);
}

migrateToCloud();
