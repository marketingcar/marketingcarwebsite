import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * PerformanceOptimizer component to handle various performance optimizations
 */
const PerformanceOptimizer = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload critical fonts if any
      const fontPreloads = [
        // Add your critical fonts here if any
      ];

      fontPreloads.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = font.href;
        link.as = 'font';
        link.type = font.type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });

      // Preload critical images (above the fold)
      const criticalImages = [
        '/elements/hero.webp',
        '/elements/hero.png'
      ];

      criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
      });
    };

    // Service Worker removed - no longer needed

    // Prefetch likely navigation targets
    const prefetchLikelyPages = () => {
      const likelyPages = [
        '/services',
        '/contact',
        '/about'
      ];

      // Only prefetch on idle and with good connection
      if ('requestIdleCallback' in window && navigator.connection?.effectiveType !== 'slow-2g') {
        requestIdleCallback(() => {
          likelyPages.forEach(page => {
            const link = document.createElement('link');
            link.rel = 'prefetch';
            link.href = page;
            document.head.appendChild(link);
          });
        });
      }
    };

    // Initialize performance optimizations
    preloadCriticalResources();
    prefetchLikelyPages();

  }, []);

  return (
    <Helmet>
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//horizons-cdn.hostinger.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />

      {/* Preconnect to critical origins */}
      <link rel="preconnect" href="https://horizons-cdn.hostinger.com" />

      {/* Resource hints */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />

      {/* Performance hints */}
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
    </Helmet>
  );
};

export default PerformanceOptimizer;