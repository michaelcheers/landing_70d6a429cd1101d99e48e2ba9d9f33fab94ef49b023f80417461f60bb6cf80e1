// add-tracking.mjs — idempotently:
//   (1) insert the ClickCease body snippet on every *.html under this dir
//   (2) amend the CSP meta tag for Google Tag Manager / gtag / Google Analytics
//   (3) amend the CSP meta tag for ClickCease

import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = new URL('.', import.meta.url).pathname;

const CC_SNIPPET = `<!--  ClickCease.com tracking-->
<script type='text/javascript'>var script = document.createElement('script');
      script.async = true; script.type = 'text/javascript';
      var target = 'https://www.clickcease.com/monitor/stat.js';
      script.src = target;var elem = document.head;elem.appendChild(script);
      </script>
      <noscript>
      <a href='https://www.clickcease.com' rel='nofollow'><img src='https://monitor.clickcease.com' alt='ClickCease'/></a>
      </noscript>
<!--  ClickCease.com tracking-->`;

const CC_MARKER = 'ClickCease.com tracking';

const sha256 = (s) => "'sha256-" + crypto.createHash('sha256').update(s, 'utf8').digest('base64') + "'";
const CC_INLINE = CC_SNIPPET.match(/<script[^>]*>([\s\S]*?)<\/script>/)[1];
const CC_HASH = sha256(CC_INLINE);

const ADD = {
  scriptSrc: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.clickcease.com',
    CC_HASH,
  ],
  imgSrc: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://monitor.clickcease.com',
  ],
  frameSrc: [
    'https://www.googletagmanager.com',
  ],
};

async function walk(dir, out = []) {
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p, out);
    else if (e.isFile() && e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function injectCC(html) {
  if (html.includes(CC_MARKER)) return html;
  const gtmNs = /(<noscript><iframe src="https:\/\/www\.googletagmanager\.com\/ns\.html[^"]*"[^>]*><\/iframe><\/noscript>)/i;
  if (gtmNs.test(html)) return html.replace(gtmNs, `$1\n${CC_SNIPPET}`);
  return html.replace(/(<body\b[^>]*>)/i, `$1\n${CC_SNIPPET}`);
}

function collectGtmHashes(html) {
  const out = new Set();
  const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const body = m[1];
    if (!body) continue;
    if (/\bself\.__next_f\b/.test(body)) continue;
    if (
      body.includes('GTM-') ||
      body.includes('gtag(') ||
      /^\s*window\.dataLayer\s*=\s*window\.dataLayer\s*\|\|\s*\[\]\s*;?\s*$/.test(body)
    ) {
      out.add(sha256(body));
    }
  }
  return [...out];
}

function collectStaleHashes(html) {
  const stale = new Set();
  const re = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    const body = m[1];
    if (!body) continue;
    if (/\bself\.__next_f\b/.test(body)) stale.add(sha256(body));
  }
  return stale;
}

function patchCsp(html) {
  const gtmHashes = collectGtmHashes(html);
  const stale = collectStaleHashes(html);
  const re = /(<meta\s+http-equiv="Content-Security-Policy"\s+content=")([^"]+)(")/i;
  return html.replace(re, (m, pre, csp, post) => {
    const parts = csp.split(';').map(s => s.trim()).filter(Boolean);
    const ensure = (dir, toks) => {
      const idx = parts.findIndex(p => new RegExp(`^${dir}\\b`, 'i').test(p));
      if (idx === -1) {
        parts.push(`${dir} ${toks.join(' ')}`);
      } else {
        const present = new Set(parts[idx].split(/\s+/));
        for (const t of toks) if (!present.has(t)) parts[idx] += ' ' + t;
      }
    };
    const stripStale = (dir) => {
      const idx = parts.findIndex(p => new RegExp(`^${dir}\\b`, 'i').test(p));
      if (idx === -1) return;
      const toks = parts[idx].split(/\s+/);
      const kept = toks.filter(t => !stale.has(t));
      parts[idx] = kept.join(' ');
    };
    stripStale('script-src');
    ensure('script-src', [...ADD.scriptSrc, ...gtmHashes]);
    ensure('img-src',    ADD.imgSrc);
    ensure('frame-src',  ADD.frameSrc);
    return pre + parts.join('; ') + post;
  });
}

const files = await walk(ROOT);
let changed = 0;
for (const f of files) {
  const before = await fs.readFile(f, 'utf8');
  let after = injectCC(before);
  after = patchCsp(after);
  if (after !== before) { await fs.writeFile(f, after); changed++; }
}
console.log(`Updated ${changed}/${files.length} HTML files.`);
