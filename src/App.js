import { jsx, jsxs } from "react/jsx-runtime";
import { Suspense } from "react";
import Router from "/src/router/Router.js";
import { AddressProvider } from "/src/app/contextValues.js";
import UtmHandler from "/src/app/components/utmcomponent.js";
import AnalyticsProvider from "/src/app/components/AnalyticsProvider.js";
import VancouverHeartbeatTracker from "/src/app/components/VancouverHeartbeatTracker.js";
function App() {
  return /* @__PURE__ */ jsxs(AddressProvider, { children: [
    /* @__PURE__ */ jsxs(Suspense, { fallback: null, children: [
      /* @__PURE__ */ jsx(UtmHandler, {}),
      /* @__PURE__ */ jsx(AnalyticsProvider, {}),
      /* @__PURE__ */ jsx(VancouverHeartbeatTracker, {})
    ] }),
    /* @__PURE__ */ jsx(Router, {})
  ] });
}
export {
  App as default
};
