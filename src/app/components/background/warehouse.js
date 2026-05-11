import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import backgroundWarehouse from "/src/images/comm_move.webp.js";
function BackgroundWarehouse({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden w-full md:max-w-[1400px]", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: backgroundWarehouse,
        alt: "Warehouse Moving Background",
        fill: true,
        priority: true,
        quality: 85,
        className: "object-cover",
        placeholder: "blur"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/30" }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full", children })
  ] });
}
export {
  BackgroundWarehouse as default
};
