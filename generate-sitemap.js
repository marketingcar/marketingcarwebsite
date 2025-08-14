import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { SitemapStream } from 'sitemap';
import { services } from './src/data/servicesData.js';
import { caseStudies } from './src/data/caseStudiesData.js';

const generateSitemap = async () => {
  const hostname = 'https://www.marketingcar.com'; // This will be replaced by the actual domain upon publishing
  const sitemap = new SitemapStream({ hostname });

  const writeStream = createWriteStream(resolve('./public', 'sitemap.xml'));
  sitemap.pipe(writeStream);

  const staticPages = [
    '/',
    '/services',
    '/who-we-help',
    '/case-studies',
    '/book-now',
    '/blog',
    '/thank-you',
    '/lp-spinning-wheels',
    '/lp-spinning-wheels-therapists',
    '/lp-spinning-wheels-trades'
  ];

  staticPages.forEach(url => sitemap.write({ url, changefreq: 'weekly', priority: 0.8 }));

  services.forEach(service => {
    sitemap.write({ url: `/services/${service.slug}`, changefreq: 'monthly', priority: 0.7 });
  });

  caseStudies.forEach(study => {
    sitemap.write({ url: `/case-studies/${study.slug}`, changefreq: 'monthly', priority: 0.6 });
  });

  sitemap.end();
  
  await new Promise((resolve) => writeStream.on('finish', resolve));
  console.log('Sitemap generated!');
};

generateSitemap().catch(console.error);