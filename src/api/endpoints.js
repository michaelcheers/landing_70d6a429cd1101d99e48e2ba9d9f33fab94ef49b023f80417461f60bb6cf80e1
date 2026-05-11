// Service1 backend endpoints + helpers (ported from the deleted Next API routes).
// All form submissions go directly from the browser to helloservice1.com.

export const SERVICE1_BASE = 'https://helloservice1.com';
export const SERVICE1_COMPANY_ID = 23;

// Moving Papa CompanyLocation IDs (feature #1175 / #1237).
export const MP_LOCATION_TORONTO   = 4;
export const MP_LOCATION_VANCOUVER = 25;
export const MP_LOCATION_OTTAWA    = 36;
export const MP_LOCATION_CALGARY   = 37;
export const MP_LOCATION_EDMONTON  = 38;

const VANCOUVER_BRANCH_ID = '98a3854c-cb46-4025-b0a1-b265013b069e';

const VALID_LOCATIONS = new Set([
  MP_LOCATION_TORONTO, MP_LOCATION_VANCOUVER, MP_LOCATION_OTTAWA,
  MP_LOCATION_CALGARY, MP_LOCATION_EDMONTON,
]);

export function resolveCompanyLocationId(body) {
  const explicit = Number(body.CompanyLocationId);
  if (VALID_LOCATIONS.has(explicit)) return explicit;
  switch (String(body.City || '').toLowerCase()) {
    case 'vancouver': return MP_LOCATION_VANCOUVER;
    case 'ottawa':    return MP_LOCATION_OTTAWA;
    case 'calgary':   return MP_LOCATION_CALGARY;
    case 'edmonton':  return MP_LOCATION_EDMONTON;
    case 'toronto':   return MP_LOCATION_TORONTO;
  }
  return body.BranchId === VANCOUVER_BRANCH_ID ? MP_LOCATION_VANCOUVER : MP_LOCATION_TORONTO;
}

export function resolveCustomerTimezone(body) {
  switch (String(body.City || '').toLowerCase()) {
    case 'vancouver': return 'America/Vancouver';
    case 'ottawa':    return 'America/Toronto';
    case 'calgary':   return 'America/Edmonton';
    case 'edmonton':  return 'America/Edmonton';
    case 'toronto':   return 'America/Toronto';
  }
  return body.BranchId === VANCOUVER_BRANCH_ID ? 'America/Vancouver' : 'America/Toronto';
}

export function formatMoveDate(yyyymmdd) {
  if (yyyymmdd && yyyymmdd.length === 8) {
    return yyyymmdd.slice(0, 4) + '-' + yyyymmdd.slice(4, 6) + '-' + yyyymmdd.slice(6, 8);
  }
  return '';
}

// Infer companyLocationId from current page hostname / pathname (book-online).
export function inferCompanyLocationFromUrl() {
  const host = (typeof location !== 'undefined' ? location.hostname : '') || '';
  const path = (typeof location !== 'undefined' ? location.pathname : '') || '';
  if (host.startsWith('vancouver.') || path.startsWith('/vancouver')) return MP_LOCATION_VANCOUVER;
  if (host.startsWith('ottawa.')    || path.startsWith('/ottawa'))    return MP_LOCATION_OTTAWA;
  if (host.startsWith('calgary.')   || path.startsWith('/calgary'))   return MP_LOCATION_CALGARY;
  if (host.startsWith('edmonton.')  || path.startsWith('/edmonton'))  return MP_LOCATION_EDMONTON;
  return MP_LOCATION_TORONTO;
}

