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

// Ghost CMS configuration
const GHOST_API_URL = 'https://mc.marketingcarcontent.com';
const GHOST_CONTENT_API_KEY = 'de3290ace76f6e6e4a1404c591';

async function fetchGhostPosts() {
  console.log('= Fetching posts from Ghost CMS...');

  try {
    const url = `${GHOST_API_URL}/ghost/api/content/posts/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors&limit=all&fields=id,title,slug,html,feature_image,published_at,excerpt,meta_description,meta_title,og_image,og_title,og_description,twitter_image,twitter_title,twitter_description,custom_excerpt`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const posts = data.posts || [];

    console.log(` Fetched ${posts.length} posts from Ghost CMS`);

    // Transform Ghost posts to our format
    const transformedPosts = posts.map(post => ({
      id: `ghost_${post.id}`,
      created_at: post.published_at,
      title: post.title,
      slug: post.slug,
      content: post.html,
      excerpt: post.custom_excerpt || post.excerpt || '',
      image_url: post.feature_image || '',
      published: true,
      author: post.primary_author?.name || 'Marketing Car',
      source: 'ghost',
      tags: post.tags?.map(tag => tag.name) || [],
      meta_title: post.meta_title || post.title,
      meta_description: post.meta_description || post.excerpt,
      og_image: post.og_image || post.feature_image,
      og_title: post.og_title || post.title,
      og_description: post.og_description || post.excerpt,
      twitter_image: post.twitter_image || post.feature_image,
      twitter_title: post.twitter_title || post.title,
      twitter_description: post.twitter_description || post.excerpt,
    }));

    return transformedPosts;
  } catch (error) {
    console.error('Error fetching Ghost posts:', error);
    return [];
  }
}

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
    console.log('=📝 Starting static blog generation (Ghost + Babylove)...');

    // Fetch posts from both sources
    const [ghostPosts, babylovePosts] = await Promise.all([
      fetchGhostPosts(),
      fetchBabyloveArticles()
    ]);

    // Combine: Ghost posts FIRST, then Babylove posts
    const allPosts = [...ghostPosts, ...babylovePosts];

    // Sort by creation date (newest first)
    allPosts.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    console.log(` Generated ${allPosts.length} total posts (${ghostPosts.length} from Ghost + ${babylovePosts.length} from Babylove)`);

    await generateStaticBlogData(allPosts);

    console.log('<✅ Static blog generation completed successfully!');
  } catch (error) {
    console.error('=❌ Static blog generation failed:', error);
    process.exit(1);
  }
}

main();