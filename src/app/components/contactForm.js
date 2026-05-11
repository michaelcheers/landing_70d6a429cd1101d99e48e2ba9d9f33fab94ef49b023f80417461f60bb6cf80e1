import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import Script from "/src/shims/script.js";
import { usePathname } from "/src/router/Router.js";
import Img_1 from "/src/images/example-4.webp.js";
function ContactSection({ section = "residential" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    optin: false
  });
  const [honeypot, setHoneypot] = useState("");
  const [formLoaded, setFormLoaded] = useState(0);
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [showRecaptcha, setShowRecaptcha] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const recaptchaRef = useRef(null);
  const widgetIdRef = useRef(null);
  const pathname = usePathname();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const isResidential = section === "residential";
  const roundingClasses = isResidential ? {
    leftSide: "md:rounded-l-lg rounded-t-lg md:rounded-t-none",
    rightSide: "md:rounded-r-lg rounded-b-lg md:rounded-bl-none"
  } : {
    leftSide: "",
    rightSide: ""
  };
  useEffect(() => {
    setFormLoaded(Date.now());
  }, []);
  useEffect(() => {
    const allFieldsFilled = formData.name.trim() !== "" && formData.email.trim() !== "" && formData.phone.trim() !== "" && formData.message.trim() !== "";
    setShowRecaptcha(allFieldsFilled);
  }, [formData]);
  useEffect(() => {
    if (typeof window !== "undefined" && window.grecaptcha) {
      console.log("reCAPTCHA already available on window");
      setScriptLoaded(true);
      if (showRecaptcha) {
        setTimeout(() => {
          renderRecaptcha();
        }, 100);
      }
    }
  }, [showRecaptcha]);
  const handleScriptLoad = () => {
    console.log("reCAPTCHA script loaded successfully");
    setScriptLoaded(true);
    if (typeof window !== "undefined" && window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log("reCAPTCHA is ready");
        if (showRecaptcha) {
          renderRecaptcha();
        }
      });
    }
  };
  const handleScriptError = () => {
    console.error("Failed to load reCAPTCHA script");
  };
  useEffect(() => {
    if (scriptLoaded && showRecaptcha && typeof window !== "undefined" && window.grecaptcha) {
      if (window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          renderRecaptcha();
        });
      } else {
        setTimeout(() => {
          renderRecaptcha();
        }, 500);
      }
    }
  }, [scriptLoaded, showRecaptcha]);
  useEffect(() => {
    setFormLoaded(Date.now());
    if (scriptLoaded && typeof window !== "undefined" && window.grecaptcha && recaptchaRef.current) {
      if (widgetIdRef.current !== null) {
        try {
          window.grecaptcha.reset(widgetIdRef.current);
          console.log("Reset existing reCAPTCHA widget");
        } catch (error) {
          console.error("Error resetting reCAPTCHA:", error);
          renderRecaptcha();
        }
      } else if (showRecaptcha) {
        renderRecaptcha();
      }
    }
  }, [pathname]);
  const renderRecaptcha = () => {
    if (!recaptchaRef.current || typeof window === "undefined" || !window.grecaptcha || typeof window.grecaptcha.render !== "function") {
      console.log("Cannot render reCAPTCHA yet - missing dependencies");
      return;
    }
    try {
      if (widgetIdRef.current === null || !recaptchaRef.current.hasChildNodes()) {
        console.log("Rendering new reCAPTCHA widget");
        recaptchaRef.current.innerHTML = "";
        const params = {
          "sitekey": process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "",
          "callback": () => {
            console.log("reCAPTCHA verification completed");
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired, needs verification again");
          }
        };
        widgetIdRef.current = window.grecaptcha.render(recaptchaRef.current, params);
        setRecaptchaLoaded(true);
        console.log("reCAPTCHA widget rendered successfully with ID:", widgetIdRef.current);
      }
    } catch (error) {
      console.error("Error rendering reCAPTCHA:", error);
      if (error?.toString().includes("already been rendered")) {
        console.log("reCAPTCHA was already rendered, marking as loaded");
        setRecaptchaLoaded(true);
      }
    }
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionTime = Date.now() - formLoaded;
    const isBotSubmission = submissionTime < 4e3 || honeypot !== "";
    if (isBotSubmission) {
      console.log("Bot submission detected");
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", optin: false });
      setTimeout(() => setSubmitSuccess(false), 5e3);
      return;
    }
    try {
      if (!recaptchaLoaded || typeof window === "undefined" || !window.grecaptcha || typeof window.grecaptcha.getResponse !== "function") {
        console.error("reCAPTCHA not loaded properly");
        alert("reCAPTCHA could not be loaded. Please refresh the page and try again.");
        return;
      }
      const recaptchaValue = window.grecaptcha.getResponse(widgetIdRef.current ?? void 0);
      if (!recaptchaValue) {
        alert("Please complete the reCAPTCHA verification");
        return;
      }
      setIsSubmitting(true);
      const { postBooking } = await import("/src/api/endpoints.js");
      const result = await postBooking({
        FullName: formData.name,
        Email: formData.email,
        PhoneNumber: formData.phone,
        Message: formData.message,
        ServiceType: "Contact"
      });
      if (!result.success) {
        throw new Error(result.message || "Failed to send contact form");
      }
      if (widgetIdRef.current !== null && typeof window !== "undefined" && window.grecaptcha) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "", optin: false });
      setTimeout(() => setSubmitSuccess(false), 5e3);
    } catch (error) {
      console.error("Error sending lead data:", error);
      alert("There was an error submitting your contact. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const buttonRounding = isResidential ? "!rounded-lg" : "";
  const rightSideBgColor = isResidential ? "bg-primary text-white" : "bg-[#F8F5EC] text-black";
  const successMessageClasses = isResidential ? "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" : "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6";
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    showRecaptcha && !scriptLoaded && /* @__PURE__ */ jsx(
      Script,
      {
        src: `https://www.google.com/recaptcha/api.js?render=explicit`,
        strategy: "afterInteractive",
        onLoad: handleScriptLoad,
        onError: handleScriptError
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-4", children: /* @__PURE__ */ jsxs("section", { className: "w-full max-w-[1250px] flex flex-col md:flex-row", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: `text-primary p-6 md:p-12 flex flex-col justify-center md:w-1/2 ${roundingClasses.leftSide} relative overflow-hidden`,
          style: {
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("${Img_1.src}")`,
            backgroundSize: "cover",
            backgroundPosition: "0% 0%"
          },
          children: [
            /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-4xl font-bold mb-6 leading-tight text-white", children: "Got any Questions?" }),
            /* @__PURE__ */ jsx("p", { className: "text-base md:text-base mb-4 text-white", children: "We're here to help! Fill out the form and our team will get back to you as soon as possible." }),
            /* @__PURE__ */ jsx("p", { className: "text-base md:text-base text-white", children: "Whether you need information about our moving services, want a custom quote, or have questions about your upcoming move, we're ready to assist you every step of the way." })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: `${rightSideBgColor} p-6 md:p-12 flex items-center justify-center md:w-1/2 ${roundingClasses.rightSide}`, children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-xl md:text-2xl font-bold mb-2", children: "Contact Us" }),
          /* @__PURE__ */ jsx("p", { className: "text-base md:text-base", children: "Please fill in the form below" })
        ] }),
        submitSuccess ? /* @__PURE__ */ jsx("div", { className: successMessageClasses, children: "Thank you for your message! We will contact you soon." }) : null,
        /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, id: "contact-form", children: [
          /* @__PURE__ */ jsxs("div", { className: "opacity-0 absolute top-0 left-0 h-0 w-0 -z-10 overflow-hidden", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "website", children: "Leave this field empty" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "website",
                name: "website",
                tabIndex: -1,
                autoComplete: "off",
                value: honeypot,
                onChange: (e) => setHoneypot(e.target.value)
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "name", className: "block font-medium mb-2 text-base md:text-base", children: "Full Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "name",
                value: formData.name,
                onChange: handleChange,
                className: `w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? "rounded-xl" : ""}`,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "email", className: "block font-medium mb-2 text-base md:text-base", children: "Email Address" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                id: "email",
                value: formData.email,
                onChange: handleChange,
                className: `w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? "rounded-xl" : ""}`,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "phone", className: "block font-medium mb-2 text-base md:text-base", children: "Phone Number" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                id: "phone",
                value: formData.phone,
                onChange: handleChange,
                className: `w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent text-base md:text-base ${isResidential ? "rounded-xl" : ""}`,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
            /* @__PURE__ */ jsx("label", { htmlFor: "message", className: "block font-medium mb-2 text-base md:text-base", children: "Message" }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                id: "message",
                rows: 4,
                value: formData.message,
                onChange: handleChange,
                className: `w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-tertiary focus:border-transparent resize-y text-base md:text-base ${isResidential ? "rounded-xl" : ""}`,
                required: true
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mb-6", children: showRecaptcha ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("div", { ref: recaptchaRef, id: "recaptcha-container", className: "g-recaptcha" }),
            !recaptchaLoaded && scriptLoaded && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-2", children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-gray-500 mr-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-base text-gray-500", children: "Loading reCAPTCHA..." })
            ] }),
            showRecaptcha && !scriptLoaded && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center py-2", children: [
              /* @__PURE__ */ jsxs("svg", { className: "animate-spin h-5 w-5 text-gray-500 mr-2", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-base text-gray-500", children: "Loading script..." })
            ] })
          ] }) : /* @__PURE__ */ jsx(Fragment, {}) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "submit",
              disabled: isSubmitting || showRecaptcha && !recaptchaLoaded,
              className: `rainbow-button ${buttonRounding} text-white font-bold py-3 px-6 w-full focus:outline-none disabled:opacity-70 flex justify-center items-center`,
              children: isSubmitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("svg", { className: "animate-spin -ml-1 mr-3 h-5 w-5 text-white", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", children: [
                  /* @__PURE__ */ jsx("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
                  /* @__PURE__ */ jsx("path", { className: "opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })
                ] }),
                "Sending..."
              ] }) : "Send Message"
            }
          )
        ] })
      ] }) })
    ] }) })
  ] });
}
export {
  ContactSection as default
};
