import { jsx, jsxs } from "react/jsx-runtime";
import GetQuote from "/src/app/components/getQuote.js";
import PapaAdv from "/src/app/components/papaadv.js";
import Review from "/src/app/components/review.js";
import BackgroundStorage from "/src/app/components/background/storage.js";
import CurvedStepsFlowFinal from "/src/app/components/curveStep.js";
import Link from "/src/components/Link.js";
import GetQuoteFooter from "/src/app/components/getQuotefooter.js";
function Storage() {
  const questions = [
    "What types of storage solutions do you offer?",
    "How secure are your storage facilities?",
    "Are your storage units climate-controlled?",
    "How does the pickup and delivery process work?",
    "What items can and cannot be stored?",
    "What happens if I need to access my items while in storage?",
    "How do you determine storage pricing and what's included?"
  ];
  const answers = [
    "We offer flexible storage solutions including short-term storage (days to months), long-term storage (months to years), climate-controlled units, and combined moving + storage services. Whether you need temporary storage between moves or long-term solutions, we have options to fit your timeline and budget.",
    "Our storage facilities feature 24/7 security monitoring, surveillance cameras, restricted access controls, and on-site security personnel. Each facility is fully fenced with controlled entry points, and only authorized Moving Papa staff have access to your stored belongings.",
    "Yes, all our storage units are climate-controlled to protect your belongings from temperature fluctuations, humidity, and environmental damage. This is especially important for furniture, electronics, documents, artwork, and other sensitive items that can be damaged by extreme temperatures or moisture.",
    "We handle everything! Our team will pick up your items from your location, carefully transport them to our secure storage facility, and organize them in your designated unit. When you're ready, simply give us notice and we'll deliver your items to your new location - no need for you to visit the storage facility.",
    "We can store most household and office items including furniture, electronics, documents, clothing, appliances, and personal belongings. We cannot store hazardous materials, perishable items, illegal substances, or items that pose safety risks. Our team will provide guidance on any questionable items.",
    "While direct customer access isn't available for security reasons, we can arrange retrieval of specific items with advance notice. Most customers find our delivery service more convenient - we can deliver individual items or everything at once, whatever works best for you.",
    "Storage pricing is based on the amount of space needed and length of storage time. Our rates include pickup, storage in climate-controlled facilities, security monitoring, and delivery when you're ready. We provide transparent pricing with no hidden fees - you'll know exactly what you're paying upfront."
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#F8F5EC]", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative mt-13 md:mt-20", children: /* @__PURE__ */ jsx(BackgroundStorage, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full  md:w-[1440px] md:h-[700px] relative z-10 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full pb-5 md:flex md:px-5 md:pt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "pb-0 mb-0 md:w-1/2", children: /* @__PURE__ */ jsxs("div", { className: "cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10 px-3 md:px-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-white font-bold text-[32px] hidden md:flex", children: [
          "Storage ",
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "\xA0You Can Rely On" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-white font-bold text-2xl md:hidden pt-10", children: [
          "Storage ",
          /* @__PURE__ */ jsxs("span", { className: "text-tertiary", children: [
            /* @__PURE__ */ jsx("br", {}),
            "You Can Rely On"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-white w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] pb-10", children: "Secure, accessible, and well-maintained storage solutions when you need extra space. Your possessions remain protected until you're ready for them\u2014whether that's days or years." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "pb-0 mb-0 w-screen md:w-1/2", children: /* @__PURE__ */ jsx("div", { className: "cols-span-1  mt-5 md:mt-10", children: /* @__PURE__ */ jsx(GetQuote, { from: "vancouver-storage" }) }) })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ jsx(Review, {}) }),
    /* @__PURE__ */ jsx("div", { className: "w-full pt-8 ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold text-primary mb-6", children: [
          "Trust. ",
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "That's Moving Papa" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-tertiary mx-auto mb-8" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-700 max-w-4xl mx-auto leading-relaxed", children: "Moving Papa has built its reputation on one simple principle: earning and keeping your trust. Every storage solution, every interaction, every promise we make is backed by our unwavering commitment to excellence." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Maximum Security" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "24/7 security monitoring, climate-controlled environments, and restricted access ensure your belongings are safe and protected at all times." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Climate Protection" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "Temperature and humidity controlled facilities protect furniture, electronics, documents, and other sensitive items from environmental damage." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Completely Hassle-Free" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "We handle everything from pickup to storage to delivery. No stress, no coordination needed on your part - just let us know when you need your items back and we'll take care of the rest." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-white", children: /* @__PURE__ */ jsx(PapaAdv, { from: "storage" }) }),
    /* @__PURE__ */ jsx(CurvedStepsFlowFinal, {}),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/finalstep/storage", className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg", children: "Get a Quote" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center py-10", children: [
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold md:w-[1250px] pt-5 md:pt-10 text-primary text-center", children: "Frequently Asked Questions" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center py-5 md:py-10 w-9/10 md:w-7xl", children: /* @__PURE__ */ jsx("div", { className: "w-full flex-col justify-start", children: questions.map((question, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "mb-4 bg-primary text-white border border-black rounded-lg overflow-hidden",
          children: /* @__PURE__ */ jsxs("div", { className: "accordion-item rounded-lg", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox", id: `faq-${index}`, className: "accordion-toggle hidden" }),
            /* @__PURE__ */ jsxs("div", { className: "accordion-content-wrapper", children: [
              /* @__PURE__ */ jsxs("label", { htmlFor: `faq-${index}`, className: "accordion-header font-bold", children: [
                /* @__PURE__ */ jsx("span", { className: "accordion-icon plus text-tertiary", children: "+" }),
                /* @__PURE__ */ jsx("span", { className: "accordion-icon minus text-tertiary", children: "\u2212" }),
                /* @__PURE__ */ jsx("span", { className: "font-regular", children: question })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "accordion-content font-regular", children: answers[index] })
            ] })
          ] })
        },
        index
      )) }) }) })
    ] }),
    /* @__PURE__ */ jsx(GetQuoteFooter, { section: "vancouver-storage" })
  ] });
}
export {
  Storage as default
};
