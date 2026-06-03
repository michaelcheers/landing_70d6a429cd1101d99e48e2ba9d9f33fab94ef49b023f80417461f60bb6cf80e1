// Vanilla port of BookOnlineClient.tsx (871 lines, 4-step booking wizard).
// Renders into <main id="bo-root">. Talks directly to Service1:
//   - GET  https://helloservice1.com/api/bookings/online/config?companyId=23
//   - POST https://helloservice1.com/api/bookings/online
// Stripe.js is loaded on demand when the config provides a publishable key.

import { attachAutocomplete, loadGoogleMaps } from './lib/places.js';

const SERVICE1 = 'https://helloservice1.com';

const HOME_SIZES = [
  { key: 'studio', label: 'Studio',     defaultCrew: 2 },
  { key: '1br',    label: '1 bedroom',  defaultCrew: 2 },
  { key: '2br',    label: '2 bedroom',  defaultCrew: 2 },
  { key: '3br',    label: '3 bedroom',  defaultCrew: 3 },
  { key: '4br',    label: '4+ bedroom', defaultCrew: 4 },
  { key: 'office', label: 'Office',     defaultCrew: 3 },
];
const HOME_LABEL = Object.fromEntries(HOME_SIZES.map(h => [h.key, h.label]));

// ----- small utilities ----------------------------------------------------

function money(cents, ccy = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: (ccy || 'USD').toUpperCase(),
    maximumFractionDigits: 0,
  }).format((cents || 0) / 100);
}

function isSurgeDate(dt, cfg) {
  if (!cfg) return false;
  const weekend = dt.getDay() === 0 || dt.getDay() === 6;
  const day = dt.getDate();
  const monthEnd = day >= 28 || day === 1;
  return (cfg.surge.weekendEnabled && weekend) || (cfg.surge.monthEndEnabled && monthEnd);
}

function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180)
    * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}

function esc(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;',
  }[c]));
}

let stripeLoaderPromise = null;
function loadStripe() {
  if (window.Stripe) return Promise.resolve();
  if (stripeLoaderPromise) return stripeLoaderPromise;
  stripeLoaderPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://js.stripe.com/v3';
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Stripe.js failed to load'));
    document.head.appendChild(s);
  });
  return stripeLoaderPromise;
}

// ----- the wizard ---------------------------------------------------------

