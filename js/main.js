// Single entry point — included on every page. Captures UTM params,
// wires up the hamburger header, get-quote boxes, finalstep form, and
// contact form. Modules no-op cleanly when their target DOM isn't present.

import { captureUtm } from './lib/store.js';
import { initHeader } from './header.js';
import { initGetQuote } from './get-quote.js';
import { initFinalStep } from './final-step.js';
import { initContactForm } from './contact-form.js';
import { initBookOnline } from './book-online.js';

function start() {
  captureUtm();
  initHeader();
  initGetQuote();
  initFinalStep();
  initContactForm();
  // Only fire the wizard when the placeholder element is on the page.
  if (document.getElementById('bo-root')) initBookOnline();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
