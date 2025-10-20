// scripts/generate-llm-doc.mjs
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const dist = path.join(root, 'dist');

const SITE_URL =
  process.env.SITE_URL ||
  process.env.VITE_SITE_URL ||
  'https://marketingcar.com';

// Convert HTML to plain text
function htmlToText(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n/g, '\n\n')
    .trim();
}

// Read markdown content from content directory
function getMarkdownContent() {
  const contentDir = path.join(root, 'content');
  const content = {
    pages: [],
    faq: []
  };

  // Read pages
  const pagesDir = path.join(contentDir, 'pages');
  if (existsSync(pagesDir)) {
    const pageFiles = readdirSync(pagesDir).filter(f => f.endsWith('.md'));
    for (const file of pageFiles) {
      const filePath = path.join(pagesDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data, content: markdownContent } = matter(fileContent);
      const html = marked(markdownContent);
      const text = htmlToText(html);
      content.pages.push({
        title: data.title || file.replace('.md', ''),
        description: data.description || '',
        content: text
      });
    }
  }

  // Read FAQ
  const faqDir = path.join(contentDir, 'faq');
  if (existsSync(faqDir)) {
    const faqFiles = readdirSync(faqDir).filter(f => f.endsWith('.md'));
    for (const file of faqFiles) {
      const filePath = path.join(faqDir, file);
      const fileContent = readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      if (data.question && data.answer) {
        content.faq.push({
          question: data.question,
          answer: data.answer
        });
      }
    }
  }

  return content;
}

// Read services data from the whoWeHelpData.jsx file
function getServicesData() {
  const services = [];

  // Key service areas based on the site structure
  const coreServices = [
    {
      title: 'Complete Marketing Systems',
      description: 'We build comprehensive marketing systems that integrate strategy, content, ads, and brand messaging to drive real business results for small businesses.',
      slug: 'services'
    },
    {
      title: 'Digital Marketing Strategy',
      description: 'Strategic marketing planning and implementation for small businesses, focusing on measurable growth and ROI.',
      slug: 'services/digital-strategy'
    },
    {
      title: 'Lead Generation Campaigns',
      description: 'Targeted campaigns designed to attract and convert high-quality leads for small business growth.',
      slug: 'services/lead-generation'
    }
  ];

  return coreServices;
}

// Get who we help data
function getWhoWeHelpData() {
  const audiences = [
    'Small Business Owners',
    'Therapists & Counselors',
    'Trades & Contractors',
    'Veterinarians',
    'Financial Professionals',
    'Bilingual Businesses',
    'Farmers Markets',
    'Licensed Professionals'
  ];
  return audiences;
}

// Get blog posts from dist/blog
function getBlogPosts() {
  const blogDir = path.join(dist, 'blog');
  const posts = [];

  if (!existsSync(blogDir)) {
    return posts;
  }

  const entries = readdirSync(blogDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory() && entry.name !== 'index.html') {
      const indexPath = path.join(blogDir, entry.name, 'index.html');
      if (existsSync(indexPath)) {
        posts.push({
          slug: entry.name,
          url: `${SITE_URL}/blog/${entry.name}`
        });
      }
    }
  }

  return posts;
}

