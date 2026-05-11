import { jsx, jsxs } from "react/jsx-runtime";
import Link from "/src/components/Link.js";
import { TORONTO_CONFIG, VANCOUVER_CONFIG } from "/src/app/utils/metadata.js";
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-gray-50", children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto px-4 py-16 text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-6xl font-bold text-gray-900 mb-4", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "text-3xl font-semibold text-gray-800 mb-6", children: "Page Not Found" }),
    /* @__PURE__ */ jsx("p", { className: "text-xl text-gray-600 mb-8", children: "Sorry, we couldn't find the page you're looking for." }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg shadow-lg p-8 mb-8", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-2xl font-bold text-[#34A853] mb-4", children: "Need Moving Services?" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-gray-700 mb-6", children: "Contact Moving Papa for professional moving services in Toronto and Vancouver" }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Toronto" }),
          /* @__PURE__ */ jsx("a", { href: `tel:${TORONTO_CONFIG.phoneNumber}`, className: "text-3xl font-bold text-[#34A853]", children: TORONTO_CONFIG.phoneNumber })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-gray-200", children: [
          /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 mb-2", children: "Vancouver" }),
          /* @__PURE__ */ jsx("a", { href: `tel:${VANCOUVER_CONFIG.phoneNumber}`, className: "text-3xl font-bold text-[#34A853]", children: VANCOUVER_CONFIG.phoneNumber })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(Link, { href: "/", className: "inline-block px-8 py-3 bg-[#34A853] text-white font-semibold rounded-lg", children: "Return to Home" }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-4 text-sm", children: [
        /* @__PURE__ */ jsx(Link, { href: "/service/residential", className: "text-[#34A853] hover:underline", children: "Residential Moving" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "|" }),
        /* @__PURE__ */ jsx(Link, { href: "/commercial", className: "text-[#34A853] hover:underline", children: "Commercial Moving" }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "|" }),
        /* @__PURE__ */ jsx(Link, { href: "/company", className: "text-[#34A853] hover:underline", children: "Contact Us" })
      ] })
    ] })
  ] }) });
}
export {
  NotFound as default
};
