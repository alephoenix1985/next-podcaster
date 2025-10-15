const API_CACHE_NAME = 'podcasts-api';
const IMAGES_CACHE_NAME = 'podcast-images';
const API_URLS = 'https://itunes.apple.com|https://api.codetabs.com';
const IMAGES_URL_PATTERN = 'https://is1-ssl.mzstatic.com';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

self.addEventListener('install', (event) => {
    event.waitUntil(
        Promise.all([
            caches.open(API_CACHE_NAME),
            caches.open(IMAGES_CACHE_NAME)
        ]).then(() => {
            console.log('Service Worker: Caches created');
        })
    );
});

self.addEventListener('fetch', (event) => {
    const handleAPIRequest = (event) => {
        event.respondWith(
            caches.open(API_CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) {
                    const lastFetched = new Date(cachedResponse.headers.get('date')).getTime();
                    const now = Date.now();

                    if (now - lastFetched < CACHE_DURATION) {
                        const remainingTime = CACHE_DURATION - (now - lastFetched);
                        const remainingHours = (remainingTime / (1000 * 60 * 60)).toFixed(2);
                        console.log(`Service Worker: Returning cached response for ${event.request.url}. Cache will expire in ${remainingHours} hours.`);
                        return cachedResponse;
                    }
                }

                try {
                    const networkResponse = await fetch(event.request);
                    const responseToCache = networkResponse.clone();
                    const headers = new Headers(responseToCache.headers);
                    headers.set('date', new Date().toUTCString());
                    const body = await responseToCache.blob();
                    const newResponse = new Response(body, {
                        status: responseToCache.status,
                        statusText: responseToCache.statusText,
                        headers: headers
                    });
                    cache.put(event.request, newResponse);
                    return networkResponse;
                } catch {
                    return cachedResponse;
                }
            })
        );
    };

    const handleImageRequest = (event) => {
        event.respondWith(
            caches.open(IMAGES_CACHE_NAME).then(async (cache) => {
                const cachedResponse = await cache.match(event.request);
                if (cachedResponse) return cachedResponse;

                try {
                    const networkResponse = await fetch(event.request);
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                } catch {
                    return new Response(null, {status: 404, statusText: 'Not Found'});
                }
            })
        );
    };

    if (new RegExp(API_URLS).test(event.request.url)) {
        handleAPIRequest(event);
    } else if (new RegExp(IMAGES_URL_PATTERN).test(event.request.url)) {
        handleImageRequest(event);
    }
});