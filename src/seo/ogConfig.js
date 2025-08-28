// Edit these values for your site
const config = {
  siteName: "Marketing Car",
  siteUrl: "https://www.marketingcar.com",
  defaultTitle: "Small Business Marketing That Actually Works | Marketing Car",
  defaultDescription: "Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.",
  defaultImage: "/og/og-default.png", // 1200x630 recommended
  twitterHandle: "@marketingcar", // optional, e.g. "@acme"
  favicon: "/favicon.svg", // optional

  // Map of route path -> per-page overrides
  // Example:
  // "/about": { title: "About | Your Site", description: "Learn more about us", image: "/og/about.png" }
  routeOverrides: {
    "/lp-webinar-1": { image: "/webinars/webinar1.png" },
    "/lp-webinar-2": { image: "/webinars/webinar2.png" },

  },
};

export default config;

export const SEO_DEFAULTS = {
  SITE_URL: import.meta.env.VITE_SITE_URL || 'https://www.marketingcar.com',
  SITE_NAME: 'Marketing Car',
  TITLE: 'Marketing Car',
  DESCRIPTION: 'Marketing that actually drives your small business forward.',
  IMAGE: '/og/og-default.png', // served from /public
};