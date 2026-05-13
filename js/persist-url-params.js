// Carries marketing-attribution URL params (utm_*, gclid, fbclid, etc.)
// across in-domain navigation. On page load, captures every query-string
// param from the current URL, then:
//
//   1. Intercepts clicks on same-origin <a> tags and merges the captured
//      params into the href before the browser navigates.
//   2. Wraps history.pushState / replaceState so JS-driven URL changes
//      get the params too.
//   3. Exports mergeUrlParams() for our own location.href = ... sites
//      (form-submit redirects etc.), since the click-handler path
//      doesn't catch those.
//
// Params already on the destination URL are NOT overwritten — the
// destination wins.

let captured = null;

export function initPersistUrlParams() {
  if (window.top !== window.self) return; // skip when iframed

  captured = parseParams(window.location.href);

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a || !a.href || a.origin !== window.location.origin) return;
    const next = mergeUrlParams(a.href);
    if (next !== a.href) a.href = next;
  });

  const origPush = history.pushState;
  history.pushState = function (state, title, url) {
    if (typeof url === 'string') url = mergeUrlParams(url);
    return origPush.call(this, state, title, url);
  };
  const origReplace = history.replaceState;
  history.replaceState = function (state, title, url) {
    if (typeof url === 'string') url = mergeUrlParams(url);
    return origReplace.call(this, state, title, url);
  };
}

// Append any captured URL params to `href` that aren't already on it.
// Returns a pathname+search+hash string suitable for assignment to
// `a.href` or `location.href`. Safe to call before initPersistUrlParams
// has run — returns the input unchanged in that case.
export function mergeUrlParams(href) {
  if (!captured) return href;
  try {
    const u = new URL(href, window.location.origin);
    for (const [k, v] of Object.entries(captured)) {
      if (!u.searchParams.has(k)) u.searchParams.set(k, v);
    }
    return u.pathname + u.search + u.hash;
  } catch {
    return href;
  }
}

function parseParams(href) {
  const out = {};
  for (const [k, v] of new URL(href, window.location.origin).searchParams.entries()) {
    out[k] = v;
  }
  return out;
}
