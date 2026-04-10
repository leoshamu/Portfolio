const CACHE_VERSION = 'portfolio-cache-v1'
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`
const APP_SHELL = ['./', './index.html', './favicon.svg']

self.addEventListener('install', (event) => {
  self.skipWaiting()
  event.waitUntil(caches.open(RUNTIME_CACHE).then((cache) => cache.addAll(APP_SHELL)))
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key)),
      ),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)
  const isSameOrigin = url.origin === self.location.origin
  const isFontRequest =
    url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com'

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone()
          caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy))
          return response
        })
        .catch(async () => {
          const cached = await caches.match(event.request)
          return cached || caches.match('./index.html')
        }),
    )
    return
  }

  if (isSameOrigin || isFontRequest) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone()
              caches.open(RUNTIME_CACHE).then((cache) => cache.put(event.request, copy))
            }
            return response
          })
          .catch(() => cached)

        return cached || networkFetch
      }),
    )
  }
})
