// utils/addHeadingAnchors.js
// Utility to add id anchors to H2, H3, and H4 headings in HTML strings

/**
 * Convert text to URL-safe slug
 * @param {string} text - The text to slugify
 * @returns {string} URL-safe slug
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
    .replace(/^-+/, '')       // Trim - from start of text
    .replace(/-+$/, '');      // Trim - from end of text
}

/**
 * Add id attributes to H2, H3, and H4 headings in HTML string
 * @param {string} html - HTML string containing headings
 * @returns {string} HTML string with id attributes added to headings
 */
export function addHeadingAnchors(html) {
  if (!html || typeof html !== 'string') {
    return html;
  }

  // Match H2, H3, and H4 tags and add id attributes
  // Pattern: <h[2-4]>(text)</h[2-4]>
  return html.replace(
    /<(h[2-4])>(.*?)<\/\1>/gi,
    (match, tag, content) => {
      // Extract text content (strip HTML tags)
      const textContent = content.replace(/<[^>]*>/g, '').trim();
      const id = slugify(textContent);

      // Return heading with id attribute
      return `<${tag} id="${id}">${content}</${tag}>`;
    }
  );
}
