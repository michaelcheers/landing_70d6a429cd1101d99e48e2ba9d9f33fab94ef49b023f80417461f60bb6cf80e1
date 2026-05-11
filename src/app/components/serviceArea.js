import { jsx, jsxs } from "react/jsx-runtime";
import Link from "/src/components/Link.js";
const AreasOfService = () => {
  const serviceAreas = [
    { name: "City of Toronto, ON", slug: "toronto" },
    { name: "York Region, ON", slug: "york-region" },
    { name: "Peel Region, ON", slug: "peel-region" },
    { name: "Halton Region, ON", slug: "halton-region" },
    { name: "Durham Region, ON", slug: "durham-region" }
  ];
  return /* @__PURE__ */ jsx("div", { className: "w-full py-6 px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1250px] mx-auto flex flex-col md:flex-row", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:w-1/2 mb-8 md:mb-0 md:pr-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold text-primary mb-4 text-center md:text-start", children: "Areas of Service" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-700 mb-6", children: "No matter where you are moving from or to, you can count on our experience to get you there so you can focus more on your destination and less on the move." }),
      /* @__PURE__ */ jsx(Link, { href: "/finalstep/residential", children: /* @__PURE__ */ jsx("button", { className: "rainbow-button text-white font-bold py-3 px-8 !rounded-lg !w-full md:!w-5/10", children: "Get a Quote" }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:w-1/2", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: serviceAreas.map((area, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex items-center justify-between py-5 border-b border-gray-200 group hover:bg-gray-50 transition-colors px-2",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxs(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              className: "h-5 w-5 text-primary mr-2",
              fill: "none",
              viewBox: "0 0 24 24",
              stroke: "currentColor",
              children: [
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "path",
                  {
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "text-lg", children: area.name })
        ] })
      },
      index
    )) }) })
  ] }) });
};
var serviceArea_default = AreasOfService;
export {
  serviceArea_default as default
};
