// Vanilla port of commGetQuote.tsx — the "Get Your Free Quote" card on
// /commercial (and the city-prefixed equivalents). Two modes: Moving and
// Last-mile, toggled via two .toggle-button elements. Moving mode is in
// the SSR'd HTML; Last-mile mode is injected on first click.
//
// Moving submit  → /finalstep/commercial (city-prefixed)
// Last-mile submit → POSTs a Service1 lead w/ ServiceType=Commercial, then
//                    redirects to /thankyou.

import { attachAutocomplete } from './lib/places.js';
import { store } from './lib/store.js';
import { submitLead } from './lib/service1.js';

function detectCity() {
  const p = location.pathname;
  for (const c of ['vancouver', 'ottawa', 'calgary', 'edmonton']) {
    if (p.startsWith('/' + c + '/')) return c;
  }
  return 'toronto';
}

function detectFinalstepCommercialUrl() {
  const city = detectCity();
  return (city === 'toronto' ? '' : '/' + city) + '/finalstep/commercial';
}

function getTrafficSource(utmData) {
  const source = (utmData?.utm_source || '').toLowerCase();
  if (source.includes('google') || source === 'cpc' || source === 'organic') return 'Google';
  if (source.includes('bing') || source.includes('microsoft') || source === 'msn') return 'Microsoft';
  if (source.includes('meta') || source.includes('facebook') || source.includes('fb')
      || source === 'ig' || source.includes('instagram')) return 'Meta';
  const medium = (utmData?.utm_medium || '').toLowerCase();
  const campaign = (utmData?.utm_campaign || '').toLowerCase();
  if ((medium === 'cpc' || medium === 'ppc' || medium === 'paidsearch')
      && (campaign.includes('google') || !campaign.includes('bing'))) return 'Google';
  if (medium === 'cpc' && (campaign.includes('bing') || campaign.includes('msn'))) return 'Microsoft';
  return 'Other';
}

const SMS_CONSENT_TEXT = "I consent to receive SMS/text messages from Moving Papa at the phone number above regarding my commercial moving quote, scheduling, and follow-ups. Message and data rates may apply. Reply STOP to opt out.";

const LASTMILE_HTML = `
<form class="grid grid-cols-1 md:grid-cols-2 md:pr-8" id="lastmile-quote-form" data-mp-lastmile="1">
  <div class="relative"><div class="input-container-2">
    <input class="floating-textarea-2" placeholder="" name="businessEmail" value=""/>
    <label class="floating-label !bg-white !text-black">Business Email*</label>
  </div></div>
  <div class="relative"><div class="input-container-2">
    <input class="floating-textarea-2" placeholder="" name="phoneNumber" value=""/>
    <label class="floating-label !bg-white !text-black">Phone Number*</label>
  </div></div>
  <div class="relative"><div class="input-container-2">
    <input class="floating-textarea-2" placeholder="" name="firstName" value=""/>
    <label class="floating-label !bg-white !text-black">First Name*</label>
  </div></div>
  <div class="relative"><div class="input-container-2">
    <input class="floating-textarea-2" placeholder="" name="lastName" value=""/>
    <label class="floating-label !bg-white !text-black">Last Name*</label>
  </div></div>
</form>
<div class="flex gap-2 items-start text-xs text-black px-2 py-2 leading-snug" data-mp-sms-consent="1">
  <input type="checkbox" id="comm-sms-consent" class="mt-1 h-4 w-4 flex-shrink-0"/>
  <label for="comm-sms-consent">${SMS_CONSENT_TEXT}</label>
</div>`;

