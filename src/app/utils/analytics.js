const pushToDataLayer = (data) => {
  if (typeof window !== "undefined") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
};
const trackFormSubmission = (formType, formData = {}) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Form submission tracking (dev only):", { formType, formData });
    return;
  }
  pushToDataLayer({
    event: "form_submission",
    form_type: formType,
    origin_location: formData.origin || "",
    destination_location: formData.destination || "",
    move_date: formData.move_date || ""
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Lead", {
      content_category: formType
    });
  }
};
const trackQuoteRequest = (serviceType, locations = {}) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Form submission tracking (dev only):", { serviceType, locations });
    return;
  }
  pushToDataLayer({
    event: "quote_request",
    service_type: serviceType,
    origin_location: locations.origin || "",
    destination_location: locations.destination || ""
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "InitiateCheckout", {
      content_type: "service",
      content_name: serviceType
    });
  }
};
const trackPhoneCall = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Phone submission tracking (dev only):");
    return;
  }
  pushToDataLayer({
    event: "phone_call"
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
};
const trackEmailClick = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("email submission tracking (dev only):");
    return;
  }
  pushToDataLayer({
    event: "email_click"
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "Contact");
  }
};
const trackConversionComplete = (formType, additionalData = {}) => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    console.log("Form submission tracking (dev only):", { formType, additionalData });
    return;
  }
  pushToDataLayer({
    event: "conversion_complete",
    form_type: formType,
    ...additionalData
  });
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", "CompleteRegistration", {
      content_name: formType
    });
  }
};
export {
  trackConversionComplete,
  trackEmailClick,
  trackFormSubmission,
  trackPhoneCall,
  trackQuoteRequest
};
