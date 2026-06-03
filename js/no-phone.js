// js/no-phone.js
//
// Feature #1440 — the `?npn` ("no phone numbers") query flag suppresses every
// visible phone number and `tel:` call action across the site. The mode is
// sticky for the browsing session (sessionStorage) and rides onto internal
// links via persist-url-params.js, so it persists across navigation.
//
// Active when the URL carries ?npn (presence-only; ?npn=1, ?npn=true all work),
// or when a prior page in this session activated it. An explicit OFF value
// (?npn=0 / ?npn=false / ?npn=off / ?npn=no) clears the mode.

const NPN_KEY = 'mp-npn';
const OFF_VALUES = new Set(['0', 'false', 'off', 'no']);

// Source-of-truth phone pattern. Covers (833) 351-1791, 833-351-1791,
// 8333511791, (833)-351-1791. Keep the canonical pattern WITHOUT /g for
// stateless .test(); build a fresh /g instance at each .replace() call site
// (a global regex is stateful via lastIndex and would skip alternating nodes).
const PHONE_SRC = '\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}';
const PHONE_TEST = new RegExp(PHONE_SRC);

function npnActive() {
  let on = false;
  let explicitOff = false;
  try {
    const params = new URLSearchParams(location.search);
    if (params.has('npn')) {
      const v = (params.get('npn') || '').trim().toLowerCase();
      if (OFF_VALUES.has(v)) explicitOff = true;
      else on = true;
    }
  } catch { /* ignore */ }
  try {
    if (explicitOff) { sessionStorage.removeItem(NPN_KEY); return false; }
    if (on) sessionStorage.setItem(NPN_KEY, '1');
    else if (sessionStorage.getItem(NPN_KEY) === '1') on = true;
  } catch { /* sessionStorage may be blocked; URL flag still works */ }
  return on;
}

function injectHideStyle() {
  if (document.getElementById('mp-npn-style')) return;
  const style = document.createElement('style');
  style.id = 'mp-npn-style';
  style.textContent = '[data-npn-hidden]{display:none !important;}';
  (document.head || document.documentElement).appendChild(style);
}

function scrubTelLinks(root) {
  root.querySelectorAll('a[href^="tel:"]').forEach(a => {
    a.setAttribute('data-npn-hidden', '');
    a.removeAttribute('href');
    const cell = a.parentElement;
    if (cell && cell.childElementCount === 1) cell.setAttribute('data-npn-hidden', '');
  });
}

function scrubText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      const p = n.parentNode;
      if (!p) return NodeFilter.FILTER_REJECT;
      const tag = p.nodeName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
      return PHONE_TEST.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const hits = [];
  while (walker.nextNode()) hits.push(walker.currentNode);
  hits.forEach(n => { n.nodeValue = n.nodeValue.replace(new RegExp(PHONE_SRC, 'g'), ''); });
}

function removeMetaPhone() {
  document.querySelector('meta[name="business.contact_data.phone_number"]')?.remove();
}

// Remove the whole "[,] or call <number>" clause in one pass so neither the
// number NOR a dangling comma/"or call" fragment survives. Handles both:
//   final-step.js:  "...try again, or call (833) 351-1791."  (comma)
//   contact-form.js:"...try again or call (833) 351-1791."   (no comma)
const CALL_CLAUSE_RE = /,?\s*or call\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}\s*(?=\.|$)/i;

function wrapAlert() {
  const origAlert = window.alert.bind(window);
  window.alert = (msg) =>
    origAlert(String(msg).replace(CALL_CLAUSE_RE, '').replace(new RegExp(PHONE_SRC, 'g'), ''));
}

function startObserver() {
  const obs = new MutationObserver(muts => {
    for (const m of muts) {
      m.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return; // elements only
        scrubTelLinks(node);
        scrubText(node);
      });
    }
  });
  obs.observe(document.body, { childList: true, subtree: true });
}

export function initNoPhone() {
  if (!npnActive()) return; // no-op when flag absent

  injectHideStyle();
  scrubTelLinks(document);
  scrubText(document.body);
  removeMetaPhone();
  wrapAlert();
  startObserver();
}
