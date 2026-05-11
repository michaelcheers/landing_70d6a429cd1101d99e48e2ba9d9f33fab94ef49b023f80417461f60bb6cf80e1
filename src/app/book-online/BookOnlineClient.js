import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Script from "/src/shims/script.js";
import LocationAutocomplete from "/src/app/components/locationautocomplete.js";
import "/src/app/book-online/bookOnline.css.js";
const HOME_SIZES = [
  { key: "studio", label: "Studio", defaultCrew: 2 },
  { key: "1br", label: "1 bedroom", defaultCrew: 2 },
  { key: "2br", label: "2 bedroom", defaultCrew: 2 },
  { key: "3br", label: "3 bedroom", defaultCrew: 3 },
  { key: "4br", label: "4+ bedroom", defaultCrew: 4 },
  { key: "office", label: "Office", defaultCrew: 3 }
];
const HOME_LABEL = {
  "studio": "Studio",
  "1br": "1 bedroom",
  "2br": "2 bedroom",
  "3br": "3 bedroom",
  "4br": "4+ bedroom",
  "office": "Office"
};
function money(cents, ccy = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: ccy.toUpperCase(),
    maximumFractionDigits: 0
  }).format(cents / 100);
}
function isSurgeDate(dt, cfg) {
  if (!cfg) return false;
  const weekend = dt.getDay() === 0 || dt.getDay() === 6;
  const day = dt.getDate();
  const monthEnd = day >= 28 || day === 1;
  return cfg.surge.weekendEnabled && weekend || cfg.surge.monthEndEnabled && monthEnd;
}
function haversineKm(a, b) {
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s)));
}
function BookOnlineClient() {
  const [cfg, setCfg] = useState(null);
  const [cfgError, setCfgError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [pickupGeo, setPickupGeo] = useState(null);
  const [dropoffGeo, setDropoffGeo] = useState(null);
  const [homeSize, setHomeSize] = useState("");
  const [crewSize, setCrewSize] = useState(null);
  const today = useMemo(() => {
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [payOption, setPayOption] = useState("deposit");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmationCode, setConfirmationCode] = useState(null);
  const stripeRef = useRef(null);
  const elementsRef = useRef(null);
  const cardElementRef = useRef(null);
  const cardMountRef = useRef(null);
  const [stripeReady, setStripeReady] = useState(false);
  useEffect(() => {
    const url = new URL(window.location.href);
    const companyId = url.searchParams.get("companyId") || "23";
    const p = (k) => url.searchParams.get(k) || "";
    if (p("firstName")) setFirstName(p("firstName"));
    if (p("lastName")) setLastName(p("lastName"));
    if (p("email")) setEmail(p("email"));
    if (p("phone")) setPhone(p("phone"));
    if (p("pickup")) setPickup(p("pickup"));
    if (p("dropoff")) setDropoff(p("dropoff"));
    if (url.searchParams.get("open") === "1") setModalOpen(true);
    fetch(`https://helloservice1.com/api/bookings/online/config?companyId=${encodeURIComponent(companyId)}`, { cache: "no-store" }).then((r) => r.json()).then((d) => {
      if (!d || d.enabled === false) {
        setCfgError("Online booking is currently unavailable.");
        return;
      }
      setCfg(d);
    }).catch(() => setCfgError("Could not load booking configuration. Please try again."));
  }, []);
  const prevOverflowRef = useRef(null);
  useEffect(() => {
    if (!modalOpen) return;
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflowRef.current ?? "";
      prevOverflowRef.current = null;
    };
  }, [modalOpen]);
  useEffect(() => {
    const onShow = (e) => {
      if (e.persisted) document.body.style.overflow = "";
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);
  const distanceKm = useMemo(() => {
    if (pickupGeo && dropoffGeo) return haversineKm(pickupGeo, dropoffGeo);
    return null;
  }, [pickupGeo, dropoffGeo]);
  const baseRate = cfg && crewSize !== null ? cfg.crewRates?.[String(crewSize)] ?? 0 : 0;
  const surgeActive = selectedDate && cfg ? isSurgeDate(selectedDate, cfg) : false;
  const hourlyRate = surgeActive && cfg ? Math.round(baseRate * (1 + cfg.surge.pct / 100)) : baseRate;
  const travelFee = useMemo(() => {
    if (!cfg?.travelFeeTiers?.length) return 0;
    const sorted = [...cfg.travelFeeTiers].sort((x, y) => x.kmMax - y.kmMax);
    if (distanceKm === null) return sorted[0]?.fee ?? 0;
    for (const t of sorted) {
      if (distanceKm <= t.kmMax) return t.fee;
    }
    return sorted[sorted.length - 1].fee;
  }, [cfg, distanceKm]);
  const discount = cfg ? cfg.discountCents / 100 : 0;
  const deposit = cfg ? cfg.depositCents / 100 : 0;
  const minHours = cfg?.minHours ?? 2;
  const arrivalWindows = cfg?.arrivalWindows ?? [];
  const ccy = (cfg?.currency || "USD").toUpperCase();
  const initStripe = useCallback(() => {
    if (!cfg?.stripePublishableKey) return;
    if (!window.Stripe) return;
    if (stripeRef.current) return;
    stripeRef.current = window.Stripe(cfg.stripePublishableKey);
    const elements = stripeRef.current.elements();
    elementsRef.current = elements;
    const card = elements.create("card", { hidePostalCode: false, style: { base: { fontFamily: "DM Sans, system-ui, sans-serif", fontSize: "14px", color: "#1a1a1a" } } });
    cardElementRef.current = card;
    setStripeReady(true);
  }, [cfg?.stripePublishableKey]);
  useEffect(() => {
    if (step !== 3 || !modalOpen) return;
    if (!cardElementRef.current || !cardMountRef.current) return;
    try {
      cardElementRef.current.mount(cardMountRef.current);
    } catch {
    }
  }, [step, modalOpen, stripeReady]);
  function openModal() {
    setSubmitError(null);
    setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false);
  }
  function backdropClick(e) {
    if (e.target === e.currentTarget) closeModal();
  }
  function selectHomeSize(key) {
    setHomeSize(key);
    const def = HOME_SIZES.find((h) => h.key === key)?.defaultCrew ?? 2;
    if (crewSize === null) setCrewSize(def);
  }
  function goToStep(n) {
    setSubmitError(null);
    setStep(n);
  }
  function changeMonth(delta) {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    if (m > 11) {
      m = 0;
      y += 1;
    }
    const firstOfMonth2 = new Date(y, m, 1);
    const firstOfCurrent = new Date(today.getFullYear(), today.getMonth(), 1);
    if (firstOfMonth2 < firstOfCurrent) return;
    setViewMonth(m);
    setViewYear(y);
  }
  async function completeBooking() {
    if (!cfg) return;
    setSubmitError(null);
    if (!firstName || !lastName || !email || !phone) {
      setSubmitError("Please fill in your contact details.");
      return;
    }
    if (!pickup || !dropoff) {
      setSubmitError("Please provide pickup and dropoff addresses.");
      return;
    }
    if (!homeSize || crewSize === null) {
      setSubmitError("Please select a home size and crew.");
      setStep(1);
      return;
    }
    if (!selectedDate || !selectedTime) {
      setSubmitError("Please pick a date and arrival window.");
      setStep(2);
      return;
    }
    setSubmitting(true);
    let paymentMethodId = null;
    try {
      if (payOption === "deposit") {
        if (!stripeRef.current || !cardElementRef.current) {
          throw new Error("Payment form is still loading \u2014 please try again in a moment.");
        }
        const res = await stripeRef.current.createPaymentMethod({
          type: "card",
          card: cardElementRef.current,
          billing_details: { name: `${firstName} ${lastName}`.trim(), email }
        });
        if (res.error || !res.paymentMethod) {
          throw new Error(res.error?.message || "Could not tokenize card.");
        }
        paymentMethodId = res.paymentMethod.id;
      }
      const iso = selectedDate.toISOString().slice(0, 10);
      const body = {
        companyId: cfg.companyId,
        firstName,
        lastName,
        email,
        phone,
        pickup,
        dropoff,
        distanceKm,
        pickupLat: pickupGeo?.lat ?? null,
        pickupLng: pickupGeo?.lng ?? null,
        dropoffLat: dropoffGeo?.lat ?? null,
        dropoffLng: dropoffGeo?.lng ?? null,
        homeSize,
        crewSize,
        scheduledDate: iso,
        arrivalWindow: selectedTime,
        isSurge: !!surgeActive,
        payOption,
        paymentMethodId,
        companyLocationId: (() => {
          const h = location.hostname, p = location.pathname;
          if (h.startsWith("vancouver.") || p.startsWith("/vancouver")) return 25;
          if (h.startsWith("ottawa.") || p.startsWith("/ottawa")) return 36;
          if (h.startsWith("calgary.") || p.startsWith("/calgary")) return 37;
          if (h.startsWith("edmonton.") || p.startsWith("/edmonton")) return 38;
          return 4;
        })()
      };
      const r = await fetch("https://helloservice1.com/api/bookings/online", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const d = await r.json();
      if (!r.ok || !d.success) throw new Error(d?.message || "Booking failed.");
      setConfirmationCode(d.confirmationCode || null);
      setStep(4);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : String(e));
    } finally {
      setSubmitting(false);
    }
  }
  if (cfgError) {
    return /* @__PURE__ */ jsxs("main", { className: "thankyou-wrap", style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("h1", { style: { fontSize: 24, color: "#0F2E1F", marginTop: 40 }, children: "Online booking unavailable" }),
      /* @__PURE__ */ jsx("p", { style: { color: "#6b6b6b" }, children: cfgError })
    ] });
  }
  if (!cfg) {
    return /* @__PURE__ */ jsx("main", { style: { padding: 40, textAlign: "center", fontFamily: "system-ui" }, children: "Loading\u2026" });
  }
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDow = firstOfMonth.getDay();
  const monthLabel = firstOfMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  const depositLabel = money(cfg.depositCents, ccy);
  const discountLabel = money(cfg.discountCents, ccy);
  const selectedDateLabel = selectedDate ? selectedDate.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) : "\u2014";
  const hourlySubtotal = hourlyRate * minHours;
  const dueToday = payOption === "deposit" ? cfg.depositCents / 100 : 0;
  const revCrewText = crewSize && homeSize ? `${crewSize} movers \xB7 ${HOME_LABEL[homeSize]}` : "\u2014";
  return /* @__PURE__ */ jsxs("div", { className: "bo-root", children: [
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
    /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }),
    /* @__PURE__ */ jsx("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=DM+Sans:ital,wght@0,300..700;1,400&family=Instrument+Serif:ital@0;1&display=swap" }),
    cfg.stripePublishableKey && /* @__PURE__ */ jsx(
      Script,
      {
        src: "https://js.stripe.com/v3",
        strategy: "afterInteractive",
        onLoad: initStripe,
        onReady: initStripe
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "thankyou-wrap", children: [
      /* @__PURE__ */ jsxs("div", { className: "book-online-card", children: [
        /* @__PURE__ */ jsxs("div", { className: "book-online-content", children: [
          /* @__PURE__ */ jsxs("div", { className: "discount-badge", children: [
            "Save ",
            discountLabel,
            " \xB7 Book online"
          ] }),
          /* @__PURE__ */ jsxs("h3", { children: [
            "Skip the wait \u2014 ",
            /* @__PURE__ */ jsx("em", { children: "book online" }),
            " in 60 seconds."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Know what you want? Lock in your date instantly, or tentatively hold it for ",
            cfg.tentativeHoldHours,
            " hours while you decide."
          ] }),
          /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsxs("li", { children: [
              discountLabel,
              " off when booking online"
            ] }),
            /* @__PURE__ */ jsx("li", { children: "See live pricing by date" }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Pay ",
              depositLabel,
              " deposit or hold for ",
              cfg.tentativeHoldHours,
              "hrs"
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Free cancellation up to 48 hrs" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "book-online-cta-wrap", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-book-online", onClick: openModal, children: "Book online now \u2192" }),
          /* @__PURE__ */ jsx("p", { className: "or-wait", children: "\u2026or wait for our team to call you" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "next-steps", children: [
        /* @__PURE__ */ jsx("h2", { children: "What happens next?" }),
        /* @__PURE__ */ jsxs("div", { className: "step-item", children: [
          /* @__PURE__ */ jsx("div", { className: "step-num-circle", children: "1" }),
          /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
            /* @__PURE__ */ jsx("h3", { children: "\u{1F4AC} Quick response" }),
            /* @__PURE__ */ jsx("p", { children: "Our team will contact you shortly during business hours (8 AM \u2013 8 PM) to discuss your moving needs." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "step-item", children: [
          /* @__PURE__ */ jsx("div", { className: "step-num-circle", children: "2" }),
          /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
            /* @__PURE__ */ jsx("h3", { children: "\u{1F4C4} Detailed quote" }),
            /* @__PURE__ */ jsx("p", { children: "We'll provide a transparent, detailed quote with no hidden fees \u2014 what we quote is what you pay." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "step-item", children: [
          /* @__PURE__ */ jsx("div", { className: "step-num-circle", children: "3" }),
          /* @__PURE__ */ jsxs("div", { className: "step-content", children: [
            /* @__PURE__ */ jsx("h3", { children: "\u{1F4C5} Book your move" }),
            /* @__PURE__ */ jsx("p", { children: "Once you're happy with the quote, we'll schedule your move and send you a confirmation with all the details." })
          ] })
        ] })
      ] })
    ] }),
    modalOpen && /* @__PURE__ */ jsx("div", { className: "modal-overlay active", onClick: backdropClick, role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ jsxs("div", { className: "modal", children: [
      /* @__PURE__ */ jsxs("div", { className: "modal-header", children: [
        /* @__PURE__ */ jsxs("h2", { children: [
          "Book your move ",
          /* @__PURE__ */ jsxs("span", { className: "discount-inline", children: [
            discountLabel,
            " off"
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { className: "modal-close", onClick: closeModal, "aria-label": "Close", children: "\u2715" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mini-stepper", children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: `mini-step${step === n ? " active" : step > n ? " done" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: "mini-step-num", children: n }),
          /* @__PURE__ */ jsx("span", { className: "mini-step-label", children: n === 1 ? "Move size" : n === 2 ? "Pick date" : "Review & pay" })
        ] }),
        n < 3 && /* @__PURE__ */ jsx("div", { className: "mini-step-line" })
      ] }, n)) }),
      /* @__PURE__ */ jsxs("div", { className: "modal-body", children: [
        step === 1 && /* @__PURE__ */ jsxs("div", { className: "panel active", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel-header", children: [
            /* @__PURE__ */ jsx("h3", { children: "Tell us about your move" }),
            /* @__PURE__ */ jsx("p", { children: "This helps us recommend the right crew size for you." })
          ] }),
          /* @__PURE__ */ jsx("label", { style: { display: "block", marginBottom: 10 }, children: "Your details" }),
          /* @__PURE__ */ jsxs("div", { className: "card-input-row", style: { gridTemplateColumns: "1fr 1fr", marginBottom: 14 }, children: [
            /* @__PURE__ */ jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsx("label", { children: "First name" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: firstName, onChange: (e) => setFirstName(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsx("label", { children: "Last name" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: lastName, onChange: (e) => setLastName(e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "card-input-row", style: { gridTemplateColumns: "1fr 1fr", marginBottom: 14 }, children: [
            /* @__PURE__ */ jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsx("label", { children: "Email" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: email, onChange: (e) => setEmail(e.target.value) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "field", children: [
              /* @__PURE__ */ jsx("label", { children: "Phone" }),
              /* @__PURE__ */ jsx("input", { type: "text", value: phone, onChange: (e) => setPhone(e.target.value) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("label", { style: { display: "block", marginBottom: 10 }, children: "Pickup address" }),
          /* @__PURE__ */ jsx("div", { className: "field", children: /* @__PURE__ */ jsx(
            LocationAutocomplete,
            {
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
              placeholder: "Pickup address",
              onPlaceSelected: (place) => {
                setPickup(place.formatted_address || "");
                const loc = place.geometry?.location;
                if (loc) setPickupGeo({ lat: loc.lat(), lng: loc.lng() });
              }
            }
          ) }),
          /* @__PURE__ */ jsx("label", { style: { display: "block", marginBottom: 10 }, children: "Dropoff address" }),
          /* @__PURE__ */ jsx("div", { className: "field", children: /* @__PURE__ */ jsx(
            LocationAutocomplete,
            {
              apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
              placeholder: "Dropoff address",
              onPlaceSelected: (place) => {
                setDropoff(place.formatted_address || "");
                const loc = place.geometry?.location;
                if (loc) setDropoffGeo({ lat: loc.lat(), lng: loc.lng() });
              }
            }
          ) }),
          /* @__PURE__ */ jsx("label", { style: { display: "block", margin: "10px 0" }, children: "Home size" }),
          /* @__PURE__ */ jsx("div", { className: "tile-grid", children: HOME_SIZES.map((h) => /* @__PURE__ */ jsx(
            "div",
            {
              className: `tile${homeSize === h.key ? " selected" : ""}`,
              onClick: () => selectHomeSize(h.key),
              children: /* @__PURE__ */ jsx("strong", { children: h.label })
            },
            h.key
          )) }),
          /* @__PURE__ */ jsx("label", { style: { display: "block", marginBottom: 10 }, children: "Crew size" }),
          /* @__PURE__ */ jsx("div", { className: "tile-grid", children: Object.entries(cfg.crewRates).sort(([a], [b]) => Number(a) - Number(b)).map(([k, rate]) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: `tile${crewSize === Number(k) ? " selected" : ""}`,
              onClick: () => setCrewSize(Number(k)),
              children: [
                /* @__PURE__ */ jsxs("strong", { children: [
                  k,
                  " movers"
                ] }),
                /* @__PURE__ */ jsxs("small", { children: [
                  money(rate * 100, ccy),
                  "/hr"
                ] })
              ]
            },
            k
          )) }),
          submitError && /* @__PURE__ */ jsx("div", { style: { color: "#E63946", marginTop: 10 }, children: submitError }),
          /* @__PURE__ */ jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ jsx("div", {}),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn btn-primary",
                disabled: !homeSize || crewSize === null || !firstName || !lastName || !email || !phone || !pickup || !dropoff,
                onClick: () => goToStep(2),
                children: "Continue to calendar \u2192"
              }
            )
          ] })
        ] }),
        step === 2 && /* @__PURE__ */ jsxs("div", { className: "panel active", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel-header", children: [
            /* @__PURE__ */ jsx("h3", { children: "Choose your move date" }),
            /* @__PURE__ */ jsx("p", { children: "Hourly rates shown below. Weekends and month-end dates have a small premium." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "calendar-wrap", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "cal-header", children: [
                /* @__PURE__ */ jsx("div", { className: "cal-month", children: monthLabel }),
                /* @__PURE__ */ jsxs("div", { className: "cal-nav", children: [
                  /* @__PURE__ */ jsx("button", { onClick: () => changeMonth(-1), children: "\u2039" }),
                  /* @__PURE__ */ jsx("button", { onClick: () => changeMonth(1), children: "\u203A" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "cal-grid", children: [
                ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => /* @__PURE__ */ jsx("div", { className: "cal-dow", children: d }, d)),
                Array.from({ length: firstDow }).map((_, i) => /* @__PURE__ */ jsx("div", { className: "cal-day empty" }, `e${i}`)),
                Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const d = new Date(viewYear, viewMonth, day);
                  const past = d < today;
                  const surge = isSurgeDate(d, cfg);
                  const selected = !!(selectedDate && selectedDate.toDateString() === d.toDateString());
                  const thisRate = crewSize !== null ? surge ? Math.round(baseRate * (1 + cfg.surge.pct / 100)) : baseRate : 0;
                  const classes = ["cal-day"];
                  if (past) classes.push("disabled");
                  if (surge) classes.push("surge");
                  if (selected) classes.push("selected");
                  return /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: classes.join(" "),
                      onClick: () => {
                        if (!past) setSelectedDate(d);
                      },
                      children: [
                        /* @__PURE__ */ jsx("div", { className: "cal-num", children: day }),
                        !past && thisRate > 0 && /* @__PURE__ */ jsxs("div", { className: "cal-price", children: [
                          money(thisRate * 100, ccy),
                          "/hr"
                        ] })
                      ]
                    },
                    day
                  );
                })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "cal-legend", children: [
                /* @__PURE__ */ jsxs("div", { className: "cal-legend-item", children: [
                  /* @__PURE__ */ jsx("span", { className: "cal-legend-dot legend-standard" }),
                  " Standard day"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "cal-legend-item", children: [
                  /* @__PURE__ */ jsx("span", { className: "cal-legend-dot legend-surge" }),
                  " High-demand (+",
                  cfg.surge.pct,
                  "%)"
                ] })
              ] }),
              selectedDate && /* @__PURE__ */ jsxs("div", { style: { marginTop: 20 }, children: [
                /* @__PURE__ */ jsx("label", { style: { display: "block", marginBottom: 8 }, children: "Arrival window (1 hour)" }),
                /* @__PURE__ */ jsx("div", { className: "time-slots", children: arrivalWindows.map((w) => /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: `time-slot${selectedTime === w ? " selected" : ""}`,
                    onClick: () => setSelectedTime(w),
                    children: w
                  },
                  w
                )) }),
                /* @__PURE__ */ jsx("p", { style: { fontSize: 11, color: "#6b6b6b", marginTop: 8, lineHeight: 1.5 }, children: "Our crew arrives within this window. Billing starts when we arrive at pickup and ends when we finish at drop-off." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "price-panel", children: [
              /* @__PURE__ */ jsx("h4", { children: "Your rate" }),
              /* @__PURE__ */ jsxs("div", { className: "price-highlight", children: [
                /* @__PURE__ */ jsx("div", { className: "label", children: "Hourly rate" }),
                /* @__PURE__ */ jsxs("div", { className: "rate", children: [
                  hourlyRate > 0 ? money(hourlyRate * 100, ccy) : "$\u2014",
                  /* @__PURE__ */ jsx("sup", { children: "/hr" })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "sub-label", children: selectedDate ? surgeActive ? `High-demand (+${cfg.surge.pct}%)` : "Standard rate" : "Select a date" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "min-hours-note", children: [
                /* @__PURE__ */ jsxs("strong", { children: [
                  minHours,
                  "-hour minimum"
                ] }),
                "All moves are billed door-to-door with a ",
                minHours,
                "-hour minimum. Pay only for the actual time worked after that."
              ] }),
              /* @__PURE__ */ jsxs("div", { style: { marginTop: 18 }, children: [
                /* @__PURE__ */ jsxs("div", { className: "price-line", children: [
                  /* @__PURE__ */ jsxs("span", { children: [
                    "Travel fee ",
                    /* @__PURE__ */ jsx("span", { className: "muted", children: "(flat)" })
                  ] }),
                  /* @__PURE__ */ jsx("span", { children: money(travelFee * 100, ccy) })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "price-line discount", children: [
                  /* @__PURE__ */ jsx("span", { children: "Online booking discount" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "\u2013",
                    money(cfg.discountCents, ccy)
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "deposit-row", children: [
                /* @__PURE__ */ jsx("span", { children: "Deposit to secure" }),
                /* @__PURE__ */ jsx("strong", { children: depositLabel })
              ] }),
              /* @__PURE__ */ jsx("p", { style: { fontSize: 11, opacity: 0.65, marginTop: 12, lineHeight: 1.5, fontStyle: "italic" }, children: "Deposit is fully credited toward your final bill." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ jsx("button", { className: "btn btn-secondary", onClick: () => goToStep(1), children: "\u2190 Back" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "btn btn-primary",
                disabled: !selectedDate || !selectedTime,
                onClick: () => goToStep(3),
                children: "Review booking \u2192"
              }
            )
          ] })
        ] }),
        step === 3 && /* @__PURE__ */ jsxs("div", { className: "panel active", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel-header", children: [
            /* @__PURE__ */ jsx("h3", { children: "Review & confirm" }),
            /* @__PURE__ */ jsx("p", { children: "Double-check your move details, then choose how you'd like to pay." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "review-grid", children: [
            /* @__PURE__ */ jsxs("div", { className: "review-block", children: [
              /* @__PURE__ */ jsx("h5", { children: "Move date" }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("strong", { children: selectedDateLabel }),
                selectedTime ? ` \xB7 Arrival ${selectedTime}` : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "review-block", children: [
              /* @__PURE__ */ jsx("h5", { children: "Crew & size" }),
              /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx("strong", { children: revCrewText }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "pricing-summary", children: [
            /* @__PURE__ */ jsxs("div", { className: "pricing-summary-row", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Hourly rate (",
                minHours,
                "-hr minimum)"
              ] }),
              /* @__PURE__ */ jsx("span", { children: money(hourlySubtotal * 100, ccy) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pricing-summary-row", children: [
              /* @__PURE__ */ jsx("span", { children: "Flat travel fee" }),
              /* @__PURE__ */ jsx("span", { children: money(travelFee * 100, ccy) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pricing-summary-row discount", children: [
              /* @__PURE__ */ jsx("span", { children: "Online booking discount" }),
              /* @__PURE__ */ jsxs("span", { children: [
                "\u2013",
                discountLabel
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pricing-summary-row total", children: [
              /* @__PURE__ */ jsx("span", { children: "Due today" }),
              /* @__PURE__ */ jsx("span", { children: money(dueToday * 100, ccy) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("h4", { style: { fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 16, fontWeight: 700, color: "#0F2E1F", marginBottom: 12 }, children: "Choose how to pay" }),
          /* @__PURE__ */ jsxs("div", { className: "payment-options", children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: `pay-option${payOption === "deposit" ? " selected" : ""}`,
                onClick: () => setPayOption("deposit"),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "radio-dot" }),
                  /* @__PURE__ */ jsxs("div", { className: "pay-option-body", children: [
                    /* @__PURE__ */ jsxs("div", { className: "pay-option-header", children: [
                      /* @__PURE__ */ jsx("div", { className: "pay-option-title", children: "Pay deposit now" }),
                      /* @__PURE__ */ jsx("div", { className: "pay-option-amount", children: depositLabel })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "pay-option-desc", children: [
                      "Confirm your booking instantly with a ",
                      depositLabel,
                      " deposit. Fully credited toward your final bill."
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "pay-option-note", children: "\u2713 Most popular \xB7 Date fully secured \xB7 Free cancellation up to 48 hrs" })
                  ] })
                ]
              }
            ),
            cfg.tentativeHoldEnabled && /* @__PURE__ */ jsxs(
              "div",
              {
                className: `pay-option${payOption === "tentative" ? " selected" : ""}`,
                onClick: () => setPayOption("tentative"),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "radio-dot" }),
                  /* @__PURE__ */ jsxs("div", { className: "pay-option-body", children: [
                    /* @__PURE__ */ jsxs("div", { className: "pay-option-header", children: [
                      /* @__PURE__ */ jsxs("div", { className: "pay-option-title", children: [
                        "Book now, pay deposit later",
                        /* @__PURE__ */ jsxs("span", { className: "pay-option-savings", children: [
                          cfg.tentativeHoldHours,
                          "hr hold"
                        ] })
                      ] }),
                      /* @__PURE__ */ jsx("div", { className: "pay-option-amount", children: "$0" })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "pay-option-desc", children: [
                      "We'll tentatively hold your date for ",
                      cfg.tentativeHoldHours,
                      " hours. Confirm with the ",
                      depositLabel,
                      " deposit anytime before your hold expires \u2014 otherwise the slot is released."
                    ] }),
                    /* @__PURE__ */ jsx("div", { className: "pay-option-note", children: "\u23F1 Tentative only \xB7 Not confirmed until deposit paid \xB7 We'll send a reminder" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "payment-shell", children: [
            payOption === "deposit" ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("h4", { children: [
                "Pay ",
                depositLabel,
                " deposit"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "sub", children: "Fully credited toward your final bill. Refundable up to 48 hours before your move." }),
              /* @__PURE__ */ jsxs("div", { className: "field", children: [
                /* @__PURE__ */ jsx("label", { children: "Card details" }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    ref: cardMountRef,
                    style: {
                      padding: "12px 14px",
                      border: "1px solid rgba(15,46,31,0.25)",
                      borderRadius: 8,
                      background: "#fff",
                      minHeight: 42
                    }
                  }
                ),
                !cfg.stripePublishableKey && /* @__PURE__ */ jsx("p", { style: { fontSize: 11, color: "#E63946", marginTop: 6 }, children: "Stripe is not configured for this company \u2014 contact support." })
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn-pay",
                  disabled: submitting || !stripeReady,
                  onClick: completeBooking,
                  children: submitting ? "Processing\u2026" : `Pay ${depositLabel} deposit & book`
                }
              ),
              /* @__PURE__ */ jsx("p", { style: { textAlign: "center", fontSize: 11, color: "#6b6b6b", marginTop: 12 }, children: "\u{1F512} Secured by Stripe \xB7 PCI-DSS compliant" })
            ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("h4", { children: [
                "Tentatively hold for ",
                cfg.tentativeHoldHours,
                " hours"
              ] }),
              /* @__PURE__ */ jsx("p", { className: "sub", children: "No card required now \u2014 we'll send a reminder before your hold expires." }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  className: "btn-pay",
                  disabled: submitting,
                  onClick: completeBooking,
                  children: submitting ? "Processing\u2026" : `Hold my date for ${cfg.tentativeHoldHours} hours`
                }
              )
            ] }),
            submitError && /* @__PURE__ */ jsx("div", { style: { color: "#E63946", marginTop: 12, fontSize: 13 }, children: submitError })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "actions", children: [
            /* @__PURE__ */ jsx("button", { className: "btn btn-secondary", onClick: () => goToStep(2), children: "\u2190 Back" }),
            /* @__PURE__ */ jsx("div", {})
          ] })
        ] }),
        step === 4 && /* @__PURE__ */ jsx("div", { className: "panel active", children: /* @__PURE__ */ jsxs("div", { className: "booking-success", children: [
          /* @__PURE__ */ jsx("div", { className: "booking-success-check", children: "\u2713" }),
          /* @__PURE__ */ jsxs("h3", { children: [
            "You're ",
            /* @__PURE__ */ jsx("em", { children: payOption === "deposit" ? "booked!" : "on hold!" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "msg", children: payOption === "deposit" ? "Your move is confirmed. Check your email for the full booking confirmation and receipt. A Moving Papa team member will reach out 24 hours before your move to confirm logistics." : `Your date is tentatively reserved. Confirm with the ${depositLabel} deposit anytime before the hold expires to lock it in.` }),
          confirmationCode && /* @__PURE__ */ jsxs("div", { className: "confirmation-code", children: [
            "CONFIRMATION #",
            confirmationCode
          ] }),
          payOption === "tentative" && /* @__PURE__ */ jsxs("div", { style: { marginTop: 24, padding: "16px 20px", background: "rgba(230, 57, 70, 0.08)", border: "1px solid rgba(230, 57, 70, 0.3)", borderRadius: 14, maxWidth: 460, marginLeft: "auto", marginRight: "auto" }, children: [
            /* @__PURE__ */ jsxs("p", { style: { fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, fontSize: 13, color: "#E63946", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }, children: [
              "\u23F1 Hold expires in ",
              cfg.tentativeHoldHours,
              " hours"
            ] }),
            /* @__PURE__ */ jsxs("p", { style: { fontSize: 13, color: "#1a1a1a", lineHeight: 1.5, marginBottom: 14 }, children: [
              "Your date is tentatively reserved. Pay your ",
              depositLabel,
              " deposit anytime before the hold expires to confirm it \u2014 otherwise the slot is released to other customers."
            ] }),
            /* @__PURE__ */ jsxs(
              "button",
              {
                className: "btn btn-primary",
                style: { width: "100%" },
                onClick: () => {
                  setPayOption("deposit");
                  setStep(3);
                },
                children: [
                  "Pay ",
                  depositLabel,
                  " deposit now"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { style: { marginTop: 24 }, children: /* @__PURE__ */ jsx("button", { className: "btn btn-primary", onClick: closeModal, children: "Done" }) })
        ] }) })
      ] })
    ] }) })
  ] });
}
export {
  BookOnlineClient as default
};
