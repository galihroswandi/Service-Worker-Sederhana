/*
 *  Kita akan ubah nama
 *  pada cacheVersion
 *  supaya browser tahu bahwa
 *  ada perubahan terbaru
 */
const cacheVersion = "v2-pwa-dasar";

const filesToCache = [
  "/",
  "/css/materialize.min.css",
  "/css/styles.css",
  "/fonts/roboto/Roboto-Bold.woff",
  "/fonts/roboto/Roboto-Bold.woff2",
  "/fonts/roboto/Roboto-Medium.woff",
  "/fonts/roboto/Roboto-Medium.woff2",
  "/fonts/roboto/Roboto-Regular.woff",
  "/fonts/roboto/Roboto-Regular.woff2",
  "/fonts/material-icons/material-icons.woff",
  "/js/jquery.min.js",
  "/js/materialize.min.js",
  "/js/app.js",
  "/js/index.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((res) => {
      if (res) return res;

      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== cacheVersion;
          })
          .map((cacheName) => {
            caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});

/*
 * Beberapa funsi  yang bisa digunakan di dalam callback ketika mendaftarkan service worker
 */
// navigator.serviceWorker.register('/sw.js')
//   .then(function(reg) {
//     // reg.waiting;
//     // reg.installing;
//     // reg.active;
//     // reg.update();
//     // reg.unregister();
//     // reg.addEventListener('updatefound', function() { ... });
//   })
