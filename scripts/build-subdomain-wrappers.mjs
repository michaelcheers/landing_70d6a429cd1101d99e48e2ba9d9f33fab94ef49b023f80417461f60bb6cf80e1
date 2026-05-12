#!/usr/bin/env node
// Generates the iframe-wrapper 404.html for each subdomain site. GitHub
// Pages serves 404.html for ANY missing path — including the root — so
// one file per subdomain is enough. The wrapper reads location.pathname,
// points the iframe at www.movingpapa.com/<city>{pathname}, and reflects
// nav events from the iframe (via postMessage) into the parent URL bar.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SUBDOMAIN_DIR = path.join(ROOT, 'subdomain-sites');

const PROD = 'https://www.movingpapa.com';
const STAGING = 'https://staging.movingpapa.com';

// Each entry generates one subdomain wrapper. `slug` is the city path on
// the upstream origin (so vancouver-staging still points at /vancouver/*).
// `host` is the subdomain (the CNAME). `origin` is where the iframe loads
// from — production for prod subdomains, the gh-pages staging URL for
// the *-staging subdomains.
const SUBDOMAINS = [
  { host: 'vancouver',         slug: 'vancouver', label: 'Vancouver', origin: PROD    },
  { host: 'ottawa',            slug: 'ottawa',    label: 'Ottawa',    origin: PROD    },
  { host: 'calgary',           slug: 'calgary',   label: 'Calgary',   origin: PROD    },
  { host: 'edmonton',          slug: 'edmonton',  label: 'Edmonton',  origin: PROD    },
  { host: 'vancouver-staging', slug: 'vancouver', label: 'Vancouver', origin: STAGING },
];

function wrapperHtml(sub) {
  const title = `Moving Papa ${sub.label} — Trusted Movers`;
  const desc = `${sub.label}'s licensed, insured residential and commercial movers.`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${title}</title>
  <meta name="description" content="${desc}"/>
  <meta name="robots" content="noindex,nofollow"/>
  <meta property="og:title" content="${title}"/>
  <meta property="og:description" content="${desc}"/>
  <meta property="og:url" content="https://${sub.host}.movingpapa.com/"/>
  <meta property="og:image" content="${sub.origin}/images/moving-papa-social-share.webp"/>
  <link rel="canonical" href="https://${sub.host}.movingpapa.com/"/>
  <link rel="icon" href="${sub.origin}/favicon.ico"/>
  <style>html,body{margin:0;height:100%;background:#103928}#mp-iframe{border:0;width:100vw;height:100vh;display:block}</style>
</head>
<body>
  <iframe id="mp-iframe" title="Moving Papa ${sub.label}" allow="geolocation; payment; clipboard-write"></iframe>
  <script>
    (function () {
      var CITY = ${JSON.stringify('/' + sub.slug)};
      var MAIN = ${JSON.stringify(sub.origin)};
      var iframe = document.getElementById('mp-iframe');

      function targetFor(loc) {
        var p = loc.pathname || '/';
        var inner = (p === '/' ? '' : p) + (loc.search || '') + (loc.hash || '');
        return MAIN + CITY + inner;
      }

      // Initial load: point iframe at the corresponding main-domain page.
      iframe.src = targetFor(window.location);

      // Iframe nav → reflect into parent URL bar. Use replaceState rather
      // than pushState — the iframe owns its own back/forward stack and
      // adds history entries there, so a parent pushState would double up.
      window.addEventListener('message', function (e) {
        if (e.origin !== MAIN) return;
        var d = e.data;
        if (!d || d.type !== 'mp-iframe-nav' || typeof d.path !== 'string') return;
        var current = window.location.pathname + window.location.search + window.location.hash;
        if (current !== d.path) {
          try { history.replaceState({}, '', d.path); } catch (_) {}
        }
      });
    })();
  </script>
</body>
</html>
`;
}

for (const sub of SUBDOMAINS) {
  const dir = path.join(SUBDOMAIN_DIR, `${sub.host}-site`);
  fs.mkdirSync(dir, { recursive: true });
  // Drop any stale index.html — we only want 404.html as the catch-all.
  const indexPath = path.join(dir, 'index.html');
  if (fs.existsSync(indexPath)) {
    fs.unlinkSync(indexPath);
    console.log(`  rm ${path.relative(ROOT, indexPath)}`);
  }
  fs.writeFileSync(path.join(dir, 'CNAME'), `${sub.host}.movingpapa.com\n`);
  fs.writeFileSync(path.join(dir, '404.html'), wrapperHtml(sub));
  console.log(`✓ ${sub.host}-site/  (origin: ${sub.origin})`);
}
