
import React from 'react';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import OurDriveSection from '@/components/OurDriveSection';
import CallToActionSection from '@/components/CallToActionSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import SEOHelmet from '@/components/SEOHelmet';

const HomePage = () => {
  const organizationSchema = [
    {
      "url": "https://marketingcar.com",
      "logo": {
        "url": "https://marketingcar.com/mainlogo.png",
        "@type": "ImageObject",
        "width": 600,
        "height": 60
      },
      "name": "Marketing Car",
      "@type": "Organization",
      "@context": "https://schema.org",
      "areaServed": "United States",
      "knowsAbout": [
        "Small Business Marketing",
        "Digital Marketing",
        "Lead Generation",
        "SEO",
        "Social Media Marketing",
        "Content Marketing"
      ],
      "description": "Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.",
      "serviceType": "Small Business Marketing Services"
    },
    {
      "url": "https://marketingcar.com",
      "name": "Small Business Marketing That Actually Works | Marketing Car",
      "@type": "WebPage",
      "@context": "https://schema.org",
      "isPartOf": {
        "url": "https://marketingcar.com",
        "name": "Marketing Car",
        "@type": "WebSite"
      },
      "publisher": {
        "logo": {
          "url": "https://marketingcar.com/mainlogo.png",
          "@type": "ImageObject",
          "width": 600,
          "height": 60
        },
        "name": "Marketing Car",
        "@type": "Organization"
      },
      "inLanguage": "en-US",
      "description": "Marketing that actually drives your small business forward."
    },
    {
      "url": "https://marketingcar.com",
      "logo": {
        "url": "https://marketingcar.com/mainlogo.png",
        "@type": "ImageObject",
        "width": 600,
        "height": 60
      },
      "name": "Marketing Car",
      "@type": "MarketingAgency",
      "@context": "https://schema.org",
      "areaServed": "United States",
      "description": "Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.",
      "serviceType": "Small Business Marketing Services"
    }
  ];

  return (
    <PageTransition>
      <SEOHelmet
        title="Small Business Marketing That Actually Works | Marketing Car"
        description="Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems."
        path="/"
        image="/og/og-default.png"
      />
      <SchemaMarkup schema={organizationSchema} />
      <HeroSection />
      <ServicesSection />
      <OurDriveSection />
      <CallToActionSection />
    </PageTransition>
  );
};

export default HomePage;
