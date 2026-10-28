const CACHE_PREFIX = 'monte-peca-';
const CACHE_NAME = `${CACHE_PREFIX}v2`;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(['/','/manifest.webmanifest','/icons/pwa-icon.svg','/icons/pwa-192.png','/icons/pwa-512.png'])));
  self.skipWaiting();
});

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'CACHE_URLS' || !Array.isArray(event.data.urls)) return;
  const urls = event.data.urls.filter((value) => {
    try {
      const url = new URL(value, self.location.origin);
      return url.origin === self.location.origin && (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/ingredients/') || url.pathname === '/pizza-base.png');
    } catch { return false; }
  });
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => Promise.allSettled(urls.map((url) => cache.add(url)))));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE_NAME).then((cache) => cache.put('/', response.clone()));
      return response;
    }).catch(async () => (await caches.match(request,{ignoreVary:true})) || (await caches.match('/',{ignoreVary:true}))));
    return;
  }

  if (!url.pathname.startsWith('/assets/') && !url.pathname.startsWith('/ingredients/') && !url.pathname.startsWith('/icons/') && url.pathname !== '/pizza-base.png' && url.pathname !== '/manifest.webmanifest') return;
  event.respondWith(caches.match(request,{ignoreVary:true}).then((cached) => cached || fetch(request).then((response) => {
    if (response.ok && response.type === 'basic') caches.open(CACHE_NAME).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
