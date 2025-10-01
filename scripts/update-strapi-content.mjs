import { blogPosts } from '../src/data/staticBlogPosts.js';
import { htmlToStrapiBlocks } from './html-to-strapi-blocks.mjs';

const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '7f187d008b1ccc06649dc8779e8959eefefc991dd55022f3ee75dede8addfcf64262ba0770500ebf560398147d520dc957fd012b1643f0317bc58482a52f9cc0db7191b304ea3212b5e24307710342d5a3384daba01422b787b532afebf8ac239cc41513793ecacb235decc0997fe7f31292b566b7e13c9e563167a8ec29aee8';

async function updateStrapiContent() {
  console.log('Fetching existing Strapi posts...');

  // Fetch all existing posts from Strapi
  const response = await fetch(`${STRAPI_URL}/api/blogs`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  const strapiData = await response.json();
  const strapiPosts = strapiData.data;

  console.log(`Found ${strapiPosts.length} posts in Strapi`);

  let updatedCount = 0;
  let errorCount = 0;

  for (const strapiPost of strapiPosts) {
    // Find matching static post by slug
    const staticPost = blogPosts.find(p => p.slug === strapiPost.slug);

    if (staticPost && staticPost.content) {
      try {
        console.log(`Updating content for: ${strapiPost.title}`);

        // Convert HTML to Strapi blocks format
        const contentBlocks = htmlToStrapiBlocks(staticPost.content);

        const updateResponse = await fetch(`${STRAPI_URL}/api/blogs/${strapiPost.documentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${STRAPI_TOKEN}`,
          },
          body: JSON.stringify({
            data: {
              content: contentBlocks,
            }
          }),
        });

        if (!updateResponse.ok) {
          const errorText = await updateResponse.text();
          console.error(`❌ Failed to update "${strapiPost.title}":`, updateResponse.status);
          console.error(`   Error:`, errorText);
          errorCount++;
        } else {
          console.log(`✅ Updated: ${strapiPost.title}`);
          updatedCount++;
        }
      } catch (error) {
        console.error(`❌ Error updating "${strapiPost.title}":`, error.message);
        errorCount++;
      }
    } else {
      console.log(`⚠️  No matching static content for: ${strapiPost.title}`);
    }
  }

  console.log('\n=== Update Complete ===');
  console.log(`✅ Successfully updated: ${updatedCount} posts`);
  console.log(`❌ Failed: ${errorCount} posts`);
}

updateStrapiContent();
