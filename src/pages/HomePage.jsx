
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
    "description": "Marketing Car accelerates your business growth with comprehensive digital marketing solutions. We turn complexity into a smooth ride to your goals."
  };

  return (
    <PageTransition>
      <SEOHelmet
        title="Marketing Car | Full-Service Digital Marketing Agency"
        description="Marketing Car accelerates your business growth with comprehensive digital marketing solutions. We turn complexity into a smooth ride to your goals."
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
