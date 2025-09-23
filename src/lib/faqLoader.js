// FAQ loader utility for loading FAQ content from markdown files

import { readFileSync, readdirSync, existsSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const FAQ_DIRECTORY = join(process.cwd(), 'content/faq');

export function getAllFAQs() {
  const faqs = [];

  if (!existsSync(FAQ_DIRECTORY)) {
    // Return sample FAQs if content directory doesn't exist yet
    return [
      {
        id: 1,
        question: "What services does Marketing Car provide?",
        answer: "Marketing Car provides comprehensive marketing services including marketing strategy, content marketing, SEO, paid advertising, social media management, web design, brand strategy, email marketing, and marketing consultation. We help small businesses build complete marketing systems that drive results.",
        order: 1,
        published: true
      },
      {
        id: 2,
        question: "How much do your marketing services cost?",
        answer: "Our pricing varies based on your specific needs and the scope of services required. We offer customized packages ranging from strategic consulting to full-service marketing management. Contact us for a free consultation where we'll discuss your goals and provide transparent pricing options.",
        order: 2,
        published: true
      },
      {
        id: 3,
        question: "How long does it take to see results from marketing efforts?",
        answer: "Results timelines vary by strategy. SEO typically takes 3-6 months to show significant organic growth, while paid advertising can generate leads within days. Content marketing builds momentum over 2-3 months, and brand awareness campaigns show results within 4-8 weeks. We set realistic expectations and provide regular progress reports.",
        order: 3,
        published: true
      },
      {
        id: 4,
        question: "Do you work with businesses in all industries?",
        answer: "Yes, we work with businesses across various industries. We specialize in helping small to medium-sized businesses, including professional services, trades, healthcare providers, financial services, local businesses, and e-commerce companies. Our strategies are customized to fit your industry's unique challenges and opportunities.",
        order: 4,
        published: true
      },
      {
        id: 5,
        question: "What makes Marketing Car different from other marketing agencies?",
        answer: "We focus exclusively on small businesses and understand their unique challenges. Instead of one-size-fits-all solutions, we build complete marketing systems tailored to your business. We prioritize transparency, education, and putting you in control of your marketing success. Plus, we're committed to driving your success, one mile at a time.",
        order: 5,
        published: true
      },
      {
        id: 6,
        question: "Do I need to sign a long-term contract?",
        answer: "We offer both project-based work and ongoing partnerships. While we believe marketing is most effective as a long-term strategy, we don't lock you into lengthy contracts. We earn your business every month by delivering results and value.",
        order: 6,
        published: true
      }
    ];
  }

  try {
    const files = readdirSync(FAQ_DIRECTORY);

    files.forEach((file, index) => {
      if (file.endsWith('.md')) {
        const fullPath = join(FAQ_DIRECTORY, file);
        const fileContents = readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        faqs.push({
          id: index + 1,
          question: data.question,
          answer: data.answer || content,
          order: data.order || index + 1,
          published: data.published !== false,
          slug: data.slug || file.replace(/\.md$/, '')
        });
      }
    });

    // Sort by order
    return faqs
      .filter(faq => faq.published)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error('Error loading FAQs:', error);
    return [];
  }
}

export function getFAQBySlug(slug) {
  const faqs = getAllFAQs();
  return faqs.find(faq => faq.slug === slug);
}