export function buildService1Payload(body) {
  const formattedDate = formatMoveDate(body.MoveDate);
  const details = [];
  if (formattedDate) details.push('Move Date: ' + formattedDate);
  if (body.OriginStreet) {
    details.push('From: ' + [body.OriginStreet, body.OriginCity, body.OriginState, body.OriginZipCode].filter(Boolean).join(', '));
  }
  if (body.DestinationStreet) {
    details.push('To: ' + [body.DestinationStreet, body.DestinationCity, body.DestinationState, body.DestinationZipCode].filter(Boolean).join(', '));
  }
  if (body.MoveSize) details.push('Move Size: ' + body.MoveSize);
  if (body.ReferralSource) details.push('Referral: ' + body.ReferralSource);
  if (body.Message) details.push('Message: ' + body.Message);

  let businessType = 'Residential Moving';
  let serviceType = 'Residential';
  if (body.ServiceType === 'Commercial') { businessType = 'Commercial Moving'; serviceType = 'Commercial'; }
  else if (body.ServiceType === 'Storage in Bound') { businessType = 'Storage'; serviceType = 'Storage'; }
  else if (body.ServiceType === 'Contact') { businessType = 'Contact'; serviceType = 'Contact'; }

  const customerTimezone = resolveCustomerTimezone(body);
  const fullName = (body.FullName || '').trim();
  const firstSpace = fullName.indexOf(' ');
  const firstName = firstSpace >= 0 ? fullName.slice(0, firstSpace) : fullName;
  const lastName  = firstSpace >= 0 ? fullName.slice(firstSpace + 1) : '';

  return {
    companyId: SERVICE1_COMPANY_ID,
    fullName, firstName, lastName,
    email: body.Email || '',
    phone: body.PhoneNumber || '',
    businessType,
    painPoint: details.join('\n'),
    selectedDate: formattedDate,
    selectedTime: '',
    customerTimezone,
    utmSource: body.UtmSource || '',
    utmMedium: body.UtmMedium || '',
    utmCampaign: body.UtmCampaign || '',
    referrerUrl: '',
    smsOptIn: !!body.SmsOptIn,
    smsOptInText: body.SmsOptInText || '',
    smsOptInTimestamp: body.SmsOptInTimestamp || '',
    originStreet: body.OriginStreet || '',
    originCity:   body.OriginCity   || '',
    originState:  body.OriginState  || '',
    originZipCode:body.OriginZipCode|| '',
    destinationStreet: body.DestinationStreet || '',
    destinationCity:   body.DestinationCity   || '',
    destinationState:  body.DestinationState  || '',
    destinationZipCode:body.DestinationZipCode|| '',
    moveSize: body.MoveSize || '',
    serviceType,
    companyLocationId: resolveCompanyLocationId(body),
  };
}

// POST /api/bookings — used by finalstep and contact form.
export async function postBooking(body) {
  const payload = buildService1Payload(body);
  const res = await fetch(SERVICE1_BASE + '/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (res.status === 409) {
    return { success: false, message: 'Your information has already been received.' };
  }
  if (!res.ok) {
    return { success: false, message: 'There was an issue processing your request' };
  }
  return { success: true, message: 'Lead sent successfully' };
}

// POST /api/bookings/online — used by book-online.
export async function postOnlineBooking(body) {
  const payload = {
    companyId: body.companyId || SERVICE1_COMPANY_ID,
    firstName: body.firstName || '',
    lastName:  body.lastName  || '',
    email:     body.email     || '',
    phone:     body.phone     || '',
    pickup:    body.pickup    || '',
    dropoff:   body.dropoff   || '',
    distanceKm: Number(body.distanceKm || 0),
    homeSize:   body.homeSize || '',
    crewSize:   Number(body.crewSize || 2),
    scheduledDate: body.scheduledDate || '',
    arrivalWindow: body.arrivalWindow || '',
    isSurge: !!body.isSurge,
    payOption: body.payOption === 'tentative' ? 'tentative' : 'deposit',
    paymentMethodId: body.paymentMethodId || null,
    companyLocationId: VALID_LOCATIONS.has(Number(body.companyLocationId))
      ? Number(body.companyLocationId) : inferCompanyLocationFromUrl(),
  };
  const res = await fetch(SERVICE1_BASE + '/api/bookings/online', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }
  return { status: res.status, data };
}

// GET /api/bookings/online/config?companyId=…
export async function getOnlineBookingConfig(companyId) {
  const id = Number(companyId || SERVICE1_COMPANY_ID);
  const res = await fetch(SERVICE1_BASE + '/api/bookings/online/config?companyId=' + id, { cache: 'no-store' });
  const text = await res.text();
  let data; try { data = JSON.parse(text); } catch { data = { raw: text }; }
  return { status: res.status, data };
}
