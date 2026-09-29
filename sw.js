const CACHE_NAME = "nuestra-historia-v1";

const FILES = [
    "./",
    "./index.html",
    "./manifest.json",
    "./icon.svg",
    "./foto1.jpg",
    "./foto2.jpg",
    "./foto3.jpg",
    "./foto4.jpg",
    "./foto5.jpg",
    "./foto6.jpg"
];

self.addEventListener("install", event => {

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES))
    );

    self.skipWaiting();
});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            )

        )

    );

    self.clients.claim();
});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(cached => {

                return cached || fetch(event.request);

            })

    );

});
