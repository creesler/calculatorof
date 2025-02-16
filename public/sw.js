const CACHE_NAME = 'calculator-suite-v1';
const OFFLINE_URL = '/offline.html';

// Add files you want to cache
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  OFFLINE_URL,
  '/math/fraction-calculator',
  '/finance/roi-calculator',
  '/favicon.ico'
];

// Helper function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return url.match(/\.(js|css|png|jpg|jpeg|svg|ico)$/i) ||
         url.includes('/icons/') ||
         url.includes('/images/');
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Cache addAll failed:', error);
        // Continue with installation even if caching fails
        return Promise.resolve();
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Use cache-first for static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response; // Return from cache if found
          }
          // If not in cache, fetch from network and cache
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200) {
                return response;
              }
              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });
              return response;
            })
            .catch(() => {
              // Return offline page if fetch fails
              if (event.request.mode === 'navigate') {
                return caches.match(OFFLINE_URL);
              }
              return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' },
              });
            });
        })
    );
    return;
  }

  // Network-first for other requests
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // If not in cache and network fails, return offline page
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            return new Response('Network error happened', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' },
            });
          });
      })
  );
});