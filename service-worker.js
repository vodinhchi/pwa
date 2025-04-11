self.addEventListener('activate', event => {
    const cacheWhitelist = ['todo-cache-v2']; // Tên cache mới
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Xóa cache cũ
                    }
                })
            );
        })
    );
});
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheWhitelist).then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/app.js',
                '/style.css',
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

