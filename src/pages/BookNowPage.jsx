
import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import { CheckCircle } from 'lucide-react';
import HubSpotEmbed from '@/components/HubSpotEmbed';
import SchemaMarkup from '@/components/SchemaMarkup';

const BookNowPage = () => {
  const features = [
    "A quick review of your current online presence",
    "Honest insights into what’s working — and what’s not",
    "Clear ideas to improve your visibility and attract more leads",
    "A no-pressure, real conversation with a marketing pro"
  ];
  
  const pageTitle = "Book a Free Consultation | Marketing Car";
  const pageDescription = "Schedule a free 30-minute marketing consultation with Marketing Car to review your online presence and get actionable ideas to attract more leads for your business.";

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "url": "https://www.marketingcar.com/book-now",
    "name": pageTitle,
    "description": pageDescription,
    "mainEntity": {
      "@type": "Organization",
      "name": "Marketing Car",
      "url": "https://www.marketingcar.com",
      "logo": "https://www.marketingcar.com/mainlogo.png",
      "contactPoint": [{
        "@type": "ContactPoint",
        "telephone": "+1-312-741-9028",
        "contactType": "customer service",
        "areaServed": "US",
        "availableLanguage": "English"
      }]
    }
  };


  return (
    <PageTransition>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
      </Helmet>
      <SchemaMarkup schema={contactSchema} />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="prose prose-invert max-w-none lg:prose-xl">
            <h1 className="bg-gradient-to-r from-primary via-highlight to-secondary bg-clip-text text-transparent pb-4">
              Let’s Grow Your Business Together
            </h1>
            <p className="text-lg text-muted-foreground">
              This free 30-minute consultation is all about helping you connect with more of the right clients or customers.
            </p>
            <h3 className="mt-8">What You Can Expect:</h3>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-highlight mr-3 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl shadow-primary/20 min-h-[650px]">
            <HubSpotEmbed />
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default BookNowPage;
