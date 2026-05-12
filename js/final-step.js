// Vanilla port of finalstep.tsx. Page has #get-quote-form with these fields:
//   - input placeholder="Enter Pickup Address"      (Google Places)
//   - input placeholder="Enter Destination Address" (Google Places)
//   - input placeholder="Select Estimated Moving Date" (converted to type=date)
//   - select name="moveSize"
//   - input id="email" / id="phone" / id="name"
//   - button type="submit"

import { attachAutocomplete, loadGoogleMaps } from './lib/places.js';
import { store } from './lib/store.js';
import { submitLead, BRANCH, MP_LOCATION } from './lib/service1.js';

function detectBranchAndService() {
  const p = location.pathname;
  let city = 'toronto';
  for (const c of ['vancouver', 'ottawa', 'calgary', 'edmonton']) {
    if (p.startsWith('/' + c + '/')) { city = c; break; }
  }
  let service = '';
  if (p.endsWith('/storage')) service = 'Storage in Bound';
  else if (p.endsWith('/commercial')) service = 'Commercial';
  const sessionLoc = sessionStorage.getItem('currentLocation');
  const branchId = sessionLoc === 'hamilton'
    ? BRANCH.HAMILTON
    : (city === 'vancouver' ? BRANCH.VANCOUVER : BRANCH.TORONTO);
  return {
    city,
    serviceType: service,
    branchId,
    companyLocationId: MP_LOCATION[city] ?? MP_LOCATION.toronto,
  };
}

function findInputByPlaceholder(form, placeholder) {
  return Array.from(form.querySelectorAll('input'))
    .find((i) => (i.placeholder || '').trim() === placeholder.trim());
}

function formatDateForApi(value) {
  // <input type="date"> gives YYYY-MM-DD. The original sent an ISO date.
  if (!value) return null;
  try { return new Date(value).toISOString(); }
  catch { return value; }
}

export function initFinalStep() {
  const form = document.getElementById('get-quote-form');
  if (!form) return;
  // Only run on a real finalstep page, not the inline get-quote variants.
  if (!location.pathname.includes('/finalstep')) return;

  const pickup = findInputByPlaceholder(form, 'Enter Pickup Address');
  const dest = findInputByPlaceholder(form, 'Enter Destination Address');
  const dateInput = findInputByPlaceholder(form, 'Select Estimated Moving Date');
  // Date input: convert text → date type so it works without react-datepicker.
  // The original react-datepicker passed a YYYYMMDD-shaped string; service1.js
  // accepts both YYYY-MM-DD and YYYYMMDD, so we just use the native value.
  const select = form.querySelector('select[name="moveSize"]');
  const emailInput = form.querySelector('#email');
  const phoneInput = form.querySelector('#phone');
  const nameInput = form.querySelector('#name');

  // Restore addresses captured on the previous page.
  loadGoogleMaps();
  const savedPickup = store.getPickup();
  const savedDest = store.getDestination();
  if (pickup && savedPickup?.street) pickup.value = `${savedPickup.street}, ${savedPickup.city}, ${savedPickup.state} ${savedPickup.zipCode}`;
  if (dest && savedDest?.street) dest.value = `${savedDest.street}, ${savedDest.city}, ${savedDest.state} ${savedDest.zipCode}`;
  if (pickup) attachAutocomplete(pickup, (a) => store.setPickup(a));
  if (dest) attachAutocomplete(dest, (a) => store.setDestination(a));

  // Convert the date placeholder input to a real date input.
  if (dateInput && dateInput.type !== 'date') {
    dateInput.type = 'date';
    const today = new Date();
    const max = new Date(); max.setDate(today.getDate() + 360);
    dateInput.min = today.toISOString().slice(0, 10);
    dateInput.max = max.toISOString().slice(0, 10);
    // Safari/iOS sets an intrinsic min-width on <input type="date"> based on
    // the native picker, which can overflow the form on small viewports.
    // Force it back to the parent's width.
    dateInput.style.width = '100%';
    dateInput.style.minWidth = '0';
    dateInput.style.boxSizing = 'border-box';
    // The react-datepicker-wrapper / __input-container divs default to
    // inline-block when react-datepicker's CSS is loaded; with that CSS
    // gone, normalize them to full-width block so the input fills its row.
    const wrapper = dateInput.closest('.react-datepicker-wrapper');
    if (wrapper) {
      wrapper.style.display = 'block';
      wrapper.style.width = '100%';
    }
    const innerWrap = dateInput.closest('.react-datepicker__input-container');
    if (innerWrap) {
      innerWrap.style.display = 'block';
      innerWrap.style.width = '100%';
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) { submitBtn.disabled = true; submitBtn.dataset.origText = submitBtn.textContent; submitBtn.textContent = 'Submitting…'; }

    const { city, serviceType, branchId, companyLocationId } = detectBranchAndService();
    const utm = store.getUtm();
    const pickupAddr = store.getPickup() || {};
    const destAddr = store.getDestination() || {};

    const leadData = {
      FullName: nameInput?.value?.trim() || '',
      Email: emailInput?.value?.trim() || '',
      PhoneNumber: phoneInput?.value?.trim() || '',
      OriginStreet: pickupAddr.street,
      OriginCity: pickupAddr.city,
      OriginState: pickupAddr.state,
      OriginZipCode: pickupAddr.zipCode,
      DestinationStreet: destAddr.street,
      DestinationCity: destAddr.city,
      DestinationState: destAddr.state,
      DestinationZipCode: destAddr.zipCode,
      ServiceType: serviceType,
      MoveSize: select?.value || undefined,
      MoveDate: formatDateForApi(dateInput?.value),
      ReferralSource: store.getSource() || '',
      BranchId: branchId,
      City: city,
      CompanyLocationId: companyLocationId,
      UtmMedium: utm.utm_medium || null,
      UtmKeyword: utm.utm_term || null,
      UtmCampaign: utm.utm_campaign || null,
      UtmSource: utm.utm_source || null,
      UtmContent: utm.utm_content || null,
    };
    if (utm.utm_campaign) leadData.Campaign = utm.utm_campaign;
    if (utm.utm_source) leadData.Source = utm.utm_source;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    try {
      const res = await submitLead(leadData, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok || res.status === 409) {
        // 409 = Service1 idempotency (already received) — still a success path.
        location.href = '/thankyou';
        return;
      }
      throw new Error('HTTP ' + res.status);
    } catch (err) {
      clearTimeout(timeoutId);
      if (err.name === 'AbortError') {
        // Service1 dedupes on email/phone — redirect optimistically.
        location.href = '/thankyou';
        return;
      }
      alert("We couldn't submit your request. Please try again, or call (647) 251-8188.");
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = submitBtn.dataset.origText || 'Get Quote Now'; }
    }
  });
}
