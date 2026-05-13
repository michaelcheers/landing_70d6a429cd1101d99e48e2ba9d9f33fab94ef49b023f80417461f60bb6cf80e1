// Loads flatpickr on demand. Both the JS library and its stylesheets are
// hosted locally — no external CDN dependency at runtime. CSP's path
// restrictions on /js/ and /css/ cover them via 'self'-equivalent.
//
// To update: re-download from
//   https://cdn.jsdelivr.net/npm/flatpickr@<version>/dist/flatpickr.min.js
//   https://cdn.jsdelivr.net/npm/flatpickr@<version>/dist/flatpickr.min.css
//   https://cdn.jsdelivr.net/npm/flatpickr@<version>/dist/themes/dark.css

const FLATPICKR_JS    = '/js/lib/flatpickr.min.js';
const FLATPICKR_CSS   = '/css/flatpickr.min.css';
const FLATPICKR_THEME = '/css/flatpickr-dark.css';

let loader = null;
export function loadFlatpickr() {
  if (window.flatpickr) return Promise.resolve(window.flatpickr);
  if (loader) return loader;
  loader = new Promise((resolve, reject) => {
    const cssMain = document.createElement('link');
    cssMain.rel = 'stylesheet';
    cssMain.href = FLATPICKR_CSS;
    document.head.appendChild(cssMain);

    const cssTheme = document.createElement('link');
    cssTheme.rel = 'stylesheet';
    cssTheme.href = FLATPICKR_THEME;
    document.head.appendChild(cssTheme);

    const s = document.createElement('script');
    s.src = FLATPICKR_JS;
    s.async = true;
    s.onload = () => resolve(window.flatpickr);
    s.onerror = () => reject(new Error('flatpickr failed to load'));
    document.head.appendChild(s);
  });
  return loader;
}
