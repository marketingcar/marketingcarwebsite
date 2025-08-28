
import React from 'react';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import OurDriveSection from '@/components/OurDriveSection';
import CallToActionSection from '@/components/CallToActionSection';
import SchemaMarkup from '@/components/SchemaMarkup';
import SEOHelmet from '@/components/SEOHelmet';

const HomePage = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Marketing Car",
    "url": "https://www.marketingcar.com",
    "logo": "https://www.marketingcar.com/mainlogo.png",
    "description": "Expert small business marketing solutions that drive real results. From digital strategy to lead generation, we help small businesses grow with proven marketing systems.",
    "knowsAbout": ["Small Business Marketing", "Digital Marketing", "Lead Generation", "SEO", "Social Media Marketing", "Content Marketing"],
    "areaServed": "United States",
    "serviceType": "Small Business Marketing Services"
  };

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
