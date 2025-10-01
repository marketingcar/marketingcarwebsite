const STRAPI_URL = 'http://localhost:1337';
const STRAPI_TOKEN = '7f187d008b1ccc06649dc8779e8959eefefc991dd55022f3ee75dede8addfcf64262ba0770500ebf560398147d520dc957fd012b1643f0317bc58482a52f9cc0db7191b304ea3212b5e24307710342d5a3384daba01422b787b532afebf8ac239cc41513793ecacb235decc0997fe7f31292b566b7e13c9e563167a8ec29aee8';

async function deleteTestPost() {
  // Fetch all posts
  const response = await fetch(`${STRAPI_URL}/api/blogs`, {
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  const data = await response.json();
  const testPost = data.data.find(post => post.title === 'test');

  if (!testPost) {
    console.log('No test post found');
    return;
  }

  console.log(`Found test post with documentId: ${testPost.documentId}`);

  // Delete the post
  const deleteResponse = await fetch(`${STRAPI_URL}/api/blogs/${testPost.documentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${STRAPI_TOKEN}`,
    },
  });

  if (deleteResponse.ok) {
    console.log('✅ Test post deleted successfully');
  } else {
    console.log('❌ Failed to delete test post:', deleteResponse.status);
  }
}

deleteTestPost();
