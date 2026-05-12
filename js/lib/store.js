// Replacement for the React AddressContext + useAddress hook.
// Persists pickup/destination addresses (sessionStorage — single-session
// flow) and UTM data (localStorage with 30-day TTL — mirrors the original
// utmcomponent.tsx so paid traffic attribution survives across pages and
// tabs the same way it did in Next.js).

const PICKUP_KEY = 'pickupAddress';
const DEST_KEY = 'destinationAddress';
const UTM_KEY = 'movingpapa_utm';
const UTM_TS_KEY = 'movingpapa_utm_timestamp';
const SOURCE_KEY = 'utmSource';
const UTM_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function loadSession(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}
function saveSession(key, val) {
  if (val == null) sessionStorage.removeItem(key);
  else sessionStorage.setItem(key, JSON.stringify(val));
}

function loadUtm() {
  try {
    const raw = localStorage.getItem(UTM_KEY);
    const ts = Number(localStorage.getItem(UTM_TS_KEY) || 0);
    if (!raw || !ts) return {};
    if (Date.now() - ts > UTM_TTL_MS) {
      localStorage.removeItem(UTM_KEY);
      localStorage.removeItem(UTM_TS_KEY);
      return {};
    }
    return JSON.parse(raw) || {};
  } catch { return {}; }
}
function saveUtm(data) {
  try {
    localStorage.setItem(UTM_KEY, JSON.stringify(data));
    localStorage.setItem(UTM_TS_KEY, String(Date.now()));
  } catch { /* quota or disabled */ }
}

export const store = {
  getPickup: () => loadSession(PICKUP_KEY),
  setPickup: (a) => saveSession(PICKUP_KEY, a),
  getDestination: () => loadSession(DEST_KEY),
  setDestination: (a) => saveSession(DEST_KEY, a),
  getUtm: () => loadUtm(),
  setUtm: (u) => saveUtm(u),
  getSource: () => localStorage.getItem(SOURCE_KEY) || '',
  setSource: (s) => { try { localStorage.setItem(SOURCE_KEY, s || ''); } catch {} },
};

// Capture UTM parameters on page load. Mirrors utmcomponent.tsx behavior:
// store everything in localStorage with a 30-day expiration so the lead
// form on /finalstep can still attribute the source even after the user
// has clicked around a few pages or come back the next day.
export function captureUtm() {
  const params = new URLSearchParams(location.search);
  const data = {};
  for (const k of ['utm_medium', 'utm_keyword', 'utm_campaign', 'utm_source', 'utm_content', 'campaign']) {
    const v = params.get(k);
    if (v) data[k] = v;
  }
  // Ad-platform click IDs imply a source even when utm_source isn't set.
  if (params.get('msclkid') || params.get('bingid')) data.utm_source = 'Microsoft';
  if (params.get('gad_source') || params.get('gclid') || params.get('wbraid') || params.get('gbraid')) data.utm_source = 'Google';
  if (params.get('fbclid')) data.utm_source = 'Meta';

  if (Object.keys(data).length > 0) {
    store.setUtm(data);
    // Push to GTM dataLayer too, same as the original.
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'utm_captured', ...data });
    } catch {}
  }

  const src = params.get('source');
  if (src) store.setSource(src);
}
