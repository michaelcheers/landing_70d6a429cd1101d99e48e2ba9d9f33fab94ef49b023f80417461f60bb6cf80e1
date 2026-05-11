import { jsx, jsxs } from "react/jsx-runtime";
import Link from "/src/components/Link.js";
function NotFound() {
  return /* @__PURE__ */ jsx("div", { className: "min-h-screen flex items-center justify-center bg-[#F8F5EC]", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-primary mb-4", children: "Service Area Not Found" }),
    /* @__PURE__ */ jsx("p", { className: "text-gray-600 mb-6", children: "We couldn't find the service area you're looking for." }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/",
          className: "block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition",
          children: "Go to Homepage"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          href: "/service/residential",
          className: "block bg-tertiary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition",
          children: "View All Services"
        }
      )
    ] })
  ] }) });
}
export {
  NotFound as default
};