export async function initBookOnline() {
  const root = document.getElementById('bo-root');
  if (!root) return;
  if (/\/thankyou(\/|$)/.test(location.pathname)) { root.remove(); return; }

  // Prefill state from query string (the original supported deep-linking).
  const qs = new URLSearchParams(location.search);
  const state = {
    cfg: null,
    cfgError: null,
    modalOpen: qs.get('open') === '1',
    step: 1,
    firstName: qs.get('firstName') || '',
    lastName: qs.get('lastName') || '',
    email: qs.get('email') || '',
    phone: qs.get('phone') || '',
    pickup: qs.get('pickup') || '',
    dropoff: qs.get('dropoff') || '',
    pickupGeo: null,
    dropoffGeo: null,
    homeSize: '',
    crewSize: null,
    viewYear: new Date().getFullYear(),
    viewMonth: new Date().getMonth(),
    selectedDate: null,
    selectedTime: '',
    payOption: 'deposit',
    submitting: false,
    submitError: null,
    confirmationCode: null,
    stripe: null,
    cardElement: null,
    stripeReady: false,
  };
  const TODAY = new Date(); TODAY.setHours(0, 0, 0, 0);

  // ---- config fetch ----
  const companyId = qs.get('companyId') || '23';
  try {
    const r = await fetch(`${SERVICE1}/api/bookings/online/config?companyId=${encodeURIComponent(companyId)}`, { cache: 'no-store' });
    const d = await r.json();
    if (!d || d.enabled === false) state.cfgError = 'Online booking is currently unavailable.';
    else state.cfg = d;
  } catch {
    state.cfgError = 'Could not load booking configuration. Please try again.';
  }

  // ---- derived getters ----
  const get = {
    distanceKm: () => (state.pickupGeo && state.dropoffGeo) ? haversineKm(state.pickupGeo, state.dropoffGeo) : null,
    baseRate:   () => (state.cfg && state.crewSize !== null) ? (state.cfg.crewRates?.[String(state.crewSize)] ?? 0) : 0,
    surgeActive:() => state.selectedDate ? isSurgeDate(state.selectedDate, state.cfg) : false,
    hourlyRate: () => get.surgeActive() ? Math.round(get.baseRate() * (1 + state.cfg.surge.pct / 100)) : get.baseRate(),
    travelFee:  () => {
      if (!state.cfg?.travelFeeTiers?.length) return 0;
      const sorted = [...state.cfg.travelFeeTiers].sort((x, y) => x.kmMax - y.kmMax);
      const d = get.distanceKm();
      if (d === null) return sorted[0]?.fee ?? 0;
      for (const t of sorted) if (d <= t.kmMax) return t.fee;
      return sorted[sorted.length - 1].fee;
    },
    minHours: () => state.cfg?.minHours ?? 2,
    ccy:      () => (state.cfg?.currency || 'USD').toUpperCase(),
  };

  // ---- render ----
  function render() {
    if (state.cfgError) {
      root.innerHTML = `<div class="thankyou-wrap" style="text-align:center"><h1 style="font-size:24px;color:#0F2E1F;margin-top:40px">Online booking unavailable</h1><p style="color:#6b6b6b">${esc(state.cfgError)}</p></div>`;
      return;
    }
    if (!state.cfg) {
      root.innerHTML = `<div style="padding:40px;text-align:center;font-family:system-ui">Loading…</div>`;
      return;
    }
    root.innerHTML = renderHero() + (state.modalOpen ? renderModal() : '');
    bindHandlers();
    if (state.modalOpen) bindModalHandlers();
  }

  function renderHero() {
    const cfg = state.cfg;
    const depositLabel = money(cfg.depositCents, get.ccy());
    const discountLabel = money(cfg.discountCents, get.ccy());
    return `
      <div class="thankyou-wrap">
        <div class="book-online-card">
          <div class="book-online-content">
            <div class="discount-badge">Save ${esc(discountLabel)} · Book online</div>
            <h3>Skip the wait — <em>book online</em> in 60 seconds.</h3>
            <p>Know what you want? Lock in your date instantly, or tentatively hold it for ${esc(cfg.tentativeHoldHours)} hours while you decide.</p>
            <ul>
              <li>${esc(discountLabel)} off when booking online</li>
              <li>See live pricing by date</li>
              <li>Pay ${esc(depositLabel)} deposit or hold for ${esc(cfg.tentativeHoldHours)}hrs</li>
              <li>Free cancellation up to 48 hrs</li>
            </ul>
          </div>
          <div class="book-online-cta-wrap">
            <button class="btn-book-online" data-action="open-modal">Book online now →</button>
            <p class="or-wait">…or wait for our team to call you</p>
          </div>
        </div>
        <div class="next-steps">
          <h2>What happens next?</h2>
          <div class="step-item"><div class="step-num-circle">1</div><div class="step-content"><h3>💬 Quick response</h3><p>Our team will contact you shortly during business hours (8 AM – 8 PM) to discuss your moving needs.</p></div></div>
          <div class="step-item"><div class="step-num-circle">2</div><div class="step-content"><h3>📄 Detailed quote</h3><p>We'll provide a transparent, detailed quote with no hidden fees — what we quote is what you pay.</p></div></div>
          <div class="step-item"><div class="step-num-circle">3</div><div class="step-content"><h3>📅 Book your move</h3><p>Once you're happy with the quote, we'll schedule your move and send you a confirmation with all the details.</p></div></div>
        </div>
      </div>`;
  }

  function renderModal() {
    const cfg = state.cfg;
    const discountLabel = money(cfg.discountCents, get.ccy());
    return `
      <div class="modal-overlay active" data-action="backdrop" role="dialog" aria-modal="true">
        <div class="modal">
          <div class="modal-header">
            <h2>Book your move <span class="discount-inline">${esc(discountLabel)} off</span></h2>
            <button class="modal-close" data-action="close-modal" aria-label="Close">✕</button>
          </div>
          ${renderStepper()}
          <div class="modal-body">${renderStep()}</div>
        </div>
      </div>`;
  }

  function renderStepper() {
    const items = [1, 2, 3].map(n => {
      const cls = state.step === n ? ' active' : (state.step > n ? ' done' : '');
      const label = n === 1 ? 'Move size' : n === 2 ? 'Pick date' : 'Review & pay';
      return `<div><div class="mini-step${cls}"><div class="mini-step-num">${n}</div><span class="mini-step-label">${label}</span></div>${n < 3 ? '<div class="mini-step-line"></div>' : ''}</div>`;
    }).join('');
    return `<div class="mini-stepper">${items}</div>`;
  }

  function renderStep() {
    if (state.step === 1) return renderStep1();
    if (state.step === 2) return renderStep2();
    if (state.step === 3) return renderStep3();
    if (state.step === 4) return renderStep4();
    return '';
  }

  function renderStep1() {
    const cfg = state.cfg;
    const canContinue = state.homeSize && state.crewSize !== null
      && state.firstName && state.lastName && state.email && state.phone
      && state.pickup && state.dropoff;

    const homeTiles = HOME_SIZES.map(h =>
      `<div class="tile${state.homeSize === h.key ? ' selected' : ''}" data-action="select-home" data-key="${h.key}"><strong>${esc(h.label)}</strong></div>`
    ).join('');
    const crewTiles = Object.entries(cfg.crewRates)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([k, rate]) =>
        `<div class="tile${state.crewSize === Number(k) ? ' selected' : ''}" data-action="select-crew" data-key="${k}"><strong>${k} movers</strong><small>${esc(money(rate * 100, get.ccy()))}/hr</small></div>`
      ).join('');

    return `
      <div class="panel active">
        <div class="panel-header"><h3>Tell us about your move</h3><p>This helps us recommend the right crew size for you.</p></div>
        <label style="display:block;margin-bottom:10px">Your details</label>
        <div class="card-input-row" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
          <div class="field"><label>First name</label><input type="text" data-bind="firstName" value="${esc(state.firstName)}"/></div>
          <div class="field"><label>Last name</label><input type="text" data-bind="lastName" value="${esc(state.lastName)}"/></div>
        </div>
        <div class="card-input-row" style="grid-template-columns:1fr 1fr;margin-bottom:14px">
          <div class="field"><label>Email</label><input type="text" data-bind="email" value="${esc(state.email)}"/></div>
          <div class="field"><label>Phone</label><input type="text" data-bind="phone" value="${esc(state.phone)}"/></div>
        </div>

        <label style="display:block;margin-bottom:10px">Pickup address</label>
        <div class="field"><input type="text" data-place="pickup" placeholder="Pickup address" value="${esc(state.pickup)}" autocomplete="off"/></div>
        <label style="display:block;margin-bottom:10px">Dropoff address</label>
        <div class="field"><input type="text" data-place="dropoff" placeholder="Dropoff address" value="${esc(state.dropoff)}" autocomplete="off"/></div>

        <label style="display:block;margin:10px 0">Home size</label>
        <div class="tile-grid">${homeTiles}</div>

        <label style="display:block;margin-bottom:10px">Crew size</label>
        <div class="tile-grid">${crewTiles}</div>

        ${state.submitError ? `<div style="color:#E63946;margin-top:10px">${esc(state.submitError)}</div>` : ''}

        <div class="actions">
          <div></div>
          <button class="btn btn-primary" data-action="goto-step" data-step="2" ${canContinue ? '' : 'disabled'}>Continue to calendar →</button>
        </div>
      </div>`;
  }

  function renderStep2() {
    const cfg = state.cfg;
    const firstOfMonth = new Date(state.viewYear, state.viewMonth, 1);
    const daysInMonth = new Date(state.viewYear, state.viewMonth + 1, 0).getDate();
    const firstDow = firstOfMonth.getDay();
    const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    const ccy = get.ccy();

    let cells = '';
    for (let i = 0; i < firstDow; i++) cells += `<div class="cal-day empty"></div>`;
    for (let day = 1; day <= daysInMonth; day++) {
      const d = new Date(state.viewYear, state.viewMonth, day);
      const past = d < TODAY;
      const surge = isSurgeDate(d, cfg);
      const selected = state.selectedDate && state.selectedDate.toDateString() === d.toDateString();
      const thisRate = state.crewSize !== null
        ? (surge ? Math.round(get.baseRate() * (1 + cfg.surge.pct / 100)) : get.baseRate())
        : 0;
      const classes = ['cal-day'];
      if (past) classes.push('disabled');
      if (surge) classes.push('surge');
      if (selected) classes.push('selected');
      const priceLine = (!past && thisRate > 0) ? `<div class="cal-price">${esc(money(thisRate * 100, ccy))}/hr</div>` : '';
      cells += `<div class="${classes.join(' ')}" ${past ? '' : `data-action="select-date" data-day="${day}"`}><div class="cal-num">${day}</div>${priceLine}</div>`;
    }

    const dowHeaders = ['SUN','MON','TUE','WED','THU','FRI','SAT']
      .map(d => `<div class="cal-dow">${d}</div>`).join('');

    const timeSlots = state.selectedDate ? `
      <div style="margin-top:20px">
        <label style="display:block;margin-bottom:8px">Arrival window (1 hour)</label>
        <div class="time-slots">
          ${(cfg.arrivalWindows || []).map(w =>
            `<div class="time-slot${state.selectedTime === w ? ' selected' : ''}" data-action="select-time" data-time="${esc(w)}">${esc(w)}</div>`
          ).join('')}
        </div>
        <p style="font-size:11px;color:#6b6b6b;margin-top:8px;line-height:1.5">Our crew arrives within this window. Billing starts when we arrive at pickup and ends when we finish at drop-off.</p>
      </div>` : '';

    const hourly = get.hourlyRate();
    return `
      <div class="panel active">
        <div class="panel-header"><h3>Choose your move date</h3><p>Hourly rates shown below. Weekends and month-end dates have a small premium.</p></div>
        <div class="calendar-wrap">
          <div>
            <div class="cal-header">
              <div class="cal-month">${esc(monthLabel)}</div>
              <div class="cal-nav">
                <button data-action="month-prev">‹</button>
                <button data-action="month-next">›</button>
              </div>
            </div>
            <div class="cal-grid">${dowHeaders}${cells}</div>
            <div class="cal-legend">
              <div class="cal-legend-item"><span class="cal-legend-dot legend-standard"></span> Standard day</div>
              <div class="cal-legend-item"><span class="cal-legend-dot legend-surge"></span> High-demand (+${esc(cfg.surge.pct)}%)</div>
            </div>
            ${timeSlots}
          </div>
          <div class="price-panel">
            <h4>Your rate</h4>
            <div class="price-highlight">
              <div class="label">Hourly rate</div>
              <div class="rate">${hourly > 0 ? esc(money(hourly * 100, ccy)) : '$—'}<sup>/hr</sup></div>
              <div class="sub-label">${state.selectedDate ? (get.surgeActive() ? `High-demand (+${esc(cfg.surge.pct)}%)` : 'Standard rate') : 'Select a date'}</div>
            </div>
            <div class="min-hours-note"><strong>${esc(get.minHours())}-hour minimum</strong>All moves are billed door-to-door with a ${esc(get.minHours())}-hour minimum. Pay only for the actual time worked after that.</div>
            <div style="margin-top:18px">
              <div class="price-line"><span>Travel fee <span class="muted">(flat)</span></span><span>${esc(money(get.travelFee() * 100, ccy))}</span></div>
              <div class="price-line discount"><span>Online booking discount</span><span>–${esc(money(cfg.discountCents, ccy))}</span></div>
            </div>
            <div class="deposit-row"><span>Deposit to secure</span><strong>${esc(money(cfg.depositCents, ccy))}</strong></div>
            <p style="font-size:11px;opacity:0.65;margin-top:12px;line-height:1.5;font-style:italic">Deposit is fully credited toward your final bill.</p>
          </div>
        </div>
        <div class="actions">
          <button class="btn btn-secondary" data-action="goto-step" data-step="1">← Back</button>
          <button class="btn btn-primary" data-action="goto-step" data-step="3" ${state.selectedDate && state.selectedTime ? '' : 'disabled'}>Review booking →</button>
        </div>
      </div>`;
  }

  function renderStep3() {
    const cfg = state.cfg;
    const ccy = get.ccy();
    const depositLabel = money(cfg.depositCents, ccy);
    const selectedDateLabel = state.selectedDate
      ? state.selectedDate.toLocaleDateString('en-US', { weekday:'long', month:'long', day:'numeric', year:'numeric' })
      : '—';
    const revCrewText = state.crewSize && state.homeSize
      ? `${state.crewSize} movers · ${HOME_LABEL[state.homeSize]}` : '—';
    const hourlySubtotal = get.hourlyRate() * get.minHours();
    const dueToday = state.payOption === 'deposit' ? cfg.depositCents / 100 : 0;

    const tentativeRow = cfg.tentativeHoldEnabled ? `
      <div class="pay-option${state.payOption === 'tentative' ? ' selected' : ''}" data-action="set-pay" data-opt="tentative">
        <div class="radio-dot"></div>
        <div class="pay-option-body">
          <div class="pay-option-header">
            <div class="pay-option-title">Book now, pay deposit later<span class="pay-option-savings">${esc(cfg.tentativeHoldHours)}hr hold</span></div>
            <div class="pay-option-amount">$0</div>
          </div>
          <div class="pay-option-desc">We'll tentatively hold your date for ${esc(cfg.tentativeHoldHours)} hours. Confirm with the ${esc(depositLabel)} deposit anytime before your hold expires — otherwise the slot is released.</div>
          <div class="pay-option-note">⏱ Tentative only · Not confirmed until deposit paid · We'll send a reminder</div>
        </div>
      </div>` : '';

    const paymentShell = state.payOption === 'deposit' ? `
      <h4>Pay ${esc(depositLabel)} deposit</h4>
      <p class="sub">Fully credited toward your final bill. Refundable up to 48 hours before your move.</p>
      <div class="field">
        <label>Card details</label>
        <div id="bo-card-mount" style="padding:12px 14px;border:1px solid rgba(15,46,31,0.25);border-radius:8px;background:#fff;min-height:42px"></div>
        ${cfg.stripePublishableKey ? '' : `<p style="font-size:11px;color:#E63946;margin-top:6px">Stripe is not configured for this company — contact support.</p>`}
      </div>
      <button class="btn-pay" data-action="complete-booking" ${state.submitting || !state.stripeReady ? 'disabled' : ''}>${state.submitting ? 'Processing…' : `Pay ${esc(depositLabel)} deposit & book`}</button>
      <p style="text-align:center;font-size:11px;color:#6b6b6b;margin-top:12px">🔒 Secured by Stripe · PCI-DSS compliant</p>
    ` : `
      <h4>Tentatively hold for ${esc(cfg.tentativeHoldHours)} hours</h4>
      <p class="sub">No card required now — we'll send a reminder before your hold expires.</p>
      <button class="btn-pay" data-action="complete-booking" ${state.submitting ? 'disabled' : ''}>${state.submitting ? 'Processing…' : `Hold my date for ${esc(cfg.tentativeHoldHours)} hours`}</button>
    `;

    return `
      <div class="panel active">
        <div class="panel-header"><h3>Review &amp; confirm</h3><p>Double-check your move details, then choose how you'd like to pay.</p></div>
        <div class="review-grid">
          <div class="review-block"><h5>Move date</h5><p><strong>${esc(selectedDateLabel)}</strong>${state.selectedTime ? ` · Arrival ${esc(state.selectedTime)}` : ''}</p></div>
          <div class="review-block"><h5>Crew &amp; size</h5><p><strong>${esc(revCrewText)}</strong></p></div>
        </div>
        <div class="pricing-summary">
          <div class="pricing-summary-row"><span>Hourly rate (${esc(get.minHours())}-hr minimum)</span><span>${esc(money(hourlySubtotal * 100, ccy))}</span></div>
          <div class="pricing-summary-row"><span>Flat travel fee</span><span>${esc(money(get.travelFee() * 100, ccy))}</span></div>
          <div class="pricing-summary-row discount"><span>Online booking discount</span><span>–${esc(money(cfg.discountCents, ccy))}</span></div>
          <div class="pricing-summary-row total"><span>Due today</span><span>${esc(money(dueToday * 100, ccy))}</span></div>
        </div>
        <h4 style="font-family:'Bricolage Grotesque',sans-serif;font-size:16px;font-weight:700;color:#0F2E1F;margin-bottom:12px">Choose how to pay</h4>
        <div class="payment-options">
          <div class="pay-option${state.payOption === 'deposit' ? ' selected' : ''}" data-action="set-pay" data-opt="deposit">
            <div class="radio-dot"></div>
            <div class="pay-option-body">
              <div class="pay-option-header"><div class="pay-option-title">Pay deposit now</div><div class="pay-option-amount">${esc(depositLabel)}</div></div>
              <div class="pay-option-desc">Confirm your booking instantly with a ${esc(depositLabel)} deposit. Fully credited toward your final bill.</div>
              <div class="pay-option-note">✓ Most popular · Date fully secured · Free cancellation up to 48 hrs</div>
            </div>
          </div>
          ${tentativeRow}
        </div>
        <div class="payment-shell">${paymentShell}${state.submitError ? `<div style="color:#E63946;margin-top:12px;font-size:13px">${esc(state.submitError)}</div>` : ''}</div>
        <div class="actions"><button class="btn btn-secondary" data-action="goto-step" data-step="2">← Back</button><div></div></div>
      </div>`;
  }

  function renderStep4() {
    const cfg = state.cfg;
    const depositLabel = money(cfg.depositCents, get.ccy());
    const isDeposit = state.payOption === 'deposit';
    return `
      <div class="panel active">
        <div class="booking-success">
          <div class="booking-success-check">✓</div>
          <h3>You're <em>${isDeposit ? 'booked!' : 'on hold!'}</em></h3>
          <p class="msg">${isDeposit
            ? `Your move is confirmed. Check your email for the full booking confirmation and receipt. A Moving Papa team member will reach out 24 hours before your move to confirm logistics.`
            : `Your date is tentatively reserved. Confirm with the ${esc(depositLabel)} deposit anytime before the hold expires to lock it in.`}</p>
          ${state.confirmationCode ? `<div class="confirmation-code">CONFIRMATION #${esc(state.confirmationCode)}</div>` : ''}
          ${!isDeposit ? `
            <div style="margin-top:24px;padding:16px 20px;background:rgba(230,57,70,0.08);border:1px solid rgba(230,57,70,0.3);border-radius:14px;max-width:460px;margin-left:auto;margin-right:auto">
              <p style="font-family:'Bricolage Grotesque',sans-serif;font-weight:700;font-size:13px;color:#E63946;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px">⏱ Hold expires in ${esc(cfg.tentativeHoldHours)} hours</p>
              <p style="font-size:13px;color:#1a1a1a;line-height:1.5;margin-bottom:14px">Your date is tentatively reserved. Pay your ${esc(depositLabel)} deposit anytime before the hold expires to confirm it — otherwise the slot is released to other customers.</p>
              <button class="btn btn-primary" style="width:100%" data-action="reopen-deposit">Pay ${esc(depositLabel)} deposit now</button>
            </div>` : ''}
          <div style="margin-top:24px"><button class="btn btn-primary" data-action="close-modal">Done</button></div>
        </div>
      </div>`;
  }

  // ---- event handlers ----
  function bindHandlers() {
    const open = root.querySelector('[data-action="open-modal"]');
    if (open) open.addEventListener('click', () => { state.modalOpen = true; state.submitError = null; render(); });
  }

  function bindModalHandlers() {
    root.querySelector('[data-action="backdrop"]')?.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) closeModal();
    });
    root.querySelector('[data-action="close-modal"]')?.addEventListener('click', closeModal);
    root.querySelectorAll('[data-action="goto-step"]').forEach(b =>
      b.addEventListener('click', () => { state.step = Number(b.dataset.step); state.submitError = null; render(); })
    );
    root.querySelectorAll('[data-action="select-home"]').forEach(b =>
      b.addEventListener('click', () => {
        state.homeSize = b.dataset.key;
        const def = HOME_SIZES.find(h => h.key === b.dataset.key)?.defaultCrew ?? 2;
        if (state.crewSize === null) state.crewSize = def;
        render();
      })
    );
    root.querySelectorAll('[data-action="select-crew"]').forEach(b =>
      b.addEventListener('click', () => { state.crewSize = Number(b.dataset.key); render(); })
    );
    root.querySelectorAll('[data-bind]').forEach(inp => {
      inp.addEventListener('input', () => { state[inp.dataset.bind] = inp.value; });
    });
    // Place autocomplete attaches to inputs labelled data-place.
    const pickupInp = root.querySelector('[data-place="pickup"]');
    const dropoffInp = root.querySelector('[data-place="dropoff"]');
    if (pickupInp) {
      loadGoogleMaps();
      pickupInp.addEventListener('input', () => { state.pickup = pickupInp.value; });
      // Custom version of attachAutocomplete that also captures lat/lng.
      attachPlaceWithGeo(pickupInp, (formatted, geo) => {
        state.pickup = formatted; state.pickupGeo = geo;
      });
    }
    if (dropoffInp) {
      dropoffInp.addEventListener('input', () => { state.dropoff = dropoffInp.value; });
      attachPlaceWithGeo(dropoffInp, (formatted, geo) => {
        state.dropoff = formatted; state.dropoffGeo = geo;
      });
    }
    // Step 2 actions
    root.querySelector('[data-action="month-prev"]')?.addEventListener('click', () => changeMonth(-1));
    root.querySelector('[data-action="month-next"]')?.addEventListener('click', () => changeMonth(1));
    root.querySelectorAll('[data-action="select-date"]').forEach(b =>
      b.addEventListener('click', () => {
        state.selectedDate = new Date(state.viewYear, state.viewMonth, Number(b.dataset.day));
        render();
      })
    );
    root.querySelectorAll('[data-action="select-time"]').forEach(b =>
      b.addEventListener('click', () => { state.selectedTime = b.dataset.time; render(); })
    );
    // Step 3 actions
    root.querySelectorAll('[data-action="set-pay"]').forEach(b =>
      b.addEventListener('click', () => { state.payOption = b.dataset.opt; render(); })
    );
    root.querySelector('[data-action="complete-booking"]')?.addEventListener('click', completeBooking);
    root.querySelector('[data-action="reopen-deposit"]')?.addEventListener('click', () => {
      state.payOption = 'deposit'; state.step = 3; render();
    });

    // Step 3 Stripe card mount
    if (state.step === 3 && state.payOption === 'deposit' && state.cfg.stripePublishableKey) {
      ensureStripeMounted();
    }
  }

  function attachPlaceWithGeo(input, onPick) {
    if (input.dataset.gpAttached) return;
    input.dataset.gpAttached = '1';
    loadGoogleMaps().then(() => {
      const ac = new google.maps.places.Autocomplete(input, {
        fields: ['address_components', 'geometry', 'formatted_address'],
        componentRestrictions: { country: 'ca' },
      });
      ac.addListener('place_changed', () => {
        const place = ac.getPlace();
        if (!place) return;
        const loc = place.geometry?.location;
        const geo = loc ? { lat: loc.lat(), lng: loc.lng() } : null;
        onPick(place.formatted_address || '', geo);
      });
    });
  }

  function changeMonth(delta) {
    let m = state.viewMonth + delta;
    let y = state.viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    const firstOfMonth = new Date(y, m, 1);
    const firstOfCurrent = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);
    if (firstOfMonth < firstOfCurrent) return;
    state.viewMonth = m; state.viewYear = y;
    render();
  }

  function closeModal() {
    state.modalOpen = false;
    document.body.style.overflow = '';
    render();
  }

  async function ensureStripeMounted() {
    const mount = root.querySelector('#bo-card-mount');
    if (!mount) return;
    if (!state.cfg.stripePublishableKey) return;
    await loadStripe();
    if (!state.stripe) {
      state.stripe = window.Stripe(state.cfg.stripePublishableKey);
      const elements = state.stripe.elements();
      state.cardElement = elements.create('card', {
        hidePostalCode: false,
        style: { base: { fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#1a1a1a' } },
      });
    }
    try { state.cardElement.mount(mount); } catch { /* already mounted */ }
    state.stripeReady = true;
    // Re-render to enable the pay button now that Stripe is ready.
    const btn = root.querySelector('[data-action="complete-booking"]');
    if (btn) btn.disabled = state.submitting;
  }

  async function completeBooking() {
    if (!state.cfg) return;
    state.submitError = null;

    if (!state.firstName || !state.lastName || !state.email || !state.phone) {
      state.submitError = 'Please fill in your contact details.'; render(); return;
    }
    if (!state.pickup || !state.dropoff) {
      state.submitError = 'Please provide pickup and dropoff addresses.'; render(); return;
    }
    if (!state.homeSize || state.crewSize === null) {
      state.submitError = 'Please select a home size and crew.'; state.step = 1; render(); return;
    }
    if (!state.selectedDate || !state.selectedTime) {
      state.submitError = 'Please pick a date and arrival window.'; state.step = 2; render(); return;
    }

    state.submitting = true; render();
    if (state.step === 3 && state.payOption === 'deposit') ensureStripeMounted();

    let paymentMethodId = null;
    try {
      if (state.payOption === 'deposit') {
        if (!state.stripe || !state.cardElement) throw new Error('Payment form is still loading — please try again in a moment.');
        const res = await state.stripe.createPaymentMethod({
          type: 'card',
          card: state.cardElement,
          billing_details: { name: `${state.firstName} ${state.lastName}`.trim(), email: state.email },
        });
        if (res.error || !res.paymentMethod) throw new Error(res.error?.message || 'Could not tokenize card.');
        paymentMethodId = res.paymentMethod.id;
      }

      const iso = state.selectedDate.toISOString().slice(0, 10);
      const body = {
        companyId: state.cfg.companyId,
        firstName: state.firstName, lastName: state.lastName, email: state.email, phone: state.phone,
        pickup: state.pickup, dropoff: state.dropoff, distanceKm: get.distanceKm(),
        pickupLat: state.pickupGeo?.lat ?? null, pickupLng: state.pickupGeo?.lng ?? null,
        dropoffLat: state.dropoffGeo?.lat ?? null, dropoffLng: state.dropoffGeo?.lng ?? null,
        homeSize: state.homeSize, crewSize: state.crewSize,
        scheduledDate: iso, arrivalWindow: state.selectedTime,
        isSurge: !!get.surgeActive(),
        payOption: state.payOption, paymentMethodId,
        companyLocationId: 4,
      };
      const r = await fetch(`${SERVICE1}/api/bookings/online`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || !d.success) throw new Error(d?.message || 'Booking failed.');
      state.confirmationCode = d.confirmationCode || null;
      state.step = 4;
    } catch (e) {
      state.submitError = e instanceof Error ? e.message : String(e);
    } finally {
      state.submitting = false;
      render();
    }
  }

  // ---- scroll-lock + bfcache safety ----
  let prevOverflow = '';
  function syncScrollLock() {
    if (state.modalOpen) {
      prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prevOverflow;
    }
  }
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) document.body.style.overflow = '';
  });

  // Patch render() to sync scroll-lock when modalOpen changes.
  const origRender = render;
  let lastModalOpen = state.modalOpen;
  // eslint-disable-next-line no-func-assign
  render = function patched() {
    origRender();
    if (state.modalOpen !== lastModalOpen) {
      syncScrollLock();
      lastModalOpen = state.modalOpen;
    }
  };

  render();
}
