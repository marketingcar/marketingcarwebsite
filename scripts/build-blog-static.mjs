import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BABYLOVE_API_BASE_URL = 'https://api.babylovegrowth.ai/api/public';
const BABYLOVE_API_KEY = '84dbc772-cacd-44d5-8957-474a29a9c4cf';

const babyloveHeaders = {
  'X-API-Key': BABYLOVE_API_KEY,
  'Content-Type': 'application/json'
};

// Note: Supabase blog posts removed - using only Babylove posts
// If you need Supabase posts, add '@supabase/supabase-js' to package.json

async function fetchBabyloveArticles() {
  console.log('= Fetching articles from Babylove API...');

  try {
    const response = await fetch(`${BABYLOVE_API_BASE_URL}/articles`, {
      method: 'GET',
      headers: babyloveHeaders
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }

    const articles = await response.json();
    console.log(` Fetched ${articles.length} article summaries from Babylove API`);

    const detailedArticles = [];
    for (const article of articles) {
      try {
        const detailResponse = await fetch(`${BABYLOVE_API_BASE_URL}/articles/${article.id}`, {
          method: 'GET',
          headers: babyloveHeaders
        });

        if (detailResponse.ok) {
          const detailedArticle = await detailResponse.json();

          const transformedArticle = {
            id: `babylove_${detailedArticle.id}`,
            created_at: detailedArticle.created_at,
            title: detailedArticle.title,
            slug: detailedArticle.slug,
            content: detailedArticle.content_html || detailedArticle.content_markdown,
            excerpt: detailedArticle.meta_description || detailedArticle.title,
            image_url: detailedArticle.hero_image_url || 'https://www.marketingcar.com/blog/default-babylove.png',
            source: 'babylovegrowth',
            original_id: detailedArticle.id,
            original_slug: detailedArticle.slug,
            language_code: detailedArticle.languageCode,
            org_website: detailedArticle.orgWebsite
          };

          detailedArticles.push(transformedArticle);
        }
      } catch (detailError) {
        console.warn(`Failed to fetch details for article ${article.id}:`, detailError.message);
      }
    }

    console.log(` Successfully processed ${detailedArticles.length} detailed articles from Babylove API`);
    return detailedArticles;
  } catch (error) {
    console.error('Error fetching Babylove articles:', error);
    return [];
  }
}

async function generateStaticBlogData(allPosts) {
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  const outputFile = path.join(outputDir, 'staticBlogPosts.js');

  await fs.mkdir(outputDir, { recursive: true });

  const fileContent = `// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const blogPosts = ${JSON.stringify(allPosts, null, 2)};

export const blogPostsMap = new Map(
  blogPosts.map(post => [post.slug, post])
);

export function getBlogPostBySlug(slug) {
  return blogPostsMap.get(slug);
}

export function getAllBlogPosts() {
  return blogPosts;
}
`;

  await fs.writeFile(outputFile, fileContent, 'utf-8');
  console.log(` Generated static blog data at: ${outputFile}`);

  return outputFile;
}

async function main() {
  try {
    console.log('=📝 Starting static blog generation (Babylove API only)...');

    // Fetch posts from Babylove API
    const babylovePosts = await fetchBabyloveArticles();

    // Sort by creation date (newest first)
    const allPosts = babylovePosts.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    console.log(` Generated ${allPosts.length} total posts from Babylove API`);

    await generateStaticBlogData(allPosts);

    console.log('<✅ Static blog generation completed successfully!');
  } catch (error) {
    console.error('=❌ Static blog generation failed:', error);
    process.exit(1);
  }
}

main();