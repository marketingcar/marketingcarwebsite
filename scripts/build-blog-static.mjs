import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://jaiyxoysjethlblbicfd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaXl4b3lzamV0aGxibGJpY2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NzA4NDYsImV4cCI6MjA2NzE0Njg0Nn0.h3YXLROOz1hdqs5IvSzvbNCpA1C96x6X5Wnf-H7dzTs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const BABYLOVE_API_BASE_URL = 'https://api.babylovegrowth.ai/api/public';
const BABYLOVE_API_KEY = '84dbc772-cacd-44d5-8957-474a29a9c4cf';

const babyloveHeaders = {
  'X-API-Key': BABYLOVE_API_KEY,
  'Content-Type': 'application/json'
};

async function fetchBlogPosts() {
  console.log('= Fetching blog posts from Supabase...');

  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('L Error fetching posts:', error);
    throw error;
  }

  console.log(` Fetched ${posts.length} blog posts from Supabase`);
  return posts || [];
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
    const [supabasePosts, babylovePosts] = await Promise.all([
      fetchBlogPosts(),
      fetchBabyloveArticles()
    ]);

    // Combine and sort: Supabase posts first, then by creation date within each source
    const allPosts = [...supabasePosts, ...babylovePosts]
      .sort((a, b) => {
        // First, prioritize by source (Supabase posts come first)
        if (a.source !== b.source) {
          if (!a.source) return -1; // Supabase posts have no source field, so they come first
          if (!b.source) return 1;
        }
        // Then sort by creation date (newest first)
        return new Date(b.created_at) - new Date(a.created_at);
      });

    console.log(` Combined ${allPosts.length} total posts (${supabasePosts.length} from Supabase + ${babylovePosts.length} from Babylove)`);

    await generateStaticBlogData(allPosts);

    console.log('<✅ Static blog generation completed successfully!');
  } catch (error) {
    console.error('=❌ Static blog generation failed:', error);
    process.exit(1);
  }
}

main();