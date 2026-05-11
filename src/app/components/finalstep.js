import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from "react";
import DatePicker from "react-datepicker";
import "/src/_stubs/react-datepicker.css.js";
import { useAddress } from "/src/app/contextValues.js";
import LocationAutocomplete from "/src/app/components/locationautocomplete.js";
import { useRouter } from "/src/router/Router.js";
import "/src/app/landing.css.js";
import { detectUserLocation, trackLocationEvent } from "/src/app/utils/comprehensiveLocationTracking.js";
import CustomInput from "/src/app/components/customInput.js";
const BRANCH_PHONE = {
  vancouver: "604-373-5582",
  edmonton: "368-210-0125"
};
const branchPhoneFmt = (b) => {
  const p = BRANCH_PHONE[b] ?? "(647) 251-8188";
  return p.startsWith("(") ? p : `(${p.slice(0, 3)}) ${p.slice(4)}`;
};
function FinalStepComp({ from, branchNum }) {
  const [selectedDate, setSelectedDate] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveSize: ""
    // Added moveSize to formData
  });
  const [smsConsent, setSmsConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);
  const showSmsConsent = from.includes("commercial");
  const SMS_CONSENT_TEXT = "I consent to receive SMS/text messages from Moving Papa at the phone number above regarding my commercial moving quote, scheduling, and follow-ups. Message and data rates may apply. Reply STOP to opt out.";
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { pickupAddress, destinationAddress, utmData, setPickupAddress, setDestinationAddress } = useAddress();
  const router = useRouter();
  const moveSizeOptions = [
    "Studio",
    "1 Bedroom",
    "2 Bedroom",
    "3 Bedroom",
    "4+ Bedroom",
    "Office",
    "Other"
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const isResidential = from === "moving" || from == "vancouver-moving" || from == "storage" || from == "vancouver-storage";
  const roundingClasses = isResidential ? {
    round: "rounded-lg",
    button: "!rounded-xl"
  } : {
    round: "",
    button: ""
  };
  const { today, maxDate } = useMemo(() => {
    const todayDate = /* @__PURE__ */ new Date();
    const maxDateCalc = /* @__PURE__ */ new Date();
    maxDateCalc.setDate(todayDate.getDate() + 360);
    return { today: todayDate, maxDate: maxDateCalc };
  }, []);
  useEffect(() => {
    const performLocationDetection = async () => {
      try {
        const detected = await detectUserLocation(pickupAddress, destinationAddress, utmData);
        trackLocationEvent("finalstep_location_detected", detected, {
          page_type: "finalstep_residential",
          has_pickup_address: !!pickupAddress,
          has_destination_address: !!destinationAddress
        });
      } catch (error) {
        console.error("Location detection failed:", error);
      }
    };
    performLocationDetection();
  }, [pickupAddress, destinationAddress, utmData]);
  const handlePickupPlaceSelected = (place) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";
    place.address_components?.forEach((component) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });
    setPickupAddress({ street, city, state, zipCode });
  };
  const handleDestinationPlaceSelected = (place) => {
    let street = "";
    let city = "";
    let state = "";
    let zipCode = "";
    place.address_components?.forEach((component) => {
      if (component.types.includes("street_number")) {
        street = component.long_name;
      }
      if (component.types.includes("route")) {
        street += ` ${component.long_name}`;
      }
      if (component.types.includes("locality")) {
        city = component.long_name;
      }
      if (component.types.includes("administrative_area_level_1")) {
        state = component.short_name;
      }
      if (component.types.includes("postal_code")) {
        zipCode = component.long_name;
      }
    });
    setDestinationAddress({ street, city, state, zipCode });
  };
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!pickupAddress && !destinationAddress) {
      alert("Please fill in one address before submitting.");
      setIsLoading(false);
      return;
    }
    if (!isValidPhoneNumber(formData.phone)) {
      alert("Please enter a valid phone number.ex. 000-000-0000");
      setIsLoading(false);
      return;
    }
    if (showSmsConsent && !smsConsent) {
      setConsentError(true);
      alert("Please confirm SMS consent to continue.");
      setIsLoading(false);
      return;
    }
    sendLeadData();
  };
  function isValidPhoneNumber(phoneNumber) {
    const cleaned = phoneNumber.replace(/\s+/g, "");
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    const usE164Regex = /^\+1\d{10}$/;
    const usE164DashesRegex = /^\+1-\d{3}-\d{3}-\d{4}$/;
    const usParenthesesRegex = /^\(\d{3}\)\d{3}-?\d{4}$/;
    const usDashesRegex = /^\d{3}-\d{3}-\d{4}$/;
    const simpleRegex = /^\d{10}$/;
    return e164Regex.test(cleaned) || usE164Regex.test(cleaned) || usE164DashesRegex.test(cleaned) || usParenthesesRegex.test(cleaned) || usDashesRegex.test(cleaned) || simpleRegex.test(cleaned);
  }
  const getTrafficSource = (utmData2) => {
    const source = (utmData2?.utm_source || "").toLowerCase();
    const medium = (utmData2?.utm_medium || "").toLowerCase();
    const campaign = (utmData2?.utm_campaign || "").toLowerCase();
    if (campaign.includes("pmax")) {
      return "Pmax";
    }
    if (source.includes("google") || source === "cpc" || // Sometimes Google Ads uses 'cpc' as source
    source === "organic") {
      return "Google";
    }
    if (source.includes("bing") || source.includes("microsoft") || source === "msn") {
      return "Microsoft";
    }
    if (source.includes("meta") || source.includes("facebook") || source.includes("fb") || source === "ig" || // Instagram
    source.includes("instagram")) {
      return "Meta";
    }
    if (medium === "cpc" || medium === "ppc" || medium === "paidsearch") {
      if (campaign.includes("google") || !campaign.includes("bing")) {
        return "Google";
      }
    }
    if (medium === "cpc" && (campaign.includes("bing") || campaign.includes("msn"))) {
      return "Microsoft";
    }
    return "Other";
  };
  const sendLeadData = async () => {
    const formattedDate = selectedDate ? `${selectedDate.getFullYear()}${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}${selectedDate.getDate().toString().padStart(2, "0")}` : null;
    const utminfo = getTrafficSource(utmData);
    let referralsource = "";
    const isHamilton = typeof window !== "undefined" && sessionStorage.getItem("currentLocation") === "hamilton";
    if (from.includes("moving") || from.includes("storage")) {
      if (utminfo == "Other") {
        if (branchNum === "vancouver") {
          referralsource = "Organic - Vancouver";
        } else {
          referralsource = `Organic - Toronto`;
        }
      } else if (utminfo == "Pmax") {
        referralsource = utminfo;
      } else if (utminfo == "Meta") {
        if (branchNum === "vancouver") {
          referralsource = "Meta - Vancouver";
        } else {
          referralsource = "Meta - Toronto";
        }
      } else if (utminfo == "Google") {
        if (isHamilton) {
          referralsource = "Google Hamilton";
        } else if (branchNum === "vancouver") {
          referralsource = "Google - Residential Vancouver";
        } else {
          referralsource = utminfo + ` - Residential`;
        }
      } else {
        if (branchNum === "vancouver") {
          referralsource = utminfo + ` - Residential Van`;
        } else {
          referralsource = utminfo + ` - Residential`;
        }
      }
    } else {
      if (utminfo == "Other") {
        if (branchNum === "vancouver") {
          referralsource = "Organic - Vancouver";
        } else {
          referralsource = `Organic - Toronto`;
        }
      } else if (utminfo == "Pmax") {
        referralsource = utminfo;
      } else if (utminfo == "Meta") {
        if (branchNum === "vancouver") {
          referralsource = "Meta - Vancouver";
        } else {
          referralsource = "Meta - Toronto";
        }
      } else {
        if (isHamilton) {
          referralsource = "Google Hamilton";
        } else if (branchNum === "vancouver") {
          referralsource = utminfo + ` - Commercial Van`;
        } else {
          referralsource = utminfo + ` - Commercial`;
        }
      }
    }
    let servicetype = "";
    if (from.includes("storage")) {
      servicetype = "Storage in Bound";
    } else if (from.includes("commercial")) {
      servicetype = "Commercial";
    }
    const getBranchId = () => {
      if (typeof window !== "undefined") {
        const currentLocation = sessionStorage.getItem("currentLocation");
        if (currentLocation === "hamilton") {
          return "842b7c75-275a-484a-86ed-b260010a7f19";
        }
      }
      return branchNum === "vancouver" ? "98a3854c-cb46-4025-b0a1-b265013b069e" : "b8164028-c730-4fc4-912c-b1f4016f1130";
    };
    const branch = getBranchId();
    const getCompanyLocationId = () => {
      switch (branchNum) {
        case "vancouver":
          return 25;
        case "ottawa":
          return 36;
        case "calgary":
          return 37;
        case "edmonton":
          return 38;
        default:
          return 4;
      }
    };
    const leadData = {
      FullName: formData.name,
      Email: formData.email,
      PhoneNumber: formData.phone,
      OriginStreet: pickupAddress?.street,
      OriginCity: pickupAddress?.city,
      OriginState: pickupAddress?.state,
      OriginZipCode: pickupAddress?.zipCode,
      DestinationStreet: destinationAddress?.street,
      DestinationCity: destinationAddress?.city,
      DestinationState: destinationAddress?.state,
      DestinationZipCode: destinationAddress?.zipCode,
      ServiceType: servicetype,
      MoveSize: formData.moveSize || void 0,
      MoveDate: formattedDate,
      ReferralSource: referralsource,
      BranchId: branch,
      City: branchNum,
      CompanyLocationId: getCompanyLocationId(),
      UtmMedium: utmData?.utm_medium,
      UtmKeyword: utmData?.utm_keyword,
      UtmCampaign: utmData?.utm_campaign,
      UtmSource: utmData?.utm_source,
      UtmContent: utmData?.utm_content
    };
    if (utmData?.utm_campaign) {
      leadData.Campaign = utmData.utm_campaign;
    } else if (utmData?.campaign) {
      leadData.Campaign = utmData.campaign;
    }
    if (utmData?.utm_source) leadData.Source = utmData.utm_source;
    if (showSmsConsent) {
      leadData.SmsOptIn = smsConsent;
      leadData.SmsOptInText = SMS_CONSENT_TEXT;
      leadData.SmsOptInTimestamp = (/* @__PURE__ */ new Date()).toISOString();
    }
    setErrorMessage(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4e3);
    try {
      const { buildService1Payload, SERVICE1_BASE } = await import("/src/api/endpoints.js");
      const payload = buildService1Payload(leadData);
      const response = await fetch(SERVICE1_BASE + "/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
        keepalive: true
      });
      clearTimeout(timeoutId);
      if (response.ok || response.status === 409) {
        router.push(`/thankyou`);
        return;
      }
      console.error("Lead submission failed:", response.status, await response.text().catch(() => ""));
      setErrorMessage(`We couldn't submit your request. Please try again, or call ${branchPhoneFmt(branchNum)} and we'll take it manually.`);
      setIsLoading(false);
    } catch (error) {
      clearTimeout(timeoutId);
      const isAbort = error?.name === "AbortError";
      if (isAbort) {
        console.warn("Lead submission timed out \u2014 redirecting optimistically");
        router.push(`/thankyou`);
        return;
      }
      console.error("Lead submission error:", error);
      setErrorMessage(`We couldn't submit your request. Please try again, or call ${branchPhoneFmt(branchNum)} and we'll take it manually.`);
      setIsLoading(false);
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center justify-center min-h-screen bg-primary", children: /* @__PURE__ */ jsxs("div", { className: "bg-primary p-6  w-full max-w-md flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-bold text-center text-tertiary", children: "Final Step" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "w-full mt-4", id: "get-quote-form", children: [
      /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: pickupAddress ? /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold ", children: "Pickup Address" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setPickupAddress(null),
              className: "text-red-500 hover:text-red-700 focus:outline-none font-bold text-2xl",
              children: "X"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          pickupAddress.street,
          ", ",
          pickupAddress.city,
          ", ",
          pickupAddress.state,
          " ",
          pickupAddress.zipCode
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "relative items-center flex w-full", children: [
        /* @__PURE__ */ jsxs("svg", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: [
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }),
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" })
        ] }),
        /* @__PURE__ */ jsx(
          LocationAutocomplete,
          {
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            onPlaceSelected: handlePickupPlaceSelected,
            placeholder: "Enter Pickup Address",
            location: "floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10"
          }
        )
      ] }) }),
      from.includes("moving") || from.includes("commercial") ? /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: destinationAddress ? /* @__PURE__ */ jsxs("div", { className: "text-white", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Destination Address" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setDestinationAddress(null),
              className: "text-red-500 hover:text-red-700 focus:outline-none font-bold text-2xl",
              children: "X"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("p", { children: [
          destinationAddress.street,
          ", ",
          destinationAddress.city,
          ", ",
          destinationAddress.state,
          " ",
          destinationAddress.zipCode
        ] })
      ] }) : /* @__PURE__ */ jsxs("div", { className: "relative items-center flex w-full", children: [
        /* @__PURE__ */ jsxs("svg", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: [
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" }),
          /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" })
        ] }),
        /* @__PURE__ */ jsx(
          LocationAutocomplete,
          {
            apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
            onPlaceSelected: handleDestinationPlaceSelected,
            placeholder: "Enter Destination Address ",
            location: "floating-textarea rounded-lg !bg-primary !text-white !border-white pl-10"
          }
        )
      ] }) }) : /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsxs("div", { className: "items-center text-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "Destination Address" }),
        /* @__PURE__ */ jsx("p", { className: "text- font-bold pl-4", children: "Moving Papa Storage" })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx("svg", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 0 5.25 9h13.5A2.25 2.25 0 0 0 21 11.25v7.5" }) }),
        /* @__PURE__ */ jsx(
          DatePicker,
          {
            selected: selectedDate,
            onChange: (date) => setSelectedDate(date),
            customInput: /* @__PURE__ */ jsx(
              "input",
              {
                className: "floating-textarea rounded-lg !bg-primary !text-white !border-white w-full pl-10",
                readOnly: true,
                onFocus: (e) => e.target.blur(),
                onMouseDown: (e) => e.preventDefault(),
                onTouchStart: (e) => e.preventDefault()
              }
            ),
            placeholderText: "Select Estimated Moving Date",
            minDate: today,
            maxDate,
            dateFormat: "MMMM d, yyyy"
          }
        )
      ] }),
      isResidential && /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx("svg", { className: "absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary z-10", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" }) }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            name: "moveSize",
            value: formData.moveSize,
            onChange: handleInputChange,
            className: "floating-textarea rounded-lg !bg-primary !border-white w-full pl-10 appearance-none text-white",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", className: "bg-primary text-white", children: "Select Move Size" }),
              moveSizeOptions.map((option) => /* @__PURE__ */ jsx("option", { value: option, className: "bg-primary text-white", children: option }, option))
            ]
          }
        ),
        /* @__PURE__ */ jsx("svg", { className: "absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-tertiary pointer-events-none", fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 8.25l-7.5 7.5-7.5-7.5" }) })
      ] }),
      /* @__PURE__ */ jsx("h2", { className: `text-center font-bold text-white w-full bg-[#06170e] py-2 mb-4 mt-6 ${roundingClasses.round}`, children: "Where should we send your Quote?" }),
      /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsx("div", { className: "relative items-center flex w-full", children: /* @__PURE__ */ jsx(
        CustomInput,
        {
          type: "email",
          id: "email",
          name: "email",
          value: formData.email,
          onChange: handleInputChange,
          placeholder: "Enter Email *",
          required: true,
          icon: /* @__PURE__ */ jsx("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" }) })
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsx("div", { className: "relative items-center flex w-full", children: /* @__PURE__ */ jsx(
        CustomInput,
        {
          type: "tel",
          id: "phone",
          name: "phone",
          value: formData.phone,
          onChange: handleInputChange,
          placeholder: "Enter Phone Number *",
          required: true,
          icon: /* @__PURE__ */ jsx("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" }) })
        }
      ) }) }),
      /* @__PURE__ */ jsx("div", { className: "relative mb-4", children: /* @__PURE__ */ jsx("div", { className: "relative items-center flex w-full", children: /* @__PURE__ */ jsx(
        CustomInput,
        {
          type: "text",
          id: "name",
          name: "name",
          value: formData.name,
          onChange: handleInputChange,
          placeholder: "Enter Full Name *",
          required: true,
          icon: /* @__PURE__ */ jsx("svg", { fill: "none", viewBox: "0 0 24 24", strokeWidth: 1.5, stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" }) })
        }
      ) }) }),
      showSmsConsent && /* @__PURE__ */ jsxs("div", { className: `relative mb-4 flex gap-2 items-start text-xs leading-snug p-3 rounded ${consentError ? "border border-red-500 bg-red-50/10" : ""}`, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "checkbox",
            id: "sms-consent",
            checked: smsConsent,
            onChange: (e) => {
              setSmsConsent(e.target.checked);
              if (e.target.checked) setConsentError(false);
            },
            className: "mt-1 h-4 w-4 flex-shrink-0 accent-tertiary",
            required: true
          }
        ),
        /* @__PURE__ */ jsx("label", { htmlFor: "sms-consent", className: consentError ? "text-red-300" : "text-white", children: SMS_CONSENT_TEXT })
      ] }),
      errorMessage && /* @__PURE__ */ jsxs(
        "div",
        {
          role: "alert",
          className: "relative mb-4 flex items-center gap-3 rounded-md border border-[#c0392b] bg-[#fdecea] p-3 text-[#7b1f17]",
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#c0392b] font-bold text-white", children: "!" }),
            /* @__PURE__ */ jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold", children: "We couldn't submit your request." }),
              /* @__PURE__ */ jsxs("div", { children: [
                "Please try again, or call ",
                /* @__PURE__ */ jsx("strong", { children: branchPhoneFmt(branchNum) }),
                " and we'll take it manually."
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: `w-full bg-tertiary text-white py-2 px-4  hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rainbow-button ${roundingClasses.button}`,
          children: isLoading ? /* @__PURE__ */ jsx(Fragment, { children: "Processing..." }) : /* @__PURE__ */ jsx(Fragment, { children: "Get Quote Now" })
        }
      )
    ] })
  ] }) });
}
export {
  FinalStepComp as default
};
