import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import CommGetQuote from "/src/app/components/commGetQuote.js";
import Review2 from "/src/app/components/commReview2.js";
import Image from "/src/components/Image.js";
import Img1 from "/src/images/office_img1.webp.js";
import "/src/app/landing.css.js";
import BackgroundArt from "/src/app/components/background/art.js";
import ContactSection from "/src/app/components/contactForm.js";
import StepsComm from "/src/app/components/commSteps.js";
import PapaAdv from "/src/app/components/papaadv.js";
function Office() {
  const steps = [
    {
      number: 1,
      title: "Request a Quote",
      description: "Tell us what needs to be moved, and we'll provide a detailed quote tailored to your specific equipment and move requirements."
    },
    {
      number: 2,
      title: "Plan and Prepare",
      description: "We assess your equipment, plan the safest route, prepare the right tools, and if needed, visit onsite ahead of time."
    },
    {
      number: 3,
      title: "Move with Care",
      description: "Our trained team arrives fully prepared to move your equipment safely, protecting your assets every step of the way."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full bg-primary", children: [
        /* @__PURE__ */ jsx(BackgroundArt, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative", children: /* @__PURE__ */ jsx("div", { className: "w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "flex  flex-col text-white md:p-6", children: /* @__PURE__ */ jsxs("div", { className: "bg-primary m-5 p-5  md:my-20", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold pb-5", children: "Moving Your Expensive Art Piece?" }),
            /* @__PURE__ */ jsx("h2", { className: "text-regular", children: "We Make It Simple, Organized, and Stress-Free." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "my-8 px-4 md:px-0", children: /* @__PURE__ */ jsx(CommGetQuote, { from: "ottawa-moving" }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start items-center w-full md:p-0 mb-4", children: /* @__PURE__ */ jsx(Review2, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-[1250px] md:h-[230px] flex justify-center my-4 md:mt-25 relative md:justify-end px-2 md:px-0 ", children: [
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
          /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold text-tertiary px-4 md:text-start", children: "We Handle It With Precision and Care." }),
          /* @__PURE__ */ jsx("p", { className: " my-4 mx-4 md:px-0", children: "Moving art piece is not like moving regular office furniture. It takes the right tools, experienced hands, and a clear plan to get it done safely. At Moving Papa, we specialize in transporting delicate, oversized, and high-value equipment for businesses across industries. We make sure your investment is protected from start to finish." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center px-2 md:px-0", children: /* @__PURE__ */ jsx(PapaAdv, { from: "art", variant: "white" }) }),
      /* @__PURE__ */ jsx(StepsComm, { steps, variant: "primary", quoteButtonLink: "/ottawa/finalstep/commercial" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(ContactSection, { section: "commercial" }) })
  ] });
}
export {
  Office as default
};
