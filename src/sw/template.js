importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
);

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

workbox.core.clientsClaim();

workbox.precaching.precacheAndRoute([]);

workbox.routing.registerRoute(
  /\.(?:gif|jpg|jpeg|png)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 7 * 24 * 60 * 60 // 7 days
      })
    ]
  })
);

workbox.routing.registerNavigationRoute('./index.html', {
  blacklist: [/^\/_/, /\/[^\/?]+\.[^\/]+$/]
});
