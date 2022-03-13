const cacheName = 'unBore.me';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            // return cache.addAll([
            //     './',
            //     './index.html',
            //     './manifest.json',
            //     './app.js',
            //     './style.css',
            // ]);
            return null;
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.open(cacheName)
        .then(cache => cache.match(event.request, { ignoreSearch: true }))
        .then(response => {
            return response || fetch(event.request);
        })
    );
});