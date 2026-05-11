// Direct-to-Service1 payload builder + POST. The Next.js API route at
// /api/finalstep used to do this server-side; for the static port we run
// the same transformation client-side and POST to helloservice1.com.
//
// CORS: the Service1 /api/bookings endpoint accepts cross-origin POSTs from
// movingpapa.com (and other branded landing-page origins).

const SERVICE1_API_BASE = 'https://helloservice1.com';
export const SERVICE1_COMPANY_ID = 23;

const BRANCH = {
  VANCOUVER: '98a3854c-cb46-4025-b0a1-b265013b069e',
  TORONTO:   'b8164028-c730-4fc4-912c-b1f4016f1130',
  HAMILTON:  '842b7c75-275a-484a-86ed-b260010a7f19',
};
const MP_LOCATION = {
  toronto: 4, vancouver: 25, ottawa: 36, calgary: 37, edmonton: 38,
};

function formatMoveDate(s) {
  if (!s) return '';
  // <input type="date"> emits YYYY-MM-DD; original API expected YYYYMMDD,
  // which formatMoveDate then re-hyphenates. Skip the round-trip and just
  // pass YYYY-MM-DD straight through if that's what we already have.
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  if (/^\d{8}$/.test(s)) return s.slice(0,4) + '-' + s.slice(4,6) + '-' + s.slice(6,8);
  try { return new Date(s).toISOString().slice(0, 10); } catch { return s; }
}

function customerTimezone(city, branchId) {
  switch ((city || '').toLowerCase()) {
    case 'vancouver': return 'America/Vancouver';
    case 'ottawa':    return 'America/Toronto';
    case 'calgary':   return 'America/Edmonton';
    case 'edmonton':  return 'America/Edmonton';
    case 'toronto':   return 'America/Toronto';
  }
  return branchId === BRANCH.VANCOUVER ? 'America/Vancouver' : 'America/Toronto';
}

function resolveCompanyLocationId(body) {
  const explicit = Number(body.CompanyLocationId);
  if (Object.values(MP_LOCATION).includes(explicit)) return explicit;
  const c = String(body.City || '').toLowerCase();
  if (MP_LOCATION[c]) return MP_LOCATION[c];
  return body.BranchId === BRANCH.VANCOUVER ? MP_LOCATION.vancouver : MP_LOCATION.toronto;
}

// Mirrors buildService1Payload() from the original Next.js route.
function buildBookingsPayload(body) {
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
  if (body.ServiceType === 'Commercial') {
    businessType = 'Commercial Moving'; serviceType = 'Commercial';
  } else if (body.ServiceType === 'Storage in Bound') {
    businessType = 'Storage'; serviceType = 'Storage';
  } else if (body.ServiceType === 'Contact') {
    businessType = 'Contact'; serviceType = 'Contact';
  }

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
    customerTimezone: customerTimezone(body.City, body.BranchId),
    utmSource: body.UtmSource || '',
    utmMedium: body.UtmMedium || '',
    utmCampaign: body.UtmCampaign || '',
    referrerUrl: document.referrer || '',
    smsOptIn: !!body.SmsOptIn,
    smsOptInText: body.SmsOptInText || '',
    smsOptInTimestamp: body.SmsOptInTimestamp || '',
    originStreet: body.OriginStreet || '',
    originCity: body.OriginCity || '',
    originState: body.OriginState || '',
    originZipCode: body.OriginZipCode || '',
    destinationStreet: body.DestinationStreet || '',
    destinationCity: body.DestinationCity || '',
    destinationState: body.DestinationState || '',
    destinationZipCode: body.DestinationZipCode || '',
    moveSize: body.MoveSize || '',
    serviceType,
    companyLocationId: resolveCompanyLocationId(body),
  };
}

export async function submitLead(body, { signal } = {}) {
  const payload = buildBookingsPayload(body);
  return fetch(SERVICE1_API_BASE + '/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal,
    keepalive: true,
  });
}

export { BRANCH, MP_LOCATION };
