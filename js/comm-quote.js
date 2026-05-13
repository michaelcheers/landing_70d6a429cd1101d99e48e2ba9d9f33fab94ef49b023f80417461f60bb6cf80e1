// Vanilla port of commGetQuote.tsx — the "Get Your Free Quote" card on
// commercial-themed pages. Three render modes from the original component:
//
//   1. from="home" (e.g. /commercial)         — Moving/Last-mile toggle.
//   2. from="moving" (e.g. /service/warehouse) — Moving form, no toggle.
//   3. from="lastmile" (e.g. /service/lastmile) — Last-mile form, no toggle.
//
// Moving submit  → /finalstep/commercial (city-prefixed)
// Last-mile submit → POSTs a Service1 lead w/ ServiceType=Commercial, then
//                    redirects to /thankyou.

import { attachAutocomplete } from './lib/places.js';
import { store } from './lib/store.js';
import { submitLead } from './lib/service1.js';
import { mergeUrlParams } from './persist-url-params.js';

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
  // The commercial card's action button is a rainbow-button labeled "Get a
  // Quote" that is NOT type="submit" (the type=submit one is the shared
  // CTA-final box at the bottom of every page, handled by initGetQuote).
  const actionBtns = Array.from(document.querySelectorAll('button.rainbow-button'))
    .filter(b => b.getAttribute('type') !== 'submit'
              && b.textContent.trim().startsWith('Get a Quote'));

  for (const actionBtn of actionBtns) {
    if (actionBtn.dataset.mpWired) continue;
    wireUpActionButton(actionBtn);
  }
}

function wireUpActionButton(actionBtn) {
  // The card is the nearest ancestor that contains the form region we care
  // about. We don't know exactly where it sits in the DOM tree across all
  // three modes, so walk up from the button looking for indicators.
  const card = findCardFor(actionBtn);
  if (!card) return;

  const toggleButtons = card.querySelectorAll('button.toggle-button');
  const lastmileForm = card.querySelector('form#lastmile-quote-form');
  const enterLocInputs = card.querySelectorAll('input[placeholder="Enter Location"]');

  if (toggleButtons.length === 2) {
    setupToggleableMode(actionBtn, card, toggleButtons, enterLocInputs);
  } else if (lastmileForm) {
    setupLastmileOnlyMode(actionBtn);
  } else if (enterLocInputs.length >= 1) {
    setupMovingOnlyMode(actionBtn, enterLocInputs);
  }
  // else: nothing recognizable — leave the button alone.
}

// The action button sits inside a `.flex-col w-full` block, which is a
// child of a `.pb-10` outer card. Walk up until we find an ancestor that
// has a toggle group, a lastmile form, OR enter-location inputs.
function findCardFor(btn) {
  let n = btn.parentElement;
  for (let i = 0; i < 10 && n; i++) {
    if (n.querySelector('button.toggle-button')) return n;
    if (n.querySelector('form#lastmile-quote-form')) return n;
    if (n.querySelector('input[placeholder="Enter Location"]')) return n;
    n = n.parentElement;
  }
  return null;
}

// ---- Mode 1: toggleable (commercial home page) --------------------------

function setupToggleableMode(actionBtn, card, toggleButtons, enterLocInputs) {
  const movingBtn = Array.from(toggleButtons).find(b => b.textContent.trim() === 'Moving');
  const lastmileBtn = Array.from(toggleButtons).find(b => b.textContent.trim() === 'Last-mile');
  if (!movingBtn || !lastmileBtn) return;

  // Lowest common ancestor of the two Enter-Location inputs = the Moving
  // form's <div> wrapper (the thing we show/hide on toggle).
  const movingFormRoot = lowestCommonAncestor(enterLocInputs);
  if (!movingFormRoot) return;

  attachLocationInputs(enterLocInputs);

  let lastmileNodes = null;
  let currentMode = 'moving';

  function setActive(b) {
    movingBtn.classList.toggle('active', b === movingBtn);
    lastmileBtn.classList.toggle('active', b === lastmileBtn);
  }
  function ensureLastmile() {
    if (lastmileNodes) return lastmileNodes;
    const wrap = document.createElement('div');
    wrap.innerHTML = LASTMILE_HTML.trim();
    const form = wrap.querySelector('form[data-mp-lastmile]');
    const consent = wrap.querySelector('[data-mp-sms-consent]');
    movingFormRoot.parentElement.insertBefore(form, movingFormRoot.nextSibling);
    movingFormRoot.parentElement.insertBefore(consent, form.nextSibling);
    lastmileNodes = [form, consent];
    return lastmileNodes;
  }
  function show(mode) {
    currentMode = mode;
    if (mode === 'moving') {
      movingFormRoot.style.display = '';
      if (lastmileNodes) { lastmileNodes[0].style.display = 'none'; lastmileNodes[1].style.display = 'none'; }
      setActive(movingBtn);
    } else {
      ensureLastmile();
      movingFormRoot.style.display = 'none';
      lastmileNodes[0].style.display = '';
      lastmileNodes[1].style.display = '';
      setActive(lastmileBtn);
    }
  }

  movingBtn.addEventListener('click', (e) => { e.preventDefault(); show('moving'); });
  lastmileBtn.addEventListener('click', (e) => { e.preventDefault(); show('lastmile'); });

  actionBtn.dataset.mpWired = '1';
  actionBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (currentMode === 'moving') {
      location.href = mergeUrlParams(detectFinalstepCommercialUrl());
    } else {
      await submitLastmile(actionBtn);
    }
  });
}

// ---- Mode 2: moving only (warehouse, office, specialEquipment, art) -----

function setupMovingOnlyMode(actionBtn, enterLocInputs) {
  attachLocationInputs(enterLocInputs);
  actionBtn.dataset.mpWired = '1';
  actionBtn.addEventListener('click', (e) => {
    e.preventDefault();
    location.href = mergeUrlParams(detectFinalstepCommercialUrl());
  });
}

// ---- Mode 3: last-mile only (/service/lastmile) -------------------------

function setupLastmileOnlyMode(actionBtn) {
  actionBtn.dataset.mpWired = '1';
  actionBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await submitLastmile(actionBtn);
  });
}

// ---- helpers ------------------------------------------------------------

function attachLocationInputs(inputs) {
  if (inputs[0] && !inputs[0].dataset.mpWired) {
    inputs[0].dataset.mpWired = '1';
    attachAutocomplete(inputs[0], (a) => store.setPickup(a));
  }
  if (inputs[1] && !inputs[1].dataset.mpWired) {
    inputs[1].dataset.mpWired = '1';
    attachAutocomplete(inputs[1], (a) => store.setDestination(a));
  }
}

function lowestCommonAncestor(nodes) {
  if (nodes.length === 0) return null;
  if (nodes.length === 1) {
    return nodes[0].parentElement;
  }
  const ancestors = new Set();
  for (let n = nodes[0]; n; n = n.parentElement) ancestors.add(n);
  for (let n = nodes[1]; n; n = n.parentElement) {
    if (ancestors.has(n)) return n;
  }
  return null;
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
  const referralsource = source === 'Other' ? `Organic - ${cityCap}`
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
      location.href = mergeUrlParams(`/thankyou?formType=lastmile_quote&businessName=${encodeURIComponent(firstName + ' ' + lastName)}`);
      return;
    }
    throw new Error('HTTP ' + res.status);
  } catch (err) {
    alert('There was an error submitting your request. Please try again.');
    btn.disabled = false;
    btn.textContent = origText;
  }
}
