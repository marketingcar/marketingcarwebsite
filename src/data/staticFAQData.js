// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const faqData = [
  {
    "id": 2,
    "question": "What services does Marketing Car provide?",
    "answer": "Marketing Car provides comprehensive marketing services including marketing strategy, content marketing, SEO, paid advertising, social media management, web design, brand strategy, email marketing, and marketing consultation. We help small businesses build complete marketing systems that drive results.",
    "order": 1,
    "published": true,
    "slug": "what-services-does-marketing-car-provide"
  },
  {
    "id": 1,
    "question": "How much do your marketing services cost?",
    "answer": "Our pricing varies based on your specific needs and the scope of services required. We offer customized packages ranging from strategic consulting to full-service marketing management. Contact us for a free consultation where we'll discuss your goals and provide transparent pricing options.",
    "order": 2,
    "published": true,
    "slug": "how-much-do-services-cost"
  }
];

export const faqDataMap = new Map(
  faqData.map(faq => [faq.slug, faq])
);

export function getFAQBySlug(slug) {
  return faqDataMap.get(slug);
}

export function getAllFAQs() {
  return faqData;
}
