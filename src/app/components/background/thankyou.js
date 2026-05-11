import { jsx, jsxs } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import background from "/src/images/papa-adv.webp.js";
function BackgroundThankyou({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden w-full md:max-w-[1400px] rounded-4xl", children: [
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
        style: { objectPosition: "50% 30%" }
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/60" }),
    /* @__PURE__ */ jsx("div", { className: "relative h-full pt-15", children })
  ] });
}
export {
  BackgroundThankyou as default
};
