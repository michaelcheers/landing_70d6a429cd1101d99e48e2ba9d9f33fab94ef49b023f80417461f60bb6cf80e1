// Per-route metadata extracted from the original page.tsx files'
// `export const metadata` + `generateMetadata` results. Keyed by Router
// pattern. Falls back to defaults at the root key '/'.

import {
  TORONTO_CONFIG, VANCOUVER_CONFIG, OTTAWA_CONFIG, CALGARY_CONFIG, EDMONTON_CONFIG,
} from '../app/utils/metadata.js';

const SITE = 'https://www.movingpapa.com';

function homeMeta(cfg, slug) {
  const base = slug === '' ? '' : '/' + slug;
  return {
    title: 'Professional Movers ' + cfg.city + ' | ' + cfg.businessName,
    description: 'Professional moving services in ' + cfg.city + ', ' + cfg.province + '. Licensed, insured, and trusted.',
    keywords: 'movers ' + cfg.city.toLowerCase() + ', moving company ' + cfg.city.toLowerCase(),
    canonical: SITE + (base || '/'),
    ogImage: SITE + '/images/moving-papa-social-share.webp',
  };
}

const ROOT = {
  title: 'MOVING PAPA',
  description: 'Top-rated moving company. Professional residential & commercial moving services.',
  keywords: 'movers toronto, moving company toronto, residential moving, commercial moving',
  canonical: SITE,
  ogImage: SITE + '/images/moving-papa-social-share.webp',
};

export const ROUTE_META = {
  '/':                                ROOT,
  '/aboutus':                         { title: 'About Moving Papa', description: 'Learn about Moving Papa, your trusted moving company.' },
  '/areas-of-service':                { title: 'Areas of Service | Moving Papa', description: 'Service areas covered by Moving Papa.' },
  '/blog':                            { title: 'Moving Papa Blog', description: 'Moving tips and stories from Moving Papa.' },
  '/book-online':                     { title: 'Book Online | Moving Papa', description: 'Book your move online with Moving Papa.' },
  '/callback':                        { title: 'Request a Callback | Moving Papa', description: 'Request a callback from our moving experts.' },
  '/commercial':                      { title: 'Commercial Moving | Moving Papa', description: 'Professional commercial moving services.' },
  '/company':                         { title: 'Our Company | Moving Papa', description: 'Moving Papa company information.' },
  '/privacy-policy':                  { title: 'Privacy Policy | Moving Papa', description: 'Privacy policy for Moving Papa.' },
  '/random-page-image':               { title: 'Gallery | Moving Papa', description: 'Photos from Moving Papa.' },
  '/reviews':                         { title: 'Customer Reviews | Moving Papa', description: 'See real customer reviews of Moving Papa.' },
  '/terms-and-condition':             { title: 'Terms & Conditions | Moving Papa', description: 'Terms and conditions for Moving Papa.' },
  '/thankyou':                        { title: 'Thank You | Moving Papa', description: 'Thank you for choosing Moving Papa.' },
  '/finalstep/commercial':            { title: 'Final Step Commercial | Moving Papa' },
  '/finalstep/residential':           { title: 'Final Step Residential | Moving Papa' },
  '/finalstep/storage':               { title: 'Final Step Storage | Moving Papa' },
  '/service/art':                     { title: 'Art Moving | Moving Papa', description: 'Specialty art moving services.' },
  '/service/lastmile':                { title: 'Last Mile Delivery | Moving Papa', description: 'Last mile delivery services.' },
  '/service/office':                  { title: 'Office Moving | Moving Papa', description: 'Office moving services.' },
  '/service/packing':                 { title: 'Packing Services | Moving Papa', description: 'Professional packing services.' },
  '/service/residential':             { title: 'Residential Moving | Moving Papa', description: 'Residential moving services.' },
  '/service/specialEquipment':        { title: 'Special Equipment Moving | Moving Papa', description: 'Special equipment moving.' },
  '/service/storage':                 { title: 'Storage Services | Moving Papa', description: 'Secure storage solutions.' },
  '/service/warehouse':               { title: 'Warehouse Moving | Moving Papa', description: 'Warehouse moving services.' },
  '/service-area/:city':              { title: 'Service Area | Moving Papa' },
  '/service-area/:city/:service':     { title: 'Service Area | Moving Papa' },
  '/service-areas/:slug':             { title: 'Service Area | Moving Papa' },
};

const CITY_CFG = {
  calgary: CALGARY_CONFIG,
  edmonton: EDMONTON_CONFIG,
  ottawa: OTTAWA_CONFIG,
  vancouver: VANCOUVER_CONFIG,
};

const CITY_PAGES_META = [
  ['',                       (c) => homeMeta(c, c.city.toLowerCase())],
  ['/areas-of-service',      (c) => ({ title: 'Areas of Service ' + c.city + ' | Moving Papa', description: 'Service areas in ' + c.city + '.' })],
  ['/blog',                  (c) => ({ title: c.city + ' Blog | Moving Papa', description: 'Moving tips in ' + c.city + '.' })],
  ['/blog/:slug',            (c) => ({ title: c.city + ' Blog | Moving Papa' })],
  ['/callback',              (c) => ({ title: 'Request a Callback | ' + c.businessName })],
  ['/commercial',            (c) => ({ title: 'Commercial Movers ' + c.city + ' | ' + c.businessName, description: 'Commercial moving in ' + c.city + '.' })],
  ['/company',               (c) => ({ title: 'About ' + c.businessName })],
  ['/privacy-policy',        (c) => ({ title: 'Privacy Policy | ' + c.businessName })],
  ['/reviews',               (c) => ({ title: 'Customer Reviews | ' + c.businessName, description: 'See reviews of ' + c.businessName + '.' })],
  ['/terms-and-condition',   (c) => ({ title: 'Terms & Conditions | ' + c.businessName })],
  ['/thankyou',              (c) => ({ title: 'Thank You | ' + c.businessName })],
  ['/finalstep/commercial',  (c) => ({ title: 'Final Step Commercial | ' + c.businessName })],
  ['/finalstep/residential', (c) => ({ title: 'Final Step Residential | ' + c.businessName })],
  ['/finalstep/storage',     (c) => ({ title: 'Final Step Storage | ' + c.businessName })],
  ['/service/art',           (c) => ({ title: 'Art Moving ' + c.city + ' | ' + c.businessName })],
  ['/service/lastmile',      (c) => ({ title: 'Last Mile Delivery ' + c.city + ' | ' + c.businessName })],
  ['/service/office',        (c) => ({ title: 'Office Moving ' + c.city + ' | ' + c.businessName })],
  ['/service/packing',       (c) => ({ title: 'Packing Services ' + c.city + ' | ' + c.businessName })],
  ['/service/residential',   (c) => ({ title: 'Residential Moving ' + c.city + ' | ' + c.businessName })],
  ['/service/specialEquipment',(c)=> ({ title: 'Special Equipment Moving ' + c.city + ' | ' + c.businessName })],
  ['/service/storage',       (c) => ({ title: 'Storage ' + c.city + ' | ' + c.businessName })],
  ['/service/warehouse',     (c) => ({ title: 'Warehouse Moving ' + c.city + ' | ' + c.businessName })],
];

for (const city of Object.keys(CITY_CFG)) {
  const cfg = CITY_CFG[city];
  for (const [suffix, build] of CITY_PAGES_META) {
    ROUTE_META['/' + city + suffix] = build(cfg);
  }
}
