const CACHE_NAME = 'calculator-suite-v1';
const OFFLINE_URL = '/offline.html';

// Add files you want to cache
const urlsToCache = [
  '/',
  '/manifest.json',
  'icons/icon-192x192.png',
  'icons/icon-512x512.png',
  OFFLINE_URL
];

// Helper function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return url.match(/\.(js|css|png|jpg|jpeg|svg|ico)$/i) ||
         url.includes('/icons/') ||
         url.includes('/images/');
};

// Helper function to normalize URL paths
const normalizeUrl = (url) => {
  // Remove origin if present
  const urlObj = new URL(url, self.location.origin);
  return urlObj.pathname;
};

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened, adding static resources');
        // Add all URLs to cache
        return Promise.all(
          urlsToCache.map(url => {
            return fetch(url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Failed to fetch ${url}: ${response.status}`);
                }
                return cache.put(url, response);
              })
              .catch(error => {
                console.error(`Failed to cache ${url}:`, error);
                // Continue with other resources even if one fails
                return Promise.resolve();
              });
          })
        );
      })
      .catch(error => {
        console.error('Cache initialization failed:', error);
        // Continue with installation even if caching fails
        return Promise.resolve();
      })
  );
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    Promise.all([
      clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
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
  const pathname = normalizeUrl(url.pathname);
  
  // Use cache-first for static assets
  if (isStaticAsset(pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('Serving from cache:', pathname);
            return response;
          }
          
          console.log('Fetching from network:', pathname);
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200) {
                return response;
              }
              
              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  console.log('Caching new resource:', pathname);
                  cache.put(event.request, responseToCache);
                });
                
              return response;
            })
            .catch((error) => {
              console.error('Fetch failed:', error);
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