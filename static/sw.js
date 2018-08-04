self.addEventListener("install", function(event) {});

self.addEventListener("fetch", function(event) {
  event.waitUntil(
    caches.open("cache").then(function(cache) {
      return cache.addAll([
        "/static/styles/default.css",
        "/static/images/favicon-32.ico",
        "/static/images/favicon.ico",
        "/static/images/icon.png",
        "/static/images/og-image.png"
      ]);
    })
  );
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
