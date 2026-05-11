import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Suspense, lazy } from "react";
import Header from "/src/app/components/header.js";
const Footer = lazy(() => import("/src/app/components/footer.js"));
function PageLoading() {
  return /* @__PURE__ */ jsx("div", { className: "mp-loader-inline", role: "status", "aria-label": "Loading", children: /* @__PURE__ */ jsx("div", { className: "mp-spinner" }) });
}
function Layout({ children }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 w-full z-50", children: /* @__PURE__ */ jsx(Header, {}) }),
    /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(PageLoading, {}), children }),
    /* @__PURE__ */ jsx(Suspense, { fallback: null, children: /* @__PURE__ */ jsx(Footer, {}) })
  ] });
}
export {
  Layout as default
};
