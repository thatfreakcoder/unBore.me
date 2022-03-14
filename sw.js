const cacheName = 'unBore.me';

// Cache all the files to make a PWA
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                './',
                './index.html',
                './manifest.json',
                './app.js',
                './style.css',
            ]);
        })
    );
});

self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cachedName) {
                    // Return true if you want to remove this cache,
                    // but remember that caches are shared across
                    // the whole origin
                    return true;
                }).map(function(cachedName) {
                    return caches.delete(cachedName);
                })
            );
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