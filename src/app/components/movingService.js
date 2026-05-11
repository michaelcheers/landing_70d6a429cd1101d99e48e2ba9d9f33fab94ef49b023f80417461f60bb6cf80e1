import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import bigimg from "/src/images/service-img.webp.js";
import smallimg from "/src/images/greg.webp.js";
import Link from "/src/components/Link.js";
const MovingServicesGrid = ({ from = "toronto" }) => {
  const services = [
    {
      title: "Packing & Unpacking",
      popular: true,
      icon: "box",
      description: "We carefully wrap, box, and secure your belongings, then help you unpack and organize once you reach your new location."
    },
    {
      title: "Assembling & Disassembling",
      popular: true,
      icon: "furniture",
      description: "Our expert team takes apart your furniture and reassembles it at your new location quickly and with precision."
    },
    {
      title: "Furniture Disposal",
      popular: true,
      icon: "recycle",
      description: "Need to get rid of unwanted furniture? We'll arrange eco-friendly recycling or proper disposal services."
    },
    {
      title: "Insurance Certification",
      popular: true,
      icon: "headset",
      description: "We provide comprehensive Certificate of Insurance (COI) documentation, ensuring your move is fully protected."
    }
  ];
  const link = from === "toronto" ? "/finalstep/residential" : "/vancouver/finalstep/residential";
  return /* @__PURE__ */ jsx("div", { className: "w-19/20 md:w-full pl-5 md:pl-0", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto md:flex justify-between", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6 md:w-1/2 md:mr-4", children: [
      /* @__PURE__ */ jsx("div", { className: "border col-span-1 border-black rounded-4xl p-6 bg-white relative h-70 overflow-hidden", children: /* @__PURE__ */ jsx(
        Image,
        {
          src: smallimg,
          alt: "",
          fill: true,
          sizes: "100%",
          style: {
            objectFit: "cover",
            objectPosition: "0% 30%",
            transform: "scale(1.15)"
            /* Add slight zoom to the image */
          },
          className: "rounded-lg"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "border col-span-1 border-black  rounded-lg p-6 bg-primary h-70", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center w-full h-full", children: /* @__PURE__ */ jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx("span", { className: "text-7xl font-bold text-white", children: "99%" }) }),
        /* @__PURE__ */ jsx("div", { className: "text-white text-lg uppercase mb-4 font-bold", children: "Customer Satisfaction" }),
        /* @__PURE__ */ jsx("div", { className: "w-24 h-1 bg-green-600 mb-4" }),
        /* @__PURE__ */ jsx("div", { className: "flex space-x-1 mb-2", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsx("svg", { className: "w-6 h-6 text-yellow-500", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" }) }, star)) }),
        /* @__PURE__ */ jsx("div", { className: "text-xs text-white text-center font-light", children: "Based on hundreds of verified customer reviews" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "border border-black rounded-4xl col-span-1 md:col-span-2 relative h-85", children: /* @__PURE__ */ jsx(Image, { src: bigimg, alt: "", fill: true, sizes: "100%", style: { objectFit: "cover", objectPosition: "70% 10%" }, className: "rounded-4xl" }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border border-black rounded-lg p-6 bg-white md:w-1/2 mt-2 md:mt-0", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-xl md:text-2xl font-bold text-primary mb-6", children: "Moving is a Craft we love" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4 mb-8 h-full", children: [
        services.map((service, index) => /* @__PURE__ */ jsxs("div", { className: "flex items-start", children: [
          /* @__PURE__ */ jsx("span", { className: "flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-primary text-white mr-2", children: index + 1 }),
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-base md:text-base", children: [
            service.title,
            ": ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "font-regular", children: service.description })
          ] })
        ] }, index)),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-base md:text-base", children: "Beyond moving: our additional services for a seamless experience from start to finish." }),
        /* @__PURE__ */ jsx("div", { className: "h-1/5 flex items-end", children: /* @__PURE__ */ jsx("div", { className: "border-t border-gray-300 pt-6 w-full", children: /* @__PURE__ */ jsx(Link, { href: link, className: "w-full bg-red-600 text-white py-3 !font-bold !rounded-lg font-medium rainbow-button", children: "Get a Quote" }) }) })
      ] })
    ] })
  ] }) });
};
var movingService_default = MovingServicesGrid;
export {
  movingService_default as default
};
