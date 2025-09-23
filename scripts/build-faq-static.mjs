// scripts/build-faq-static.mjs
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

async function generateStaticFAQData() {
  console.log('=❓ Starting FAQ generation...');

  const faqDirectory = path.join(root, 'content', 'faq');
  const faqs = [];

  // Default FAQ data if no content directory exists
  const defaultFAQs = [
    {
      id: 1,
      question: "What services does Marketing Car provide?",
      answer: "Marketing Car provides comprehensive marketing services including marketing strategy, content marketing, SEO, paid advertising, social media management, web design, brand strategy, email marketing, and marketing consultation. We help small businesses build complete marketing systems that drive results.",
      order: 1,
      published: true,
      slug: "what-services-does-marketing-car-provide"
    },
    {
      id: 2,
      question: "How much do your marketing services cost?",
      answer: "Our pricing varies based on your specific needs and the scope of services required. We offer customized packages ranging from strategic consulting to full-service marketing management. Contact us for a free consultation where we'll discuss your goals and provide transparent pricing options.",
      order: 2,
      published: true,
      slug: "how-much-do-services-cost"
    },
    {
      id: 3,
      question: "How long does it take to see results from marketing efforts?",
      answer: "Results timelines vary by strategy. SEO typically takes 3-6 months to show significant organic growth, while paid advertising can generate leads within days. Content marketing builds momentum over 2-3 months, and brand awareness campaigns show results within 4-8 weeks. We set realistic expectations and provide regular progress reports.",
      order: 3,
      published: true,
      slug: "how-long-results"
    },
    {
      id: 4,
      question: "Do you work with businesses in all industries?",
      answer: "Yes, we work with businesses across various industries. We specialize in helping small to medium-sized businesses, including professional services, trades, healthcare providers, financial services, local businesses, and e-commerce companies. Our strategies are customized to fit your industry's unique challenges and opportunities.",
      order: 4,
      published: true,
      slug: "all-industries"
    },
    {
      id: 5,
      question: "What makes Marketing Car different from other marketing agencies?",
      answer: "We focus exclusively on small businesses and understand their unique challenges. Instead of one-size-fits-all solutions, we build complete marketing systems tailored to your business. We prioritize transparency, education, and putting you in control of your marketing success. Plus, we're committed to driving your success, one mile at a time.",
      order: 5,
      published: true,
      slug: "what-makes-different"
    },
    {
      id: 6,
      question: "Do I need to sign a long-term contract?",
      answer: "We offer both project-based work and ongoing partnerships. While we believe marketing is most effective as a long-term strategy, we don't lock you into lengthy contracts. We earn your business every month by delivering results and value.",
      order: 6,
      published: true,
      slug: "long-term-contract"
    }
  ];

  if (existsSync(faqDirectory)) {
    try {
      const files = readdirSync(faqDirectory);
      console.log(`📁 Found ${files.length} FAQ files`);

      files.forEach((file, index) => {
        if (file.endsWith('.md')) {
          const fullPath = path.join(faqDirectory, file);
          const fileContents = readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);

          faqs.push({
            id: index + 1,
            question: data.question,
            answer: data.answer || content.trim(),
            order: data.order || index + 1,
            published: data.published !== false,
            slug: data.slug || file.replace(/\.md$/, '')
          });
        }
      });

      console.log(`✅ Processed ${faqs.length} FAQ entries`);
    } catch (error) {
      console.warn('📁 Error reading FAQ directory, using defaults:', error.message);
      faqs.push(...defaultFAQs);
    }
  } else {
    console.log('📁 No FAQ directory found, using default FAQs');
    faqs.push(...defaultFAQs);
  }

  // Sort by order and filter published
  const sortedFAQs = faqs
    .filter(faq => faq.published)
    .sort((a, b) => a.order - b.order);

  // Generate the static data file
  const outputDir = path.join(root, 'src', 'data');
  const outputFile = path.join(outputDir, 'staticFAQData.js');

  const fileContent = `// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const faqData = ${JSON.stringify(sortedFAQs, null, 2)};

export const faqDataMap = new Map(
  faqData.map(faq => [faq.slug, faq])
);

export function getFAQBySlug(slug) {
  return faqDataMap.get(slug);
}

export function getAllFAQs() {
  return faqData;
}
`;

  writeFileSync(outputFile, fileContent, 'utf-8');
  console.log(`✅ Generated static FAQ data at: ${outputFile}`);

  return sortedFAQs;
}

async function main() {
  try {
    const faqs = await generateStaticFAQData();
    console.log(`✅ FAQ generation completed successfully! Generated ${faqs.length} FAQs`);
  } catch (error) {
    console.error('❌ FAQ generation failed:', error);
    process.exit(1);
  }
}

main();