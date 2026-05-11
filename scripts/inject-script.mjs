#!/usr/bin/env node
// Injects <script type="module" src="/js/main.js"> into every downloaded
// HTML file's <head> so the vanilla JS port runs on each page. Idempotent.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const MARKER = 'data-mp-vanilla="1"';
const TAG = `<script type="module" src="/js/main.js" ${MARKER}></script>`;

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
let injected = 0, skipped = 0;

for (const f of files) {
  const src = fs.readFileSync(f, 'utf8');
  if (src.includes(MARKER)) { skipped++; continue; }
  // Insert immediately before </head>. If no </head>, prepend to <body>.
  let out;
  if (src.includes('</head>')) {
    out = src.replace('</head>', `${TAG}</head>`);
  } else if (src.includes('<body')) {
    out = src.replace(/<body([^>]*)>/, `<body$1>${TAG}`);
  } else {
    out = TAG + src;
  }
  fs.writeFileSync(f, out);
  injected++;
}

console.log(`Injected into ${injected} files (skipped ${skipped} already-injected).`);
