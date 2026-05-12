// Single entry point — included on every page. Captures UTM params,
// wires up the hamburger header, get-quote boxes, finalstep form, and
// contact form. Modules no-op cleanly when their target DOM isn't present.

import { captureUtm } from './lib/store.js';
import { initFloatingLabels } from './lib/floating-label.js';
import { initHeader } from './header.js';
import { initGetQuote } from './get-quote.js';
import { initCommQuote } from './comm-quote.js';
import { initFinalStep } from './final-step.js';
import { initContactForm } from './contact-form.js';
import { initBookOnline } from './book-online.js';

function start() {
  captureUtm();
  initHeader();
  initGetQuote();
  initCommQuote();
  initFinalStep();
  initContactForm();
  // Floating-label shim runs last — needs the form inputs in their final
  // state (values may have been pre-filled by finalStep / book-online).
  initFloatingLabels();
  // Only fire the wizard when the placeholder element is on the page.
  if (document.getElementById('bo-root')) initBookOnline();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start);
} else {
  start();
}
