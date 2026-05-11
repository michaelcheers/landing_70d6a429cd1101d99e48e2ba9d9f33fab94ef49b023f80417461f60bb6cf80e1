#!/usr/bin/env node
// Downloads every URL listed in sitemap.xml + vancouver-sitemap.xml as static
// HTML into the repo root, mirroring the URL path as a directory tree
// (e.g. /service-area/ajax → service-area/ajax/index.html). The homepage
// becomes index.html at the root.
//
// Usage: node scripts/download-pages.mjs [--concurrency=8]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const CONCURRENCY = Number(
  (process.argv.find(a => a.startsWith('--concurrency=')) || '').split('=')[1] || 8,
);

function readSitemap(file) {
  const xml = fs.readFileSync(path.join(ROOT, file), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
}

// Dynamic pages (forms / callbacks / thankyou) that are deliberately not
// in the sitemap but still need to be downloaded for the static port.
const CITIES = ['', 'vancouver', 'ottawa', 'calgary', 'edmonton'];
const DYNAMIC_PATHS = [
  '/finalstep/residential',
  '/finalstep/commercial',
  '/finalstep/storage',
  '/aboutus',
  '/book-online',
  '/callback',
  '/thankyou',
];
const dynamicUrls = CITIES.flatMap(city =>
  DYNAMIC_PATHS.map(p => `https://www.movingpapa.com${city ? '/' + city : ''}${p}`),
);

const urls = Array.from(
  new Set([
    ...readSitemap('sitemap.xml'),
    ...readSitemap('vancouver-sitemap.xml'),
    ...dynamicUrls,
  ]),
).sort();

console.log(`Found ${urls.length} URLs to download (concurrency=${CONCURRENCY}).`);

function urlToOutputPath(u) {
  const { pathname } = new URL(u);
  // Map "/" → "index.html", "/foo/bar" → "foo/bar/index.html"
  const clean = pathname.replace(/^\/+|\/+$/g, '');
  if (!clean) return path.join(ROOT, 'index.html');
  return path.join(ROOT, clean, 'index.html');
}

async function fetchOne(url) {
  const out = urlToOutputPath(url);
  // Skip if already downloaded (idempotent re-runs).
  if (fs.existsSync(out) && fs.statSync(out).size > 0) {
    return { url, status: 'skip', out };
  }
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; movingpapa-static-archiver/1.0)',
        Accept: 'text/html,application/xhtml+xml',
      },
    });
    if (!res.ok) return { url, status: `http ${res.status}`, out };
    const html = await res.text();
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    return { url, status: 'ok', out, bytes: html.length };
  } catch (e) {
    return { url, status: `err ${e.message}`, out };
  }
}

async function runPool(items, n, worker) {
  const results = [];
  let i = 0;
  async function next() {
    while (i < items.length) {
      const idx = i++;
      const r = await worker(items[idx]);
      results[idx] = r;
      const tag = r.status === 'ok' ? 'OK ' : r.status === 'skip' ? '-- ' : 'FAIL';
      console.log(`[${idx + 1}/${items.length}] ${tag} ${r.url}${r.status !== 'ok' && r.status !== 'skip' ? ' :: ' + r.status : ''}`);
    }
  }
  await Promise.all(Array.from({ length: n }, next));
  return results;
}

const results = await runPool(urls, CONCURRENCY, fetchOne);

const counts = results.reduce((a, r) => ((a[r.status.split(' ')[0]] = (a[r.status.split(' ')[0]] || 0) + 1), a), {});
console.log('\nSummary:', counts);

const failed = results.filter(r => r.status !== 'ok' && r.status !== 'skip');
if (failed.length) {
  console.log('\nFailed URLs:');
  for (const f of failed) console.log('  ' + f.status + '  ' + f.url);
  process.exit(1);
}
