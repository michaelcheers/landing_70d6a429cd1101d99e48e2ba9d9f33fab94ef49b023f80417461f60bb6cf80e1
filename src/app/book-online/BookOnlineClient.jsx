
import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import Script from "/src/shims/script.js";
import LocationAutocomplete from '/src/app/components/locationautocomplete.jsx';
import './bookOnline.css';

type Tier = { kmMax: number; fee: number };
type Config = {
  enabled: boolean;
  companyId: number;
  currency: string;
  crewRates: Record<string, number>;
  travelFeeTiers: Tier[];
  surge: { weekendEnabled: boolean; monthEndEnabled: boolean; pct: number };
  depositCents: number;
  discountCents: number;
  minHours: number;
  arrivalWindows: string[];
  tentativeHoldEnabled: boolean;
  tentativeHoldHours: number;
  stripePublishableKey?: string | null;
};

type HomeKey = 'studio' | '1br' | '2br' | '3br' | '4br' | 'office';
const HOME_SIZES: { key: HomeKey; label: string; defaultCrew: number }[] = [
  { key: 'studio', label: 'Studio',      defaultCrew: 2 },
  { key: '1br',    label: '1 bedroom',   defaultCrew: 2 },
  { key: '2br',    label: '2 bedroom',   defaultCrew: 2 },
  { key: '3br',    label: '3 bedroom',   defaultCrew: 3 },
  { key: '4br',    label: '4+ bedroom',  defaultCrew: 4 },
  { key: 'office', label: 'Office',      defaultCrew: 3 },
];

const HOME_LABEL: Record<HomeKey, string> = {
  'studio': 'Studio',
  '1br': '1 bedroom',
  '2br': '2 bedroom',
  '3br': '3 bedroom',
  '4br': '4+ bedroom',
  'office': 'Office',
};

type PayOption = 'deposit' | 'tentative';

function money(cents: number, ccy = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: ccy.toUpperCase(),
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function isSurgeDate(dt: Date, cfg: Config | null): boolean {
  if (!cfg) return false;
  const weekend = dt.getDay() === 0 || dt.getDay() === 6;
  const day = dt.getDate();
  const monthEnd = day >= 28 || day === 1;
  return (cfg.surge.weekendEnabled && weekend) || (cfg.surge.monthEndEnabled && monthEnd);
}

function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2
    + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180)
    * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}

// Minimal Stripe types to avoid pulling in @stripe/stripe-js
type StripeElements = { getElement: (type: 'card') => unknown };
type StripeInstance = {
  elements: () => StripeElements;
  createPaymentMethod: (args: { type: 'card'; card: unknown; billing_details?: { name?: string; email?: string } })
    => Promise<{ paymentMethod?: { id: string }; error?: { message: string } }>;
};
declare global {
  interface Window {
    Stripe?: (publishableKey: string) => StripeInstance;
  }
}

