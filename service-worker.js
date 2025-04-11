const CACHE_NAME = 'todo-cache-v223'; // Đổi tên cache để kiểm soát phiên bản
const URLS_TO_CACHE = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
];

// Caching tài nguyên khi service worker được cài đặt
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// Cập nhật cache khi service worker được kích hoạt
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Lấy tài nguyên từ cache hoặc mạng
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});