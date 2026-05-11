import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import GreenStorageLogo from "/src/images/green_storage.png.js";
const LogoCarousel = ({ city }) => {
  const baseLogos = [
    { src: "/images/vcaCanada-w.png", alt: "VCA Canada", name: "VCA Canada" },
    { src: "/images/costco-w.png", alt: "Costco Wholesale", name: "Costco Wholesale" },
    { src: "/images/Loreal-w.png", alt: "L'Oreal", name: "L'Oreal" },
    { src: "/images/theRirtz-w.png", alt: "The Ritz-Carlton", name: "The Ritz-Carlton" }
  ];
  const cityLogos = city === "hamilton" ? [...baseLogos, { src: GreenStorageLogo, alt: "Green Storage", name: "Green Storage" }] : baseLogos;
  const logos = [...cityLogos, ...cityLogos];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "w-screen flex justify-center mt-3 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-7xl ", children: /* @__PURE__ */ jsxs("div", { className: "pb-6 md:pb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-2 font-bold text-[16px] md:text-[22px] border-b-1 md:flex text-center mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xl md:text-3xl font-bold text-primary", children: "Hear from our Customers," }),
        /* @__PURE__ */ jsx("div", { className: "text-xl md:text-3xl font-bold text-tertiary", children: "the heart of our Success." })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden pt-5", children: /* @__PURE__ */ jsx("div", { className: "flex animate-slide", children: logos.map((logo, index) => /* @__PURE__ */ jsx(
        "div",
        {
          className: "flex-none bg-primary rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 ",
          style: { width: "150px", height: "80px" },
          children: /* @__PURE__ */ jsx("div", { className: "w-full h-full  p-2 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "relative w-full h-full", children: /* @__PURE__ */ jsx(
            Image,
            {
              src: logo.src,
              alt: logo.alt,
              fill: true,
              className: "object-contain grayscale hover:grayscale-0 transition-all duration-300",
              sizes: "110px"
            }
          ) }) })
        },
        index
      )) }) })
    ] }) }) }),
    /* @__PURE__ */ jsx("style", { jsx: true, global: true, children: `
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-slide {
          animation: slide 30s linear infinite;
          width: max-content;
        }

        .animate-slide:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .animate-slide {
            animation: slide 20s linear infinite;
          }
        }

        @media (max-width: 480px) {
          .animate-slide {
            animation: slide 15s linear infinite;
          }
        }
      ` })
  ] });
};
var logo_default = LogoCarousel;
export {
  logo_default as default
};
