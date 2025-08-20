import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import WebinarsPage from '@/pages/WebinarsPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetailPage from '@/pages/ServiceDetailPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage';
import ScrollToTop from '@/components/ScrollToTop';
import WhoWeHelpPage from '@/pages/WhoWeHelpPage';
import WhoWeHelpDetailPage from '@/pages/WhoWeHelpDetailPage';
import BookNowPage from '@/pages/BookNowPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ThankYouPage from '@/pages/ThankYouPage';
import TagManager from 'react-gtm-module';

import LpSpinningWheelsPage from '@/pages/LpSpinningWheelsPage';
import LpSpinningWheelsTherapistsPage from '@/pages/LpSpinningWheelsTherapistsPage';
import LpSpinningWheelsTradesPage from '@/pages/LpSpinningWheelsTradesPage';
import ContactPage from '@/pages/ContactPage';
import TheMarketingCarPage from '@/pages/TheMarketingCarPage';
import LpFreeMarketingTips from '@/pages/LpFreeMarketingTips';
import LpWebinar1 from '@/pages/LpWebinar1';
import LpWebinar2 from '@/pages/LpWebinar2';
import NotFound from '@/pages/NotFound';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      TagManager.initialize({ gtmId: 'GTM-MT4W7K78' });
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <Header />
        <ScrollToTop />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/the-marketing-car" element={<TheMarketingCarPage />} />
              <Route path="/about/webinars" element={<WebinarsPage />} />
              <Route path="/about/case-studies" element={<CaseStudiesPage />} />
              <Route path="/about/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/about/blog" element={<BlogPage />} />
              <Route path="/about/blog/:slug" element={<BlogPostPage />} />
              <Route path="/blog" element={<Navigate to="/about/blog" replace />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailPage />} />
              <Route path="/who-we-help" element={<WhoWeHelpPage />} />
              <Route path="/who-we-help/:slug" element={<WhoWeHelpDetailPage />} />
              <Route path="/book-now" element={<BookNowPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/lp-spinning-wheels" element={<LpSpinningWheelsPage />} />
              <Route path="/lp-spinning-wheels-therapists" element={<LpSpinningWheelsTherapistsPage />} />
              <Route path="/lp-spinning-wheels-trades" element={<LpSpinningWheelsTradesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/lp-free-marketing-tips" element={<LpFreeMarketingTips />} />
              <Route path="/lp-webinar-1" element={<LpWebinar1 />} />
              <Route path="/lp-webinar-2" element={<LpWebinar2 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
      <Toaster />
    </>
  );
};

export default App;
