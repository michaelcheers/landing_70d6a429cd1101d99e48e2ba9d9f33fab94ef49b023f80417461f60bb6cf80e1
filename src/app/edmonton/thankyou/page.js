import { jsx, jsxs } from "react/jsx-runtime";
import { CheckCircleIcon, TruckIcon, ClockIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, CalendarDaysIcon } from "@heroicons/react/24/outline";
import BackgroundThankyou from "/src/app/components/background/thankyou.js";
import VideoSection from "/src/app/components/videoSection.js";
function ThankYou() {
  const movingFacts = [
    {
      icon: /* @__PURE__ */ jsx(TruckIcon, { className: "h-8 w-8 text-white" }),
      title: "35 Million People Move Annually",
      description: "In North America, about 1 in 8 people relocate each year, making moving one of life's most common experiences."
    },
    {
      icon: /* @__PURE__ */ jsx(ClockIcon, { className: "h-8 w-8 text-white" }),
      title: "Peak Moving Season",
      description: "60% of all moves happen between May and September, with July being the busiest moving month of the year."
    },
    {
      icon: /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-8 w-8 text-white" }),
      title: "Average Distance",
      description: "The average local move is about 40 miles, while long-distance moves average around 1,200 miles."
    }
  ];
  const movingTips = [
    "Start packing non-essential items 4-6 weeks before your move date",
    "Label boxes with both contents and destination room for easier unpacking",
    "Take photos of electronic setups before disconnecting for easy reassembly",
    "Pack a 'first day' box with essentials like toiletries, medications, and a change of clothes"
  ];
  const nextSteps = [
    {
      icon: /* @__PURE__ */ jsx(ChatBubbleLeftRightIcon, { className: "h-5 w-5 text-primary700" }),
      title: "Quick Response",
      description: "Our team will contact you shortly during business hours (8 AM - 8 PM) to discuss your moving needs."
    },
    {
      icon: /* @__PURE__ */ jsx(DocumentTextIcon, { className: "h-5 w-5 text-primary700" }),
      title: "Detailed Quote",
      description: "We'll provide a transparent, detailed quote with no hidden fees - what we quote is what you pay."
    },
    {
      icon: /* @__PURE__ */ jsx(CalendarDaysIcon, { className: "h-5 w-5 text-primary700" }),
      title: "Book Your Move",
      description: "Once you're happy with the quote, we'll schedule your move and send you a confirmation with all the details."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-13 md:mt-20", children: /* @__PURE__ */ jsx(BackgroundThankyou, { children: /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-white p-6 md:p-10 md:pl-20 md:h-130 md:w-[1400px] flex flex-col justify-center text-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center mb-4 text-center", children: [
        /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-12 w-12 text-green-400 mr-4" }),
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold", children: "Thank You!" })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-lg font-bold mb-4", children: "Your quote request has been successfully submitted." }),
      /* @__PURE__ */ jsx("p", { className: "text-base", children: "We'll be in touch shortly to provide your personalized moving quote." })
    ] }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx(VideoSection, { from: "thankyou" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap w-full md:w-[1250px] justify-center mb-10 md:my-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "md:w-2/3 md:pl-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-primary font-bold text-3xl py-6 px-6", children: "What Happens Next?" }),
        /* @__PURE__ */ jsx("div", { className: "text-primary text-base px-2 space-y-4", children: nextSteps.map((step, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2 text-sm font-bold", children: index + 1 }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-2", children: [
              step.icon,
              /* @__PURE__ */ jsx("h3", { className: "font-bold ml-2", children: step.title })
            ] }),
            /* @__PURE__ */ jsx("p", { children: step.description })
          ] })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-1/3 hidden md:flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-[300px] h-[300px] bg-gradient-to-br from-primary100 to-primary200 rounded-lg shadow-lg flex items-center justify-center", children: /* @__PURE__ */ jsx(TruckIcon, { className: "h-32 w-32 text-primary600" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex justify-center w-full bg-primary", children: /* @__PURE__ */ jsx("div", { className: "flex flex-wrap w-full md:w-[1250px] justify-center my-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full px-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-tertiary font-bold text-3xl py-6 text-center", children: "Interesting Moving Facts" }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-8 mt-8", children: movingFacts.map((fact, index) => /* @__PURE__ */ jsxs("div", { className: "text-center group", children: [
        /* @__PURE__ */ jsx("div", { className: "w-16 h-16 bg-tertiary rounded-full flex items-center justify-center mx-auto mb-4 ", children: fact.icon }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-tertiary mb-3", children: fact.title }),
        /* @__PURE__ */ jsx("p", { className: "text-white text-sm leading-relaxed", children: fact.description })
      ] }, index)) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap w-full md:w-[1250px] px-6 md:px-0 mb-5 md:my-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full md:w-3/5 mt-10", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-primary text-2xl font-bold mb-6", children: "Pro Moving Tips While You Wait" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: movingTips.map((tip, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-6 w-6 text-tertiary mr-3 flex-shrink-0" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-700", children: tip })
        ] }, index)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-2/5 hidden md:flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "w-[280px] h-[280px] bg-white rounded-lg shadow-lg flex items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx(CheckCircleIcon, { className: "h-20 w-20 text-primary mx-auto mb-4" }),
        /* @__PURE__ */ jsx("p", { className: "text-primary font-bold text-lg", children: "Moving Made Easy" })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:w-[1300px] bg-primary rounded-lg p-6 mx-2 md:mx-0 mb-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-tertiary text-2xl font-bold mb-4", children: "Moving Papa - Your Trusted Moving Partner" }),
      /* @__PURE__ */ jsx("p", { className: "font-regular text-base text-white leading-relaxed", children: "From your first box to your final piece, we move with purpose. Our team is committed to making your moving experience smooth, stress-free, and reliable. Thank you for choosing Moving Papa - we look forward to taking care of your move!" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:w-[1250px] w-full my-5 px-6 md:px-0 text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-primary700 text-xl font-bold mb-3", children: "Ready to Move With Confidence?" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base", children: "At Moving Papa, every move is personal. We know behind every box is someone's hard work, memories, and future." })
    ] })
  ] });
}
export {
  ThankYou as default
};
