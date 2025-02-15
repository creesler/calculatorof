const CACHE_NAME = 'calculator-v1';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll([
        '/',
        '/math/fraction-calculator',
        '/math/roi-calculator',
        '/manifest.json',
        '/icons/icon-192x192.png',
        '/icons/icon-512x512.png',
        '/favicon.ico'  // Use existing favicon
      ]).catch(error => {
        console.error('Cache addAll error:', error);
        // Continue installing even if some assets fail to cache
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
}); 