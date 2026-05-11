import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { PhoneIcon, ClockIcon, MapPinIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import Link from "/src/components/Link.js";
import Image from "/src/components/Image.js";
import Mascot from "/src/images/mascot.webp.js";
function Footer() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center flex-wrap pt-6 bg-[#06170e]", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 md:w-[1200px]", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-1", children: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(Image, { src: Mascot, alt: "", width: 189, height: 252, loading: "lazy" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2 text-white text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 pl-2 border-white", children: "Services" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2  pl-2 flex gap-x-20 text-regular", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/residential", children: "Residential Moving" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/packing", children: "Packing" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/storage", children: "Storage" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 pl-2 border-white", children: /* @__PURE__ */ jsx(Link, { href: "/calgary/commercial", children: "Commercial Moving" }) }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2  pl-2 flex gap-x-20 text-regular", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/warehouse", children: "Warehouse" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/office", children: "Office" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/specialEquipment", children: "Special Equipment" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/art", children: "Art" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/lastmile", children: "Last Mile" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 pl-2 border-white", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 pl-2 flex gap-x-20", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/company", children: "About Us" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/reviews", children: "Reviews" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-y-5 my-5 pl-2 text-sm text-[13px] w-full", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(ClockIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsxs("div", { className: "pl-1", children: [
                /* @__PURE__ */ jsx("div", { children: "Mon-Fri: 8am - 8pm" }),
                /* @__PURE__ */ jsx("div", { children: "Sat-Sun: 8am - 6pm" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx(MapPinIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "pl-1", children: "123 17th Avenue SW, Calgary, AB T2S 0A1" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: `tel:5878125952`, className: "flex", children: [
              /* @__PURE__ */ jsx(PhoneIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "pl-1", children: "(587) 812-5952" })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: `mailto:calgary@movingpapa.com`, className: "flex", children: [
              /* @__PURE__ */ jsx(EnvelopeIcon, { className: "h-5 w-5" }),
              /* @__PURE__ */ jsx("span", { className: "pl-1", children: "calgary@movingpapa.com" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "bg-tertiary/10 p-2 rounded-md", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs text-white font-bold mb-2", children: "MULTI-CITY SERVICE" }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsx(Link, { href: "/toronto", className: "text-sm hover:text-tertiary", children: "Toronto" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
                /* @__PURE__ */ jsx(Link, { href: "/vancouver", className: "text-sm hover:text-tertiary", children: "Vancouver" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
                /* @__PURE__ */ jsx(Link, { href: "/ottawa", className: "text-sm hover:text-tertiary", children: "Ottawa" }),
                /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
                /* @__PURE__ */ jsx(Link, { href: "/edmonton", className: "text-sm hover:text-tertiary", children: "Edmonton" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full flex justify-end", children: /* @__PURE__ */ jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4022576878707!2d-114.07117768431407!3d51.04473497956244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716fe8c8e5e8a3%3A0x5a8f5b8a7d4b0b0!2s17%20Ave%20SW%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca", width: "400", height: "200", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center py-2 pl-2 gap-x-10 text-[12px] pt-10", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex ", children: [
            /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", children: [
              /* @__PURE__ */ jsx("path", { d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }),
              /* @__PURE__ */ jsx("path", { d: "M15 9.354C14.4626 8.7447 13.7523 8.31351 12.9638 8.11779C12.1753 7.92208 11.3458 7.97112 10.5859 8.2584C9.8259 8.54568 9.17143 9.05757 8.70954 9.72596C8.24765 10.3943 8.00024 11.1875 8.00024 12C8.00024 12.8125 8.24765 13.6057 8.70954 14.274C9.17143 14.9424 9.8259 15.4543 10.5859 15.7416C11.3458 16.0289 12.1753 16.0779 12.9638 15.8822C13.7523 15.6865 14.4626 15.2553 15 14.646", stroke: "#FFFFFF", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
            ] }) }),
            /* @__PURE__ */ jsx("span", { className: "pl-2 flex items-center", children: `Copyright ${(/* @__PURE__ */ new Date()).getFullYear()}. Moving Papa. All rights reserved` })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "border-l-1 pl-10", children: /* @__PURE__ */ jsx(Link, { href: "/calgary/privacy-policy", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("div", { className: "border-l-1 pl-10", children: /* @__PURE__ */ jsx(Link, { href: "/calgary/terms-and-condition", children: "Terms and Condition" }) })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "sm:hidden bg-[#06170e] flex justify-center flex-wrap pt-6 pl-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 md:w-[1200px] w-full px-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-white text-sm mb-6 md:mb-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 border-white", children: "Services" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 flex flex-col", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/residential", children: "Residential Moving" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/packing", children: "Packing" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/storage", children: "Storage" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-white text-sm mb-6 md:mb-0", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 border-white", children: "Commercial Moving" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 flex flex-col", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/warehouse", children: "Warehouse" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/office", children: "Office" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/specialEquipment", children: "Special Equipment" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/art", children: "Art" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/service/lastmile", children: "Last Mile" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "col-span-1 text-white text-sm mb-6 md:mb-0 ", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold pb-2 border-b-2 border-white", children: "Company" }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-4 space-y-2 flex flex-col", children: [
            /* @__PURE__ */ jsx(Link, { href: "/calgary/company", children: "About Us" }),
            /* @__PURE__ */ jsx(Link, { href: "/calgary/reviews", children: "Reviews" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "col-span-1 text-white text-sm pb-6 border-t-2 pt-5", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(ClockIcon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsxs("div", { className: "pl-2", children: [
              /* @__PURE__ */ jsx("div", { children: "Mon-Fri: 8am - 8pm" }),
              /* @__PURE__ */ jsx("div", { children: "Sat-Sun: 8am - 6pm" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(MapPinIcon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "pl-2", children: "123 17th Avenue SW, Calgary, AB T2S 0A1" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: `tel:5878125952`, className: "flex", children: [
            /* @__PURE__ */ jsx(PhoneIcon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "pl-1", children: "(587) 812-5952" })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxs(Link, { href: `mailto:calgary@movingpapa.com`, className: "flex", children: [
            /* @__PURE__ */ jsx(EnvelopeIcon, { className: "h-5 w-5" }),
            /* @__PURE__ */ jsx("span", { className: "pl-1", children: "calgary@movingpapa.com" })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-tertiary/10 p-2 rounded-md", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs text-white font-bold mb-2", children: "MULTI-CITY SERVICE" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx(Link, { href: "/toronto", className: "text-sm hover:text-tertiary", children: "Toronto" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver", className: "text-sm hover:text-tertiary", children: "Vancouver" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
              /* @__PURE__ */ jsx(Link, { href: "/ottawa", className: "text-sm hover:text-tertiary", children: "Ottawa" }),
              /* @__PURE__ */ jsx("span", { className: "text-white/50", children: "|" }),
              /* @__PURE__ */ jsx(Link, { href: "/edmonton", className: "text-sm hover:text-tertiary", children: "Edmonton" })
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pb-5", children: /* @__PURE__ */ jsx("iframe", { src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2508.4022576878707!2d-114.07117768431407!3d51.04473497956244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716fe8c8e5e8a3%3A0x5a8f5b8a7d4b0b0!2s17%20Ave%20SW%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca", width: "300", height: "200", style: { border: 0 }, allowFullScreen: true, loading: "lazy", referrerPolicy: "no-referrer-when-downgrade" }) }),
      /* @__PURE__ */ jsx("div", { className: "w-full bg-[#06170e] text-white text-xs px-4 py-4 border-t border-white", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
                    stroke: "#F3F3F3",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    d: "M15 9.354C14.4626 8.7447 13.7523 8.31351 12.9638 8.11779C12.1753 7.92208 11.3458 7.97112 10.5859 8.2584C9.8259 8.54568 9.17143 9.05757 8.70954 9.72596C8.24765 10.3943 8.00024 11.1875 8.00024 12C8.00024 12.8125 8.24765 13.6057 8.70954 14.274C9.17143 14.9424 9.8259 15.4543 10.5859 15.7416C11.3458 16.0289 12.1753 16.0779 12.9638 15.8822C13.7523 15.6865 14.4626 15.2553 15 14.646",
                    stroke: "#F3F3F3",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "pl-2", children: `Copyright ${(/* @__PURE__ */ new Date()).getFullYear()}. Moving Papa. All rights reserved.` })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex ", children: [
          /* @__PURE__ */ jsx(Link, { href: "/calgary/privacy-policy", className: "pr-5", children: "Privacy Policy" }),
          /* @__PURE__ */ jsx(Link, { href: "/calgary/terms-and-condition", className: "border-l-1 pl-5", children: "Terms and Condition" })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  Footer as default
};
