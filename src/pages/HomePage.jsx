import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import OurDriveSection from '@/components/OurDriveSection';
import CallToActionSection from '@/components/CallToActionSection';
import SchemaMarkup from '@/components/SchemaMarkup';

const HomePage = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marketing Car",
    "url": "https://www.marketingcar.com",
    "logo": "https://www.marketingcar.com/mainlogo.png",
    "description": "Marketing Car accelerates your business growth with comprehensive digital marketing solutions. We turn complexity into a smooth ride to your goals."
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Marketing Car | Full-Service Digital Marketing Agency</title>
                <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <meta name="description" content="Marketing Car accelerates your business growth with comprehensive digital marketing solutions. We turn complexity into a smooth ride to your goals." />
      </Helmet>
      <SchemaMarkup schema={organizationSchema} />
      <HeroSection />
      <ServicesSection />
      <OurDriveSection />
      <CallToActionSection />
    </PageTransition>
  );
};

export default HomePage;