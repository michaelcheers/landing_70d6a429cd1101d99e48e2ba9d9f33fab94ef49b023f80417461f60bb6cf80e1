import React from "react";
import { ROUTE_META } from "/src/meta/metadata.js";
const lz = (path) => React.lazy(() => import(
  /* webpackIgnore: true */
  path
));
const NotFound = lz("/src/app/not-found.js");
const STATIC_ROUTES = [
  ["/", "/src/app/page.js"],
  ["/aboutus", "/src/app/aboutus/page.js"],
  ["/areas-of-service", "/src/app/areas-of-service/page.js"],
  ["/blog", "/src/app/blog/page.js"],
  ["/blog/:slug", "/src/app/blog/[slug]/page.js"],
  ["/book-online", "/src/app/book-online/page.js"],
  ["/callback", "/src/app/callback/page.js"],
  ["/commercial", "/src/app/commercial/page.js"],
  ["/company", "/src/app/company/page.js"],
  ["/privacy-policy", "/src/app/privacy-policy/page.js"],
  ["/random-page-image", "/src/app/random-page-image/page.js"],
  ["/reviews", "/src/app/reviews/page.js"],
  ["/terms-and-condition", "/src/app/terms-and-condition/page.js"],
  ["/thankyou", "/src/app/thankyou/page.js"],
  ["/finalstep/commercial", "/src/app/finalstep/commercial/page.js"],
  ["/finalstep/residential", "/src/app/finalstep/residential/page.js"],
  ["/finalstep/storage", "/src/app/finalstep/storage/page.js"],
  ["/service/art", "/src/app/service/art/page.js"],
  ["/service/lastmile", "/src/app/service/lastmile/page.js"],
  ["/service/office", "/src/app/service/office/page.js"],
  ["/service/packing", "/src/app/service/packing/page.js"],
  ["/service/residential", "/src/app/service/residential/page.js"],
  ["/service/specialEquipment", "/src/app/service/specialEquipment/page.js"],
  ["/service/storage", "/src/app/service/storage/page.js"],
  ["/service/warehouse", "/src/app/service/warehouse/page.js"],
  ["/service-area/:city", "/src/app/service-area/[city]/page.js"],
  ["/service-area/:city/:service", "/src/app/service-area/[city]/[service]/page.js"],
  ["/service-areas/:slug", "/src/app/service-areas/[slug]/page.js"]
];
const CITY_PAGES = [
  ["", "page.js"],
  ["/areas-of-service", "areas-of-service/page.js"],
  ["/blog", "blog/page.js"],
  ["/blog/:slug", "blog/[slug]/page.js"],
  ["/callback", "callback/page.js"],
  ["/commercial", "commercial/page.js"],
  ["/company", "company/page.js"],
  ["/privacy-policy", "privacy-policy/page.js"],
  ["/reviews", "reviews/page.js"],
  ["/terms-and-condition", "terms-and-condition/page.js"],
  ["/thankyou", "thankyou/page.js"],
  ["/finalstep/commercial", "finalstep/commercial/page.js"],
  ["/finalstep/residential", "finalstep/residential/page.js"],
  ["/finalstep/storage", "finalstep/storage/page.js"],
  ["/service/art", "service/art/page.js"],
  ["/service/lastmile", "service/lastmile/page.js"],
  ["/service/office", "service/office/page.js"],
  ["/service/packing", "service/packing/page.js"],
  ["/service/residential", "service/residential/page.js"],
  ["/service/specialEquipment", "service/specialEquipment/page.js"],
  ["/service/storage", "service/storage/page.js"],
  ["/service/warehouse", "service/warehouse/page.js"]
];
const CITIES = ["calgary", "edmonton", "ottawa", "vancouver"];
function buildRouteList() {
  const list = STATIC_ROUTES.map(([pat, mod]) => ({
    pattern: pat,
    component: lz(mod),
    meta: ROUTE_META[pat] || null
  }));
  for (const city of CITIES) {
    for (const [suffix, mod] of CITY_PAGES) {
      const pat = "/" + city + suffix;
      list.push({
        pattern: pat,
        component: lz("/src/app/" + city + "/" + mod),
        meta: ROUTE_META[pat] || null
      });
    }
  }
  list.sort((a, b) => {
    const ad = a.pattern.split("/").filter((s) => !s.startsWith(":")).length;
    const bd = b.pattern.split("/").filter((s) => !s.startsWith(":")).length;
    return bd - ad;
  });
  return list;
}
const ROUTE_LIST = buildRouteList();
const ROUTES = { notFound: NotFound };
function matchRoute(pathname) {
  for (const r of ROUTE_LIST) {
    const m = matchPattern(r.pattern, pathname);
    if (m) return { route: r, params: m };
  }
  return null;
}
function matchPattern(pattern, pathname) {
  const pp = pattern.split("/").filter(Boolean);
  const sp = pathname.split("/").filter(Boolean);
  if (pp.length !== sp.length) {
    if (pattern === "/" && sp.length === 0) return {};
    return null;
  }
  const params = {};
  for (let i = 0; i < pp.length; i++) {
    if (pp[i].startsWith(":")) params[pp[i].slice(1)] = decodeURIComponent(sp[i]);
    else if (pp[i] !== sp[i]) return null;
  }
  return params;
}
export {
  ROUTES,
  matchRoute
};