export function initCommQuote() {
  const toggleButtons = Array.from(document.querySelectorAll('button.toggle-button'));
  if (toggleButtons.length === 0) return;

  const movingBtn = toggleButtons.find(b => b.textContent.trim() === 'Moving');
  const lastmileBtn = toggleButtons.find(b => b.textContent.trim() === 'Last-mile');
  if (!movingBtn || !lastmileBtn) return;

  // The Moving form's container is the nearest ancestor that holds both
  // the toggle group AND the autocomplete inputs. The submit button lives
  // right after the form area.
  const toggleGroup = movingBtn.closest('.toggle-group');
  if (!toggleGroup) return;

  const card = toggleGroup.parentElement; // .flex-col w-full container
  if (!card) return;

  // The Moving form is the div containing the two "Enter Location" inputs
  // that's a sibling of the toggle group.
  const enterLocInputs = card.querySelectorAll('input[placeholder="Enter Location"]');
  const movingForm = enterLocInputs.length ? enterLocInputs[0].closest('div.flex-col, div')?.parentElement : null;
  // More reliable: the immediate child of card that contains the inputs.
  const movingFormRoot = (() => {
    if (!enterLocInputs.length) return null;
    let n = enterLocInputs[0];
    while (n && n.parentElement !== card) n = n.parentElement;
    return n;
  })();

  // The Get-a-Quote action button is the last button in the card whose text
  // is "Get a Quote" and isn't type=submit (the type=submit one is the
  // shared CTA-final box, not this card).
  const actionBtn = Array.from(card.querySelectorAll('button'))
    .filter(b => b.type !== 'submit' && b.textContent.trim().startsWith('Get a Quote'))
    .pop();

  // Wire pickup/destination autocomplete on the Moving form's inputs.
  if (enterLocInputs[0]) attachAutocomplete(enterLocInputs[0], (a) => store.setPickup(a));
  if (enterLocInputs[1]) attachAutocomplete(enterLocInputs[1], (a) => store.setDestination(a));

  let lastmileNodes = null; // [formEl, consentEl]
  let currentMode = 'moving';

  function setActive(btn) {
    movingBtn.classList.toggle('active', btn === movingBtn);
    lastmileBtn.classList.toggle('active', btn === lastmileBtn);
  }

  function ensureLastmileInjected() {
    if (lastmileNodes) return lastmileNodes;
    const wrap = document.createElement('div');
    wrap.innerHTML = LASTMILE_HTML.trim();
    const form = wrap.querySelector('form[data-mp-lastmile]');
    const consent = wrap.querySelector('[data-mp-sms-consent]');
    // Insert right after the moving form (so submit button stays below both).
    const anchor = movingFormRoot || (actionBtn ? actionBtn.previousElementSibling : null);
    if (anchor) {
      anchor.parentElement.insertBefore(form, anchor.nextSibling);
      anchor.parentElement.insertBefore(consent, form.nextSibling);
    } else {
      card.insertBefore(form, actionBtn);
      card.insertBefore(consent, actionBtn);
    }
    lastmileNodes = [form, consent];
    return lastmileNodes;
  }

  function showMode(mode) {
    currentMode = mode;
    if (mode === 'moving') {
      if (movingFormRoot) movingFormRoot.style.display = '';
      if (lastmileNodes) { lastmileNodes[0].style.display = 'none'; lastmileNodes[1].style.display = 'none'; }
      setActive(movingBtn);
    } else {
      ensureLastmileInjected();
      if (movingFormRoot) movingFormRoot.style.display = 'none';
      lastmileNodes[0].style.display = '';
      lastmileNodes[1].style.display = '';
      setActive(lastmileBtn);
    }
  }

  movingBtn.addEventListener('click', (e) => { e.preventDefault(); showMode('moving'); });
  lastmileBtn.addEventListener('click', (e) => { e.preventDefault(); showMode('lastmile'); });

  if (actionBtn && !actionBtn.dataset.mpWired) {
    actionBtn.dataset.mpWired = '1';
    actionBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (currentMode === 'moving') {
        location.href = detectFinalstepCommercialUrl();
        return;
      }
      await submitLastmile(actionBtn);
    });
  }
}

function isValidPhoneNumber(p) {
  return /^\+?[1-9]\d{1,14}$/.test((p || '').replace(/\s+/g, ''));
}

async function submitLastmile(btn) {
  const form = document.getElementById('lastmile-quote-form');
  if (!form) return;
  const businessEmail = form.querySelector('[name="businessEmail"]')?.value.trim() || '';
  const phoneNumber = form.querySelector('[name="phoneNumber"]')?.value.trim() || '';
  const firstName = form.querySelector('[name="firstName"]')?.value.trim() || '';
  const lastName = form.querySelector('[name="lastName"]')?.value.trim() || '';
  const smsConsent = document.getElementById('comm-sms-consent')?.checked || false;

  if (!businessEmail || !phoneNumber || !firstName || !lastName) {
    alert('Please fill in all required fields.');
    return;
  }
  if (!isValidPhoneNumber(phoneNumber.replace(/[\s()-]/g, ''))) {
    alert('Please enter a valid phone number.');
    return;
  }
  if (!smsConsent) {
    alert('Please confirm SMS consent to continue.');
    return;
  }

  btn.disabled = true;
  const origText = btn.textContent;
  btn.textContent = 'Processing…';

  const city = detectCity();
  const utm = store.getUtm();
  const source = getTrafficSource(utm);
  const cityCap = city.charAt(0).toUpperCase() + city.slice(1);
  let referralsource = source === 'Other' ? `Organic - ${cityCap}`
    : source === 'Meta' ? `Meta - ${cityCap}`
    : `${source} - Last Mile`;

  try {
    const res = await submitLead({
      FullName: `${firstName} ${lastName}`,
      Email: businessEmail,
      PhoneNumber: phoneNumber,
      ServiceType: 'Commercial',
      ReferralSource: referralsource,
      City: city,
      SmsOptIn: smsConsent,
      SmsOptInText: SMS_CONSENT_TEXT,
      SmsOptInTimestamp: new Date().toISOString(),
      UtmSource: utm.utm_source || null,
      UtmMedium: utm.utm_medium || null,
      UtmCampaign: utm.utm_campaign || null,
      UtmKeyword: utm.utm_keyword || null,
      UtmContent: utm.utm_content || null,
    });
    if (res.ok || res.status === 409) {
      location.href = `/thankyou?formType=lastmile_quote&businessName=${encodeURIComponent(firstName + ' ' + lastName)}`;
      return;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    alert('There was an error submitting your request. Please try again.');
    btn.disabled = false;
    btn.textContent = origText;
  }
}
