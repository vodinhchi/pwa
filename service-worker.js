self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('todo-cache-update9h57').then(cache => {
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