// Generate the LLM-friendly documentation
function generateLLMDoc() {
  const markdownContent = getMarkdownContent();
  const services = getServicesData();
  const audiences = getWhoWeHelpData();
  const blogPosts = getBlogPosts();

  let doc = `# Marketing Car | Expert Small Business Marketing Solutions\n\n`;
  doc += `> This site provides authoritative content on digital marketing strategies, lead generation techniques, and proven systems tailored for small businesses. It offers insights into effective marketing systems and actionable guidance to grow small business brands and customer base.\n\n`;

  doc += `MarketingCar.com focuses on delivering expert advice and practical solutions for small business marketing, emphasizing scalable and results-driven approaches. Key topics include digital marketing strategy, lead generation, and marketing system implementation, ideal for small business owners seeking reliable growth methods.\n\n`;

  // Core Marketing Strategies
  doc += `## Core Marketing Strategies\n`;
  doc += `- Digital marketing tactics for small businesses\n`;
  doc += `- Building effective marketing systems\n`;
  doc += `- Strategies for lead generation and customer acquisition\n`;
  doc += `- Developing a comprehensive small business marketing plan\n`;
  doc += `- Content marketing and brand positioning\n\n`;

  // Service Offerings
  doc += `## Service Offerings and Solutions\n`;
  for (const service of services) {
    doc += `- ${service.title}: ${service.description}\n`;
  }
  doc += `\n`;

  // Who We Help
  doc += `## Who We Help\n`;
  doc += `Marketing Car specializes in providing tailored marketing solutions for:\n`;
  for (const audience of audiences) {
    doc += `- ${audience}\n`;
  }
  doc += `\n`;

  // About Content
  if (markdownContent.pages.length > 0) {
    doc += `## About Marketing Car\n`;
    const aboutPage = markdownContent.pages.find(p => p.title.toLowerCase().includes('about'));
    if (aboutPage) {
      doc += `${aboutPage.content}\n\n`;
    }
  }

  // Educational Resources
  doc += `## Educational Resources\n`;
  doc += `Marketing Car provides comprehensive educational content including:\n`;
  doc += `- Blog articles on marketing best practices\n`;
  doc += `- Guides on optimizing marketing efforts\n`;
  doc += `- Case studies demonstrating successful marketing systems\n`;
  doc += `- How-to guides for content marketing, email marketing, and digital strategy\n`;
  if (blogPosts.length > 0) {
    doc += `\nFeatured blog topics:\n`;
    blogPosts.slice(0, 10).forEach(post => {
      const title = post.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      doc += `- ${title}\n`;
    });
  }
  doc += `\n`;

  // FAQ Section
  if (markdownContent.faq.length > 0) {
    doc += `## Frequently Asked Questions\n`;
    for (const faq of markdownContent.faq) {
      doc += `\n### ${faq.question}\n`;
      doc += `${faq.answer}\n`;
    }
    doc += `\n`;
  }

  // Important Pages
  doc += `## Important Pages\n`;
  doc += `- [Home](${SITE_URL})\n`;
  doc += `- [About](${SITE_URL}/about)\n`;
  doc += `- [Services](${SITE_URL}/services)\n`;
  doc += `- [Who We Help](${SITE_URL}/who-we-help)\n`;
  doc += `- [Blog](${SITE_URL}/blog)\n`;
  doc += `- [Case Studies](${SITE_URL}/about/case-studies)\n`;
  doc += `- [Webinars](${SITE_URL}/about/webinars)\n`;
  doc += `- [FAQ](${SITE_URL}/faq)\n`;
  doc += `- [Contact](${SITE_URL}/contact)\n`;
  doc += `- [Book Now](${SITE_URL}/book-now)\n\n`;

  // Contact Information
  doc += `## Contact and Engagement\n`;
  doc += `- Company overview available at About page\n`;
  doc += `- Service details and consultation booking available\n`;
  doc += `- Multiple contact options for prospective clients\n`;
  doc += `- Free marketing tips and resources available\n\n`;

  // Approach and Philosophy
  doc += `## Marketing Philosophy\n`;
  doc += `Marketing Car believes in:\n`;
  doc += `- Strategy-first approach over trendy tactics\n`;
  doc += `- Complete marketing systems where all elements work together\n`;
  doc += `- Transparent processes and clear communication\n`;
  doc += `- Measuring success by business growth, not vanity metrics\n`;
  doc += `- Tailored solutions for each industry and business type\n`;

  return doc;
}

// Main execution
try {
  const doc = generateLLMDoc();
  const outputPath = path.join(dist, 'llm-site-doc.txt');
  writeFileSync(outputPath, doc);
  console.log(`[llm-doc] Generated LLM-friendly documentation at dist/llm-site-doc.txt (${doc.length} chars)`);
} catch (error) {
  console.error('[llm-doc] Error generating documentation:', error.message);
  process.exit(1);
}
