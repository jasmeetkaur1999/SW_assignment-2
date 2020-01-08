//make sure service worker supported
if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
    .register('./service_worker.js')
    .then(reg => console.log('service worker: Registered')) 
    .catch(err=> console.log(`service worker: Error :${err}`))
  })
}


