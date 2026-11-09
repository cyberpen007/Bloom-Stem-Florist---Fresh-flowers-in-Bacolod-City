// Minimal service worker — required for Chrome/Edge to treat this site as an installable app.
// It doesn't need to cache anything for the install prompt to work, but a basic
// pass-through fetch handler is included so the site still works offline-ish.

const CACHE_NAME = 'bloom-stem-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Simple network-first strategy; falls back to cache if offline.
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
