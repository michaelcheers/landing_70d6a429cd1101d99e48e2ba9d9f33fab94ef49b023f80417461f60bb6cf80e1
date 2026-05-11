// Wires up the get-quote boxes (homepage hero, CTA-final on every page).
// The SSR'd markup has two inputs ("Move Out Address" + "Move In Address")
// and a "Get a Quote" submit button outside any <form>. We attach Places
// autocomplete and a click handler that stores addresses + navigates to
// the appropriate finalstep page.

import { attachAutocomplete } from './lib/places.js';
import { store } from './lib/store.js';

// Map of URL prefix → finalstep path. Vancouver pages live under /vancouver,
// Ottawa under /ottawa, etc. Storage service pages route to /finalstep/storage.
function detectFinalstepUrl() {
  const p = location.pathname;
  let prefix = '';
  for (const city of ['/vancouver', '/ottawa', '/calgary', '/edmonton']) {
    if (p.startsWith(city)) { prefix = city; break; }
  }
  if (p.includes('/storage') || p.includes('/service/storage')) {
    return prefix + '/finalstep/storage';
  }
  if (p.includes('/commercial') ||
      p.includes('/service/warehouse') ||
      p.includes('/service/office') ||
      p.includes('/service/specialEquipment') ||
      p.includes('/service/art') ||
      p.includes('/service/lastmile')) {
    return prefix + '/finalstep/commercial';
  }
  return prefix + '/finalstep/residential';
}

function detectCallbackUrl() {
  const p = location.pathname;
  for (const city of ['/vancouver', '/ottawa', '/calgary', '/edmonton']) {
    if (p.startsWith(city)) return city + '/callback';
  }
  return '/callback';
}

function wireBox(pickupInput, destInput, submitBtn, callbackBtn) {
  if (pickupInput) attachAutocomplete(pickupInput, (addr) => store.setPickup(addr));
  if (destInput) attachAutocomplete(destInput, (addr) => store.setDestination(addr));

  if (submitBtn && !submitBtn.dataset.mpWired) {
    submitBtn.dataset.mpWired = '1';
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const pickup = store.getPickup();
      const dest = store.getDestination();
      // Validation mirrors getQuote.tsx: only require *some* address.
      if (!pickup && !dest && !pickupInput?.value && !destInput?.value) {
        alert('Please enter an address before getting a quote.');
        return;
      }
      location.href = detectFinalstepUrl();
    });
  }

  if (callbackBtn && !callbackBtn.dataset.mpWired) {
    callbackBtn.dataset.mpWired = '1';
    callbackBtn.addEventListener('click', (e) => {
      e.preventDefault();
      location.href = detectCallbackUrl();
    });
  }
}

function prefetchFinalstep() {
  // Hint the browser to preload the finalstep HTML so the navigation feels
  // instant when the user clicks "Get a Quote". Idempotent — drops the tag
  // only once per URL even if called multiple times.
  const href = detectFinalstepUrl();
  if (document.querySelector(`link[rel="prefetch"][href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'document';
  link.href = href;
  document.head.appendChild(link);
}

export function initGetQuote() {
  // The "Get a Quote" submit button is the unique signal — find every one,
  // walk up to a common container, then look for sibling inputs/buttons.
  const submits = Array.from(document.querySelectorAll('button[type="submit"]'))
    .filter((b) => b.textContent.trim() === 'Get a Quote');

  if (submits.length > 0) prefetchFinalstep();

  for (const submit of submits) {
    // The container is roughly the get-quote card. Walk up until we find a
    // node that contains both the submit + at least one "Move Out Address"
    // input — that's the bounding box.
    let container = submit;
    for (let i = 0; i < 8 && container.parentElement; i++) {
      container = container.parentElement;
      const inp = container.querySelector('input[placeholder="Move Out Address"]');
      if (inp) break;
    }

    const pickup = container.querySelector('input[placeholder="Move Out Address"]');
    const dest = container.querySelector('input[placeholder="Move In Address"]');
    // "Get a Call from Us" sibling button — the only type=button with that text.
    const callback = Array.from(container.querySelectorAll('button[type="button"]'))
      .find((b) => b.textContent.includes('Get a Call from Us'));

    wireBox(pickup, dest, submit, callback);
  }
}
