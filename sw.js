// This is the "Offline page" service worker

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineItemCached = [
  'index.html',
  'about.html',
  'cassavaapp.html',
  'contacts.html',
  'products.html',
  // 'product.html',
  'services.html',
  'stylesheet.css',
  'manifest.json',
  'js/app.js',
  'data/products.json',
  'data/services.json',
  'images/products/Algebra-Payment-Platform.jpg',
  'images/products/Bank-KYC-on-Mobile.jpg',
  'images/products/Business-Intelligence-Solution.jpg',
  'images/products/Health-and-Safety-App.jpg',
  'images/products/Microsoft-Office-365.jpg',
  'images/products/Mobile-Tablet-Account-Openning-App.jpg',
  'images/products/School-Management-System.jpg',
  'images/products/Secure-VoucherEPIN-Distribution.jpg',
  'images/products/Sharepoint-Application-Development.jpg',
  'images/services/Application-Services.jpg',
  'images/services/Big-Data-&-Analytics.jpg',
  'images/services/Cloud-Solutions-&-Services.png',
  'images/services/Consulting.jpg',
  'images/services/Cybersecurity.png',
  'images/services/Industry-Software-&-Solutions.jpg',
  'images/services/Infrastructure-Services.png',
  'images/services/Mobility-Solutions.jpg',
  'images/CassavaApp-Logo-100px.png',
  'images/CassavaApp-Logo-small.png',
  'images/CassavaApp-Logo.png',
  'images/HomePage-Picx-250w.png',
  'images/HomePage-Picx-320w.png',
  'images/HomePage-Picx-400w.png',
  'images/HomePage-Picx-600w.png',
  'images/HomePage-Picx-800w.png',
  'images/HomePage-Picx.png',
  'images/logo.png'
];

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function (event) {
  console.log("[PWA Builder] Install Event processing");

  event.waitUntil(
    caches.open(CACHE)
      .then(function (cache) {
        console.log("[PWA Builder] Cached offline files during install");
        return cache.addAll(offlineItemCached);
      })
  );
});

// If any fetch fails, it will show the offline page.

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response){
      if(response) return response;
      return fetch(event.request)
      .then(function(response){
        const resp = response.clone();
        caches.open(CACHE).then(function(cache) {
          cache.put(event.request, resp);
        });
        return response;
      })            
    })
  );
});