const version = "v1.0";
const cacheName = `pwaAppCache${version}`;

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(version);
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  console.log("Installing sw, caching is done in this step");
  // event.waitUntil(
  //   addResourcesToCache([
  //     "/",
  //     "/index.html",
  //     "/styles.css",
  //     "/main.js",
  //     "/assets/error408.jpg",
  //   ])
  // );
});

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [version];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
  console.log("Activating sw, cleaning is done in this step");
  // event.waitUntil(deleteOldCaches());
});

const putInCache = async (request, response) => {
  const cache = await caches.open(version);
  await cache.put(request, response);
};

const cacheFirst = async ({ request, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request);
    putInCache(request, responseFromNetwork.clone());
    return responseFromNetwork;
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl);
    if (fallbackResponse) {
      return fallbackResponse;
    }
    return new Response("Network error happened", {
      status: 408,
      headers: { "Content-Type": "text/plain" },
    });
  }
};

self.addEventListener("fetch", (event) => {
  console.log("Intercepting fetch", event.request);
  // event.respondWith(
  //   cacheFirst({
  //     request: event.request,
  //     fallbackUrl: "/assets/error408.jpg",
  //   })
  // );
});
