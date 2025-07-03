import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import CaseStudiesPage from '@/pages/CaseStudiesPage';
import CaseStudyDetailPage from '@/pages/CaseStudyDetailPage';
import BlogPage from '@/pages/BlogPage';
import BlogPostPage from '@/pages/BlogPostPage';
import ScrollToTop from '@/components/ScrollToTop';

const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
        <Header />
        <ScrollToTop />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
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
