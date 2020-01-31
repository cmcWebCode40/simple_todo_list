importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);
//custom Adjustments..

// workbox.routing.register(
//   new RegExp("https://jsonplaceholder.typicode.com/users"),
//   workbox.strategies.cacheFirst()
// );

workbox.preaching.preacheAndRoute([]);
