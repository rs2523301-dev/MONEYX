
const CACHE_NAME = "moneyx-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./Style.css",
    "./Script.js",
    "./manifest.json"
];

// Install
self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    self.skipWaiting();
});

// Activate
self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

// Fetch
self.addEventListener("fetch", function(event) {
    if (event.request.method !== "GET") return;

    event.respondWith(
        caches.match(event.request).then(function(cachedFile) {
            return cachedFile || fetch(event.request);
        })
    );
});
