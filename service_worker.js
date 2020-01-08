const cacheName = "v6";
const cacheassests = ['aboutus2.css',
'contact.css',
'homepage.css',
'staff.css',
'aboutus2.html',
'contact.html',
'homepage.html',
'staff.html',
'/js/main.js']

//call install event 
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
  e.waitUntil(
    caches
    .open(cacheName)
    .then(cache => {
      console.log('Service Worker: Caching Files');
      cache.addAll(cacheassests);
    })
    .then(() => self.skipWaiting()) //put the files in the cache // available for offline viewing
  )
})
self.addEventListener("activate", e => {
  console.log('service worker: activated');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all (
        cacheNames.map(cache =>  {
          if (cache !== cacheName) {
            console.log('service Worker: clearing old chche');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('service worker: Fetching');
  e.respondWith(
    fetch(e.request)
    .then(res => {
    const resClone = res.clone();
    caches
    .open(cacheName)
    .then(cache => {
      cache.put(e.request, resClone)
    })
    return res;
  }).catch(err => caches.match(e.request).then(res => res))
  

  )
})