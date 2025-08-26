import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import ScrollToTop from '@/components/ScrollToTop';
import { modulePreloader } from '@/utils/modulePreloader';

// Lazy load footer for better initial performance
const Footer = lazy(() => import('@/components/Footer'));
import TagManager from 'react-gtm-module';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const AboutPage = lazy(() => import('@/pages/AboutPage'));
const WebinarsPage = lazy(() => import('@/pages/WebinarsPage'));
const ServicesPage = lazy(() => import('@/pages/ServicesPage'));
const ServiceDetailPage = lazy(() => import('@/pages/ServiceDetailPage'));
const CaseStudiesPage = lazy(() => import('@/pages/CaseStudiesPage'));
const CaseStudyDetailPage = lazy(() => import('@/pages/CaseStudyDetailPage'));
const WhoWeHelpPage = lazy(() => import('@/pages/WhoWeHelpPage'));
const WhoWeHelpDetailPage = lazy(() => import('@/pages/WhoWeHelpDetailPage'));
const BookNowPage = lazy(() => import('@/pages/BookNowPage'));
const BlogPage = lazy(() => import('@/pages/BlogPage'));
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'));
const ThankYouPage = lazy(() => import('@/pages/ThankYouPage'));
const LpSpinningWheelsPage = lazy(() => import('@/pages/LpSpinningWheelsPage'));
const LpSpinningWheelsTherapistsPage = lazy(() => import('@/pages/LpSpinningWheelsTherapistsPage'));
const LpSpinningWheelsTradesPage = lazy(() => import('@/pages/LpSpinningWheelsTradesPage'));
const ContactPage = lazy(() => import('@/pages/ContactPage'));
const TheMarketingCarPage = lazy(() => import('@/pages/TheMarketingCarPage'));
const LpFreeMarketingTips = lazy(() => import('@/pages/LpFreeMarketingTips'));
const LpWebinar1 = lazy(() => import('@/pages/LpWebinar1'));
const LpWebinar2 = lazy(() => import('@/pages/LpWebinar2'));
const NotFound = lazy(() => import('@/pages/NotFound'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

const App = () => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      TagManager.initialize({ gtmId: 'GTM-MT4W7K78' });
    }
    
    // Initialize intelligent module preloading
    modulePreloader.init();
  }, []);

  // Preload modules for current route
  useEffect(() => {
    modulePreloader.preloadForRoute(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <Header />
        <ScrollToTop />
        <main className="flex-grow">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </main>
        <Suspense fallback={<div className="h-64"></div>}>
          <Footer />
        </Suspense>
      </div>
      <Toaster />
    </>
  );
};

export default App;
