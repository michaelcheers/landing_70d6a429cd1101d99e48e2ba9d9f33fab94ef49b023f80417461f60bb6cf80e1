#!/usr/bin/env node
// Three-in-one HTML post-processor for the static port. Idempotent.
//
//   (a) Downloads every /_next/static/media/* asset referenced anywhere in
//       the HTML — images, fonts, the headerlogo SVG, etc. — to the same
//       path locally.
//   (b) Downloads every /_next/static/chunks/*.css bundle. The existing
//       <link rel="stylesheet"> tags then resolve and the pages get their
//       full Tailwind + globals styling back.
//   (c) Rewrites /_next/image?url=...&w=...&q=... → the decoded inner URL.
//       Strips every <script src="/_next/static/chunks/*.js"> tag and the
//       matching <link rel="preload" as="script"> hints, since we run our
//       own /js/main.js and don't want Next's React runtime fighting it.
//
// Run after scripts/download-pages.mjs. Re-runs are safe.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const ORIGIN = 'https://www.movingpapa.com';
const CONCURRENCY = Number(
  (process.argv.find(a => a.startsWith('--concurrency=')) || '').split('=')[1] || 12,
);

// ----- Walk HTML files ----------------------------------------------------

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'subdomain-sites') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
console.log(`Found ${files.length} HTML files.`);

// ----- Step 1: scan + rewrite + strip ------------------------------------

const assetUrls = new Set();

function addAsset(u) {
  // Strip the ?dpl=... query — it's a Vercel deploy ID, just cache busting.
  const clean = u.split('?')[0];
  assetUrls.add(clean);
}

// Decode encoded /_next/image URL into its inner /_next/static/media/... path.
function decodeImageProxy(rawUrl) {
  try {
    const u = new URL('https://x' + rawUrl);
    const inner = u.searchParams.get('url');
    if (!inner) return null;
    return inner.startsWith('http') ? inner : decodeURIComponent(inner);
  } catch { return null; }
}

let stripped = { jsScripts: 0, jsPreloads: 0, imgProxies: 0, mediaAssets: 0, chunkCss: 0 };

for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  const before = html;

  // (a) Collect /_next/static/media/* URLs. Path chars are limited to
  // [A-Za-z0-9._-/] to avoid swallowing &quot; / trailing-backslash escapes
  // emitted inside inline `style="background-image:url(&quot;…&quot;)"`.
  for (const m of html.matchAll(/\/_next\/static\/media\/[A-Za-z0-9._\-/]+(?:\?[A-Za-z0-9._=&%-]*)?/g)) {
    addAsset(m[0]);
    stripped.mediaAssets++;
  }
  // (b) Collect /_next/static/chunks/*.css URLs (not JS — those get stripped).
  for (const m of html.matchAll(/\/_next\/static\/chunks\/[A-Za-z0-9._\-/]+\.css(?:\?[A-Za-z0-9._=&%-]*)?/g)) {
    addAsset(m[0]);
    stripped.chunkCss++;
  }

  // (c) Rewrite /_next/image?url=ENCODED&... → decoded inner URL.
  html = html.replace(/(["'])(\/_next\/image\?[^"']+)\1/g, (_, q, raw) => {
    const inner = decodeImageProxy(raw);
    if (!inner) return q + raw + q;
    // Also collect the inner asset for download.
    if (inner.startsWith('/_next/static/media/')) addAsset(inner);
    stripped.imgProxies++;
    return q + inner.split('?')[0] + q;
  });
  // Same rewrite inside background-image: url(/_next/image?...) — rare but possible.
  html = html.replace(/url\((["']?)(\/_next\/image\?[^"')]+)\1\)/g, (_, q, raw) => {
    const inner = decodeImageProxy(raw);
    if (!inner) return `url(${q}${raw}${q})`;
    if (inner.startsWith('/_next/static/media/')) addAsset(inner);
    stripped.imgProxies++;
    return `url(${q}${inner.split('?')[0]}${q})`;
  });

  // Strip dead JS chunks + their preload hints.
  html = html.replace(/<script[^>]*src="\/_next\/static\/chunks\/[^"]+\.js[^"]*"[^>]*><\/script>/g,
    () => { stripped.jsScripts++; return ''; });
  html = html.replace(/<link[^>]*rel="preload"[^>]*href="\/_next\/static\/chunks\/[^"]+\.js[^"]*"[^>]*\/?>/g,
    () => { stripped.jsPreloads++; return ''; });
  html = html.replace(/<link[^>]*href="\/_next\/static\/chunks\/[^"]+\.js[^"]*"[^>]*rel="preload"[^>]*\/?>/g,
    () => { stripped.jsPreloads++; return ''; });

  if (html !== before) fs.writeFileSync(f, html);
}

console.log('HTML pass:', stripped);
console.log(`Unique _next assets to fetch: ${assetUrls.size}`);

// ----- Step 2: download collected assets ---------------------------------

async function fetchOne(urlPath) {
  const localPath = path.join(ROOT, urlPath.replace(/^\//, ''));
  if (fs.existsSync(localPath) && fs.statSync(localPath).size > 0) {
    return { urlPath, status: 'skip' };
  }
  try {
    const res = await fetch(ORIGIN + urlPath, {
      headers: { 'User-Agent': 'movingpapa-static-archiver/1.0' },
    });
    if (!res.ok) return { urlPath, status: `http ${res.status}` };
    const buf = Buffer.from(await res.arrayBuffer());
    fs.mkdirSync(path.dirname(localPath), { recursive: true });
    fs.writeFileSync(localPath, buf);
    return { urlPath, status: 'ok', bytes: buf.length };
  } catch (e) {
    return { urlPath, status: `err ${e.message}` };
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
      const tag = r.status === 'ok' ? 'OK  ' : r.status === 'skip' ? '--  ' : 'FAIL';
      const sizeStr = r.bytes ? ` (${(r.bytes / 1024).toFixed(1)}KB)` : '';
      const errStr = r.status !== 'ok' && r.status !== 'skip' ? ' :: ' + r.status : '';
      console.log(`[${(idx + 1).toString().padStart(4)}/${items.length}] ${tag} ${r.urlPath}${sizeStr}${errStr}`);
    }
  }
  await Promise.all(Array.from({ length: n }, next));
  return results;
}

const urls = Array.from(assetUrls).sort();
const results = await runPool(urls, CONCURRENCY, fetchOne);

const summary = results.reduce((acc, r) => {
  const key = r.status.split(' ')[0];
  acc[key] = (acc[key] || 0) + 1;
  return acc;
}, {});
console.log('\nDownload summary:', summary);

const failed = results.filter(r => r.status !== 'ok' && r.status !== 'skip');
if (failed.length) {
  console.log(`\n${failed.length} failed:`);
  for (const f of failed.slice(0, 20)) console.log('  ' + f.status + '  ' + f.urlPath);
  if (failed.length > 20) console.log(`  …and ${failed.length - 20} more.`);
}
