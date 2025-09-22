import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import TurndownService from 'turndown';
import { getAllBlogPosts } from '../src/data/staticBlogPosts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Clean up HTML and convert to markdown
turndownService.addRule('removeArticleTags', {
  filter: 'article',
  replacement: function (content) {
    return content;
  }
});

turndownService.addRule('removeHeaderTags', {
  filter: 'header',
  replacement: function (content) {
    return content;
  }
});

turndownService.addRule('removeSectionTags', {
  filter: 'section',
  replacement: function (content) {
    return content;
  }
});

async function convertPostToMarkdown(post) {
  // Skip babylovegrowth posts as they're already in good format
  if (post.source === 'babylovegrowth') {
    return null;
  }

  const contentDir = path.join(__dirname, '..', 'content', 'blog');
  const fileName = `${post.slug}.md`;
  const filePath = path.join(contentDir, fileName);

  // Convert HTML to markdown
  let markdownContent = '';
  if (post.content) {
    try {
      markdownContent = turndownService.turndown(post.content);
    } catch (error) {
      console.warn(`Failed to convert content for ${post.slug}:`, error.message);
      markdownContent = post.content; // Fall back to original content
    }
  }

  // Create frontmatter data
  const frontmatter = {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    image: post.image_url,
    date: new Date(post.created_at).toISOString().split('T')[0], // Format as YYYY-MM-DD
    published: true,
    author: 'Marketing Car',
    source: 'supabase'
  };

  // Create full markdown file with frontmatter
  const markdownFile = matter.stringify(markdownContent, frontmatter);

  await fs.writeFile(filePath, markdownFile, 'utf-8');
  console.log(`✓ Created ${fileName}`);

  return {
    ...frontmatter,
    content: markdownContent,
    id: post.id
  };
}

async function main() {
  try {
    console.log('Converting Supabase posts to markdown...');

    // Ensure content directory exists
    const contentDir = path.join(__dirname, '..', 'content', 'blog');
    await fs.mkdir(contentDir, { recursive: true });

    // Get all blog posts
    const posts = getAllBlogPosts();
    const supabasePosts = posts.filter(post => !post.source || post.source !== 'babylovegrowth');

    console.log(`Found ${supabasePosts.length} Supabase posts to convert`);

    const convertedPosts = [];
    for (const post of supabasePosts) {
      try {
        const converted = await convertPostToMarkdown(post);
        if (converted) {
          convertedPosts.push(converted);
        }
      } catch (error) {
        console.error(`Failed to convert post ${post.slug}:`, error);
      }
    }

    console.log(`✅ Successfully converted ${convertedPosts.length} posts to markdown`);
    console.log(`📁 Markdown files saved to: ${contentDir}`);

  } catch (error) {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
  }
}

main();