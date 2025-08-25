import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://jaiyxoysjethlblbicfd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphaXl4b3lzamV0aGxibGJpY2ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1NzA4NDYsImV4cCI6MjA2NzE0Njg0Nn0.h3YXLROOz1hdqs5IvSzvbNCpA1C96x6X5Wnf-H7dzTs';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function fetchBlogPosts() {
  console.log('= Fetching blog posts from Supabase...');
  
  const { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('L Error fetching posts:', error);
    throw error;
  }

  console.log(` Fetched ${posts.length} blog posts`);
  return posts;
}

async function generateStaticBlogData(posts) {
  const outputDir = path.join(__dirname, '..', 'src', 'data');
  const outputFile = path.join(outputDir, 'staticBlogPosts.js');

  await fs.mkdir(outputDir, { recursive: true });

  const fileContent = `// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const blogPosts = ${JSON.stringify(posts, null, 2)};

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
  console.log(` Generated static blog data at: ${outputFile}`);
  
  return outputFile;
}

async function main() {
  try {
    console.log('=€ Starting static blog generation...');
    
    const posts = await fetchBlogPosts();
    await generateStaticBlogData(posts);
    
    console.log('<‰ Static blog generation completed successfully!');
  } catch (error) {
    console.error('=¥ Static blog generation failed:', error);
    process.exit(1);
  }
}

main();