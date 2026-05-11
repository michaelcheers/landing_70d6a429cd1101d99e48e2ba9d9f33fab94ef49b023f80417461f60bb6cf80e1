// Service worker that adapts the source tree for in-browser ES module loading:
//
// - .jsx/.tsx/.ts/.js fetched as scripts (same-origin): transpiled with Babel.
// - .png/.jpg/.jpeg/.gif/.webp/.svg/.avif/.ico fetched AS A MODULE IMPORT:
//   returned as a JS module that exports the URL string. Mimics what
//   bundlers do at build time.
// - .css fetched AS A MODULE IMPORT (any origin): returned as a JS module
//   that injects a <link rel="stylesheet"> tag pointing at the original URL.
//   The browser then loads the CSS via the link tag with proper MIME handling.
// - Anything else (images via <img src>, CSS via <link>, etc.) passes through.
//
// .js is included in the source-file group because some files in this
// codebase are misnamed .js but contain TypeScript syntax. Babel passes
// real JS through unchanged, so this is safe.

importScripts('https://unpkg.com/@babel/standalone@7.26.4/babel.min.js');

const CACHE = 'mp-transpile-v4';
const SOURCE_RE = /\.(jsx?|tsx?)$/;
const IMAGE_RE = /\.(png|jpe?g|gif|webp|svg|avif|ico)$/i;
const CSS_RE   = /\.css$/i;

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
  const path = url.pathname;

  // CSS imported as a module (any origin) — return a stub that injects a
  // <link> tag. The browser will load the CSS via the link with proper MIME.
  if (event.request.destination === 'script' && CSS_RE.test(path)) {
    const href = url.href;
    const code =
      '(function () {\n' +
      '  if (typeof document === "undefined") return;\n' +
      '  var u = ' + JSON.stringify(href) + ';\n' +
      '  if (document.querySelector(\'link[data-mp-css="\' + u + \'"]\')) return;\n' +
      '  var l = document.createElement("link");\n' +
      '  l.rel = "stylesheet";\n' +
      '  l.href = u;\n' +
      '  l.setAttribute("data-mp-css", u);\n' +
      '  document.head.appendChild(l);\n' +
      '})();\n' +
      'export default null;\n';
    event.respondWith(new Response(code, {
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    }));
    return;
  }

  // Everything below is same-origin only.
  if (url.origin !== self.location.origin) return;

  // Image imported as a module — return a stub module exporting the URL.
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
