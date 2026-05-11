// Subdomain handling: when the page loads on calgary.movingpapa.com etc.,
// rewrite the in-app pathname so the router sees /calgary/* (or just '/calgary').
// The browser URL is left untouched.

const CITY_SUBDOMAINS = ['calgary', 'edmonton', 'ottawa', 'vancouver'];

export function detectCity() {
  const host = (typeof location !== 'undefined' ? location.hostname : '') || '';
  for (const city of CITY_SUBDOMAINS) {
    if (host.startsWith(city + '.')) return city;
  }
  return null;
}

export function applySubdomainRewrite(pathWithSearch) {
  const city = detectCity();
  if (!city) {
    // www.movingpapa.com — /toronto/* → /*
    const [p, q] = splitPathQuery(pathWithSearch);
    if (p === '/toronto') return '/' + (q ? q : '');
    if (p.startsWith('/toronto/')) return p.replace('/toronto', '') + (q ? q : '');
    return pathWithSearch;
  }
  const [p, q] = splitPathQuery(pathWithSearch);
  if (p === '/' || p === '') return '/' + city + (q ? q : '');
  if (p.startsWith('/' + city)) return pathWithSearch;
  return '/' + city + p + (q ? q : '');
}

function splitPathQuery(s) {
  const i = s.indexOf('?');
  if (i < 0) return [s, ''];
  return [s.slice(0, i), s.slice(i)];
}
