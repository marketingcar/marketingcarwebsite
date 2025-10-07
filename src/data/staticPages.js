// This file is auto-generated during build time
// Do not edit manually - changes will be overwritten

export const pages = [];

export const pagesMap = new Map(
  pages.map(page => [page.slug, page])
);

export function getPageBySlug(slug) {
  return pagesMap.get(slug);
}

export function getAllPages() {
  return pages;
}
