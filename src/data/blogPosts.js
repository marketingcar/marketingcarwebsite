/**
 * Unified Blog Data Layer
 * All posts (Ghost + BabyLove) are fetched at build time and stored in staticBlogPosts.js
 * No client-side API calls needed - everything is pre-rendered
 */

import { blogPosts, blogPostsMap, getAllBlogPosts as getStaticPosts, getBlogPostBySlug as getStaticPostBySlug } from './staticBlogPosts';

/**
 * Get all blog posts (pre-fetched at build time)
 * Returns: Promise<Array> for backward compatibility
 */
export function getAllBlogPosts() {
  // Return as promise for backward compatibility with existing async code
  return Promise.resolve(getStaticPosts());
}

/**
 * Get a single blog post by slug (pre-fetched at build time)
 * Returns: Promise<Object|null> for backward compatibility
 */
export function getBlogPostBySlug(slug) {
  // Return as promise for backward compatibility with existing async code
  return Promise.resolve(getStaticPostBySlug(slug));
}

// Export the raw data for direct synchronous access if needed
export { blogPosts, blogPostsMap };
