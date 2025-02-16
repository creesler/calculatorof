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

// Helper function to check if URL is valid for caching
const isValidCacheRequest = (url) => {
  const validProtocols = ['http:', 'https:'];
  try {
    const urlObj = new URL(url);
    return validProtocols.includes(urlObj.protocol);
  } catch {
    return false;
  }
};

self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened, adding static resources');
        // Add all URLs to cache
        const cachePromises = urlsToCache.map(url => {
          // Ensure URL is absolute
          const absoluteUrl = new URL(url, self.location.origin).href;
          
          if (!isValidCacheRequest(absoluteUrl)) {
            console.log('Skipping invalid cache URL:', url);
            return Promise.resolve();
          }
          
          return fetch(absoluteUrl)
            .then(response => {
              if (!response.ok) {
                throw new Error(`Failed to fetch ${url}: ${response.status}`);
              }
              console.log('Successfully cached:', url);
              return cache.put(url, response);
            })
            .catch(error => {
              console.error(`Failed to cache ${url}:`, error);
              return Promise.resolve();
            });
        });
        
        return Promise.all(cachePromises);
      })
      .catch(error => {
        console.error('Cache initialization failed:', error);
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
  // Only handle GET requests
  if (event.request.method !== 'GET') return;
  
  // Only handle valid URLs
  if (!isValidCacheRequest(event.request.url)) return;
  
  const url = new URL(event.request.url);
  
  // Only handle requests from our origin or static assets
  if (url.origin !== self.location.origin && !isStaticAsset(url.pathname)) return;
  
  // Use cache-first for static assets
  if (isStaticAsset(url.pathname)) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            console.log('Serving from cache:', url.pathname);
            return response;
          }
          
          console.log('Fetching from network:', url.pathname);
          return fetch(event.request)
            .then((response) => {
              if (!response || response.status !== 200) {
                return response;
              }
              
              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  if (isValidCacheRequest(event.request.url)) {
                    console.log('Caching new resource:', url.pathname);
                    cache.put(event.request, responseToCache)
                      .catch(error => {
                        console.error('Failed to cache:', error);
                      });
                  }
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