import React from 'react';
import { ROUTE_META } from '../meta/metadata.js';

// React.lazy + Suspense for code-split page loading. The service worker
// transpiles .jsx imports on the fly so no build step is required.
const lz = (path) => React.lazy(() => import(/* webpackIgnore: true */ path));

// Explicit table of all 113 routes. Maps URL pattern → page module.
// Patterns use ':name' for params, e.g. '/blog/:slug'.
const NotFound = lz('/src/app/not-found.jsx');

const STATIC_ROUTES = [
  ['/',                              '/src/app/page.jsx'],
  ['/aboutus',                       '/src/app/aboutus/page.jsx'],
  ['/areas-of-service',              '/src/app/areas-of-service/page.jsx'],
  ['/blog',                          '/src/app/blog/page.jsx'],
  ['/blog/:slug',                    '/src/app/blog/[slug]/page.jsx'],
  ['/book-online',                   '/src/app/book-online/page.jsx'],
  ['/callback',                      '/src/app/callback/page.jsx'],
  ['/commercial',                    '/src/app/commercial/page.jsx'],
  ['/company',                       '/src/app/company/page.jsx'],
  ['/privacy-policy',                '/src/app/privacy-policy/page.jsx'],
  ['/random-page-image',             '/src/app/random-page-image/page.jsx'],
  ['/reviews',                       '/src/app/reviews/page.jsx'],
  ['/terms-and-condition',           '/src/app/terms-and-condition/page.jsx'],
  ['/thankyou',                      '/src/app/thankyou/page.jsx'],
  ['/finalstep/commercial',          '/src/app/finalstep/commercial/page.jsx'],
  ['/finalstep/residential',         '/src/app/finalstep/residential/page.jsx'],
  ['/finalstep/storage',             '/src/app/finalstep/storage/page.jsx'],
  ['/service/art',                   '/src/app/service/art/page.jsx'],
  ['/service/lastmile',              '/src/app/service/lastmile/page.jsx'],
  ['/service/office',                '/src/app/service/office/page.jsx'],
  ['/service/packing',               '/src/app/service/packing/page.jsx'],
  ['/service/residential',           '/src/app/service/residential/page.jsx'],
  ['/service/specialEquipment',      '/src/app/service/specialEquipment/page.jsx'],
  ['/service/storage',               '/src/app/service/storage/page.jsx'],
  ['/service/warehouse',             '/src/app/service/warehouse/page.jsx'],
  ['/service-area/:city',            '/src/app/service-area/[city]/page.jsx'],
  ['/service-area/:city/:service',   '/src/app/service-area/[city]/[service]/page.jsx'],
  ['/service-areas/:slug',           '/src/app/service-areas/[slug]/page.jsx'],
];

const CITY_PAGES = [
  ['',                       'page.jsx'],
  ['/areas-of-service',      'areas-of-service/page.jsx'],
  ['/blog',                  'blog/page.jsx'],
  ['/blog/:slug',            'blog/[slug]/page.jsx'],
  ['/callback',              'callback/page.jsx'],
  ['/commercial',            'commercial/page.jsx'],
  ['/company',               'company/page.jsx'],
  ['/privacy-policy',        'privacy-policy/page.jsx'],
  ['/reviews',               'reviews/page.jsx'],
  ['/terms-and-condition',   'terms-and-condition/page.jsx'],
  ['/thankyou',              'thankyou/page.jsx'],
  ['/finalstep/commercial',  'finalstep/commercial/page.jsx'],
  ['/finalstep/residential', 'finalstep/residential/page.jsx'],
  ['/finalstep/storage',     'finalstep/storage/page.jsx'],
  ['/service/art',           'service/art/page.jsx'],
  ['/service/lastmile',      'service/lastmile/page.jsx'],
  ['/service/office',        'service/office/page.jsx'],
  ['/service/packing',       'service/packing/page.jsx'],
  ['/service/residential',   'service/residential/page.jsx'],
  ['/service/specialEquipment','service/specialEquipment/page.jsx'],
  ['/service/storage',       'service/storage/page.jsx'],
  ['/service/warehouse',     'service/warehouse/page.jsx'],
];

const CITIES = ['calgary', 'edmonton', 'ottawa', 'vancouver'];

function buildRouteList() {
  const list = STATIC_ROUTES.map(([pat, mod]) => ({
    pattern: pat,
    component: lz(mod),
    meta: ROUTE_META[pat] || null,
  }));
  for (const city of CITIES) {
    for (const [suffix, mod] of CITY_PAGES) {
      const pat = '/' + city + suffix;
      list.push({
        pattern: pat,
        component: lz('/src/app/' + city + '/' + mod),
        meta: ROUTE_META[pat] || null,
      });
    }
  }
  // Sort: more specific (more static segments) first.
  list.sort((a, b) => {
    const ad = a.pattern.split('/').filter(s => !s.startsWith(':')).length;
    const bd = b.pattern.split('/').filter(s => !s.startsWith(':')).length;
    return bd - ad;
  });
  return list;
}

const ROUTE_LIST = buildRouteList();

export const ROUTES = { notFound: NotFound };

export function matchRoute(pathname) {
  for (const r of ROUTE_LIST) {
    const m = matchPattern(r.pattern, pathname);
    if (m) return { route: r, params: m };
  }
  return null;
}

function matchPattern(pattern, pathname) {
  const pp = pattern.split('/').filter(Boolean);
  const sp = pathname.split('/').filter(Boolean);
  if (pp.length !== sp.length) {
    if (pattern === '/' && sp.length === 0) return {};
    return null;
  }
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(':')) params[pp[i].slice(1)] = decodeURIComponent(sp[i]);
    else if (pp[i] !== sp[i]) return null;
  }
  return params;
}
