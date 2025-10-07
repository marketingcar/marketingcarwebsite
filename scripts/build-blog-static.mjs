import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';

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

async function fetchGhostPages() {
  console.log('= Fetching pages from Ghost CMS...');

  try {
    const url = `${GHOST_API_URL}/ghost/api/content/pages/?key=${GHOST_CONTENT_API_KEY}&include=tags,authors&limit=all&fields=id,title,slug,html,feature_image,published_at,excerpt,meta_description,meta_title,og_image,og_title,og_description,twitter_image,twitter_title,twitter_description,custom_excerpt`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ghost API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const pages = data.pages || [];

    console.log(` Fetched ${pages.length} pages from Ghost CMS`);

    // Transform Ghost pages to our format
    const transformedPages = pages.map(page => ({
      id: `ghost_page_${page.id}`,
      created_at: page.published_at,
      title: page.title,
      slug: page.slug,
      content: page.html,
      excerpt: page.custom_excerpt || page.excerpt || '',
      image_url: page.feature_image || '',
      published: true,
      author: page.primary_author?.name || 'Marketing Car',
      source: 'ghost',
      type: 'page',
      tags: page.tags?.map(tag => tag.name) || [],
      meta_title: page.meta_title || page.title,
      meta_description: page.meta_description || page.excerpt,
      og_image: page.og_image || page.feature_image,
      og_title: page.og_title || page.title,
      og_description: page.og_description || page.excerpt,
      twitter_image: page.twitter_image || page.feature_image,
      twitter_title: page.twitter_title || page.title,
      twitter_description: page.twitter_description || page.excerpt,
    }));

    return transformedPages;
  } catch (error) {
    console.error('Error fetching Ghost pages:', error);
    return [];
  }
}

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

async function generateStaticPagesData(allPages) {
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  const outputFile = path.join(outputDir, 'staticPages.js');

  await fs.mkdir(outputDir, { recursive: true });

  const fileContent = `// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const pages = ${JSON.stringify(allPages, null, 2)};

export const pagesMap = new Map(
  pages.map(page => [page.slug, page])
);

export function getPageBySlug(slug) {
  return pagesMap.get(slug);
}

export function getAllPages() {
  return pages;
}
`;

  await fs.writeFile(outputFile, fileContent, 'utf-8');
  console.log(` Generated static pages data at: ${outputFile}`);

  return outputFile;
}

async function downloadAndOptimizeImage(imageUrl, slug, source) {
  if (!imageUrl || imageUrl === '') return null;

  try {
    // Skip if already a local path
    if (imageUrl.startsWith('/') || imageUrl.startsWith('./')) {
      return imageUrl;
    }

    // Create blog images directory
    const blogImagesDir = path.join(__dirname, '..', 'public', 'blog');
    if (!existsSync(blogImagesDir)) {
      mkdirSync(blogImagesDir, { recursive: true });
    }

    // Create filename from slug
    const filename = `${slug}.webp`;
    const outputPath = path.join(blogImagesDir, filename);

    // Skip if already exists
    if (existsSync(outputPath)) {
      console.log(`  ⏭️  Image already exists for ${slug}`);
      return `/blog/${filename}`;
    }

    console.log(`  🖼️  Downloading and optimizing image for ${slug}...`);

    // Download image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to download image: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Optimize and convert to WebP
    await sharp(buffer)
      .resize(1200, null, {
        withoutEnlargement: true,
        fastShrinkOnLoad: true
      })
      .webp({
        quality: 85,
        effort: 6
      })
      .toFile(outputPath);

    console.log(`  ✅ Optimized and saved image for ${slug}`);
    return `/blog/${filename}`;

  } catch (error) {
    console.warn(`  ⚠️  Failed to download/optimize image for ${slug}:`, error.message);
    return imageUrl; // Return original URL if optimization fails
  }
}

async function main() {
  try {
    console.log('=📝 Starting static content generation (Ghost Posts/Pages + Babylove)...');

    // Fetch posts and pages from all sources
    const [ghostPosts, ghostPages, babylovePosts] = await Promise.all([
      fetchGhostPosts(),
      fetchGhostPages(),
      fetchBabyloveArticles()
    ]);

    console.log('\n=🖼️  Downloading and optimizing blog post images...');

    // Download and optimize images for all posts
    for (const post of [...ghostPosts, ...babylovePosts]) {
      if (post.image_url) {
        const optimizedUrl = await downloadAndOptimizeImage(post.image_url, post.slug, post.source);
        if (optimizedUrl) {
          post.image_url = optimizedUrl;
          // Update og_image if it matches the original image_url
          if (post.og_image === post.image_url) {
            post.og_image = optimizedUrl;
          }
        }
      }
    }

    // Sort each group by date separately (newest first within each group)
    ghostPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    babylovePosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    ghostPages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    // Combine: Ghost posts FIRST, then Babylove posts (maintain group order, NOT date order)
    const allPosts = [...ghostPosts, ...babylovePosts];

    console.log(`\n Generated ${allPosts.length} total posts (${ghostPosts.length} from Ghost + ${babylovePosts.length} from Babylove)`);
    console.log(` Generated ${ghostPages.length} Ghost pages`);

    await generateStaticBlogData(allPosts);
    await generateStaticPagesData(ghostPages);

    console.log('\n<✅ Static content generation completed successfully!');
  } catch (error) {
    console.error('=❌ Static content generation failed:', error);
    process.exit(1);
  }
}

main();