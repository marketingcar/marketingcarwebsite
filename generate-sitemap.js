
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { SitemapStream } from 'sitemap';
import { services } from './src/data/servicesData.js';
import { caseStudies } from './src/data/caseStudiesData.js';
import { professionals } from './src/data/whoWeHelpData.jsx';
// Blog posts are now fetched from Supabase, so we can't statically generate them here.
// They will need to be added to the sitemap dynamically or via a separate script if the blog is large.

const generateSitemap = async () => {
  const hostname = 'https://www.marketingcar.com'; // This will be replaced by the actual domain upon publishing
  const sitemap = new SitemapStream({ hostname });

  const writeStream = createWriteStream(resolve('./public', 'sitemap.xml'));
  sitemap.pipe(writeStream);

  const staticPages = [
    '/',
    '/about',
    '/about/the-marketing-car',
    '/about/webinars',
    '/about/case-studies',
    '/about/blog',
    '/services',
    '/who-we-help',
    '/book-now',
    '/contact',
    '/thank-you',
    '/lp-spinning-wheels',
    '/lp-spinning-wheels-therapists',
    '/lp-spinning-wheels-trades'
  ];

  staticPages.forEach(url => sitemap.write({ url, changefreq: 'weekly', priority: 0.8 }));

  services.forEach(service => {
    sitemap.write({ url: `/services/${service.slug}`, changefreq: 'monthly', priority: 0.7 });
  });
  
  professionals.forEach(prof => {
    sitemap.write({ url: `/who-we-help/${prof.slug}`, changefreq: 'monthly', priority: 0.7 });
  });

  caseStudies.forEach(study => {
    sitemap.write({ url: `/about/case-studies/${study.slug}`, changefreq: 'monthly', priority: 0.6 });
  });

  // Since blog posts are dynamic, we'd ideally fetch them from Supabase here.
  // For now, we'll omit them from static generation to avoid errors.
  // A dynamic sitemap endpoint would be the best solution for a live site.

  sitemap.end();
  
  await new Promise((resolve) => writeStream.on('finish', resolve));
  console.log('Sitemap generated!');
};

generateSitemap().catch(console.error);
