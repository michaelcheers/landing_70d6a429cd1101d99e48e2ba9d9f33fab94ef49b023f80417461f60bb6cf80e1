// Vanilla port of contactForm.tsx. The original POSTed to /api/contactform
// which verified reCAPTCHA + sent an email via SMTP — neither possible
// from a static client. Instead we file the contact submission as a
// Service1 lead (ServiceType=Contact, message → painPoint) so the sales
// team sees it in the same CRM they already watch.

import { submitLead } from './lib/service1.js';
import { store } from './lib/store.js';
import { mergeUrlParams } from './persist-url-params.js';

function detectCity() {
  const p = location.pathname;
  for (const c of ['vancouver', 'ottawa', 'calgary', 'edmonton']) {
    if (p.startsWith('/' + c + '/')) return c;
  }
  return 'toronto';
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form || form.dataset.mpWired) return;
  form.dataset.mpWired = '1';

  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot: real users leave this empty.
    const honey = form.querySelector('#website');
    if (honey && honey.value) return;

    const name = form.querySelector('#name')?.value.trim() || '';
    const email = form.querySelector('#email')?.value.trim() || '';
    const phone = form.querySelector('#phone')?.value.trim() || '';
    const message = form.querySelector('#message')?.value.trim() || '';

    if (!name || !email || !phone || !message) {
      alert('Please fill in all fields.');
      return;
    }

    if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.origText = submitBtn.textContent; submitBtn.textContent = 'Sending…'; }

    const utm = store.getUtm();
    try {
      const res = await submitLead({
        FullName: name,
        Email: email,
        PhoneNumber: phone,
        Message: message,
        ServiceType: 'Contact',
        ReferralSource: store.getSource() || '',
        City: detectCity(),
        UtmSource:   utm.utm_source   || null,
        UtmMedium:   utm.utm_medium   || null,
        UtmCampaign: utm.utm_campaign || null,
        UtmKeyword:  utm.utm_term     || null,
        UtmContent:  utm.utm_content  || null,
      });
      if (res.ok || res.status === 409) {
        location.href = mergeUrlParams('/thankyou');
        return;
      }
      throw new Error('HTTP ' + res.status);
    } catch (err) {
      alert("We couldn't send your message. Please try again or call (647) 251-8188.");
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.origText || 'Send Message'; }
    }
  });
}