export default function BookOnlineClient() {
  const [cfg, setCfg] = useState<Config | null>(null);
  const [cfgError, setCfgError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Contact + addresses (prefilled from query string when available)
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupGeo, setPickupGeo] = useState<{ lat: number; lng: number } | null>(null);
  const [dropoffGeo, setDropoffGeo] = useState<{ lat: number; lng: number } | null>(null);

  // Move details
  const [homeSize, setHomeSize] = useState<HomeKey | ''>('');
  const [crewSize, setCrewSize] = useState<number | null>(null);

  // Calendar
  const today = useMemo(() => { const t = new Date(); t.setHours(0, 0, 0, 0); return t; }, []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');

  // Pay
  const [payOption, setPayOption] = useState<PayOption>('deposit');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  // Stripe
  const stripeRef = useRef<StripeInstance | null>(null);
  const elementsRef = useRef<StripeElements | null>(null);
  const cardElementRef = useRef<unknown>(null);
  const cardMountRef = useRef<HTMLDivElement | null>(null);
  const [stripeReady, setStripeReady] = useState(false);

  // Load config
  useEffect(() => {
    const url = new URL(window.location.href);
    const companyId = url.searchParams.get('companyId') || '23';

    const p = (k: string) => url.searchParams.get(k) || '';
    if (p('firstName')) setFirstName(p('firstName'));
    if (p('lastName')) setLastName(p('lastName'));
    if (p('email')) setEmail(p('email'));
    if (p('phone')) setPhone(p('phone'));
    if (p('pickup')) setPickup(p('pickup'));
    if (p('dropoff')) setDropoff(p('dropoff'));
    if (url.searchParams.get('open') === '1') setModalOpen(true);

    fetch(`https://helloservice1.com/api/bookings/online/config?companyId=${encodeURIComponent(companyId)}`, { cache: 'no-store' })
      .then(r => r.json())
      .then((d: Config) => {
        if (!d || d.enabled === false) {
          setCfgError('Online booking is currently unavailable.');
          return;
        }
        setCfg(d);
      })
      .catch(() => setCfgError('Could not load booking configuration. Please try again.'));
  }, []);

  // Lock body scroll when modal is open (saving/restoring prior value)
  const prevOverflowRef = useRef<string | null>(null);
  useEffect(() => {
    if (!modalOpen) return;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflowRef.current ?? '';
      prevOverflowRef.current = null;
    };
  }, [modalOpen]);

  // bfcache safety net: iOS can restore a page where body.overflow was 'hidden'
  useEffect(() => {
    const onShow = (e: PageTransitionEvent) => {
      if (e.persisted) document.body.style.overflow = '';
    };
    window.addEventListener('pageshow', onShow);
    return () => window.removeEventListener('pageshow', onShow);
  }, []);

  const distanceKm = useMemo(() => {
    if (pickupGeo && dropoffGeo) return haversineKm(pickupGeo, dropoffGeo);
    return null;
  }, [pickupGeo, dropoffGeo]);

  const baseRate = (cfg && crewSize !== null) ? cfg.crewRates?.[String(crewSize)] ?? 0 : 0;
  const surgeActive = selectedDate && cfg ? isSurgeDate(selectedDate, cfg) : false;
  const hourlyRate = surgeActive && cfg ? Math.round(baseRate * (1 + cfg.surge.pct / 100)) : baseRate;

  const travelFee = useMemo(() => {
    if (!cfg?.travelFeeTiers?.length) return 0;
    const sorted = [...cfg.travelFeeTiers].sort((x, y) => x.kmMax - y.kmMax);
    if (distanceKm === null) return sorted[0]?.fee ?? 0;
    for (const t of sorted) { if (distanceKm <= t.kmMax) return t.fee; }
    return sorted[sorted.length - 1].fee;
  }, [cfg, distanceKm]);

  const discount = cfg ? cfg.discountCents / 100 : 0;
  const deposit = cfg ? cfg.depositCents / 100 : 0;
  const minHours = cfg?.minHours ?? 2;
  const arrivalWindows = cfg?.arrivalWindows ?? [];
  const ccy = (cfg?.currency || 'USD').toUpperCase();

  // Stripe init (once the publishable key is available and modal has opened)
  const initStripe = useCallback(() => {
    if (!cfg?.stripePublishableKey) return;
    if (!window.Stripe) return;
    if (stripeRef.current) return;
    stripeRef.current = window.Stripe(cfg.stripePublishableKey);
    const elements = stripeRef.current.elements();
    elementsRef.current = elements;
    const card = (elements as unknown as { create: (t: string, o?: unknown) => unknown })
      .create('card', { hidePostalCode: false, style: { base: { fontFamily: 'DM Sans, system-ui, sans-serif', fontSize: '14px', color: '#1a1a1a' } } });
    cardElementRef.current = card;
    setStripeReady(true);
  }, [cfg?.stripePublishableKey]);

  // Mount card element when step 3 is active and card is ready
  useEffect(() => {
    if (step !== 3 || !modalOpen) return;
    if (!cardElementRef.current || !cardMountRef.current) return;
    try {
      (cardElementRef.current as { mount: (el: HTMLElement) => void }).mount(cardMountRef.current);
    } catch {
      // already mounted
    }
  }, [step, modalOpen, stripeReady]);

  function openModal() {
    setSubmitError(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  function backdropClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) closeModal();
  }

  function selectHomeSize(key: HomeKey) {
    setHomeSize(key);
    const def = HOME_SIZES.find(h => h.key === key)?.defaultCrew ?? 2;
    // Only auto-suggest if user hasn't picked one
    if (crewSize === null) setCrewSize(def);
  }

  function goToStep(n: 1 | 2 | 3 | 4) {
    setSubmitError(null);
    setStep(n);
  }

  function changeMonth(delta: number) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    // Don't allow navigating to months entirely in the past
    const firstOfMonth = new Date(y, m, 1);
    const firstOfCurrent = new Date(today.getFullYear(), today.getMonth(), 1);
    if (firstOfMonth < firstOfCurrent) return;
    setViewMonth(m); setViewYear(y);
  }

  async function completeBooking() {
    if (!cfg) return;
    setSubmitError(null);

    if (!firstName || !lastName || !email || !phone) {
      setSubmitError('Please fill in your contact details.');
      return;
    }
    if (!pickup || !dropoff) {
      setSubmitError('Please provide pickup and dropoff addresses.');
      return;
    }
    if (!homeSize || crewSize === null) {
      setSubmitError('Please select a home size and crew.');
      setStep(1);
      return;
    }
    if (!selectedDate || !selectedTime) {
      setSubmitError('Please pick a date and arrival window.');
      setStep(2);
      return;
    }

    setSubmitting(true);
    let paymentMethodId: string | null = null;

    try {
      if (payOption === 'deposit') {
        if (!stripeRef.current || !cardElementRef.current) {
          throw new Error('Payment form is still loading — please try again in a moment.');
        }
        const res = await stripeRef.current.createPaymentMethod({
          type: 'card',
          card: cardElementRef.current,
          billing_details: { name: `${firstName} ${lastName}`.trim(), email },
        });
        if (res.error || !res.paymentMethod) {
          throw new Error(res.error?.message || 'Could not tokenize card.');
        }
        paymentMethodId = res.paymentMethod.id;
      }

      const iso = selectedDate.toISOString().slice(0, 10);
      const body = {
        companyId: cfg.companyId,
        firstName, lastName, email, phone,
        pickup, dropoff, distanceKm,
        pickupLat: pickupGeo?.lat ?? null, pickupLng: pickupGeo?.lng ?? null,
        dropoffLat: dropoffGeo?.lat ?? null, dropoffLng: dropoffGeo?.lng ?? null,
        homeSize, crewSize,
        scheduledDate: iso, arrivalWindow: selectedTime,
        isSurge: !!surgeActive,
        payOption, paymentMethodId,
        companyLocationId: (() => {
          const h = location.hostname, p = location.pathname;
          if (h.startsWith('vancouver.') || p.startsWith('/vancouver')) return 25;
          if (h.startsWith('ottawa.')    || p.startsWith('/ottawa'))    return 36;
          if (h.startsWith('calgary.')   || p.startsWith('/calgary'))   return 37;
          if (h.startsWith('edmonton.')  || p.startsWith('/edmonton'))  return 38;
          return 4;
        })(),
      };
      const r = await fetch('https://helloservice1.com/api/bookings/online', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const d = await r.json();
      if (!r.ok || !d.success) throw new Error(d?.message || 'Booking failed.');
      setConfirmationCode(d.confirmationCode || null);
      setStep(4);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }

  // ===== RENDER =====

  if (cfgError) {
    return (
      <main className="thankyou-wrap" style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: 24, color: '#0F2E1F', marginTop: 40 }}>Online booking unavailable</h1>
        <p style={{ color: '#6b6b6b' }}>{cfgError}</p>
      </main>
    );
  }

  if (!cfg) {
    return <main style={{ padding: 40, textAlign: 'center', fontFamily: 'system-ui' }}>Loading…</main>;
  }

  // Calendar grid computation
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = firstOfMonth.getDay();
  const monthLabel = firstOfMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const depositLabel = money(cfg.depositCents, ccy);
  const discountLabel = money(cfg.discountCents, ccy);

  const selectedDateLabel = selectedDate
    ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '—';

  const hourlySubtotal = hourlyRate * minHours;
  const dueToday = payOption === 'deposit' ? cfg.depositCents / 100 : 0;

  const revCrewText = crewSize && homeSize
    ? `${crewSize} movers · ${HOME_LABEL[homeSize]}`
    : '—';

  return (
    <div className="bo-root">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Sans:ital,wght@0,300..700;1,400&family=Instrument+Serif:ital@0;1&display=swap" />

      {cfg.stripePublishableKey && (
        <Script
          src="https://js.stripe.com/v3"
          strategy="afterInteractive"
          onLoad={initStripe}
          onReady={initStripe}
        />
      )}

      <div className="thankyou-wrap">
        <div className="book-online-card">
          <div className="book-online-content">
            <div className="discount-badge">Save {discountLabel} · Book online</div>
            <h3>Skip the wait — <em>book online</em> in 60 seconds.</h3>
            <p>Know what you want? Lock in your date instantly, or tentatively hold it for {cfg.tentativeHoldHours} hours while you decide.</p>
            <ul>
              <li>{discountLabel} off when booking online</li>
              <li>See live pricing by date</li>
              <li>Pay {depositLabel} deposit or hold for {cfg.tentativeHoldHours}hrs</li>
              <li>Free cancellation up to 48 hrs</li>
            </ul>
          </div>
          <div className="book-online-cta-wrap">
            <button className="btn-book-online" onClick={openModal}>Book online now →</button>
            <p className="or-wait">…or wait for our team to call you</p>
          </div>
        </div>

        <div className="next-steps">
          <h2>What happens next?</h2>
          <div className="step-item">
            <div className="step-num-circle">1</div>
            <div className="step-content">
              <h3>💬 Quick response</h3>
              <p>Our team will contact you shortly during business hours (8 AM – 8 PM) to discuss your moving needs.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-num-circle">2</div>
            <div className="step-content">
              <h3>📄 Detailed quote</h3>
              <p>We&apos;ll provide a transparent, detailed quote with no hidden fees — what we quote is what you pay.</p>
            </div>
          </div>
          <div className="step-item">
            <div className="step-num-circle">3</div>
            <div className="step-content">
              <h3>📅 Book your move</h3>
              <p>Once you&apos;re happy with the quote, we&apos;ll schedule your move and send you a confirmation with all the details.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ======== BOOKING MODAL ======== */}
      {modalOpen && (
      <div className="modal-overlay active" onClick={backdropClick} role="dialog" aria-modal="true">
        <div className="modal">
          <div className="modal-header">
            <h2>Book your move <span className="discount-inline">{discountLabel} off</span></h2>
            <button className="modal-close" onClick={closeModal} aria-label="Close">✕</button>
          </div>

          <div className="mini-stepper">
            {[1, 2, 3].map(n => (
              <div key={n}>
                <div className={`mini-step${step === n ? ' active' : step > n ? ' done' : ''}`}>
                  <div className="mini-step-num">{n}</div>
                  <span className="mini-step-label">{n === 1 ? 'Move size' : n === 2 ? 'Pick date' : 'Review & pay'}</span>
                </div>
                {n < 3 && <div className="mini-step-line" />}
              </div>
            ))}
          </div>

          <div className="modal-body">
            {/* STEP 1 */}
            {step === 1 && (
              <div className="panel active">
                <div className="panel-header">
                  <h3>Tell us about your move</h3>
                  <p>This helps us recommend the right crew size for you.</p>
                </div>

                <label style={{ display: 'block', marginBottom: 10 }}>Your details</label>
                <div className="card-input-row" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 14 }}>
                  <div className="field">
                    <label>First name</label>
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Last name</label>
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="card-input-row" style={{ gridTemplateColumns: '1fr 1fr', marginBottom: 14 }}>
                  <div className="field">
                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="field">
                    <label>Phone</label>
                    <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                  </div>
                </div>

                <label style={{ display: 'block', marginBottom: 10 }}>Pickup address</label>
                <div className="field">
                  <LocationAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                    placeholder="Pickup address"
                    onPlaceSelected={(place) => {
                      setPickup(place.formatted_address || '');
                      const loc = place.geometry?.location;
                      if (loc) setPickupGeo({ lat: loc.lat(), lng: loc.lng() });
                    }}
                  />
                </div>
                <label style={{ display: 'block', marginBottom: 10 }}>Dropoff address</label>
                <div className="field">
                  <LocationAutocomplete
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
                    placeholder="Dropoff address"
                    onPlaceSelected={(place) => {
                      setDropoff(place.formatted_address || '');
                      const loc = place.geometry?.location;
                      if (loc) setDropoffGeo({ lat: loc.lat(), lng: loc.lng() });
                    }}
                  />
                </div>

                <label style={{ display: 'block', margin: '10px 0' }}>Home size</label>
                <div className="tile-grid">
                  {HOME_SIZES.map(h => (
                    <div
                      key={h.key}
                      className={`tile${homeSize === h.key ? ' selected' : ''}`}
                      onClick={() => selectHomeSize(h.key)}
                    >
                      <strong>{h.label}</strong>
                    </div>
                  ))}
                </div>

                <label style={{ display: 'block', marginBottom: 10 }}>Crew size</label>
                <div className="tile-grid">
                  {Object.entries(cfg.crewRates)
                    .sort(([a], [b]) => Number(a) - Number(b))
                    .map(([k, rate]) => (
                      <div
                        key={k}
                        className={`tile${crewSize === Number(k) ? ' selected' : ''}`}
                        onClick={() => setCrewSize(Number(k))}
                      >
                        <strong>{k} movers</strong>
                        <small>{money(rate * 100, ccy)}/hr</small>
                      </div>
                    ))}
                </div>

                {submitError && <div style={{ color: '#E63946', marginTop: 10 }}>{submitError}</div>}

                <div className="actions">
                  <div />
                  <button
                    className="btn btn-primary"
                    disabled={!homeSize || crewSize === null || !firstName || !lastName || !email || !phone || !pickup || !dropoff}
                    onClick={() => goToStep(2)}
                  >
                    Continue to calendar →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="panel active">
                <div className="panel-header">
                  <h3>Choose your move date</h3>
                  <p>Hourly rates shown below. Weekends and month-end dates have a small premium.</p>
                </div>

                <div className="calendar-wrap">
                  <div>
                    <div className="cal-header">
                      <div className="cal-month">{monthLabel}</div>
                      <div className="cal-nav">
                        <button onClick={() => changeMonth(-1)}>‹</button>
                        <button onClick={() => changeMonth(1)}>›</button>
                      </div>
                    </div>

                    <div className="cal-grid">
                      {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(d => (
                        <div key={d} className="cal-dow">{d}</div>
                      ))}
                      {Array.from({ length: firstDow }).map((_, i) => (
                        <div key={`e${i}`} className="cal-day empty" />
                      ))}
                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const d = new Date(viewYear, viewMonth, day);
                        const past = d < today;
                        const surge = isSurgeDate(d, cfg);
                        const selected = !!(selectedDate && selectedDate.toDateString() === d.toDateString());
                        const thisRate = crewSize !== null
                          ? (surge ? Math.round(baseRate * (1 + cfg.surge.pct / 100)) : baseRate)
                          : 0;
                        const classes = ['cal-day'];
                        if (past) classes.push('disabled');
                        if (surge) classes.push('surge');
                        if (selected) classes.push('selected');
                        return (
                          <div
                            key={day}
                            className={classes.join(' ')}
                            onClick={() => { if (!past) setSelectedDate(d); }}
                          >
                            <div className="cal-num">{day}</div>
                            {!past && thisRate > 0 && (
                              <div className="cal-price">{money(thisRate * 100, ccy)}/hr</div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="cal-legend">
                      <div className="cal-legend-item">
                        <span className="cal-legend-dot legend-standard" /> Standard day
                      </div>
                      <div className="cal-legend-item">
                        <span className="cal-legend-dot legend-surge" /> High-demand (+{cfg.surge.pct}%)
                      </div>
                    </div>

                    {selectedDate && (
                      <div style={{ marginTop: 20 }}>
                        <label style={{ display: 'block', marginBottom: 8 }}>Arrival window (1 hour)</label>
                        <div className="time-slots">
                          {arrivalWindows.map(w => (
                            <div
                              key={w}
                              className={`time-slot${selectedTime === w ? ' selected' : ''}`}
                              onClick={() => setSelectedTime(w)}
                            >
                              {w}
                            </div>
                          ))}
                        </div>
                        <p style={{ fontSize: 11, color: '#6b6b6b', marginTop: 8, lineHeight: 1.5 }}>
                          Our crew arrives within this window. Billing starts when we arrive at pickup and ends when we finish at drop-off.
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="price-panel">
                    <h4>Your rate</h4>
                    <div className="price-highlight">
                      <div className="label">Hourly rate</div>
                      <div className="rate">
                        {hourlyRate > 0 ? money(hourlyRate * 100, ccy) : '$—'}
                        <sup>/hr</sup>
                      </div>
                      <div className="sub-label">
                        {selectedDate
                          ? (surgeActive ? `High-demand (+${cfg.surge.pct}%)` : 'Standard rate')
                          : 'Select a date'}
                      </div>
                    </div>

                    <div className="min-hours-note">
                      <strong>{minHours}-hour minimum</strong>
                      All moves are billed door-to-door with a {minHours}-hour minimum. Pay only for the actual time worked after that.
                    </div>

                    <div style={{ marginTop: 18 }}>
                      <div className="price-line">
                        <span>Travel fee <span className="muted">(flat)</span></span>
                        <span>{money(travelFee * 100, ccy)}</span>
                      </div>
                      <div className="price-line discount">
                        <span>Online booking discount</span>
                        <span>–{money(cfg.discountCents, ccy)}</span>
                      </div>
                    </div>

                    <div className="deposit-row">
                      <span>Deposit to secure</span>
                      <strong>{depositLabel}</strong>
                    </div>

                    <p style={{ fontSize: 11, opacity: 0.65, marginTop: 12, lineHeight: 1.5, fontStyle: 'italic' }}>
                      Deposit is fully credited toward your final bill.
                    </p>
                  </div>
                </div>

                <div className="actions">
                  <button className="btn btn-secondary" onClick={() => goToStep(1)}>← Back</button>
                  <button
                    className="btn btn-primary"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => goToStep(3)}
                  >
                    Review booking →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="panel active">
                <div className="panel-header">
                  <h3>Review &amp; confirm</h3>
                  <p>Double-check your move details, then choose how you&apos;d like to pay.</p>
                </div>

                <div className="review-grid">
                  <div className="review-block">
                    <h5>Move date</h5>
                    <p><strong>{selectedDateLabel}</strong>{selectedTime ? ` · Arrival ${selectedTime}` : ''}</p>
                  </div>
                  <div className="review-block">
                    <h5>Crew &amp; size</h5>
                    <p><strong>{revCrewText}</strong></p>
                  </div>
                </div>

                <div className="pricing-summary">
                  <div className="pricing-summary-row">
                    <span>Hourly rate ({minHours}-hr minimum)</span>
                    <span>{money(hourlySubtotal * 100, ccy)}</span>
                  </div>
                  <div className="pricing-summary-row">
                    <span>Flat travel fee</span>
                    <span>{money(travelFee * 100, ccy)}</span>
                  </div>
                  <div className="pricing-summary-row discount">
                    <span>Online booking discount</span>
                    <span>–{discountLabel}</span>
                  </div>
                  <div className="pricing-summary-row total">
                    <span>Due today</span>
                    <span>{money(dueToday * 100, ccy)}</span>
                  </div>
                </div>

                <h4 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: '#0F2E1F', marginBottom: 12 }}>
                  Choose how to pay
                </h4>

                <div className="payment-options">
                  <div
                    className={`pay-option${payOption === 'deposit' ? ' selected' : ''}`}
                    onClick={() => setPayOption('deposit')}
                  >
                    <div className="radio-dot" />
                    <div className="pay-option-body">
                      <div className="pay-option-header">
                        <div className="pay-option-title">Pay deposit now</div>
                        <div className="pay-option-amount">{depositLabel}</div>
                      </div>
                      <div className="pay-option-desc">
                        Confirm your booking instantly with a {depositLabel} deposit. Fully credited toward your final bill.
                      </div>
                      <div className="pay-option-note">✓ Most popular · Date fully secured · Free cancellation up to 48 hrs</div>
                    </div>
                  </div>

                  {cfg.tentativeHoldEnabled && (
                    <div
                      className={`pay-option${payOption === 'tentative' ? ' selected' : ''}`}
                      onClick={() => setPayOption('tentative')}
                    >
                      <div className="radio-dot" />
                      <div className="pay-option-body">
                        <div className="pay-option-header">
                          <div className="pay-option-title">
                            Book now, pay deposit later
                            <span className="pay-option-savings">{cfg.tentativeHoldHours}hr hold</span>
                          </div>
                          <div className="pay-option-amount">$0</div>
                        </div>
                        <div className="pay-option-desc">
                          We&apos;ll tentatively hold your date for {cfg.tentativeHoldHours} hours. Confirm with the {depositLabel} deposit anytime before your hold expires — otherwise the slot is released.
                        </div>
                        <div className="pay-option-note">⏱ Tentative only · Not confirmed until deposit paid · We&apos;ll send a reminder</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="payment-shell">
                  {payOption === 'deposit' ? (
                    <>
                      <h4>Pay {depositLabel} deposit</h4>
                      <p className="sub">Fully credited toward your final bill. Refundable up to 48 hours before your move.</p>
                      <div className="field">
                        <label>Card details</label>
                        <div
                          ref={cardMountRef}
                          style={{
                            padding: '12px 14px',
                            border: '1px solid rgba(15,46,31,0.25)',
                            borderRadius: 8,
                            background: '#fff',
                            minHeight: 42,
                          }}
                        />
                        {!cfg.stripePublishableKey && (
                          <p style={{ fontSize: 11, color: '#E63946', marginTop: 6 }}>
                            Stripe is not configured for this company — contact support.
                          </p>
                        )}
                      </div>
                      <button
                        className="btn-pay"
                        disabled={submitting || !stripeReady}
                        onClick={completeBooking}
                      >
                        {submitting ? 'Processing…' : `Pay ${depositLabel} deposit & book`}
                      </button>
                      <p style={{ textAlign: 'center', fontSize: 11, color: '#6b6b6b', marginTop: 12 }}>
                        🔒 Secured by Stripe · PCI-DSS compliant
                      </p>
                    </>
                  ) : (
                    <>
                      <h4>Tentatively hold for {cfg.tentativeHoldHours} hours</h4>
                      <p className="sub">
                        No card required now — we&apos;ll send a reminder before your hold expires.
                      </p>
                      <button
                        className="btn-pay"
                        disabled={submitting}
                        onClick={completeBooking}
                      >
                        {submitting ? 'Processing…' : `Hold my date for ${cfg.tentativeHoldHours} hours`}
                      </button>
                    </>
                  )}

                  {submitError && (
                    <div style={{ color: '#E63946', marginTop: 12, fontSize: 13 }}>{submitError}</div>
                  )}
                </div>

                <div className="actions">
                  <button className="btn btn-secondary" onClick={() => goToStep(2)}>← Back</button>
                  <div />
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <div className="panel active">
                <div className="booking-success">
                  <div className="booking-success-check">✓</div>
                  <h3>You&apos;re <em>{payOption === 'deposit' ? 'booked!' : 'on hold!'}</em></h3>
                  <p className="msg">
                    {payOption === 'deposit'
                      ? 'Your move is confirmed. Check your email for the full booking confirmation and receipt. A Moving Papa team member will reach out 24 hours before your move to confirm logistics.'
                      : `Your date is tentatively reserved. Confirm with the ${depositLabel} deposit anytime before the hold expires to lock it in.`}
                  </p>
                  {confirmationCode && (
                    <div className="confirmation-code">CONFIRMATION #{confirmationCode}</div>
                  )}

                  {payOption === 'tentative' && (
                    <div style={{ marginTop: 24, padding: '16px 20px', background: 'rgba(230, 57, 70, 0.08)', border: '1px solid rgba(230, 57, 70, 0.3)', borderRadius: 14, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto' }}>
                      <p style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13, color: '#E63946', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 6 }}>
                        ⏱ Hold expires in {cfg.tentativeHoldHours} hours
                      </p>
                      <p style={{ fontSize: 13, color: '#1a1a1a', lineHeight: 1.5, marginBottom: 14 }}>
                        Your date is tentatively reserved. Pay your {depositLabel} deposit anytime before the hold expires to confirm it — otherwise the slot is released to other customers.
                      </p>
                      <button
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        onClick={() => { setPayOption('deposit'); setStep(3); }}
                      >
                        Pay {depositLabel} deposit now
                      </button>
                    </div>
                  )}

                  <div style={{ marginTop: 24 }}>
                    <button className="btn btn-primary" onClick={closeModal}>Done</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
