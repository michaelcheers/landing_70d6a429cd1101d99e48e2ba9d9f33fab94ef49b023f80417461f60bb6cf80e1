import { jsx, jsxs } from "react/jsx-runtime";
import GetQuote from "/src/app/components/getQuote.js";
import PapaAdv from "/src/app/components/papaadv.js";
import Review from "/src/app/components/review.js";
import BackgroundRes from "/src/app/components/background/residential.js";
import CurvedStepsFlowFinal from "/src/app/components/curveStep.js";
import Link from "/src/components/Link.js";
import GetQuoteFooter from "/src/app/components/getQuotefooter.js";
function Residential() {
  const questions = [
    "How do I know I can trust Moving Papa with my valuable belongings?",
    "What happens if something gets damaged during my move?",
    "How do I know the quote I receive is accurate and final?",
    "What makes Moving Papa different from other moving companies?",
    "What if I need to change my moving date last minute?",
    "Do you provide all the moving equipment and materials needed?",
    "How far in advance should I book my residential move?",
    "Can you help with moves to apartments with stairs or elevators?"
  ];
  const answers = [
    "We understand that your belongings are more than just items \u2013 they're your memories, investments, and life's work. We've earned our customers' trust through: fully licensed and insured operations with comprehensive coverage, background-checked team of professional movers, 4.9-star Google rating from 200+ verified reviews, and transparent pricing with no hidden fees.",
    "While we take every precaution to prevent damage, we stand behind our work completely. Our comprehensive insurance coverage protects your belongings, we have an immediate reporting system for any concerns, a fair and fast claims process, and use professional packing materials to minimize risk. Our track record speaks for itself \u2013 99% of moves are completed without any damage.",
    "Transparency is at the heart of our business. We provide detailed itemization of all costs upfront, no hidden fees \u2013 what we quote is what you pay, written estimates provided before any work begins, clear explanation of any potential additional charges, and fixed-rate options available for most moves. We believe in earning your trust through honesty, not surprises on moving day.",
    "We've built our reputation on going above and beyond industry standards through: personal accountability with every move having a dedicated coordinator, eco-friendly practices with reusable materials and efficient routing, community focus as your neighbors not a faceless corporation, flexible scheduling including evenings and weekends, additional services like storage and packing, and ongoing communication throughout your entire move.",
    "Life happens, and we understand that moving dates sometimes need to change. We offer flexible rescheduling based on availability, no penalty fees for changes made with reasonable notice, emergency accommodations when possible, clear cancellation policy explained upfront, and priority rebooking for existing customers. Our goal is to work with you, not against you, when plans need to change.",
    "Yes, we bring everything needed for your move including professional-grade moving equipment, furniture dollies and straps, protective blankets and padding, quality boxes and packing materials, and specialized equipment for heavy items. You don't need to worry about sourcing or renting any equipment \u2013 we come fully prepared for every type of residential move.",
    "We recommend booking your residential move 2-4 weeks in advance, especially during peak moving season (May through September). However, we often accommodate last-minute moves based on availability. The earlier you book, the more scheduling flexibility we can offer and the better we can prepare for any special requirements your move might have.",
    "Absolutely! We're experienced with all types of residential moves including apartments with multiple flights of stairs, buildings with narrow stairwells, elevator moves with time restrictions, condos with moving policies, and homes with challenging access. We assess each situation beforehand and come prepared with the right equipment and techniques to handle any obstacles safely and efficiently."
  ];
  return /* @__PURE__ */ jsxs("div", { className: "bg-[#F8F5EC]", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative mt-13 md:mt-20", children: /* @__PURE__ */ jsx(BackgroundRes, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-full  md:w-[1440px] md:h-[700px] relative z-10 flex items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full pb-5 md:flex md:px-5 md:pt-10", children: [
      /* @__PURE__ */ jsx("div", { className: "pb-0 mb-0 md:w-1/2  px-3 md:px-0", children: /* @__PURE__ */ jsxs("div", { className: "cols-span-1 m-2 md:m-0 pr-2 md:ml-20 mt-5 md:mt-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-white font-bold text-[32px] hidden md:flex", children: [
          "Local Moving ",
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "\xA0You Can Rely On" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-white font-bold text-2xl md:hidden pt-10", children: [
          "Local Moving ",
          /* @__PURE__ */ jsxs("span", { className: "text-tertiary", children: [
            /* @__PURE__ */ jsx("br", {}),
            "You Can Rely On"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-white w-full md:w-3/4 my-3 text-regular text-base md:text-[17px] pb-10", children: [
          "When you're moving, the stakes are high. You need a team that's organized, dependable, and committed to protecting what you've.",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("br", {}),
          "That's where Moving Papa comes in"
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "pb-0 mb-0 w-screen md:w-1/2", children: /* @__PURE__ */ jsx("div", { className: "cols-span-1 md:m-0  mt-5 md:mt-10", children: /* @__PURE__ */ jsx(GetQuote, { from: "ottawa-moving" }) }) })
    ] }) }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center my-4", children: /* @__PURE__ */ jsx(Review, {}) }),
    /* @__PURE__ */ jsx("div", { className: "w-full pt-8 ", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1200px] mx-auto px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-16", children: [
        /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold text-primary mb-6", children: [
          "Trust. ",
          /* @__PURE__ */ jsx("span", { className: "text-tertiary", children: "That's Moving Papa" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-tertiary mx-auto mb-8" }),
        /* @__PURE__ */ jsx("p", { className: "text-base text-gray-700 max-w-4xl mx-auto leading-relaxed", children: "Moving Papa has built its reputation on one simple principle: earning and keeping your trust. Every move, every interaction, every promise we make is backed by our unwavering commitment to excellence." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mb-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Reliability You Can Count On" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "When we say we'll be there at 9 AM, we're there at 9 AM. When we quote a price, that's what you pay. No surprises, no excuses, just dependable service every time." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl font-bold text-primary mb-4", children: "Your Belongings Protected" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "Every item is treated like it's our own. Fully licensed, insured, and equipped with the best materials and techniques to ensure your precious belongings arrive exactly as they left." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 md:w-20 md:h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-tertiary transition-colors duration-300", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5 md:h-10 md:w-10 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 10V3L4 14h7v7l9-11h-7z" }) }) }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg md:text-xl  font-bold text-primary mb-4", children: "Proven Track Record" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700 text-sm md:text-base", children: "Over 1,000 successful moves and a 4.9-star Google rating don't happen by accident. They're the result of consistently delivering excellence, one move at a time." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center bg-white", children: /* @__PURE__ */ jsx(PapaAdv, { from: "residential" }) }),
    /* @__PURE__ */ jsx(CurvedStepsFlowFinal, {}),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(Link, { href: "/ottawa/finalstep/residential", className: "bg-tertiary font-bold text-white w-8/10 md:w-1/3 py-3 text-center rainbow-button !rounded-lg", children: "Get a Quote" }) }),
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
    /* @__PURE__ */ jsx(GetQuoteFooter, { section: "ottawa-moving" })
  ] });
}
export {
  Residential as default
};
