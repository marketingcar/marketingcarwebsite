import React from 'react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '@/components/PageTransition';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import OurDriveSection from '@/components/OurDriveSection';
import CallToActionSection from '@/components/CallToActionSection';

const HomePage = () => {
  return (
    <PageTransition>
      <Helmet>
        <title>Home | Marketing Car - Driving Your Success</title>
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <meta name="description" content="Welcome to Marketing Car, the full-service digital marketing agency that drives your success. Explore our services and get a free consultation." />
      </Helmet>
      <HeroSection />
      <ServicesSection />
      <OurDriveSection />
      <CallToActionSection />
    </PageTransition>
  );
};

export default HomePage;