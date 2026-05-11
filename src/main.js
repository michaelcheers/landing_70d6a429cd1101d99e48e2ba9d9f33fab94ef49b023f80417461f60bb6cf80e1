import { jsx } from "react/jsx-runtime";
import { createRoot } from "react-dom/client";
import App from "/src/App.js";
const deep = sessionStorage.getItem("mp_deeplink");
if (deep) {
  sessionStorage.removeItem("mp_deeplink");
  history.replaceState(null, "", deep);
}
const root = createRoot(document.getElementById("root"));
root.render(/* @__PURE__ */ jsx(App, {}));
