#!/usr/bin/env node
// Post-download cleanup for the 5 thankyou pages:
//   1. Strip any book-online upsell card (<main id="bo-root">, .book-online-card, or
//      DOM text containing "Skip the wait" / "Book online now" / "tentatively hold").
//   2. Insert the "Helpful Moving Resources" section before the "Interesting Moving Facts"
//      block. Idempotent via data-mp-resources="1" marker.
//
// Re-run safe: skips files already carrying the marker for the insert step;
// re-runs the strip step unconditionally (matches nothing on already-clean files).

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const FILES = [
  'thankyou/index.html',
  'vancouver/thankyou/index.html',
  'calgary/thankyou/index.html',
  'edmonton/thankyou/index.html',
  'ottawa/thankyou/index.html',
];

const ANCHOR = '<div class="flex justify-center w-full bg-primary"><div class="flex flex-wrap w-full md:w-[1250px] justify-center my-10"><div class="w-full px-6"><h2 class="text-tertiary font-bold text-3xl py-6 text-center">Interesting Moving Facts</h2>';

const RESOURCES_HTML = `<section data-mp-resources="1" class="w-full flex justify-center py-8 md:py-12 bg-[#F8F5EC]"><div class="w-full max-w-[1250px] mx-4 md:mx-0"><h2 class="text-primary font-bold text-3xl mb-2 text-center">Helpful Moving Resources</h2><p class="text-primary/80 text-base text-center mb-8">While you wait for our team to reach out, grab these free guides to make your move easier.</p><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><a href="/pdfs/simple-packing-guide.pdf" target="_blank" rel="noopener" class="block bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition p-5"><div class="text-3xl mb-3">📦</div><h3 class="text-primary font-bold text-lg mb-1">Simple Packing Guide</h3><p class="text-sm text-primary/70 mb-3">Room-by-room packing tips so nothing breaks in transit.</p><span class="text-tertiary font-bold text-sm">Download PDF →</span></a><a href="/pdfs/moving-pricing-guide.pdf" target="_blank" rel="noopener" class="block bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition p-5"><div class="text-3xl mb-3">💵</div><h3 class="text-primary font-bold text-lg mb-1">Moving Pricing Guide</h3><p class="text-sm text-primary/70 mb-3">Understand how movers price your move and what to expect.</p><span class="text-tertiary font-bold text-sm">Download PDF →</span></a><a href="/pdfs/moving-day-guide.pdf" target="_blank" rel="noopener" class="block bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition p-5"><div class="text-3xl mb-3">🚚</div><h3 class="text-primary font-bold text-lg mb-1">Moving Day Guide</h3><p class="text-sm text-primary/70 mb-3">Exactly what to do (and not do) the morning the truck arrives.</p><span class="text-tertiary font-bold text-sm">Download PDF →</span></a><a href="/pdfs/moving-checklist.pdf" target="_blank" rel="noopener" class="block bg-white rounded-xl border border-primary/10 shadow-sm hover:shadow-md transition p-5"><div class="text-3xl mb-3">✅</div><h3 class="text-primary font-bold text-lg mb-1">Moving Checklist</h3><p class="text-sm text-primary/70 mb-3">An 8-week countdown so nothing falls through the cracks.</p><span class="text-tertiary font-bold text-sm">Download PDF →</span></a></div></div></section>`;

function stripUpsell(html) {
  let out = html;
  // Remove <main id="bo-root">...</main>
  out = out.replace(/<main\b[^>]*\bid=["']bo-root["'][^>]*>[\s\S]*?<\/main>/gi, '');
  // Remove any <div class="...book-online-card...">...</div> by greedy-matching minimum closing depth.
  // Static HTML is single-line so we capture from the opening tag up to first </div> that balances.
  // For safety (no parser), only target a self-contained wrapper that begins with that class.
  out = out.replace(/<div\b[^>]*class=["'][^"']*\bbook-online-card\b[^"']*["'][^>]*>[\s\S]*?<\/div>/gi, '');
  return out;
}

let edited = 0;
for (const rel of FILES) {
  const path = resolve(ROOT, rel);
  if (!existsSync(path)) {
    console.warn(`skip (missing): ${rel}`);
    continue;
  }
  let html = readFileSync(path, 'utf8');
  const before = html;

  html = stripUpsell(html);

  if (html.includes('data-mp-resources="1"')) {
    if (html !== before) {
      writeFileSync(path, html);
      console.log(`stripped only: ${rel}`);
      edited++;
    } else {
      console.log(`already clean:  ${rel}`);
    }
    continue;
  }

  const idx = html.indexOf(ANCHOR);
  if (idx === -1) {
    console.warn(`anchor not found: ${rel} — wrote strip-only`);
    if (html !== before) writeFileSync(path, html);
    continue;
  }
  html = html.slice(0, idx) + RESOURCES_HTML + html.slice(idx);
  writeFileSync(path, html);
  console.log(`updated: ${rel}`);
  edited++;
}
console.log(`done (${edited} file${edited === 1 ? '' : 's'} edited).`);
