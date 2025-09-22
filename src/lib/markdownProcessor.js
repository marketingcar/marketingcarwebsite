import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure marked for better HTML output
marked.setOptions({
  gfm: true,
  breaks: true,
  headerIds: true,
  mangle: false
});

export async function getAllMarkdownPosts() {
  try {
    const contentDir = path.join(__dirname, '../../..', 'content', 'blog');
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
          tags: frontmatter.tags || [],
          filePath: filePath // Store file path for potential editing
        };

        // Only include published posts
        if (post.published) {
          posts.push(post);
        }
      } catch (error) {
        console.warn(`Failed to process ${file}:`, error.message);
      }
    }

    // Sort by creation date (newest first)
    posts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return posts;
  } catch (error) {
    console.error('Error reading markdown posts:', error);
    return [];
  }
}

export async function getMarkdownPostBySlug(slug) {
  try {
    const posts = await getAllMarkdownPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Error finding post with slug ${slug}:`, error);
    return null;
  }
}

export async function createMarkdownPost(postData) {
  try {
    const contentDir = path.join(__dirname, '../../..', 'content', 'blog');
    await fs.mkdir(contentDir, { recursive: true });

    const fileName = `${postData.slug}.md`;
    const filePath = path.join(contentDir, fileName);

    // Prepare frontmatter
    const frontmatter = {
      title: postData.title,
      slug: postData.slug,
      excerpt: postData.excerpt || postData.description || '',
      image: postData.image || postData.image_url || '',
      date: postData.date || new Date().toISOString().split('T')[0],
      published: postData.published !== false,
      author: postData.author || 'Marketing Car',
      tags: postData.tags || [],
      source: 'markdown'
    };

    // Create markdown file with frontmatter
    const markdownFile = matter.stringify(postData.content || '', frontmatter);

    await fs.writeFile(filePath, markdownFile, 'utf-8');
    return { success: true, filePath };
  } catch (error) {
    console.error('Error creating markdown post:', error);
    return { success: false, error: error.message };
  }
}

export async function updateMarkdownPost(slug, postData) {
  try {
    const contentDir = path.join(__dirname, '../../..', 'content', 'blog');
    const fileName = `${slug}.md`;
    const filePath = path.join(contentDir, fileName);

    // Check if file exists
    try {
      await fs.access(filePath);
    } catch {
      return { success: false, error: 'Post not found' };
    }

    // Read existing file
    const existingContent = await fs.readFile(filePath, 'utf-8');
    const { data: existingFrontmatter, content: existingMarkdown } = matter(existingContent);

    // Merge with new data
    const updatedFrontmatter = {
      ...existingFrontmatter,
      ...postData,
      slug: slug // Preserve slug
    };

    // Create updated markdown file
    const updatedContent = postData.content !== undefined ? postData.content : existingMarkdown;
    const markdownFile = matter.stringify(updatedContent, updatedFrontmatter);

    await fs.writeFile(filePath, markdownFile, 'utf-8');
    return { success: true, filePath };
  } catch (error) {
    console.error('Error updating markdown post:', error);
    return { success: false, error: error.message };
  }
}

export async function deleteMarkdownPost(slug) {
  try {
    const contentDir = path.join(__dirname, '../../..', 'content', 'blog');
    const fileName = `${slug}.md`;
    const filePath = path.join(contentDir, fileName);

    await fs.unlink(filePath);
    return { success: true };
  } catch (error) {
    console.error('Error deleting markdown post:', error);
    return { success: false, error: error.message };
  }
}