import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import CommGetQuote from "/src/app/components/commGetQuote.js";
import Image from "/src/components/Image.js";
import Review2 from "/src/app/components/commReview2.js";
import TruckImg from "/src/images/truck_img.webp.js";
import BackgroundWarehouse from "/src/app/components/background/warehouse.js";
import ContactSection from "/src/app/components/contactForm.js";
import StepsComm from "/src/app/components/commSteps.js";
import PapaAdv from "/src/app/components/papaadv.js";
function Warehouse() {
  const steps = [
    {
      number: 1,
      title: "Start with a Quote",
      description: "Tell us about your move, and we'll provide an upfront, no-nonsense quote you can count on"
    },
    {
      number: 2,
      title: "We handle the Move",
      description: "We plan your move carefully, create inventory maps, and visit onsite if needed. Then our crew arrives fully equipped to pack, load, and transport everything safely."
    },
    {
      number: 3,
      title: "Settle In Your New Warehouse",
      description: "We unload, organize, and help set up your space so you can get back to business faster."
    }
  ];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center w-full bg-primary", children: [
        /* @__PURE__ */ jsx(BackgroundWarehouse, { children: /* @__PURE__ */ jsx("div", { className: "w-full flex justify-center relative", children: /* @__PURE__ */ jsx("div", { className: "w-full px-3 md:px-0 md:w-[1250px] mt-[60px] relative z-10", children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "w-full grid grid-cols-1 md:grid-cols-2 h-full relative mt-30", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col text-white", children: /* @__PURE__ */ jsxs("div", { className: "bg-primary m-5 p-5  md:mt-20", children: [
            /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold", children: "Moving Warehouse?" }),
            /* @__PURE__ */ jsx("p", { className: "text-regular pt-4", children: "Relocating a warehouse is a big job that takes more than just trucks and muscle. It takes real planning, speed, and a team you can count on." })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "my-8 px-4 md:px-0", children: /* @__PURE__ */ jsx(CommGetQuote, { from: "vancouver-moving" }) })
        ] }) }) }) }) }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start w-full pb-5 items-center", children: /* @__PURE__ */ jsx(Review2, {}) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:w-[1250px] flex justify-center md:justify-start mt-5 md:my-10 relative", children: [
        /* @__PURE__ */ jsxs("div", { className: "w-8/10 md:w-3/5 md:pt-15", children: [
          /* @__PURE__ */ jsx("h1", { className: "text-xl md:text-3xl font-bold text-tertiary  md:text-start", children: "We've Got the Perfect Solution." }),
          /* @__PURE__ */ jsxs("p", { className: " my-4", children: [
            "We specialize in warehouse moves of all sizes, from small distribution centers to large-scale facilities. Our expert crews, specialized equipment, and streamlined process ensure your inventory, equipment, and assets are moved carefully, efficiently, and with minimal disruption to your operations.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Whether you're relocating across town or across the province, we move your business forward \u2014 one pallet, one shelf, one piece at a time."
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center items-center ", children: /* @__PURE__ */ jsx(
          Image,
          {
            src: TruckImg,
            alt: "Rectangle Photoroom",
            width: 655,
            height: 586,
            className: "absolute z-10 right-[0px]"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: " flex justify-center md:mt-15", children: /* @__PURE__ */ jsx(PapaAdv, { from: "warehouse", variant: "white" }) }),
      /* @__PURE__ */ jsx(StepsComm, { steps, variant: "primary", quoteButtonLink: "/vancouver/finalstep/commercial" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "px-3", children: /* @__PURE__ */ jsx(ContactSection, { section: "commercial" }) })
  ] });
}
export {
  Warehouse as default
};
