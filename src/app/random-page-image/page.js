import { jsx } from "react/jsx-runtime";
import Image from "/src/components/Image.js";
import fimg from "/src/images/random-page-image.png.js";
function Contact() {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-col items-center", children: /* @__PURE__ */ jsx(Image, { src: fimg, alt: "alt" }) });
}
export {
  Contact as default
};
