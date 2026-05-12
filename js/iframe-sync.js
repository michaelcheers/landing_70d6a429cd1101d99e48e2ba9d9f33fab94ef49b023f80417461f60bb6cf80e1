// Runs on every main-domain page. When the page is loaded inside an iframe
// (the subdomain wrappers at vancouver.movingpapa.com et al.), it tells the
// parent the current path so the parent can sync its URL bar. The city
// prefix is stripped before sending so the parent's address bar shows the
// subdomain-style path (e.g. /service/residential, not /vancouver/...).

const CITY_PREFIXES = ['/vancouver', '/ottawa', '/calgary', '/edmonton'];

function stripCityPrefix(path) {
  for (const prefix of CITY_PREFIXES) {
    if (path === prefix) return '/';
    if (path.startsWith(prefix + '/')) return path.slice(prefix.length);
  }
  return path;
}

export function initIframeSync() {
  if (window.parent === window) return; // not iframed

  const stripped = stripCityPrefix(location.pathname);
  const fullPath = stripped + location.search + location.hash;

  function notify() {
    try {
      window.parent.postMessage({ type: 'mp-iframe-nav', path: fullPath }, '*');
    } catch {}
  }
  // Fire immediately and again on bfcache restore (iframe back/forward).
  notify();
  window.addEventListener('pageshow', notify);
}
