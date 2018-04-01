self.addEventListener("install", function(event) {
  console.log("install");
});

self.addEventListener("fetch", function(event) {
  console.log("fetch");
  event.respondWith(
    caches.match(event.request).then(function(response) {
      console.log("cache check");
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
