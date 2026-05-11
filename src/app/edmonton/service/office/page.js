import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import CommGetQuote from "/src/app/components/commGetQuote.js";
import Review2 from "/src/app/components/commReview2.js";
import Image from "/src/components/Image.js";
import Img1 from "/src/images/office_img1.webp.js";
import "/src/app/landing.css.js";
import BackgroundOffice from "/src/app/components/background/office.js";
import ContactSection from "/src/app/components/contactForm.js";
import StepsComm from "/src/app/components/commSteps.js";
import PapaAdv from "/src/app/components/papaadv.js";
function Office() {
  const steps = [
    {
      number: 1,
      title: "Start with a Quote",
      description: "Tell us about your office move, and we'll provide a fast, clear quote with no hidden fees."
    },
    {
      number: 2,
      title: "We Plan and Move",
      description: "We coordinate the packing, logistics, and transportation to keep everything organized and on schedule \u2014 with optional onsite walkthroughs if needed."
    },
    {
      number: 3,
      title: "Settle Into Your New Office",
      description: "We unload, help set up your workstations, and get your team ready to hit the ground running in your new space."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full bg-primary", children: [
        /* @__PURE__ */ jsx(BackgroundOffice, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative", children: /* @__PURE__ */ jsx("div", { className: "w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "flex  flex-col text-white md:p-10", children: /* @__PURE__ */ jsxs("div", { className: "bg-primary m-5 p-5  md:my-20", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold pb-5", children: "Moving Your Office?" }),
            /* @__PURE__ */ jsx("h2", { className: "text-regular", children: "We Make It Simple, Organized, and Stress-Free." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "my-8 px-4 md:px-0", children: /* @__PURE__ */ jsx(CommGetQuote, { from: "edmonton-moving" }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start items-center  w-full md:p-0 mb-4", children: /* @__PURE__ */ jsx(Review2, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-[1250px] md:h-[230px] flex justify-center my-4 md:mt-25 relative md:justify-end px-2 md:px-0", children: [
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center items-center", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: Img1,
            alt: "Rectangle Photoroom",
            width: 610,
            height: 407,
            style: { width: "500px", height: "auto" },
            className: "absolute z-10 left-[0px] bottom-[0px]"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-6/10 px-4 md:pl-8", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold text-tertiary text-center md:text-start", children: "We Make It Simple, Organized, and Stress-Free." }),
          /* @__PURE__ */ jsxs("p", { className: " my-4 ", children: [
            "Office relocations take more than just moving desks and chairs. They take detailed planning, careful coordination, and a team that understands the importance of keeping your business running smoothly.",
            /* @__PURE__ */ jsx("br", {}),
            " At Moving Papa, we specialize in office moves of all sizes \u2014 from small businesses to full corporate headquarters. Our goal is to relocate your office quickly, safely, and with minimal downtime, so you can get back to doing what you do best."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " flex justify-center px-2 md:px-0", children: /* @__PURE__ */ jsx(PapaAdv, { from: "office", variant: "white" }) }),
      /* @__PURE__ */ jsx(StepsComm, { steps, variant: "primary", quoteButtonLink: "/edmonton/finalstep/commercial" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(ContactSection, { section: "commercial" }) })
  ] });
}
export {
  Office as default
};
