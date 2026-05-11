import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import background from "/src/images/papa-adv.webp.js";
function BackgroundRes({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden w-full md:max-w-[1400px] rounded-lg", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0", children: /* @__PURE__ */ jsx(
      Image,
      {
        src: background,
        alt: "Warehouse Moving Background",
        fill: true,
        priority: true,
        quality: 85,
        className: "object-cover",
        placeholder: "blur",
        style: { objectPosition: "50% 40%" }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full", children })
  ] });
}
export {
  BackgroundRes as default
};
