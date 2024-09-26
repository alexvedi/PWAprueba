// Nombre del cache y archivos a cachear
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Instalar el service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Archivos en cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar el service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar solicitudes de red y usar el cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
