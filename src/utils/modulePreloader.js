// Module preloader utility to optimize JavaScript loading
export class ModulePreloader {
  constructor() {
    this.preloadedModules = new Set();
    this.priorityQueue = [];
  }

  // Preload a module with priority
  preload(modulePath, priority = 'low') {
    if (this.preloadedModules.has(modulePath)) {
      return;
    }

    this.preloadedModules.add(modulePath);
    
    const link = document.createElement('link');
    link.rel = 'modulepreload';
    link.href = modulePath;
    
    // Set fetchpriority if supported
    if ('fetchPriority' in HTMLLinkElement.prototype) {
      link.fetchPriority = priority === 'high' ? 'high' : 'low';
    }
    
    document.head.appendChild(link);
  }

  // Preload modules based on route
  preloadForRoute(route) {
    const routeModules = {
      '/': ['landing-pages', 'animations'], // Homepage needs animations
      '/services': ['pages', 'icons'],
      '/about': ['pages', 'components'],
      '/contact': ['pages', 'utilities'] // Contact needs forms
    };

    const modules = routeModules[route] || ['pages'];
    modules.forEach(module => {
      // In production, these would be resolved to actual chunk names
      this.preload(`/js/${module}-chunk.js`, 'low');
    });
  }

  // Preload on hover (for navigation links)
  setupHoverPreloading() {
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href^="/"]');
      if (link) {
        const href = link.getAttribute('href');
        // Debounce to avoid excessive preloading
        clearTimeout(this.hoverTimeout);
        this.hoverTimeout = setTimeout(() => {
          this.preloadForRoute(href);
        }, 100);
      }
    }, { passive: true });
  }

  // Preload based on user interaction patterns
  setupIntelligentPreloading() {
    // Preload common next pages after initial load
    if (document.readyState === 'complete') {
      this.delayedPreload();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.delayedPreload(), 2000);
      });
    }
  }

  delayedPreload() {
    // Preload most common pages based on analytics
    const commonRoutes = ['/services', '/contact', '/about'];
    commonRoutes.forEach((route, index) => {
      setTimeout(() => {
        this.preloadForRoute(route);
      }, index * 500); // Stagger the preloading
    });
  }

  // Initialize the preloader
  init() {
    this.setupHoverPreloading();
    this.setupIntelligentPreloading();
    
    // Preload critical modules immediately
    this.preload('/js/react-core-chunk.js', 'high');
    this.preload('/js/layout-chunk.js', 'high');
  }
}

// Create singleton instance
export const modulePreloader = new ModulePreloader();