const API_BASE_URL = 'https://api.babylovegrowth.ai/api/public';
const API_KEY = '84dbc772-cacd-44d5-8957-474a29a9c4cf';

const defaultHeaders = {
  'X-API-Key': API_KEY,
  'Content-Type': 'application/json'
};

export async function fetchAllBabyloveArticles() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`, {
      method: 'GET',
      headers: defaultHeaders
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch articles: ${response.status} ${response.statusText}`);
    }

    const articles = await response.json();
    return articles || [];
  } catch (error) {
    console.error('Error fetching Babylove articles:', error);
    return [];
  }
}

export async function fetchBabyloveArticleById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/articles/${id}`, {
      method: 'GET',
      headers: defaultHeaders
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch article ${id}: ${response.status} ${response.statusText}`);
    }

    const article = await response.json();
    return article;
  } catch (error) {
    console.error(`Error fetching Babylove article ${id}:`, error);
    return null;
  }
}

export function transformBabyloveArticleToStandardFormat(article) {
  if (!article) return null;

  return {
    id: `babylove_${article.id}`,
    created_at: article.created_at,
    title: article.title,
    slug: `babylove-${article.slug}`,
    content: article.content_html || article.content_markdown,
    excerpt: article.meta_description || article.title,
    image_url: article.hero_image_url || 'https://www.marketingcar.com/blog/default-babylove.png',
    source: 'babylovegrowth',
    original_id: article.id,
    original_slug: article.slug,
    language_code: article.languageCode,
    org_website: article.orgWebsite
  };
}

export async function fetchAndTransformBabyloveArticles() {
  try {
    const articles = await fetchAllBabyloveArticles();
    const detailedArticles = [];

    for (const article of articles) {
      const detailedArticle = await fetchBabyloveArticleById(article.id);
      if (detailedArticle) {
        const transformed = transformBabyloveArticleToStandardFormat(detailedArticle);
        if (transformed) {
          detailedArticles.push(transformed);
        }
      }
    }

    return detailedArticles;
  } catch (error) {
    console.error('Error fetching and transforming Babylove articles:', error);
    return [];
  }
}