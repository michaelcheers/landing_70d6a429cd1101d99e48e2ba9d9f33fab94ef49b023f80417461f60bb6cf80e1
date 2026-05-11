// Service worker that transpiles source files and wraps image imports for
// in-browser ES module loading.
//
// - .jsx/.tsx/.ts/.js fetched as scripts: transpiled with Babel.
// - .png/.jpg/.jpeg/.gif/.webp/.svg/.avif/.ico fetched AS A MODULE IMPORT
//   (e.g. `import logo from '/foo.png'`): returned as a JS module that
//   exports the URL string. This mimics what bundlers do at build time.
// - The same image fetched via <img src>, CSS url(), etc. passes through
//   untouched.
//
// .js is included in the source-file group because some files in this
// codebase are misnamed .js but contain TypeScript syntax. Babel passes
// real JS through unchanged, so this is safe.

importScripts('https://unpkg.com/@babel/standalone@7.26.4/babel.min.js');

const CACHE = 'mp-transpile-v3';
const SOURCE_RE = /\.(jsx?|tsx?)$/;
const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg|avif|ico)$/i;

self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(n => n !== CACHE).map(n => caches.delete(n)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  const path = url.pathname;

  // Image being imported as an ES module — return a stub module exporting
  // the URL. Bundlers normally do this at build time.
  if (event.request.destination === 'script' && IMAGE_RE.test(path)) {
    event.respondWith(new Response(
      'export default ' + JSON.stringify(path) + ';',
      {
        headers: {
          'Content-Type': 'application/javascript; charset=utf-8',
          'Cache-Control': 'no-cache',
        },
      }
    ));
    return;
  }

  // Source file — transpile with Babel.
  if (!SOURCE_RE.test(path)) return;

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
        filename: path,
        presets: [
          ['react', { runtime: 'automatic' }],
          ['typescript', { allExtensions: true, isTSX: true }],
        ],
        sourceMaps: 'inline',
      });
      out = result.code;
    } catch (err) {
      out = 'throw new Error(' + JSON.stringify('Babel transpile failed for ' + path + ': ' + err.message) + ');';
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
