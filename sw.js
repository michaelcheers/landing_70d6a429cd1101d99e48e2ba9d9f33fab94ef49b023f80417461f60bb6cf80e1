// Service worker that transpiles .jsx/.tsx/.ts/.js imports in the browser.
// Babel Standalone in the page only transpiles the entry script; this
// worker intercepts every same-origin source fetch and runs Babel on it.
//
// .js is included because some files in this codebase are misnamed .js but
// contain TypeScript syntax (e.g. interface declarations). Babel passes real
// JS through unchanged, so this is safe for genuine .js files too.

importScripts('https://unpkg.com/@babel/standalone@7.26.4/babel.min.js');

const CACHE = 'mp-transpile-v2';

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    // Wipe any caches from prior SW versions so stale entries don't survive.
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  if (!/\.(jsx?|tsx?)$/.test(url.pathname)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const cached = await cache.match(event.request);
    if (cached) return cached;
    const src = await fetch(event.request);
    if (!src.ok) return src;
    const text = await src.text();
    let out;
    try {
      const result = self.Babel.transform(text, {
        filename: url.pathname,
        presets: [
          ['react', { runtime: 'automatic' }],
          ['typescript', { allExtensions: true, isTSX: true }],
        ],
        sourceMaps: 'inline',
      });
      out = result.code;
    } catch (err) {
      out = 'throw new Error(' + JSON.stringify('Babel transpile failed for ' + url.pathname + ': ' + err.message) + ');';
    }
    const resp = new Response(out, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
    cache.put(event.request, resp.clone());
    return resp;
  })());
});
