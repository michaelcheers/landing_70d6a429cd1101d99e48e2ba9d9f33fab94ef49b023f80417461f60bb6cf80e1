import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Review from "/src/app/components/review.js";
import "/src/app/landing.css.js";
import { useState } from "react";
import "/src/_stubs/react-datepicker.css.js";
import { useAddress } from "/src/app/contextValues.js";
import { useRouter } from "/src/router/Router.js";
function OttCallBack() {
  const today = /* @__PURE__ */ new Date();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    moveSize: ""
    // Added moveSize to formData
  });
  const { utmData } = useAddress();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const maxDate = /* @__PURE__ */ new Date();
  maxDate.setDate(today.getDate() + 360);
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
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!isValidPhoneNumber(formData.phone)) {
      alert("Please enter a valid phone number. ex. 000-000-0000");
      setIsLoading(false);
      return;
    }
    sendLeadData();
  };
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
    const from = getTrafficSource(utmData);
    let referralsource = "";
    if (from == "Other") {
      referralsource = `Organic - Ottawa`;
    } else if (from == "Pmax") {
      referralsource = from;
    } else if (from == "Google") {
      referralsource = "Google Residential Ottawa";
    } else if (from == "Meta") {
      referralsource = from + ` - Ottawa`;
    } else {
      referralsource = from + ` - Residential`;
    }
    const leadData = {
      FullName: formData.name,
      Email: formData.email,
      PhoneNumber: formData.phone,
      ReferralSource: referralsource,
      BranchId: "98a3854c-cb46-4025-b0a1-b265013b069e",
      City: "ottawa",
      CompanyLocationId: 36,
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
    try {
      const { buildService1Payload, SERVICE1_BASE } = await import("/src/api/endpoints.js");
      const apiPromise = fetch(SERVICE1_BASE + "/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildService1Payload(leadData)),
        keepalive: true
      });
      apiPromise.then(async (response) => {
        if (!response.ok) {
          console.error("Lead submission failed:", response.status, await response.text());
        } else {
          console.log("Lead submitted successfully");
        }
      }).catch((error) => {
        console.error("Lead submission error:", error);
      });
      router.push(`/thankyou`);
    } catch (error) {
      console.error("Error preparing lead data:", error);
      setIsLoading(false);
      alert("There was an error preparing your request. Please try again.");
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center mt-13 md:mt-20", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-xl md:text-3xl text-center font-bold my-5", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-tertiary", children: "We will give you a call back right away." }),
      /* @__PURE__ */ jsx("h2", { children: "Please enter your details below for a call back." })
    ] }),
    /* @__PURE__ */ jsx("form", { className: "w-full max-w-md px-4", onSubmit: handleSubmit, children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "fullname", className: "block text-sm font-medium text-gray-700 mb-2", children: [
          "Full Name ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            id: "name",
            name: "name",
            required: true,
            value: formData.name,
            onChange: handleInputChange,
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors",
            placeholder: "Enter your full name"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { htmlFor: "phonenumber", className: "block text-sm font-medium text-gray-700 mb-2", children: [
          "Phone Number ",
          /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "tel",
            id: "phone",
            name: "phone",
            required: true,
            value: formData.phone,
            onChange: handleInputChange,
            className: "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-colors",
            placeholder: "Enter your phone number"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isLoading,
          className: "w-full bg-tertiary text-white py-2 px-4  hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rainbow-button !rounded-xl",
          children: isLoading ? /* @__PURE__ */ jsx(Fragment, { children: "Processing..." }) : /* @__PURE__ */ jsx(Fragment, { children: "Call Me Back" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center mt-10 md:mt-15 w-full", children: /* @__PURE__ */ jsx(Review, {}) })
  ] });
}
export {
  OttCallBack as default
};
