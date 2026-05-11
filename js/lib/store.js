// Replacement for the React AddressContext + useAddress hook.
// Persists pickup/destination addresses + UTM data across pages via
// sessionStorage so the get-quote → finalstep handoff keeps working.

const PICKUP_KEY = 'pickupAddress';
const DEST_KEY = 'destinationAddress';
const UTM_KEY = 'utmData';
const SOURCE_KEY = 'utmSource';

function load(key) {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function save(key, val) {
  if (val == null) sessionStorage.removeItem(key);
  else sessionStorage.setItem(key, JSON.stringify(val));
}

export const store = {
  getPickup: () => load(PICKUP_KEY),
  setPickup: (a) => save(PICKUP_KEY, a),
  getDestination: () => load(DEST_KEY),
  setDestination: (a) => save(DEST_KEY, a),
  getUtm: () => load(UTM_KEY) || {},
  setUtm: (u) => save(UTM_KEY, u),
  getSource: () => sessionStorage.getItem(SOURCE_KEY) || '',
  setSource: (s) => sessionStorage.setItem(SOURCE_KEY, s || ''),
};

// Capture UTM parameters on page load. Mirrors utmcomponent.tsx behavior:
// once the user lands with any utm_* in the query string, stash them so the
// final form submission can include them in the lead payload.
export function captureUtm() {
  const params = new URLSearchParams(location.search);
  const utm = {};
  let any = false;
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    const v = params.get(k);
    if (v) { utm[k] = v; any = true; }
  }
  if (any) store.setUtm(utm);
  const src = params.get('source');
  if (src) store.setSource(src);
}
