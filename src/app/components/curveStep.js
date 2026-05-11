import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import Image from "/src/components/Image.js";
import img from "/src/images/example-6.webp.js";
const CurvedStepsFlowFinal = () => {
  const steps = [
    {
      number: "01",
      title: "Start with a Quote",
      description: "Tell us about your move, and we'll provide a clear, upfront quote based on your specific needs. No hidden fees, no surprises \u2014 just honest pricing you can count on."
    },
    {
      number: "02",
      title: "Plan Every Detail",
      description: "We work closely with your team to plan the move from start to finish. That includes creating inventory maps, labeling, coordinating timelines, and making sure every piece is organized."
    },
    {
      number: "03",
      title: "Move and Settle In",
      description: "On moving day, our trained crew handles all the heavy lifting. We pack, transport, unload, and help set up your new space \u2014 so you can get back to business with zero headaches."
    }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-6xl mx-auto py-8 md:py-16 px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-center mb-8 md:mb-16", children: /* @__PURE__ */ jsxs("h2", { className: "text-xl md:text-3xl font-bold text-gray-800 md:flex justify-center", children: [
      /* @__PURE__ */ jsx("p", { className: "text-tertiary", children: "Moving made Easy," }),
      "\xA0Here's how we do it"
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full h-[250px] relative mb-8 md:hidden", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: img,
        alt: "alt",
        fill: true,
        sizes: "100%",
        style: { objectFit: "cover", objectPosition: "100% center" },
        className: "rounded-4xl",
        loading: "lazy"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "relative hidden md:block", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between relative", children: steps.map((step, index) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-center px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-tertiary text-white inline-block px-4 py-2 rounded-full text-sm font-medium mb-4", children: [
          "STEP - ",
          step.number
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 mb-3", children: step.title }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 leading-relaxed text-sm", children: step.description })
      ] }),
      index < steps.length - 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center flex-shrink-0 px-4 h-full", children: [
        /* @__PURE__ */ jsx("div", { className: "border-t-2 border-dashed border-gray-300 w-20 ab" }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "w-0 h-0 ml-2",
            style: {
              borderLeft: "8px solid #9CA3AF",
              borderTop: "6px solid transparent",
              borderBottom: "6px solid transparent"
            }
          }
        )
      ] })
    ] }, index)) }) }),
    /* @__PURE__ */ jsx("div", { className: "md:hidden", children: /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mr-4 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "1" }) }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-[#217552] absolute top-8 bottom-0 left-1/2 transform -translate-x-1/2 h-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 pb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2", children: "STEP - 01" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-1", children: "Start with a Quote" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base", children: "Tell us about your move, and we\u2019ll provide a clear, upfront quote based on your specific needs. No hidden fees, no surprises \u2014 just honest pricing you can count on." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex mb-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative mr-4 flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "2" }) }),
          /* @__PURE__ */ jsx("div", { className: "w-1 bg-[#217552] absolute top-8 bottom-0 left-1/2 transform -translate-x-1/2 h-full" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 pb-8", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2", children: "STEP - 02" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-1", children: "Plan Every Detail" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base", children: "We work closely with your team to plan the move from start to finish. That includes creating inventory maps, labeling, coordinating timelines, and making sure every piece of the move is organized before moving day." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx("div", { className: "relative mr-4 flex flex-col items-center", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10", children: /* @__PURE__ */ jsx("span", { className: "text-white text-xs font-bold", children: "3" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("div", { className: "bg-tertiary text-white inline-block px-3 py-1 rounded-full text-xs font-medium mb-2", children: "STEP - 03" }),
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold text-gray-800 mb-1", children: "Move and Settle In" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-600 text-base", children: "On moving day, our trained crew handles all the heavy lifting. We pack, transport, unload, and help set up your new space \u2014 so you can get back to business with zero headaches." })
        ] })
      ] })
    ] }) }) })
  ] });
};
var curveStep_default = CurvedStepsFlowFinal;
export {
  curveStep_default as default
};
