import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import CommGetQuote from "/src/app/components/commGetQuote.js";
import Review2 from "/src/app/components/commReview2.js";
import Image from "/src/components/Image.js";
import LastmileImg from "/src/images/lastmile_img1.webp.js";
import "/src/app/landingcomm.css.js";
import BackgroundWarehouse from "/src/app/components/background/warehouse.js";
import ContactSection from "/src/app/components/contactForm.js";
import StepsComm from "/src/app/components/commSteps.js";
import PapaAdv from "/src/app/components/papaadv.js";
function LastMile() {
  const steps = [
    {
      number: 1,
      title: "Request a Quote",
      description: "Tell us what needs to be delivered, where, and when \u2014 we'll provide a clear, upfront quote you can trust."
    },
    {
      number: 2,
      title: "Schedule and Pick Up",
      description: "We pick up your goods on time, inspect them carefully, and load them securely for transport."
    },
    {
      number: 3,
      title: "Deliver with Care",
      description: "We deliver to your final destination exactly as promised \u2014 with care, respect, and professionalism every step of the way."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full bg-primary", children: [
        /* @__PURE__ */ jsx(BackgroundWarehouse, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative", children: /* @__PURE__ */ jsx("div", { className: "w-full px-3 md:px-0 md:w-[1250px] mt-[80px] relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "flex items-center flex-col text-white p-10 md:mt-20", children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold bg-primary p-5", children: "Last Mile Delivery You Can Count On" }) }),
          /* @__PURE__ */ jsx("div", { className: "my-8 px-4 md:px-0", children: /* @__PURE__ */ jsx(CommGetQuote, { from: "lastmile" }) })
        ] }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start items-center w-full mb-4", children: /* @__PURE__ */ jsx(Review2, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-[1250px] flex justify-center  md:justify-start mt-8 md:my-20 relative px-4 md:px-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-full md:w-4/7", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold text-tertiary mx-4 md:text-start", children: "Fast, Reliable, and Handled With Care" }),
          /* @__PURE__ */ jsxs("p", { className: "text-regular my-4 md:pr-10 mx-4 md:px-0", children: [
            "When it comes to last mile delivery, every detail matters. Whether you are delivering products to customers, moving inventory between locations, or handling sensitive equipment, you need a partner who delivers on time, every time.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "At Moving Papa, we specialize in last mile logistics that prioritize speed, precision, and customer satisfaction. We are the trusted link between your business and your final destination."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center items-center", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: LastmileImg,
            alt: "Rectangle Photoroom",
            width: 560,
            height: 406,
            className: "absolute z-10 right-[0px]"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(PapaAdv, { from: "lastmile", variant: "white" }) }),
      /* @__PURE__ */ jsx(StepsComm, { steps, variant: "primary" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(ContactSection, { section: "commercial" }) })
  ] });
}
export {
  LastMile as default
};
