import { jsx, jsxs } from "react/jsx-runtime";
import { Bars4Icon, ChevronDownIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { useState, useRef, useEffect } from "react";
import Link from "/src/components/Link.js";
import headerLogow from "/src/images/headerlogonew.svg.js";
import Image from "/src/components/Image.js";
import { usePathname } from "/src/router/Router.js";
function Header({ section = "residential" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const pathname = usePathname();
  const isCommercial = section === "commercial";
  const getFinalstepUrl = () => {
    const isCommercialPath = pathname?.includes("/commercial") || pathname?.includes("/service/warehouse") || pathname?.includes("/service/office") || pathname?.includes("/service/specialEquipment") || pathname?.includes("/service/art") || pathname?.includes("/service/lastmile");
    if (pathname?.includes("/storage")) {
      return "/vancouver/finalstep/storage";
    }
    return isCommercialPath || isCommercial ? "/vancouver/finalstep/commercial" : "/vancouver/finalstep/residential";
  };
  const finalstepUrl = getFinalstepUrl();
  const bgColor = isCommercial ? "bg-primary" : "bg-[#F8F5EC]";
  const textColor = isCommercial ? "text-white" : "text-primary";
  const butTextColor = isCommercial ? "text-white" : "text-tertiary";
  const borderColor = isCommercial ? "border-white" : "border-primary";
  const hoverTextColor = isCommercial ? "hover:text-tertiary" : "hover:text-white";
  const hoverBackgd = isCommercial ? "hover:bg-white" : "hover:bg-tertiary";
  const buttonBgColor = isCommercial ? "bg-tertiary text-white" : "bg-tertiary text-white";
  const phoneBorderColor = isCommercial ? "border-tertiary" : "border-tertiary";
  const phoneIconColor = isCommercial ? "text-tertiary" : "text-tertiary";
  const dropdownBgColor = isCommercial ? "bg-primary" : "bg-white";
  const dropdownTextColor = isCommercial ? "text-white" : "text-primary";
  const dropdownBorderColor = isCommercial ? "border-white" : "border-primary";
  const headerlogo = isCommercial ? headerLogow : headerLogow;
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && buttonRef.current && !menuRef.current.contains(event.target) && !buttonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: `transition-all duration-300 ${bgColor} border-b-1`, children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:flex justify-center", children: /* @__PURE__ */ jsxs("div", { className: "h-20 flex md:w-[1300px]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center h-20 w-70", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver", className: "flex items-center", children: /* @__PURE__ */ jsx(Image, { src: headerlogo, alt: "Moving Papa Logo", priority: true }) }) }),
      /* @__PURE__ */ jsx("div", { className: `flex w-full items-center font-bold justify-end ${textColor}`, children: /* @__PURE__ */ jsxs("div", { className: "flex  justify-between items-center text-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: `flex gap-x-8`, children: [
          /* @__PURE__ */ jsxs("div", { className: "group relative", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex", children: [
              "Service",
              /* @__PURE__ */ jsx(ChevronDownIcon, { className: "h-6 w-6 m-1 transform transition-transform duration-200 group-hover:rotate-180", strokeWidth: 3 })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "absolute hidden group-hover:block z-1000", children: /* @__PURE__ */ jsxs("div", { className: `space-y-2 mt-2 ${dropdownBgColor} ${dropdownTextColor} p-3 border-2 ${dropdownBorderColor} rounded-md shadow-lg w-60 flex flex-col`, children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold border-b border-gray-300 pb-2 mb-2", children: "Residential" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/residential", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Residential Moving" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/packing", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Packing" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/storage", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Storage" }),
              /* @__PURE__ */ jsx("div", { className: "font-bold border-b border-gray-300 pb-2 mb-2 mt-3", children: "Commercial" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/commercial", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2 font-semibold", children: "Commercial Overview" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/warehouse", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Warehouse" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/office", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Office" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/specialEquipment", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Special Equipment" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/art", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Art" }),
              /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/lastmile", className: "hover:pl-2 transition-all duration-200 no-underline hover:underline ml-2", children: "Last Mile" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsx(Link, { href: "/vancouver/areas-of-service", className: "hover:underline", children: "Areas of Service" }),
          /* @__PURE__ */ jsx(Link, { href: "/vancouver/reviews", className: "hover:underline", children: "Reviews" }),
          /* @__PURE__ */ jsx(Link, { href: "/vancouver/blog", className: "hover:underline", children: "Blogs" }),
          /* @__PURE__ */ jsx(Link, { href: "/vancouver/company", className: "hover:underline", children: "Company" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-end gap-x-5 ml-5", children: [
          /* @__PURE__ */ jsx("div", { className: `flex-col w-40 border-r-3 pr-4 ${borderColor}`, children: /* @__PURE__ */ jsx(Link, { href: `tel:6043735582`, children: /* @__PURE__ */ jsx("button", { className: `w-full h-10 flex justify-center items-center hover:cursor-pointer border-2 border-tertiary rounded-xl text-sm ${bgColor} ${butTextColor} ${hoverTextColor} ${hoverBackgd}`, children: "604-373-5582" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "flex-col w-35 justify-center items-center", children: /* @__PURE__ */ jsx(Link, { href: finalstepUrl, children: /* @__PURE__ */ jsx("button", { className: `w-full h-10 flex justify-center !rounded-lg items-center p-2 ${buttonBgColor} font-bold text-sm hover:cursor-pointer`, children: "GET A QUOTE" }) }) })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: `flex md:hidden items-center px-4 py-2 ${bgColor} ${textColor}`, children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center h-13 w-40", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver", children: /* @__PURE__ */ jsx(Image, { src: headerlogo, alt: "Moving Papa Logo", priority: true }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-grow flex justify-end items-center gap-x-2", children: [
        /* @__PURE__ */ jsx("a", { href: "tel:6043735582", children: /* @__PURE__ */ jsx("button", { className: `${phoneBorderColor} border-1 flex justify-center items-center p-1 rounded-md ${bgColor}`, children: /* @__PURE__ */ jsx(PhoneIcon, { className: `h-5 w-5 ${phoneIconColor}`, strokeWidth: 2 }) }) }),
        /* @__PURE__ */ jsx(Link, { href: finalstepUrl, children: /* @__PURE__ */ jsx("button", { children: /* @__PURE__ */ jsx("div", { className: `flex items-center rounded-md !font-bold justify-center ${buttonBgColor} text-[10px] px-3 py-2`, children: "GET A QUOTE" }) }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            ref: buttonRef,
            className: textColor,
            onClick: () => setMenuOpen(!menuOpen),
            children: /* @__PURE__ */ jsx(Bars4Icon, { className: "h-8 w-8", strokeWidth: 2 })
          }
        )
      ] })
    ] }),
    menuOpen && /* @__PURE__ */ jsxs("div", { ref: menuRef, className: `bg-primary text-white ml-4 px-4 py-2 border-1 border-white rounded-md absolute z-10 w-9/10 pb-4`, children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("div", { className: "font-bold border-b-2 pb-2", children: "Services" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 mb-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-gray-200 mb-2", children: "Residential" }),
          /* @__PURE__ */ jsxs("ul", { className: "ml-4 space-y-2 flex flex-col", children: [
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/residential", onClick: () => setMenuOpen(false), children: "Residential Moving" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/packing", onClick: () => setMenuOpen(false), children: "Packing" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/storage", onClick: () => setMenuOpen(false), children: "Storage" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-400 pt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-semibold text-sm text-gray-200 mb-2", children: "Commercial" }),
          /* @__PURE__ */ jsx("div", { className: "mb-2", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/commercial", onClick: () => setMenuOpen(false), className: "font-bold ml-4", children: "Commercial Overview" }) }),
          /* @__PURE__ */ jsxs("ul", { className: "ml-4 space-y-2 flex flex-col", children: [
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/warehouse", onClick: () => setMenuOpen(false), children: "Warehouse" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/office", onClick: () => setMenuOpen(false), children: "Office" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/specialEquipment", onClick: () => setMenuOpen(false), children: "Special Equipment" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/art", onClick: () => setMenuOpen(false), children: "Art" }),
            /* @__PURE__ */ jsx(Link, { href: "/vancouver/service/lastmile", onClick: () => setMenuOpen(false), children: "Last Mile" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mb-4 border-t border-gray-400 pt-3", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/areas-of-service", onClick: () => setMenuOpen(false), className: "font-bold", children: "Areas of Service" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/reviews", onClick: () => setMenuOpen(false), className: "font-bold", children: "Reviews" }) }),
      /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/blog", onClick: () => setMenuOpen(false), className: "font-bold", children: "Blogs" }) }),
      /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Link, { href: "/vancouver/company", onClick: () => setMenuOpen(false), className: "font-bold", children: "Company" }) })
    ] })
  ] });
}
export {
  Header as default
};
