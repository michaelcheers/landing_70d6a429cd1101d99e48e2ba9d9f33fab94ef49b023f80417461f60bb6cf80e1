#!/usr/bin/env node
// Mirrors vercel-blob-hosted videos locally and rewrites HTML to point at
// /videos/<file>. Anything over LARGE_THRESHOLD_BYTES is left for the user
// to provide as .webm (the HTML is rewritten with a .webm extension so the
// converted file just drops into place).
//
// Idempotent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const VIDEOS_DIR = path.join(ROOT, 'videos');
const VERCEL_HOST_RE = /https:\/\/[a-z0-9]+\.public\.blob\.vercel-storage\.com\/([^"')\s]+)/g;
const LARGE_THRESHOLD_BYTES = 50 * 1024 * 1024; // 50 MB

fs.mkdirSync(VIDEOS_DIR, { recursive: true });

function walk(dir, out = []) {
  for (const name of fs.readdirSync(dir)) {
    if (name === 'node_modules' || name === '.git' || name === 'subdomain-sites' || name === 'videos') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, out);
    else if (name.endsWith('.html')) out.push(full);
  }
  return out;
}

const files = walk(ROOT);

// ----- Step 1: collect every unique vercel-blob URL ----------------------
const urls = new Set();
for (const f of files) {
  const html = fs.readFileSync(f, 'utf8');
  for (const m of html.matchAll(VERCEL_HOST_RE)) urls.add(m[0]);
}
console.log(`Found ${urls.size} unique vercel-blob URL(s).`);

// ----- Step 2: HEAD each URL to learn size + decide strategy -------------

async function head(url) {
  const r = await fetch(url, { method: 'HEAD' });
  if (!r.ok) return null;
  const len = Number(r.headers.get('content-length') || 0);
  return { ok: true, size: len };
}

const decisions = new Map(); // url -> { strategy: 'mp4'|'webm', localPath, encodedRef }

for (const url of urls) {
  const info = await head(url);
  // Filename = last path segment (URL-encoded). Decoded form lives on disk.
  const encodedName = url.split('/').pop();
  const decodedName = decodeURIComponent(encodedName);
  if (!info) {
    console.log(`  ?  HEAD failed for ${url} — skipping`);
    continue;
  }
  if (info.size > LARGE_THRESHOLD_BYTES) {
    const webmEncoded = encodedName.replace(/\.mp4$/i, '.webm');
    const webmDecoded = decodedName.replace(/\.mp4$/i, '.webm');
    decisions.set(url, {
      strategy: 'webm',
      size: info.size,
      localPath: path.join(VIDEOS_DIR, webmDecoded),
      encodedRef: `/videos/${webmEncoded}`,
    });
    console.log(`  webm  ${(info.size / 1024 / 1024).toFixed(1)}MB  ${decodedName} → user-supplied ${webmDecoded}`);
  } else {
    decisions.set(url, {
      strategy: 'mp4',
      size: info.size,
      localPath: path.join(VIDEOS_DIR, decodedName),
      encodedRef: `/videos/${encodedName}`,
    });
    console.log(`  mp4   ${(info.size / 1024).toFixed(0)}KB    ${decodedName}`);
  }
}

// ----- Step 3: download every mp4-strategy URL ---------------------------

async function downloadOne(url, dest) {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return { skipped: true };
  const r = await fetch(url);
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const buf = Buffer.from(await r.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return { bytes: buf.length };
}

let downloaded = 0, skipped = 0, failed = 0;
const dlPromises = [];
for (const [url, d] of decisions) {
  if (d.strategy !== 'mp4') continue;
  dlPromises.push((async () => {
    try {
      const r = await downloadOne(url, d.localPath);
      if (r.skipped) { skipped++; console.log(`  --  ${path.basename(d.localPath)} (already on disk)`); }
      else { downloaded++; console.log(`  OK  ${path.basename(d.localPath)} (${(r.bytes / 1024).toFixed(0)}KB)`); }
    } catch (e) {
      failed++; console.log(`  FAIL  ${path.basename(d.localPath)} :: ${e.message}`);
    }
  })());
}
await Promise.all(dlPromises);
console.log(`Downloaded ${downloaded}, skipped ${skipped}, failed ${failed}.`);

// ----- Step 4: rewrite HTML ----------------------------------------------

let rewritten = 0;
for (const f of files) {
  let html = fs.readFileSync(f, 'utf8');
  const before = html;
  for (const [url, d] of decisions) {
    // Escape regex chars in the URL for the literal replace.
    const re = new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    html = html.replace(re, d.encodedRef);
  }
  if (html !== before) { fs.writeFileSync(f, html); rewritten++; }
}
console.log(`Rewrote ${rewritten} HTML file(s).`);

// ----- Step 5: summary of webm-strategy URLs the user must supply --------
const pending = [...decisions.entries()].filter(([, d]) => d.strategy === 'webm');
if (pending.length) {
  console.log(`\nUser action needed — place the following converted .webm files in /videos/:`);
  for (const [url, d] of pending) {
    console.log(`  • ${path.basename(d.localPath)}   (source: ${url}, ${(d.size / 1024 / 1024).toFixed(1)}MB mp4)`);
  }
}
