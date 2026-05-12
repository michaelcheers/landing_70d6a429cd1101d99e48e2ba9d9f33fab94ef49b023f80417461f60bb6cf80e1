// Loads flatpickr on demand. We bring it in from jsDelivr so we don't have
// to bundle it — same pattern as Stripe/GoogleMaps elsewhere in this port.

const FLATPICKR_JS = 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js';
const FLATPICKR_CSS = 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css';
// Dark theme is a closer match to the form (white-on-primary).
const FLATPICKR_THEME = 'https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/themes/dark.css';

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
