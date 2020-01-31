/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

self.addEventListener("message", event => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    url: "css/bg.jpg",
    revision: "9c340977fcafa71a415e2d5463251f9a"
  },
  {
    url: "css/style.css",
    revision: "fc6ef4046811f1326277943738eefc93"
  },
  {
    url: "img/favicon.png",
    revision: "a29f8c90ddcca4332139087f7d591468"
  },
  {
    url: "index.html",
    revision: "2f44fa563cbc6e8534c490f979c0ee2a"
  },
  {
    url: "js/app.js",
    revision: "30d08aae06347ac9f45c7ff2e1806ac1"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
