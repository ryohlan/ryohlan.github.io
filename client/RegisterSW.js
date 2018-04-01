if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/static/sw.js").catch(function(err) {
    console.log("ServiceWorker registration failed: ", err);
  });
}
