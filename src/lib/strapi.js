const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

const headers = {
  'Content-Type': 'application/json',
};

if (STRAPI_API_TOKEN) {
  headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
}

/**
 * Fetch all blog posts from Strapi
 * @returns {Promise<Array>} Array of blog posts
 */
export async function getAllBlogPosts() {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?populate=main_image&sort=createdAt:desc`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts: ${response.statusText}`);
    }

    const data = await response.json();

    // Transform Strapi v5 data to match our existing blog post structure
    // In Strapi v5, attributes are at root level, not nested
    return data.data.map(post => {
      // Build full URL for main_image if it exists
      let imageUrl = post.image_url;
      if (post.main_image?.url) {
        imageUrl = post.main_image.url.startsWith('http')
          ? post.main_image.url
          : `${STRAPI_URL}${post.main_image.url}`;
      }

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image_url: imageUrl,
        published: post.published !== false,
        tags: post.tags || '',
        created_at: post.createdAt,
        updated_at: post.updatedAt,
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts from Strapi:', error);
    // Return empty array on error so the site doesn't break
    return [];
  }
}

/**
 * Fetch a single blog post by slug from Strapi
 * @param {string} slug - The blog post slug
 * @returns {Promise<Object|null>} Blog post object or null if not found
 */
export async function getBlogPostBySlug(slug) {
  try {
    const response = await fetch(`${STRAPI_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=main_image`, {
      headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog post: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.data || data.data.length === 0) {
      return null;
    }

    const post = data.data[0];

    // Build full URL for main_image if it exists
    let imageUrl = post.image_url;
    if (post.main_image?.url) {
      imageUrl = post.main_image.url.startsWith('http')
        ? post.main_image.url
        : `${STRAPI_URL}${post.main_image.url}`;
    }

    // Transform Strapi v5 data to match our existing blog post structure
    // In Strapi v5, attributes are at root level, not nested
    return {
      id: post.id,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      image_url: imageUrl,
      published: post.published !== false,
      tags: post.tags || '',
      created_at: post.createdAt,
      updated_at: post.updatedAt,
    };
  } catch (error) {
    console.error('Error fetching blog post from Strapi:', error);
    return null;
  }
}
