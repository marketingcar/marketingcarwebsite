// Service Worker for aggressive caching and performance
const CACHE_NAME = 'marketing-car-v2';
const STATIC_CACHE = 'static-cache-v2';
const RUNTIME_CACHE = 'runtime-cache-v2';

// Resources to cache immediately
const PRECACHE_URLS = [
  '/',
  '/assets/index.css',
  '/js/index.js',
  'https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fa6d981b4dffaf2b55e483e406049ee6.png',
  'https://horizons-cdn.hostinger.com/4d84324a-cf58-49bf-a9fe-718fd0642a7d/fulllogo-IDmgO.png',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;900&display=swap',
  'https://fonts.gstatic.com/s/montserrat/v26/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw5aXpsog.woff2'
];

// Install event - precache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => 
              cacheName !== STATIC_CACHE && 
              cacheName !== RUNTIME_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle API requests differently
  if (url.pathname.startsWith('/api/') || url.hostname.includes('supabase')) {
    return; // Let API requests go through normally
  }

  // Handle font requests with long cache
  if (request.destination === 'font') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response;
          
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE)
                .then((cache) => cache.put(request, responseClone));
              return response;
            });
        })
    );
    return;
  }

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response;
          
          return fetch(request)
            .then((response) => {
              if (response.status === 200) {
                const responseClone = response.clone();
                caches.open(RUNTIME_CACHE)
                  .then((cache) => cache.put(request, responseClone));
              }
              return response;
            })
            .catch(() => {
              // Fallback for failed image requests
              return new Response('', { status: 404 });
            });
        })
    );
    return;
  }

  // Handle navigation requests
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) return response;
          
          return fetch(request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => cache.put(request, responseClone));
              return response;
            })
            .catch(() => {
              // Fallback to cached index.html for SPA routes
              return caches.match('/');
            });
        })
    );
    return;
  }

  // Handle other requests
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) return response;
        
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (response.status === 200 && request.url.startsWith('http')) {
              const responseClone = response.clone();
              caches.open(RUNTIME_CACHE)
                .then((cache) => cache.put(request, responseClone));
            }
            return response;
          });
      })
  );
});