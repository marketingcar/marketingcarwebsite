import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BABYLOVE_API_BASE_URL = 'https://api.babylovegrowth.ai/api/public';
const BABYLOVE_API_KEY = '84dbc772-cacd-44d5-8957-474a29a9c4cf';

const babyloveHeaders = {
  'X-API-Key': BABYLOVE_API_KEY,
  'Content-Type': 'application/json'
};

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

async function fetchMarkdownPosts() {
  console.log('= Fetching blog posts from markdown files...');

  try {
    const contentDir = path.join(__dirname, '..', 'content', 'blog');
    const files = await fs.readdir(contentDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    const posts = [];

    for (const file of markdownFiles) {
      try {
        const filePath = path.join(contentDir, file);
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const { data: frontmatter, content } = matter(fileContent);

        // Convert markdown content to HTML
        const htmlContent = marked(content);

        // Create post object with consistent structure
        const post = {
          id: frontmatter.id || `md_${path.basename(file, '.md')}`,
          created_at: frontmatter.date ? new Date(frontmatter.date).toISOString() : new Date().toISOString(),
          title: frontmatter.title || 'Untitled',
          slug: frontmatter.slug || path.basename(file, '.md'),
          content: htmlContent,
          excerpt: frontmatter.excerpt || frontmatter.description || '',
          image_url: frontmatter.image || frontmatter.featured_image || '',
          published: frontmatter.published !== false,
          author: frontmatter.author || 'Marketing Car',
          source: frontmatter.source || 'markdown',
          tags: frontmatter.tags || []
        };

        // Only include published posts
        if (post.published) {
          posts.push(post);
        }
      } catch (error) {
        console.warn(`Failed to process ${file}:`, error.message);
      }
    }

    console.log(` Fetched ${posts.length} blog posts from markdown`);
    return posts;
  } catch (error) {
    console.error('Error reading markdown posts:', error);
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
    console.log('=📝 Starting static blog generation...');

    // Fetch posts from both sources
    const [markdownPosts, babylovePosts] = await Promise.all([
      fetchMarkdownPosts(),
      fetchBabyloveArticles()
    ]);

    // Combine and sort: markdown posts first, then by creation date within each source
    const allPosts = [...markdownPosts, ...babylovePosts]
      .sort((a, b) => {
        // First, prioritize by source (markdown posts come first)
        if (a.source !== b.source) {
          if (a.source === 'markdown' || a.source === 'supabase') return -1;
          if (b.source === 'markdown' || b.source === 'supabase') return 1;
        }
        // Then sort by creation date (newest first)
        return new Date(b.created_at) - new Date(a.created_at);
      });

    console.log(` Combined ${allPosts.length} total posts (${markdownPosts.length} from markdown + ${babylovePosts.length} from Babylove)`);

    await generateStaticBlogData(allPosts);

    console.log('<✅ Static blog generation completed successfully!');
  } catch (error) {
    console.error('=❌ Static blog generation failed:', error);
    process.exit(1);
  }
}

main();