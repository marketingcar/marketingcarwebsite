import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import OurDriveSection from '@/components/OurDriveSection';
import CallToActionSection from '@/components/CallToActionSection';
import Footer from '@/components/Footer';

const App = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <Header />
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <OurDriveSection />
          <CallToActionSection />
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default App;